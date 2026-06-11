"use client";

import { useEffect, useRef } from "react";
import { usePathname } from "next/navigation";
import Lenis from "lenis";
import { gsap, ScrollTrigger } from "@/lib/motion/gsap";

/**
 * Lenis-powered inertial scrolling, synced with GSAP's ticker and
 * ScrollTrigger. Disabled on the CMS/admin routes (they own their
 * scroll containers) and for reduced-motion users.
 */
export default function SmoothScroll() {
  const pathname = usePathname();
  const lenisRef = useRef<Lenis | null>(null);
  const prevPath = useRef<string | null>(null);

  const disabled =
    pathname?.startsWith("/studio") || pathname?.startsWith("/update");

  useEffect(() => {
    if (disabled) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const lenis = new Lenis({
      duration: 1.1,
      easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
      touchMultiplier: 1.4,
    });
    lenisRef.current = lenis;

    lenis.on("scroll", ScrollTrigger.update);
    const tick = (time: number) => lenis.raf(time * 1000);
    gsap.ticker.add(tick);
    gsap.ticker.lagSmoothing(0);

    const stop = () => lenis.stop();
    const start = () => lenis.start();
    window.addEventListener("mer:lockscroll", stop);
    window.addEventListener("mer:unlockscroll", start);

    return () => {
      window.removeEventListener("mer:lockscroll", stop);
      window.removeEventListener("mer:unlockscroll", start);
      gsap.ticker.remove(tick);
      lenis.destroy();
      lenisRef.current = null;
    };
  }, [disabled]);

  // On route change: jump to top and re-measure scroll-driven scenes
  // once the enter transition has finished re-flowing the page.
  useEffect(() => {
    if (prevPath.current !== null && prevPath.current !== pathname) {
      lenisRef.current?.scrollTo(0, { immediate: true });
      window.scrollTo(0, 0);
    }
    prevPath.current = pathname ?? null;
    const id = window.setTimeout(() => ScrollTrigger.refresh(), 850);
    return () => window.clearTimeout(id);
  }, [pathname]);

  return null;
}
