/**
 * TrustStrip.tsx
 * /app/components/TrustStrip.tsx
 *
 * Continuous right-to-left marquee of trust metrics, placed directly
 * after the Hero. Self-contained: does not touch Hero.tsx, Hero.module.css,
 * or IframeSection.tsx.
 *
 * Behaviour:
 *  - Scrolls slowly and seamlessly (CSS animation, GPU-friendly
 *    transform, no JS-driven layout).
 *  - Pauses on hover and on keyboard focus of any item inside it.
 *  - Respects prefers-reduced-motion: falls back to a static,
 *    wrapped row instead of animating.
 *  - Marked aria-hidden as a whole (decorative reinforcement of trust
 *    signals already present as real content elsewhere on the page);
 *    if this strip is the ONLY place these facts appear, remove
 *    aria-hidden and instead give the wrapping <section> an
 *    accessible name.
 */

import styles from "./TrustStrip.module.css";

const TRUST_ITEMS = [
  "500+ Exclusive Designs",
  "HP Latex Printing",
  "Eco-Friendly Inks",
  "Custom Sizes",
  "Pan India Delivery",
  "Installation Support",
  "Premium Materials",
  "Residential & Commercial Projects",
];

export default function TrustStrip() {
  return (
    <section className={styles.wrapper} aria-hidden="true">
      <div className={styles.track}>
        {/* Item set rendered twice back-to-back so the loop is seamless */}
        {[0, 1].map((setIndex) => (
          <div className={styles.set} key={setIndex}>
            {TRUST_ITEMS.map((item, i) => (
              <span className={styles.item} key={`${setIndex}-${i}`}>
                <span className={styles.dot} />
                {item}
              </span>
            ))}
          </div>
        ))}
      </div>
    </section>
  );
}
