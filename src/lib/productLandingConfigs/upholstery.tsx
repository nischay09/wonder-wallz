/**
 * src/lib/productLandingConfigs/upholstery.tsx
 *
 * Content contract for the Upholstery consultation landing page. Satisfies
 * ProductLandingConfig from ProductLandingPage.tsx — no layout or markup
 * lives here, only copy, imagery, and CTA labels.
 *
 * To render this: <ProductLandingPage collection={collection} {...upholsteryConfig} />
 */

import type { ProductLandingConfig } from "@/components/Product/ProductLandingPage";

export const upholsteryConfig: ProductLandingConfig = {
  whatsapp: {
    number: "919830173898",
    message:
      "Hi, I'd like to book a free upholstery consultation. Could you share more details?",
  },
  modalCategory: "upholstery",

  hero: {
    eyebrow: "Wonder Wallz Upholstery",
    headlineLead: "Give your furniture a —",
    headlineAccent: "second life.",
    description:
      "From sofas to headboards, our craftsmen re-cover and restyle your furniture with fabrics chosen to match your room, not just the piece.",
    image: "/Upholstery.png",
    imageAlt: "Freshly upholstered sofa in a warmly lit living room",
    primaryCtaLabel: "Book Free Consultation",
    secondaryCtaLabel: "Visit a Showroom",
    tertiaryCtaLabel: "Chat on WhatsApp",
  },

  categories: {
    eyebrow: "Explore",
    title: "Upholstery for every piece in the home",
    description:
      "Every fabric and finish is matched to your furniture's use, wear pattern, and room during your consultation.",
    items: [
      {
        title: "Sofa Upholstery",
        description: "Full re-covering with reinforced seams and cushioning.",
        points: ["Stain-resistant fabrics", "Foam & spring refresh", "Custom piping"],
      },
      {
        title: "Chair & Dining Seats",
        description: "Precision-fitted covers for dining and accent chairs.",
        points: ["Removable washable covers", "Leather & leatherette", "Quick-turnaround sets"],
      },
      {
        title: "Headboards & Beds",
        description: "Tailored upholstered headboards and bed frames.",
        points: ["Tufted & channel designs", "Custom sizing", "Matching bench options"],
      },
      {
        title: "Curated Fabric Library",
        description: "Access designer-grade fabrics sourced for durability and texture.",
        points: ["200+ swatches on-site", "Pet & kid-friendly weaves", "Fade-resistant dyes"],
      },
    ],
  },

  whyChooseUs: {
    eyebrow: "Why Wonder Wallz",
    title: "Craftsmanship that outlasts the fabric",
    items: [
      "Free in-home assessment & consultation",
      "200+ premium fabric and leather options",
      "In-house cushioning and frame repair",
      "Skilled upholstery craftsmen",
      "2-year workmanship warranty",
      "Pickup and delivery included",
    ],
  },

  homeReview: {
    eyebrow: "At Your Home",
    title: "See the fabric on your own furniture",
    description:
      "Our consultant assesses your furniture's frame and cushioning on-site and brings swatches so you can preview the exact fabric against your room.",
    bullets: [
      "On-site furniture and fabric condition assessment",
      "Live fabric comparisons against your existing decor",
      "Transparent, itemised quote before you commit",
    ],
    priceNote: (
      <>
        Home consultations are <strong>₹500</strong>, fully adjustable
        against your final order.
      </>
    ),
    image: "/Upholstery.webp",
    imageAlt: "Consultant assessing a sofa and showing upholstery swatches at home",
    ctaLabel: "Book Home Consultation",
  },

  showrooms: {
    eyebrow: "Visit Us",
    title: "Or explore the full range in showroom",
    description: "See finished pieces and feel every fabric before you decide.",
    locations: [
      {
        name: "Wonder Wallz Merlin Homeland",
        tagline: "Our flagship showroom, recommended for upholstery consultations",
        points: ["Finished sample pieces on display", "Multiple fabric options", "Parking available"],
      },
      {
        name: "Wonder Wallz Chandni Chowk",
        tagline: "Flooring consultations also available here",
        points: ["Appointment priority booking", "Custom Products", "On Lenin Sarani road"],
      },
    ],
    ctaLabel: "Book Showroom Visit",
  },

  faq: {
    eyebrow: "Questions",
    title: "Upholstery, answered",
    items: [
      {
        q: "How long does re-upholstery take?",
        a: "Most single pieces like sofas or chairs are completed within 7–12 days, depending on fabric availability and frame condition.",
      },
      {
        q: "Do you repair the frame and cushioning too?",
        a: "Yes — our consultants assess the frame and foam during the home visit and include any needed repairs in your quote.",
      },
      {
        q: "Can I bring my own fabric?",
        a: "Yes, we accept customer-supplied fabric alongside our in-house library, subject to a quantity and quality check.",
      },
      {
        q: "Is the home consultation really free?",
        a: "The home consultation carries a ₹500 charge, which is fully adjusted against your final order value.",
      },
    ],
  },

  finalCta: {
    title: "Ready to give your furniture a fresh look?",
    primaryLabel: "Book Free Consultation",
    secondaryLabel: "Visit a Showroom",
    tertiaryLabel: "Chat on WhatsApp",
  },
};
