"use client";

import { useState, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";
import { Instagram, Linkedin, Mail } from "lucide-react";
import { useLanguage } from "@/lib/i18n/LanguageContext";

export default function Footer() {
  const pathname = usePathname();
  const router = useRouter();
  const { t } = useLanguage();
  const [isDragging, setIsDragging] = useState(false);
  const [dragDistance, setDragDistance] = useState(0);
  const dragStartX = useRef(0);
  const dragStartY = useRef(0);

  // Hide footer on /thoughts pages (blog has its own footer if needed)
  if (pathname?.startsWith('/thoughts')) {
    return null;
  }

  const handleDragStart = (e: React.DragEvent) => {
    setIsDragging(true);
    dragStartX.current = e.clientX;
    dragStartY.current = e.clientY;
  };

  const handleDragEnd = (e: React.DragEvent) => {
    const distanceX = Math.abs(e.clientX - dragStartX.current);
    const distanceY = Math.abs(e.clientY - dragStartY.current);
    const totalDistance = Math.sqrt(distanceX ** 2 + distanceY ** 2);

    setDragDistance(totalDistance);
    setIsDragging(false);

    // If dragged more than 100px, trigger Easter egg
    if (totalDistance > 100) {
      router.push('/thoughts');
    }
  };

  return (
    <footer className="relative w-full py-12 px-6 bg-charcoal text-cream">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-center">
          {/* Draggable Logo Easter Egg */}
          <div>
            <div
              draggable
              onDragStart={handleDragStart}
              onDragEnd={handleDragEnd}
              className={`
                relative w-20 h-20 cursor-move transition-all duration-200
                ${isDragging ? 'scale-110 opacity-50' : 'hover:scale-105'}
                ${dragDistance > 100 ? 'animate-pulse' : ''}
              `}
            >
              <Image
                src="/images/logo/logo_Asvg.svg"
                alt="MER"
                fill
                className="object-contain invert brightness-0 transition-all duration-200 pointer-events-none"
              />
            </div>
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
              href="https://instagram.com/Manecharo"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-gold transition-colors"
              aria-label="Instagram"
            >
              <Instagram size={24} />
            </a>
            <a
              href="https://linkedin.com/in/mer101"
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
