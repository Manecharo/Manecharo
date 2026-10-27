// El idioma vive en la URL (/es, /en, /it) para que cada version tenga su
// propia pagina indexable. Sin dependencias de React: lo usan el middleware,
// los layouts de servidor y el LanguageContext.

export const LANGS = ["es", "en", "it"] as const;
export type Lang = (typeof LANGS)[number];

// el mercado objetivo es Espana: el castellano manda si no hay otra pista
export const DEFAULT_LANG: Lang = "es";

export const SITE_URL = "https://manecharo.com";

export function isLang(value: unknown): value is Lang {
  return LANGS.includes(value as Lang);
}

/** "/es/work/paqua" -> "/work/paqua"; "/es" -> "/"; non-language paths unchanged. */
export function stripLang(pathname: string | null | undefined): string {
  if (!pathname) return "/";
  const seg = pathname.split("/")[1];
  if (!isLang(seg)) return pathname;
  return pathname.slice(seg.length + 1) || "/";
}

/** ("en", "/work") -> "/en/work"; ("en", "/") -> "/en". */
export function withLang(lang: Lang, path: string): string {
  const clean = stripLang(path);
  return clean === "/" ? `/${lang}` : `/${lang}${clean}`;
}

/** canonical + hreflang cluster for a language-independent path. */
export function alternatesFor(lang: Lang, path: string) {
  const languages: Record<string, string> = {};
  for (const l of LANGS) languages[l] = `${SITE_URL}${withLang(l, path)}`;
  // the bare root picks a language per visitor, which is what x-default means
  languages["x-default"] = `${SITE_URL}${path === "/" ? "/" : withLang(DEFAULT_LANG, path)}`;
  return { canonical: `${SITE_URL}${withLang(lang, path)}`, languages };
}

export const OG_LOCALE: Record<Lang, string> = { es: "es_ES", en: "en_US", it: "it_IT" };
