"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion, useScroll, useMotionValueEvent, AnimatePresence } from "framer-motion";
import { ShoppingBag, Search, X, Menu, ChevronDown } from "lucide-react";
import { products } from "@/lib/products";
import { getMegaMenuNavItem, getStandardNavLinks } from "@/lib/navigation";

/* ── Brand tokens — warm cream / gold, matching the hero ── */
const INK         = "#221F1C";
const INK_SOFT    = "#6B6258";
const GOLD        = "#9C7A3F";
const GOLD_DARK   = "#7A5E30";
const CREAM       = "#F4F1EA";
const CREAM_CARD  = "#FFFDF8";
const BORDER      = "rgba(156,122,63,0.32)";
const BORDER_SOFT = "rgba(156,122,63,0.20)";
const SERIF       = "'Playfair Display', 'Cormorant Garamond', Georgia, serif";

/*
 * Data-driven sources:
 *  - `products` (src/lib/products.ts) powers the Collections mega-menu
 *    and the mobile accordion. Add a product there and it shows up here
 *    automatically — no changes needed in this file.
 *  - `primaryNavigation` (src/lib/navigation.ts) powers the plain nav
 *    links plus the mega-menu trigger's label/href, kept separate from
 *    product data so the two can evolve independently.
 */
const megaMenuNavItem =
  getMegaMenuNavItem() ?? { label: "Collections", href: "/collections", type: "mega-menu" as const };
const navLinks = getStandardNavLinks();

export function Navbar() {
  const [scrolled,           setScrolled]           = useState(false);
  const [hidden,             setHidden]             = useState(false);
  const [mobileOpen,         setMobileOpen]         = useState(false);
  const [activeLink,         setActiveLink]         = useState<string | null>(null);
  const [collectionsOpen,    setCollectionsOpen]    = useState(false);
  const [mobileCollectionsOpen, setMobileCollectionsOpen] = useState(false);
  const { scrollY } = useScroll();
  const lastY = useRef(0);

  useMotionValueEvent(scrollY, "change", (latest) => {
    setScrolled(latest > 60);

    // Auto-hide on the way down, reveal on the way up — keeps the pill
    // out of the hero's headline while scrolling, and brings it right
    // back the moment the visitor wants it.
    const delta = latest - lastY.current;
    if (latest < 120) {
      setHidden(false);
    } else if (delta > 6 && !mobileOpen) {
      setHidden(true);
    } else if (delta < -6) {
      setHidden(false);
    }
    lastY.current = latest;
  });

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "";
    if (mobileOpen) setHidden(false);
    return () => { document.body.style.overflow = ""; };
  }, [mobileOpen]);

  return (
    <>
      {/* ── Floating Navbar Wrapper ──
          Outer layer is a plain (non-animated) fixed container that just
          reserves the device's notch/Dynamic-Island inset. All motion
          lives on the inner layer so the safe-area padding never fights
          the scroll animation. */}
      <div
        className="fixed top-0 left-0 right-0 z-50"
        style={{
          paddingTop: "env(safe-area-inset-top, 0px)",
          contain: "layout style",
          transform: "translateZ(0)",
          backfaceVisibility: "hidden",
          willChange: "transform",
        }}
      >
        <motion.div
          className="flex justify-center px-2"
          animate={{
            paddingLeft:  scrolled ? "0.75rem" : "0.5rem",
            paddingRight: scrolled ? "0.75rem" : "0.5rem",
            paddingTop:   scrolled ? "0.625rem" : "0.5rem",
            paddingBottom:"0.5rem",
            y: hidden ? "-130%" : "0%",
          }}
          transition={{ duration: 0.35, ease: "easeOut" }}
        >
          <motion.header
            className="w-full"
            animate={{
              maxWidth: scrolled ? "880px" : "1640px",
              y:        scrolled ? 0 : 4,
              filter: scrolled
                ? "drop-shadow(0 8px 32px rgba(40,30,10,0.16))"
                : "drop-shadow(0 4px 16px rgba(40,30,10,0.08))",
            }}
            transition={{ duration: 0.35, ease: "easeOut" }}
          >
            {/* ── Nav Shell — always pill, always frosted ── */}
            <motion.nav
              className="flex items-center justify-between px-3 py-2"
              animate={{
                borderRadius: "9999px",
                background: scrolled
                  ? "rgba(244,241,234,0.92)"
                  : "rgba(244,241,234,0.78)",
                backdropFilter: "blur(24px)",
                WebkitBackdropFilter: "blur(24px)",
                borderColor: scrolled
                  ? "rgba(156,122,63,0.38)"
                  : "rgba(156,122,63,0.24)",
              }}
              style={{ border: "1px solid transparent" }}
              transition={{ duration: 0.35, ease: "easeOut" }}
              aria-label="Main navigation"
            >

              {/* ── Logo Badge — settles into a smaller, tidier mark on
                   scroll instead of getting squeezed by shrinking padding.
                   A deliberate, proportional scale-down reads as "elegant"
                   rather than "cramped". ── */}
              <motion.div
                animate={{ scale: scrolled ? 0.9 : 1 }}
                style={{ transformOrigin: "left center" }}
                transition={{ duration: 0.35, ease: "easeOut" }}
              >
                <Link
                  href="/"
                  aria-label="Wonder Wallz home"
                  className="flex items-center gap-2.5 shrink-0 relative rounded-2xl px-3.5 py-1.5"
                  style={{
                    background: "linear-gradient(135deg, #FFFDF8 0%, #F7F1E6 100%)",
                    boxShadow: "0 1px 8px rgba(156,122,63,0.16)",
                    border: `1px solid ${BORDER_SOFT}`,
                  }}
                >
                  {/* Logo image */}
                  <div
                    className="relative w-8 h-8 shrink-0"
                    style={{ filter: "drop-shadow(0 1px 2px rgba(122,94,48,0.20))" }}
                  >
                    <Image
                      src="/logo.jpeg"
                      alt="Wonder Wallz Logo"
                      sizes="128px"
                      fill
                      className="object-contain"
                      priority
                    />
                  </div>

                  {/* Wordmark — refined serif treatment in ink + gold,
                      replacing the previous multicolor mark */}
                  <span
                    className="text-[14px] uppercase whitespace-nowrap"
                    style={{ letterSpacing: "0.07em", fontFamily: SERIF, fontWeight: 600, color: INK }}
                  >
                    Wonder
                    <span style={{ color: GOLD, margin: "0 4px", fontWeight: 400 }}>·</span>
                    Wallz
                  </span>
                </Link>
              </motion.div>

              {/* ── Desktop Nav Links ── */}
              <ul className="hidden lg:flex items-center gap-0.5 mx-3" role="list">

                {/* Collections — mega-menu dropdown, sourced from products.ts */}
                <li
                  className="relative"
                  onMouseEnter={() => { setActiveLink(megaMenuNavItem.href); setCollectionsOpen(true); }}
                  onMouseLeave={() => { setActiveLink(null); setCollectionsOpen(false); }}
                >
                  <Link
                    href={megaMenuNavItem.href}
                    className="relative px-5 py-2 text-[14px] font-medium block focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 rounded-xl"
                    style={{
                      color: activeLink === megaMenuNavItem.href ? INK : INK_SOFT,
                      transition: "color 0.15s",
                      outlineColor: GOLD,
                    }}
                    aria-haspopup="true"
                    aria-expanded={collectionsOpen}
                  >
                    <AnimatePresence>
                      {activeLink === megaMenuNavItem.href && (
                        <motion.span
                          className="absolute inset-0 rounded-xl"
                          style={{ background: "rgba(156,122,63,0.08)" }}
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          exit={{ opacity: 0 }}
                          transition={{ duration: 0.15 }}
                        />
                      )}
                    </AnimatePresence>

                    <span className="relative z-10 flex items-center gap-1.5">
                      {megaMenuNavItem.label}
                      <motion.span
                        className="flex items-center"
                        animate={{ rotate: collectionsOpen ? 180 : 0 }}
                        transition={{ duration: 0.2, ease: "easeOut" }}
                      >
                        <ChevronDown size={13} />
                      </motion.span>
                    </span>

                    <AnimatePresence>
                      {activeLink === megaMenuNavItem.href && (
                        <motion.span
                          className="absolute left-5 right-5 rounded-full"
                          style={{ bottom: "5px", height: "2px", background: GOLD }}
                          initial={{ scaleX: 0, originX: 0 }}
                          animate={{ scaleX: 1 }}
                          exit={{ scaleX: 0, originX: 1 }}
                          transition={{ duration: 0.2, ease: "easeOut" }}
                        />
                      )}
                    </AnimatePresence>
                  </Link>

                  {/* Mega-menu panel — one card per product in products.ts */}
                  <AnimatePresence>
                    {collectionsOpen && (
                      <motion.div
                        className="absolute left-1/2 top-full mt-3 w-[560px] -translate-x-1/2 rounded-2xl p-5 z-50"
                        style={{
                          background: CREAM_CARD,
                          border: `1px solid ${BORDER}`,
                          boxShadow: "0 24px 60px rgba(40,30,10,0.18), 0 4px 14px rgba(40,30,10,0.08)",
                        }}
                        initial={{ opacity: 0, y: -8 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -8 }}
                        transition={{ duration: 0.18, ease: "easeOut" }}
                        role="menu"
                      >
                        <div className="grid grid-cols-2 gap-1">
                          {products.map((product) => (
                            <Link
                              key={product.id}
                              href={product.href}
                              onClick={() => setCollectionsOpen(false)}
                              className="flex flex-col gap-0.5 rounded-xl px-4 py-3 transition-colors hover:bg-[#F4ECDA] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2"
                              style={{ outlineColor: GOLD }}
                              role="menuitem"
                            >
                              <span
                                className="text-[15px] font-semibold"
                                style={{ fontFamily: SERIF, color: INK }}
                              >
                                {product.title}
                              </span>
                              <span className="text-[12.5px]" style={{ color: INK_SOFT }}>
                                {product.description}
                              </span>
                            </Link>
                          ))}
                        </div>

                        <div
                          className="mt-4 pt-3.5 flex items-center justify-between"
                          style={{ borderTop: `1px solid ${BORDER_SOFT}` }}
                        >
                          <span className="text-[12px]" style={{ color: INK_SOFT }}>
                            500+ curated designs across {products.length} categories
                          </span>
                          <Link
                            href={megaMenuNavItem.href}
                            onClick={() => setCollectionsOpen(false)}
                            className="text-[12.5px] font-semibold whitespace-nowrap"
                            style={{ color: GOLD_DARK }}
                          >
                            View all →
                          </Link>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </li>

                {navLinks.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="relative px-5 py-2 text-[14px] font-medium block rounded-xl focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2"
                      style={{
                        color: activeLink === link.href ? INK : INK_SOFT,
                        transition: "color 0.15s",
                        outlineColor: GOLD,
                      }}
                      onMouseEnter={() => setActiveLink(link.href)}
                      onMouseLeave={() => setActiveLink(null)}
                    >
                      <AnimatePresence>
                        {activeLink === link.href && (
                          <motion.span
                            className="absolute inset-0 rounded-xl"
                            style={{ background: "rgba(156,122,63,0.08)" }}
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            transition={{ duration: 0.15 }}
                          />
                        )}
                      </AnimatePresence>

                      <span className="relative z-10">{link.label}</span>

                      <AnimatePresence>
                        {activeLink === link.href && (
                          <motion.span
                            className="absolute left-5 right-5 rounded-full"
                            style={{
                              bottom: "5px",
                              height: "2px",
                              background: GOLD,
                            }}
                            initial={{ scaleX: 0, originX: 0 }}
                            animate={{ scaleX: 1 }}
                            exit={{ scaleX: 0, originX: 1 }}
                            transition={{ duration: 0.2, ease: "easeOut" }}
                          />
                        )}
                      </AnimatePresence>
                    </Link>
                  </li>
                ))}
              </ul>

              {/* ── Right Icon Group ── */}
              <div className="flex items-center gap-1.5 pr-0.5">
                <CircleIconBtn aria-label="Search">
                  <Search size={16} />
                </CircleIconBtn>

                <CircleIconBtn aria-label="Cart (0 items)" className="relative">
                  <ShoppingBag size={16} />
                  <span
                    className="absolute -top-0.5 -right-0.5 flex items-center justify-center w-4 h-4 rounded-full text-[9px] font-bold text-white"
                    style={{ backgroundColor: GOLD_DARK }}
                  >
                    0
                  </span>
                </CircleIconBtn>

                {/* Mobile hamburger — morphs into a close icon when the
                    drawer is open, and now toggles both ways */}
                <motion.button
                  className="lg:hidden flex items-center justify-center w-9 h-9 rounded-full ml-0.5 overflow-hidden"
                  style={{
                    background: "rgba(255,253,248,0.7)",
                    border: `1px solid ${BORDER}`,
                    color: INK_SOFT,
                  }}
                  onClick={() => setMobileOpen((v) => !v)}
                  aria-label={mobileOpen ? "Close menu" : "Open menu"}
                  aria-expanded={mobileOpen}
                  whileHover={{ backgroundColor: "#ffffff", color: GOLD_DARK }}
                  whileTap={{ scale: 0.92 }}
                  transition={{ duration: 0.15 }}
                >
                  <AnimatePresence mode="wait" initial={false}>
                    <motion.span
                      key={mobileOpen ? "close" : "open"}
                      initial={{ rotate: -90, opacity: 0 }}
                      animate={{ rotate: 0, opacity: 1 }}
                      exit={{ rotate: 90, opacity: 0 }}
                      transition={{ duration: 0.18 }}
                      className="flex items-center justify-center"
                    >
                      {mobileOpen ? <X size={18} /> : <Menu size={18} />}
                    </motion.span>
                  </AnimatePresence>
                </motion.button>
              </div>
            </motion.nav>
          </motion.header>
        </motion.div>
      </div>

      {/* ── Mobile Menu Overlay ── */}
      <AnimatePresence>
        {mobileOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              className="fixed inset-0 z-50 bg-black/30"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setMobileOpen(false)}
            />

            {/* Drawer */}
            <motion.div
              className="fixed top-0 right-0 bottom-0 z-50 w-72 flex flex-col overflow-hidden"
              style={{
                background: "rgba(250,247,242,0.98)",
                backdropFilter: "blur(20px)",
                boxShadow: "-4px 0 40px rgba(122,94,48,0.14)",
                borderLeft: `1px solid ${BORDER}`,
                paddingTop: "env(safe-area-inset-top, 0px)",
              }}
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
            >
              {/* Top accent line */}
              <div
                className="h-[2px] shrink-0"
                style={{ background: `linear-gradient(90deg, ${GOLD}, ${GOLD_DARK})` }}
              />

              {/* Drawer header */}
              <div
                className="flex items-center justify-between px-5 py-4 border-b"
                style={{ borderColor: BORDER_SOFT }}
              >
                {/* Logo badge */}
                <div
                  className="flex items-center gap-2 rounded-2xl px-3 py-1.5"
                  style={{
                    background: "linear-gradient(135deg, #FFFDF8 0%, #F7F1E6 100%)",
                    boxShadow: "0 2px 12px rgba(156,122,63,0.16)",
                    border: `1px solid ${BORDER_SOFT}`,
                  }}
                >
                  <div className="relative w-7 h-7">
                    <Image src="/logo.png" alt="Wonder Wallz" fill className="object-contain" />
                  </div>
                  <span
                    className="text-[12.5px] uppercase whitespace-nowrap"
                    style={{ letterSpacing: "0.06em", fontFamily: SERIF, fontWeight: 600, color: INK }}
                  >
                    Wonder
                    <span style={{ color: GOLD, margin: "0 3px", fontWeight: 400 }}>·</span>
                    Wallz
                  </span>
                </div>

                <button
                  onClick={() => setMobileOpen(false)}
                  className="w-8 h-8 flex items-center justify-center rounded-full transition-colors"
                  aria-label="Close menu"
                  style={{ color: INK_SOFT }}
                  onMouseEnter={(e) => (e.currentTarget.style.background = "#F4ECDA")}
                  onMouseLeave={(e) => (e.currentTarget.style.background = "transparent")}
                >
                  <X size={18} />
                </button>
              </div>

              {/* Drawer links */}
              <nav className="flex flex-col px-4 py-5 gap-1 flex-1 overflow-y-auto">

                {/* Collections — expandable accordion, sourced from products.ts */}
                <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0 }}>
                  <button
                    onClick={() => setMobileCollectionsOpen((v) => !v)}
                    className="w-full flex items-center justify-between px-4 py-3 rounded-xl text-[15px] font-semibold transition-colors"
                    style={{ color: INK, fontFamily: SERIF }}
                    aria-expanded={mobileCollectionsOpen}
                  >
                    {megaMenuNavItem.label}
                    <motion.span
                      animate={{ rotate: mobileCollectionsOpen ? 180 : 0 }}
                      transition={{ duration: 0.2 }}
                      className="flex items-center"
                    >
                      <ChevronDown size={16} style={{ color: GOLD_DARK }} />
                    </motion.span>
                  </button>

                  <AnimatePresence initial={false}>
                    {mobileCollectionsOpen && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.2, ease: "easeOut" }}
                        style={{ overflow: "hidden" }}
                      >
                        <div className="flex flex-col gap-0.5 pl-4 pb-2 pt-1">
                          {products.map((product) => (
                            <Link
                              key={product.id}
                              href={product.href}
                              onClick={() => setMobileOpen(false)}
                              className="rounded-lg px-4 py-2.5"
                              style={{ borderLeft: `1px solid ${BORDER_SOFT}` }}
                            >
                              <span className="block text-[13.5px] font-medium" style={{ color: INK }}>
                                {product.title}
                              </span>
                              <span className="block text-[11.5px]" style={{ color: INK_SOFT }}>
                                {product.description}
                              </span>
                            </Link>
                          ))}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>

                {navLinks.map((link, i) => (
                  <motion.div
                    key={link.href}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: (i + 1) * 0.06 }}
                  >
                    <Link
                      href={link.href}
                      onClick={() => setMobileOpen(false)}
                      className="flex items-center px-4 py-3 rounded-xl text-[15px] font-semibold transition-colors"
                      style={{ color: INK, fontFamily: SERIF }}
                      onMouseEnter={(e) => (e.currentTarget.style.background = "#F4ECDA")}
                      onMouseLeave={(e) => (e.currentTarget.style.background = "transparent")}
                    >
                      {link.label}
                    </Link>
                  </motion.div>
                ))}
              </nav>

              {/* Bottom icon row */}
              <div
                className="flex items-center gap-3 px-6 py-4 border-t"
                style={{ borderColor: BORDER_SOFT }}
              >
                <button className="flex items-center gap-1.5 text-xs font-semibold" style={{ color: INK_SOFT }}>
                  <Search size={15} /> Search
                </button>
                <button className="flex items-center gap-1.5 text-xs font-semibold ml-auto relative" style={{ color: INK_SOFT }}>
                  <ShoppingBag size={15} /> Cart
                  <span
                    className="flex items-center justify-center w-4 h-4 rounded-full text-[9px] font-bold text-white"
                    style={{ backgroundColor: GOLD_DARK }}
                  >0</span>
                </button>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}

/* ── Circular Icon Button (matches the floating pill's round ghost buttons) ── */
function CircleIconBtn({
  children,
  className = "",
  "aria-label": ariaLabel,
}: {
  children: React.ReactNode;
  className?: string;
  "aria-label": string;
}) {
  return (
    <motion.button
      aria-label={ariaLabel}
      className={`relative flex items-center justify-center w-9 h-9 rounded-full transition-colors ${className}`}
      style={{
        color: INK_SOFT,
        background: "rgba(255,253,248,0.70)",
        border: `1px solid ${BORDER}`,
      }}
      whileHover={{
        backgroundColor: "#ffffff",
        color: GOLD_DARK,
        borderColor: "rgba(156,122,63,0.45)",
      }}
      whileTap={{ scale: 0.92 }}
      transition={{ duration: 0.15 }}
    >
      {children}
    </motion.button>
  );
}
