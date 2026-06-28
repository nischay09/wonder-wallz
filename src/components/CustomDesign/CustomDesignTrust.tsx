'use client';

/**
 * CustomDesignTrust
 * Quick credibility row before the project builder.
 */

import { motion } from 'framer-motion';

const TRUST_POINTS = [
  { stat: '20+', label: 'Years Experience' },
  { stat: '2011', label: 'Established' },
  { stat: '2', label: 'Stores in Kolkata' },
  { stat: '\u2713', label: 'Support After Installation' },
];

export default function CustomDesignTrust() {
  return (
    <section
      aria-labelledby="custom-design-trust-heading"
      className="bg-[#FFFDF8] py-14 lg:py-16"
    >
      <h2 id="custom-design-trust-heading" className="sr-only">
        Why Trust Wonder Wallz
      </h2>
      <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.5 }}
          className="grid grid-cols-2 gap-6 rounded-3xl border border-[#D9C28A]/40 bg-[#FAF6EE] px-6 py-10 sm:grid-cols-4"
        >
          {TRUST_POINTS.map((point) => (
            <div key={point.label} className="text-center">
              <p className="font-serif text-2xl font-semibold text-[#8A6D2E] sm:text-3xl">
                {point.stat}
              </p>
              <p className="mt-1 text-xs font-medium leading-snug text-[#6E6457]">
                {point.label}
              </p>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
