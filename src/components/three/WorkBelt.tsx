"use client";

import { MutableRefObject, useEffect, useMemo, useRef } from "react";
import * as THREE from "three";
import { Canvas, useFrame, useThree, ThreeEvent } from "@react-three/fiber";
import { gsap } from "@/lib/motion/gsap";
import { CanvasGuard } from "./CanvasGuard";

export interface BeltItem {
  id: string;
  slug: string;
  title: string;
  imageUrl?: string;
}

export interface BeltControls {
  step: (dir: 1 | -1) => void;
}

interface BeltProps {
  items: BeltItem[];
  onActiveChange: (index: number) => void;
  onSelect: (index: number) => void;
  controlsRef?: MutableRefObject<BeltControls | null>;
}

const GAP = 4.6;
const PLANE_W = 3.5;
const PLANE_H = 2.625;

const VERTEX = /* glsl */ `
uniform float uVel;
uniform float uHover;
varying vec2 vUv;

void main() {
  vUv = uv;
  vec3 pos = position;
  float archX = sin(uv.x * 3.14159);
  float archY = sin(uv.y * 3.14159);

  // hover bulge toward the camera
  pos.z += archX * archY * uHover * 0.34;

  // jelly skew + recession while the belt is moving
  pos.x += archY * uVel * 0.55;
  pos.z -= abs(uVel) * archX * 0.85;

  gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);
}
`;

const FRAGMENT = /* glsl */ `
uniform sampler2D uMap;
uniform float uHasTex;
uniform float uFocus;
uniform float uDim;
uniform float uAlpha;
uniform float uVel;
uniform vec3 uTint;
varying vec2 vUv;

void main() {
  vec2 uv = vUv;
  float shift = uVel * 0.02;

  vec3 tex;
  tex.r = texture2D(uMap, uv + vec2(shift, 0.0)).r;
  tex.g = texture2D(uMap, uv).g;
  tex.b = texture2D(uMap, uv - vec2(shift, 0.0)).b;

  vec3 col = mix(uTint, tex, uHasTex);

  // colour wakes up as a piece reaches the centre of the belt
  float luma = dot(col, vec3(0.299, 0.587, 0.114));
  col = mix(vec3(luma) * 0.92, col, clamp(uFocus, 0.0, 1.0));

  // recede into the dark at the edges
  col *= 1.0 - uDim * 0.6;

  float vig = smoothstep(0.0, 0.07, uv.x) * smoothstep(1.0, 0.93, uv.x) *
              smoothstep(0.0, 0.07, uv.y) * smoothstep(1.0, 0.93, uv.y);
  col *= 0.78 + vig * 0.22;

  gl_FragColor = vec4(col, uAlpha);
}
`;

const TINTS = [
  new THREE.Color("#22333d"),
  new THREE.Color("#3a2c28"),
  new THREE.Color("#2e2a1b"),
  new THREE.Color("#1d2b30"),
];

function Belt({ items, onActiveChange, onSelect, controlsRef }: BeltProps) {
  const meshes = useRef<(THREE.Mesh | null)[]>([]);
  const hovered = useRef<number | null>(null);
  const lastActive = useRef(-1);
  const pointerN = useRef({ x: 0, y: 0 });
  const drag = useRef({
    active: false,
    lastX: 0,
    moved: 0,
    offset: 0,
    velocity: 0,
  });
  const { gl, viewport, camera } = useThree();

  const geometry = useMemo(() => new THREE.PlaneGeometry(PLANE_W, PLANE_H, 24, 16), []);

  const materials = useMemo(
    () =>
      items.map(
        (_, i) =>
          new THREE.ShaderMaterial({
            vertexShader: VERTEX,
            fragmentShader: FRAGMENT,
            transparent: true,
            uniforms: {
              uMap: { value: null },
              uHasTex: { value: 0 },
              uFocus: { value: 0 },
              uDim: { value: 0 },
              uAlpha: { value: 0 },
              uVel: { value: 0 },
              uHover: { value: 0 },
              uTint: { value: TINTS[i % TINTS.length] },
            },
          })
      ),
    [items]
  );

  // Texture loading (Sanity CDN serves CORS-friendly assets)
  useEffect(() => {
    const loader = new THREE.TextureLoader();
    loader.setCrossOrigin("anonymous");
    const textures: THREE.Texture[] = [];
    let cancelled = false;

    items.forEach((item, i) => {
      if (!item.imageUrl) return;
      loader.load(item.imageUrl, (tex) => {
        if (cancelled) {
          tex.dispose();
          return;
        }
        // Raw ShaderMaterial skips three's output colour transform, so keep
        // the texture bytes untouched — we author the grade in the shader.
        tex.colorSpace = THREE.NoColorSpace;
        tex.minFilter = THREE.LinearFilter;
        tex.generateMipmaps = false;
        materials[i].uniforms.uMap.value = tex;
        gsap.to(materials[i].uniforms.uHasTex, { value: 1, duration: 0.8 });
        textures.push(tex);
      });
    });

    return () => {
      cancelled = true;
      textures.forEach((t) => t.dispose());
    };
  }, [items, materials]);

  // Entrance: belt glides in, panels fade up
  useEffect(() => {
    const d = drag.current;
    d.offset = -GAP * 1.35;
    const slide = gsap.to(d, { offset: 0, duration: 1.7, ease: "power3.out" });
    const fades = materials.map((m, i) =>
      gsap.to(m.uniforms.uAlpha, { value: 1, duration: 0.9, delay: 0.1 + i * 0.06 })
    );
    return () => {
      slide.kill();
      fades.forEach((f) => f.kill());
      materials.forEach((m) => m.dispose());
    };
  }, [materials]);

  // Imperative controls for keyboard access
  useEffect(() => {
    if (!controlsRef) return;
    controlsRef.current = {
      step: (dir) => {
        const d = drag.current;
        d.velocity = 0;
        const target = (Math.round(d.offset / GAP) + dir) * GAP;
        gsap.to(d, { offset: target, duration: 0.7, ease: "power3.out" });
      },
    };
    return () => {
      controlsRef.current = null;
    };
  }, [controlsRef]);

  // Pointer drag + wheel, attached to the canvas element
  useEffect(() => {
    const el = gl.domElement;
    const d = drag.current;

    const onPointerDown = (e: PointerEvent) => {
      d.active = true;
      d.lastX = e.clientX;
      d.moved = 0;
      d.velocity = 0;
      el.setPointerCapture?.(e.pointerId);
    };
    const onPointerMove = (e: PointerEvent) => {
      pointerN.current.x = (e.clientX / window.innerWidth) * 2 - 1;
      pointerN.current.y = -((e.clientY / window.innerHeight) * 2 - 1);
      if (!d.active) return;
      const dx = e.clientX - d.lastX;
      d.lastX = e.clientX;
      d.moved += Math.abs(dx);
      const worldPerPixel = (viewport.width / el.clientWidth) * 1.35;
      d.offset -= dx * worldPerPixel;
      d.velocity = -dx * worldPerPixel;
    };
    const onPointerUp = () => {
      d.active = false;
    };
    const onWheel = (e: WheelEvent) => {
      e.preventDefault();
      e.stopPropagation();
      const delta = Math.abs(e.deltaY) > Math.abs(e.deltaX) ? e.deltaY : e.deltaX;
      d.velocity = gsap.utils.clamp(-0.6, 0.6, d.velocity + delta * 0.00038);
    };

    el.addEventListener("pointerdown", onPointerDown);
    window.addEventListener("pointermove", onPointerMove, { passive: true });
    window.addEventListener("pointerup", onPointerUp);
    window.addEventListener("pointercancel", onPointerUp);
    el.addEventListener("wheel", onWheel, { passive: false });

    return () => {
      el.removeEventListener("pointerdown", onPointerDown);
      window.removeEventListener("pointermove", onPointerMove);
      window.removeEventListener("pointerup", onPointerUp);
      window.removeEventListener("pointercancel", onPointerUp);
      el.removeEventListener("wheel", onWheel);
    };
  }, [gl, viewport.width]);

  useFrame((state, delta) => {
    if (document.hidden) return;
    const d = drag.current;
    const count = items.length;
    const total = GAP * count;
    const half = total / 2;

    if (!d.active) {
      d.offset += d.velocity;
      d.velocity *= 0.94;
      if (Math.abs(d.velocity) < 0.0016) {
        d.velocity = 0;
        const target = Math.round(d.offset / GAP) * GAP;
        d.offset += (target - d.offset) * Math.min(1, delta * 4.5);
      }
    } else {
      d.velocity *= 0.86;
    }

    const active =
      ((Math.round(d.offset / GAP) % count) + count) % count;
    if (active !== lastActive.current) {
      lastActive.current = active;
      onActiveChange(active);
    }

    const velNorm = gsap.utils.clamp(-1, 1, d.velocity * 10);

    for (let i = 0; i < count; i++) {
      const mesh = meshes.current[i];
      if (!mesh) continue;

      let x = i * GAP - d.offset;
      x = ((x % total) + total) % total;
      if (x > half) x -= total;

      const visible = Math.abs(x) < viewport.width / 2 + PLANE_W * 1.4;
      mesh.visible = visible;
      if (!visible) continue;

      const y = Math.sin(i * 1.93) * 0.42;
      const z = -Math.abs(x) * 0.4 + Math.sin(i * 2.71) * 0.12;
      mesh.position.set(x, y, z);
      mesh.rotation.y = gsap.utils.clamp(-0.55, 0.55, -x * 0.08);

      const m = materials[i];
      m.uniforms.uVel.value += (velNorm - m.uniforms.uVel.value) * 0.12;
      const focusTarget = Math.max(0.16, 1 - Math.abs(x) / (GAP * 0.8));
      m.uniforms.uFocus.value += (focusTarget - m.uniforms.uFocus.value) * 0.08;
      m.uniforms.uDim.value = gsap.utils.clamp(
        0,
        1,
        Math.abs(x) / (viewport.width * 0.72)
      );

      const targetScale =
        1 + (hovered.current === i ? 0.055 : 0) + (focusTarget > 0.92 ? 0.04 : 0);
      mesh.scale.x += (targetScale - mesh.scale.x) * 0.1;
      mesh.scale.y += (targetScale - mesh.scale.y) * 0.1;
    }

    // gentle camera sway toward the pointer
    camera.position.x += (pointerN.current.x * 0.4 - camera.position.x) * 0.045;
    camera.position.y += (pointerN.current.y * 0.25 - camera.position.y) * 0.045;
    camera.lookAt(0, 0, 0);
  });

  const handleClick = (index: number) => (e: ThreeEvent<MouseEvent>) => {
    e.stopPropagation();
    const d = drag.current;
    if (d.moved > 9) return; // it was a drag, not a click

    const count = items.length;
    const total = GAP * count;
    const half = total / 2;
    let x = index * GAP - d.offset;
    x = ((x % total) + total) % total;
    if (x > half) x -= total;

    if (Math.abs(x) < GAP / 2) {
      onSelect(index);
    } else {
      d.velocity = 0;
      gsap.to(d, { offset: d.offset + x, duration: 0.8, ease: "power3.out" });
    }
  };

  return (
    <group>
      {items.map((item, i) => (
        <mesh
          key={`${item.id}-${i}`}
          ref={(el) => {
            meshes.current[i] = el;
          }}
          geometry={geometry}
          material={materials[i]}
          onPointerOver={() => {
            hovered.current = i;
            gsap.to(materials[i].uniforms.uHover, { value: 1, duration: 0.5 });
          }}
          onPointerOut={() => {
            if (hovered.current === i) hovered.current = null;
            gsap.to(materials[i].uniforms.uHover, { value: 0, duration: 0.5 });
          }}
          onClick={handleClick(i)}
        />
      ))}
    </group>
  );
}

interface WorkBeltProps extends BeltProps {
  low?: boolean;
}

export default function WorkBelt({ low = false, ...props }: WorkBeltProps) {
  return (
    <CanvasGuard>
      <Canvas
        dpr={low ? [1, 1.5] : [1, 1.75]}
        camera={{ position: [0, 0, 7], fov: 50 }}
        gl={{
          antialias: true,
          alpha: true,
          powerPreference: "high-performance",
        }}
        style={{ position: "absolute", inset: 0, touchAction: "none" }}
      >
        <Belt {...props} />
      </Canvas>
    </CanvasGuard>
  );
}
