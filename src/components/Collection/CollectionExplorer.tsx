"use client";

/**
 * src/components/Collection/CollectionExplorer.tsx
 *
 * Owns every bit of client state needed to browse a collection: the active
 * subcategory, and the filtered/sorted product list derived from it.
 * page.tsx stays a server component (generateStaticParams/generateMetadata,
 * async params) and just hands this component the collection data.
 *
 * Renders Hero → Filters → Grid together because, for collections with
 * `unifiedCategoryNav` (e.g. Wallpapers), the Hero's chips ARE the category
 * filter — they need to share the same `activeCategory` state as
 * CollectionFilters instead of navigating to a separate route. Collections
 * without that flag keep the Hero's chips as plain navigation links and
 * still get their own category-chip row in CollectionFilters, unchanged.
 */

import { useState } from "react";
import type { Collection, CollectionProduct } from "@/lib/collections";
import { CollectionHero } from "./CollectionHero";
import { CollectionFilters } from "./CollectionFilters";
import { CollectionGrid } from "./CollectionGrid";

interface CollectionExplorerProps {
  collection: Collection;
}

export function CollectionExplorer({ collection }: CollectionExplorerProps) {
  const { products, subcategories, workflow, unifiedCategoryNav, hideSortOptions } = collection;

  const [activeCategory, setActiveCategory] = useState("all");
  const [visibleProducts, setVisibleProducts] = useState<CollectionProduct[]>(products);

  return (
    <>
      {/* ── Hero ── */}
      {/* Chips filter in place (unifiedCategoryNav) or link out, depending
          on the collection's flag — see CollectionHero for the switch. */}
      <CollectionHero
        collection={collection}
        activeCategory={unifiedCategoryNav ? activeCategory : undefined}
        onCategoryChange={unifiedCategoryNav ? setActiveCategory : undefined}
      />

      <div className="container-site py-10 md:py-14">
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
      </div>
    </>
  );
}
