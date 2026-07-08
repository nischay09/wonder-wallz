import React from "react";

/**
 * Wonder Wallz — Card Component
 *
 * Uses design tokens from globals.css / tailwind.config.ts — no hardcoded hex.
 *
 * Variants:  default | elevated | outlined | mural
 * Compound:  Card.Image | Card.Header | Card.Body | Card.Footer
 */

const cardBase =
  "rounded-3xl overflow-hidden transition-all duration-200 bg-surface";

const cardVariants = {
  default: "shadow-card border border-border",
  elevated:
    "shadow-card hover:shadow-elevated hover:-translate-y-1",
  outlined:
    "border-2 border-border-brand hover:border-primary hover:shadow-card-hover",
  mural:
    "border border-border shadow-card-hover group cursor-pointer hover:shadow-elevated hover:-translate-y-1.5",
};

function Card({ variant = "default", className = "", children, ...props }) {
  return (
    <div
      className={[cardBase, cardVariants[variant], className].join(" ")}
      {...props}
    >
      {children}
    </div>
  );
}

function CardImage({
  src,
  alt = "",
  aspectRatio = "aspect-video",
  className = "",
}) {
  return (
    <div className={`${aspectRatio} w-full overflow-hidden bg-subtle`}>
      {src ? (
        <img
          src={src}
          alt={alt}
          className={`w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 ${className}`}
        />
      ) : (
        <div className="w-full h-full flex items-center justify-center">
          {/* Wallpaper/image placeholder icon in brand accent */}
          <svg
            className="w-14 h-14 text-accent"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={1.5}
              d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
            />
          </svg>
        </div>
      )}
    </div>
  );
}

function CardHeader({ children, className = "" }) {
  return (
    <div className={`px-5 pt-5 pb-2 ${className}`}>{children}</div>
  );
}

function CardBody({ children, className = "" }) {
  return (
    <div
      className={`px-5 py-3 text-text-secondary text-sm leading-relaxed ${className}`}
    >
      {children}
    </div>
  );
}

function CardFooter({ children, className = "" }) {
  return (
    <div
      className={`px-5 py-4 border-t border-border flex items-center gap-3 ${className}`}
    >
      {children}
    </div>
  );
}

Card.Image = CardImage;
Card.Header = CardHeader;
Card.Body = CardBody;
Card.Footer = CardFooter;

export { Card };
export default Card;
