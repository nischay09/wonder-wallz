/**
 * src/lib/flooring/products/sports/malaga.ts
 *
 * Phase 2B: Malaga is the reference implementation for the Sports
 * Flooring architecture's optional Series level.
 *
 * Series → Specification mapping (see specs/sports/index.ts):
 *   Uni 4.5   → sports-malaga-uni-4-5
 *   Wood 4.5  → sports-malaga-wood-4-5
 *   Wood 6.0  → sports-malaga-wood-6-0
 *
 * Applications and description are populated from
 * flooring-master-dataset.md. Image paths remain placeholders (no
 * real assets exist yet) but now follow the master dataset's image
 * convention: hero.webp / gallery/* at the Collection level,
 * preview.webp / lifestyle.webp at the Variant level.
 */

import type { FlooringCollection } from "../../types";

export const malaga: FlooringCollection = {
  id: "flooring-sports-malaga",
  slug: "malaga",
  name: "Malaga",
  category: "sports-flooring",
  description:
    "Sports flooring collection suitable for badminton, basketball, table tennis, volleyball, gymnasium, and educational facility applications.",
  heroImage: "/flooring/sports/malaga/hero.webp",
  galleryImages: [
    "/flooring/sports/malaga/gallery/1.webp",
    "/flooring/sports/malaga/gallery/2.webp",
  ],
  applications: [
    "Badminton",
    "Basketball",
    "Table Tennis",
    "Volleyball",
    "Gymnasium",
    "Educational Facilities",
  ],
  // Malaga uses the Series level, so no collection-level specificationId.
  specificationId: "",
  series: [
    {
      id: "flooring-sports-malaga-uni-4-5",
      slug: "uni-4-5",
      name: "Uni 4.5",
      specificationId: "sports-malaga-uni-4-5",
      variants: [
        {
          id: "flooring-sports-malaga-uni-4-5-6711",
          slug: "6711-silver-grey",
          referenceCode: "6711",
          displayName: "Silver Grey",
          previewImage: "/flooring/sports/malaga/uni-4-5/6711-silver-grey/preview.webp",
          lifestyleImage: "/flooring/sports/malaga/uni-4-5/6711-silver-grey/lifestyle.webp",
        },
        {
          id: "flooring-sports-malaga-uni-4-5-6402",
          slug: "6402-sky-blue",
          referenceCode: "6402",
          displayName: "Sky Blue",
          previewImage: "/flooring/sports/malaga/uni-4-5/6402-sky-blue/preview.webp",
          lifestyleImage: "/flooring/sports/malaga/uni-4-5/6402-sky-blue/lifestyle.webp",
        },
        {
          id: "flooring-sports-malaga-uni-4-5-6154",
          slug: "6154-red",
          referenceCode: "6154",
          displayName: "Red",
          previewImage: "/flooring/sports/malaga/uni-4-5/6154-red/preview.webp",
          lifestyleImage: "/flooring/sports/malaga/uni-4-5/6154-red/lifestyle.webp",
        },
        {
          id: "flooring-sports-malaga-uni-4-5-6563",
          slug: "6563-mint-green",
          referenceCode: "6563",
          displayName: "Mint Green",
          previewImage: "/flooring/sports/malaga/uni-4-5/6563-mint-green/preview.webp",
          lifestyleImage: "/flooring/sports/malaga/uni-4-5/6563-mint-green/lifestyle.webp",
        },
        {
          id: "flooring-sports-malaga-uni-4-5-6450",
          slug: "6450-bright-blue",
          referenceCode: "6450",
          displayName: "Bright Blue",
          previewImage: "/flooring/sports/malaga/uni-4-5/6450-bright-blue/preview.webp",
          lifestyleImage: "/flooring/sports/malaga/uni-4-5/6450-bright-blue/lifestyle.webp",
        },
      ],
    },
    {
      id: "flooring-sports-malaga-wood-4-5",
      slug: "wood-4-5",
      name: "Wood 4.5",
      specificationId: "sports-malaga-wood-4-5",
      variants: [
        {
          id: "flooring-sports-malaga-wood-4-5-6058",
          slug: "6058-american-oak",
          referenceCode: "6058",
          displayName: "American Oak",
          previewImage: "/flooring/sports/malaga/wood-4-5/6058-american-oak/preview.webp",
          lifestyleImage: "/flooring/sports/malaga/wood-4-5/6058-american-oak/lifestyle.webp",
        },
        {
          id: "flooring-sports-malaga-wood-4-5-6375",
          slug: "6375-oak",
          referenceCode: "6375",
          displayName: "Oak",
          previewImage: "/flooring/sports/malaga/wood-4-5/6375-oak/preview.webp",
          lifestyleImage: "/flooring/sports/malaga/wood-4-5/6375-oak/lifestyle.webp",
        },
        {
          id: "flooring-sports-malaga-wood-4-5-6068",
          slug: "6068-wood-chocolate",
          referenceCode: "6068",
          displayName: "Wood Chocolate",
          previewImage: "/flooring/sports/malaga/wood-4-5/6068-wood-chocolate/preview.webp",
          lifestyleImage: "/flooring/sports/malaga/wood-4-5/6068-wood-chocolate/lifestyle.webp",
        },
      ],
    },
    {
      id: "flooring-sports-malaga-wood-6-0",
      slug: "wood-6-0",
      name: "Wood 6.0",
      specificationId: "sports-malaga-wood-6-0",
      variants: [
        {
          id: "flooring-sports-malaga-wood-6-0-6381",
          slug: "6381-maple",
          referenceCode: "6381",
          displayName: "Maple",
          previewImage: "/flooring/sports/malaga/wood-6-0/6381-maple/preview.webp",
          lifestyleImage: "/flooring/sports/malaga/wood-6-0/6381-maple/lifestyle.webp",
        },
      ],
    },
  ],
  customerActionsEnabled: false,
};
