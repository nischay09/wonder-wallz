"use client";

/**
 * src/components/ProjectCart/ProjectCartDrawer.tsx
 *
 * Premium slide-over Project Cart drawer for Wonder Wallz.
 * Reads exclusively from the projectCart Zustand store.
 * Delegates all price formatting to src/lib/pricing.ts.
 *
 * Out of scope: WhatsApp, Project Builder, backend, checkout.
 */

import { useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import {
  useProjectCart,
  selectItems,
  selectEstimatedTotal,
  selectCartWorkflow,
  type CartItem,
  type CartWorkflow,
} from "@/store/projectCart";
import { getDisplayPrice } from "@/lib/pricing";

// ---------------------------------------------------------------------------
// Props
// ---------------------------------------------------------------------------

interface ProjectCartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
}

// ---------------------------------------------------------------------------
// Animation variants
// ---------------------------------------------------------------------------

const backdropVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.3, ease: "easeOut" } },
  exit: { opacity: 0, transition: { duration: 0.25, ease: "easeIn" } },
};

const drawerVariants = {
  hidden: { x: "100%", opacity: 0.6 },
  visible: {
    x: 0,
    opacity: 1,
    transition: { type: "spring", stiffness: 300, damping: 35, mass: 0.9 },
  },
  exit: {
    x: "100%",
    opacity: 0.4,
    transition: { duration: 0.28, ease: [0.4, 0, 1, 1] },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 12 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.055, duration: 0.3, ease: "easeOut" },
  }),
  exit: { opacity: 0, x: 24, transition: { duration: 0.2 } },
};

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

const UNIT_LABELS: Record<string, string> = {
  ft: "ft",
  in: "in",
  cm: "cm",
};

function formatDimensions(item: CartItem): string {
  const u = UNIT_LABELS[item.unit] ?? item.unit;
  return `${item.width} × ${item.height} ${u}`;
}

function formatLineTotal(item: CartItem): string {
  if (item.estimatedPrice === undefined) return "Quote";
  const total = item.estimatedPrice * item.quantity;
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: total % 1 === 0 ? 0 : 2,
  }).format(total);
}

function formatTotal(total: number | null): string {
  if (total === null) return "—";
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: total % 1 === 0 ? 0 : 2,
  }).format(total);
}

// ---------------------------------------------------------------------------
// Sub-components
// ---------------------------------------------------------------------------

function RemoveIcon() {
  return (
    <svg
      width="14"
      height="14"
      viewBox="0 0 14 14"
      fill="none"
      aria-hidden="true"
    >
      <path
        d="M1 1l12 12M13 1L1 13"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
      />
    </svg>
  );
}

function CloseIcon() {
  return (
    <svg
      width="18"
      height="18"
      viewBox="0 0 18 18"
      fill="none"
      aria-hidden="true"
    >
      <path
        d="M1 1l16 16M17 1L1 17"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
      />
    </svg>
  );
}

function MinusIcon() {
  return (
    <svg width="12" height="2" viewBox="0 0 12 2" fill="none" aria-hidden="true">
      <path d="M1 1h10" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
    </svg>
  );
}

function PlusIcon() {
  return (
    <svg width="12" height="12" viewBox="0 0 12 12" fill="none" aria-hidden="true">
      <path
        d="M6 1v10M1 6h10"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
      />
    </svg>
  );
}

// ---------------------------------------------------------------------------
// CartItemRow
// ---------------------------------------------------------------------------

interface CartItemRowProps {
  item: CartItem;
  index: number;
}

function CartItemRow({ item, index }: CartItemRowProps) {
  const removeItem = useProjectCart((s) => s.removeItem);
  const updateQuantity = useProjectCart((s) => s.updateQuantity);

  const displayPrice = getDisplayPrice(item.product);
  const unitPriceLabel =
    item.estimatedPrice !== undefined
      ? new Intl.NumberFormat("en-IN", {
          style: "currency",
          currency: "INR",
          maximumFractionDigits: item.estimatedPrice % 1 === 0 ? 0 : 2,
        }).format(item.estimatedPrice)
      : displayPrice.label;

  return (
    <motion.article
      layout
      key={item.id}
      custom={index}
      variants={itemVariants}
      initial="hidden"
      animate="visible"
      exit="exit"
      className="group relative flex gap-4 rounded-[16px] bg-white/60 p-4 shadow-[0_1px_3px_rgba(139,110,72,0.08),0_4px_16px_rgba(139,110,72,0.06)] backdrop-blur-sm"
    >
      {/* Product image */}
      <div className="relative h-[88px] w-[88px] shrink-0 overflow-hidden rounded-[12px] bg-[#F3EDE4]">
        {item.product.image ? (
          <Image
            src={item.product.image}
            alt={item.product.title}
            fill
            sizes="88px"
            className="object-cover transition-transform duration-500 group-hover:scale-105"
          />
        ) : (
          // Placeholder gradient using the product's own palette
          <div
            className="h-full w-full"
            style={{
              background: `linear-gradient(135deg, ${item.product.placeholderGradient[0]}, ${item.product.placeholderGradient[1]})`,
            }}
            aria-hidden="true"
          />
        )}
      </div>

      {/* Details */}
      <div className="flex min-w-0 flex-1 flex-col justify-between">
        <div className="flex items-start justify-between gap-2">
          <div className="min-w-0">
            <p
              className="truncate font-['Playfair_Display'] text-[15px] font-semibold leading-snug text-[#2C2017]"
              title={item.product.title}
            >
              {item.product.title}
            </p>
            {item.material && (
              <p className="mt-0.5 truncate font-['DM_Sans'] text-[12px] text-[#8B6A48]">
                {item.material}
              </p>
            )}
            <p className="mt-0.5 font-['DM_Sans'] text-[12px] text-[#A08060]">
              {formatDimensions(item)}
            </p>
          </div>

          {/* Remove button */}
          <button
            onClick={() => removeItem(item.id)}
            aria-label={`Remove ${item.product.title} from cart`}
            className="shrink-0 rounded-full p-1.5 text-[#C4A882] transition-colors duration-150 hover:bg-[#F3EDE4] hover:text-[#8B6A48] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#C9A96E]/60"
          >
            <RemoveIcon />
          </button>
        </div>

        {/* Quantity + price row */}
        <div className="mt-3 flex items-center justify-between">
          {/* Quantity stepper */}
          <div className="flex items-center gap-1 rounded-full border border-[#E8DDD0] bg-white/80 px-1 py-1">
            <button
              onClick={() => updateQuantity(item.id, item.quantity - 1)}
              disabled={item.quantity <= 1}
              aria-label="Decrease quantity"
              className="flex h-6 w-6 items-center justify-center rounded-full text-[#8B6A48] transition-colors hover:bg-[#F3EDE4] disabled:opacity-30 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#C9A96E]/60"
            >
              <MinusIcon />
            </button>
            <span
              className="w-7 text-center font-['DM_Sans'] text-[13px] font-medium text-[#2C2017]"
              aria-label={`Quantity: ${item.quantity}`}
            >
              {item.quantity}
            </span>
            <button
              onClick={() => updateQuantity(item.id, item.quantity + 1)}
              aria-label="Increase quantity"
              className="flex h-6 w-6 items-center justify-center rounded-full text-[#8B6A48] transition-colors hover:bg-[#F3EDE4] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#C9A96E]/60"
            >
              <PlusIcon />
            </button>
          </div>

          {/* Price */}
          <div className="text-right">
            <p className="font-['DM_Sans'] text-[14px] font-semibold text-[#2C2017]">
              {formatLineTotal(item)}
            </p>
            {item.quantity > 1 && item.estimatedPrice !== undefined && (
              <p className="font-['DM_Sans'] text-[11px] text-[#A08060]">
                {unitPriceLabel} ea.
              </p>
            )}
            {item.estimatedPrice === undefined && (
              <p className="font-['DM_Sans'] text-[11px] text-[#C9A96E]">
                Pricing on request
              </p>
            )}
          </div>
        </div>
      </div>
    </motion.article>
  );
}

// ---------------------------------------------------------------------------
// Empty state
// ---------------------------------------------------------------------------

function EmptyState({ onClose }: { onClose: () => void }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0, transition: { duration: 0.4, ease: "easeOut" } }}
      className="flex flex-1 flex-col items-center justify-center px-8 py-16 text-center"
    >
      {/* Illustration placeholder */}
      <div
        className="mb-8 flex h-32 w-32 items-center justify-center rounded-full"
        style={{
          background: "linear-gradient(135deg, #F3EDE4 0%, #E8DDD0 100%)",
          boxShadow: "0 8px 32px rgba(201,169,110,0.18)",
        }}
        aria-hidden="true"
      >
        <svg
          width="52"
          height="52"
          viewBox="0 0 52 52"
          fill="none"
          aria-hidden="true"
        >
          {/* Shopping bag outline */}
          <rect
            x="9"
            y="18"
            width="34"
            height="28"
            rx="5"
            stroke="#C9A96E"
            strokeWidth="2"
          />
          <path
            d="M18 18v-4a8 8 0 1116 0v4"
            stroke="#C9A96E"
            strokeWidth="2"
            strokeLinecap="round"
          />
          {/* Inner sparkle */}
          <circle cx="26" cy="33" r="3" fill="#C9A96E" opacity="0.5" />
          <path
            d="M26 28v2M26 36v2M21 33h2M29 33h2"
            stroke="#C9A96E"
            strokeWidth="1.5"
            strokeLinecap="round"
            opacity="0.4"
          />
        </svg>
      </div>

      <h3 className="mb-2 font-['Playfair_Display'] text-[22px] font-semibold text-[#2C2017]">
        Your project is empty
      </h3>
      <p className="mb-8 max-w-[240px] font-['DM_Sans'] text-[14px] leading-relaxed text-[#8B6A48]">
        Browse our collections to start designing your space.
      </p>

      <Link
        href="/collections"
        onClick={onClose}
        className="inline-flex items-center gap-2 rounded-full bg-[#2C2017] px-6 py-3 font-['DM_Sans'] text-[14px] font-medium text-[#F3EDE4] shadow-[0_4px_16px_rgba(44,32,23,0.25)] transition-all duration-200 hover:bg-[#3D2E1A] hover:shadow-[0_6px_24px_rgba(44,32,23,0.3)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#C9A96E]/60 active:scale-[0.98]"
      >
        Browse Collections
      </Link>
    </motion.div>
  );
}

// ---------------------------------------------------------------------------
// Main Drawer
// ---------------------------------------------------------------------------

export function ProjectCartDrawer({ isOpen, onClose }: ProjectCartDrawerProps) {
  const items = useProjectCart(selectItems);
  const estimatedTotal = useProjectCart(selectEstimatedTotal);
  const workflow = useProjectCart(selectCartWorkflow);
  const clearCart = useProjectCart((s) => s.clearCart);

  // ── Task 5: Review Project ────────────────────────────────────────────────
  const handleReviewProject = useCallback(() => {
    switch (workflow as CartWorkflow) {
      case "standard":
        console.log("STANDARD FLOW");
        break;
      case "custom":
        console.log("CUSTOM FLOW");
        break;
      case "mixed":
        console.log("MIXED FLOW");
        break;
      default:
        break;
    }
  }, [workflow]);

  const isEmpty = items.length === 0;
  const hasMixedPricing = workflow === "mixed" || workflow === "custom";

  // ESC key handler
  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    },
    [onClose]
  );

  useEffect(() => {
    if (isOpen) {
      document.addEventListener("keydown", handleKeyDown);
      // Prevent body scroll while drawer is open
      document.body.style.overflow = "hidden";
    }
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "";
    };
  }, [isOpen, handleKeyDown]);

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* ----------------------------------------------------------------
              Backdrop
          ---------------------------------------------------------------- */}
          <motion.div
            key="backdrop"
            variants={backdropVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            onClick={onClose}
            aria-hidden="true"
            className="fixed inset-0 z-40 bg-[#1A1208]/50 backdrop-blur-[3px]"
          />

          {/* ----------------------------------------------------------------
              Drawer panel
          ---------------------------------------------------------------- */}
          <motion.div
            key="drawer"
            role="dialog"
            aria-modal="true"
            aria-label="Project Cart"
            variants={drawerVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            className={[
              // Positioning
              "fixed inset-y-0 right-0 z-50 flex flex-col",
              // Width: mobile full, tablet 420px, desktop 460px
              "w-full sm:w-[420px] lg:w-[460px]",
              // Background & radius
              "rounded-tl-[24px] rounded-bl-[24px]",
              "bg-[#FAF7F3]",
              // Shadow
              "shadow-[-8px_0_60px_rgba(44,32,23,0.14),-2px_0_12px_rgba(44,32,23,0.06)]",
              // Overflow
              "overflow-hidden",
            ].join(" ")}
          >
            {/* ============================================================
                HEADER
            ============================================================ */}
            <header className="relative shrink-0 border-b border-[#EDE4D8] px-6 py-5">
              {/* Subtle top accent line */}
              <div
                className="absolute inset-x-0 top-0 h-[2px] rounded-tl-[24px]"
                style={{
                  background:
                    "linear-gradient(90deg, #C9A96E 0%, #E8C98A 50%, #C9A96E 100%)",
                }}
                aria-hidden="true"
              />

              <div className="flex items-center justify-between">
                <div>
                  <h2 className="font-['Playfair_Display'] text-[22px] font-semibold leading-tight text-[#2C2017]">
                    Project Cart
                  </h2>
                  {!isEmpty && (
                    <p className="mt-0.5 font-['DM_Sans'] text-[13px] text-[#8B6A48]">
                      {items.length} {items.length === 1 ? "item" : "items"}
                    </p>
                  )}
                </div>

                <button
                  onClick={onClose}
                  aria-label="Close cart"
                  className="flex h-9 w-9 items-center justify-center rounded-full border border-[#EDE4D8] bg-white/80 text-[#8B6A48] shadow-sm transition-all duration-150 hover:border-[#C9A96E]/40 hover:bg-[#F3EDE4] hover:text-[#2C2017] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#C9A96E]/60"
                >
                  <CloseIcon />
                </button>
              </div>
            </header>

            {/* ============================================================
                BODY
            ============================================================ */}
            <div className="flex-1 overflow-y-auto overscroll-contain">
              {isEmpty ? (
                <EmptyState onClose={onClose} />
              ) : (
                <div className="space-y-3 px-4 py-4 sm:px-5">
                  <AnimatePresence mode="popLayout" initial={false}>
                    {items.map((item, index) => (
                      <CartItemRow key={item.id} item={item} index={index} />
                    ))}
                  </AnimatePresence>

                  {/* Clear all */}
                  <div className="flex justify-end pt-1">
                    <button
                      onClick={clearCart}
                      className="font-['DM_Sans'] text-[12px] text-[#A08060] underline underline-offset-2 transition-colors hover:text-[#8B6A48] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#C9A96E]/60"
                    >
                      Clear all
                    </button>
                  </div>
                </div>
              )}
            </div>

            {/* ============================================================
                SUMMARY + FOOTER  (only when cart has items)
            ============================================================ */}
            {!isEmpty && (
              <footer className="shrink-0 border-t border-[#EDE4D8] bg-[#FAF7F3] px-5 pb-6 pt-4 shadow-[0_-8px_32px_rgba(201,169,110,0.06)]">
                {/* Estimated Total */}
                <div className="mb-3 flex items-baseline justify-between">
                  <span className="font-['DM_Sans'] text-[14px] text-[#8B6A48]">
                    Estimated Total
                  </span>
                  <span className="font-['Playfair_Display'] text-[22px] font-semibold text-[#2C2017]">
                    {estimatedTotal !== null
                      ? formatTotal(estimatedTotal)
                      : "On Request"}
                  </span>
                </div>

                {/* Partial total note when mixed pricing */}
                {hasMixedPricing && estimatedTotal !== null && (
                  <p className="mb-2 font-['DM_Sans'] text-[11px] text-[#C9A96E]">
                    * Estimated subtotal for priceable items only. Custom
                    items will be quoted separately.
                  </p>
                )}

                {/* Disclaimer */}
                <p className="mb-5 font-['DM_Sans'] text-[12px] leading-relaxed text-[#A08060]">
                  Final pricing will be confirmed before production.
                </p>

                {/* Primary CTA — Task 5: Review Project */}
                <button
                  type="button"
                  onClick={handleReviewProject}
                  className="mb-3 w-full rounded-full bg-[#2C2017] py-3.5 font-['DM_Sans'] text-[15px] font-semibold text-[#FAF7F3] shadow-[0_4px_20px_rgba(44,32,23,0.28)] transition-all duration-200 hover:bg-[#3D2E1A] hover:shadow-[0_6px_28px_rgba(44,32,23,0.34)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#C9A96E]/60 active:scale-[0.98]"
                >
                  Review Project
                </button>

                {/* Secondary CTA */}
                <button
                  type="button"
                  onClick={onClose}
                  className="w-full rounded-full border border-[#DDD0C0] bg-transparent py-3.5 font-['DM_Sans'] text-[15px] font-medium text-[#8B6A48] transition-all duration-200 hover:border-[#C9A96E] hover:bg-[#F3EDE4] hover:text-[#2C2017] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#C9A96E]/60 active:scale-[0.98]"
                >
                  Continue Shopping
                </button>
              </footer>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}

export default ProjectCartDrawer;
