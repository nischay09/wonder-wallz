/**
 * src/app/api/project/route.ts
 *
 * Server-side entry point for the Custom PROJECT BUILDER enquiry.
 *
 * This is the route emailService.ts (client) posts multipart FormData to.
 * It was previously living at /api/order, but that path has since been
 * taken over by the ready-made CART order endpoint (JSON body, see
 * src/lib/server/orderEmailTemplate.ts). To avoid the collision — and to
 * avoid it recurring — the Project Builder route now lives at its own
 * path, /api/project, and emailService.ts has been updated to match.
 *
 * Pipeline (unchanged from the original):
 *   1. Parse the incoming FormData: a single JSON `payload` field
 *      (ProjectEnquiryPayload-shaped, minus real image data) plus zero or
 *      more `images` file entries, each paired with an `imageRequestIndex`
 *      entry identifying which request it belongs to.
 *   2. Upload all images to Cloudinary in parallel (cloudinaryUpload.ts),
 *      then regroup the resulting secure URLs back onto their request by
 *      index.
 *   3. Build one ResendRequestLine per request (payload fields + that
 *      request's imageUrls) and send the enquiry email via
 *      sendProjectEnquiryEmail (resendEmailTemplate.ts).
 *
 * Completely isolated from /api/order — that route and its file are
 * untouched by this change.
 */

import { NextRequest, NextResponse } from "next/server";
import { uploadManyToCloudinary } from "@/lib/server/cloudinaryUpload";
import {
  sendProjectEnquiryEmail,
  type ResendCustomer,
  type ResendRequestLine,
} from "@/lib/server/resendEmailTemplate";
import type {
  ProjectEnquiryPayload,
  ProjectRequestEmailData,
} from "@/lib/emailService";

export async function POST(req: NextRequest) {
  try {
    // ── Fail fast, and LOUDLY, if required env vars are missing ────────────
    // These are read (with a non-null "!") inside cloudinaryUpload.ts and
    // resendEmailTemplate.ts, but "!" is compile-time only — at runtime a
    // missing var is just `undefined`, which silently turns into requests
    // to Cloudinary/Resend that fail far from here with an unhelpful
    // error. Checking explicitly up front turns that into a clear message.
    const requiredEnvVars = [
      "NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME",
      "NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET",
      "RESEND_API_KEY",
      "RESEND_FROM_EMAIL",
      "PROJECT_ENQUIRY_TO_EMAIL",
    ] as const;
    const missingEnvVars = requiredEnvVars.filter((name) => !process.env[name]);
    if (missingEnvVars.length > 0) {
      console.error(
        `[/api/project] Missing required env var(s): ${missingEnvVars.join(", ")}`
      );
      return NextResponse.json(
        {
          success: false,
          error: `Server misconfiguration: missing ${missingEnvVars.join(", ")}.`,
        },
        { status: 500 }
      );
    }

    const formData = await req.formData();

    const rawPayload = formData.get("payload");
    if (typeof rawPayload !== "string") {
      return NextResponse.json(
        { success: false, error: "Missing enquiry payload." },
        { status: 400 }
      );
    }

    let payload: ProjectEnquiryPayload;
    try {
      payload = JSON.parse(rawPayload);
    } catch {
      return NextResponse.json(
        { success: false, error: "Malformed enquiry payload." },
        { status: 400 }
      );
    }

    if (!payload.customer || !payload.requests || payload.requests.length === 0) {
      return NextResponse.json(
        { success: false, error: "Invalid enquiry payload." },
        { status: 400 }
      );
    }

    // ── Pull every image File + its request index out of the FormData ──────
    // formData.getAll() preserves insertion order, and emailService.ts
    // appends "images" / "imageRequestIndex" in lockstep for each file, so
    // zipping the two arrays by position recovers the original pairing.
    const imageFiles = formData.getAll("images").filter(
      (v): v is File => v instanceof File
    );
    const imageRequestIndices = formData
      .getAll("imageRequestIndex")
      .map((v) => Number(v));

    // ── Upload all images in one batch, then regroup by request index ──────
    let uploaded: Awaited<ReturnType<typeof uploadManyToCloudinary>> = [];
    if (imageFiles.length > 0) {
      try {
        uploaded = await uploadManyToCloudinary(imageFiles);
      } catch (uploadErr) {
        console.error("[/api/project] Cloudinary upload failed:", uploadErr);
        return NextResponse.json(
          {
            success: false,
            error:
              uploadErr instanceof Error
                ? `Image upload failed: ${uploadErr.message}`
                : "Image upload failed.",
          },
          { status: 502 }
        );
      }
    }

    const imageUrlsByRequestIndex = new Map<number, string[]>();
    uploaded.forEach((result, i) => {
      const requestIndex = imageRequestIndices[i];
      if (requestIndex === undefined) return;
      const existing = imageUrlsByRequestIndex.get(requestIndex) ?? [];
      existing.push(result.secureUrl);
      imageUrlsByRequestIndex.set(requestIndex, existing);
    });

    // ── Build the Resend line items ─────────────────────────────────────────
    const customer: ResendCustomer = payload.customer;

    const requestLines: ResendRequestLine[] = payload.requests.map(
      (request: ProjectRequestEmailData, index: number) => ({
        product: request.product,
        material: request.material,
        canvasFinish: request.canvasFinish,
        width: request.width,
        height: request.height,
        unit: request.unit,
        coverageArea: request.coverageArea,
        estimatedTotal: request.estimatedTotal,
        estimatedProductionTime: request.estimatedProductionTime,
        notes: request.notes,
        imageUrls: imageUrlsByRequestIndex.get(index) ?? [],
      })
    );

    const result = await sendProjectEnquiryEmail(customer, requestLines);

    if (!result.success) {
      console.error("[/api/project] Resend send failed:", result.error);
      return NextResponse.json(
        { success: false, error: result.error ?? "Failed to send your enquiry." },
        { status: 502 }
      );
    }

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("[/api/project] Unexpected error:", err);
    return NextResponse.json(
      {
        success: false,
        error: err instanceof Error ? err.message : "Unexpected server error.",
      },
      { status: 500 }
    );
  }
}
