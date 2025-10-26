"use client";

import { usePathname } from "next/navigation";
import { useLanguage } from "@/lib/i18n/LanguageContext";
import { Language } from "@/lib/i18n/translations";

export default function LanguageSwitcher() {
  const pathname = usePathname();
  const { language, setLanguage } = useLanguage();

  // Don't show language switcher on blog/thoughts/studio pages
  if (pathname?.startsWith('/blog') || pathname?.startsWith('/thoughts') || pathname?.startsWith('/studio')) {
    return null;
  }

  const languages: { code: Language; label: string }[] = [
    { code: "en", label: "EN" },
    { code: "es", label: "ES" },
    { code: "it", label: "IT" },
  ];

  return (
    <div className="hidden md:flex fixed top-6 left-6 z-50 gap-1 backdrop-blur-md bg-charcoal/10 p-1 rounded-sm shadow-lg">
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
                : "text-charcoal hover:text-navy hover:bg-white/20"
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
