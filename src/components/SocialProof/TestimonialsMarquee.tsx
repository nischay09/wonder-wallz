"use client";

import { useEffect, useRef } from "react";
import TestimonialMarqueeCard from "./TestimonialMarqueeCard";
import GoogleReviewCard from "./GoogleReviewCard";
import { testimonials } from "@/lib/testimonials";

/**
 * Continuously scrolling trust strip (right → left).
 *
 * DESKTOP (unchanged, until/unless a touch ever happens):
 * Pure CSS `ww-marquee-scroll` keyframe animation on `.ww-marquee-track`,
 * 0 → -50%, exactly as before. Hover/focus-pause via CSS untouched.
 *
 * MOBILE:
 * A previous version drove drag with a *separate* transform layered on
 * top of the (still CSS-animated) track, and eased that layer back to
 * translateX(0) after release. That's what caused the "snaps back to
 * the same card" bug: the drag was only ever a temporary visual
 * overlay, so releasing it always reverted to the pre-drag position.
 *
 * Fixed approach: there is exactly ONE authoritative source of truth
 * for horizontal position — `positionPx` (a ref, in pixels, wrapped
 * into [0, oneSetWidth)). On the very first touch, we:
 *   1. read the CSS animation's current computed transform so
 *      `positionPx` starts at exactly the same spot (no jump),
 *   2. cancel the CSS animation (`animation: none`) and switch that
 *      track over to plain inline `transform`, driven by JS from then
 *      on for the life of the component.
 *
 * From there, dragging, momentum, the pause-then-resume delay, and
 * the ongoing autoplay all just read and write `positionPx` — nothing
 * ever "reverts" to an earlier baseline, so the marquee always
 * continues from wherever the user left it.
 */

const RESUME_DELAY_MS = 2500; // within the requested 2-3s window
const HORIZONTAL_INTENT_PX = 8; // px of dx before we claim the gesture as ours
const AUTOPLAY_MS_PER_SET = 36000; // matches the original 36s CSS duration

export default function TestimonialsMarquee() {
  const viewportRef = useRef<HTMLDivElement | null>(null);
  const trackRef = useRef<HTMLDivElement | null>(null);

  // Becomes true the first time a touch happens; from then on this
  // track is fully JS-driven. Desktop (mouse-only) sessions never flip
  // this, so they never leave the original CSS-animation path.
  const jsModeRef = useRef(false);

  // The single source of truth for horizontal scroll position, in px,
  // always kept wrapped into [0, oneSetWidthPx).
  const positionPx = useRef(0);
  const oneSetWidthPx = useRef(0);

  const gesture = useRef({
    active: false,
    claimed: false,
    startX: 0,
    startY: 0,
    startPosition: 0,
    // Short rolling window of recent (x, t) samples for a smoothed
    // release velocity (a single last-frame delta is too noisy).
    samples: [] as { x: number; t: number }[],
  });

  const autoplayRafRef = useRef<number | null>(null);
  const momentumRafRef = useRef<number | null>(null);
  const resumeTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const lastFrameTimeRef = useRef<number | null>(null);

  const wrap = (px: number) => {
    const w = oneSetWidthPx.current;
    if (w <= 0) return 0;
    return ((px % w) + w) % w;
  };

  const applyTransform = () => {
    if (trackRef.current) {
      trackRef.current.style.transform = `translateX(${-positionPx.current}px)`;
    }
  };

  const measure = () => {
    if (trackRef.current) {
      // Track renders the testimonial set twice back to back, so half
      // its scrollWidth is exactly one set's width — matching the -50%
      // the original CSS animation used.
      oneSetWidthPx.current = trackRef.current.scrollWidth / 2;
    }
  };

  // One-time switch from CSS-driven to JS-driven positioning. Reads the
  // CSS animation's current computed transform first so there is no
  // visible jump at the moment of handoff.
  const enterJsModeIfNeeded = () => {
    if (jsModeRef.current) return;
    if (!trackRef.current) return;

    measure();

    const computed = window.getComputedStyle(trackRef.current).transform;
    let currentTx = 0;
    if (computed && computed !== "none") {
      // matrix(a, b, c, d, tx, ty)
      const match = computed.match(/matrix\(([^)]+)\)/);
      if (match) {
        const parts = match[1].split(",").map((n) => parseFloat(n.trim()));
        currentTx = parts[4] ?? 0;
      }
    }
    positionPx.current = wrap(-currentTx);

    // Freeze the CSS animation permanently for this element and hand
    // off to inline transform, which we now fully control.
    trackRef.current.style.animation = "none";
    applyTransform();

    jsModeRef.current = true;
  };

  const stopAutoplay = () => {
    if (autoplayRafRef.current) {
      cancelAnimationFrame(autoplayRafRef.current);
      autoplayRafRef.current = null;
    }
    lastFrameTimeRef.current = null;
  };

  const startAutoplay = () => {
    stopAutoplay();
    const speedPxPerMs = oneSetWidthPx.current / AUTOPLAY_MS_PER_SET;

    const step = (t: number) => {
      if (lastFrameTimeRef.current == null) lastFrameTimeRef.current = t;
      const dt = t - lastFrameTimeRef.current;
      lastFrameTimeRef.current = t;

      positionPx.current = wrap(positionPx.current + speedPxPerMs * dt);
      applyTransform();

      autoplayRafRef.current = requestAnimationFrame(step);
    };

    autoplayRafRef.current = requestAnimationFrame(step);
  };

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

  // Smoothed release velocity (px/ms of finger movement), from the last
  // few samples rather than a single noisy last-frame delta.
  const getReleaseVelocity = () => {
    const samples = gesture.current.samples;
    if (samples.length < 2) return 0;
    const first = samples[0];
    const last = samples[samples.length - 1];
    const dt = Math.max(last.t - first.t, 1);
    const v = (last.x - first.x) / dt;
    return Math.max(Math.min(v, 1.5), -1.5);
  };

  // After release: momentum keeps positionPx moving (in the same
  // direction the finger was moving) with friction decay, then — once
  // it settles — we simply wait out the remaining delay and hand back
  // to startAutoplay(). At every step positionPx is the one and only
  // position value, so nothing "reverts" to a prior state.
  const settleAndScheduleResume = () => {
    const screenVelocity = getReleaseVelocity(); // px/ms of finger motion
    // Dragging the finger left (negative) moves position forward
    // (positive), matching how the drag itself is applied below.
    let velocity = -screenVelocity;

    const step = () => {
      velocity *= 0.92; // friction
      positionPx.current = wrap(positionPx.current + velocity * 16);
      applyTransform();

      if (Math.abs(velocity) < 0.03) {
        momentumRafRef.current = null;
        return;
      }
      momentumRafRef.current = requestAnimationFrame(step);
    };

    if (Math.abs(velocity) > 0.03) {
      momentumRafRef.current = requestAnimationFrame(step);
    }

    resumeTimeoutRef.current = setTimeout(() => {
      startAutoplay();
      resumeTimeoutRef.current = null;
    }, RESUME_DELAY_MS);
  };

  useEffect(() => {
    const el = viewportRef.current;
    if (!el) return;

    measure();
    const onResize = () => measure();
    window.addEventListener("resize", onResize);

    const onTouchStart = (e: TouchEvent) => {
      clearPendingResume();
      stopAutoplay();
      enterJsModeIfNeeded();

      const touch = e.touches[0];
      gesture.current.active = true;
      gesture.current.claimed = false;
      gesture.current.startX = touch.clientX;
      gesture.current.startY = touch.clientY;
      gesture.current.startPosition = positionPx.current;
      gesture.current.samples = [{ x: touch.clientX, t: e.timeStamp }];
    };

    const onTouchMove = (e: TouchEvent) => {
      if (!gesture.current.active) return;
      const touch = e.touches[0];
      const dx = touch.clientX - gesture.current.startX;
      const dy = touch.clientY - gesture.current.startY;

      if (!gesture.current.claimed) {
        if (Math.abs(dx) < HORIZONTAL_INTENT_PX && Math.abs(dy) < HORIZONTAL_INTENT_PX) {
          return; // not enough movement yet to know intent
        }
        if (Math.abs(dy) > Math.abs(dx)) {
          // Vertical intent — this is a page scroll. Let autoplay
          // resume normally; we never claimed the gesture.
          gesture.current.active = false;
          startAutoplay();
          return;
        }
        gesture.current.claimed = true;
      }

      // We own this gesture: stop the page from also trying to pan.
      e.preventDefault();

      const samples = gesture.current.samples;
      samples.push({ x: touch.clientX, t: e.timeStamp });
      if (samples.length > 5) samples.shift();

      // Dragging left (dx negative) should advance the marquee forward
      // (position increases), matching natural swipe-to-scroll feel.
      positionPx.current = wrap(gesture.current.startPosition - dx);
      applyTransform();
    };

    const onTouchEnd = () => {
      if (!gesture.current.active) return;
      const wasClaimed = gesture.current.claimed;
      gesture.current.active = false;
      if (wasClaimed) {
        settleAndScheduleResume();
      } else {
        startAutoplay();
      }
    };

    el.addEventListener("touchstart", onTouchStart, { passive: true });
    el.addEventListener("touchmove", onTouchMove, { passive: false });
    el.addEventListener("touchend", onTouchEnd, { passive: true });
    el.addEventListener("touchcancel", onTouchEnd, { passive: true });

    return () => {
      window.removeEventListener("resize", onResize);
      el.removeEventListener("touchstart", onTouchStart);
      el.removeEventListener("touchmove", onTouchMove);
      el.removeEventListener("touchend", onTouchEnd);
      el.removeEventListener("touchcancel", onTouchEnd);
      clearPendingResume();
      stopAutoplay();
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
      style={{ touchAction: "pan-y" }}
      role="region"
      aria-label="Customer testimonials"
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

      <div
        ref={trackRef}
        className="ww-marquee-track flex w-max items-stretch gap-5 py-2 sm:gap-6"
      >
        {renderSet("a")}
        {renderSet("b")}
      </div>
    </div>
  );
}
