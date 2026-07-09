"use client";

import { useRef, useEffect, useState } from "react";
import Image from "next/image";
import { motion, useInView, Variants } from "framer-motion";
import { Leaf, Ruler, Layers, Wrench, Truck, LucideIcon } from "lucide-react";

/* ----------------------------------------------------------------------- */
/* Types                                                                    */
/* ----------------------------------------------------------------------- */

interface Feature {
  icon?: LucideIcon;
  title: string;
  description: string;
  featured?: boolean;
}

interface Stat {
  value: number;
  suffix: string;
  label: string;
}

/* ----------------------------------------------------------------------- */
/* Content                                                                  */
/* ----------------------------------------------------------------------- */

const features: Feature[] = [
  {
    title: "Powered by HP Latex® Technology",
    description:
      "Vivid, fade-resistant colour from HP's water-based latex inks — safe indoors, built to last.",
    featured: true,
  },
  {
    icon: Leaf,
    title: "Eco-Friendly Materials",
    description: "Low-odour, water-based inks with no harsh chemical off-gassing.",
  },
  {
    icon: Ruler,
    title: "Custom Sizes",
    description: "Every panel is cut to your exact wall dimensions.",
  },
  {
    icon: Layers,
    title: "Premium Materials",
    description: "Textured, washable, tear-resistant surfaces for daily life.",
  },
  {
    icon: Wrench,
    title: "Installation Support",
    description: "Trained installers handle measuring, hanging and finishing.",
  },
  {
    icon: Truck,
    title: "Pan India Delivery",
    description: "Rolled and tube-packed, shipped safely to any city.",
  },
];

const stats: Stat[] = [
  { value: 5000, suffix: "+", label: "Walls Installed" },
  { value: 10, suffix: "+", label: "Years Experience" },
  { value: 500, suffix: "+", label: "Design Collections" },
  { value: 100, suffix: "%", label: "Custom Sizes" },
];

/* ----------------------------------------------------------------------- */
/* Motion variants                                                         */
/* ----------------------------------------------------------------------- */

const containerStagger: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.08, delayChildren: 0.1 } },
};

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 22 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] },
  },
};

const headingFade: Variants = {
  hidden: { opacity: 0, y: 16 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.55, ease: "easeOut" } },
};

/* ----------------------------------------------------------------------- */
/* Animated counter                                                         */
/* ----------------------------------------------------------------------- */

function AnimatedCounter({
  value,
  suffix = "",
  duration = 1.4,
}: {
  value: number;
  suffix?: string;
  duration?: number;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-60px" });
  const [display, setDisplay] = useState(0);

  useEffect(() => {
    if (!isInView) return;
    let raf: number;
    let start: number | undefined;

    const tick = (ts: number) => {
      if (!start) start = ts;
      const progress = Math.min((ts - start) / (duration * 1000), 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setDisplay(Math.round(eased * value));
      if (progress < 1) raf = requestAnimationFrame(tick);
    };

    raf = requestAnimationFrame(tick);
    return () => raf && cancelAnimationFrame(raf);
  }, [isInView, value, duration]);

  return (
    <span ref={ref}>
      {display.toLocaleString("en-IN")}
      {suffix}
    </span>
  );
}

/* ----------------------------------------------------------------------- */
/* Official HP Latex logo mark                                             */
/* ----------------------------------------------------------------------- */

function HpLatexMark() {
  return (
    <span
      className="relative inline-flex h-10 w-10 shrink-0 items-center justify-center sm:h-12 sm:w-12"
      aria-hidden="true"
    >
      <Image
        src="/logos/hp-latex.svg"
        alt=""
        fill
        sizes="(min-width: 640px) 48px, 40px"
        className="object-contain"
        priority={false}
      />
    </span>
  );
}

/* ----------------------------------------------------------------------- */
/* Feature card                                                            */
/* ----------------------------------------------------------------------- */

function FeatureCard({
  Icon,
  title,
  description,
  featured,
}: {
  Icon?: LucideIcon;
  title: string;
  description: string;
  featured?: boolean;
}) {
  return (
    <motion.article
      variants={fadeUp}
      className={[
        "group relative transition-all duration-200 ease-out",
        "hover:-translate-y-[2px] hover:shadow-[0_10px_24px_-14px_rgba(44,31,20,0.28)]",
        "border border-transparent hover:border-[var(--ww-border-hover)]",
        featured
          ? "col-span-1 sm:col-span-2 flex items-center gap-4 rounded-lg px-6 py-5 sm:px-7 sm:py-6"
          : "bg-[var(--ww-cream)] px-6 py-6",
      ].join(" ")}
      style={
        featured
          ? {
              background:
                "linear-gradient(135deg, rgba(212,140,67,0.07), rgba(250,247,242,0.4))",
              boxShadow: "0 1px 0 rgba(232,221,207,0.9)",
            }
          : undefined
      }
    >
      {featured ? (
        <>
          <HpLatexMark />
          <div className="min-w-0">
            <h3 className="mb-1 text-[16px] font-bold tracking-[-0.005em] text-[var(--ww-ink)] sm:text-[17px]">
              {title}
            </h3>
            <p className="text-[12.8px] leading-[1.55] text-[var(--ww-ink-soft)] sm:max-w-[440px]">
              {description}
            </p>
          </div>
        </>
      ) : (
        <>
          <div className="mb-3 flex items-center">
            {Icon ? (
              <Icon size={21} className="text-[var(--ww-bronze)]" strokeWidth={1.75} />
            ) : null}
          </div>
          <h3 className="mb-1 text-[14.5px] font-semibold tracking-[-0.005em] text-[var(--ww-ink)]">
            {title}
          </h3>
          <p className="text-[12.8px] leading-[1.55] text-[var(--ww-ink-soft)]">
            {description}
          </p>
        </>
      )}
    </motion.article>
  );
}

/* ----------------------------------------------------------------------- */
/* Main section                                                            */
/* ----------------------------------------------------------------------- */

export default function WonderWallzTrust() {
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-80px" });

  return (
    <section
      ref={sectionRef}
      aria-labelledby="ww-trust-heading"
      className="px-6 py-[52px] sm:py-[56px]"
      style={
        {
          "--ww-bronze": "#D48C43",
          "--ww-gold": "#B5926A",
          "--ww-cream": "#FAF7F2",
          "--ww-border": "#E8DDCF",
          "--ww-border-hover": "#D9CCB8",
          "--ww-ink": "#2C1F14",
          "--ww-ink-soft": "#6E6257",
          "--ww-wa": "#25D366",
          "--ww-wa-hover": "#1EBE5D",
          background: "var(--ww-cream)",
          fontFamily: "'Inter', 'Segoe UI', sans-serif",
        } as React.CSSProperties
      }
    >
      <div className="mx-auto max-w-[1080px]">
        {/* Header */}
        <motion.div
          className="mx-auto mb-7 max-w-[560px] text-center"
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          variants={headingFade}
        >
          <span className="mb-3 inline-flex items-center gap-2 text-[11px] font-bold uppercase tracking-[0.14em] text-[var(--ww-bronze)]">
            <span className="h-px w-[18px] bg-[var(--ww-bronze)]" />
            Why Wonder Wallz
          </span>
          <h2
            id="ww-trust-heading"
            className="mb-2.5 text-[clamp(1.6rem,2.4vw,2.1rem)] font-extrabold leading-[1.2] tracking-[-0.02em] text-[var(--ww-ink)]"
          >
            Built for how your walls actually get used
          </h2>
          <p className="text-[14.5px] leading-[1.6] text-[var(--ww-ink-soft)]">
            Premium interior solutions for homes, offices and commercial spaces.
          </p>
        </motion.div>

        {/* Feature grid */}
        <motion.div
          className="mb-5 grid grid-cols-1 gap-2.5 sm:grid-cols-2 lg:grid-cols-3"
          variants={containerStagger}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
        >
          {features.map((f) => (
            <FeatureCard
              key={f.title}
              Icon={f.icon}
              title={f.title}
              description={f.description}
              featured={f.featured}
            />
          ))}
        </motion.div>

        {/* Stats */}
        <motion.div
          className="mb-8 flex flex-wrap justify-center border-b border-[var(--ww-border)] pb-6 pt-1"
          variants={fadeUp}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
        >
          {stats.map((s, i) => (
            <div
              key={s.label}
              className={[
                "w-1/2 px-3 py-0 text-center sm:w-auto sm:px-8",
                i % 2 === 0 ? "" : "sm:border-l sm:border-[var(--ww-border)]",
                i === 0 ? "" : i % 2 === 0 ? "border-l border-[var(--ww-border)] sm:border-l" : "",
                i >= 2 ? "mt-3.5 border-t border-[var(--ww-border)] pt-3.5 sm:mt-0 sm:border-t-0 sm:pt-0" : "",
              ].join(" ")}
            >
              <span className="mb-1.5 block text-[clamp(1.7rem,3vw,2.3rem)] font-extrabold tracking-[-0.02em] text-[var(--ww-bronze)]">
                <AnimatedCounter value={s.value} suffix={s.suffix} />
              </span>
              <span className="text-[10.5px] font-semibold uppercase tracking-[0.06em] text-[var(--ww-ink-soft)]">
                {s.label}
              </span>
            </div>
          ))}
        </motion.div>

        {/* CTA */}
        <motion.div
          className="text-center"
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.45 }}
        >
          <p className="mb-4 text-[13.5px] text-[var(--ww-ink-soft)]">
            Ready to transform your walls?
          </p>
          <a
            href="https://wa.me/91XXXXXXXXXX"
            aria-label="Start your Wonder Wallz order on WhatsApp"
            rel="noopener noreferrer"
            target="_blank"
            className="inline-flex items-center gap-2.5 rounded-lg bg-[var(--ww-wa)] px-[30px] py-[13px] text-[14px] font-bold text-white transition-colors duration-150 ease-out hover:bg-[var(--ww-wa-hover)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--ww-bronze)]"
          >
            <svg
              viewBox="0 0 24 24"
              fill="white"
              xmlns="http://www.w3.org/2000/svg"
              aria-hidden="true"
              className="h-[17px] w-[17px]"
            >
              <path d="M12 2C6.477 2 2 6.477 2 12c0 1.89.525 3.66 1.438 5.168L2 22l4.978-1.38A9.945 9.945 0 0012 22c5.523 0 10-4.477 10-10S17.523 2 12 2zm4.93 13.67c-.2.56-1.18 1.1-1.63 1.14-.42.04-.81.2-2.74-.57-2.31-.93-3.8-3.27-3.91-3.42-.12-.15-.96-1.28-.96-2.44 0-1.17.61-1.74.83-1.98.21-.24.46-.3.62-.3l.44.008c.14.006.33-.053.51.39.2.47.68 1.65.74 1.77.06.12.1.26.02.42-.08.16-.12.26-.24.4l-.35.42c-.12.13-.25.27-.11.53.14.26.63 1.04 1.35 1.68.93.83 1.71 1.09 1.97 1.21.26.12.41.1.56-.06.15-.16.64-.74.81-1 .17-.25.34-.21.57-.13.23.08 1.47.69 1.72.82.25.12.42.18.48.28.06.1.06.56-.14 1.1z" />
            </svg>
            Get Started on WhatsApp
          </a>
        </motion.div>
      </div>
    </section>
  );
}
