"use client";

/**
 * src/components/ui/FadeImage.tsx
 *
 * Reusable wrapper around next/image that gives every customer-facing
 * image the same "premium" loading feel: a soft fade + subtle scale-in
 * (1.02 → 1) once the image has actually loaded, sitting on top of an
 * optional gradient placeholder so nothing ever pops in on a blank tile.
 *
 * - No layout shift: the wrapper div owns sizing (aspect-ratio / fixed
 *   dimensions passed via wrapperClassName+wrapperStyle), exactly like
 *   the ad-hoc "relative overflow-hidden" divs it replaces. `fill` mode
 *   on next/image is assumed, same as the existing call sites.
 * - Respects prefers-reduced-motion via Tailwind's motion-safe/
 *   motion-reduce variants — reduced-motion users get an instant swap,
 *   no transform/opacity animation.
 * - Only opacity + transform are animated (GPU-friendly, no layout
 *   properties touched), so this doesn't cost anything on Lighthouse.
 * - next/image's own optimization (sizes, quality, priority, loading,
 *   fill) is untouched — this only adds the transition chrome around it.
 */

import { useState, type CSSProperties } from "react";
import Image, { type ImageProps } from "next/image";

export interface FadeImageProps extends Omit<ImageProps, "onLoad"> {
  /** Optional gradient shown behind the image before/while it loads. */
  placeholderGradient?: [string, string];
  /** Classes for the sizing wrapper div (aspect-ratio, rounding, etc.). */
  wrapperClassName?: string;
  /** Inline styles for the sizing wrapper div (e.g. aspectRatio, maxHeight). */
  wrapperStyle?: CSSProperties;
  /** Subtle scale-in on load. Set false to fade only (no scale). Default true. */
  scaleIn?: boolean;
  onLoad?: ImageProps["onLoad"];
}

export function FadeImage({
  placeholderGradient,
  wrapperClassName = "",
  wrapperStyle,
  scaleIn = true,
  className = "",
  style,
  onLoad,
  ...imageProps
}: FadeImageProps) {
  const [loaded, setLoaded] = useState(false);

  // Avoid clashing with a positioning utility (e.g. "absolute inset-0")
  // passed in via wrapperClassName. Tailwind's cascade order means a
  // hardcoded `relative` here can silently win over a caller-supplied
  // `absolute`, collapsing the wrapper (and the fill image's parent) to
  // height: 0. Only default to `relative` if the caller hasn't already
  // declared a position class.
  const hasExplicitPosition = /\b(absolute|fixed|sticky|static|relative)\b/.test(
    wrapperClassName
  );
  const positionClass = hasExplicitPosition ? "" : "relative";

  return (
    <div className={`${positionClass} overflow-hidden ${wrapperClassName}`} style={wrapperStyle}>
      {placeholderGradient && (
        <div
          className="absolute inset-0"
          style={{
            background: `linear-gradient(135deg, ${placeholderGradient[0]} 0%, ${placeholderGradient[1]} 100%)`,
          }}
          aria-hidden="true"
        />
      )}

      <Image
        {...imageProps}
        onLoad={(e) => {
          setLoaded(true);
          onLoad?.(e);
        }}
        className={`motion-safe:transition-[opacity,transform] motion-safe:duration-500 motion-safe:ease-[cubic-bezier(0.22,1,0.36,1)] motion-reduce:transition-none ${className}`}
        style={{
          opacity: loaded ? 1 : 0,
          // Only pin the transform while unloaded (image is invisible anyway).
          // Once loaded we clear the inline transform entirely so any
          // className-driven transform (e.g. group-hover:scale-105) still works.
          transform: scaleIn && !loaded ? "scale(1.02)" : undefined,
          ...style,
        }}
      />
    </div>
  );
}
