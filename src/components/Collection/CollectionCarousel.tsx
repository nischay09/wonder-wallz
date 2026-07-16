"use client";

/**
 * src/components/Collection/CollectionCarousel.tsx
 *
 * "Explore Collections" — a premium, horizontally scrollable replacement
 * for the old subcategory pill row. Each card shows a cover image,
 * collection name, and design count. Selecting a card highlights it and
 * drives the same `activeCategory` state that CollectionFilters and the
 * grid already consume — no filtering logic lives here, this is UI only.
 */

import { motion } from "framer-motion";
import Image from "next/image";
import type { CollectionProduct, CollectionSubcategory } from "@/lib/collections";

interface CollectionCarouselProps {
  subcategories: CollectionSubcategory[];
  products: CollectionProduct[];
  activeCategory: string;
  onCategoryChange: (slug: string) => void;
  /** Fallback gradient for cards whose subcategory has no product image yet. */
  placeholderGradient: [string, string];
}

const EASE_BRAND = [0.22, 1, 0.36, 1] as const;

export function CollectionCarousel({
  subcategories,
  products,
  activeCategory,
  onCategoryChange,
  placeholderGradient,
}: CollectionCarouselProps) {
  if (!subcategories || subcategories.length === 0) return null;

  return (
    <section aria-label="Explore collections" className="container-site py-8 md:py-10">
      <motion.h2
        initial={{ opacity: 0, y: 10 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 0.4, ease: EASE_BRAND }}
        className="text-xl md:text-2xl font-bold text-neutral-900 mb-5"
        style={{ fontFamily: "var(--font-playfair, serif)" }}
      >
        Explore Collections
      </motion.h2>

      <div
        className="flex gap-4 md:gap-5 overflow-x-auto pb-4 -mx-1 px-1 snap-x snap-mandatory scroll-smooth [&::-webkit-scrollbar]:h-1.5 [&::-webkit-scrollbar-track]:bg-transparent [&::-webkit-scrollbar-thumb]:bg-neutral-200 [&::-webkit-scrollbar-thumb]:rounded-full"
        role="group"
        aria-label="Collection categories"
      >
        {subcategories.map((sub, i) => {
          const count = products.filter((p) => p.subcategory === sub.slug).length;
          const isActive = activeCategory === sub.slug;
          const coverProduct = products.find((p) => p.subcategory === sub.slug);

          return (
            <motion.button
              key={sub.id}
              type="button"
              onClick={() => onCategoryChange(sub.slug)}
              initial={{ opacity: 0, y: 14 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.35, ease: EASE_BRAND, delay: Math.min(i * 0.04, 0.3) }}
              aria-pressed={isActive}
              className={`group relative shrink-0 snap-start w-[220px] md:w-[260px] text-left rounded-3xl overflow-hidden border bg-white transition-all duration-300 ${
                isActive
                  ? "border-neutral-900 shadow-lg ring-2 ring-neutral-900/10 -translate-y-0.5"
                  : "border-neutral-200 shadow-sm hover:shadow-md hover:border-neutral-300 hover:-translate-y-0.5"
              }`}
            >
              {/* Cover image */}
              <div className="relative w-full overflow-hidden" style={{ aspectRatio: "4/3" }}>
                <div
                  className="absolute inset-0"
                  style={{
                    background: `linear-gradient(135deg, ${placeholderGradient[0]} 0%, ${placeholderGradient[1]} 100%)`,
                  }}
                  aria-hidden="true"
                />
                {coverProduct && (
                  <Image
                    src={coverProduct.image}
                    alt=""
                    fill
                    sizes="(max-width: 768px) 220px, 260px"
                    quality={70}
                    className="object-cover transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-105"
                  />
                )}
                <div
                  className={`absolute inset-0 transition-colors duration-300 ${
                    isActive ? "bg-neutral-900/10" : "bg-neutral-950/0 group-hover:bg-neutral-950/10"
                  }`}
                  aria-hidden="true"
                />
                {isActive && (
                  <span
                    className="absolute top-3 right-3 w-6 h-6 rounded-full bg-neutral-900 text-white flex items-center justify-center shadow-sm"
                    aria-hidden="true"
                  >
                    <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                      <path
                        d="M2.5 6.5L5 9L9.5 3.5"
                        stroke="currentColor"
                        strokeWidth="1.6"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </span>
                )}
              </div>

              {/* Label */}
              <div className="p-4">
                <h3
                  className="text-sm md:text-base font-semibold mb-0.5 text-neutral-900"
                  style={{ fontFamily: "var(--font-playfair, serif)" }}
                >
                  {sub.title}
                </h3>
                <p className="text-xs text-neutral-500 font-medium">
                  {count} {count === 1 ? "design" : "designs"}
                </p>
              </div>
            </motion.button>
          );
        })}
      </div>
    </section>
  );
}
