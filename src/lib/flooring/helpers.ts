/**
 * src/lib/flooring/helpers.ts
 *
 * Reusable, strongly-typed lookup and query helpers. This is the ONLY
 * layer that should read from `registry.ts` and `specs/` directly —
 * pages/components should always go through these functions rather than
 * reaching into the registry themselves, so the underlying data shape
 * can change without breaking every call site.
 */

import { FLOORING_CATEGORIES } from "./constants";
import { FLOORING_REGISTRY } from "./registry";
import { FLOORING_SPECIFICATIONS } from "./specs";
import type {
  AnyFlooringSpecification,
  FlooringCategory,
  FlooringCategorySlug,
  FlooringCollection,
  FlooringSeries,
  FlooringVariant,
} from "./types";

// ─── Category ────────────────────────────────────────────────────────────

/** Look up a flooring category by slug. */
export function getFlooringCategory(
  slug: FlooringCategorySlug | string
): FlooringCategory | undefined {
  return FLOORING_CATEGORIES.find((category) => category.slug === slug);
}

/** All collections belonging to a given category. */
export function getCollectionsByCategory(
  categorySlug: FlooringCategorySlug | string
): readonly FlooringCollection[] {
  return Object.values(FLOORING_REGISTRY).filter(
    (collection) => collection.category === categorySlug
  );
}

// ─── Collection ──────────────────────────────────────────────────────────

/** Look up a collection by its slug. */
export function getCollection(collectionSlug: string): FlooringCollection | undefined {
  return FLOORING_REGISTRY[collectionSlug];
}

// ─── Series ──────────────────────────────────────────────────────────────

/**
 * Look up a series by collection + series slug. Returns `undefined` if
 * the collection doesn't exist or doesn't use the Series level.
 */
export function getSeries(
  collectionSlug: string,
  seriesSlug: string
): FlooringSeries | undefined {
  const collection = getCollection(collectionSlug);
  return collection?.series?.find((series) => series.slug === seriesSlug);
}

// ─── Variant ─────────────────────────────────────────────────────────────

/**
 * Look up a variant anywhere beneath a collection — whether it lives
 * directly on the collection (no Series) or under one of its series.
 */
export function getVariant(
  collectionSlug: string,
  variantSlug: string
): FlooringVariant | undefined {
  const collection = getCollection(collectionSlug);
  if (!collection) return undefined;

  const direct = collection.variants?.find((variant) => variant.slug === variantSlug);
  if (direct) return direct;

  for (const series of collection.series ?? []) {
    const found = series.variants.find((variant) => variant.slug === variantSlug);
    if (found) return found;
  }

  return undefined;
}

/**
 * Scan the entire registry for a variant by its supplier reference code
 * (e.g. "6711"), independent of which collection/series it lives under.
 */
export function lookupByReferenceCode(
  referenceCode: string
): { collection: FlooringCollection; series?: FlooringSeries; variant: FlooringVariant } | undefined {
  for (const collection of Object.values(FLOORING_REGISTRY)) {
    const direct = collection.variants?.find((v) => v.referenceCode === referenceCode);
    if (direct) return { collection, variant: direct };

    for (const series of collection.series ?? []) {
      const found = series.variants.find((v) => v.referenceCode === referenceCode);
      if (found) return { collection, series, variant: found };
    }
  }
  return undefined;
}

// ─── Specification ───────────────────────────────────────────────────────

/**
 * Resolve the effective specification for a variant: a Series-level
 * `specificationId` (if the variant sits under a series that defines one)
 * takes precedence over the parent Collection's `specificationId`.
 */
export function getSpecification(
  collectionSlug: string,
  seriesSlug?: string
): AnyFlooringSpecification | undefined {
  const collection = getCollection(collectionSlug);
  if (!collection) return undefined;

  const series = seriesSlug ? collection.series?.find((s) => s.slug === seriesSlug) : undefined;
  const specificationId = series?.specificationId || collection.specificationId;

  if (!specificationId) return undefined;
  return FLOORING_SPECIFICATIONS[specificationId];
}
