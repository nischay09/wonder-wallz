/**
 * src/app/api/order/route.ts
 *
 * Server-side entry point for CART orders. Structurally mirrors
 * src/app/api/order/route.ts, but:
 *   - receives plain JSON (not multipart — cart items have no new
 *     File uploads to send to Cloudinary)
 *   - calls sendOrderEmail (orderEmailTemplate.ts), never
 *     sendProjectEnquiryEmail
 *
 * Completely isolated from /api/order — that route and its file are
 * untouched.
 */

import { NextRequest, NextResponse } from "next/server";
import { sendOrderEmail, type OrderLineItem } from "@/lib/server/orderEmailTemplate";

interface IncomingCustomer {
  name: string;
  phone: string;
  email: string;
  city?: string;
}

interface IncomingOrderPayload {
  customer: IncomingCustomer;
  items: OrderLineItem[];
  totalItems: number;
  estimatedGrandTotal: string;
}

export async function POST(req: NextRequest) {
  try {
    const payload: IncomingOrderPayload = await req.json();

    if (!payload.customer || !payload.items || payload.items.length === 0) {
      return NextResponse.json(
        { success: false, error: "Invalid order payload." },
        { status: 400 }
      );
    }

    const result = await sendOrderEmail(
      payload.customer,
      payload.items,
      payload.totalItems,
      payload.estimatedGrandTotal
    );

    if (!result.success) {
      return NextResponse.json(
        { success: false, error: result.error ?? "Failed to send order." },
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
