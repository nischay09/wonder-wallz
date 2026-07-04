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
import { Layers } from 'lucide-react';
import type { ProjectRequest } from '../../lib/types';
import { getProductionTime } from '../../lib/materials';

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
          highlight && Number(value) > 0 ? 'text-[#C9A227]' : 'text-[#2B2620]'
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
  const canvasPrints = requests.filter((r) => r.product === 'Canvas Print').length;

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
          note={canvasPrints > 0 ? getProductionTime('Canvas Print') : undefined}
          highlight
        />
      </div>
    </motion.div>
  );
}
