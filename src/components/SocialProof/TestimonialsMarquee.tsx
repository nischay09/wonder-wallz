"use client";

import { useEffect, useRef } from "react";
import TestimonialMarqueeCard from "./TestimonialMarqueeCard";
import GoogleReviewCard from "./GoogleReviewCard";
import { testimonials } from "@/lib/testimonials";

/**
 * Continuously scrolling trust strip (right → left).
 *
 * DESKTOP (unchanged):
 * Pure CSS `ww-marquee-scroll` keyframe animation on `.ww-marquee-track`,
 * looping 0 → -50% exactly as before. Hover/focus pause via CSS is
 * untouched. No JS ever touches `transform` or `animationPlayState` on
 * non-touch input, so desktop behaves identically to the original.
 *
 * MOBILE (new):
 * Touch events are handled with a separate "drag layer" wrapped *around*
 * the animated track, rather than by fighting the CSS animation itself:
 *
 *   viewport (mask/overflow-hidden, unchanged)
 *     └─ dragLayer   <-- NEW: inline transform, follows the finger
 *          └─ track  <-- unchanged CSS keyframe animation lives here
 *
 * Because the drag offset and the marquee animation live on two
 * different elements, their transforms simply stack. This means:
 *  - We never read/write the animation's own transform, so there's
 *    nothing to desync — resuming is just flipping
 *    `animationPlayState` back to "running", which CSS resumes from
 *    exactly where it was paused (no restart, no jump).
 *  - Dragging only moves the outer wrapper, and a rAF-driven momentum
 *    decay eases that wrapper back to translateX(0) before the track's
 *    animation is unpaused, so the handoff is seamless.
 *
 * All of this is gated on real `touchstart` events, which only fire on
 * touch-capable input, so mouse/desktop users never trigger any of it.
 */

const RESUME_DELAY_MS = 2500; // within the requested 2-3s window
const HORIZONTAL_INTENT_PX = 8; // px of dx before we claim the gesture as ours

export default function TestimonialsMarquee() {
  const viewportRef = useRef<HTMLDivElement | null>(null);
  const dragLayerRef = useRef<HTMLDivElement | null>(null);
  const trackRef = useRef<HTMLDivElement | null>(null);

  // Gesture bookkeeping — refs only, so dragging never triggers a
  // React re-render (keeps things at 60fps and avoids extra timers).
  const gesture = useRef({
    active: false,
    // has this touch been claimed as a horizontal drag yet?
    claimed: false,
    startX: 0,
    startY: 0,
    lastX: 0,
    lastT: 0,
    velocity: 0, // px/ms, for momentum on release
    currentOffset: 0, // current translateX (px) applied to the drag layer
  });

  const resumeTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const momentumRafRef = useRef<number | null>(null);

  const clearPendingResume = () => {
    if (resumeTimeoutRef.current) {
      clearTimeout(resumeTimeoutRef.current);
      resumeTimeoutRef.current = null;
    }
    if (momentumRafRef.current) {
      cancelAnimationFrame(momentumRafRef.current);
      momentumRafRef.current = null;
    }
  };

  const setDragOffset = (px: number) => {
    gesture.current.currentOffset = px;
    if (dragLayerRef.current) {
      dragLayerRef.current.style.transform = `translateX(${px}px)`;
    }
  };

  const pauseTrack = () => {
    if (trackRef.current) {
      trackRef.current.style.animationPlayState = "paused";
    }
  };

  const resumeTrack = () => {
    if (trackRef.current) {
      trackRef.current.style.animationPlayState = "running";
    }
  };

  // Decays the drag-layer offset back to 0 with a simple ease-out, using
  // the release velocity for a bit of momentum, then (once settled)
  // schedules the marquee to resume after RESUME_DELAY_MS. The track
  // stays paused throughout, so there is no visual conflict between
  // "momentum" and "marquee motion" at any point.
  const settleAndScheduleResume = () => {
    const state = gesture.current;
    let velocity = state.velocity; // px/ms
    let offset = state.currentOffset;

    const step = () => {
      // Friction-based decay.
      velocity *= 0.92;
      offset += velocity * 16; // ~1 frame at 16ms
      // Ease the residual offset itself back toward 0 as well, so we
      // always land on exactly 0 rather than relying on velocity alone.
      offset *= 0.9;

      if (Math.abs(velocity) < 0.01 && Math.abs(offset) < 0.5) {
        setDragOffset(0);
        momentumRafRef.current = null;
      } else {
        setDragOffset(offset);
        momentumRafRef.current = requestAnimationFrame(step);
      }
    };

    momentumRafRef.current = requestAnimationFrame(step);

    resumeTimeoutRef.current = setTimeout(() => {
      setDragOffset(0);
      resumeTrack();
      resumeTimeoutRef.current = null;
    }, RESUME_DELAY_MS);
  };

  useEffect(() => {
    const el = viewportRef.current;
    if (!el) return;

    const onTouchStart = (e: TouchEvent) => {
      // A new touch always cancels any pending resume/momentum from a
      // previous gesture so drags feel continuous, not restarted.
      clearPendingResume();

      const touch = e.touches[0];
      gesture.current.active = true;
      gesture.current.claimed = false;
      gesture.current.startX = touch.clientX;
      gesture.current.startY = touch.clientY;
      gesture.current.lastX = touch.clientX;
      gesture.current.lastT = e.timeStamp;
      gesture.current.velocity = 0;

      // Pause immediately — this also covers the "tap pauses" case,
      // since a tap is just a touchstart+touchend with ~0 movement.
      pauseTrack();
    };

    const onTouchMove = (e: TouchEvent) => {
      if (!gesture.current.active) return;
      const touch = e.touches[0];
      const dx = touch.clientX - gesture.current.startX;
      const dy = touch.clientY - gesture.current.startY;

      if (!gesture.current.claimed) {
        if (Math.abs(dx) < HORIZONTAL_INTENT_PX && Math.abs(dy) < HORIZONTAL_INTENT_PX) {
          // Not enough movement yet to know intent — do nothing, let
          // the browser decide (keeps vertical page scroll natural).
          return;
        }
        if (Math.abs(dy) > Math.abs(dx)) {
          // Vertical intent: this is a page scroll, not a marquee drag.
          // Release our claim on the animation so it just resumes
          // normally after the (unclaimed) touch ends.
          gesture.current.active = false;
          settleAndScheduleResume();
          return;
        }
        // Horizontal intent confirmed — claim the gesture.
        gesture.current.claimed = true;
      }

      // We own this gesture now: prevent the page from also trying to
      // scroll vertically while the user drags the marquee sideways.
      e.preventDefault();

      const now = e.timeStamp;
      const dt = Math.max(now - gesture.current.lastT, 1);
      const stepDx = touch.clientX - gesture.current.lastX;
      gesture.current.velocity = stepDx / dt;
      gesture.current.lastX = touch.clientX;
      gesture.current.lastT = now;

      setDragOffset(dx);
    };

    const onTouchEnd = () => {
      if (!gesture.current.active) return;
      gesture.current.active = false;
      settleAndScheduleResume();
    };

    // passive: false is required so preventDefault() in onTouchMove
    // actually takes effect for horizontal drags.
    el.addEventListener("touchstart", onTouchStart, { passive: true });
    el.addEventListener("touchmove", onTouchMove, { passive: false });
    el.addEventListener("touchend", onTouchEnd, { passive: true });
    el.addEventListener("touchcancel", onTouchEnd, { passive: true });

    return () => {
      el.removeEventListener("touchstart", onTouchStart);
      el.removeEventListener("touchmove", onTouchMove);
      el.removeEventListener("touchend", onTouchEnd);
      el.removeEventListener("touchcancel", onTouchEnd);
      clearPendingResume();
    };
  }, []);

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
    <div
      ref={viewportRef}
      className="ww-marquee-viewport w-full overflow-hidden"
      // Allows native vertical scrolling to pass through; horizontal
      // panning is handled ourselves via touch handlers above.
      style={{ touchAction: "pan-y" }}
    >
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

      {/* NEW: drag layer — only ever moved by touch handlers, stacks its
          own transform on top of the track's animation transform below. */}
      <div ref={dragLayerRef} className="ww-marquee-drag-layer">
        <div
          ref={trackRef}
          className="ww-marquee-track flex w-max items-stretch gap-5 py-2 sm:gap-6"
          role="list"
          aria-label="Customer testimonials"
        >
          {renderSet("a")}
          {renderSet("b")}
        </div>
      </div>
    </div>
  );
}
