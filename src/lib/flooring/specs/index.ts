/**
 * src/lib/flooring/specs/index.ts
 *
 * Merges every category's specification map into one lookup table,
 * keyed by specification id. This is the ONLY export `helpers.ts`
 * should import from `specs/`.
 *
 * To add a new specification: add it to the relevant category's
 * `index.ts` map (e.g. `specs/sports/index.ts`). Nothing here needs
 * to change.
 */

import type { AnyFlooringSpecification } from "../types";
import { SPORTS_SPECIFICATIONS } from "./sports";
import { VINYL_SPECIFICATIONS } from "./vinyl";
import { LAMINATE_SPECIFICATIONS } from "./laminate";
import { CARPET_SPECIFICATIONS } from "./carpet";

export const FLOORING_SPECIFICATIONS: Readonly<Record<string, AnyFlooringSpecification>> = {
  ...SPORTS_SPECIFICATIONS,
  ...VINYL_SPECIFICATIONS,
  ...LAMINATE_SPECIFICATIONS,
  ...CARPET_SPECIFICATIONS,
};
