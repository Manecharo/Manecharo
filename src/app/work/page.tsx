"use client";

import ProjectsGrid from "@/components/sections/ProjectsGrid";
import PageTransition from "@/components/layout/PageTransition";
import { useLanguage } from "@/lib/i18n/LanguageContext";
import FormattedText from "@/components/ui/FormattedText";

export default function WorkPage() {
  const { t } = useLanguage();
  return (
    <PageTransition>
      <div className="min-h-screen py-24 px-6 bg-white">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <header className="mb-20 text-center max-w-4xl mx-auto">
            <div className="inline-block mb-4 px-4 py-2 bg-navy/10 text-navy text-sm font-display uppercase tracking-wider">
              Portfolio
            </div>
            <h1 className="text-h1 font-display mb-8 leading-tight">
              {t.work.title}
            </h1>
            <p className="text-xl text-charcoal/80 leading-relaxed whitespace-pre-line">
              <FormattedText text={t.work.subtitle} />
            </p>
          </header>

          {/* Projects Grid with Filters */}
          <ProjectsGrid />
        </div>
      </div>
    </PageTransition>
  );
}
