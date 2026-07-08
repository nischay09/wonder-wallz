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
      // ─── Wonder Wallz Semantic Colors ────────────────────────────────────
      // All colors resolve to CSS variables defined in globals.css so
      // light/dark mode swap automatically without changing class names.
      colors: {
        // Core semantic tokens — use these in components
        primary: {
          DEFAULT: "var(--primary)",
          hover:   "var(--primary-hover)",
          active:  "var(--primary-active)",
        },
        accent: {
          DEFAULT: "var(--accent)",
          hover:   "var(--accent-hover)",
          active:  "var(--accent-active)",
        },
        background: "var(--background)",
        surface: {
          DEFAULT: "var(--surface)",
          raised:  "var(--surface-raised)",
          overlay: "var(--surface-overlay)",
        },
        border: {
          DEFAULT: "var(--border)",
          subtle:  "var(--border-subtle)",
          strong:  "var(--border-strong)",
          brand:   "var(--border-brand)",
        },
        foreground: "var(--foreground)",
        muted: "var(--muted)",
        success: "var(--success)",
        error: "var(--error)",

        // Text roles
        text: {
          primary:   "var(--text-primary)",
          secondary: "var(--text-secondary)",
          tertiary:  "var(--text-tertiary)",
          disabled:  "var(--text-disabled)",
          inverse:   "var(--text-inverse)",
          brand:     "var(--text-brand)",
          accent:    "var(--text-accent)",
        },

        // Neutral scale — foundation token for backgrounds, borders,
        // and text hierarchy that needs a step between semantic tokens
        neutral: {
          0:    "var(--color-neutral-0)",
          50:   "var(--color-neutral-50)",
          100:  "var(--color-neutral-100)",
          200:  "var(--color-neutral-200)",
          300:  "var(--color-neutral-300)",
          400:  "var(--color-neutral-400)",
          500:  "var(--color-neutral-500)",
          600:  "var(--color-neutral-600)",
          700:  "var(--color-neutral-700)",
          800:  "var(--color-neutral-800)",
          900:  "var(--color-neutral-900)",
          950:  "var(--color-neutral-950)",
        },
      },

      // ─── Typography (unchanged) ────────────────────────────────────────
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

      // ─── Spacing (unchanged) ────────────────────────────────────────────
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

      // ─── Border Radius — foundation token, subtle/premium scale ─────────
      borderRadius: {
        "xs":  "var(--radius-xs)",
        "sm":  "var(--radius-sm)",
        "md":  "var(--radius-md)",
        "lg":  "var(--radius-lg)",
        "xl":  "var(--radius-xl)",
        "2xl": "1.25rem",
        "3xl": "1.5rem",
        "4xl": "2rem",
        "5xl": "2.5rem",
        "pill": "9999px",
      },

      // ─── Box Shadow — subtle, warm-tinted elevation (no glows) ──────────
      boxShadow: {
        "card":        "var(--shadow-card)",
        "card-hover":  "var(--shadow-card-hover)",
        "elevated":    "var(--shadow-elevated)",
        "focus-ring":  "var(--shadow-focus-ring)",
      },

      // ─── Transitions (unchanged) ─────────────────────────────────────────
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

      // ─── Breakpoints (unchanged) ─────────────────────────────────────────
      screens: {
        "xs":   "480px",
        "sm":   "640px",
        "md":   "768px",
        "lg":   "1024px",
        "xl":   "1280px",
        "2xl":  "1440px",
        "3xl":  "1920px",
      },

      // ─── Z-Index (unchanged) ─────────────────────────────────────────────
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

      // ─── Animations (unchanged) ──────────────────────────────────────────
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
