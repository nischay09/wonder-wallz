"use client";

import React from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { Transformation } from "./transformations";

interface TransformationInfoProps {
  transformation: Transformation;
}

// First two fields are "hero" metadata — rendered larger and without a card box.
// The remaining three are secondary — smaller, card-style, lower visual weight.
const primaryItems = [
  { label: "Collection", key: "collection" as const },
  { label: "Product Type", key: "product" as const },
];

const secondaryItems = [
  { label: "Material", key: "material" as const },
  { label: "Dimensions", key: "dimensions" as const },
  { label: "Installation", key: "installationTime" as const },
];

const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 8 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.38, delay, ease: [0.22, 1, 0.36, 1] as const },
});

const cardVariants = {
  hidden: { opacity: 0, y: 12 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: 0.18 + i * 0.06, duration: 0.38, ease: [0.22, 1, 0.36, 1] },
  }),
};

export default function TransformationInfo({ transformation }: TransformationInfoProps) {
  return (
    <div className="w-full">

      {/* ── Title block ─────────────────────────────────────────── */}
      <div className="mb-8">
        <motion.p
          key={transformation.id + "-eyebrow"}
          {...fadeUp(0)}
          className="text-xs font-semibold tracking-[0.22em] uppercase mb-2"
          style={{ color: "#B5926A" }}
        >
          Featured Project
        </motion.p>

        <motion.h3
          key={transformation.id + "-h3"}
          {...fadeUp(0.06)}
          className="text-2xl md:text-3xl font-semibold leading-tight mb-2"
          style={{
            color: "#2C1F14",
            fontFamily: "'Playfair Display', Georgia, serif",
            letterSpacing: "-0.01em",
          }}
        >
          {transformation.title}
        </motion.h3>

        <motion.p
          key={transformation.id + "-location"}
          {...fadeUp(0.11)}
          className="text-xs font-medium tracking-[0.14em] uppercase mb-4"
          style={{ color: "#A07850" }}
        >
          {transformation.location}
        </motion.p>

        {/* CTA lives close to the title — feels connected, not orphaned */}
        <motion.div key={transformation.id + "-cta"} {...fadeUp(0.16)}>
          <Link
            href={transformation.href}
            className="inline-flex items-center gap-2 text-sm font-semibold tracking-wide transition-colors duration-200"
            style={{ color: "#8B6E50" }}
          >
            <span className="border-b border-current pb-px">
              Explore This Collection
            </span>
            <motion.span
              className="inline-block"
              animate={{ x: 0 }}
              whileHover={{ x: 4 }}
              transition={{ type: "spring", stiffness: 400, damping: 20 }}
            >
              →
            </motion.span>
          </Link>
        </motion.div>

        {/* Optional description */}
        {transformation.description && (
          <motion.p
            key={transformation.id + "-desc"}
            {...fadeUp(0.2)}
            className="text-sm leading-relaxed mt-3"
            style={{ color: "#7A6855" }}
          >
            {transformation.description}
          </motion.p>
        )}
      </div>

      {/* ── Divider ─────────────────────────────────────────────── */}
      <motion.div
        key={transformation.id + "-divider"}
        initial={{ opacity: 0, scaleX: 0.6 }}
        animate={{ opacity: 1, scaleX: 1 }}
        transition={{ duration: 0.45, delay: 0.14, ease: [0.22, 1, 0.36, 1] }}
        style={{
          height: 1,
          background: "linear-gradient(90deg, rgba(181,146,106,0.25) 0%, rgba(181,146,106,0.05) 100%)",
          transformOrigin: "left",
          marginBottom: "24px",
        }}
      />

      {/* ── Metadata ────────────────────────────────────────────── */}
      {/* Primary: two hero fields — inline label + value, no card box */}
      <div className="flex flex-wrap gap-x-10 gap-y-4 mb-6">
        {primaryItems.map(({ label, key }, i) => (
          <motion.div
            key={transformation.id + key}
            custom={i}
            variants={cardVariants}
            initial="hidden"
            animate="visible"
            className="flex flex-col gap-0.5"
          >
            <span
              className="text-xs font-medium tracking-[0.12em] uppercase"
              style={{ color: "#B5926A" }}
            >
              {label}
            </span>
            <span
              className="text-base font-semibold"
              style={{ color: "#2C1F14", fontFamily: "'Playfair Display', Georgia, serif" }}
            >
              {transformation[key]}
            </span>
          </motion.div>
        ))}
      </div>

      {/* Secondary: three supporting fields — compact card-style */}
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
        {secondaryItems.map(({ label, key }, i) => (
          <motion.div
            key={transformation.id + key}
            custom={i + 2}
            variants={cardVariants}
            initial="hidden"
            animate="visible"
            className="flex flex-col gap-0.5 px-3 py-2.5"
            style={{
              background: "rgba(255,251,245,0.85)",
              border: "1px solid rgba(181,146,106,0.15)",
              borderRadius: "12px",
            }}
          >
            <span
              className="text-xs font-medium tracking-[0.1em] uppercase"
              style={{ color: "#B5926A", fontSize: "10px" }}
            >
              {label}
            </span>
            <span
              className="text-sm font-medium leading-snug"
              style={{ color: "#3A2D24" }}
            >
              {transformation[key]}
            </span>
          </motion.div>
        ))}
      </div>

    </div>
  );
}
