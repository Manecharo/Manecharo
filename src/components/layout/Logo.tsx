"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";

export default function Logo() {
  const pathname = usePathname();

  // Don't show logo on blog/thoughts pages - they have their own identity
  if (pathname?.startsWith("/blog") || pathname?.startsWith("/thoughts")) {
    return null;
  }

  // Desktop shows the logo inside the top navigation bar instead.
  return (
    <Link
      href="/"
      className="group fixed top-6 left-6 z-[60] md:hidden"
      aria-label="Go to homepage"
    >
      <div className="relative h-10 w-10 transition-transform duration-300 ease-out-expo group-hover:scale-110">
        <Image
          src="/images/logo/logo_Asvg.svg"
          alt="MER"
          fill
          priority
          className="object-contain brightness-0 invert transition-all duration-300 group-hover:brightness-100 group-hover:invert-0"
        />
      </div>
    </Link>
  );
}
