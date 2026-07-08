"use client";

import { motion } from "framer-motion";
import ProjectCard from "./ProjectCard";
import { projects } from "@/lib/projects";

export default function CompletedProjects() {
  return (
    <section
      aria-labelledby="completed-projects-heading"
      className="relative w-full py-20 md:py-28 overflow-hidden"
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
        <div className="mb-12 md:mb-16 text-center">
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
            id="completed-projects-heading"
            initial={{ opacity: 0, y: 14 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.55, delay: 0.07 }}
            className="text-4xl md:text-5xl lg:text-6xl font-semibold mb-5 leading-tight"
            style={{
              color: "#2C1F14",
              fontFamily: "'Playfair Display', Georgia, serif",
              letterSpacing: "-0.02em",
            }}
          >
            Completed Projects
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

        {/* Editorial masonry gallery */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6 sm:auto-rows-[1fr]">
          {projects.map((project, i) => (
            <ProjectCard key={project.id} project={project} priority={i === 0} />
          ))}
        </div>
      </div>
    </section>
  );
}
