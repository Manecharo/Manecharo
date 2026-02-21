"use client";

import Image from "next/image";
import PageTransition from "@/components/layout/PageTransition";
import { useLanguage } from "@/lib/i18n/LanguageContext";
import FormattedText from "@/components/ui/FormattedText";
import {
  Lightbulb,
  Code,
  Palette,
  Users,
  Globe,
  Rocket,
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
        <div className="min-h-screen py-24 px-6 bg-white">
          <div className="max-w-6xl mx-auto">
            <div className="grid md:grid-cols-2 gap-12 mb-24 items-center">
              <div className="relative aspect-[3/4] md:order-2 overflow-hidden shadow-xl bg-charcoal/10 animate-pulse"></div>
              <div className="md:order-1 space-y-4">
                <div className="h-8 w-24 bg-charcoal/10 animate-pulse rounded"></div>
                <div className="h-12 w-3/4 bg-charcoal/10 animate-pulse rounded"></div>
                <div className="space-y-3">
                  <div className="h-4 w-full bg-charcoal/10 animate-pulse rounded"></div>
                  <div className="h-4 w-full bg-charcoal/10 animate-pulse rounded"></div>
                  <div className="h-4 w-2/3 bg-charcoal/10 animate-pulse rounded"></div>
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
      <div className="min-h-screen py-24 px-6 bg-white">
        <div className="max-w-6xl mx-auto">
          {/* Hero Section */}
          <div className="grid md:grid-cols-2 gap-12 mb-24 items-center">
            {/* Portrait */}
            <div className="relative aspect-[3/4] md:order-2 overflow-hidden shadow-xl">
              <Image
                src="/images/about/portrait.jpg"
                alt="Manuel Echavarria Romero"
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 50vw"
                priority
              />
            </div>

            {/* Intro */}
            <div className="md:order-1">
              <div className="inline-block mb-4 px-4 py-2 bg-red/10 text-red text-sm font-display uppercase tracking-wider">
                {t.about.badge}
              </div>
              <h1 className="text-h1 font-display mb-6 leading-tight">
                {t.about.title}
              </h1>
              <div className="space-y-4 text-body text-charcoal/80 whitespace-pre-line">
                <p><FormattedText text={t.about.bio} /></p>
              </div>
            </div>
          </div>

          {/* What I Do */}
          <section className="mb-24">
            <h2 className="text-h2 font-display mb-12 text-center">
              {t.about.whatIDo}
            </h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {skillKeys.map((skill) => {
                const Icon = skill.icon;
                const skillData = t.about.skills[skill.key];
                return (
                  <div
                    key={skill.key}
                    className="bg-pure-white p-6 shadow-sm hover:shadow-lg transition-shadow"
                  >
                    <Icon className="w-10 h-10 text-gold mb-4" />
                    <h3 className="font-display text-xl mb-2">{skillData.title}</h3>
                    <p className="text-charcoal/70">{skillData.description}</p>
                  </div>
                );
              })}
            </div>
          </section>

          {/* Languages */}
          <section className="mb-24">
            <h2 className="text-h2 font-display mb-8 text-center">{t.about.languages}</h2>
            <div className="max-w-3xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-6">
              {languageKeys.map((langKey) => {
                const langData = t.about.languageList[langKey];
                return (
                  <div key={langKey} className="text-center">
                    <div className="text-2xl font-display mb-2">{langData.name}</div>
                    <div className="text-sm text-charcoal/60">{langData.level}</div>
                  </div>
                );
              })}
            </div>
            <p className="text-center text-charcoal/60 mt-6 text-sm">
              {t.about.turkishNote}
            </p>
          </section>

          {/* Education */}
          <section>
            <h2 className="text-h2 font-display mb-12 text-center">
              {t.about.education}
            </h2>
            <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
              {educationOrder.map((eduKey) => {
                const edu = t.about.educationList[eduKey];
                const link = educationLinks[eduKey];
                return (
                  <a
                    key={eduKey}
                    href={link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="bg-pure-white p-6 shadow-sm border-l-4 border-gold hover:shadow-lg transition-all duration-200 hover:-translate-y-1"
                  >
                    <h3 className="font-display text-lg mb-2">{edu.degree}</h3>
                    <p className="text-charcoal/70 mb-1">{edu.school}</p>
                    <p className="text-sm text-charcoal/50">{edu.year}</p>
                  </a>
                );
              })}
            </div>
          </section>
        </div>
      </div>
    </PageTransition>
  );
}