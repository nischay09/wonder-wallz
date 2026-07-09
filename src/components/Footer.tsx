"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import { FC } from "react";
import { products } from "@/lib/products";
import { useSectionScroll } from "@/hooks/useSectionScroll";

// ─── Types ────────────────────────────────────────────────────────────────────

export interface FooterProps {
  className?: string;
}

// ─── Animation Variants ───────────────────────────────────────────────────────

const containerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.08,
      delayChildren: 0.1,
    },
  },
};

const columnVariants = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.55, ease: [0.22, 1, 0.36, 1] },
  },
};

const trustRowVariants = {
  hidden: { opacity: 0, y: 12 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: "easeOut", delay: 0.4 },
  },
};

const copyrightVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { duration: 0.5, delay: 0.55 },
  },
};

// ─── Sub-components ───────────────────────────────────────────────────────────

const FooterHeading: FC<{ children: React.ReactNode }> = ({ children }) => (
  <h3 className="text-xs font-semibold tracking-[0.18em] uppercase text-amber-400 mb-5 pb-2 border-b border-white/10">
    {children}
  </h3>
);

const FooterLink: FC<{
  href: string;
  children: React.ReactNode;
  external?: boolean;
  onClick?: () => void;
}> = ({ href, children, external, onClick }) =>
  onClick ? (
    <button
      type="button"
      onClick={onClick}
      className="group flex items-center gap-1.5 text-sm text-stone-400 hover:text-amber-300 transition-colors duration-200 text-left"
    >
      <span className="w-0 group-hover:w-2 h-px bg-amber-400 transition-all duration-200 rounded-full" />
      {children}
    </button>
  ) : (
    <Link
      href={href}
      target={external ? "_blank" : undefined}
      rel={external ? "noopener noreferrer" : undefined}
      className="group flex items-center gap-1.5 text-sm text-stone-400 hover:text-amber-300 transition-colors duration-200"
    >
      <span className="w-0 group-hover:w-2 h-px bg-amber-400 transition-all duration-200 rounded-full" />
      {children}
    </Link>
  );

// ─── Wonder Wallz Logo ────────────────────────────────────────────────────────
// Reuses the same /logo.jpeg asset as the Navbar's BrandLogoMark so there is
// only one logo asset/implementation across the site.

const WonderWallzLogo: FC<{ className?: string }> = ({ className }) => (
  <div className={`flex items-center gap-3 ${className}`}>
    <div className="relative w-10 h-10 shrink-0">
      <Image
        src="/logo.jpeg"
        alt="Wonder Wallz Logo"
        sizes="128px"
        fill
        className="object-contain"
      />
    </div>
    <div>
      <span className="text-xl font-bold tracking-tight text-white leading-none">
        Wonder
        <span className="text-amber-400">Wallz</span>
      </span>
    </div>
  </div>
);

// ─── Mobile Accordion Section ─────────────────────────────────────────────────
// Native <details>/<summary> gives us expand/collapse, keyboard support, and
// screen-reader semantics for free — no extra state management needed.

const MobileAccordionSection: FC<{
  title: string;
  children: React.ReactNode;
  defaultOpen?: boolean;
}> = ({ title, children, defaultOpen }) => (
  <details
    className="group border-b border-white/10 [&::-webkit-details-marker]:hidden"
    open={defaultOpen}
  >
    <summary
      className="flex items-center justify-between gap-3 py-3.5 cursor-pointer select-none list-none text-xs font-semibold tracking-[0.16em] uppercase text-amber-400 min-h-[44px]"
    >
      <span>{title}</span>
      <ChevronDownIcon className="w-4 h-4 shrink-0 text-stone-500 transition-transform duration-200 group-open:rotate-180" />
    </summary>
    <div className="pb-4">{children}</div>
  </details>
);

// ─── Mobile Contact Row ────────────────────────────────────────────────────────
// Large, touch-friendly row (min 44px target) for phone/email/social contact.

const MobileContactRow: FC<{
  href: string;
  external?: boolean;
  icon: React.ReactNode;
  label: string;
  display: string;
}> = ({ href, external, icon, label, display }) => (
  <a
    href={href}
    target={external ? "_blank" : undefined}
    rel={external ? "noopener noreferrer" : undefined}
    aria-label={label}
    className="flex items-center gap-3 py-3 min-h-[44px] border-b border-white/5 last:border-b-0 text-stone-300 active:bg-white/5 rounded-lg transition-colors duration-150 -mx-1 px-1"
  >
    <span className="flex-shrink-0 w-9 h-9 rounded-lg bg-white/5 border border-white/5 flex items-center justify-center text-amber-400">
      {icon}
    </span>
    <span className="text-sm truncate">{display}</span>
  </a>
);

// ─── Icons ─────────────────────────────────────────────────────────────────────

const PhoneIcon = () => (
  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 01-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 00-1.091-.852H4.5A2.25 2.25 0 002.25 4.5v2.25z" />
  </svg>
);

const EmailIcon = () => (
  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" />
  </svg>
);

const WhatsAppIcon = () => (
  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
  </svg>
);

const InstagramIcon = () => (
  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
  </svg>
);

const MapPinIcon = () => (
  <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z" />
    <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z" />
  </svg>
);

const ChevronDownIcon: FC<{ className?: string }> = ({ className }) => (
  <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
  </svg>
);

// ─── Data ─────────────────────────────────────────────────────────────────────
// Product links are sourced directly from the project's single source of
// truth (src/lib/products.ts) instead of being hardcoded here, so the
// footer always stays in sync with the Navbar's "Collections" menu.

// "Company" links: Home, Collections, Custom Design, About Us, Contact, FAQ.
// "Collections" reuses the same megamenu href the Navbar points to.
// "About Us" reuses the Navbar's homepage-section scroll behaviour
// (sectionId "faq" — same section the Navbar's "About Us" link scrolls to).
// "FAQ" is kept as a direct link to that same homepage section for users
// who land on it from elsewhere; it scrolls just like "About Us" does.
const company: Array<{ label: string; href: string; sectionId?: string }> = [
  { label: "Home", href: "/" },
  { label: "Collections", href: "/collections" },
  { label: "Custom Design", href: "/custom-design" },
  { label: "About Us", href: "/", sectionId: "faq" },
  { label: "Contact", href: "/contact" },
  { label: "FAQ", href: "/", sectionId: "faq" },
];

const legal = [
  { label: "Privacy Policy", href: "/privacy-policy" },
  { label: "Terms & Conditions", href: "/terms-and-conditions" },
  { label: "Shipping Policy", href: "/shipping-policy" },
  { label: "Refund & Return Policy", href: "/refund-policy" },
];

// Real Wonder Wallz showroom addresses, mapped to the two customer
// journeys defined in src/lib/collections.ts (custom vs. standard).
const stores = [
  {
    name: "Wonder Wallz – Custom Design Showroom",
    detail: "Wallpapers, Wall Murals, Custom Glass Films & Canvas Prints",
    address: "157C, Lenin Sarani Rd, near Jyoti Cinema, Esplanade, Chandni Chawk, Bowbazar, Kolkata, West Bengal 700013",
    mapHref: "https://maps.google.com/?q=157C+Lenin+Sarani+Rd+Jyoti+Cinema+Esplanade+Chandni+Chawk+Bowbazar+Kolkata+West+Bengal+700013",
  },
  {
    name: "Wonder Wallz – Interior Products Showroom",
    detail: "Blinds, Curtains, Upholstery, Flooring & Readymade Wallpapers",
    address: "Merlin Homeland, 18B Ashutosh Mukherjee Road, Bhowanipore, Kolkata, West Bengal 700025",
    mapHref: "https://maps.google.com/?q=Merlin+Homeland+18B+Ashutosh+Mukherjee+Road+Bhowanipore+Kolkata+West+Bengal+700025",
  },
];

// Real Wonder Wallz contact details. Email is left as a placeholder until
// the final address is available, per project instructions. Instagram is
// left as a placeholder until the final profile is available.
const contactLinks = [
  {
    label: "Custom Projects",
    href: "tel:+919883100377",
    icon: <PhoneIcon />,
    display: "Custom Projects · 98831 00377",
  },
  {
    label: "Interior Products",
    href: "tel:+919830173898",
    icon: <PhoneIcon />,
    display: "Interior Products · 98301 73898",
  },
  {
    label: "Email",
    href: "mailto:hello@wonderwallz.in",
    icon: <EmailIcon />,
    display: "hello@wonderwallz.in",
  },
  {
    label: "WhatsApp",
    href: "https://wa.me/919883100377",
    icon: <WhatsAppIcon />,
    display: "Chat with us",
    external: true,
  },
  {
    label: "Instagram",
    href: "https://instagram.com/wonderwallz_kolkata",
    icon: <InstagramIcon />,
    display: "@wonderwallz",
    external: true,
  },
];

const trustPillars = [
  { label: "HP Latex Printing", icon: "◈" },
  { label: "Eco Friendly", icon: "◉" },
  { label: "Professional Installation", icon: "◆" },
];

// ─── Main Component ───────────────────────────────────────────────────────────

export const Footer: FC<FooterProps> = ({ className = "" }) => {
  // Reuses the exact same homepage-section scroll helper the Navbar uses
  // for "Inspiration" / "About Us", instead of a duplicate implementation.
  const scrollToSection = useSectionScroll();

  return (
    <footer
      className={`relative bg-[#111009] text-white overflow-hidden ${className}`}
    >
      {/* Warm ambient gradient */}
      <div
        className="absolute inset-0 pointer-events-none"
        aria-hidden="true"
      >
        <div className="absolute -top-40 left-1/4 w-[600px] h-[400px] bg-amber-600/5 rounded-full blur-[120px]" />
        <div className="absolute -bottom-20 right-1/4 w-[500px] h-[300px] bg-purple-700/5 rounded-full blur-[100px]" />
      </div>

      {/* Top border accent */}
      <div className="h-px w-full bg-gradient-to-r from-transparent via-amber-500/40 to-transparent" />

      {/* Main footer grid — desktop/tablet (lg and up), unchanged from before */}
      <div className="relative max-w-7xl mx-auto hidden lg:block px-6 lg:px-10 pt-16 pb-10">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-10 xl:gap-8"
        >
          {/* ── Brand Column ──────────────────────────────────────────────── */}
          <motion.div
            variants={columnVariants}
            className="sm:col-span-2 lg:col-span-3 xl:col-span-2"
          >
            <WonderWallzLogo className="mb-4" />

            <p className="text-xs font-semibold tracking-[0.16em] uppercase text-amber-500/80 mb-3">
              Premium Wallpapers &amp; Interior Solutions
            </p>

            <p className="text-sm text-stone-400 leading-relaxed max-w-xs mb-5">
              Transforming homes and spaces across Kolkata with curated wallpapers,
              bespoke window treatments, and precision-printed interiors — crafted
              with care for over a decade.
            </p>

            <div className="flex items-center gap-2 text-xs text-stone-500">
              <span className="w-5 h-px bg-amber-500/50 rounded-full" />
              <span className="tracking-widest uppercase">Est. 2011</span>
            </div>
          </motion.div>

          {/* ── Products Column ───────────────────────────────────────────── */}
          <motion.div variants={columnVariants} className="xl:col-span-1">
            <FooterHeading>Products</FooterHeading>
            <nav aria-label="Product links" className="flex flex-col gap-2.5">
              {products.map((item) => (
                <FooterLink key={item.id} href={item.href}>
                  {item.title}
                </FooterLink>
              ))}
            </nav>
          </motion.div>

          {/* ── Company Column ────────────────────────────────────────────── */}
          <motion.div variants={columnVariants} className="xl:col-span-1">
            <FooterHeading>Company</FooterHeading>
            <nav aria-label="Company links" className="flex flex-col gap-2.5">
              {company.map((item) => (
                <FooterLink
                  key={item.label}
                  href={item.href}
                  onClick={
                    item.sectionId
                      ? () => scrollToSection(item.sectionId!)
                      : undefined
                  }
                >
                  {item.label}
                </FooterLink>
              ))}
            </nav>

            <div className="mt-8">
              <FooterHeading>Legal</FooterHeading>
              <nav aria-label="Legal links" className="flex flex-col gap-2.5">
                {legal.map((item) => (
                  <FooterLink key={item.label} href={item.href}>
                    {item.label}
                  </FooterLink>
                ))}
              </nav>
            </div>
          </motion.div>

          {/* ── Visit Us + Contact ────────────────────────────────────────── */}
          <motion.div variants={columnVariants} className="sm:col-span-2 lg:col-span-1 xl:col-span-2">
            <FooterHeading>Visit Us</FooterHeading>
            <div className="flex flex-col gap-5 mb-8">
              {stores.map((store) => (
                <a
                  key={store.name}
                  href={store.mapHref}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group block"
                >
                  <p className="text-sm font-medium text-stone-200 group-hover:text-amber-300 transition-colors duration-200 mb-1 leading-snug">
                    {store.name}
                  </p>
                  <p className="text-xs text-stone-500 leading-relaxed group-hover:text-stone-400 transition-colors duration-200">
                    {store.detail}
                  </p>
                  <p className="text-xs text-stone-600 leading-relaxed mt-1">
                    {store.address}
                  </p>
                  <span className="inline-flex items-center gap-1 text-xs text-amber-500/70 group-hover:text-amber-400 mt-1.5 transition-colors duration-200">
                    <MapPinIcon />
                    Get directions
                  </span>
                </a>
              ))}
            </div>

            <FooterHeading>Contact</FooterHeading>
            <div className="flex flex-col gap-3">
              {contactLinks.map((item) => (
                <a
                  key={item.label}
                  href={item.href}
                  target={item.external ? "_blank" : undefined}
                  rel={item.external ? "noopener noreferrer" : undefined}
                  aria-label={item.label}
                  className="group flex items-center gap-3 text-sm text-stone-400 hover:text-amber-300 transition-colors duration-200"
                >
                  <span className="flex-shrink-0 w-8 h-8 rounded-lg bg-white/5 group-hover:bg-amber-500/10 border border-white/5 group-hover:border-amber-500/20 flex items-center justify-center transition-all duration-200">
                    {item.icon}
                  </span>
                  <span className="truncate">{item.display}</span>
                </a>
              ))}
            </div>
          </motion.div>
        </motion.div>

        {/* ── Trust Row ─────────────────────────────────────────────────────── */}
        <motion.div
          variants={trustRowVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="mt-14 mb-6"
        >
          <div className="h-px w-full bg-gradient-to-r from-transparent via-white/8 to-transparent mb-8" />

          <div className="flex flex-wrap items-center justify-center gap-4 sm:gap-8">
            {trustPillars.map((pillar, i) => (
              <div
                key={pillar.label}
                className="flex items-center gap-2.5"
              >
                {i > 0 && (
                  <span className="hidden sm:block w-px h-4 bg-white/10" aria-hidden="true" />
                )}
                <span className="text-amber-400/60 text-xs" aria-hidden="true">
                  {pillar.icon}
                </span>
                <span className="text-xs font-medium tracking-[0.12em] uppercase text-stone-400">
                  {pillar.label}
                </span>
              </div>
            ))}
          </div>
        </motion.div>

        {/* ── Copyright ─────────────────────────────────────────────────────── */}
        <motion.div
          variants={copyrightVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          <div className="h-px w-full bg-gradient-to-r from-transparent via-white/6 to-transparent mb-6" />

          <div className="flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-stone-600">
            <p>© 2026 Wonder Wallz. All Rights Reserved.</p>
            <p className="flex items-center gap-1.5">
              <span>Crafted with</span>
              <span className="text-amber-500/70">♥</span>
              <span>in Kolkata, India</span>
            </p>
          </div>
        </motion.div>
      </div>

      {/* ═══ Mobile footer (below lg) — compact, accordion-based layout ═══════ */}
      <div className="relative max-w-7xl mx-auto lg:hidden px-5 pt-8 pb-6">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-40px" }}
        >
          {/* ── Brand + Primary CTAs ──────────────────────────────────────── */}
          <motion.div variants={columnVariants} className="mb-5">
            <WonderWallzLogo className="mb-3" />

            <p className="text-[11px] font-semibold tracking-[0.14em] uppercase text-amber-500/80 mb-4">
              Premium Wallpapers &amp; Interior Solutions
            </p>

            {/* Primary CTAs: WhatsApp + Call, directly under the brand */}
            <div className="grid grid-cols-2 gap-2.5">
              <a
                href="https://wa.me/919883100377"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Chat with us on WhatsApp"
                className="flex items-center justify-center gap-2 min-h-[46px] rounded-xl bg-amber-500 text-[#1a1408] text-sm font-semibold active:bg-amber-400 transition-colors duration-150"
              >
                <WhatsAppIcon />
                WhatsApp
              </a>
              <a
                href="tel:+919883100377"
                aria-label="Call us"
                className="flex items-center justify-center gap-2 min-h-[46px] rounded-xl border border-white/15 text-white text-sm font-semibold active:bg-white/10 transition-colors duration-150"
              >
                <PhoneIcon />
                Call Us
              </a>
            </div>
          </motion.div>

          {/* ── Accordion Sections ────────────────────────────────────────── */}
          <motion.div variants={columnVariants} className="border-t border-white/10">
            <MobileAccordionSection title="Products">
              <nav aria-label="Product links" className="flex flex-col">
                {products.map((item) => (
                  <FooterLink key={item.id} href={item.href}>
                    <span className="py-1.5 block">{item.title}</span>
                  </FooterLink>
                ))}
              </nav>
            </MobileAccordionSection>

            <MobileAccordionSection title="Company">
              <nav aria-label="Company links" className="flex flex-col">
                {company.map((item) => (
                  <FooterLink
                    key={item.label}
                    href={item.href}
                    onClick={
                      item.sectionId
                        ? () => scrollToSection(item.sectionId!)
                        : undefined
                    }
                  >
                    <span className="py-1.5 block">{item.label}</span>
                  </FooterLink>
                ))}
              </nav>
            </MobileAccordionSection>

            <MobileAccordionSection title="Legal">
              <nav aria-label="Legal links" className="flex flex-col">
                {legal.map((item) => (
                  <FooterLink key={item.label} href={item.href}>
                    <span className="py-1.5 block">{item.label}</span>
                  </FooterLink>
                ))}
              </nav>
            </MobileAccordionSection>

            <MobileAccordionSection title="Visit Our Showrooms">
              <div className="flex flex-col divide-y divide-white/5">
                {stores.map((store) => (
                  <div
                    key={store.name}
                    className="flex items-center justify-between gap-3 py-3 min-h-[44px]"
                  >
                    <div className="min-w-0">
                      <p className="text-sm font-medium text-stone-200 truncate">
                        {store.name.replace("Wonder Wallz – ", "")}
                      </p>
                      <p className="text-xs text-stone-500 truncate">{store.detail}</p>
                    </div>
                    <a
                      href={store.mapHref}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="shrink-0 inline-flex items-center gap-1 text-xs font-medium text-amber-400 active:text-amber-300"
                    >
                      Get Directions <span aria-hidden="true">→</span>
                    </a>
                  </div>
                ))}
              </div>
            </MobileAccordionSection>
          </motion.div>

          {/* ── Contact (large, touch-friendly rows) ──────────────────────── */}
          <motion.div variants={columnVariants} className="mt-6">
            <FooterHeading>Contact</FooterHeading>
            <div className="flex flex-col">
              {contactLinks
                .filter(
                  (item) => item.label !== "WhatsApp" && item.label !== "Custom Projects"
                )
                .map((item) => (
                  <MobileContactRow
                    key={item.label}
                    href={item.href}
                    external={item.external}
                    icon={item.icon}
                    label={item.label}
                    display={item.display}
                  />
                ))}
            </div>
          </motion.div>

          {/* ── Trust Badges (compact, wrapping pills) ─────────────────────── */}
          <motion.div
            variants={trustRowVariants}
            className="mt-6 pt-5 border-t border-white/10"
          >
            <div className="flex flex-wrap gap-2">
              {trustPillars.map((pillar) => (
                <span
                  key={pillar.label}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/5 border border-white/10 text-[10px] font-medium tracking-[0.08em] uppercase text-stone-400"
                >
                  <span className="text-amber-400/70" aria-hidden="true">
                    {pillar.icon}
                  </span>
                  {pillar.label}
                </span>
              ))}
            </div>
          </motion.div>

          {/* ── Copyright (compact) ─────────────────────────────────────────── */}
          <motion.div variants={copyrightVariants} className="mt-6 pt-5 border-t border-white/5">
            <div className="flex flex-col items-center gap-2 text-xs text-stone-600 text-center">
              <p>© 2026 Wonder Wallz. All Rights Reserved.</p>
              <p className="flex items-center gap-1.5">
                <span>Crafted with</span>
                <span className="text-amber-500/70">♥</span>
                <span>in Kolkata, India</span>
              </p>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </footer>
  );
};

export default Footer;
