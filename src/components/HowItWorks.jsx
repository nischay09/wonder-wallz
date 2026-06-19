"use client";

import { useEffect, useRef } from "react";
import { motion, useInView, useAnimation } from "framer-motion";

const steps = [
  {
    number: "01",
    title: "Choose Your Design",
    description:
      "Browse our curated collection of stunning wallpaper designs — from bold geometrics to serene botanicals. Filter by room, mood, or colour palette to find your perfect match.",
    icon: (
      <svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
        <rect x="6" y="6" width="16" height="16" rx="3" fill="#00BFA6" opacity="0.9" />
        <rect x="26" y="6" width="16" height="16" rx="3" fill="#7B2FBE" opacity="0.9" />
        <rect x="6" y="26" width="16" height="16" rx="3" fill="#FF6B00" opacity="0.9" />
        <rect x="26" y="26" width="16" height="16" rx="3" fill="#00BFA6" opacity="0.5" />
        <circle cx="34" cy="34" r="5" fill="#FF6B00" />
        <path d="M32 34l1.5 1.5L36 32" stroke="#fff" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
    accent: "#00BFA6",
  },
  {
    number: "02",
    title: "Enter Your Measurements",
    description:
      "Tell us your wall's width and height in feet or metres. Our system calculates the exact panels you need — no guesswork, no waste, no overspend.",
    icon: (
      <svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
        <rect x="8" y="20" width="32" height="8" rx="2" fill="#7B2FBE" opacity="0.15" />
        <rect x="8" y="20" width="32" height="8" rx="2" stroke="#7B2FBE" strokeWidth="1.5" />
        {[10, 16, 22, 28, 34].map((x, i) => (
          <line key={i} x1={x} y1="20" x2={x} y2={i % 2 === 0 ? "15" : "17"} stroke="#7B2FBE" strokeWidth="1.5" strokeLinecap="round" />
        ))}
        <path d="M14 32v8M34 32v8" stroke="#FF6B00" strokeWidth="1.5" strokeLinecap="round" />
        <path d="M14 36h20" stroke="#FF6B00" strokeWidth="1.5" strokeLinecap="round" />
        <path d="M12 36l2-2M12 36l2 2M36 36l-2-2M36 36l-2 2" stroke="#FF6B00" strokeWidth="1.5" strokeLinecap="round" />
      </svg>
    ),
    accent: "#7B2FBE",
  },
  {
    number: "03",
    title: "Contact Us on WhatsApp",
    description:
      "Drop us your design choice and measurements via WhatsApp. Our team responds within minutes to confirm your order, share a price quote, and answer any questions.",
    icon: (
      <svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
        <circle cx="24" cy="24" r="18" fill="#25D366" opacity="0.12" />
        <path
          d="M24 8C15.163 8 8 15.163 8 24c0 2.923.787 5.66 2.156 8.017L8 40l8.24-2.118A15.93 15.93 0 0024 40c8.837 0 16-7.163 16-16S32.837 8 24 8z"
          fill="#25D366"
          opacity="0.9"
        />
        <path
          d="M31.5 27.5c-.4-.2-2.3-1.1-2.7-1.3-.4-.1-.6-.2-.9.2-.3.4-1 1.3-1.2 1.5-.2.2-.5.3-.9.1-.4-.2-1.7-.6-3.2-2-1.2-1-2-2.3-2.2-2.7-.2-.4 0-.6.2-.8l.6-.7c.2-.2.2-.4.3-.6.1-.2 0-.4-.1-.6-.1-.2-.9-2.1-1.2-2.9-.3-.7-.6-.6-.9-.6h-.7c-.3 0-.7.1-1 .4-.4.4-1.4 1.3-1.4 3.2s1.4 3.7 1.6 4c.2.2 2.8 4.2 6.7 5.9.9.4 1.7.6 2.2.8.9.3 1.8.2 2.4.1.7-.1 2.2-.9 2.5-1.8.3-.9.3-1.7.2-1.8-.1-.3-.4-.4-.8-.5z"
          fill="white"
        />
      </svg>
    ),
    accent: "#25D366",
  },
  {
    number: "04",
    title: "Receive Your Wallpaper",
    description:
      "Sit back while we print and dispatch your custom wallpaper. Delivered rolled and ready to hang, with care instructions — straight to your door across India.",
    icon: (
      <svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
        <rect x="6" y="18" width="28" height="20" rx="2" fill="#FF6B00" opacity="0.1" stroke="#FF6B00" strokeWidth="1.5" />
        <path d="M34 22h4l4 6v8h-8V22z" fill="#FF6B00" opacity="0.2" stroke="#FF6B00" strokeWidth="1.5" strokeLinejoin="round" />
        <circle cx="14" cy="40" r="3" fill="#FF6B00" />
        <circle cx="34" cy="40" r="3" fill="#FF6B00" />
        <path d="M6 30h28" stroke="#FF6B00" strokeWidth="1.5" />
        <path d="M16 18v-4a4 4 0 014-4h4a4 4 0 014 4v4" stroke="#7B2FBE" strokeWidth="1.5" strokeLinecap="round" />
        <path d="M22 10v-2M19 12l-1.5-1.5M25 12l1.5-1.5" stroke="#7B2FBE" strokeWidth="1.2" strokeLinecap="round" opacity="0.6" />
      </svg>
    ),
    accent: "#FF6B00",
  },
];

function AnimatedStep({ step, index, isLast }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });
  const controls = useAnimation();

  useEffect(() => {
    if (isInView) controls.start("visible");
  }, [isInView, controls]);

  const isEven = index % 2 === 0;

  return (
    <div
      ref={ref}
      className={`step-row ${isEven ? "step-row--left" : "step-row--right"}`}
      itemScope
      itemType="https://schema.org/HowToStep"
    >
      {/* Timeline spine */}
      <div className="timeline-col">
        <motion.div
          className="timeline-dot"
          style={{ borderColor: step.accent, boxShadow: `0 0 0 6px ${step.accent}18` }}
          initial={{ scale: 0, opacity: 0 }}
          animate={controls}
          variants={{ visible: { scale: 1, opacity: 1, transition: { delay: index * 0.15, type: "spring", stiffness: 200 } } }}
        >
          <span className="step-number" style={{ color: step.accent }}>
            {step.number}
          </span>
        </motion.div>
        {!isLast && (
          <motion.div
            className="timeline-line"
            initial={{ scaleY: 0 }}
            animate={controls}
            variants={{ visible: { scaleY: 1, transition: { delay: index * 0.15 + 0.3, duration: 0.5, ease: "easeOut" } } }}
          />
        )}
      </div>

      {/* Card */}
      <motion.article
        className="step-card"
        itemProp="name"
        initial={{ opacity: 0, x: isEven ? -40 : 40, y: 20 }}
        animate={controls}
        variants={{
          visible: {
            opacity: 1,
            x: 0,
            y: 0,
            transition: { delay: index * 0.15 + 0.1, duration: 0.55, ease: [0.22, 1, 0.36, 1] },
          },
        }}
        whileHover={{ y: -4, transition: { duration: 0.2 } }}
        style={{ "--accent": step.accent }}
      >
        <div className="card-icon-wrap" style={{ background: `${step.accent}14` }}>
          {step.icon}
        </div>
        <div className="card-body">
          <h3 className="card-title" itemProp="name">{step.title}</h3>
          <p className="card-desc" itemProp="text">{step.description}</p>
        </div>
        <div className="card-accent-bar" style={{ background: step.accent }} />
      </motion.article>
    </div>
  );
}

export default function HowItWorks() {
  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800&display=swap');

        .hiw-section {
          font-family: 'Plus Jakarta Sans', sans-serif;
          background: #fafafa;
          padding: 96px 24px 112px;
          position: relative;
          overflow: hidden;
        }

        /* Subtle background texture */
        .hiw-section::before {
          content: '';
          position: absolute;
          inset: 0;
          background:
            radial-gradient(ellipse 60% 40% at 10% 20%, #00BFA608 0%, transparent 70%),
            radial-gradient(ellipse 50% 50% at 90% 80%, #7B2FBE08 0%, transparent 70%);
          pointer-events: none;
        }

        .hiw-inner {
          max-width: 860px;
          margin: 0 auto;
          position: relative;
          z-index: 1;
        }

        /* Header */
        .hiw-eyebrow {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          font-size: 12px;
          font-weight: 700;
          letter-spacing: 0.14em;
          text-transform: uppercase;
          color: #7B2FBE;
          margin-bottom: 16px;
        }
        .hiw-eyebrow-dot {
          width: 6px; height: 6px;
          border-radius: 50%;
          background: linear-gradient(135deg, #00BFA6, #7B2FBE);
        }

        .hiw-title {
          font-size: clamp(2rem, 5vw, 3rem);
          font-weight: 800;
          color: #1a1a2e;
          line-height: 1.15;
          margin: 0 0 16px;
          letter-spacing: -0.02em;
        }
        .hiw-title span {
          background: linear-gradient(90deg, #7B2FBE, #FF6B00);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }

        .hiw-subtitle {
          font-size: 1.05rem;
          color: #555;
          line-height: 1.65;
          max-width: 520px;
          margin: 0 0 72px;
        }

        /* Timeline steps */
        .steps-container {
          position: relative;
          display: flex;
          flex-direction: column;
          gap: 0;
        }

        .step-row {
          display: grid;
          grid-template-columns: 72px 1fr;
          gap: 0 24px;
          align-items: flex-start;
          margin-bottom: 0;
        }

        .timeline-col {
          display: flex;
          flex-direction: column;
          align-items: center;
          padding-top: 28px;
        }

        .timeline-dot {
          width: 52px;
          height: 52px;
          border-radius: 50%;
          border: 2.5px solid;
          background: #fff;
          display: flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
          z-index: 2;
        }

        .step-number {
          font-size: 13px;
          font-weight: 800;
          letter-spacing: 0.03em;
        }

        .timeline-line {
          width: 2px;
          flex: 1;
          min-height: 32px;
          background: linear-gradient(to bottom, #e0e0e0, #e8e8e8);
          transform-origin: top;
          margin: 6px 0;
        }

        /* Cards */
        .step-card {
          background: #fff;
          border-radius: 16px;
          padding: 28px 28px 28px 28px;
          margin-bottom: 24px;
          display: flex;
          align-items: flex-start;
          gap: 20px;
          position: relative;
          overflow: hidden;
          box-shadow: 0 2px 12px rgba(0,0,0,0.06), 0 0 0 1px rgba(0,0,0,0.04);
          cursor: default;
          transition: box-shadow 0.2s;
        }
        .step-card:hover {
          box-shadow: 0 8px 32px rgba(0,0,0,0.1), 0 0 0 1px var(--accent, #7B2FBE)22;
        }

        .card-accent-bar {
          position: absolute;
          left: 0;
          top: 0;
          bottom: 0;
          width: 4px;
          border-radius: 4px 0 0 4px;
          opacity: 0.85;
        }

        .card-icon-wrap {
          width: 56px;
          height: 56px;
          border-radius: 14px;
          flex-shrink: 0;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 10px;
        }
        .card-icon-wrap svg {
          width: 100%;
          height: 100%;
        }

        .card-body {
          flex: 1;
        }
        .card-title {
          font-size: 1.1rem;
          font-weight: 700;
          color: #1a1a2e;
          margin: 0 0 8px;
          letter-spacing: -0.01em;
        }
        .card-desc {
          font-size: 0.9rem;
          color: #666;
          line-height: 1.65;
          margin: 0;
        }

        /* CTA */
        .hiw-cta {
          text-align: center;
          margin-top: 56px;
        }
        .hiw-cta-text {
          font-size: 0.9rem;
          color: #888;
          margin-bottom: 20px;
        }
        .cta-btn {
          display: inline-flex;
          align-items: center;
          gap: 10px;
          background: linear-gradient(135deg, #7B2FBE, #FF6B00);
          color: #fff;
          font-family: 'Plus Jakarta Sans', sans-serif;
          font-size: 0.95rem;
          font-weight: 700;
          padding: 14px 32px;
          border-radius: 50px;
          text-decoration: none;
          border: none;
          cursor: pointer;
          box-shadow: 0 4px 20px rgba(123,47,190,0.3);
          transition: transform 0.18s, box-shadow 0.18s;
        }
        .cta-btn:hover {
          transform: translateY(-2px);
          box-shadow: 0 8px 28px rgba(123,47,190,0.38);
        }
        .cta-btn svg { width: 20px; height: 20px; }

        /* Responsive */
        @media (max-width: 600px) {
          .hiw-section { padding: 72px 16px 88px; }
          .step-row { grid-template-columns: 48px 1fr; gap: 0 16px; }
          .timeline-dot { width: 42px; height: 42px; }
          .step-number { font-size: 11px; }
          .step-card { padding: 20px 18px; gap: 14px; }
          .card-icon-wrap { width: 46px; height: 46px; border-radius: 10px; }
          .card-title { font-size: 1rem; }
          .card-desc { font-size: 0.85rem; }
          .hiw-subtitle { margin-bottom: 48px; }
        }

        @media (prefers-reduced-motion: reduce) {
          .step-card, .cta-btn { transition: none; }
        }
      `}</style>

      <section
        className="hiw-section"
        aria-labelledby="hiw-heading"
        itemScope
        itemType="https://schema.org/HowTo"
      >
        <meta itemProp="name" content="How to Order Custom Wallpaper from Wonder Wallz" />

        <div className="hiw-inner">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
          >
            <p className="hiw-eyebrow">
              <span className="hiw-eyebrow-dot" />
              Simple Process
            </p>
            <h2 className="hiw-title" id="hiw-heading">
              From Wall to <span>Wonder</span>
              <br />in 4 Easy Steps
            </h2>
            <p className="hiw-subtitle" itemProp="description">
              Getting a custom wallpaper that fits your space perfectly has never been this straightforward. No design degree needed — just tell us what you love.
            </p>
          </motion.div>

          {/* Steps */}
          <div
            className="steps-container"
            role="list"
            aria-label="How It Works steps"
          >
            {steps.map((step, i) => (
              <AnimatedStep
                key={step.number}
                step={step}
                index={i}
                isLast={i === steps.length - 1}
              />
            ))}
          </div>

          {/* CTA */}
          <motion.div
            className="hiw-cta"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <p className="hiw-cta-text">Ready to transform your walls?</p>
            <a
              href="https://wa.me/91XXXXXXXXXX"
              className="cta-btn"
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
