"use client";

/**
 * src/components/Product/ProductLandingPage.tsx
 *
 * Generalized replacement for FlooringLandingPage.tsx.
 *
 * WHY THIS EXISTS
 * ────────────────
 * Several Wonder Wallz product lines (Flooring today; Blinds, Curtains and
 * Upholstery next) are consultation-driven rather than e-commerce. Instead
 * of duplicating a bespoke landing page per product, this component takes
 * all copy/content as props (see ProductLandingConfig) and renders the same
 * seven-section experience — Hero, Categories, Why Choose Us, Home Review,
 * Showrooms, FAQ, Final CTA — for any product.
 *
 * To add a new product landing page:
 *   1. Create a config file in src/lib/productLandingConfigs/<product>.ts
 *      that satisfies ProductLandingConfig.
 *   2. Render <ProductLandingPage collection={collection} {...config} />
 *      from the relevant route.
 *
 * The visual language (colour tokens, spacing, radii) is the existing
 * Wonder Wallz system — no new palette or type system was introduced.
 * Only the Hero and FAQ sections were redesigned for a more premium,
 * gallery/consultation feel; the other sections keep their original
 * structure and copy contract, just parameterized.
 *
 * Reused, not rebuilt:
 * - HomeCatalogueVisitModal and ShowroomVisitModal power every booking CTA
 *   across every product landing page, so the booking flow, validation,
 *   and copy stay in exactly one place.
 */

import { useState } from "react";
import type { ReactNode } from "react";
import Image from "next/image";
import type { Collection } from "@/lib/collections";
import {
  HomeCatalogueVisitModal,
  type CatalogueCategory,
} from "@/components/Modals/HomeCatalogueVisitModal";
import { ShowroomVisitModal } from "@/components/Modals/ShowroomVisitModal";

// ─── Config contract ───────────────────────────────────────────────────────
// Every product landing page (flooring, blinds, curtains, upholstery, …)
// supplies one of these objects. Content lives entirely in config files
// under src/lib/productLandingConfigs/ — this component only lays it out.

export interface ProductCategoryItem {
  title: string;
  description: string;
  points: string[];
}

export interface ShowroomLocation {
  name: string;
  tagline: string;
  points: string[];
}

export interface FaqItem {
  q: string;
  a: string;
}

export interface ProductLandingConfig {
  /** WhatsApp deep-link target and pre-filled message. */
  whatsapp: {
    number: string;
    message: string;
  };
  /** Which booking-modal category to preselect (flooring, blinds, …). */
  modalCategory: CatalogueCategory;

  hero: {
    eyebrow: string;
    /** First part of the headline, set in the neutral display color. */
    headlineLead: string;
    /** Emphasized closing phrase, rendered in italic accent color. */
    headlineAccent: string;
    description: string;
    /** Hero image source — replaces the old collection.heroImage fallback. */
    image: string;
    imageAlt: string;
    primaryCtaLabel: string;
    secondaryCtaLabel: string;
    tertiaryCtaLabel: string;
  };

  categories: {
    eyebrow: string;
    title: string;
    description: string;
    items: ProductCategoryItem[];
  };

  whyChooseUs: {
    eyebrow: string;
    title: string;
    items: string[];
  };

  homeReview: {
    eyebrow: string;
    title: string;
    description: string;
    bullets: string[];
    /** Rendered as-is — pass JSX so pricing copy can bold specific values. */
    priceNote: ReactNode;
    /** Home Review image source — replaces the old collection.heroImage fallback. */
    image: string;
    imageAlt: string;
    ctaLabel: string;
  };

  showrooms: {
    eyebrow: string;
    title: string;
    description: string;
    locations: ShowroomLocation[];
    ctaLabel: string;
  };

  faq: {
    eyebrow: string;
    title: string;
    items: FaqItem[];
  };

  finalCta: {
    title: string;
    primaryLabel: string;
    secondaryLabel: string;
    tertiaryLabel: string;
  };
}

interface ProductLandingPageProps extends ProductLandingConfig {
  collection: Collection;
}

// ─── Shared button styles ──────────────────────────────────────────────────
// Kept as string constants (rather than a component) so this file stays a
// single, easily-diffable source of truth for the button hierarchy.

const BTN_PRIMARY_DARK =
  "inline-flex items-center justify-center rounded-2xl px-8 py-4 text-[15px] font-semibold text-white shadow-[0_8px_24px_-8px_rgba(44,31,20,0.55)] transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_14px_32px_-10px_rgba(44,31,20,0.6)] active:translate-y-0";
const BTN_GHOST_LIGHT =
  "inline-flex items-center justify-center rounded-2xl border border-white/35 bg-white/[0.06] px-7 py-4 text-[15px] font-medium text-white backdrop-blur-sm transition-all duration-300 hover:border-white/60 hover:bg-white/[0.14]";
const BTN_TEXT_LIGHT =
  "group inline-flex items-center gap-2 text-[15px] font-medium text-white/85 transition-colors duration-300 hover:text-white";

export function ProductLandingPage({
  collection,
  whatsapp,
  modalCategory,
  hero,
  categories,
  whyChooseUs,
  homeReview,
  showrooms,
  faq,
  finalCta,
}: ProductLandingPageProps) {
  const [isHomeCatalogueOpen, setIsHomeCatalogueOpen] = useState(false);
  const [isShowroomVisitOpen, setIsShowroomVisitOpen] = useState(false);
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(0);

  const handleWhatsApp = () => {
    window.open(
      `https://wa.me/${whatsapp.number}?text=${encodeURIComponent(
        whatsapp.message
      )}`,
      "_blank",
      "noopener,noreferrer"
    );
  };

  return (
    <div className="min-h-screen bg-neutral-50">
      {/* Keyframes for the hero's staged reveal. Scoped by unique names so
          they can't collide with keyframes in other components. */}
      <style>{`
        @keyframes plpHeroFadeUp {
          from { opacity: 0; transform: translateY(18px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        @keyframes plpHeroImageIn {
          from { opacity: 0; transform: scale(1.03); }
          to   { opacity: 1; transform: scale(1); }
        }
        @keyframes plpHeroImageDrift {
          from { transform: scale(1); }
          to   { transform: scale(1.045); }
        }
        .plp-hero-fade-up { animation: plpHeroFadeUp 0.9s cubic-bezier(0.16,1,0.3,1) both; }
        .plp-hero-image-in { animation: plpHeroImageIn 1.4s cubic-bezier(0.16,1,0.3,1) both; }
        .plp-hero-image-drift { animation: plpHeroImageDrift 16s cubic-bezier(0.45,0,0.55,1) 1.4s both alternate infinite; }
        @media (prefers-reduced-motion: reduce) {
          .plp-hero-fade-up, .plp-hero-image-in, .plp-hero-image-drift { animation: none; }
        }
      `}</style>

      {/* ── 1. Hero ──────────────────────────────────────────────────────
          Full-bleed photograph — the flooring itself is the hero, not a
          panel beside it. Content is anchored to the top-right, just under
          the navbar, over a light single-direction wash that's just enough
          to hold contrast without flattening the material underneath. */}
      <section className="relative isolate flex min-h-[78vh] items-center overflow-hidden sm:min-h-[82vh]">
        <div className="absolute inset-0 plp-hero-image-in">
          <Image
            src={hero.image}
            alt={hero.imageAlt}
            fill
            priority
            className="plp-hero-image-drift object-cover"
          />
        </div>

        {/* Light, right-weighted wash — legibility only, most of the
            frame stays visible. */}
        <div
          className="pointer-events-none absolute inset-0"
          style={{
            background:
              "linear-gradient(270deg, rgba(16,11,8,0.52) 0%, rgba(16,11,8,0.22) 40%, rgba(16,11,8,0) 62%), linear-gradient(180deg, rgba(16,11,8,0.30) 0%, rgba(16,11,8,0) 30%)",
          }}
        />

        <div className="container-site relative z-10 py-12 sm:py-16">
          <div className="ml-auto max-w-2xl text-right">
            <div className="plp-hero-fade-up" style={{ animationDelay: "0ms" }}>
              <span className="inline-flex items-center gap-3 text-[11px] font-medium uppercase tracking-[0.4em] text-white/75">
                {hero.eyebrow}
                <span className="h-px w-8" style={{ background: "#E4A868" }} />
              </span>
            </div>

            <h1
              className="plp-hero-fade-up mt-7 font-serif text-[2.75rem] font-medium leading-[1.08] tracking-tight text-white sm:text-6xl lg:text-[3.6rem] xl:text-[4rem]"
              style={{ animationDelay: "130ms" }}
            >
              {hero.headlineLead}{" "}
              <span className="italic" style={{ color: "#E4A868" }}>
                {hero.headlineAccent}
              </span>
            </h1>

            <p
              className="plp-hero-fade-up ml-auto mt-6 max-w-md text-[15px] leading-relaxed text-white/85 sm:text-base"
              style={{ animationDelay: "240ms" }}
            >
              {hero.description}
            </p>

            <div
              className="plp-hero-fade-up mt-10 flex flex-wrap items-center justify-end gap-x-8 gap-y-5"
              style={{ animationDelay: "350ms" }}
            >
              <button
                type="button"
                onClick={() => setIsHomeCatalogueOpen(true)}
                className={BTN_PRIMARY_DARK}
                style={{ background: "#2C1F14" }}
              >
                {hero.primaryCtaLabel}
              </button>
              <button
                type="button"
                onClick={() => setIsShowroomVisitOpen(true)}
                className={BTN_GHOST_LIGHT}
              >
                {hero.secondaryCtaLabel}
              </button>
              <button type="button" onClick={handleWhatsApp} className={BTN_TEXT_LIGHT}>
                {hero.tertiaryCtaLabel}
                <span
                  aria-hidden
                  className="inline-block h-px w-5 bg-white/50 transition-all duration-300 group-hover:w-7 group-hover:bg-white"
                />
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* ── 2. Categories (informational only — no links) ──────────────── */}
      <section className="container-site py-16 md:py-20">
        <div className="mx-auto max-w-2xl text-center">
          <span
            className="text-xs font-semibold uppercase tracking-[0.3em]"
            style={{ color: "#D48C43" }}
          >
            {categories.eyebrow}
          </span>
          <h2 className="mt-3 font-serif text-2xl font-medium text-neutral-900 sm:text-3xl">
            {categories.title}
          </h2>
          <p className="mt-3 text-[15px] text-neutral-600">
            {categories.description}
          </p>
        </div>

        <div className="mt-10 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {categories.items.map((cat) => (
            <div
              key={cat.title}
              className="rounded-3xl border border-neutral-200 bg-white p-6 transition-colors duration-300 hover:border-neutral-300"
            >
              <h3 className="font-serif text-lg font-medium text-neutral-900">
                {cat.title}
              </h3>
              <p className="mt-2 text-sm text-neutral-600">{cat.description}</p>
              <ul className="mt-4 space-y-1.5">
                {cat.points.map((point) => (
                  <li
                    key={point}
                    className="flex items-center gap-2 text-sm text-neutral-700"
                  >
                    <span
                      className="h-1.5 w-1.5 shrink-0 rounded-full"
                      style={{ background: "#D48C43" }}
                    />
                    {point}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </section>

      {/* ── 3. Why Choose Us ────────────────────────────────────────────── */}
      <section className="bg-white py-16 md:py-20">
        <div className="container-site">
          <div className="mx-auto max-w-2xl text-center">
            <span
              className="text-xs font-semibold uppercase tracking-[0.3em]"
              style={{ color: "#D48C43" }}
            >
              {whyChooseUs.eyebrow}
            </span>
            <h2 className="mt-3 font-serif text-2xl font-medium text-neutral-900 sm:text-3xl">
              {whyChooseUs.title}
            </h2>
          </div>

          <div className="mt-10 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {whyChooseUs.items.map((item, i) => (
              <div
                key={item}
                className="flex items-center gap-4 rounded-2xl border border-neutral-200 bg-neutral-50 px-5 py-5"
              >
                <span
                  className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full text-sm font-semibold text-white"
                  style={{ background: "#2C1F14" }}
                >
                  {String(i + 1).padStart(2, "0")}
                </span>
                <span className="text-[15px] font-medium text-neutral-900">
                  {item}
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── 4. Home Review ───────────────────────────────────────────────── */}
      <section className="container-site py-16 md:py-20">
        <div className="grid grid-cols-1 items-center gap-10 lg:grid-cols-2">
          <div>
            <span
              className="text-xs font-semibold uppercase tracking-[0.3em]"
              style={{ color: "#D48C43" }}
            >
              {homeReview.eyebrow}
            </span>
            <h2 className="mt-3 font-serif text-2xl font-medium text-neutral-900 sm:text-3xl">
              {homeReview.title}
            </h2>
            <p className="mt-4 text-[15px] leading-relaxed text-neutral-600">
              {homeReview.description}
            </p>

            <ul className="mt-6 space-y-3">
              {homeReview.bullets.map((line) => (
                <li key={line} className="flex items-start gap-3">
                  <span
                    className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full"
                    style={{ background: "#D48C43" }}
                  />
                  <span className="text-[15px] text-neutral-700">{line}</span>
                </li>
              ))}
            </ul>

            <div className="mt-6 rounded-2xl border border-neutral-200 bg-neutral-50 px-5 py-4">
              <p className="text-[15px] text-neutral-800">{homeReview.priceNote}</p>
            </div>

            <button
              type="button"
              onClick={() => setIsHomeCatalogueOpen(true)}
              className={`mt-7 ${BTN_PRIMARY_DARK}`}
              style={{ background: "#2C1F14" }}
            >
              {homeReview.ctaLabel}
            </button>
          </div>

          <div className="relative aspect-[4/3] overflow-hidden rounded-3xl">
            <Image
              src={homeReview.image}
              alt={homeReview.imageAlt}
              fill
              className="object-cover"
            />
          </div>
        </div>
      </section>

      {/* ── 5. Showrooms ─────────────────────────────────────────────────── */}
      <section className="bg-white py-16 md:py-20">
        <div className="container-site">
          <div className="mx-auto max-w-2xl text-center">
            <span
              className="text-xs font-semibold uppercase tracking-[0.3em]"
              style={{ color: "#D48C43" }}
            >
              {showrooms.eyebrow}
            </span>
            <h2 className="mt-3 font-serif text-2xl font-medium text-neutral-900 sm:text-3xl">
              {showrooms.title}
            </h2>
            <p className="mt-2 text-[15px] text-neutral-600">
              {showrooms.description}
            </p>
          </div>

          <div className="mt-10 grid grid-cols-1 gap-5 sm:grid-cols-2">
            {showrooms.locations.map((room) => (
              <div
                key={room.name}
                className="rounded-3xl border border-neutral-200 bg-neutral-50 p-7"
              >
                <h3 className="font-serif text-xl font-medium text-neutral-900">
                  {room.name}
                </h3>
                <p className="mt-1 text-sm font-medium" style={{ color: "#D48C43" }}>
                  {room.tagline}
                </p>
                <ul className="mt-4 space-y-1.5">
                  {room.points.map((point) => (
                    <li
                      key={point}
                      className="flex items-center gap-2 text-sm text-neutral-700"
                    >
                      <span
                        className="h-1.5 w-1.5 shrink-0 rounded-full"
                        style={{ background: "#2C1F14" }}
                      />
                      {point}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          <div className="mt-8 text-center">
            <button
              type="button"
              onClick={() => setIsShowroomVisitOpen(true)}
              className="inline-flex items-center justify-center rounded-2xl border border-neutral-300 bg-white px-7 py-3.5 text-[15px] font-semibold text-neutral-800 transition-colors duration-200 hover:border-neutral-400 hover:bg-neutral-100"
            >
              {showrooms.ctaLabel}
            </button>
          </div>
        </div>
      </section>

      {/* ── 6. FAQ ───────────────────────────────────────────────────────── */}
      <section className="container-site py-16 md:py-20">
        <div className="mx-auto max-w-2xl text-center">
          <span
            className="text-xs font-semibold uppercase tracking-[0.3em]"
            style={{ color: "#D48C43" }}
          >
            {faq.eyebrow}
          </span>
          <h2 className="mt-3 font-serif text-2xl font-medium text-neutral-900 sm:text-3xl">
            {faq.title}
          </h2>
        </div>

        <div className="mx-auto mt-12 max-w-2xl">
          {faq.items.map((item, i) => {
            const isOpen = openFaqIndex === i;
            return (
              <div
                key={item.q}
                className="border-b border-neutral-200 first:border-t"
              >
                <button
                  type="button"
                  onClick={() => setOpenFaqIndex(isOpen ? null : i)}
                  aria-expanded={isOpen}
                  className="flex w-full items-center justify-between gap-6 py-6 text-left"
                >
                  <span
                    className={`font-serif text-lg leading-snug transition-colors duration-300 sm:text-xl ${
                      isOpen ? "text-neutral-900" : "text-neutral-600"
                    }`}
                  >
                    {item.q}
                  </span>
                  <span
                    className={`relative flex h-8 w-8 shrink-0 items-center justify-center rounded-full border transition-all duration-300 ${
                      isOpen
                        ? "rotate-45 border-transparent text-white"
                        : "rotate-0 border-neutral-300 text-neutral-500"
                    }`}
                    style={isOpen ? { background: "#D48C43" } : undefined}
                  >
                    <span className="absolute h-px w-3 bg-current" />
                    <span className="absolute h-3 w-px bg-current" />
                  </span>
                </button>

                <div
                  className="grid transition-[grid-template-rows] duration-400 ease-out"
                  style={{ gridTemplateRows: isOpen ? "1fr" : "0fr" }}
                >
                  <div className="overflow-hidden">
                    <p className="pb-6 pr-10 text-[15px] leading-relaxed text-neutral-600">
                      {item.a}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* ── 7. Final Call To Action ──────────────────────────────────────── */}
      <section
        className="py-20 md:py-24"
        style={{ background: "linear-gradient(90deg, #3E2C22 0%, #2C1F14 100%)" }}
      >
        <div className="container-site text-center">
          <h2 className="mx-auto max-w-2xl font-serif text-2xl font-medium text-white sm:text-3xl">
            {finalCta.title}
          </h2>
          <div className="mt-8 flex flex-wrap items-center justify-center gap-x-8 gap-y-5">
            <button
              type="button"
              onClick={() => setIsHomeCatalogueOpen(true)}
              className={BTN_PRIMARY_DARK}
              style={{ background: "#FFFFFF", color: "#2C1F14" }}
            >
              {finalCta.primaryLabel}
            </button>
            <button
              type="button"
              onClick={() => setIsShowroomVisitOpen(true)}
              className={BTN_GHOST_LIGHT}
            >
              {finalCta.secondaryLabel}
            </button>
            <button type="button" onClick={handleWhatsApp} className={BTN_TEXT_LIGHT}>
              {finalCta.tertiaryLabel}
              <span
                aria-hidden
                className="inline-block h-px w-5 bg-white/50 transition-all duration-300 group-hover:w-7 group-hover:bg-white"
              />
            </button>
          </div>
        </div>
      </section>

      {/* ── Reused booking modals ────────────────────────────────────────── */}
      <HomeCatalogueVisitModal
        open={isHomeCatalogueOpen}
        onOpenChange={setIsHomeCatalogueOpen}
        defaultCategory={modalCategory}
      />
      <ShowroomVisitModal
        open={isShowroomVisitOpen}
        onOpenChange={setIsShowroomVisitOpen}
        defaultCategory={modalCategory}
      />
    </div>
  );
}
