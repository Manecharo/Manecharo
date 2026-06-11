"use client";

import { useEffect, useRef, useState } from "react";
import { gsap } from "@/lib/motion/gsap";
import { useLanguage } from "@/lib/i18n/LanguageContext";

const INTERACTIVE =
  "a, button, [role='button'], [data-cursor], label, summary, input, textarea, select";

type CursorKind = "view" | "drag" | "open";

interface Badge {
  kind: CursorKind | null;
  custom: string | null;
}

/**
 * Custom cursor: a gold dot with a trailing ring.
 * Elements may set data-cursor="view|drag|open" (+ data-cursor-label)
 * to morph the ring into a labelled badge. Fine pointers only.
 */
export default function Cursor() {
  const { t } = useLanguage();
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  // Only the *kind* is captured on hover; the visible text resolves from
  // the live translations at render time, so it follows language switches.
  const [badge, setBadge] = useState<Badge | null>(null);

  useEffect(() => {
    if (!window.matchMedia("(pointer: fine)").matches) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    document.documentElement.classList.add("has-cursor");

    const dot = dotRef.current!;
    const ring = ringRef.current!;

    const dotX = gsap.quickTo(dot, "x", { duration: 0.12, ease: "power2.out" });
    const dotY = gsap.quickTo(dot, "y", { duration: 0.12, ease: "power2.out" });
    const ringX = gsap.quickTo(ring, "x", { duration: 0.45, ease: "power3.out" });
    const ringY = gsap.quickTo(ring, "y", { duration: 0.45, ease: "power3.out" });

    let visible = false;

    const onMove = (e: PointerEvent) => {
      if (!visible) {
        visible = true;
        gsap.to([dot, ring], { autoAlpha: 1, duration: 0.3 });
      }
      dotX(e.clientX);
      dotY(e.clientY);
      ringX(e.clientX);
      ringY(e.clientY);
    };

    const onOver = (e: PointerEvent) => {
      const target = (e.target as HTMLElement).closest?.(INTERACTIVE);
      if (!target) return;
      const el = target as HTMLElement;
      if (el.matches("input, textarea, select")) {
        // Native cursor takes over in form fields.
        gsap.to([dot, ring], { autoAlpha: 0, duration: 0.2 });
        return;
      }
      const kind = el.dataset.cursor as CursorKind | undefined;
      const custom = el.dataset.cursorLabel || null;
      const hasBadge =
        !!custom || kind === "view" || kind === "drag" || kind === "open";
      setBadge(hasBadge ? { kind: kind ?? null, custom } : null);
      gsap.to(ring, {
        scale: hasBadge ? 2.6 : 1.6,
        duration: 0.4,
        ease: "back.out(2)",
      });
      gsap.to(dot, { scale: hasBadge ? 0 : 0.5, duration: 0.3 });
    };

    const onOut = (e: PointerEvent) => {
      const target = (e.target as HTMLElement).closest?.(INTERACTIVE);
      if (!target) return;
      if ((target as HTMLElement).matches("input, textarea, select")) {
        gsap.to([dot, ring], { autoAlpha: 1, duration: 0.2 });
      }
      setBadge(null);
      gsap.to(ring, { scale: 1, duration: 0.4, ease: "power3.out" });
      gsap.to(dot, { scale: 1, duration: 0.3 });
    };

    const onDown = () => gsap.to(ring, { scale: 0.85, duration: 0.2 });
    const onUp = () => gsap.to(ring, { scale: 1, duration: 0.35, ease: "back.out(3)" });
    const onLeaveDoc = () => {
      visible = false;
      gsap.to([dot, ring], { autoAlpha: 0, duration: 0.25 });
    };

    window.addEventListener("pointermove", onMove, { passive: true });
    document.addEventListener("pointerover", onOver);
    document.addEventListener("pointerout", onOut);
    window.addEventListener("pointerdown", onDown);
    window.addEventListener("pointerup", onUp);
    document.documentElement.addEventListener("pointerleave", onLeaveDoc);

    return () => {
      document.documentElement.classList.remove("has-cursor");
      window.removeEventListener("pointermove", onMove);
      document.removeEventListener("pointerover", onOver);
      document.removeEventListener("pointerout", onOut);
      window.removeEventListener("pointerdown", onDown);
      window.removeEventListener("pointerup", onUp);
      document.documentElement.removeEventListener("pointerleave", onLeaveDoc);
    };
  }, []);

  const label = badge
    ? badge.custom ??
      (badge.kind === "view"
        ? t.xp.view
        : badge.kind === "drag"
          ? t.xp.cursorDrag
          : badge.kind === "open"
            ? t.xp.cursorOpen
            : null)
    : null;

  return (
    <>
      <div
        ref={dotRef}
        aria-hidden
        className="pointer-events-none fixed left-0 top-0 z-100 -ml-[3px] -mt-[3px] h-[6px] w-[6px] rounded-full bg-gold opacity-0"
      />
      <div
        ref={ringRef}
        aria-hidden
        className={`pointer-events-none fixed left-0 top-0 z-100 -ml-[22px] -mt-[22px] flex h-[44px] w-[44px] items-center justify-center rounded-full opacity-0 transition-colors duration-200 ${
          label
            ? "bg-gold text-charcoal"
            : "border border-bone/40 mix-blend-difference"
        }`}
      >
        {label && (
          <span className="font-display text-[9px] font-bold uppercase tracking-[0.2em]">
            {label}
          </span>
        )}
      </div>
    </>
  );
}
