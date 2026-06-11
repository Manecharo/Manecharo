"use client";

import { motion } from "framer-motion";
import { usePathname } from "next/navigation";

/**
 * Spatial page transitions, kept from the original navigation metaphor:
 * each route lives at one edge of the screen, so a charcoal veil sweeps
 * away in that direction on arrival. The page itself only fades —
 * no transforms, so fixed/sticky/pinned descendants stay reliable.
 */
const veilExit: Record<string, { x?: string; y?: string }> = {
  "/work": { x: "100%" }, // lives left → reveal sweeps right
  "/about": { y: "100%" }, // lives top → reveal sweeps down
  "/contact": { x: "-100%" }, // lives right → reveal sweeps left
  "/capabilities": { y: "-100%" }, // lives bottom → reveal sweeps up
};

export default function PageTransition({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const basePath = "/" + (pathname?.split("/")[1] ?? "");
  const exit = veilExit[basePath];

  return (
    <>
      <motion.div
        key={pathname}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.1, ease: "easeOut" }}
      >
        {children}
      </motion.div>

      {exit && (
        <motion.div
          key={`veil-${pathname}`}
          aria-hidden
          className="pointer-events-none fixed inset-0 z-[105] bg-charcoal"
          initial={{ x: 0, y: 0 }}
          animate={{ x: exit.x ?? 0, y: exit.y ?? 0, visibility: "hidden" }}
          transition={{
            duration: 0.7,
            ease: [0.76, 0, 0.24, 1],
            visibility: { delay: 0.7 },
          }}
        >
          <span
            className={`absolute bg-gold ${
              exit.x
                ? "top-0 h-full w-[3px]"
                : "left-0 h-[3px] w-full"
            } ${
              exit.x === "100%"
                ? "left-0"
                : exit.x === "-100%"
                  ? "right-0"
                  : exit.y === "100%"
                    ? "top-0"
                    : "bottom-0"
            }`}
          />
        </motion.div>
      )}
    </>
  );
}
