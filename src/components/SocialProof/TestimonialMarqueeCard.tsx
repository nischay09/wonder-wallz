import { Star, Quote } from "lucide-react";
import type { Testimonial } from "@/lib/testimonials";

interface TestimonialMarqueeCardProps {
  testimonial: Testimonial;
}

/**
 * Pure presentational card for the trust strip. Deliberately omits any
 * location/city/address — role is a generic identity only.
 */
export default function TestimonialMarqueeCard({
  testimonial,
}: TestimonialMarqueeCardProps) {
  const { name, role, rating, review } = testimonial;

  return (
    <figure
      className="flex h-full w-[280px] shrink-0 flex-col rounded-[20px] border border-[#E7DFCF] bg-[#FBF7EF] p-6 shadow-[0_6px_20px_rgba(0,0,0,0.05)] sm:w-[320px] sm:p-7"
      aria-roledescription="testimonial"
    >
      <Quote
        className="mb-3 h-6 w-6 text-[#C8A05A]"
        strokeWidth={1.5}
        aria-hidden="true"
      />

      <div
        className="mb-3 flex items-center gap-1"
        role="img"
        aria-label={`Rated ${rating} out of 5 stars`}
      >
        {Array.from({ length: 5 }).map((_, i) => (
          <Star
            key={i}
            className={
              i < rating
                ? "h-3.5 w-3.5 fill-[#C8A05A] text-[#C8A05A]"
                : "h-3.5 w-3.5 fill-transparent text-[#D9D2C4]"
            }
            strokeWidth={1.5}
            aria-hidden="true"
          />
        ))}
      </div>

      <blockquote className="font-serif text-base leading-relaxed text-[#2B2521] sm:text-lg">
        “{review}”
      </blockquote>

      <figcaption className="mt-5 border-t border-[#E7DFCF] pt-4">
        <p className="font-medium text-[#2B2521]">{name}</p>
        <p className="text-sm text-[#7A7264]">{role}</p>
      </figcaption>
    </figure>
  );
}
