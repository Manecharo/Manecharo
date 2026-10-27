import type { Metadata } from "next";
import { pageMetadata } from "@/lib/seo/pages";
import { SITE_URL, type Lang } from "@/lib/i18n/routing";
import StructuredData from "@/components/seo/StructuredData";
import { generateStructuredData } from "@/lib/seo/config";

export function generateMetadata({ params }: { params: { lang: Lang } }): Metadata {
  return pageMetadata(params.lang, "about", [
    { url: "/images/social/og-image-square.jpg", width: 1200, height: 1200, alt: "Manuel Echavarria Romero" },
    { url: "/images/social/og-image.jpg", width: 1200, height: 630, alt: "Manuel Echavarria Romero" },
  ]);
}

const aboutProfilePage = (lang: Lang) => ({
  "@context": "https://schema.org",
  "@type": "ProfilePage",
  url: `${SITE_URL}/${lang}/about`,
  dateModified: new Date().toISOString().slice(0, 10),
  mainEntity: {
    "@type": "Person",
    name: "Manuel Echavarria Romero",
    alternateName: ["Manecharo", "MER"],
    url: "https://manecharo.com",
    image: "https://manecharo.com/images/social/og-image-square.jpg",
  },
  speakable: {
    "@type": "SpeakableSpecification",
    cssSelector: ["h1", "h2", "p"],
  },
});

const aboutBreadcrumb = (lang: Lang) => ({
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    {
      "@type": "ListItem",
      position: 1,
      name: "Home",
      item: `${SITE_URL}/${lang}`,
    },
    {
      "@type": "ListItem",
      position: 2,
      name: "About",
      item: `${SITE_URL}/${lang}/about`,
    },
  ],
});

export default function AboutLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: { lang: Lang };
}) {
  const personSchema = generateStructuredData("person");

  return (
    <>
      <StructuredData
        data={[personSchema, aboutProfilePage(params.lang), aboutBreadcrumb(params.lang)]}
      />
      {children}
    </>
  );
}
