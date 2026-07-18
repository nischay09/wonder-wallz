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
 *
 * CONSULTATION PRODUCTS ARE A SPECIAL CASE (intentional product decision):
 *   Blinds, Curtains, Flooring, and Upholstery are consultation-driven, not
 *   e-commerce, so their routes render a dedicated ProductLandingPage
 *   (via a thin per-product wrapper, see LANDING_PAGES below) instead of
 *   the CollectionExplorer catalogue browser — no product grid, no Quick
 *   View, no product pages. Their registries/products/subcategories in
 *   collections.ts remain fully intact for future use; these routes simply
 *   don't put them on screen today. See the wrapper components under
 *   src/components/Product/ (and src/components/Flooring/ for flooring)
 *   for the replacement experience.
 *
 *   Canvas Prints is different again: it's a CUSTOM product (not
 *   consultation), so it renders CustomProductLandingPage (via
 *   CanvasLandingPage, see src/components/Canvas/) instead of
 *   ProductLandingPage — same LANDING_PAGES lookup map, different
 *   underlying journey (no catalogue-at-home step).
 */

import type { Metadata } from "next";
import type { ReactElement } from "react";
import { notFound } from "next/navigation";
import {
  collections,
  getCollectionBySlug,
} from "@/lib/collections";
import { CollectionPagination } from "@/components/Collection";
import { CollectionExplorer } from "@/components/Collection/CollectionExplorer";
import { FlooringLandingPage } from "@/components/Flooring/FlooringLandingPage";
import { CanvasLandingPage } from "@/components/Canvas/CanvasLandingPage";
import { GlassFilmLandingPage } from "@/components/GlassFilms/GlassFilmLandingPage";
import { BlindsLandingPage } from "@/components/Blinds/BlindsLandingPage";
import { CurtainsLandingPage } from "@/components/Curtains/CurtainsLandingPage";
import { UpholsteryLandingPage } from "@/components/Upholstery/UpholsteryLandingPage";
import type { Collection } from "@/lib/collections";

// ─── Consultation-product landing pages ──────────────────────────────────────
// Any collection slug in this map renders its dedicated landing page instead
// of the CollectionExplorer catalogue browser. To add a new consultation
// product, add its slug + wrapper component here — no other changes needed.
const LANDING_PAGES: Record<
  string,
  (props: { collection: Collection }) =>ReactElement
> = {
  flooring: FlooringLandingPage,
  "canvas-prints": CanvasLandingPage,
  "glass-films": GlassFilmLandingPage,
  blinds: BlindsLandingPage,
  curtains: CurtainsLandingPage,
  upholstery: UpholsteryLandingPage,
};

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

  const canonicalPath = `/collections/${collection.slug}`;

  return {
    title: `${collection.title} — ${collection.description}`,
    description: collection.heroDescription,
    // Was missing entirely: without this, Google could index duplicate/
    // paginated/filtered variants of each collection URL as separate pages.
    alternates: { canonical: canonicalPath },
    openGraph: {
      title: `${collection.title} | Wonder Wallz`,
      description: collection.heroDescription,
      url: `https://wonderwallz.in${canonicalPath}`,
      siteName: "Wonder Wallz",
      type: "website",
      locale: "en_IN",
      images: [{ url: collection.coverImage, width: 1200, height: 630, alt: collection.title }],
    },
    // Was missing entirely on every collection page.
    twitter: {
      card: "summary_large_image",
      title: `${collection.title} | Wonder Wallz`,
      description: collection.heroDescription,
      images: [collection.coverImage],
    },
    robots: {
      index: true,
      follow: true,
      googleBot: { index: true, follow: true, "max-image-preview": "large" },
    },
  };
}

// ─── JSON-LD helpers ────────────────────────────────────────────────────────

// Collections that are consultation-driven (or, for canvas-prints, custom
// per-project) don't have a fixed SKU/price the way a catalogue item would —
// Service accurately reflects "we'll scope this with you", Product does not.
// This mirrors the LANDING_PAGES map above 1:1, so it stays in sync if a new
// consultation product is added there.
const SERVICE_COLLECTIONS = new Set(Object.keys(LANDING_PAGES));

function buildJsonLd(collection: Collection) {
  const canonicalUrl = `https://wonderwallz.in/collections/${collection.slug}`;

  const breadcrumb = {
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: "https://wonderwallz.in" },
      {
        "@type": "ListItem",
        position: 2,
        name: "Collections",
        item: "https://wonderwallz.in/collections",
      },
      {
        "@type": "ListItem",
        position: 3,
        name: collection.title,
        item: canonicalUrl,
      },
    ],
  };

  const graph: Record<string, unknown>[] = [breadcrumb];

  if (SERVICE_COLLECTIONS.has(collection.slug)) {
    // Consultation / bespoke-project collections → Service.
    graph.push({
      "@type": "Service",
      "@id": `${canonicalUrl}#service`,
      name: collection.title,
      description: collection.heroDescription,
      serviceType: collection.title,
      provider: { "@id": "https://wonderwallz.in/#business" },
      areaServed: "IN",
      url: canonicalUrl,
    });
  }
  // Catalogue/browse collections (e.g. Wallpapers) intentionally get no
  // Product or ItemList entries here: individual product/price/availability
  // data isn't available at this layer, and fabricating it would violate
  // Schema.org's structured-data guidelines. Only real per-product markup
  // (added on individual product pages, if/when those exist) should carry
  // Product schema for these.

  return { "@context": "https://schema.org", "@graph": graph };
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

  const jsonLd = buildJsonLd(collection);

  // ── Consultation products: dedicated landing page, not a catalogue browser ──
  const LandingPage = LANDING_PAGES[collection.slug];
  if (LandingPage) {
    return (
      <>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <LandingPage collection={collection} />
      </>
    );
  }

  const { productCount } = collection;

  return (
    <div className="min-h-screen bg-neutral-50">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
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
