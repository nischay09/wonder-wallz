/**
 * src/lib/mattresses/types.ts
 *
 * Structural types for the Mattresses & Pillows catalogue, following the
 * same registry pattern already used for Flooring (src/lib/flooring/types.ts).
 *
 * HIERARCHY
 * ─────────
 * MattressCategory        e.g. "Luxe Collection", "Celestial", "Cloude Essential", "Accessories"
 *   └─ MattressSeries       e.g. "Royal Radiance", "Copper X Series", "Pillows", "Protectors"
 *        └─ MattressProduct  e.g. "LUXILLA SUITE", "INFINIA", "IRIS"
 *
 * This mirrors the source-of-truth markdown (product_catalogue.md) exactly:
 * every `##` heading is a Category, every `###` heading is a Series within
 * it, and every `####` heading is a Product within that Series.
 *
 * Nothing here is consumed directly by routes/components — collections.ts
 * adapts this into the flat CollectionProduct[] shape, the same way it
 * already adapts the flooring registry (see flooringVariantToProduct /
 * generateFlooringProducts in collections.ts).
 */

export interface MattressProduct {
  /** Stable unique id, e.g. "luxilla-suite" */
  id: string;
  /** URL-safe slug, e.g. "luxilla-suite" */
  slug: string;
  /** Display name exactly as in the catalogue, e.g. "LUXILLA SUITE" */
  title: string;
  /** Marketing description */
  description: string;
  /** Bullet list of key selling points */
  keyBenefits: string[];
  /** Construction layers, outer to inner, as listed in the catalogue */
  layers: string[];
  /** e.g. "15 Years", "Upto 7 Years" — omitted for accessories without one */
  warranty?: string;
  /** Short feature tags shown as chips, e.g. ["Pocket Spring", "Natural Latex"] */
  features?: string[];
  /** e.g. "M-Plush", "Firm", "M-Firm" — mattresses only */
  comfortLevel?: string;
  /** e.g. `4"TT | 5"TT | 6"ET | 8"ET` — only present on some Cloude Essential items */
  thicknessOptions?: string;
  /** Accessory-specific spec pairs, e.g. { Fabric: "100% Cotton", Filling: "Hollow Poly Fiber" } */
  specs?: Record<string, string>;
}

export interface MattressSeries {
  /** Stable unique id, e.g. "royal-radiance" */
  id: string;
  /** URL-safe slug, e.g. "royal-radiance" */
  slug: string;
  /** Display name, e.g. "Royal Radiance" */
  title: string;
  products: MattressProduct[];
}

export interface MattressCategory {
  /** Stable unique id, e.g. "luxe-collection" */
  id: string;
  /** URL-safe slug, e.g. "luxe-collection" */
  slug: string;
  /** Display name, e.g. "Luxe Collection" */
  title: string;
  series: MattressSeries[];
}
