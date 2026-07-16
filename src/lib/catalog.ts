/**
 * src/lib/catalog.ts
 *
 * FUTURE source of truth for catalogue hierarchy.
 *
 * ─────────────────────────────────────────────────────────────────────────
 * THIS FILE IS NOT CONNECTED TO ANYTHING YET.
 *
 * It does not replace, migrate, or read from `collections.ts`. Nothing in
 * the app imports from this file. It exists purely to establish the shape
 * that future catalogue products (Flooring, Blinds, Curtains, Upholstery,
 * etc.) will eventually be modelled with, so that work can start without
 * touching the currently-working Wallpaper implementation.
 * ─────────────────────────────────────────────────────────────────────────
 *
 * HIERARCHY
 * ─────────
 * Category            e.g. "Wallpapers", "Flooring"
 *   └─ Type            e.g. "Designer Wallpapers", "Vinyl", "Laminate"
 *        └─ Series      e.g. "Wonder Collection", "Premium Vinyl 1.5 mm"
 *
 * This is deliberately one level deeper than today's `collections.ts`,
 * which only goes Collection → Subcategory → Product. That flat shape is
 * fine for Wallpapers (which really only has one "Type"), but doesn't
 * scale to Flooring, where a single category legitimately splits into
 * several distinct *types* of product (Vinyl, Laminate, Sports, Carpet
 * Tiles), each of which then contains its own *series*.
 *
 * Nothing here has products, images, pricing, or routing yet — those stay
 * the responsibility of `collections.ts` (or its eventual successor) until
 * we deliberately decide to migrate.
 */

// ─── Interfaces ─────────────────────────────────────────────────────────────

/**
 * A Series is the most specific, customer-facing grouping — the actual
 * named line a customer picks (e.g. "Wonder Collection", "Venice").
 *
 * This maps roughly to what `collections.ts` currently calls a
 * `collectionLabel` on individual wallpaper products, except here it's a
 * first-class entity rather than a string repeated on every product.
 */
export interface CatalogSeries {
  /** Stable unique id, e.g. "wallpapers-wonder-collection" */
  id: string;
  /** URL-safe slug, e.g. "wonder-collection" */
  slug: string;
  /** Display name, e.g. "Wonder Collection" */
  title: string;
  /** Optional short description for hero/PDP copy */
  description?: string;
  /**
   * BRIDGE FIELD — connects this catalogue-hierarchy entry to its real
   * product data.
   *
   * `collectionSlug` is NOT a slug within this file. It is a pointer out
   * to wherever the actual products for this series live:
   *   - For series that already exist today, it matches a `Collection.slug`
   *     (or a `CollectionSubcategory.slug` within one) in `collections.ts`
   *     — e.g. "wonder-collection" resolves to the Wonder Collection
   *     wallpaper subcategory that already has real generated designs.
   *   - For series that don't have real product data yet (all of Flooring,
   *     for now), it's the *future* identifier that a not-yet-created data
   *     source (e.g. a `flooring.ts` products file) will key its products
   *     by. Nothing resolves it today — it's a reserved name so that when
   *     real flooring data is added, it slots in under an id that was
   *     decided up front instead of invented ad hoc.
   *
   * This is deliberately a plain string, not a typed reference, because
   * `catalog.ts` must not import from `collections.ts` (or any future
   * product file) — that would risk coupling this structural map to
   * data/UI concerns. Resolving `collectionSlug` into actual products is
   * the job of whatever code eventually consumes this hierarchy, not this
   * file.
   */
  collectionSlug: string;
}

/**
 * A Type is the mid-level grouping beneath a Category — the different
 * "kinds" of product a category is made of (e.g. Flooring splits into
 * Vinyl, Laminate, Sports, Carpet Tiles; Wallpapers currently has just one
 * Type, "Designer Wallpapers").
 *
 * A Type owns zero or more Series.
 */
export interface CatalogType {
  /** Stable unique id, e.g. "flooring-vinyl" */
  id: string;
  /** URL-safe slug, e.g. "vinyl" */
  slug: string;
  /** Display name, e.g. "Vinyl" */
  title: string;
  /** Optional short description */
  description?: string;
  /** Series that belong to this type */
  series: CatalogSeries[];
}

/**
 * A Category is the top-level catalogue entry (e.g. "Wallpapers",
 * "Flooring", "Blinds"). Roughly equivalent to today's `Collection` in
 * `collections.ts`, but intentionally minimal — no workflow, hero copy,
 * images, or product arrays here. Those concerns stay with `collections.ts`
 * (or whatever eventually consumes this hierarchy) so this file can stay
 * a pure structural map.
 *
 * A Category owns one or more Types.
 */
export interface CatalogCategory {
  /** Stable unique id, e.g. "wallpapers" */
  id: string;
  /** URL-safe slug, e.g. "wallpapers" */
  slug: string;
  /** Display name, e.g. "Wallpapers" */
  title: string;
  /** Optional short description */
  description?: string;
  /** Types that belong to this category */
  types: CatalogType[];
}

// ─── Example catalog (Wallpapers + Flooring only) ─────────────────────────
//
// This is illustrative scaffolding, not live data. It is not imported by
// any route, component, or the existing `collections.ts`. Populate/extend
// it deliberately when we actually decide to build on this structure.
//
// Every `CatalogSeries` below sets `collectionSlug` — see the field's doc
// comment above for what it means. In short: for Wallpapers it already
// resolves to real subcategory slugs in `collections.ts`; for Flooring it's
// a reserved name waiting for real product data to exist.

export const exampleCatalog: CatalogCategory[] = [
  {
    id: "wallpapers",
    slug: "wallpapers",
    title: "Wallpapers",
    types: [
      {
        id: "wallpapers-designer-wallpapers",
        slug: "designer-wallpapers",
        title: "Designer Wallpapers",
        series: [
          // Each `collectionSlug` here matches an existing wallpaper
          // subcategory slug in `collections.ts` (see WALLPAPER_COLLECTIONS
          // / the "wallpapers" collection's `subcategories`), so real
          // product data already exists behind every one of these.
          { id: "wallpapers-wonder-collection", slug: "wonder-collection", title: "Wonder Collection", collectionSlug: "wonder-collection" },
          { id: "wallpapers-wonder-art-mural", slug: "wonder-art-mural", title: "Wonder Art Mural", collectionSlug: "wonder-art-mural" },
          { id: "wallpapers-amazing-wall", slug: "amazing-wall", title: "Amazing Wall", collectionSlug: "amazing-wall" },
          { id: "wallpapers-religion", slug: "religion", title: "Religion", collectionSlug: "religion" },
          { id: "wallpapers-kids-collection", slug: "kids-collection", title: "Kids Collection", collectionSlug: "kids" },
          { id: "wallpapers-art-collection", slug: "art-collection", title: "Art Collection", collectionSlug: "art" },
          { id: "wallpapers-wall-murals", slug: "wall-murals", title: "Wall Murals", collectionSlug: "wall-murals" },
          { id: "wallpapers-3d-wall-murals", slug: "3d-wall-murals", title: "3D Wall Murals", collectionSlug: "3d-wall-murals" },
        ],
      },
    ],
  },
  {
    // ── Flooring bridge note ───────────────────────────────────────────
    // As of the Phase 1 flooring architecture (`src/lib/flooring/`),
    // every `collectionSlug` under this category's series should match a
    // collection slug registered in `flooring/registry.ts`
    // (`FLOORING_COLLECTION_SLUGS`). `catalog.ts` still does not import
    // from `flooring/` — that stays a one-way pointer resolved by
    // whatever consumes this hierarchy — but the slugs are now real,
    // typed placeholders rather than reserved names with no backing data.
    id: "flooring",
    slug: "flooring",
    title: "Flooring",
    types: [
      {
        id: "flooring-vinyl",
        slug: "vinyl",
        title: "Vinyl",
        series: [
          { id: "flooring-premium-vinyl-1-5mm", slug: "premium-vinyl-1-5mm", title: "Premium Vinyl 1.5 mm", collectionSlug: "premium-vinyl-1-5mm" },
          { id: "flooring-premium-vinyl-2-0mm", slug: "premium-vinyl-2-0mm", title: "Premium Vinyl 2.0 mm", collectionSlug: "premium-vinyl-2-0mm" },
        ],
      },
      {
        id: "flooring-laminate",
        slug: "laminate",
        title: "Laminate",
        series: [
          { id: "flooring-venice", slug: "venice", title: "Venice", collectionSlug: "venice" },
        ],
      },
      {
        id: "flooring-sports",
        slug: "sports",
        title: "Sports",
        series: [
          { id: "flooring-malaga", slug: "malaga", title: "Malaga", collectionSlug: "malaga" },
        ],
      },
      {
        id: "flooring-carpet-tiles",
        slug: "carpet-tiles",
        title: "Carpet Tiles",
        series: [
          { id: "flooring-bern", slug: "bern", title: "Bern", collectionSlug: "bern" },
          { id: "flooring-beruni", slug: "beruni", title: "Beruni", collectionSlug: "beruni" },
        ],
      },
    ],
  },
];
