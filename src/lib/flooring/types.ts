/**
 * src/lib/flooring/types.ts
 *
 * Pure type definitions for the flooring architecture. No values, no data,
 * no logic — only interfaces and type aliases live here.
 *
 * HIERARCHY
 * ─────────
 *   FlooringCategory
 *     └─ FlooringCollection
 *          └─ FlooringSeries (OPTIONAL)
 *               └─ FlooringVariant
 *
 * A Collection may skip Series entirely and own Variants directly
 * (e.g. Carpet Tiles → Bern → variants). A Collection that uses Series
 * does NOT also carry variants directly — see `FlooringCollection` below.
 *
 * SPECIFICATIONS
 * ──────────────
 * Specifications are attached once, at the Collection or Series level,
 * and inherited by every Variant beneath that node. They are never
 * duplicated per-variant. See `helpers.ts#getSpecification` for the
 * resolution order (Series specification wins over Collection
 * specification when both a Series and a Collection define one).
 */

// ─── Shared primitives ──────────────────────────────────────────────────────

/**
 * The top-level flooring product families. Extending this union is the
 * ONLY change required at the type level to introduce a new flooring
 * category — collections, series, and variants are all data, not types.
 */
export type FlooringCategorySlug =
  | "luxury-vinyl-tiles"
  | "laminate-flooring"
  | "sports-flooring"
  | "carpet-tiles";

/** Discriminant used by the specification hierarchy (see below). */
export type FlooringSpecificationKind =
  | "luxury-vinyl"
  | "laminate"
  | "sports"
  | "carpet-tile";

// ─── Specification hierarchy ────────────────────────────────────────────────

/**
 * Fields common to literally every specification in the catalogue,
 * regardless of flooring type.
 */
export interface BaseSpecification {
  id: string;
  slug: string;
  title: string;
  description?: string;
}

/**
 * Fields common to all *flooring* specifications (as opposed to, say,
 * a future wallpaper or blinds specification). Sits between
 * `BaseSpecification` and the material-specific specs.
 */
export interface FlooringSpecification extends BaseSpecification {
  kind: FlooringSpecificationKind;
  /** e.g. "4.5 mm", "12 mm", "6x36 in" — free-form, unit included. */
  thickness?: string;
  /** e.g. "0.5 mm", "20 mil" */
  wearLayer?: string;
  warrantyYears?: number;
}

export interface LuxuryVinylSpecification extends FlooringSpecification {
  kind: "luxury-vinyl";
  plankSize?: string;
  installationMethod?: string;
  waterResistant?: boolean;
}

export interface LaminateSpecification extends FlooringSpecification {
  kind: "laminate";
  acRating?: string;
  coreType?: string;
}

export interface SportsFlooringSpecification extends FlooringSpecification {
  kind: "sports";
  /** e.g. "Uni 4.5" — the underlying construction/system name. */
  system?: string;
  shockAbsorption?: string;
  suitableFor?: readonly string[];
}

export interface CarpetTileSpecification extends FlooringSpecification {
  kind: "carpet-tile";
  pileType?: string;
  tileSize?: string;
  backingType?: string;
}

/** Union of every concrete specification type. Widen this when adding a new flooring type. */
export type AnyFlooringSpecification =
  | LuxuryVinylSpecification
  | LaminateSpecification
  | SportsFlooringSpecification
  | CarpetTileSpecification;

// ─── Catalogue hierarchy ─────────────────────────────────────────────────────

/**
 * The most granular, purchasable entity — a single colourway/reference
 * within a Collection or Series (e.g. "6711 Silver Grey", "VAL-201").
 */
export interface FlooringVariant {
  id: string;
  slug: string;
  /** SKU / reference code as used in supplier catalogues, e.g. "6711". */
  referenceCode: string;
  displayName: string;
  previewImage: string;
  lifestyleImage?: string;
  thumbnail?: string;
}

/**
 * An optional mid-level grouping beneath a Collection
 * (e.g. Malaga → "Uni 4.5"). A Series always owns its own Variants and
 * may set a `specificationId` that overrides the parent Collection's.
 */
export interface FlooringSeries {
  id: string;
  slug: string;
  name: string;
  description?: string;
  /** Overrides the parent Collection's specificationId for this series' variants. */
  specificationId?: string;
  variants: readonly FlooringVariant[];
}

/**
 * A named product line within a Category (e.g. "Malaga", "Valencia").
 *
 * A Collection either:
 *   (a) owns `series` (one or more `FlooringSeries`, each with its own
 *       variants) — in which case `variants` should be omitted/empty, or
 *   (b) owns `variants` directly — in which case `series` should be
 *       omitted/empty (e.g. Carpet Tiles → Bern, which has no Series).
 *
 * This is a data-level convention (see `helpers.ts`), not enforced by the
 * type system, to keep the shape simple and avoid a discriminated union
 * that every future collection file would have to fight with.
 */
export interface FlooringCollection {
  id: string;
  slug: string;
  name: string;
  category: FlooringCategorySlug;
  description?: string;
  heroImage: string;
  galleryImages: readonly string[];
  applications: readonly string[];
  /** Specification inherited by all variants that don't sit under a Series with its own specificationId. */
  specificationId: string;
  /** Present only for collections that use the optional Series level. */
  series?: readonly FlooringSeries[];
  /** Present only for collections that skip Series and own variants directly. */
  variants?: readonly FlooringVariant[];
  customerActionsEnabled: boolean;
}

/**
 * The top-level flooring product family (e.g. "Sports Flooring").
 */
export interface FlooringCategory {
  id: string;
  slug: FlooringCategorySlug;
  title: string;
  description?: string;
}
