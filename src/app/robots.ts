import type { MetadataRoute } from "next";
import { BASE_URL } from "@/lib/site";

/**
 * app/robots.ts
 *
 * Next.js App Router native robots file (replaces a static robots.txt).
 * Rendered at /robots.txt automatically.
 *
 * This site currently has no auth-gated app shell, admin panel, or API
 * routes surfaced in the pages reviewed for this audit — everything under
 * app/ is a public marketing/catalogue route. If/when routes like /admin,
 * /api, or a customer account area are added, add their paths to
 * `disallow` below rather than leaving them openly crawlable.
 *
 * BASE_URL now comes from src/lib/site.ts (single source of truth) instead
 * of being redeclared locally — see that file for context.
 */

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      // No known non-public routes as of this audit — see note above.
      // disallow: ["/api/", "/admin/"],
    },
    sitemap: `${BASE_URL}/sitemap.xml`,
    host: BASE_URL,
  };
}
