/**
 * Wonder Wallz — Collection Catalog Data
 * -------------------------------------------------------------------------
 * Single source of truth for every collection across the site.
 *
 * Consumed by (current + planned):
 *  - Homepage "Explore Our Collections" section (components/collections/FeaturedCollections.tsx)
 *  - Navbar "Collections" dropdown
 *  - /collections/[slug] landing pages
 *  - Product browsing / filtering
 *  - Future "Add to Quote" flow
 *
 * Keep this file framework-agnostic (no JSX, no client-only APIs) so it can
 * be imported from server components, client components, route handlers,
 * and metadata generators alike.
 */

export type CollectionCategory = "wallpapers" | "other-products";

export interface Collection {
  /** Stable unique identifier, used as React key and for lookups */
  id: string;
  /** Display name, e.g. "Wonder Collection" */
  name: string;
  /** Top-level grouping used to render section headers / nav groups */
  category: CollectionCategory;
  /** Number of designs currently in the collection (0 for Coming Soon lines) */
  designCount: number;
  /** Short editorial description, one sentence, shown on the card */
  description: string;
  /**
   * Cover photo for the collection card. Recommended source spec:
   * portrait orientation, 4:5, min. 1600×2000px, JPG/WebP, color-true to
   * the collection. Place files under /public/images/collections/.
   */
  coverImage: string;
  /** URL slug used for /collections/[slug] and nav links */
  slug: string;
  /** True for product lines that are announced but not yet browsable */
  comingSoon: boolean;
}

export const collections: Collection[] = [
  // ---------------------------------------------------------------------
  // Wallpapers
  // ---------------------------------------------------------------------
  {
    id: "wonder",
    name: "Wonder Collection",
    category: "wallpapers",
    designCount: 109,
    description:
      "Our flagship line — bold textures and statement motifs for spaces that lead the room.",
    coverImage: "/Wonder/9.webp",
    slug: "wonder-collection",
    comingSoon: false,
  },
  {
    id: "religion",
    name: "Religion Collection",
    category: "wallpapers",
    designCount: 108,
    description:
      "Sacred motifs and devotional art, rendered with the care a prayer space deserves.",
    coverImage: "/Religion/10.webp",
    slug: "religion-collection",
    comingSoon: false,
  },
  {
    id: "wall-murals",
    name: "Wall Murals",
    category: "wallpapers",
    designCount: 96,
    description:
      "Large-format scenes that turn a single wall into the focal point of the room.",
    coverImage: "/Wall mural/10.webp",
    slug: "wall-murals",
    comingSoon: false,
  },
  {
    id: "kids",
    name: "Kids Collection",
    category: "wallpapers",
    designCount: 57,
    description:
      "Playful worlds for young rooms, designed to delight without overwhelming.",
    coverImage: "/KIDS Collection/10.webp",
    slug: "kid collection",
    comingSoon: false,
  },
  {
    id: "art",
    name: "Art Collection",
    category: "wallpapers",
    designCount: 50,
    description:
      "Gallery-inspired prints for walls that are meant to be looked at, not just lived with.",
    coverImage: "/art/10.webp",
    slug: "art-collection",
    comingSoon: false,
  },
  {
    id: "3d-wall-murals",
    name: "3D Wall Murals",
    category: "wallpapers",
    designCount: 44,
    description:
      "Dimensional illusion that gives flat walls depth, perspective, and presence.",
    coverImage: "/3D wall mural/10.webp",
    slug: "3d-wall-murals",
    comingSoon: false,
  },

  // ---------------------------------------------------------------------
  // Other Product Categories — coming soon
  // ---------------------------------------------------------------------
  {
    id: "blinds",
    name: "Blinds",
    category: "other-products",
    designCount: 0,
    description: "Tailored window dressing, designed to match your wallpaper story.",
    coverImage: "/Blind.jpg",
    slug: "blinds",
    comingSoon: true,
  },
  {
    id: "glass-films",
    name: "Glass Films",
    category: "other-products",
    designCount: 0,
    description: "Decorative frosting and films for glass partitions, doors, and windows.",
    coverImage: "/Glass-Film.jpg",
    slug: "glass-films",
    comingSoon: true,
  },
  {
    id: "wooden-flooring",
    name: "Wooden Flooring",
    category: "other-products",
    designCount: 0,
    description: "Warm, grounded finishes to carry your interior story underfoot.",
    coverImage: "/Wooden-Floor.jpg",
    slug: "wooden-flooring",
    comingSoon: true,
  },
  {
    id: "pvc-flooring",
    name: "PVC Flooring",
    category: "other-products",
    designCount: 0,
    description: "Durable, water-resistant flooring built for everyday rooms.",
    coverImage: "/PVC-Flooring.jpg",
    slug: "pvc-flooring",
    comingSoon: true,
  },
];

export const getCollectionsByCategory = (category: CollectionCategory): Collection[] =>
  collections.filter((c) => c.category === category);

export const getCollectionBySlug = (slug: string): Collection | undefined =>
  collections.find((c) => c.slug === slug);

export const getAvailableCollections = (): Collection[] =>
  collections.filter((c) => !c.comingSoon);
