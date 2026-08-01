"use client";

/**
 * CollectionsPageContent
 * ---------------------------------------------------------------------------
 * Client-side body of /collections (the all-collections landing page).
 *
 * Reuses existing, already-styled pieces instead of inventing new ones:
 *   • <ProductCard> from ShopByProduct.tsx — the same bento-style card used
 *     in the homepage "Shop by Product" section. (Exported from that file
 *     specifically so it can be shared here without duplication.)
 *   • src/lib/products.ts — same single source of truth for category copy,
 *     cover images and hrefs used everywhere else on the site.
 *   • fraunces / inter — same brand type pairing as the rest of the site.
 *
 * A few genuinely new (and small) pieces are introduced here, because
 * nothing existing already matches the brief:
 *   • A compact "Why Wonder Wallz" trust strip (4 stats) — a lighter
 *     sibling of the full WonderWallzTrust section, not a duplicate of it.
 *   • A CTA pointing to /custom-design (distinct from the WhatsApp-flavoured
 *     WonderWallz_CTA used elsewhere).
 *   • A closing "Discover More at Wonder Wallz" section — a dark, premium
 *     band directing customers to the Merlin Homeland Showroom or WhatsApp
 *     for products not yet listed online. Sits last, immediately before the
 *     site footer.
 *
 * Design language: warm ivory (#F7F3EC) field, charcoal (#1E1B18) type,
 * blue→purple gradient accents, orange (#C4541A) exclusively for CTAs.
 */

import { motion, useReducedMotion } from "framer-motion";
import Link from "next/link";
import { Award, MapPin, MessageCircle, Sparkles, Truck, Wrench } from "lucide-react";
import { ProductCard } from "@/components/ShopByProduct";
import { getProductBySlug } from "@/lib/products";
import { fraunces, inter } from "@/lib/fonts";

// ─── Tiny icon (matches ShopByProduct's ArrowIcon) ──────────────────────────
function ArrowIcon({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 20 20" fill="none" className={className} aria-hidden="true">
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

// ─── Category order for this page (per brief) ───────────────────────────────
// Pulled from the same products.ts source of truth used by the navbar and
// homepage "Shop by Product" — no new data, just a curated order/subset.
const CATEGORY_SLUGS = [
  "wallpapers",
  "blinds",
  "curtains",
  "flooring",
  "glass-films",
  "canvas-prints",
  "mattresses-pillows",
] as const;

const categoryProducts = CATEGORY_SLUGS
  .map((slug) => getProductBySlug(slug))
  .filter((p): p is NonNullable<typeof p> => Boolean(p));

// ─── "Why Wonder Wallz" trust strip content ─────────────────────────────────
const trustPoints = [
  { icon: Award, label: "20+ Years Experience" },
  { icon: Sparkles, label: "HP Latex Printing" },
  { icon: Truck, label: "Pan India Delivery" },
  { icon: Wrench, label: "Installation in West Bengal" },
];

// ─── "Discover More" showroom / WhatsApp section ────────────────────────────
// TODO: swap in the real WhatsApp business number (E.164, no symbols) and the
// actual Google Maps place link for Merlin Homeland Showroom if these differ
// from the ones already used elsewhere on the site (e.g. WonderWallz_CTA).
const WHATSAPP_URL =
  "https://wa.me/919830173898?text=Hi%20Wonder%20Wallz%2C%20I%27d%20like%20to%20know%20more%20about%20products%20not%20listed%20on%20the%20website.";
const SHOWROOM_MAPS_URL =
  "https://maps.google.com/?q=Merlin+Homeland+Showroom+Wonder+Wallz";

// ─── Motion variants (match ShopByProduct's stagger pattern) ───────────────
const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.07 } },
};

const itemVariants = {
  hidden: { opacity: 0, y: 22 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.48, ease: [0.22, 1, 0.36, 1] as const },
  },
};

export default function CollectionsPageContent() {
  const prefersReduced = useReducedMotion();

  return (
    <div className={`${fraunces.variable} ${inter.variable}`}>
      {/* ════════════════════ HERO ═══════════════════════════════════════ */}
      <section
        aria-labelledby="collections-hero-heading"
        className="bg-[#F7F3EC] px-6 pt-20 pb-16 sm:pt-24 sm:pb-20 lg:pt-28 lg:pb-24"
      >
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
          className="mx-auto max-w-2xl text-center"
        >
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

          <h1
            id="collections-hero-heading"
            className="mt-3 font-[family-name:var(--font-display)] text-[clamp(2.25rem,5vw,3.25rem)] leading-[1.08] text-[#1E1B18]"
          >
            Explore Our Collections
          </h1>

          <div
            className="mx-auto mt-5 h-px w-14"
            style={{ background: "linear-gradient(90deg, #4F6EF7 0%, #8B5CF6 100%)" }}
          />

          <p className="mx-auto mt-5 max-w-md font-[family-name:var(--font-body)] text-[1rem] leading-relaxed text-[#7A6F5F]">
            Premium interior products for every space.
          </p>
        </motion.div>
      </section>

      {/* ════════════════════ CATEGORY GRID ═══════════════════════════════ */}
      <section
        aria-labelledby="collections-grid-heading"
        className="bg-[#F7F3EC] px-6 pb-20 sm:pb-24 lg:pb-28"
      >
        <h2 id="collections-grid-heading" className="sr-only">
          Browse all categories
        </h2>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-60px" }}
          className="mx-auto grid max-w-[1280px] grid-cols-1 gap-5 sm:grid-cols-2 sm:gap-6 lg:grid-cols-3 lg:gap-6"
          role="list"
        >
          {categoryProducts.map((product, index) => {
            const isLast = index === categoryProducts.length - 1;
            // When the final card would be left alone on its row (i.e. the
            // total count isn't evenly divisible by the column count), let
            // it span the full row instead of leaving empty tiles beside it.
            const isLoneOnSmRow = isLast && categoryProducts.length % 2 === 1;
            const isLoneOnLgRow = isLast && categoryProducts.length % 3 === 1;

            return (
              <motion.div
                key={product.id}
                variants={itemVariants}
                className={[
                  "h-full",
                  isLoneOnSmRow ? "sm:col-span-2" : "",
                  isLoneOnLgRow ? "lg:col-span-3" : "",
                ].join(" ")}
                role="listitem"
              >
                <ProductCard
                  product={product}
                  aspectClass={isLoneOnLgRow ? "aspect-[21/9] lg:aspect-[21/6]" : "aspect-[4/5]"}
                  prominent
                />
              </motion.div>
            );
          })}
        </motion.div>
      </section>

      {/* ════════════════════ WHY WONDER WALLZ ═══════════════════════════ */}
      <section
        aria-labelledby="collections-why-heading"
        className="bg-[#F0EBE2] px-6 py-16 sm:py-20"
      >
        <div className="mx-auto max-w-[1100px]">
          <h2
            id="collections-why-heading"
            className="text-center font-[family-name:var(--font-body)] text-[11px] font-semibold uppercase tracking-[0.22em] text-[#8A7A5E]"
          >
            Why Wonder Wallz
          </h2>

          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-40px" }}
            className="mt-8 grid grid-cols-2 gap-6 sm:grid-cols-4 sm:gap-8"
            role="list"
          >
            {trustPoints.map(({ icon: Icon, label }) => (
              <motion.div
                key={label}
                variants={itemVariants}
                role="listitem"
                className="flex flex-col items-center gap-3 text-center"
              >
                <span
                  className="flex h-12 w-12 items-center justify-center rounded-full bg-[#F7F3EC] ring-1 ring-[#E0D8CC]"
                  aria-hidden="true"
                >
                  <Icon size={20} strokeWidth={2} className="text-[#5457E5]" />
                </span>
                <span className="font-[family-name:var(--font-body)] text-[0.85rem] font-semibold leading-snug text-[#1E1B18]">
                  {label}
                </span>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ════════════════════ CTA ═════════════════════════════════════════ */}
      <section aria-labelledby="collections-cta-heading" className="bg-[#F7F3EC] px-6 py-20 sm:py-24">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-40px" }}
          transition={{ duration: 0.45 }}
          className="mx-auto max-w-2xl rounded-3xl bg-[#F0EBE2] px-8 py-14 text-center ring-1 ring-[#E0D8CC] sm:px-12"
        >
          <h2
            id="collections-cta-heading"
            className="font-[family-name:var(--font-display)] text-[clamp(1.6rem,3.4vw,2.1rem)] leading-snug text-[#1E1B18]"
          >
            Need something unique?
          </h2>
          <p className="mx-auto mt-3 max-w-md font-[family-name:var(--font-body)] text-[0.95rem] leading-relaxed text-[#7A6F5F]">
            Upload your own design, share your wall dimensions, and we&apos;ll
            bring your vision to life — custom-made, just for you.
          </p>

          <motion.div
            className="mt-8 flex justify-center"
            whileHover={prefersReduced ? {} : { y: -2 }}
            transition={{ type: "spring", stiffness: 340, damping: 28 }}
          >
            <Link
              href="/custom-design"
              className="inline-flex items-center gap-2.5 rounded-none border border-[#C4541A] bg-[#C4541A] px-8 py-3.5 font-[family-name:var(--font-body)] text-[0.83rem] font-semibold uppercase tracking-[0.1em] text-[#F7F3EC] transition-colors duration-300 hover:bg-transparent hover:text-[#C4541A]"
            >
              Create Custom Design
              <ArrowIcon className="h-3.5 w-3.5" />
            </Link>
          </motion.div>
        </motion.div>
      </section>

      {/* ════════════════════ DISCOVER MORE (SHOWROOM / WHATSAPP) ══════════ */}
      <section
        aria-labelledby="collections-discover-more-heading"
        className="relative overflow-hidden bg-[#1E1B18] px-6 py-20 sm:py-24"
      >
        {/* Tasteful background accents — soft gradient glows, brand palette,
            kept subtle so the section reads premium rather than busy. */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -top-32 -left-24 h-72 w-72 rounded-full blur-3xl"
          style={{ background: "radial-gradient(circle, rgba(79,110,247,0.28) 0%, rgba(79,110,247,0) 70%)" }}
        />
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -bottom-32 -right-24 h-80 w-80 rounded-full blur-3xl"
          style={{ background: "radial-gradient(circle, rgba(139,92,246,0.24) 0%, rgba(139,92,246,0) 70%)" }}
        />
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0"
          style={{
            backgroundImage:
              "linear-gradient(rgba(247,243,236,0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(247,243,236,0.05) 1px, transparent 1px)",
            backgroundSize: "48px 48px",
            maskImage: "radial-gradient(ellipse 60% 60% at 50% 50%, black, transparent)",
            WebkitMaskImage: "radial-gradient(ellipse 60% 60% at 50% 50%, black, transparent)",
          }}
        />

        <motion.div
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
          className="relative mx-auto max-w-3xl text-center"
        >
          <span
            className="inline-block font-[family-name:var(--font-body)] text-[11px] font-semibold uppercase tracking-[0.22em]"
            style={{
              background: "linear-gradient(105deg, #4F6EF7 0%, #8B5CF6 100%)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
            }}
          >
            Beyond the Website
          </span>

          <h2
            id="collections-discover-more-heading"
            className="mt-3 font-[family-name:var(--font-display)] text-[clamp(1.8rem,4vw,2.6rem)] leading-[1.12] text-[#F7F3EC]"
          >
            Discover More at Wonder Wallz
          </h2>

          <p className="mx-auto mt-3 max-w-lg font-[family-name:var(--font-body)] text-[0.95rem] font-medium text-[#C9BFAE]">
            Our website showcases only a curated selection of our product range.
          </p>

          <div
            className="mx-auto mt-6 h-px w-14"
            style={{ background: "linear-gradient(90deg, #4F6EF7 0%, #8B5CF6 100%)" }}
          />

          <p className="mx-auto mt-6 max-w-xl font-[family-name:var(--font-body)] text-[1rem] leading-relaxed text-[#B8AD9C]">
           Our website showcases only a curated selection of our catalogue.
          </p>
          <p className="mx-auto mt-4 max-w-xl font-[family-name:var(--font-body)] text-[1rem] leading-relaxed text-[#B8AD9C]">
            Visit our Merlin Homeland Showroom to explore additional product categories, exclusive collections, materials, and finishes that are not yet available on our website.
          </p>
          <p className="mx-auto mt-4 max-w-xl font-[family-name:var(--font-body)] text-[1rem] leading-relaxed text-[#B8AD9C]">
           Prefer shopping from home? Enquire on WhatsApp and our team will share catalogue options, recommend suitable products, and help you discover solutions beyond what's currently listed online.
          </p>

          {/* ── CTAs ── */}
          <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
            <motion.div
              whileHover={prefersReduced ? {} : { y: -2 }}
              transition={{ type: "spring", stiffness: 340, damping: 28 }}
            >
              <a
                href={SHOWROOM_MAPS_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2.5 rounded-none border border-[#C4541A] bg-[#C4541A] px-8 py-3.5 font-[family-name:var(--font-body)] text-[0.83rem] font-semibold uppercase tracking-[0.1em] text-[#F7F3EC] transition-colors duration-300 hover:bg-transparent hover:text-[#C4541A]"
              >
                <MapPin size={15} strokeWidth={2} aria-hidden="true" />
                Visit Merlin Homeland Showroom
              </a>
            </motion.div>

            <motion.div
              whileHover={prefersReduced ? {} : { y: -2 }}
              transition={{ type: "spring", stiffness: 340, damping: 28 }}
            >
              <a
                href={WHATSAPP_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2.5 rounded-none border border-[#F7F3EC]/30 bg-transparent px-8 py-3.5 font-[family-name:var(--font-body)] text-[0.83rem] font-semibold uppercase tracking-[0.1em] text-[#F7F3EC] transition-colors duration-300 hover:border-[#F7F3EC] hover:bg-[#F7F3EC]/10"
              >
                <MessageCircle size={15} strokeWidth={2} aria-hidden="true" />
                Chat on WhatsApp
              </a>
            </motion.div>
          </div>

          <p className="mx-auto mt-9 max-w-md font-[family-name:var(--font-body)] text-[0.85rem] italic leading-relaxed text-[#8A7A5E]">
            Looking for something you don&apos;t see online? There&apos;s a
            good chance we have it.
          </p>
        </motion.div>
      </section>
    </div>
  );
}
