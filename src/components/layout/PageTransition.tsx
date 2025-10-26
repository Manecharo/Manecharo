"use client";

import { motion, AnimatePresence } from "framer-motion";
import { usePathname } from "next/navigation";

const slideVariants = {
  fromLeft: { x: "-100%", opacity: 0 },
  fromRight: { x: "100%", opacity: 0 },
  fromTop: { y: "-100%", opacity: 0 },
  fromBottom: { y: "100%", opacity: 0 },
  center: { x: 0, y: 0, opacity: 1 },
  toLeft: { x: "-100%", opacity: 0 },
  toRight: { x: "100%", opacity: 0 },
  toTop: { y: "-100%", opacity: 0 },
  toBottom: { y: "100%", opacity: 0 },
};

const navigationMap: Record<
  string,
  { enter: keyof typeof slideVariants; exit: keyof typeof slideVariants }
> = {
  "/work": { enter: "fromLeft", exit: "toRight" },
  "/about": { enter: "fromTop", exit: "toBottom" },
  "/contact": { enter: "fromRight", exit: "toLeft" },
  "/capabilities": { enter: "fromBottom", exit: "toTop" },
  "/": { enter: "center", exit: "center" },
};

export default function PageTransition({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();

  // Get base path (handles /work/[slug] etc)
  const basePath = "/" + pathname.split("/")[1];
  const config = navigationMap[basePath] || navigationMap["/"];

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={pathname}
        initial={config.enter}
        animate="center"
        exit={config.exit}
        variants={slideVariants}
        transition={{ duration: 0.6, ease: "easeInOut" }}
      >
        {children}
      </motion.div>
    </AnimatePresence>
  );
}
