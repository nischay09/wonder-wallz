"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import type { CollectionProduct, WorkflowType } from "@/lib/collections";
import { useProjectCart } from "@/store/projectCart";
import type { LinearUnit } from "@/lib/pricing";

// ─── Types ────────────────────────────────────────────────────────────────────

type Unit = "ft" | "in" | "cm";
type Material = "Silk Non-Woven" | "Premium Vinyl" | "Textured Canvas";

interface QuickViewModalProps {
  product: CollectionProduct | null;
  workflow: WorkflowType;
  isOpen: boolean;
  onClose: () => void;
  /** Called after a successful addItem so the parent can open the drawer. */
  onAddedToCart?: () => void;
}

// ─── Constants ────────────────────────────────────────────────────────────────

const EASE_BRAND = [0.22, 1, 0.36, 1] as const;

const QUALITY_BADGES = [
  {
    label: "Washable",
    icon: (
      <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
        <path d="M2 6c0-2.2 1.8-4 4-4s4 1.8 4 4c0 3-4 7-4 7S2 9 2 6z" stroke="currentColor" strokeWidth="1.3" strokeLinejoin="round"/>
        <circle cx="6" cy="6" r="1.5" stroke="currentColor" strokeWidth="1.3"/>
        <path d="M11 10l2 2-2 2" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    ),
  },
  {
    label: "Eco Friendly",
    icon: (
      <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
        <path d="M8 14c-3.3 0-6-2.7-6-6 0-2 1-3.8 2.5-4.9C5.5 5 7 6 8 8c1-2 2.5-3 3.5-4.9C13 4.2 14 6 14 8c0 3.3-2.7 6-6 6z" stroke="currentColor" strokeWidth="1.3" strokeLinejoin="round"/>
      </svg>
    ),
  },
  {
    label: "Fade Resistant",
    icon: (
      <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
        <circle cx="8" cy="8" r="3" stroke="currentColor" strokeWidth="1.3"/>
        <path d="M8 2v1M8 13v1M2 8h1M13 8h1M3.5 3.5l.7.7M11.8 11.8l.7.7M11.8 4.2l-.7.7M4.2 11.8l-.7.7" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round"/>
      </svg>
    ),
  },
  {
    label: "Pan India Delivery",
    icon: (
      <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
        <rect x="1" y="5" width="10" height="7" rx="1.5" stroke="currentColor" strokeWidth="1.3"/>
        <path d="M11 7.5l3-1.5v5l-3-1.5" stroke="currentColor" strokeWidth="1.3" strokeLinejoin="round"/>
        <circle cx="4" cy="13" r="1.2" stroke="currentColor" strokeWidth="1.1"/>
        <circle cx="8" cy="13" r="1.2" stroke="currentColor" strokeWidth="1.1"/>
      </svg>
    ),
  },
];

const MATERIALS: Material[] = ["Silk Non-Woven", "Premium Vinyl", "Textured Canvas"];

// ─── Component ────────────────────────────────────────────────────────────────

export function QuickViewModal({ product, workflow, isOpen, onClose, onAddedToCart }: QuickViewModalProps) {
  const [selectedMaterial, setSelectedMaterial] = useState<Material>("Silk Non-Woven");
  const [width, setWidth] = useState("");
  const [height, setHeight] = useState("");
  const [unit, setUnit] = useState<Unit>("ft");
  const [quantity, setQuantity] = useState(1);
  const [imageZoom, setImageZoom] = useState(false);
  const [addedFeedback, setAddedFeedback] = useState(false);

  const overlayRef = useRef<HTMLDivElement>(null);
  const closeButtonRef = useRef<HTMLButtonElement>(null);

  // Zustand action
  const addItem = useProjectCart((s) => s.addItem);

  // Reset state when product changes
  useEffect(() => {
    if (product) {
      setSelectedMaterial("Silk Non-Woven");
      setWidth("");
      setHeight("");
      setUnit("ft");
      setQuantity(1);
      setImageZoom(false);
      setAddedFeedback(false);
    }
  }, [product?.id]);

  // Body scroll lock
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
      requestAnimationFrame(() => closeButtonRef.current?.focus());
    } else {
      document.body.style.overflow = "";
    }
    return () => { document.body.style.overflow = ""; };
  }, [isOpen]);

  // ESC key
  useEffect(() => {
    if (!isOpen) return;
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [isOpen, onClose]);

  const handleOverlayClick = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === overlayRef.current) onClose();
  }, [onClose]);

  const isCustom = workflow === "custom";

  const buildWhatsAppMessage = () => {
    const name = product?.name ?? "this product";
    const msg = `Hi Wonder Wallz, I'm interested in ${name}. Width: ${width || "__"} ${unit} Height: ${height || "__"} ${unit} Material: ${selectedMaterial} Quantity: ${quantity} Please share pricing.`;
    return `https://wa.me/919999999999?text=${encodeURIComponent(msg)}`;
  };

  // ── Task 1: Add To Project ──────────────────────────────────────────────────
  const handleAddToProject = useCallback(() => {
    if (!product) return;

    addItem({
      id: crypto.randomUUID(),
      // CollectionProduct is compatible with Product; cast to satisfy the store
      product: product as unknown as Parameters<typeof addItem>[0]["product"],
      width: parseFloat(width) || 0,
      height: parseFloat(height) || 0,
      unit: unit as LinearUnit,
      material: selectedMaterial,
      quantity,
    });

    // Brief "Added ✓" feedback, then notify parent to open the drawer
    setAddedFeedback(true);
    setTimeout(() => {
      setAddedFeedback(false);
      onClose();
      onAddedToCart?.();
    }, 800);
  }, [product, addItem, width, height, unit, selectedMaterial, quantity, onClose, onAddedToCart]);

  const handlePrimaryCTA = () => {
    if (isCustom) {
      // Custom → Add to Project (goes to Project Builder via the cart)
      handleAddToProject();
    } else {
      // Standard → WhatsApp enquiry
      window.open(buildWhatsAppMessage(), "_blank", "noopener,noreferrer");
    }
  };

  if (!product) return null;

  return (
    <AnimatePresence>
      {isOpen && (
        // Backdrop
        <motion.div
          ref={overlayRef}
          onClick={handleOverlayClick}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.25, ease: "easeOut" }}
          className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6"
          style={{ backgroundColor: "rgba(44, 31, 20, 0.6)", backdropFilter: "blur(6px)" }}
          role="dialog"
          aria-modal="true"
          aria-label={`Quick view: ${product.name}`}
        >
          {/* Modal panel */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 12 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.96, y: 8 }}
            transition={{ duration: 0.35, ease: EASE_BRAND }}
            className="relative w-full max-w-2xl max-h-[90vh] overflow-hidden rounded-2xl shadow-2xl flex flex-col"
            style={{ backgroundColor: "#FAF7F2" }}
          >
            {/* ── TOP: Full-width image ── */}
            <div
              className="relative w-full flex-shrink-0 overflow-hidden"
              style={{ height: "280px" }}
            >
              <div
                className="absolute inset-0"
                style={{
                  background: `linear-gradient(135deg, ${product.placeholderGradient[0]} 0%, ${product.placeholderGradient[1]} 100%)`,
                }}
              />
              <div
                className="absolute inset-0"
                style={{
                  backgroundImage: product.coverImage ? `url(${product.coverImage})` : undefined,
                  backgroundSize: "cover",
                  backgroundPosition: "center",
                  transform: imageZoom ? "scale(1.06)" : "scale(1)",
                  transition: "transform 0.5s ease",
                  cursor: "zoom-in",
                }}
                onClick={() => setImageZoom((z) => !z)}
              />
              {/* Close button */}
              <button
                ref={closeButtonRef}
                onClick={onClose}
                className="absolute top-3 right-3 z-10 flex items-center justify-center w-8 h-8 rounded-full focus:outline-none focus-visible:ring-2"
                style={{ background: "rgba(44,31,20,0.55)", color: "#FAF7F2" }}
                aria-label="Close quick view"
              >
                <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                  <path d="M1 1l10 10M11 1L1 11" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round"/>
                </svg>
              </button>

              {/* Workflow badge */}
              <span
                className="absolute top-3 left-3 px-2.5 py-1 rounded-full text-[11px] font-semibold uppercase tracking-wider"
                style={{
                  background: isCustom ? "rgba(124,58,237,0.85)" : "rgba(44,31,20,0.75)",
                  color: "#FAF7F2",
                  backdropFilter: "blur(4px)",
                }}
              >
                {isCustom ? "Custom" : "Standard"}
              </span>
            </div>

            {/* ── BOTTOM: Scrollable config panel ── */}
            <div className="flex-1 overflow-y-auto overscroll-contain">
              <div className="flex flex-col gap-5 p-5">
                {/* Name & price */}
                <div>
                  <h2
                    className="text-[22px] font-semibold leading-snug mb-0.5"
                    style={{ fontFamily: "'Playfair Display', serif", color: "#2C1F14" }}
                  >
                    {product.name}
                  </h2>
                  {product.description && (
                    <p className="text-[13px] leading-relaxed" style={{ color: "#6B5744" }}>
                      {product.description}
                    </p>
                  )}
                </div>

                {/* Quality badges */}
                <div className="flex flex-wrap gap-2">
                  {QUALITY_BADGES.map(({ label, icon }) => (
                    <span
                      key={label}
                      className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-medium"
                      style={{ background: "rgba(44,31,20,0.07)", color: "#6B5744" }}
                    >
                      {icon}
                      {label}
                    </span>
                  ))}
                </div>

                <hr style={{ borderColor: "rgba(44,31,20,0.1)" }} />

                {/* Measurements */}
                <div>
                  <p className="text-xs font-semibold uppercase tracking-wider mb-3" style={{ color: "#2C1F14" }}>
                    Measurements
                  </p>
                  <div className="flex gap-2">
                    <div className="flex-1">
                      <label className="block text-xs mb-1.5" style={{ color: "#6B5744" }}>Width</label>
                      <input
                        type="number"
                        min="0"
                        value={width}
                        onChange={e => setWidth(e.target.value)}
                        placeholder="0"
                        className="w-full rounded-xl border px-3 py-2.5 text-sm outline-none transition-colors duration-150 focus:ring-2"
                        style={{
                          borderColor: "rgba(44,31,20,0.2)",
                          backgroundColor: "#fff",
                          color: "#2C1F14",
                        }}
                        onFocus={e => (e.currentTarget.style.borderColor = "#B5926A")}
                        onBlur={e => (e.currentTarget.style.borderColor = "rgba(44,31,20,0.2)")}
                      />
                    </div>
                    <div className="flex-1">
                      <label className="block text-xs mb-1.5" style={{ color: "#6B5744" }}>Height</label>
                      <input
                        type="number"
                        min="0"
                        value={height}
                        onChange={e => setHeight(e.target.value)}
                        placeholder="0"
                        className="w-full rounded-xl border px-3 py-2.5 text-sm outline-none transition-colors duration-150"
                        style={{
                          borderColor: "rgba(44,31,20,0.2)",
                          backgroundColor: "#fff",
                          color: "#2C1F14",
                        }}
                        onFocus={e => (e.currentTarget.style.borderColor = "#B5926A")}
                        onBlur={e => (e.currentTarget.style.borderColor = "rgba(44,31,20,0.2)")}
                      />
                    </div>
                    <div className="w-24">
                      <label className="block text-xs mb-1.5" style={{ color: "#6B5744" }}>Unit</label>
                      <select
                        value={unit}
                        onChange={e => setUnit(e.target.value as Unit)}
                        className="w-full rounded-xl border px-2 py-2.5 text-sm outline-none appearance-none text-center cursor-pointer"
                        style={{
                          borderColor: "rgba(44,31,20,0.2)",
                          backgroundColor: "#fff",
                          color: "#2C1F14",
                        }}
                      >
                        <option value="ft">ft</option>
                        <option value="in">in</option>
                        <option value="cm">cm</option>
                      </select>
                    </div>
                  </div>
                </div>

                {/* Material selector */}
                <div>
                  <p className="text-xs font-semibold uppercase tracking-wider mb-3" style={{ color: "#2C1F14" }}>
                    Material
                  </p>
                  <div className="flex flex-col gap-2">
                    {MATERIALS.map(mat => {
                      const active = selectedMaterial === mat;
                      return (
                        <button
                          key={mat}
                          type="button"
                          onClick={() => setSelectedMaterial(mat)}
                          className="w-full text-left px-4 py-2.5 rounded-xl border text-sm font-medium transition-all duration-150 focus:outline-none focus-visible:ring-2"
                          style={{
                            borderColor: active ? "#B5926A" : "rgba(44,31,20,0.15)",
                            backgroundColor: active ? "rgba(181,146,106,0.12)" : "transparent",
                            color: active ? "#2C1F14" : "#6B5744",
                          }}
                          aria-pressed={active}
                        >
                          <span className="flex items-center gap-2">
                            <span
                              className="w-3.5 h-3.5 rounded-full border-2 flex-shrink-0 transition-all duration-150"
                              style={{
                                borderColor: active ? "#B5926A" : "rgba(44,31,20,0.25)",
                                backgroundColor: active ? "#B5926A" : "transparent",
                              }}
                            />
                            {mat}
                          </span>
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* Quantity */}
                <div>
                  <p className="text-xs font-semibold uppercase tracking-wider mb-3" style={{ color: "#2C1F14" }}>
                    Quantity
                  </p>
                  <div className="inline-flex items-center rounded-xl border overflow-hidden" style={{ borderColor: "rgba(44,31,20,0.2)" }}>
                    <button
                      type="button"
                      onClick={() => setQuantity(q => Math.max(1, q - 1))}
                      className="w-10 h-10 flex items-center justify-center text-lg font-medium transition-colors duration-150 focus:outline-none"
                      style={{ color: "#2C1F14" }}
                      onMouseEnter={e => (e.currentTarget.style.backgroundColor = "rgba(181,146,106,0.12)")}
                      onMouseLeave={e => (e.currentTarget.style.backgroundColor = "transparent")}
                      aria-label="Decrease quantity"
                    >
                      −
                    </button>
                    <span
                      className="w-12 h-10 flex items-center justify-center text-sm font-semibold border-x"
                      style={{ color: "#2C1F14", borderColor: "rgba(44,31,20,0.2)" }}
                    >
                      {quantity}
                    </span>
                    <button
                      type="button"
                      onClick={() => setQuantity(q => q + 1)}
                      className="w-10 h-10 flex items-center justify-center text-lg font-medium transition-colors duration-150 focus:outline-none"
                      style={{ color: "#2C1F14" }}
                      onMouseEnter={e => (e.currentTarget.style.backgroundColor = "rgba(181,146,106,0.12)")}
                      onMouseLeave={e => (e.currentTarget.style.backgroundColor = "transparent")}
                      aria-label="Increase quantity"
                    >
                      +
                    </button>
                  </div>
                </div>

                {/* CTA */}
                <button
                  type="button"
                  onClick={handlePrimaryCTA}
                  disabled={addedFeedback}
                  className="w-full py-3.5 rounded-xl text-sm font-semibold flex items-center justify-center gap-2.5 transition-all duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 mt-auto"
                  style={{
                    background: addedFeedback
                      ? "#4CAF50"
                      : isCustom
                      ? "linear-gradient(135deg, #7C3AED 0%, #B5926A 100%)"
                      : "#2C1F14",
                    color: "#FAF7F2",
                    opacity: addedFeedback ? 1 : undefined,
                  }}
                  onMouseEnter={e => { if (!addedFeedback) e.currentTarget.style.opacity = "0.9"; }}
                  onMouseLeave={e => { e.currentTarget.style.opacity = "1"; }}
                >
                  {addedFeedback ? (
                    <>
                      <svg width="15" height="15" viewBox="0 0 15 15" fill="none">
                        <path d="M2 7.5l4 4 7-7" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                      Added to Project
                    </>
                  ) : isCustom ? (
                    <>
                      <svg width="15" height="15" viewBox="0 0 15 15" fill="none">
                        <path d="M7.5 1v13M1 7.5h13" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round"/>
                      </svg>
                      Add to Project
                    </>
                  ) : (
                    <>
                      {/* WhatsApp icon */}
                      <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                        <path fillRule="evenodd" clipRule="evenodd" d="M8 1.5a6.5 6.5 0 100 13A6.5 6.5 0 008 1.5zM0 8a8 8 0 1116 0A8 8 0 010 8z" fill="currentColor" fillOpacity=".2"/>
                        <path d="M5.5 5.5c.2-.3.6-.3.8 0l.8 1.2c.1.2.1.5-.1.7l-.3.3c.3.6.8 1.1 1.4 1.4l.3-.3c.2-.2.5-.2.7-.1l1.2.8c.3.2.3.6 0 .8l-.5.5c-.3.3-.7.4-1 .3-1.5-.5-2.7-1.7-3.2-3.2-.1-.3 0-.7.3-1l.6-.4z" fill="currentColor"/>
                      </svg>
                      Enquire on WhatsApp
                    </>
                  )}
                </button>

              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
