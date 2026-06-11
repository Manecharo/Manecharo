"use client";

import { Fragment, useLayoutEffect, useRef } from "react";
import { gsap } from "@/lib/motion/gsap";

type Tag = "h1" | "h2" | "h3" | "p" | "span" | "div";

interface TextRevealProps {
  text: string;
  as?: Tag;
  className?: string;
  mode?: "words" | "chars";
  trigger?: "mount" | "scroll";
  delay?: number;
  stagger?: number;
  duration?: number;
}

/**
 * Masked typographic reveal: words/chars rise out of overflow-hidden
 * line masks. Units render visible (SEO / no-JS safe) and are hidden
 * by GSAP in a pre-paint layout effect, so there is no flash either way.
 * Re-splits and replays when `text` changes (language switch).
 */
export default function TextReveal({
  text,
  as = "span",
  className = "",
  mode = "words",
  trigger = "mount",
  delay = 0,
  stagger = 0.045,
  duration = 1,
}: TextRevealProps) {
  const ref = useRef<HTMLElement | null>(null);
  const Comp = as as any;

  useLayoutEffect(() => {
    const el = ref.current;
    if (!el) return;
    const units = el.querySelectorAll<HTMLElement>("[data-unit]");
    if (!units.length) return;

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      return;
    }

    const ctx = gsap.context(() => {
      gsap.fromTo(
        units,
        { yPercent: 115 },
        {
          yPercent: 0,
          duration,
          delay,
          stagger,
          ease: "power4.out",
          overwrite: "auto",
          clearProps: "transform",
          ...(trigger === "scroll"
            ? {
                scrollTrigger: {
                  trigger: el,
                  start: "top 88%",
                  once: true,
                },
              }
            : {}),
        }
      );
    }, el);

    return () => ctx.revert();
  }, [text, mode, trigger, delay, stagger, duration]);

  const tokens = text.split(/(\s+)/);

  return (
    <Comp ref={ref} className={className} aria-label={text}>
      {tokens.map((token, i) => {
        if (/\n/.test(token)) return <br key={i} />;
        if (/^\s+$/.test(token)) return <Fragment key={i}> </Fragment>;
        if (!token) return null;
        return (
          <span
            key={`${i}-${token}`}
            aria-hidden
            className="inline-flex overflow-hidden pb-[0.08em] -mb-[0.08em] align-bottom"
          >
            {mode === "chars" ? (
              token.split("").map((char, j) => (
                <span
                  key={j}
                  data-unit
                  className="inline-block will-change-transform"
                >
                  {char}
                </span>
              ))
            ) : (
              <span data-unit className="inline-block will-change-transform">
                {token}
              </span>
            )}
          </span>
        );
      })}
    </Comp>
  );
}
