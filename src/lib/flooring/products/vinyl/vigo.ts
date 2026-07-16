/**
 * src/lib/flooring/products/vinyl/vigo.ts
 *
 * Phase 2C: populated from docs/flooring-master-dataset.md.
 *
 * Vigo (1.5 mm) does not use the Series level — it owns its variants
 * directly, same pattern as Bern in Carpet Tiles.
 *
 * The master dataset gives variant reference codes as a range
 * (VIG-151 through VIG-162) without individual display names. To avoid
 * inventing names not present in the source data, each variant's
 * `displayName` is set to its `referenceCode`.
 */

import type { FlooringCollection, FlooringVariant } from "../../types";

const variants: readonly FlooringVariant[] = [
  "VIG-151",
  "VIG-152",
  "VIG-153",
  "VIG-154",
  "VIG-155",
  "VIG-156",
  "VIG-157",
  "VIG-158",
  "VIG-159",
  "VIG-160",
  "VIG-161",
  "VIG-162",
].map((referenceCode) => {
  const slug = referenceCode.toLowerCase();
  return {
    id: `flooring-luxury-vinyl-vigo-${slug}`,
    slug,
    referenceCode,
    displayName: referenceCode,
    previewImage: `/images/flooring/luxury-vinyl-tiles/vigo/variants/${slug}/preview.webp`,
    lifestyleImage: `/images/flooring/luxury-vinyl-tiles/vigo/variants/${slug}/lifestyle.webp`,
  };
});

export const vigo: FlooringCollection = {
  id: "flooring-luxury-vinyl-vigo",
  slug: "vigo",
  name: "Vigo",
  category: "luxury-vinyl-tiles",
  description: "Luxury vinyl tile collection, 1.5 mm.",
  heroImage: "/images/flooring/luxury-vinyl-tiles/vigo/hero.webp",
  galleryImages: [
    "/images/flooring/luxury-vinyl-tiles/vigo/gallery/1.webp",
    "/images/flooring/luxury-vinyl-tiles/vigo/gallery/2.webp",
  ],
  applications: [],
  specificationId: "vigo",
  variants,
  customerActionsEnabled: false,
};
