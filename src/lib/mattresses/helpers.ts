/**
 * src/lib/mattresses/helpers.ts
 *
 * Lookup helpers over MATTRESS_CATALOGUE, mirroring the shape of
 * src/lib/flooring/helpers.ts so collections.ts can adapt this registry the
 * same way it already adapts the flooring one.
 */

import { MATTRESS_CATALOGUE } from "./data";
import type { MattressCategory, MattressProduct, MattressSeries } from "./types";

/** All top-level catalogue categories (Luxe Collection, Celestial, Cloude Essential, Accessories). */
export function getMattressCategories(): MattressCategory[] {
  return MATTRESS_CATALOGUE;
}

/** Find a category by its URL slug. */
export function getMattressCategoryBySlug(slug: string): MattressCategory | undefined {
  return MATTRESS_CATALOGUE.find((c) => c.slug === slug);
}

/** All series within a given category slug. */
export function getSeriesByCategory(categorySlug: string): MattressSeries[] {
  return getMattressCategoryBySlug(categorySlug)?.series ?? [];
}

/** Find a single product by its slug, searching every category/series. */
export function getMattressProductBySlug(productSlug: string): MattressProduct | undefined {
  for (const category of MATTRESS_CATALOGUE) {
    for (const series of category.series) {
      const found = series.products.find((p) => p.slug === productSlug);
      if (found) return found;
    }
  }
  return undefined;
}
