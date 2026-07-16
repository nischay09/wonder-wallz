/**
 * src/lib/flooring/products/index.ts
 *
 * Aggregates every category's public API into one place so
 * `registry.ts` has a single import to build `FLOORING_REGISTRY`
 * from. Nothing outside `registry.ts` should need to import from
 * here — go through `helpers.ts` instead.
 */

export * as sportsProducts from "./sports";
export * as vinylProducts from "./vinyl";
export * as laminateProducts from "./laminate";
export * as carpetProducts from "./carpet";
