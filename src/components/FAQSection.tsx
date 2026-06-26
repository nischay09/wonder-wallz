"use client";

/**
 * Wonder Wallz — FAQ Section
 * -----------------------------------------------------------------------
 * Two-column layout:
 *   Desktop:  [ FAQ accordion ]  [ "Why Wonder Wallz?" card ]
 *   Mobile:   FAQ accordion, then About card below.
 *
 * Drop this in as the replacement for the existing FAQ section
 * (e.g. components/FAQSection.tsx) and render <FAQSection /> in its
 * place on the homepage. No other section should need to change.
 *
 * Dependencies expected in the project:
 *   - framer-motion
 *   - lucide-react   (npm install lucide-react, if not already present)
 *
 * Fonts: this component assumes a display serif is available as
 * `font-serif` and a clean sans as the default body font. If your
 * tailwind.config does not yet map `font-serif` to an editorial serif,
 * load one (e.g. Fraunces) via next/font/google in your root layout:
 *
 *   import { Fraunces, Inter } from "next/font/google";
 *   const fraunces = Fraunces({ subsets: ["latin"], variable: "--font-serif" });
 *   const inter = Inter({ subsets: ["latin"], variable: "--font-sans" });
 *
 * and extend tailwind.config theme.fontFamily.serif / .sans accordingly.
 * Until then, this component falls back gracefully to system serif/sans.
 */

import { useId, useState } from "react";
import { AnimatePresence, motion, useReducedMotion, type Variants } from "framer-motion";
import { ChevronDown, MapPin, Sparkles } from "lucide-react";

// WhatsApp SVG icon — inline so no external dep is needed
function WhatsAppIcon({ className }: { className?: string }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="currentColor"
      className={className}
      aria-hidden="true"
    >
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
    </svg>
  );
}

// ---------------------------------------------------------------------------
// Content
// ---------------------------------------------------------------------------

interface FAQItem {
  question: string;
  answer: string;
}

const FAQ_ITEMS: FAQItem[] = [
  {
    question: "How do I place an order?",
    answer:
      "Visit either of our stores or get in touch with our design team online. Share your space, your style and your budget, and we'll take it from there — guiding you through products, finalising details, and scheduling measurement or installation as needed.",
  },
  {
    question: "Do you install outside West Bengal?",
    answer:
      "Our installation team currently works only within West Bengal. Outside the state, we're happy to deliver any of our products across India for installation through your local team.",
  },
  {
    question: "How are customised wallpapers ordered?",
    answer:
      "Share your space and your vision with our designers, in-store or online. Once your custom wallpaper, glass film or canvas print is finalised, we collect advance payment to begin production, since these pieces are made specifically for you and cannot be resold or refunded.",
  },
  {
    question:
      "How do measurements work for blinds, curtains, flooring and other non-custom products?",
    answer:
      "Our installer visits your home to measure your space accurately before anything is finalised. There's no payment required at this stage — we simply want to be certain of the fit before any work begins.",
  },
  {
    question: "When do I need to pay?",
    answer:
      "For custom wallpapers, glass films and canvas prints, advance payment is required before production starts, as these are made exclusively for you. For non-custom products — blinds, curtains, readymade wallpapers and flooring — you can pay after installation is complete.",
  },
  {
    question: "How long does installation take?",
    answer:
      "Most non-custom installations are completed within about 48 hours of measurement. Custom pieces are scheduled for installation as soon as production is finished and ready.",
  },
  {
    question: "Do you provide after-installation support?",
    answer:
      "Always. Our relationship with you doesn't end when the installation does. If you need care advice, an adjustment, or simply have a question later on, our team remains just a call away.",
  },
  {
    question: "Can I upload my own design?",
    answer:
      "Yes — bring us your own artwork, photograph or inspiration, and our design team will help translate it into a custom wallpaper, glass film or canvas print, printed in premium HP Latex quality for true-to-life colour and detail.",
  },
];

interface StoreInfo {
  name: string;
  tagline: string;
  items: string[];
  accent: "brass" | "terracotta";
}

const STORES: StoreInfo[] = [
  {
    name: "Wonder Wallz — Chandni Chowk",
    tagline: "For custom work & design consultation",
    items: ["Custom Wallpapers", "Custom Glass Films", "Canvas Prints", "Design Consultation"],
    accent: "brass",
  },
  {
    name: "Wonder Wallz — Merlin Homeland Mall (2nd Floor)",
    tagline: "For blinds, curtains, flooring & more",
    items: [
      "Blinds",
      "Curtains",
      "Flooring",
      "Readymade Wallpapers",
      "Home Interior Products",
    ],
    accent: "terracotta",
  },
];

// ---------------------------------------------------------------------------
// Motion variants
// ---------------------------------------------------------------------------

const listVariants: Variants = {
  hidden: {},
  show: {
    transition: { staggerChildren: 0.07, delayChildren: 0.05 },
  },
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 14 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] } },
};

// ---------------------------------------------------------------------------
// Accordion row
// ---------------------------------------------------------------------------

function AccordionRow({
  item,
  isOpen,
  onToggle,
}: {
  item: FAQItem;
  isOpen: boolean;
  onToggle: () => void;
}) {
  const reactId = useId();
  const buttonId = `faq-trigger-${reactId}`;
  const panelId = `faq-panel-${reactId}`;
  const prefersReducedMotion = useReducedMotion();

  return (
    <motion.div
      variants={itemVariants}
      className="group relative overflow-hidden rounded-[24px] border border-[#E5DBC7] bg-[#FBF8F1] shadow-[0_1px_2px_rgba(43,30,16,0.04)] transition-shadow duration-300 hover:shadow-[0_8px_24px_rgba(43,30,16,0.07)]"
    >
      {/* Signature "unrolling" accent bar */}
      <motion.span
        aria-hidden="true"
        className="absolute left-0 top-0 w-[3px] origin-top bg-[#B6883E]"
        initial={false}
        animate={{ scaleY: isOpen ? 1 : 0, opacity: isOpen ? 1 : 0 }}
        style={{ height: "100%" }}
        transition={
          prefersReducedMotion
            ? { duration: 0.01 }
            : { duration: 0.45, ease: [0.22, 1, 0.36, 1] }
        }
      />

      <h3 className="m-0">
        <button
          id={buttonId}
          type="button"
          aria-expanded={isOpen}
          aria-controls={panelId}
          onClick={onToggle}
          className="flex w-full items-center justify-between gap-4 px-6 py-5 text-left focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#B6883E] focus-visible:ring-offset-2 focus-visible:ring-offset-[#FBF8F1] sm:px-7 sm:py-6"
        >
          <span className="font-serif text-[1.03rem] leading-snug text-[#2C2620] sm:text-[1.1rem]">
            {item.question}
          </span>
          <motion.span
            aria-hidden="true"
            animate={{ rotate: isOpen ? 180 : 0 }}
            transition={
              prefersReducedMotion ? { duration: 0.01 } : { duration: 0.35, ease: "easeOut" }
            }
            className="flex h-8 w-8 flex-none items-center justify-center rounded-full bg-[#F1EADA] text-[#8A6A30]"
          >
            <ChevronDown className="h-4 w-4" strokeWidth={2.25} />
          </motion.span>
        </button>
      </h3>

      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            id={panelId}
            role="region"
            aria-labelledby={buttonId}
            key="content"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={
              prefersReducedMotion
                ? { duration: 0.01 }
                : { duration: 0.4, ease: [0.22, 1, 0.36, 1] }
            }
            className="overflow-hidden"
          >
            <p className="px-6 pb-6 pl-6 pr-8 text-[0.95rem] leading-relaxed text-[#5B5247] sm:px-7 sm:pb-7 sm:pl-7">
              {item.answer}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

// ---------------------------------------------------------------------------
// Store card
// ---------------------------------------------------------------------------

function StoreCard({ store }: { store: StoreInfo }) {
  const accentColor = store.accent === "brass" ? "#B6883E" : "#B6573A";
  const accentBg = store.accent === "brass" ? "#F1EADA" : "#F6E4DC";

  return (
    <div className="relative rounded-[20px] border border-[#E5DBC7] bg-white/60 p-5 transition-colors duration-300 hover:border-[#D9C8A4]">
      <div className="flex items-start gap-3">
        <span
          className="flex h-9 w-9 flex-none items-center justify-center rounded-full"
          style={{ backgroundColor: accentBg, color: accentColor }}
        >
          <MapPin className="h-4 w-4" strokeWidth={2.25} />
        </span>
        <div className="min-w-0">
          <p className="font-serif text-[0.98rem] leading-snug text-[#2C2620]">{store.name}</p>
          <p className="mt-0.5 text-[0.8rem] text-[#8A7E6E]">{store.tagline}</p>
        </div>
      </div>

      <ul className="mt-4 flex flex-wrap gap-2">
        {store.items.map((label) => (
          <li
            key={label}
            className="rounded-full border border-[#E5DBC7] bg-[#FBF8F1] px-3 py-1 text-[0.74rem] font-medium tracking-wide text-[#5B5247]"
          >
            {label}
          </li>
        ))}
      </ul>
    </div>
  );
}

// ---------------------------------------------------------------------------
// Main section
// ---------------------------------------------------------------------------

export default function FAQSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);
  const prefersReducedMotion = useReducedMotion();

  return (
    <section className="bg-[#F8F4EC] px-4 py-20 sm:px-6 sm:py-28 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <div className="grid grid-cols-1 gap-10 lg:grid-cols-[1.12fr_1fr] lg:gap-8">
          {/* ----------------------------------------------------------- */}
          {/* LEFT — FAQ accordion                                        */}
          {/* ----------------------------------------------------------- */}
          <div className="order-1">
            <motion.div
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={
                prefersReducedMotion ? { duration: 0.01 } : { duration: 0.6, ease: [0.22, 1, 0.36, 1] }
              }
              className="mb-8"
            >
              <span className="inline-flex items-center gap-2 text-[0.74rem] font-semibold uppercase tracking-[0.18em] text-[#B6573A]">
                <Sparkles className="h-3.5 w-3.5" strokeWidth={2.25} />
                Frequently Asked Questions
              </span>
              <h2 className="mt-3 font-serif text-3xl leading-tight text-[#2C2620] sm:text-4xl">
                Everything you need to know
              </h2>
              <p className="mt-3 max-w-md text-[0.97rem] leading-relaxed text-[#6B5F50]">
                From ordering to after-care, here's how working with Wonder Wallz
                actually goes.
              </p>
            </motion.div>

            <motion.div
              variants={listVariants}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, margin: "-60px" }}
              className="flex flex-col gap-4"
            >
              {FAQ_ITEMS.map((item, index) => (
                <AccordionRow
                  key={item.question}
                  item={item}
                  isOpen={openIndex === index}
                  onToggle={() => setOpenIndex((prev) => (prev === index ? null : index))}
                />
              ))}
            </motion.div>
          </div>

          {/* ----------------------------------------------------------- */}
          {/* RIGHT — Why Wonder Wallz? card                               */}
          {/* ----------------------------------------------------------- */}
          <div className="order-2">
            <motion.div
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={
                prefersReducedMotion ? { duration: 0.01 } : { duration: 0.6, ease: [0.22, 1, 0.36, 1], delay: 0.1 }
              }
              className="lg:sticky lg:top-24 overflow-hidden rounded-[24px] border border-[#E5DBC7] bg-[#FBF8F1] shadow-[0_4px_16px_rgba(43,30,16,0.05)]"
            >
              <div className="p-7 sm:p-9">
                <span className="text-[0.74rem] font-semibold uppercase tracking-[0.18em] text-[#B6883E]">
                  Our Craft
                </span>
                <h2 className="mt-3 font-serif text-3xl leading-tight text-[#2C2620] sm:text-[2.1rem]">
                  Why Wonder Wallz?
                </h2>

                <div className="mt-5 space-y-4 text-[0.96rem] leading-relaxed text-[#5B5247]">
                  <p>
                    Every wall holds a story before a single word is said. At
                    Wonder Wallz, that story is shaped by Vikash Sharma and
                    Vishal Sharma — two craftsmen whose combined twenty-plus
                    years in the trade live in the details most people never
                    think to notice: a clean seam, a true finish, the way
                    light moves across a print.
                  </p>
                  <p>
                    We work across premium wallpapers, custom wall murals,
                    glass films, blinds, curtains and flooring, printed with
                    HP Latex technology for colour and texture that hold
                    their richness for years, not seasons. Every installation
                    is carried out by our own trained team — and every
                    relationship continues well past the final panel,
                    because a beautifully dressed room deserves ongoing
                    care, not a one-time sale.
                  </p>
                </div>

                {/* Divider */}
                <div className="my-7 h-px w-full bg-[#E5DBC7]" />

                {/* Visit Our Stores */}
                <span className="text-[0.74rem] font-semibold uppercase tracking-[0.18em] text-[#B6573A]">
                  Visit Our Stores
                </span>
                <div className="mt-4 flex flex-col gap-3">
                  {STORES.map((store) => (
                    <StoreCard key={store.name} store={store} />
                  ))}
                </div>
              </div>

              {/* CTA */}
              <div className="bg-[#2C2620] px-7 py-8 sm:px-9 sm:py-9">
                <h3 className="font-serif text-2xl leading-snug text-[#F8F4EC]">
                  Still Have Questions?
                </h3>
                <p className="mt-2 text-[0.88rem] leading-relaxed text-[#D9CEBB]">
                  Chat with our design experts on WhatsApp for a free consultation. We'll help you
                  choose the right products, answer your questions and guide you through the entire
                  process—no obligation.
                </p>
                <motion.a
                  href="https://wa.me/919999999999"
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={prefersReducedMotion ? undefined : { y: -2 }}
                  whileTap={prefersReducedMotion ? undefined : { scale: 0.98 }}
                  className="mt-5 inline-flex items-center gap-2.5 rounded-full bg-[#25D366] px-6 py-3 text-[0.92rem] font-semibold text-white shadow-[0_6px_18px_rgba(37,211,102,0.30)] transition-colors duration-300 hover:bg-[#1ebe5d] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#F8F4EC] focus-visible:ring-offset-2 focus-visible:ring-offset-[#2C2620]"
                >
                  <WhatsAppIcon className="h-4 w-4 flex-none" />
                  Get Free Consultation
                </motion.a>

                {/* Trust row */}
                <ul className="mt-5 flex flex-wrap gap-x-5 gap-y-1.5">
                  {["Free consultation", "No obligation", "Quick response"].map((label) => (
                    <li
                      key={label}
                      className="flex items-center gap-1.5 text-[0.78rem] font-medium text-[#A89F90]"
                    >
                      <span className="text-[#25D366]" aria-hidden="true">✓</span>
                      {label}
                    </li>
                  ))}
                </ul>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
