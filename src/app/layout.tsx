import type { Metadata } from "next";
import { Inter, Space_Grotesk } from "next/font/google";
import "./globals.css";
import Navigation from "@/components/layout/Navigation";
import Footer from "@/components/layout/Footer";
import Logo from "@/components/layout/Logo";
import { LanguageProvider } from "@/lib/i18n/LanguageContext";
import LanguageSwitcher from "@/components/layout/LanguageSwitcher";
import StructuredData from "@/components/seo/StructuredData";
import { seoConfig, generateStructuredData } from "@/lib/seo/config";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-space-grotesk",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://manecharo.com"),
  title: {
    default: "Manuel Echavarria Romero | Product Designer & Design Strategist",
    template: "%s | Manuel Echavarria Romero",
  },
  description:
    "Designer and problem solver based in Kuala Lumpur with 14 years of experience. Specialized in product design, UX/UI, brand strategy, and social impact design. Working globally across 6 countries.",
  keywords: seoConfig.metadata.en.keywords,
  authors: [{ name: "Manuel Echavarria Romero", url: "https://manecharo.com" }],
  creator: "Manuel Echavarria Romero",
  publisher: "Manuel Echavarria Romero",
  alternates: {
    canonical: "https://manecharo.com",
    languages: {
      'en': 'https://manecharo.com',
      'es': 'https://manecharo.com',
      'it': 'https://manecharo.com',
      'x-default': 'https://manecharo.com',
    },
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    alternateLocale: ["es_ES", "it_IT"],
    url: "https://manecharo.com",
    title: "Manuel Echavarria Romero | Product Designer & Design Strategist",
    description:
      "Designer and problem solver with 14 years of experience. Specialized in product design, UX/UI, brand strategy, and social impact design. Working globally across 6 countries.",
    siteName: "Manuel Echavarria Romero",
    images: [
      {
        url: "/images/social/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Manuel Echavarria Romero - Product Designer & Design Strategist",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Manuel Echavarria Romero | Product Designer & Design Strategist",
    description:
      "Designer and problem solver with 14 years of experience. Specialized in product design, UX/UI, brand strategy, and social impact design.",
    images: ["/images/social/og-image.jpg"],
    creator: "@Manecharo",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  verification: {
    google: "add-your-code-here", // Add after Google Search Console setup
  },
  icons: {
    icon: "/favicon.ico",
    apple: "/apple-touch-icon.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  // Generate structured data for Person and Website
  const personSchema = generateStructuredData('person');
  const websiteSchema = generateStructuredData('website');
  const organizationSchema = seoConfig.structuredData.organization;

  return (
    <html lang="en" className={`${inter.variable} ${spaceGrotesk.variable}`}>
      <head>
        <StructuredData data={[personSchema, websiteSchema, organizationSchema]} />
      </head>
      <body>
        <LanguageProvider>
          <LanguageSwitcher />
          <Logo />
          <Navigation />
          <main>{children}</main>
          <Footer />
        </LanguageProvider>
      </body>
    </html>
  );
}
