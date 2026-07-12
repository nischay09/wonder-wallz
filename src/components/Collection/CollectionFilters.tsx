"use client";

import { useEffect, useMemo, useState } from "react";
import { motion } from "framer-motion";
import type { CollectionProduct, CollectionSubcategory } from "@/lib/collections";

interface CollectionFiltersProps {
  products: CollectionProduct[];
  subcategories?: CollectionSubcategory[];
  onFilteredChange: (products: CollectionProduct[]) => void;
  /** Lifted category state — when the Hero owns category nav, this is shared with it. */
  activeCategory: string;
  onCategoryChange: (slug: string) => void;
  /**
   * Hide the category-chip row below the search bar. Set this when the
   * Hero's chips are already the category navigation (see
   * `Collection.unifiedCategoryNav`) so the two don't duplicate each other.
   */
  hideCategoryChips?: boolean;
  /**
   * Hide the sort dropdown — for collections where every product follows
   * an identical purchasing workflow, so sorting has no real effect.
   */
  hideSort?: boolean;
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
  products,
  subcategories,
  onFilteredChange,
  activeCategory,
  onCategoryChange,
  hideCategoryChips = false,
  hideSort = false,
}: CollectionFiltersProps) {
  const [searchValue, setSearchValue] = useState("");
  const [activeSort, setActiveSort] = useState("featured");
  const [filtersOpen, setFiltersOpen] = useState(false);

  const filteredProducts = useMemo(() => {
    let result = activeCategory
      ? products.filter((p) => p.subcategory === activeCategory)
      : products;

    const query = searchValue.trim().toLowerCase();
    if (query) {
      result = result.filter((p) => {
        const haystack = `${p.name} ${p.description} ${p.collectionLabel ?? ""}`.toLowerCase();
        return haystack.includes(query);
      });
    }

    if (!hideSort) {
      switch (activeSort) {
        case "name-asc":
          result = [...result].sort((a, b) => a.name.localeCompare(b.name));
          break;
        case "newest":
          result = [...result].sort((a, b) => (b.designNumber ?? 0) - (a.designNumber ?? 0));
          break;
        // "price-asc" / "price-desc" have no price field on CollectionProduct
        // yet — left as no-ops until pricing data exists, same as "featured".
        default:
          break;
      }
    }

    return result;
  }, [products, activeCategory, searchValue, activeSort, hideSort]);

  useEffect(() => {
    onFilteredChange(filteredProducts);
  }, [filteredProducts, onFilteredChange]);

  const showCategoryChips = !hideCategoryChips && subcategories && subcategories.length > 0;

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
        {!hideSort && (
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
            {showCategoryChips && (
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
        )}
      </div>

      {/* ── Category chips ── */}
      {/* Only rendered when this collection hasn't opted into unified nav
          (Hero chips already cover that case — see hideCategoryChips). */}
      {showCategoryChips && (
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
            {subcategories!.map((sub) => (
              <button
                key={sub.id}
                type="button"
                onClick={() => onCategoryChange(sub.slug)}
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
        <span className="font-semibold text-neutral-700">{filteredProducts.length}</span>{" "}
        {filteredProducts.length === 1 ? "product" : "products"}
        {activeCategory && subcategories && (
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
