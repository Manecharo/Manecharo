"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { ArrowUpRight } from "lucide-react";
import { gsap } from "@/lib/motion/gsap";
import { Stagger } from "@/components/experience/Reveal";

export interface RowItem {
  id: string;
  slug: string;
  title: string;
  year?: number | string;
  services?: string[];
  imageUrl?: string;
}

interface ProjectRowsProps {
  items: RowItem[];
  /** Inline thumbnails on small screens. */
  showThumbs?: boolean;
  className?: string;
}

/**
 * Editorial index rows with a WebGL-era staple: a floating image
 * preview that chases the cursor and tilts with its velocity.
 */
export default function ProjectRows({
  items,
  showThumbs = true,
  className = "",
}: ProjectRowsProps) {
  const [active, setActive] = useState<number | null>(null);
  const previewRef = useRef<HTMLDivElement>(null);
  const moveX = useRef<((v: number) => void) | null>(null);
  const moveY = useRef<((v: number) => void) | null>(null);
  const lastX = useRef(0);
  const shown = useRef(false);
  const enabled = useRef(false);

  useEffect(() => {
    const el = previewRef.current;
    if (!el) return;
    if (!window.matchMedia("(pointer: fine)").matches) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    enabled.current = true;
    moveX.current = gsap.quickTo(el, "x", { duration: 0.55, ease: "power3.out" });
    moveY.current = gsap.quickTo(el, "y", { duration: 0.55, ease: "power3.out" });
  }, []);

  const handleMove = (e: React.PointerEvent) => {
    if (!enabled.current) return;
    const el = previewRef.current;
    if (!el) return;
    const x = e.clientX + 32;
    const y = e.clientY - 130;
    if (!shown.current) {
      gsap.set(el, { x, y });
    } else {
      moveX.current?.(x);
      moveY.current?.(y);
    }
    const tilt = gsap.utils.clamp(-8, 8, (e.clientX - lastX.current) * 0.22);
    gsap.to(el, { rotation: tilt, duration: 0.5, ease: "power2.out" });
    lastX.current = e.clientX;
  };

  const showPreview = (i: number) => {
    setActive(i);
    if (!enabled.current) return;
    const el = previewRef.current;
    if (!el) return;
    shown.current = true;
    gsap.to(el, { autoAlpha: 1, scale: 1, duration: 0.45, ease: "power3.out" });
  };

  const hidePreview = () => {
    setActive(null);
    if (!enabled.current) return;
    const el = previewRef.current;
    if (!el) return;
    shown.current = false;
    gsap.to(el, { autoAlpha: 0, scale: 0.9, duration: 0.35, ease: "power2.out" });
  };

  return (
    <div
      className={className}
      onPointerMove={handleMove}
      onPointerLeave={hidePreview}
    >
      <Stagger selector="[data-row]" stagger={0.07} y={56}>
        {items.map((item, i) => (
          <Link
            key={item.id}
            data-row
            href={`/work/${item.slug}`}
            data-cursor="view"
            onPointerEnter={() => showPreview(i)}
            onFocus={() => setActive(i)}
            className="group relative block border-t border-bone/10 py-6 last:border-b md:py-9"
          >
            {showThumbs && item.imageUrl && (
              <div className="relative mb-5 aspect-[16/10] w-full overflow-hidden md:hidden">
                <Image
                  src={item.imageUrl}
                  alt=""
                  fill
                  className="object-cover"
                  sizes="100vw"
                />
              </div>
            )}
            <div className="grid grid-cols-[2rem_1fr_auto] items-center gap-x-3 md:grid-cols-[3.5rem_1fr_minmax(0,16rem)_7rem] md:gap-x-8">
              <span className="self-start pt-1.5 font-display text-xs text-bone/35 transition-colors duration-300 group-hover:text-gold md:self-center md:pt-0">
                {String(i + 1).padStart(2, "0")}
              </span>

              <div className="min-w-0">
                <h3 className="break-words font-display text-2xl font-bold uppercase leading-[1.02] tracking-tightest text-bone transition-all duration-500 ease-out-expo group-hover:translate-x-2 group-hover:text-gold md:text-6xl md:leading-none md:group-hover:translate-x-4">
                  {item.title}
                </h3>
              </div>

              <div className="hidden flex-wrap justify-end gap-1.5 md:flex">
                {(item.services ?? []).slice(0, 3).map((service) => (
                  <span
                    key={service}
                    className="border border-bone/15 px-2 py-1 text-[10px] uppercase tracking-wider text-bone/45"
                  >
                    {service.replace(/-/g, " ")}
                  </span>
                ))}
              </div>

              <div className="flex items-center justify-end gap-3">
                {item.year && (
                  <span className="font-display text-sm text-bone/45">
                    {item.year}
                  </span>
                )}
                <ArrowUpRight
                  size={20}
                  className="-translate-x-2 text-gold opacity-0 transition-all duration-300 ease-out-expo group-hover:translate-x-0 group-hover:opacity-100"
                  aria-hidden
                />
              </div>
            </div>
          </Link>
        ))}
      </Stagger>

      {/* Floating preview (fine pointers only) */}
      <div
        ref={previewRef}
        aria-hidden
        className="pointer-events-none invisible fixed left-0 top-0 z-40 hidden aspect-[4/3] w-[22rem] origin-center overflow-hidden opacity-0 will-change-transform md:block xl:w-[26rem]"
      >
        {items.map(
          (item, i) =>
            item.imageUrl && (
              <Image
                key={item.id}
                src={item.imageUrl}
                alt=""
                fill
                sizes="416px"
                className="object-cover transition-opacity duration-500"
                style={{ opacity: active === i ? 1 : 0 }}
              />
            )
        )}
        <div className="absolute bottom-3 left-3 bg-charcoal/80 px-2.5 py-1 font-display text-[10px] font-bold tracking-wide2 text-gold">
          {active !== null ? String(active + 1).padStart(2, "0") : ""}
        </div>
      </div>
    </div>
  );
}
