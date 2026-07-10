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

import { Fragment, useEffect, useCallback, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import {
  useProjectCart,
  selectItems,
  selectEstimatedTotal,
  selectCartWorkflow,
  type CartItem,
} from "@/store/projectCart";
import { getDisplayPrice } from "@/lib/pricing";
import { CustomerInfoModal } from "./CustomerInfoModal";
import { sendCartOrder } from "@/lib/orderEmailService";
import type { CustomerDetails } from "@/lib/types";

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
// WhatsApp continuation
// ---------------------------------------------------------------------------

/**
 * Wonder Wallz business WhatsApp number in E.164 format (no leading "+",
 * no spaces/dashes) — the format wa.me expects.
 *
 * TODO: replace with the real business number before shipping.
 */
const WONDER_WALLZ_WHATSAPP_NUMBER = "919883100377";

/** Minimal snapshot of a cart line-item, captured at submit-time — just
 *  enough to build the WhatsApp message after the cart itself is cleared. */
interface SubmittedLineItem {
  collection: string;
  design: string;
}

interface SubmittedOrder {
  customerName?: string;
  lineItems: SubmittedLineItem[];
}

function buildWhatsAppMessage(order: SubmittedOrder): string {
  const greeting = order.customerName
    ? `Hi, this is ${order.customerName}.`
    : "Hi,";

  const lines = order.lineItems.map((item) => `• ${item.collection} (${item.design})`);

  const itemsBlock =
    lines.length > 0
      ? `Here are the design(s) I submitted:\n${lines.join("\n")}`
      : "I just submitted a project request.";

  return [
    greeting,
    "I just submitted a project request on the Wonder Wallz website.",
    itemsBlock,
    "Could we discuss installation, pricing, transport, or customization?",
  ].join("\n\n");
}

function buildWhatsAppUrl(order: SubmittedOrder): string {
  const text = encodeURIComponent(buildWhatsAppMessage(order));
  return `https://wa.me/${WONDER_WALLZ_WHATSAPP_NUMBER}?text=${text}`;
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

function CheckCircleIcon() {
  return (
    <svg width="34" height="34" viewBox="0 0 34 34" fill="none" aria-hidden="true">
      <circle cx="17" cy="17" r="16" stroke="#3E8E5A" strokeWidth="2" fill="#E9F5EC" />
      <path
        d="M10.5 17.5l4 4 9-9.5"
        stroke="#3E8E5A"
        strokeWidth="2.4"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function WhatsAppIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path
        d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.876 1.213 3.074.149.198 2.096 3.2 5.077 4.487.71.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z"
        fill="currentColor"
      />
      <path
        d="M12.02 2.5c-5.245 0-9.5 4.255-9.5 9.5 0 1.676.44 3.25 1.21 4.614L2.5 21.5l4.99-1.208a9.46 9.46 0 004.53 1.153h.004c5.245 0 9.5-4.255 9.5-9.5s-4.255-9.445-9.504-9.445z"
        stroke="currentColor"
        strokeWidth="1.4"
        fill="none"
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
      {/* Product image — prefer the design-specific image captured at
          add-time (same image shown on the Collection Card / Quick View)
          over the generic product-line cover image. Only fall back to the
          gradient placeholder when neither is available. */}
      <div className="relative h-[88px] w-[88px] shrink-0 overflow-hidden rounded-[12px] bg-[#F3EDE4]">
        {(item.designImage ?? item.product.coverImage) ? (
          <Image
            src={item.designImage ?? item.product.coverImage!}
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
// Success state (shown after the order email has been sent)
// ---------------------------------------------------------------------------

interface SuccessStateProps {
  order: SubmittedOrder;
  onContinueBrowsing: () => void;
}

function SuccessState({ order, onContinueBrowsing }: SuccessStateProps) {
  const whatsappUrl = buildWhatsAppUrl(order);

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0, transition: { duration: 0.4, ease: "easeOut" } }}
      className="flex flex-1 flex-col items-center justify-center px-8 py-16 text-center"
    >
      <div
        className="mb-6 flex h-20 w-20 items-center justify-center rounded-full"
        style={{
          background: "linear-gradient(135deg, #E9F5EC 0%, #D8ECDE 100%)",
          boxShadow: "0 8px 32px rgba(62,142,90,0.18)",
        }}
      >
        <CheckCircleIcon />
      </div>

      <h3 className="mb-2 font-['Playfair_Display'] text-[22px] font-semibold text-[#2C2017]">
        Project Submitted Successfully
      </h3>
      <p className="mb-8 max-w-[280px] font-['DM_Sans'] text-[14px] leading-relaxed text-[#8B6A48]">
        Thank you{order.customerName ? `, ${order.customerName}` : ""}. Wonder
        Wallz has received your project request and our team will be in
        touch shortly.
      </p>

      <a
        href={whatsappUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="mb-3 inline-flex w-full max-w-[280px] items-center justify-center gap-2 rounded-full bg-[#25D366] py-3.5 font-['DM_Sans'] text-[15px] font-semibold text-white shadow-[0_4px_20px_rgba(37,211,102,0.35)] transition-all duration-200 hover:bg-[#22C05E] hover:shadow-[0_6px_28px_rgba(37,211,102,0.42)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#25D366]/60 active:scale-[0.98]"
      >
        <WhatsAppIcon />
        Continue on WhatsApp
      </a>

      <button
        type="button"
        onClick={onContinueBrowsing}
        className="font-['DM_Sans'] text-[13px] font-medium text-[#A08060] underline underline-offset-2 transition-colors hover:text-[#8B6A48] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#C9A96E]/60"
      >
        Continue Browsing
      </button>
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

  // ── Place Order ──────────────────────────────────────────────────────────
  const [isCustomerModalOpen, setIsCustomerModalOpen] = useState(false);
  const [isPlacingOrder, setIsPlacingOrder] = useState(false);
  const [orderError, setOrderError] = useState<string | null>(null);
  const [orderPlaced, setOrderPlaced] = useState(false);
  // Snapshot of what was submitted, captured just before clearCart() wipes
  // the live cart items — needed to build the WhatsApp message and greet
  // the customer by name in the success state.
  const [submittedOrder, setSubmittedOrder] = useState<SubmittedOrder | null>(
    null
  );

  const handlePlaceOrderClick = useCallback(() => {
    setOrderError(null);
    setIsCustomerModalOpen(true);
  }, []);

  const handleCustomerSubmit = useCallback(
    async (customer: CustomerDetails) => {
      setIsPlacingOrder(true);
      setOrderError(null);

      const result = await sendCartOrder(items, {
        name: customer.name,
        phone: customer.phone,
        email: customer.email,
        city: customer.city || undefined,
      });

      setIsPlacingOrder(false);

      if (!result.success) {
        setOrderError(result.error ?? "Failed to place your order. Please try again.");
        return;
      }

      // Capture the WhatsApp-relevant details before the cart is cleared.
      setSubmittedOrder({
        customerName: customer.name || undefined,
        lineItems: items.map((item) => ({
          collection: item.collectionLabel ?? item.product.title,
          design:
            item.designNumber !== undefined
              ? `#${item.designNumber}`
              : item.product.title,
        })),
      });

      setIsCustomerModalOpen(false);
      setOrderPlaced(true);
      clearCart();
    },
    [items, clearCart]
  );

  /** "Continue Browsing" — dismiss the success state and close the cart. */
  const handleContinueBrowsing = useCallback(() => {
    setOrderPlaced(false);
    setSubmittedOrder(null);
    onClose();
  }, [onClose]);

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

  // Reset the success state whenever the drawer is closed (via the X
  // button, backdrop click, or ESC) so re-opening the cart doesn't show a
  // stale confirmation for an order that's already been dealt with.
  useEffect(() => {
    if (!isOpen && orderPlaced) {
      setOrderPlaced(false);
      setSubmittedOrder(null);
    }
  }, [isOpen, orderPlaced]);

  return (
    <AnimatePresence>
      {isOpen && (
        <Fragment key="cart-drawer-content">
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
              {orderPlaced && submittedOrder ? (
                <SuccessState
                  order={submittedOrder}
                  onContinueBrowsing={handleContinueBrowsing}
                />
              ) : isEmpty ? (
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
            {!isEmpty && !(orderPlaced && submittedOrder) && (
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

                {/* Primary CTA — Place Order */}
                <button
                  type="button"
                  onClick={handlePlaceOrderClick}
                  className="mb-3 w-full rounded-full bg-[#2C2017] py-3.5 font-['DM_Sans'] text-[15px] font-semibold text-[#FAF7F3] shadow-[0_4px_20px_rgba(44,32,23,0.28)] transition-all duration-200 hover:bg-[#3D2E1A] hover:shadow-[0_6px_28px_rgba(44,32,23,0.34)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#C9A96E]/60 active:scale-[0.98]"
                >
                  Place Order
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
        </Fragment>
      )}

      {/* Place Order — customer info modal (isolated from Review Project flow) */}
      <CustomerInfoModal
        key="customer-info-modal"
        isOpen={isCustomerModalOpen}
        onClose={() => setIsCustomerModalOpen(false)}
        onSubmit={handleCustomerSubmit}
        isSubmitting={isPlacingOrder}
        submitError={orderError}
      />
    </AnimatePresence>
  );
}

export default ProjectCartDrawer;
