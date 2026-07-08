"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import type { Project } from "@/lib/projects";

interface ProjectCardProps {
  project: Project;
  priority?: boolean;
}

export default function ProjectCard({ project, priority = false }: ProjectCardProps) {
  const { image, alt, roomType, collection, productCategory, size } = project;

  return (
    <motion.figure
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
      className={`group relative w-full overflow-hidden ${
        size === "tall" ? "sm:row-span-2" : ""
      }`}
      style={{
        borderRadius: "24px",
        boxShadow: "0 8px 30px rgba(139,110,80,0.10)",
      }}
    >
      <div
        className="relative w-full h-full"
        style={{ aspectRatio: size === "tall" ? "4 / 5.4" : "4 / 3" }}
      >
        <Image
          src={image}
          alt={alt}
          fill
          loading="lazy"
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          className="object-cover transition-transform duration-500 ease-out group-hover:scale-[1.04]"
        />

        {/* Quiet scrim — always faintly visible, strengthens on hover/focus */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-x-0 bottom-0 h-2/5 transition-opacity duration-300"
          style={{
            background:
              "linear-gradient(0deg, rgba(28,20,13,0.72) 0%, rgba(28,20,13,0.28) 55%, rgba(28,20,13,0) 100%)",
          }}
        />

        {/* Info reveal */}
        <figcaption
          className="absolute inset-x-0 bottom-0 p-5 sm:p-6 translate-y-2 opacity-90 transition-all duration-300 ease-out group-hover:translate-y-0 group-hover:opacity-100 group-focus-within:translate-y-0 group-focus-within:opacity-100"
        >
          <span
            className="block text-[11px] font-medium tracking-[0.16em] uppercase mb-1"
            style={{ color: "#E8D5BE" }}
          >
            {roomType}
          </span>
          <span
            className="block text-base sm:text-lg font-semibold leading-snug"
            style={{
              color: "#fff",
              fontFamily: "'Playfair Display', Georgia, serif",
            }}
          >
            {collection}
          </span>
          <span
            className="block text-xs sm:text-sm mt-0.5"
            style={{ color: "rgba(255,255,255,0.78)" }}
          >
            {productCategory}
          </span>
        </figcaption>
      </div>
    </motion.figure>
  );
}
