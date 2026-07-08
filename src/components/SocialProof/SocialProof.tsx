"use client";

import { motion } from "framer-motion";
import TestimonialsMarquee from "./TestimonialsMarquee";

interface SocialProofProps {
  heading?: string;
  subheading?: string;
}

/**
 * Section 2 of the homepage flow. Sits directly after CompletedProjects.
 * Testimonials use generic identities only — never a location or a
 * reference to a specific project photo. Showroom/location cards have
 * been removed in favor of a single scrolling trust strip.
 */
export default function SocialProof({
  heading = "Trusted by Homeowners & Designers",
  subheading = "Real experiences from customers who transformed their spaces with Wonder Wallz.",
}: SocialProofProps) {
  return (
    <section
      aria-labelledby="social-proof-heading"
      className="bg-[#F8F3E9] py-20 sm:py-24"
    >
      <div className="mx-auto max-w-2xl px-6 text-center">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.5, ease: "easeOut" }}
        >
          <h2
            id="social-proof-heading"
            className="font-serif text-3xl text-[#2B2521] sm:text-4xl"
          >
            {heading}
          </h2>
          <p className="mt-3 text-base text-[#7A7264] sm:text-lg">{subheading}</p>
        </motion.div>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 0.5, ease: "easeOut", delay: 0.1 }}
        className="mt-14"
      >
        <TestimonialsMarquee />
      </motion.div>
    </section>
  );
}
