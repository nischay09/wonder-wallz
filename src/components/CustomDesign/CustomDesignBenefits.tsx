'use client';

/**
 * CustomDesignBenefits
 * Checklist of reasons to choose a custom Wonder Wallz project.
 */

import { motion } from 'framer-motion';
import { Check } from 'lucide-react';

const BENEFITS = [
  'Upload your own image',
  'Pinterest / Shutterstock references',
  'AI generated artwork',
  'Premium HP Latex Printing',
  'Free design consultation',
  'Pan India delivery',
];

export default function CustomDesignBenefits() {
  return (
    <section
      aria-labelledby="custom-design-benefits-heading"
      className="bg-[#FFFDF8] py-16 lg:py-20"
    >
      <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
        <motion.h2
          id="custom-design-benefits-heading"
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.5 }}
          className="text-center font-serif text-2xl font-semibold text-[#2B2620] sm:text-3xl"
        >
          Why Go Custom
        </motion.h2>

        <div className="mt-10 grid grid-cols-1 gap-3 sm:grid-cols-2">
          {BENEFITS.map((benefit, i) => (
            <motion.div
              key={benefit}
              initial={{ opacity: 0, y: 14 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-40px' }}
              transition={{ duration: 0.4, delay: i * 0.06 }}
              className="flex items-center gap-3 rounded-2xl border border-[#D9C28A]/40 bg-[#FAF6EE] px-5 py-4"
            >
              <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-[#C9A227] to-[#8A6D2E] text-white">
                <Check className="h-4 w-4" strokeWidth={2.5} />
              </span>
              <span className="text-sm font-medium leading-snug text-[#2B2620]">
                {benefit}
              </span>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
