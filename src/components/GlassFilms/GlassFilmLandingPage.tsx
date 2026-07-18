"use client";

/**
 * src/components/GlassFilms/GlassFilmLandingPage.tsx
 *
 * Landing page for Glass Films — a DUAL-JOURNEY product, unlike anything
 * else in the app so far:
 *
 *   • Flooring/Blinds/Curtains/Upholstery → ProductLandingPage (consultation,
 *     single journey: catalogue-at-home + showroom).
 *   • Canvas Prints → CustomProductLandingPage (custom, single journey:
 *     "Start Custom Project").
 *   • Glass Films → THIS component (two journeys side by side: "Start
 *     Custom Project" OR "View Options on WhatsApp" — no catalogue
 *     browsing, no catalogue-at-home step, no showroom-first workflow).
 *
 * Because the journey is structurally different from both existing
 * patterns (a two-card "Choose Your Requirement" split, an Applications
 * grid, a dual How-It-Works timeline), this is its own component rather
 * than a config-only wrapper around CustomProductLandingPage. It reuses,
 * verbatim where possible, the same design tokens, button styles, hero
 * layout and FAQ accordion pattern established by CustomProductLandingPage
 * so it feels identical in polish, without forcing Glass Films' two
 * journeys into a component shaped for one.
 *
 * "Start Custom Project" navigates straight to the existing Project
 * Builder at /custom-design#start-project (?product=glass-films) — the
 * exact same mechanism Canvas Prints uses. It never opens WhatsApp.
 *
 * "View Options on WhatsApp" / "View Decorative Options on WhatsApp"
 * always opens WhatsApp. It never navigates to the Project Builder.
 *
 * All copy lives in src/lib/productLandingConfigs/glassFilms.tsx —
 * this file contains no hardcoded copy.
 */

import { useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import type { Collection } from "@/lib/collections";
import { glassFilmsLandingConfig } from "@/lib/productLandingConfigs/glassFilms";

interface GlassFilmLandingPageProps {
  collection: Collection;
}

// ─── Shared button styles ──────────────────────────────────────────────────
// Copied verbatim from CustomProductLandingPage.tsx / ProductLandingPage.tsx
// so all landing pages render an identical button hierarchy — kept
// duplicated (rather than imported) so this file doesn't depend on those
// files' internals.

const BTN_PRIMARY_DARK =
  "inline-flex items-center justify-center rounded-2xl px-8 py-4 text-[15px] font-semibold text-white shadow-[0_8px_24px_-8px_rgba(44,31,20,0.55)] transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_14px_32px_-10px_rgba(44,31,20,0.6)] active:translate-y-0";
const BTN_GHOST_LIGHT =
  "inline-flex items-center justify-center rounded-2xl border border-white/35 bg-white/[0.06] px-7 py-4 text-[15px] font-medium text-white backdrop-blur-sm transition-all duration-300 hover:border-white/60 hover:bg-white/[0.14]";
const BTN_GHOST_DARK =
  "inline-flex items-center justify-center rounded-2xl border border-neutral-300 bg-white px-7 py-4 text-[15px] font-medium text-neutral-900 transition-all duration-300 hover:border-neutral-400 hover:bg-neutral-50";

export function GlassFilmLandingPage({ collection: _collection }: GlassFilmLandingPageProps) {
  const router = useRouter();
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(0);

  const { whatsapp, hero, requirements, applications, benefits, howItWorks, faq, finalCta } =
    glassFilmsLandingConfig;

  const handleWhatsApp = () => {
    window.open(
      `https://wa.me/${whatsapp.number}?text=${encodeURIComponent(whatsapp.message)}`,
      "_blank",
      "noopener,noreferrer"
    );
  };

  // Same mechanism as Canvas Prints — navigates to the existing Project
  // Builder, never WhatsApp, never a modal.
  const handleStartCustomProject = () => {
    router.push(`/custom-design?product=${encodeURIComponent("glass-films")}#start-project`);
  };

  const handleRequirementCta = (ctaType: "custom-project" | "whatsapp") => {
    if (ctaType === "custom-project") {
      handleStartCustomProject();
    } else {
      handleWhatsApp();
    }
  };

  return (
    <div className="min-h-screen bg-neutral-50">
      <style>{`
        @keyframes gflpHeroFadeUp {
          from { opacity: 0; transform: translateY(18px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        @keyframes gflpHeroImageIn {
          from { opacity: 0; transform: scale(1.03); }
          to   { opacity: 1; transform: scale(1); }
        }
        @keyframes gflpHeroImageDrift {
          from { transform: scale(1); }
          to   { transform: scale(1.045); }
        }
        .gflp-hero-fade-up { animation: gflpHeroFadeUp 0.9s cubic-bezier(0.16,1,0.3,1) both; }
        .gflp-hero-image-in { animation: gflpHeroImageIn 1.4s cubic-bezier(0.16,1,0.3,1) both; }
        .gflp-hero-image-drift { animation: gflpHeroImageDrift 16s cubic-bezier(0.45,0,0.55,1) 1.4s both alternate infinite; }
        @media (prefers-reduced-motion: reduce) {
          .gflp-hero-fade-up, .gflp-hero-image-in, .gflp-hero-image-drift { animation: none; }
        }
      `}</style>

      {/* ── 1. Hero ────────────────────────────────────────────────────── */}
      <section className="relative isolate flex min-h-[78vh] items-center overflow-hidden sm:min-h-[82vh]">
        <div className="absolute inset-0 gflp-hero-image-in">
          <Image
            src={hero.image}
            alt={hero.imageAlt}
            fill
            priority
            className="gflp-hero-image-drift object-cover"
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
              className="gflp-hero-fade-up flex flex-wrap items-center justify-end gap-2"
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
              className="gflp-hero-fade-up mt-7 font-serif text-[2.75rem] font-medium leading-[1.08] tracking-tight text-white sm:text-6xl lg:text-[3.6rem] xl:text-[4rem]"
              style={{ animationDelay: "130ms" }}
            >
              {hero.headlineLead}{" "}
              <span className="italic" style={{ color: "#E4A868" }}>
                {hero.headlineAccent}
              </span>
            </h1>

            <p
              className="gflp-hero-fade-up ml-auto mt-6 max-w-md text-[15px] leading-relaxed text-white/85 sm:text-base"
              style={{ animationDelay: "240ms" }}
            >
              {hero.description}
            </p>

            <div
              className="gflp-hero-fade-up mt-10 flex flex-wrap items-center justify-end gap-x-8 gap-y-5"
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
              <button type="button" onClick={handleWhatsApp} className={BTN_GHOST_LIGHT}>
                {hero.secondaryCtaLabel}
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* ── 2. Choose Your Requirement — Glass Films-specific ─────────────
          The core of the dual-journey experience: two premium cards, each
          driving straight to its own CTA. Neither card leads to a
          catalogue or showroom. */}
      <section className="container-site py-16 md:py-20">
        <div className="mx-auto max-w-2xl text-center">
          <span className="text-xs font-semibold uppercase tracking-[0.3em]" style={{ color: "#D48C43" }}>
            {requirements.eyebrow}
          </span>
          <h2 className="mt-3 font-serif text-2xl font-medium text-neutral-900 sm:text-3xl">
            {requirements.title}
          </h2>
          <p className="mt-3 text-[15px] text-neutral-600">{requirements.description}</p>
        </div>

        <div className="mt-10 grid grid-cols-1 gap-6 lg:grid-cols-2">
          {requirements.cards.map((card) => (
            <div
              key={card.title}
              className="flex flex-col rounded-3xl border border-neutral-200 bg-white p-8 transition-colors duration-300 hover:border-neutral-300"
            >
              <span className="text-xs font-semibold uppercase tracking-[0.3em]" style={{ color: "#D48C43" }}>
                {card.eyebrow}
              </span>
              <h3 className="mt-3 font-serif text-xl font-medium text-neutral-900 sm:text-2xl">
                {card.title}
              </h3>
              <p className="mt-3 text-[15px] leading-relaxed text-neutral-600">{card.description}</p>

              <ul className="mt-6 flex flex-wrap gap-2">
                {card.bullets.map((bullet) => (
                  <li
                    key={bullet}
                    className="rounded-full border border-neutral-200 bg-neutral-50 px-4 py-1.5 text-sm font-medium text-neutral-800"
                  >
                    {bullet}
                  </li>
                ))}
              </ul>

              <div className="mt-8">
                <button
                  type="button"
                  onClick={() => handleRequirementCta(card.ctaType)}
                  className={card.ctaType === "custom-project" ? BTN_PRIMARY_DARK : BTN_GHOST_DARK}
                  style={card.ctaType === "custom-project" ? { background: "#2C1F14" } : undefined}
                >
                  {card.ctaLabel}
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ── 3. Applications — Glass Films-specific ────────────────────── */}
      <section className="bg-white py-16 md:py-20">
        <div className="container-site">
          <div className="mx-auto max-w-2xl text-center">
            <span className="text-xs font-semibold uppercase tracking-[0.3em]" style={{ color: "#D48C43" }}>
              {applications.eyebrow}
            </span>
            <h2 className="mt-3 font-serif text-2xl font-medium text-neutral-900 sm:text-3xl">
              {applications.title}
            </h2>
          </div>

          <div className="mt-10 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
            {applications.items.map((item) => (
              <div key={item.title} className="group relative aspect-[4/3] overflow-hidden rounded-2xl">
                <Image
                  src={item.image}
                  alt={item.imageAlt}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div
                  className="pointer-events-none absolute inset-0"
                  style={{ background: "linear-gradient(180deg, rgba(16,11,8,0) 45%, rgba(16,11,8,0.65) 100%)" }}
                />
                <span className="absolute inset-x-0 bottom-0 p-4 text-[15px] font-medium text-white">
                  {item.title}
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── 4. Benefits — Glass Films-specific ─────────────────────────── */}
      <section className="container-site py-16 md:py-20">
        <div className="mx-auto max-w-2xl text-center">
          <span className="text-xs font-semibold uppercase tracking-[0.3em]" style={{ color: "#D48C43" }}>
            {benefits.eyebrow}
          </span>
          <h2 className="mt-3 font-serif text-2xl font-medium text-neutral-900 sm:text-3xl">
            {benefits.title}
          </h2>
        </div>

        <div className="mt-10 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {benefits.items.map((item, i) => (
            <div
              key={item.title}
              className="flex items-center gap-4 rounded-2xl border border-neutral-200 bg-neutral-50 px-5 py-5"
            >
              <span
                className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full text-sm font-semibold text-white"
                style={{ background: "#2C1F14" }}
              >
                {String(i + 1).padStart(2, "0")}
              </span>
              <span className="text-[15px] font-medium text-neutral-900">{item.title}</span>
            </div>
          ))}
        </div>
      </section>

      {/* ── 5. How It Works — dual timeline, Glass Films-specific ──────── */}
      <section className="bg-white py-16 md:py-20">
        <div className="container-site">
          <div className="mx-auto max-w-2xl text-center">
            <span className="text-xs font-semibold uppercase tracking-[0.3em]" style={{ color: "#D48C43" }}>
              {howItWorks.eyebrow}
            </span>
            <h2 className="mt-3 font-serif text-2xl font-medium text-neutral-900 sm:text-3xl">
              {howItWorks.title}
            </h2>
          </div>

          <div className="mt-12 grid grid-cols-1 gap-12 lg:grid-cols-2">
            {[howItWorks.customProject, howItWorks.decorative].map((track) => (
              <div key={track.title}>
                <h3 className="text-center font-serif text-lg font-medium text-neutral-900">
                  {track.title}
                </h3>
                <div className="mt-8 flex flex-col items-center">
                  {track.steps.map((step, i) => (
                    <div key={step.title} className="flex flex-col items-center">
                      <div className="flex flex-col items-center text-center">
                        <div
                          className="flex h-11 w-11 items-center justify-center rounded-full text-sm font-semibold text-white"
                          style={{ background: "#2C1F14" }}
                        >
                          {i + 1}
                        </div>
                        <span className="mt-3 text-[15px] font-medium text-neutral-900">{step.title}</span>
                      </div>
                      {i < track.steps.length - 1 && (
                        <span aria-hidden className="my-3 h-8 w-px bg-neutral-300" />
                      )}
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── 6. FAQ ─────────────────────────────────────────────────────── */}
      <section className="container-site py-16 md:py-20">
        <div className="mx-auto max-w-2xl text-center">
          <span className="text-xs font-semibold uppercase tracking-[0.3em]" style={{ color: "#D48C43" }}>
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
                      isOpen ? "rotate-45 border-transparent text-white" : "rotate-0 border-neutral-300 text-neutral-500"
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
                    <p className="pb-6 pr-10 text-[15px] leading-relaxed text-neutral-600">{item.a}</p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* ── 7. Final Call To Action ────────────────────────────────────── */}
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
          </div>
        </div>
      </section>
    </div>
  );
}
