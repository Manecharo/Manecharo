import type { Metadata } from "next";
import { pageMetadata } from "@/lib/seo/pages";
import { SITE_URL, type Lang } from "@/lib/i18n/routing";
import StructuredData from "@/components/seo/StructuredData";

export function generateMetadata({ params }: { params: { lang: Lang } }): Metadata {
  return pageMetadata(params.lang, "capabilities");
}

const services = [
  {
    "@type": "Service",
    name: "Industrial Design",
    description:
      "Physical product design for consumer goods, retail fixtures and point-of-sale systems: concept, form, CMF, prototyping and design for manufacturing.",
  },
  {
    "@type": "Service",
    name: "Product Development",
    description:
      "New product development from insight and concept through engineering hand-off, cost engineering, suppliers, manufacturing and launch.",
  },
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

const offerCatalog = (lang: Lang) => ({
  "@context": "https://schema.org",
  "@type": "OfferCatalog",
  name: "Design Services — Manuel Echavarria Romero",
  url: `${SITE_URL}/${lang}/capabilities`,
  itemListElement: services.map((service, i) => ({
    "@type": "Offer",
    position: i + 1,
    itemOffered: service,
  })),
});

const capabilitiesBreadcrumb = (lang: Lang) => ({
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Home", item: `${SITE_URL}/${lang}` },
    {
      "@type": "ListItem",
      position: 2,
      name: "Capabilities",
      item: `${SITE_URL}/${lang}/capabilities`,
    },
  ],
});

export default function CapabilitiesLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: { lang: Lang };
}) {
  return (
    <>
      <StructuredData data={[offerCatalog(params.lang), capabilitiesBreadcrumb(params.lang)]} />
      {children}
    </>
  );
}
