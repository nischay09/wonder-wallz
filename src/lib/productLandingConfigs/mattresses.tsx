/**
 * src/lib/productLandingConfigs/mattresses.tsx
 *
 * Content contract for the Mattresses & Pillows consultation landing page.
 * Satisfies ProductLandingConfig from ProductLandingPage.tsx — no layout or
 * markup lives here, only copy, imagery, and CTA labels, following the same
 * pattern as blinds.tsx / curtains.tsx.
 *
 * To render this: <ProductLandingPage collection={collection} {...mattressesConfig} />
 */

import type { ProductLandingConfig } from "@/components/Product/ProductLandingPage";

export const mattressesConfig: ProductLandingConfig = {
  whatsapp: {
    number: "919830173898",
    message:
      "Hi, I'd like to book a free mattress & pillow consultation. Could you share more details?",
  },
  modalCategory: "mattresses-pillows",

  hero: {
    eyebrow: "Wonder Wallz Mattresses & Pillows",
    headlineLead: "Sleep systems, built —",
    headlineAccent: "layer by layer.",
    description:
      "From suite-grade Luxe mattresses to orthopaedic Celestial support and everyday Cloude Essentials — plus pillows, protectors, toppers and headboards. Our consultants help you match the right construction to the way you actually sleep.",
    image: "/Mattress_.webp",
    imageAlt: "Layered luxury mattress construction in a sunlit bedroom",
    primaryCtaLabel: "Book Free Consultation",
    secondaryCtaLabel: "Visit a Showroom",
    tertiaryCtaLabel: "Chat on WhatsApp",
  },

  categories: {
    eyebrow: "Explore",
    title: "A mattress for every sleeper, and everything around it",
    description:
      "Each range is tailored during your consultation to match your preferred comfort level, support needs, and budget.",
    items: [
      {
        title: "Luxe Collection",
        description: "Suite-grade pocket spring and natural latex mattresses for indulgent, hotel-quality sleep.",
        points: ["Premium pocket springs", "Natural latex & multi-layer Visco memory", "10–15 year warranty"],
      },
      {
        title: "Celestial",
        description: "Spine-focused orthopaedic ranges engineered for structured, restorative support.",
        points: ["CNC-cut HR & gel memory foam", "Charcoal and copper-infused options", "7–10 year warranty"],
      },
      {
        title: "Cloude Essential",
        description: "Everyday orthopaedic and organic support mattresses, reversible and roll-pack friendly.",
        points: ["Reversible, no-flip designs", "Organic latex options", "Up to 7 year warranty"],
      },
      {
        title: "Accessories",
        description: "Pillows, protectors, toppers and headboards to complete your sleep set.",
        points: ["Memory foam & down pillows", "Waterproof mattress protectors", "Custom bases & headboards"],
      },
    ],
  },

  whyChooseUs: {
    eyebrow: "Why Wonder Wallz",
    title: "Consultation-led, correctly matched",
    items: [
      "Free in-home or showroom comfort consultation",
      "Full range from plush to firm, spring to latex to memory foam",
      "Warranty-backed across every range (up to 15 years)",
      "Certified antimicrobial, copper and organic latex options",
      "Same-week delivery on in-stock sizes",
      "Coordinated protectors, toppers and headboards",
    ],
  },

  homeReview: {
    eyebrow: "At Your Home",
    title: "Feel the difference before you decide",
    description:
      "Our consultant brings comfort samples and layer cutaways to your home so you can compare firmness levels against your own bed frame and room.",
    bullets: [
      "Hands-on comfort-level comparison in your own bedroom",
      "Guidance on spring vs. latex vs. memory foam for your needs",
      "Transparent, itemised quote before you commit",
    ],
    priceNote: (
      <>
        Home consultations are <strong>₹500</strong>, fully adjustable
        against your final order.
      </>
    ),
    image: "/Mattress1.webp",
    imageAlt: "Consultant showing mattress comfort layers in a client's home",
    ctaLabel: "Book Home Consultation",
  },

  showrooms: {
    eyebrow: "Visit Us",
    title: "Or try the full range in showroom",
    description: "Lie down on every comfort level, side by side, before you choose.",
    locations: [
      {
        name: "Wonder Wallz Merlin Homeland",
        tagline: "Our flagship showroom, recommended for mattress consultations",
        points: ["Full comfort-level display", "Layer cutaway demonstrations", "Parking Available"],
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
    title: "Mattresses & Pillows, answered",
    items: [
      {
        q: "How do I know which comfort level is right for me?",
        a: "Our consultant assesses your sleep position, existing back issues, and current mattress during the home or showroom visit and recommends a comfort level accordingly — from Firm to Plush.",
      },
      {
        q: "What's the difference between the Luxe, Celestial, and Cloude Essential ranges?",
        a: "Luxe is suite-grade pocket spring and natural latex for indulgent comfort; Celestial is spine-focused orthopaedic support; Cloude Essential covers everyday reversible and organic-latex mattresses at accessible price points.",
      },
      {
        q: "Do you offer mattress protectors and toppers?",
        a: "Yes — waterproof mattress and pillow protectors, plus Visco, Visco+PU, and microfiber toppers are available to pair with any mattress.",
      },
      {
        q: "Is the home consultation really free?",
        a: "The home consultation carries a ₹500 charge, which is fully adjusted against your final order value.",
      },
    ],
  },

  finalCta: {
    title: "Ready to sleep better tonight?",
    primaryLabel: "Book Free Consultation",
    secondaryLabel: "Visit a Showroom",
    tertiaryLabel: "Chat on WhatsApp",
  },
};
