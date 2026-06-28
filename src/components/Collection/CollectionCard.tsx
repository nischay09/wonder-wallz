"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import type { CollectionProduct, WorkflowType } from "@/lib/collections";
import { getWorkflowCTA } from "@/lib/collections";
import { QuickViewModal } from "./QuickViewModal";

interface CollectionCardProps {
  product: CollectionProduct;
  workflow: WorkflowType;
  /** Stagger delay index for entrance animation */
  index?: number;
}

const EASE_BRAND = [0.22, 1, 0.36, 1] as const;

export function CollectionCard({ product, workflow, index = 0 }: CollectionCardProps) {
  const isCustom = workflow === "custom";
  const ctaLabel = getWorkflowCTA(workflow);

  // ── Quick View state (only addition) ──
  const [modalOpen, setModalOpen] = useState(false);

  return (
    <>
      <motion.article
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{
          duration: 0.45,
          ease: EASE_BRAND,
          delay: Math.min(index * 0.06, 0.4),
        }}
        className="group card card-hover flex flex-col overflow-hidden rounded-3xl focus-within:ring-2 focus-within:ring-blue-500 focus-within:ring-offset-2 cursor-pointer"
        aria-label={product.name}
        onClick={() => setModalOpen(true)}
        role="button"
        tabIndex={0}
        onKeyDown={e => { if (e.key === "Enter" || e.key === " ") setModalOpen(true); }}
      >
        {/* ── Image area ── */}
        <div
          className="relative w-full overflow-hidden"
          style={{ aspectRatio: "4/3" }}
        >
          {/* Gradient placeholder — always visible as background */}
          <div
            className="absolute inset-0"
            style={{
              background: `linear-gradient(135deg, ${product.placeholderGradient[0]} 0%, ${product.placeholderGradient[1]} 100%)`,
            }}
            aria-hidden="true"
          />

          {/* Product image */}
          <Image
            src={product.image}
            alt={product.name}
            fill
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
            className="object-cover transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-105"
            onError={() => {
              // Gracefully falls back to gradient if image 404s
            }}
          />

          {/* Workflow badge */}
          <div className="absolute top-3 left-3" aria-hidden="true">
            <span
              className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-pill text-xs font-semibold backdrop-blur-sm ${
                isCustom
                  ? "bg-purple-500/90 text-white"
                  : "bg-blue-500/90 text-white"
              }`}
            >
              {isCustom ? (
                <>
                  <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
                    <path d="M5 1l1.5 3H10L7.5 6l1 3L5 7.5 1.5 9l1-3L0 4h3.5L5 1z" fill="currentColor"/>
                  </svg>
                  Custom
                </>
              ) : (
                <>
                  <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
                    <circle cx="5" cy="5" r="4" stroke="currentColor" strokeWidth="1.5"/>
                    <path d="M3.5 5l1 1 2-2" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                  Standard
                </>
              )}
            </span>
          </div>

          {/* Quick View hint on hover (new — no structural change) */}
          <div
            className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300"
            aria-hidden="true"
          >
            <span className="px-4 py-2 rounded-full text-xs font-semibold backdrop-blur-sm text-white bg-black/40">
              Quick View
            </span>
          </div>

          {/* Hover overlay */}
          <div
            className="absolute inset-0 bg-neutral-950/0 group-hover:bg-neutral-950/10 transition-colors duration-300"
            aria-hidden="true"
          />
        </div>

        {/* ── Content ── */}
        <div className="flex flex-col flex-1 p-5">
          {/* Subcategory label */}
          {product.subcategory && (
            <p className="text-xs font-medium text-neutral-400 uppercase tracking-wider mb-1.5">
              {product.subcategory.replace(/-/g, " ")}
            </p>
          )}

          {/* Product name */}
          <h3
            className="font-semibold text-neutral-900 text-base leading-snug mb-2 line-clamp-2"
            style={{ fontFamily: "var(--font-playfair, serif)" }}
          >
            {product.name}
          </h3>

          {/* Description */}
          <p className="text-sm text-neutral-500 leading-relaxed line-clamp-2 flex-1 mb-4">
            {product.description}
          </p>

          {/* CTA */}
          <button
            type="button"
            onClick={e => { e.stopPropagation(); setModalOpen(true); }}
            className={`w-full inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl text-sm font-semibold transition-all duration-200 ${
              isCustom
                ? "bg-gradient-to-r from-purple-500 to-blue-500 text-white"
                : "bg-neutral-900 text-white"
            }`}
            aria-label={`${ctaLabel} — ${product.name}`}
          >
            {isCustom ? (
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
                <path d="M7 1v12M1 7h12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
              </svg>
            ) : (
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
                <path d="M2 2h10l-1.5 7H3.5L2 2zM3.5 9l-.5 2.5h8L10.5 9" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            )}
            {ctaLabel}
          </button>
        </div>
      </motion.article>

      {/* Quick View Modal — rendered outside the card to avoid stacking context issues */}
      <QuickViewModal
        product={product}
        workflow={workflow}
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
      />
    </>
  );
}
