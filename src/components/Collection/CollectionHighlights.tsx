/**
 * src/components/Collection/CollectionHighlights.tsx
 *
 * Lightweight, informational-only section for collections that have no
 * browsable online catalogue (`showCollectionCards: false` — e.g. Blinds,
 * Curtains, Glass Films, Upholstery, Canvas Prints).
 *
 * Renders `collection.highlights` as a set of elegant chips/cards between
 * the Hero and CustomerActions. This intentionally does NOT look like a
 * product grid:
 *   - no images
 *   - no prices
 *   - no CTA buttons
 * Each highlight is just a short, informational line — a "what to expect
 * from this collection" summary, not a product to add to cart.
 */

interface CollectionHighlightsProps {
  /** Short informational strings, e.g. "Made-to-measure fit". */
  highlights: string[];
  /** Optional section title. Defaults to "Highlights". */
  title?: string;
  /** Optional supporting description shown under the title. */
  description?: string;
}

export function CollectionHighlights({
  highlights,
  title = "Highlights",
  description,
}: CollectionHighlightsProps) {
  if (!highlights || highlights.length === 0) return null;

  return (
    <section aria-label={title} className="py-2">
      <div className="mb-6 max-w-2xl">
        <h2 className="text-xl md:text-2xl font-semibold tracking-tight text-neutral-900">
          {title}
        </h2>
        {description && (
          <p className="mt-2 text-sm md:text-base text-neutral-600">{description}</p>
        )}
      </div>

      <ul className="flex flex-wrap gap-3" role="list">
        {highlights.map((highlight, i) => (
          <li
            key={i}
            className="rounded-full border border-neutral-200 bg-neutral-50 px-4 py-2.5 text-sm text-neutral-800 shadow-sm transition-colors hover:border-neutral-300 hover:bg-neutral-100"
          >
            {highlight}
          </li>
        ))}
      </ul>
    </section>
  );
}
