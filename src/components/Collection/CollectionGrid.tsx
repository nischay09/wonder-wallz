"use client";

import { useCallback, useState } from "react";
import { motion } from "framer-motion";
import { CollectionCard } from "./CollectionCard";
import { QuickViewModal } from "./QuickViewModal";
import type { CollectionProduct, WorkflowType } from "@/lib/collections";

interface CollectionGridProps {
  products: CollectionProduct[];
  workflow: WorkflowType;
  collectionSlug: string;
}

const EASE_BRAND = [0.22, 1, 0.36, 1] as const;

export function CollectionGrid({ products, workflow, collectionSlug }: CollectionGridProps) {
  // Quick View used to be mounted once per CollectionCard (so a 24-product
  // page mounted 24 modal instances simultaneously, even though only one
  // can ever be open). It now lives once here at the grid level, driven by
  // which product (if any) is currently selected.
  const [selectedProduct, setSelectedProduct] = useState<CollectionProduct | null>(null);

  const handleQuickView = useCallback((product: CollectionProduct) => {
    setSelectedProduct(product);
  }, []);

  const handleCloseQuickView = useCallback(() => {
    setSelectedProduct(null);
  }, []);

  if (products.length === 0) {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.4, ease: EASE_BRAND }}
        className="flex flex-col items-center justify-center py-24 text-center"
        role="status"
        aria-label="No products found"
      >
        <div
          className="w-20 h-20 rounded-3xl mb-6 flex items-center justify-center"
          style={{ background: "var(--bg-muted)" }}
          aria-hidden="true"
        >
          <svg width="32" height="32" viewBox="0 0 32 32" fill="none" className="text-neutral-400">
            <rect x="3" y="3" width="12" height="12" rx="3" stroke="currentColor" strokeWidth="1.5"/>
            <rect x="17" y="3" width="12" height="12" rx="3" stroke="currentColor" strokeWidth="1.5"/>
            <rect x="3" y="17" width="12" height="12" rx="3" stroke="currentColor" strokeWidth="1.5"/>
            <rect x="17" y="17" width="12" height="12" rx="3" stroke="currentColor" strokeWidth="1.5"/>
          </svg>
        </div>
        <h3
          className="text-xl font-semibold text-neutral-800 mb-2"
          style={{ fontFamily: "var(--font-playfair, serif)" }}
        >
          No products found
        </h3>
        <p className="text-sm text-neutral-500 max-w-xs">
          Try adjusting your filters or browse all designs in this collection.
        </p>
      </motion.div>
    );
  }

  return (
    <>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.3, ease: EASE_BRAND }}
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 md:gap-8"
        role="list"
        aria-label="Product grid"
      >
        {products.map((product, i) => (
          <div key={product.id} role="listitem" className="h-full">
            <CollectionCard
              product={product}
              workflow={workflow}
              index={i}
              collectionSlug={collectionSlug}
              onQuickView={handleQuickView}
            />
          </div>
        ))}
      </motion.div>

      {/* Single shared Quick View instance for the whole grid — replaces the
          previous one-modal-per-card approach. */}
      <QuickViewModal
        product={selectedProduct}
        workflow={workflow}
        isOpen={selectedProduct !== null}
        onClose={handleCloseQuickView}
        collectionSlug={collectionSlug}
      />
    </>
  );
}
