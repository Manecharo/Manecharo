"use client";

import { usePathname } from "next/navigation";
import { useLanguage } from "@/lib/i18n/LanguageContext";
import { Language } from "@/lib/i18n/translations";

export default function LanguageSwitcher() {
  const pathname = usePathname();
  const { language, setLanguage } = useLanguage();

  // Don't show language switcher on blog/thoughts/studio pages
  if (
    pathname?.startsWith("/blog") ||
    pathname?.startsWith("/thoughts") ||
    pathname?.startsWith("/studio")
  ) {
    return null;
  }

  const languages: { code: Language; label: string }[] = [
    { code: "en", label: "EN" },
    { code: "es", label: "ES" },
    { code: "it", label: "IT" },
  ];

  return (
    <div className="fixed top-6 left-6 z-60 hidden gap-1 border border-bone/10 bg-charcoal/40 p-1 backdrop-blur-md md:flex">
      {languages.map((lang) => (
        <button
          key={lang.code}
          onClick={() => setLanguage(lang.code)}
          className={`
            px-3.5 py-2 font-display text-[11px] uppercase tracking-widest
            transition-all duration-300
            ${
              language === lang.code
                ? "bg-gold font-bold text-charcoal"
                : "text-bone/50 hover:bg-bone/5 hover:text-bone"
            }
          `}
          aria-label={`Switch to ${lang.label}`}
          aria-pressed={language === lang.code}
        >
          {lang.label}
        </button>
      ))}
    </div>
  );
}
