/**
 * src/lib/orderEmailService.ts
 *
 * Cart-side sibling of emailService.ts. Reuses the same architecture
 * (fetch -> our own API route -> Resend) but targets a NEW, isolated
 * endpoint (/api/order) so the existing Project Builder pipeline
 * (/api/project) is never touched.
 *
 * Cart items don't carry raw File objects (unlike Project Builder
 * requests), so this is a plain JSON POST — no FormData/multipart needed.
 *
 * Env vars reused from the existing Resend setup (see
 * src/lib/server/resendEmailTemplate.ts):
 *   RESEND_API_KEY, RESEND_FROM_EMAIL
 * Optional new var (falls back to PROJECT_ENQUIRY_TO_EMAIL if unset):
 *   ORDER_ENQUIRY_TO_EMAIL
 */

import type { CartItem } from "@/store/projectCart";

// ─── Public contract ────────────────────────────────────────────────────────

export interface OrderCustomerData {
  name: string;
  phone: string;
  email: string;
  city?: string;
}

/** One cart line item, flattened into the fields the order email needs. */
export interface OrderLineItemData {
  /**
   * Customer-facing collection name, e.g. "Wonder Art Mural" or
   * "Wonder Collection". Falls back to the product title for
   * non-wallpaper products (Blinds, Curtains, etc.), which have no
   * per-design collection concept.
   */
  collection: string;
  /**
   * Customer-facing design identifier, e.g. "#37". Derived from the
   * numeric `designNumber` already stored on the cart item — never an
   * internal id or abbreviation like "WAM037". Falls back to the
   * product title for products with no per-design numbering.
   */
  design: string;
  product: string;
  material: string;
  width: number;      // was string
  height: number;     // was string
  unit: string;
  coverageArea: string;
  estimatedPrice: string;
  quantity: number;
}

function computeCoverageArea(item: CartItem): string {
  const { width, height } = item;
  if (!isFinite(width) || !isFinite(height)) return "—";
  const area = width * height;
  return `${area} sq ${item.unit}`;
}

export interface OrderPayload {
  customer: OrderCustomerData;
  items: OrderLineItemData[];
  totalItems: number;
  estimatedGrandTotal: string;
}

export interface OrderSendResult {
  success: boolean;
  error?: string;
}

// ─── Mapping: CartItem[] -> OrderPayload ────────────────────────────────────

function formatCurrency(value: number): string {
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: value % 1 === 0 ? 0 : 2,
  }).format(value);
}


export function buildOrderPayload(
  items: CartItem[],
  customer: OrderCustomerData
): OrderPayload {
  const orderItems: OrderLineItemData[] = items.map((item) => ({
    // Customer-facing collection name (e.g. "Wonder Art Mural"). This is
    // populated on the cart item at add-time from the design's
    // CollectionProduct.collectionLabel — never derived from an internal
    // product id or abbreviation.
    collection: item.collectionLabel ?? item.product.title,
    // Customer-facing design identifier (e.g. "#37"). The numeric
    // designNumber is the single source of truth — no separate code
    // string (e.g. "WAM037") is ever stored or displayed.
    design:
      item.designNumber !== undefined ? `#${item.designNumber}` : item.product.title,
    product: item.product.title,
    material: item.material ?? "—",
    width: item.width,
    height: item.height,
    unit: item.unit,
    coverageArea: computeCoverageArea(item),
    estimatedPrice:
      item.estimatedPrice !== undefined
        ? formatCurrency(item.estimatedPrice)
        : "On Request",
    quantity: item.quantity,
  }));

  const totalItems = items.reduce((sum, item) => sum + item.quantity, 0);

  const grandTotal = items.reduce((sum, item) => {
    if (item.estimatedPrice === undefined) return sum;
    return sum + item.estimatedPrice * item.quantity;
  }, 0);

  const hasUnpriceableItems = items.some((i) => i.estimatedPrice === undefined);

  return {
    customer,
    items: orderItems,
    totalItems,
    estimatedGrandTotal:
      grandTotal > 0
        ? `${formatCurrency(grandTotal)}${hasUnpriceableItems ? " (+ items on request)" : ""}`
        : "On Request",
  };
}

// ─── Provider call ──────────────────────────────────────────────────────────

async function postOrder(payload: OrderPayload): Promise<OrderSendResult> {
  try {
    const response = await fetch("/api/order", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });

    const data = await response.json();

    if (!response.ok || !data.success) {
      return {
        success: false,
        error: data.error ?? "Failed to place your order. Please try again.",
      };
    }

    return { success: true };
  } catch (err) {
    return {
      success: false,
      error: err instanceof Error ? err.message : "Failed to send order.",
    };
  }
}

/**
 * Public entry point used by the cart UI layer.
 */
export async function sendCartOrder(
  items: CartItem[],
  customer: OrderCustomerData
): Promise<OrderSendResult> {
  const payload = buildOrderPayload(items, customer);
  return postOrder(payload);
}
