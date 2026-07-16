/**
 * src/components/Flooring/FlooringLandingPage.tsx
 *
 * Thin wrapper kept at its original path/name so app/collections/[category]/
 * page.tsx does not need to change its import. All actual layout now lives
 * in the reusable ProductLandingPage; all flooring copy lives in
 * src/lib/productLandingConfigs/flooring.tsx.
 *
 * To power Blinds / Curtains / Upholstery, follow the same pattern: a
 * config file under productLandingConfigs/ + a one-line wrapper like this
 * one (or render <ProductLandingPage /> directly from the route).
 */

import type { Collection } from "@/lib/collections";
import { ProductLandingPage } from "@/components/Product/ProductLandingPage";
import { flooringLandingConfig } from "@/lib/productLandingConfigs/flooring";

interface FlooringLandingPageProps {
  collection: Collection;
}

export function FlooringLandingPage({ collection }: FlooringLandingPageProps) {
  return <ProductLandingPage collection={collection} {...flooringLandingConfig} />;
}
