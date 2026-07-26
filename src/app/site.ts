/**
 * src/lib/site.ts
 *
 * Single source of truth for the production domain. Previously
 * "https://thewonderwallz.com" was hardcoded independently in
 * app/layout.tsx (metadataBase), app/robots.ts, app/sitemap.ts, and inline
 * JSON-LD in several page files — five+ places that could drift out of
 * sync. Import BASE_URL from here instead of re-typing the literal.
 */
export const BASE_URL = "https://thewonderwallz.com";
