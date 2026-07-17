"use client";

import React, { useState } from "react";
import Image from "next/image";

/**
 * Wonder Wallz — AnimatedImage
 *
 * A thin wrapper around next/image that adds a consistent, brand-wide
 * "graceful load" treatment:
 *   - starts at opacity-0 scale-[1.02]
 *   - fades + settles to opacity-100 scale-100 on load
 *   - ~400ms ease-out transition
 *   - no layout shift (fill/aspect box is established up front)
 *   - respects prefers-reduced-motion (transition is skipped, image just appears)
 *   - keeps full Next.js image optimization (no raw <img>, srcset intact)
 *
 * Usage — drop-in replacement for next/image in most cases:
 *
 *   <AnimatedImage src={src} alt={alt} fill className="object-cover" />
 *
 *   // fixed-size:
 *   <AnimatedImage src={src} alt={alt} width={400} height={300} />
 *
 * Props: identical to next/image, plus:
 *   containerClassName — className applied to the wrapping div (for fill layouts)
 *   className           — className applied to the <Image> itself (e.g. object-cover)
 */
export function AnimatedImage({
  className = "",
  containerClassName = "",
  onLoad,
  fill,
  style,
  ...props
}) {
  const [loaded, setLoaded] = useState(false);

  const transitionClasses =
    "transition-[opacity,transform] duration-[400ms] ease-out motion-reduce:transition-none";

  const stateClasses = loaded
    ? "opacity-100 scale-100"
    : "opacity-0 scale-[1.02] motion-reduce:opacity-100 motion-reduce:scale-100";

  const image = (
    <Image
      className={[transitionClasses, stateClasses, className]
        .filter(Boolean)
        .join(" ")}
      style={{ ...style, willChange: loaded ? undefined : "opacity, transform" }}
      fill={fill}
      onLoad={(e) => {
        setLoaded(true);
        onLoad?.(e);
      }}
      {...props}
    />
  );

  // fill-mode images need a positioned, sized ancestor to avoid layout shift —
  // callers using `fill` are expected to size the containerClassName (e.g. aspect-video, h-full).
  if (fill) {
    return (
      <div className={["relative overflow-hidden", containerClassName].join(" ")}>
        {image}
      </div>
    );
  }

  // fixed width/height images already reserve their own box (no shift),
  // so no wrapper div is needed unless one is explicitly requested.
  return containerClassName ? (
    <div className={containerClassName}>{image}</div>
  ) : (
    image
  );
}

export default AnimatedImage;
