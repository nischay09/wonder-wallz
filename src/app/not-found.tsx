/**
 * app/not-found.tsx
 *
 * Previously missing entirely. app/collections/[category]/page.tsx calls
 * notFound() for any unrecognized category slug, which — without this
 * file — falls through to Next.js's generic, unstyled default 404 page.
 * This gives every 404 in the app (including that one) branded styling
 * and a way back into the site instead of a dead end.
 */
import Link from "next/link";

export default function NotFound() {
  return (
    <main className="min-h-[70vh] flex items-center justify-center px-5">
      <div className="text-center max-w-md">
        <p className="text-xs font-semibold tracking-[0.18em] uppercase mb-3 text-accent font-body">
          404
        </p>
        <h1 className="text-3xl md:text-4xl font-semibold mb-4 font-display text-text-primary">
          Page not found
        </h1>
        <p className="text-base leading-relaxed mb-8 text-text-secondary">
          The page you're looking for doesn't exist or may have moved.
        </p>
        <Link
          href="/"
          className="inline-flex items-center gap-2 px-7 py-3.5 rounded-full text-sm font-medium font-body transition-colors duration-200 bg-accent hover:bg-accent-hover text-text-inverse"
        >
          Back to homepage
        </Link>
      </div>
    </main>
  );
}
