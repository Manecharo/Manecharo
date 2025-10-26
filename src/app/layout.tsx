import type { Metadata } from "next";
import { Inter, Space_Grotesk } from "next/font/google";
import "./globals.css";
import Navigation from "@/components/layout/Navigation";
import Footer from "@/components/layout/Footer";
import Logo from "@/components/layout/Logo";
import { LanguageProvider } from "@/lib/i18n/LanguageContext";
import LanguageSwitcher from "@/components/layout/LanguageSwitcher";

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
    default: "Manuel Echavarria Romero | Designer",
    template: "%s | Manuel Echavarria Romero",
  },
  description:
    "Designer and problem solver based in Kuala Lumpur. 14 years turning complex problems into elegant solutions. Product design, UX/UI, brand strategy, and social impact.",
  keywords: [
    "designer",
    "product designer",
    "UX designer",
    "UI designer",
    "brand designer",
    "design strategist",
    "Manuel Echavarria Romero",
    "Kuala Lumpur designer",
    "Colombia designer",
    "Milan design",
    "product design",
    "UX/UI design",
    "brand identity",
    "design strategy",
    "social impact design",
    "civic tech",
    "startup design",
  ],
  authors: [{ name: "Manuel Echavarria Romero" }],
  creator: "Manuel Echavarria Romero",
  publisher: "Manuel Echavarria Romero",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://manecharo.com",
    title: "Manuel Echavarria Romero | Designer",
    description:
      "Designer and problem solver. 14 years turning complex problems into elegant solutions across 8 countries.",
    siteName: "Manuel Echavarria Romero",
    images: [
      {
        url: "/images/social/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Manuel Echavarria Romero - Designer",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Manuel Echavarria Romero | Designer",
    description:
      "Designer and problem solver. 14 years turning complex problems into elegant solutions.",
    images: ["/images/social/og-image.jpg"],
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
  return (
    <html lang="en" className={`${inter.variable} ${spaceGrotesk.variable}`}>
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
