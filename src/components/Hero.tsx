/**
 * Hero.tsx
 * /app/components/Hero.tsx (or wherever section components live)
 *
 * Native React/Next.js conversion of the standalone
 * wonder_wallz_hero.html. Layout, styling, copy, animations and
 * responsiveness are preserved as-is — this is a structural port,
 * not a redesign.
 *
 * Changes from the standalone HTML version:
 *  - Removed <!DOCTYPE>, <html>, <head>, <body>, <main> and the
 *    page-level <title>/meta tags (handled by app/page.tsx metadata).
 *  - Removed the standalone skip-link — app/layout.tsx already owns
 *    the page-level <main id="main-content"> landmark.
 *  - <img> → next/image (fill + priority, matching the dev note that
 *    was already left in the original markup).
 *  - Internal links (/custom-design, /collections) → next/link.
 *  - External WhatsApp link kept as a plain <a> (target="_blank").
 *  - All styling moved into Hero.module.css (scoped) instead of a
 *    page-level <style> block, with :root tokens scoped to the
 *    component root instead of leaking globally.
 *
 * Dependencies: none beyond what's already in the stack.
 *
 * NOTE: This component renders 'Cormorant Garamond' for the headline
 * and stat numbers. Make sure that font is loaded globally (e.g. via
 * next/font/google in app/layout.tsx) alongside the existing
 * Fraunces/Inter setup — it is not loaded inside this file.
 */

import Image from "next/image";
import Link from "next/link";
import styles from "./Hero.module.css";

// TODO: insert the real Wonder Wallz WhatsApp number here (digits only,
// country code first, e.g. "919883100377"). Currently using the number
// already present in the source hero markup.
const WHATSAPP_NUMBER = "919883100377";
const WHATSAPP_MESSAGE =
  "Hi Wonder Wallz! I would like to discuss a custom project. Can you help me?";
const WHATSAPP_HREF = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(
  WHATSAPP_MESSAGE
)}`;

export default function Hero() {
  return (
    <div className={styles.heroRoot}>
      <section
        className={styles.hero}
        aria-label="Wonder Wallz – Premium Wallpapers and Wall Murals for Indian Homes"
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
            Premium Wall Décor · India
          </p>

          {/* H1 — ONE per page */}
          <h1 className={styles.headline}>
            Transform Your Walls
            <br />
            Into <em>Timeless</em>
            <br />
            <span className={styles.accentWord}>Masterpieces</span>
          </h1>

          {/* Subheadline */}
          <p className={styles.subheadline} itemProp="description">
            Premium custom wallpapers, murals, posters and glass films crafted for
            Indian homes. Choose from <strong>500+ curated designs</strong> or
            upload your own artwork — printed on HP Latex technology for lasting
            colour.
          </p>

          {/* Trust badges — 2×2 grid */}
          <div className={styles.trustGrid} aria-label="Quality guarantees">
            <div className={styles.trustItem}>
              <span className={styles.trustCheck} aria-hidden="true">
                <svg viewBox="0 0 9 9" fill="none">
                  <path
                    d="M1.5 4.5L3.5 6.5L7.5 2.5"
                    stroke="#C9A84C"
                    strokeWidth="1.6"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </span>
              HP Latex Printed
            </div>
            <div className={styles.trustItem}>
              <span className={styles.trustCheck} aria-hidden="true">
                <svg viewBox="0 0 9 9" fill="none">
                  <path
                    d="M1.5 4.5L3.5 6.5L7.5 2.5"
                    stroke="#C9A84C"
                    strokeWidth="1.6"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </span>
              Eco-Friendly Inks
            </div>
            <div className={styles.trustItem}>
              <span className={styles.trustCheck} aria-hidden="true">
                <svg viewBox="0 0 9 9" fill="none">
                  <path
                    d="M1.5 4.5L3.5 6.5L7.5 2.5"
                    stroke="#C9A84C"
                    strokeWidth="1.6"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </span>
              Any Custom Size
            </div>
            <div className={styles.trustItem}>
              <span className={styles.trustCheck} aria-hidden="true">
                <svg viewBox="0 0 9 9" fill="none">
                  <path
                    d="M1.5 4.5L3.5 6.5L7.5 2.5"
                    stroke="#C9A84C"
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
              <span className={styles.spNumber}>1000+</span>
              <span className={styles.spLabel}>Walls Transformed</span>
            </div>
          </div>

          {/* CTAs */}
          <div className={styles.ctaGroup}>
            {/* Primary: Get Free Quote */}
            <Link
              href="/custom-design"
              className={styles.ctaPrimary}
              aria-label="Start your custom wallpaper project with Wonder Wallz"
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
              aria-label="Browse Wonder Wallz products by category"
            >
              Browse Products
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
             RIGHT COLUMN — Luxury Interior Photo
            ═══════════════════════════════════════ */}
        <div
          className={styles.heroVisual}
          role="img"
          aria-label="Luxury living room with a stunning botanical wallpaper feature wall by Wonder Wallz"
        >
          {/*
            TODO (handoff item): swap this Unsplash placeholder for the
            real Wonder Wallz interior photo at /public/images/hero-room-mockup.jpg
            Ideal spec: 1400×1800 (portrait) or 1600×1000 (landscape),
            bright/well-lit, wallpaper pattern dominating 40-60% of frame.
          */}
          <Image
            src="https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?w=1400&q=85&auto=format&fit=crop"
            alt="Luxury modern living room featuring a dramatic wallpaper feature wall — the kind of premium interior transformation Wonder Wallz delivers"
            fill
            priority
            sizes="(max-width: 900px) 100vw, 50vw"
            style={{ objectFit: "cover", objectPosition: "center" }}
          />

          {/* Glassmorphism Stat Cards */}
          <div className={`${styles.gb} ${styles.gb1} ${styles.gbRating}`} aria-hidden="true">
            <span className={styles.gbLabel}>Customer Rating</span>
            <span className={styles.gbValue}>4.8 ★</span>
            <div className={styles.gbStars}>
              {Array.from({ length: 5 }).map((_, i) => (
                <svg key={i} viewBox="0 0 12 12" width="10" height="10" fill="#C9A84C">
                  <path d="M6 1l1.3 2.7 3 .4-2.2 2.1.5 3L6 7.8l-2.6 1.4.5-3L1.7 4.1l3-.4z" />
                </svg>
              ))}
            </div>
          </div>

          <div className={`${styles.gb} ${styles.gb2}`} aria-hidden="true">
            <span className={styles.gbLabel}>Curated Library</span>
            <span className={styles.gbValue}>500+</span>
            <span className={styles.gbSub}>Premium Designs</span>
          </div>

          <div className={`${styles.gb} ${styles.gb3}`} aria-hidden="true">
            <span className={styles.gbLabel}>Printing</span>
            <span className={styles.gbValue}>Custom Size</span>
            <span className={styles.gbSub}>Any wall, any dimension</span>
          </div>

          <div className={`${styles.gb} ${styles.gb4}`} aria-hidden="true">
            <span className={styles.gbLabel}>Delivery</span>
            <span className={styles.gbValue}>Pan India</span>
            <span className={styles.gbSub}>Fast & tracked</span>
          </div>

          <div className={`${styles.gb} ${styles.gb5} ${styles.gbHp}`} aria-hidden="true">
            <span className={styles.gbLabel}>Technology</span>
            <span className={styles.gbValue}>HP Latex</span>
            <span className={styles.gbSub}>Eco-friendly · Durable</span>
          </div>

          {/* Brand mark overlay at bottom */}
          <div className={styles.brandMark} aria-hidden="true">
            <span className={styles.brandMarkDot}></span>
            <span className={styles.brandMarkText}>
              Wonder Wallz · Custom Wallpaper Specialists
            </span>
          </div>
        </div>
        {/* /heroVisual */}
      </section>
    </div>
  );
}
