import TestimonialMarqueeCard from "./TestimonialMarqueeCard";
import GoogleReviewCard from "./GoogleReviewCard";
import { testimonials } from "@/lib/testimonials";

/**
 * Continuously scrolling trust strip (right → left), CSS-only animation.
 *
 * How the loop works: the track renders the testimonial set + CTA card
 * TWICE back to back, then animates translateX from 0 to -50%. Because
 * the second half is an exact copy of the first, the moment the track
 * has shifted by one full set-width it looks identical to the starting
 * frame, so the reset from -50% back to 0% is invisible — no jump.
 *
 * Pure CSS (no JS timers, no layout thrash) keeps this cheap for
 * Lighthouse, and `prefers-reduced-motion` disables the animation
 * entirely for anyone who needs that.
 */
export default function TestimonialsMarquee() {
  const items = [...testimonials];

  const renderSet = (setKey: string) => (
    <>
      {items.map((t) => (
        <TestimonialMarqueeCard key={`${setKey}-${t.id}`} testimonial={t} />
      ))}
      <GoogleReviewCard key={`${setKey}-cta`} />
    </>
  );

  return (
    <div className="ww-marquee-viewport w-full overflow-hidden">
      <style>{`
        @keyframes ww-marquee-scroll {
          from { transform: translateX(0); }
          to { transform: translateX(-50%); }
        }
        .ww-marquee-track {
          animation: ww-marquee-scroll 36s linear infinite;
        }
        .ww-marquee-viewport:hover .ww-marquee-track,
        .ww-marquee-viewport:focus-within .ww-marquee-track {
          animation-play-state: paused;
        }
        @media (prefers-reduced-motion: reduce) {
          .ww-marquee-track {
            animation: none;
          }
        }
        /* Edge fade so cards don't hard-clip against the section bounds. */
        .ww-marquee-viewport {
          -webkit-mask-image: linear-gradient(
            to right,
            transparent 0,
            #000 48px,
            #000 calc(100% - 48px),
            transparent 100%
          );
          mask-image: linear-gradient(
            to right,
            transparent 0,
            #000 48px,
            #000 calc(100% - 48px),
            transparent 100%
          );
        }
      `}</style>

      <div
        className="ww-marquee-track flex w-max items-stretch gap-5 py-2 sm:gap-6"
        role="list"
        aria-label="Customer testimonials"
      >
        {renderSet("a")}
        {renderSet("b")}
      </div>
    </div>
  );
}
