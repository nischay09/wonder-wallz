// ─── Estimate calculation helpers ─────────────────────────────────────────────
//
// Pure, framework-agnostic functions so the pricing logic stays modular and
// easy to swap for a backend-calculated estimate later.

import type { Unit, Product } from './types';
import type { Material } from './materials';
import { getMinBillableArea } from './materials';

/** Convert a width × height pair (in the given unit) into square feet. */
export function toSquareFeet(width: number, height: number, unit: Unit): number {
  if (!width || !height || width <= 0 || height <= 0) return 0;

  switch (unit) {
    case 'ft':
      return width * height;
    case 'in':
      return (width * height) / 144;
    case 'cm':
      // 1 sq cm ≈ 0.00107639 sq ft
      return width * height * 0.00107639;
    default:
      return 0;
  }
}

/**
 * Billable Area = max(Coverage Area, Minimum Billable Area) for the product.
 * This is the area the estimate is actually calculated on — never the raw
 * coverage area shown to the customer.
 */
export function calculateBillableArea(coverageAreaSqFt: number, product: Product): number {
  if (!coverageAreaSqFt || coverageAreaSqFt <= 0) return 0;
  return Math.max(coverageAreaSqFt, getMinBillableArea(product));
}

/**
 * Returns true when the minimum billable area floor was applied — i.e. the
 * entered coverage area is below the product's minimum. Used only to decide
 * whether to show the "minimum billable area" note; never used to display a
 * formula or rate.
 */
export function isMinBillableAreaApplied(coverageAreaSqFt: number, product: Product): boolean {
  if (!coverageAreaSqFt || coverageAreaSqFt <= 0) return false;
  return coverageAreaSqFt < getMinBillableArea(product);
}

/**
 * Estimated total = billable area (sq ft) × the selected material's internal
 * rate. Pass the *billable* area (from `calculateBillableArea`), not the raw
 * coverage area, so the minimum-area business rule is always honoured.
 */
export function calculateEstimatedTotal(billableAreaSqFt: number, material: Material | undefined): number {
  if (!material || !billableAreaSqFt) return 0;
  return billableAreaSqFt * material.rate;
}

/** Format a number of sq ft for display, e.g. 12.5 → "12.5 sq ft". */
export function formatArea(areaSqFt: number): string {
  if (!areaSqFt) return '—';
  return `${areaSqFt.toFixed(2)} sq ft`;
}

/** Format an amount as Indian Rupees, e.g. 1234 → "₹1,234". */
export function formatCurrency(amount: number): string {
  if (!amount) return '—';
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits: 0,
  }).format(amount);
}
