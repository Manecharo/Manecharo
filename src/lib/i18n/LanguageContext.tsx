"use client";

import React, { createContext, useContext, useState, useEffect } from "react";
import { usePathname, useRouter } from "next/navigation";
import { translations, Language, TranslationKey } from "./translations";
import { DEFAULT_LANG, isLang, withLang } from "./routing";

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: TranslationKey;
  mounted: boolean;
  /** prefixes an internal path with the current language: "/work" -> "/en/work" */
  href: (path: string) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(
  undefined
);

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();

  // On /es, /en, /it the URL is the language — known during server render, so
  // crawlers get the real text. Only routes outside the language tree
  // (studio, update, 404) fall back to the visitor's stored choice.
  const routeLang = pathname?.split("/")[1];
  const [fallback, setFallback] = useState<Language>(DEFAULT_LANG);
  const [mounted, setMounted] = useState(false);
  const language: Language = isLang(routeLang) ? routeLang : fallback;

  useEffect(() => {
    const saved = localStorage.getItem("language");
    if (isLang(saved)) setFallback(saved);
    setMounted(true);
  }, []);

  const setLanguage = (lang: Language) => {
    localStorage.setItem("language", lang);
    // the middleware reads this cookie when it redirects an un-prefixed URL
    document.cookie = `language=${lang}; path=/; max-age=31536000; samesite=lax`;
    setFallback(lang);
    if (isLang(routeLang)) router.push(withLang(lang, pathname ?? "/"));
  };

  const value = {
    language,
    setLanguage,
    t: translations[language],
    mounted,
    href: (path: string) => withLang(language, path),
  };

  return (
    <LanguageContext.Provider value={value}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error("useLanguage must be used within a LanguageProvider");
  }
  return context;
}
