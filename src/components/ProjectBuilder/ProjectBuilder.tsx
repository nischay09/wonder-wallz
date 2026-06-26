'use client';

/**
 * ProjectBuilder — Iteration 2
 * Wonder Wallz premium project builder.
 * Full state management, image upload/preview, and live project summary.
 *
 * Component tree:
 *   ProjectBuilder          ← state owner, section shell, layout
 *     ProjectRequestCard    ← one design request (product, images, dims, notes)
 *       ImageUploader       ← multi-image upload + preview + removal
 *     ProjectSummary        ← live breakdown by product type
 */

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from 'framer-motion';
import { Plus } from 'lucide-react';
import ProjectRequestCard from './ProjectRequestCard';
import ProjectSummary from './ProjectSummary';
import ImageUploader from "./ImageUploader";
import {
  makeRequest,
  cloneRequest,
  PRODUCTS,
  UNITS,
  type ProjectRequest,
} from "./types";

export default function ProjectBuilder() {
  // ── State ──────────────────────────────────────────────────────────────────

  const [requests, setRequests] = useState<ProjectRequest[]>([]);

  useEffect(() => {
    setRequests([makeRequest()]);
  }, []);

  // ── Handlers ───────────────────────────────────────────────────────────────

  /** Merge a partial patch into the matching request. */
  function updateRequest(id: string, patch: Partial<ProjectRequest>) {
    setRequests((prev) =>
      prev.map((r) => (r.id === id ? { ...r, ...patch } : r))
    );
  }

  /** Insert a deep copy of the request immediately after the original. */
  function duplicateRequest(id: string) {
    setRequests((prev) => {
      const idx = prev.findIndex((r) => r.id === id);
      if (idx === -1) return prev;
      const clone = cloneRequest(prev[idx]);
      const next = [...prev];
      next.splice(idx + 1, 0, clone);
      return next;
    });
  }

  /** Remove a request — enforces minimum of one. */
  function removeRequest(id: string) {
    setRequests((prev) => (prev.length > 1 ? prev.filter((r) => r.id !== id) : prev));
  }

  /** Append a blank request at the end. */
  function addRequest() {
    setRequests((prev) => [...prev, makeRequest()]);
  }

  // ── Render ─────────────────────────────────────────────────────────────────
  return (
    <section
      aria-labelledby="project-builder-heading"
      className="relative overflow-hidden bg-[#FAF6EE] py-16 lg:py-24"
    >
      {/* Subtle ambient gradient */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_80%_60%_at_50%_-10%,rgba(201,162,39,0.07),transparent)]"
      />

      <div className="relative z-10 mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
        {/* ── Section header ─────────────────────────────────────────────────── */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.55 }}
          className="mb-10 text-center"
        >
          <span className="inline-flex items-center gap-2 rounded-full border border-[#D9C28A]/60 bg-[#FBF3DF] px-4 py-1.5 text-xs font-semibold uppercase tracking-wider text-[#8A6D2E] mb-5">
            Upload your own designs
          </span>
          <h2
            id="project-builder-heading"
            className="font-serif text-4xl font-semibold leading-[1.1] text-[#2B2620] sm:text-5xl"
          >
            Bring Your{' '}
            <span className="bg-gradient-to-r from-[#C9A227] to-[#8A6D2E] bg-clip-text text-transparent">
              Vision to Life
            </span>
          </h2>
          <p className="mt-4 mx-auto max-w-lg text-base leading-relaxed text-[#6E6457]">
            Upload artwork, inspiration images or room photos and we'll prepare a customised
            quotation for your project.
          </p>
        </motion.div>

        {/* ── Request cards ──────────────────────────────────────────────────── */}
        <div className="space-y-5">
          <AnimatePresence mode="popLayout" initial={false}>
            {requests.map((request, i) => (
              <ProjectRequestCard
                key={request.id}
                request={request}
                index={i}
                total={requests.length}
                onUpdate={(patch) => updateRequest(request.id, patch)}
                onDuplicate={() => duplicateRequest(request.id)}
                onRemove={() => removeRequest(request.id)}
              />
            ))}
          </AnimatePresence>
        </div>

        {/* ── Add request button ─────────────────────────────────────────────── */}
        <motion.div layout className="mt-4">
          <button
            type="button"
            onClick={addRequest}
            className="group flex w-full items-center justify-center gap-2.5 rounded-2xl border-2 border-dashed border-[#D9C28A]/70 bg-transparent py-4 text-sm font-semibold text-[#8A6D2E] transition-all duration-200 hover:border-[#C9A227] hover:bg-[#FBF3DF]/60"
          >
            <span className="flex h-6 w-6 items-center justify-center rounded-full bg-[#F3E9CF] transition-transform duration-200 group-hover:scale-110">
              <Plus className="h-3.5 w-3.5" strokeWidth={2.5} />
            </span>
            Add Another Design
          </button>
        </motion.div>

        {/* ── Project summary ────────────────────────────────────────────────── */}
        <div className="mt-8">
          <ProjectSummary requests={requests} />
        </div>
      </div>
    </section>
  );
}
