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
  /** Whether this product should be highlighted (e.g. homepage, top picks) */
  placeholderGradient: [string, string];
  featured: boolean;
  /** Optional nested subcategories */
  subcategories?: ProductSubcategory[];
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
  },
  {
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
  },
  {
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
  },
  {
    id: "upholstery",
    slug: "upholstery",
    title: "Upholstery",
    description: "Fine fabrics for furniture & interiors",
    href: "/collections/upholstery",
    placeholderGradient: ["#EFE4D7", "#C9B39A"],
    coverImage: "/Upholstery.webp",
    featured: false,
  },
  {
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
  },
  {
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
  },
  {
    id: "canvas-prints",
    slug: "canvas-prints",
    title: "Canvas Prints",
    description: "Gallery-grade printed canvases",
    href: "/collections/canvas-prints",
    coverImage: "/canvas.webp",
    placeholderGradient: ["#F4E7D2", "#D9B88F"],
    featured: false,
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
