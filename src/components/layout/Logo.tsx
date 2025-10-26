"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";

export default function Logo() {
  const pathname = usePathname();

  // Don't show logo on blog/thoughts pages - they have their own identity
  if (pathname?.startsWith('/blog') || pathname?.startsWith('/thoughts')) {
    return null;
  }

  return (
    <Link
      href="/"
      className="fixed top-6 left-6 md:top-8 md:right-8 md:left-auto z-[60] group"
      aria-label="Go to homepage"
    >
      <div className="flex flex-col items-start md:items-end gap-1">
        {/* Logo Image - Smaller on mobile */}
        <div className="relative w-10 h-10 md:w-16 md:h-16 transition-all duration-200 group-hover:scale-105">
          <Image
            src="/images/logo/logo_Asvg.svg"
            alt="MER"
            fill
            className="object-contain brightness-0 saturate-0 group-hover:brightness-100 group-hover:saturate-100 transition-all duration-200"
            priority
          />
        </div>
        {/* Subtitle - Hidden on small mobile */}
        <div className="hidden sm:block font-body text-[10px] md:text-xs uppercase tracking-widest text-charcoal/60 group-hover:text-red/80 transition-colors duration-200">
        </div>
      </div>
    </Link>
  );
}
