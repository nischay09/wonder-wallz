import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/lib/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  darkMode: "class",
  theme: {
    extend: {
      // ─── Wonder Wallz Brand Colors ───────────────────────────────────────
      colors: {
        // Electric Blue — primary action, links, highlights
        blue: {
          50:  "#eef5fe",
          100: "#d5e8fd",
          200: "#acd0fb",
          300: "#74aff8",
          400: "#3d89f5",
          500: "#2D7FF9", // ← Brand anchor
          600: "#1a65e0",
          700: "#1450bc",
          800: "#1241a0",
          900: "#0d2e72",
          950: "#091d4e",
        },

        // Royal Purple — secondary, gradients, accents
        purple: {
          50:  "#f3edfe",
          100: "#e2d5fc",
          200: "#c7aff9",
          300: "#a87ef4",
          400: "#9157f3",
          500: "#7A3DF0", // ← Brand anchor
          600: "#6828d6",
          700: "#551fb3",
          800: "#451a93",
          900: "#321270",
          950: "#1f0a4d",
        },

        // Vibrant Orange — CTA, badges, energy accents
        orange: {
          50:  "#fff6ea",
          100: "#feeace",
          200: "#fdd49d",
          300: "#fcb95c",
          400: "#fc9c21",
          500: "#FF8A00", // ← Brand anchor
          600: "#e07200",
          700: "#b85900",
          800: "#934600",
          900: "#6b3300",
          950: "#3d1c00",
        },

        // Neutral — backgrounds, text, borders
        neutral: {
          0:    "#ffffff",
          50:   "#f8f8fb",
          100:  "#f0f0f7",
          200:  "#e1e1ee",
          300:  "#c8c8de",
          400:  "#9898b8",
          500:  "#6e6e96",
          600:  "#52527a",
          700:  "#3d3d60",
          800:  "#28284a",
          900:  "#171730",
          950:  "#0d0d1e",
          1000: "#060610",
        },

        // Semantic aliases
        brand: {
          primary:   "#2D7FF9",
          secondary: "#7A3DF0",
          accent:    "#FF8A00",
        },
      },

      // ─── Typography ──────────────────────────────────────────────────────
      fontFamily: {
        display: ["var(--font-display)", "system-ui", "sans-serif"],
        body:    ["var(--font-body)", "system-ui", "sans-serif"],
        mono:    ["var(--font-mono)", "ui-monospace", "monospace"],
      },

      fontSize: {
        "2xs": ["0.625rem", { lineHeight: "0.875rem" }],
        xs:   ["0.75rem",  { lineHeight: "1rem"     }],
        sm:   ["0.875rem", { lineHeight: "1.375rem" }],
        base: ["1rem",     { lineHeight: "1.625rem" }],
        md:   ["1.125rem", { lineHeight: "1.75rem"  }],
        lg:   ["1.25rem",  { lineHeight: "1.875rem" }],
        xl:   ["1.5rem",   { lineHeight: "2rem"     }],
        "2xl":["1.875rem", { lineHeight: "2.375rem" }],
        "3xl":["2.25rem",  { lineHeight: "2.75rem"  }],
        "4xl":["3rem",     { lineHeight: "3.5rem"   }],
        "5xl":["3.75rem",  { lineHeight: "4.25rem"  }],
        "6xl":["4.5rem",   { lineHeight: "5rem"     }],
        "7xl":["6rem",     { lineHeight: "6.5rem"   }],
      },

      fontWeight: {
        thin:       "100",
        extralight: "200",
        light:      "300",
        normal:     "400",
        medium:     "500",
        semibold:   "600",
        bold:       "700",
        extrabold:  "800",
        black:      "900",
      },

      letterSpacing: {
        tightest: "-0.06em",
        tighter:  "-0.04em",
        tight:    "-0.02em",
        normal:   "0em",
        wide:     "0.025em",
        wider:    "0.075em",
        widest:   "0.15em",
        caps:     "0.12em",
      },

      // ─── Spacing ─────────────────────────────────────────────────────────
      spacing: {
        "4.5":  "1.125rem",
        "13":   "3.25rem",
        "15":   "3.75rem",
        "18":   "4.5rem",
        "22":   "5.5rem",
        "26":   "6.5rem",
        "30":   "7.5rem",
        "34":   "8.5rem",
        "42":   "10.5rem",
        "50":   "12.5rem",
        "58":   "14.5rem",
        "66":   "16.5rem",
        "74":   "18.5rem",
        "82":   "20.5rem",
        "90":   "22.5rem",
        "128":  "32rem",
        "144":  "36rem",
        "160":  "40rem",
      },

      // ─── Border Radius ───────────────────────────────────────────────────
      borderRadius: {
        "xs":  "0.125rem",
        "sm":  "0.25rem",
        "md":  "0.5rem",
        "lg":  "0.75rem",
        "xl":  "1rem",
        "2xl": "1.25rem",
        "3xl": "1.5rem",
        "4xl": "2rem",
        "5xl": "2.5rem",
        "pill": "9999px",
      },

      // ─── Box Shadow ──────────────────────────────────────────────────────
      boxShadow: {
        "glow-blue":   "0 0 24px 0 rgba(45, 127, 249, 0.35)",
        "glow-purple": "0 0 24px 0 rgba(122, 61, 240, 0.35)",
        "glow-orange": "0 0 24px 0 rgba(255, 138, 0, 0.40)",
        "card":        "0 2px 12px 0 rgba(13, 13, 30, 0.08), 0 1px 3px 0 rgba(13, 13, 30, 0.06)",
        "card-hover":  "0 8px 32px 0 rgba(13, 13, 30, 0.12), 0 2px 8px 0 rgba(13, 13, 30, 0.08)",
        "card-dark":   "0 2px 12px 0 rgba(0, 0, 0, 0.40), 0 1px 3px 0 rgba(0, 0, 0, 0.30)",
        "elevated":    "0 16px 48px 0 rgba(13, 13, 30, 0.18)",
        "inner-light": "inset 0 1px 0 0 rgba(255, 255, 255, 0.08)",
      },

      // ─── Gradients ───────────────────────────────────────────────────────
      backgroundImage: {
        "gradient-brand":        "linear-gradient(135deg, #2D7FF9 0%, #7A3DF0 100%)",
        "gradient-brand-warm":   "linear-gradient(135deg, #7A3DF0 0%, #FF8A00 100%)",
        "gradient-brand-full":   "linear-gradient(135deg, #2D7FF9 0%, #7A3DF0 50%, #FF8A00 100%)",
        "gradient-blue-subtle":  "linear-gradient(135deg, rgba(45,127,249,0.12) 0%, rgba(122,61,240,0.08) 100%)",
        "gradient-mesh":         "radial-gradient(at 20% 30%, rgba(45,127,249,0.18) 0, transparent 50%), radial-gradient(at 80% 20%, rgba(122,61,240,0.14) 0, transparent 50%), radial-gradient(at 60% 80%, rgba(255,138,0,0.10) 0, transparent 50%)",
        "gradient-card-border":  "linear-gradient(135deg, rgba(45,127,249,0.4) 0%, rgba(122,61,240,0.4) 100%)",
        "gradient-dark-bg":      "linear-gradient(180deg, #0d0d1e 0%, #171730 100%)",
        "gradient-noise":        "url('/noise.svg')",
      },

      // ─── Transitions ─────────────────────────────────────────────────────
      transitionDuration: {
        "0":   "0ms",
        "75":  "75ms",
        "100": "100ms",
        "150": "150ms",
        "200": "200ms",
        "250": "250ms",
        "300": "300ms",
        "400": "400ms",
        "500": "500ms",
        "700": "700ms",
        "1000":"1000ms",
      },

      transitionTimingFunction: {
        "brand":   "cubic-bezier(0.22, 1, 0.36, 1)",
        "bounce":  "cubic-bezier(0.34, 1.56, 0.64, 1)",
        "snap":    "cubic-bezier(0.5, 0, 0.1, 1)",
      },

      // ─── Breakpoints ─────────────────────────────────────────────────────
      screens: {
        "xs":   "480px",
        "sm":   "640px",
        "md":   "768px",
        "lg":   "1024px",
        "xl":   "1280px",
        "2xl":  "1440px",
        "3xl":  "1920px",
      },

      // ─── Z-Index ─────────────────────────────────────────────────────────
      zIndex: {
        "below":    "-1",
        "base":     "0",
        "raised":   "10",
        "dropdown": "200",
        "sticky":   "300",
        "overlay":  "400",
        "modal":    "500",
        "toast":    "600",
        "tooltip":  "700",
        "top":      "9999",
      },

      // ─── Animations ──────────────────────────────────────────────────────
      keyframes: {
        "fade-in": {
          "0%":   { opacity: "0" },
          "100%": { opacity: "1" },
        },
        "fade-up": {
          "0%":   { opacity: "0", transform: "translateY(16px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        "fade-down": {
          "0%":   { opacity: "0", transform: "translateY(-16px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        "scale-in": {
          "0%":   { opacity: "0", transform: "scale(0.92)" },
          "100%": { opacity: "1", transform: "scale(1)" },
        },
        "slide-in-right": {
          "0%":   { opacity: "0", transform: "translateX(24px)" },
          "100%": { opacity: "1", transform: "translateX(0)" },
        },
        "slide-in-left": {
          "0%":   { opacity: "0", transform: "translateX(-24px)" },
          "100%": { opacity: "1", transform: "translateX(0)" },
        },
        "shimmer": {
          "0%":   { backgroundPosition: "200% 0" },
          "100%": { backgroundPosition: "-200% 0" },
        },
        "pulse-glow": {
          "0%, 100%": { opacity: "1"   },
          "50%":      { opacity: "0.5" },
        },
        "float": {
          "0%, 100%": { transform: "translateY(0px)"  },
          "50%":      { transform: "translateY(-8px)" },
        },
        "spin-slow": {
          "from": { transform: "rotate(0deg)"   },
          "to":   { transform: "rotate(360deg)" },
        },
      },

      animation: {
        "fade-in":        "fade-in 0.3s ease-out both",
        "fade-up":        "fade-up 0.4s cubic-bezier(0.22,1,0.36,1) both",
        "fade-down":      "fade-down 0.4s cubic-bezier(0.22,1,0.36,1) both",
        "scale-in":       "scale-in 0.3s cubic-bezier(0.22,1,0.36,1) both",
        "slide-in-right": "slide-in-right 0.4s cubic-bezier(0.22,1,0.36,1) both",
        "slide-in-left":  "slide-in-left 0.4s cubic-bezier(0.22,1,0.36,1) both",
        "shimmer":        "shimmer 2s linear infinite",
        "pulse-glow":     "pulse-glow 2s ease-in-out infinite",
        "float":          "float 3s ease-in-out infinite",
        "spin-slow":      "spin-slow 8s linear infinite",
      },
    },
  },
  plugins: [],
};

export default config;
