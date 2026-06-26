"use client";

import { motion } from "framer-motion";
import Testimonials from "./Testimonials";
import StoreLocations from "./StoreLocations";

interface SocialProofProps {
  /** Allows the headline to be swapped per-page without touching layout. */
  heading?: string;
  subheading?: string;
}

/**
 * Homepage section combining customer testimonials with showroom locations,
 * positioned after WallTransformations and before FAQ.
 *
 * Layout: two columns on desktop (testimonials left, stores right),
 * stacked vertically on mobile.
 */
export default function SocialProof({
  heading = "Loved by Homeowners Across Kolkata",
  subheading = "Real customer experiences and visitable Wonder Wallz showrooms.",
}: SocialProofProps) {
  return (
    <section
      aria-labelledby="social-proof-heading"
      className="bg-[#F8F3E9] px-6 py-20 sm:py-24"
    >
      <div className="mx-auto max-w-6xl">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          className="mx-auto max-w-2xl text-center"
        >
          <h2
            id="social-proof-heading"
            className="font-serif text-3xl text-[#2B2521] sm:text-4xl"
          >
            {heading}
          </h2>
          <p className="mt-3 text-base text-[#7A7264] sm:text-lg">{subheading}</p>
        </motion.div>

        <div className="mt-14 grid grid-cols-1 gap-10 lg:grid-cols-2 lg:gap-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.5, ease: "easeOut", delay: 0.1 }}
          >
            <Testimonials />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.5, ease: "easeOut", delay: 0.2 }}
          >
            <StoreLocations />
          </motion.div>
        </div>
      </div>
    </section>
  );
}
