/**
 * src/lib/products.ts
 *
 * Single source of truth for every product Wonder Wallz sells.
 *
 * This file is intentionally framework-agnostic (no React, no Next.js
 * imports) so it can be reused anywhere on the site and beyond:
 *   - Navbar "Collections" mega-menu + mobile accordion
 *   - "Shop by Product" homepage section
 *   - Product listing / product detail pages
 *   - Search & filtering
 *   - Breadcrumbs
 *   - Quote / enquiry flow
 *   - A future CMS-backed data layer (this shape maps cleanly onto a
 *     CMS schema, so swapping the static array for a fetch() later is
 *     a drop-in change — nothing that consumes `products` needs to know).
 *
 * To add a new product or subcategory, edit ONLY this file.
 */

/** A single subcategory nested under a top-level product. */
export interface ProductSubcategory {
  /** Stable unique id, e.g. "wallpapers-religion" */
  id: string;
  /** URL-safe slug, e.g. "religion" */
  slug: string;
  /** Display name, e.g. "Religion" */
  title: string;
  /** Fully-resolved route, e.g. "/collections/wallpapers/religion" */
  href: string;
}

/** A top-level product / collection. */
export interface Product {
  // -------------------------------------------------------------------------
  // EXISTING FIELDS — unchanged, all required as before
  // -------------------------------------------------------------------------

  /** Stable unique id, e.g. "wallpapers" */
  id: string;
  /** URL-safe slug, e.g. "wallpapers" */
  slug: string;
  /** Display name, e.g. "Wallpapers" */
  title: string;
  /** Short marketing description used in menus, cards, etc. */
  description: string;
  /** Fully-resolved route, e.g. "/collections/wallpapers" */
  href: string;
  /** Cover/thumbnail image path, used by product cards & "Shop by Product" */
  coverImage: string;
  /** Fallback gradient pair used while the cover image loads */
  placeholderGradient: [string, string];
  /** Whether this product should be highlighted (e.g. homepage, top picks) */
  featured: boolean;
  /** Optional nested subcategories */
  subcategories?: ProductSubcategory[];

  // -------------------------------------------------------------------------
  // PRICING — optional; lets individual products declare how they are sold
  // -------------------------------------------------------------------------

  /**
   * How this product is priced:
   *   "fixed"    — a single unit price (see `price`)
   *   "perSqFt"  — price is expressed per square foot (see `price`)
   *   "quote"    — no public price; customer must request a quote
   *
   * When undefined the UI should fall back to a safe default (e.g. "quote").
   */
  pricingMode?: "fixed" | "perSqFt" | "quote";

  /**
   * Base price in the given `currency`.
   * Only meaningful when `pricingMode` is "fixed" or "perSqFt".
   */
  price?: number;

  /**
   * Promotional / sale price. When present and lower than `price`,
   * the UI may show a strikethrough on the original price.
   * Only meaningful alongside a numeric `price`.
   */
  salePrice?: number;

  /** ISO 4217 currency code for all monetary fields on this product. */
  currency?: "INR";

  // -------------------------------------------------------------------------
  // FUTURE BACKEND — fields a CMS / database record would carry
  // -------------------------------------------------------------------------

  /**
   * Stock-keeping unit — unique identifier for inventory / ERP systems.
   * Leave undefined until a backend is in place.
   */
  sku?: string;

  /**
   * Whether this product is published / visible on the storefront.
   * Defaults to `true`; a backend can set this to `false` to soft-delete.
   */
  active?: boolean;

  /**
   * Explicit sort position within a listing page.
   * Lower numbers appear first. Undefined products sort last.
   */
  sortOrder?: number;

  // -------------------------------------------------------------------------
  // MATERIALS — optional list of fabric / finish options
  // -------------------------------------------------------------------------

  /**
   * Human-readable material or finish names, e.g. ["Non-woven", "Vinyl"].
   * Useful for filter chips and product-detail specs tables.
   */
  materials?: string[];

  // -------------------------------------------------------------------------
  // SEO — optional overrides for <head> meta tags
  // -------------------------------------------------------------------------

  /**
   * Custom <title> tag override for the collection page.
   * Falls back to `title` when absent.
   */
  metaTitle?: string;

  /**
   * Custom <meta name="description"> for the collection page.
   * Falls back to `description` when absent.
   */
  metaDescription?: string;

  // -------------------------------------------------------------------------
  // TAGS — free-form labels for search, filtering, and analytics
  // -------------------------------------------------------------------------

  /**
   * Arbitrary tag strings, e.g. ["interior", "luxury", "kids-safe"].
   * No enforced vocabulary — kept flexible for future CMS-driven filtering.
   */
  tags?: string[];

  // -------------------------------------------------------------------------
  // OFFERS — foreign key into a future centralised Offer model
  // -------------------------------------------------------------------------

  /**
   * References a single active Offer record by its stable id.
   *
   * The Offer model (defined separately, not here) will carry all
   * promotion details: label, discount value, validity window, etc.
   * Examples of offers that may be linked here:
   *   "diwali-sale-2024", "free-installation-q1", "flat-500-off"
   *
   * Multiple products can reference the same offerId.
   * The frontend must degrade gracefully when this is undefined —
   * never assume an offer is always present.
   */
  offerId?: string;
}

/**
 * Helper to build a subcategory without repeating the parent slug
 * everywhere. Keeps href construction consistent in one place.
 */
function buildSubcategory(
  parentSlug: string,
  slug: string,
  title: string
): ProductSubcategory {
  return {
    id: `${parentSlug}-${slug}`,
    slug,
    title,
    href: `/collections/${parentSlug}/${slug}`,
  };
}

export const products: Product[] = [
  {
    // --- existing fields ---
    id: "wallpapers",
    slug: "wallpapers",
    title: "Wallpapers",
    description: "Premium custom wall coverings",
    href: "/collections/wallpapers",
    coverImage: "/Wonder/10.webp",
    placeholderGradient: ["#F3E8D5", "#D6C4AE"],
    featured: true,
    subcategories: [
      buildSubcategory("wallpapers", "wonder-collection", "Wonder Collection"),
      buildSubcategory("wallpapers", "religion", "Religion"),
      buildSubcategory("wallpapers", "art", "Art"),
      buildSubcategory("wallpapers", "kids", "Kids"),
      buildSubcategory("wallpapers", "wall-murals", "Wall Murals"),
      buildSubcategory("wallpapers", "3d-wall-murals", "3D Wall Murals"),
    ],
    // --- new fields ---
    pricingMode: "quote",
    currency: "INR",
    active: true,
    materials: ["Non-woven", "Vinyl", "Fabric"],
    tags: ["wallpaper", "wall-covering", "interior", "custom"],
    metaTitle: "Custom Wallpapers & Wall Murals | Wonder Wallz",
    metaDescription:
      "Explore our premium custom wallpapers — from artistic wall murals to kids' designs and religious motifs. Made to measure for any wall.",
  },
  {
    // --- existing fields ---
    id: "blinds",
    slug: "blinds",
    title: "Blinds",
    description: "Custom-fit window solutions",
    href: "/collections/blinds",
    coverImage: "/Blinds.avif",
    placeholderGradient: ["#EEE9E0", "#D8CEC1"],
    featured: true,
    subcategories: [
      buildSubcategory("blinds", "roller", "Roller"),
      buildSubcategory("blinds", "zebra", "Zebra"),
      buildSubcategory("blinds", "roman", "Roman"),
      buildSubcategory("blinds", "venetian", "Venetian"),
      buildSubcategory("blinds", "vertical", "Vertical"),
    ],
    // --- new fields ---
    pricingMode: "perSqFt",
    currency: "INR",
    active: true,
    materials: ["Polyester", "Aluminium", "Bamboo", "PVC"],
    tags: ["blinds", "window", "light-control", "privacy"],
    metaTitle: "Custom Window Blinds — Roller, Zebra & More | Wonder Wallz",
    metaDescription:
      "Shop custom-fit blinds in roller, zebra, roman, venetian and vertical styles. Precision-made for your windows.",
  },
  {
    // --- existing fields ---
    id: "curtains",
    slug: "curtains",
    title: "Curtains",
    description: "Tailored drapery for every room",
    href: "/collections/curtains",
    coverImage: "/Curtain.jpg",
    placeholderGradient: ["#F7F1EA", "#DCCFC2"],
    featured: false,
    subcategories: [
      buildSubcategory("curtains", "sheer", "Sheer"),
      buildSubcategory("curtains", "blackout", "Blackout"),
      buildSubcategory("curtains", "eyelet", "Eyelet"),
      buildSubcategory("curtains", "pleated", "Pleated"),
    ],
    // --- new fields ---
    pricingMode: "perSqFt",
    currency: "INR",
    active: true,
    materials: ["Sheer Fabric", "Blackout Polyester", "Cotton Blend", "Linen"],
    tags: ["curtains", "drapery", "window", "blackout", "sheer"],
    metaTitle: "Custom Curtains & Drapery | Wonder Wallz",
    metaDescription:
      "Tailored sheer, blackout, eyelet and pleated curtains for every room. Choose your fabric, style and dimensions.",
  },
  {
    // --- existing fields ---
    id: "upholstery",
    slug: "upholstery",
    title: "Upholstery",
    description: "Fine fabrics for furniture & interiors",
    href: "/collections/upholstery",
    placeholderGradient: ["#EFE4D7", "#C9B39A"],
    coverImage: "/Upholstery.webp",
    featured: false,
    // --- new fields ---
    pricingMode: "quote",
    currency: "INR",
    active: true,
    materials: ["Velvet", "Leather", "Cotton", "Microfibre"],
    tags: ["upholstery", "fabric", "furniture", "interior"],
    metaTitle: "Upholstery Fabrics & Services | Wonder Wallz",
    metaDescription:
      "Premium upholstery fabrics for sofas, chairs and interiors. Custom cuts available on request.",
  },
  {
    // --- existing fields ---
    id: "glass-films",
    slug: "glass-films",
    title: "Glass Films",
    description: "Frosted & decorative glass finishes",
    href: "/collections/glass-films",
    coverImage: "/Glass-Film.webp",
    placeholderGradient: ["#E7F2F8", "#C6DCE9"],
    featured: false,
    subcategories: [
      buildSubcategory("glass-films", "frosted", "Frosted"),
      buildSubcategory("glass-films", "custom-printed", "Custom Printed"),
    ],
    // --- new fields ---
    pricingMode: "perSqFt",
    currency: "INR",
    active: true,
    materials: ["PET Film", "Static Cling"],
    tags: ["glass-film", "frosted", "privacy", "office", "decorative"],
    metaTitle: "Frosted & Decorative Glass Films | Wonder Wallz",
    metaDescription:
      "Transform plain glass with frosted or custom-printed films. Ideal for offices, bathrooms and retail spaces.",
  },
  {
    // --- existing fields ---
    id: "flooring",
    slug: "flooring",
    title: "Flooring",
    description: "Warm, durable flooring for any space",
    href: "/collections/flooring",
    coverImage: "/Wooden-Floor.jpg",
    placeholderGradient: ["#D7B899", "#8B6A4E"],
    featured: true,
    subcategories: [
      buildSubcategory("flooring", "spc", "SPC"),
      buildSubcategory("flooring", "wooden", "Wooden"),
      buildSubcategory("flooring", "pvc", "PVC"),
    ],
    // --- new fields ---
    pricingMode: "perSqFt",
    currency: "INR",
    active: true,
    materials: ["SPC", "Hardwood", "PVC"],
    tags: ["flooring", "wooden", "spc", "pvc", "waterproof"],
    metaTitle: "SPC, Wooden & PVC Flooring | Wonder Wallz",
    metaDescription:
      "Durable and stylish flooring solutions — SPC, wooden laminate and PVC options for homes and commercial spaces.",
  },
  {
    // --- existing fields ---
    id: "canvas-prints",
    slug: "canvas-prints",
    title: "Canvas Prints",
    description: "Gallery-grade printed canvases",
    href: "/collections/canvas-prints",
    coverImage: "/canvas.webp",
    placeholderGradient: ["#F4E7D2", "#D9B88F"],
    featured: false,
    // --- new fields ---
    pricingMode: "fixed",
    currency: "INR",
    active: true,
    materials: ["Stretched Canvas", "Fine-Art Paper"],
    tags: ["canvas", "print", "art", "wall-art", "gift"],
    metaTitle: "Custom Canvas Prints | Wonder Wallz",
    metaDescription:
      "Gallery-grade canvas prints made from your photos or artwork. Available in multiple sizes and frame options.",
  },
];

/** Look up a top-level product by its slug. */
export function getProductBySlug(slug: string): Product | undefined {
  return products.find((product) => product.slug === slug);
}

/** Look up a subcategory by its parent product slug + its own slug. */
export function getSubcategoryBySlug(
  productSlug: string,
  subcategorySlug: string
): ProductSubcategory | undefined {
  return getProductBySlug(productSlug)?.subcategories?.find(
    (sub) => sub.slug === subcategorySlug
  );
}

/** Products flagged as `featured`, e.g. for homepage "Shop by Product". */
export function getFeaturedProducts(): Product[] {
  return products.filter((product) => product.featured);
}

/** Flat list of every subcategory across all products, useful for search. */
export function getAllSubcategories(): ProductSubcategory[] {
  return products.flatMap((product) => product.subcategories ?? []);
}

// -----------------------------------------------------------------------------
// Convenience helpers for new fields — safe to call even before a backend
// -----------------------------------------------------------------------------

/** Active products only. Useful for public-facing listing pages. */
export function getActiveProducts(): Product[] {
  return products.filter((product) => product.active !== false);
}

/**
 * Products sorted by `sortOrder` (ascending), with unsorted products last.
 * Non-destructive — returns a new array.
 */
export function getSortedProducts(): Product[] {
  return [...products].sort((a, b) => {
    const aOrder = a.sortOrder ?? Infinity;
    const bOrder = b.sortOrder ?? Infinity;
    return aOrder - bOrder;
  });
}

/** Products linked to a specific offer id. */
export function getProductsByOfferId(offerId: string): Product[] {
  return products.filter((product) => product.offerId === offerId);
}
