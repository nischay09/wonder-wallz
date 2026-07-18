"use client";

/**
 * ShopByProduct
 * ---------------------------------------------------------------------------
 * Homepage "Shop by Product" section — the single reusable entry point into
 * Wonder Wallz's full product catalog.
 *
 * Replaces the previous FeaturedCollections component. Now driven entirely by
 * `src/lib/products.ts` so every card, link, and dropdown across the site
 * stays in sync with one data file.
 *
 * Layout:
 *   • Featured row  — asymmetric bento grid (the four flagged products)
 *   • Secondary row — compact equal-width strip (remaining products)
 *   • Bottom CTA    — link to /collections
 *
 * Design language:
 *   Warm ivory (#F7F3EC) field, charcoal (#1E1B18) type, blue→purple accent
 *   gradient for category chips, orange (#C4541A) exclusively for CTAs.
 *   24 px rounded corners, large editorial images, Framer Motion hover lift.
 */

import { useState, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import {
  products,
  getFeaturedProducts,
  type Product,
} from "@/lib/products";
import { fraunces, inter } from "@/lib/fonts";

// ─── Bento column spans (12-col grid) ───────────────────────────────────────
// Featured row (4 products): wide–narrow–narrow–wide so the grid feels alive.
// Spans must sum to 12 per visual row; at sm we collapse to 2-col pairs.
const FEATURED_SPAN: Record<string, string> = {
  wallpapers: "lg:col-span-5",
  blinds: "lg:col-span-7",
  curtains: "lg:col-span-7",
  upholstery: "lg:col-span-5",
};

const FEATURED_ASPECT: Record<string, string> = {
  wallpapers: "aspect-[4/5]",
  blinds: "aspect-[16/11]",
  curtains: "aspect-[16/11]",
  upholstery: "aspect-[4/5]",
};

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

// ─── Brand-color accent chip ─────────────────────────────────────────────────
function CategoryChip({ label }: { label: string }) {
  return (
    <span
      className="inline-block rounded-full px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.14em] text-white"
      style={{
        // Matches --color-primary / --color-accent from globals.css instead
        // of the previous off-brand blue→purple gradient.
        background: "linear-gradient(105deg, #1F2238 0%, #B38B6D 100%)",
      }}
    >
      {label}
    </span>
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

// ─── Main product card ────────────────────────────────────────────────────────
export interface ProductCardProps {
  product: Product;
  aspectClass?: string;
  /** When true, title/description are rendered larger (featured row) */
  prominent?: boolean;
}

export function ProductCard({
  product,
  aspectClass = "aspect-[4/5]",
  prominent = false,
}: ProductCardProps) {
  const [imgFailed, setImgFailed] = useState(false);
  const prefersReduced = useReducedMotion();
  const { title, description, coverImage, href, placeholderGradient, id } =
    product;

  return (
    <Link
      href={href}
      aria-label={`Shop ${title}`}
      className="group block h-full focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#4F6EF7] focus-visible:ring-offset-2 focus-visible:ring-offset-[#F7F3EC]"
    >
      <motion.article
        className="relative flex h-full flex-col overflow-hidden rounded-3xl bg-[#F0EBE2] ring-1 ring-[#E0D8CC]"
        whileHover={
          prefersReduced
            ? {}
            : { y: -4, boxShadow: "0 24px 48px -8px rgba(30,27,24,0.22)" }
        }
        transition={{ type: "spring", stiffness: 340, damping: 28 }}
      >
        {/* ── Image ── */}
        <div className={`relative ${aspectClass} overflow-hidden`}>
          {!imgFailed ? (
            <Image
              src={coverImage}
              alt={`${title} product cover`}
              fill
              sizes="(min-width: 1024px) 42vw, (min-width: 640px) 50vw, 100vw"
              onError={() => setImgFailed(true)}
              className={[
                "object-cover transition-transform duration-700 ease-out",
                prefersReduced ? "" : "group-hover:scale-[1.04]",
              ].join(" ")}
            />
          ) : (
            <PlaceholderBg gradient={placeholderGradient} />
          )}

          {/* Grounding gradient overlay */}
          <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#1E1B18]/50 via-transparent to-transparent opacity-80 transition-opacity duration-500 group-hover:opacity-100" />

          {/* Category chip — bottom-left of image */}
          <div className="absolute bottom-4 left-4">
            <CategoryChip label={title} />
          </div>
        </div>

        {/* ── Caption ── */}
        <div className="flex flex-1 flex-col gap-2 px-6 py-5">
          <h3
            className={[
              "font-[family-name:var(--font-display)] leading-snug text-[#1E1B18]",
              prominent ? "text-[1.45rem]" : "text-[1.1rem]",
            ].join(" ")}
          >
            {title}
          </h3>
          <p className="font-[family-name:var(--font-body)] text-[0.84rem] leading-relaxed text-[#6B6358]">
            {description}
          </p>

          <span className="mt-auto inline-flex items-center gap-1.5 pt-3 font-[family-name:var(--font-body)] text-[0.75rem] font-semibold uppercase tracking-[0.09em] text-[#C4541A]">
            <span className="border-b border-transparent transition-colors duration-300 group-hover:border-[#C4541A]">
              Shop Now
            </span>
            <ArrowIcon className="h-3.5 w-3.5 transition-transform duration-300 group-hover:translate-x-1" />
          </span>
        </div>
      </motion.article>
    </Link>
  );
}

// ─── Secondary (compact) card ─────────────────────────────────────────────────
function SecondaryCard({ product }: { product: Product }) {
  const [imgFailed, setImgFailed] = useState(false);
  const prefersReduced = useReducedMotion();
  const { title, description, coverImage, href, placeholderGradient } = product;

  return (
    <Link
      href={href}
      aria-label={`Shop ${title}`}
      className="group block focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#4F6EF7] focus-visible:ring-offset-2 focus-visible:ring-offset-[#F7F3EC]"
    >
      <motion.article
        className="relative overflow-hidden rounded-3xl bg-[#F0EBE2] ring-1 ring-[#E0D8CC]"
        whileHover={
          prefersReduced
            ? {}
            : { y: -3, boxShadow: "0 16px 32px -8px rgba(30,27,24,0.18)" }
        }
        transition={{ type: "spring", stiffness: 340, damping: 28 }}
      >
        {/* Image */}
        <div className="relative aspect-[16/10] overflow-hidden">
          {!imgFailed ? (
            <Image
              src={coverImage}
              alt={`${title} product cover`}
              fill
              sizes="(min-width: 640px) 33vw, 50vw"
              onError={() => setImgFailed(true)}
              className={[
                "object-cover transition-transform duration-700 ease-out",
                prefersReduced ? "" : "group-hover:scale-[1.04]",
              ].join(" ")}
            />
          ) : (
            <PlaceholderBg gradient={placeholderGradient} />
          )}
          <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#1E1B18]/45 via-transparent to-transparent" />
        </div>

        {/* Caption */}
        <div className="flex items-center justify-between gap-3 px-5 py-4">
          <div>
            <h3 className="font-[family-name:var(--font-display)] text-[1.05rem] leading-snug text-[#1E1B18]">
              {title}
            </h3>
            <p className="mt-0.5 font-[family-name:var(--font-body)] text-[0.78rem] text-[#7A6F5F]">
              {description}
            </p>
          </div>
          <ArrowIcon className="h-4 w-4 shrink-0 text-[#C4541A] transition-transform duration-300 group-hover:translate-x-1" />
        </div>
      </motion.article>
    </Link>
  );
}

// ─── Stagger config ──────────────────────────────────────────────────────────
const containerVariants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.07 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 22 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.48, ease: [0.22, 1, 0.36, 1] },
  },
};

// ─── Section ─────────────────────────────────────────────────────────────────
export default function ShopByProduct() {
  const featuredProducts = getFeaturedProducts();

  const secondaryProducts = products.filter(
    (product) => !product.featured
  );
  return (
    <section
      aria-labelledby="sbp-heading"
      className={`${fraunces.variable} ${inter.variable} bg-[#F7F3EC] py-20 sm:py-24 lg:py-28`}
    >
      <div className="mx-auto max-w-[1280px] px-6">
        {/* ── Header ── */}
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
          className="mx-auto max-w-2xl text-center"
        >
          {/* Eyebrow with gradient accent */}
          <span
            className="inline-block font-[family-name:var(--font-body)] text-[11px] font-semibold uppercase tracking-[0.22em]"
            style={{
              background: "linear-gradient(105deg, #4F6EF7 0%, #8B5CF6 100%)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
            }}
          >
            Wonder Wallz
          </span>

          <h2
            id="sbp-heading"
            className="mt-3 font-[family-name:var(--font-display)] text-[clamp(2rem,4vw,2.75rem)] leading-[1.1] text-[#1E1B18]"
          >
            Shop by Product
          </h2>

          {/* Gradient divider */}
          <div
            className="mx-auto mt-5 h-px w-14"
            style={{
              background:
                "linear-gradient(90deg, #4F6EF7 0%, #8B5CF6 100%)",
            }}
          />

          <p className="mx-auto mt-5 max-w-md font-[family-name:var(--font-body)] text-[0.95rem] leading-relaxed text-[#7A6F5F]">
            Everything your home needs, in one place — from statement wallpapers
            to precision blinds and beyond.
          </p>
        </motion.div>

        {/* ── Featured bento grid ── */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-60px" }}
          className="mt-14 grid grid-cols-1 gap-5 sm:grid-cols-2 sm:gap-6 lg:grid-cols-12 lg:gap-6"
          role="list"
        >
          {featuredProducts.map((product) => (
            <motion.div
              key={product.id}
              variants={itemVariants}
              className={[
                "h-full",
                // sm: first two span full 2 cols, second two share equally
                product.id === "wallpapers" || product.id === "blinds"
                  ? ""
                  : "",
                FEATURED_SPAN[product.id] ?? "lg:col-span-6",
              ].join(" ")}
              role="listitem"
            >
              <ProductCard
                product={product}
                aspectClass={FEATURED_ASPECT[product.id] ?? "aspect-[4/5]"}
                prominent
              />
            </motion.div>
          ))}
        </motion.div>

        {/* ── Secondary strip ── */}
        {secondaryProducts.length > 0 && (
          <div className="mt-10">
            {/* Divider label */}
            <div className="flex items-center gap-4">
              <span className="font-[family-name:var(--font-body)] text-[11px] font-semibold uppercase tracking-[0.22em] text-[#8A7A5E]">
                Also Available
              </span>
              <div className="h-px flex-1 bg-[#E4DAC4]" />
            </div>

            <motion.div
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-40px" }}
              className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-3 sm:gap-5"
              role="list"
            >
              {secondaryProducts.map((product) => (
                <motion.div
                  key={product.id}
                  variants={itemVariants}
                  role="listitem"
                >
                  <SecondaryCard product={product} />
                </motion.div>
              ))}
            </motion.div>
          </div>
        )}

        {/* ── Bottom CTA ── */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-40px" }}
          transition={{ duration: 0.45, delay: 0.1 }}
          className="mt-16 text-center"
        >
          <Link
            href="/collections"
            className="inline-flex items-center gap-2.5 rounded-none border border-[#C4541A] px-8 py-3.5 font-[family-name:var(--font-body)] text-[0.83rem] font-semibold uppercase tracking-[0.1em] text-[#C4541A] transition-colors duration-300 hover:bg-[#C4541A] hover:text-[#F7F3EC]"
          >
            Explore Full Catalog
            <ArrowIcon className="h-3.5 w-3.5" />
          </Link>
        </motion.div>
      </div>
    </section>
  );
}


