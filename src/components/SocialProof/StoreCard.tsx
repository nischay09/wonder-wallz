"use client";

import { MapPin, Clock, ArrowUpRight } from "lucide-react";
import type { Store } from "@/lib/stores";

interface StoreCardProps {
  store: Store;
}

/**
 * Renders a single showroom. The "Get Directions" button is wired up with
 * a handler stub so Google Maps routing can be dropped in later without
 * touching markup — see handleGetDirections below.
 */
export default function StoreCard({ store }: StoreCardProps) {
  const { name, address, hours, mapsQuery } = store;

  const handleGetDirections = () => {
    // TODO: integrate Google Maps routing.
    // e.g. window.open(`https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(mapsQuery ?? address)}`, "_blank");
    console.info("Get Directions clicked for:", mapsQuery ?? address);
  };

  return (
    <div className="rounded-[24px] bg-[#FBF7EF] p-8 shadow-[0_8px_30px_rgba(0,0,0,0.06)]">
      <div className="flex items-start gap-3">
        <span className="mt-1 flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-[#F1E7CE]">
          <MapPin className="h-4 w-4 text-[#9C8B61]" strokeWidth={1.75} aria-hidden="true" />
        </span>
        <div>
          <h3 className="font-serif text-lg text-[#2B2521] sm:text-xl">{name}</h3>
          <p className="mt-1 text-sm leading-relaxed text-[#7A7264]">{address}</p>
        </div>
      </div>

      <div className="mt-5 flex items-center gap-2 border-t border-[#E7DFCF] pt-5 text-sm text-[#7A7264]">
        <Clock className="h-4 w-4 text-[#9C8B61]" strokeWidth={1.75} aria-hidden="true" />
        <span>{hours}</span>
      </div>

      <button
        type="button"
        onClick={handleGetDirections}
        aria-label={`Get directions to ${name}`}
        className="mt-6 inline-flex w-full items-center justify-center gap-2 rounded-full bg-[#2B2521] px-5 py-3 text-sm font-medium text-[#FBF7EF] transition-colors hover:bg-[#403828] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#C8A05A]"
      >
        Get Directions
        <ArrowUpRight className="h-4 w-4" strokeWidth={1.75} aria-hidden="true" />
      </button>
    </div>
  );
}
