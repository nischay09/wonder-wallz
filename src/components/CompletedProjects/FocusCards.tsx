"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import type { Project } from "@/lib/projects";

interface FocusCardProps {
  project: Project;
  index: number;
  hovered: number | null;
  setHovered: (index: number | null) => void;
  priority?: boolean;
}

function FocusCard({ project, index, hovered, setHovered, priority = false }: FocusCardProps) {
  const { image, alt, href, productCategory, projectLabel } = project;
  const isFocused = hovered === index;
  const isDimmed = hovered !== null && hovered !== index;

  return (
    <Link
      href={href}
      aria-label={`Explore ${productCategory}`}
      onMouseEnter={() => setHovered(index)}
      onMouseLeave={() => setHovered(null)}
      onFocus={() => setHovered(index)}
      onBlur={() => setHovered(null)}
      className="group relative block h-full w-full overflow-hidden rounded-2xl focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2"
      style={{
        ["--tw-ring-color" as string]: "#D48C43",
        boxShadow: isFocused
          ? "0 20px 45px rgba(139,110,80,0.28), inset 0 0 0 1.5px #D48C43"
          : "0 6px 20px rgba(139,110,80,0.10)",
        transition: "box-shadow 0.4s cubic-bezier(0.22,1,0.36,1)",
      }}
    >
      <Image
        src={image}
        alt={alt}
        fill
        priority={priority}
        loading={priority ? undefined : "lazy"}
        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
        className="object-cover"
        style={{
          filter: isDimmed ? "brightness(0.82) blur(1.5px)" : "brightness(1) blur(0px)",
          transform: isFocused ? "scale(1.035)" : "scale(1)",
          transition:
            "filter 0.45s cubic-bezier(0.22,1,0.36,1), transform 0.45s cubic-bezier(0.22,1,0.36,1)",
        }}
      />

      {/* Bottom gradient — always present at low opacity so the overlay text
          stays legible, deepens further on focus for contrast. */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "linear-gradient(180deg, rgba(28,20,13,0) 50%, rgba(28,20,13,0.72) 100%)",
          opacity: isFocused ? 1 : 0.82,
          transition: "opacity 0.35s ease-out",
        }}
      />

      {/* Persistent card overlay — category, project label, Explore CTA */}
      <div
        className="absolute bottom-0 left-0 right-0 px-4 pb-4 pt-8 sm:px-5 sm:pb-5"
        style={{
          transform: isFocused ? "translateY(-2px)" : "translateY(0)",
          transition: "transform 0.35s cubic-bezier(0.22,1,0.36,1)",
        }}
      >
        <span
          className="block text-xs font-medium tracking-[0.14em] uppercase mb-1"
          style={{ color: "rgba(255,255,255,0.75)" }}
        >
          {projectLabel}
        </span>
        <span
          className="block text-sm sm:text-base font-semibold mb-2"
          style={{
            color: "rgba(255,255,255,0.98)",
            fontFamily: "'Playfair Display', Georgia, serif",
          }}
        >
          {productCategory}
        </span>
        <span
          className="inline-flex items-center gap-1 text-xs sm:text-sm font-medium tracking-wide"
          style={{
            color: "#F0C892",
            opacity: isFocused ? 1 : 0.85,
            transition: "opacity 0.3s ease-out",
          }}
        >
          Explore
          <span
            style={{
              display: "inline-block",
              transform: isFocused ? "translateX(3px)" : "translateX(0)",
              transition: "transform 0.3s ease-out",
            }}
          >
            →
          </span>
        </span>
      </div>
    </Link>
  );
}

export default function FocusCards({ projects }: { projects: Project[] }) {
  const [hovered, setHovered] = useState<number | null>(null);

  return (
    <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 h-[440px] sm:h-[480px] md:h-[520px]">
      {projects.map((project, i) => (
        <FocusCard
          key={project.id}
          project={project}
          index={i}
          hovered={hovered}
          setHovered={setHovered}
          priority={i === 0}
        />
      ))}
    </div>
  );
}
