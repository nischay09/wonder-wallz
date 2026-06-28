"use client";

/**
 * src/components/ProjectCart/ProjectCartButton.tsx
 *
 * Floating cart icon with a live item-count badge.
 * Calls onOpen to open ProjectCartDrawer — no local state needed.
 */

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useProjectCart, selectItemCount } from "@/store/projectCart";

interface ProjectCartButtonProps {
  onOpen: () => void;
  /** Visual variant: 'icon' (pill navbar) | 'row' (mobile bottom bar) */
  variant?: "icon" | "row";
}

export function ProjectCartButton({ onOpen, variant = "icon" }: ProjectCartButtonProps) {
  const storeCount = useProjectCart(selectItemCount);

  // Start at 0 to match SSR output, then sync after hydration.
  // Prevents the aria-label mismatch that causes a hydration error
  // when Zustand rehydrates a non-zero count from localStorage.
  const [count, setCount] = useState(0);
  useEffect(() => {
    setCount(storeCount);
  }, [storeCount]);

  if (variant === "row") {
    // ── Mobile bottom-bar style ──────────────────────────────────────────────
    return (
      <button
        onClick={onOpen}
        className="flex items-center gap-1.5 text-xs font-semibold ml-auto relative focus:outline-none focus-visible:ring-2"
        style={{ color: "#6B6258" }}
        aria-label={`Open project cart, ${count} ${count === 1 ? "item" : "items"}`}
      >
        <CartIcon size={15} />
        Cart
        <AnimatePresence>
          {count > 0 && (
            <motion.span
              key="badge"
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0, opacity: 0 }}
              transition={{ type: "spring", stiffness: 400, damping: 20 }}
              className="flex items-center justify-center w-4 h-4 rounded-full text-[9px] font-bold text-white"
              style={{ backgroundColor: "#7A5E30" }}
              aria-hidden="true"
            >
              {count > 99 ? "99+" : count}
            </motion.span>
          )}
        </AnimatePresence>
      </button>
    );
  }

  // ── Desktop pill-navbar style ──────────────────────────────────────────────
  return (
    <motion.button
      onClick={onOpen}
      aria-label={`Open project cart, ${count} ${count === 1 ? "item" : "items"}`}
      className="relative flex items-center justify-center w-9 h-9 rounded-full transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#9C7A3F]/60"
      style={{
        color: "#6B6258",
        background: "rgba(255,253,248,0.70)",
        border: "1px solid rgba(156,122,63,0.32)",
      }}
      whileHover={{
        backgroundColor: "#ffffff",
        color: "#7A5E30",
        borderColor: "rgba(156,122,63,0.45)",
      }}
      whileTap={{ scale: 0.92 }}
      transition={{ duration: 0.15 }}
    >
      <CartIcon size={16} />

      {/* Live badge */}
      <AnimatePresence>
        {count > 0 && (
          <motion.span
            key="badge"
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0, opacity: 0 }}
            transition={{ type: "spring", stiffness: 400, damping: 20 }}
            className="absolute -top-0.5 -right-0.5 flex items-center justify-center min-w-[16px] h-4 px-[3px] rounded-full text-[9px] font-bold text-white"
            style={{ backgroundColor: "#7A5E30" }}
            aria-hidden="true"
          >
            {count > 99 ? "99+" : count}
          </motion.span>
        )}
      </AnimatePresence>
    </motion.button>
  );
}

// ── Inline SVG keeps the icon dependency-free and matches the navbar style ──

function CartIcon({ size }: { size: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 16 16"
      fill="none"
      aria-hidden="true"
    >
      <path
        d="M1 1h2l1.5 8h8l1.5-5H4"
        stroke="currentColor"
        strokeWidth="1.3"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <circle cx="6.5" cy="13" r="1" stroke="currentColor" strokeWidth="1.2" />
      <circle cx="11.5" cy="13" r="1" stroke="currentColor" strokeWidth="1.2" />
    </svg>
  );
}

export default ProjectCartButton;
