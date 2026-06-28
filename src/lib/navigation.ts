/**
 * src/lib/navigation.ts
 *
 * The site's primary navigation structure — and ONLY that. Product
 * information lives in `src/lib/products.ts`; this file just describes
 * which links appear in the navbar (and in what order), independent of
 * what any individual link points to.
 *
 * The "Collections" entry is marked `type: "mega-menu"` so the Navbar
 * knows to render it as the products mega-menu (sourced from
 * `products.ts`) instead of a plain link. Everything else renders as a
 * standard nav link.
 *
 * To reorder, rename, add, or remove a nav item, edit ONLY this file.
 */

export interface NavItem {
  /** Text shown in the navbar */
  label: string;
  /** Route the link points to */
  href: string;
  /**
   * "link"      -> plain nav link (default)
   * "mega-menu" -> opens the products mega-menu / mobile accordion,
   *                whose content comes from src/lib/products.ts
   */
  type?: "link" | "mega-menu";
}

export const primaryNavigation: NavItem[] = [
  { label: "Collections", href: "/collections", type: "mega-menu" },
  { label: "Custom Upload", href: "/custom-design", type: "link" },
  { label: "Inspiration", href: "/inspiration", type: "link" },
  { label: "About Us", href: "/about", type: "link" },
  { label: "Contact", href: "/contact", type: "link" },
];

/** The single mega-menu entry (currently "Collections"), if any. */
export function getMegaMenuNavItem(): NavItem | undefined {
  return primaryNavigation.find((item) => item.type === "mega-menu");
}

/** Every plain nav link, in order — i.e. everything except the mega-menu. */
export function getStandardNavLinks(): NavItem[] {
  return primaryNavigation.filter((item) => item.type !== "mega-menu");
}
