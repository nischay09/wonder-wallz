"use client";

import Link from "next/link";
import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { Instagram, ArrowRight } from "lucide-react";
import { FaPinterest } from "react-icons/fa";

// Brand palette derived from logo
const brand = {
  bg:           "#0F0F1A",   // very deep navy-black
  bgAlt:        "#16162A",   // subtle card tint
  teal:         "#00B5A3",   // primary brand teal
  tealDim:      "rgba(0,181,163,0.15)",
  purple:       "#7B2FBE",   // brand purple
  purpleDim:    "rgba(123,47,190,0.15)",
  orange:       "#FF7A00",   // brand orange
  orangeDim:    "rgba(255,122,0,0.12)",
  white:        "#FFFFFF",
  textMid:      "rgba(255,255,255,0.55)",
  textDim:      "rgba(255,255,255,0.35)",
  divider:      "rgba(0,181,163,0.18)",
};

const footerColumns = [
  {
    heading: "Shop",
    links: [
      { label: "All Collections", href: "/collections" },
      { label: "Murals",          href: "/murals" },
      { label: "Textures",        href: "/textures" },
      { label: "New Arrivals",    href: "/new" },
      { label: "Sale",            href: "/sale" },
    ],
  },
  {
    heading: "Discover",
    links: [
      { label: "Lookbook",           href: "/lookbook" },
      { label: "The Journal",        href: "/journal" },
      { label: "Trade Program",      href: "/trade" },
      { label: "About Wonder Wallz", href: "/about" },
    ],
  },
  {
    heading: "Support",
    links: [
      { label: "Shipping & Returns", href: "/shipping" },
      { label: "Installation Guide", href: "/installation" },
      { label: "FAQs",               href: "/faqs" },
      { label: "Contact Us",         href: "/contact" },
    ],
  },
];

const socialLinks = [
  { label: "Instagram", href: "https://instagram.com", Icon: Instagram },
  { label: "Pinterest",  href: "https://pinterest.com", Icon: FaPinterest },
];

const fadeUp = {
  hidden:  { opacity: 0, y: 24 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.1, duration: 0.55, ease: "easeOut" },
  }),
};

export function Footer() {
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <footer
      ref={ref}
      className="relative overflow-hidden"
      style={{ backgroundColor: brand.bg }}
      aria-labelledby="footer-heading"
    >
      <h2 id="footer-heading" className="sr-only">Footer navigation</h2>

      {/* Subtle gradient orbs for depth */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0"
        style={{
          background: `
            radial-gradient(ellipse 600px 400px at -10% 110%, ${brand.tealDim} 0%, transparent 70%),
            radial-gradient(ellipse 500px 350px at 110% 80%, ${brand.purpleDim} 0%, transparent 70%)
          `,
        }}
      />

      {/* Top section */}
      <div className="relative mx-auto max-w-7xl px-6 md:px-10 lg:px-16 pt-16 md:pt-24 pb-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12 lg:gap-8">

          {/* Brand column */}
          <motion.div
            className="lg:col-span-2"
            custom={0}
            variants={fadeUp}
            initial="hidden"
            animate={inView ? "visible" : "hidden"}
          >
            {/* Logo — text mark matching brand identity */}
            <Link href="/" className="inline-flex items-baseline gap-1 mb-6" aria-label="Wonder Wallz home">
              <span
                className="text-2xl font-bold leading-none"
                style={{ color: brand.teal, letterSpacing: "-0.02em", fontFamily: "sans-serif" }}
              >
                Wonder
              </span>
              <span
                className="text-2xl font-bold leading-none"
                style={{ color: brand.orange, letterSpacing: "-0.02em", fontFamily: "sans-serif" }}
              >
                Wallz
              </span>
            </Link>

            <p
              className="text-sm leading-relaxed max-w-xs mb-8"
              style={{ color: brand.textMid }}
            >
              Statement wallpapers for spaces that refuse to be ordinary. Every roll tells a story.
            </p>

            {/* Newsletter */}
            <p
              className="text-xs font-semibold uppercase tracking-[0.15em] mb-3"
              style={{ color: brand.teal }}
            >
              Get the Journal
            </p>
            <div className="flex items-center max-w-xs">
              <input
                type="email"
                placeholder="your@email.com"
                aria-label="Email for newsletter"
                className="flex-1 px-4 py-2.5 text-sm bg-transparent border rounded-l-full outline-none transition-colors duration-200"
                style={{
                  borderColor: "rgba(0,181,163,0.3)",
                  color: brand.white,
                }}
                onFocus={e => (e.currentTarget.style.borderColor = brand.teal)}
                onBlur={e  => (e.currentTarget.style.borderColor = "rgba(0,181,163,0.3)")}
              />
              <motion.button
                aria-label="Subscribe to newsletter"
                className="flex items-center justify-center w-10 h-10 rounded-r-full shrink-0"
                style={{ backgroundColor: brand.orange, color: brand.white }}
                whileHover={{ backgroundColor: "#FF9333" }}
                whileTap={{ scale: 0.94 }}
                transition={{ duration: 0.15 }}
              >
                <ArrowRight size={15} />
              </motion.button>
            </div>
          </motion.div>

          {/* Nav columns */}
          {footerColumns.map((col, colIndex) => (
            <motion.div
              key={col.heading}
              custom={colIndex + 1}
              variants={fadeUp}
              initial="hidden"
              animate={inView ? "visible" : "hidden"}
            >
              <p
                className="text-[10px] font-semibold uppercase tracking-[0.2em] mb-5"
                style={{ color: brand.teal }}
              >
                {col.heading}
              </p>
              <ul role="list" className="space-y-3">
                {col.links.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="text-sm transition-colors duration-200"
                      style={{ color: brand.textMid }}
                      onMouseEnter={e => (e.currentTarget.style.color = brand.orange)}
                      onMouseLeave={e => (e.currentTarget.style.color = brand.textMid)}
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Teal divider */}
      <div
        className="mx-6 md:mx-10 lg:mx-16"
        style={{ height: "1px", backgroundColor: brand.divider }}
      />

      {/* Bottom bar */}
      <motion.div
        className="relative mx-auto max-w-7xl px-6 md:px-10 lg:px-16 py-6 flex flex-col md:flex-row items-center justify-between gap-4"
        custom={4}
        variants={fadeUp}
        initial="hidden"
        animate={inView ? "visible" : "hidden"}
      >
        <p className="text-xs" style={{ color: brand.textDim }}>
          © {new Date().getFullYear()} Wonder Wallz. All rights reserved.
        </p>

        <div className="flex items-center gap-6">
          {/* Legal links */}
          <div className="flex gap-5">
            {["Privacy Policy", "Terms of Use", "Cookie Settings"].map((label) => (
              <Link
                key={label}
                href={`/${label.toLowerCase().replace(/\s+/g, "-")}`}
                className="text-xs transition-colors duration-200"
                style={{ color: brand.textDim }}
                onMouseEnter={e => (e.currentTarget.style.color = brand.white)}
                onMouseLeave={e => (e.currentTarget.style.color = brand.textDim)}
              >
                {label}
              </Link>
            ))}
          </div>

          {/* Social icons */}
          <div className="flex items-center gap-3" aria-label="Social media links">
            {socialLinks.map(({ label, href, Icon }) => (
              <motion.a
                key={label}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={label}
                className="flex items-center justify-center w-8 h-8 rounded-full"
                style={{
                  color: brand.textMid,
                  border: `1px solid rgba(0,181,163,0.25)`,
                }}
                whileHover={{
                  color: brand.teal,
                  borderColor: brand.teal,
                  backgroundColor: brand.tealDim,
                }}
                whileTap={{ scale: 0.9 }}
                transition={{ duration: 0.15 }}
              >
                <Icon size={13} />
              </motion.a>
            ))}
          </div>
        </div>
      </motion.div>

      {/* Background watermark — brand teal tint */}
      <div
        className="pointer-events-none select-none absolute bottom-0 right-0 font-bold leading-none overflow-hidden"
        style={{
          fontSize: "clamp(6rem, 18vw, 14rem)",
          color: "rgba(0,181,163,0.04)",
          transform: "translate(10%, 20%)",
          letterSpacing: "-0.04em",
          fontFamily: "sans-serif",
        }}
        aria-hidden="true"
      >
        WW
      </div>
    </footer>
  );
}
