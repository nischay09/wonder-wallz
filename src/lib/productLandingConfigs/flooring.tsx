/**
 * src/lib/productLandingConfigs/flooring.tsx
 *
 * Content config for the Flooring landing page, extracted verbatim from the
 * original FlooringLandingPage.tsx so the generalized ProductLandingPage
 * component can render it. No copy was changed — only moved.
 *
 * To power Blinds / Curtains / Upholstery next, add sibling files here
 * (e.g. blinds.ts, curtains.ts, upholstery.ts) that satisfy the same
 * ProductLandingConfig shape.
 */

import type { ProductLandingConfig } from "@/components/Product/ProductLandingPage";

// Kept as JSX (not a plain string) so the ₹500 figure can be bolded without
// the ProductLandingPage component needing to know about currency formatting.
const flooringPriceNote = (
  <>
    A nominal <span className="font-semibold text-neutral-900">₹500</span>{" "}
    catalogue visit charge applies — fully adjusted against your order if you
    proceed with us.
  </>
);

export const flooringLandingConfig: ProductLandingConfig = {
  whatsapp: {
    number: "919830173898",
    message:
      "Hi Wonder Wallz, I'm interested in your Flooring collection. Please share more details.",
  },
  modalCategory: "flooring",

  hero: {
    eyebrow: "Consultation-Led Flooring",
    headlineLead: "Premium Flooring",
    headlineAccent: "for Every Space",
    description:
      "Discover Luxury Vinyl, Laminate Flooring, Sports Flooring and Carpet Tiles through our personalised catalogue experience.",
    image: "/Wooden-Floor.jpg",
    imageAlt: "Premium flooring",
    primaryCtaLabel: "Review Catalogues at Home",
    secondaryCtaLabel: "Visit Showroom",
    tertiaryCtaLabel: "WhatsApp",
  },

  categories: {
    eyebrow: "What We Offer",
    title: "Flooring Categories",
    description:
      "A glimpse of what our catalogues cover — bring us your space and we'll narrow it down together.",
    items: [
      {
        title: "Luxury Vinyl Tiles",
        description:
          "Realistic wood, stone and concrete finishes with contemporary styling.",
        points: ["Wood", "Stone", "Concrete", "Contemporary finishes"],
      },
      {
        title: "Laminate Flooring",
        description:
          "Durable, natural-wood-look flooring for homes and commercial spaces.",
        points: ["Residential", "Commercial", "Natural wood appearance"],
      },
      {
        title: "Sports Flooring",
        description:
          "Purpose-built flooring for indoor sports and institutional spaces.",
        points: ["Indoor sports", "Gymnasiums", "Educational institutions"],
      },
      {
        title: "Carpet Tiles",
        description:
          "Modular commercial-grade tiles for demanding interior environments.",
        points: ["Corporate offices", "Hotels", "Retail", "Commercial interiors"],
      },
    ],
  },

  whyChooseUs: {
    eyebrow: "The Wonder Wallz Difference",
    title: "Why Choose Wonder Wallz",
    items: [
      "Professional Consultation",
      "Wide Catalogue Selection",
      "Premium Installation",
      "Expert Recommendations",
      "Home Catalogue Service",
      "Experienced Team",
    ],
  },

  homeReview: {
    eyebrow: "At Your Convenience",
    title: "Catalogue Review at Home",
    description:
      "Browse multiple flooring catalogues comfortably from your own home. Compare colours in your own lighting, feel every texture before deciding, and get expert recommendations tailored to your space — no showroom trip required.",
    bullets: [
      "Browse multiple catalogues at your own pace",
      "Compare colours in your own lighting",
      "Feel textures before making a decision",
      "Receive expert recommendations on the spot",
    ],
    priceNote: flooringPriceNote,
    // Reusing the hero asset for now (this static config has no access to
    // the runtime `collection.heroImage` the page used to fall back to).
    // Swap to a dedicated in-home-consultation photo whenever one's ready.
    image: "/Flooring.png",
    imageAlt: "Catalogue review at home",
    ctaLabel: "Review Catalogues at Home",
  },

  showrooms: {
    eyebrow: "Come See, Come Feel",
    title: "Visit Our Showrooms",
    description:
      "Choose whichever showroom works best for you — both welcome flooring consultations.",
    locations: [
      {
        name: "Merlin Homeland",
        tagline: "Best place for flooring",
        points: [
          "Largest catalogue collection",
          "Interior consultation",
          "Comfortable showroom experience",
        ],
      },
      {
        name: "Chandni Chowk",
        tagline: "Ideal for custom wallpaper projects",
        points: [
          "Also available for flooring consultation",
          "Printer and production facility located here",
          "Quick meetings and discussions",
        ],
      },
    ],
    ctaLabel: "Book a Showroom Visit",
  },

  faq: {
    eyebrow: "Good to Know",
    title: "Frequently Asked Questions",
    items: [
      {
        q: "Do you provide installation?",
        a: "Yes — every flooring order includes professional installation carried out by our experienced team.",
      },
      {
        q: "Can I review catalogues before purchasing?",
        a: "Absolutely. You can browse multiple catalogues at home or in our showroom, and take your time comparing textures and colours before deciding.",
      },
      {
        q: "Which flooring is suitable for homes?",
        a: "Luxury Vinyl Tiles and Laminate Flooring are our most popular choices for residential spaces. We'll help you pick the right one during your consultation.",
      },
      {
        q: "Do you provide measurement?",
        a: "Yes, our team carries out an on-site measurement as part of the consultation to ensure an accurate, made-to-fit installation.",
      },
      {
        q: "Can you help me choose the right flooring?",
        a: "That's exactly what our consultation is for — we'll recommend the best flooring for your space based on usage, lighting, and budget.",
      },
    ],
  },

  finalCta: {
    title: "Let's Find the Perfect Flooring for Your Space",
    primaryLabel: "Review Catalogues at Home",
    secondaryLabel: "Visit Showroom",
    tertiaryLabel: "Chat on WhatsApp",
  },
};
