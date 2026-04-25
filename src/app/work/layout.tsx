import type { Metadata } from "next";
import StructuredData from "@/components/seo/StructuredData";
import { generateStructuredData } from "@/lib/seo/config";

export const metadata: Metadata = {
  title: "Work — Selected Projects by Manuel Echavarria Romero",
  description:
    "Selected product, UX/UI, brand, and social-impact projects by Manuel Echavarria Romero. 14 years of design practice across startups, enterprises, and civic-tech, delivered from Kuala Lumpur to clients worldwide.",
  alternates: {
    canonical: "https://manecharo.com/work",
  },
  openGraph: {
    type: "website",
    url: "https://manecharo.com/work",
    title: "Work — Selected Projects by Manuel Echavarria Romero",
    description:
      "Selected product, UX/UI, brand, and social-impact projects. 14 years of design practice, working globally from Kuala Lumpur.",
    images: [
      {
        url: "/images/social/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Manuel Echavarria Romero — Selected Work",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Work — Manuel Echavarria Romero",
    description:
      "Selected product, UX/UI, brand, and social-impact projects — 14 years, 6 countries.",
    images: ["/images/social/twitter-image.jpg"],
  },
};

const workBreadcrumb = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Home", item: "https://manecharo.com" },
    { "@type": "ListItem", position: 2, name: "Work", item: "https://manecharo.com/work" },
  ],
};

export default function WorkLayout({ children }: { children: React.ReactNode }) {
  const portfolioSchema = generateStructuredData("portfolio");
  return (
    <>
      <StructuredData data={[portfolioSchema, workBreadcrumb]} />
      {children}
    </>
  );
}
