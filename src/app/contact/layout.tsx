import type { Metadata } from "next";
import StructuredData from "@/components/seo/StructuredData";

export const metadata: Metadata = {
  title: "Contact Manuel Echavarria Romero — Start a Design Project",
  description:
    "Get in touch with Manuel Echavarria Romero for product design, UX/UI, brand strategy, and social-impact design projects. Email, WhatsApp, or the contact form — typical response within 48 hours.",
  alternates: {
    canonical: "https://manecharo.com/contact",
  },
  openGraph: {
    type: "website",
    url: "https://manecharo.com/contact",
    title: "Contact Manuel Echavarria Romero",
    description:
      "Start a design project — email, WhatsApp, or the contact form. Typical response within 48 hours.",
    images: [
      {
        url: "/images/social/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Contact Manuel Echavarria Romero",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Contact Manuel Echavarria Romero",
    description: "Start a design project. Response within 48 hours.",
    images: ["/images/social/twitter-image.jpg"],
  },
};

const contactPage = {
  "@context": "https://schema.org",
  "@type": "ContactPage",
  url: "https://manecharo.com/contact",
  name: "Contact — Manuel Echavarria Romero",
  mainEntity: {
    "@type": "Person",
    name: "Manuel Echavarria Romero",
    email: "manuelerfreelance@gmail.com",
    telephone: "+60126581025",
    url: "https://manecharo.com",
  },
};

const contactBreadcrumb = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Home", item: "https://manecharo.com" },
    {
      "@type": "ListItem",
      position: 2,
      name: "Contact",
      item: "https://manecharo.com/contact",
    },
  ],
};

export default function ContactLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <StructuredData data={[contactPage, contactBreadcrumb]} />
      {children}
    </>
  );
}
