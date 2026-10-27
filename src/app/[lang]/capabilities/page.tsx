"use client";

import { useLayoutEffect, useRef } from "react";
import PageTransition from "@/components/layout/PageTransition";
import { useLanguage } from "@/lib/i18n/LanguageContext";
import FormattedText from "@/components/ui/FormattedText";
import TextReveal from "@/components/experience/TextReveal";
import { Reveal, Stagger } from "@/components/experience/Reveal";
import { gsap } from "@/lib/motion/gsap";
import { Search, Sparkles, Hammer, TrendingUp, LucideIcon } from "lucide-react";

const processStepIcons: {
  key: "understand" | "explore" | "build" | "scale";
  icon: LucideIcon;
  number: string;
}[] = [
  { key: "understand", icon: Search, number: "01" },
  { key: "explore", icon: Sparkles, number: "02" },
  { key: "build", icon: Hammer, number: "03" },
  { key: "scale", icon: TrendingUp, number: "04" },
];

const clientTypeKeys: (
  | "startups"
  | "ngos"
  | "brands"
  | "political"
  | "tech"
  | "entrepreneurs"
)[] = ["startups", "ngos", "brands", "political", "tech", "entrepreneurs"];

const toolCategoryData: {
  key: "design" | "ai" | "dev" | "productivity";
  tools: string[];
}[] = [
  {
    key: "design",
    tools: [
      "Figma",
      "Rhino 3D",
      "3ds Max",
      "Blender",
      "Adobe Creative Suite",
      "V-Ray",
      "KeyShot",
    ],
  },
  {
    key: "ai",
    tools: ["AI Video Tools", "AI Code Assistants", "AI Agents", "ChatGPT", "Midjourney"],
  },
  {
    key: "dev",
    tools: ["Webflow", "Framer", "HTML/CSS", "JavaScript", "Python"],
  },
  {
    key: "productivity",
    tools: ["Microsoft Office Suite", "Miro", "Notion", "Slack", "Teams"],
  },
];

/** Pinned horizontal scroll through the four process steps (desktop). */
function ProcessSection() {
  const { t } = useLanguage();
  const wrapRef = useRef<HTMLElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const wrap = wrapRef.current;
    const track = trackRef.current;
    if (!wrap || !track) return;

    const mm = gsap.matchMedia();
    mm.add(
      "(min-width: 768px) and (prefers-reduced-motion: no-preference)",
      () => {
        const distance = () => track.scrollWidth - window.innerWidth + 96;
        const tween = gsap.to(track, {
          x: () => -distance(),
          ease: "none",
          scrollTrigger: {
            trigger: wrap,
            start: "top top",
            end: () => `+=${distance()}`,
            pin: true,
            scrub: 0.65,
            anticipatePin: 1,
            invalidateOnRefresh: true,
          },
        });
        return () => {
          tween.scrollTrigger?.kill();
          tween.kill();
        };
      }
    );
    return () => mm.revert();
  }, []);

  return (
    <section ref={wrapRef} className="relative mb-24 overflow-hidden md:mb-0">
      <div className="md:flex md:h-screen md:flex-col md:justify-center">
        <div className="mb-10 px-6 md:mb-14 md:px-12">
          <Reveal>
            <h2 className="font-display text-h1 font-bold uppercase tracking-tightest text-bone">
              {t.capabilities.process}
            </h2>
          </Reveal>
        </div>

        <div
          ref={trackRef}
          className="flex flex-col gap-6 px-6 will-change-transform md:flex-row md:gap-8 md:px-12 md:pr-24"
        >
          {processStepIcons.map((step) => {
            const Icon = step.icon;
            const stepTranslation = t.capabilities.processSteps[step.key];
            return (
              <div
                key={step.key}
                className="group relative shrink-0 border border-bone/10 bg-coal-800 p-8 transition-colors duration-300 hover:border-gold/40 md:w-[min(58vw,560px)] md:p-12"
              >
                <span
                  aria-hidden
                  className="text-stroke-gold absolute right-6 top-5 font-display text-7xl font-bold opacity-40 md:text-8xl"
                >
                  {step.number}
                </span>
                <Icon className="mb-8 h-10 w-10 text-gold md:mb-12 md:h-12 md:w-12" />
                <h3 className="mb-4 font-display text-3xl font-bold uppercase tracking-tightest text-bone md:text-4xl">
                  {stepTranslation.title}
                </h3>
                <p className="max-w-md text-sm leading-relaxed text-bone/60 md:text-base">
                  {stepTranslation.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

export default function CapabilitiesPage() {
  const { t } = useLanguage();

  return (
    <PageTransition>
      <div className="min-h-screen overflow-hidden bg-charcoal pt-32 text-bone md:pt-40">
        {/* Header */}
        <header className="mb-20 px-6 md:mb-28 md:px-12">
          <Reveal>
            <p className="mb-5 font-display text-label uppercase tracking-wide2 text-gold">
              Capabilities
            </p>
          </Reveal>
          <TextReveal
            text={t.capabilities.title}
            as="h1"
            className="mb-8 font-display text-display font-bold uppercase leading-[0.95] tracking-tightest text-bone"
          />
          <Reveal delay={0.25}>
            <p className="max-w-2xl text-base leading-relaxed text-bone/65 [&_strong]:font-semibold [&_strong]:text-bone md:text-lg">
              <FormattedText text={t.capabilities.intro} />
            </p>
          </Reveal>
        </header>

        {/* Process — pinned horizontal journey on desktop */}
        <ProcessSection />

        {/* Who I Work With */}
        <section className="mb-24 px-6 pt-24 md:mb-32 md:px-12 md:pt-32">
          <Reveal>
            <h2 className="mb-12 font-display text-h1 font-bold uppercase tracking-tightest text-bone md:mb-16">
              {t.capabilities.whoIWorkWith}
            </h2>
          </Reveal>
          <Stagger
            selector="[data-client]"
            className="grid gap-px border border-bone/10 bg-bone/10 md:grid-cols-2 lg:grid-cols-3"
          >
            {clientTypeKeys.map((key, index) => {
              const clientTranslation = t.capabilities.clientTypes[key];
              return (
                <div
                  key={index}
                  data-client
                  className="group bg-charcoal p-7 transition-colors duration-300 hover:bg-coal-700 md:p-9"
                >
                  <div className="mb-6 h-[3px] w-8 bg-gold transition-all duration-500 ease-out-expo group-hover:w-14" />
                  <h3 className="mb-2 font-display text-xl font-bold text-bone">
                    {clientTranslation.title}
                  </h3>
                  <p className="text-sm leading-relaxed text-bone/55">
                    {clientTranslation.description}
                  </p>
                </div>
              );
            })}
          </Stagger>
        </section>

        {/* Tools */}
        <section className="mb-24 px-6 md:mb-32 md:px-12">
          <Reveal>
            <h2 className="mb-12 font-display text-h1 font-bold uppercase tracking-tightest text-bone md:mb-16">
              {t.capabilities.tools}
            </h2>
          </Reveal>
          <Stagger selector="[data-tools]" className="grid gap-10 md:grid-cols-2 md:gap-14">
            {toolCategoryData.map((category, catIndex) => (
              <div key={catIndex} data-tools>
                <h3 className="mb-5 inline-block border-b-2 border-gold pb-2 font-display text-lg font-bold uppercase tracking-tightest text-bone">
                  {t.capabilities.toolCategories[category.key]}
                </h3>
                <div className="flex flex-wrap gap-2">
                  {category.tools.map((tool, toolIndex) => (
                    <span
                      key={toolIndex}
                      className="cursor-default border border-bone/15 px-4 py-2 text-sm font-medium text-bone/70 transition-all duration-300 hover:border-gold hover:bg-gold hover:text-charcoal"
                    >
                      {tool}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </Stagger>
        </section>

        {/* Not Interested In — the red room */}
        <section className="bg-red px-6 py-24 text-charcoal md:px-12 md:py-32">
          <div className="mx-auto max-w-4xl text-center">
            <TextReveal
              text={t.capabilities.notInterested}
              as="h2"
              trigger="scroll"
              className="mb-8 font-display text-h1 font-bold uppercase tracking-tightest"
            />
            <Reveal delay={0.15}>
              <p className="text-lg leading-relaxed text-charcoal/85 [&_strong]:font-bold [&_strong]:text-charcoal md:text-2xl md:leading-snug">
                <FormattedText text={t.capabilities.notInterestedText} />
              </p>
            </Reveal>
          </div>
        </section>
      </div>
    </PageTransition>
  );
}
