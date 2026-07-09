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
  const { image, alt } = project;
  const isFocused = hovered === index;
  const isDimmed = hovered !== null && hovered !== index;

  return (
    <Link
      href="/collections"
      aria-label="Explore Collections"
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

      {/* Warm gradient wash, only on focus */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "linear-gradient(180deg, rgba(28,20,13,0) 55%, rgba(28,20,13,0.45) 100%)",
          opacity: isFocused ? 1 : 0,
          transition: "opacity 0.35s ease-out",
        }}
      />

      {/* Subtle CTA, only on focus */}
      <div
        className="absolute bottom-4 left-4 sm:bottom-5 sm:left-5 flex items-center gap-1.5"
        style={{
          opacity: isFocused ? 1 : 0,
          transform: isFocused ? "translateY(0)" : "translateY(6px)",
          transition: "opacity 0.3s ease-out, transform 0.3s ease-out",
        }}
      >
        <span
          className="text-xs sm:text-sm font-medium tracking-wide"
          style={{ color: "rgba(255,255,255,0.95)" }}
        >
          Explore Collections ↗
        </span>
      </div>
    </Link>
  );
}

export default function FocusCards({ projects }: { projects: Project[] }) {
  const [hovered, setHovered] = useState<number | null>(null);

  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3 sm:gap-4 h-[420px] sm:h-[440px] md:h-[460px]">
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
