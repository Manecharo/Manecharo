import type { Metadata, Viewport } from "next";
import { headers } from "next/headers";
import { Inter, Space_Grotesk } from "next/font/google";
import "./globals.css";
import Navigation from "@/components/layout/Navigation";
import Footer from "@/components/layout/Footer";
import Logo from "@/components/layout/Logo";
import { LanguageProvider } from "@/lib/i18n/LanguageContext";
import StructuredData from "@/components/seo/StructuredData";
import { seoConfig, generateStructuredData } from "@/lib/seo/config";
import { DEFAULT_LANG, isLang } from "@/lib/i18n/routing";
import SmoothScroll from "@/components/experience/SmoothScroll";
import Cursor from "@/components/experience/Cursor";
import Grain from "@/components/experience/Grain";
import Preloader from "@/components/experience/Preloader";

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
  // title, description, canonical, hreflang and Open Graph are per language:
  // see app/[lang]/layout.tsx and each section's layout
  title: "Manuel Echavarria Romero",
  authors: [{ name: "Manuel Echavarria Romero", url: "https://manecharo.com" }],
  creator: "Manuel Echavarria Romero",
  publisher: "Manuel Echavarria Romero",
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
  // verification: {
  //   google: "your-google-search-console-code", // Add after Google Search Console setup
  // },
  icons: {
    // el SVG lleva la media query de tema dentro; el .ico queda de respaldo
    icon: [
      { url: "/icon.svg", type: "image/svg+xml" },
      { url: "/favicon.ico", sizes: "32x32" },
    ],
    apple: "/apple-touch-icon.png",
  },
};

export const viewport: Viewport = {
  themeColor: "#0a0a0a",
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
  // set by the middleware on /es, /en, /it; studio, update and 404 fall back
  const headerLang = headers().get("x-lang");
  const lang = isLang(headerLang) ? headerLang : DEFAULT_LANG;

  return (
    <html lang={lang} className={`${inter.variable} ${spaceGrotesk.variable}`}>
      <head>
        <StructuredData data={[personSchema, websiteSchema, organizationSchema]} />
      </head>
      <body>
        <LanguageProvider>
          <Preloader />
          <SmoothScroll />
          <Cursor />
          <Grain />
          <Logo />
          <Navigation />
          <main>{children}</main>
          <Footer />
        </LanguageProvider>
      </body>
    </html>
  );
}
