/**
 * src/lib/productLandingConfigs/curtains.tsx
 *
 * Content contract for the Curtains consultation landing page. Satisfies
 * ProductLandingConfig from ProductLandingPage.tsx — no layout or markup
 * lives here, only copy, imagery, and CTA labels.
 *
 * To render this: <ProductLandingPage collection={collection} {...curtainsConfig} />
 */

import type { ProductLandingConfig } from "@/components/Product/ProductLandingPage";

export const curtainsConfig: ProductLandingConfig = {
  whatsapp: {
    number: "919830173898",
    message:
      "Hi, I'd like to book a free curtains consultation. Could you share more details?",
  },
  modalCategory: "curtains",

  hero: {
    eyebrow: "Wonder Wallz Curtains",
    headlineLead: "Drape your home in —",
    headlineAccent: "quiet luxury.",
    description:
      "From sheer voiles to heavy velvet drapes, our stylists curate fabric, fall, and stitch to match the character of every room.",
    image: "/Curtain_pre.webp",
    imageAlt: "Flowing curtains framing a bright living room window",
    primaryCtaLabel: "Book Free Consultation",
    secondaryCtaLabel: "Visit a Showroom",
    tertiaryCtaLabel: "Chat on WhatsApp",
  },

  categories: {
    eyebrow: "Explore",
    title: "Curtains for every mood and light",
    description:
      "Every style is customised to your window height, fabric weight preference, and existing decor during your consultation.",
    items: [
      {
        title: "Sheer Curtains",
        description: "Soft, diffused light with an airy, weightless drape.",
        points: ["Voile & chiffon fabrics", "Layer-ready with blackout", "Breathable finish"],
      },
      {
        title: "Blackout Curtains",
        description: "Full light control for bedrooms and media rooms.",
        points: ["Thermal-insulated linings", "Noise dampening", "Custom pleats"],
      },
      {
        title: "Designer Drapes",
        description: "Statement fabrics with tailored pleats for formal spaces.",
        points: ["Velvet & jacquard options", "Pinch & goblet pleats", "Tie-back accessories"],
      },
      {
        title: "Sheer + Blackout Layers",
        description: "Dual-track systems for flexible daytime and nighttime light.",
        points: ["Dual-track hardware", "Mix-and-match fabrics", "Motorised track option"],
      },
    ],
  },

  whyChooseUs: {
    eyebrow: "Why Wonder Wallz",
    title: "Styled for your space, stitched to fit",
    items: [
      "Free design consultation",
      "Multiple fabric and texture options",
      "Custom pleat and hardware styling",
      "Precision stitching & finishing",
      "2-year fitting warranty",
      "Installation within 10–14 days of order confirmation",
    ],
  },

  homeReview: {
    eyebrow: "At Your Home",
    title: "See the drape in your own light",
    description:
      "Fabric behaves differently in every room. Our stylist brings samples so you see the texture and colour in the comfort of your own house.",
    bullets: [
      "Accurate window measurement on the spot for perfect fit",
      "Fabric samples to see colour and texture in your own light",
      "Transparent, itemised quote before you commit to full payment",
    ],
    priceNote: (
      <>
        Home consultations start at <strong>₹500</strong>, fully adjustable
        against your final order.
      </>
    ),
    image: "/Curtain.webp",
    imageAlt: "Stylist draping curtain fabric samples in a client's living room",
    ctaLabel: "Book Home Consultation",
  },

  showrooms: {
    eyebrow: "Visit Us",
    title: "Or explore the full range in showroom",
    description: "Feel every fabric weight and see every pleat style, in person.",
    locations: [
      {
        name: "Wonder Wallz Merlin Homeland",
        tagline: "Our flagship interior studio",
        points: ["Fabric samples", "Pleat styling wall", "Parking available"],
      },
      {
        name: "Wonder Wallz Chandni Chowk",
        tagline: "Compact studio, Custom Products",
        points: ["Appointment priority booking", "Printing services", "On Lenin Sarani road"],
      },
    ],
    ctaLabel: "Book Showroom Visit",
  },

  faq: {
    eyebrow: "Questions",
    title: "Curtains, answered",
    items: [
      {
        q: "How long does stitching and installation take?",
        a: "Custom curtains are typically ready and fitted within 10–14 days of order confirmation, depending on fabric and pleat style.",
      },
      {
        q: "Can I mix sheer and blackout layers?",
        a: "Yes — our dual-track systems let you combine a sheer layer with a blackout layer on the same window.",
      },
      {
        q: "Do you provide the hardware and rods too?",
        a: "Yes, tracks, rods, and finials are included as part of your consultation and quote.",
      },
      {
        q: "Is the home consultation really free?",
        a: "The consultation itself is free; a small booking fee is fully adjusted against your final order value.",
      },
    ],
  },

  finalCta: {
    title: "Ready to dress your windows in style?",
    primaryLabel: "Book Free Consultation",
    secondaryLabel: "Visit a Showroom",
    tertiaryLabel: "Chat on WhatsApp",
  },
};
