/**
 * Wonder Wallz — Homepage
 * /app/page.tsx  (Next.js App Router)
 *
 * Sections (in order):
 *  1. Hero                    → components/Hero.tsx
 *  2. Wonder Wallz Trust       → WonderWallzTrust.jsx
 *  3. Shop by Product          → ShopByProduct.jsx
 *  4. Wall Transformations     → WallTransformations.jsx
 *  5. Social Proof             → SocialProof.jsx
 *  6. FAQ + Why Wonder Wallz   → FAQSection.jsx
 *
 * NOTE: The custom-order journey (Upload Design → Project Builder → Email)
 * now lives on its own dedicated page at /app/custom-design/page.tsx and is
 * intentionally NOT rendered on the homepage. Catalogue products (Readymade
 * Wallpapers, Blinds, Curtains, Flooring) continue to flow through
 * Collections → Quick View → Cart → WhatsApp, unaffected by this change.
 *
 * NOTE: The Hero section is now a native React component (components/Hero.tsx).
 * It was previously embedded via <iframe> from a standalone HTML file
 * (/public/html/wonder_wallz_hero.html); that file and the IframeSection
 * embed are no longer used here.
 *
 * Metadata follows Next.js 13+ App Router conventions.
 */

import type { Metadata } from "next";

// ── React component imports ──────────────────────────────────────────────────
import Hero from "@/components/Hero";
import CustomDesignCTA from "@/components/CustomDesignCTA";
import FAQSection from "@/components/FAQSection";
import WonderWallzTrust from "@/components/WonderWallzTrust";
import SocialProof from "@/components/SocialProof/SocialProof";
import TrustStrip from "@/components/TrustStrip";
import { Suspense } from "react";
import { SectionScrollHandler } from "@/components/SectionScrollHandler";
import CompletedProjects from "@/components/CompletedProjects/CompletedProjects";
import ShopByCategory from "@/components/ShopByCategory";



// ── SEO Metadata ─────────────────────────────────────────────────────────────
export const metadata: Metadata = {
  title: "Wonder Wallz – Premium Custom Wallpapers, Custom glass films, Custom canvas, Flooring, Blinds and Curtains and upholstery for Homes & Offices in India",
  description:
    "Transform any wall or room with Wonder Wallz. Explore 500+ custom-sized designer wallpapers — Artistic, Religion , Kids , etc. Also see our wide range of Flooring, Blinds and Curtains and upholstery. Order easily on WhatsApp. Pan-India delivery.",
  keywords: [
    "wallpaper India",
    "home decor",
    "wooden flooring",
    "PVC flooring",
    "SPC flooring",
    "custom wallpaper",
    "designer wallpaper",
    "wallpaper online India",
    "home decor wallpaper",
    "wall murals India",
    "Wonder Wallz",
    "premium wallpaper",
    "peel and stick wallpaper",
    "office wallpaper",
    "Blinds and Curtains",
    "custom glass films",
    "custom canvas",
    "flooring",
    "upholstery",
    "sofa cover",
    "wallpaper for home",
    "wallpaper for office",
    "vinyl wallpaper",
    "non-woven wallpaper",
  ],
  metadataBase: new URL("https://wonderwallz.in"),
  alternates: { canonical: "/" },
  openGraph: {
    title: "Wonder Wallz – Transform Your Space with Designer Wallpapers",
    description:
      "Premium custom wallpapers for every room. 1,500+ designs. Delivery all over West Bengal. Free WhatsApp consultation.",
    url: "https://wonderwallz.in",
    siteName: "Wonder Wallz",
    // NOTE: url + siteName were already present here — kept as-is.
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
        "Wonder Wallz offers premium custom-sized designer wallpapers, wall murals, glass films, flooring, blinds, curtains, upholstery and canvas prints for residential and commercial spaces across India.",
      areaServed: "IN",
      contactPoint: [
        {
          "@type": "ContactPoint",
          contactType: "customer service",
          telephone: "+91-98831-00377",
          availableLanguage: ["English", "Hindi"],
          areaServed: "IN",
        },
        {
          "@type": "ContactPoint",
          contactType: "sales",
          telephone: "+91-98301-73898",
          availableLanguage: ["English", "Hindi"],
          areaServed: "IN",
        },
      ],
      sameAs: [
        "https://www.instagram.com/wonderwallz_kolkata",
        "https://wa.me/9883100377",
      ],
      // Full showroom addresses/hours are declared once, on /contact
      // (the canonical page for that data) to avoid duplicating
      // LocalBusiness/address markup across pages. See app/contact/page.tsx.
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
      {/* Reads ?scrollTo=<id> on mount and scrolls, then cleans the URL */}
      <Suspense fallback={null}>
        <SectionScrollHandler />
      </Suspense>
      {/* JSON-LD structured data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <main id="main-content">
        {/* ── 1. HERO ─────────────────────────────────────────────────────── */}
        {/*
         * Native React component — no longer an iframe embed.
         */}
        <Hero />
        {/* ─────────────── 2. PREMIUM TRUST STRIP ─────────────── */}
        {/*
         * Continuous scrolling trust banner reinforcing Wonder Wallz's
         * craftsmanship, product quality and nationwide service.
         *
         * Highlights key brand strengths including premium materials,
         * HP Latex printing, custom sizing, eco-friendly inks,
         * installation support and Pan India delivery.
         *
         * Designed to immediately build credibility after the Hero,
         * creating confidence before visitors explore categories,
         * featured collections and the custom project workflow.
         */}
          <TrustStrip />
          {/* ─────────────── 3. SHOP BY CATEGORY ─────────────── */}
          {/*
           * Primary product discovery section introducing Wonder Wallz's
           * complete range of interior décor solutions.
           *
           * Provides quick navigation to each major product category,
           * allowing visitors to explore wallpapers, blinds, curtains,
          * flooring, glass films, canvas prints and upholstery.
           *
           * Designed as the first conversion-focused section after the Hero,
           * encouraging users to begin browsing products while maintaining
           * a premium, editorial shopping experience.
           */}
          <ShopByCategory />
        {/* ──────── 2. WONDER WALLZ TRUST ─────────────────────────────── */}
       {/*
        * Premium trust-building section combining brand highlights,
        * customer benefits, key statistics and the purchase journey.
        *
        * Explains why customers should choose Wonder Wallz and how
        * ordering works, replacing the previous "Why Wonder Wallz"
        * and "How It Works" sections.
        *
        * Designed to build confidence before showcasing customer
        * installations, testimonials and final conversion CTAs.
        */}
         <WonderWallzTrust />
         {/* ─────────────── 6. CUSTOM DESIGN CTA ─────────────── */}
         {/*
          * Premium call-to-action inviting customers to create
          * completely bespoke wallpaper designs.
          *
          * Highlights Wonder Wallz's ability to transform personal
          * artwork, reference images and creative ideas into
          * print-ready wall murals tailored to exact wall dimensions.
          *
          * Designed as the primary conversion point before customer
          * testimonials and the final enquiry section.
          */}
         <CustomDesignCTA />         

        {/* ──────── 4. WALL TRANSFORMATIONS ─────────────────────────────── */}
        {/*
         * Wonder Wallz portfolio showcase.
         *
         * Displays real before & after interior transformations using
         * wallpapers, custom glass films and other Wonder Wallz products.
         *
         * The section is fully data-driven from `src/lib/transformations.ts`
         * and showcases completed projects through an interactive comparison
         * slider with project details and direct navigation to the relevant
         * collection.
         *
         * Purpose:
         * - Build customer trust with real installations
         * - Demonstrate product quality and transformation impact
         * - Drive visitors from inspiration to product collections
         * - Serve as a reusable portfolio component across the website
         */}
        <section id="wall-transformations" className="scroll-mt-28">
          <CompletedProjects />   
        </section>   
        {/* ──────── 5. SOCIAL PROOF ───────────────────────────────────────── */}
        {/*
         * Builds trust by combining authentic customer testimonials with
         * Wonder Wallz showroom locations.
         *
         * The section reinforces brand credibility through real customer
         * experiences while encouraging visitors to visit our physical stores.
         *
         * Data is sourced from:
         * - src/lib/testimonials.ts
         * - src/lib/stores.ts
         *
         * Purpose:
         * - Showcase customer satisfaction
         * - Highlight physical showroom presence
         * - Strengthen purchase confidence
         * - Bridge visitors to the FAQ and final conversion
         */}
        <SocialProof />            

        

       {/* ──────── 6. FAQ + WHY WONDER WALLZ ─────────────────────────────── */}
       {/*
        * Resolves common customer questions while reinforcing Wonder Wallz's
        * expertise, credibility and service commitment before the final footer.
        *
        * Left Column:
        * - Frequently Asked Questions
        * - Ordering & payment process
        * - Installation & delivery
        * - Custom product workflow
        *
        * Right Column:
        * - Why Wonder Wallz?
        * - Brand story & company overview
        * - Founder & experience highlights
        * - Store locations
        * - Final call-to-action
        *
        * Purpose:
        * - Reduce customer hesitation
        * - Answer last-minute questions
        * - Build confidence through transparency
        * - Guide visitors toward starting their project
        */}
      <section id="faq" className="scroll-mt-28">
        <FAQSection />
      </section>
      </main>
    </>
  );
}
