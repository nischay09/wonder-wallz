/**
 * src/lib/flooring/specs/vinyl/index.ts
 *
 * Phase 2C: Luxury Vinyl Tiles specifications, extracted from
 * docs/flooring-master-dataset.md.
 *
 * Valencia (2.0 mm) has ONE shared specification profile (thickness,
 * wear layer, finish, fire/slip rating, warranty) but each of its two
 * Series — "6×36 Plank" and "12×24 Tile" — differs in plank/tile size,
 * so each Series gets its own specification entry carrying the shared
 * profile plus its own `plankSize`. This mirrors how Malaga's Uni 4.5 /
 * Wood 4.5 / Wood 6.0 series each carry a full, standalone spec object
 * rather than composing a "shared" spec at runtime.
 *
 * Vigo (1.5 mm) has no Series, so it gets a single shared specification.
 */

import type { LuxuryVinylSpecification } from "../../types";

export const VINYL_SPECIFICATIONS: Readonly<Record<string, LuxuryVinylSpecification>> = {
  "valencia-6x36-plank": {
    id: "flooring-spec-valencia-6x36-plank",
    slug: "valencia-6x36-plank",
    title: "Valencia — 6×36 Plank",
    kind: "luxury-vinyl",
    thickness: "2.0 mm",
    wearLayer: "0.15 mm",
    warrantyYears: 10,
    plankSize: "6 x 36",
    description:
      "UV Coating, Matt Finish, Line Embossed. Fire Rating: NFPA Class B1-S1. " +
      "Slip Rating: R9. Performance Class: 34/43. 10 Year Wear Warranty.",
  },
  "valencia-12x24-tile": {
    id: "flooring-spec-valencia-12x24-tile",
    slug: "valencia-12x24-tile",
    title: "Valencia — 12×24 Tile",
    kind: "luxury-vinyl",
    thickness: "2.0 mm",
    wearLayer: "0.15 mm",
    warrantyYears: 10,
    plankSize: "12 x 24",
    description:
      "UV Coating, Matt Finish, Line Embossed. Fire Rating: NFPA Class B1-S1. " +
      "Slip Rating: R9. Performance Class: 34/43. 10 Year Wear Warranty.",
  },
  vigo: {
    id: "flooring-spec-vigo",
    slug: "vigo",
    title: "Vigo",
    kind: "luxury-vinyl",
    thickness: "1.5 mm",
    wearLayer: "0.10 mm",
    warrantyYears: 7,
    description:
      "UV Coating, Matt Finish, Line Embossed. Weight: 2.95 kg/m². " +
      "36 pcs/carton. Coverage: 54 sqft/carton. 7 Year Warranty.",
  },
} as const;
