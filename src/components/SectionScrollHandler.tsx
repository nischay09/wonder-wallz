"use client";

import { useEffect } from "react";
import { useSearchParams, useRouter, usePathname } from "next/navigation";

/**
 * SectionScrollHandler
 *
 * Drop this anywhere inside your homepage component tree (e.g. at the top of
 * the JSX returned by `app/page.tsx`).
 *
 * On mount it checks for a `?scrollTo=<sectionId>` search param written by
 * `useSectionScroll` when navigating from another route. If present it:
 *  1. Scrolls to the target section via scrollIntoView.
 *  2. Replaces the URL with a clean "/" so the param doesn't persist on reload.
 *
 * No timers — the effect runs after the DOM has painted, which is exactly when
 * the section elements are available.
 */
export function SectionScrollHandler() {
  const searchParams = useSearchParams();
  const router       = useRouter();
  const pathname     = usePathname();

  useEffect(() => {
    const sectionId = searchParams.get("scrollTo");
    if (!sectionId) return;

    const el = document.getElementById(sectionId);
    if (el) {
      el.scrollIntoView({ behavior: "smooth", block: "start" });
    }

    // Clean the URL — replace so the back button goes to the previous page,
    // not back to the ?scrollTo= URL.
    router.replace(pathname, { scroll: false });
  }, [searchParams, router, pathname]);

  // Renders nothing — purely a side-effect component.
  return null;
}
