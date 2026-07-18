"use client";

/**
 * src/components/Product/CustomProductLandingPage.tsx
 *
 * Reusable landing page for CUSTOM-print products — as opposed to
 * ProductLandingPage.tsx, which powers CONSULTATION products (Flooring,
 * Blinds, Curtains, Upholstery).
 *
 * WHY A SEPARATE COMPONENT FROM ProductLandingPage
 * ─────────────────────────────────────────────────
 * ProductLandingPage's section list (Hero, Categories, Why Choose Us, Home
 * Review [catalogue-at-home], Showrooms, FAQ, Final CTA) is specific to the
 * consultation journey. Canvas Prints is explicitly NOT a consultation
 * product — there's no catalogue-at-home step, and its journey is
 * structurally different: Hero → Why → Frame Options → Perfect For →
 * How It Works → Materials & Quality → FAQ → Final CTA. Reusing
 * ProductLandingPage as-is would mean either bolting mismatched content
 * into "Home Review"/"Showrooms" slots, or duplicating the whole file.
 * This component instead reuses the same design tokens, type scale, button
 * styles and modal wiring, but lays out the sections that actually apply
 * to custom-print products.
 *
 * This is intentionally generic (not "Canvas..."): Wallpapers and Glass
 * Films are also custom-workflow products per app/collections/[category]/
 * page.tsx, so they can reuse this component with their own config later.
 *
 * To add a new custom-print product:
 *   1. Create a config file in src/lib/productLandingConfigs/<product>.tsx
 *      that satisfies CustomProductLandingConfig.
 *   2. Render <CustomProductLandingPage collection={collection} {...config} />
 *      from a thin per-product wrapper (see CanvasLandingPage.tsx).
 */

import { useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import type { Collection } from "@/lib/collections";
import { ShowroomVisitModal } from "@/components/Modals/ShowroomVisitModal";
import type { CatalogueCategory } from "@/components/Modals/HomeCatalogueVisitModal";
import type { CustomProductLandingConfig } from "@/lib/productLandingConfigs/canvas";

interface CustomProductLandingPageProps extends CustomProductLandingConfig {
  collection: Collection;
  /** Which modal category to preselect on the Showroom modal (canvas, wallpapers, …). */
  modalCategory: CatalogueCategory;
  /**
   * Called when the customer clicks "Start Custom Project" (hero or final CTA).
   * Defaults to navigating to the existing Project Builder at
   * /custom-design#start-project (with a ?product=<modalCategory> query param
   * so the Project Builder can preselect this product). Override only if a
   * given product needs different behaviour.
   */
  onStartCustomProject?: () => void;
}

// ─── Shared button styles ──────────────────────────────────────────────────
// Copied verbatim from ProductLandingPage.tsx so both components render an
// identical button hierarchy — kept duplicated (rather than imported) so
// neither file depends on the other's internals.

const BTN_PRIMARY_DARK =
  "inline-flex items-center justify-center rounded-2xl px-8 py-4 text-[15px] font-semibold text-white shadow-[0_8px_24px_-8px_rgba(44,31,20,0.55)] transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_14px_32px_-10px_rgba(44,31,20,0.6)] active:translate-y-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#D48C43] focus-visible:ring-offset-2";
const BTN_GHOST_LIGHT =
  "inline-flex items-center justify-center rounded-2xl border border-white/35 bg-white/[0.06] px-7 py-4 text-[15px] font-medium text-white backdrop-blur-sm transition-all duration-300 hover:border-white/60 hover:bg-white/[0.14] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#D48C43] focus-visible:ring-offset-2";
const BTN_TEXT_LIGHT =
  "group inline-flex items-center gap-2 text-[15px] font-medium text-white/85 transition-colors duration-300 hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#D48C43] focus-visible:ring-offset-2 rounded-sm";

export function CustomProductLandingPage({
  whatsapp,
  modalCategory,
  hero,
  whyCanvas: why,
  frameOptions,
  perfectFor,
  howItWorks,
  materials,
  faq,
  finalCta,
  onStartCustomProject,
}: CustomProductLandingPageProps) {
  const router = useRouter();
  const [isShowroomVisitOpen, setIsShowroomVisitOpen] = useState(false);
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(0);

  const handleWhatsApp = () => {
    window.open(
      `https://wa.me/${whatsapp.number}?text=${encodeURIComponent(whatsapp.message)}`,
      "_blank",
      "noopener,noreferrer"
    );
  };

  const handleStartCustomProject = () => {
    if (onStartCustomProject) {
      onStartCustomProject();
      return;
    }
    // Reuse the existing Project Builder (/custom-design, rendered at the
    // #start-project anchor) rather than routing to WhatsApp or a modal.
    // modalCategory (e.g. "canvas") is passed through as ?product=... so the
    // Project Builder can preselect this product — if/when it supports that.
    router.push(`/custom-design?product=${encodeURIComponent(modalCategory)}#start-project`);
  };

  return (
    <div className="min-h-screen bg-neutral-50">
      <style>{`
        @keyframes cplpHeroFadeUp {
          from { opacity: 0; transform: translateY(18px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        @keyframes cplpHeroImageIn {
          from { opacity: 0; transform: scale(1.03); }
          to   { opacity: 1; transform: scale(1); }
        }
        @keyframes cplpHeroImageDrift {
          from { transform: scale(1); }
          to   { transform: scale(1.045); }
        }
        .cplp-hero-fade-up { animation: cplpHeroFadeUp 0.9s cubic-bezier(0.16,1,0.3,1) both; }
        .cplp-hero-image-in { animation: cplpHeroImageIn 1.4s cubic-bezier(0.16,1,0.3,1) both; }
        .cplp-hero-image-drift { animation: cplpHeroImageDrift 16s cubic-bezier(0.45,0,0.55,1) 1.4s both alternate infinite; }
        @media (prefers-reduced-motion: reduce) {
          .cplp-hero-fade-up, .cplp-hero-image-in, .cplp-hero-image-drift { animation: none; }
        }
      `}</style>

      {/* ── 1. Hero ────────────────────────────────────────────────────── */}
      <section className="relative isolate flex min-h-[78vh] items-center overflow-hidden sm:min-h-[82vh]">
        <div className="absolute inset-0 cplp-hero-image-in">
          <Image
            src={hero.image}
            alt={hero.imageAlt}
            fill
            priority
            className="cplp-hero-image-drift object-cover"
          />
        </div>

        <div
          className="pointer-events-none absolute inset-0"
          style={{
            background:
              "linear-gradient(270deg, rgba(16,11,8,0.52) 0%, rgba(16,11,8,0.22) 40%, rgba(16,11,8,0) 62%), linear-gradient(180deg, rgba(16,11,8,0.30) 0%, rgba(16,11,8,0) 30%)",
          }}
        />

        <div className="container-site relative z-10 pt-28 pb-12 sm:pt-32 sm:pb-16">
          <div className="ml-auto max-w-2xl text-right">
            <div
              className="cplp-hero-fade-up flex flex-wrap items-center justify-end gap-2"
              style={{ animationDelay: "0ms" }}
            >
              {hero.badges.map((badge) => (
                <span
                  key={badge}
                  className="rounded-full border border-white/35 bg-white/[0.08] px-3.5 py-1.5 text-[11px] font-medium uppercase tracking-[0.2em] text-white/85 backdrop-blur-sm"
                >
                  {badge}
                </span>
              ))}
            </div>

            <h1
              className="cplp-hero-fade-up mt-7 font-serif text-[2.75rem] font-medium leading-[1.08] tracking-tight text-white sm:text-6xl lg:text-[3.6rem] xl:text-[4rem]"
              style={{ animationDelay: "130ms" }}
            >
              {hero.headlineLead}{" "}
              <span className="italic" style={{ color: "#E4A868" }}>
                {hero.headlineAccent}
              </span>
            </h1>

            <p
              className="cplp-hero-fade-up ml-auto mt-6 max-w-md text-[15px] leading-relaxed text-white/85 sm:text-base"
              style={{ animationDelay: "240ms" }}
            >
              {hero.description}
            </p>

            <div
              className="cplp-hero-fade-up mt-10 flex flex-wrap items-center justify-end gap-x-8 gap-y-5"
              style={{ animationDelay: "350ms" }}
            >
              <button
                type="button"
                onClick={handleStartCustomProject}
                className={BTN_PRIMARY_DARK}
                style={{ background: "#2C1F14" }}
              >
                {hero.primaryCtaLabel}
              </button>
              <button
                type="button"
                onClick={handleWhatsApp}
                className={BTN_GHOST_LIGHT}
              >
                {hero.secondaryCtaLabel}
              </button>
              <button
                type="button"
                onClick={() => setIsShowroomVisitOpen(true)}
                className={BTN_TEXT_LIGHT}
              >
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

      {/* ── 2. Why [Product] ──────────────────────────────────────────────
          Replaces ProductLandingPage's "Categories" grid — Canvas has no
          catalogue categories to browse, just reasons to choose it. */}
      <section className="container-site py-16 md:py-20">
        <div className="mx-auto max-w-2xl text-center">
          <span
            className="text-xs font-semibold uppercase tracking-[0.3em]"
            style={{ color: "#D48C43" }}
          >
            {why.eyebrow}
          </span>
          <h2 className="mt-3 font-serif text-2xl font-medium text-neutral-900 sm:text-3xl">
            {why.title}
          </h2>
          <p className="mt-3 text-[15px] text-neutral-600">{why.description}</p>
        </div>

        <div className="mt-10 grid grid-cols-1 gap-5 sm:grid-cols-2">
          {why.points.map((point, i) => (
            <div
              key={point}
              className="flex items-center gap-4 rounded-2xl border border-neutral-200 bg-neutral-50 px-5 py-5 transition-colors duration-300 hover:border-neutral-300"
            >
              <span
                className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full text-sm font-semibold text-white"
                style={{ background: "#2C1F14" }}
              >
                {String(i + 1).padStart(2, "0")}
              </span>
              <span className="text-[15px] font-medium text-neutral-900">{point}</span>
            </div>
          ))}
        </div>
      </section>

      {/* ── 3. Frame Options — Canvas-specific ────────────────────────── */}
      <section className="bg-white py-16 md:py-20">
        <div className="container-site">
          <div className="mx-auto max-w-2xl text-center">
            <span
              className="text-xs font-semibold uppercase tracking-[0.3em]"
              style={{ color: "#D48C43" }}
            >
              {frameOptions.eyebrow}
            </span>
            <h2 className="mt-3 font-serif text-2xl font-medium text-neutral-900 sm:text-3xl">
              {frameOptions.title}
            </h2>
            <p className="mt-3 text-[15px] text-neutral-600">
              {frameOptions.description}
            </p>
          </div>

          <div className="mt-10 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {frameOptions.items.map((item) => (
              <div
                key={item.title}
                className="rounded-3xl border border-neutral-200 bg-neutral-50 p-6 transition-colors duration-300 hover:border-neutral-300"
              >
                <h3 className="font-serif text-lg font-medium text-neutral-900">
                  {item.title}
                </h3>
                <p className="mt-2 text-sm text-neutral-600">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── 4. Perfect For — Canvas-specific ──────────────────────────── */}
      <section className="container-site py-16 md:py-20">
        <div className="mx-auto max-w-2xl text-center">
          <span
            className="text-xs font-semibold uppercase tracking-[0.3em]"
            style={{ color: "#D48C43" }}
          >
            {perfectFor.eyebrow}
          </span>
          <h2 className="mt-3 font-serif text-2xl font-medium text-neutral-900 sm:text-3xl">
            {perfectFor.title}
          </h2>
        </div>

        <div className="mt-10 flex flex-wrap justify-center gap-3">
          {perfectFor.items.map((item) => (
            <span
              key={item.title}
              className="rounded-full border border-neutral-200 bg-white px-5 py-2.5 text-sm font-medium text-neutral-800"
            >
              {item.title}
            </span>
          ))}
        </div>
      </section>

      {/* ── 5. How It Works — Canvas-specific timeline ────────────────── */}
      <section className="bg-white py-16 md:py-20">
        <div className="container-site">
          <div className="mx-auto max-w-2xl text-center">
            <span
              className="text-xs font-semibold uppercase tracking-[0.3em]"
              style={{ color: "#D48C43" }}
            >
              {howItWorks.eyebrow}
            </span>
            <h2 className="mt-3 font-serif text-2xl font-medium text-neutral-900 sm:text-3xl">
              {howItWorks.title}
            </h2>
          </div>

          <div className="mt-12 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {howItWorks.steps.map((step, i) => (
              <div key={step.title} className="relative text-center">
                <div
                  className="mx-auto flex h-12 w-12 items-center justify-center rounded-full text-base font-semibold text-white"
                  style={{ background: "#2C1F14" }}
                >
                  {i + 1}
                </div>
                <h3 className="mt-4 font-serif text-lg font-medium text-neutral-900">
                  {step.title}
                </h3>
                <p className="mt-2 text-sm text-neutral-600">{step.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── 6. Materials & Quality — Canvas-specific ──────────────────── */}
      <section className="container-site py-16 md:py-20">
        <div className="grid grid-cols-1 items-center gap-10 lg:grid-cols-2">
          <div className="relative aspect-[4/3] overflow-hidden rounded-3xl lg:order-2">
            <Image
              src={materials.image}
              alt={materials.imageAlt}
              fill
              className="object-cover"
            />
          </div>

          <div className="lg:order-1">
            <span
              className="text-xs font-semibold uppercase tracking-[0.3em]"
              style={{ color: "#D48C43" }}
            >
              {materials.eyebrow}
            </span>
            <h2 className="mt-3 font-serif text-2xl font-medium text-neutral-900 sm:text-3xl">
              {materials.title}
            </h2>
            <p className="mt-4 text-[15px] leading-relaxed text-neutral-600">
              {materials.description}
            </p>

            <ul className="mt-6 space-y-3">
              {materials.points.map((point) => (
                <li key={point} className="flex items-start gap-3">
                  <span
                    className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full"
                    style={{ background: "#D48C43" }}
                  />
                  <span className="text-[15px] text-neutral-700">{point}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* ── 7. FAQ ─────────────────────────────────────────────────────── */}
      <section className="bg-white py-16 md:py-20">
        <div className="container-site">
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
                <div key={item.q} className="border-b border-neutral-200 first:border-t">
                  <button
                    type="button"
                    onClick={() => setOpenFaqIndex(isOpen ? null : i)}
                    aria-expanded={isOpen}
                    className="flex w-full items-center justify-between gap-6 py-6 text-left focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#D48C43] focus-visible:ring-offset-2 rounded-sm"
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
                      <p className="pb-6 pr-4 text-[15px] leading-relaxed text-neutral-600">
                        {item.a}
                      </p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── 8. Final Call To Action ────────────────────────────────────── */}
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
              onClick={handleStartCustomProject}
              className={BTN_PRIMARY_DARK}
              style={{ background: "#FFFFFF", color: "#2C1F14" }}
            >
              {finalCta.primaryLabel}
            </button>
            <button type="button" onClick={handleWhatsApp} className={BTN_GHOST_LIGHT}>
              {finalCta.secondaryLabel}
            </button>
            <button
              type="button"
              onClick={() => setIsShowroomVisitOpen(true)}
              className={BTN_TEXT_LIGHT}
            >
              {finalCta.tertiaryLabel}
              <span
                aria-hidden
                className="inline-block h-px w-5 bg-white/50 transition-all duration-300 group-hover:w-7 group-hover:bg-white"
              />
            </button>
          </div>
        </div>
      </section>

      {/* ── Reused modal — showroom visits only; no catalogue-at-home modal
          here, since Canvas has no catalogue to browse at home. ────────── */}
      <ShowroomVisitModal
        open={isShowroomVisitOpen}
        onOpenChange={setIsShowroomVisitOpen}
        defaultCategory={modalCategory}
      />
    </div>
  );
}
