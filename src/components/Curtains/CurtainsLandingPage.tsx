"use client";

/**
 * src/components/Product/CurtainsLandingPage.tsx
 *
 * Thin wrapper around ProductLandingPage for the Curtains consultation
 * product. All content lives in curtainsConfig — this file only wires the
 * config and collection into the shared layout.
 */

import type { Collection } from "@/lib/collections";
import { ProductLandingPage } from "@/components/Product/ProductLandingPage";
import { curtainsConfig } from "@/lib/productLandingConfigs/curtains";

export function CurtainsLandingPage({ collection }: { collection: Collection }) {
  return <ProductLandingPage collection={collection} {...curtainsConfig} />;
}
