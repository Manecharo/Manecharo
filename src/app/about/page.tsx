"use client";

import Image from "next/image";
import PageTransition from "@/components/layout/PageTransition";
import { useLanguage } from "@/lib/i18n/LanguageContext";
import FormattedText from "@/components/ui/FormattedText";
import TextReveal from "@/components/experience/TextReveal";
import Marquee from "@/components/experience/Marquee";
import { Parallax, Reveal, Stagger } from "@/components/experience/Reveal";
import {
  Lightbulb,
  Code,
  Palette,
  Users,
  Globe,
  Rocket,
  ArrowUpRight,
} from "lucide-react";

const skillKeys = [
  { key: "strategicThinking", icon: Lightbulb },
  { key: "designExcellence", icon: Palette },
  { key: "technicalFluency", icon: Code },
  { key: "userResearch", icon: Users },
  { key: "crossCultural", icon: Globe },
  { key: "startupMindset", icon: Rocket },
] as const;

const languageKeys = ["spanish", "english", "italian", "french"] as const;

// Education ordered chronologically (most recent first)
const educationLinks = {
  mit: "https://mit-online.getsmarter.com/presentations/lp/mit-sloan-making-ai-work-online-course/",
  harvard: "https://harvardonline.harvard.edu/course/higher-education-teaching",
  masters: "https://www.scuoladesign.com/courses/product-design/",
  bachelor: "https://www.ied.edu/courses/milan/three-years-diploma/product-design",
} as const;

const educationOrder = ["mit", "harvard", "masters", "bachelor"] as const;

export default function AboutPage() {
  const { t, mounted } = useLanguage();

  // Show loading skeleton during hydration to prevent mismatch
  if (!mounted) {
    return (
      <PageTransition>
        <div className="min-h-screen bg-charcoal px-6 py-32 md:px-12">
          <div className="mx-auto max-w-6xl">
            <div className="grid items-center gap-12 md:grid-cols-2">
              <div className="aspect-video w-full max-w-[560px] animate-pulse bg-bone/5 md:order-2" />
              <div className="space-y-4 md:order-1">
                <div className="h-8 w-24 animate-pulse rounded bg-bone/5" />
                <div className="h-12 w-3/4 animate-pulse rounded bg-bone/5" />
                <div className="space-y-3">
                  <div className="h-4 w-full animate-pulse rounded bg-bone/5" />
                  <div className="h-4 w-full animate-pulse rounded bg-bone/5" />
                  <div className="h-4 w-2/3 animate-pulse rounded bg-bone/5" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </PageTransition>
    );
  }

  return (
    <PageTransition>
      <div className="min-h-screen overflow-hidden bg-charcoal pb-28 pt-32 text-bone md:pt-40">
        {/* Hero */}
        <div className="px-6 md:px-12">
          <div className="mb-24 grid items-start gap-12 md:mb-32 md:grid-cols-12">
            {/* Intro */}
            <div className="md:col-span-7 lg:col-span-7">
              <Reveal>
                <p className="mb-5 font-display text-label uppercase tracking-wide2 text-red">
                  {t.about.badge}
                </p>
              </Reveal>
              <TextReveal
                text={t.about.title}
                as="h1"
                className="mb-10 font-display text-display font-bold uppercase leading-[0.95] tracking-tightest text-bone"
              />
              <Reveal delay={0.3}>
                <div className="max-w-xl whitespace-pre-line text-base leading-relaxed text-bone/65 [&_strong]:font-semibold [&_strong]:text-bone md:text-lg">
                  <p>
                    <FormattedText text={t.about.bio} />
                  </p>
                </div>
              </Reveal>
            </div>

            {/* Portrait — landscape studio shot, capped so the 1200px-wide
                source stays crisp instead of being upscaled into a tall frame */}
            <div className="relative md:col-span-5 lg:col-span-5 md:self-center">
              <Reveal delay={0.2}>
                <div className="relative mx-auto max-w-[560px]">
                  <div
                    aria-hidden
                    className="absolute -left-4 -top-4 h-full w-full border border-gold/50"
                  />
                  <Parallax
                    speed={6}
                    className="relative aspect-video"
                    innerClassName="absolute -inset-y-[12%] inset-x-0"
                  >
                    <Image
                      src="/images/about/manuel2.jpeg"
                      alt="Manuel Echavarria Romero - Product Designer & Design Strategist"
                      fill
                      className="object-cover object-center"
                      sizes="(max-width: 768px) 100vw, 560px"
                      priority
                    />
                  </Parallax>
                  <div className="absolute -bottom-5 -right-3 bg-red px-4 py-2 font-display text-[10px] font-bold uppercase tracking-wide2 text-bone md:-right-6">
                    Kuala Lumpur, MY
                  </div>
                </div>
              </Reveal>
            </div>
          </div>
        </div>

        {/* Countries marquee */}
        <Marquee
          duration={26}
          className="mb-24 border-y border-bone/10 py-5 md:mb-32 md:py-6"
        >
          <span className="mx-4 flex items-center gap-8 font-display text-3xl font-bold uppercase tracking-tightest md:text-5xl">
            {t.xp.marquee.split("·").map((country, i) => (
              <span key={i} className="flex items-center gap-8">
                <span className={i % 2 === 0 ? "text-stroke" : "text-bone/85"}>
                  {country.trim()}
                </span>
                <span aria-hidden className="text-2xl text-red md:text-3xl">
                  ✦
                </span>
              </span>
            ))}
          </span>
        </Marquee>

        <div className="px-6 md:px-12">
          {/* What I Do */}
          <section className="mb-24 md:mb-32">
            <Reveal>
              <h2 className="mb-12 font-display text-h1 font-bold uppercase tracking-tightest text-bone md:mb-16">
                {t.about.whatIDo}
              </h2>
            </Reveal>
            <Stagger
              selector="[data-skill]"
              className="grid gap-px border border-bone/10 bg-bone/10 md:grid-cols-2 lg:grid-cols-3"
            >
              {skillKeys.map((skill, i) => {
                const Icon = skill.icon;
                const skillData = t.about.skills[skill.key];
                return (
                  <div
                    key={skill.key}
                    data-skill
                    className="group relative bg-charcoal p-7 transition-colors duration-300 hover:bg-coal-700 md:p-9"
                  >
                    <div className="mb-8 flex items-start justify-between">
                      <Icon className="h-8 w-8 text-gold transition-transform duration-500 ease-out-expo group-hover:scale-110" />
                      <span className="font-display text-xs text-bone/30">
                        0{i + 1}
                      </span>
                    </div>
                    <h3 className="mb-2 font-display text-xl font-bold text-bone">
                      {skillData.title}
                    </h3>
                    <p className="text-sm text-bone/55">{skillData.description}</p>
                  </div>
                );
              })}
            </Stagger>
          </section>

          {/* Languages */}
          <section className="mb-24 md:mb-32">
            <Reveal>
              <h2 className="mb-12 font-display text-h1 font-bold uppercase tracking-tightest text-bone md:mb-16">
                {t.about.languages}
              </h2>
            </Reveal>
            <Stagger
              selector="[data-lang]"
              className="grid grid-cols-2 gap-x-6 gap-y-10 md:grid-cols-4"
            >
              {languageKeys.map((langKey) => {
                const langData = t.about.languageList[langKey];
                return (
                  <div key={langKey} data-lang className="border-t border-bone/15 pt-5">
                    <div className="mb-1 font-display text-2xl font-bold text-bone md:text-3xl">
                      {langData.name}
                    </div>
                    <div className="font-display text-label uppercase tracking-wide2 text-gold">
                      {langData.level}
                    </div>
                  </div>
                );
              })}
            </Stagger>
            <Reveal delay={0.2}>
              <p className="mt-8 text-sm text-bone/45">{t.about.turkishNote}</p>
            </Reveal>
          </section>

          {/* Education */}
          <section>
            <Reveal>
              <h2 className="mb-12 font-display text-h1 font-bold uppercase tracking-tightest text-bone md:mb-16">
                {t.about.education}
              </h2>
            </Reveal>
            <Stagger selector="[data-edu]" stagger={0.08}>
              {educationOrder.map((eduKey) => {
                const edu = t.about.educationList[eduKey];
                const link = educationLinks[eduKey];
                return (
                  <a
                    key={eduKey}
                    data-edu
                    href={link}
                    target="_blank"
                    rel="noopener noreferrer"
                    data-cursor="open"
                    className="group flex items-center justify-between gap-6 border-t border-bone/10 py-7 transition-colors duration-300 last:border-b hover:bg-coal-800 md:px-4"
                  >
                    <div>
                      <h3 className="mb-1 font-display text-lg font-bold text-bone transition-colors group-hover:text-gold md:text-xl">
                        {edu.degree}
                      </h3>
                      <p className="text-sm text-bone/55">{edu.school}</p>
                    </div>
                    <div className="flex shrink-0 items-center gap-4">
                      <span className="font-display text-sm text-bone/45">
                        {edu.year}
                      </span>
                      <ArrowUpRight
                        size={18}
                        className="text-gold opacity-0 transition-all duration-300 ease-out-expo group-hover:translate-x-0.5 group-hover:opacity-100"
                        aria-hidden
                      />
                    </div>
                  </a>
                );
              })}
            </Stagger>
          </section>
        </div>
      </div>
    </PageTransition>
  );
}
