"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import dynamic from "next/dynamic";
import { motion } from "framer-motion";
import { ArrowUpRight, LayoutList, Box } from "lucide-react";
import { client, urlFor } from "@/lib/sanity/client";
import { useLanguage } from "@/lib/i18n/LanguageContext";
import { useIsDesktop } from "@/lib/motion/hooks";
import { webglAvailable } from "@/components/three/CanvasGuard";
import type { BeltControls, BeltItem } from "@/components/three/WorkBelt";
import ProjectRows, { RowItem } from "@/components/work/ProjectRows";
import TextReveal from "@/components/experience/TextReveal";
import FormattedText from "@/components/ui/FormattedText";
import { Reveal } from "@/components/experience/Reveal";

const WorkBelt = dynamic(() => import("@/components/three/WorkBelt"), {
  ssr: false,
});

export interface WorkProject {
  _id: string;
  title: string;
  title_es?: string;
  title_it?: string;
  slug: { current: string };
  year: number;
  excerpt?: string;
  excerpt_es?: string;
  excerpt_it?: string;
  services?: string[];
  mainImage?: any;
}

type Mode = "spatial" | "list";
const MODE_KEY = "mer:workmode";

interface LocalItem extends RowItem {
  beltImageUrl?: string;
}

interface WorkExperienceProps {
  /** Server-fetched projects. When omitted, falls back to a client fetch. */
  initialProjects?: WorkProject[];
}

/**
 * Serve WebGL textures through the same-origin Next image optimizer:
 * no cross-origin canvas restrictions, optimized formats, edge-cached.
 */
const textureUrl = (sanityUrl: string, width: 640 | 1080) =>
  `/_next/image?url=${encodeURIComponent(sanityUrl)}&w=${width}&q=80`;

export default function WorkExperience({ initialProjects }: WorkExperienceProps) {
  const { t, language } = useLanguage();
  const router = useRouter();
  const isDesktop = useIsDesktop();
  const [projects, setProjects] = useState<WorkProject[]>(initialProjects ?? []);
  const [loading, setLoading] = useState(!initialProjects);
  const [mode, setMode] = useState<Mode | null>(null);
  const [canSpatial, setCanSpatial] = useState(false);
  const [active, setActive] = useState(0);
  const controlsRef = useRef<BeltControls | null>(null);

  // Fallback path only — normally the server provides the data.
  useEffect(() => {
    if (initialProjects) return;
    async function fetchProjects() {
      if (!client) {
        setProjects([]);
        setLoading(false);
        return;
      }
      try {
        const data = await client.fetch(
          `*[_type == "project" && defined(publishedAt)] | order(order asc, year desc) {
            _id,
            title,
            title_es,
            title_it,
            slug,
            year,
            excerpt,
            excerpt_es,
            excerpt_it,
            services,
            mainImage
          }`
        );
        setProjects(data);
      } catch (error) {
        console.error("Error fetching projects:", error);
      } finally {
        setLoading(false);
      }
    }
    fetchProjects();
  }, [initialProjects]);

  // Decide the starting mode: spatial where the hardware allows it,
  // the editorial list everywhere else. The visitor can always switch.
  useEffect(() => {
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const spatialOk = webglAvailable() && !reduced;
    setCanSpatial(spatialOk);
    let stored: string | null = null;
    try {
      stored = localStorage.getItem(MODE_KEY);
    } catch {}
    const desktop = window.matchMedia("(min-width: 768px)").matches;
    if (stored === "list") setMode("list");
    else if (stored === "spatial" && spatialOk) setMode("spatial");
    else setMode(spatialOk && desktop ? "spatial" : "list");
  }, []);

  const switchMode = (next: Mode) => {
    setMode(next);
    try {
      localStorage.setItem(MODE_KEY, next);
    } catch {}
  };

  const items: LocalItem[] = useMemo(
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

  // The belt wraps infinitely; with few projects we repeat the reel
  // so the loop stays dense. Indices map back via modulo.
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
    if (mode !== "spatial") return;
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

  /* ---------- shared bits ---------- */

  const modeToggle =
    canSpatial && items.length > 0 ? (
      <div className="pointer-events-auto flex items-center gap-1 border border-bone/15 bg-charcoal/70 p-1 backdrop-blur-md">
        {(
          [
            { value: "spatial", label: t.xp.spatial, Icon: Box },
            { value: "list", label: t.xp.list, Icon: LayoutList },
          ] as const
        ).map(({ value, label, Icon }) => (
          <button
            key={value}
            onClick={() => switchMode(value)}
            aria-pressed={mode === value}
            className={`flex items-center gap-2 px-3.5 py-2 font-display text-[11px] font-bold uppercase tracking-wide2 transition-colors duration-300 ${
              mode === value
                ? "bg-gold text-charcoal"
                : "text-bone/50 hover:text-bone"
            }`}
          >
            <Icon size={13} aria-hidden />
            {label}
          </button>
        ))}
      </div>
    ) : null;

  /* ---------- states ---------- */

  if (loading || mode === null) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-charcoal">
        <div className="h-9 w-9 animate-spin rounded-full border-2 border-gold border-t-transparent" />
      </div>
    );
  }

  if (items.length === 0) {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center bg-charcoal px-6 text-center">
        <h1 className="mb-6 font-display text-h1 font-bold uppercase tracking-tightest text-bone">
          {t.work.title}
        </h1>
        <p className="mb-8 text-body text-bone/55">
          No projects yet. Add some via the admin panel.
        </p>
        <Link
          href="/update"
          className="inline-block bg-gold px-6 py-3 font-display text-sm font-bold uppercase tracking-wide2 text-charcoal transition-transform duration-200 hover:scale-105"
        >
          Go to Admin Panel
        </Link>
      </div>
    );
  }

  /* ---------- spatial mode ---------- */

  if (mode === "spatial") {
    return (
      <section
        className="relative h-[100svh] w-full overflow-hidden bg-charcoal outline-none"
        role="application"
        aria-label={`${t.work.title} — ${t.xp.drag}`}
        tabIndex={0}
        onKeyDown={handleKeys}
        data-cursor="drag"
      >
        <WorkBelt
          items={beltItems}
          low={!isDesktop}
          controlsRef={controlsRef}
          onActiveChange={(i) => setActive(i % items.length)}
          onSelect={(i) => router.push(`/work/${beltItems[i].slug}`)}
        />

        {/* Top header */}
        <div className="pointer-events-none absolute inset-x-0 top-24 z-10 flex flex-col items-center gap-2 md:top-20">
          <p className="font-display text-label uppercase tracking-wide2 text-gold">
            Portfolio
          </p>
          <h1 className="font-display text-2xl font-bold uppercase tracking-tightest text-bone md:text-3xl">
            {t.work.title}
          </h1>
        </div>

        {/* Active project */}
        <div className="pointer-events-none absolute inset-x-0 bottom-24 z-10 flex flex-col items-center px-6 text-center md:bottom-24">
          {activeItem && (
              <motion.div
                key={activeItem.id + active}
                initial={{ y: 26, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.32, ease: [0.16, 1, 0.3, 1] }}
                className="flex flex-col items-center"
              >
                <button
                  onClick={() => router.push(`/work/${activeItem.slug}`)}
                  data-cursor="open"
                  className="pointer-events-auto group"
                >
                  <span className="block font-display text-3xl font-bold uppercase leading-none tracking-tightest text-bone transition-colors duration-300 group-hover:text-gold md:text-6xl">
                    {activeItem.title}
                  </span>
                  <span className="mt-3 inline-flex items-center gap-1.5 font-display text-[10px] font-bold uppercase tracking-wide2 text-gold/90">
                    {t.xp.open}
                    <ArrowUpRight size={12} aria-hidden />
                  </span>
                </button>
                <div className="mt-2 flex flex-wrap items-center justify-center gap-x-3 gap-y-1 text-xs text-bone/50">
                  {activeItem.year && <span>{activeItem.year}</span>}
                  {(activeItem.services ?? []).slice(0, 3).map((s) => (
                    <span key={s} className="uppercase tracking-wider">
                      {s.replace(/-/g, " ")}
                    </span>
                  ))}
                </div>
              </motion.div>
          )}
          <p className="mt-5 font-display text-[10px] uppercase tracking-wide2 text-bone/35">
            ←&nbsp;&nbsp;{t.xp.drag}&nbsp;&nbsp;→
          </p>
        </div>

        {/* Counter */}
        <div className="absolute bottom-8 left-6 z-10 font-display text-xs tracking-wide2 text-bone/50 md:left-12">
          <span className="text-gold">
            {String((active % items.length) + 1).padStart(2, "0")}
          </span>
          {" / "}
          {String(items.length).padStart(2, "0")}
        </div>

        {/* Mode toggle */}
        <div className="absolute bottom-8 right-6 z-20 md:right-12">{modeToggle}</div>

        {/* Progress */}
        <div className="absolute inset-x-0 bottom-0 z-10 h-[2px] bg-bone/10">
          <div
            className="h-full bg-gold transition-all duration-500 ease-out-expo"
            style={{
              width: `${(((active % items.length) + 1) / items.length) * 100}%`,
            }}
          />
        </div>
      </section>
    );
  }

  /* ---------- list mode ---------- */

  return (
    <div className="min-h-screen bg-charcoal px-6 pb-28 pt-32 md:px-12 md:pt-40">
      <header className="mb-14 md:mb-20">
        <div className="flex flex-wrap items-start justify-between gap-6">
          <div className="max-w-3xl">
            <Reveal>
              <p className="mb-4 font-display text-label uppercase tracking-wide2 text-gold">
                Portfolio
              </p>
            </Reveal>
            <TextReveal
              text={t.work.title}
              as="h1"
              className="font-display text-display font-bold uppercase leading-[0.95] tracking-tightest text-bone"
            />
            <Reveal delay={0.25}>
              <p className="mt-6 max-w-2xl whitespace-pre-line text-base leading-relaxed text-bone/65 md:text-lg">
                <FormattedText text={t.work.subtitle} />
              </p>
            </Reveal>
          </div>
          <Reveal delay={0.3} className="md:pt-4">
            {modeToggle}
          </Reveal>
        </div>
      </header>

      <ProjectRows items={items} />
    </div>
  );
}
