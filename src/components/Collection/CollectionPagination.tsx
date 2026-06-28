"use client";

import { useState } from "react";
import { motion } from "framer-motion";

interface CollectionPaginationProps {
  /** Total number of items */
  totalItems: number;
  /** Items per page */
  itemsPerPage?: number;
  /** Aria label for the nav */
  ariaLabel?: string;
}

const EASE_BRAND = [0.22, 1, 0.36, 1] as const;

export function CollectionPagination({
  totalItems,
  itemsPerPage = 12,
  ariaLabel = "Collection pages",
}: CollectionPaginationProps) {
  // UI state only — routing/data logic wired up later
  const [currentPage, setCurrentPage] = useState(1);

  const totalPages = Math.max(1, Math.ceil(totalItems / itemsPerPage));

  if (totalPages <= 1) return null;

  /**
   * Build the visible page numbers with ellipsis.
   * Always shows: first, last, current ±1, and "…" gaps.
   */
  function getPageNumbers(): (number | "ellipsis-start" | "ellipsis-end")[] {
    if (totalPages <= 7) {
      return Array.from({ length: totalPages }, (_, i) => i + 1);
    }

    const pages: (number | "ellipsis-start" | "ellipsis-end")[] = [1];

    if (currentPage > 3) pages.push("ellipsis-start");

    const start = Math.max(2, currentPage - 1);
    const end = Math.min(totalPages - 1, currentPage + 1);
    for (let i = start; i <= end; i++) pages.push(i);

    if (currentPage < totalPages - 2) pages.push("ellipsis-end");

    pages.push(totalPages);
    return pages;
  }

  const pages = getPageNumbers();

  const handlePage = (page: number) => {
    if (page < 1 || page > totalPages) return;
    setCurrentPage(page);
    // TODO: wire up router.push / data fetch here
  };

  return (
    <motion.nav
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, ease: EASE_BRAND }}
      aria-label={ariaLabel}
      className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-8 border-t border-neutral-200"
    >
      {/* Page info */}
      <p className="text-sm text-neutral-500 order-2 sm:order-1">
        Page{" "}
        <span className="font-semibold text-neutral-700">{currentPage}</span>{" "}
        of{" "}
        <span className="font-semibold text-neutral-700">{totalPages}</span>
      </p>

      {/* Page buttons */}
      <ol className="flex items-center gap-1 order-1 sm:order-2" role="list">
        {/* Previous */}
        <li>
          <button
            type="button"
            onClick={() => handlePage(currentPage - 1)}
            disabled={currentPage === 1}
            className="inline-flex items-center justify-center w-9 h-9 rounded-xl border border-neutral-200 bg-white text-neutral-600 hover:bg-neutral-50 hover:text-neutral-900 disabled:opacity-40 disabled:cursor-not-allowed transition-all duration-150 shadow-sm"
            aria-label="Previous page"
          >
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
              <path d="M9 11L5 7l4-4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </button>
        </li>

        {/* Page numbers */}
        {pages.map((page, i) => {
          if (page === "ellipsis-start" || page === "ellipsis-end") {
            return (
              <li key={`${page}-${i}`} aria-hidden="true">
                <span className="inline-flex items-center justify-center w-9 h-9 text-sm text-neutral-400 select-none">
                  …
                </span>
              </li>
            );
          }

          const isActive = page === currentPage;
          return (
            <li key={page}>
              <button
                type="button"
                onClick={() => handlePage(page)}
                className={`inline-flex items-center justify-center w-9 h-9 rounded-xl text-sm font-medium transition-all duration-150 ${
                  isActive
                    ? "bg-neutral-900 text-white shadow-sm"
                    : "border border-neutral-200 bg-white text-neutral-600 hover:bg-neutral-50 hover:text-neutral-900 shadow-sm"
                }`}
                aria-label={`Page ${page}`}
                aria-current={isActive ? "page" : undefined}
              >
                {page}
              </button>
            </li>
          );
        })}

        {/* Next */}
        <li>
          <button
            type="button"
            onClick={() => handlePage(currentPage + 1)}
            disabled={currentPage === totalPages}
            className="inline-flex items-center justify-center w-9 h-9 rounded-xl border border-neutral-200 bg-white text-neutral-600 hover:bg-neutral-50 hover:text-neutral-900 disabled:opacity-40 disabled:cursor-not-allowed transition-all duration-150 shadow-sm"
            aria-label="Next page"
          >
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
              <path d="M5 3l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </button>
        </li>
      </ol>
    </motion.nav>
  );
}
