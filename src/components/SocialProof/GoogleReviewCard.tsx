import Image from "next/image";
import { Star, ArrowRight } from "lucide-react";
import { GOOGLE_REVIEW_URL } from "@/lib/constants";

/**
 * Terminal card in the marquee loop. Opens the Google review form in a
 * new tab. The URL is sourced from a shared constant, never hardcoded here.
 *
 * Layout notes:
 * - The original left-side content (rating badge, prompt copy, "Leave us
 *   a Google Review" link) is untouched — same markup, same classes.
 * - A QR code block has been added. On desktop (sm and up) it sits to the
 *   right of the existing content inside its own premium sub-card. On
 *   mobile it stacks below the existing content and is centered.
 * - The whole thing is no longer a single <a> — it's a bordered card
 *   `<div>` containing two independent clickable regions (the original
 *   link, and the QR code link), both pointing at GOOGLE_REVIEW_URL.
 */
export default function GoogleReviewCard() {
  return (
    <div
      className="flex h-full w-[280px] shrink-0 flex-col justify-between gap-6 rounded-[20px] border border-[#D9C9A0] bg-[#2B2521] p-6 shadow-[0_6px_20px_rgba(0,0,0,0.08)] sm:w-[420px] sm:flex-row sm:items-center sm:gap-7 sm:p-7"
    >
      {/* Original content — unchanged */}
      <a
        href={GOOGLE_REVIEW_URL}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Leave Wonder Wallz a Google review (opens in a new tab)"
        className="flex h-full flex-1 flex-col justify-between rounded-[20px] transition-colors hover:bg-[#403828] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#C8A05A]"
      >
        <div>
          <div className="mb-3 flex items-center gap-1">
            {Array.from({ length: 5 }).map((_, i) => (
              <Star
                key={i}
                className="h-3.5 w-3.5 fill-[#C8A05A] text-[#C8A05A]"
                strokeWidth={1.5}
                aria-hidden="true"
              />
            ))}
            <span className="ml-1 text-xs uppercase tracking-wide text-[#D9C9A0]">
              Rated on Google
            </span>
          </div>

          <p className="font-serif text-lg leading-relaxed text-[#FBF7EF] sm:text-xl">
            Love your Wonder Wallz experience?
          </p>
        </div>

        <span className="mt-5 inline-flex items-center gap-2 text-sm font-medium text-[#C8A05A]">
          Leave us a Google Review
          <ArrowRight className="h-4 w-4" strokeWidth={1.75} aria-hidden="true" />
        </span>
      </a>

      {/* QR code — new, added below content on mobile, to the right on desktop */}
      <a
        href={GOOGLE_REVIEW_URL}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Scan or click to leave Wonder Wallz a Google review (opens in a new tab)"
        className="flex shrink-0 flex-col items-center gap-3 self-center rounded-[16px] border border-[#D9C9A0]/60 bg-[#3A322A] p-4 shadow-[0_4px_14px_rgba(0,0,0,0.12)] transition-colors hover:bg-[#403828] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#C8A05A] sm:self-auto"
      >
        <div className="overflow-hidden rounded-[10px] bg-[#FBF7EF] p-2">
          <Image
            src="/google-review-qr.jpeg"
            alt="Google Review QR Code for Wonder Wallz"
            width={112}
            height={112}
            className="h-24 w-24 sm:h-28 sm:w-28"
          />
        </div>
        <span className="text-center text-xs leading-snug text-[#D9C9A0]">
          Scan to leave a Google review
        </span>
      </a>
    </div>
  );
}
