"use client";

/**
 * src/components/Collection/CollectionHeroFlagship.tsx
 *
 * A premium, catalogue-appropriate hero used ONLY for the flagship
 * Wallpapers collection (see the `variant="flagship"` switch in
 * CollectionExplorer). Every other collection keeps the existing,
 * lighter-weight <CollectionHero>.
 *
 * This is deliberately NOT a landing-page sales hero: there's no single
 * oversized marketing headline chasing a signup. It's the front door of a
 * real, browsable catalogue — so the design's job is to build emotional
 * momentum (real wallpaper imagery, trust signals) while keeping the
 * fastest possible path into the grid (search is one scroll away, and the
 * "Browse the Collection" CTA jumps straight past the fold).
 *
 * Signature element: the image collage's top tile has a peeled corner —
 * a literal nod to wallpaper as a physical, tactile material, rendered in
 * pure CSS (clip-path + layered shadow), not a stock hero photo treatment.
 *
 * Uses the same brand tokens as the rest of Collection/*: EASE_BRAND,
 * font-display (Playfair) for headings, font-body (DM Sans) for copy,
 * rounded-pill chips, the primary/orange accent split already established
 * in CollectionHero and CustomerActions.
 */

import { motion } from "framer-motion";
import Link from "next/link";
import { Layers, Ruler, Leaf, Wrench } from "lucide-react";
import type { Collection, CollectionProduct } from "@/lib/collections";
import { CustomerActions } from "@/components/Collection/CustomerActions";
import { FadeImage } from "@/components/ui/FadeImage";

interface CollectionHeroFlagshipProps {
  collection: Collection;
  /** A handful of representative products used to build the image collage. */
  featuredProducts: CollectionProduct[];
  activeCategory?: string;
  onCategoryChange?: (slug: string) => void;
  hideChips?: boolean;
  /** id of the element to scroll to when "Browse the Collection" is pressed. */
  scrollTargetId: string;
}

const EASE_BRAND = [0.22, 1, 0.36, 1] as const;

const TRUST_POINTS = [
  { icon: Layers, label: "500+ Premium Designs" },
  { icon: Ruler, label: "Custom Sized" },
  { icon: Leaf, label: "Eco-Friendly HP Latex Printing" },
  { icon: Wrench, label: "Professional Installation" },
] as const;

export function CollectionHeroFlagship({
  collection,
  featuredProducts,
  activeCategory,
  onCategoryChange,
  hideChips = false,
  scrollTargetId,
}: CollectionHeroFlagshipProps) {
  const { title, heroDescription, subcategories, placeholderGradient } = collection;
  const isFilterMode = typeof onCategoryChange === "function";

  // Up to 5 collage tiles. Falls back gracefully if fewer products exist.
  const collageProducts = featuredProducts.slice(0, 5);

  return (
    <section
      className="relative w-full overflow-hidden bg-[#F7F3EC]"
      aria-label={`${title} collection hero`}
    >
      {/* ── Ambient gradient wash (matches CollectionHero's brand gradient) ── */}
      <div
        className="absolute inset-0"
        style={{
          background: `linear-gradient(160deg, ${placeholderGradient[0]}22 0%, transparent 45%, ${placeholderGradient[1]}18 100%)`,
        }}
        aria-hidden="true"
      />
      <div
        className="absolute inset-0 opacity-40"
        style={{
          background:
            "radial-gradient(at 15% 20%, rgba(79,110,247,0.12) 0, transparent 50%), radial-gradient(at 85% 60%, rgba(139,92,246,0.10) 0, transparent 55%)",
        }}
        aria-hidden="true"
      />

      {/*
        ── Mobile navbar clearance ──────────────────────────────────────
        The navbar is `position: fixed` and floats outside document flow —
        no page reserves space for it, so content renders directly under
        it. `Navbar` now measures its own real rendered height (which
        changes with its scrolled-state animation and safe-area inset) and
        publishes it as `--navbar-h` on the document root (see
        useNavbarHeightVar in Navbar.tsx). This just adds breathing room on
        top of that real measurement. The 96px fallback covers the single
        frame before that effect runs on first paint, and approximates the
        unscrolled mobile navbar + safe-area height.
      */}
      <div
        className="container-site relative z-10 pb-16 md:pb-20 lg:pb-24"
        style={{ paddingTop: "calc(var(--navbar-h, 96px) + 1.5rem)" }}
      >
        {/* Breadcrumb */}
        <motion.nav
          initial={{ opacity: 0, y: -8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, ease: EASE_BRAND }}
          aria-label="Breadcrumb"
          className="mb-8 md:mb-10"
        >
          <ol className="flex items-center gap-2 text-xs font-medium uppercase tracking-wider">
            <li>
              <Link href="/" className="text-neutral-500 hover:text-neutral-900 transition-colors duration-150">
                Home
              </Link>
            </li>
            <li aria-hidden="true" className="text-neutral-300 select-none">/</li>
            <li>
              <Link href="/#shop" className="text-neutral-500 hover:text-neutral-900 transition-colors duration-150">
                Collections
              </Link>
            </li>
            <li aria-hidden="true" className="text-neutral-300 select-none">/</li>
            <li className="text-neutral-900 font-semibold" aria-current="page">
              {title}
            </li>
          </ol>
        </motion.nav>

        <div className="grid grid-cols-1 lg:grid-cols-[minmax(0,1fr)_460px] gap-12 lg:gap-10 items-center">
          {/* ══════════════ Left: copy, trust strip, CTAs ══════════════ */}
          <div>
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, ease: EASE_BRAND, delay: 0.05 }}
              className="mb-5"
            >
              <span
                className="inline-flex items-center gap-1.5 px-3 py-1 rounded-pill text-xs font-semibold tracking-wider uppercase border bg-primary/10 text-primary border-primary/20"
              >
                <span className="inline-block w-1.5 h-1.5 rounded-full bg-primary" aria-hidden="true" />
                Wonder Wallz Flagship Collection
              </span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.55, ease: EASE_BRAND, delay: 0.1 }}
              className="font-display text-4xl md:text-5xl lg:text-[4rem] font-bold tracking-tight text-neutral-900 mb-5 leading-[1.03]"
              style={{ fontFamily: "var(--font-playfair, serif)" }}
            >
              {title}
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, ease: EASE_BRAND, delay: 0.15 }}
              className="text-lg md:text-xl text-neutral-700 leading-relaxed mb-8 max-w-xl"
              style={{ fontFamily: "var(--font-dm-sans, sans-serif)" }}
            >
              {heroDescription}
            </motion.p>

            {/* ── Trust indicators ── */}
            <motion.div
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.45, ease: EASE_BRAND, delay: 0.22 }}
              className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-9"
              role="list"
              aria-label="Why choose Wonder Wallz wallpapers"
            >
              {TRUST_POINTS.map(({ icon: Icon, label }, i) => (
                <div
                  key={label}
                  role="listitem"
                  className="flex flex-col items-start gap-2 rounded-2xl border border-white/60 bg-white/70 backdrop-blur-sm px-3.5 py-3.5 shadow-sm"
                >
                  <span
                    className="flex h-9 w-9 items-center justify-center rounded-full bg-primary/10 text-primary"
                    aria-hidden="true"
                  >
                    <Icon size={17} strokeWidth={2} />
                  </span>
                  <span className="text-xs font-semibold leading-snug text-neutral-800">
                    {label}
                  </span>
                </div>
              ))}
            </motion.div>

            {/* ── Subcategory chips (nav or in-place filter, same contract as CollectionHero) ── */}
            {!hideChips && subcategories && subcategories.length > 0 && (
              <motion.div
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, ease: EASE_BRAND, delay: 0.28 }}
                className="flex flex-wrap gap-2 mb-8"
                role={isFilterMode ? "group" : "list"}
                aria-label={isFilterMode ? `Filter ${title} by category` : `${title} subcategories`}
              >
                {subcategories.map((sub, i) => {
                  const isActive = isFilterMode && activeCategory === sub.slug;
                  const chipClassName = `inline-block px-4 py-1.5 backdrop-blur-sm rounded-pill text-sm font-medium transition-all duration-200 shadow-sm hover:shadow-md ${
                    isActive
                      ? "bg-neutral-900 text-white border border-neutral-900"
                      : "bg-white/70 hover:bg-white border border-white/50 hover:border-white text-neutral-800 hover:text-neutral-900"
                  }`;
                  return (
                    <motion.div
                      key={sub.id}
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ duration: 0.3, ease: EASE_BRAND, delay: 0.3 + i * 0.04 }}
                      role={isFilterMode ? undefined : "listitem"}
                    >
                      {isFilterMode ? (
                        <button
                          type="button"
                          onClick={() => onCategoryChange?.(sub.slug)}
                          aria-pressed={isActive}
                          className={chipClassName}
                        >
                          {sub.title}
                        </button>
                      ) : (
                        <Link href={sub.href} className={chipClassName}>
                          {sub.title}
                        </Link>
                      )}
                    </motion.div>
                  );
                })}
              </motion.div>
            )}

            {/* ── Primary CTA: fastest path into the grid ── */}
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, ease: EASE_BRAND, delay: 0.34 }}
              className="flex flex-wrap items-center gap-4"
            >
              <a
                href={`#${scrollTargetId}`}
                className="inline-flex items-center gap-2.5 rounded-none border border-[#C4541A] bg-[#C4541A] px-7 py-3.5 text-[0.83rem] font-semibold uppercase tracking-[0.1em] text-white transition-colors duration-300 hover:bg-transparent hover:text-[#C4541A]"
              >
                Browse the Collection
                <svg viewBox="0 0 20 20" fill="none" className="h-3.5 w-3.5" aria-hidden="true">
                  <path d="M4 10h12M11 5l5 5-5 5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </a>
              <span className="text-sm text-neutral-500">
                Search, filter and add to your project below
              </span>
            </motion.div>
          </div>

          {/* ══════════════ Right: image collage ══════════════ */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: EASE_BRAND, delay: 0.2 }}
            className="relative hidden md:block"
            style={{ height: "480px" }}
            aria-hidden={collageProducts.length === 0 ? "true" : undefined}
          >
            {collageProducts.length > 0 ? (
              <div className="relative w-full h-full">
                {/* Large tile — top, with the signature peeled corner */}
                <div
                  className="absolute top-0 left-6 right-0 rounded-2xl overflow-hidden shadow-xl border border-white/50"
                  style={{ height: "62%" }}
                >
                  <FadeImage
                    wrapperClassName="absolute inset-0"
                    placeholderGradient={placeholderGradient}
                    src={collageProducts[0]?.image}
                    alt=""
                    fill
                    sizes="460px"
                    quality={80}
                    className="object-cover"
                  />
                  {/* Peeled corner — pure CSS, references wallpaper as a material */}
                  <div
                    className="absolute top-0 right-0 w-14 h-14"
                    style={{
                      background: "linear-gradient(135deg, rgba(255,255,255,0.95) 0%, rgba(230,225,215,0.9) 55%, transparent 56%)",
                      clipPath: "polygon(100% 0, 0 0, 100% 100%)",
                      filter: "drop-shadow(-2px 2px 3px rgba(0,0,0,0.18))",
                    }}
                    aria-hidden="true"
                  />
                </div>

                {/* Two smaller tiles, staggered beneath */}
                {collageProducts[1] && (
                  <div
                    className="absolute rounded-2xl overflow-hidden shadow-lg border border-white/50"
                    style={{ bottom: 0, left: 0, width: "48%", height: "42%" }}
                  >
                    <FadeImage
                      wrapperClassName="absolute inset-0"
                      placeholderGradient={placeholderGradient}
                      src={collageProducts[1].image}
                      alt=""
                      fill
                      sizes="230px"
                      quality={75}
                      className="object-cover"
                    />
                  </div>
                )}
                {collageProducts[2] && (
                  <div
                    className="absolute rounded-2xl overflow-hidden shadow-lg border border-white/50"
                    style={{ bottom: "6%", right: 0, width: "42%", height: "36%" }}
                  >
                    <FadeImage
                      wrapperClassName="absolute inset-0"
                      placeholderGradient={placeholderGradient}
                      src={collageProducts[2].image}
                      alt=""
                      fill
                      sizes="200px"
                      quality={75}
                      className="object-cover"
                    />
                  </div>
                )}

                {/* Design-count badge floating over the collage */}
                <div className="absolute -bottom-5 left-1/2 -translate-x-1/2 md:left-8 md:translate-x-0">
                  <span className="inline-flex items-center gap-2 px-4 py-2 bg-neutral-900 text-white rounded-pill text-sm font-semibold shadow-lg whitespace-nowrap">
                    <Layers size={15} strokeWidth={2} />
                    {collection.productCount}+ designs, one wall away
                  </span>
                </div>
              </div>
            ) : (
              <div
                className="w-full h-full rounded-2xl"
                style={{ background: `linear-gradient(135deg, ${placeholderGradient[0]} 0%, ${placeholderGradient[1]} 100%)` }}
              />
            )}
          </motion.div>
        </div>

        {/* Customer action CTAs — unchanged contract with CustomerActions */}
        {collection.customerActions && collection.customerActions.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, ease: EASE_BRAND, delay: 0.4 }}
            className="mt-12 md:mt-16"
          >
            <CustomerActions customerActions={collection.customerActions} collection={collection} />
          </motion.div>
        )}
      </div>

      {/* ── Transition into the catalogue: soft fade + an ambient drifting
          wave, echoing the "physical" wallpaper-edge motif rather than a
          hard line. The wave loops seamlessly: it's two identical periods
          side by side (each sized as 50% of a 200%-wide track, so the
          pattern always spans the FULL container width regardless of
          viewport — fixed pixel widths here previously ran out and left a
          blank gap on wide screens), scrolled left by exactly one period
          (-50% of the track) on an infinite linear timer, so the loop
          point is invisible. Motion is slow/ambient (14s per cycle) and
          fully paused for anyone with prefers-reduced-motion set. ── */}
      <div className="relative h-16 md:h-20 overflow-hidden" aria-hidden="true">
        <div
          className="absolute inset-0"
          style={{ background: "linear-gradient(to bottom, transparent 0%, rgba(250,250,249,0.7) 100%)" }}
        />
        <div
          className="wonder-wave-track absolute bottom-0 left-0 flex text-neutral-50/60"
          style={{ width: "200%", height: "40px" }}
        >
          <svg viewBox="0 0 1440 60" preserveAspectRatio="none" style={{ width: "50%", height: "40px" }}>
            <path
              d="M0,30 C180,58 360,2 720,30 C1080,58 1260,2 1440,30 L1440,60 L0,60 Z"
              fill="currentColor"
            />
          </svg>
          <svg viewBox="0 0 1440 60" preserveAspectRatio="none" style={{ width: "50%", height: "40px" }}>
            <path
              d="M0,30 C180,58 360,2 720,30 C1080,58 1260,2 1440,30 L1440,60 L0,60 Z"
              fill="currentColor"
            />
          </svg>
        </div>
        <style>{`
          @keyframes wonder-wave-drift {
            from { transform: translateX(0); }
            to { transform: translateX(-50%); }
          }
          .wonder-wave-track {
            animation: wonder-wave-drift 14s linear infinite;
          }
          @media (prefers-reduced-motion: reduce) {
            .wonder-wave-track {
              animation: none;
            }
          }
        `}</style>
      </div>
    </section>
  );
}
