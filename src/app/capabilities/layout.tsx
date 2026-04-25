import type { Metadata } from "next";
import StructuredData from "@/components/seo/StructuredData";

export const metadata: Metadata = {
  title: "Capabilities — Product Design, UX/UI, Brand & Design Systems",
  description:
    "Services offered by Manuel Echavarria Romero: Product Design, UX/UI Design, Brand Strategy & Identity, Design Systems, Service Design, Design Thinking workshops, and Social-Impact Design. Engagements scoped for startups, enterprises, and civic-tech.",
  alternates: {
    canonical: "https://manecharo.com/capabilities",
  },
  openGraph: {
    type: "website",
    url: "https://manecharo.com/capabilities",
    title: "Capabilities — Product Design, UX/UI, Brand & Design Systems",
    description:
      "Product Design, UX/UI, Brand Strategy, Design Systems, Service Design, and Social-Impact Design — scoped for startups, enterprises, and civic-tech.",
    images: [
      {
        url: "/images/social/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Manuel Echavarria Romero — Capabilities",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Capabilities — Manuel Echavarria Romero",
    description:
      "Product Design, UX/UI, Brand, Design Systems, Service Design, Social-Impact Design.",
    images: ["/images/social/twitter-image.jpg"],
  },
};

const services = [
  {
    "@type": "Service",
    name: "Product Design",
    description:
      "End-to-end digital product design: research, strategy, UX, UI, and delivery partnership with engineering teams.",
  },
  {
    "@type": "Service",
    name: "UX/UI Design",
    description:
      "User experience and interface design for web and mobile products, grounded in user research and accessibility.",
  },
  {
    "@type": "Service",
    name: "Brand Strategy & Identity",
    description:
      "Brand positioning, visual identity systems, and brand guidelines for startups and established organizations.",
  },
  {
    "@type": "Service",
    name: "Design Systems",
    description:
      "Scalable component libraries, tokens, and documentation that keep product, brand, and engineering in sync.",
  },
  {
    "@type": "Service",
    name: "Service Design",
    description:
      "Mapping and designing end-to-end service experiences across digital and physical touchpoints.",
  },
  {
    "@type": "Service",
    name: "Design Thinking Workshops",
    description:
      "Facilitated workshops for teams to reframe problems, generate options, and align on user-centered directions.",
  },
  {
    "@type": "Service",
    name: "Social-Impact Design",
    description:
      "Design work for civic-tech, non-profits, and impact-driven organizations — pairing user needs with mission outcomes.",
  },
];

const offerCatalog = {
  "@context": "https://schema.org",
  "@type": "OfferCatalog",
  name: "Design Services — Manuel Echavarria Romero",
  url: "https://manecharo.com/capabilities",
  itemListElement: services.map((service, i) => ({
    "@type": "Offer",
    position: i + 1,
    itemOffered: service,
  })),
};

const capabilitiesBreadcrumb = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Home", item: "https://manecharo.com" },
    {
      "@type": "ListItem",
      position: 2,
      name: "Capabilities",
      item: "https://manecharo.com/capabilities",
    },
  ],
};

export default function CapabilitiesLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <StructuredData data={[offerCatalog, capabilitiesBreadcrumb]} />
      {children}
    </>
  );
}
