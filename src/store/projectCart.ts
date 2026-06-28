/**
 * src/store/projectCart.ts
 *
 * Single source of truth for the Wonder Wallz Project Cart.
 *
 * Built with Zustand + persist middleware (localStorage).
 * Fully typed and backend-ready — no React, no API calls, no side effects
 * beyond localStorage persistence.
 *
 * Price calculations are intentionally delegated to src/lib/pricing.ts.
 * This store never computes prices itself.
 *
 * Out of scope (intentionally excluded):
 *   - WhatsApp integration
 *   - Project Builder wiring
 *   - Backend / API calls
 *   - GST, coupons, offers
 *
 * If CartItem needs to be shared across modules in the future, extract it
 * to src/types/cart.ts without changing the store API.
 */

import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import type { Product } from "@/lib/products";
import { calculateEstimatedPrice } from "@/lib/pricing";
import type { LinearUnit } from "@/lib/pricing";

// ---------------------------------------------------------------------------
// CartItem interface
// ---------------------------------------------------------------------------

/**
 * A single line-item in the project cart.
 *
 * `id` is caller-supplied (e.g. a `crypto.randomUUID()` at add-time) so the
 * store stays pure and the same product can appear multiple times with
 * different dimensions or materials.
 *
 * `estimatedPrice` is optional because quote-only products return `null`
 * from `calculateEstimatedPrice`. The store stores `undefined` in that case
 * (JSON-serialisable and unambiguous).
 */
export interface CartItem {
  /** Stable unique identifier for this line-item. */
  id: string;
  /** Full product snapshot. Stored by value so cart survives product edits. */
  product: Product;
  /** Width of the installation area in `unit`. */
  width: number;
  /** Height of the installation area in `unit`. */
  height: number;
  /** Linear unit used for width and height. */
  unit: LinearUnit;
  /** Selected material / finish for this line-item. */
  material: string;
  /** Number of identical pieces required. Must be ≥ 1. */
  quantity: number;
  /**
   * Pre-computed estimated price for ONE piece (before multiplying by
   * quantity). `undefined` when the product is quote-only or has no price.
   * Multiply by `quantity` to get the line total.
   */
  estimatedPrice?: number;
}

// ---------------------------------------------------------------------------
// Workflow classification
// ---------------------------------------------------------------------------

/**
 * Describes the nature of the current cart contents.
 *
 * "custom"   — every item requires a custom quote (pricingMode = "quote")
 * "standard" — every item has a fixed / per-sq-ft price
 * "mixed"    — a combination of both
 * "empty"    — the cart has no items
 */
export type CartWorkflow = "custom" | "standard" | "mixed" | "empty";

// ---------------------------------------------------------------------------
// Store shape
// ---------------------------------------------------------------------------

/** Read-only state slices exposed by the store. */
interface CartState {
  /** All current line-items. */
  items: CartItem[];
}

/** Mutating actions and derived-value selectors exposed by the store. */
interface CartActions {
  /**
   * Adds a new line-item to the cart.
   *
   * The caller must supply a unique `item.id` (e.g. `crypto.randomUUID()`).
   * `estimatedPrice` is computed here via `calculateEstimatedPrice` so the
   * stored value is always in sync with the supplied dimensions and product.
   */
  addItem(item: Omit<CartItem, "estimatedPrice">): void;

  /**
   * Removes the line-item with the given `id`.
   * No-op when the id does not exist.
   */
  removeItem(id: string): void;

  /**
   * Applies a partial update to the line-item identified by `id`.
   *
   * When `width`, `height`, `unit`, or the `product` itself changes,
   * `estimatedPrice` is automatically recalculated.
   * Pass only the fields that need to change; the rest are preserved.
   */
  updateItem(id: string, updates: Partial<Omit<CartItem, "id">>): void;

  /**
   * Convenience shorthand for updating quantity only.
   * Clamps the value to a minimum of 1.
   */
  updateQuantity(id: string, quantity: number): void;

  /** Removes all items from the cart. */
  clearCart(): void;

  // -------------------------------------------------------------------------
  // Derived value selectors
  // These are intentionally functions (not pre-computed state) so they are
  // always fresh and never stale between Zustand re-renders.
  // -------------------------------------------------------------------------

  /**
   * Total number of individual pieces across all line-items
   * (sum of `item.quantity`).
   */
  getItemCount(): number;

  /**
   * Sum of (estimatedPrice × quantity) for every line-item that has a
   * computable price.
   *
   * Returns `null` when the cart is empty or every item is quote-only.
   * Returns a partial total when some items are priceable and others are not
   * (callers should indicate "from ₹X" in that case).
   */
  getEstimatedTotal(): number | null;

  /**
   * Returns `true` when at least one item in the cart is a custom / quote
   * product (pricingMode = "quote" or estimatedPrice is undefined).
   */
  hasCustomProducts(): boolean;

  /**
   * Returns `true` when at least one item in the cart has a computable price
   * (pricingMode = "fixed" or "perSqFt").
   */
  hasStandardProducts(): boolean;

  /**
   * Classifies the overall cart workflow based on the mix of product types.
   *
   * "empty"    — no items
   * "custom"   — all items are quote-only
   * "standard" — all items are priceable
   * "mixed"    — a combination of both
   */
  cartWorkflow(): CartWorkflow;
}

/** Full store type — union of state and actions. */
type CartStore = CartState & CartActions;

// ---------------------------------------------------------------------------
// Internal helpers
// ---------------------------------------------------------------------------

/**
 * Determines whether a CartItem (or a prospective item being built) is
 * considered "custom" (i.e. requires a quote rather than having a price).
 */
function isCustomItem(
  product: Product,
  estimatedPrice: number | undefined
): boolean {
  // An item is custom when it either has no computable price or its product
  // is explicitly in quote mode.
  return estimatedPrice === undefined || product.pricingMode === "quote";
}

/**
 * Recomputes the `estimatedPrice` for a fully-formed CartItem.
 * Returns `undefined` (not `null`) for localStorage-serialisation safety.
 */
function computeEstimatedPrice(
  product: Product,
  width: number,
  height: number,
  unit: LinearUnit
): number | undefined {
  const result = calculateEstimatedPrice(product, width, height, unit);
  return result === null ? undefined : result;
}

// ---------------------------------------------------------------------------
// Store
// ---------------------------------------------------------------------------

export const useProjectCart = create<CartStore>()(
  persist(
    (set, get) => ({
      // -----------------------------------------------------------------------
      // State
      // -----------------------------------------------------------------------
      items: [],

      // -----------------------------------------------------------------------
      // Actions
      // -----------------------------------------------------------------------

      addItem(item) {
        const estimatedPrice = computeEstimatedPrice(
          item.product,
          item.width,
          item.height,
          item.unit
        );

        const newItem: CartItem = { ...item, estimatedPrice };

        set((state) => ({
          items: [...state.items, newItem],
        }));
      },

      removeItem(id) {
        set((state) => ({
          items: state.items.filter((item) => item.id !== id),
        }));
      },

      updateItem(id, updates) {
        set((state) => ({
          items: state.items.map((item) => {
            if (item.id !== id) return item;

            // Merge the incoming updates onto the existing item first so we
            // have all the values needed to recompute the price.
            const merged: CartItem = { ...item, ...updates };

            // Recompute estimatedPrice whenever any dimension or the product
            // itself might have changed.
            const priceAffectingKeysChanged =
              "product" in updates ||
              "width" in updates ||
              "height" in updates ||
              "unit" in updates;

            if (priceAffectingKeysChanged) {
              merged.estimatedPrice = computeEstimatedPrice(
                merged.product,
                merged.width,
                merged.height,
                merged.unit
              );
            }

            return merged;
          }),
        }));
      },

      updateQuantity(id, quantity) {
        // Clamp to a minimum of 1 — a quantity of 0 should use removeItem.
        const safeQuantity = Math.max(1, Math.floor(quantity));
        get().updateItem(id, { quantity: safeQuantity });
      },

      clearCart() {
        set({ items: [] });
      },

      // -----------------------------------------------------------------------
      // Derived selectors
      // -----------------------------------------------------------------------

      getItemCount() {
        return get().items.reduce((sum, item) => sum + item.quantity, 0);
      },

      getEstimatedTotal() {
        const { items } = get();

        if (items.length === 0) return null;

        let total = 0;
        let hasPriceable = false;

        for (const item of items) {
          if (item.estimatedPrice !== undefined) {
            total += item.estimatedPrice * item.quantity;
            hasPriceable = true;
          }
        }

        // Return null only when there is nothing priceable at all.
        return hasPriceable ? Math.round(total * 100) / 100 : null;
      },

      hasCustomProducts() {
        return get().items.some((item) =>
          isCustomItem(item.product, item.estimatedPrice)
        );
      },

      hasStandardProducts() {
        return get().items.some(
          (item) => !isCustomItem(item.product, item.estimatedPrice)
        );
      },

      cartWorkflow(): CartWorkflow {
        const { items } = get();

        if (items.length === 0) return "empty";

        const hasCustom = get().hasCustomProducts();
        const hasStandard = get().hasStandardProducts();

        if (hasCustom && hasStandard) return "mixed";
        if (hasCustom) return "custom";
        return "standard";
      },
    }),

    // -------------------------------------------------------------------------
    // Persist configuration
    // -------------------------------------------------------------------------
    {
      name: "wonder-wallz-project-cart",
      storage: createJSONStorage(() => localStorage),

      /**
       * Only persist `items` — actions are functions and cannot (and should
       * not) be serialised. Zustand re-attaches actions on every hydration.
       */
      partialize: (state) => ({ items: state.items }),

      /**
       * Version the storage key so a future breaking schema change can
       * increment this number and trigger a clean slate (via `migrate`) rather
       * than crashing on malformed persisted data.
       */
      version: 1,

      /**
       * Skeleton migration handler — extend this when the CartItem schema
       * changes in a breaking way between versions.
       *
       * @example
       * migrate(persistedState, fromVersion) {
       *   if (fromVersion === 0) {
       *     // transform v0 shape → v1 shape
       *   }
       *   return persistedState;
       * }
       */
      migrate(persistedState, _fromVersion) {
        // No migrations needed yet — return as-is.
        return persistedState as CartStore;
      },
    }
  )
);

// ---------------------------------------------------------------------------
// Convenience selector hooks
// Thin wrappers over `useProjectCart` that prevent unnecessary re-renders
// by selecting only the slice each consumer needs.
// ---------------------------------------------------------------------------

/** Selector: current items array. */
export const selectItems = (s: CartStore): CartItem[] => s.items;

/** Selector: total piece count. */
export const selectItemCount = (s: CartStore): number => s.getItemCount();

/** Selector: estimated grand total (or null). */
export const selectEstimatedTotal = (s: CartStore): number | null =>
  s.getEstimatedTotal();

/** Selector: current cart workflow classification. */
export const selectCartWorkflow = (s: CartStore): CartWorkflow =>
  s.cartWorkflow();
