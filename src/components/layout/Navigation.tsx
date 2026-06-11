"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { Menu, X, Instagram, Linkedin, Mail } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useLanguage } from "@/lib/i18n/LanguageContext";
import { Language } from "@/lib/i18n/translations";
import { lockScroll, unlockScroll } from "@/lib/motion/hooks";

const navItems = [
  { key: "work", href: "/work" },
  { key: "about", href: "/about" },
  { key: "capabilities", href: "/capabilities" },
  { key: "contact", href: "/contact" },
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
      {/* Desktop Navigation — top bar */}
      <nav
        aria-label="Main navigation"
        className={`fixed inset-x-0 top-0 z-60 hidden items-center justify-between px-8 transition-all duration-500 ease-out-expo md:flex lg:px-12 ${
          hasScrolled
            ? "h-16 border-b border-bone/10 bg-charcoal/70 backdrop-blur-md"
            : "h-24 border-b border-transparent bg-transparent"
        }`}
      >
        <Link
          href="/"
          aria-label="Go to homepage"
          className="group relative block h-10 w-10 transition-transform duration-300 ease-out-expo hover:scale-110"
        >
          <Image
            src="/images/logo/logo_Asvg.svg"
            alt="MER"
            fill
            priority
            className="object-contain brightness-0 invert transition-all duration-300 group-hover:brightness-100 group-hover:invert-0"
          />
        </Link>

        <div className="flex items-center gap-7 lg:gap-9">
          {navItems.map((item, i) => {
            const isActive =
              pathname === item.href || pathname?.startsWith(item.href + "/");
            return (
              <Link
                key={item.href}
                href={item.href}
                className="group relative flex items-baseline gap-1.5 py-2 font-display text-xs font-bold uppercase tracking-wide2"
              >
                <span
                  className={`text-[9px] transition-colors duration-300 ${
                    isActive ? "text-gold" : "text-bone/35 group-hover:text-gold/70"
                  }`}
                >
                  0{i + 1}
                </span>
                <span
                  className={`transition-colors duration-300 ${
                    isActive ? "text-gold" : "text-bone group-hover:text-gold"
                  }`}
                >
                  {t.nav[item.key]}
                </span>
                <span
                  aria-hidden
                  className={`absolute bottom-0 left-0 h-px bg-gold transition-all duration-300 ease-out-expo ${
                    isActive ? "w-full" : "w-0 group-hover:w-full"
                  }`}
                />
              </Link>
            );
          })}

          {/* Language switcher */}
          <div className="ml-1 flex items-center gap-1 border border-bone/15 p-1">
            {languages.map((lang) => (
              <button
                key={lang.code}
                onClick={() => setLanguage(lang.code)}
                aria-pressed={language === lang.code}
                aria-label={`Switch to ${lang.label}`}
                className={`px-2.5 py-1.5 font-display text-[10px] font-bold uppercase tracking-widest transition-all duration-300 ${
                  language === lang.code
                    ? "bg-gold text-charcoal"
                    : "text-bone/50 hover:bg-bone/5 hover:text-bone"
                }`}
              >
                {lang.label}
              </button>
            ))}
          </div>
        </div>
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
