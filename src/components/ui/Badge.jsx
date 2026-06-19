import React from "react";

/**
 * Wonder Wallz — Badge Component
 *
 * Brand palette:
 *   Purple  #7B2FBE
 *   Teal    #00B5A3
 *   Orange  #F7941D
 *
 * Variants: purple | teal | orange | green | red | gray | outline
 * Sizes:    sm | md
 * dot:      boolean — prepends an animated status dot
 */

const base =
  "inline-flex items-center gap-1.5 font-semibold rounded-full leading-none";

const variants = {
  purple:  "bg-[#7B2FBE]/12 text-[#7B2FBE]",
  teal:    "bg-[#00B5A3]/15 text-[#007A70]",
  orange:  "bg-[#F7941D]/15 text-[#B85E00]",
  green:   "bg-[#D1FAE5] text-[#065F46]",
  red:     "bg-[#FEE2E2] text-[#991B1B]",
  gray:    "bg-[#F5F5F4] text-[#57534E]",
  outline: "border-2 border-[#7B2FBE]/40 text-[#7B2FBE] bg-transparent",
};

const sizes = {
  sm: "px-2 py-0.5 text-[10px] tracking-wider uppercase",
  md: "px-3 py-1 text-[11px] tracking-wider uppercase",
};

const dotColors = {
  purple:  "bg-[#7B2FBE]",
  teal:    "bg-[#00B5A3]",
  orange:  "bg-[#F7941D]",
  green:   "bg-[#059669]",
  red:     "bg-[#DC2626]",
  gray:    "bg-[#78716C]",
  outline: "bg-[#7B2FBE]",
};

export function Badge({
  variant = "purple",
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
