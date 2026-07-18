/**
 * Wonder Wallz — Custom Design Landing Page
 * /app/custom-design/page.tsx (Next.js App Router)
 *
 * Dedicated entry point for the Custom Projects ordering system:
 *   Upload Design → Project Builder → Email
 *
 * This page intentionally does NOT touch the Catalogue Orders system
 * (Collections → Quick View → Cart → WhatsApp). The two workflows stay
 * fully separate.
 *
 * Sections (in order):
 *  1. Hero            → CustomDesignHero.tsx
 *  2. Benefits         → CustomDesignBenefits.tsx
 *  3. How It Works      → CustomDesignHowItWorks.tsx
 *  4. Trust section     → CustomDesignTrust.tsx
 *  5. Project Builder   → existing ProjectBuilder component (unmodified)
 */

import type { Metadata } from "next";

import CustomDesignHero from "@/components/CustomDesign/CustomDesignHero";
import CustomDesignBenefits from "@/components/CustomDesign/CustomDesignBenefits";
import CustomDesignHowItWorks from "@/components/CustomDesign/CustomDesignHowItWorks";
import CustomDesignTrust from "@/components/CustomDesign/CustomDesignTrust";
import ProjectBuilder from "@/components/ProjectBuilder/ProjectBuilder";

// ── SEO Metadata ─────────────────────────────────────────────────────────────
export const metadata: Metadata = {
  title: "Custom Design – Create Your Own Wallpaper | Wonder Wallz",
  description:
    "Turn your own artwork, photos or inspiration into premium custom wallpaper printed using HP Latex technology. Free design consultation. Pan-India delivery.",
  alternates: { canonical: "/custom-design" },
  openGraph: {
    title: "Create Your Own Wallpaper — Wonder Wallz Custom Design",
    description:
      "Upload your own image, a Pinterest reference, or AI-generated artwork and we'll turn it into premium custom wallpaper.",
    url: "https://wonderwallz.in/custom-design",
    siteName: "Wonder Wallz",
    locale: "en_IN",
    type: "website",
    // Was missing — OG cards without an image render as a bare text link
    // when shared on WhatsApp/Facebook/LinkedIn, which matters a lot for
    // this page since it's meant to be shared as a CTA.
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Wonder Wallz Custom Design — Turn Your Artwork Into Wallpaper",
      },
    ],
  },
  // Was missing entirely.
  twitter: {
    card: "summary_large_image",
    title: "Create Your Own Wallpaper — Wonder Wallz Custom Design",
    description:
      "Upload your own artwork or reference image and get premium custom wallpaper, printed with HP Latex technology.",
    images: ["/og-image.jpg"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, "max-image-preview": "large" },
  },
};

// ── JSON-LD structured data ───────────────────────────────────────────────────
// Service, not Product: there's no single fixed SKU/price here — the page
// describes a bespoke design-to-print workflow (Upload → Project Builder →
// Email), which Service accurately models. No fake pricing/offers included.
const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Home", item: "https://wonderwallz.in" },
        {
          "@type": "ListItem",
          position: 2,
          name: "Custom Design",
          item: "https://wonderwallz.in/custom-design",
        },
      ],
    },
    {
      "@type": "Service",
      "@id": "https://wonderwallz.in/custom-design#service",
      name: "Custom Wallpaper & Wall Mural Design",
      serviceType: "Custom wallpaper design and printing",
      description:
        "Turn your own artwork, photos or inspiration into premium custom wallpaper printed using HP Latex technology, sized to your exact wall dimensions.",
      provider: { "@id": "https://wonderwallz.in/#business" },
      areaServed: "IN",
      url: "https://wonderwallz.in/custom-design",
    },
  ],
};

export default function CustomDesignPage() {
  return (
    <main id="main-content">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      {/* ── 1. HERO ─────────────────────────────────────────────────────── */}
      <CustomDesignHero />

      {/* ── 2. BENEFITS ─────────────────────────────────────────────────── */}
      <CustomDesignBenefits />

      {/* ── 3. HOW IT WORKS ─────────────────────────────────────────────── */}
      <CustomDesignHowItWorks />

      {/* ── 4. TRUST SECTION ────────────────────────────────────────────── */}
      <CustomDesignTrust />

      {/* ── 5. PROJECT BUILDER ──────────────────────────────────────────── */}
      {/*
       * Existing, unmodified ProjectBuilder component. The hero's
       * "Start Your Project" CTA scrolls to this anchor.
       */}
      <div id="start-project">
        <ProjectBuilder />
      </div>
    </main>
  );
}
