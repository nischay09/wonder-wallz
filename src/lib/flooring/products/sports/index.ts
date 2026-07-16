/**
 * src/lib/flooring/products/sports/index.ts
 *
 * Public API for the Sports Flooring product family. Consumers
 * (currently only `registry.ts`) import from here — never from the
 * individual collection files directly.
 *
 * To add a new Sports collection: create `<slug>.ts` in this folder
 * exporting a typed `FlooringCollection`, then re-export it below.
 */

export { malaga } from "./malaga";
