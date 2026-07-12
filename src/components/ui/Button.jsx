import React from "react";

/**
 * Wonder Wallz — Button Component
 *
 * Uses design tokens from globals.css / tailwind.config.ts — no hardcoded hex.
 * Brand triad (purple/teal/orange) maps onto the available semantic tokens:
 *   primary → brand primary (was purple)
 *   accent  → brand accent  (was teal / orange)
 *
 * Variants: primary | accent | ghost | danger
 * Sizes:    sm | md | lg
 */

const base =
  "inline-flex items-center justify-center gap-2 font-bold tracking-wide rounded-2xl transition-all duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none select-none cursor-pointer";

const variants = {
  primary:
    "bg-primary text-text-inverse hover:bg-primary-hover active:bg-primary-active active:scale-[0.97] focus-visible:ring-primary shadow-card hover:shadow-card-hover",
  accent:
    "bg-accent text-text-inverse hover:bg-accent-hover active:bg-accent-active active:scale-[0.97] focus-visible:ring-accent shadow-card hover:shadow-card-hover",
  ghost:
    "bg-transparent text-primary border-2 border-primary hover:bg-subtle active:scale-[0.97] focus-visible:ring-primary",
  danger:
    "bg-error text-text-inverse hover:opacity-90 active:scale-[0.97] focus-visible:ring-error shadow-card",
};

const sizes = {
  sm: "px-3 py-1.5 text-xs rounded-xl",
  md: "px-5 py-2.5 text-sm",
  lg: "px-7 py-3.5 text-base",
};

export const Button = React.forwardRef(function Button(
  {
    variant = "primary",
    size = "md",
    children,
    className = "",
    loading = false,
    icon,
    ...props
  },
  ref
) {
  return (
    <button
      ref={ref}
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
});

export default Button;
