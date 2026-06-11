"use client";

import { useEffect, useLayoutEffect, useMemo, useRef, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import dynamic from "next/dynamic";
import { motion } from "framer-motion";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import { urlFor } from "@/lib/sanity/client";
import { useLanguage } from "@/lib/i18n/LanguageContext";
import { useIsDesktop } from "@/lib/motion/hooks";
import { webglAvailable } from "@/components/three/CanvasGuard";
import type { BeltControls, BeltItem } from "@/components/three/WorkBelt";
import TextReveal from "@/components/experience/TextReveal";
import Marquee from "@/components/experience/Marquee";
import Magnetic from "@/components/experience/Magnetic";
import { Reveal } from "@/components/experience/Reveal";
import ProjectRows, { RowItem } from "@/components/work/ProjectRows";

const WorkBelt = dynamic(() => import("@/components/three/WorkBelt"), {
  ssr: false,
});

interface Project {
  _id: string;
  title: string;
  title_es?: string;
  title_it?: string;
  slug: { current: string };
  year?: number;
  excerpt?: string;
  excerpt_es?: string;
  excerpt_it?: string;
  services?: string[];
  mainImage?: any;
}

interface FeaturedProjectsClientProps {
  projects: Project[];
}

interface FeaturedItem extends RowItem {
  beltImageUrl?: string;
}

/** Same-origin texture URLs via the Next image optimizer (see WorkExperience). */
const textureUrl = (sanityUrl: string, width: 640 | 1080) =>
  `/_next/image?url=${encodeURIComponent(sanityUrl)}&w=${width}&q=80`;

export default function FeaturedProjectsClient({
  projects,
}: FeaturedProjectsClientProps) {
  const { t, language } = useLanguage();
  const router = useRouter();
  const isDesktop = useIsDesktop();
  const stageRef = useRef<HTMLDivElement>(null);
  const controlsRef = useRef<BeltControls | null>(null);
  const [canSpatial, setCanSpatial] = useState<boolean | null>(null);
  const [stageActive, setStageActive] = useState(false);
  const [active, setActive] = useState(0);

  // Decide before first paint so the rows never flash beneath the belt.
  useLayoutEffect(() => {
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    setCanSpatial(webglAvailable() && !reduced);
  }, []);

  // Wake the canvas (and fire the belt entrance) when the stage is in view.
  useEffect(() => {
    const el = stageRef.current;
    if (!el || !canSpatial) return;
    const io = new IntersectionObserver(
      ([entry]) => setStageActive(entry.isIntersecting),
      { threshold: 0.15 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, [canSpatial]);

  // The disciplines line doubles as marquee content, kept localized.
  const disciplines = t.work.subtitle
    .split("\n")[0]
    .replace(/\*\*/g, "")
    .split(". ")
    .map((s) => s.replace(/\.$/, "").trim())
    .filter(Boolean);

  const items: FeaturedItem[] = useMemo(
    () =>
      projects.map((project) => ({
        id: project._id,
        slug: project.slug.current,
        title:
          language === "es"
            ? project.title_es || project.title
            : language === "it"
              ? project.title_it || project.title
              : project.title,
        year: project.year,
        services: project.services,
        imageUrl: project.mainImage
          ? urlFor(project.mainImage).width(720).height(540).fit("crop").url()
          : undefined,
        beltImageUrl: project.mainImage
          ? textureUrl(
              urlFor(project.mainImage)
                .width(isDesktop ? 1024 : 640)
                .height(isDesktop ? 768 : 480)
                .fit("crop")
                .url(),
              isDesktop ? 1080 : 640
            )
          : undefined,
      })),
    [projects, language, isDesktop]
  );

  // Repeat the reel so the infinite wrap stays dense with few projects.
  const beltItems: BeltItem[] = useMemo(() => {
    if (!items.length) return [];
    const repeats = Math.max(1, Math.ceil(6 / items.length));
    return Array.from({ length: items.length * repeats }, (_, i) => {
      const src = items[i % items.length];
      return {
        id: `${src.id}-${i}`,
        slug: src.slug,
        title: src.title,
        imageUrl: src.beltImageUrl,
      };
    });
  }, [items]);

  const activeItem = items.length ? items[active % items.length] : null;

  const handleKeys = (e: React.KeyboardEvent) => {
    if (e.key === "ArrowRight") {
      e.preventDefault();
      controlsRef.current?.step(1);
    } else if (e.key === "ArrowLeft") {
      e.preventDefault();
      controlsRef.current?.step(-1);
    } else if ((e.key === "Enter" || e.key === " ") && activeItem) {
      e.preventDefault();
      router.push(`/work/${activeItem.slug}`);
    }
  };

  return (
    <section className="relative overflow-hidden bg-charcoal pb-28 pt-20 md:pb-40 md:pt-24">
      {/* Disciplines marquee */}
      <Marquee
        duration={32}
        className="mb-20 border-y border-bone/10 py-5 md:mb-28 md:py-7"
      >
        {disciplines.map((d) => (
          <span
            key={d}
            className="mx-5 flex items-center gap-10 font-display text-3xl font-bold uppercase tracking-tightest text-bone/85 md:text-5xl"
          >
            <span>{d}</span>
            <span aria-hidden className="text-2xl text-gold md:text-3xl">
              ✦
            </span>
          </span>
        ))}
      </Marquee>

      {/* Header */}
      <div className="px-6 md:px-12">
        <div className="mb-12 flex flex-wrap items-end justify-between gap-6 md:mb-14">
          <div>
            <Reveal>
              <p className="mb-4 font-display text-label uppercase tracking-wide2 text-gold">
                {String(items.length).padStart(2, "0")} — {t.nav.work}
              </p>
            </Reveal>
            <TextReveal
              text={t.xp.featuredTitle}
              as="h2"
              trigger="scroll"
              className="font-display text-display font-bold uppercase leading-[0.95] tracking-tightest text-bone"
            />
          </div>
          <Reveal delay={0.2}>
            <p className="max-w-xs text-sm leading-relaxed text-bone/55">
              {t.xp.featuredSub}
            </p>
          </Reveal>
        </div>
      </div>

      {items.length === 0 ? (
        <div className="px-6 md:px-12">
          <div className="border border-bone/10 px-6 py-20 text-center">
            <p className="text-body text-bone/55">{t.xp.emptyFeatured}</p>
            <Link
              href="/update"
              className="mt-6 inline-block bg-gold px-6 py-3 font-display text-sm font-bold uppercase tracking-wide2 text-charcoal transition-transform duration-200 hover:scale-105"
            >
              {t.xp.adminCta}
            </Link>
          </div>
        </div>
      ) : canSpatial ? (
        /* Spatial stage — the same belt as /work, tamed for a scroll flow:
           no wheel hijack, vertical touch keeps scrolling the page. */
        <div
          ref={stageRef}
          role="region"
          aria-label={`${t.xp.featuredTitle} — ${t.xp.drag}`}
          tabIndex={0}
          onKeyDown={handleKeys}
          data-cursor="drag"
          className="relative h-[62vh] w-full overflow-hidden outline-none md:h-[72vh]"
        >
          <WorkBelt
            items={beltItems}
            low={!isDesktop}
            active={stageActive}
            enableWheel={false}
            edgeFade={1}
            touchAction="pan-y"
            controlsRef={controlsRef}
            onActiveChange={(i) => setActive(i % items.length)}
            onSelect={(i) => router.push(`/work/${beltItems[i].slug}`)}
          />

          {/* Seat the canvas into the page */}
          <div
            aria-hidden
            className="pointer-events-none absolute inset-x-0 top-0 z-[5] h-14 bg-gradient-to-b from-charcoal to-transparent"
          />
          <div
            aria-hidden
            className="pointer-events-none absolute inset-x-0 bottom-0 z-[5] h-24 bg-gradient-to-t from-charcoal to-transparent"
          />
          <div
            aria-hidden
            className="pointer-events-none absolute inset-y-0 left-0 z-[5] w-28 bg-gradient-to-r from-charcoal to-transparent md:w-56"
          />
          <div
            aria-hidden
            className="pointer-events-none absolute inset-y-0 right-0 z-[5] w-28 bg-gradient-to-l from-charcoal to-transparent md:w-56"
          />

          {/* Active project */}
          <div className="pointer-events-none absolute inset-x-0 bottom-6 z-10 flex flex-col items-center px-6 text-center md:bottom-8">
            {activeItem && (
              <motion.div
                key={activeItem.id + active}
                initial={{ y: 22, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.32, ease: [0.16, 1, 0.3, 1] }}
                className="flex flex-col items-center"
              >
                <button
                  onClick={() => router.push(`/work/${activeItem.slug}`)}
                  data-cursor="open"
                  className="pointer-events-auto group"
                >
                  <span className="block font-display text-2xl font-bold uppercase leading-none tracking-tightest text-bone transition-colors duration-300 group-hover:text-gold md:text-4xl">
                    {activeItem.title}
                  </span>
                  <span className="mt-2.5 inline-flex items-center gap-1.5 font-display text-[10px] font-bold uppercase tracking-wide2 text-gold/90">
                    {t.xp.open}
                    <ArrowUpRight size={12} aria-hidden />
                  </span>
                </button>
              </motion.div>
            )}
            <p className="mt-4 font-display text-[10px] uppercase tracking-wide2 text-bone/35">
              ←&nbsp;&nbsp;{t.xp.drag}&nbsp;&nbsp;→
            </p>
          </div>

          {/* Counter */}
          <div className="pointer-events-none absolute bottom-6 left-6 z-10 hidden font-display text-xs tracking-wide2 text-bone/50 md:left-12 md:block">
            <span className="text-gold">
              {String((active % items.length) + 1).padStart(2, "0")}
            </span>
            {" / "}
            {String(items.length).padStart(2, "0")}
          </div>
        </div>
      ) : canSpatial === false ? (
        <div className="px-6 md:px-12">
          <ProjectRows items={items} />
        </div>
      ) : (
        /* Deciding (first paint): reserve the stage so nothing jumps */
        <div className="h-[62vh] w-full md:h-[72vh]" aria-hidden />
      )}

      {items.length > 0 && (
        <div className="mt-14 flex justify-center md:mt-16">
          <Magnetic>
            <Link
              href="/work"
              data-cursor="view"
              className="group inline-flex items-center gap-4 border border-bone/25 px-9 py-5 font-display text-sm font-bold uppercase tracking-wide2 text-bone transition-colors duration-300 hover:border-gold hover:bg-gold hover:text-charcoal"
            >
              {t.xp.viewAll}
              <ArrowRight
                size={17}
                className="transition-transform duration-300 ease-out-expo group-hover:translate-x-1.5"
              />
            </Link>
          </Magnetic>
        </div>
      )}
    </section>
  );
}
