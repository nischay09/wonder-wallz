/**
 * src/lib/flooring/registry.ts
 *
 * Single source of truth registering every flooring collection.
 *
 * Phase 2A: collection data now lives one-file-per-collection under
 * `products/<category>/`, grouped by flooring category and exposed
 * through each category's `index.ts`. This file's only job is to
 * assemble those exports into the keyed `FLOORING_REGISTRY` lookup —
 * it should never define collection data inline.
 *
 * Future routing/pages should import from `helpers.ts` — never
 * hardcode a collection slug anywhere else, and never import from
 * `products/` directly.
 */

import type { FlooringCollection } from "./types";
import { malaga } from "./products/sports";
import { valencia, vigo } from "./products/vinyl";
import { venice } from "./products/laminate";
import { bern, berlin, trento, tego } from "./products/carpet";

/**
 * `FLOORING_REGISTRY` is keyed by collection slug for O(1) lookup.
 * `helpers.ts` is the only place this should be read from directly;
 * everything else should go through the helper functions.
 */
export const FLOORING_REGISTRY: Readonly<Record<string, FlooringCollection>> = {
  malaga,
  trento,
  valencia,
  vigo,
  venice,
  tego,
  bern,
  berlin,
} as const;

/** All registered collection slugs, derived from the registry object. */
export const FLOORING_COLLECTION_SLUGS: readonly string[] = Object.keys(FLOORING_REGISTRY);
