/**
 * src/lib/flooring/constants.ts
 *
 * Categories, enums, and shared configuration for the flooring
 * architecture. No lookup logic here — see `helpers.ts` for that.
 */

import type { FlooringCategory, FlooringCategorySlug } from "./types";

/**
 * Every flooring category, in canonical display order. This is the single
 * place a new top-level flooring family gets registered — after adding
 * the slug to `FlooringCategorySlug` in `types.ts`, add its entry here.
 */
export const FLOORING_CATEGORIES: readonly FlooringCategory[] = [
  {
    id: "flooring-luxury-vinyl-tiles",
    slug: "luxury-vinyl-tiles",
    title: "Luxury Vinyl Tiles",
    description: "Premium vinyl plank and tile flooring.",
  },
  {
    id: "flooring-laminate-flooring",
    slug: "laminate-flooring",
    title: "Laminate Flooring",
    description: "Durable laminate flooring for residential and commercial use.",
  },
  {
    id: "flooring-sports-flooring",
    slug: "sports-flooring",
    title: "Sports Flooring",
    description: "Performance flooring systems for sports and fitness facilities.",
  },
  {
    id: "flooring-carpet-tiles",
    slug: "carpet-tiles",
    title: "Carpet Tiles",
    description: "Modular carpet tile flooring.",
  },
] as const;

/** Ordered list of valid category slugs, derived from `FLOORING_CATEGORIES`. */
export const FLOORING_CATEGORY_SLUGS: readonly FlooringCategorySlug[] =
  FLOORING_CATEGORIES.map((c) => c.slug);

/** The catalogue-level slug this whole product family is namespaced under (`catalog.ts`). */
export const FLOORING_CATALOG_CATEGORY_SLUG = "flooring" as const;
