"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import FocusCards from "./FocusCards";
import { projects } from "@/lib/projects";

export default function CompletedProjects() {
  const featuredProjects = projects.slice(0, 5);

  return (
    <section
      aria-labelledby="our-work-heading"
      className="relative w-full py-10 md:py-14 overflow-hidden"
      style={{ background: "#FAF7F2" }}
    >
      {/* Subtle background texture blob — retained from prior section */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -top-32 -right-32 w-[520px] h-[520px] rounded-full opacity-30"
        style={{
          background:
            "radial-gradient(circle at 60% 40%, #E8D5BE 0%, transparent 70%)",
          filter: "blur(60px)",
        }}
      />

      <div className="relative z-10 mx-auto max-w-7xl px-5 sm:px-8 lg:px-12">
        {/* Section header */}
        <div className="mb-7 md:mb-8 text-center">
          <motion.p
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-xs font-semibold tracking-[0.22em] uppercase mb-3"
            style={{ color: "#B5926A" }}
          >
            Our Work
          </motion.p>
          <motion.h2
            id="our-work-heading"
            initial={{ opacity: 0, y: 14 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.55, delay: 0.07 }}
            className="text-4xl md:text-5xl lg:text-6xl font-semibold mb-4 leading-tight"
            style={{
              color: "#2C1F14",
              fontFamily: "'Playfair Display', Georgia, serif",
              letterSpacing: "-0.02em",
            }}
          >
            Our Work
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.14 }}
            className="text-base md:text-lg max-w-xl mx-auto leading-relaxed"
            style={{ color: "#7A6855" }}
          >
            A glimpse into beautifully transformed homes and commercial
            spaces using Wonder Wallz interior solutions.
          </motion.p>
        </div>

        {/* Focus Cards gallery — compact, premium, no permanent labels */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        >
          <FocusCards projects={featuredProjects} />
        </motion.div>

        {/* Bottom CTA */}
        <div className="mt-8 md:mt-10 text-center">
          <Link
            href="/collections"
            className="inline-flex items-center gap-2 text-sm sm:text-base font-semibold tracking-wide transition-colors duration-200 hover:opacity-80"
            style={{ color: "#B5926A" }}
          >
            Explore Collections →
          </Link>
        </div>
      </div>
    </section>
  );
}
