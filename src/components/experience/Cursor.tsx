"use client";

import { useEffect, useRef, useState } from "react";
import { gsap } from "@/lib/motion/gsap";
import { useLanguage } from "@/lib/i18n/LanguageContext";

const INTERACTIVE =
  "a, button, [role='button'], [data-cursor], label, summary, input, textarea, select";

type CursorKind = "view" | "drag" | "open";
type Mode = "rest" | "hover" | "badge";

/**
 * Custom cursor: a gold dot with a trailing ring. Elements may set
 * data-cursor="view|drag|open" (+ data-cursor-label) to morph the ring into a
 * labelled gold badge. The label lives in its own element — NOT inside the
 * transform-scaled ring — so its text size is fixed and never overflows the
 * circle (e.g. long words like "Arrastra"). Fine pointers only.
 */
export default function Cursor() {
  const { t } = useLanguage();
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  const labelRef = useRef<HTMLDivElement>(null);
  const modeRef = useRef<Mode>("rest");
  // Only the hover *kind* (or a custom string) is stored; the visible text
  // resolves from live translations at render time so it follows language.
  const [kind, setKind] = useState<CursorKind | null>(null);
  const [custom, setCustom] = useState<string | null>(null);

  useEffect(() => {
    if (!window.matchMedia("(pointer: fine)").matches) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    document.documentElement.classList.add("has-cursor");

    const dot = dotRef.current!;
    const ring = ringRef.current!;
    const label = labelRef.current!;

    const dotX = gsap.quickTo(dot, "x", { duration: 0.12, ease: "power2.out" });
    const dotY = gsap.quickTo(dot, "y", { duration: 0.12, ease: "power2.out" });
    const ringX = gsap.quickTo(ring, "x", { duration: 0.45, ease: "power3.out" });
    const ringY = gsap.quickTo(ring, "y", { duration: 0.45, ease: "power3.out" });
    const labelX = gsap.quickTo(label, "x", { duration: 0.45, ease: "power3.out" });
    const labelY = gsap.quickTo(label, "y", { duration: 0.45, ease: "power3.out" });

    const ringScale = () =>
      modeRef.current === "badge" ? 2.6 : modeRef.current === "hover" ? 1.6 : 1;

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
      labelX(e.clientX);
      labelY(e.clientY);
    };

    const onOver = (e: PointerEvent) => {
      const target = (e.target as HTMLElement).closest?.(INTERACTIVE);
      if (!target) return;
      const el = target as HTMLElement;
      if (el.matches("input, textarea, select")) {
        // Native cursor takes over in form fields.
        modeRef.current = "rest";
        gsap.to([dot, ring, label], { autoAlpha: 0, duration: 0.2 });
        return;
      }
      const k = el.dataset.cursor as CursorKind | undefined;
      const c = el.dataset.cursorLabel || null;
      const hasBadge = !!c || k === "view" || k === "drag" || k === "open";

      if (hasBadge) {
        setKind(k ?? null);
        setCustom(c);
        modeRef.current = "badge";
        gsap.to(ring, { scale: 2.6, duration: 0.45, ease: "back.out(1.6)", overwrite: "auto" });
        gsap.to(dot, { scale: 0, duration: 0.3, overwrite: "auto" });
        gsap.fromTo(
          label,
          { scale: 0.7 },
          { autoAlpha: 1, scale: 1, duration: 0.4, ease: "back.out(1.8)", overwrite: true }
        );
      } else {
        modeRef.current = "hover";
        gsap.to(ring, { scale: 1.6, duration: 0.4, ease: "power3.out", overwrite: "auto" });
        gsap.to(dot, { scale: 0.5, duration: 0.3, overwrite: "auto" });
        gsap.to(label, { autoAlpha: 0, duration: 0.2, overwrite: true });
      }
    };

    const onOut = (e: PointerEvent) => {
      const target = (e.target as HTMLElement).closest?.(INTERACTIVE);
      if (!target) return;
      if ((target as HTMLElement).matches("input, textarea, select")) {
        gsap.to([dot, ring], { autoAlpha: 1, duration: 0.2 });
      }
      modeRef.current = "rest";
      gsap.to(ring, { scale: 1, duration: 0.4, ease: "power3.out", overwrite: "auto" });
      gsap.to(dot, { scale: 1, duration: 0.3, overwrite: "auto" });
      gsap.to(label, {
        autoAlpha: 0,
        duration: 0.2,
        overwrite: true,
        onComplete: () => {
          // Only clear if we haven't entered a new badge in the meantime.
          if (modeRef.current !== "badge") {
            setKind(null);
            setCustom(null);
          }
        },
      });
    };

    const onDown = () =>
      gsap.to(ring, { scale: ringScale() * 0.86, duration: 0.2, overwrite: "auto" });
    const onUp = () =>
      gsap.to(ring, { scale: ringScale(), duration: 0.35, ease: "back.out(3)", overwrite: "auto" });
    const onLeaveDoc = () => {
      visible = false;
      gsap.to([dot, ring, label], { autoAlpha: 0, duration: 0.25 });
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

  const label =
    custom ??
    (kind === "view"
      ? t.xp.view
      : kind === "drag"
        ? t.xp.cursorDrag
        : kind === "open"
          ? t.xp.cursorOpen
          : null);
  const badged = !!label;

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
        className={`pointer-events-none fixed left-0 top-0 z-100 -ml-[22px] -mt-[22px] h-[44px] w-[44px] rounded-full opacity-0 transition-colors duration-300 ${
          badged ? "bg-gold" : "border border-bone/40 mix-blend-difference"
        }`}
      />
      <div
        ref={labelRef}
        aria-hidden
        className="pointer-events-none fixed left-0 top-0 z-100 -ml-[70px] -mt-[7px] w-[140px] text-center opacity-0"
      >
        <span className="font-display text-[10px] font-bold uppercase tracking-[0.16em] text-charcoal">
          {label}
        </span>
      </div>
    </>
  );
}
