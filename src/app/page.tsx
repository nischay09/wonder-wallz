/**
 * Wonder Wallz — Homepage
 * /app/page.tsx  (Next.js App Router)
 *
 * Sections (in order):
 *  1. Hero                    → wonder_wallz_hero.html         (iframe embed)
 *  2. Featured Categories     → FeaturedCategories.jsx
 *  3. Why Wonder Wallz        → WhyWonderWallz.jsx
 *  4. How It Works            → HowItWorks.jsx
 *  5. Customer Transformations→ wonder_wallz_before_after_showcase.html (iframe embed)
 *  6. Inspiration Gallery     → WonderWallzGallery.jsx
 *  7. CTA Banner              → WonderWallz_CTA.jsx
 *
 * NOTE: The two HTML-only sections (Hero & Before/After) are embedded via
 * <iframe> with `scrolling="no"` and auto-resize so they behave like native
 * sections. If you later convert them to React/JSX you can drop the iframes
 * and import them directly.
 *
 * Metadata follows Next.js 13+ App Router conventions.
 */

import type { Metadata } from "next";

// ── React component imports ──────────────────────────────────────────────────
import FeaturedCategories from "@/components/FeaturedCategories";
import WhyWonderWallz from "@/components/WhyWonderWallz";
import HowItWorks from "@/components/HowItWorks";
import WonderWallzGallery from "@/components/WonderWallzGallery";
import WonderWallzCTA from "@/components/WonderWallz_CTA";
import IframeSection from "@/components/IframeSection";
import UploadYourDesign from "@/components/UploadYourDesign";


// ── SEO Metadata ─────────────────────────────────────────────────────────────
export const metadata: Metadata = {
  title: "Wonder Wallz – Premium Custom Wallpapers for Homes & Offices in India",
  description:
    "Transform any wall with Wonder Wallz. Explore 1,500+ custom-sized designer wallpapers — floral, luxury, geometric, nature & more. Order easily on WhatsApp. Pan-India delivery.",
  keywords: [
    "wallpaper India",
    "custom wallpaper",
    "designer wallpaper",
    "wallpaper online India",
    "home decor wallpaper",
    "wall murals India",
    "Wonder Wallz",
    "premium wallpaper",
    "peel and stick wallpaper",
    "office wallpaper",
  ],
  metadataBase: new URL("https://wonderwallz.in"),
  alternates: { canonical: "/" },
  openGraph: {
    title: "Wonder Wallz – Transform Your Space with Designer Wallpapers",
    description:
      "Premium custom wallpapers for every room. 1,500+ designs. Delivery all over West Bengal. Free WhatsApp consultation.",
    url: "https://wonderwallz.in",
    siteName: "Wonder Wallz",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Wonder Wallz – Premium Designer Wallpapers",
      },
    ],
    locale: "en_IN",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Wonder Wallz – Premium Custom Wallpapers",
    description:
      "1,500+ designer wallpapers for homes & offices. Custom sizes. Pan-India delivery. Order on WhatsApp.",
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
      "@type": "LocalBusiness",
      "@id": "https://wonderwallz.in/#business",
      name: "Wonder Wallz",
      url: "https://wonderwallz.in",
      logo: "https://wonderwallz.in/logo.png",
      description:
        "Wonder Wallz offers premium custom-sized designer wallpapers for residential and commercial spaces across India.",
      areaServed: "IN",
      contactPoint: {
        "@type": "ContactPoint",
        contactType: "customer service",
        availableLanguage: ["English", "Hindi"],
      },
      sameAs: [
        "https://www.instagram.com/wonderwallz",
        "https://wa.me/9883100377",
      ],
    },
    {
      "@type": "WebSite",
      "@id": "https://wonderwallz.in/#website",
      url: "https://wonderwallz.in",
      name: "Wonder Wallz",
      potentialAction: {
        "@type": "SearchAction",
        target: {
          "@type": "EntryPoint",
          urlTemplate: "https://wonderwallz.in/search?q={search_term_string}",
        },
        "query-input": "required name=search_term_string",
      },
    },
  ],
};



// ── Page component ────────────────────────────────────────────────────────────
export default function HomePage() {
  return (
    <>
      {/* JSON-LD structured data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <main id="main-content">
        {/* ── 1. HERO ─────────────────────────────────────────────────────── */}
        {/*
         * The hero is a feature-rich standalone HTML page (animations, canvas,
         * Swiper, custom fonts). We embed it as a full-viewport iframe.
         * Place wonder_wallz_hero.html inside /public/html/.
         */}
        <IframeSection
          src="/html/wonder_wallz_hero.html"
          title="Wonder Wallz hero — Transform your walls with premium wallpapers"
          defaultHeight={820}
          id="hero"
        />
        {/* ── 2. UPLOAD YOUR DESIGN ─────────────────────────────────────── */}
        {/*
        * Wonder Wallz signature feature.
        * Customers can upload their own image, artwork, Pinterest inspiration,
        * Shutterstock reference, family photo, or business branding and receive
        * a custom wallpaper quote based on their wall dimensions.
        *
        * Designed as a high-conversion lead generation section positioned
        * immediately after the hero.
        */}
        <UploadYourDesign />

        {/* ── 2. FEATURED CATEGORIES ──────────────────────────────────────── */}
        {/*
         * Browse by collection: Floral, Luxury, Kids Room, Marble, Nature,
         * Abstract, Religious, Geometric, Office, Hotel.
         */}
        <FeaturedCategories />

        {/* ── 3. WHY WONDER WALLZ ─────────────────────────────────────────── */}
        {/*
         * Four USP cards: Custom Sizes · HD Print · Easy Install · Delivery.
         * Animated on scroll with Framer Motion.
         */}
        <WhyWonderWallz />

        {/* ── 4. HOW IT WORKS ─────────────────────────────────────────────── */}
        {/*
         * Schema.org HowTo — 4 steps: Choose → Measure → WhatsApp → Receive.
         * Timeline layout with staggered entrance animations.
         */}
        <HowItWorks />

        {/* ── 5. CUSTOMER TRANSFORMATIONS (Before / After) ────────────────── */}
        {/*
         * Interactive drag-to-compare slider carousel (Swiper + custom JS).
         * Embedded as iframe; place the file in /public/html/.
         */}
        <IframeSection
          src="/html/wonder_wallz_before_after_showcase.html"
          title="Customer wall transformations — before and after Wonder Wallz"
          defaultHeight={680}
          id="transformations"
        />

        {/* ── 6. INSPIRATION GALLERY ──────────────────────────────────────── */}
        {/*
         * Filterable masonry grid with 20 curated room/style images.
         * Hover reveals overlay with tag + "Get Inspired" CTA.
         */}
        <WonderWallzGallery />

        {/* ── 7. CTA BANNER ───────────────────────────────────────────────── */}
        {/*
         * Dark glassmorphism banner: "Ready to Transform Your Walls?"
         * Primary action: WhatsApp chat for a free personalised quote.
         */}
        <WonderWallzCTA />
      </main>
    </>
  );
}
