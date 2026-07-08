/**
 * src/lib/server/resendEmailTemplate.ts
 *
 * Fully isolated Resend integration. Builds a clean HTML email for Wonder
 * Wallz project enquiries and sends it. Nothing outside this file knows
 * Resend's API shape — only the /api/order route handler calls this.
 */

import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

const FROM_EMAIL = process.env.RESEND_FROM_EMAIL!;
const TO_EMAIL = process.env.PROJECT_ENQUIRY_TO_EMAIL!;

export interface ResendCustomer {
  name: string;
  phone: string;
  email: string;
  city?: string;
}

export interface ResendRequestLine {
  product: string;
  material: string;
  width: string;
  height: string;
  unit: string;
  coverageArea: string;
  estimatedTotal: string;
  estimatedProductionTime: string;
  notes: string;
  imageUrls: string[];
}

function escapeHtml(value: string): string {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");
}

function renderRequestBlock(req: ResendRequestLine, index: number): string {
  const imagesHtml =
    req.imageUrls.length > 0
      ? `<div style="margin-top:12px;display:flex;flex-wrap:wrap;gap:8px;">
          ${req.imageUrls
            .map(
              (url) =>
                `<a href="${url}" target="_blank"><img src="${url}" width="120" style="border-radius:8px;border:1px solid #E5DEC9;display:block;" /></a>`
            )
            .join("")}
        </div>`
      : `<p style="color:#8A7F6A;font-size:13px;margin-top:8px;">No images attached.</p>`;

  return `
    <div style="border:1px solid #E5DEC9;border-radius:12px;padding:16px 20px;margin-bottom:16px;background:#FFFDF7;">
      <h3 style="margin:0 0 10px;font-size:15px;color:#2B2620;">Request ${index + 1}: ${escapeHtml(
    req.product
  )}</h3>
      <table style="width:100%;font-size:13px;color:#4A4436;border-collapse:collapse;">
        <tr><td style="padding:2px 0;width:160px;color:#8A7F6A;">Material</td><td>${escapeHtml(req.material)}</td></tr>
        <tr><td style="padding:2px 0;color:#8A7F6A;">Dimensions</td><td>${escapeHtml(req.width)} × ${escapeHtml(req.height)} ${escapeHtml(req.unit)}</td></tr>
        <tr><td style="padding:2px 0;color:#8A7F6A;">Coverage Area</td><td>${escapeHtml(req.coverageArea)}</td></tr>
        <tr><td style="padding:2px 0;color:#8A7F6A;">Estimated Total</td><td style="font-weight:600;color:#8A6D2E;">${escapeHtml(req.estimatedTotal)}</td></tr>
        <tr><td style="padding:2px 0;color:#8A7F6A;">Production Time</td><td>${escapeHtml(req.estimatedProductionTime)}</td></tr>
        <tr><td style="padding:2px 0;color:#8A7F6A;vertical-align:top;">Notes</td><td>${escapeHtml(req.notes || "—")}</td></tr>
      </table>
      ${imagesHtml}
    </div>
  `;
}

function renderEmailHtml(customer: ResendCustomer, requests: ResendRequestLine[]): string {
  return `
  <div style="font-family:Georgia,serif;background:#FAF6EE;padding:32px;">
    <div style="max-width:600px;margin:0 auto;">
      <h1 style="font-size:20px;color:#2B2620;margin-bottom:4px;">New Custom Design Enquiry</h1>
      <p style="color:#8A6D2E;font-size:13px;font-weight:600;letter-spacing:0.04em;text-transform:uppercase;margin-top:0;">Wonder Wallz</p>

      <div style="background:#FFFDF7;border:1px solid #E5DEC9;border-radius:12px;padding:16px 20px;margin:20px 0;">
        <table style="width:100%;font-size:13px;color:#4A4436;">
          <tr><td style="padding:2px 0;width:100px;color:#8A7F6A;">Name</td><td>${escapeHtml(customer.name)}</td></tr>
          <tr><td style="padding:2px 0;color:#8A7F6A;">Phone</td><td>${escapeHtml(customer.phone)}</td></tr>
          <tr><td style="padding:2px 0;color:#8A7F6A;">Email</td><td>${escapeHtml(customer.email)}</td></tr>
          <tr><td style="padding:2px 0;color:#8A7F6A;">City</td><td>${escapeHtml(customer.city || "Not provided")}</td></tr>
        </table>
      </div>

      ${requests.map(renderRequestBlock).join("")}

      <p style="font-size:12px;color:#8A7F6A;margin-top:24px;">Sent automatically from the Wonder Wallz Project Builder.</p>
    </div>
  </div>
  `;
}

export async function sendProjectEnquiryEmail(
  customer: ResendCustomer,
  requests: ResendRequestLine[]
): Promise<{ success: boolean; error?: string }> {
  try {
    const { error } = await resend.emails.send({
      from: FROM_EMAIL,
      to: TO_EMAIL,
      replyTo: customer.email,
      subject: "New Custom Design Enquiry - Wonder Wallz",
      html: renderEmailHtml(customer, requests),
    });

    if (error) {
      console.error("Resend send failed:", error);
      return {
        success: false,
        error: error.message,
      };
    }
    return { success: true };
  } catch (err) {
    console.error("Resend exception:", err);
    return {
      success: false,
      error: err instanceof Error ? err.message : "Failed to send email via Resend.",
    };
  }
}
