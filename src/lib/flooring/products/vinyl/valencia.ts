/**
 * src/lib/flooring/products/vinyl/valencia.ts
 *
 * Phase 2C: populated from docs/flooring-master-dataset.md.
 *
 * Valencia (2.0 mm) owns two Series — "6×36 Plank" and "12×24 Tile" —
 * each with its own specification (see specs/vinyl/index.ts) and its
 * own set of variants. Per architecture rules, a collection that uses
 * Series does not also carry variants directly, so `variants` is omitted.
 *
 * The master dataset gives variant reference codes as ranges
 * (VAL-201 ... VAL-212, VAL-213, VAL-214) without individual display
 * names. To avoid inventing names not present in the source data, each
 * variant's `displayName` is set to its `referenceCode`.
 */

import type { FlooringCollection, FlooringVariant } from "../../types";

const plankVariants: readonly FlooringVariant[] = [
  "VAL-201",
  "VAL-202",
  "VAL-203",
  "VAL-204",
  "VAL-205",
  "VAL-206",
  "VAL-207",
  "VAL-208",
  "VAL-209",
  "VAL-210",
  "VAL-211",
  "VAL-212",
].map((referenceCode) => {
  const slug = referenceCode.toLowerCase();
  return {
    id: `flooring-luxury-vinyl-valencia-${slug}`,
    slug,
    referenceCode,
    displayName: referenceCode,
    previewImage: `/images/flooring/luxury-vinyl-tiles/valencia/variants/${slug}/preview.webp`,
    lifestyleImage: `/images/flooring/luxury-vinyl-tiles/valencia/variants/${slug}/lifestyle.webp`,
  };
});

const tileVariants: readonly FlooringVariant[] = ["VAL-213", "VAL-214"].map((referenceCode) => {
  const slug = referenceCode.toLowerCase();
  return {
    id: `flooring-luxury-vinyl-valencia-${slug}`,
    slug,
    referenceCode,
    displayName: referenceCode,
    previewImage: `/images/flooring/luxury-vinyl-tiles/valencia/variants/${slug}/preview.webp`,
    lifestyleImage: `/images/flooring/luxury-vinyl-tiles/valencia/variants/${slug}/lifestyle.webp`,
  };
});

export const valencia: FlooringCollection = {
  id: "flooring-luxury-vinyl-valencia",
  slug: "valencia",
  name: "Valencia",
  category: "luxury-vinyl-tiles",
  description: "Luxury vinyl tile collection, 2.0 mm, available in 6×36 Plank and 12×24 Tile formats.",
  heroImage: "/images/flooring/luxury-vinyl-tiles/valencia/hero.webp",
  galleryImages: [
    "/images/flooring/luxury-vinyl-tiles/valencia/gallery/1.webp",
    "/images/flooring/luxury-vinyl-tiles/valencia/gallery/2.webp",
  ],
  applications: [],
  // No single shared specification is attached at the collection level —
  // Valencia's two Series each define their own specificationId instead.
  specificationId: "",
  series: [
    {
      id: "flooring-luxury-vinyl-valencia-6x36-plank",
      slug: "6x36-plank",
      name: "6×36 Plank",
      specificationId: "valencia-6x36-plank",
      variants: plankVariants,
    },
    {
      id: "flooring-luxury-vinyl-valencia-12x24-tile",
      slug: "12x24-tile",
      name: "12×24 Tile",
      specificationId: "valencia-12x24-tile",
      variants: tileVariants,
    },
  ],
  customerActionsEnabled: false,
};
