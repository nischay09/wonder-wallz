/**
 * app/collections/[category]/loading.tsx
 *
 * Previously missing. CollectionPage in this route is an `async` Server
 * Component (`await params`, collection lookup) with no loading.tsx above
 * it, so Next has no route-level Suspense boundary to show while that
 * resolves — the whole route blocks on first paint instead of streaming.
 * This is a minimal skeleton matching the general page shape (hero band +
 * grid) using the existing `.skeleton` shimmer utility from globals.css.
 *
 * NOTE: file name reflects its destination path
 * app/collections/[category]/loading.tsx — rename on drop-in.
 */
export default function Loading() {
  return (
    <div className="min-h-screen bg-neutral-50/60">
      <div className="container-site pt-20 pb-10">
        <div className="skeleton h-8 w-40 mb-4" />
        <div className="skeleton h-12 w-80 max-w-full mb-3" />
        <div className="skeleton h-5 w-full max-w-xl" />
      </div>
      <div className="container-site pb-20">
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
          {Array.from({ length: 8 }).map((_, i) => (
            <div key={i} className="skeleton aspect-[3/4] w-full" />
          ))}
        </div>
      </div>
    </div>
  );
}
