/**
 * src/components/Canvas/CanvasLandingPage.tsx
 *
 * Thin wrapper, following the exact same pattern as
 * src/components/Flooring/FlooringLandingPage.tsx: all layout lives in a
 * reusable component, all copy lives in a config file.
 *
 * Canvas Prints is a CUSTOM product, not a consultation product, so this
 * wraps CustomProductLandingPage (Hero → Why Canvas → Frame Options →
 * Perfect For → How It Works → Materials & Quality → FAQ → Final CTA) —
 * NOT ProductLandingPage, which is the consultation-journey component used
 * by Flooring/Blinds/Curtains/Upholstery and includes a catalogue-at-home
 * step that doesn't apply here.
 *
 * "Start Custom Project" (hero + final CTA) navigates straight to the
 * existing Project Builder at /custom-design#start-project (with
 * ?product=canvas), via CustomProductLandingPage's default
 * onStartCustomProject handler — it does not open WhatsApp or a modal, and
 * does not create a new builder.
 *
 * To power Wallpapers / Glass Films (also custom-workflow products per
 * app/collections/[category]/page.tsx), follow the same pattern: a config
 * file under productLandingConfigs/ + a one-line wrapper like this one.
 */

import type { Collection } from "@/lib/collections";
import { CustomProductLandingPage } from "@/components/Product/CustomProductLandingPage";
import { canvasLandingConfig } from "@/lib/productLandingConfigs/canvas";

interface CanvasLandingPageProps {
  collection: Collection;
}

export function CanvasLandingPage({ collection }: CanvasLandingPageProps) {
  return (
    <CustomProductLandingPage
      collection={collection}
      modalCategory="canvas"
      // "Start Custom Project" navigates to the existing Project Builder at
      // /custom-design#start-project (with ?product=canvas) via
      // CustomProductLandingPage's default onStartCustomProject — no
      // override needed here.
      {...canvasLandingConfig}
    />
  );
}
