"use client";

import { Star, Quote } from "lucide-react";
import type { Testimonial } from "@/lib/testimonials";

interface TestimonialCardProps {
  testimonial: Testimonial;
}

/**
 * Pure presentational card. Deliberately omits any location or project
 * reference — role is a generic identity (e.g. "Verified Homeowner"),
 * never tied to a specific project image shown elsewhere on the page.
 */
export default function TestimonialCard({ testimonial }: TestimonialCardProps) {
  const { name, role, rating, review, productUsed } = testimonial;

  return (
    <figure
      className="rounded-[24px] bg-[#FBF7EF] p-8 shadow-[0_8px_30px_rgba(0,0,0,0.06)] sm:p-10"
      aria-roledescription="testimonial"
    >
      <Quote
        className="mb-4 h-8 w-8 text-[#C8A05A]"
        strokeWidth={1.5}
        aria-hidden="true"
      />

      <div
        className="mb-4 flex items-center gap-1"
        role="img"
        aria-label={`Rated ${rating} out of 5 stars`}
      >
        {Array.from({ length: 5 }).map((_, i) => (
          <Star
            key={i}
            className={
              i < rating
                ? "h-4 w-4 fill-[#C8A05A] text-[#C8A05A]"
                : "h-4 w-4 fill-transparent text-[#D9D2C4]"
            }
            strokeWidth={1.5}
            aria-hidden="true"
          />
        ))}
      </div>

      <blockquote className="font-serif text-lg leading-relaxed text-[#2B2521] sm:text-xl">
        “{review}”
      </blockquote>

      <figcaption className="mt-6 flex items-center justify-between gap-4 border-t border-[#E7DFCF] pt-5">
        <div>
          <p className="font-medium text-[#2B2521]">{name}</p>
          <p className="text-sm text-[#7A7264]">{role}</p>
        </div>
        <p className="text-right text-xs uppercase tracking-wide text-[#9C8B61]">
          {productUsed}
        </p>
      </figcaption>
    </figure>
  );
}
