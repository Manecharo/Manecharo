import type { Metadata } from "next";
import StructuredData from "@/components/seo/StructuredData";
import { generateStructuredData } from "@/lib/seo/config";

export const metadata: Metadata = {
  title: "About Manuel Echavarria Romero — Product Designer & Design Strategist",
  description:
    "Learn about Manuel Echavarria Romero: product designer and design strategist with 14 years of experience across 6 countries. Master's in Design (SPD Milan), Diploma in Industrial Design (IED Milan), certificates from MIT and Harvard. Based in Kuala Lumpur, Malaysia, working globally in English, Spanish, Italian, and French.",
  alternates: {
    canonical: "https://manecharo.com/about",
    languages: {
      en: "https://manecharo.com/about",
      es: "https://manecharo.com/about",
      it: "https://manecharo.com/about",
      "x-default": "https://manecharo.com/about",
    },
  },
  openGraph: {
    type: "profile",
    url: "https://manecharo.com/about",
    title: "About Manuel Echavarria Romero — Product Designer & Design Strategist",
    description:
      "Product designer and design strategist with 14 years of experience. SPD Milan, IED Milan, MIT, Harvard. Based in Kuala Lumpur, working globally.",
    images: [
      {
        url: "/images/social/og-image-square.jpg",
        width: 1200,
        height: 1200,
        alt: "Manuel Echavarria Romero — portrait",
      },
      {
        url: "/images/social/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Manuel Echavarria Romero — Product Designer & Design Strategist",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "About Manuel Echavarria Romero",
    description:
      "Product designer & design strategist — 14 years, 6 countries, based in Kuala Lumpur.",
    images: ["/images/social/twitter-image.jpg"],
  },
};

const aboutProfilePage = {
  "@context": "https://schema.org",
  "@type": "ProfilePage",
  url: "https://manecharo.com/about",
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
};

const aboutBreadcrumb = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    {
      "@type": "ListItem",
      position: 1,
      name: "Home",
      item: "https://manecharo.com",
    },
    {
      "@type": "ListItem",
      position: 2,
      name: "About",
      item: "https://manecharo.com/about",
    },
  ],
};

export default function AboutLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const personSchema = generateStructuredData("person");

  return (
    <>
      <StructuredData
        data={[personSchema, aboutProfilePage, aboutBreadcrumb]}
      />
      {children}
    </>
  );
}
