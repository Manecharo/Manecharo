"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X } from "lucide-react";
import { useLanguage } from "@/lib/i18n/LanguageContext";
import { Language } from "@/lib/i18n/translations";

const navItems = [
  { key: "work", href: "/work", position: "left" },
  { key: "about", href: "/about", position: "top" },
  { key: "contact", href: "/contact", position: "right" },
  { key: "capabilities", href: "/capabilities", position: "bottom" },
] as const;

export default function Navigation() {
  const pathname = usePathname();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { t, language, setLanguage } = useLanguage();

  // Hide navigation on /thoughts and /studio pages
  if (pathname?.startsWith('/thoughts') || pathname?.startsWith('/studio')) {
    return null;
  }

  const languages: { code: Language; label: string }[] = [
    { code: "en", label: "EN" },
    { code: "es", label: "ES" },
    { code: "it", label: "IT" },
  ];

  return (
    <>
      {/* Desktop Navigation - Spatial */}
      <nav className="hidden md:block" aria-label="Main navigation">
        {navItems.map((item) => {
          const isActive = pathname === item.href;
          const positionClasses = {
            left: "left-8 top-1/2 -translate-y-1/2 -rotate-90 origin-center",
            top: "top-8 left-1/2 -translate-x-1/2",
            right: "right-8 top-1/2 -translate-y-1/2 rotate-90 origin-center",
            bottom: "bottom-8 left-1/2 -translate-x-1/2",
          };

          return (
            <Link
              key={item.href}
              href={item.href}
              className={`
                fixed z-50 font-display text-sm uppercase tracking-wider font-bold
                transition-all duration-200 ease-out
                hover:text-gold hover:scale-110
                ${positionClasses[item.position as keyof typeof positionClasses]}
                ${isActive ? "text-gold" : "text-charcoal"}
              `}
            >
              {t.nav[item.key]}
            </Link>
          );
        })}
      </nav>

      {/* Mobile Navigation - Hamburger */}
      <nav className="md:hidden" aria-label="Mobile navigation">
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="fixed top-6 right-6 z-[60] p-2 text-charcoal hover:text-gold transition-colors bg-white/90 backdrop-blur-sm rounded-lg shadow-md"
          aria-label="Toggle menu"
        >
          {mobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
        </button>

        {/* Mobile Menu Overlay */}
        {mobileMenuOpen && (
          <div className="fixed inset-0 z-50 bg-cream">
            <div className="flex flex-col items-center justify-center h-full gap-8 pb-24">
              <Link
                href="/"
                onClick={() => setMobileMenuOpen(false)}
                className={`font-display text-2xl uppercase tracking-wider font-bold transition-colors ${
                  pathname === "/" ? "text-gold" : "text-charcoal"
                }`}
              >
                {t.nav.home}
              </Link>
              {navItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className={`font-display text-2xl uppercase tracking-wider font-bold transition-colors ${
                    pathname === item.href ? "text-gold" : "text-charcoal"
                  }`}
                >
                  {t.nav[item.key]}
                </Link>
              ))}
            </div>

            {/* Language Switcher at Bottom of Mobile Menu */}
            <div className="fixed bottom-8 left-0 right-0 flex justify-center gap-2 z-50">
              {languages.map((lang) => (
                <button
                  key={lang.code}
                  onClick={() => setLanguage(lang.code)}
                  className={`
                    px-6 py-3 font-display text-sm uppercase tracking-widest
                    transition-all duration-300 rounded-sm
                    ${language === lang.code
                      ? "bg-navy text-white font-bold shadow-lg scale-110"
                      : "bg-white text-charcoal/60 hover:text-navy hover:bg-navy/5 shadow-md"
                    }
                  `}
                  aria-label={`Switch to ${lang.label}`}
                >
                  {lang.label}
                </button>
              ))}
            </div>
          </div>
        )}
      </nav>
    </>
  );
}
