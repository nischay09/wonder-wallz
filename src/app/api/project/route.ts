/**
 * src/app/api/project/route.ts
 *
 * Server-side entry point for project enquiries. Receives a multipart
 * FormData request from emailService.ts — a `payload` field containing the
 * structured JSON (customer + requests), plus repeated `images` file
 * entries paired with `imageRequestIndex` entries — uploads each image to
 * Cloudinary, then sends the enquiry email via Resend.
 *
 * This route is the ONLY place that knows both Cloudinary and Resend exist —
 * each is otherwise fully isolated in its own module. All upload/parsing
 * logic lives here; emailService.ts only assembles the FormData.
 */

import { NextRequest, NextResponse } from "next/server";
import { uploadManyToCloudinary } from "@/lib/server/cloudinaryUpload";
import { sendProjectEnquiryEmail, type ResendRequestLine } from "@/lib/server/resendEmailTemplate";

interface IncomingRequestLine {
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

interface IncomingPayload {
  customer: {
    name: string;
    phone: string;
    email: string;
    city?: string;
  };
  requests: IncomingRequestLine[];
}

export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData();

    const payloadRaw = formData.get("payload");
    if (typeof payloadRaw !== "string") {
      return NextResponse.json(
        { success: false, error: "Missing enquiry payload." },
        { status: 400 }
      );
    }

    const payload: IncomingPayload = JSON.parse(payloadRaw);

    if (!payload.customer || !payload.requests || payload.requests.length === 0) {
      return NextResponse.json(
        { success: false, error: "Invalid enquiry payload." },
        { status: 400 }
      );
    }

    // Images and their originating request index are sent as parallel,
    // order-matched FormData entries.
    const imageFiles = formData
      .getAll("images")
      .filter((entry): entry is File => entry instanceof File);
    const imageRequestIndexes = formData
      .getAll("imageRequestIndex")
      .map((v) => parseInt(String(v), 10));

    const uploadResults =
      imageFiles.length > 0 ? await uploadManyToCloudinary(imageFiles) : [];

    const imageUrlsByRequest: string[][] = payload.requests.map(() => []);
    uploadResults.forEach((result, i) => {
      const requestIndex = imageRequestIndexes[i];
      if (imageUrlsByRequest[requestIndex]) {
        imageUrlsByRequest[requestIndex].push(result.secureUrl);
      }
    });

    const requestLines: ResendRequestLine[] = payload.requests.map((r, i) => ({
      ...r,
      imageUrls: imageUrlsByRequest[i] ?? [],
    }));

    const result = await sendProjectEnquiryEmail(payload.customer, requestLines);

    if (!result.success) {
      return NextResponse.json(
        { success: false, error: result.error ?? "Failed to send enquiry." },
        { status: 502 }
      );
    }

    return NextResponse.json({ success: true });
  } catch (err) {
    return NextResponse.json(
      {
        success: false,
        error: err instanceof Error ? err.message : "Unexpected server error.",
      },
      { status: 500 }
    );
  }
}
