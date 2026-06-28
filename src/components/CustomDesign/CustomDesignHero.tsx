'use client';

/**
 * CustomDesignHero
 * Premium hero for /custom-design.
 * Matches the Wonder Wallz cream + warm-gold design language.
 */

import { motion } from 'framer-motion';
import { ArrowDown } from 'lucide-react';

export default function CustomDesignHero() {
  return (
    <section
      aria-labelledby="custom-design-hero-heading"
      className="relative overflow-hidden bg-[#FAF6EE] pt-32 pb-20 lg:pt-40 lg:pb-28"
    >
      {/* Ambient gradient — consistent with ProjectBuilder section */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_80%_60%_at_50%_-10%,rgba(201,162,39,0.10),transparent)]"
      />

      <div className="relative z-10 mx-auto max-w-3xl px-4 text-center sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55 }}
        >
          <span className="inline-flex items-center gap-2 rounded-full border border-[#D9C28A]/60 bg-[#FBF3DF] px-4 py-1.5 text-xs font-semibold uppercase tracking-wider text-[#8A6D2E]">
            Custom Design
          </span>

          <h1
            id="custom-design-hero-heading"
            className="mt-5 font-serif text-4xl font-semibold leading-[1.1] text-[#2B2620] sm:text-5xl lg:text-6xl"
          >
            Create Your Own{' '}
            <span className="bg-gradient-to-r from-[#C9A227] to-[#8A6D2E] bg-clip-text text-transparent">
              Wallpaper
            </span>
          </h1>

          <p className="mx-auto mt-5 max-w-xl text-base leading-relaxed text-[#6E6457] sm:text-lg">
            Turn your own artwork, photos or inspiration into premium custom wallpaper
            printed using HP Latex technology.
          </p>

          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55, delay: 0.15 }}
            className="mt-9"
          >
            <a
              href="#start-project"
              className="group inline-flex items-center gap-2.5 rounded-full bg-gradient-to-r from-[#C9A227] to-[#8A6D2E] px-8 py-3.5 text-sm font-semibold text-white shadow-[0_8px_24px_rgba(154,118,30,0.28)] transition-transform duration-200 hover:scale-[1.03]"
            >
              Start Your Project
              <motion.span
                animate={{ y: [0, 3, 0] }}
                transition={{ duration: 1.4, repeat: Infinity, ease: 'easeInOut' }}
                className="flex items-center"
              >
                <ArrowDown className="h-4 w-4" />
              </motion.span>
            </a>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
