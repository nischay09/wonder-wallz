import React, { forwardRef } from "react";

/**
 * Wonder Wallz — Input Component
 *
 * Brand focus ring: teal #00B5A3
 * Error state:      red  #EF4444
 *
 * Props:
 *   label   — string label rendered above
 *   hint    — helper text below
 *   error   — error message (overrides hint, red styling)
 *   prefix  — React node on the left inside the input
 *   suffix  — React node on the right inside the input
 *   size    — sm | md | lg
 */

const sizeMap = {
  sm: "h-8  text-sm  px-3",
  md: "h-10 text-sm  px-4",
  lg: "h-12 text-base px-4",
};

export const Input = forwardRef(function Input(
  { label, hint, error, prefix, suffix, size = "md", className = "", id, ...props },
  ref
) {
  const inputId =
    id || (label ? label.toLowerCase().replace(/\s+/g, "-") : undefined);
  const hasError = Boolean(error);

  const inputClass = [
    "w-full rounded-xl border bg-white font-normal text-[#1C1917]",
    "placeholder:text-[#A8A29E] transition-colors duration-150",
    "focus:outline-none focus:ring-2 focus:ring-offset-0",
    hasError
      ? "border-[#EF4444] focus:border-[#EF4444] focus:ring-[#EF4444]/25"
      : "border-[#E7E5E4] focus:border-[#00B5A3] focus:ring-[#00B5A3]/20",
    prefix ? "pl-10" : "",
    suffix ? "pr-10" : "",
    sizeMap[size],
    "disabled:opacity-50 disabled:cursor-not-allowed disabled:bg-[#FAFAF9]",
    className,
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <div className="flex flex-col gap-1.5 w-full">
      {label && (
        <label
          htmlFor={inputId}
          className="text-sm font-semibold text-[#1C1917] select-none"
        >
          {label}
        </label>
      )}

      <div className="relative flex items-center">
        {prefix && (
          <span className="absolute left-3 text-[#A8A29E] pointer-events-none flex items-center">
            {prefix}
          </span>
        )}
        <input ref={ref} id={inputId} className={inputClass} {...props} />
        {suffix && (
          <span className="absolute right-3 text-[#A8A29E] pointer-events-none flex items-center">
            {suffix}
          </span>
        )}
      </div>

      {(error || hint) && (
        <p
          className={`text-xs leading-snug ${
            hasError ? "text-[#EF4444]" : "text-[#78716C]"
          }`}
        >
          {error || hint}
        </p>
      )}
    </div>
  );
});

export default Input;
