"use client";

import PageTransition from "@/components/layout/PageTransition";
import { useLanguage } from "@/lib/i18n/LanguageContext";
import FormattedText from "@/components/ui/FormattedText";
import { Search, Sparkles, Hammer, TrendingUp, LucideIcon } from "lucide-react";

const processStepIcons: { key: "understand" | "explore" | "build" | "scale"; icon: LucideIcon; number: string }[] = [
  { key: "understand", icon: Search, number: "01" },
  { key: "explore", icon: Sparkles, number: "02" },
  { key: "build", icon: Hammer, number: "03" },
  { key: "scale", icon: TrendingUp, number: "04" },
];

const clientTypeKeys: ("startups" | "ngos" | "brands" | "political" | "tech" | "entrepreneurs")[] = [
  "startups",
  "ngos",
  "brands",
  "political",
  "tech",
  "entrepreneurs",
];

const toolCategoryData: { key: "design" | "ai" | "dev" | "productivity"; tools: string[] }[] = [
  {
    key: "design",
    tools: ["Figma", "Rhino 3D", "3ds Max", "Blender", "Adobe Creative Suite", "V-Ray", "KeyShot"],
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

export default function CapabilitiesPage() {
  const { t } = useLanguage();

  return (
    <PageTransition>
      <div className="min-h-screen py-24 px-6 bg-white">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <header className="text-center mb-24 max-w-3xl mx-auto">
            <h1 className="text-h1 font-display mb-6">{t.capabilities.title}</h1>
            <p className="text-body text-charcoal/80">
              <FormattedText text={t.capabilities.intro} />
            </p>
          </header>

          {/* Process */}
          <section className="mb-32">
            <h2 className="text-h2 font-display mb-12 text-center">
              {t.capabilities.process}
            </h2>
            <div className="grid md:grid-cols-2 gap-8">
              {processStepIcons.map((step, index) => {
                const Icon = step.icon;
                const stepTranslation = t.capabilities.processSteps[step.key];
                return (
                  <div
                    key={index}
                    className="bg-pure-white p-8 shadow-sm hover:shadow-lg transition-shadow relative"
                  >
                    <div className="absolute top-4 right-4 text-6xl font-display text-gold/10">
                      {step.number}
                    </div>
                    <Icon className="w-12 h-12 text-gold mb-4" />
                    <h3 className="font-display text-2xl mb-3">{stepTranslation.title}</h3>
                    <p className="text-body text-charcoal/70">
                      {stepTranslation.description}
                    </p>
                  </div>
                );
              })}
            </div>
          </section>

          {/* Who I Work With */}
          <section className="mb-32">
            <h2 className="text-h2 font-display mb-12 text-center">
              {t.capabilities.whoIWorkWith}
            </h2>
            <div className="grid md:grid-cols-3 gap-6">
              {clientTypeKeys.map((key, index) => {
                const clientTranslation = t.capabilities.clientTypes[key];
                return (
                  <div
                    key={index}
                    className="bg-pure-white p-6 border-l-4 border-gold"
                  >
                    <h3 className="font-display text-xl mb-2">{clientTranslation.title}</h3>
                    <p className="text-sm text-charcoal/70">
                      {clientTranslation.description}
                    </p>
                  </div>
                );
              })}
            </div>
          </section>

          {/* Tools - Categorized */}
          <section className="mb-32">
            <h2 className="text-h2 font-display mb-12 text-center">
              {t.capabilities.tools}
            </h2>
            <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
              {toolCategoryData.map((category, catIndex) => (
                <div key={catIndex} className="bg-pure-white p-8 shadow-sm">
                  <h3 className="font-display text-xl mb-4 text-navy border-b-2 border-navy pb-2">
                    {t.capabilities.toolCategories[category.key]}
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {category.tools.map((tool, toolIndex) => (
                      <span
                        key={toolIndex}
                        className="px-4 py-2 bg-gray-light text-sm font-medium text-charcoal hover:bg-navy hover:text-white transition-all cursor-default"
                      >
                        {tool}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Not Interested In */}
          <section className="bg-charcoal text-cream p-12 -mx-6">
            <div className="max-w-3xl mx-auto text-center">
              <h2 className="text-h2 font-display mb-6">{t.capabilities.notInterested}</h2>
              <p className="text-body">
                <FormattedText text={t.capabilities.notInterestedText} />
              </p>
            </div>
          </section>
        </div>
      </div>
    </PageTransition>
  );
}
