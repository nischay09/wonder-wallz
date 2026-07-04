"use client";

import { useEffect, useRef, useState, useCallback, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import type { CollectionProduct, WorkflowType, WallpaperMaterial } from "@/lib/collections";
import { WALLPAPER_MATERIALS } from "@/lib/collections";
import { useProjectCart } from "@/store/projectCart";
import type { LinearUnit } from "@/lib/pricing";

// ─── Types ────────────────────────────────────────────────────────────────────

type Material = WallpaperMaterial;

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

// ─── Business rules ─────────────────────────────────────────────────────────
//
// Customers simply enter wall width and height — there is no media width or
// roll length restriction shown or enforced for wallpapers.
const MIN_BILLABLE_AREA_SQFT = 20;

// Internal rate table (₹ per sq ft) used only to derive the Estimated Total.
// This is never rendered — customers only ever see the final total.
const MATERIAL_RATE_PER_SQFT: Record<WallpaperMaterial, number> = {
  "Non-Woven": 60,
  "Textured": 100,
  "Golden Paper": 120,
  "Vinyl Matte": 60,
  "Vinyl Glossy": 60,
};

const ESTIMATE_DISCLAIMER =
  "This estimate is provided for budgeting purposes only. Final pricing will be confirmed after reviewing your artwork, dimensions, GST, transportation, installation requirements and any other project-specific production requirements.";

const currencyFormatter = new Intl.NumberFormat("en-IN", {
  style: "currency",
  currency: "INR",
  maximumFractionDigits: 0,
});

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

// ─── Component ────────────────────────────────────────────────────────────────

export function QuickViewModal({ product, workflow, isOpen, onClose, onAddedToCart }: QuickViewModalProps) {
  const [selectedMaterial, setSelectedMaterial] = useState<Material>(WALLPAPER_MATERIALS[0].name);
  const [width, setWidth] = useState("");
  const [height, setHeight] = useState("");
  const [quantity, setQuantity] = useState(1);
  const [addedFeedback, setAddedFeedback] = useState(false);
  const [imageLoaded, setImageLoaded] = useState(false);
  const [activeImage, setActiveImage] = useState(0);

  const overlayRef = useRef<HTMLDivElement>(null);
  const closeButtonRef = useRef<HTMLButtonElement>(null);

  // Zustand action
  const addItem = useProjectCart((s) => s.addItem);

  // Gallery — falls back gracefully to a single image when no gallery is provided.
  const gallery = useMemo(() => {
    if (!product) return [];
    if (product.images && product.images.length > 0) return product.images;
    return [product.highResImage ?? product.image];
  }, [product]);

  const hasGallery = gallery.length > 1;

  const goToImage = useCallback((next: number) => {
    setImageLoaded(false);
    setActiveImage(((next % gallery.length) + gallery.length) % gallery.length);
  }, [gallery.length]);

  // Reset state when product changes
  useEffect(() => {
    if (product) {
      setSelectedMaterial(WALLPAPER_MATERIALS[0].name);
      setWidth("");
      setHeight("");
      setQuantity(1);
      setAddedFeedback(false);
      setImageLoaded(false);
      setActiveImage(0);
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

  // ── Measurement math — customers enter both width and height; there is no
  // media width or roll length restriction here. ─────────────────────────────
  const widthNum = parseFloat(width) || 0;
  const heightNum = parseFloat(height) || 0;
  const widthEntered = width.trim() !== "";
  const heightEntered = height.trim() !== "";

  const coverageAreaSqFt = useMemo(() => {
    if (widthNum <= 0 || heightNum <= 0) return null;
    return widthNum * heightNum;
  }, [widthNum, heightNum]);

  const minAreaApplied = coverageAreaSqFt != null && coverageAreaSqFt < MIN_BILLABLE_AREA_SQFT;

  const billableAreaSqFt = useMemo(() => {
    if (coverageAreaSqFt == null) return null;
    return Math.max(coverageAreaSqFt, MIN_BILLABLE_AREA_SQFT);
  }, [coverageAreaSqFt]);

  const estimatedTotal = useMemo(() => {
    if (!billableAreaSqFt) return null;
    const rate = MATERIAL_RATE_PER_SQFT[selectedMaterial];
    return Math.round(billableAreaSqFt * rate * quantity);
  }, [billableAreaSqFt, selectedMaterial, quantity]);

  const buildWhatsAppMessage = () => {
    const name = product?.name ?? "this product";
    const msg = `Hi Wonder Wallz, I'm interested in ${name}. Width: ${width || "__"} ft, Height: ${height || "__"} ft. Material: ${selectedMaterial} Quantity: ${quantity} Please share pricing.`;
    return `https://wa.me/919999999999?text=${encodeURIComponent(msg)}`;
  };

  // ── Task 1: Add To Project ──────────────────────────────────────────────────
  const handleAddToProject = useCallback(() => {
    if (!product || !widthEntered || !heightEntered) return;

    addItem({
      id: crypto.randomUUID(),
      // CollectionProduct is compatible with Product; cast to satisfy the store
      product: product as unknown as Parameters<typeof addItem>[0]["product"],
      width: widthNum,
      height: heightNum,
      unit: "ft" as LinearUnit,
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
  }, [product, addItem, widthNum, heightNum, widthEntered, heightEntered, selectedMaterial, quantity, onClose, onAddedToCart]);

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
          className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6"
          style={{ backgroundColor: "rgba(44, 31, 20, 0.6)", backdropFilter: "blur(6px)" }}
          role="dialog"
          aria-modal="true"
          aria-label={`Quick view: ${product.collectionLabel ? `${product.collectionLabel} — ${product.name}` : product.name}`}
        >
          {/* Modal panel */}
          <motion.div
            initial={{ opacity: 0, scale: 0.96, y: 16 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.97, y: 10 }}
            transition={{ duration: 0.35, ease: EASE_BRAND }}
            className="relative w-full max-w-3xl max-h-[94vh] overflow-hidden rounded-[28px] shadow-2xl flex flex-col"
            style={{ backgroundColor: "#FAF7F2" }}
          >
            <div className="flex-1 overflow-y-auto overscroll-contain">

              {/* ── PREVIEW: large edge-to-edge catalogue image ──
                   object-contain preserves the original framing — wall,
                   floor, chair and window all stay visible exactly as shot,
                   with no aggressive cropping or stretching. */}
              <div
                className="relative w-full flex-shrink-0 overflow-hidden"
                style={{
                  aspectRatio: "16 / 10",
                  maxHeight: "56vh",
                  background: `linear-gradient(135deg, ${product.placeholderGradient[0]} 0%, ${product.placeholderGradient[1]} 100%)`,
                }}
              >
                <Image
                  key={gallery[activeImage]}
                  src={gallery[activeImage]}
                  alt={product.name}
                  fill
                  quality={95}
                  sizes="(max-width: 768px) 100vw, 768px"
                  priority={activeImage === 0}
                  loading={activeImage === 0 ? undefined : "lazy"}
                  onLoad={() => setImageLoaded(true)}
                  className="object-contain transition-opacity duration-500 ease-[cubic-bezier(0.22,1,0.36,1)]"
                  style={{ opacity: imageLoaded ? 1 : 0 }}
                />

                {/* Workflow badge */}
                <span
                  className="absolute top-4 left-4 px-3.5 py-1.5 rounded-full text-[11px] font-bold uppercase tracking-wider"
                  style={{
                    background: isCustom ? "rgba(124,58,237,0.92)" : "rgba(44,31,20,0.8)",
                    color: "#FAF7F2",
                    backdropFilter: "blur(4px)",
                  }}
                >
                  {isCustom ? "Custom" : "Standard"}
                </span>

                {/* Close button */}
                <button
                  ref={closeButtonRef}
                  onClick={onClose}
                  className="absolute top-4 right-4 z-10 flex items-center justify-center w-9 h-9 rounded-full focus:outline-none focus-visible:ring-2 transition-colors duration-150"
                  style={{ background: "rgba(44,31,20,0.55)", color: "#FAF7F2" }}
                  aria-label="Close quick view"
                >
                  <svg width="13" height="13" viewBox="0 0 12 12" fill="none">
                    <path d="M1 1l10 10M11 1L1 11" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round"/>
                  </svg>
                </button>

                {/* Prev / Next — only shown when a gallery is available */}
                {hasGallery && (
                  <>
                    <button
                      type="button"
                      onClick={() => goToImage(activeImage - 1)}
                      className="absolute left-3 top-1/2 -translate-y-1/2 z-10 flex items-center justify-center w-9 h-9 rounded-full transition-transform duration-150 hover:scale-105 focus:outline-none focus-visible:ring-2"
                      style={{ background: "rgba(250,247,242,0.92)", color: "#2C1F14" }}
                      aria-label="Previous image"
                    >
                      <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                        <path d="M9 2.5L4.5 7 9 11.5" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                    </button>
                    <button
                      type="button"
                      onClick={() => goToImage(activeImage + 1)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 z-10 flex items-center justify-center w-9 h-9 rounded-full transition-transform duration-150 hover:scale-105 focus:outline-none focus-visible:ring-2"
                      style={{ background: "rgba(250,247,242,0.92)", color: "#2C1F14" }}
                      aria-label="Next image"
                    >
                      <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                        <path d="M5 2.5L9.5 7 5 11.5" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                    </button>

                    {/* Page indicator */}
                    <span
                      className="absolute bottom-4 left-4 px-2.5 py-1 rounded-full text-[11px] font-semibold tracking-wide"
                      style={{ background: "rgba(250,247,242,0.9)", color: "#6B5744" }}
                    >
                      Page {String(activeImage + 1).padStart(2, "0")}
                    </span>
                  </>
                )}
              </div>

              {/* Thumbnail strip — only shown when a gallery is available */}
              {hasGallery && (
                <div className="flex gap-2.5 px-6 sm:px-9 pt-4">
                  {gallery.map((src, i) => (
                    <button
                      key={src + i}
                      type="button"
                      onClick={() => goToImage(i)}
                      className="relative w-16 h-12 flex-shrink-0 overflow-hidden rounded-xl transition-all duration-150"
                      style={{
                        outline: activeImage === i ? "2px solid #B5926A" : "2px solid transparent",
                        outlineOffset: "1px",
                      }}
                      aria-label={`View image ${i + 1}`}
                      aria-current={activeImage === i}
                    >
                      <Image
                        src={src}
                        alt=""
                        fill
                        sizes="64px"
                        quality={60}
                        loading="lazy"
                        className="object-cover"
                      />
                    </button>
                  ))}
                </div>
              )}

              {/* ── CONTENT: editorial product panel ── */}
              <div className="flex flex-col gap-8 px-6 sm:px-9 py-8">

                {/* Name & description */}
                <div>
                  {(product.collectionLabel || product.subcategory) && (
                    <p
                      className="text-xs font-semibold uppercase tracking-wider mb-1.5"
                      style={{ color: "#9C8873" }}
                    >
                      {product.collectionLabel ?? product.subcategory!.replace(/-/g, " ")}
                    </p>
                  )}
                  <h2
                    className="text-[28px] sm:text-[32px] font-bold leading-[1.15] mb-2"
                    style={{ fontFamily: "'Playfair Display', serif", color: "#2C1F14" }}
                  >
                    {product.name}
                  </h2>
                  {product.description && (
                    <p className="text-sm leading-relaxed" style={{ color: "#6B5744" }}>
                      {product.description}
                    </p>
                  )}
                </div>

                {/* Quality badges */}
                <div className="flex flex-wrap gap-2.5">
                  {QUALITY_BADGES.map(({ label, icon }) => (
                    <span
                      key={label}
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium"
                      style={{ background: "rgba(44,31,20,0.07)", color: "#6B5744" }}
                    >
                      {icon}
                      {label}
                    </span>
                  ))}
                </div>

                <hr style={{ borderColor: "rgba(44,31,20,0.1)" }} />

                {/* Measurements */}
                <div className="flex flex-col gap-4">
                  <p className="text-xs font-bold uppercase tracking-wider" style={{ color: "#2C1F14" }}>
                    Measurements
                  </p>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-semibold mb-2" style={{ color: "#2C1F14" }}>
                        Width (ft)
                      </label>
                      <input
                        type="number"
                        min={0}
                        value={width}
                        onChange={e => setWidth(e.target.value)}
                        placeholder="Enter width"
                        className="w-full rounded-2xl border px-4 py-3.5 text-[15px] outline-none transition-colors duration-150"
                        style={{ borderColor: "rgba(44,31,20,0.18)", backgroundColor: "#fff", color: "#2C1F14" }}
                        onFocus={e => (e.currentTarget.style.borderColor = "#B5926A")}
                        onBlur={e => (e.currentTarget.style.borderColor = "rgba(44,31,20,0.18)")}
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-semibold mb-2" style={{ color: "#2C1F14" }}>
                        Height (ft)
                      </label>
                      <input
                        type="number"
                        min={0}
                        value={height}
                        onChange={e => setHeight(e.target.value)}
                        placeholder="Enter height"
                        className="w-full rounded-2xl border px-4 py-3.5 text-[15px] outline-none transition-colors duration-150"
                        style={{ borderColor: "rgba(44,31,20,0.18)", backgroundColor: "#fff", color: "#2C1F14" }}
                        onFocus={e => (e.currentTarget.style.borderColor = "#B5926A")}
                        onBlur={e => (e.currentTarget.style.borderColor = "rgba(44,31,20,0.18)")}
                      />
                    </div>
                  </div>

                  {/* Coverage Area */}
                  <div
                    className="rounded-2xl px-4 py-3"
                    style={{ background: "rgba(44,31,20,0.05)" }}
                  >
                    <p className="text-[11px] uppercase tracking-wider mb-0.5" style={{ color: "#6B5744" }}>
                      Coverage Area
                    </p>
                    <p className="text-sm font-semibold" style={{ color: "#2C1F14" }}>
                      {coverageAreaSqFt != null ? `${coverageAreaSqFt.toFixed(1)} sq ft` : "—"}
                    </p>
                  </div>

                  {minAreaApplied && (
                    <div
                      className="flex items-start gap-2.5 px-4 py-3 rounded-2xl text-xs leading-relaxed"
                      style={{ background: "rgba(181,146,106,0.16)", color: "#6B5744" }}
                    >
                      <svg width="15" height="15" viewBox="0 0 14 14" fill="none" className="flex-shrink-0 mt-0.5">
                        <circle cx="7" cy="7" r="6" stroke="currentColor" strokeWidth="1.2"/>
                        <path d="M7 6.2v3.3M7 4.3v.1" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round"/>
                      </svg>
                      <span>
                        This estimate has been calculated using the minimum billable area of{" "}
                        {MIN_BILLABLE_AREA_SQFT} sq ft.
                      </span>
                    </div>
                  )}
                </div>

                {/* Material selector — premium selectable cards */}
                <div>
                  <p className="text-xs font-bold uppercase tracking-wider mb-3.5" style={{ color: "#2C1F14" }}>
                    Material
                  </p>
                  <div className="flex flex-col gap-2.5">
                    {WALLPAPER_MATERIALS.map(({ name: mat, description }) => {
                      const active = selectedMaterial === mat;
                      return (
                        <button
                          key={mat}
                          type="button"
                          onClick={() => setSelectedMaterial(mat)}
                          className="w-full text-left px-5 py-4 rounded-2xl transition-all duration-150 focus:outline-none focus-visible:ring-2"
                          style={{
                            border: active ? "1.5px solid #B5926A" : "1.5px solid rgba(44,31,20,0.14)",
                            backgroundColor: active ? "#F3E8D8" : "transparent",
                          }}
                          aria-pressed={active}
                        >
                          <span className="flex items-start gap-3">
                            <span
                              className="w-4 h-4 mt-0.5 rounded-full border-2 flex-shrink-0 flex items-center justify-center transition-all duration-150"
                              style={{ borderColor: active ? "#8A6A45" : "rgba(44,31,20,0.25)" }}
                            >
                              {active && (
                                <span className="w-2 h-2 rounded-full" style={{ backgroundColor: "#8A6A45" }} />
                              )}
                            </span>
                            <span className="flex flex-col gap-0.5">
                              <span className="text-[15px] font-semibold" style={{ color: "#2C1F14" }}>{mat}</span>
                              <span
                                className="text-[13px] font-normal leading-snug"
                                style={{ color: "#8A7660" }}
                              >
                                {description}
                              </span>
                            </span>
                          </span>
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* Quantity */}
                <div>
                  <p className="text-xs font-bold uppercase tracking-wider mb-3.5" style={{ color: "#2C1F14" }}>
                    Quantity
                  </p>
                  <div className="inline-flex items-center rounded-2xl border overflow-hidden" style={{ borderColor: "rgba(44,31,20,0.2)" }}>
                    <button
                      type="button"
                      onClick={() => setQuantity(q => Math.max(1, q - 1))}
                      className="w-11 h-11 flex items-center justify-center text-lg font-medium transition-colors duration-150 focus:outline-none"
                      style={{ color: "#2C1F14" }}
                      onMouseEnter={e => (e.currentTarget.style.backgroundColor = "rgba(181,146,106,0.12)")}
                      onMouseLeave={e => (e.currentTarget.style.backgroundColor = "transparent")}
                      aria-label="Decrease quantity"
                    >
                      −
                    </button>
                    <span
                      className="w-14 h-11 flex items-center justify-center text-sm font-semibold border-x"
                      style={{ color: "#2C1F14", borderColor: "rgba(44,31,20,0.2)" }}
                    >
                      {quantity}
                    </span>
                    <button
                      type="button"
                      onClick={() => setQuantity(q => q + 1)}
                      className="w-11 h-11 flex items-center justify-center text-lg font-medium transition-colors duration-150 focus:outline-none"
                      style={{ color: "#2C1F14" }}
                      onMouseEnter={e => (e.currentTarget.style.backgroundColor = "rgba(181,146,106,0.12)")}
                      onMouseLeave={e => (e.currentTarget.style.backgroundColor = "transparent")}
                      aria-label="Increase quantity"
                    >
                      +
                    </button>
                  </div>
                </div>

                <hr style={{ borderColor: "rgba(44,31,20,0.1)" }} />

                {/* Disclaimer, Estimated Total, and the dominant primary CTA */}
                <div className="flex flex-col gap-4">
                  <p className="text-xs leading-relaxed" style={{ color: "#9C8873" }}>
                    {ESTIMATE_DISCLAIMER}
                  </p>

                  <div className="flex items-center justify-between px-1">
                    <span className="text-xs font-bold uppercase tracking-wider" style={{ color: "#6B5744" }}>
                      Estimated Total
                    </span>
                    <span
                      className="text-2xl font-bold"
                      style={{ fontFamily: "'Playfair Display', serif", color: "#2C1F14" }}
                    >
                      {estimatedTotal != null ? currencyFormatter.format(estimatedTotal) : "—"}
                    </span>
                  </div>

                  {/* CTA */}
                  <button
                    type="button"
                    onClick={handlePrimaryCTA}
                    disabled={addedFeedback}
                    className="w-full py-4 rounded-2xl flex flex-col items-center justify-center gap-0.5 transition-all duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-60"
                    style={{
                      background: addedFeedback
                        ? "#4CAF50"
                        : isCustom
                        ? "linear-gradient(135deg, #7C3AED 0%, #B5926A 100%)"
                        : "#2C1F14",
                      color: "#FAF7F2",
                    }}
                    onMouseEnter={e => { if (!addedFeedback) e.currentTarget.style.opacity = "0.9"; }}
                    onMouseLeave={e => { e.currentTarget.style.opacity = "1"; }}
                  >
                    <span className="flex items-center gap-2.5 text-[15px] font-semibold">
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
                          <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                            <path fillRule="evenodd" clipRule="evenodd" d="M8 1.5a6.5 6.5 0 100 13A6.5 6.5 0 008 1.5zM0 8a8 8 0 1116 0A8 8 0 010 8z" fill="currentColor" fillOpacity=".2"/>
                            <path d="M5.5 5.5c.2-.3.6-.3.8 0l.8 1.2c.1.2.1.5-.1.7l-.3.3c.3.6.8 1.1 1.4 1.4l.3-.3c.2-.2.5-.2.7-.1l1.2.8c.3.2.3.6 0 .8l-.5.5c-.3.3-.7.4-1 .3-1.5-.5-2.7-1.7-3.2-3.2-.1-.3 0-.7.3-1l.6-.4z" fill="currentColor"/>
                          </svg>
                          Enquire on WhatsApp
                        </>
                      )}
                    </span>
                    {!addedFeedback && (
                      <span className="text-[11.5px] font-normal" style={{ color: "rgba(250,247,242,0.75)" }}>
                        {isCustom ? "Get started with your custom project" : "Chat with us for pricing & installation"}
                      </span>
                    )}
                  </button>
                </div>

              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
