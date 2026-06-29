"use client";

import { useRouter, usePathname } from "next/navigation";
import { useCallback } from "react";

/**
 * useSectionScroll
 *
 * Returns a stable `scrollToSection` function that reliably scrolls to a
 * homepage section regardless of the current route.
 *
 * Behaviour:
 *  - Already on "/": finds the element by ID and calls scrollIntoView immediately.
 *    Works even when the URL already contains the same hash (avoids the
 *    "click-again does nothing" problem with plain hash links).
 *  - On another page: navigates to `/?scrollTo=<sectionId>`.
 *    The homepage's <SectionScrollHandler /> reads that param on mount and
 *    scrolls once the DOM is ready.
 */
export function useSectionScroll() {
  const router   = useRouter();
  const pathname = usePathname();

  const scrollToSection = useCallback(
    (sectionId: string) => {
      if (pathname === "/") {
        // Already on the homepage — scroll directly.
        // Using scrollIntoView instead of location.hash so it always fires,
        // even when the URL already contains the same hash.
        const el = document.getElementById(sectionId);
        el?.scrollIntoView({ behavior: "smooth", block: "start" });
      } else {
        // Different route — navigate home with a search param so the homepage
        // can scroll after it has mounted its sections.
        router.push(`/?scrollTo=${sectionId}`);
      }
    },
    [pathname, router],
  );

  return scrollToSection;
}
