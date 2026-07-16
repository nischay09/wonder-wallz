/**
 * src/lib/productLandingConfigs/glassFilms.tsx
 *
 * Content for the Glass Films landing page.
 *
 * IMPORTANT — Glass Films is NOT a single-journey custom product like Canvas
 * Prints, and it is NOT a consultation product like Flooring/Blinds/Curtains/
 * Upholstery either. It is a DUAL-JOURNEY product:
 *
 *   1. Custom Glass Films   → "Start Custom Project" → existing Project
 *      Builder (/custom-design#start-project?product=glass-films), same
 *      mechanism as Canvas Prints.
 *   2. Decorative Glass Films → "View Options on WhatsApp" → WhatsApp, no
 *      catalogue browsing, no catalogue-at-home step, no showroom-first flow.
 *
 * There is deliberately no "Home Review" / catalogue-at-home copy and no
 * showroom-booking-as-primary-workflow copy anywhere in this file — the
 * brief explicitly rules both out for Glass Films.
 *
 * All copy lives here — GlassFilmLandingPage.tsx contains no hardcoded copy.
 */

export interface GlassFilmRequirementCard {
  eyebrow: string;
  title: string;
  description: string;
  bullets: string[];
  ctaLabel: string;
  ctaType: "custom-project" | "whatsapp";
}

export interface GlassFilmApplication {
  title: string;
  image: string;
  imageAlt: string;
}

export interface GlassFilmBenefit {
  title: string;
}

export interface GlassFilmTimelineStep {
  title: string;
}

export interface GlassFilmFaqItem {
  q: string;
  a: string;
}

export interface GlassFilmLandingConfig {
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
  };

  requirements: {
    eyebrow: string;
    title: string;
    description: string;
    cards: GlassFilmRequirementCard[];
  };

  applications: {
    eyebrow: string;
    title: string;
    items: GlassFilmApplication[];
  };

  benefits: {
    eyebrow: string;
    title: string;
    items: GlassFilmBenefit[];
  };

  howItWorks: {
    eyebrow: string;
    title: string;
    customProject: {
      title: string;
      steps: GlassFilmTimelineStep[];
    };
    decorative: {
      title: string;
      steps: GlassFilmTimelineStep[];
    };
  };

  faq: {
    eyebrow: string;
    title: string;
    items: GlassFilmFaqItem[];
  };

  finalCta: {
    title: string;
    primaryLabel: string;
    secondaryLabel: string;
  };
}

export const glassFilmsLandingConfig: GlassFilmLandingConfig = {
  whatsapp: {
    // Kept identical to the number used elsewhere in the app (Canvas,
    // Flooring, etc.) — confirm before launch if this ever changes.
    number: "919830173898",
    message: "Hi! I'd like to see decorative glass film options.",
  },

  hero: {
    badges: ["Custom Graphics", "Decorative Films", "HP Latex Printing"],
    headlineLead: "Beautiful Glass.",
    headlineAccent: "Designed Your Way.",
    description:
      "Whether you're looking for elegant decorative films or completely custom graphics, we'll help you create the perfect solution for your home, office or commercial space.",
    image: "/GlassFilmsHero.png ",
    imageAlt: "Decorative frosted glass film in a modern office interior",
    primaryCtaLabel: "Start Custom Project",
    secondaryCtaLabel: "View Decorative Options on WhatsApp",
  },

  requirements: {
    eyebrow: "Choose Your Requirement",
    title: "Two Ways to Get Started",
    description:
      "Tell us what you need and we'll point you to the right path — a custom project or a curated set of decorative options.",
    cards: [
      {
        eyebrow: "Design Your Own",
        title: "Custom Glass Films",
        description:
          "Suitable for office branding, logos and fully custom artwork printed exactly to your design.",
        bullets: [
          "Office Branding",
          "Company Logos",
          "Decorative Graphics",
          "Frosted Designs",
          "Custom Artwork",
        ],
        ctaLabel: "Start Custom Project",
        ctaType: "custom-project",
      },
      {
        eyebrow: "Curated For You",
        title: "Decorative Glass Films",
        description:
          "Suitable for privacy, frosted and patterned films. Our team will share suitable options directly on WhatsApp and help you choose the right design.",
        bullets: [
          "Privacy Films",
          "Frosted Films",
          "Decorative Patterns",
          "Gradient Films",
          "Home Interiors",
        ],
        ctaLabel: "View Options on WhatsApp",
        ctaType: "whatsapp",
      },
    ],
  },

  applications: {
    eyebrow: "Applications",
    title: "Suited to Every Space",
    items: [
      { title: "Office Partitions", image: "/glassfilmimages/officepartition.jpeg", imageAlt: "Glass film on an office partition" },
      { title: "Bathrooms", image: "/glassfilmimages/frostedbathroom.avif", imageAlt: "Frosted glass film in a bathroom" },
      { title: "Meeting Rooms", image: "/glassfilmimages/Decorativemeeting.jpeg", imageAlt: "Decorative film on a meeting room glass wall" },
      { title: "Homes", image: "/glassfilmimages/Decorativehome.jpg", imageAlt: "Decorative glass film in a home interior" },
      { title: "Personal Branding", image: "/glassfilmimages/Retail.jpeg", imageAlt: "Branded glass film in a retail storefront" },
      { title: "Restaurants", image: "/glassfilmimages/Restaurant.GIF", imageAlt: "Decorative glass film in a restaurant" },
      { title: "Hospitals", image: "/glassfilmimages/Hospital.webp", imageAlt: "Privacy glass film in a hospital" },
      { title: "Commercial Spaces", image: "/glassfilmimages/Commercial.png", imageAlt: "Custom glass film in a commercial space" },
    ],
  },

  benefits: {
    eyebrow: "Benefits",
    title: "Why Choose Glass Films",
    items: [
      { title: "Enhanced Privacy" },
      { title: "Natural Light" },
      { title: "UV Protection" },
      { title: "Premium Installation" },
      { title: "HP Latex Printing" },
      { title: "Long-lasting Finish" },
    ],
  },

  howItWorks: {
    eyebrow: "How It Works",
    title: "Two Journeys, Both Simple",
    customProject: {
      title: "Custom Project",
      steps: [
        { title: "Upload Design" },
        { title: "Consultation" },
        { title: "Production" },
        { title: "Installation" },
      ],
    },
    decorative: {
      title: "Decorative Films",
      steps: [
        { title: "WhatsApp" },
        { title: "Receive Options" },
        { title: "Select Design" },
        { title: "Installation" },
      ],
    },
  },

  faq: {
    eyebrow: "FAQs",
    title: "Glass Film Questions, Answered",
    items: [
      {
        q: "What's the difference between custom and decorative glass films?",
        a: "Custom glass films are printed to your own design or artwork — logos, branding, or bespoke graphics. Decorative glass films are curated patterns, frosted and privacy options we recommend based on your space; our team shares these directly on WhatsApp.",
      },
      {
        q: "Can I see decorative film samples before deciding?",
        a: "Yes — message us on WhatsApp and our team will share suitable options and samples based on your space and requirements.",
      },
      {
        q: "Do glass films block UV rays?",
        a: "Yes, our glass films offer UV protection while still allowing natural light through, helping protect interiors from sun damage.",
      },
      {
        q: "How long does a custom glass film project take?",
        a: "Timelines depend on design complexity and size. Once you start a custom project, we'll confirm an estimated schedule after reviewing your design.",
      },
      {
        q: "Is installation included?",
        a: "Yes, every glass film order includes premium professional installation.",
      },
      {
        q: "Can glass films be removed or replaced later?",
        a: "Yes, our films are designed for clean removal and can be replaced or updated as your needs change.",
      },
    ],
  },

  finalCta: {
    title: "Let's Transform Your Glass",
    primaryLabel: "Start Custom Project",
    secondaryLabel: "View Decorative Options on WhatsApp",
  },
};
