/**
 * src/lib/flooring/products/carpet/berlin.ts
 *
 * Phase 2D: populated from the master dataset.
 *
 * Berlin has no Series — variants attach directly to the collection.
 */

import type { FlooringCollection } from "../../types";

export const berlin: FlooringCollection = {
  id: "flooring-carpet-tiles-berlin",
  slug: "berlin",
  name: "Berlin",
  category: "carpet-tiles",
  description: "Carpet tile collection in a neutral greyscale palette with warm accents.",
  heroImage: "/images/flooring/carpet-tiles/berlin/hero.webp",
  galleryImages: [
    "/images/flooring/carpet-tiles/berlin/gallery/1.webp",
    "/images/flooring/carpet-tiles/berlin/gallery/2.webp",
  ],
  applications: [],
  specificationId: "carpet-tile-standard",
  variants: [
    {
      id: "flooring-carpet-tiles-berlin-7001",
      slug: "beige",
      referenceCode: "7001",
      displayName: "Beige",
      previewImage: "/images/flooring/carpet-tiles/berlin/variants/beige/preview.webp",
      lifestyleImage: "/images/flooring/carpet-tiles/berlin/variants/beige/lifestyle.webp",
    },
    {
      id: "flooring-carpet-tiles-berlin-7002",
      slug: "brown",
      referenceCode: "7002",
      displayName: "Brown",
      previewImage: "/images/flooring/carpet-tiles/berlin/variants/brown/preview.webp",
      lifestyleImage: "/images/flooring/carpet-tiles/berlin/variants/brown/lifestyle.webp",
    },
    {
      id: "flooring-carpet-tiles-berlin-7004",
      slug: "light-grey",
      referenceCode: "7004",
      displayName: "Light Grey",
      previewImage: "/images/flooring/carpet-tiles/berlin/variants/light-grey/preview.webp",
      lifestyleImage: "/images/flooring/carpet-tiles/berlin/variants/light-grey/lifestyle.webp",
    },
    {
      id: "flooring-carpet-tiles-berlin-7005",
      slug: "medium-grey",
      referenceCode: "7005",
      displayName: "Medium Grey",
      previewImage: "/images/flooring/carpet-tiles/berlin/variants/medium-grey/preview.webp",
      lifestyleImage: "/images/flooring/carpet-tiles/berlin/variants/medium-grey/lifestyle.webp",
    },
    {
      id: "flooring-carpet-tiles-berlin-7006",
      slug: "dark-grey",
      referenceCode: "7006",
      displayName: "Dark Grey",
      previewImage: "/images/flooring/carpet-tiles/berlin/variants/dark-grey/preview.webp",
      lifestyleImage: "/images/flooring/carpet-tiles/berlin/variants/dark-grey/lifestyle.webp",
    },
  ],
  customerActionsEnabled: false,
};
