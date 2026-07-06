/**
 * Wonder Wallz — Site Configuration
 *
 * Single source of truth for site metadata, navigation, brand tokens,
 * social links, and feature flags. Import from here instead of scattering
 * magic strings across the codebase.
 */

// ─── Color Brand Tokens ───────────────────────────────────────────────────────

export const colorTokens = {
  /** Electric Blue — primary action, CTA backgrounds, focus rings */
  blue: {
    50:  "#eef5fe",
    100: "#d5e8fd",
    200: "#acd0fb",
    300: "#74aff8",
    400: "#3d89f5",
    500: "#2D7FF9",  // ← Brand anchor
    600: "#1a65e0",
    700: "#1450bc",
    800: "#1241a0",
    900: "#0d2e72",
    950: "#091d4e",
  },

  /** Royal Purple — secondary brand, gradient partner to blue */
  purple: {
    50:  "#f3edfe",
    100: "#e2d5fc",
    200: "#c7aff9",
    300: "#a87ef4",
    400: "#9157f3",
    500: "#7A3DF0",  // ← Brand anchor
    600: "#6828d6",
    700: "#551fb3",
    800: "#451a93",
    900: "#321270",
    950: "#1f0a4d",
  },

  /** Vibrant Orange — high-energy CTA, badges, notifications */
  orange: {
    50:  "#fff6ea",
    100: "#feeace",
    200: "#fdd49d",
    300: "#fcb95c",
    400: "#fc9c21",
    500: "#FF8A00",  // ← Brand anchor
    600: "#e07200",
    700: "#b85900",
    800: "#934600",
    900: "#6b3300",
    950: "#3d1c00",
  },

  /** Neutral — backgrounds, borders, body text */
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
} as const;

export type ColorScale = typeof colorTokens;

// ─── Brand Aliases ────────────────────────────────────────────────────────────

export const brand = {
  primary:   colorTokens.blue[500],   // #2D7FF9
  secondary: colorTokens.purple[500], // #7A3DF0
  accent:    colorTokens.orange[500], // #FF8A00
} as const;

// ─── Gradients ────────────────────────────────────────────────────────────────

export const gradients = {
  /** Blue → Purple: default brand gradient */
  brand:     "linear-gradient(135deg, #2D7FF9 0%, #7A3DF0 100%)",
  /** Purple → Orange: warm energy gradient */
  brandWarm: "linear-gradient(135deg, #7A3DF0 0%, #FF8A00 100%)",
  /** Blue → Purple → Orange: full brand spectrum */
  brandFull: "linear-gradient(135deg, #2D7FF9 0%, #7A3DF0 50%, #FF8A00 100%)",
  /** Radial mesh for hero backgrounds */
  mesh: [
    "radial-gradient(at 20% 30%, rgba(45,127,249,0.18) 0, transparent 50%)",
    "radial-gradient(at 80% 20%, rgba(122,61,240,0.14) 0, transparent 50%)",
    "radial-gradient(at 60% 80%, rgba(255,138,0,0.10) 0, transparent 50%)",
  ].join(", "),
} as const;

// ─── Typography ───────────────────────────────────────────────────────────────

export const typography = {
  fonts: {
    /** Display — headings, hero text, bold statements */
    display: "Plus Jakarta Sans",
    /** Body — paragraphs, UI copy */
    body:    "Inter",
    /** Mono — code, data labels */
    mono:    "JetBrains Mono",
  },

  /** Type scale in rem */
  scale: {
    "2xs": "0.625rem",
    xs:    "0.75rem",
    sm:    "0.875rem",
    base:  "1rem",
    md:    "1.125rem",
    lg:    "1.25rem",
    xl:    "1.5rem",
    "2xl": "1.875rem",
    "3xl": "2.25rem",
    "4xl": "3rem",
    "5xl": "3.75rem",
    "6xl": "4.5rem",
    "7xl": "6rem",
  },
} as const;

// ─── Site Metadata ────────────────────────────────────────────────────────────

export const siteConfig = {
  /** Public-facing site name */
  name: "Wonder Wallz",

  /** Short tagline used in OG tags and hero subtitles */
  tagline: "Wallpapers that make your screen a statement.",

  /** Full description for SEO meta tags */
  description:
    "Wonder Wallz is the home of high-resolution, artist-curated wallpapers for desktop and mobile. Browse thousands of designs across every aesthetic, from minimal to maximalist.",

  /** Canonical origin (no trailing slash) */
  url: "https://wonderwallz.app",

  /** OG / Twitter default image */
  ogImage: "https://wonderwallz.app/og-default.jpg",

  /** Contact email */
  email: "hello@wonderwallz.app",

  /** SEO keywords */
  keywords: [
    "wallpapers",
    "desktop backgrounds",
    "mobile wallpapers",
    "4K wallpapers",
    "aesthetic wallpapers",
    "artist wallpapers",
    "digital art downloads",
  ],

  /** Site locale */
  locale: "en_US",

  /** Twitter / X handle */
  twitterHandle: "@WonderWallz",
} as const;

export type SiteConfig = typeof siteConfig;

// ─── Navigation ───────────────────────────────────────────────────────────────

export type NavItem = {
  label: string;
  href:  string;
  /** Whether to highlight as active on exact match only */
  exact?: boolean;
  /** Optional badge text */
  badge?: string;
};

export const mainNav: NavItem[] = [
  { label: "Explore",    href: "/explore",    exact: false },
  { label: "Categories", href: "/categories", exact: false },
  { label: "Artists",    href: "/artists",    exact: false },
  { label: "New",        href: "/new",        exact: true, badge: "Fresh" },
  { label: "Pricing",    href: "/pricing",    exact: true },
];

export const footerNav: Record<string, NavItem[]> = {
  Product: [
    { label: "Explore",    href: "/explore"    },
    { label: "Categories", href: "/categories" },
    { label: "Artists",    href: "/artists"    },
    { label: "New Arrivals", href: "/new"      },
    { label: "Pricing",    href: "/pricing"    },
  ],
  Company: [
    { label: "About",    href: "/about"   },
    { label: "Blog",     href: "/blog"    },
    { label: "Careers",  href: "/careers" },
    { label: "Press",    href: "/press"   },
  ],
  Legal: [
    { label: "Privacy Policy",    href: "/privacy"  },
    { label: "Terms of Service",  href: "/terms"    },
    { label: "Cookie Policy",     href: "/cookies"  },
    { label: "License Guide",     href: "/licenses" },
  ],
  Support: [
    { label: "Help Center", href: "/help"    },
    { label: "Contact",     href: "/contact" },
    { label: "Status",      href: "/status"  },
  ],
};

// ─── Social Links ─────────────────────────────────────────────────────────────

export type SocialLink = {
  platform: string;
  href:     string;
  /** aria-label for screen readers */
  label:    string;
};

export const socialLinks: SocialLink[] = [
  { platform: "twitter",   href: "https://twitter.com/WonderWallz",             label: "Follow Wonder Wallz on X (Twitter)" },
  { platform: "instagram", href: "https://instagram.com/wonderwallz_kolkata",           label: "Follow Wonder Wallz on Instagram"   },
  { platform: "pinterest", href: "https://pinterest.com/wonderwallz",           label: "Follow Wonder Wallz on Pinterest"   },
  { platform: "github",    href: "https://github.com/wonderwallz",              label: "Wonder Wallz on GitHub"             },
  { platform: "discord",   href: "https://discord.gg/wonderwallz",              label: "Join the Wonder Wallz Discord"      },
];

// ─── Feature Flags ────────────────────────────────────────────────────────────

export const featureFlags = {
  /** Enable dark mode toggle in header */
  darkModeToggle: true,
  /** Show "New" badge on nav item */
  newBadge:       true,
  /** Enable AI-powered wallpaper generation */
  aiGeneration:   false,
  /** Enable collections / curated playlists */
  collections:    true,
  /** Show pricing page */
  pricing:        true,
  /** Enable artist submission flow */
  artistSubmissions: false,
} as const;

export type FeatureFlags = typeof featureFlags;

// ─── Breakpoints (mirrors tailwind.config) ───────────────────────────────────

export const breakpoints = {
  xs:  480,
  sm:  640,
  md:  768,
  lg:  1024,
  xl:  1280,
  "2xl": 1440,
  "3xl": 1920,
} as const;

// ─── Layout Constants ─────────────────────────────────────────────────────────

export const layout = {
  headerHeight:     64,   // px
  containerMax:     1280, // px
  containerWide:    1440, // px
  containerNarrow:  768,  // px
  sectionY:         80,   // px
  gridColumns:      12,
  gridGap:          24,   // px
} as const;

// ─── SEO Helpers ──────────────────────────────────────────────────────────────

/**
 * Build a page title in the format: "Page Name — Wonder Wallz"
 * Pass undefined to get the root title.
 */
export function buildTitle(pageTitle?: string): string {
  return pageTitle ? `${pageTitle} — ${siteConfig.name}` : siteConfig.name;
}

/**
 * Build a canonical URL from a path.
 * Strips trailing slashes for consistency.
 */
export function buildCanonical(path: string): string {
  const clean = path.startsWith("/") ? path : `/${path}`;
  return `${siteConfig.url}${clean}`.replace(/\/$/, "");
}
