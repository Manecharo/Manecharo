import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        // New clean, high-contrast color scheme
        gold: "#FFD700", // Brighter gold for better contrast
        charcoal: "#0A0A0A", // Deeper black for maximum contrast
        navy: "#1A237E", // Deep navy blue accent
        red: "#D32F2F", // Bold red accent
        accent: "#FF6B35", // Bold orange accent
        "gray-light": "#F5F5F5", // Very light gray for subtle backgrounds
        "gray-mid": "#A0A0A0", // Medium gray for borders
        "pure-white": "#FFFFFF",
        // Legacy colors (kept for compatibility)
        cream: "#FFFFFF", // Changed to white
        terracotta: "#FF6B35",
        sage: "#2D5016",
      },
      fontFamily: {
        sans: ["var(--font-inter)", "system-ui", "sans-serif"],
        display: ["var(--font-space-grotesk)", "var(--font-inter)", "sans-serif"],
        mono: ["Courier New", "monospace"],
      },
      fontSize: {
        hero: "clamp(2.5rem, 5vw, 4.5rem)",
        h1: "clamp(2rem, 4vw, 3.5rem)",
        h2: "clamp(1.5rem, 3vw, 2.5rem)",
        body: "clamp(1rem, 1.5vw, 1.125rem)",
      },
      animation: {
        "fade-up": "fadeUp 0.6s ease-out",
        "fade-in": "fadeIn 0.8s ease-out",
        "slide-left": "slideLeft 0.8s ease-out",
        "slide-right": "slideRight 0.8s ease-out",
        "scale-up": "scaleUp 0.6s ease-out",
      },
      keyframes: {
        fadeUp: {
          "0%": { opacity: "0", transform: "translateY(30px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        fadeIn: {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
        slideLeft: {
          "0%": { opacity: "0", transform: "translateX(-40px)" },
          "100%": { opacity: "1", transform: "translateX(0)" },
        },
        slideRight: {
          "0%": { opacity: "0", transform: "translateX(40px)" },
          "100%": { opacity: "1", transform: "translateX(0)" },
        },
        scaleUp: {
          "0%": { opacity: "0", transform: "scale(0.95)" },
          "100%": { opacity: "1", transform: "scale(1)" },
        },
      },
    },
  },
  plugins: [],
};

export default config;
