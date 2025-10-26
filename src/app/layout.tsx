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
    default: "Manuel Echavarria Romero | Designer of Systems",
    template: "%s | Manuel Echavarria Romero",
  },
  description:
    "Product designer and strategist. 14 years solving complex problems through design. From hydroponic gardens to digital democracies.",
  keywords: [
    "product design",
    "UX design",
    "industrial designer",
    "design strategy",
    "portfolio",
    "Manuel Echavarria",
  ],
  authors: [{ name: "Manuel Echavarria Romero" }],
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://manecharo.com",
    title: "Manuel Echavarria Romero | Designer of Systems",
    description:
      "Product designer and strategist. 14 years solving complex problems through design.",
    siteName: "Manuel Echavarria Romero Portfolio",
    images: [
      {
        url: "/images/social/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Manuel Echavarria Romero - Designer of Systems",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Manuel Echavarria Romero | Designer of Systems",
    description:
      "Product designer and strategist. 14 years solving complex problems through design.",
    images: ["/images/social/og-image.jpg"],
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
