"use client";

import { useLayoutEffect, useRef, useState } from "react";
import Image from "next/image";
import { gsap } from "@/lib/motion/gsap";
import { lockScroll, unlockScroll } from "@/lib/motion/hooks";

const SEEN_KEY = "mer:preloaded";

/**
 * Once-per-session entrance: counter sweep + curtain lift.
 * Skipped entirely for repeat visits and reduced-motion users.
 */
export default function Preloader() {
  const [show, setShow] = useState(true);
  const rootRef = useRef<HTMLDivElement>(null);
  const counterRef = useRef<HTMLSpanElement>(null);
  const markRef = useRef<HTMLDivElement>(null);
  const lineRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    let seen = false;
    try {
      seen = sessionStorage.getItem(SEEN_KEY) === "1";
    } catch {
      seen = true;
    }
    if (seen || reduced) {
      setShow(false);
      return;
    }

    try {
      sessionStorage.setItem(SEEN_KEY, "1");
    } catch {}

    lockScroll();
    const counter = { value: 0 };
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        onComplete: () => {
          unlockScroll();
          setShow(false);
        },
      });

      tl.fromTo(
        markRef.current,
        { autoAlpha: 0, scale: 0.86, rotate: -6 },
        { autoAlpha: 1, scale: 1, rotate: 0, duration: 0.7, ease: "power3.out" }
      )
        .fromTo(
          lineRef.current,
          { scaleX: 0 },
          { scaleX: 1, duration: 1.15, ease: "power2.inOut", transformOrigin: "left center" },
          0.1
        )
        .to(
          counter,
          {
            value: 100,
            duration: 1.15,
            ease: "power2.inOut",
            onUpdate: () => {
              if (counterRef.current) {
                counterRef.current.textContent = String(
                  Math.round(counter.value)
                ).padStart(3, "0");
              }
            },
          },
          0.1
        )
        .to(
          rootRef.current,
          { yPercent: -100, duration: 0.85, ease: "power4.inOut" },
          "+=0.15"
        );
    }, rootRef);

    return () => {
      ctx.revert();
      unlockScroll();
    };
  }, []);

  if (!show) return null;

  return (
    <div
      ref={rootRef}
      aria-hidden
      className="fixed inset-0 z-[110] flex flex-col justify-between bg-charcoal px-6 py-8 md:px-12 md:py-10"
    >
      <div className="flex items-center justify-between">
        <span className="font-display text-label uppercase tracking-wide2 text-bone/50">
          Manuel Echavarria Romero
        </span>
        <span className="font-display text-label uppercase tracking-wide2 text-bone/50">
          Portfolio
        </span>
      </div>

      <div className="flex flex-col items-center gap-6">
        <div ref={markRef} className="relative h-20 w-20 opacity-0 md:h-28 md:w-28">
          <Image
            src="/images/logo/logo_Asvg.svg"
            alt=""
            fill
            priority
            className="object-contain invert"
          />
        </div>
        <div className="h-px w-44 overflow-hidden bg-bone/10 md:w-64">
          <div ref={lineRef} className="h-full w-full origin-left scale-x-0 bg-gold" />
        </div>
      </div>

      <div className="flex items-end justify-between">
        <span className="font-display text-label uppercase tracking-wide2 text-bone/50">
          Designer &amp; Problem Solver
        </span>
        <span
          ref={counterRef}
          className="font-display text-5xl font-bold tabular-nums text-bone md:text-7xl"
        >
          000
        </span>
      </div>
    </div>
  );
}
