// ─── Materials configuration for the Wonder Wallz Project Builder ────────────
//
// Single source of truth for every selectable material, grouped by product
// type. This file is intentionally framework-agnostic so it can be swapped
// for a CMS/backend-driven fetch() later without touching any component.
//
// IMPORTANT: `rate` is an internal figure used only to calculate an
// estimated total. It must never be rendered directly in the UI.

import type { Product } from './types';

export interface Material {
  /** Stable unique id, e.g. "wallpaper-non-woven" */
  id: string;
  /** Display name, e.g. "Non-Woven" */
  name: string;
  /** Short customer-facing description of the material */
  description: string;
  /** Internal rate per sq ft, used only for estimate calculations — never displayed */
  rate: number;
  /** Human-readable production time range shown to the customer */
  estimatedProductionDays: string;
}

const WALLPAPER_PRODUCTION_TIME = '3–5 Working Days';
const GLASS_FILM_PRODUCTION_TIME = '3–5 Working Days';
const CANVAS_PRODUCTION_TIME = '5–7 Working Days';

/** Estimated production time per product type — single source of truth. */
export const PRODUCTION_TIME_BY_PRODUCT: Record<Product, string> = {
  Wallpaper: WALLPAPER_PRODUCTION_TIME,
  'Custom Glass Film': GLASS_FILM_PRODUCTION_TIME,
  'Canvas Print': CANVAS_PRODUCTION_TIME,
};

/** Estimated production time for a given product type. */
export function getProductionTime(product: Product): string {
  return PRODUCTION_TIME_BY_PRODUCT[product];
}

export const MATERIALS: Record<Product, Material[]> = {
  Wallpaper: [
    {
      id: 'wallpaper-non-woven',
      name: 'Non-Woven',
      description: 'Premium tear-resistant wallpaper suitable for most residential interiors.',
      rate: 60,
      estimatedProductionDays: WALLPAPER_PRODUCTION_TIME,
    },
    {
      id: 'wallpaper-textured',
      name: 'Textured',
      description: 'Embossed finish that adds depth and hides wall imperfections.',
      rate: 100,
      estimatedProductionDays: WALLPAPER_PRODUCTION_TIME,
    },
    {
      id: 'wallpaper-golden-paper',
      name: 'Golden Paper',
      description: 'Luxury metallic finish for premium feature walls.',
      rate: 120,
      estimatedProductionDays: WALLPAPER_PRODUCTION_TIME,
    },
    {
      id: 'wallpaper-vinyl-matte',
      name: 'Vinyl Matte',
      description: 'Durable washable wallpaper with a soft non-reflective finish.',
      rate: 60,
      estimatedProductionDays: WALLPAPER_PRODUCTION_TIME,
    },
    {
      id: 'wallpaper-vinyl-glossy',
      name: 'Vinyl Glossy',
      description: 'Smooth glossy finish with vibrant colours.',
      rate: 60,
      estimatedProductionDays: WALLPAPER_PRODUCTION_TIME,
    },
  ],
  'Custom Glass Film': [
    {
      id: 'glass-frosted',
      name: 'Frosted',
      description: 'Provides privacy while allowing natural light. Available media widths: 36", 48", 60".',
      rate: 60,
      estimatedProductionDays: GLASS_FILM_PRODUCTION_TIME,
    },
    {
      id: 'glass-clear-vinyl',
      name: 'Clear Vinyl',
      description: 'Transparent decorative printed film. Available media widths: 40", 50".',
      rate: 60,
      estimatedProductionDays: GLASS_FILM_PRODUCTION_TIME,
    },
    {
      id: 'glass-ultra-clear',
      name: 'Ultra Clear',
      description: 'Premium transparent film with maximum clarity. Available media width: 50".',
      rate: 100,
      estimatedProductionDays: GLASS_FILM_PRODUCTION_TIME,
    },
    {
      id: 'glass-ultra-clear-white-ink',
      name: 'Ultra Clear + White Ink',
      description: 'High colour opacity on transparent glass. Available media width: 50".',
      rate: 140,
      estimatedProductionDays: GLASS_FILM_PRODUCTION_TIME,
    },
    {
      id: 'glass-one-way-vision',
      name: 'One Way Vision',
      description: 'External graphics while maintaining outward visibility. Available media widths: 40", 50".',
      rate: 70,
      estimatedProductionDays: GLASS_FILM_PRODUCTION_TIME,
    },
  ],
  'Canvas Print': [
    {
      id: 'canvas-matte',
      name: 'Canvas Matte',
      description: 'Museum-quality matte canvas for artwork and photography. Available media widths: 40", 50".',
      rate: 120,
      estimatedProductionDays: CANVAS_PRODUCTION_TIME,
    },
    {
      id: 'canvas-sparkle-wall-fabric',
      name: 'Sparkle Wall Fabric',
      description: 'Premium textured fabric with a subtle shimmer. Available media width: 54".',
      rate: 110,
      estimatedProductionDays: CANVAS_PRODUCTION_TIME,
    },
  ],
};

/** All materials available for a given product type. */
export function getMaterialsForProduct(product: Product): Material[] {
  return MATERIALS[product] ?? [];
}

/** Look up a specific material by product + material id. */
export function getMaterialById(product: Product, materialId: string): Material | undefined {
  return getMaterialsForProduct(product).find((m) => m.id === materialId);
}

/** The default (first-listed) material for a given product type. */
export function getDefaultMaterial(product: Product): Material | undefined {
  return getMaterialsForProduct(product)[0];
}

/** Extra note shown only for Canvas Print — no pricing implication. */
export const CANVAS_FRAME_NOTE = 'Canvas frame available at additional cost.';

// ─── Minimum billable area ─────────────────────────────────────────────────
//
// Billable Area = max(Coverage Area, Minimum Billable Area).
// This exists purely as a floor on the *billable area* used for the
// estimate — it is never shown to the customer as a formula, only reflected
// (when triggered) via a plain-language note alongside the estimate.
export const MIN_BILLABLE_AREA_SQFT: Record<Product, number> = {
  Wallpaper: 20,
  'Custom Glass Film': 11,
  'Canvas Print': 0,
};

/** Minimum billable area (sq ft) for a given product type. 0 means no floor. */
export function getMinBillableArea(product: Product): number {
  return MIN_BILLABLE_AREA_SQFT[product] ?? 0;
}

/** Standard disclaimer shown alongside every estimate. */
export const ESTIMATE_DISCLAIMER =
  'This estimate is provided for budgeting purposes only. Final pricing will be confirmed after reviewing your artwork, dimensions, GST, transportation, installation requirements and any other project-specific production requirements.';

/**
 * Plain-language note shown only when the minimum billable area has been
 * applied (i.e. the entered coverage area is below the product's floor).
 * Never states the floor as a "minimum price" or reveals the rate.
 */
export function getMinBillableAreaNote(product: Product): string {
  const min = getMinBillableArea(product);
  return `This estimate has been calculated using the minimum billable area of ${min} sq ft for ${product}.`;
}
