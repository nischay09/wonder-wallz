"use client";

import { useEffect, useRef } from "react";
import { motion, useInView, useAnimation } from "framer-motion";

const WHATSAPP_NUMBER = "9883100377"; // Replace with actual number
const WHATSAPP_MESSAGE = "Hi! I'd like a personalized wallpaper quote from Wonder Wallz.";

const tilePattern = [
  { x: 0, y: 0, color: "#9B2FC9" },
  { x: 1, y: 0, color: "#7B22A8" },
  { x: 0, y: 1, color: "#7B22A8" },
  { x: 1, y: 1, color: "#9B2FC9" },
];

function FloatingTile({ delay = 0, style = {} }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30, rotate: -8 }}
      animate={{
        opacity: [0.12, 0.22, 0.12],
        y: [30, -10, 30],
        rotate: [-8, 4, -8],
      }}
      transition={{
        duration: 7,
        delay,
        repeat: Infinity,
        ease: "easeInOut",
      }}
      style={{
        position: "absolute",
        width: 72,
        height: 72,
        borderRadius: 10,
        background: "linear-gradient(135deg, #9B2FC9 0%, #F97316 100%)",
        opacity: 0.15,
        pointerEvents: "none",
        ...style,
      }}
    />
  );
}

function WallGrid() {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 1.2, ease: "easeOut" }}
      style={{
        display: "grid",
        gridTemplateColumns: "repeat(2, 28px)",
        gridTemplateRows: "repeat(2, 28px)",
        gap: 4,
        position: "absolute",
        top: "18%",
        left: "8%",
        opacity: 0.22,
      }}
    >
      {tilePattern.map((t, i) => (
        <motion.div
          key={i}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 + i * 0.12 }}
          style={{
            width: 28,
            height: 28,
            borderRadius: 4,
            background: t.color,
          }}
        />
      ))}
    </motion.div>
  );
}

export default function WonderWallzCTA() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });
  const controls = useAnimation();

  useEffect(() => {
    if (isInView) controls.start("visible");
  }, [isInView]);

  const handleWhatsApp = () => {
    const url = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(WHATSAPP_MESSAGE)}`;
    window.open(url, "_blank", "noopener,noreferrer");
  };

  const containerVariants = {
    hidden: {},
    visible: { transition: { staggerChildren: 0.14 } },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 36 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.72, ease: [0.22, 1, 0.36, 1] } },
  };

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800&display=swap');

        .wwcta-root {
          font-family: 'Plus Jakarta Sans', sans-serif;
          position: relative;
          overflow: hidden;
          padding: 100px 24px;
          display: flex;
          align-items: center;
          justify-content: center;
          min-height: 520px;
          background: #0a0612;
        }

        .wwcta-bg-gradient {
          position: absolute;
          inset: 0;
          background:
            radial-gradient(ellipse 80% 60% at 20% 50%, rgba(21, 192, 182, 0.18) 0%, transparent 60%),
            radial-gradient(ellipse 70% 70% at 80% 30%, rgba(155, 47, 201, 0.22) 0%, transparent 60%),
            radial-gradient(ellipse 60% 80% at 60% 90%, rgba(249, 115, 22, 0.16) 0%, transparent 60%),
            #0a0612;
          z-index: 0;
        }

        .wwcta-card {
          position: relative;
          z-index: 2;
          max-width: 720px;
          width: 100%;
          border-radius: 28px;
          padding: 64px 56px;
          background: linear-gradient(160deg, rgba(255,255,255,0.055) 0%, rgba(255,255,255,0.022) 100%);
          border: 1.5px solid rgba(255,255,255,0.10);
          backdrop-filter: blur(20px);
          box-shadow:
            0 0 0 1px rgba(155,47,201,0.15),
            0 32px 80px rgba(0,0,0,0.45),
            inset 0 1px 0 rgba(255,255,255,0.08);
          text-align: center;
        }

        .wwcta-eyebrow {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          background: linear-gradient(90deg, rgba(21,192,182,0.15), rgba(155,47,201,0.15));
          border: 1px solid rgba(21,192,182,0.30);
          border-radius: 100px;
          padding: 6px 18px;
          font-size: 12px;
          font-weight: 600;
          letter-spacing: 0.12em;
          text-transform: uppercase;
          color: #15C0B6;
          margin-bottom: 28px;
        }

        .wwcta-eyebrow-dot {
          width: 6px;
          height: 6px;
          border-radius: 50%;
          background: #15C0B6;
          box-shadow: 0 0 6px #15C0B6;
        }

        .wwcta-headline {
          font-size: clamp(2rem, 5vw, 3.2rem);
          font-weight: 800;
          line-height: 1.12;
          margin: 0 0 18px;
          background: linear-gradient(110deg, #ffffff 20%, #e8d5f8 50%, #15C0B6 85%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
          letter-spacing: -0.02em;
        }

        .wwcta-sub {
          font-size: 1.1rem;
          color: rgba(255,255,255,0.58);
          font-weight: 500;
          margin: 0 0 40px;
          letter-spacing: 0.01em;
          line-height: 1.6;
        }

        .wwcta-btn-wrap {
          display: flex;
          justify-content: center;
        }

        .wwcta-btn {
          position: relative;
          display: inline-flex;
          align-items: center;
          gap: 12px;
          padding: 17px 38px;
          border-radius: 100px;
          border: none;
          cursor: pointer;
          font-family: 'Plus Jakarta Sans', sans-serif;
          font-size: 1rem;
          font-weight: 700;
          letter-spacing: 0.01em;
          color: #fff;
          background: linear-gradient(100deg, #25D366 0%, #128C7E 100%);
          box-shadow:
            0 4px 24px rgba(37,211,102,0.35),
            0 1px 0 rgba(255,255,255,0.15) inset;
          transition: transform 0.18s ease, box-shadow 0.18s ease;
          text-decoration: none;
          outline: none;
          overflow: hidden;
        }

        .wwcta-btn::before {
          content: '';
          position: absolute;
          inset: 0;
          background: linear-gradient(100deg, rgba(255,255,255,0.15) 0%, transparent 60%);
          border-radius: inherit;
        }

        .wwcta-btn:hover {
          transform: translateY(-3px) scale(1.03);
          box-shadow:
            0 8px 36px rgba(37,211,102,0.50),
            0 1px 0 rgba(255,255,255,0.15) inset;
        }

        .wwcta-btn:active {
          transform: translateY(0) scale(0.99);
        }

        .wwcta-btn-icon {
          width: 22px;
          height: 22px;
          flex-shrink: 0;
        }

        .wwcta-trust {
          margin-top: 28px;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 20px;
          flex-wrap: wrap;
        }

        .wwcta-trust-item {
          display: flex;
          align-items: center;
          gap: 7px;
          font-size: 0.8rem;
          color: rgba(255,255,255,0.38);
          font-weight: 500;
        }

        .wwcta-trust-icon {
          width: 14px;
          height: 14px;
          opacity: 0.55;
        }

        .wwcta-glow-teal {
          position: absolute;
          width: 320px;
          height: 320px;
          border-radius: 50%;
          background: radial-gradient(circle, rgba(21,192,182,0.25) 0%, transparent 70%);
          top: -80px;
          left: -80px;
          pointer-events: none;
          z-index: 0;
        }

        .wwcta-glow-purple {
          position: absolute;
          width: 280px;
          height: 280px;
          border-radius: 50%;
          background: radial-gradient(circle, rgba(155,47,201,0.22) 0%, transparent 70%);
          bottom: -60px;
          right: -60px;
          pointer-events: none;
          z-index: 0;
        }

        @media (max-width: 600px) {
          .wwcta-card {
            padding: 48px 28px;
          }
        }
      `}</style>

      <section className="wwcta-root" aria-label="Call to action – Transform Your Walls">
        <div className="wwcta-bg-gradient" aria-hidden="true" />

        {/* Floating ambient tiles */}
        <FloatingTile delay={0} style={{ top: "12%", right: "10%", width: 56, height: 56 }} />
        <FloatingTile delay={1.5} style={{ bottom: "18%", left: "5%", width: 44, height: 44 }} />
        <FloatingTile delay={3} style={{ bottom: "10%", right: "18%", width: 36, height: 36, borderRadius: 6 }} />
        <WallGrid />

        {/* Card */}
        <motion.div
          ref={ref}
          className="wwcta-card"
          variants={containerVariants}
          initial="hidden"
          animate={controls}
        >
          <div className="wwcta-glow-teal" aria-hidden="true" />
          <div className="wwcta-glow-purple" aria-hidden="true" />

          {/* Eyebrow */}
          <motion.div variants={itemVariants} className="wwcta-eyebrow">
            <span className="wwcta-eyebrow-dot" />
            Free Consultation
          </motion.div>

          {/* Headline */}
          <motion.h2 variants={itemVariants} className="wwcta-headline">
            Ready To Transform<br />Your Walls?
          </motion.h2>

          {/* Subheadline */}
          <motion.p variants={itemVariants} className="wwcta-sub">
            Get a personalized wallpaper quote today.
          </motion.p>

          {/* CTA Button */}
          <motion.div
            variants={itemVariants}
            className="wwcta-btn-wrap"
          >
            <motion.button
              className="wwcta-btn"
              onClick={handleWhatsApp}
              whileHover={{ scale: 1.04, y: -3 }}
              whileTap={{ scale: 0.97 }}
              transition={{ type: "spring", stiffness: 320, damping: 20 }}
              aria-label="Chat on WhatsApp for a wallpaper quote"
            >
              {/* WhatsApp SVG */}
              <svg className="wwcta-btn-icon" viewBox="0 0 24 24" fill="white" aria-hidden="true">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
              </svg>
              Chat on WhatsApp
            </motion.button>
          </motion.div>

          {/* Trust signals */}
          <motion.div variants={itemVariants} className="wwcta-trust" aria-label="Trust signals">
            {[
              { label: "No commitment" },
              { label: "Quick response" },
              { label: "100% free quote" },
            ].map((item) => (
              <span className="wwcta-trust-item" key={item.label}>
                <svg className="wwcta-trust-icon" viewBox="0 0 16 16" fill="none" aria-hidden="true">
                  <circle cx="8" cy="8" r="7" stroke="#15C0B6" strokeWidth="1.5"/>
                  <path d="M5 8l2 2 4-4" stroke="#15C0B6" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
                {item.label}
              </span>
            ))}
          </motion.div>
        </motion.div>
      </section>
    </>
  );
}
