/**
 * Hero.tsx
 * /app/components/Hero.tsx
 *
 * v2 — Visual redesign only. Architecture, breakpoints, animation
 * timing, accessibility patterns and image-optimisation strategy are
 * unchanged from the original wallpaper-only hero. What changed:
 *
 *  - Right column is now a slow crossfading interior slideshow
 *    (6 rooms, one per featured category) instead of a single static
 *    photo with five floating stat cards.
 *  - Each slide carries exactly ONE floating label (category name),
 *    replacing the five-card glassmorphism cluster.
 *  - Copy broadened from "walls" to whole-room / whole-home
 *    transformation across all eight Wonder Wallz categories.
 *  - Trust grid + social proof content updated to reflect the wider
 *    catalogue (still 2×2 grid + 3-stat row, same structure/markup
 *    shape as before).
 *  - Mobile behaviour unchanged: photo goes full-bleed behind content,
 *    slideshow still crossfades (respects prefers-reduced-motion by
 *    freezing on the first slide), floating label hidden on mobile
 *    exactly like the old glass cards were.
 *
 * Dependencies: none beyond what's already in the stack (next/image,
 * next/link). No new libraries introduced.
 *
 * NOTE: still renders 'Cormorant Garamond' + 'Inter' — load globally
 * via next/font/google in app/layout.tsx as before.
 */

"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import styles from "./Hero.module.css";

// TODO: insert the real Wonder Wallz WhatsApp number here (digits only,
// country code first, e.g. "919883100377").
const WHATSAPP_NUMBER = "919883100377";
const WHATSAPP_MESSAGE =
  "Hi Wonder Wallz! I would like to discuss a custom interior project. Can you help me?";
const WHATSAPP_HREF = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(
  WHATSAPP_MESSAGE
)}`;

// ─────────────────────────────────────────────────────────
// Slideshow content — one entry per featured category.
// TODO (handoff item): swap each Unsplash placeholder for the real
// Wonder Wallz project photo. Keep the same portrait/landscape
// framing (subject filling 40-60% of frame, well-lit, warm tones)
// so new photos drop in without layout changes.
// ─────────────────────────────────────────────────────────
const SLIDES = [
  {
    src: "https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?w=1400&q=85&auto=format&fit=crop",
    alt: "Warm living room featuring a dramatic botanical wallpaper feature wall",
    label: "Designer Wallpaper",
  },
  {
    src: "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=1400&q=85&auto=format&fit=crop",
    alt: "Serene bedroom dressed with luxury floor-to-ceiling curtains",
    label: "Luxury Curtains",
  },
  {
    src: "https://images.unsplash.com/photo-1497366216548-37526070297c?w=1400&q=85&auto=format&fit=crop",
    alt: "Modern home office with a decorative frosted glass film partition",
    label: "Decorative Glass Film",
  },
  {
    src: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=1400&q=85&auto=format&fit=crop",
    alt: "Luxury living room finished with premium SPC and wooden flooring",
    label: "SPC & Wooden Flooring",
  },
  {
    src: "https://images.unsplash.com/photo-1595526114035-0d45ed16cfbf?w=1400&q=85&auto=format&fit=crop",
    alt: "Dining space with tailored window blinds framing natural light",
    label: "Window Blinds",
  },
  {
    src: "https://images.unsplash.com/photo-1616137466211-f939a420be84?w=1400&q=85&auto=format&fit=crop",
    alt: "Luxury lounge seating reupholstered in premium fabric",
    label: "Luxury Upholstery",
  },
];

const SLIDE_DURATION_MS = 5200;

export default function Hero() {
  const [activeSlide, setActiveSlide] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const prefersReducedMotion = useRef(false);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    prefersReducedMotion.current = mq.matches;

    if (prefersReducedMotion.current) return; // stay on slide 0, no auto-advance

    function start() {
      timerRef.current = setInterval(() => {
        setActiveSlide((prev) => (prev + 1) % SLIDES.length);
      }, SLIDE_DURATION_MS);
    }
    function stop() {
      if (timerRef.current) clearInterval(timerRef.current);
      timerRef.current = null;
    }

    // Pause when tab is hidden — no point crossfading off-screen.
    function handleVisibility() {
      if (document.hidden) stop();
      else if (!isPaused) start();
    }

    if (!isPaused) start();
    document.addEventListener("visibilitychange", handleVisibility);
    return () => {
      stop();
      document.removeEventListener("visibilitychange", handleVisibility);
    };
  }, [isPaused]);

  return (
    <div className={styles.heroRoot}>
      <section
        className={styles.hero}
        aria-label="Wonder Wallz – Premium Interior Solutions for Indian Homes"
        itemScope
        itemType="https://schema.org/Product"
      >
        {/* ══════════════════════════════════════
             LEFT COLUMN — Headline, Trust, CTAs
            ═══════════════════════════════════════ */}
        <div className={styles.heroContent}>
          {/* Eyebrow */}
          <p className={styles.eyebrow} aria-hidden="true">
            <span className={styles.eyebrowLine}></span>
            Complete Interior Solutions · India
          </p>

          {/* H1 — ONE per page */}
          <h1 className={styles.headline}>
            Reimagine Every Room
            <br />
            Into <em>Timeless</em>
            <br />
            <span className={styles.accentWord}>Masterpieces</span>
          </h1>

          {/* Subheadline */}
          <p className={styles.subheadline} itemProp="description">
            Custom wallpapers, wall murals, blinds, curtains, flooring, glass
            films, upholstery and canvas prints — every surface of your home,
            crafted by one studio. Choose from{" "}
            <strong>500+ curated designs</strong> or bring your own vision.
          </p>

          {/* Trust badges — 2×2 grid */}
          <div className={styles.trustGrid} aria-label="Quality guarantees">
            <div className={styles.trustItem}>
              <span className={styles.trustCheck} aria-hidden="true">
                <svg viewBox="0 0 9 9" fill="none">
                  <path
                    d="M1.5 4.5L3.5 6.5L7.5 2.5"
                    stroke="var(--gold)"
                    strokeWidth="1.6"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </span>
              Made to Measure
            </div>
            <div className={styles.trustItem}>
              <span className={styles.trustCheck} aria-hidden="true">
                <svg viewBox="0 0 9 9" fill="none">
                  <path
                    d="M1.5 4.5L3.5 6.5L7.5 2.5"
                    stroke="var(--gold)"
                    strokeWidth="1.6"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </span>
              Premium Materials
            </div>
            <div className={styles.trustItem}>
              <span className={styles.trustCheck} aria-hidden="true">
                <svg viewBox="0 0 9 9" fill="none">
                  <path
                    d="M1.5 4.5L3.5 6.5L7.5 2.5"
                    stroke="var(--gold)"
                    strokeWidth="1.6"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </span>
              Expert Installation
            </div>
            <div className={styles.trustItem}>
              <span className={styles.trustCheck} aria-hidden="true">
                <svg viewBox="0 0 9 9" fill="none">
                  <path
                    d="M1.5 4.5L3.5 6.5L7.5 2.5"
                    stroke="var(--gold)"
                    strokeWidth="1.6"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </span>
              Pan India Delivery
            </div>
          </div>

          {/* Social proof row */}
          <div className={styles.socialProof} aria-label="Customer trust indicators">
            <div className={styles.spStat}>
              <div className={styles.spStars} aria-label="4.8 out of 5 stars">
                {Array.from({ length: 5 }).map((_, i) => (
                  <svg key={i} viewBox="0 0 12 12">
                    <path d="M6 1l1.3 2.7 3 .4-2.2 2.1.5 3L6 7.8l-2.6 1.4.5-3L1.7 4.1l3-.4z" />
                  </svg>
                ))}
              </div>
              <span className={styles.spNumber}>4.8</span>
              <span className={styles.spLabel}>Avg. Rating</span>
            </div>
            <div className={styles.spStat}>
              <span className={styles.spNumber}>500+</span>
              <span className={styles.spLabel}>Premium Designs</span>
            </div>
            <div className={styles.spStat}>
              <span className={styles.spNumber}>8</span>
              <span className={styles.spLabel}>Interior Categories</span>
            </div>
          </div>

          {/* CTAs */}
          <div className={styles.ctaGroup}>
            {/* Primary: Get Free Quote */}
            <Link
              href="/custom-design"
              className={styles.ctaPrimary}
              aria-label="Start your custom interior project with Wonder Wallz"
            >
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
                <path
                  d="M11.5 2.5L13.5 4.5L5.5 12.5L2.5 13.5L3.5 10.5L11.5 2.5Z"
                  stroke="currentColor"
                  strokeWidth="1.4"
                  strokeLinejoin="round"
                />
              </svg>
              Start Your Project
            </Link>

            {/* WhatsApp (external) */}
            <a
              href={WHATSAPP_HREF}
              className={styles.ctaWhatsapp}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Chat with Wonder Wallz on WhatsApp for a free consultation"
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
              </svg>
              WhatsApp Us
            </a>

            {/* Secondary: Browse */}
            <Link
              href="/collections"
              className={styles.ctaSecondary}
              aria-label="Browse Wonder Wallz interior categories"
            >
              Browse Categories
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
                <path
                  d="M2.5 7H11.5M8 3.5L11.5 7L8 10.5"
                  stroke="currentColor"
                  strokeWidth="1.4"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </Link>
          </div>
        </div>
        {/* /heroContent */}

        {/* ══════════════════════════════════════
             RIGHT COLUMN — Cinematic Interior Slideshow
            ═══════════════════════════════════════ */}
        <div
          className={styles.heroVisual}
          role="img"
          aria-label={`Interior showcase: ${SLIDES[activeSlide].alt}`}
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
          onFocus={() => setIsPaused(true)}
          onBlur={() => setIsPaused(false)}
        >
          {SLIDES.map((slide, i) => (
            <div
              key={slide.src}
              className={styles.slide}
              style={{ opacity: i === activeSlide ? 1 : 0 }}
              aria-hidden={i !== activeSlide}
            >
              <Image
                src={slide.src}
                alt={slide.alt}
                fill
                priority={i === 0}
                loading={i === 0 ? undefined : "lazy"}
                sizes="(max-width: 900px) 100vw, 50vw"
                style={{ objectFit: "cover", objectPosition: "center" }}
              />
            </div>
          ))}

          {/* Single floating label — one per slide, no clutter */}
          <div className={styles.slideLabel} aria-hidden="true">
            <span className={styles.slideLabelRule} />
            <span className={styles.slideLabelText}>
              {SLIDES[activeSlide].label}
            </span>
          </div>

          {/* Minimal sequence indicator — ticks, not numbers */}
          <div className={styles.slideTicks} aria-hidden="true">
            {SLIDES.map((_, i) => (
              <span
                key={i}
                className={`${styles.slideTick} ${
                  i === activeSlide ? styles.slideTickActive : ""
                }`}
              />
            ))}
          </div>

          {/* Brand mark overlay at bottom */}
          <div className={styles.brandMark} aria-hidden="true">
            <span className={styles.brandMarkDot}></span>
            <span className={styles.brandMarkText}>
              Wonder Wallz · Complete Interior Solutions
            </span>
          </div>
        </div>
        {/* /heroVisual */}
      </section>
    </div>
  );
}
