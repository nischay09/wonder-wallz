/**
 * src/lib/productLandingConfigs/blinds.tsx
 *
 * Content contract for the Blinds consultation landing page. Satisfies
 * ProductLandingConfig from ProductLandingPage.tsx — no layout or markup
 * lives here, only copy, imagery, and CTA labels.
 *
 * To render this: <ProductLandingPage collection={collection} {...blindsConfig} />
 */

import type { ProductLandingConfig } from "@/components/Product/ProductLandingPage";

export const blindsConfig: ProductLandingConfig = {
  whatsapp: {
    number: "919830173898",
    message:
      "Hi, I'd like to book a free blinds consultation. Could you share more details?",
  },
  modalCategory: "blinds",

  hero: {
    eyebrow: "Wonder Wallz Blinds",
    headlineLead: "Light, privacy and style —",
    headlineAccent: "on your terms.",
    description:
      "From motorised roller blinds to soft roman folds, our design consultants bring the full blinds catalogue to your window, measured and fitted with precision.",
    image: "/Blinds.webp",
    imageAlt: "Roman blinds dressing a sunlit living room window",
    primaryCtaLabel: "Book Free Consultation",
    secondaryCtaLabel: "Visit a Showroom",
    tertiaryCtaLabel: "Chat on WhatsApp",
  },

  categories: {
    eyebrow: "Explore",
    title: "Blinds for every room and light need",
    description:
      "Each category is tailored during your consultation to match your window size, light direction, and interior palette.",
    items: [
      {
        title: "Roller Blinds",
        description: "Clean, minimal coverage with smooth chain or motorised operation.",
        points: ["Blackout & sunscreen fabrics", "Motorised options", "Wipe-clean finishes"],
      },
      {
        title: "Roman Blinds",
        description: "Soft fabric folds that bring warmth and texture to a room.",
        points: ["Tailored pleats", "Premium linen & cotton", "Lined for insulation"],
      },
      {
        title: "Venetian Blinds",
        description: "Precise light control with horizontal slats in wood or aluminium.",
        points: ["Adjustable tilt", "Wood & faux-wood", "Moisture-resistant options"],
      },
      {
        title: "Vertical Blinds",
        description: "Ideal for wide windows and sliding doors, with smooth track glide.",
        points: ["Wide-window coverage", "Track-mounted glide", "Fade-resistant fabric"],
      },
    ],
  },

  whyChooseUs: {
    eyebrow: "Why Wonder Wallz",
    title: "Consultation-led, precision-fitted",
    items: [
      "Free in-home measurement & consultation",
      "500+ fabric and slat options",
      "Motorisation and smart-home integration",
      "Certified fitting teams",
      "2-year fitting warranty",
      "Same-week installation slots",
    ],
  },

  homeReview: {
    eyebrow: "At Your Home",
    title: "See it on your own window, before you decide",
    description:
      "Our consultant brings swatches, slat samples, and motorisation demos to your home so you can compare against real light and real walls.",
    bullets: [
      "Accurate window measurement on the spot",
      "Live fabric & slat comparisons in your light",
      "Transparent, itemised quote before you commit",
    ],
    priceNote: (
      <>
        Home consultations are <strong>₹500</strong>, fully adjustable
        against your final order.
      </>
    ),
    image: "/Blinds.avif",
    imageAlt: "Consultant showing blind fabric samples in a client's home",
    ctaLabel: "Book Home Consultation",
  },

  showrooms: {
    eyebrow: "Visit Us",
    title: "Or explore the full range in showroom",
    description: "Touch every fabric, test every mechanism, side by side.",
    locations: [
      {
        name: "Wonder Wallz Merlin Homeland",
        tagline: "Our flagship showroom, recommended for blinds consultations",
        points: ["Multiple fabric catalogues", "Motorisation demo wall", "Parking Available"],
      },
      {
        name: "Wonder Wallz Chandni Chowk",
        tagline: "Flooring consultations also available here",
        points: ["Appointment priority booking", "Customised Products", "On Lenin Sarani road"],
      },
    ],
    ctaLabel: "Book Showroom Visit",
  },

  faq: {
    eyebrow: "Questions",
    title: "Blinds, answered",
    items: [
      {
        q: "How long does installation take?",
        a: "Most homes are fitted within a single day once measurements are finalised, typically 7–10 days after order confirmation.",
      },
      {
        q: "Can I get motorised blinds retrofitted?",
        a: "Yes — our consultants will assess your window and power access during the home visit and recommend the right motorised solution.",
      },
      {
        q: "Do you offer blackout options?",
        a: "Yes, blackout linings and fabrics are available across roller, roman, and vertical blind categories.",
      },
      {
        q: "Is the home consultation really free?",
        a: "The home consultation carries a ₹500 charge, which is fully adjusted against your final order value.",
      },
    ],
  },

  finalCta: {
    title: "Ready to dress your windows right?",
    primaryLabel: "Book Free Consultation",
    secondaryLabel: "Visit a Showroom",
    tertiaryLabel: "Chat on WhatsApp",
  },
};
