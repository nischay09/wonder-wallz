import React, { forwardRef } from "react";

/**
 * Wonder Wallz — Select Component
 *
 * Uses design tokens from globals.css / tailwind.config.ts — no hardcoded hex.
 * Brand focus ring: accent token
 * Error state:      error token
 *
 * Props:
 *   label       — string label rendered above
 *   hint        — helper text below
 *   error       — error message (overrides hint, red styling)
 *   placeholder — first disabled option (e.g. "Choose a style...")
 *   options     — array of { value, label } objects
 *                 OR array of { group, options: [{value, label}] } for optgroups
 *   size        — sm | md | lg
 */

const sizeMap = {
  sm: "h-8  text-sm  pl-3  pr-9",
  md: "h-10 text-sm  pl-4  pr-10",
  lg: "h-12 text-base pl-4 pr-10",
};

function isGrouped(options) {
  return options.length > 0 && options[0].group !== undefined;
}

export const Select = forwardRef(function Select(
  {
    label,
    hint,
    error,
    placeholder,
    options = [],
    size = "md",
    className = "",
    id,
    ...props
  },
  ref
) {
  const inputId =
    id || (label ? label.toLowerCase().replace(/\s+/g, "-") : undefined);
  const hasError = Boolean(error);
  const grouped = isGrouped(options);

  const selectClass = [
    "w-full rounded-xl border bg-surface font-normal text-text-primary appearance-none cursor-pointer",
    "transition-colors duration-150",
    "focus:outline-none focus:ring-2 focus:ring-offset-0",
    hasError
      ? "border-error focus:border-error focus:ring-error"
      : "border-border focus:border-accent focus:ring-accent",
    sizeMap[size],
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

      <div className="relative flex items-center">
        <select ref={ref} id={inputId} className={selectClass} {...props}>
          {placeholder && (
            <option value="" disabled>
              {placeholder}
            </option>
          )}

          {grouped
            ? options.map((group) => (
                <optgroup key={group.group} label={group.group}>
                  {group.options.map((opt) => (
                    <option key={opt.value} value={opt.value}>
                      {opt.label}
                    </option>
                  ))}
                </optgroup>
              ))
            : options.map((opt) => (
                <option key={opt.value} value={opt.value}>
                  {opt.label}
                </option>
              ))}
        </select>

        {/* Custom chevron — accent to match brand */}
        <span className="pointer-events-none absolute right-3 flex items-center">
          <svg
            className="w-4 h-4 text-accent"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2.5}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M19 9l-7 7-7-7"
            />
          </svg>
        </span>
      </div>

      {(error || hint) && (
        <p
          className={`text-xs leading-snug ${
            hasError ? "text-error" : "text-text-secondary"
          }`}
        >
          {error || hint}
        </p>
      )}
    </div>
  );
});

export default Select;
