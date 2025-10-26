"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { Instagram, Linkedin, Mail } from "lucide-react";
import { useLanguage } from "@/lib/i18n/LanguageContext";

export default function Footer() {
  const pathname = usePathname();
  const [clicks, setClicks] = useState(0);
  const [showEasterEgg, setShowEasterEgg] = useState(false);
  const { t } = useLanguage();

  useEffect(() => {
    if (clicks === 3) {
      // Flash animation and reveal blog link
      setShowEasterEgg(true);
      setClicks(0);
    }

    // Reset clicks after 1.5 seconds
    const timer = setTimeout(() => {
      setClicks(0);
    }, 1500);

    return () => clearTimeout(timer);
  }, [clicks]);

  // Hide footer on /thoughts pages (blog has its own footer if needed)
  if (pathname?.startsWith('/thoughts')) {
    return null;
  }

  const handleLogoClick = () => {
    setClicks((prev) => prev + 1);
  };

  return (
    <footer className="relative w-full py-12 px-6 bg-charcoal text-cream">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-center">
          {/* Logo - Matches Top Right */}
          <div>
            <Link href="/" className="group inline-block" aria-label="Go to homepage">
              <div className="flex flex-col items-start gap-2">
                {/* Logo Image */}
                <div className="relative w-20 h-20 transition-all duration-200 group-hover:scale-105">
                  <Image
                    src="/images/logo/logo_Asvg.svg"
                    alt="MER"
                    fill
                    className="object-contain invert brightness-0 group-hover:brightness-100 group-hover:invert-0 transition-all duration-200"
                  />
                </div>
                {/* Subtitle */}
                <div className="font-body text-xs uppercase tracking-widest text-cream/60 group-hover:text-gold transition-colors duration-200">
                  Consultant
                </div>
              </div>
            </Link>
            <button
              onClick={handleLogoClick}
              className="mt-2 text-xs text-cream/40 hover:text-gold transition-colors"
              aria-label="Easter egg"
            >
              {showEasterEgg ? "→ Notes from the field" : "···"}
            </button>
            {showEasterEgg && (
              <Link
                href="/thoughts"
                className="block mt-1 text-sm text-gold hover:underline animate-fade-up"
              >
                → Go to thoughts
              </Link>
            )}
          </div>

          {/* Contact Info */}
          <div className="text-center text-sm">
            <p className="mb-1">{t.footer.based}</p>
            <a
              href="mailto:manuelerfreelance@gmail.com"
              className="hover:text-gold transition-colors"
            >
              manuelerfreelance@gmail.com
            </a>
            <p className="mt-1">+60 12 658 1025</p>
          </div>

          {/* Social Links */}
          <div className="flex gap-6 justify-center md:justify-end">
            <a
              href="https://instagram.com/ManecharoDesign"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-gold transition-colors"
              aria-label="Instagram"
            >
              <Instagram size={24} />
            </a>
            <a
              href="https://linkedin.com/in/ManecharoDesign"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-gold transition-colors"
              aria-label="LinkedIn"
            >
              <Linkedin size={24} />
            </a>
            <a
              href="mailto:manuelerfreelance@gmail.com"
              className="hover:text-gold transition-colors"
              aria-label="Email"
            >
              <Mail size={24} />
            </a>
          </div>
        </div>

        <div className="mt-8 pt-8 border-t border-cream/20 text-center text-sm">
          <p>
            © {new Date().getFullYear()} Manuel Echavarria Romero. {t.footer.rights}.
          </p>
        </div>
      </div>
    </footer>
  );
}
