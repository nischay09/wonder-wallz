"use client";

import React, { useRef } from "react";
import { motion } from "framer-motion";
import { CATEGORIES, Category } from "./transformations";

interface TransformationTabsProps {
  activeCategory: Category;
  onChange: (category: Category) => void;
}

export default function TransformationTabs({
  activeCategory,
  onChange,
}: TransformationTabsProps) {
  const tabRefs = useRef<(HTMLButtonElement | null)[]>([]);

  return (
    <div
      role="tablist"
      aria-label="Room categories"
      className="flex items-center gap-2 flex-wrap justify-center"
    >
      {CATEGORIES.map((category, i) => {
        const isActive = category === activeCategory;
        return (
          <button
            key={category}
            ref={(el) => { tabRefs.current[i] = el; }}
            role="tab"
            aria-selected={isActive}
            aria-controls={`panel-${category.toLowerCase().replace(/\s+/g, "-")}`}
            onClick={() => onChange(category)}
            className="relative px-5 py-2.5 text-sm font-medium tracking-wide transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2"
            style={{
              borderRadius: "999px",
              color: isActive ? "#fff" : "#7A6855",
              border: isActive ? "none" : "1px solid rgba(181,146,106,0.3)",
              background: "transparent",
              whiteSpace: "nowrap",
            }}
          >
            {isActive && (
              <motion.span
                layoutId="tab-pill"
                className="absolute inset-0"
                style={{
                  borderRadius: "999px",
                  background: "linear-gradient(135deg, #B5926A 0%, #8B6E50 100%)",
                  zIndex: 0,
                }}
                transition={{ type: "spring", stiffness: 380, damping: 32 }}
              />
            )}
            <span className="relative z-10">{category}</span>
          </button>
        );
      })}
    </div>
  );
}
