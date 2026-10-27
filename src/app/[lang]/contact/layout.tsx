import type { Metadata } from "next";
import { pageMetadata } from "@/lib/seo/pages";
import { SITE_URL, type Lang } from "@/lib/i18n/routing";
import StructuredData from "@/components/seo/StructuredData";

export function generateMetadata({ params }: { params: { lang: Lang } }): Metadata {
  return pageMetadata(params.lang, "contact");
}

const contactPage = (lang: Lang) => ({
  "@context": "https://schema.org",
  "@type": "ContactPage",
  url: `${SITE_URL}/${lang}/contact`,
  name: "Contact — Manuel Echavarria Romero",
  mainEntity: {
    "@type": "Person",
    name: "Manuel Echavarria Romero",
    email: "manuel_echavarria@hotmail.com",
    telephone: "+60126581025",
    url: `${SITE_URL}/${lang}`,
  },
});

const contactBreadcrumb = (lang: Lang) => ({
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Home", item: `${SITE_URL}/${lang}` },
    {
      "@type": "ListItem",
      position: 2,
      name: "Contact",
      item: `${SITE_URL}/${lang}/contact`,
    },
  ],
});

export default function ContactLayout({ children, params }: { children: React.ReactNode; params: { lang: Lang } }) {
  return (
    <>
      <StructuredData data={[contactPage(params.lang), contactBreadcrumb(params.lang)]} />
      {children}
    </>
  );
}
