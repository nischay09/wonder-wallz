import React from "react";

/**
 * Wonder Wallz — Card Component
 *
 * Brand palette:
 *   Purple  #7B2FBE
 *   Teal    #00B5A3
 *   Orange  #F7941D
 *
 * Variants:  default | elevated | outlined | mural
 * Compound:  Card.Image | Card.Header | Card.Body | Card.Footer
 */

const cardBase =
  "rounded-3xl overflow-hidden transition-all duration-200 bg-white";

const cardVariants = {
  default: "shadow-sm border border-gray-100",
  elevated:
    "shadow-[0_6px_28px_rgba(123,47,190,0.10)] hover:shadow-[0_16px_48px_rgba(123,47,190,0.18)] hover:-translate-y-1",
  outlined:
    "border-2 border-[#7B2FBE]/25 hover:border-[#7B2FBE] hover:shadow-[0_4px_20px_rgba(123,47,190,0.12)]",
  mural:
    "border border-gray-100 shadow-md group cursor-pointer hover:shadow-[0_16px_40px_rgba(0,181,163,0.18)] hover:-translate-y-1.5",
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
    <div className={`${aspectRatio} w-full overflow-hidden bg-[#F3EDFB]`}>
      {src ? (
        <img
          src={src}
          alt={alt}
          className={`w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 ${className}`}
        />
      ) : (
        <div className="w-full h-full flex items-center justify-center">
          {/* Wallpaper/image placeholder icon in brand teal */}
          <svg
            className="w-14 h-14 text-[#00B5A3]/40"
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
      className={`px-5 py-3 text-[#44403C] text-sm leading-relaxed ${className}`}
    >
      {children}
    </div>
  );
}

function CardFooter({ children, className = "" }) {
  return (
    <div
      className={`px-5 py-4 border-t border-gray-100 flex items-center gap-3 ${className}`}
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
