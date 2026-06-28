/**
 * app/collections/page.tsx
 *
 * Landing page for ALL Wonder Wallz collections.
 * Sits one level above the existing dynamic route at
 * /app/collections/[category]/page.tsx (which is left untouched).
 *
 * Structure:
 *   1. Hero            — "Explore Our Collections"
 *   2. Category Grid    — Wallpaper, Blinds, Curtains, Flooring,
 *                          Glass Films, Canvas Prints
 *   3. Why Wonder Wallz — 20+ Years / HP Latex / Pan India / WB Installation
 *   4. CTA               — "Need something unique?" → /custom-design
 *
 * Data + cards are reused from existing single sources of truth:
 *   - src/lib/products.ts        (category copy, images, hrefs)
 *   - components/ShopByProduct   (ProductCard, exported for reuse here)
 *
 * No new product or collection data was introduced — this page is purely
 * a new entry point into what already exists.
 */

import type { Metadata } from "next";
import CollectionsPageContent from "@/components/Collection/CollectionsPageContent";

// ── SEO Metadata ─────────────────────────────────────────────────────────────
export const metadata: Metadata = {
  title:
    "Shop All Collections — Wallpapers, Blinds, Curtains, Flooring, Glass Films & Canvas | Wonder Wallz",
  description:
    "Browse every Wonder Wallz collection in one place: custom wallpapers, blinds, curtains, flooring, glass films and canvas prints. Premium interior products, custom-sized, with Pan-India delivery and installation across West Bengal.",
  keywords: [
    "Wonder Wallz collections",
    "wallpaper collection India",
    "blinds collection",
    "curtains collection",
    "flooring collection",
    "glass films collection",
    "canvas prints collection",
    "custom interior products India",
  ],
  alternates: { canonical: "/collections" },
  openGraph: {
    title: "Shop All Collections | Wonder Wallz",
    description:
      "Premium interior products for every space — wallpapers, blinds, curtains, flooring, glass films and canvas prints.",
    url: "https://wonderwallz.in/collections",
    siteName: "Wonder Wallz",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Shop All Collections | Wonder Wallz",
    description:
      "Premium interior products for every space — wallpapers, blinds, curtains, flooring, glass films and canvas prints.",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, "max-image-preview": "large" },
  },
};

// ── JSON-LD structured data ───────────────────────────────────────────────────
const jsonLd = {
  "@context": "https://schema.org",
  "@type": "CollectionPage",
  "@id": "https://wonderwallz.in/collections#page",
  name: "Wonder Wallz Collections",
  url: "https://wonderwallz.in/collections",
  isPartOf: { "@id": "https://wonderwallz.in/#website" },
  about: {
    "@id": "https://wonderwallz.in/#business",
  },
  hasPart: [
    "Wallpapers",
    "Blinds",
    "Curtains",
    "Flooring",
    "Glass Films",
    "Canvas Prints",
  ].map((name) => ({ "@type": "Thing", name })),
};

export default function CollectionsLandingPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <main id="main-content">
        <CollectionsPageContent />
      </main>
    </>
  );
}
