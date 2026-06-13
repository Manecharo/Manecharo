"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import dynamic from "next/dynamic";
import { ArrowRight, ArrowDown } from "lucide-react";
import { useLanguage } from "@/lib/i18n/LanguageContext";
import { useIsDesktop, useReducedMotion } from "@/lib/motion/hooks";
import { gsap } from "@/lib/motion/gsap";
import { webglAvailable } from "@/components/three/CanvasGuard";
import TextReveal from "@/components/experience/TextReveal";
import Magnetic from "@/components/experience/Magnetic";

const HeroCanvas = dynamic(() => import("@/components/three/HeroCanvas"), {
  ssr: false,
});

// Cap the name so it never overflows short/ultra-wide viewports (which would
// clip the CTAs). min() of: width-driven vw, height-driven vh, and a hard rem.
const NAME_SIZE = "block text-[13.5vw] md:text-[min(10.5vw,18vh,10.5rem)]";

// Idle threshold before the hero settles into its cinematic state.
const IDLE_MS = 10000;

export default function Hero() {
  const { t } = useLanguage();
  const reduced = useReducedMotion();
  const isDesktop = useIsDesktop();
  const sectionRef = useRef<HTMLElement>(null);
  const nameRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const inViewRef = useRef(true);
  const [canvasActive, setCanvasActive] = useState(true);
  const [webgl, setWebgl] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [cinematic, setCinematic] = useState(false);

  useEffect(() => {
    setWebgl(webglAvailable());
    setMounted(true);
  }, []);

  // Pause the GPU when the hero leaves the viewport
  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([entry]) => {
        inViewRef.current = entry.isIntersecting;
        setCanvasActive(entry.isIntersecting);
      },
      { threshold: 0 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  // Subtle pointer parallax on the name block
  useEffect(() => {
    const el = nameRef.current;
    if (!el || reduced) return;
    if (!window.matchMedia("(pointer: fine)").matches) return;
    const xTo = gsap.quickTo(el, "x", { duration: 1.2, ease: "power3.out" });
    const yTo = gsap.quickTo(el, "y", { duration: 1.2, ease: "power3.out" });
    const onMove = (e: PointerEvent) => {
      const nx = (e.clientX / window.innerWidth) * 2 - 1;
      const ny = (e.clientY / window.innerHeight) * 2 - 1;
      xTo(nx * -14);
      yTo(ny * -10);
    };
    window.addEventListener("pointermove", onMove, { passive: true });
    return () => window.removeEventListener("pointermove", onMove);
  }, [reduced]);

  const showCanvas = webgl && !reduced;
  const showVideo = mounted && !reduced;

  // After IDLE_MS without interaction the hero dims its UI and lets the film
  // play full-strength — a cinematic rest state. Any input snaps it back.
  useEffect(() => {
    if (reduced) return;
    let last = Date.now();
    const onActivity = () => {
      last = Date.now();
      setCinematic(false); // no-op when already false — React bails out
    };
    const events = ["pointermove", "pointerdown", "wheel", "keydown", "touchstart", "scroll"];
    events.forEach((e) =>
      window.addEventListener(e, onActivity, { passive: true })
    );
    const id = window.setInterval(() => {
      if (inViewRef.current && Date.now() - last > IDLE_MS) setCinematic(true);
    }, 1000);
    return () => {
      window.clearInterval(id);
      events.forEach((e) => window.removeEventListener(e, onActivity));
    };
  }, [reduced]);

  // The video breathes with the section: paused whenever the hero is offscreen.
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;
    if (canvasActive) video.play().catch(() => {});
    else video.pause();
  }, [canvasActive, showVideo]);

  return (
    <section
      ref={sectionRef}
      className="relative h-[100svh] w-full overflow-hidden bg-charcoal"
    >
      {/* Film layer: the reel runs graded-down beneath the particle field, then
          rises to full strength in the cinematic rest state */}
      {showVideo && (
        <>
          <video
            ref={videoRef}
            autoPlay
            loop
            muted
            playsInline
            poster="/videos/hero-poster.svg"
            aria-hidden
            className="absolute inset-0 h-full w-full object-cover"
            style={{
              opacity: cinematic ? 1 : 0.65,
              filter: cinematic
                ? "saturate(0.95) contrast(1.06) brightness(0.95)"
                : "saturate(0.7) contrast(1.05) brightness(0.55)",
              transition: "opacity 1.4s ease, filter 1.4s ease",
            }}
          >
            <source src="/videos/hero-bg.mp4" type="video/mp4" />
          </video>
          {/* Charcoal wash so particles + type read on top; clears for cinema */}
          <div
            aria-hidden
            className={`absolute inset-0 bg-charcoal/35 transition-opacity duration-[1200ms] ease-out ${
              cinematic ? "opacity-0" : "opacity-100"
            }`}
          />
        </>
      )}

      {/* WebGL particle field / static fallback — recedes in cinematic rest */}
      <div
        className={`absolute inset-0 transition-opacity duration-[1200ms] ease-out ${
          cinematic ? "opacity-25" : "opacity-100"
        }`}
      >
        {showCanvas ? (
          <HeroCanvas density={isDesktop ? 1 : 0.5} active={canvasActive} />
        ) : (
          !showVideo && (
            <div
              aria-hidden
              className="absolute inset-0"
              style={{
                background:
                  "radial-gradient(120% 90% at 70% 20%, rgba(51,77,92,0.55) 0%, rgba(10,10,10,0) 55%), radial-gradient(80% 60% at 20% 85%, rgba(238,200,78,0.12) 0%, rgba(10,10,10,0) 60%)",
              }}
            />
          )
        )}
      </div>

      {/* Vignette to seat the typography */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 bg-gradient-to-b from-charcoal/45 via-transparent to-charcoal/85"
      />

      {/* Cinematic letterbox bars */}
      {showVideo && (
        <>
          <div
            aria-hidden
            className={`pointer-events-none absolute inset-x-0 top-0 z-20 bg-charcoal transition-all duration-[1200ms] ease-out-expo ${
              cinematic ? "h-[7vh]" : "h-0"
            }`}
          />
          <div
            aria-hidden
            className={`pointer-events-none absolute inset-x-0 bottom-0 z-20 bg-charcoal transition-all duration-[1200ms] ease-out-expo ${
              cinematic ? "h-[7vh]" : "h-0"
            }`}
          />
        </>
      )}

      {/* Content */}
      <div
        className={`pointer-events-none relative z-10 h-full px-6 pb-8 pt-28 transition-opacity duration-1000 ease-out md:px-12 md:pb-12 md:pt-32 ${
          cinematic ? "opacity-0" : "opacity-100"
        }`}
      >
        <div className="mx-auto flex h-full w-full max-w-[1800px] flex-col justify-between">
          {/* Eyebrow */}
          <div className="flex items-center gap-4">
            <span className="h-px w-10 bg-gold md:w-16" aria-hidden />
            <TextReveal
              text={t.hero.subtitle}
              as="p"
              delay={0.35}
              className="font-display text-label uppercase tracking-wide2 text-gold"
            />
          </div>

          {/* Name */}
          <div ref={nameRef} className="will-change-transform">
            <h1
              aria-label="Manuel Echavarria Romero"
              className="font-display font-bold uppercase leading-[0.92] tracking-tightest text-bone"
            >
              <TextReveal
                text="MANUEL"
                as="span"
                mode="chars"
                delay={0.5}
                stagger={0.05}
                className={NAME_SIZE}
              />
              <TextReveal
                text="ECHAVARRIA"
                as="span"
                mode="chars"
                delay={0.72}
                stagger={0.04}
                className={`text-stroke ${NAME_SIZE}`}
              />
              <TextReveal
                text="ROMERO"
                as="span"
                mode="chars"
                delay={0.95}
                stagger={0.05}
                className={NAME_SIZE}
              />
            </h1>

            <div className="mt-6 flex justify-start md:mt-8 md:justify-end">
              <TextReveal
                text={t.hero.tagline}
                as="p"
                delay={1.35}
                stagger={0.012}
                className="max-w-md text-base leading-snug text-bone/85 md:text-right md:text-xl"
              />
            </div>
          </div>

          {/* Bottom bar */}
          <div className="flex items-end justify-between gap-6">
            <p className="hidden max-w-xs whitespace-pre-line text-xs leading-relaxed text-bone/55 md:block lg:text-sm">
              {t.hero.stats}
            </p>

            <div className="pointer-events-auto flex w-full flex-col gap-3 sm:w-auto sm:flex-row sm:gap-4">
              <Magnetic>
                <Link
                  href="/work"
                  data-cursor="view"
                  className="group flex items-center justify-center gap-3 bg-gold px-7 py-4 font-display text-sm font-bold uppercase tracking-wide2 text-charcoal transition-colors duration-300 hover:bg-bone"
                >
                  {t.hero.ctaWork}
                  <ArrowRight
                    size={16}
                    className="transition-transform duration-300 ease-out-expo group-hover:translate-x-1.5"
                  />
                </Link>
              </Magnetic>
              <Magnetic>
                <Link
                  href="/contact"
                  className="flex items-center justify-center gap-3 border border-bone/25 px-7 py-4 font-display text-sm font-bold uppercase tracking-wide2 text-bone transition-colors duration-300 hover:border-gold hover:text-gold"
                >
                  {t.hero.ctaContact}
                </Link>
              </Magnetic>
            </div>

            <div className="hidden flex-col items-center gap-3 md:flex">
              <span className="font-display text-[10px] uppercase tracking-wide2 text-bone/50">
                {t.xp.scroll}
              </span>
              <div className="scroll-cue h-12 w-px bg-bone/15" aria-hidden />
              <ArrowDown size={12} className="text-gold" aria-hidden />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
