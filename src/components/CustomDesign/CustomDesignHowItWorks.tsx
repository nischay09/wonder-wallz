'use client';

/**
 * CustomDesignHowItWorks
 * 5-step custom project journey: Upload → Measurements → Review → Printing → Installation.
 */

import { motion } from 'framer-motion';

const STEPS = [
  { number: 1, title: 'Upload Design', detail: 'Share your artwork, photos or inspiration images.' },
  { number: 2, title: 'Share Measurements', detail: 'Tell us the dimensions of your wall or space.' },
  { number: 3, title: 'Design Review', detail: "Our team reviews and prepares your custom quotation." },
  { number: 4, title: 'Printing', detail: 'Your design is printed using premium HP Latex technology.' },
  { number: 5, title: 'Installation', detail: 'Professional installation, available across West Bengal.' },
];

export default function CustomDesignHowItWorks() {
  return (
    <section
      aria-labelledby="custom-design-how-heading"
      className="bg-[#FAF6EE] py-16 lg:py-20"
    >
      <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
        <motion.h2
          id="custom-design-how-heading"
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.5 }}
          className="text-center font-serif text-2xl font-semibold text-[#2B2620] sm:text-3xl"
        >
          How It Works
        </motion.h2>

        <div className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-5">
          {STEPS.map((step, i) => (
            <motion.div
              key={step.number}
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-40px' }}
              transition={{ duration: 0.45, delay: i * 0.08 }}
              className="flex flex-col items-center text-center"
            >
              <span className="flex h-11 w-11 items-center justify-center rounded-full border-2 border-[#C9A227] font-serif text-lg font-semibold text-[#8A6D2E]">
                {step.number}
              </span>
              <h3 className="mt-4 font-serif text-base font-semibold text-[#2B2620]">
                {step.title}
              </h3>
              <p className="mt-1.5 text-xs leading-relaxed text-[#6E6457]">
                {step.detail}
              </p>

              {i < STEPS.length - 1 && (
                <span
                  aria-hidden
                  className="mt-5 hidden h-px w-full bg-gradient-to-r from-[#D9C28A]/60 to-transparent sm:block"
                />
              )}
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
