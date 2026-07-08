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
import { CollectionPagination } from "@/components/Collection";
import { CollectionExplorer } from "@/components/Collection/CollectionExplorer";

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

  const { productCount } = collection;

  return (
    <div className="min-h-screen bg-neutral-50">
      {/* ── CollectionExplorer renders Hero + Filters + Grid together ── */}
      {/* (Hero lives inside CollectionExplorer so its category chips can
          share `activeCategory` state with the filters for collections
          with `unifiedCategoryNav` — see CollectionExplorer.tsx.) */}
      <CollectionExplorer collection={collection} />

      {/* ── Pagination — UI only ── */}
      <div className="container-site">
        <div className="mt-10 pb-10 md:pb-14">
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
