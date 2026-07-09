/**
 * src/lib/server/orderEmailTemplate.ts
 *
 * Cart-side sibling of resendEmailTemplate.ts. Reuses the same Resend
 * client construction and FROM_EMAIL env var. Only the "to" address can
 * optionally be overridden via ORDER_ENQUIRY_TO_EMAIL; if that's not set
 * it falls back to the existing PROJECT_ENQUIRY_TO_EMAIL so no new env
 * var is required to ship this.
 *
 * Nothing outside this file knows Resend's API shape for orders — only
 * /api/order calls this. Fully isolated from resendEmailTemplate.ts.
 */

import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

const FROM_EMAIL = process.env.RESEND_FROM_EMAIL!;
const TO_EMAIL =
  process.env.ORDER_ENQUIRY_TO_EMAIL ?? process.env.PROJECT_ENQUIRY_TO_EMAIL!;

export interface OrderCustomer {
  name: string;
  phone: string;
  email: string;
  city?: string;
}

export interface OrderLineItem {
  /** Customer-facing collection name, e.g. "Wonder Art Mural". */
  collection: string;
  /** Customer-facing design identifier, e.g. "#37". Never an internal id. */
  design: string;
  product: string;
  material: string;
  width: string;
  height: string;
  unit: string;
  coverageArea: string;
  estimatedPrice: string;
  quantity: number;
}

function escapeHtml(value: string): string {
  return String(value)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");
}

function renderItemRow(item: OrderLineItem, index: number): string {
  return `
    <div style="border:1px solid #E5DEC9;border-radius:12px;padding:16px 20px;margin-bottom:16px;background:#FFFDF7;">
      <h3 style="margin:0 0 10px;font-size:15px;color:#2B2620;">Item ${index + 1}: ${escapeHtml(item.product)}</h3>
      <table style="width:100%;font-size:13px;color:#4A4436;border-collapse:collapse;">
        <tr><td style="padding:2px 0;width:170px;color:#8A7F6A;">Collection</td><td>${escapeHtml(item.collection)}</td></tr>
        <tr><td style="padding:2px 0;color:#8A7F6A;">Design</td><td>${escapeHtml(item.design)}</td></tr>
        <tr><td style="padding:2px 0;color:#8A7F6A;">Material</td><td>${escapeHtml(item.material)}</td></tr>
        <tr><td style="padding:2px 0;color:#8A7F6A;">Dimensions</td><td>${escapeHtml(item.width)} × ${escapeHtml(item.height)} ${escapeHtml(item.unit)}</td></tr>
        <tr><td style="padding:2px 0;color:#8A7F6A;">Area</td><td>${escapeHtml(item.coverageArea)}</td></tr>
        <tr><td style="padding:2px 0;color:#8A7F6A;">Estimated Price</td><td style="font-weight:600;color:#8A6D2E;">${escapeHtml(item.estimatedPrice)}</td></tr>
        <tr><td style="padding:2px 0;color:#8A7F6A;">Quantity</td><td>${item.quantity}</td></tr>
      </table>
    </div>
  `;
}

function renderOrderHtml(
  customer: OrderCustomer,
  items: OrderLineItem[],
  totalItems: number,
  estimatedGrandTotal: string
): string {
  return `
  <div style="font-family:Georgia,serif;background:#FAF6EE;padding:32px;">
    <div style="max-width:600px;margin:0 auto;">
      <h1 style="font-size:20px;color:#2B2620;margin-bottom:4px;">New Cart Order</h1>
      <p style="color:#8A6D2E;font-size:13px;font-weight:600;letter-spacing:0.04em;text-transform:uppercase;margin-top:0;">Wonder Wallz</p>

      <div style="background:#FFFDF7;border:1px solid #E5DEC9;border-radius:12px;padding:16px 20px;margin:20px 0;">
        <table style="width:100%;font-size:13px;color:#4A4436;">
          <tr><td style="padding:2px 0;width:100px;color:#8A7F6A;">Name</td><td>${escapeHtml(customer.name)}</td></tr>
          <tr><td style="padding:2px 0;color:#8A7F6A;">Phone</td><td>${escapeHtml(customer.phone)}</td></tr>
          <tr><td style="padding:2px 0;color:#8A7F6A;">Email</td><td>${escapeHtml(customer.email)}</td></tr>
          <tr><td style="padding:2px 0;color:#8A7F6A;">City</td><td>${escapeHtml(customer.city || "Not provided")}</td></tr>
        </table>
      </div>

      ${items.map(renderItemRow).join("")}

      <div style="background:#FFFDF7;border:1px solid #E5DEC9;border-radius:12px;padding:16px 20px;margin-top:20px;">
        <table style="width:100%;font-size:14px;color:#2B2620;">
          <tr><td style="padding:4px 0;color:#8A7F6A;">Total Items</td><td style="text-align:right;font-weight:600;">${totalItems}</td></tr>
          <tr><td style="padding:4px 0;color:#8A7F6A;">Estimated Grand Total</td><td style="text-align:right;font-weight:700;color:#8A6D2E;font-size:16px;">${escapeHtml(estimatedGrandTotal)}</td></tr>
        </table>
      </div>

      <p style="font-size:12px;color:#8A7F6A;margin-top:24px;">Sent automatically from the Wonder Wallz Project Cart. No payment has been collected — please follow up with the customer to confirm and process this order.</p>
    </div>
  </div>
  `;
}

export async function sendOrderEmail(
  customer: OrderCustomer,
  items: OrderLineItem[],
  totalItems: number,
  estimatedGrandTotal: string
): Promise<{ success: boolean; error?: string }> {
  try {
    const { error } = await resend.emails.send({
      from: FROM_EMAIL,
      to: TO_EMAIL,
      replyTo: customer.email,
      subject: "New Cart Order - Wonder Wallz",
      html: renderOrderHtml(customer, items, totalItems, estimatedGrandTotal),
    });

    if (error) {
      console.error("Resend order send failed:", error);
      return { success: false, error: error.message };
    }
    return { success: true };
  } catch (err) {
    console.error("Resend order exception:", err);
    return {
      success: false,
      error: err instanceof Error ? err.message : "Failed to send order email via Resend.",
    };
  }
}
