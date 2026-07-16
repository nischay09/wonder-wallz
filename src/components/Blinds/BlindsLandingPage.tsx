"use client";

/**
 * src/components/Product/BlindsLandingPage.tsx
 *
 * Thin wrapper around ProductLandingPage for the Blinds consultation
 * product. All content lives in blindsConfig — this file only wires the
 * config and collection into the shared layout.
 */

import type { Collection } from "@/lib/collections";
import { ProductLandingPage } from "@/components/Product/ProductLandingPage";
import { blindsConfig } from "@/lib/productLandingConfigs/blinds";

export function BlindsLandingPage({ collection }: { collection: Collection }) {
  return <ProductLandingPage collection={collection} {...blindsConfig} />;
}
