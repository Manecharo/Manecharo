import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { seoConfig } from "@/lib/seo/config";
import { LANGS, OG_LOCALE, SITE_URL, alternatesFor, isLang } from "@/lib/i18n/routing";

export function generateStaticParams() {
  return LANGS.map((lang) => ({ lang }));
}

export function generateMetadata({ params }: { params: { lang: string } }): Metadata {
  if (!isLang(params.lang)) return {};
  const { title, description, keywords } = seoConfig.metadata[params.lang];
  return {
    title: { default: title, template: "%s | Manuel Echavarria Romero" },
    description,
    keywords,
    alternates: alternatesFor(params.lang, "/"),
    openGraph: {
      type: "website",
      locale: OG_LOCALE[params.lang],
      alternateLocale: LANGS.filter((l) => l !== params.lang).map((l) => OG_LOCALE[l]),
      url: `${SITE_URL}/${params.lang}`,
      title,
      description,
      siteName: "Manuel Echavarria Romero",
      images: [
        { url: "/images/social/og-image.jpg", width: 1200, height: 630, alt: title },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: ["/images/social/twitter-image.jpg"],
      creator: "@Manecharo",
    },
  };
}

export default function LangLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: { lang: string };
}) {
  if (!isLang(params.lang)) notFound();
  return children;
}
