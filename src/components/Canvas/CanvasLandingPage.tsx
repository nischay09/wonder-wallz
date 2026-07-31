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
 * ?product=canvas-prints), via CustomProductLandingPage's default
 * onStartCustomProject handler — it does not open WhatsApp or a modal, and
 * does not create a new builder.
 *
 * To power Wallpapers / Glass Films (also custom-workflow products per
 * app/collections/[category]/page.tsx), follow the same pattern: a config
 * file under productLandingConfigs/ + a one-line wrapper like this one.
 *
 * ── Canvas Finish Samples ────────────────────────────────────────────────
 * Passed into CustomProductLandingPage via its `afterFrameOptions` slot, so
 * it renders as section 3.5 — directly after Frame Options, before Perfect
 * For — rather than tacked on after the whole page. The slot exists on
 * CustomProductLandingPage specifically so Canvas-only content doesn't get
 * hardcoded into that shared component (it's also used by Wallpapers and
 * Glass Films, which pass nothing and render unchanged).
 *
 * Each sample card now links straight into the Project Builder
 * (/custom-design#start-project) with that Canvas Finish preselected via a
 * `canvasFinish` query param, using the exact CanvasFinish string values
 * from lib/types.ts — NOT back to this same section. ProjectRequestCard's
 * "View Frame Samples →" link (in the builder) still points back here
 * (/collections/canvas-prints#canvas-finish-samples) for the reverse
 * direction — someone already in the builder wanting to preview finishes.
 *
 * Reuses the existing Aceternity-style FocusCards component as-is — no new
 * card component, no duplicated hover/animation logic. See
 * src/components/ui/focus-cards.tsx for the shared implementation.
 */

import type { Collection } from "@/lib/collections";
import { CustomProductLandingPage } from "@/components/Product/CustomProductLandingPage";
import { canvasLandingConfig } from "@/lib/productLandingConfigs/canvas";
// ASSUMPTION: FocusCards.tsx has no path comment identifying its real
// location, unlike every other component in this codebase. Guessed here as
// "@/components/Focus/FocusCards" to match the existing domain-folder
// convention (Canvas/, Product/, Modals/, Collection/) — update this import
// if it actually lives elsewhere.
import FocusCards from "@/components/CompletedProjects/FocusCards";
import type { Project } from "@/lib/projects";
import type { CanvasFinish } from "@/lib/types";

interface CanvasLandingPageProps {
  collection: Collection;
}

// Each sample links straight into the Project Builder (same entry point as
// "Start Custom Project") with the matching Canvas Finish preselected via a
// `canvasFinish` query param. Values are the exact CanvasFinish string
// literals from lib/types.ts — confirmed, not guessed:
//   'Print Only (No Frame)' | 'Frameless Canvas' |
//   'Canvas with Frame (No Glass)' | 'Canvas with Frame & Glass'
//
// NOTE: this still requires the Project Builder to actually read
// `canvasFinish` from the query string and seed the first request with it —
// that wiring lives in ProjectBuilder.tsx (not yet shared), so until that's
// updated this param will be preselected in the URL but not yet reflected
// in the builder UI on load.
function buildProjectBuilderHref(canvasFinish: CanvasFinish) {
  return `/custom-design?product=canvas-prints&canvasFinish=${encodeURIComponent(
    canvasFinish
  )}#start-project`;
}

// Canvas Finish Samples — all four finish options shown via the existing
// FocusCards grid, including "Print Only (No Frame)" so customers can
// preview every finish choice available in the Project Builder.
//
// FocusCards' `Project` type has no description field, and every card is a
// clickable Link with a fixed "Explore" CTA — that's the real, unmodified
// component (see FocusCards.tsx), so it isn't being changed to fit this
// content. `projectLabel` (small eyebrow) is used for a short category tag,
// `productCategory` (bold title) for the finish name. The required short
// descriptions are rendered as captions in a matching grid directly below
// the cards instead — see the caption grid further down.
//
// Image paths are placeholders; swap `image` for the real finish sample
// assets when available.
// `Project` (from @/lib/projects) requires `roomType`, `collection`, and
// `size` in addition to the fields already used below. Values here follow
// the same convention as the existing Canvas entry in lib/projects.ts
// (roomType: "Living Room", collection: "Canvas Prints"). `size` alternates
// "tall"/"regular" to match FocusCards' masonry rhythm rather than using
// "regular" for all four, which would render as a flat, uniform row.
const CANVAS_FINISH_SAMPLES: (Project & { description: string })[] = [
  {
    id: "canvas-finish-print-only",
    image: "/canvas/noframecanvas.webp",
    alt: "Unframed canvas print sample, print only with no frame",
    href: buildProjectBuilderHref("Print Only (No Frame)"),
    projectLabel: "Canvas Finish",
    productCategory: "Print Only (No Frame)",
    roomType: "Living Room",
    collection: "Canvas Prints",
    size: "tall",
    description:
      "Premium canvas print supplied without framing, ready for your preferred display.",
  },
  {
    id: "canvas-finish-frameless",
    image: "/canvas/framelesscanvas.webp",
    alt: "Frameless canvas print sample with clean gallery-wrapped edges",
    href: buildProjectBuilderHref("Frameless Canvas"),
    projectLabel: "Canvas Finish",
    productCategory: "Frameless Canvas",
    roomType: "Living Room",
    collection: "Canvas Prints",
    size: "regular",
    description:
      "Gallery-wrapped canvas with clean edges for a modern, minimalist finish.",
  },
  {
    id: "canvas-finish-framed-no-glass",
    image: "/canvas/framecanvas.webp",
    alt: "Framed canvas print sample without glass",
    href: buildProjectBuilderHref("Canvas with Frame (No Glass)"),
    projectLabel: "Canvas Finish",
    productCategory: "Canvas with Frame (No Glass)",
    roomType: "Living Room",
    collection: "Canvas Prints",
    size: "regular",
    description:
      "Premium framed canvas without glass for a contemporary gallery-style appearance.",
  },
  {
    id: "canvas-finish-framed-with-glass",
    image: "/canvas/glasscanvas.webp",
    alt: "Framed canvas print sample with protective glass",
    href: buildProjectBuilderHref("Canvas with Frame & Glass"),
    projectLabel: "Canvas Finish",
    productCategory: "Canvas with Frame & Glass",
    roomType: "Living Room",
    collection: "Canvas Prints",
    size: "tall",
    description:
      "Premium framed canvas protected with glass for a timeless and elegant presentation.",
  },
];

// ── Canvas Finish Samples section ──────────────────────────────────────────
// Matches the eyebrow / heading pattern used throughout
// CustomProductLandingPage's own sections (uppercase amber eyebrow + serif
// heading), so it reads as a continuation of that page, not a bolted-on
// block. No pricing shown — samples only. Rendered via the
// `afterFrameOptions` slot, so it sits right after Frame Options.
function CanvasFinishSamplesSection() {
  return (
    <section
      id="canvas-finish-samples"
      aria-labelledby="canvas-finish-samples-heading"
      className="bg-white py-16 md:py-20 scroll-mt-24"
    >
      <div className="container-site">
        <div className="mx-auto max-w-2xl text-center">
          <span
            className="text-xs font-semibold uppercase tracking-[0.3em]"
            style={{ color: "#D48C43" }}
          >
            Finish Samples
          </span>
          <h2
            id="canvas-finish-samples-heading"
            className="mt-3 font-serif text-2xl font-medium text-neutral-900 sm:text-3xl"
          >
            Canvas Finish Samples
          </h2>
          <p className="mt-3 text-[15px] text-neutral-600">
            See how each frame option looks before you choose.
          </p>
        </div>

        <div className="mt-10">
          <FocusCards projects={CANVAS_FINISH_SAMPLES} />
        </div>

        {/* Descriptions — FocusCards' own card face has no description
            slot (see comment above), so these render as captions beneath
            the grid, aligned to the same columns as the cards above.
            Now 4 cards total (grid already uses lg:grid-cols-4, which
            matches FocusCards' own column count for 4 items). */}
        <div className="mt-6 grid grid-cols-2 gap-3 sm:grid-cols-2 sm:gap-4 lg:grid-cols-4">
          {CANVAS_FINISH_SAMPLES.map((sample) => (
            <p
              key={sample.id}
              className="text-center text-sm leading-relaxed text-neutral-600"
            >
              {sample.description}
            </p>
          ))}
        </div>
      </div>
    </section>
  );
}

export function CanvasLandingPage({ collection }: CanvasLandingPageProps) {
  return (
    <CustomProductLandingPage
      collection={collection}
      modalCategory="canvas-prints"
      // "Start Custom Project" navigates to the existing Project Builder at
      // /custom-design#start-project (with ?product=canvas-prints) via
      // CustomProductLandingPage's default onStartCustomProject — no
      // override needed here.
      {...canvasLandingConfig}
      afterFrameOptions={<CanvasFinishSamplesSection />}
    />
  );
}
