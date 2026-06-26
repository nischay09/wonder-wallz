"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import {
  Sparkles,
  Ruler,
  Layers,
  Wrench,
  Truck,
  Palette,
  LayoutGrid,
  UploadCloud,
  Calculator,
  ShoppingCart,
  MapPin,
} from "lucide-react";

/* ----------------------------------------------------------------------- */
/* Content                                                                  */
/* ----------------------------------------------------------------------- */

const ACCENT_FROM = "#3D5AFE"; // blue
const ACCENT_TO = "#8B5CF6"; // purple
const ACCENT_SOLID = "#5457E5"; // single accent used for icons/borders

const trustBadges = [
  { icon: Sparkles, label: "HP Latex Certified" },
  { icon: Truck, label: "Pan India Delivery" },
  { icon: MapPin, label: "Kolkata-Based Studio" },
];

const features = [
  {
    icon: Sparkles,
    title: "HP Latex Eco-Friendly Printing",
    description:
      "Vivid, fade-resistant colour using HP's water-based latex inks — safe for homes and offices.",
  },
  {
    icon: Ruler,
    title: "Made to Measure",
    description:
      "Every panel is cut to your exact wall dimensions, down to the last centimetre.",
  },
  {
    icon: Layers,
    title: "Premium Materials",
    description:
      "Textured, washable, tear-resistant surfaces built to handle daily life.",
  },
  {
    icon: Wrench,
    title: "Professional Installation",
    description:
      "Trained installers across Kolkata handle measuring, hanging and finishing for you.",
  },
  {
    icon: Truck,
    title: "Pan India Delivery",
    description:
      "Rolled and tube-packed, shipped safely to any city across India.",
  },
  {
    icon: Palette,
    title: "Expert Design Assistance",
    description:
      "Our designers help you choose colours, patterns and scale that fit your space.",
  },
];

const stats = [
  { value: 5000, suffix: "+", label: "Walls Installed" },
  { value: 10, suffix: "+", label: "Years Experience" },
  { value: 500, suffix: "+", label: "Design Collections" },
  { value: 100, suffix: "%", label: "Custom Sizes" },
];

const steps = [
  {
    number: "01",
    title: "Choose Product",
    description: "Pick wallpaper, wall art, or a custom mural to begin.",
    icon: LayoutGrid,
  },
  {
    number: "02",
    title: "Browse Collection or Upload Design",
    description: "Explore our catalogue or upload your own artwork or photo.",
    icon: UploadCloud,
  },
  {
    number: "03",
    title: "Enter Measurements",
    description: "Add your wall's width and height — in feet or metres.",
    icon: Ruler,
  },
  {
    number: "04",
    title: "Instant Price Estimate",
    description: "See your exact price the moment you enter your measurements.",
    icon: Calculator,
  },
  {
    number: "05",
    title: "Add to Quote",
    description: "Save your selection and build a quote across multiple walls.",
    icon: ShoppingCart,
  },
  {
    number: "06",
    title: "WhatsApp Confirmation",
    description: "Send your quote on WhatsApp and our team confirms your order.",
    icon: "whatsapp",
  },
];

/* ----------------------------------------------------------------------- */
/* Motion variants                                                         */
/* ----------------------------------------------------------------------- */

const containerStagger = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1, delayChildren: 0.15 } },
};

const fadeUp = {
  hidden: { opacity: 0, y: 28 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.55, ease: [0.22, 1, 0.36, 1] },
  },
};

const headingFade = {
  hidden: { opacity: 0, y: 22 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
};

/* ----------------------------------------------------------------------- */
/* Animated counter                                                         */
/* ----------------------------------------------------------------------- */

function AnimatedCounter({ value, suffix = "", duration = 1.5 }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-60px" });
  const [display, setDisplay] = useState(0);

  useEffect(() => {
    if (!isInView) return;
    let raf;
    let start;

    const tick = (ts) => {
      if (!start) start = ts;
      const progress = Math.min((ts - start) / (duration * 1000), 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setDisplay(Math.round(eased * value));
      if (progress < 1) raf = requestAnimationFrame(tick);
    };

    raf = requestAnimationFrame(tick);
    return () => raf && cancelAnimationFrame(raf);
  }, [isInView, value, duration]);

  return (
    <span ref={ref}>
      {display.toLocaleString("en-IN")}
      {suffix}
    </span>
  );
}

/* ----------------------------------------------------------------------- */
/* Feature card                                                            */
/* ----------------------------------------------------------------------- */

function FeatureCard({ Icon, title, description }) {
  return (
    <motion.article variants={fadeUp} className="ww-feature-card">
      <div className="ww-feature-icon">
        <Icon size={20} color={ACCENT_SOLID} strokeWidth={2} />
      </div>
      <h3 className="ww-feature-title">{title}</h3>
      <p className="ww-feature-desc">{description}</p>
    </motion.article>
  );
}

/* ----------------------------------------------------------------------- */
/* Process step                                                            */
/* ----------------------------------------------------------------------- */

function ProcessStep({ step, index }) {
  const Icon = step.icon;
  const isWhatsApp = step.icon === "whatsapp";

  return (
    <motion.div variants={fadeUp} className="ww-step-row">
      <div className="ww-step-marker">
        <div className={`ww-step-circle${isWhatsApp ? " ww-step-circle--wa" : ""}`}>
          {isWhatsApp ? (
            <svg viewBox="0 0 24 24" width="18" height="18" aria-hidden="true">
              <path
                fill="#25D366"
                d="M12 2C6.477 2 2 6.477 2 12c0 1.89.525 3.66 1.438 5.168L2 22l4.978-1.38A9.945 9.945 0 0012 22c5.523 0 10-4.477 10-10S17.523 2 12 2zm4.93 13.67c-.2.56-1.18 1.1-1.63 1.14-.42.04-.81.2-2.74-.57-2.31-.93-3.8-3.27-3.91-3.42-.12-.15-.96-1.28-.96-2.44 0-1.17.61-1.74.83-1.98.21-.24.46-.3.62-.3l.44.008c.14.006.33-.053.51.39.2.47.68 1.65.74 1.77.06.12.1.26.02.42-.08.16-.12.26-.24.4l-.35.42c-.12.13-.25.27-.11.53.14.26.63 1.04 1.35 1.68.93.83 1.71 1.09 1.97 1.21.26.12.41.1.56-.06.15-.16.64-.74.81-1 .17-.25.34-.21.57-.13.23.08 1.47.69 1.72.82.25.12.42.18.48.28.06.1.06.56-.14 1.1z"
              />
            </svg>
          ) : (
            <Icon size={18} color={ACCENT_SOLID} strokeWidth={2} />
          )}
          <span className="ww-step-number">{step.number}</span>
        </div>
        {index < steps.length - 1 && <div className="ww-step-connector" />}
      </div>

      <div className="ww-step-body">
        <h4 className="ww-step-title">{step.title}</h4>
        <p className="ww-step-desc">{step.description}</p>
      </div>
    </motion.div>
  );
}

/* ----------------------------------------------------------------------- */
/* Main section                                                            */
/* ----------------------------------------------------------------------- */

export default function WonderWallzTrust() {
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-80px" });

  const timelineRef = useRef(null);
  const timelineInView = useInView(timelineRef, { once: true, margin: "-100px" });

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&display=swap');

        .ww-trust-section {
          --accent-from: ${ACCENT_FROM};
          --accent-to: ${ACCENT_TO};
          --accent: ${ACCENT_SOLID};
          --ivory: #FAF7F1;
          --ivory-soft: #F2EEE4;
          --charcoal: #232325;
          --charcoal-soft: #5C5C63;
          --border: #E7E1D4;
          font-family: 'Inter', 'Segoe UI', sans-serif;
          background: var(--ivory);
          padding: 104px 24px 112px;
          position: relative;
          overflow: hidden;
        }

        .ww-trust-inner {
          max-width: 1240px;
          margin: 0 auto;
          position: relative;
        }

        /* ---------- Trust strip ---------- */
        .ww-trust-strip {
          display: flex;
          justify-content: center;
          align-items: center;
          flex-wrap: wrap;
          gap: 14px 32px;
          margin-bottom: 72px;
        }
        .ww-trust-badge {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          font-size: 13px;
          font-weight: 600;
          color: var(--charcoal-soft);
          letter-spacing: 0.01em;
        }
        .ww-trust-badge svg { color: var(--accent); flex-shrink: 0; }
        .ww-trust-divider {
          width: 1px;
          height: 14px;
          background: var(--border);
        }

        /* ---------- Two column grid ---------- */
        .ww-columns {
          display: grid;
          grid-template-columns: 1.05fr 0.95fr;
          gap: 72px;
          align-items: start;
        }

        .ww-col-header {
          position: relative;
          margin-bottom: 40px;
        }

        .ww-eyebrow {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          font-size: 11.5px;
          font-weight: 700;
          letter-spacing: 0.14em;
          text-transform: uppercase;
          color: var(--accent);
          margin-bottom: 14px;
        }
        .ww-eyebrow-dot {
          width: 6px; height: 6px;
          border-radius: 50%;
          background: linear-gradient(135deg, var(--accent-from), var(--accent-to));
        }

        .ww-col-title {
          font-size: clamp(1.7rem, 2.6vw, 2.35rem);
          font-weight: 800;
          color: var(--charcoal);
          margin: 0 0 14px;
          line-height: 1.18;
          letter-spacing: -0.02em;
        }

        .ww-col-subtitle {
          font-size: 15.5px;
          color: var(--charcoal-soft);
          line-height: 1.65;
          max-width: 420px;
          margin: 0;
          font-weight: 400;
        }

        /* Swatch deck decorative motif (left column) */
        .ww-swatch-deck {
          position: absolute;
          top: -8px;
          right: 0;
          width: 92px;
          height: 76px;
          pointer-events: none;
        }
        .ww-swatch {
          position: absolute;
          width: 54px;
          height: 68px;
          border-radius: 10px;
          border: 1px solid var(--border);
          box-shadow: 0 6px 16px rgba(35,35,37,0.07);
        }
        .ww-swatch--1 {
          right: 28px;
          transform: rotate(-9deg);
          background:
            repeating-linear-gradient(45deg, #EDEAFB 0 6px, #E3DEFA 6px 12px);
        }
        .ww-swatch--2 {
          right: 12px;
          transform: rotate(4deg);
          background:
            radial-gradient(circle at 30% 30%, #DCE4FE 2px, transparent 2.5px) 0 0/12px 12px,
            #F4F1FF;
        }
        .ww-swatch--3 {
          right: 0;
          transform: rotate(-2deg);
          background: linear-gradient(160deg, #EEF1FF, #F7F0FB);
        }

        /* ---------- Feature cards ---------- */
        .ww-feature-grid {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 16px;
          margin-bottom: 40px;
        }

        .ww-feature-card {
          background: #FFFFFF;
          border: 1px solid var(--border);
          border-radius: 20px;
          padding: 22px 20px;
          box-shadow: 0 2px 14px rgba(35,35,37,0.045);
          transition: transform 0.25s ease, box-shadow 0.25s ease, border-color 0.25s ease;
        }
        .ww-feature-card:hover {
          transform: translateY(-3px);
          box-shadow: 0 14px 32px rgba(84,87,229,0.12);
          border-color: #D9D4F5;
        }

        .ww-feature-icon {
          width: 40px;
          height: 40px;
          border-radius: 12px;
          background: linear-gradient(135deg, rgba(61,90,254,0.1), rgba(139,92,246,0.1));
          display: flex;
          align-items: center;
          justify-content: center;
          margin-bottom: 16px;
        }

        .ww-feature-title {
          font-size: 15px;
          font-weight: 700;
          color: var(--charcoal);
          margin: 0 0 6px;
          letter-spacing: -0.005em;
          line-height: 1.3;
        }

        .ww-feature-desc {
          font-size: 13.2px;
          color: var(--charcoal-soft);
          line-height: 1.55;
          margin: 0;
        }

        /* ---------- Stats ---------- */
        .ww-stats-wrap {
          background: #FFFFFF;
          border: 1px solid var(--border);
          border-radius: 22px;
          padding: 28px 24px;
          box-shadow: 0 2px 14px rgba(35,35,37,0.045);
        }

        .ww-stats-grid {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 8px;
        }

        .ww-stat {
          text-align: center;
          padding: 4px 6px;
        }
        .ww-stat + .ww-stat {
          border-left: 1px solid var(--border);
        }

        .ww-stat-value {
          display: block;
          font-size: clamp(1.3rem, 2vw, 1.6rem);
          font-weight: 800;
          letter-spacing: -0.02em;
          background: linear-gradient(135deg, var(--accent-from), var(--accent-to));
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
          margin-bottom: 4px;
        }

        .ww-stat-label {
          font-size: 11.5px;
          color: var(--charcoal-soft);
          font-weight: 500;
          line-height: 1.3;
        }

        /* ---------- Process timeline ---------- */
        .ww-timeline {
          position: relative;
        }

        .ww-step-row {
          display: grid;
          grid-template-columns: 52px 1fr;
          gap: 0 18px;
        }

        .ww-step-marker {
          display: flex;
          flex-direction: column;
          align-items: center;
        }

        .ww-step-circle {
          width: 44px;
          height: 44px;
          border-radius: 50%;
          background: #FFFFFF;
          border: 1.5px solid var(--border);
          display: flex;
          align-items: center;
          justify-content: center;
          position: relative;
          flex-shrink: 0;
          box-shadow: 0 2px 8px rgba(35,35,37,0.06);
        }
        .ww-step-circle--wa {
          border-color: #25D36655;
        }

        .ww-step-number {
          position: absolute;
          top: -6px;
          left: -6px;
          width: 18px;
          height: 18px;
          border-radius: 50%;
          background: linear-gradient(135deg, var(--accent-from), var(--accent-to));
          color: #fff;
          font-size: 9px;
          font-weight: 700;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .ww-step-connector {
          width: 2px;
          flex: 1;
          min-height: 30px;
          margin: 4px 0;
          background: linear-gradient(to bottom, var(--border), var(--border));
        }

        .ww-step-body {
          padding-bottom: 30px;
          padding-top: 6px;
        }

        .ww-step-title {
          font-size: 15.5px;
          font-weight: 700;
          color: var(--charcoal);
          margin: 0 0 5px;
          letter-spacing: -0.005em;
        }

        .ww-step-desc {
          font-size: 13.2px;
          color: var(--charcoal-soft);
          line-height: 1.55;
          margin: 0;
        }

        /* ---------- CTA ---------- */
        .ww-cta {
          text-align: center;
          margin-top: 72px;
          padding-top: 48px;
          border-top: 1px solid var(--border);
        }
        .ww-cta-text {
          font-size: 14.5px;
          color: var(--charcoal-soft);
          margin-bottom: 18px;
        }
        .ww-cta-btn {
          display: inline-flex;
          align-items: center;
          gap: 10px;
          background: linear-gradient(135deg, var(--accent-from), var(--accent-to));
          color: #fff;
          font-family: 'Inter', sans-serif;
          font-size: 14.5px;
          font-weight: 700;
          padding: 14px 32px;
          border-radius: 50px;
          text-decoration: none;
          border: none;
          cursor: pointer;
          box-shadow: 0 8px 24px rgba(84,87,229,0.25);
          transition: transform 0.18s ease, box-shadow 0.18s ease;
        }
        .ww-cta-btn:hover {
          transform: translateY(-2px);
          box-shadow: 0 12px 30px rgba(84,87,229,0.32);
        }
        .ww-cta-btn svg { width: 18px; height: 18px; }
        .ww-cta-btn:focus-visible,
        .ww-feature-card:focus-visible {
          outline: 2px solid var(--accent);
          outline-offset: 2px;
        }

        /* ---------- Responsive ---------- */
        @media (max-width: 980px) {
          .ww-columns { grid-template-columns: 1fr; gap: 64px; }
          .ww-swatch-deck { display: none; }
        }

        @media (max-width: 600px) {
          .ww-trust-section { padding: 72px 16px 88px; }
          .ww-trust-strip { gap: 10px 20px; margin-bottom: 48px; }
          .ww-feature-grid { grid-template-columns: 1fr; }
          .ww-stats-grid { grid-template-columns: repeat(2, 1fr); gap: 18px; }
          .ww-stat + .ww-stat { border-left: none; }
          .ww-stat:nth-child(odd) { border-right: 1px solid var(--border); }
          .ww-columns { gap: 56px; }
          .ww-col-header { margin-bottom: 28px; }
        }

        @media (prefers-reduced-motion: reduce) {
          .ww-feature-card, .ww-cta-btn { transition: none; }
        }
      `}</style>

      <section
        ref={sectionRef}
        className="ww-trust-section"
        aria-labelledby="ww-trust-heading"
      >
        <div className="ww-trust-inner">
          {/* Trust strip */}
          <motion.div
            className="ww-trust-strip"
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
            variants={headingFade}
          >
            {trustBadges.map(({ icon: Icon, label }, i) => (
              <span key={label} style={{ display: "flex", alignItems: "center", gap: 32 }}>
                <span className="ww-trust-badge">
                  <Icon size={15} strokeWidth={2.2} />
                  {label}
                </span>
                {i < trustBadges.length - 1 && <span className="ww-trust-divider" aria-hidden="true" />}
              </span>
            ))}
          </motion.div>

          <div className="ww-columns">
            {/* ---------------- LEFT: Why Choose Us ---------------- */}
            <div>
              <motion.div
                className="ww-col-header"
                initial="hidden"
                animate={isInView ? "visible" : "hidden"}
                variants={headingFade}
              >
                <div className="ww-swatch-deck" aria-hidden="true">
                  <div className="ww-swatch ww-swatch--1" />
                  <div className="ww-swatch ww-swatch--2" />
                  <div className="ww-swatch ww-swatch--3" />
                </div>

                <span className="ww-eyebrow">
                  <span className="ww-eyebrow-dot" />
                  Why Wonder Wallz
                </span>
                <h2 className="ww-col-title" id="ww-trust-heading">
                  Why Choose Wonder Wallz?
                </h2>
                <p className="ww-col-subtitle">
                  Premium interior solutions for homes, offices and commercial spaces.
                </p>
              </motion.div>

              <motion.div
                className="ww-feature-grid"
                variants={containerStagger}
                initial="hidden"
                animate={isInView ? "visible" : "hidden"}
              >
                {features.map((f) => (
                  <FeatureCard key={f.title} Icon={f.icon} title={f.title} description={f.description} />
                ))}
              </motion.div>

              <motion.div
                className="ww-stats-wrap"
                variants={fadeUp}
                initial="hidden"
                animate={isInView ? "visible" : "hidden"}
              >
                <div className="ww-stats-grid">
                  {stats.map((s) => (
                    <div className="ww-stat" key={s.label}>
                      <span className="ww-stat-value">
                        <AnimatedCounter value={s.value} suffix={s.suffix} />
                      </span>
                      <span className="ww-stat-label">{s.label}</span>
                    </div>
                  ))}
                </div>
              </motion.div>
            </div>

            {/* ---------------- RIGHT: How It Works ---------------- */}
            <div>
              <motion.div
                className="ww-col-header"
                initial="hidden"
                animate={isInView ? "visible" : "hidden"}
                variants={headingFade}
              >
                <span className="ww-eyebrow">
                  <span className="ww-eyebrow-dot" />
                  How It Works
                </span>
                <h2 className="ww-col-title">Your Wallpaper, Six Steps Away</h2>
                <p className="ww-col-subtitle">
                  From browsing to your door — a process designed to be effortless.
                </p>
              </motion.div>

              <motion.div
                ref={timelineRef}
                className="ww-timeline"
                role="list"
                aria-label="How It Works steps"
                variants={containerStagger}
                initial="hidden"
                animate={timelineInView ? "visible" : "hidden"}
              >
                {steps.map((step, i) => (
                  <ProcessStep key={step.number} step={step} index={i} />
                ))}
              </motion.div>
            </div>
          </div>

          {/* ---------------- Shared CTA ---------------- */}
          <motion.div
            className="ww-cta"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.5 }}
          >
            <p className="ww-cta-text">Ready to transform your walls?</p>
            <a
              href="https://wa.me/91XXXXXXXXXX"
              className="ww-cta-btn"
              aria-label="Start your Wonder Wallz order on WhatsApp"
              rel="noopener noreferrer"
              target="_blank"
            >
              <svg viewBox="0 0 24 24" fill="white" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                <path d="M12 2C6.477 2 2 6.477 2 12c0 1.89.525 3.66 1.438 5.168L2 22l4.978-1.38A9.945 9.945 0 0012 22c5.523 0 10-4.477 10-10S17.523 2 12 2zm4.93 13.67c-.2.56-1.18 1.1-1.63 1.14-.42.04-.81.2-2.74-.57-2.31-.93-3.8-3.27-3.91-3.42-.12-.15-.96-1.28-.96-2.44 0-1.17.61-1.74.83-1.98.21-.24.46-.3.62-.3l.44.008c.14.006.33-.053.51.39.2.47.68 1.65.74 1.77.06.12.1.26.02.42-.08.16-.12.26-.24.4l-.35.42c-.12.13-.25.27-.11.53.14.26.63 1.04 1.35 1.68.93.83 1.71 1.09 1.97 1.21.26.12.41.1.56-.06.15-.16.64-.74.81-1 .17-.25.34-.21.57-.13.23.08 1.47.69 1.72.82.25.12.42.18.48.28.06.1.06.56-.14 1.1z" />
              </svg>
              Get Started on WhatsApp
            </a>
          </motion.div>
        </div>
      </section>
    </>
  );
}
