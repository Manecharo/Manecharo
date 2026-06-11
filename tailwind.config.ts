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
        // Brand palette
        gold: "#eec84e",
        charcoal: "#0A0A0A",
        navy: "#334D5C",
        red: "#dc5b49",
        accent: "#dc5b49",
        bone: "#F5F5F5",
        "gray-light": "#F5F5F5",
        "gray-mid": "#A0A0A0",
        "pure-white": "#FFFFFF",
        // Dark-surface steps
        coal: {
          800: "#111111",
          700: "#161616",
          600: "#1d1d1d",
        },
        // Legacy colors (kept for compatibility)
        cream: "#FFFFFF",
        terracotta: "#dc5b49",
        sage: "#2D5016",
      },
      fontFamily: {
        sans: ["var(--font-inter)", "system-ui", "sans-serif"],
        display: ["var(--font-space-grotesk)", "var(--font-inter)", "sans-serif"],
        mono: ["Courier New", "monospace"],
      },
      fontSize: {
        // Editorial scale
        mega: "clamp(3.25rem, 11vw, 11rem)",
        display: "clamp(2.75rem, 7.5vw, 7.5rem)",
        hero: "clamp(2.5rem, 5vw, 4.5rem)",
        h1: "clamp(2rem, 4vw, 3.5rem)",
        h2: "clamp(1.5rem, 3vw, 2.5rem)",
        body: "clamp(1rem, 1.5vw, 1.125rem)",
        label: "0.6875rem",
      },
      letterSpacing: {
        tightest: "-0.04em",
        wide2: "0.18em",
      },
      transitionTimingFunction: {
        "out-expo": "cubic-bezier(0.16, 1, 0.3, 1)",
        "in-out-soft": "cubic-bezier(0.65, 0, 0.35, 1)",
      },
      zIndex: {
        "60": "60",
        "70": "70",
        "80": "80",
        "90": "90",
        "100": "100",
      },
      animation: {
        "fade-up": "fadeUp 0.6s ease-out",
        "fade-in": "fadeIn 0.8s ease-out",
        "slide-left": "slideLeft 0.8s ease-out",
        "slide-right": "slideRight 0.8s ease-out",
        "scale-up": "scaleUp 0.6s ease-out",
        "spin-slow": "spin 14s linear infinite",
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
