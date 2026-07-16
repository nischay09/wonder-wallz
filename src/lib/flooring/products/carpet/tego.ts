/**
 * src/lib/flooring/products/carpet/tego.ts
 *
 * Phase 2D: populated from the master dataset.
 *
 * Tego has no Series — variants attach directly to the collection.
 * (The Phase 2A placeholder used `series: []`; corrected here per the
 * master dataset and architecture doc, which both list Tego alongside
 * Bern/Berlin/Trento as collections that skip Series.)
 */

import type { FlooringCollection } from "../../types";

export const tego: FlooringCollection = {
  id: "flooring-carpet-tiles-tego",
  slug: "tego",
  name: "Tego",
  category: "carpet-tiles",
  description: "Carpet tile collection in cool greys with a blue and beige accent.",
  heroImage: "/images/flooring/carpet-tiles/tego/hero.webp",
  galleryImages: [
    "/images/flooring/carpet-tiles/tego/gallery/1.webp",
    "/images/flooring/carpet-tiles/tego/gallery/2.webp",
  ],
  applications: [],
  specificationId: "carpet-tile-standard",
  variants: [
    {
      id: "flooring-carpet-tiles-tego-1000",
      slug: "light-grey",
      referenceCode: "1000",
      displayName: "Light Grey",
      previewImage: "/images/flooring/carpet-tiles/tego/variants/light-grey/preview.webp",
      lifestyleImage: "/images/flooring/carpet-tiles/tego/variants/light-grey/lifestyle.webp",
    },
    {
      id: "flooring-carpet-tiles-tego-1001",
      slug: "medium-grey",
      referenceCode: "1001",
      displayName: "Medium Grey",
      previewImage: "/images/flooring/carpet-tiles/tego/variants/medium-grey/preview.webp",
      lifestyleImage: "/images/flooring/carpet-tiles/tego/variants/medium-grey/lifestyle.webp",
    },
    {
      id: "flooring-carpet-tiles-tego-1002",
      slug: "charcoal",
      referenceCode: "1002",
      displayName: "Charcoal",
      previewImage: "/images/flooring/carpet-tiles/tego/variants/charcoal/preview.webp",
      lifestyleImage: "/images/flooring/carpet-tiles/tego/variants/charcoal/lifestyle.webp",
    },
    {
      id: "flooring-carpet-tiles-tego-1003",
      slug: "blue",
      referenceCode: "1003",
      displayName: "Blue",
      previewImage: "/images/flooring/carpet-tiles/tego/variants/blue/preview.webp",
      lifestyleImage: "/images/flooring/carpet-tiles/tego/variants/blue/lifestyle.webp",
    },
    {
      id: "flooring-carpet-tiles-tego-1004",
      slug: "beige",
      referenceCode: "1004",
      displayName: "Beige",
      previewImage: "/images/flooring/carpet-tiles/tego/variants/beige/preview.webp",
      lifestyleImage: "/images/flooring/carpet-tiles/tego/variants/beige/lifestyle.webp",
    },
  ],
  customerActionsEnabled: false,
};
