import type { Metadata, Viewport } from "next";
import { Playfair_Display, DM_Sans, Geist } from "next/font/google";
import "./globals.css";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { cn } from "@/lib/utils";
import { MotionConfig } from "framer-motion";
import { BASE_URL } from "@/lib/site";

// display: "swap" added here too so all three loaded fonts behave
// consistently (previously only Playfair/DM Sans had it).
const geist = Geist({ subsets: ["latin"], variable: "--font-sans", display: "swap" });

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
  display: "swap",
  weight: ["400", "500", "600", "700"],
});

const dmSans = DM_Sans({
  subsets: ["latin"],
  variable: "--font-dm-sans",
  display: "swap",
  weight: ["300", "400", "500", "600"],
});

// NOTE (SEO audit): metadataBase was previously only declared on the
// homepage's metadata export. Declaring it here on the root layout means
// EVERY route (including ones that don't set their own metadataBase, e.g.
// /contact) resolves relative OG/canonical URLs against the correct domain
// instead of silently falling back to Next's localhost default.
export const metadata: Metadata = {
  metadataBase: new URL(BASE_URL),
  title: {
    default: "Wonder Wallz — Statement Wallpapers for Bold Interiors",
    template: "%s | Wonder Wallz",
  },
  description:
    "Curated collections of designer wallpapers, murals, and wall art. Transform any room into a work of art.",
  keywords: ["wallpaper", "wall murals", "interior design", "home decor", "designer wallpaper"],
  icons: {
    icon: [
      { url: "/favicon/favicon.ico", sizes: "any" },
      { url: "/favicon/favicon-16x16.png", sizes: "16x16", type: "image/png" },
      { url: "/favicon/favicon-32x32.png", sizes: "32x32", type: "image/png" },
    ],
    shortcut: "/favicon/favicon.ico",
    apple: "/favicon/apple-touch-icon.png",
  },
  manifest: "/favicon/site.webmanifest",
  openGraph: {
    title: "Wonder Wallz",
    description: "Statement Wallpapers for Bold Interiors",
    type: "website",
    locale: "en_US",
  },
};

// themeColor moved out of `metadata` into its own `viewport` export —
// Next.js 14+ deprecated metadata.themeColor in favor of this API.
export const viewport: Viewport = {
  themeColor: "#1F2238", // --color-primary, matches globals.css design tokens
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={cn(playfair.variable, dmSans.variable, "font-sans", geist.variable)}
    >
      {/*
       * bg-background / text-foreground replace the previous
       * bg-parchment / text-walnut classes, which were never defined in
       * tailwind.config.ts and therefore did nothing — the design-system
       * CSS variables in globals.css (--background / --foreground) now
       * drive the base page color for the single fixed Wonder Wallz theme.
       */}
      <body className="bg-background text-foreground antialiased">
        {/*
         * MotionConfig reducedMotion="user" makes every `motion.*` component
         * in the app (Hero, CollectionCard, CollectionCarousel,
         * CollectionHero, CollectionFilters, etc.) automatically respect
         * the OS-level `prefers-reduced-motion` setting — animations
         * collapse to instant/near-instant transitions for users who have
         * that preference enabled, with zero changes needed in any
         * individual component. This is additive: nothing about the
         * default (non-reduced-motion) experience changes.
         */}
        <MotionConfig reducedMotion="user">
          <Navbar />
          <main className="min-h-screen">{children}</main>
          <Footer />
        </MotionConfig>
      </body>
    </html>
  );
}
