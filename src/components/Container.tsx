"use client";

import { motion, HTMLMotionProps } from "framer-motion";
import { cn } from "@/lib/utils";

type ContainerSize = "sm" | "md" | "lg" | "xl" | "full";
type ContainerPadding = "none" | "sm" | "md" | "lg" | "xl";

interface ContainerProps extends HTMLMotionProps<"div"> {
  /** Constrains max-width. Defaults to "xl" */
  size?: ContainerSize;
  /** Controls vertical padding. Defaults to "lg" */
  padding?: ContainerPadding;
  /** Whether to animate on mount with fade-up */
  animate?: boolean;
  /** Delay for animate (seconds) */
  animateDelay?: number;
  children: React.ReactNode;
  className?: string;
  as?: "div" | "section" | "article" | "aside";
}

const maxWidths: Record<ContainerSize, string> = {
  sm:   "max-w-2xl",
  md:   "max-w-4xl",
  lg:   "max-w-5xl",
  xl:   "max-w-7xl",
  full: "max-w-full",
};

const verticalPaddings: Record<ContainerPadding, string> = {
  none: "",
  sm:   "py-8 md:py-12",
  md:   "py-12 md:py-16",
  lg:   "py-16 md:py-24",
  xl:   "py-20 md:py-32",
};

const fadeUpVariants = {
  hidden:  { opacity: 0, y: 28 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: [0.4, 0, 0.2, 1] },
  },
};

/**
 * Container
 *
 * The foundational layout wrapper for Wonder Wallz pages.
 * Centers content, constrains max-width, applies consistent gutter padding,
 * and optionally wraps content in a Framer Motion fade-up reveal.
 *
 * @example
 * // Basic page section
 * <Container size="xl" padding="lg">
 *   <h2>Our Collections</h2>
 * </Container>
 *
 * @example
 * // Animated narrow editorial section
 * <Container size="md" padding="xl" animate animateDelay={0.2}>
 *   <p>Curated with care...</p>
 * </Container>
 */
export function Container({
  size = "xl",
  padding = "lg",
  animate: shouldAnimate = false,
  animateDelay = 0,
  children,
  className,
  as: Tag = "div",
  ...motionProps
}: ContainerProps) {
  const baseClasses = cn(
    "w-full mx-auto",
    "px-6 md:px-10 lg:px-16",
    maxWidths[size],
    verticalPaddings[padding],
    className,
  );

  const MotionTag = motion[Tag] as typeof motion.div;

  if (shouldAnimate) {
    return (
      <MotionTag
        className={baseClasses}
        variants={fadeUpVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-60px" }}
        transition={{ delay: animateDelay }}
        {...motionProps}
      >
        {children}
      </MotionTag>
    );
  }

  return (
    <MotionTag className={baseClasses} {...motionProps}>
      {children}
    </MotionTag>
  );
}
