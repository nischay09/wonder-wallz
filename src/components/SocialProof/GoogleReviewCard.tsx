import { Star, ArrowRight } from "lucide-react";
import { GOOGLE_REVIEW_URL } from "@/lib/constants";

/**
 * Terminal card in the marquee loop. Opens the Google review form in a
 * new tab. The URL is sourced from a shared constant, never hardcoded here.
 */
export default function GoogleReviewCard() {
  return (
    <a
      href={GOOGLE_REVIEW_URL}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Leave Wonder Wallz a Google review (opens in a new tab)"
      className="flex h-full w-[280px] shrink-0 flex-col justify-between rounded-[20px] border border-[#D9C9A0] bg-[#2B2521] p-6 shadow-[0_6px_20px_rgba(0,0,0,0.08)] transition-colors hover:bg-[#403828] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#C8A05A] sm:w-[320px] sm:p-7"
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
  );
}
