"use client";

import { useEffect, useState } from "react";

export function useMediaQuery(query: string, defaultValue = false): boolean {
  const [matches, setMatches] = useState(defaultValue);

  useEffect(() => {
    const mql = window.matchMedia(query);
    const update = () => setMatches(mql.matches);
    update();
    mql.addEventListener("change", update);
    return () => mql.removeEventListener("change", update);
  }, [query]);

  return matches;
}

export const useReducedMotion = () =>
  useMediaQuery("(prefers-reduced-motion: reduce)");

export const useFinePointer = () => useMediaQuery("(pointer: fine)");

export const useIsDesktop = () => useMediaQuery("(min-width: 768px)");

/** Scroll locking that plays nice with Lenis (see SmoothScroll). */
export function lockScroll() {
  if (typeof window === "undefined") return;
  window.dispatchEvent(new CustomEvent("mer:lockscroll"));
  document.documentElement.classList.add("overflow-hidden");
}

export function unlockScroll() {
  if (typeof window === "undefined") return;
  window.dispatchEvent(new CustomEvent("mer:unlockscroll"));
  document.documentElement.classList.remove("overflow-hidden");
}
