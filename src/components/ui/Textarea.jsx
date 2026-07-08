import React, { forwardRef } from "react";

/**
 * Wonder Wallz — Textarea Component
 *
 * Uses design tokens from globals.css / tailwind.config.ts — no hardcoded hex.
 * Brand focus ring: accent token
 * Error state:      error token
 *
 * Props:
 *   label     — string label rendered above
 *   hint      — helper text below
 *   error     — error message (overrides hint, red styling)
 *   rows      — number of visible rows (default 4)
 *   maxLength — shows character counter when provided
 *   resize    — "none" | "y" | "both" (default "y")
 */

const resizeMap = {
  none: "resize-none",
  y:    "resize-y",
  both: "resize",
};

export const Textarea = forwardRef(function Textarea(
  {
    label,
    hint,
    error,
    rows = 4,
    maxLength,
    resize = "y",
    className = "",
    id,
    value,
    onChange,
    ...props
  },
  ref
) {
  const inputId =
    id || (label ? label.toLowerCase().replace(/\s+/g, "-") : undefined);
  const hasError = Boolean(error);
  const charCount = typeof value === "string" ? value.length : 0;

  const textareaClass = [
    "w-full rounded-xl border bg-surface font-normal text-sm text-text-primary",
    "placeholder:text-text-tertiary leading-relaxed px-4 py-3",
    "transition-colors duration-150",
    "focus:outline-none focus:ring-2 focus:ring-offset-0",
    hasError
      ? "border-error focus:border-error focus:ring-error"
      : "border-border focus:border-accent focus:ring-accent",
    resizeMap[resize],
    "disabled:opacity-50 disabled:cursor-not-allowed disabled:bg-subtle",
    className,
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <div className="flex flex-col gap-1.5 w-full">
      {label && (
        <label
          htmlFor={inputId}
          className="text-sm font-semibold text-text-primary select-none"
        >
          {label}
        </label>
      )}

      <textarea
        ref={ref}
        id={inputId}
        rows={rows}
        maxLength={maxLength}
        value={value}
        onChange={onChange}
        className={textareaClass}
        {...props}
      />

      {/* Footer row: hint/error left, char counter right */}
      {(error || hint || maxLength) && (
        <div className="flex items-start justify-between gap-2">
          <p
            className={`text-xs leading-snug ${
              hasError ? "text-error" : "text-text-secondary"
            }`}
          >
            {error || hint || ""}
          </p>
          {maxLength && (
            <p
              className={`text-xs shrink-0 tabular-nums ${
                charCount >= maxLength
                  ? "text-error"
                  : charCount >= maxLength * 0.85
                  ? "text-accent"
                  : "text-text-tertiary"
              }`}
            >
              {charCount}/{maxLength}
            </p>
          )}
        </div>
      )}
    </div>
  );
});

export default Textarea;
