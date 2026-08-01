/**
 * src/components/Mattresses/MattressesLandingPage.tsx
 *
 * Thin per-product wrapper for the shared ProductLandingPage, following the
 * exact same pattern as BlindsLandingPage / CurtainsLandingPage /
 * UpholsteryLandingPage.
 *
 * This is what gets registered in the LANDING_PAGES map inside
 * app/collections/[category]/page.tsx — there is no standalone
 * app/mattresses-pillows/page.tsx route. Every collection, including this
 * one, is served by that single dynamic route; this component only exists
 * so the route can render a consultation landing page instead of the
 * CollectionExplorer catalogue browser for the "mattresses-pillows" slug,
 * same as it already does for flooring/blinds/curtains/upholstery.
 */

import type { Collection } from "@/lib/collections";
import { ProductLandingPage } from "@/components/Product/ProductLandingPage";
import { mattressesConfig } from "@/lib/productLandingConfigs/mattresses";

export function MattressesLandingPage({ collection }: { collection: Collection }) {
  return <ProductLandingPage collection={collection} {...mattressesConfig} />;
}
