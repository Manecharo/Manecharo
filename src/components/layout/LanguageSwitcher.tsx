"use client";

import { useLanguage } from "@/lib/i18n/LanguageContext";
import { Language } from "@/lib/i18n/translations";

export default function LanguageSwitcher() {
  const { language, setLanguage } = useLanguage();

  const languages: { code: Language; label: string }[] = [
    { code: "en", label: "EN" },
    { code: "es", label: "ES" },
    { code: "it", label: "IT" },
  ];

  return (
    <div className="hidden md:flex fixed top-6 left-6 z-50 gap-1 bg-white/90 backdrop-blur-sm p-1 rounded-sm shadow-sm border border-charcoal/10">
      {languages.map((lang) => (
        <button
          key={lang.code}
          onClick={() => setLanguage(lang.code)}
          className={`
            px-4 py-2 font-display text-xs uppercase tracking-widest
            transition-all duration-300 rounded-sm
            ${
              language === lang.code
                ? "bg-navy text-white font-bold shadow-sm"
                : "text-charcoal/60 hover:text-navy hover:bg-navy/5"
            }
          `}
          aria-label={`Switch to ${lang.label}`}
        >
          {lang.label}
        </button>
      ))}
    </div>
  );
}
