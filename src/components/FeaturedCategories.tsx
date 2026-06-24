"use client";

/**
 * FeaturedCollections
 * -------------------------------------------------------------------------
 * Homepage "Explore Our Collections" section.
 *
 * Replaces the previous icon-based "Find Your Perfect Wallpaper Style"
 * category grid with an editorial, catalog-style collection discovery
 * section built directly on the real Wonder Wallz catalog structure
 * (lib/collections.ts). This component is intentionally presentational —
 * it only links out to /collections/[slug]; filtering, search, and the
 * Add to Quote flow are handled on the destination pages.
 *
 * Design language: warm paper/cream palette, a serif display face for
 * collection names, and a small "sample-tag" device on each card (a nod to
 * physical wallpaper swatch books) as the section's signature detail.
 */

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  collections,
  getCollectionsByCategory,
  type Collection,
} from "@/lib/collections";
import { fraunces, inter } from "@/lib/fonts";

const wallpaperCollections = getCollectionsByCategory("wallpapers");
const otherCategories = getCollectionsByCategory("other-products");

/**
 * Desktop bento layout, expressed purely as column spans on a 12-col grid
 * plus a per-card image aspect ratio. Each row's spans sum to exactly 12 so
 * cards wrap cleanly with no gaps: Wonder+Religion (7+5), then three equal
 * standard cards (4+4+4), then 3D Wall Murals as a full-width banner (12) —
 * a deliberate "specialty feature" treatment for the smallest collection.
 * Using aspect-ratio (rather than fixed pixel row heights or flex grow) for
 * the image area means the layout stays correct at every breakpoint without
 * relying on container height being resolved elsewhere.
 */
const GRID_SPAN: Record<string, string> = {
  wonder: "lg:col-span-7",
  religion: "lg:col-span-5",
  "wall-murals": "lg:col-span-4",
  kids: "lg:col-span-4",
  art: "lg:col-span-4",
  "3d-wall-murals": "lg:col-span-12",
};

const IMAGE_ASPECT: Record<string, string> = {
  wonder: "aspect-[4/5]",
  religion: "aspect-[16/11]",
  "wall-murals": "aspect-[4/5]",
  kids: "aspect-[4/5]",
  art: "aspect-[4/5]",
  "3d-wall-murals": "aspect-[21/8]",
};

function ArrowIcon({ className = "" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 20 20"
      fill="none"
      className={className}
      aria-hidden="true"
    >
      <path
        d="M4 10h12M11 5l5 5-5 5"
        stroke="currentColor"
        strokeWidth="1.4"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function CollectionCard({
  collection,
  className = "",
  aspectClass = "aspect-[4/5]",
}: {
  collection: Collection;
  className?: string;
  aspectClass?: string;
}) {
  const [imageFailed, setImageFailed] = useState(false);
  const { name, description, designCount, coverImage, slug, comingSoon } =
    collection;

  const card = (
    <article
      className={[
        "group relative flex flex-col overflow-hidden rounded-[2px]",
        "bg-[#FBF8F1] ring-1 ring-[#E4DAC4] transition-shadow duration-300",
        comingSoon ? "" : "hover:shadow-[0_18px_40px_-12px_rgba(42,36,32,0.25)]",
        className,
      ].join(" ")}
    >
      {/* ---- Cover image area ---- */}
      <div className={`relative ${aspectClass} overflow-hidden bg-[#EFE7D6]`}>
        {!imageFailed ? (
          <Image
            src={coverImage}
            alt={`${name} cover photograph`}
            fill
            sizes="(min-width: 1024px) 40vw, (min-width: 640px) 50vw, 100vw"
            onError={() => setImageFailed(true)}
            className={[
              "object-cover transition-transform duration-700 ease-out",
              comingSoon
                ? "grayscale-[60%] opacity-70"
                : "group-hover:scale-[1.045]",
            ].join(" ")}
          />
        ) : (
          // Graceful fallback while real catalog photography is pending upload
          <div
            className="absolute inset-0"
            style={{
              background:
                "linear-gradient(140deg, #EFE7D6 0%, #E4D7BC 55%, #D9C9A6 100%)",
            }}
          />
        )}

        {/* Permanent low-opacity grounding overlay for legibility + mood,
            deepens slightly on hover instead of appearing from nothing */}
        <div
          className={[
            "pointer-events-none absolute inset-0 transition-opacity duration-500",
            comingSoon
              ? "bg-[#3A2E22]/35"
              : "bg-gradient-to-t from-[#241C14]/55 via-[#241C14]/0 to-transparent opacity-90 group-hover:opacity-100",
          ].join(" ")}
        />

        {/* Signature device: sample-tag, echoing a physical wallpaper
            swatch-book tab. Carries the design count for live collections,
            or a "Soon" mark for unreleased categories. */}
        <div
          className={[
            "absolute left-4 top-4 -rotate-2 select-none rounded-[2px] px-3 py-1.5",
            "bg-[#FBF8F1]/95 shadow-[0_4px_10px_rgba(0,0,0,0.18)]",
            "border border-dashed",
            comingSoon ? "border-[#B6A079]" : "border-[#B6924C]",
          ].join(" ")}
        >
          {comingSoon ? (
            <span className="font-[family-name:var(--font-body)] text-[10px] font-semibold uppercase tracking-[0.16em] text-[#7A6A4E]">
              Soon
            </span>
          ) : (
            <div className="flex flex-col items-center leading-none">
              <span className="font-[family-name:var(--font-display)] text-lg text-[#2A2420]">
                {designCount}
              </span>
              <span className="font-[family-name:var(--font-body)] text-[9px] font-semibold uppercase tracking-[0.14em] text-[#8A7A5E]">
                Designs
              </span>
            </div>
          )}
        </div>

        {comingSoon && (
          <div className="absolute bottom-4 left-4">
            <span className="font-[family-name:var(--font-body)] text-[10px] font-semibold uppercase tracking-[0.2em] text-[#F7F3EC]">
              Coming Soon
            </span>
          </div>
        )}
      </div>

      {/* ---- Caption block ---- */}
      <div className="flex flex-col gap-2 border-t border-[#E4DAC4] px-6 py-5">
        <h3 className="font-[family-name:var(--font-display)] text-[1.35rem] leading-snug text-[#2A2420]">
          {name}
        </h3>
        <p className="font-[family-name:var(--font-body)] text-[0.85rem] leading-relaxed text-[#7A6F5F]">
          {description}
        </p>

        {!comingSoon && (
          <span className="mt-2 inline-flex items-center gap-1.5 font-[family-name:var(--font-body)] text-[0.78rem] font-semibold uppercase tracking-[0.08em] text-[#A8512E] transition-colors">
            <span className="border-b border-transparent transition-colors duration-300 group-hover:border-[#A8512E]">
              View Collection
            </span>
            <ArrowIcon className="h-3.5 w-3.5 transition-transform duration-300 group-hover:translate-x-1" />
          </span>
        )}
      </div>
    </article>
  );

  if (comingSoon) {
    return (
      <div
        role="listitem"
        aria-label={`${name} — coming soon`}
        className={`cursor-default ${className}`}
      >
        {card}
      </div>
    );
  }

  return (
    <Link
      href={`/collections/${slug}`}
      role="listitem"
      aria-label={`View ${name}, ${designCount} designs`}
      className={`block ${className}`}
    >
      {card}
    </Link>
  );
}

export default function FeaturedCollections() {
  return (
    <section
      aria-labelledby="collections-heading"
      className={`${fraunces.variable} ${inter.variable} bg-[#F7F3EC] py-20 sm:py-24 lg:py-28`}
      itemScope
      itemType="https://schema.org/ItemList"
    >
      <meta itemProp="name" content="Wonder Wallz Collections" />

      <div className="mx-auto max-w-[1280px] px-6">
        {/* ---- Header ---- */}
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
          className="mx-auto max-w-2xl text-center"
        >
          <span className="font-[family-name:var(--font-body)] text-[11px] font-semibold uppercase tracking-[0.22em] text-[#A8512E]">
            The Wonder Wallz Catalog
          </span>

          <h2
            id="collections-heading"
            className="mt-4 font-[family-name:var(--font-display)] text-[clamp(2rem,4vw,2.75rem)] leading-[1.1] text-[#2A2420]"
          >
            Explore our collections
          </h2>

          <div className="mx-auto mt-5 h-px w-14 bg-[#B6924C]" />

          <p className="mx-auto mt-5 max-w-md font-[family-name:var(--font-body)] text-[0.95rem] leading-relaxed text-[#7A6F5F]">
            {wallpaperCollections.length} curated lines, each with its own
            character — browse by collection to find the one that fits your
            room.
          </p>
        </motion.div>

        {/* ---- Wallpaper collections: editorial bento grid ---- */}
        <div
          role="list"
          className="mt-14 grid grid-cols-1 gap-5 sm:grid-cols-2 sm:gap-6 lg:grid-cols-12 lg:gap-6"
        >
          {wallpaperCollections.map((collection, i) => (
            <motion.div
              key={collection.id}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{
                duration: 0.45,
                delay: Math.min(i, 4) * 0.06,
                ease: [0.22, 1, 0.36, 1],
              }}
              className={[
                collection.id === "wonder" ? "sm:col-span-2" : "",
                GRID_SPAN[collection.id] ?? "",
              ].join(" ")}
            >
              <CollectionCard
                collection={collection}
                aspectClass={IMAGE_ASPECT[collection.id]}
              />
            </motion.div>
          ))}
        </div>

        {/* ---- Other product categories: coming soon strip ---- */}
        <div className="mt-20">
          <div className="flex items-center gap-4">
            <span className="font-[family-name:var(--font-body)] text-[11px] font-semibold uppercase tracking-[0.22em] text-[#8A7A5E]">
              Expanding the Catalog
            </span>
            <div className="h-px flex-1 bg-[#E4DAC4]" />
          </div>

          <div
            role="list"
            className="mt-6 grid grid-cols-2 gap-4 sm:grid-cols-4 sm:gap-5"
          >
            {otherCategories.map((collection, i) => (
              <motion.div
                key={collection.id}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{
                  duration: 0.4,
                  delay: i * 0.05,
                  ease: [0.22, 1, 0.36, 1],
                }}
              >
                <CollectionCard collection={collection} />
              </motion.div>
            ))}
          </div>
        </div>

        {/* ---- Bottom CTA ---- */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-40px" }}
          transition={{ duration: 0.45, delay: 0.1 }}
          className="mt-16 text-center"
        >
          <Link
            href="/collections"
            className="inline-flex items-center gap-2 border border-[#2A2420] px-7 py-3 font-[family-name:var(--font-body)] text-[0.85rem] font-semibold uppercase tracking-[0.08em] text-[#2A2420] transition-colors duration-300 hover:bg-[#2A2420] hover:text-[#F7F3EC]"
          >
            View All Collections
            <ArrowIcon className="h-3.5 w-3.5" />
          </Link>
        </motion.div>
      </div>
    </section>
  );
}

// Re-export for convenience so consumers can `import { collections } from
// "@/components/collections/FeaturedCollections"` if preferred, though the
// canonical source remains lib/collections.ts.
export { collections };
