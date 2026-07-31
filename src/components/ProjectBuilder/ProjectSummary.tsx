'use client';

/**
 * ProjectSummary
 * Displays a live breakdown of the current project:
 *  - Total design requests
 *  - Wallpaper count
 *  - Custom Glass Film count
 *  - Canvas Print count
 */

import { motion } from 'framer-motion';
import { Layers, Info } from 'lucide-react';
import type { ProjectRequest } from '../../lib/types';
import { getProductionTime, getMaterialById, getDefaultMaterial } from '../../lib/materials';
import {
  toSquareFeet,
  calculateBillableArea,
  isMinBillableAreaApplied,
  calculateEstimatedTotal,
  formatArea,
  formatCurrency,
  PROJECT_BUILDER_MIN_BILLABLE_AREA_NOTE,
} from '../../lib/estimator';

interface ProjectSummaryProps {
  requests: ProjectRequest[];
}

function SummaryStat({
  label,
  value,
  note,
  highlight,
}: {
  label: string;
  value: string | number;
  note?: string;
  highlight?: boolean;
}) {
  return (
    <div className="flex flex-col gap-0.5 px-5 py-4">
      <span className="text-[10px] font-semibold uppercase tracking-widest text-[#8A6D2E]">
        {label}
      </span>
      <span
        className={`text-base font-bold leading-tight ${
          highlight && value !== '—' && value !== 0 ? 'text-[#C9A227]' : 'text-[#2B2620]'
        }`}
      >
        {value}
      </span>
      {note && <span className="text-[10px] text-[#A89F8C]">{note}</span>}
    </div>
  );
}

export default function ProjectSummary({ requests }: ProjectSummaryProps) {
  const total = requests.length;
  const wallpapers = requests.filter((r) => r.product === 'Wallpaper').length;
  const glassFilms = requests.filter((r) => r.product === 'Custom Glass Film').length;
  const canvasRequests = requests.filter((r) => r.product === 'Canvas Print');
  const canvasPrints = canvasRequests.length;

  /**
   * Summary note for the Canvas Prints stat. Shows the finish when every
   * canvas request shares the same one; otherwise shows a count of
   * distinct finishes so the note never misrepresents a mixed selection.
   */
  const canvasFinishNote = (() => {
    if (canvasPrints === 0) return undefined;
    const distinctFinishes = Array.from(new Set(canvasRequests.map((r) => r.canvasFinish)));
    if (distinctFinishes.length === 1) return distinctFinishes[0];
    return `${distinctFinishes.length} finishes selected`;
  })();

  /**
   * Aggregate area/pricing across every request. Each request is floored at
   * the Project Builder's universal 25 sq ft minimum billable area
   * individually (each design is produced/billed as its own item), then the
   * per-request figures are summed for the summary totals.
   */
  const { actualAreaSqFt, billableAreaSqFt, estimatedTotal, minAreaAppliedAnywhere } = requests.reduce(
    (acc, r) => {
      const coverage = toSquareFeet(parseFloat(r.width), parseFloat(r.height), r.unit);
      if (!coverage || coverage <= 0) return acc;

      const billable = calculateBillableArea(coverage, r.product);
      const material = getMaterialById(r.product, r.materialId) ?? getDefaultMaterial(r.product);
      const total = calculateEstimatedTotal(billable, material);
      const minApplied = isMinBillableAreaApplied(coverage, r.product);

      return {
        actualAreaSqFt: acc.actualAreaSqFt + coverage,
        billableAreaSqFt: acc.billableAreaSqFt + billable,
        estimatedTotal: acc.estimatedTotal + total,
        minAreaAppliedAnywhere: acc.minAreaAppliedAnywhere || minApplied,
      };
    },
    { actualAreaSqFt: 0, billableAreaSqFt: 0, estimatedTotal: 0, minAreaAppliedAnywhere: false }
  );

  const hasAnyArea = actualAreaSqFt > 0;

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: 0.1 }}
      className="rounded-3xl border border-[#E7DEC8] bg-[#FAF7EF] shadow-[0_4px_24px_-4px_rgba(43,38,32,0.06)] overflow-hidden"
    >
      {/* Header */}
      <div className="flex items-center gap-3 border-b border-[#EDE3CB] px-6 py-4">
        <span className="flex h-8 w-8 items-center justify-center rounded-xl bg-[#F3E9CF]">
          <Layers className="h-4 w-4 text-[#8A6D2E]" strokeWidth={1.75} />
        </span>
        <span className="text-sm font-semibold text-[#2B2620]">Project Summary</span>
      </div>

      {/* Stats grid — 2 rows × 2 cols on small screens, single row of 4 on md+ */}
      <div className="grid grid-cols-2 divide-x divide-y divide-[#EDE3CB] md:grid-cols-4 md:divide-y-0">
        <SummaryStat label="Total Requests" value={total} />
        <SummaryStat
          label="Wallpapers"
          value={wallpapers === 0 ? '—' : wallpapers}
          note={wallpapers > 0 ? getProductionTime('Wallpaper') : undefined}
          highlight
        />
        <SummaryStat
          label="Glass Films"
          value={glassFilms === 0 ? '—' : glassFilms}
          note={glassFilms > 0 ? getProductionTime('Custom Glass Film') : undefined}
          highlight
        />
        <SummaryStat
          label="Canvas Prints"
          value={canvasPrints === 0 ? '—' : canvasPrints}
          note={
            canvasPrints > 0
              ? [getProductionTime('Canvas Print'), canvasFinishNote].filter(Boolean).join(' · ')
              : undefined
          }
          highlight
        />
      </div>

      {/* Area & pricing totals across all design requests */}
      {hasAnyArea && (
        <>
          <div className="grid grid-cols-2 divide-x divide-y divide-[#EDE3CB] border-t border-[#EDE3CB] md:grid-cols-3 md:divide-y-0">
            <SummaryStat label="Actual Area" value={formatArea(actualAreaSqFt)} />
            <SummaryStat label="Billable Area" value={formatArea(billableAreaSqFt)} highlight />
            <SummaryStat
              label="Estimated Total"
              value={formatCurrency(estimatedTotal)}
              highlight
              note="Excludes GST, coupons & offers"
            />
          </div>

          {minAreaAppliedAnywhere && (
            <p className="flex items-start gap-1.5 border-t border-[#EDE3CB] px-6 py-3 text-[11px] leading-relaxed text-[#8A6D2E]">
              <Info className="mt-0.5 h-3 w-3 flex-shrink-0" />
              {PROJECT_BUILDER_MIN_BILLABLE_AREA_NOTE}
            </p>
          )}
        </>
      )}
    </motion.div>
  );
}
