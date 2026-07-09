"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import type { Project } from "@/lib/projects";

interface ProjectCardProps {
  project: Project;
  priority?: boolean;
  index?: number;
}

export default function ProjectCard({ project, priority = false, index = 0 }: ProjectCardProps) {
  const { image, alt, size } = project;

  return (
    <motion.figure
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{
        duration: 0.55,
        delay: index * 0.09,
        ease: [0.22, 1, 0.36, 1],
      }}
      className={`group relative w-full overflow-hidden rounded-2xl ${
        size === "tall" ? "sm:row-span-2" : ""
      }`}
    >
      <Link
        href="/collections"
        aria-label={`Explore Collection — ${alt}`}
        className="relative block w-full h-full rounded-2xl focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2"
        style={{ ["--tw-ring-color" as string]: "#D48C43" }}
      >
        <div
          className="relative w-full h-full rounded-2xl overflow-hidden transition-shadow duration-350 ease-out"
          style={{
            aspectRatio: size === "tall" ? "4 / 5.4" : "4 / 3",
            boxShadow: "0 8px 30px rgba(139,110,80,0.10)",
          }}
        >
          <Image
            src={image}
            alt={alt}
            fill
            loading="lazy"
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
            className="object-cover transition-transform duration-500 ease-out group-hover:scale-[1.04]"
          />

          {/* Bronze border ring + lifted shadow, hover-only */}
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 rounded-2xl opacity-0 transition-opacity duration-350 ease-out group-hover:opacity-100 group-focus-within:opacity-100"
            style={{
              boxShadow:
                "inset 0 0 0 1.5px #D48C43, 0 16px 40px rgba(139,110,80,0.22)",
            }}
          />

          {/* Soft dark gradient from bottom, hover-only */}
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 ease-out group-hover:opacity-100 group-focus-within:opacity-100"
            style={{
              background:
                "linear-gradient(180deg, rgba(28,20,13,0) 45%, rgba(28,20,13,0.5) 100%)",
            }}
          />

          {/* Explore Collection label */}
          <div className="absolute bottom-5 left-5 sm:bottom-6 sm:left-6 translate-y-2 opacity-0 transition-all duration-300 ease-out group-hover:translate-y-0 group-hover:opacity-100 group-focus-within:translate-y-0 group-focus-within:opacity-100">
            <span
              className="text-xs sm:text-sm font-medium tracking-wide"
              style={{ color: "rgba(255,255,255,0.9)" }}
            >
              Explore Collection →
            </span>
          </div>

          {/* Circular arrow button, bottom-right */}
          <div
            className="absolute bottom-4 right-4 sm:bottom-5 sm:right-5 flex items-center justify-center w-9 h-9 sm:w-10 sm:h-10 rounded-full scale-90 opacity-0 transition-all duration-300 ease-out group-hover:scale-100 group-hover:opacity-100 group-focus-within:scale-100 group-focus-within:opacity-100"
            style={{
              background: "rgba(255,255,255,0.92)",
              boxShadow: "0 4px 14px rgba(0,0,0,0.18)",
            }}
          >
            <svg
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="#2C1F14"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <line x1="5" y1="12" x2="19" y2="12" />
              <polyline points="12 5 19 12 12 19" />
            </svg>
          </div>
        </div>
      </Link>
    </motion.figure>
  );
}
