"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import TestimonialCard from "./TestimonialCard";
import { testimonials } from "@/lib/testimonials";

const AUTO_ROTATE_MS = 7000; // within the requested 6–8s window

export default function Testimonials() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [direction, setDirection] = useState<1 | -1>(1);
  const prefersReducedMotion = useReducedMotion();
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const total = testimonials.length;

  const goTo = useCallback(
    (nextIndex: number) => {
      setDirection(nextIndex > activeIndex ? 1 : -1);
      setActiveIndex(((nextIndex % total) + total) % total);
    },
    [activeIndex, total]
  );

  const goToNext = useCallback(() => {
    setDirection(1);
    setActiveIndex((prev) => (prev + 1) % total);
  }, [total]);

  // Autoplay, paused on hover/focus and respects reduced-motion preference.
  const startTimer = useCallback(() => {
    if (prefersReducedMotion) return;
    if (timerRef.current) clearInterval(timerRef.current);
    timerRef.current = setInterval(goToNext, AUTO_ROTATE_MS);
  }, [goToNext, prefersReducedMotion]);

  useEffect(() => {
    startTimer();
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [startTimer]);

  const pauseTimer = () => {
    if (timerRef.current) clearInterval(timerRef.current);
  };

  const variants = {
    enter: (dir: 1 | -1) => ({
      opacity: 0,
      x: prefersReducedMotion ? 0 : dir * 24,
    }),
    center: { opacity: 1, x: 0 },
    exit: (dir: 1 | -1) => ({
      opacity: 0,
      x: prefersReducedMotion ? 0 : dir * -24,
    }),
  };

  const active = testimonials[activeIndex];

  return (
    <div
      className="w-full"
      onMouseEnter={pauseTimer}
      onMouseLeave={startTimer}
      onFocus={pauseTimer}
      onBlur={startTimer}
    >
      <div
        className="relative"
        aria-live="polite"
        aria-atomic="true"
      >
        <AnimatePresence mode="wait" custom={direction} initial={false}>
          <motion.div
            key={active.id}
            custom={direction}
            variants={variants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{ duration: prefersReducedMotion ? 0 : 0.45, ease: "easeOut" }}
          >
            <TestimonialCard testimonial={active} />
          </motion.div>
        </AnimatePresence>
      </div>

      <div
        className="mt-6 flex items-center justify-center gap-2"
        role="tablist"
        aria-label="Choose a testimonial"
      >
        {testimonials.map((t, i) => (
          <button
            key={t.id}
            type="button"
            role="tab"
            aria-selected={i === activeIndex}
            aria-label={`Show testimonial from ${t.name}`}
            onClick={() => goTo(i)}
            className={
              i === activeIndex
                ? "h-2.5 w-2.5 rounded-full bg-[#C8A05A] transition-all"
                : "h-2.5 w-2.5 rounded-full bg-[#E7DFCF] transition-all hover:bg-[#D9C9A0]"
            }
          />
        ))}
      </div>
    </div>
  );
}
