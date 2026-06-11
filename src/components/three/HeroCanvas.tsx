"use client";

import { useEffect, useMemo, useRef } from "react";
import * as THREE from "three";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { gsap } from "@/lib/motion/gsap";
import { CanvasGuard } from "./CanvasGuard";

/* Ashima/IQ simplex noise, public domain */
const NOISE_GLSL = /* glsl */ `
vec3 mod289(vec3 x) { return x - floor(x * (1.0 / 289.0)) * 289.0; }
vec4 mod289(vec4 x) { return x - floor(x * (1.0 / 289.0)) * 289.0; }
vec4 permute(vec4 x) { return mod289(((x * 34.0) + 1.0) * x); }
vec4 taylorInvSqrt(vec4 r) { return 1.79284291400159 - 0.85373472095314 * r; }
float snoise(vec3 v) {
  const vec2 C = vec2(1.0 / 6.0, 1.0 / 3.0);
  const vec4 D = vec4(0.0, 0.5, 1.0, 2.0);
  vec3 i = floor(v + dot(v, C.yyy));
  vec3 x0 = v - i + dot(i, C.xxx);
  vec3 g = step(x0.yzx, x0.xyz);
  vec3 l = 1.0 - g;
  vec3 i1 = min(g.xyz, l.zxy);
  vec3 i2 = max(g.xyz, l.zxy);
  vec3 x1 = x0 - i1 + C.xxx;
  vec3 x2 = x0 - i2 + C.yyy;
  vec3 x3 = x0 - D.yyy;
  i = mod289(i);
  vec4 p = permute(permute(permute(
      i.z + vec4(0.0, i1.z, i2.z, 1.0))
      + i.y + vec4(0.0, i1.y, i2.y, 1.0))
      + i.x + vec4(0.0, i1.x, i2.x, 1.0));
  float n_ = 0.142857142857;
  vec3 ns = n_ * D.wyz - D.xzx;
  vec4 j = p - 49.0 * floor(p * ns.z * ns.z);
  vec4 x_ = floor(j * ns.z);
  vec4 y_ = floor(j - 7.0 * x_);
  vec4 x = x_ * ns.x + ns.yyyy;
  vec4 y = y_ * ns.x + ns.yyyy;
  vec4 h = 1.0 - abs(x) - abs(y);
  vec4 b0 = vec4(x.xy, y.xy);
  vec4 b1 = vec4(x.zw, y.zw);
  vec4 s0 = floor(b0) * 2.0 + 1.0;
  vec4 s1 = floor(b1) * 2.0 + 1.0;
  vec4 sh = -step(h, vec4(0.0));
  vec4 a0 = b0.xzyw + s0.xzyw * sh.xxyy;
  vec4 a1 = b1.xzyw + s1.xzyw * sh.zzww;
  vec3 p0 = vec3(a0.xy, h.x);
  vec3 p1 = vec3(a0.zw, h.y);
  vec3 p2 = vec3(a1.xy, h.z);
  vec3 p3 = vec3(a1.zw, h.w);
  vec4 norm = taylorInvSqrt(vec4(dot(p0, p0), dot(p1, p1), dot(p2, p2), dot(p3, p3)));
  p0 *= norm.x; p1 *= norm.y; p2 *= norm.z; p3 *= norm.w;
  vec4 m = max(0.6 - vec4(dot(x0, x0), dot(x1, x1), dot(x2, x2), dot(x3, x3)), 0.0);
  m = m * m;
  return 42.0 * dot(m * m, vec4(dot(p0, x0), dot(p1, x1), dot(p2, x2), dot(p3, x3)));
}
`;

const VERTEX = /* glsl */ `
${NOISE_GLSL}
uniform float uTime;
uniform float uIntro;
uniform float uDpr;
uniform vec2 uPointer;
varying float vAlpha;
varying vec3 vColor;
attribute float aRand;

void main() {
  vec3 pos = position;

  float swell = snoise(vec3(pos.x * 0.16, pos.y * 0.16, uTime * 0.10));
  float ripple = snoise(vec3(pos.x * 0.45 + 31.7, pos.y * 0.45, uTime * 0.16));
  pos.z += swell * 1.7 + ripple * 0.45;

  float d = distance(pos.xy, uPointer);
  float influence = smoothstep(3.4, 0.0, d);
  pos.z += influence * 1.9;

  // entrance: field assembles from depth
  pos.z -= (1.0 - uIntro) * (4.0 + aRand * 6.0);

  vec4 mv = modelViewMatrix * vec4(pos, 1.0);
  gl_Position = projectionMatrix * mv;

  float crest = smoothstep(-1.4, 1.9, pos.z);
  gl_PointSize = (1.5 + crest * 2.2 + influence * 2.6) * uDpr * (10.0 / -mv.z) * 1.6;

  vec3 navy = vec3(0.20, 0.30, 0.36);
  vec3 boneC = vec3(0.92, 0.92, 0.91);
  vec3 goldC = vec3(0.934, 0.784, 0.306);
  vec3 redC  = vec3(0.863, 0.357, 0.286);

  vec3 c = mix(navy, boneC, crest * 0.8);
  c = mix(c, goldC, smoothstep(0.62, 1.0, crest) * 0.95);
  c = mix(c, redC, step(0.987, aRand) * 0.8);
  c += influence * 0.25;
  vColor = c;

  vAlpha = (0.16 + 0.84 * crest) * uIntro;
}
`;

const FRAGMENT = /* glsl */ `
varying float vAlpha;
varying vec3 vColor;
void main() {
  float d = length(gl_PointCoord - 0.5);
  float a = smoothstep(0.5, 0.12, d) * vAlpha;
  if (a < 0.012) discard;
  gl_FragColor = vec4(vColor, a);
}
`;

function ParticleField({ density }: { density: number }) {
  const pointsRef = useRef<THREE.Points>(null);
  const pointer = useRef({ x: 0, y: 0 });
  const { viewport, gl } = useThree();

  const { geometry, uniforms } = useMemo(() => {
    const cols = Math.round(150 * density);
    const rows = Math.round(90 * density);
    const width = 30;
    const height = 18;
    const count = cols * rows;
    const positions = new Float32Array(count * 3);
    const rand = new Float32Array(count);
    let i = 0;
    for (let cx = 0; cx < cols; cx++) {
      for (let cy = 0; cy < rows; cy++) {
        const jx = (Math.random() - 0.5) * 0.12;
        const jy = (Math.random() - 0.5) * 0.12;
        positions[i * 3] = (cx / (cols - 1) - 0.5) * width + jx;
        positions[i * 3 + 1] = (cy / (rows - 1) - 0.5) * height + jy;
        positions[i * 3 + 2] = 0;
        rand[i] = Math.random();
        i++;
      }
    }
    const geometry = new THREE.BufferGeometry();
    geometry.setAttribute("position", new THREE.BufferAttribute(positions, 3));
    geometry.setAttribute("aRand", new THREE.BufferAttribute(rand, 1));

    const uniforms = {
      uTime: { value: 0 },
      uIntro: { value: 0 },
      uDpr: { value: 1 },
      uPointer: { value: new THREE.Vector2(0, -50) },
    };
    return { geometry, uniforms };
  }, [density]);

  useEffect(() => {
    uniforms.uDpr.value = gl.getPixelRatio();
    const tween = gsap.to(uniforms.uIntro, {
      value: 1,
      duration: 2.2,
      delay: 0.25,
      ease: "power2.out",
    });
    return () => {
      tween.kill();
    };
  }, [uniforms, gl]);

  useEffect(() => {
    const onMove = (e: PointerEvent) => {
      pointer.current.x = (e.clientX / window.innerWidth) * 2 - 1;
      pointer.current.y = -((e.clientY / window.innerHeight) * 2 - 1);
    };
    window.addEventListener("pointermove", onMove, { passive: true });
    return () => window.removeEventListener("pointermove", onMove);
  }, []);

  useFrame((state, delta) => {
    if (document.hidden) return;
    uniforms.uTime.value += Math.min(delta, 0.05);

    // pointer in world units, eased
    const targetX = pointer.current.x * (viewport.width / 2);
    const targetY = pointer.current.y * (viewport.height / 2);
    const p = uniforms.uPointer.value;
    p.x += (targetX - p.x) * 0.07;
    p.y += (targetY - p.y) * 0.07;

    // scroll: the field bows away as you leave the hero
    const progress = Math.min(window.scrollY / window.innerHeight, 1.2);
    const pts = pointsRef.current;
    if (pts) {
      pts.rotation.x = -progress * 0.55;
      pts.position.y = progress * 3.2;
    }

    // gentle camera sway
    state.camera.position.x += (pointer.current.x * 0.55 - state.camera.position.x) * 0.04;
    state.camera.position.y += (pointer.current.y * 0.3 - state.camera.position.y) * 0.04;
    state.camera.lookAt(0, 0, 0);
  });

  return (
    <points ref={pointsRef} geometry={geometry}>
      <shaderMaterial
        vertexShader={VERTEX}
        fragmentShader={FRAGMENT}
        uniforms={uniforms}
        transparent
        depthWrite={false}
        blending={THREE.AdditiveBlending}
      />
    </points>
  );
}

interface HeroCanvasProps {
  /** 1 on desktop, lower on mobile. */
  density?: number;
  active?: boolean;
}

export default function HeroCanvas({ density = 1, active = true }: HeroCanvasProps) {
  return (
    <CanvasGuard>
      <Canvas
        dpr={[1, 1.75]}
        frameloop={active ? "always" : "never"}
        camera={{ position: [0, 0, 9], fov: 55 }}
        gl={{
          antialias: false,
          alpha: true,
          powerPreference: "high-performance",
        }}
        style={{ position: "absolute", inset: 0 }}
        aria-hidden
      >
        <ParticleField density={density} />
      </Canvas>
    </CanvasGuard>
  );
}
