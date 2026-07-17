"use client";

/**
 * ShopByCategory
 * ---------------------------------------------------------------------------
 * Homepage "Shop by Category" section — the single reusable entry point into
 * Wonder Wallz's full product catalog.
 *
 * Redesign goals vs. the previous ShopByProduct bento layout:
 *   • ~35–40% shorter — one uniform grid instead of a featured/secondary split
 *   • Every category occupies identical visual space (equal-size tiles)
 *   • Image-led: name is a compact overlay label, not a caption block
 *   • Minimal chrome — hairline border, no gradients, shadow only on hover
 *
 * Still reads entirely from `src/lib/products.ts`, so every card and link
 * across the site stays in sync with one data file.
 */

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import { products, type Product } from "@/lib/products";
import { fraunces, inter } from "@/lib/fonts";

// ─── Tiny icon ───────────────────────────────────────────────────────────────
function ArrowIcon({ className = "" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 20 20"
      fill="none"
      className={className}
      aria-hidden="true"
    >
      <path
        d="M4 10h12M11 5l5 5-5 5"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

// ─── Placeholder gradient when coverImage 404s ──────────────────────────────
function PlaceholderBg({ gradient }: { gradient: [string, string] }) {
  return (
    <div
      className="absolute inset-0"
      style={{
        background: `linear-gradient(140deg, ${gradient[0]} 0%, ${gradient[1]} 100%)`,
      }}
    />
  );
}

// ─── Category tile ────────────────────────────────────────────────────────────
function CategoryTile({ product }: { product: Product }) {
  const [imgFailed, setImgFailed] = useState(false);
  const prefersReduced = useReducedMotion();
  const { title, coverImage, href, placeholderGradient } = product;

  // Optional short label support without changing the data schema.
  const label = (product as Product & { shortTitle?: string }).shortTitle ?? title;

  return (
    <Link
      href={href}
      aria-label={`Shop ${title}`}
      className="group block h-full rounded-2xl focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#C4541A] focus-visible:ring-offset-2 focus-visible:ring-offset-[#F7F3EC]"
    >
      <motion.article
        className="relative flex h-full flex-col overflow-hidden rounded-2xl border border-[#E4DAC4] bg-[#F0EBE2]"
        whileHover={
          prefersReduced
            ? {}
            : { y: -3, boxShadow: "0 14px 28px -10px rgba(30,27,24,0.20)" }
        }
        whileTap={prefersReduced ? {} : { scale: 0.98 }}
        transition={{ type: "spring", stiffness: 360, damping: 30 }}
      >
        <div className="relative aspect-[3/4] w-full overflow-hidden rounded-2xl">
          {!imgFailed ? (
            <Image
              src={coverImage}
              alt={`${title} category`}
              fill
              sizes="(min-width: 1280px) 14vw, (min-width: 1024px) 25vw, (min-width: 640px) 33vw, 50vw"
              onError={() => setImgFailed(true)}
              className={[
                "object-cover transition-transform duration-700 ease-out",
                prefersReduced ? "" : "group-hover:scale-[1.05]",
              ].join(" ")}
            />
          ) : (
            <PlaceholderBg gradient={placeholderGradient} />
          )}

          {/* Grounding gradient so the label stays legible on any image */}
          <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#1E1B18]/70 via-[#1E1B18]/5 to-transparent" />

          {/* Label */}
          <div className="absolute inset-x-0 bottom-0 px-3.5 pb-3.5 pt-6">
            <h3 className="font-[family-name:var(--font-display)] text-[0.98rem] leading-tight text-white truncate">
              {label}
            </h3>
            <span className="mt-1 flex items-center gap-1 font-[family-name:var(--font-body)] text-[0.66rem] font-semibold uppercase tracking-[0.1em] text-[#F0DDC8] opacity-90">
              <span className="border-b border-transparent transition-colors duration-300 group-hover:border-[#C4541A] group-hover:text-white">
                Shop
              </span>
              <ArrowIcon className="h-3 w-3 transition-transform duration-300 group-hover:translate-x-0.5" />
            </span>
          </div>
        </div>
      </motion.article>
    </Link>
  );
}

// ─── Stagger config ──────────────────────────────────────────────────────────
const containerVariants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.05 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 16 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.4, ease: [0.22, 1, 0.36, 1] },
  },
};

// ─── Section ─────────────────────────────────────────────────────────────────
export default function ShopByCategory() {
  return (
    <section
      aria-labelledby="sbc-heading"
      className={`${fraunces.variable} ${inter.variable} bg-[#F7F3EC] py-14 sm:py-16 lg:py-20`}
    >
      <div className="mx-auto max-w-[1280px] px-6">
        {/* ── Header ── */}
        <motion.div
          initial={{ opacity: 0, y: 14 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
          className="flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-end"
        >
          <div>
            <span className="font-[family-name:var(--font-body)] text-[11px] font-semibold uppercase tracking-[0.22em] text-[#C4541A]">
              Wonder Wallz
            </span>
            <h2
              id="sbc-heading"
              className="mt-2 font-[family-name:var(--font-display)] text-[clamp(1.75rem,3vw,2.25rem)] leading-[1.1] text-[#1E1B18]"
            >
              Shop by Category
            </h2>
          </div>

          <Link
            href="/collections"
            className="group inline-flex shrink-0 items-center gap-2 rounded-sm font-[family-name:var(--font-body)] text-[0.8rem] font-semibold uppercase tracking-[0.08em] text-[#1E1B18] transition-colors duration-300 ease-out hover:text-[#C4541A] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#C4541A] focus-visible:ring-offset-2 focus-visible:ring-offset-[#F7F3EC]"
          >
            View Full Catalog
            <ArrowIcon className="h-3.5 w-3.5 transition-transform duration-300 group-hover:translate-x-1" />
          </Link>
        </motion.div>

        {/* ── Uniform category grid ── */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-40px" }}
          className="mt-8 grid grid-cols-2 gap-3.5 sm:grid-cols-3 sm:gap-4 lg:grid-cols-4 xl:grid-cols-7"
          role="list"
        >
          {products.map((product) => (
            <motion.div key={product.id} variants={itemVariants} role="listitem">
              <CategoryTile product={product} />
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
