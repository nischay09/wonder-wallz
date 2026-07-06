/**
 * src/lib/emailService.ts
 *
 * Reusable email-sending service for the Project Builder (and anything else
 * that needs to send a structured enquiry email).
 *
 * Provider: a first-party API route (/api/project), which itself uses
 * Cloudinary (image hosting) + Resend (delivery) — but nothing outside this
 * file knows that. To migrate providers again later, only `sendEmail()`
 * needs to change; every caller uses `sendProjectEnquiry()` and the shared
 * payload/result types below.
 *
 * Env vars (`.env.local`):
 *   NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME=...
 *   NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET=...
 *   RESEND_API_KEY=...
 *   RESEND_FROM_EMAIL=...
 *   PROJECT_ENQUIRY_TO_EMAIL=...
 */

import type { ProjectRequest } from "./types";

// ─── Public contract (provider-agnostic) ──────────────────────────────────────

export const ENQUIRY_EMAIL_SUBJECT = "New Custom Design Enquiry - Wonder Wallz";

/** Fallback WhatsApp number for the Custom Design line. */
export const WHATSAPP_NUMBER = "919883100377"; // 9883100377 with India country code

export function getWhatsAppFallbackUrl(message?: string): string {
  const text =
    message ??
    "Hi, I tried to submit a custom design enquiry on your website but ran into an issue. Could you help?";
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

/** Lightweight metadata about images attached to a request. */
export interface ImageAttachmentSummary {
  fileName: string;
  fileSizeKb: number;
}

export interface ProjectEnquiryPayload {
  customer: CustomerEmailData;
  requests: ProjectRequestEmailData[];
  /** Per-request image metadata (names/sizes only) — kept for reference/logging. */
  imagesSummary?: ImageAttachmentSummary[][];
}

export interface EmailSendResult {
  success: boolean;
  error?: string;
}

// ─── Internal: payload + files → FormData (isolated to this service layer) ───

/**
 * Builds the multipart FormData sent to /api/project: the structured
 * payload as a single JSON string field, plus each request's raw image
 * `File`s appended in order, paired with an `imageRequestIndex` entry so
 * the API route can regroup uploaded URLs back onto the correct request.
 * This is the only place UI-layer `File` objects get touched before
 * leaving the browser.
 */
function buildFormData(
  payload: ProjectEnquiryPayload,
  requests: ProjectRequest[]
): FormData {
  const formData = new FormData();
  formData.append("payload", JSON.stringify(payload));

  requests.forEach((request, requestIndex) => {
    request.images.forEach((file) => {
      formData.append("images", file);
      formData.append("imageRequestIndex", String(requestIndex));
    });
  });

  return formData;
}

// ─── Provider implementation ───────────────────────────────────────────────────

/**
 * Sends the enquiry by POSTing multipart FormData to our own /api/project
 * route, which handles Cloudinary uploads + Resend delivery server-side.
 * Swap the body of this function to change providers again later — the
 * rest of the app only calls `sendProjectEnquiry`.
 */
async function sendEmail(formData: FormData): Promise<EmailSendResult> {
  try {
    const response = await fetch("/api/project", {
      method: "POST",
      body: formData,
    });

    const data = await response.json();

    if (!response.ok || !data.success) {
      return {
        success: false,
        error: data.error ?? "Failed to send your enquiry. Please try again.",
      };
    }

    return { success: true };
  } catch (err) {
    return {
      success: false,
      error: err instanceof Error ? err.message : "Failed to send email.",
    };
  }
}

/**
 * Public entry point used by the UI layer.
 *
 * `requests` is passed alongside the mapped `payload` solely so real image
 * files can be attached to the outgoing FormData here in the service
 * layer — `projectEnquiryMapper.ts` intentionally only produces lightweight
 * metadata (imagesSummary), never raw file objects.
 */
export async function sendProjectEnquiry(
  payload: ProjectEnquiryPayload,
  requests: ProjectRequest[]
): Promise<EmailSendResult> {
  const formData = buildFormData(payload, requests);
  return sendEmail(formData);
}
