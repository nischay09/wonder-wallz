"use client";

/**
 * src/components/Collection/CollectionExplorer.tsx
 *
 * Owns every bit of client state needed to browse a collection: the active
 * subcategory, and the filtered/sorted product list derived from it.
 * page.tsx stays a server component (generateStaticParams/generateMetadata,
 * async params) and just hands this component the collection data.
 *
 * Renders Hero → Customer Actions (inside Hero) → Collection Carousel →
 * Filters → Grid. For collections with `unifiedCategoryNav` (e.g.
 * Wallpapers), category browsing now lives in the Collection Carousel
 * (a premium, horizontally-scrollable replacement for the old inline hero
 * pills) instead of the Hero itself — both share the same `activeCategory`
 * state with CollectionFilters, so filtering logic is untouched.
 * Collections without that flag keep the Hero's chips as plain navigation
 * links and still get their own category-chip row in CollectionFilters,
 * unchanged.
 */

import { useRef, useState } from "react";
import type { Collection, CollectionProduct } from "@/lib/collections";
import { CollectionHero } from "./CollectionHero";
import { CollectionCarousel } from "./CollectionCarousel";
import { CollectionFilters } from "./CollectionFilters";
import { CollectionGrid } from "./CollectionGrid";
import { CollectionHighlights } from "./CollectionHighlights";

interface CollectionExplorerProps {
  collection: Collection;
}

/** Default subcategory shown on first load for the Wallpapers collection. */
const WALLPAPERS_DEFAULT_CATEGORY = "wonder-art-mural";

/** Resolve the initial active subcategory for a given collection. */
function getDefaultCategory(collection: Collection): string {
  if (collection.slug === "wallpapers") return WALLPAPERS_DEFAULT_CATEGORY;
  return collection.subcategories?.[0]?.slug ?? "";
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

  const [activeCategory, setActiveCategory] = useState(() => getDefaultCategory(collection));
  const [visibleProducts, setVisibleProducts] = useState<CollectionProduct[]>(() => {
    const defaultCategory = getDefaultCategory(collection);
    return defaultCategory ? products.filter((p) => p.subcategory === defaultCategory) : products;
  });

  // Anchor for the search/grid section so selecting a collection card can
  // smoothly bring the results into view (mainly matters on mobile, where
  // the carousel + hero can push the grid below the fold).
  const searchGridRef = useRef<HTMLDivElement>(null);

  const handleCarouselCategoryChange = (slug: string) => {
    setActiveCategory(slug);
    requestAnimationFrame(() => {
      searchGridRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
    });
  };

  return (
    <>
      {/* ── Hero ── */}
      {/* Category browsing has moved to the Collection Carousel below, so
          the hero's inline chips are hidden for unifiedCategoryNav
          collections (Wallpapers) to avoid duplicating the same control.
          Other collections keep the hero's chips as plain navigation
          links, unchanged. Customer Actions still render inside the Hero,
          right after the title/description block. */}
      <CollectionHero collection={collection} hideChips={unifiedCategoryNav} />

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

      <div ref={searchGridRef} className="container-site py-10 md:py-14 scroll-mt-6">
        {showCollectionCards ? (
          <>
            {/* ── Filters (search, sort, category) ── */}
            <section aria-label="Filter and sort products" className="mb-8">
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

            {/* Divider */}
            <hr className="border-neutral-200 mb-8" />

            {/* ── Product grid ── */}
            <section aria-label={`${collection.title} products`}>
              <CollectionGrid
                products={visibleProducts}
                workflow={workflow}
                collectionSlug={collection.slug}
              />
            </section>
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
