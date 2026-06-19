"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const categories = [
  {
    id: "floral",
    title: "Floral",
    slug: "floral-wallpapers",
    count: "240+ Designs",
    emoji: "🌸",
    gradient: "from-pink-400 via-rose-300 to-fuchsia-400",
    accent: "#f472b6",
    bg: "linear-gradient(135deg, #fce4ec 0%, #f8bbd0 40%, #e91e8c22 100%)",
    description: "Blooms that breathe life into walls",
  },
  {
    id: "luxury",
    title: "Luxury",
    slug: "luxury-wallpapers",
    count: "180+ Designs",
    emoji: "✨",
    gradient: "from-yellow-400 via-amber-300 to-orange-400",
    accent: "#f59e0b",
    bg: "linear-gradient(135deg, #1a0a00 0%, #3d1f00 50%, #78350f 100%)",
    description: "Gold-standard opulence for discerning spaces",
    dark: true,
  },
  {
    id: "kids-room",
    title: "Kids Room",
    slug: "kids-room-wallpapers",
    count: "310+ Designs",
    emoji: "🦄",
    gradient: "from-purple-400 via-pink-400 to-yellow-300",
    accent: "#a855f7",
    bg: "linear-gradient(135deg, #fef9c3 0%, #ede9fe 50%, #fce7f3 100%)",
    description: "Imagination painted on every inch",
  },
  {
    id: "marble",
    title: "Marble",
    slug: "marble-wallpapers",
    count: "150+ Designs",
    emoji: "🪨",
    gradient: "from-slate-300 via-gray-200 to-stone-300",
    accent: "#64748b",
    bg: "linear-gradient(135deg, #f8fafc 0%, #e2e8f0 50%, #cbd5e1 100%)",
    description: "Timeless veins of stone sophistication",
  },
  {
    id: "nature",
    title: "Nature",
    slug: "nature-wallpapers",
    count: "420+ Designs",
    emoji: "🌿",
    gradient: "from-emerald-400 via-teal-400 to-green-500",
    accent: "#10b981",
    bg: "linear-gradient(135deg, #ecfdf5 0%, #d1fae5 40%, #6ee7b722 100%)",
    description: "Forest, ocean & sky — brought indoors",
  },
  {
    id: "abstract",
    title: "Abstract",
    slug: "abstract-wallpapers",
    count: "280+ Designs",
    emoji: "🎨",
    gradient: "from-violet-500 via-fuchsia-400 to-cyan-400",
    accent: "#8b5cf6",
    bg: "linear-gradient(135deg, #1e1b4b 0%, #312e81 50%, #4c1d9522 100%)",
    description: "Art that defies definition",
    dark: true,
  },
  {
    id: "religious",
    title: "Religious",
    slug: "religious-wallpapers",
    count: "200+ Designs",
    emoji: "🪔",
    gradient: "from-orange-400 via-amber-400 to-yellow-300",
    accent: "#f97316",
    bg: "linear-gradient(135deg, #fff7ed 0%, #fed7aa 50%, #fb923c22 100%)",
    description: "Sacred motifs for divine spaces",
  },
  {
    id: "geometric",
    title: "Geometric",
    slug: "geometric-wallpapers",
    count: "195+ Designs",
    emoji: "🔷",
    gradient: "from-cyan-400 via-teal-400 to-sky-500",
    accent: "#06b6d4",
    bg: "linear-gradient(135deg, #ecfeff 0%, #cffafe 50%, #67e8f922 100%)",
    description: "Precision patterns with modern edge",
  },
  {
    id: "office",
    title: "Office",
    slug: "office-wallpapers",
    count: "160+ Designs",
    emoji: "💼",
    gradient: "from-slate-500 via-gray-500 to-zinc-500",
    accent: "#475569",
    bg: "linear-gradient(135deg, #f1f5f9 0%, #e2e8f0 50%, #cbd5e122 100%)",
    description: "Focused atmospheres for productive minds",
  },
  {
    id: "hotel",
    title: "Hotel",
    slug: "hotel-wallpapers",
    count: "220+ Designs",
    emoji: "🏨",
    gradient: "from-purple-600 via-violet-500 to-fuchsia-500",
    accent: "#7c3aed",
    bg: "linear-gradient(135deg, #1e0a3c 0%, #2e1065 50%, #4c1d9522 100%)",
    description: "5-star grandeur for every room",
    dark: true,
  },
];

// SVG pattern overlays per category
const PatternOverlay = ({ id }) => {
  const patterns = {
    floral: (
      <svg className="absolute inset-0 w-full h-full opacity-10" viewBox="0 0 200 200">
        {[...Array(6)].map((_, i) => (
          <g key={i} transform={`translate(${(i % 3) * 70 + 20}, ${Math.floor(i / 3) * 90 + 20})`}>
            <circle r="18" fill="none" stroke="currentColor" strokeWidth="1.5" />
            <circle r="8" fill="currentColor" opacity="0.4" />
            {[0, 60, 120, 180, 240, 300].map((a, j) => (
              <ellipse key={j} rx="6" ry="12" transform={`rotate(${a}) translate(0,-20)`} fill="currentColor" opacity="0.3" />
            ))}
          </g>
        ))}
      </svg>
    ),
    marble: (
      <svg className="absolute inset-0 w-full h-full opacity-8" viewBox="0 0 200 200" preserveAspectRatio="none">
        <path d="M0,60 Q50,40 100,70 T200,50" stroke="currentColor" strokeWidth="2" fill="none" opacity="0.3" />
        <path d="M0,100 Q70,80 130,110 T200,90" stroke="currentColor" strokeWidth="1.5" fill="none" opacity="0.2" />
        <path d="M20,0 Q60,80 40,200" stroke="currentColor" strokeWidth="1" fill="none" opacity="0.15" />
      </svg>
    ),
    geometric: (
      <svg className="absolute inset-0 w-full h-full opacity-10" viewBox="0 0 200 200">
        {[...Array(4)].map((_, i) =>
          [...Array(4)].map((_, j) => (
            <rect key={`${i}-${j}`} x={i * 50 + 5} y={j * 50 + 5} width="40" height="40" fill="none" stroke="currentColor" strokeWidth="1" transform={`rotate(45, ${i * 50 + 25}, ${j * 50 + 25})`} opacity="0.4" />
          ))
        )}
      </svg>
    ),
    abstract: (
      <svg className="absolute inset-0 w-full h-full opacity-10" viewBox="0 0 200 200">
        <circle cx="60" cy="60" r="50" fill="currentColor" opacity="0.15" />
        <circle cx="140" cy="140" r="60" fill="currentColor" opacity="0.1" />
        <circle cx="150" cy="50" r="30" fill="currentColor" opacity="0.2" />
      </svg>
    ),
    default: null,
  };
  return patterns[id] || patterns["default"];
};

const CategoryCard = ({ cat, index }) => {
  const [hovered, setHovered] = useState(false);

  return (
    <motion.article
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.5, delay: index * 0.07, ease: [0.22, 1, 0.36, 1] }}
      onHoverStart={() => setHovered(true)}
      onHoverEnd={() => setHovered(false)}
      aria-label={`${cat.title} wallpapers — ${cat.count}`}
      style={{ "--accent": cat.accent }}
      className="ww-card group relative overflow-hidden rounded-2xl cursor-pointer select-none"
    >
      {/* Background */}
      <div
        className="absolute inset-0 transition-transform duration-700 ease-out group-hover:scale-110"
        style={{ background: cat.bg }}
      />

      {/* Pattern */}
      <div className={cat.dark ? "text-white" : "text-gray-800"} style={{ position: "absolute", inset: 0 }}>
        <PatternOverlay id={cat.id} />
      </div>

      {/* Shimmer on hover */}
      <motion.div
        className="absolute inset-0 pointer-events-none"
        initial={{ opacity: 0, x: "-100%" }}
        animate={hovered ? { opacity: 1, x: "200%" } : { opacity: 0, x: "-100%" }}
        transition={{ duration: 0.6, ease: "easeInOut" }}
        style={{
          background: "linear-gradient(105deg, transparent 40%, rgba(255,255,255,0.25) 50%, transparent 60%)",
        }}
      />

      {/* Gradient pill accent bar */}
      <motion.div
        className={`absolute top-0 left-0 right-0 h-1 rounded-t-2xl bg-gradient-to-r ${cat.gradient}`}
        animate={hovered ? { scaleX: 1, opacity: 1 } : { scaleX: 0.4, opacity: 0.5 }}
        style={{ transformOrigin: "left" }}
        transition={{ duration: 0.4 }}
      />

      {/* Content */}
      <div className="relative z-10 p-6 flex flex-col h-full min-h-[200px] justify-between">
        {/* Emoji icon */}
        <motion.div
          animate={hovered ? { scale: 1.2, rotate: [0, -8, 8, 0] } : { scale: 1, rotate: 0 }}
          transition={{ duration: 0.4 }}
          className="text-4xl mb-3 w-fit"
          role="img"
          aria-hidden="true"
        >
          {cat.emoji}
        </motion.div>

        <div>
          <h3
            className={`font-bold text-xl tracking-tight mb-1 transition-colors duration-300 ${
              cat.dark ? "text-white" : "text-gray-900"
            }`}
            style={{ fontFamily: "'Poppins', sans-serif" }}
          >
            {cat.title}
          </h3>

          <p
            className={`text-xs font-medium mb-2 transition-colors duration-300 ${
              cat.dark ? "text-white/60" : "text-gray-500"
            }`}
          >
            {cat.description}
          </p>

          {/* Count badge + CTA */}
          <div className="flex items-center justify-between mt-3">
            <span
              className="text-xs font-semibold px-2.5 py-1 rounded-full"
              style={{
                background: `${cat.accent}22`,
                color: cat.dark ? "#fff" : cat.accent,
                border: `1px solid ${cat.accent}44`,
              }}
            >
              {cat.count}
            </span>

            <motion.div
              animate={hovered ? { x: 0, opacity: 1 } : { x: 6, opacity: 0 }}
              transition={{ duration: 0.25 }}
              className="flex items-center gap-1 text-xs font-semibold"
              style={{ color: cat.dark ? "#fff" : cat.accent }}
            >
              Explore
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M5 12h14M12 5l7 7-7 7" />
              </svg>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Bottom glow on hover */}
      <motion.div
        className="absolute bottom-0 left-0 right-0 h-20 pointer-events-none"
        animate={hovered ? { opacity: 1 } : { opacity: 0 }}
        transition={{ duration: 0.3 }}
        style={{
          background: `linear-gradient(to top, ${cat.accent}33, transparent)`,
        }}
      />
    </motion.article>
  );
};

export default function FeaturedCategories() {
  return (
    <>
      {/* Google Font */}
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;600;700;800&display=swap');

        .ww-section {
          font-family: 'Poppins', sans-serif;
          background: #fafafa;
          padding: 80px 0 100px;
        }

        .ww-card {
          box-shadow: 0 2px 12px rgba(0,0,0,0.06), 0 1px 3px rgba(0,0,0,0.04);
          transition: box-shadow 0.3s ease, transform 0.3s ease;
        }

        .ww-card:hover {
          box-shadow: 0 20px 48px rgba(0,0,0,0.13), 0 4px 12px rgba(0,0,0,0.07);
          transform: translateY(-4px);
        }

        .ww-grid {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 16px;
        }

        @media (min-width: 640px) {
          .ww-grid { grid-template-columns: repeat(3, 1fr); }
        }

        @media (min-width: 1024px) {
          .ww-grid { grid-template-columns: repeat(5, 1fr); }
        }

        .ww-badge {
          display: inline-flex;
          align-items: center;
          gap: 6px;
          background: linear-gradient(90deg, #1bc8c822 0%, #9b59b622 100%);
          border: 1px solid #1bc8c844;
          color: #0d9488;
          font-size: 11px;
          font-weight: 700;
          letter-spacing: 0.08em;
          text-transform: uppercase;
          padding: 5px 14px;
          border-radius: 100px;
          margin-bottom: 16px;
        }

        .ww-title {
          font-size: clamp(28px, 4vw, 44px);
          font-weight: 800;
          line-height: 1.15;
          color: #1a1a2e;
          margin-bottom: 12px;
        }

        .ww-title span {
          background: linear-gradient(90deg, #1bc8c8, #9b59b6, #e67e22);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }

        .ww-subtitle {
          color: #64748b;
          font-size: 15px;
          max-width: 520px;
          margin: 0 auto 48px;
          line-height: 1.6;
        }

        .ww-cta {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          margin-top: 52px;
          padding: 14px 32px;
          background: linear-gradient(90deg, #1bc8c8 0%, #9b59b6 50%, #e67e22 100%);
          color: white;
          font-weight: 700;
          font-size: 14px;
          border-radius: 100px;
          border: none;
          cursor: pointer;
          transition: opacity 0.2s, transform 0.2s;
          box-shadow: 0 8px 24px rgba(155, 89, 182, 0.35);
        }

        .ww-cta:hover {
          opacity: 0.92;
          transform: translateY(-2px);
        }

        .ww-divider {
          width: 56px;
          height: 4px;
          background: linear-gradient(90deg, #1bc8c8, #9b59b6);
          border-radius: 4px;
          margin: 16px auto 20px;
        }
      `}</style>

      <section
        className="ww-section"
        aria-labelledby="categories-heading"
        itemScope
        itemType="https://schema.org/ItemList"
      >
        {/* SEO hidden list metadata */}
        <meta itemProp="name" content="Wonder Wallz Wallpaper Categories" />

        <div style={{ maxWidth: "1280px", margin: "0 auto", padding: "0 24px" }}>
          {/* Header */}
          <motion.div
            className="text-center"
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          >
            <div className="ww-badge">
              <svg width="10" height="10" viewBox="0 0 10 10" fill="currentColor">
                <polygon points="5,0 6.2,3.8 10,3.8 7,6.1 8.1,10 5,7.6 1.9,10 3,6.1 0,3.8 3.8,3.8" />
              </svg>
              Browse Collections
            </div>

            <h2 className="ww-title" id="categories-heading">
              Find Your Perfect <span>Wallpaper Style</span>
            </h2>

            <div className="ww-divider" />

            <p className="ww-subtitle">
              From serene naturescapes to opulent luxury finishes — explore 10 curated categories crafted for every room, taste, and vision.
            </p>
          </motion.div>

          {/* Grid */}
          <div
            className="ww-grid"
            itemScope
            itemType="https://schema.org/ItemList"
            role="list"
          >
            {categories.map((cat, i) => (
              <div key={cat.id} role="listitem" itemScope itemType="https://schema.org/ListItem">
                <meta itemProp="position" content={String(i + 1)} />
                <meta itemProp="name" content={`${cat.title} Wallpapers`} />
                <meta itemProp="url" content={`/categories/${cat.slug}`} />
                <a
                  href={`/categories/${cat.slug}`}
                  aria-label={`Browse ${cat.title} wallpapers`}
                  style={{ display: "block", textDecoration: "none" }}
                >
                  <CategoryCard cat={cat} index={i} />
                </a>
              </div>
            ))}
          </div>

          {/* Bottom CTA */}
          <motion.div
            className="text-center"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            <a href="/categories" aria-label="View all wallpaper collections">
              <button className="ww-cta">
                View All Collections
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M5 12h14M12 5l7 7-7 7" />
                </svg>
              </button>
            </a>
          </motion.div>
        </div>
      </section>
    </>
  );
}
