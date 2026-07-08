/**
 * src/lib/pricing.ts
 *
 * Single pricing engine for Wonder Wallz.
 *
 * Pure TypeScript — no React, no side effects, no framework imports.
 * Reusable by Quick View, Cart, product pages, and any future backend.
 *
 * Out of scope (intentionally excluded):
 *   - GST / taxes
 *   - Coupons
 *   - Offers / promotions
 */

import type { Product } from "./products";
import { getMaterialById, getMinBillableArea } from "./materials";
import type { Product as MaterialProductKind } from "./types";

// ---------------------------------------------------------------------------
// Shared types
// ---------------------------------------------------------------------------

/** Supported linear units for area calculation. */
export type LinearUnit = "ft" | "in" | "cm";

/**
 * Structured pricing descriptor returned by `getDisplayPrice`.
 * The UI reads this object instead of branching on pricingMode itself.
 */
export interface DisplayPrice {
  /** Mirrors the product's pricingMode (or "quote" when undefined). */
  type: "fixed" | "perSqFt" | "quote";
  /** Base price in `currency`. Absent for quote-only products. */
  price?: number;
  /** Promotional price in `currency`. Present only when a sale is active. */
  salePrice?: number;
  /** Always "INR" — widened to a string union when multi-currency lands. */
  currency: "INR";
  /**
   * Ready-to-render label for the product card / Quick View.
   * Examples:
   *   "₹1,200"          (fixed, no sale)
   *   "₹999 (₹1,200)"   (fixed, with sale — sale price leads)
   *   "₹120 / sq.ft"    (perSqFt, no sale)
   *   "₹99 / sq.ft (₹120 / sq.ft)"  (perSqFt, with sale)
   *   "Get Quote"        (quote)
   */
  label: string;
}

// ---------------------------------------------------------------------------
// Internal helpers
// ---------------------------------------------------------------------------

/** Locale-aware INR formatter — no decimals for whole rupee amounts. */
const formatINR = (amount: number): string =>
  new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: amount % 1 === 0 ? 0 : 2,
  }).format(amount);

// ---------------------------------------------------------------------------
// 1. getDisplayPrice
// ---------------------------------------------------------------------------

/**
 * Returns a structured `DisplayPrice` descriptor that fully drives how the
 * UI should render pricing for a given product.
 *
 * Handles all three pricing modes and gracefully degrades:
 *   - Missing `pricingMode` → treated as "quote"
 *   - Missing `price` on a fixed/perSqFt product → treated as "quote"
 *   - `salePrice` only applied when it is strictly less than `price`
 */
export function getDisplayPrice(product: Product): DisplayPrice {
  const mode = product.pricingMode ?? "quote";
  const currency: "INR" = product.currency ?? "INR";

  // --- quote -----------------------------------------------------------------
  if (mode === "quote" || product.price == null) {
    return { type: "quote", currency, label: "Get Quote" };
  }

  const basePrice = product.price;
  const activeSale =
    product.salePrice != null && product.salePrice < basePrice
      ? product.salePrice
      : undefined;

  // --- fixed -----------------------------------------------------------------
  if (mode === "fixed") {
    if (activeSale != null) {
      return {
        type: "fixed",
        price: basePrice,
        salePrice: activeSale,
        currency,
        label: `${formatINR(activeSale)} (${formatINR(basePrice)})`,
      };
    }
    return {
      type: "fixed",
      price: basePrice,
      currency,
      label: formatINR(basePrice),
    };
  }

  // --- perSqFt ---------------------------------------------------------------
  if (mode === "perSqFt") {
    if (activeSale != null) {
      return {
        type: "perSqFt",
        price: basePrice,
        salePrice: activeSale,
        currency,
        label: `${formatINR(activeSale)} / sq.ft (${formatINR(basePrice)} / sq.ft)`,
      };
    }
    return {
      type: "perSqFt",
      price: basePrice,
      currency,
      label: `${formatINR(basePrice)} / sq.ft`,
    };
  }

  // Exhaustive fallback — TypeScript narrows `mode` to `never` here in
  // strict mode, so any future union member will cause a compile error.
  const _exhaustive: never = mode;
  void _exhaustive;
  return { type: "quote", currency, label: "Get Quote" };
}

// ---------------------------------------------------------------------------
// 2. calculateArea
// ---------------------------------------------------------------------------

/**
 * Converts width × height in the given `unit` to an area expressed in
 * **square feet**, rounded to four decimal places.
 *
 * Supported units:
 *   "ft" — feet        (1 ft = 1 ft)
 *   "in" — inches      (1 in = 1/12 ft)
 *   "cm" — centimetres (1 cm ≈ 0.0328084 ft)
 *
 * @param width  Horizontal dimension in `unit`.
 * @param height Vertical dimension in `unit`.
 * @param unit   Linear unit of the supplied dimensions.
 * @returns Area in square feet (≥ 0).
 * @throws {RangeError} When width or height is negative.
 */
export function calculateArea(
  width: number,
  height: number,
  unit: LinearUnit
): number {
  if (width < 0 || height < 0) {
    throw new RangeError(
      `calculateArea: width and height must be non-negative (got ${width} × ${height}).`
    );
  }

  /** Conversion factor: 1 <unit> expressed in feet. */
  const toFeet: Record<LinearUnit, number> = {
    ft: 1,
    in: 1 / 12,          // 12 inches per foot
    cm: 1 / 30.48,       // 30.48 cm per foot
  };

  const factor = toFeet[unit];
  const widthFt = width * factor;
  const heightFt = height * factor;
  const areaSqFt = widthFt * heightFt;

  // Round to 4 decimal places to avoid floating-point noise in estimates.
  return Math.round(areaSqFt * 10_000) / 10_000;
}

// ---------------------------------------------------------------------------
// 3. calculateEstimatedPrice
// ---------------------------------------------------------------------------

/**
 * Returns the estimated total price for a product given dimensions,
 * or `null` when a price cannot be determined (quote-only products,
 * or products without a `price`).
 *
 * Rules:
 *   - `pricingMode = "fixed"`    → product price (ignores dimensions)
 *   - `pricingMode = "perSqFt"` → area (sq.ft) × unit price
 *   - `pricingMode = "quote"`    → `null`
 *   - When `salePrice` is active (< `price`), it is used in place of `price`.
 *
 * @param product Product to estimate for.
 * @param width   Horizontal dimension of the installation area.
 * @param height  Vertical dimension of the installation area.
 * @param unit    Linear unit of the supplied dimensions.
 * @returns Estimated price in INR rounded to 2 decimal places, or `null`.
 */
export function calculateEstimatedPrice(
  product: Product,
  width: number,
  height: number,
  unit: LinearUnit
): number | null {
  const mode = product.pricingMode ?? "quote";

  if (mode === "quote" || product.price == null) {
    return null;
  }

  // Prefer salePrice when it is genuinely lower than the base price.
  const effectivePrice =
    product.salePrice != null && product.salePrice < product.price
      ? product.salePrice
      : product.price;

  if (mode === "fixed") {
    return Math.round(effectivePrice * 100) / 100;
  }

  if (mode === "perSqFt") {
    const area = calculateArea(width, height, unit);
    return Math.round(area * effectivePrice * 100) / 100;
  }

  // Exhaustive fallback.
  const _exhaustive: never = mode;
  void _exhaustive;
  return null;
}

// ---------------------------------------------------------------------------
// 3b. Material-priced products (Wallpaper, Custom Glass Film, Canvas Print)
// ---------------------------------------------------------------------------
//
// A small number of products are NOT priced via `product.price` /
// `pricingMode` at all — their rates live per-material in
// `src/lib/materials.ts` (single source of truth for rate + minimum
// billable area). This section is purely additive: it does not change
// `calculateEstimatedPrice`, `getDisplayPrice`, or any product in
// `products.ts`. Products that already price via `product.price` are
// completely unaffected.

/**
 * Maps a `products.ts` product `slug` to the corresponding `materials.ts`
 * product key. Centralised here so call sites never need to compare slug
 * strings directly.
 *
 * Only products that are priced via `materials.ts` appear here. Any slug
 * not present is not a material-priced product.
 */
export const MATERIAL_PRODUCT_MAP: Partial<Record<string, MaterialProductKind>> = {
  wallpapers: "Wallpaper",
  "glass-films": "Custom Glass Film",
  "canvas-prints": "Canvas Print",
};

/**
 * Estimated price for a material-priced product (Wallpaper, Custom Glass
 * Film, Canvas Print), using the rate of the selected material and the
 * product's minimum billable area — both sourced from `materials.ts`.
 *
 * Returns `null` when:
 *   - `product.slug` does not map to a material-priced product, or
 *   - `materialId` does not match a known material for that product.
 *
 * Callers should fall back to `calculateEstimatedPrice` (product.price /
 * pricingMode path) when this returns `null`.
 *
 * @param product    The product being priced (only `slug` is used to
 *                    resolve the materials.ts product key).
 * @param materialId  The selected `CartItem.material` id, e.g. "wallpaper-non-woven".
 * @param width       Horizontal dimension of the installation area.
 * @param height      Vertical dimension of the installation area.
 * @param unit        Linear unit of the supplied dimensions.
 * @returns Estimated price in INR rounded to 2 decimal places, or `null`.
 */
export function calculateMaterialEstimatedPrice(
  product: Product,
  materialId: string,
  width: number,
  height: number,
  unit: LinearUnit
): number | null {
  const materialProductKind = MATERIAL_PRODUCT_MAP[product.slug];
  if (!materialProductKind) {
    return null;
  }

  const material = getMaterialById(materialProductKind, materialId);
  if (!material) {
    return null;
  }

  // Reuse the existing, single area-conversion implementation.
  const area = calculateArea(width, height, unit);

  // Apply the existing minimum billable area floor for this product.
  const billableArea = Math.max(area, getMinBillableArea(materialProductKind));

  return Math.round(billableArea * material.rate * 100) / 100;
}

// ---------------------------------------------------------------------------
// 4. hasSale
// ---------------------------------------------------------------------------

/**
 * Returns `true` when the product has an active sale price that is strictly
 * lower than its base price.
 *
 * Safe to call on any product regardless of `pricingMode`.
 */
export function hasSale(product: Product): boolean {
  return (
    product.price != null &&
    product.salePrice != null &&
    product.salePrice < product.price
  );
}

// ---------------------------------------------------------------------------
// 5. getSavings
// ---------------------------------------------------------------------------

/**
 * Returns the per-unit saving amount (base price − sale price) when a sale
 * is active, or `null` otherwise.
 *
 * For `perSqFt` products the saving is expressed per square foot.
 * Multiply by area to get total savings on an order.
 *
 * @example
 * // price = 120, salePrice = 99  →  21
 * getSavings(product);
 */
export function getSavings(product: Product): number | null {
  if (!hasSale(product)) {
    return null;
  }

  // hasSale guarantees both values are non-null numbers here.
  const saving = product.price! - product.salePrice!;

  // Round to 2 decimal places to avoid floating-point artefacts.
  return Math.round(saving * 100) / 100;
}
