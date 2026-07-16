"use client";

/**
 * src/components/Product/UpholsteryLandingPage.tsx
 *
 * Thin wrapper around ProductLandingPage for the Upholstery consultation
 * product. All content lives in upholsteryConfig — this file only wires the
 * config and collection into the shared layout.
 */

import type { Collection } from "@/lib/collections";
import { ProductLandingPage } from "@/components/Product/ProductLandingPage";
import { upholsteryConfig } from "@/lib/productLandingConfigs/upholstery";

export function UpholsteryLandingPage({ collection }: { collection: Collection }) {
  return <ProductLandingPage collection={collection} {...upholsteryConfig} />;
}
