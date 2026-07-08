"use client";

import React, { useCallback, useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";

interface BeforeAfterSliderProps {
  beforeImage: string;
  afterImage: string;
  beforeAlt?: string;
  afterAlt?: string;
  onDrag?: () => void;
}

export default function BeforeAfterSlider({
  beforeImage,
  afterImage,
  beforeAlt = "Before transformation",
  afterAlt = "After transformation",
  onDrag,
}: BeforeAfterSliderProps) {
  const [sliderPosition, setSliderPosition] = useState(50);
  const [isDragging, setIsDragging] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const calculatePosition = useCallback(
    (clientX: number): number => {
      if (!containerRef.current) return 50;
      const rect = containerRef.current.getBoundingClientRect();
      const x = clientX - rect.left;
      const clamped = Math.max(0, Math.min(x, rect.width));
      return (clamped / rect.width) * 100;
    },
    []
  );

  const handleMouseDown = (e: React.MouseEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleTouchStart = () => {
    setIsDragging(true);
  };

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!isDragging) return;
      onDrag?.();
      setSliderPosition(calculatePosition(e.clientX));
    };

    const handleTouchMove = (e: TouchEvent) => {
      if (!isDragging) return;
      onDrag?.();
      if (e.touches[0]) {
        setSliderPosition(calculatePosition(e.touches[0].clientX));
      }
    };

    const handleEnd = () => setIsDragging(false);

    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("mouseup", handleEnd);
    window.addEventListener("touchmove", handleTouchMove, { passive: true });
    window.addEventListener("touchend", handleEnd);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseup", handleEnd);
      window.removeEventListener("touchmove", handleTouchMove);
      window.removeEventListener("touchend", handleEnd);
    };
  }, [isDragging, calculatePosition]);

  return (
    <div
      ref={containerRef}
      className="relative w-full overflow-hidden select-none"
      style={{ borderRadius: "24px", aspectRatio: "16/9", cursor: isDragging ? "grabbing" : "col-resize" }}
      onMouseDown={(e) => {
        setIsDragging(true);
        setSliderPosition(calculatePosition(e.clientX));
       }}

      onTouchStart={(e) => {
        setIsDragging(true);
        if (e.touches[0]) {
          setSliderPosition(calculatePosition(e.touches[0].clientX));
        }
      }}
      role="img"
      aria-label="Before and after comparison slider"
    >
      {/* AFTER image — base layer */}
      <img
        src={afterImage}
        alt={afterAlt}
        draggable={false}
        className="absolute inset-0 w-full h-full object-cover"
      />

      {/* BEFORE image — clipped layer */}
      <div
        className="absolute inset-0 overflow-hidden"
        style={{
          clipPath: `inset(0 ${100 - sliderPosition}% 0 0)`,
        }}
      >
        <img
          src={beforeImage}
          alt={beforeAlt}
          draggable={false}
          className="absolute inset-0 w-full h-full object-cover"
        />
      </div>

      {/* Labels */}
      <div className="pointer-events-none absolute top-4 left-4 z-10">
        <span
          className="inline-block px-3 py-1 text-xs font-semibold tracking-widest uppercase"
          style={{
            background: "rgba(255,255,255,0.18)",
            backdropFilter: "blur(10px)",
            WebkitBackdropFilter: "blur(10px)",
            border: "1px solid rgba(255,255,255,0.28)",
            borderRadius: "999px",
            color: "#fff",
            opacity: sliderPosition < 15 ? 0 : 1,
            transition: "opacity 0.2s ease",
          }}
        >
          Before
        </span>
      </div>
      <div className="pointer-events-none absolute top-4 right-4 z-10">
        <span
          className="inline-block px-3 py-1 text-xs font-semibold tracking-widest uppercase"
          style={{
            background: "rgba(255,255,255,0.18)",
            backdropFilter: "blur(10px)",
            WebkitBackdropFilter: "blur(10px)",
            border: "1px solid rgba(255,255,255,0.28)",
            borderRadius: "999px",
            color: "#fff",
            opacity: sliderPosition > 85 ? 0 : 1,
            transition: "opacity 0.2s ease",
          }}
        >
          After
        </span>
      </div>

      {/* Divider line */}
      <div
        className="absolute inset-y-0 z-20 w-px -translate-x-1/2"
        style={{
          left: `${sliderPosition}%`,
          background: "rgba(255,255,255,0.9)",
          boxShadow: "0 0 12px rgba(0,0,0,0.3)",
        }}
      />

      {/* Drag handle */}
      <motion.div
        className="absolute z-30 flex items-center justify-center"
        style={{
          left: `${sliderPosition}%`,
          top: "50%",
          x: "-50%",
          y: "-50%",
        }}
        onMouseDown={handleMouseDown}
        onTouchStart={handleTouchStart}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
        animate={{ scale: isDragging ? 1.08 : 1 }}
        transition={{ type: "spring", stiffness: 400, damping: 25 }}
      >
        <div
          className="flex items-center justify-center"
          style={{
            width: 54,
            height: 54,
            borderRadius: "50%",
            background: "#fff",
            boxShadow: "0 4px 20px rgba(139,110,80,0.28), 0 1px 4px rgba(0,0,0,0.10)",
            cursor: isDragging ? "grabbing" : "grab",
          }}
        >
          {/* Chevron arrows */}
          <svg width="22" height="22" viewBox="0 0 22 22" fill="none">
            <path
              d="M8 7L4 11L8 15"
              stroke="#B5926A"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M14 7L18 11L14 15"
              stroke="#B5926A"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </div>
      </motion.div>
    </div>
  );
}
