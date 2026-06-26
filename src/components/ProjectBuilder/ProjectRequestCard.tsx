'use client';

/**
 * ProjectRequestCard
 * One design request within the project builder.
 * Handles product selection, image upload/preview, dimensions, and notes.
 */

import { motion } from 'framer-motion';
import { Copy, Trash2 } from 'lucide-react';
import ImageUploader from './ImageUploader';
import {
  PRODUCTS,
  UNITS,
  NOTE_EXAMPLES,
  PRODUCT_ICONS,
  type ProjectRequest,
  type Product,
  type Unit,
} from './types';

// ─── Shared primitives ────────────────────────────────────────────────────────

function FieldLabel({ htmlFor, children }: { htmlFor?: string; children: React.ReactNode }) {
  return (
    <label
      htmlFor={htmlFor}
      className="block text-[11px] font-semibold uppercase tracking-widest text-[#8A6D2E] mb-1.5"
    >
      {children}
    </label>
  );
}

function Field({
  id,
  type = 'text',
  placeholder,
  value,
  onChange,
  className = '',
}: {
  id?: string;
  type?: string;
  placeholder?: string;
  value: string;
  onChange: (v: string) => void;
  className?: string;
}) {
  return (
    <input
      id={id}
      type={type}
      inputMode={type === 'number' ? 'decimal' : undefined}
      min={type === 'number' ? '0' : undefined}
      placeholder={placeholder}
      value={value}
      onChange={(e) => onChange(e.target.value)}
      className={`w-full rounded-xl border border-[#E7DEC8] bg-white px-3 py-2.5 text-sm text-[#2B2620] placeholder:text-[#B8AD9A] outline-none transition-colors focus:border-[#C9A227] focus:ring-4 focus:ring-[#F3E9CF]/60 ${className}`}
    />
  );
}

function ProductSelector({
  value,
  onChange,
}: {
  value: Product;
  onChange: (p: Product) => void;
}) {
  return (
    <div role="group" aria-label="Product type" className="flex flex-wrap gap-2">
      {PRODUCTS.map((p) => (
        <button
          key={p}
          type="button"
          onClick={() => onChange(p)}
          className={`inline-flex items-center gap-1.5 rounded-full border px-3.5 py-1.5 text-xs font-semibold transition-all duration-200 ${
            value === p
              ? 'border-[#C9A227] bg-[#FBF3DF] text-[#7A5C1E] shadow-sm'
              : 'border-[#E7DEC8] bg-white text-[#6E6457] hover:border-[#D9C28A] hover:bg-[#FDFAF3]'
          }`}
        >
          <span>{PRODUCT_ICONS[p]}</span> {p}
        </button>
      ))}
    </div>
  );
}

// ─── Card ─────────────────────────────────────────────────────────────────────

interface ProjectRequestCardProps {
  request: ProjectRequest;
  index: number;
  total: number;
  onUpdate: (patch: Partial<ProjectRequest>) => void;
  onDuplicate: () => void;
  onRemove: () => void;
}

export default function ProjectRequestCard({
  request,
  index,
  total,
  onUpdate,
  onDuplicate,
  onRemove,
}: ProjectRequestCardProps) {
  const cardId = `card-${request.id}`;

  return (
    <motion.article
      layout
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -12, scale: 0.97 }}
      transition={{ duration: 0.35, ease: [0.4, 0, 0.2, 1] }}
      aria-label={`Design request ${index + 1}`}
      className="rounded-3xl border border-[#E7DEC8] bg-white shadow-[0_4px_24px_-4px_rgba(43,38,32,0.08)] overflow-hidden"
    >
      {/* ── Card header ──────────────────────────────────────────────────────── */}
      <div className="flex items-center justify-between border-b border-[#F0E9D6] bg-[#FAF7EF] px-6 py-4">
        <div className="flex items-center gap-3">
          <span className="flex h-8 w-8 items-center justify-center rounded-xl bg-[#F3E9CF] text-sm font-bold text-[#8A6D2E]">
            {index + 1}
          </span>
          <span className="text-sm font-semibold text-[#2B2620]">Design Request</span>
        </div>

        <div className="flex items-center gap-1">
          <button
            type="button"
            onClick={onDuplicate}
            title="Duplicate this request"
            className="flex h-8 w-8 items-center justify-center rounded-xl text-[#8A8070] transition-colors hover:bg-[#F3E9CF] hover:text-[#7A5C1E]"
          >
            <Copy className="h-3.5 w-3.5" />
          </button>
          <button
            type="button"
            onClick={onRemove}
            disabled={total === 1}
            title="Remove this request"
            className="flex h-8 w-8 items-center justify-center rounded-xl text-[#8A8070] transition-colors hover:bg-red-50 hover:text-red-500 disabled:cursor-not-allowed disabled:opacity-30"
          >
            <Trash2 className="h-3.5 w-3.5" />
          </button>
        </div>
      </div>

      {/* ── Card body ────────────────────────────────────────────────────────── */}
      <div className="p-6 space-y-5">
        {/* Product type */}
        <div>
          <FieldLabel>Product</FieldLabel>
          <ProductSelector
            value={request.product}
            onChange={(p) => onUpdate({ product: p })}
          />
        </div>

        {/* Image upload + preview */}
        <div>
          <FieldLabel>Artwork / Inspiration</FieldLabel>
          <ImageUploader
            images={request.images}
            onChange={(images) => onUpdate({ images })}
          />
        </div>

        {/* Dimensions */}
        <div>
          <FieldLabel>Dimensions</FieldLabel>
          <div className="grid grid-cols-5 gap-2.5">
            <div className="col-span-2">
              <Field
                id={`${cardId}-width`}
                type="number"
                placeholder="Width"
                value={request.width}
                onChange={(v) => onUpdate({ width: v })}
              />
            </div>
            <div className="col-span-2">
              <Field
                id={`${cardId}-height`}
                type="number"
                placeholder="Height"
                value={request.height}
                onChange={(v) => onUpdate({ height: v })}
              />
            </div>
            <div className="col-span-1">
              <select
                id={`${cardId}-unit`}
                value={request.unit}
                onChange={(e) => onUpdate({ unit: e.target.value as Unit })}
                aria-label="Unit"
                className="w-full rounded-xl border border-[#E7DEC8] bg-white px-2 py-2.5 text-sm text-[#2B2620] outline-none transition-colors focus:border-[#C9A227] focus:ring-4 focus:ring-[#F3E9CF]/60"
              >
                {UNITS.map((u) => (
                  <option key={u.value} value={u.value}>
                    {u.label}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>

        {/* Notes */}
        <div>
          <FieldLabel htmlFor={`${cardId}-notes`}>Notes & Editing Instructions</FieldLabel>
          <textarea
            id={`${cardId}-notes`}
            rows={3}
            placeholder="Describe any edits or special instructions…"
            value={request.notes}
            onChange={(e) => onUpdate({ notes: e.target.value })}
            className="w-full resize-none rounded-xl border border-[#E7DEC8] bg-white px-3 py-2.5 text-sm text-[#2B2620] placeholder:text-[#B8AD9A] outline-none transition-colors focus:border-[#C9A227] focus:ring-4 focus:ring-[#F3E9CF]/60"
          />
          {/* Example chips */}
          <div className="mt-2 flex flex-wrap gap-1.5">
            <span className="text-[10px] font-medium text-[#A89F8C] mr-0.5 self-center">e.g.</span>
            {NOTE_EXAMPLES.map((ex) => (
              <button
                key={ex}
                type="button"
                onClick={() =>
                  onUpdate({ notes: request.notes ? `${request.notes}, ${ex}` : ex })
                }
                className="rounded-full border border-[#E7DEC8] bg-[#FAF7EF] px-2.5 py-1 text-[10px] font-medium text-[#6E6457] hover:border-[#C9A227] hover:bg-[#FBF3DF] hover:text-[#7A5C1E] transition-colors"
              >
                {ex}
              </button>
            ))}
          </div>
        </div>
      </div>
    </motion.article>
  );
}
