/**
 * src/lib/productLandingConfigs/canvas.tsx
 *
 * Content for the Canvas Prints landing page.
 *
 * IMPORTANT — this is intentionally NOT a ProductLandingConfig (the shape
 * used by Flooring/Blinds/Curtains/Upholstery). Canvas is a CUSTOM product,
 * not a consultation product: there is no catalogue-at-home step, no
 * showroom-first journey, and no "Review Catalogues at Home" copy anywhere
 * in this file. The section list below matches the Canvas-specific journey
 * (Hero → Why Canvas → Frame Options → Perfect For → How It Works →
 * Materials & Quality → FAQ → Final CTA) and is consumed only by
 * CanvasLandingPage.tsx.
 *
 * All copy lives here — CanvasLandingPage.tsx contains no hardcoded copy.
 */

import type { ReactNode } from "react";

export interface CanvasFrameOption {
  title: string;
  description: string;
}

export interface CanvasUseCase {
  title: string;
}

export interface CanvasStep {
  title: string;
  description: string;
}

export interface CanvasFaqItem {
  q: string;
  a: string;
}

export interface CustomProductLandingConfig {
  whatsapp: {
    number: string;
    message: string;
  };

  hero: {
    badges: string[];
    headlineLead: string;
    headlineAccent: string;
    description: string;
    image: string;
    imageAlt: string;
    primaryCtaLabel: string;
    secondaryCtaLabel: string;
    tertiaryCtaLabel: string;
  };

  whyCanvas: {
    eyebrow: string;
    title: string;
    description: string;
    points: string[];
  };

  frameOptions: {
    eyebrow: string;
    title: string;
    description: string;
    items: CanvasFrameOption[];
  };

  perfectFor: {
    eyebrow: string;
    title: string;
    description: string;
    items: CanvasUseCase[];
  };

  howItWorks: {
    eyebrow: string;
    title: string;
    steps: CanvasStep[];
  };

  materials: {
    eyebrow: string;
    title: string;
    description: string;
    points: string[];
    image: string;
    imageAlt: string;
  };

  faq: {
    eyebrow: string;
    title: string;
    items: CanvasFaqItem[];
  };

  finalCta: {
    title: string;
    primaryLabel: string;
    secondaryLabel: string;
    tertiaryLabel: string;
  };
}

export const canvasLandingConfig: CustomProductLandingConfig = {
  whatsapp: {
    // TODO: confirm this against the number already used elsewhere in the
    // app (same one Flooring/Blinds use) — kept identical here on purpose.
    number: "919830173898",
    message: "Hi! I'd like to start a custom canvas print project.",
  },

  hero: {
    badges: ["Custom Made", "Optional Framing", "Gallery Quality"],
    headlineLead: "Your Memories Deserve More Than",
    headlineAccent: "a Screen",
    description:
      "Transform your favourite photographs, artwork or designs into museum-quality canvas prints handcrafted for your home or workspace.",
    image: "/Canvas-Printing.webp",
    imageAlt: "Framed canvas print of a family photograph hanging in a living room",
    primaryCtaLabel: "Start Custom Project",
    secondaryCtaLabel: "Contact on WhatsApp",
    tertiaryCtaLabel: "Visit Showroom",
  },

  whyCanvas: {
    eyebrow: "Why Canvas Prints",
    title: "Your Photo, Reimagined as Art",
    description:
      "A canvas print turns a moment on your phone into something that fills a wall — printed on museum-grade material and finished by hand.",
    points: [
      "Made entirely from your own photo, artwork or design",
      "Museum-quality canvas with rich, true-to-life colour using HP Latex printing",
      "Handcrafted finishing on every single piece",
      "A lasting keepsake, not a disposable print",
    ],
  },

  frameOptions: {
    eyebrow: "Frame Options",
    title: "Choose How It's Finished",
    description: "Every canvas can be finished exactly the way you want it to hang.",
    items: [
      {
        title: "Stretched Canvas",
        description:
          "The classic gallery look — canvas stretched taut over a wooden frame, ready to hang with no additional framing needed.",
      },
      {
        title: "Floating Frame",
        description:
          "A slim frame set slightly back from the canvas edge, giving it a modern, gallery-shadow effect.",
      },
      {
        title: "Black Frame",
        description:
          "A bold, clean black border that suits contemporary spaces and high-contrast imagery.",
      },
      {
        title: "White Frame",
        description:
          "A soft, minimal white border that keeps the focus entirely on your photograph or artwork.",
      },
    ],
  },

  perfectFor: {
    eyebrow: "Perfect For",
    title: "Made for Every Memory and Space",
    description: "",
    items: [
      { title: "Family Photos" },
      { title: "Wedding Memories" },
      { title: "Travel Photography" },
      { title: "Artwork" },
      { title: "Restaurants" },
      { title: "Corporate Spaces" },
      { title: "Pet Portraits" },
      { title: "Gifts" },
    ],
  },

  howItWorks: {
    eyebrow: "How It Works",
    title: "From Your Image to Your Wall",
    steps: [
      {
        title: "Upload your image",
        description: "Send us the photograph, artwork or design you'd like printed.",
      },
      {
        title: "Image quality review",
        description:
          "We check resolution and colour so the final print looks exactly as it should.",
      },
      {
        title: "Printing & optional framing",
        description:
          "Your canvas is printed on museum-grade material and finished in the frame style you choose.",
      },
      {
        title: "Ready to hang",
        description: "Your finished canvas arrives ready to hang, straight out of the box.",
      },
    ],
  },

  materials: {
    eyebrow: "Materials & Quality",
    title: "Built to Last, Not Just to Look Good",
    description:
      "Every canvas we produce goes through the same quality standard, regardless of size or frame.",
    points: [
      "Museum-grade canvas",
      "HP Latex printing",
      "Fade-resistant colours",
      "Gallery wrapped finish",
      "Optional premium frames",
    ],
    image: "/canvas.webp",
    imageAlt: "Close-up of museum-grade canvas texture and gallery wrapped edge",
  },

  faq: {
    eyebrow: "FAQs",
    title: "Canvas Print Questions, Answered",
    items: [
      {
        q: "What image quality do I need to send?",
        a: "For the best result, send the highest-resolution version of your photo or artwork you have. We review every image for quality before printing and will let you know if a larger size isn't a good fit.",
      },
      {
        q: "Can I print more than one photo on a single canvas?",
        a: "Yes — collage-style layouts are available. Let us know how many images and your preferred layout when you start your project.",
      },
      {
        q: "Which frame option should I choose?",
        a: "Stretched canvas gives a classic gallery look with no extra framing needed. Floating, black and white frames each suit different interiors — we're happy to advise once we see your image and space.",
      },
      {
        q: "How long does printing and framing take?",
        a: "Turnaround depends on size and frame choice. We'll confirm an estimated timeline as soon as your project details are reviewed.",
      },
      {
        q: "Can I see a proof before printing?",
        a: "Yes, we share a digital proof for approval before your canvas goes to print.",
      },
    ],
  },

  finalCta: {
    title: "Let's Turn Your Favourite Memory Into Art",
    primaryLabel: "Start Custom Project",
    secondaryLabel: "Contact on WhatsApp",
    tertiaryLabel: "Visit Showroom",
  },
};
