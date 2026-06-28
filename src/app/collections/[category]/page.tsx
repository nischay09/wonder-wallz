/**
 * app/collections/[category]/page.tsx
 *
 * Single dynamic route powering EVERY Wonder Wallz collection:
 *   /collections/wallpapers
 *   /collections/blinds
 *   /collections/curtains
 *   /collections/flooring
 *   /collections/glass-films
 *   /collections/canvas-prints
 *   /collections/upholstery
 *
 * Data is sourced entirely from src/lib/collections.ts.
 * To add a new collection, edit that file — no new pages needed.
 *
 * TWO WORKFLOWS (architecture ready, UI only for now):
 *   "custom"   → Add to Project   (Wallpapers, Glass Films, Canvas Prints)
 *   "standard" → Enquire on WhatsApp (Blinds, Curtains, Flooring, Upholstery)
 */

import type { Metadata } from "next";
import { notFound } from "next/navigation";
import {
  collections,
  getCollectionBySlug,
} from "@/lib/collections";
import {
  CollectionHero,
  CollectionFilters,
  CollectionGrid,
  CollectionPagination,
} from "@/components/Collection";

// ─── Static params ────────────────────────────────────────────────────────────

/** Pre-render every known collection at build time. */
export function generateStaticParams() {
  return collections.map((c) => ({ category: c.slug }));
}

// ─── Metadata ─────────────────────────────────────────────────────────────────

export async function generateMetadata({
  params,
}: {
  params: Promise<{ category: string }>;
}): Promise<Metadata> {
  const { category } = await params;
  const collection = getCollectionBySlug(category);

  if (!collection) {
    return { title: "Collection Not Found | Wonder Wallz" };
  }

  return {
    title: `${collection.title} — ${collection.description}`,
    description: collection.heroDescription,
    openGraph: {
      title: `${collection.title} | Wonder Wallz`,
      description: collection.heroDescription,
      images: [{ url: collection.coverImage, alt: collection.title }],
    },
  };
}

// ─── Page ─────────────────────────────────────────────────────────────────────

export default async function CollectionPage({
  params,
}: {
  params: Promise<{ category: string }>;
}) {
  const { category } = await params;
  const collection = getCollectionBySlug(category);

  // Unknown slug → 404
  if (!collection) notFound();

  const { products, subcategories, workflow, productCount } = collection;

  return (
    <div className="min-h-screen bg-neutral-50">
      {/* ── 1. Hero (title, description, product count, subcategory chips) ── */}
      <CollectionHero collection={collection} />

      {/* ── Main content ── */}
      <div className="container-site py-10 md:py-14">
        {/* ── 2. Filters (search, sort, category) — UI only ── */}
        <section aria-label="Filter and sort products" className="mb-8">
          <CollectionFilters
            subcategories={subcategories}
            productCount={products.length}
          />
        </section>

        {/* Divider */}
        <hr className="border-neutral-200 mb-8" />

        {/* ── 3. Product grid ── */}
        <section aria-label={`${collection.title} products`}>
          <CollectionGrid products={products} workflow={workflow} />
        </section>

        {/* ── 4. Pagination — UI only ── */}
        <div className="mt-10">
          <CollectionPagination
            totalItems={productCount}
            itemsPerPage={12}
            ariaLabel={`${collection.title} collection pages`}
          />
        </div>
      </div>
    </div>
  );
}
