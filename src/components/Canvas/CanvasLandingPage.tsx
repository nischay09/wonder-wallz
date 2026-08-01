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
const CANVAS_FINISH_SAMPLES: (Project & {
  description: string;
  // Shorter caption shown only on mobile (below sm breakpoint) so each
  // card + caption reads as a compact unit in the 2x2 mobile grid.
  // Tablet/desktop continue to use `description` in full, unchanged.
  mobileDescription: string;
})[] = [
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
    mobileDescription: "Unframed premium canvas.",
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
    mobileDescription: "Gallery-wrapped modern finish.",
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
    mobileDescription: "Premium frame without glass.",
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
    mobileDescription: "Premium frame with protective glass.",
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

        {/* ── Desktop only (lg and up): unchanged from before — the
            original four-column requirement. Single FocusCards grid of
            all 4 cards, with the full descriptions rendered as a separate
            caption grid underneath. Hidden below the lg breakpoint, where
            the paired card+caption layout below takes over for both
            tablet and mobile. */}
        <div className="hidden lg:block">
          <div className="mt-10">
            <FocusCards projects={CANVAS_FINISH_SAMPLES} />
          </div>

          {/* Descriptions — FocusCards' own card face has no description
              slot (see comment above), so these render as captions beneath
              the grid, aligned to the same columns as the cards above. */}
          <div className="mt-6 grid grid-cols-4 gap-4">
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

        {/* ── Mobile + tablet (below lg): 2-column grid where each card is
            paired with its own caption as a single unit. This replaces the
            split "one big image grid + separate caption grid below" layout
            that was causing captions to visually misalign with their
            cards on tablet (any text-wrap difference between the two
            separate grids threw off the alignment). Pairing them
            guarantees each caption always sits directly under its own
            card, at any width below lg.
            FocusCards now accepts an optional `gridClassName` prop
            (defaulting to its original grid-cols-2/lg:grid-cols-4 classes,
            so every OTHER usage of FocusCards across the site — Flooring,
            Blinds, Curtains, Upholstery, and the desktop grid above — is
            completely unaffected since they never pass this prop). Here we
            override it to a single column per card, with a height that
            steps up from mobile to tablet (h-[320px] → sm:h-[400px]) so
            tablet cards aren't squashed into the same fixed height that
            was previously shared with the 4-column desktop grid. hover
            animation, image sizing (object-cover), links, and deep-link
            params all still pass through unchanged. */}
        <div className="mt-10 grid grid-cols-2 gap-x-2 gap-y-8 sm:gap-x-4 lg:hidden">
          {CANVAS_FINISH_SAMPLES.map((sample) => (
            <div key={sample.id} className="flex w-full flex-col items-center">
              <div className="w-full">
                <FocusCards
                  projects={[sample]}
                  gridClassName="grid grid-cols-1 h-[320px] sm:h-[400px]"
                />
              </div>
              <p className="mt-3 text-center text-sm leading-relaxed text-neutral-600">
                {sample.mobileDescription}
              </p>
            </div>
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
