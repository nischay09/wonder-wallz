"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import type { Collection } from "@/lib/collections";

interface CollectionHeroProps {
  collection: Collection;
  /**
   * Currently active subcategory slug ("all" = no filter). Only relevant
   * when `onCategoryChange` is provided.
   */
  activeCategory?: string;
  /**
   * When provided, subcategory chips switch from navigation links to
   * in-place filter buttons that call this instead of routing away.
   * This is how a collection opts into "hero chips are the only nav"
   * (see `Collection.unifiedCategoryNav`).
   */
  onCategoryChange?: (slug: string) => void;
}

const EASE_BRAND = [0.22, 1, 0.36, 1] as const;

export function CollectionHero({ collection, activeCategory, onCategoryChange }: CollectionHeroProps) {
  const { title, heroDescription, productCount, subcategories, workflow, placeholderGradient } = collection;

  const isCustom = workflow === "custom";
  const isFilterMode = typeof onCategoryChange === "function";

  return (
    <section
      className="relative w-full overflow-hidden"
      style={{ minHeight: "420px" }}
      aria-label={`${title} collection hero`}
    >
      {/* ── Background gradient ── */}
      <div
        className="absolute inset-0"
        style={{
          background: `linear-gradient(135deg, ${placeholderGradient[0]} 0%, ${placeholderGradient[1]} 100%)`,
        }}
        aria-hidden="true"
      />

      {/* ── Subtle mesh overlay ── */}
      <div
        className="absolute inset-0 opacity-30"
        style={{
          background:
            "radial-gradient(at 20% 50%, rgba(45,127,249,0.15) 0, transparent 55%), radial-gradient(at 80% 20%, rgba(122,61,240,0.10) 0, transparent 50%)",
        }}
        aria-hidden="true"
      />

      {/* ── Content ── */}
      <div className="container-site relative z-10 py-16 md:py-20 lg:py-24">
        {/* Breadcrumb */}
        <motion.nav
          initial={{ opacity: 0, y: -8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, ease: EASE_BRAND }}
          aria-label="Breadcrumb"
          className="mb-8"
        >
          <ol className="flex items-center gap-2 text-sm font-medium">
            <li>
              <Link
                href="/"
                className="text-neutral-600 hover:text-neutral-900 transition-colors duration-150"
              >
                Home
              </Link>
            </li>
            <li aria-hidden="true" className="text-neutral-400 select-none">/</li>
            <li>
              <Link
                href="/#shop"
                className="text-neutral-600 hover:text-neutral-900 transition-colors duration-150"
              >
                Collections
              </Link>
            </li>
            <li aria-hidden="true" className="text-neutral-400 select-none">/</li>
            <li className="text-neutral-900 font-semibold" aria-current="page">
              {title}
            </li>
          </ol>
        </motion.nav>

        <div className="max-w-3xl">
          {/* Workflow badge */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, ease: EASE_BRAND, delay: 0.05 }}
            className="mb-4"
          >
            <span
              className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-pill text-xs font-semibold tracking-wider uppercase ${
                isCustom
                  ? "bg-purple-100 text-purple-700"
                  : "bg-blue-100 text-blue-700"
              }`}
            >
              <span
                className={`inline-block w-1.5 h-1.5 rounded-full ${
                  isCustom ? "bg-purple-500" : "bg-blue-500"
                }`}
                aria-hidden="true"
              />
              {isCustom ? "Customisable" : "Standard"}
            </span>
          </motion.div>

          {/* Title */}
          <motion.h1
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: EASE_BRAND, delay: 0.1 }}
            className="font-display text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-neutral-900 mb-4"
            style={{ fontFamily: "var(--font-playfair, serif)" }}
          >
            {title}
          </motion.h1>

          {/* Description */}
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: EASE_BRAND, delay: 0.15 }}
            className="text-lg md:text-xl text-neutral-700 leading-relaxed mb-6"
            style={{ fontFamily: "var(--font-dm-sans, sans-serif)" }}
          >
            {heroDescription}
          </motion.p>

          {/* Product count pill */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, ease: EASE_BRAND, delay: 0.2 }}
            className="mb-8"
          >
            <span className="inline-flex items-center gap-2 px-4 py-2 bg-white/60 backdrop-blur-sm border border-white/40 rounded-pill text-sm font-medium text-neutral-700 shadow-sm">
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
                <rect x="1" y="1" width="6" height="6" rx="1.5" fill="currentColor" opacity="0.5"/>
                <rect x="9" y="1" width="6" height="6" rx="1.5" fill="currentColor" opacity="0.8"/>
                <rect x="1" y="9" width="6" height="6" rx="1.5" fill="currentColor" opacity="0.8"/>
                <rect x="9" y="9" width="6" height="6" rx="1.5" fill="currentColor" opacity="0.5"/>
              </svg>
              {productCount}+ designs available
            </span>
          </motion.div>

          {/* Subcategory chips */}
          {subcategories && subcategories.length > 0 && (
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, ease: EASE_BRAND, delay: 0.25 }}
              className="flex flex-wrap gap-2"
              role={isFilterMode ? "group" : "list"}
              aria-label={isFilterMode ? `Filter ${title} by category` : `${title} subcategories`}
            >
              {isFilterMode && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.3, ease: EASE_BRAND, delay: 0.28 }}
                >
                  <button
                    type="button"
                    onClick={() => onCategoryChange?.("all")}
                    aria-pressed={activeCategory === "all" || !activeCategory}
                    className={`inline-block px-4 py-1.5 backdrop-blur-sm rounded-pill text-sm font-medium transition-all duration-200 shadow-sm hover:shadow-md ${
                      activeCategory === "all" || !activeCategory
                        ? "bg-neutral-900 text-white border border-neutral-900"
                        : "bg-white/70 hover:bg-white border border-white/50 hover:border-white text-neutral-800 hover:text-neutral-900"
                    }`}
                  >
                    All
                  </button>
                </motion.div>
              )}

              {subcategories.map((sub, i) => {
                const isActive = isFilterMode && activeCategory === sub.slug;
                const chipClassName = `inline-block px-4 py-1.5 backdrop-blur-sm rounded-pill text-sm font-medium transition-all duration-200 shadow-sm hover:shadow-md ${
                  isActive
                    ? "bg-neutral-900 text-white border border-neutral-900"
                    : "bg-white/70 hover:bg-white border border-white/50 hover:border-white text-neutral-800 hover:text-neutral-900"
                }`;

                return (
                  <motion.div
                    key={sub.id}
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{
                      duration: 0.3,
                      ease: EASE_BRAND,
                      delay: 0.28 + (i + 1) * 0.04,
                    }}
                    role={isFilterMode ? undefined : "listitem"}
                  >
                    {isFilterMode ? (
                      <button
                        type="button"
                        onClick={() => onCategoryChange?.(sub.slug)}
                        aria-pressed={isActive}
                        className={chipClassName}
                      >
                        {sub.title}
                      </button>
                    ) : (
                      <Link href={sub.href} className={chipClassName}>
                        {sub.title}
                      </Link>
                    )}
                  </motion.div>
                );
              })}
            </motion.div>
          )}
        </div>
      </div>
    </section>
  );
}
