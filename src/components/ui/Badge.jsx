import React from "react";

/**
 * Wonder Wallz — Badge Component
 *
 * Uses design tokens from globals.css / tailwind.config.ts — no hardcoded hex.
 * Brand triad (purple/teal/orange) maps onto the available semantic tokens:
 *   primary  → brand primary (was purple)
 *   accent   → brand accent  (was teal / orange)
 *
 * Variants: primary | accent | success | error | neutral | outline
 * Sizes:    sm | md
 * dot:      boolean — prepends an animated status dot
 */

const base =
  "inline-flex items-center gap-1.5 font-semibold rounded-pill leading-none";

const variants = {
  primary:  "bg-subtle text-primary",
  accent:   "bg-subtle text-accent",
  success:  "bg-subtle text-success",
  error:    "bg-subtle text-error",
  neutral:  "bg-neutral-100 text-text-secondary",
  outline:  "border-2 border-primary text-primary bg-transparent",
};

const sizes = {
  sm: "px-2 py-0.5 text-2xs tracking-wider uppercase",
  md: "px-3 py-1 text-xs tracking-wider uppercase",
};

const dotColors = {
  primary: "bg-primary",
  accent:  "bg-accent",
  success: "bg-success",
  error:   "bg-error",
  neutral: "bg-text-secondary",
  outline: "bg-primary",
};

export function Badge({
  variant = "primary",
  size = "md",
  dot = false,
  pulse = false,
  children,
  className = "",
  ...props
}) {
  return (
    <span
      className={[base, variants[variant], sizes[size], className].join(" ")}
      {...props}
    >
      {dot && (
        <span className="relative inline-flex items-center justify-center shrink-0 w-2 h-2">
          {pulse && (
            <span
              className={`absolute inline-flex h-full w-full rounded-full opacity-75 animate-ping ${dotColors[variant]}`}
            />
          )}
          <span
            className={`relative inline-flex rounded-full w-1.5 h-1.5 ${dotColors[variant]}`}
          />
        </span>
      )}
      {children}
    </span>
  );
}

export default Badge;
