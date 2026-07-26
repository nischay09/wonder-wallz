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
    url: "https://thewonderwallz.com/collections",
    siteName: "Wonder Wallz",
    type: "website",
    locale: "en_IN",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Wonder Wallz Collections — Wallpapers, Blinds, Curtains, Flooring, Glass Films & Canvas",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Shop All Collections | Wonder Wallz",
    description:
      "Premium interior products for every space — wallpapers, blinds, curtains, flooring, glass films and canvas prints.",
    images: ["/og-image.jpg"],
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
  "@graph": [
    {
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Home", item: "https://thewonderwallz.com" },
        {
          "@type": "ListItem",
          position: 2,
          name: "Collections",
          item: "https://thewonderwallz.com/collections",
        },
      ],
    },
    {
      "@type": "CollectionPage",
      "@id": "https://thewonderwallz.com/collections#page",
      name: "Wonder Wallz Collections",
      url: "https://thewonderwallz.com/collections",
      isPartOf: { "@id": "https://thewonderwallz.com/#website" },
      about: {
        "@id": "https://thewonderwallz.com/#business",
      },
      // Each entry links to its actual collection URL — a bare `name` with
      // no `url` is technically valid Schema.org but gives crawlers nothing
      // to follow, which defeats the point of listing them here at all.
      // Slugs match src/lib/collections.ts exactly (single source of truth).
      hasPart: [
        { name: "Wallpapers", slug: "wallpapers" },
        { name: "Blinds", slug: "blinds" },
        { name: "Curtains", slug: "curtains" },
        { name: "Flooring", slug: "flooring" },
        { name: "Glass Films", slug: "glass-films" },
        { name: "Canvas Prints", slug: "canvas-prints" },
        { name: "Upholstery", slug: "upholstery" },
      ].map(({ name, slug }) => ({
        "@type": "Thing",
        name,
        url: `https://thewonderwallz.com/collections/${slug}`,
      })),
    },
  ],
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
