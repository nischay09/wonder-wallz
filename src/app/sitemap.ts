import type { MetadataRoute } from "next";
import { collections } from "@/lib/collections";
import { BASE_URL } from "@/lib/site";

/**
 * app/sitemap.ts
 *
 * Next.js App Router native sitemap (replaces a static sitemap.xml).
 * Rendered at /sitemap.xml automatically at build/request time.
 *
 * Collection URLs are pulled directly from `src/lib/collections.ts`
 * (the single source of truth used by `generateStaticParams` in
 * app/collections/[category]/page.tsx) so this file never drifts out of
 * sync with what's actually routable — adding a collection there adds it
 * here with zero further changes.
 *
 * NOTE: Collection *subcategories* (e.g. "/collections/wallpapers/religion")
 * are intentionally NOT included. They are in-page filter chips, not
 * separate routes — see the `unifiedCategoryNav` doc comment in
 * collections.ts ("filter the grid in place instead of linking to a
 * (non-existent) subcategory route"). Adding them here would submit 404s
 * to search engines.
 *
 * BASE_URL now comes from src/lib/site.ts (single source of truth) instead
 * of being redeclared locally.
 */

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();

  const staticRoutes: MetadataRoute.Sitemap = [
    {
      url: BASE_URL,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 1,
    },
    {
      url: `${BASE_URL}/collections`,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 0.9,
    },
    {
      url: `${BASE_URL}/custom-design`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${BASE_URL}/contact`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.6,
    },
  ];

  const collectionRoutes: MetadataRoute.Sitemap = collections.map((c) => ({
    url: `${BASE_URL}/collections/${c.slug}`,
    lastModified: now,
    changeFrequency: "weekly",
    priority: 0.8,
  }));

  return [...staticRoutes, ...collectionRoutes];
}
