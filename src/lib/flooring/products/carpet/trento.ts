/**
 * src/lib/flooring/products/carpet/trento.ts
 *
 * Phase 2D: populated from the master dataset.
 *
 * Trento has no Series — variants attach directly to the collection.
 * (The Phase 2A placeholder used `series: []`; corrected here per the
 * master dataset and architecture doc, which both list Trento alongside
 * Bern/Berlin/Tego as collections that skip Series.)
 */

import type { FlooringCollection } from "../../types";

export const trento: FlooringCollection = {
  id: "flooring-carpet-tiles-trento",
  slug: "trento",
  name: "Trento",
  category: "carpet-tiles",
  description: "Commercial carpet tile collection.",
  heroImage: "/images/flooring/carpet-tiles/trento/hero.webp",
  galleryImages: [
    "/images/flooring/carpet-tiles/trento/gallery/1.webp",
    "/images/flooring/carpet-tiles/trento/gallery/2.webp",
  ],
  applications: [],
  specificationId: "carpet-tile-standard",
  variants: [
    {
      id: "flooring-carpet-tiles-trento-2000",
      slug: "grey",
      referenceCode: "2000",
      displayName: "Grey",
      previewImage: "/images/flooring/carpet-tiles/trento/variants/grey/preview.webp",
      lifestyleImage: "/images/flooring/carpet-tiles/trento/variants/grey/lifestyle.webp",
    },
    {
      id: "flooring-carpet-tiles-trento-2001",
      slug: "carbon",
      referenceCode: "2001",
      displayName: "Carbon",
      previewImage: "/images/flooring/carpet-tiles/trento/variants/carbon/preview.webp",
      lifestyleImage: "/images/flooring/carpet-tiles/trento/variants/carbon/lifestyle.webp",
    },
    {
      id: "flooring-carpet-tiles-trento-2002",
      slug: "ocean-blue",
      referenceCode: "2002",
      displayName: "Ocean Blue",
      previewImage: "/images/flooring/carpet-tiles/trento/variants/ocean-blue/preview.webp",
      lifestyleImage: "/images/flooring/carpet-tiles/trento/variants/ocean-blue/lifestyle.webp",
    },
    {
      id: "flooring-carpet-tiles-trento-2003",
      slug: "charcoal",
      referenceCode: "2003",
      displayName: "Charcoal",
      previewImage: "/images/flooring/carpet-tiles/trento/variants/charcoal/preview.webp",
      lifestyleImage: "/images/flooring/carpet-tiles/trento/variants/charcoal/lifestyle.webp",
    },
    {
      id: "flooring-carpet-tiles-trento-2004",
      slug: "navy",
      referenceCode: "2004",
      displayName: "Navy",
      previewImage: "/images/flooring/carpet-tiles/trento/variants/navy/preview.webp",
      lifestyleImage: "/images/flooring/carpet-tiles/trento/variants/navy/lifestyle.webp",
    },
    {
      id: "flooring-carpet-tiles-trento-2005",
      slug: "chestnut",
      referenceCode: "2005",
      displayName: "Chestnut",
      previewImage: "/images/flooring/carpet-tiles/trento/variants/chestnut/preview.webp",
      lifestyleImage: "/images/flooring/carpet-tiles/trento/variants/chestnut/lifestyle.webp",
    },
  ],
  customerActionsEnabled: false,
};
