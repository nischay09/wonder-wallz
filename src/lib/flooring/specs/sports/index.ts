/**
 * src/lib/flooring/specs/sports/index.ts
 *
 * Phase 2B (enriched): specification data extracted from
 * flooring-master-dataset.md, Sports Flooring → Malaga section.
 *
 * Roll Width / Roll Length / Weight are part of the extracted data
 * but have no dedicated field on `SportsFlooringSpecification` (and
 * per this phase's scope, `types.ts` is not being modified), so
 * they're captured in `description` rather than invented as new
 * typed fields. `system`, `shockAbsorption`, and `suitableFor` were
 * not present in the extracted dataset and remain omitted rather
 * than guessed.
 */

import type { SportsFlooringSpecification } from "../../types";

export const SPORTS_SPECIFICATIONS: Readonly<Record<string, SportsFlooringSpecification>> = {
  "sports-malaga-uni-4-5": {
    id: "sports-malaga-uni-4-5",
    slug: "uni-4-5",
    title: "Uni 4.5",
    description: "Roll width 1.8 m, roll length 20 m, weight 2900 g/m².",
    kind: "sports",
    thickness: "4.5 mm",
    wearLayer: "1.4 mm",
    warrantyYears: 8,
  },
  "sports-malaga-wood-4-5": {
    id: "sports-malaga-wood-4-5",
    slug: "wood-4-5",
    title: "Wood 4.5",
    description: "Roll width 1.8 m, roll length 20 m, weight 2900 g/m².",
    kind: "sports",
    thickness: "4.5 mm",
    wearLayer: "1.4 mm",
    warrantyYears: 8,
  },
  "sports-malaga-wood-6-0": {
    id: "sports-malaga-wood-6-0",
    slug: "wood-6-0",
    title: "Wood 6.0",
    description: "Roll width 1.8 m, roll length 15 m, weight 4200 g/m².",
    kind: "sports",
    thickness: "6.0 mm",
    wearLayer: "1.5 mm",
    warrantyYears: 8,
  },
} as const;
