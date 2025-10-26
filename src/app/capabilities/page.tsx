"use client";

import PageTransition from "@/components/layout/PageTransition";
import { useLanguage } from "@/lib/i18n/LanguageContext";
import FormattedText from "@/components/ui/FormattedText";
import { Search, Sparkles, Hammer, TrendingUp } from "lucide-react";

const processSteps = [
  {
    icon: Search,
    number: "01",
    title: "Understand",
    description:
      "Deep research. User immersion. Stakeholder interviews. I don&apos;t start designing until I truly understand the problem. Not the symptom—the root cause.",
  },
  {
    icon: Sparkles,
    number: "02",
    title: "Explore",
    description:
      "Rapid iteration. Divergent thinking. No attachment to first ideas. I sketch, prototype, test, and throw away. The best solution rarely shows up first.",
  },
  {
    icon: Hammer,
    number: "03",
    title: "Build",
    description:
      "3D modeling. High-fidelity prototypes. User testing. Pixel-perfect execution. I don&apos;t just design it—I make it real enough to test with real people.",
  },
  {
    icon: TrendingUp,
    number: "04",
    title: "Scale",
    description:
      "Systems thinking. Documentation. Team enablement. A good design should work without me. I build systems that teams can run with.",
  },
];

const clientTypes = [
  {
    title: "Startups",
    description: "0→1 product design, brand identity, go-to-market strategy",
  },
  {
    title: "NGOs & Gov",
    description: "Civic tech, social impact design, public communication",
  },
  {
    title: "Established Brands",
    description: "Product innovation, design system evolution, UX audit",
  },
  {
    title: "Political Campaigns",
    description: "Visual identity, digital strategy, voter engagement tools",
  },
  {
    title: "Tech Companies",
    description: "Product design, UX/UI, design-dev collaboration",
  },
  {
    title: "Entrepreneurs",
    description: "MVP design, pitch decks, early-stage product validation",
  },
];

const toolCategories = [
  {
    category: "Design & 3D",
    tools: ["Figma", "Rhino 3D", "3ds Max", "Blender", "Adobe Creative Suite", "V-Ray", "KeyShot"],
  },
  {
    category: "AI & Automation",
    tools: ["AI Video Tools", "AI Code Assistants", "AI Agents", "ChatGPT", "Midjourney"],
  },
  {
    category: "Development & Prototyping",
    tools: ["Webflow", "Framer", "HTML/CSS", "JavaScript", "Python"],
  },
  {
    category: "Productivity & Collaboration",
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
              {processSteps.map((step, index) => {
                const Icon = step.icon;
                return (
                  <div
                    key={index}
                    className="bg-pure-white p-8 shadow-sm hover:shadow-lg transition-shadow relative"
                  >
                    <div className="absolute top-4 right-4 text-6xl font-display text-gold/10">
                      {step.number}
                    </div>
                    <Icon className="w-12 h-12 text-gold mb-4" />
                    <h3 className="font-display text-2xl mb-3">{step.title}</h3>
                    <p className="text-body text-charcoal/70">
                      {step.description}
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
              {clientTypes.map((client, index) => (
                <div
                  key={index}
                  className="bg-pure-white p-6 border-l-4 border-gold"
                >
                  <h3 className="font-display text-xl mb-2">{client.title}</h3>
                  <p className="text-sm text-charcoal/70">
                    {client.description}
                  </p>
                </div>
              ))}
            </div>
          </section>

          {/* Tools - Categorized */}
          <section className="mb-32">
            <h2 className="text-h2 font-display mb-12 text-center">
              {t.capabilities.tools}
            </h2>
            <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
              {toolCategories.map((category, catIndex) => (
                <div key={catIndex} className="bg-pure-white p-8 shadow-sm">
                  <h3 className="font-display text-xl mb-4 text-navy border-b-2 border-navy pb-2">
                    {category.category}
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
