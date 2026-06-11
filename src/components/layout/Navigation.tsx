"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X, Instagram, Linkedin, Mail } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useLanguage } from "@/lib/i18n/LanguageContext";
import { Language } from "@/lib/i18n/translations";
import { lockScroll, unlockScroll } from "@/lib/motion/hooks";

const navItems = [
  { key: "work", href: "/work", position: "left" },
  { key: "about", href: "/about", position: "top" },
  { key: "contact", href: "/contact", position: "right" },
  { key: "capabilities", href: "/capabilities", position: "bottom" },
] as const;

const overlayItems = [
  { key: "home", href: "/" },
  ...navItems.map(({ key, href }) => ({ key, href })),
] as const;

export default function Navigation() {
  const pathname = usePathname();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [hasScrolled, setHasScrolled] = useState(false);
  const { t, language, setLanguage } = useLanguage();

  // Track scroll position so the edge nav recedes while reading
  useEffect(() => {
    const handleScroll = () => {
      setHasScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Lock page scroll behind the mobile overlay
  useEffect(() => {
    if (mobileMenuOpen) {
      lockScroll();
      return () => unlockScroll();
    }
  }, [mobileMenuOpen]);

  // Close the overlay when the route changes
  useEffect(() => {
    setMobileMenuOpen(false);
  }, [pathname]);

  // Hide navigation only on /thoughts and /studio pages
  if (pathname?.startsWith("/thoughts") || pathname?.startsWith("/studio")) {
    return null;
  }

  const languages: { code: Language; label: string }[] = [
    { code: "en", label: "EN" },
    { code: "es", label: "ES" },
    { code: "it", label: "IT" },
  ];

  return (
    <>
      {/* Desktop Navigation - Spatial edges */}
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
                group fixed z-60 flex items-center gap-2 font-display text-xs uppercase tracking-wide2 font-bold
                mix-blend-difference transition-all duration-500 ease-out-expo
                hover:!opacity-100
                ${positionClasses[item.position as keyof typeof positionClasses]}
                ${isActive ? "text-gold" : "text-bone"}
                ${hasScrolled ? "opacity-30" : "opacity-100"}
              `}
            >
              <span
                aria-hidden
                className={`h-[5px] w-[5px] rounded-full bg-gold transition-all duration-300 ${
                  isActive ? "scale-100" : "scale-0 group-hover:scale-100"
                }`}
              />
              <span className="transition-colors duration-300 group-hover:text-gold">
                {t.nav[item.key]}
              </span>
            </Link>
          );
        })}
      </nav>

      {/* Mobile Navigation */}
      <nav className="md:hidden" aria-label="Mobile navigation">
        {/* Top blur bar */}
        <div className="fixed top-0 left-0 right-0 z-[55] h-20 border-b border-bone/10 bg-charcoal/60 backdrop-blur-md" />

        {/* Menu trigger */}
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="fixed top-6 right-6 z-80 p-2 text-bone transition-colors hover:text-gold"
          aria-label={mobileMenuOpen ? t.xp.close : t.xp.menu}
          aria-expanded={mobileMenuOpen}
        >
          {mobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
        </button>

        {/* Overlay menu */}
        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.div
              key="mobile-menu"
              initial={{ clipPath: "inset(0% 0% 100% 0%)" }}
              animate={{ clipPath: "inset(0% 0% 0% 0%)" }}
              exit={{ clipPath: "inset(0% 0% 100% 0%)" }}
              transition={{ duration: 0.55, ease: [0.76, 0, 0.24, 1] }}
              className="fixed inset-0 z-70 flex flex-col justify-between bg-charcoal px-8 pb-10 pt-28"
            >
              <div aria-hidden className="pointer-events-none absolute -right-24 -top-24 h-72 w-72 rounded-full bg-gold/10 blur-3xl" />

              <div className="flex flex-col gap-2">
                {overlayItems.map((item, i) => {
                  const isActive = pathname === item.href;
                  return (
                    <motion.div
                      key={item.href}
                      initial={{ y: 48, opacity: 0 }}
                      animate={{
                        y: 0,
                        opacity: 1,
                        transition: { delay: 0.16 + i * 0.07, duration: 0.6, ease: [0.16, 1, 0.3, 1] },
                      }}
                      exit={{ opacity: 0, transition: { duration: 0.15 } }}
                    >
                      <Link
                        href={item.href}
                        onClick={() => setMobileMenuOpen(false)}
                        className="group flex items-baseline gap-4 py-2"
                      >
                        <span className="font-display text-xs text-gold/70">
                          0{i + 1}
                        </span>
                        <span
                          className={`font-display text-4xl font-bold uppercase tracking-tightest transition-colors ${
                            isActive ? "text-gold" : "text-bone group-hover:text-gold"
                          }`}
                        >
                          {t.nav[item.key as keyof typeof t.nav]}
                        </span>
                      </Link>
                    </motion.div>
                  );
                })}
              </div>

              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1, transition: { delay: 0.5 } }}
                exit={{ opacity: 0, transition: { duration: 0.15 } }}
                className="flex flex-col gap-8"
              >
                {/* Socials */}
                <div className="flex gap-6">
                  <a
                    href="https://instagram.com/Manecharo"
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="Instagram"
                    className="text-bone/60 transition-colors hover:text-gold"
                  >
                    <Instagram size={22} />
                  </a>
                  <a
                    href="https://linkedin.com/in/mer101"
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="LinkedIn"
                    className="text-bone/60 transition-colors hover:text-gold"
                  >
                    <Linkedin size={22} />
                  </a>
                  <a
                    href="mailto:manuelerfreelance@gmail.com"
                    aria-label="Email"
                    className="text-bone/60 transition-colors hover:text-gold"
                  >
                    <Mail size={22} />
                  </a>
                </div>

                {/* Language Switcher */}
                <div className="flex gap-2">
                  {languages.map((lang) => (
                    <button
                      key={lang.code}
                      onClick={() => setLanguage(lang.code)}
                      className={`
                        px-5 py-3 font-display text-sm uppercase tracking-widest transition-all duration-300
                        ${
                          language === lang.code
                            ? "bg-gold font-bold text-charcoal"
                            : "border border-bone/20 text-bone/60 hover:border-gold/60 hover:text-bone"
                        }
                      `}
                      aria-label={`Switch to ${lang.label}`}
                    >
                      {lang.label}
                    </button>
                  ))}
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>
    </>
  );
}
