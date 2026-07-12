"use client";

import { useState } from "react";
import type { Collection, CustomerAction } from "@/lib/collections";
import {
  HomeCatalogueVisitModal,
  type CatalogueCategory,
} from "@/components/Modals/HomeCatalogueVisitModal";
import { ShowroomVisitModal } from "@/components/Modals/ShowroomVisitModal";

interface CustomerActionsProps {
  customerActions: CustomerAction[];
  collection: Collection;
}

/**
 * Renders the customer-facing CTA buttons for a collection, driven entirely
 * by `collection.customerActions` (see collections.ts). No collection name
 * or slug is ever hardcoded here — every collection, present or future,
 * gets whichever buttons its metadata lists, in that order.
 */
const VALID_CATALOGUE_CATEGORIES: CatalogueCategory[] = [
  "wallpapers",
  "flooring",
  "blinds",
  "curtains",
  "upholstery",
  "glass-films",
  "canvas-prints",
];

/**
 * Best-effort mapping from a collection to a HomeCatalogueVisitModal
 * category, used only to pre-select a checkbox. If the collection's
 * `category` doesn't line up with a known catalogue category, the modal
 * simply opens with nothing pre-selected — never throws, never blocks.
 */
function toCatalogueCategory(collection: Collection): CatalogueCategory | undefined {
  const candidate = (collection as { category?: string }).category;
  return VALID_CATALOGUE_CATEGORIES.includes(candidate as CatalogueCategory)
    ? (candidate as CatalogueCategory)
    : undefined;
}

export function CustomerActions({ customerActions, collection }: CustomerActionsProps) {
  const isCustom = collection.workflow === "custom";
  const [isHomeCatalogueOpen, setIsHomeCatalogueOpen] = useState(false);
  const [isShowroomVisitOpen, setIsShowroomVisitOpen] = useState(false);

  // ── Handlers ────────────────────────────────────────────────────────────
  // These reuse existing behavior where it already exists (WhatsApp enquiry
  // mirrors the message format used in QuickViewModal's buildWhatsAppMessage).
  // The rest are placeholders until their flows are built.

  const handleCustomProject = () => {
    // TODO: wire up to Project Builder entry point once it exists outside
    // of Quick View (e.g. open the first available product's Quick View,
    // or route to a dedicated /project-builder flow).
    console.log(`[CustomerActions] Start Custom Project — ${collection.title}`);
  };

  const handleWhatsApp = () => {
    const msg = `Hi Wonder Wallz, I'm interested in your ${collection.title} collection. Please share more details.`;
    window.open(`https://wa.me/9883100377?text=${encodeURIComponent(msg)}`, "_blank", "noopener,noreferrer");
  };

  const handleHomeCatalogue = () => {
    setIsHomeCatalogueOpen(true);
  };

  const handleShowroomVisit = () => {
    setIsShowroomVisitOpen(true);
  };

  const actionConfig: Record<
    CustomerAction,
    { label: string; onClick: () => void }
  > = {
    "custom-project": { label: "Start Custom Project", onClick: handleCustomProject },
    whatsapp: { label: "Contact on WhatsApp", onClick: handleWhatsApp },
    "home-catalogue": { label: "Browse Catalogues at Home (₹500)", onClick: handleHomeCatalogue },
    "visit-store": { label: "Book a Showroom Visit", onClick: handleShowroomVisit },
  };

  if (!customerActions || customerActions.length === 0) return null;

  return (
    <>
      <section className="rounded-3xl border border-neutral-200 bg-gradient-to-br from-white to-neutral-50 px-6 py-10 sm:px-10 sm:py-12">
        <div className="max-w-2xl">
          <h2 className="text-2xl sm:text-3xl font-semibold text-neutral-900">
            Choose how you'd like to continue
          </h2>
          <p className="mt-2 text-[15px] text-neutral-600">
            Whichever way works best for you — start a project online, chat with
            us on WhatsApp, have our catalogues brought to your door, or visit
            us in person.
          </p>
        </div>

        <div
          className="mt-8 flex flex-wrap gap-3"
          role="group"
          aria-label={`${collection.title} customer actions`}
        >
          {customerActions.map((action, i) => {
            const config = actionConfig[action];
            if (!config) return null;

            // First action gets the "primary" treatment (matches the existing
            // dark/gradient CTA styling used elsewhere on the site); the rest
            // render as secondary outline buttons.
            const isPrimary = i === 0;

            return (
              <button
                key={action}
                type="button"
                onClick={config.onClick}
                className={
                  isPrimary
                    ? "inline-flex items-center justify-center px-6 py-3 rounded-2xl text-[15px] font-semibold text-white transition-opacity duration-200 hover:opacity-90"
                    : "inline-flex items-center justify-center px-6 py-3 rounded-2xl text-[15px] font-semibold border border-neutral-300 text-neutral-800 bg-white/70 backdrop-blur-sm transition-colors duration-200 hover:bg-white hover:border-neutral-400"
                }
                style={
                  isPrimary
                    ? {
                        background: isCustom
                          ? "linear-gradient(90deg, #3E2C22 0%, #D48C43 100%)"
                          : "#2C1F14",
                      }
                    : undefined
                }
              >
                {config.label}
              </button>
            );
          })}
        </div>
      </section>

      <HomeCatalogueVisitModal
        open={isHomeCatalogueOpen}
        onOpenChange={setIsHomeCatalogueOpen}
        defaultCategory={toCatalogueCategory(collection)}
      />

      <ShowroomVisitModal
        open={isShowroomVisitOpen}
        onOpenChange={setIsShowroomVisitOpen}
        defaultCategory={toCatalogueCategory(collection)}
      />
    </>
  );
}
