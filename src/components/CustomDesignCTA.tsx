"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, Ruler, MessageSquareText, ScanEye } from "lucide-react";

const trustPoints = [
  { label: "Any Wall Size", icon: Ruler },
  { label: "Free Design Consultation", icon: MessageSquareText },
  { label: "Print Preview Before Production", icon: ScanEye },
];

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: (delay: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, delay, ease: [0.22, 1, 0.36, 1] },
  }),
};

export default function CustomDesignCTA() {
  return (
    <section
      aria-labelledby="custom-design-heading"
      className="w-full bg-[#F4F1EA]"
    >
      <div className="mx-auto max-w-6xl px-6 py-10 sm:py-12 lg:py-14">
        <div className="flex flex-col-reverse items-center gap-8 lg:flex-row lg:gap-10">
          {/* Content — 60% */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.4 }}
            variants={fadeUp}
            custom={0}
            className="w-full lg:w-[58%]"
          >
            <p className="text-xs font-semibold tracking-[0.2em] text-[#B8763E]">
              CUSTOM DESIGN
            </p>

            <h2
              id="custom-design-heading"
              className="mt-3 font-serif text-3xl leading-tight text-stone-900 sm:text-4xl"
            >
              Bring Your Vision to Life
            </h2>

            <p className="mt-4 max-w-md text-[15px] leading-relaxed text-stone-600">
              Have a Pinterest inspiration, Shutterstock artwork, AI-generated
              image or your own photograph? We&apos;ll prepare it for
              large-format printing and customise it to your exact wall
              dimensions.
            </p>

            <motion.div
              whileHover={{ y: -2 }}
              whileTap={{ scale: 0.98 }}
              transition={{ type: "spring", stiffness: 300, damping: 20 }}
              className="mt-6 inline-block"
            >
              <Link
                href="/custom-design"
                className="group inline-flex items-center gap-2 rounded-full bg-stone-900 px-6 py-3 text-sm font-medium text-white shadow-sm transition-colors hover:bg-stone-800 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-stone-900"
              >
                Start Your Custom Project
                <ArrowRight
                  className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5"
                  aria-hidden="true"
                />
              </Link>
            </motion.div>

            <ul className="mt-6 flex flex-wrap gap-x-6 gap-y-2">
              {trustPoints.map(({ label, icon: Icon }) => (
                <li
                  key={label}
                  className="flex items-center gap-1.5 text-xs text-stone-500"
                >
                  <Icon className="h-3.5 w-3.5 text-[#B8763E]" aria-hidden="true" />
                  {label}
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Image — 40% */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.4 }}
            variants={fadeUp}
            custom={0.15}
            className="w-full lg:w-[42%]"
          >
            <div className="relative aspect-[4/3] w-full overflow-hidden rounded-2xl shadow-lg sm:aspect-[16/10] lg:aspect-[4/3]">
              <Image
                src="/images/custom-design-lifestyle.jpeg"
                alt="A custom wallpaper made from a customer's own photograph, installed in a living room"
                fill
                sizes="(min-width: 1024px) 42vw, 100vw"
                className="object-cover"
                priority={false}
              />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
