/**
 * src/lib/collections.ts
 *
 * Single source of truth for every Wonder Wallz collection.
 *
 * TWO PRODUCT WORKFLOWS
 * ─────────────────────
 * CUSTOMISABLE  →  workflow: "custom"
 *   Products: Wallpapers, Glass Films (Custom Printed), Canvas Prints
 *   Future CTA: "Add to Project"
 *   Future flow: upload image → wall dimensions → notes → email quotation
 *
 * STANDARD  →  workflow: "standard"
 *   Products: Blinds, Curtains, Flooring, Readymade Wallpapers
 *   Future CTA: "Enquire on WhatsApp"
 *   Future flow: request measurements → WhatsApp → installation scheduled
 *
 * To add a new collection or subcategory — edit ONLY this file.
 * Nothing that consumes these types needs to change.
 */

// ─── Types ────────────────────────────────────────────────────────────────────

export type WorkflowType = "custom" | "standard";

export interface CollectionSubcategory {
  /** Stable unique id, e.g. "wallpapers-religion" */
  id: string;
  /** URL-safe slug, e.g. "religion" */
  slug: string;
  /** Display name, e.g. "Religion" */
  title: string;
  /** Fully-resolved route, e.g. "/collections/wallpapers/religion" */
  href: string;
}

export interface CollectionProduct {
  /** Stable id, e.g. "wallpapers-product-001" */
  id: string;
  /** Display name */
  name: string;
  /** Short one-liner shown on the card */
  description: string;
  /** Relative image path from /public */
  image: string;
  /** Gradient fallback when image is unavailable [from, to] */
  placeholderGradient: [string, string];
  /** Subcategory slug this product belongs to (optional) */
  subcategory?: string;
}

export interface Collection {
  /** Stable unique id, e.g. "wallpapers" */
  id: string;
  /** URL-safe slug used in /collections/[category] */
  slug: string;
  /** Display name, e.g. "Wallpapers" */
  title: string;
  /** Marketing description shown in the hero */
  description: string;
  /** Longer editorial paragraph for the hero */
  heroDescription: string;
  /** Fully-resolved route */
  href: string;
  /**
   * Hero background image path.
   * Displayed full-bleed behind the collection hero.
   */
  heroImage: string;
  /**
   * Cover/thumbnail image path.
   * Used by collection cards, menus, etc.
   */
  coverImage: string;
  /** Gradient fallback for hero/cover when image is absent */
  placeholderGradient: [string, string];
  /** Approximate product count (shown in hero) */
  productCount: number;
  /**
   * Determines which CTA and quotation workflow to use.
   *
   * "custom"   → future "Add to Project" CTA
   *              upload images, dimensions, notes, email quotation
   *
   * "standard" → future "Enquire on WhatsApp" CTA
   *              request measurements, WhatsApp flow, installation
   */
  workflow: WorkflowType;
  /** Whether this collection appears in featured/homepage sections */
  featured: boolean;
  /** Optional nested subcategories shown as filter chips */
  subcategories?: CollectionSubcategory[];
  /** Sample products seeded for the grid (replace with API/CMS later) */
  products: CollectionProduct[];
}

// ─── Helpers ──────────────────────────────────────────────────────────────────

function sub(
  parentSlug: string,
  slug: string,
  title: string
): CollectionSubcategory {
  return {
    id: `${parentSlug}-${slug}`,
    slug,
    title,
    href: `/collections/${parentSlug}/${slug}`,
  };
}

/**
 * Generate n placeholder products for a collection.
 * Replace with real CMS/API data when available — the shape stays identical.
 */
function seedProducts(
  collectionSlug: string,
  names: { name: string; description: string; subcategory?: string }[],
  imagePath: string,
  gradient: [string, string]
): CollectionProduct[] {
  return names.map((item, i) => ({
    id: `${collectionSlug}-${String(i + 1).padStart(3, "0")}`,
    name: item.name,
    description: item.description,
    image: imagePath,
    placeholderGradient: gradient,
    subcategory: item.subcategory,
  }));
}

// ─── Collections ──────────────────────────────────────────────────────────────

export const collections: Collection[] = [
  // ── WALLPAPERS ─────────────────────────────────────────────────────────────
  {
    id: "wallpapers",
    slug: "wallpapers",
    title: "Wallpapers",
    description: "Premium custom wall coverings",
    heroDescription:
      "Transform any room with our curated library of designer wallpapers. From bold murals to delicate textures, every design is precision-printed and custom-sized to fit your exact walls.",
    href: "/collections/wallpapers",
    heroImage: "/Wonder/10.webp",
    coverImage: "/Wonder/10.webp",
    placeholderGradient: ["#F3E8D5", "#D6C4AE"],
    productCount: 500,
    workflow: "custom",
    featured: true,
    subcategories: [
      sub("wallpapers", "wonder-collection", "Wonder Collection"),
      sub("wallpapers", "religion", "Religion"),
      sub("wallpapers", "art", "Art"),
      sub("wallpapers", "kids", "Kids"),
      sub("wallpapers", "wall-murals", "Wall Murals"),
      sub("wallpapers", "3d-wall-murals", "3D Wall Murals"),
    ],
    products: seedProducts(
      "wallpapers",
      [
        { name: "Golden Mandala Mural", description: "Intricate hand-drawn mandala in warm gold tones", subcategory: "religion" },
        { name: "Tokyo Skyline Panorama", description: "Dramatic cityscape stretching full wall width", subcategory: "wall-murals" },
        { name: "Enchanted Forest", description: "Illustrated woodland with soft watercolour depth", subcategory: "kids" },
        { name: "Abstract Brushstrokes", description: "Bold contemporary art in ochre and indigo", subcategory: "art" },
        { name: "Geometric 3D Prisms", description: "Optical depth illusion in cool silver tones", subcategory: "3d-wall-murals" },
        { name: "Wonder Blossoms", description: "Signature floral print from the Wonder Collection", subcategory: "wonder-collection" },
        { name: "Sacred Geometry", description: "Precision line-work in antique gold", subcategory: "religion" },
        { name: "Tropical Canopy", description: "Lush palm leaves in deep botanical greens", subcategory: "wall-murals" },
        { name: "Galaxy Dreamscape", description: "Nebula-inspired cosmos for bedroom ceilings", subcategory: "kids" },
        { name: "Marble Texture Panel", description: "Photorealistic Calacatta marble in full detail", subcategory: "art" },
        { name: "Arch Illusion", description: "Classic architectural trompe-l'œil in soft stone", subcategory: "3d-wall-murals" },
        { name: "Autumn Foliage", description: "Rich rust and amber leaves, lifelike scale", subcategory: "wonder-collection" },
      ],
      "/Wonder/10.webp",
      ["#F3E8D5", "#D6C4AE"]
    ),
  },

  // ── BLINDS ─────────────────────────────────────────────────────────────────
  {
    id: "blinds",
    slug: "blinds",
    title: "Blinds",
    description: "Custom-fit window solutions",
    heroDescription:
      "Precise light control for every room. Our blinds are made-to-measure, fitted by our installation team, and available across roller, zebra, roman, venetian and vertical styles.",
    href: "/collections/blinds",
    heroImage: "/Blinds.avif",
    coverImage: "/Blinds.avif",
    placeholderGradient: ["#EEE9E0", "#D8CEC1"],
    productCount: 80,
    workflow: "standard",
    featured: true,
    subcategories: [
      sub("blinds", "roller", "Roller"),
      sub("blinds", "zebra", "Zebra"),
      sub("blinds", "roman", "Roman"),
      sub("blinds", "venetian", "Venetian"),
      sub("blinds", "vertical", "Vertical"),
    ],
    products: seedProducts(
      "blinds",
      [
        { name: "Linen Roller Blind", description: "Clean, minimal light filter in natural linen weave", subcategory: "roller" },
        { name: "Dual-Tone Zebra", description: "Day-night privacy control in slate and white", subcategory: "zebra" },
        { name: "Velvet Roman", description: "Soft-fold drapery in deep forest green", subcategory: "roman" },
        { name: "Timber Venetian", description: "Real wood slats in warm walnut finish", subcategory: "venetian" },
        { name: "Sheer Vertical Panel", description: "Floor-to-ceiling softness for large openings", subcategory: "vertical" },
        { name: "Blackout Roller", description: "Total darkness for bedrooms and media rooms", subcategory: "roller" },
        { name: "Woven Bamboo Zebra", description: "Sustainable texture with organic warmth", subcategory: "zebra" },
        { name: "Silk Roman Pleat", description: "Luxurious gathered folds in champagne silk", subcategory: "roman" },
      ],
      "/Blinds.avif",
      ["#EEE9E0", "#D8CEC1"]
    ),
  },

  // ── CURTAINS ───────────────────────────────────────────────────────────────
  {
    id: "curtains",
    slug: "curtains",
    title: "Curtains",
    description: "Tailored drapery for every room",
    heroDescription:
      "From sheer voiles that diffuse morning light to full blackout panels for total privacy — every curtain is tailored to your window, your room, and your style.",
    href: "/collections/curtains",
    heroImage: "/Curtain.jpg",
    coverImage: "/Curtain.jpg",
    placeholderGradient: ["#F7F1EA", "#DCCFC2"],
    productCount: 60,
    workflow: "standard",
    featured: false,
    subcategories: [
      sub("curtains", "sheer", "Sheer"),
      sub("curtains", "blackout", "Blackout"),
      sub("curtains", "eyelet", "Eyelet"),
      sub("curtains", "pleated", "Pleated"),
    ],
    products: seedProducts(
      "curtains",
      [
        { name: "Cloud Sheer Panel", description: "Gossamer-light fabric, ethereal morning diffusion", subcategory: "sheer" },
        { name: "Midnight Blackout", description: "Total light block in deep charcoal velvet", subcategory: "blackout" },
        { name: "Brass Eyelet Linen", description: "Casual-luxe linen with polished brass rings", subcategory: "eyelet" },
        { name: "Triple Pleat Silk", description: "Formal gathered drape in ivory dupion silk", subcategory: "pleated" },
        { name: "Sage Sheer Voile", description: "Barely-there sage that freshens any room", subcategory: "sheer" },
        { name: "Thermal Blackout", description: "Insulating layer that cuts heat and noise", subcategory: "blackout" },
        { name: "Linen Eyelet Natural", description: "Relaxed, washed linen with generous fullness", subcategory: "eyelet" },
        { name: "Pinch Pleat Velvet", description: "Rich jewel-toned velvet with crisp pinch folds", subcategory: "pleated" },
      ],
      "/Curtain.jpg",
      ["#F7F1EA", "#DCCFC2"]
    ),
  },

  // ── FLOORING ───────────────────────────────────────────────────────────────
  {
    id: "flooring",
    slug: "flooring",
    title: "Flooring",
    description: "Warm, durable flooring for any space",
    heroDescription:
      "Underfoot comfort meets lasting durability. Choose from stone-core SPC, real-wood engineered planks, or resilient PVC — all professionally installed with a full site survey.",
    href: "/collections/flooring",
    heroImage: "/Wooden-Floor.jpg",
    coverImage: "/Wooden-Floor.jpg",
    placeholderGradient: ["#D7B899", "#8B6A4E"],
    productCount: 45,
    workflow: "standard",
    featured: true,
    subcategories: [
      sub("flooring", "spc", "SPC"),
      sub("flooring", "wooden", "Wooden"),
      sub("flooring", "pvc", "PVC"),
    ],
    products: seedProducts(
      "flooring",
      [
        { name: "Heritage Oak SPC", description: "Stone-core plank with authentic oak grain", subcategory: "spc" },
        { name: "Walnut Engineered", description: "Real walnut veneer on birch-ply core", subcategory: "wooden" },
        { name: "Concrete Grey PVC", description: "Industrial micro-texture, waterproof and quiet underfoot", subcategory: "pvc" },
        { name: "Bleached Pine SPC", description: "Scandi-blonde tones for light, airy spaces", subcategory: "spc" },
        { name: "Smoked Ash Engineered", description: "Deep smoke finish on premium ash boards", subcategory: "wooden" },
        { name: "Warm Ivory PVC", description: "Stone-look warmth without the cold underfoot", subcategory: "pvc" },
      ],
      "/Wooden-Floor.jpg",
      ["#D7B899", "#8B6A4E"]
    ),
  },

  // ── GLASS FILMS ────────────────────────────────────────────────────────────
  {
    id: "glass-films",
    slug: "glass-films",
    title: "Glass Films",
    description: "Frosted & decorative glass finishes",
    heroDescription:
      "Add privacy, pattern, or a brand identity to any glass surface. Our films are precision-cut for doors, partitions and windows — with custom printed designs available for commercial and residential use.",
    href: "/collections/glass-films",
    heroImage: "/Glass-Film.webp",
    coverImage: "/Glass-Film.webp",
    placeholderGradient: ["#E7F2F8", "#C6DCE9"],
    productCount: 30,
    workflow: "custom",
    featured: false,
    subcategories: [
      sub("glass-films", "frosted", "Frosted"),
      sub("glass-films", "custom-printed", "Custom Printed"),
    ],
    products: seedProducts(
      "glass-films",
      [
        { name: "Classic Frosted", description: "Even privacy frost suitable for any glass surface", subcategory: "frosted" },
        { name: "Floral Etched Frost", description: "Botanical motif cut into semi-transparent white", subcategory: "frosted" },
        { name: "Geometric Frost Panel", description: "Art-deco diamond lattice in cool white", subcategory: "frosted" },
        { name: "Brand Logo Print", description: "Full-colour precision print for office partitions", subcategory: "custom-printed" },
        { name: "Stained Glass Effect", description: "Vibrant cathedral colour, no lead required", subcategory: "custom-printed" },
        { name: "Gradient Ombré Film", description: "Smooth tone fade from clear to frosted", subcategory: "frosted" },
      ],
      "/Glass-Film.webp",
      ["#E7F2F8", "#C6DCE9"]
    ),
  },

  // ── CANVAS PRINTS ──────────────────────────────────────────────────────────
  {
    id: "canvas-prints",
    slug: "canvas-prints",
    title: "Canvas Prints",
    description: "Gallery-grade printed canvases",
    heroDescription:
      "Your photos, artwork, or our curated designs — gallery-stretched on museum-grade canvas. Every piece is custom-sized, colour-calibrated, and ready to hang.",
    href: "/collections/canvas-prints",
    heroImage: "/canvas.webp",
    coverImage: "/canvas.webp",
    placeholderGradient: ["#F4E7D2", "#D9B88F"],
    productCount: 120,
    workflow: "custom",
    featured: false,
    products: seedProducts(
      "canvas-prints",
      [
        { name: "Custom Photo Canvas", description: "Upload any photo — we print and stretch it perfectly" },
        { name: "Abstract Triptych", description: "Three-panel composition in warm earth tones" },
        { name: "Botanical Study Series", description: "Set of four pressed-flower illustrations" },
        { name: "City Map Art", description: "Your favourite city rendered in clean line art" },
        { name: "Watercolour Landscape", description: "Soft horizon in misty watercolour blues" },
        { name: "Minimalist Quote Print", description: "Typography art in your chosen colour palette" },
      ],
      "/canvas.webp",
      ["#F4E7D2", "#D9B88F"]
    ),
  },

  // ── UPHOLSTERY ─────────────────────────────────────────────────────────────
  {
    id: "upholstery",
    slug: "upholstery",
    title: "Upholstery",
    description: "Fine fabrics for furniture & interiors",
    heroDescription:
      "Reupholster chairs, sofas, headboards and walls with our premium fabric range. We supply the fabric and coordinate the installation through our trusted craftsmen network.",
    href: "/collections/upholstery",
    heroImage: "/Upholstery.webp",
    coverImage: "/Upholstery.webp",
    placeholderGradient: ["#EFE4D7", "#C9B39A"],
    productCount: 35,
    workflow: "standard",
    featured: false,
    products: seedProducts(
      "upholstery",
      [
        { name: "Bouclé Cream", description: "Chunky loop weave in warm off-white" },
        { name: "Velvet Teal", description: "Crush-resistant velvet in deep peacock teal" },
        { name: "Herringbone Linen", description: "Classic weave in natural undyed linen" },
        { name: "Leather-Look Suede", description: "Durable faux suede in cognac brown" },
        { name: "Stripe Jacquard", description: "Woven stripe in ivory and warm sand" },
        { name: "Performance Chenille", description: "Stain-resistant chenille in charcoal grey" },
      ],
      "/Upholstery.webp",
      ["#EFE4D7", "#C9B39A"]
    ),
  },
];

// ─── Lookup helpers ───────────────────────────────────────────────────────────

/** Find a collection by its URL slug. */
export function getCollectionBySlug(slug: string): Collection | undefined {
  return collections.find((c) => c.slug === slug);
}

/** All collections flagged as featured. */
export function getFeaturedCollections(): Collection[] {
  return collections.filter((c) => c.featured);
}

/** All collections that use the "custom" quotation workflow. */
export function getCustomCollections(): Collection[] {
  return collections.filter((c) => c.workflow === "custom");
}

/** All collections that use the standard WhatsApp enquiry workflow. */
export function getStandardCollections(): Collection[] {
  return collections.filter((c) => c.workflow === "standard");
}

/**
 * CTA label for a given workflow.
 * Import this wherever a button or link needs to reflect the correct action.
 */
export function getWorkflowCTA(workflow: WorkflowType): string {
  return workflow === "custom" ? "Add to Project" : "Enquire on WhatsApp";
}

/**
 * Workflow badge label — short descriptor shown on cards/chips.
 */
export function getWorkflowBadge(workflow: WorkflowType): string {
  return workflow === "custom" ? "Customisable" : "Standard";
}
