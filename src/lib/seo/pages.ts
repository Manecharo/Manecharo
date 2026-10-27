import type { Metadata } from "next";
import { alternatesFor, OG_LOCALE, SITE_URL, withLang, type Lang } from "@/lib/i18n/routing";

type PageKey = "about" | "work" | "capabilities" | "contact" | "thoughts";

// Titulo y descripcion por pagina e idioma. Cada uno lleva las palabras que la
// gente teclea (diseñador industrial, desarrollo de producto) en su idioma.
const PAGES: Record<Lang, Record<PageKey, { title: string; description: string }>> = {
  en: {
    about: {
      title: "About Manuel Echavarria Romero — Industrial & Product Designer",
      description:
        "Manuel Echavarria Romero, industrial and product designer with 15 years across 6 countries. Master's in Design (SPD Milan), Diploma in Industrial Design (IED Milan), certificates from MIT and Harvard. Works in Spanish, English, Italian and French.",
    },
    work: {
      title: "Work — Industrial Design & Product Development Projects",
      description:
        "Industrial design, product development, retail, brand and social-impact projects by Manuel Echavarria Romero. 15 years of shipped products across consumer goods, retail, startups and civic tech.",
    },
    capabilities: {
      title: "Capabilities — Industrial Design, Product Development, Brand & UX",
      description:
        "What Manuel Echavarria Romero does: industrial design and product development from insight to manufacturing, retail and point of sale, brand identity and experience, UX/UI and design systems.",
    },
    contact: {
      title: "Contact — Hire an Industrial & Product Designer",
      description:
        "Contact Manuel Echavarria Romero, industrial and product designer, for product development, consumer products, retail and brand projects. Remote across Spain and the EU.",
    },
    thoughts: {
      title: "Notes from the Field",
      description: "Thoughts on design, systems, and solving hard problems.",
    },
  },
  es: {
    about: {
      title: "Sobre Manuel Echavarria Romero — Diseñador Industrial y de Producto",
      description:
        "Manuel Echavarria Romero, diseñador industrial y de producto con quince años en seis países. Máster en Diseño (SPD Milán), Diploma en Diseño Industrial (IED Milán), certificados del MIT y Harvard. Trabaja en castellano, inglés, italiano y francés.",
    },
    work: {
      title: "Trabajo — Proyectos de Diseño Industrial y Desarrollo de Producto",
      description:
        "Proyectos de diseño industrial, desarrollo de producto, retail, marca e impacto social de Manuel Echavarria Romero. Quince años de productos que llegaron al mercado: gran consumo, retail, startups y tecnología cívica.",
    },
    capabilities: {
      title: "Capacidades — Diseño Industrial, Desarrollo de Producto, Marca y UX",
      description:
        "Qué hace Manuel Echavarria Romero: diseño industrial y desarrollo de producto de la idea a la fabricación, retail y punto de venta, identidad y experiencia de marca, UX/UI y sistemas de diseño.",
    },
    contact: {
      title: "Contacto — Diseñador Industrial y de Producto",
      description:
        "Contacta con Manuel Echavarria Romero, diseñador industrial y de producto, para desarrollo de producto, gran consumo, retail y proyectos de marca. En remoto para España y la UE.",
    },
    thoughts: {
      title: "Notas de campo",
      description: "Ideas sobre diseño, sistemas y cómo resolver problemas difíciles.",
    },
  },
  it: {
    about: {
      title: "Chi è Manuel Echavarria Romero — Designer Industriale e di Prodotto",
      description:
        "Manuel Echavarria Romero, designer industriale e di prodotto con quindici anni in sei paesi. Master in Design (SPD Milano), Diploma in Disegno Industriale (IED Milano), certificati MIT e Harvard. Lavora in spagnolo, inglese, italiano e francese.",
    },
    work: {
      title: "Lavori — Progetti di Design Industriale e Sviluppo Prodotto",
      description:
        "Progetti di design industriale, sviluppo prodotto, retail, brand e impatto sociale di Manuel Echavarria Romero. Quindici anni di prodotti arrivati sul mercato: largo consumo, retail, startup e civic tech.",
    },
    capabilities: {
      title: "Competenze — Design Industriale, Sviluppo Prodotto, Brand e UX",
      description:
        "Cosa fa Manuel Echavarria Romero: design industriale e sviluppo prodotto dall'idea alla produzione, retail e punto vendita, identità ed esperienza di marca, UX/UI e design system.",
    },
    contact: {
      title: "Contatti — Designer Industriale e di Prodotto",
      description:
        "Contatta Manuel Echavarria Romero, designer industriale e di prodotto, per sviluppo prodotto, largo consumo, retail e progetti di brand. Da remoto per Spagna e UE.",
    },
    thoughts: {
      title: "Note dal campo",
      description: "Riflessioni su design, sistemi e problemi difficili.",
    },
  },
};

/** Per-language metadata for a section page, with canonical + hreflang. */
export function pageMetadata(
  lang: Lang,
  key: PageKey,
  images: NonNullable<Metadata["openGraph"]>["images"] = [
    { url: "/images/social/og-image.jpg", width: 1200, height: 630 },
  ]
): Metadata {
  const { title, description } = PAGES[lang][key];
  const path = `/${key}`;
  return {
    title,
    description,
    alternates: alternatesFor(lang, path),
    openGraph: {
      type: key === "about" ? "profile" : "website",
      url: `${SITE_URL}${withLang(lang, path)}`,
      locale: OG_LOCALE[lang],
      title,
      description,
      images,
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: ["/images/social/twitter-image.jpg"],
    },
  };
}
