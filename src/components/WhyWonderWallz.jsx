"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Ruler, Sparkles, Wrench, Truck } from "lucide-react";

const cards = [
  {
    icon: Ruler,
    title: "Custom Sizes",
    description:
      "Every wall is unique. We cut wallpapers to your exact dimensions reducing waste and making it cost effective — no trimming, no gaps, no guesswork.",
    accent: "#00BFA5",
    tag: "Made to Measure",
  },
  {
    icon: Sparkles,
    title: "HP Latex Printing",
    description:
      "HP's eco-friendly latex inks deliver vibrant colors and a matte finish that resists fading, scratches, and stains — perfect for high-traffic spaces.",
    accent: "#7B2FBE",
    tag: "Vibrant & Durable",
  },
  {
    icon: Wrench,
    title: "Easy Installation",
    description:
      "Peel-and-stick or paste-the-wall — our panels align seamlessly and go up in under an hour.",
    accent: "#F57C00",
    tag: "DIY Friendly",
  },
  {
    icon: Truck,
    title: "Delivery all over West Bengal",
    description:
      "Rolled and tube-packed to prevent creasing, we deliver all over West Bengal with care and speed.",
    accent: "#00BFA5",
    tag: "Fast & Reliable",
  },
];

const containerVariants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.15, delayChildren: 0.2 },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 40 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.55, ease: [0.22, 1, 0.36, 1] },
  },
};

const headingVariants = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
};

export default function WhyWonderWallz() {
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-80px" });

  return (
    <section
      ref={sectionRef}
      aria-labelledby="why-wonderwallz-heading"
      style={{
        background: "#F9F9FB",
        padding: "96px 24px",
        fontFamily: "'Inter', 'Segoe UI', sans-serif",
        overflow: "hidden",
        position: "relative",
      }}
    >
      {/* Subtle background geometry */}
      <svg
        aria-hidden="true"
        style={{
          position: "absolute",
          top: 0,
          right: 0,
          opacity: 0.04,
          width: 480,
          pointerEvents: "none",
        }}
        viewBox="0 0 480 480"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <rect x="60" y="60" width="160" height="160" rx="8" fill="#7B2FBE" />
        <rect x="240" y="60" width="160" height="160" rx="8" fill="#00BFA5" />
        <rect x="60" y="240" width="160" height="160" rx="8" fill="#F57C00" />
        <rect x="240" y="240" width="160" height="160" rx="8" fill="#7B2FBE" />
      </svg>

      <div style={{ maxWidth: 1120, margin: "0 auto", position: "relative" }}>
        {/* Section header */}
        <motion.div
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          variants={headingVariants}
          style={{ textAlign: "center", marginBottom: 64 }}
        >
          <span
            style={{
              display: "inline-block",
              background: "linear-gradient(90deg, #7B2FBE22, #00BFA522)",
              border: "1px solid #7B2FBE33",
              borderRadius: 999,
              padding: "6px 18px",
              fontSize: 12,
              fontWeight: 700,
              letterSpacing: "0.12em",
              textTransform: "uppercase",
              color: "#7B2FBE",
              marginBottom: 20,
            }}
          >
            Why Choose Us
          </span>

          <h2
            id="why-wonderwallz-heading"
            style={{
              fontSize: "clamp(2rem, 4vw, 2.75rem)",
              fontWeight: 800,
              color: "#1A1A2E",
              margin: "0 0 16px",
              lineHeight: 1.15,
              letterSpacing: "-0.02em",
            }}
          >
            Why{" "}
            <span
              style={{
                background: "linear-gradient(135deg, #7B2FBE 0%, #00BFA5 100%)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
              }}
            >
              Wonder Wallz
            </span>
            ?
          </h2>

          <p
            style={{
              fontSize: 17,
              color: "#555",
              maxWidth: 520,
              margin: "0 auto",
              lineHeight: 1.7,
              fontWeight: 400,
            }}
          >
            Walls that speak for themselves — here's what makes every roll we
            ship worth hanging.
          </p>
        </motion.div>

        {/* Cards grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))",
            gap: 24,
          }}
        >
          {cards.map(({ icon: Icon, title, description, accent, tag }) => (
            <Card
              key={title}
              Icon={Icon}
              title={title}
              description={description}
              accent={accent}
              tag={tag}
            />
          ))}
        </motion.div>
      </div>
    </section>
  );
}

function Card({ Icon, title, description, accent, tag }) {
  return (
    <motion.article
      variants={cardVariants}
      whileHover="hovered"
      initial="rest"
      animate="rest"
      style={{ position: "relative" }}
    >
      {/* Glow layer */}
      <motion.div
        variants={{
          rest: { opacity: 0, scale: 0.85 },
          hovered: { opacity: 1, scale: 1 },
        }}
        transition={{ duration: 0.35 }}
        style={{
          position: "absolute",
          inset: -1,
          borderRadius: 20,
          background: `radial-gradient(ellipse at 50% 0%, ${accent}30 0%, transparent 70%)`,
          pointerEvents: "none",
          zIndex: 0,
        }}
      />

      <motion.div
        variants={{
          rest: {
            y: 0,
            boxShadow: "0 2px 12px rgba(0,0,0,0.06)",
            borderColor: "#E5E7EB",
          },
          hovered: {
            y: -6,
            boxShadow: `0 20px 48px ${accent}28`,
            borderColor: accent,
          },
        }}
        transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
        style={{
          background: "#FFFFFF",
          borderRadius: 20,
          border: "1.5px solid #E5E7EB",
          padding: "36px 28px 32px",
          position: "relative",
          zIndex: 1,
          height: "100%",
          boxSizing: "border-box",
          cursor: "default",
        }}
      >
        {/* Top bar accent */}
        <motion.div
          variants={{
            rest: { scaleX: 0 },
            hovered: { scaleX: 1 },
          }}
          transition={{ duration: 0.4, ease: "easeOut" }}
          style={{
            position: "absolute",
            top: 0,
            left: 24,
            right: 24,
            height: 3,
            borderRadius: "0 0 4px 4px",
            background: `linear-gradient(90deg, ${accent}, ${accent}88)`,
            transformOrigin: "left",
          }}
        />

        {/* Icon */}
        <motion.div
          variants={{
            rest: { scale: 1, rotate: 0 },
            hovered: { scale: 1.1, rotate: -4 },
          }}
          transition={{ duration: 0.3 }}
          style={{
            width: 56,
            height: 56,
            borderRadius: 16,
            background: `${accent}14`,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            marginBottom: 24,
          }}
        >
          <Icon size={26} color={accent} strokeWidth={2} />
        </motion.div>

        {/* Tag pill */}
        <span
          style={{
            display: "inline-block",
            background: `${accent}12`,
            color: accent,
            fontSize: 10,
            fontWeight: 700,
            letterSpacing: "0.1em",
            textTransform: "uppercase",
            padding: "3px 10px",
            borderRadius: 999,
            marginBottom: 10,
          }}
        >
          {tag}
        </span>

        <h3
          style={{
            fontSize: 19,
            fontWeight: 700,
            color: "#1A1A2E",
            margin: "0 0 10px",
            letterSpacing: "-0.01em",
            lineHeight: 1.2,
          }}
        >
          {title}
        </h3>

        <p
          style={{
            fontSize: 14.5,
            color: "#6B7280",
            lineHeight: 1.7,
            margin: 0,
          }}
        >
          {description}
        </p>
      </motion.div>
    </motion.article>
  );
}
