"use client";

import React, { useState, useRef, useCallback } from "react";
import { AnimatePresence, motion } from "framer-motion";

import BeforeAfterSlider from "./BeforeAfterSlider";
import TransformationTabs from "./TransformationTabs";
import TransformationInfo from "./TransformationInfo";
import { Category, transformations } from "./transformations";

const slideVariants = {
  enter: (dir: number) => ({
    opacity: 0,
    x: dir > 0 ? 48 : -48,
    scale: 0.98,
  }),
  center: {
    opacity: 1,
    x: 0,
    scale: 1,
    transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] },
  },
  exit: (dir: number) => ({
    opacity: 0,
    x: dir > 0 ? -48 : 48,
    scale: 0.98,
    transition: { duration: 0.35, ease: [0.22, 1, 0.36, 1] },
  }),
};

export default function WallTransformations() {
  const [activeCategory, setActiveCategory] = useState<Category>("Living Room");
  const [direction, setDirection] = useState(0);
  const [hasDragged, setHasDragged] = useState(false);

  const categoryOrder: Category[] = [
    "Living Room",
    "Bedroom",
    "Kids Room",
    "Office",
    "Commercial",
  ];

  const handleCategoryChange = (next: Category) => {
    const prevIdx = categoryOrder.indexOf(activeCategory);
    const nextIdx = categoryOrder.indexOf(next);
    setDirection(nextIdx > prevIdx ? 1 : -1);
    setActiveCategory(next);
  };

  const handleDrag = useCallback(() => {
    if (!hasDragged) setHasDragged(true);
  }, [hasDragged]);

  const current =
    transformations.find((t) => t.category === activeCategory) ??
    transformations[0];

  return (
    <section
      aria-labelledby="wall-transformations-heading"
      className="relative w-full py-20 md:py-28 overflow-hidden"
      style={{ background: "#FAF7F2" }}
    >
      {/* Subtle background texture blob */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -top-32 -right-32 w-[520px] h-[520px] rounded-full opacity-30"
        style={{
          background:
            "radial-gradient(circle at 60% 40%, #E8D5BE 0%, transparent 70%)",
          filter: "blur(60px)",
        }}
      />

      <div className="relative z-10 mx-auto max-w-7xl px-5 sm:px-8 lg:px-12">
        {/* Section header */}
        <div className="mb-12 md:mb-16 text-center">
          <motion.p
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-xs font-semibold tracking-[0.22em] uppercase mb-3"
            style={{ color: "#B5926A" }}
          >
            Transformations
          </motion.p>
          <motion.h2
            id="wall-transformations-heading"
            initial={{ opacity: 0, y: 14 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.55, delay: 0.07 }}
            className="text-4xl md:text-5xl lg:text-6xl font-semibold mb-5 leading-tight"
            style={{
              color: "#2C1F14",
              fontFamily: "'Playfair Display', Georgia, serif",
              letterSpacing: "-0.02em",
            }}
          >
            See the Wonder Happen
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.14 }}
            className="text-base md:text-lg max-w-xl mx-auto leading-relaxed"
            style={{ color: "#7A6855" }}
          >
            Explore real spaces transformed by Wonder Wallz using premium
            wallpapers and custom interior solutions.
          </motion.p>
        </div>

        {/* Category tabs */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.45, delay: 0.18 }}
          className="mb-10 md:mb-12"
        >
          <TransformationTabs
            activeCategory={activeCategory}
            onChange={handleCategoryChange}
          />
        </motion.div>

        {/* Main panel */}
        <div
          className="relative overflow-hidden"
          style={{
            borderRadius: "24px",
            background: "#fff",
            boxShadow:
              "0 8px 40px rgba(139,110,80,0.10), 0 1px 4px rgba(139,110,80,0.06)",
          }}
        >
          <AnimatePresence mode="wait" custom={direction}>
            <motion.div
              key={activeCategory}
              custom={direction}
              variants={slideVariants}
              initial="enter"
              animate="center"
              exit="exit"
              className="w-full"
            >
              {/* Slider — ~10% taller via aspect-ratio override on the wrapper */}
              <div className="p-4 sm:p-6 pb-0">
                {/* Extra height wrapper: replaces the slider's internal aspect ratio */}
                <div
                  className="relative w-full"
                  style={{ aspectRatio: "16 / 8.2" }}
                >
                  {/* Stretch BeforeAfterSlider to fill this container */}
                  <div className="absolute inset-0">
                    <BeforeAfterSlider
                      beforeImage={current.beforeImage}
                      afterImage={current.afterImage}
                      beforeAlt={`Before — ${current.title}`}
                      afterAlt={`After — ${current.title}`}
                      onDrag={handleDrag}
                    />
                  </div>

                  {/* Drag hint — fades in, disappears after first drag */}
                  <AnimatePresence>
                    {!hasDragged && (
                      <motion.div
                        initial={{ opacity: 0, y: 6 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.9 }}
                        transition={{ duration: 0.45, delay: 0.8 }}
                        aria-hidden="true"
                        className="pointer-events-none absolute left-1/2 -translate-x-1/2 z-20"
                        style={{ bottom: "calc(50% + 38px)" }}
                      >
                        <div
                          className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium tracking-wider"
                          style={{
                            borderRadius: "999px",
                            background: "rgba(255,255,255,0.88)",
                            backdropFilter: "blur(8px)",
                            color: "#8B6E50",
                            boxShadow:
                              "0 2px 12px rgba(139,110,80,0.18), 0 1px 3px rgba(0,0,0,0.06)",
                            whiteSpace: "nowrap",
                          }}
                        >
                          <span style={{ letterSpacing: "0.05em" }}>← Drag →</span>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </div>

              {/* Info bar */}
              <div className="p-6 sm:p-8 pt-12 sm:pt-14">
                <TransformationInfo transformation={current} />
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Bottom decoration: dot row */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="mt-10 flex justify-center gap-2"
        >
          {categoryOrder.map((cat) => (
            <button
              key={cat}
              aria-label={`Go to ${cat}`}
              onClick={() => handleCategoryChange(cat)}
              className="transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2"
              style={{
                width: cat === activeCategory ? 28 : 8,
                height: 8,
                borderRadius: 999,
                background:
                  cat === activeCategory
                    ? "linear-gradient(90deg, #B5926A, #8B6E50)"
                    : "rgba(181,146,106,0.25)",
              }}
            />
          ))}
        </motion.div>
      </div>
    </section>
  );
}
