"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { urlFor } from "@/lib/sanity/client";
import { useLanguage } from "@/lib/i18n/LanguageContext";
import TextReveal from "@/components/experience/TextReveal";
import Marquee from "@/components/experience/Marquee";
import Magnetic from "@/components/experience/Magnetic";
import { Reveal } from "@/components/experience/Reveal";
import ProjectRows, { RowItem } from "@/components/work/ProjectRows";

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

export default function FeaturedProjectsClient({
  projects,
}: FeaturedProjectsClientProps) {
  const { t, language } = useLanguage();

  // The disciplines line doubles as marquee content, kept localized.
  const disciplines = t.work.subtitle
    .split("\n")[0]
    .replace(/\*\*/g, "")
    .split(". ")
    .map((s) => s.replace(/\.$/, "").trim())
    .filter(Boolean);

  const items: RowItem[] = projects.map((project) => ({
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
  }));

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

      <div className="px-6 md:px-12">
        {/* Header */}
        <div className="mb-14 flex flex-wrap items-end justify-between gap-6 md:mb-20">
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

        {items.length === 0 ? (
          <div className="border border-bone/10 px-6 py-20 text-center">
            <p className="text-body text-bone/55">
              Projects will appear here once added via the admin panel.
            </p>
            <Link
              href="/update"
              className="mt-6 inline-block bg-gold px-6 py-3 font-display text-sm font-bold uppercase tracking-wide2 text-charcoal transition-transform duration-200 hover:scale-105"
            >
              Go to Admin Panel
            </Link>
          </div>
        ) : (
          <>
            <ProjectRows items={items} />

            <div className="mt-16 flex justify-center md:mt-20">
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
          </>
        )}
      </div>
    </section>
  );
}
