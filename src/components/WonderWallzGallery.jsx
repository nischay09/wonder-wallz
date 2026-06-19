"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const images = [
  {
    id: 1,
    src: "https://images.unsplash.com/photo-1586105251261-72a756497a11?w=600&q=80",
    alt: "Geometric teal wall art with abstract patterns",
    tag: "Geometric",
    height: "tall",
  },
  {
    id: 2,
    src: "https://images.unsplash.com/photo-1615529162924-f8605388461d?w=600&q=80",
    alt: "Modern living room with purple accent wall",
    tag: "Living Room",
    height: "short",
  },
  {
    id: 3,
    src: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=600&q=80",
    alt: "Orange bohemian wall mural in bedroom",
    tag: "Bohemian",
    height: "medium",
  },
  {
    id: 4,
    src: "https://images.unsplash.com/photo-1567016376408-0226e4d0c1ea?w=600&q=80",
    alt: "Minimalist white wall with teal furniture",
    tag: "Minimalist",
    height: "tall",
  },
  {
    id: 5,
    src: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=600&q=80",
    alt: "Luxury interior with purple gradient walls",
    tag: "Luxury",
    height: "short",
  },
  {
    id: 6,
    src: "https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?w=600&q=80",
    alt: "Tropical wall mural with lush greenery",
    tag: "Tropical",
    height: "medium",
  },
  {
    id: 7,
    src: "https://images.unsplash.com/photo-1631679706909-1844bbd07221?w=600&q=80",
    alt: "Abstract orange and teal textured wall",
    tag: "Abstract",
    height: "tall",
  },
  {
    id: 8,
    src: "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=600&q=80",
    alt: "Modern sofa against bold patterned wall",
    tag: "Contemporary",
    height: "short",
  },
  {
    id: 9,
    src: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=600&q=80",
    alt: "Portrait wall gallery in geometric frames",
    tag: "Gallery Wall",
    height: "medium",
  },
  {
    id: 10,
    src: "https://images.unsplash.com/photo-1600607687939-ce8a6d9b0b60?w=600&q=80",
    alt: "Bright nursery with pastel mural",
    tag: "Kids Room",
    height: "tall",
  },
  {
    id: 11,
    src: "https://images.unsplash.com/photo-1522771739844-6a9f6d5f14af?w=600&q=80",
    alt: "Cozy bedroom with dark forest wall mural",
    tag: "Bedroom",
    height: "short",
  },
  {
    id: 12,
    src: "https://images.unsplash.com/photo-1583847268964-b28dc8f51f92?w=600&q=80",
    alt: "Industrial loft with exposed brick and mural",
    tag: "Industrial",
    height: "medium",
  },
  {
    id: 13,
    src: "https://images.unsplash.com/photo-1562184552-997c461abbe6?w=600&q=80",
    alt: "Vibrant floral wall art in dining room",
    tag: "Floral",
    height: "tall",
  },
  {
    id: 14,
    src: "https://images.unsplash.com/photo-1616137466211-f939a420be84?w=600&q=80",
    alt: "Bathroom with ocean tile mural",
    tag: "Bathroom",
    height: "short",
  },
  {
    id: 15,
    src: "https://images.unsplash.com/photo-1600566753086-00f18fb6b3ea?w=600&q=80",
    alt: "Open-plan kitchen with geometric backsplash",
    tag: "Kitchen",
    height: "medium",
  },
  {
    id: 16,
    src: "https://images.unsplash.com/photo-1524758631624-e2822e304c36?w=600&q=80",
    alt: "Scandinavian room with light wood and muted murals",
    tag: "Scandinavian",
    height: "tall",
  },
  {
    id: 17,
    src: "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=600&q=80",
    alt: "Home office with motivational wall art",
    tag: "Home Office",
    height: "short",
  },
  {
    id: 18,
    src: "https://images.unsplash.com/photo-1600585154526-990dced4db0d?w=600&q=80",
    alt: "Entryway with dramatic teal wallpaper",
    tag: "Entryway",
    height: "medium",
  },
  {
    id: 19,
    src: "https://images.unsplash.com/photo-1578683010236-d716f9a3f461?w=600&q=80",
    alt: "Vintage-style bedroom with hand-painted murals",
    tag: "Vintage",
    height: "tall",
  },
  {
    id: 20,
    src: "https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?w=600&q=80",
    alt: "Terrace with outdoor mural and ambient lighting",
    tag: "Outdoor",
    height: "short",
  },
];

const tags = ["All", ...new Set(images.map((img) => img.tag))];

const heightMap = {
  short: "200px",
  medium: "280px",
  tall: "370px",
};

const cardVariants = {
  hidden: { opacity: 0, y: 30, scale: 0.96 },
  visible: (i) => ({
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { delay: i * 0.045, duration: 0.45, ease: [0.22, 1, 0.36, 1] },
  }),
  exit: { opacity: 0, scale: 0.93, transition: { duration: 0.25 } },
};

export default function WonderWallzGallery() {
  const [activeTag, setActiveTag] = useState("All");
  const [hoveredId, setHoveredId] = useState(null);

  const filtered =
    activeTag === "All" ? images : images.filter((img) => img.tag === activeTag);

  return (
    <section
      style={{
        background: "#fff",
        fontFamily: "'Inter', 'Segoe UI', sans-serif",
        padding: "72px 24px 96px",
        maxWidth: "1400px",
        margin: "0 auto",
      }}
    >
      {/* SEO-friendly heading block */}
      <header style={{ textAlign: "center", marginBottom: "48px" }}>
        <p
          style={{
            fontSize: "12px",
            fontWeight: 700,
            letterSpacing: "3px",
            textTransform: "uppercase",
            color: "#F97316",
            marginBottom: "12px",
          }}
        >
          Wall Art & Murals
        </p>
        <h2
          style={{
            fontSize: "clamp(28px, 5vw, 48px)",
            fontWeight: 800,
            color: "#1a1a2e",
            margin: "0 0 16px",
            lineHeight: 1.15,
          }}
        >
          Find Your{" "}
          <span
            style={{
              background: "linear-gradient(90deg, #00BFA5, #7C3AED)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
            }}
          >
            Perfect Wall
          </span>
        </h2>
        <p
          style={{
            fontSize: "16px",
            color: "#6b7280",
            maxWidth: "520px",
            margin: "0 auto",
            lineHeight: 1.7,
          }}
        >
          Browse curated inspiration for every room, style, and mood — then bring
          it to life with Wonder Wallz.
        </p>
      </header>

      {/* Filter pills */}
      <div
        role="tablist"
        aria-label="Filter gallery by room or style"
        style={{
          display: "flex",
          flexWrap: "wrap",
          gap: "10px",
          justifyContent: "center",
          marginBottom: "48px",
        }}
      >
        {tags.map((tag) => (
          <motion.button
            key={tag}
            role="tab"
            aria-selected={activeTag === tag}
            onClick={() => setActiveTag(tag)}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.96 }}
            style={{
              padding: "8px 20px",
              borderRadius: "100px",
              border: "none",
              cursor: "pointer",
              fontSize: "13px",
              fontWeight: 600,
              letterSpacing: "0.3px",
              transition: "all 0.2s",
              background:
                activeTag === tag
                  ? "linear-gradient(135deg, #00BFA5, #7C3AED)"
                  : "#f3f4f6",
              color: activeTag === tag ? "#fff" : "#374151",
              boxShadow:
                activeTag === tag
                  ? "0 4px 14px rgba(124,58,237,0.3)"
                  : "none",
            }}
          >
            {tag}
          </motion.button>
        ))}
      </div>

      {/* Masonry Grid */}
      <div
        style={{
          columns: "4 260px",
          columnGap: "18px",
        }}
      >
        <AnimatePresence mode="popLayout">
          {filtered.map((img, i) => (
            <motion.article
              key={img.id}
              custom={i}
              variants={cardVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
              layout
              onMouseEnter={() => setHoveredId(img.id)}
              onMouseLeave={() => setHoveredId(null)}
              style={{
                breakInside: "avoid",
                marginBottom: "18px",
                borderRadius: "16px",
                overflow: "hidden",
                position: "relative",
                cursor: "pointer",
                display: "block",
                boxShadow:
                  hoveredId === img.id
                    ? "0 20px 48px rgba(0,0,0,0.18)"
                    : "0 2px 12px rgba(0,0,0,0.07)",
                transition: "box-shadow 0.3s ease",
              }}
              aria-label={img.alt}
            >
              {/* Image */}
              <motion.img
                src={img.src}
                alt={img.alt}
                loading="lazy"
                animate={{
                  scale: hoveredId === img.id ? 1.07 : 1,
                }}
                transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
                style={{
                  width: "100%",
                  height: heightMap[img.height],
                  objectFit: "cover",
                  display: "block",
                }}
              />

              {/* Hover overlay */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: hoveredId === img.id ? 1 : 0 }}
                transition={{ duration: 0.28 }}
                style={{
                  position: "absolute",
                  inset: 0,
                  background:
                    "linear-gradient(to top, rgba(124,58,237,0.82) 0%, rgba(0,191,165,0.3) 60%, transparent 100%)",
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "flex-end",
                  padding: "20px 18px",
                }}
              >
                <span
                  style={{
                    fontSize: "11px",
                    fontWeight: 700,
                    letterSpacing: "2px",
                    textTransform: "uppercase",
                    color: "rgba(255,255,255,0.7)",
                    marginBottom: "6px",
                  }}
                >
                  {img.tag}
                </span>
                <p
                  style={{
                    fontSize: "14px",
                    fontWeight: 600,
                    color: "#fff",
                    margin: 0,
                    lineHeight: 1.4,
                  }}
                >
                  {img.alt}
                </p>

                {/* Save button */}
                <motion.button
                  whileHover={{ scale: 1.06 }}
                  whileTap={{ scale: 0.94 }}
                  style={{
                    marginTop: "14px",
                    padding: "9px 20px",
                    borderRadius: "100px",
                    border: "none",
                    background: "linear-gradient(135deg, #F97316, #FBBF24)",
                    color: "#fff",
                    fontWeight: 700,
                    fontSize: "13px",
                    cursor: "pointer",
                    alignSelf: "flex-start",
                    boxShadow: "0 4px 12px rgba(249,115,22,0.4)",
                  }}
                  aria-label={`Get inspired by ${img.tag} wall design`}
                >
                  Get Inspired →
                </motion.button>
              </motion.div>

              {/* Tag badge (always visible) */}
              <div
                style={{
                  position: "absolute",
                  top: "12px",
                  left: "12px",
                  background: "rgba(255,255,255,0.92)",
                  backdropFilter: "blur(8px)",
                  borderRadius: "100px",
                  padding: "4px 12px",
                  fontSize: "11px",
                  fontWeight: 700,
                  color: "#7C3AED",
                  letterSpacing: "0.5px",
                  opacity: hoveredId === img.id ? 0 : 1,
                  transition: "opacity 0.2s",
                }}
              >
                {img.tag}
              </div>
            </motion.article>
          ))}
        </AnimatePresence>
      </div>

      {/* Bottom CTA */}
      <div style={{ textAlign: "center", marginTop: "64px" }}>
        <p style={{ color: "#9ca3af", fontSize: "14px", marginBottom: "20px" }}>
          Inspired by what you see?
        </p>
        <motion.button
          whileHover={{ scale: 1.04, boxShadow: "0 8px 32px rgba(124,58,237,0.35)" }}
          whileTap={{ scale: 0.97 }}
          style={{
            padding: "16px 42px",
            borderRadius: "100px",
            border: "none",
            background: "linear-gradient(135deg, #00BFA5 0%, #7C3AED 100%)",
            color: "#fff",
            fontWeight: 800,
            fontSize: "16px",
            cursor: "pointer",
            letterSpacing: "0.3px",
            boxShadow: "0 4px 20px rgba(124,58,237,0.25)",
          }}
          aria-label="Explore all Wonder Wallz wall art designs"
        >
          Explore All Designs
        </motion.button>
      </div>
    </section>
  );
}
