import React from "react";

/**
 * Wonder Wallz — Button Component
 *
 * Brand palette:
 *   Purple  #7B2FBE  (logo purple / primary CTA)
 *   Teal    #00B5A3  (logo teal / secondary)
 *   Orange  #F7941D  (logo orange / accent)
 *
 * Variants: primary | teal | orange | ghost | danger
 * Sizes:    sm | md | lg
 */

const base =
  "inline-flex items-center justify-center gap-2 font-bold tracking-wide rounded-2xl transition-all duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none select-none cursor-pointer";

const variants = {
  primary:
    "bg-[#7B2FBE] text-white hover:bg-[#6A28A8] active:scale-[0.97] focus-visible:ring-[#7B2FBE] shadow-md hover:shadow-[0_8px_24px_rgba(123,47,190,0.35)]",
  teal:
    "bg-[#00B5A3] text-white hover:bg-[#009E8E] active:scale-[0.97] focus-visible:ring-[#00B5A3] shadow-md hover:shadow-[0_8px_24px_rgba(0,181,163,0.35)]",
  orange:
    "bg-[#F7941D] text-white hover:bg-[#E07F0A] active:scale-[0.97] focus-visible:ring-[#F7941D] shadow-md hover:shadow-[0_8px_24px_rgba(247,148,29,0.35)]",
  ghost:
    "bg-transparent text-[#7B2FBE] border-2 border-[#7B2FBE] hover:bg-[#7B2FBE]/10 active:scale-[0.97] focus-visible:ring-[#7B2FBE]",
  danger:
    "bg-[#EF4444] text-white hover:bg-[#DC2626] active:scale-[0.97] focus-visible:ring-[#EF4444] shadow-md",
};

const sizes = {
  sm: "px-3 py-1.5 text-xs rounded-xl",
  md: "px-5 py-2.5 text-sm",
  lg: "px-7 py-3.5 text-base",
};

export function Button({
  variant = "primary",
  size = "md",
  children,
  className = "",
  loading = false,
  icon,
  ...props
}) {
  return (
    <button
      className={[base, variants[variant], sizes[size], className].join(" ")}
      disabled={loading || props.disabled}
      {...props}
    >
      {loading ? (
        <svg
          className="animate-spin h-4 w-4 shrink-0"
          fill="none"
          viewBox="0 0 24 24"
        >
          <circle
            className="opacity-25"
            cx="12"
            cy="12"
            r="10"
            stroke="currentColor"
            strokeWidth="4"
          />
          <path
            className="opacity-75"
            fill="currentColor"
            d="M4 12a8 8 0 018-8v8z"
          />
        </svg>
      ) : icon ? (
        <span className="shrink-0">{icon}</span>
      ) : null}
      {children}
    </button>
  );
}

export default Button;
