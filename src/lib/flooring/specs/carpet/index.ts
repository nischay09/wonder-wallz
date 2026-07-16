/**
 * src/lib/flooring/specs/carpet/index.ts
 *
 * Phase 2D: the master dataset does not list distinct technical
 * specifications (thickness, pile type, tile size, backing) per Carpet
 * Tile collection the way Sports/Vinyl/Laminate do. Bern, Berlin, Tego,
 * and Trento are therefore given ONE shared specification,
 * `carpet-tile-standard`, referenced by all four collections'
 * `specificationId`. This keeps the "specifications are never
 * duplicated" rule intact and avoids inventing per-collection technical
 * data that isn't in the source of truth.
 *
 * If per-collection (or per-series) specs are extracted later, split
 * this into multiple entries and update each collection's
 * `specificationId` accordingly — no other files need to change.
 */

import type { CarpetTileSpecification } from "../../types";

export const CARPET_SPECIFICATIONS: Readonly<Record<string, CarpetTileSpecification>> = {
  "carpet-tile-standard": {
    id: "carpet-tile-standard",
    slug: "carpet-tile-standard",
    title: "Standard Carpet Tile Specification",
    kind: "carpet-tile",
  },
} as const;
