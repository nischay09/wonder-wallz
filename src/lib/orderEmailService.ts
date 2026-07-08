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
  designId: string;
  collection: string;
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
    // ⚠ adjust field name if different on your CartItem["product"] type
    designId: item.product.id ?? "—",
    // ⚠ adjust field name if different on your CartItem["product"] type
    collection: (item.product as unknown as { collection?: string }).collection ?? "—",
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
