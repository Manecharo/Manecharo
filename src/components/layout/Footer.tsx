"use client";

import { useState, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";
import { Instagram, Linkedin, Mail, ArrowUpRight } from "lucide-react";
import { useLanguage } from "@/lib/i18n/LanguageContext";
import TextReveal from "@/components/experience/TextReveal";
import { Reveal } from "@/components/experience/Reveal";
import Magnetic from "@/components/experience/Magnetic";

export default function Footer() {
  const pathname = usePathname();
  const router = useRouter();
  const { t } = useLanguage();
  const [isDragging, setIsDragging] = useState(false);
  const [dragDistance, setDragDistance] = useState(0);
  const dragStartX = useRef(0);
  const dragStartY = useRef(0);

  // Hide footer on /thoughts pages (blog has its own footer if needed)
  if (pathname?.startsWith("/thoughts")) {
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
      router.push("/thoughts");
    }
  };

  return (
    <footer className="relative w-full overflow-hidden border-t border-bone/10 bg-charcoal text-bone">
      {/* Giant CTA */}
      <div className="px-6 pb-16 pt-20 md:px-12 md:pb-24 md:pt-28">
        <Reveal>
          <p className="mb-6 font-display text-label uppercase tracking-wide2 text-gold">
            {t.xp.available}
          </p>
        </Reveal>
        <TextReveal
          text={t.footer.cta}
          as="h2"
          trigger="scroll"
          className="block max-w-5xl font-display text-display font-bold leading-[0.98] tracking-tightest text-bone"
        />
        <Reveal delay={0.25} className="mt-10">
          <Magnetic>
            <Link
              href="/contact"
              data-cursor="open"
              className="group inline-flex items-center gap-4 border border-gold/60 px-8 py-5 font-display text-sm font-bold uppercase tracking-wide2 text-gold transition-colors duration-300 hover:bg-gold hover:text-charcoal"
            >
              {t.footer.ctaAction}
              <ArrowUpRight
                size={18}
                className="transition-transform duration-300 ease-out-expo group-hover:translate-x-1 group-hover:-translate-y-1"
              />
            </Link>
          </Magnetic>
        </Reveal>
      </div>

      {/* Info row */}
      <div className="border-t border-bone/10 px-6 py-12 md:px-12">
        <div className="grid grid-cols-1 items-center gap-8 md:grid-cols-3">
          {/* Draggable Logo Easter Egg */}
          <div>
            <div
              draggable
              onDragStart={handleDragStart}
              onDragEnd={handleDragEnd}
              className={`
                relative h-16 w-16 cursor-move transition-all duration-200
                ${isDragging ? "scale-110 opacity-50" : "hover:scale-105"}
                ${dragDistance > 100 ? "animate-pulse" : ""}
              `}
            >
              <Image
                src="/images/logo/logo_Asvg.svg"
                alt="MER"
                fill
                className="pointer-events-none object-contain brightness-0 invert transition-all duration-200"
              />
            </div>
          </div>

          {/* Contact Info */}
          <div className="text-sm text-bone/70 md:text-center">
            <p className="mb-1">{t.footer.based}</p>
            <a
              href="mailto:manuelerfreelance@gmail.com"
              className="u-sweep text-bone transition-colors hover:text-gold"
            >
              manuelerfreelance@gmail.com
            </a>
            <p className="mt-1">+60 12 658 1025</p>
          </div>

          {/* Social Links */}
          <div className="flex gap-3 md:justify-end">
            {[
              {
                href: "https://instagram.com/Manecharo",
                label: "Instagram",
                Icon: Instagram,
              },
              {
                href: "https://linkedin.com/in/mer101",
                label: "LinkedIn",
                Icon: Linkedin,
              },
              {
                href: "mailto:manuelerfreelance@gmail.com",
                label: "Email",
                Icon: Mail,
              },
            ].map(({ href, label, Icon }) => (
              <Magnetic key={label} strength={0.4}>
                <a
                  href={href}
                  {...(href.startsWith("http")
                    ? { target: "_blank", rel: "noopener noreferrer" }
                    : {})}
                  className="flex h-12 w-12 items-center justify-center rounded-full border border-bone/15 text-bone/70 transition-colors duration-300 hover:border-gold hover:text-gold"
                  aria-label={label}
                >
                  <Icon size={19} />
                </a>
              </Magnetic>
            ))}
          </div>
        </div>

        <div className="mt-10 flex flex-col items-center justify-between gap-3 border-t border-bone/10 pt-8 text-xs text-bone/40 md:flex-row">
          <p>
            © {new Date().getFullYear()} Manuel Echavarria Romero. {t.footer.rights}.
          </p>
          <p className="font-display uppercase tracking-wide2">
            Kuala Lumpur — {new Date().getFullYear()}
          </p>
        </div>
      </div>
    </footer>
  );
}
