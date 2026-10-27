import type { Metadata } from "next";
import { pageMetadata } from "@/lib/seo/pages";
import { SITE_URL, type Lang } from "@/lib/i18n/routing";
import StructuredData from "@/components/seo/StructuredData";
import { generateStructuredData } from "@/lib/seo/config";

export function generateMetadata({ params }: { params: { lang: Lang } }): Metadata {
  return pageMetadata(params.lang, "work");
}

const workBreadcrumb = (lang: Lang) => ({
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Home", item: `${SITE_URL}/${lang}` },
    { "@type": "ListItem", position: 2, name: "Work", item: `${SITE_URL}/${lang}/work` },
  ],
});

export default function WorkLayout({ children, params }: { children: React.ReactNode; params: { lang: Lang } }) {
  const portfolioSchema = generateStructuredData("portfolio");
  return (
    <>
      <StructuredData data={[portfolioSchema, workBreadcrumb(params.lang)]} />
      {children}
    </>
  );
}
