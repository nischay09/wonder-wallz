/**
 * src/lib/emailService.ts
 *
 * Reusable email-sending service for the Project Builder (and anything else
 * that needs to send a structured enquiry email).
 *
 * Provider: EmailJS (client-side), but nothing outside this file knows that.
 * To migrate to another provider (e.g. a backend API route + Resend/SendGrid),
 * only `sendEmail()` needs to change — every caller uses `sendProjectEnquiry()`
 * and the shared payload/result types below.
 *
 * Requires the `@emailjs/browser` package:
 *   npm install @emailjs/browser
 *
 * Credentials are read from environment variables — never hardcode them.
 * Add to `.env.local`:
 *   NEXT_PUBLIC_EMAILJS_SERVICE_ID=...
 *   NEXT_PUBLIC_EMAILJS_TEMPLATE_ID=...
 *   NEXT_PUBLIC_EMAILJS_PUBLIC_KEY=...
 *   NEXT_PUBLIC_EMAILJS_TO_EMAIL=your-personal@gmail.com
 *
 * Changing where enquiries land later is just a matter of updating
 * NEXT_PUBLIC_EMAILJS_TO_EMAIL (and/or the EmailJS template's "To" field) —
 * no UI or component code needs to change.
 */

import emailjs from '@emailjs/browser';

// ─── Public contract (provider-agnostic) ──────────────────────────────────────

export const ENQUIRY_EMAIL_SUBJECT = 'New Custom Design Enquiry - Wonder Wallz';

/** Fallback WhatsApp number for the Custom Design line. */
export const WHATSAPP_NUMBER = '919883100377'; // 9883100377 with India country code

export function getWhatsAppFallbackUrl(message?: string): string {
  const text = message ?? 'Hi, I tried to submit a custom design enquiry on your website but ran into an issue. Could you help?';
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(text)}`;
}

export interface CustomerEmailData {
  name: string;
  phone: string;
  email: string;
  city?: string;
}

/** One line-item, already formatted into display-ready strings. */
export interface ProjectRequestEmailData {
  product: string;
  material: string;
  width: string;
  height: string;
  unit: string;
  coverageArea: string;
  estimatedTotal: string;
  estimatedProductionTime: string;
  notes: string;
}

/**
 * Placeholder shape for a future real attachment (base64-encoded file).
 * Not yet wired up to EmailJS — see note in `sendEmail` below.
 */
export interface EmailAttachment {
  filename: string;
  contentType: string;
  /** Base64-encoded file content (no data: prefix). */
  base64Content: string;
}

/** Lightweight metadata about images attached to a request — safe to send today. */
export interface ImageAttachmentSummary {
  fileName: string;
  fileSizeKb: number;
}

export interface ProjectEnquiryPayload {
  customer: CustomerEmailData;
  requests: ProjectRequestEmailData[];
  /** Per-request image metadata (names/sizes only, for now — see note below). */
  imagesSummary?: ImageAttachmentSummary[][];
  /**
   * Real file attachments. Currently unused by `sendEmail` — EmailJS's free
   * tier does not accept arbitrary base64 attachments via `send()`. Once the
   * EmailJS template/plan supports attachments (or a provider migration
   * happens), populate this and wire it into `sendEmail` without touching
   * any UI component.
   */
  attachments?: EmailAttachment[];
}

export interface EmailSendResult {
  success: boolean;
  error?: string;
}

// ─── Internal: format the payload into EmailJS template variables ────────────

function formatRequestsBlock(requests: ProjectRequestEmailData[]): string {
  return requests
    .map((r, i) => {
      const lines = [
        `Request ${i + 1}:`,
        `  Product: ${r.product}`,
        `  Material: ${r.material}`,
        `  Width: ${r.width || '—'} ${r.unit}`,
        `  Height: ${r.height || '—'} ${r.unit}`,
        `  Coverage Area: ${r.coverageArea}`,
        `  Estimated Total: ${r.estimatedTotal}`,
        `  Estimated Production Time: ${r.estimatedProductionTime}`,
        `  Notes: ${r.notes || '—'}`,
      ];
      return lines.join('\n');
    })
    .join('\n\n');
}

function formatImagesBlock(imagesSummary?: ImageAttachmentSummary[][]): string {
  if (!imagesSummary || imagesSummary.length === 0) return 'No images attached.';
  return imagesSummary
    .map((images, i) => {
      if (images.length === 0) return `Request ${i + 1}: no images.`;
      const names = images.map((img) => `${img.fileName} (${img.fileSizeKb} KB)`).join(', ');
      return `Request ${i + 1}: ${names}`;
    })
    .join('\n');
}

// ─── Provider implementation ───────────────────────────────────────────────────

const SERVICE_ID = process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID;
const TEMPLATE_ID = process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID;
const PUBLIC_KEY = process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY;
const TO_EMAIL = process.env.NEXT_PUBLIC_EMAILJS_TO_EMAIL;

/**
 * Sends the enquiry using EmailJS. Swap the body of this function to change
 * providers — the rest of the app only calls `sendProjectEnquiry`.
 */
async function sendEmail(payload: ProjectEnquiryPayload): Promise<EmailSendResult> {
  if (!SERVICE_ID || !TEMPLATE_ID || !PUBLIC_KEY) {
    return {
      success: false,
      error: 'Email service is not configured. Missing EmailJS environment variables.',
    };
  }

  try {
    // NOTE on attachments: EmailJS's standard `send()` call does not accept
    // arbitrary base64 file attachments on the free tier. We currently send
    // image *metadata* only (name + size) so the team knows images were
    // provided; the customer can share the actual files via WhatsApp/email
    // reply, or a later integration can wire `payload.attachments` in here
    // (e.g. via `emailjs.sendForm` with real <input type="file"> elements,
    // or a backend relay) without changing any UI component.
    await emailjs.send(
      SERVICE_ID,
      TEMPLATE_ID,
      {
        subject: ENQUIRY_EMAIL_SUBJECT,
        to_email: TO_EMAIL ?? '',
        customer_name: payload.customer.name,
        customer_phone: payload.customer.phone,
        customer_email: payload.customer.email,
        customer_city: payload.customer.city || 'Not provided',
        request_count: payload.requests.length,
        project_requests: formatRequestsBlock(payload.requests),
        project_images: formatImagesBlock(payload.imagesSummary),
      },
      { publicKey: PUBLIC_KEY }
    );

    return { success: true };
  } catch (err) {
    return {
      success: false,
      error: err instanceof Error ? err.message : 'Failed to send email.',
    };
  }
}

/** Public entry point used by the UI layer. */
export async function sendProjectEnquiry(payload: ProjectEnquiryPayload): Promise<EmailSendResult> {
  return sendEmail(payload);
}
