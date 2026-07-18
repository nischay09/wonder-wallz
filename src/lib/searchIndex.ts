/**
 * src/lib/searchIndex.ts
 *
 * Aggregates all Wonder Wallz site content (products, collections,
 * subcategories) into a single flat array of SearchEntry records.
 *
 * This is the only place that knows about multiple data sources.
 * The search UI (SearchModal) only depends on SearchEntry[] — swap in
 * a backend / Algolia / Elasticsearch later by replacing buildSearchIndex()
 * without touching any UI component.
 */

import { products } from "@/lib/products";
import { collections } from "@/lib/collections";

// ─── Types ────────────────────────────────────────────────────────────────────

export type SearchEntryKind = "product" | "collection" | "subcategory";

export interface SearchEntry {
  /** Stable unique key for React lists */
  id: string;
  /** Display title shown in results */
  title: string;
  /** Short descriptor shown below the title */
  description: string;
  /** Navigates here when the result is selected */
  href: string;
  /** Broad category — used for grouping / badge colouring */
  kind: SearchEntryKind;
  /** Human-readable group label, e.g. "Wallpapers" */
  group: string;
  /**
   * All searchable text for this entry, lowercased and joined.
   * Pre-computed so matching is a simple string.includes() call,
   * no regex or weight logic needed at query time.
   */
  searchText: string;
}

// ─── Builder ──────────────────────────────────────────────────────────────────

export function buildSearchIndex(): SearchEntry[] {
  const entries: SearchEntry[] = [];

  // ── 1. Top-level products ──────────────────────────────────────────────────
  for (const p of products) {
    const base = [p.title, p.slug, p.description, ...(p.tags ?? []), ...(p.materials ?? [])];
    entries.push({
      id: `product-${p.id}`,
      title: p.title,
      description: p.description,
      href: p.href,
      kind: "product",
      group: "Products",
      searchText: base.join(" ").toLowerCase(),
    });

    // ── 2. Product subcategories ─────────────────────────────────────────────
    // NOTE: subcategories don't have their own route — app/collections/[category]
    // is a single-segment dynamic route, there is no [category]/[subcategory]
    // page. `sub.href` (e.g. "/collections/wallpapers/religion") therefore 404s.
    // Search results link to the parent collection page instead; the
    // subcategory's own href stays on the data model for chip-filtering,
    // untouched — this only changes where the search result navigates.
    for (const sub of p.subcategories ?? []) {
      entries.push({
        id: `subcategory-${sub.id}`,
        title: sub.title,
        description: `${p.title} › ${sub.title}`,
        href: p.href,
        kind: "subcategory",
        group: p.title,
        searchText: [sub.title, sub.slug, p.title, p.slug].join(" ").toLowerCase(),
      });
    }
  }

  // ── 3. Collections ────────────────────────────────────────────────────────
  for (const c of collections) {
    entries.push({
      id: `collection-${c.id}`,
      title: c.title,
      description: c.description,
      href: c.href,
      kind: "collection",
      group: "Collections",
      searchText: [c.title, c.slug, c.description, c.heroDescription].join(" ").toLowerCase(),
    });

    // ── 4. Collection subcategories ──────────────────────────────────────────
    // Same routing fix as the product-subcategory loop above: link to the
    // collection page (c.href), not the non-existent subcategory route.
    for (const sub of c.subcategories ?? []) {
      const existingId = `subcategory-${sub.id}`;
      // Avoid duplicating entries already added via products
      if (!entries.find((e) => e.id === existingId)) {
        entries.push({
          id: `col-subcategory-${sub.id}`,
          title: sub.title,
          description: `${c.title} › ${sub.title}`,
          href: c.href,
          kind: "subcategory",
          group: c.title,
          searchText: [sub.title, sub.slug, c.title, c.slug].join(" ").toLowerCase(),
        });
      }
    }
  }

  return entries;
}

// ─── Singleton — built once, reused everywhere ─────────────────────────────

export const searchIndex: SearchEntry[] = buildSearchIndex();

// ─── Query helper ─────────────────────────────────────────────────────────────

/**
 * Returns all SearchEntry records whose `searchText` contains every word
 * in the query (case-insensitive, AND logic). Returns up to `limit` results.
 */
export function querySearchIndex(query: string, limit = 12): SearchEntry[] {
  const terms = query
    .trim()
    .toLowerCase()
    .split(/\s+/)
    .filter(Boolean);

  if (terms.length === 0) return [];

  return searchIndex
    .filter((entry) => terms.every((term) => entry.searchText.includes(term)))
    .slice(0, limit);
}
