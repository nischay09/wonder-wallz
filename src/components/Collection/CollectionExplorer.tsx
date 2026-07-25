"use client";

/**
 * src/components/Collection/CollectionExplorer.tsx
 *
 * Owns every bit of client state needed to browse a collection: the active
 * subcategory, the filtered/sorted product list derived from it, and
 * pagination over that filtered list.
 * page.tsx stays a server component (generateStaticParams/generateMetadata,
 * async params) and just hands this component the collection data.
 *
 * Renders Hero → Customer Actions (inside Hero) → Collection Carousel →
 * Filters → Grid → Pagination. For collections with `unifiedCategoryNav`
 * (e.g. Wallpapers), category browsing now lives in the Collection Carousel
 * (a premium, horizontally-scrollable replacement for the old inline hero
 * pills) instead of the Hero itself — both share the same `activeCategory`
 * state with CollectionFilters, so filtering logic is untouched.
 * Collections without that flag keep the Hero's chips as plain navigation
 * links and still get their own category-chip row in CollectionFilters,
 * unchanged.
 *
 * ── Flagship hero ───────────────────────────────────────────────────────
 * Wallpapers is Wonder Wallz's flagship category, so it gets a dedicated,
 * premium hero (`CollectionHeroFlagship`) — a real image collage, trust
 * indicators (500+ designs / custom sized / eco-friendly HP latex /
 * professional install), and a clear "Browse the Collection" jump straight
 * into the catalogue below. Every other collection keeps the existing,
 * lighter `CollectionHero`. The switch is purely presentational: both
 * heroes share the same `activeCategory` contract with the Carousel and
 * Filters, so nothing about filtering/search/pagination changes.
 *
 * ── Pagination ──────────────────────────────────────────────────────────
 * CollectionFilters is still the single source of truth for the filtered/
 * sorted product list (search, category, sort — all untouched). This
 * component slices that list into pages on top:
 *   • 15 products per page on mobile (< 768px)
 *   • 24 products per page on desktop
 * The page resets to 1 whenever the filtered list changes (new search,
 * category, or sort), and changing pages smoothly scrolls the product grid
 * back into view — mirroring the existing carousel → grid scroll behavior.
 */

import { useEffect, useMemo, useRef, useState } from "react";
import type { Collection, CollectionProduct } from "@/lib/collections";
import { CollectionHero } from "./CollectionHero";
import { CollectionHeroFlagship } from "./CollectionHeroFlagship";
import { CollectionCarousel } from "./CollectionCarousel";
import { CollectionFilters } from "./CollectionFilters";
import { CollectionGrid } from "./CollectionGrid";
import { CollectionHighlights } from "./CollectionHighlights";
import { CollectionPagination } from "./CollectionPagination";

interface CollectionExplorerProps {
  collection: Collection;
}

/** Default subcategory shown on first load for the Wallpapers collection. */
const WALLPAPERS_DEFAULT_CATEGORY = "wonder-art-mural";

/** Products per page — mobile gets a lighter page for faster loads/scroll. */
const MOBILE_ITEMS_PER_PAGE = 15;
const DESKTOP_ITEMS_PER_PAGE = 24;
/** Matches Tailwind's `md` breakpoint used throughout the grid/layout. */
const MOBILE_MEDIA_QUERY = "(max-width: 767px)";

/** Collections that render the premium flagship hero instead of CollectionHero. */
const FLAGSHIP_HERO_SLUGS = new Set(["wallpapers"]);

/** Anchor id the flagship hero's "Browse the Collection" CTA scrolls to. */
const CATALOGUE_ANCHOR_ID = "collection-catalogue";

/** Resolve the initial active subcategory for a given collection. */
function getDefaultCategory(collection: Collection): string {
  if (collection.slug === "wallpapers") return WALLPAPERS_DEFAULT_CATEGORY;
  return collection.subcategories?.[0]?.slug ?? "";
}

/**
 * Tracks the current per-page product count based on viewport width.
 * Defaults to the desktop count for the first (server-matching) render,
 * then syncs to the real viewport on mount and on resize/orientation change.
 */
function useItemsPerPage(): number {
  const [itemsPerPage, setItemsPerPage] = useState(DESKTOP_ITEMS_PER_PAGE);

  useEffect(() => {
    if (typeof window === "undefined" || !window.matchMedia) return;
    const mql = window.matchMedia(MOBILE_MEDIA_QUERY);

    const update = () => setItemsPerPage(mql.matches ? MOBILE_ITEMS_PER_PAGE : DESKTOP_ITEMS_PER_PAGE);
    update();

    mql.addEventListener("change", update);
    return () => mql.removeEventListener("change", update);
  }, []);

  return itemsPerPage;
}

export function CollectionExplorer({ collection }: CollectionExplorerProps) {
  const {
    products,
    subcategories,
    workflow,
    unifiedCategoryNav,
    hideSortOptions,
    showCollectionCards = true,
    highlights,
  } = collection;

  const isFlagship = FLAGSHIP_HERO_SLUGS.has(collection.slug);

  const [activeCategory, setActiveCategory] = useState(() => getDefaultCategory(collection));
  const [visibleProducts, setVisibleProducts] = useState<CollectionProduct[]>(() => {
    const defaultCategory = getDefaultCategory(collection);
    return defaultCategory ? products.filter((p) => p.subcategory === defaultCategory) : products;
  });

  // ── Pagination state ────────────────────────────────────────────────────
  const itemsPerPage = useItemsPerPage();
  const [currentPage, setCurrentPage] = useState(1);

  const totalPages = Math.max(1, Math.ceil(visibleProducts.length / itemsPerPage));
  // Clamp defensively — e.g. after a viewport change shrinks the page size,
  // or a filter change shrinks the result count, without needing an extra
  // render cycle before the grid reflects a valid page.
  const safeCurrentPage = Math.min(currentPage, totalPages);

  const pagedProducts = useMemo(() => {
    const start = (safeCurrentPage - 1) * itemsPerPage;
    return visibleProducts.slice(start, start + itemsPerPage);
  }, [visibleProducts, safeCurrentPage, itemsPerPage]);

  // Reset to page 1 whenever the filtered/sorted list itself changes (new
  // search term, category, or sort) — never when only the page changes.
  useEffect(() => {
    setCurrentPage(1);
  }, [visibleProducts]);

  // Anchor for the search/grid section so selecting a collection card can
  // smoothly bring the results into view (mainly matters on mobile, where
  // the carousel + hero can push the grid below the fold).
  const searchGridRef = useRef<HTMLDivElement>(null);
  // Narrower anchor at the top of the product grid itself, used to scroll
  // back up on page change without also re-scrolling past the filters bar.
  const gridTopRef = useRef<HTMLDivElement>(null);

  const handleCarouselCategoryChange = (slug: string) => {
    setActiveCategory(slug);
    requestAnimationFrame(() => {
      searchGridRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
    });
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    requestAnimationFrame(() => {
      gridTopRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
    });
  };

  // A handful of representative products for the flagship hero's image
  // collage — favors variety by sampling across subcategories rather than
  // just taking the first N products of one subcategory. Purely visual;
  // has no bearing on the actual filtered/paged product list below.
  const heroCollageProducts = useMemo(() => {
    if (!isFlagship) return [];
    const seen = new Set<string>();
    const picks: CollectionProduct[] = [];
    for (const p of products) {
      if (picks.length >= 5) break;
      const key = p.subcategory ?? "_";
      if (seen.has(key)) continue;
      seen.add(key);
      picks.push(p);
    }
    // Top up with remaining products if there weren't enough distinct
    // subcategories to fill the collage.
    if (picks.length < 5) {
      for (const p of products) {
        if (picks.length >= 5) break;
        if (!picks.includes(p)) picks.push(p);
      }
    }
    return picks;
  }, [isFlagship, products]);

  return (
    <>
      {/* ── Hero ── */}
      {isFlagship ? (
        <CollectionHeroFlagship
          collection={collection}
          featuredProducts={heroCollageProducts}
          activeCategory={unifiedCategoryNav ? undefined : activeCategory}
          onCategoryChange={unifiedCategoryNav ? undefined : setActiveCategory}
          hideChips={unifiedCategoryNav}
          scrollTargetId={CATALOGUE_ANCHOR_ID}
        />
      ) : (
        /* Category browsing has moved to the Collection Carousel below, so
           the hero's inline chips are hidden for unifiedCategoryNav
           collections (Wallpapers) to avoid duplicating the same control.
           Other collections keep the hero's chips as plain navigation
           links, unchanged. Customer Actions still render inside the Hero,
           right after the title/description block. */
        <CollectionHero collection={collection} hideChips={unifiedCategoryNav} />
      )}

      {/* ── Explore Collections carousel ── */}
      {/* Replaces the old subcategory pill row. Only relevant for
          collections with unifiedCategoryNav + subcategories (Wallpapers);
          purely a UI layer over the same activeCategory state that
          CollectionFilters and CollectionGrid already consume. */}
      {unifiedCategoryNav && subcategories && subcategories.length > 0 && (
        <CollectionCarousel
          subcategories={subcategories}
          products={products}
          activeCategory={activeCategory}
          onCategoryChange={handleCarouselCategoryChange}
          placeholderGradient={collection.placeholderGradient}
        />
      )}

      <div
        id={isFlagship ? CATALOGUE_ANCHOR_ID : undefined}
        ref={searchGridRef}
        className="container-site py-12 md:py-16 scroll-mt-6"
      >
        {showCollectionCards ? (
          <>
            {/* ── Catalogue intro ── */}
            {/* Purely a section header — sets editorial tone before the
                filter bar, echoing the "By Category" eyebrow used in the
                Collection Carousel above. No new state, no logic. */}
            <div className="mb-8 md:mb-10 flex items-end justify-between gap-6 flex-wrap">
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.18em] text-neutral-400 mb-2">
                  The Catalogue
                </p>
                <h2
                  className="text-2xl md:text-3xl font-bold text-neutral-900"
                  style={{ fontFamily: "var(--font-playfair, serif)" }}
                >
                  Browse All Designs
                </h2>
              </div>
            </div>

            {/* ── Filters (search, sort, category) ── */}
            <section
              aria-label="Filter and sort products"
              className="mb-8 rounded-2xl border border-neutral-200/70 bg-white/60 backdrop-blur-sm p-4 md:p-5 shadow-sm"
            >
              <CollectionFilters
                products={products}
                subcategories={subcategories}
                activeCategory={activeCategory}
                onCategoryChange={setActiveCategory}
                hideCategoryChips={unifiedCategoryNav}
                hideSort={hideSortOptions}
                onFilteredChange={setVisibleProducts}
              />
            </section>

            {/* ── Product grid ── */}
            <div ref={gridTopRef} className="scroll-mt-6">
              <section aria-label={`${collection.title} products`}>
                <CollectionGrid
                  products={pagedProducts}
                  workflow={workflow}
                  collectionSlug={collection.slug}
                />
              </section>
            </div>

            {/* ── Pagination ── */}
            <div className="mt-10 md:mt-12">
              <CollectionPagination
                currentPage={safeCurrentPage}
                totalItems={visibleProducts.length}
                itemsPerPage={itemsPerPage}
                onPageChange={handlePageChange}
                ariaLabel={`${collection.title} pages`}
              />
            </div>
          </>
        ) : (
          /* ── No online catalogue: informational highlights only ── */
          /* CustomerActions (rendered by the parent page, not this
             component) picks up immediately after this section — see
             module doc comment above and collections.ts for context. */
          <CollectionHighlights
            highlights={highlights ?? []}
            description={collection.description}
          />
        )}
      </div>
    </>
  );
}
