"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import type { CollectionSubcategory } from "@/lib/collections";

interface CollectionFiltersProps {
  subcategories?: CollectionSubcategory[];
  productCount: number;
}

const SORT_OPTIONS = [
  { value: "featured", label: "Featured" },
  { value: "newest", label: "Newest" },
  { value: "price-asc", label: "Price: Low to High" },
  { value: "price-desc", label: "Price: High to Low" },
  { value: "name-asc", label: "Name: A–Z" },
];

const EASE_BRAND = [0.22, 1, 0.36, 1] as const;

export function CollectionFilters({
  subcategories,
  productCount,
}: CollectionFiltersProps) {
  // UI state only — no filtering logic yet
  const [searchValue, setSearchValue] = useState("");
  const [activeSort, setActiveSort] = useState("featured");
  const [activeCategory, setActiveCategory] = useState<string>("all");
  const [filtersOpen, setFiltersOpen] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, ease: EASE_BRAND }}
      className="w-full"
    >
      {/* ── Top bar: search + sort + toggle ── */}
      <div className="flex flex-col sm:flex-row gap-3 items-start sm:items-center mb-4">
        {/* Search */}
        <div className="relative flex-1 min-w-0">
          <label htmlFor="collection-search" className="sr-only">
            Search products
          </label>
          <div
            className="absolute left-3.5 top-1/2 -translate-y-1/2 text-neutral-400 pointer-events-none"
            aria-hidden="true"
          >
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
              <circle cx="7" cy="7" r="5" stroke="currentColor" strokeWidth="1.5" />
              <path d="M11 11L14 14" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
            </svg>
          </div>
          <input
            id="collection-search"
            type="search"
            value={searchValue}
            onChange={(e) => setSearchValue(e.target.value)}
            placeholder="Search designs…"
            className="w-full pl-9 pr-4 py-2.5 bg-white border border-neutral-200 rounded-xl text-sm text-neutral-900 placeholder-neutral-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-shadow duration-200 shadow-sm"
            aria-label="Search products"
          />
        </div>

        {/* Sort */}
        <div className="flex items-center gap-3 shrink-0">
          <label htmlFor="collection-sort" className="sr-only">
            Sort by
          </label>
          <div className="relative">
            <select
              id="collection-sort"
              value={activeSort}
              onChange={(e) => setActiveSort(e.target.value)}
              className="appearance-none pl-4 pr-9 py-2.5 bg-white border border-neutral-200 rounded-xl text-sm text-neutral-700 font-medium focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-shadow duration-200 shadow-sm cursor-pointer"
              aria-label="Sort products"
            >
              {SORT_OPTIONS.map((opt) => (
                <option key={opt.value} value={opt.value}>
                  {opt.label}
                </option>
              ))}
            </select>
            <span
              className="absolute right-3 top-1/2 -translate-y-1/2 text-neutral-400 pointer-events-none"
              aria-hidden="true"
            >
              <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                <path d="M2 4L6 8L10 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </span>
          </div>

          {/* Filter toggle (mobile) */}
          {subcategories && subcategories.length > 0 && (
            <button
              type="button"
              onClick={() => setFiltersOpen((v) => !v)}
              className="sm:hidden inline-flex items-center gap-2 px-4 py-2.5 bg-white border border-neutral-200 rounded-xl text-sm font-medium text-neutral-700 shadow-sm hover:bg-neutral-50 transition-colors duration-150"
              aria-expanded={filtersOpen}
              aria-controls="category-filters"
            >
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
                <path d="M1 3h12M3 7h8M5 11h4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
              </svg>
              Filter
            </button>
          )}
        </div>
      </div>

      {/* ── Category chips ── */}
      {subcategories && subcategories.length > 0 && (
        <motion.div
          id="category-filters"
          initial={false}
          animate={{ height: filtersOpen || true ? "auto" : 0, opacity: filtersOpen || true ? 1 : 0 }}
          className="overflow-hidden"
        >
          <div
            className="flex flex-wrap gap-2 pb-1"
            role="group"
            aria-label="Filter by category"
          >
            {/* "All" chip */}
            <button
              type="button"
              onClick={() => setActiveCategory("all")}
              className={`inline-flex items-center px-4 py-1.5 rounded-pill text-sm font-medium transition-all duration-200 ${
                activeCategory === "all"
                  ? "bg-neutral-900 text-white shadow-sm"
                  : "bg-white text-neutral-600 border border-neutral-200 hover:border-neutral-400 hover:text-neutral-900"
              }`}
              aria-pressed={activeCategory === "all"}
            >
              All
            </button>

            {subcategories.map((sub) => (
              <button
                key={sub.id}
                type="button"
                onClick={() => setActiveCategory(sub.slug)}
                className={`inline-flex items-center px-4 py-1.5 rounded-pill text-sm font-medium transition-all duration-200 ${
                  activeCategory === sub.slug
                    ? "bg-neutral-900 text-white shadow-sm"
                    : "bg-white text-neutral-600 border border-neutral-200 hover:border-neutral-400 hover:text-neutral-900"
                }`}
                aria-pressed={activeCategory === sub.slug}
              >
                {sub.title}
              </button>
            ))}
          </div>
        </motion.div>
      )}

      {/* ── Results count ── */}
      <p className="mt-4 text-sm text-neutral-500" aria-live="polite" aria-atomic="true">
        Showing{" "}
        <span className="font-semibold text-neutral-700">{productCount}</span>{" "}
        {productCount === 1 ? "product" : "products"}
        {activeCategory !== "all" && subcategories && (
          <>
            {" "}in{" "}
            <span className="font-semibold text-neutral-700">
              {subcategories.find((s) => s.slug === activeCategory)?.title ?? activeCategory}
            </span>
          </>
        )}
      </p>
    </motion.div>
  );
}
