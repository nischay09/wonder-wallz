/**
 * app/contact/page.tsx
 *
 * SEO AUDIT FIX: this route previously had ZERO metadata. Because it's a
 * "use client" component, it can't export `metadata` directly (Next.js
 * requires that export from a Server Component). Without an override, the
 * page silently inherited the ROOT layout's default title/description —
 * meaning it was showing the exact same <title> and meta description as
 * the homepage. That's a duplicate-metadata issue search engines flag and
 * it wastes the page's own ranking potential for "Wonder Wallz Kolkata
 * contact / showroom" type searches.
 *
 * Fix: split into this thin Server Component (metadata only) that renders
 * the original, completely unmodified client UI from ContactPageClient.tsx.
 * No visual change, no logic change — only metadata was added.
 */

import type { Metadata } from "next";
import ContactPageClient from "./ContactPageClient";

export const metadata: Metadata = {
  title: "Contact Us — Showrooms in Kolkata",
  description:
    "Get in touch with Wonder Wallz. Visit our Bhowanipore or Chandni Chowk showrooms in Kolkata, call our design or interior products team, or start a custom wallpaper project.",
  alternates: { canonical: "/contact" },
  openGraph: {
    title: "Contact Wonder Wallz — Kolkata Showrooms",
    description:
      "Two showrooms in Kolkata — Bhowanipore (blinds, curtains, upholstery, flooring) and Chandni Chowk (custom wallpapers, wall murals, glass films). Call, visit, or start your project online.",
    url: "https://wonderwallz.in/contact",
    siteName: "Wonder Wallz",
    type: "website",
    locale: "en_IN",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Contact Wonder Wallz — Kolkata Showrooms",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Contact Wonder Wallz — Kolkata Showrooms",
    description:
      "Visit our Bhowanipore or Chandni Chowk showroom, call us, or start a custom wallpaper project online.",
    images: ["/og-image.jpg"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, "max-image-preview": "large" },
  },
};

// ── JSON-LD structured data ───────────────────────────────────────────────────
// Mirrors the two showrooms exactly as rendered in ContactPageClient.tsx
// (ShowroomCard props) and the two phone numbers from ContactCard props.
// This intentionally duplicates the `department` entries on the homepage's
// Organization/#business node via @id references rather than re-declaring
// them, to avoid conflicting/duplicate LocalBusiness data across pages.
const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "BreadcrumbList",
      itemListElement: [
        {
          "@type": "ListItem",
          position: 1,
          name: "Home",
          item: "https://wonderwallz.in",
        },
        {
          "@type": "ListItem",
          position: 2,
          name: "Contact",
          item: "https://wonderwallz.in/contact",
        },
      ],
    },
    {
      "@type": "LocalBusiness",
      "@id": "https://wonderwallz.in/#business",
      name: "Wonder Wallz",
      url: "https://wonderwallz.in",
      sameAs: ["https://www.instagram.com/wonderwallz_kolkata"],
      department: [
        {
          "@type": "LocalBusiness",
          name: "Wonder Wallz – Merlin Homeland (Bhowanipore)",
          telephone: "+91-98301-73898",
          address: {
            "@type": "PostalAddress",
            streetAddress: "18B, Ashutosh Mukherjee Road, Bhowanipore",
            addressLocality: "Kolkata",
            addressRegion: "West Bengal",
            postalCode: "700025",
            addressCountry: "IN",
          },
          openingHoursSpecification: [
            {
              "@type": "OpeningHoursSpecification",
              dayOfWeek: [
                "Monday",
                "Tuesday",
                "Wednesday",
                "Thursday",
                "Friday",
                "Saturday",
              ],
              opens: "10:00",
              closes: "19:00",
            },
          ],
          // Sunday is "by appointment" per ContactPageClient — not a fixed
          // opens/closes window, so intentionally left out rather than
          // approximated with invalid hours.
          areaServed: "West Bengal",
          knowsAbout: ["Blinds", "Curtains", "Upholstery", "Flooring"],
        },
        {
          "@type": "LocalBusiness",
          name: "Wonder Wallz – Chandni Chowk",
          telephone: "+91-98831-00377",
          address: {
            "@type": "PostalAddress",
            streetAddress:
              "157C, Lenin Sarani Road, Near Jyoti Cinema, Esplanade, Chandni Chowk, Bowbazar",
            addressLocality: "Kolkata",
            addressRegion: "West Bengal",
            postalCode: "700013",
            addressCountry: "IN",
          },
          openingHoursSpecification: [
            {
              "@type": "OpeningHoursSpecification",
              dayOfWeek: [
                "Monday",
                "Tuesday",
                "Wednesday",
                "Thursday",
                "Friday",
                "Saturday",
              ],
              opens: "10:00",
              closes: "19:00",
            },
          ],
          areaServed: "West Bengal",
          knowsAbout: [
            "Custom Wallpapers",
            "Wall Murals",
            "Custom Glass Films",
            "Personalised Projects",
          ],
        },
      ],
    },
  ],
};

export default function ContactPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <ContactPageClient />
    </>
  );
}
