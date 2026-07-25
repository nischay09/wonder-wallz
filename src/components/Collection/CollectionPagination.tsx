"use client";

/**
 * src/components/Collection/CollectionPagination.tsx
 *
 * Compact, touch-friendly pagination.
 *
 * Fully controlled by the parent (CollectionExplorer) so it can stay in
 * sync with per-viewport page sizes (15 on mobile / 24 on desktop) and
 * with any URL state the parent already manages. This component owns NO
 * page state itself and contains zero filtering/sorting logic.
 *
 * Design intentionally avoids a long run of page-number buttons
 * (1 2 3 4 5 6 7 8 9…) — that pattern doesn't work well on small screens
 * and is redundant when a simple Previous/Next + "Page X of Y" already
 * tells the user everything they need. For larger totals we still surface
 * the first/last page numbers plus the current page so a user can jump to
 * either end without excessive tapping, but nothing more than that.
 */

interface CollectionPaginationProps {
  /** 1-indexed current page. Defaults to 1 if omitted or non-finite. */
  currentPage?: number;
  /** Total number of items across all pages (post filter/search/sort). */
  totalItems: number;
  /** Items rendered per page — varies by viewport (15 mobile / 24 desktop). */
  itemsPerPage: number;
  /** Called with the next page number. Parent handles clamping + scroll. */
  onPageChange?: (page: number) => void;
  /** Aria label for the nav landmark. */
  ariaLabel?: string;
}

export function CollectionPagination({
  currentPage = 1,
  totalItems,
  itemsPerPage,
  onPageChange,
  ariaLabel = "Collection pages",
}: CollectionPaginationProps) {
  // Defensive against any caller (old or new) passing a non-finite value —
  // e.g. a stale call site still using the pre-refactor uncontrolled API,
  // where `currentPage` would otherwise arrive as `undefined`. We'd rather
  // silently fall back to sane defaults than ever render NaN.
  const safeTotalItems = Number.isFinite(totalItems) ? Math.max(0, totalItems) : 0;
  const safeItemsPerPage = Number.isFinite(itemsPerPage) && itemsPerPage > 0 ? itemsPerPage : 24;

  const totalPages = Math.max(1, Math.ceil(safeTotalItems / safeItemsPerPage));

  // Nothing to paginate — and nothing to announce either.
  if (safeTotalItems === 0 || totalPages <= 1) return null;

  const safeCurrentPage = Number.isFinite(currentPage) ? currentPage : 1;
  const safePage = Math.min(Math.max(1, safeCurrentPage), totalPages);
  const totalItemsCount = safeTotalItems;
  const itemsPerPageCount = safeItemsPerPage;
  const startItem = (safePage - 1) * itemsPerPageCount + 1;
  const endItem = Math.min(safePage * itemsPerPageCount, totalItemsCount);

  const goTo = (page: number) => {
    if (page < 1 || page > totalPages || page === safePage) return;
    onPageChange?.(page);
  };

  // Only ever show: first page, last page, and (when it differs from both)
  // the current page as a highlighted chip in between — never a run of
  // consecutive numbers.
  const showCurrentAsChip = safePage !== 1 && safePage !== totalPages;

  return (
    <nav
      aria-label={ariaLabel}
      className="flex flex-col items-center gap-4 pt-10 border-t border-neutral-200"
    >
      {/* "Showing X–Y of Z Designs" */}
      <p className="text-sm tracking-wide text-neutral-500" aria-live="polite" aria-atomic="true">
        Showing{" "}
        <span className="font-semibold text-neutral-700">
          {startItem}–{endItem}
        </span>{" "}
        of <span className="font-semibold text-neutral-700">{totalItemsCount}</span> Designs
      </p>

      {/* Compact "Page X of Y" pill — matches the badge/chip styling used
          throughout the Collection components (rounded-pill, soft border,
          subtle shadow). Purely informational; the numbered controls below
          remain the source of truth for navigation. */}
      <span
        className="inline-flex items-center px-4 py-1.5 rounded-pill bg-white border border-neutral-200 shadow-sm text-sm font-semibold text-neutral-700"
        aria-hidden="true"
      >
        Page {safePage} of {totalPages}
      </span>

      {/* Prev / indicators / Next — all touch targets ≥44px */}
      <div className="flex items-center gap-2">
        <button
          type="button"
          onClick={() => goTo(safePage - 1)}
          disabled={safePage === 1}
          className="inline-flex items-center justify-center gap-1.5 h-11 px-4 rounded-xl border border-neutral-200 bg-white text-sm font-medium text-neutral-700 hover:bg-neutral-50 hover:text-neutral-900 disabled:opacity-40 disabled:cursor-not-allowed transition-all duration-150 shadow-sm active:scale-95"
          aria-label="Previous page"
        >
          <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
            <path d="M9 11L5 7l4-4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
          <span className="hidden sm:inline">Previous</span>
        </button>

        <ol className="flex items-center gap-1.5" role="list">
          {/* First page — always shown, highlighted when it's the active page */}
          <li>
            <button
              type="button"
              onClick={() => goTo(1)}
              aria-current={safePage === 1 ? "page" : undefined}
              className={`inline-flex items-center justify-center min-w-11 h-11 px-3 rounded-xl text-sm font-medium shadow-sm transition-all duration-150 active:scale-95 ${
                safePage === 1
                  ? "bg-neutral-900 text-white font-semibold"
                  : "border border-neutral-200 bg-white text-neutral-600 hover:bg-neutral-50 hover:text-neutral-900"
              }`}
            >
              1
            </button>
          </li>

          {safePage > 2 && (
            <li aria-hidden="true">
              <span className="inline-flex items-center justify-center w-6 h-11 text-sm text-neutral-400 select-none">
                …
              </span>
            </li>
          )}

          {showCurrentAsChip && (
            <li>
              <span
                className="inline-flex items-center justify-center min-w-11 h-11 px-3 rounded-xl text-sm font-semibold bg-neutral-900 text-white shadow-sm"
                aria-current="page"
              >
                {safePage}
              </span>
            </li>
          )}

          {safePage < totalPages - 1 && (
            <li aria-hidden="true">
              <span className="inline-flex items-center justify-center w-6 h-11 text-sm text-neutral-400 select-none">
                …
              </span>
            </li>
          )}

          {/* Last page — always shown (when more than one page exists),
              highlighted when it's the active page */}
          <li>
            <button
              type="button"
              onClick={() => goTo(totalPages)}
              aria-current={safePage === totalPages ? "page" : undefined}
              className={`inline-flex items-center justify-center min-w-11 h-11 px-3 rounded-xl text-sm font-medium shadow-sm transition-all duration-150 active:scale-95 ${
                safePage === totalPages
                  ? "bg-neutral-900 text-white font-semibold"
                  : "border border-neutral-200 bg-white text-neutral-600 hover:bg-neutral-50 hover:text-neutral-900"
              }`}
            >
              {totalPages}
            </button>
          </li>
        </ol>

        <button
          type="button"
          onClick={() => goTo(safePage + 1)}
          disabled={safePage === totalPages}
          className="inline-flex items-center justify-center gap-1.5 h-11 px-4 rounded-xl border border-neutral-200 bg-white text-sm font-medium text-neutral-700 hover:bg-neutral-50 hover:text-neutral-900 disabled:opacity-40 disabled:cursor-not-allowed transition-all duration-150 shadow-sm active:scale-95"
          aria-label="Next page"
        >
          <span className="hidden sm:inline">Next</span>
          <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
            <path d="M5 3l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </button>
      </div>
    </nav>
  );
}
