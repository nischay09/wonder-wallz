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
import ShopByProduct from "@/components/ShopByProduct";
import FAQSection from "@/components/FAQSection";
import ProjectBuilder from "@/components/ProjectBuilder/ProjectBuilder";
import WonderWallzTrust from "@/components/WonderWallzTrust";
import WonderWallzCTA from "@/components/WonderWallz_CTA";
import WallTransformations from "@/components/WallTransformations/WallTransformations";
import SocialProof from "@/components/SocialProof/SocialProof";
import IframeSection from "@/components/IframeSection";


// ── SEO Metadata ─────────────────────────────────────────────────────────────
export const metadata: Metadata = {
  title: "Wonder Wallz – Premium Custom Wallpapers, Custom glass films, Custom canvas, Flooring, Blinds and Curtains and upholstery for Homes & Offices in India",
  description:
    "Transform any wall or room with Wonder Wallz. Explore 500+ custom-sized designer wallpapers — Artistic, Religion , Kids , etc. Also see our wide range of Flooring, Blinds and Curtains and upholstery. Order easily on WhatsApp. Pan-India delivery.",
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
    "Blinds and Curtains",
    "custom glass films",
    "custom canvas",
    "flooring",
    "upholstery",
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
        
        {/* ──────── 3. SHOP BY PRODUCT ───────────────────────────────── */}
        {/*
        * Primary product discovery hub.
        *
        * Introduces every product category offered by Wonder Wallz and
        * serves as the main navigation into the shopping experience.
        *
        * Powered by src/lib/products.ts as the single source of truth
        * for product data across the navbar, homepage and future pages.
        */}
        <ShopByProduct />
        {/* ──────── 4. CUSTOM PROJECT BUILDER ─────────────────────────────── */}
        {/*
         * Wonder Wallz signature feature.
         *
         * Customers can create a custom project by adding one or more design
         * requests for wallpapers, custom glass films or canvas prints.
         *
         * Each request will eventually support image uploads, dimensions,
         * design instructions, project summaries and email quotation.
         *
         * This section serves as the foundation of the Wonder Wallz quotation
         * workflow and will replace the previous Upload Your Design section.
         */}
        <ProjectBuilder />        

       

        {/* ──────── 5. WALL TRANSFORMATIONS ─────────────────────────────── */}
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
        <WallTransformations />    
        {/* ──────── 6. SOCIAL PROOF ───────────────────────────────────────── */}
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

        

       {/* ──────── 7. FAQ + WHY WONDER WALLZ ─────────────────────────────── */}
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
        <FAQSection />
      </main>
    </>
  );
}
