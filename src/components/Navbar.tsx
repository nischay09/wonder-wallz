"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { motion, useScroll, useMotionValueEvent, AnimatePresence } from "framer-motion";
import { Search, X, Menu, ChevronDown } from "lucide-react";
import { products } from "@/lib/products";
import { getMegaMenuNavItem } from "@/lib/navigation";
import { ProjectCartButton } from "@/components/ProjectCart/ProjectCartButton";
import { ProjectCartDrawer } from "@/components/ProjectCart/ProjectCartDrawer";
import { useProjectCart, selectCartWorkflow } from "@/store/projectCart";
import { useSectionScroll } from "@/hooks/useSectionScroll";
import { SearchModal } from "@/components/Search/SearchModal";

/* ── Brand tokens ── */
const INK         = "#221F1C";
const INK_SOFT    = "#6B6258";
const GOLD        = "#9C7A3F";
const GOLD_DARK   = "#7A5E30";
const CREAM       = "#F4F1EA";
const CREAM_CARD  = "#FFFDF8";
const BORDER      = "rgba(156,122,63,0.32)";
const BORDER_SOFT = "rgba(156,122,63,0.20)";
const SERIF       = "'Playfair Display', 'Cormorant Garamond', Georgia, serif";

const megaMenuNavItem =
  getMegaMenuNavItem() ?? { label: "Collections", href: "/collections", type: "mega-menu" as const };

// ── Standard nav links ──────────────────────────────────────────────────────
// Inspiration and About Us scroll to existing homepage sections.
// They carry a `sectionId` instead of a hash href so useSectionScroll can
// drive scrollIntoView reliably from any route — including when the URL
// already contains the same hash (plain hash links do nothing in that case).
const navLinks: Array<{
  label: string;
  href: string;
  sectionId?: string;
}> = [
  { label: "Custom Design", href: "/custom-design" },
  { label: "Inspiration",   href: "/", sectionId: "wall-transformations" },
  { label: "About Us",      href: "/", sectionId: "faq" },
  { label: "Contact",       href: "/contact" },
];

// ── Home nav item (placed before Collections) ──────────────────────────────
const homeNavItem = { label: "Home", href: "/" };

// ── Shared brand logo mark ──────────────────────────────────────────────────
// Single source of truth for the logo asset so desktop and mobile never drift
// (mobile was previously pointing at a non-existent "/logo.png", which is why
// it rendered as a broken image). Wrapper sizing/positioning stays with each
// call site so layout/spacing is unaffected.
function BrandLogoMark({ priority = false }: { priority?: boolean }) {
  return (
    <Image
      src="/logo.jpeg"
      alt="Wonder Wallz Logo"
      sizes="128px"
      fill
      className="object-contain"
      priority={priority}
    />
  );
}

// ── Active-route detection (usePathname) ────────────────────────────────────
// "/" matches only the exact home route. Every other href matches itself or
// any nested path beneath it (e.g. "/collections" also matches "/collections/foo").
function isActiveRoute(pathname: string | null, href: string) {
  if (!pathname) return false;
  if (href === "/") return pathname === "/";
  return pathname === href || pathname.startsWith(`${href}/`);
}

// ── Task 5: Review Project handler ──────────────────────────────────────────
function useHandleReviewProject() {
  const cartWorkflow = useProjectCart(selectCartWorkflow);

  return () => {
    switch (cartWorkflow) {
      case "standard":
        console.log("STANDARD FLOW");
        break;
      case "custom":
        console.log("CUSTOM FLOW");
        break;
      case "mixed":
        console.log("MIXED FLOW");
        break;
      default:
        break;
    }
  };
}

export function Navbar() {
  const [scrolled,              setScrolled]              = useState(false);
  const [hidden,                setHidden]                = useState(false);
  const [mobileOpen,            setMobileOpen]            = useState(false);
  const [activeLink,            setActiveLink]            = useState<string | null>(null);
  const [collectionsOpen,       setCollectionsOpen]       = useState(false);
  const [mobileCollectionsOpen, setMobileCollectionsOpen] = useState(false);

  // ── Task 4: Drawer state lives here ─────────────────────────────────────
  const [cartOpen, setCartOpen] = useState(false);
  const openCart  = () => setCartOpen(true);
  const closeCart = () => setCartOpen(false);

  // ── Search modal state ───────────────────────────────────────────────────
  const [searchOpen, setSearchOpen] = useState(false);
  const openSearch  = () => setSearchOpen(true);
  const closeSearch = () => setSearchOpen(false);

  // Task 5
  const handleReviewProject = useHandleReviewProject();

  // ── Reliable section scrolling (Inspiration / About Us) ─────────────────
  const scrollToSection = useSectionScroll();

  // ── Active link highlighting ────────────────────────────────────────────
  const pathname = usePathname();

  const { scrollY } = useScroll();
  const lastY = useRef(0);

  useMotionValueEvent(scrollY, "change", (latest) => {
    setScrolled(latest > 60);
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
      {/* ── Floating Navbar Wrapper ── */}
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
            {/* ── Nav Shell ── */}
            <motion.nav
              className="grid grid-cols-[auto_1fr_auto] items-center px-3 py-2"
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

              {/* ── Logo Badge ── */}
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
                  <div
                    className="relative w-8 h-8 shrink-0"
                    style={{ filter: "drop-shadow(0 1px 2px rgba(122,94,48,0.20))" }}
                  >
                    <BrandLogoMark priority />
                  </div>
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
              <ul className="hidden lg:flex items-center justify-center gap-0.5 mx-3 min-w-0" role="list">

                {/* Home */}
                <li className="relative">
                  <Link
                    href={homeNavItem.href}
                    className="relative px-5 py-2 text-[14px] font-medium block focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 rounded-xl"
                    style={{
                      color: activeLink === homeNavItem.href || isActiveRoute(pathname, homeNavItem.href) ? INK : INK_SOFT,
                      transition: "color 0.15s",
                      outlineColor: GOLD,
                    }}
                    onMouseEnter={() => setActiveLink(homeNavItem.href)}
                    onMouseLeave={() => setActiveLink(null)}
                  >
                    {homeNavItem.label}
                    <AnimatePresence>
                      {(activeLink === homeNavItem.href || isActiveRoute(pathname, homeNavItem.href)) && (
                        <motion.span
                          className="absolute bottom-0 left-5 right-5 h-[1.5px] rounded-full"
                          style={{ background: GOLD }}
                          initial={{ scaleX: 0, originX: 0 }}
                          animate={{ scaleX: 1 }}
                          exit={{ scaleX: 0, originX: 1 }}
                          transition={{ duration: 0.2, ease: "easeOut" }}
                        />
                      )}
                    </AnimatePresence>
                  </Link>
                </li>

                {/* Collections — mega-menu */}
                <li
                  className="relative"
                  onMouseEnter={() => { setActiveLink(megaMenuNavItem.href); setCollectionsOpen(true); }}
                  onMouseLeave={() => { setActiveLink(null); setCollectionsOpen(false); }}
                >
                  <Link
                    href={megaMenuNavItem.href}
                    className="relative px-5 py-2 text-[14px] font-medium block focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 rounded-xl"
                    style={{
                      color: activeLink === megaMenuNavItem.href || isActiveRoute(pathname, megaMenuNavItem.href) ? INK : INK_SOFT,
                      transition: "color 0.15s",
                      outlineColor: GOLD,
                    }}
                  >
                    <span className="flex items-center gap-1">
                      {megaMenuNavItem.label}
                      <motion.span
                        animate={{ rotate: collectionsOpen ? 180 : 0 }}
                        transition={{ duration: 0.2 }}
                        className="flex items-center"
                      >
                        <ChevronDown size={13} style={{ color: GOLD_DARK }} />
                      </motion.span>
                    </span>

                    {/* Active underline */}
                    <AnimatePresence>
                      {(activeLink === megaMenuNavItem.href || isActiveRoute(pathname, megaMenuNavItem.href)) && (
                        <motion.span
                          className="absolute bottom-0 left-5 right-5 h-[1.5px] rounded-full"
                          style={{ background: GOLD }}
                          initial={{ scaleX: 0, originX: 0 }}
                          animate={{ scaleX: 1 }}
                          exit={{ scaleX: 0, originX: 1 }}
                          transition={{ duration: 0.2, ease: "easeOut" }}
                        />
                      )}
                    </AnimatePresence>
                  </Link>

                  {/* Mega-menu panel */}
                  <AnimatePresence>
                    {collectionsOpen && (
                      <motion.div
                        initial={{ opacity: 0, y: 8 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 4 }}
                        transition={{ duration: 0.18, ease: "easeOut" }}
                        className="absolute top-full left-1/2 -translate-x-1/2 mt-3 w-[600px] rounded-2xl p-5 grid grid-cols-2 gap-2"
                        style={{
                          background: "rgba(250,247,242,0.98)",
                          backdropFilter: "blur(24px)",
                          border: `1px solid ${BORDER}`,
                          boxShadow: "0 16px 48px rgba(40,30,10,0.14)",
                        }}
                      >
                        {products.map((product) => (
                          <Link
                            key={product.id}
                            href={product.href}
                            className="flex items-start gap-3 p-3 rounded-xl transition-colors group"
                            style={{ borderRadius: "12px" }}
                            onMouseEnter={e => (e.currentTarget.style.background = "#F4ECDA")}
                            onMouseLeave={e => (e.currentTarget.style.background = "transparent")}
                          >
                            <div
                              className="w-10 h-10 rounded-lg shrink-0 mt-0.5"
                              style={{
                                background: `linear-gradient(135deg, ${product.placeholderGradient[0]}, ${product.placeholderGradient[1]})`,
                              }}
                            />
                            <div>
                              <p className="text-[13.5px] font-semibold" style={{ color: INK, fontFamily: SERIF }}>
                                {product.title}
                              </p>
                              <p className="text-[12px] mt-0.5" style={{ color: INK_SOFT }}>
                                {product.description}
                              </p>
                            </div>
                          </Link>
                        ))}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </li>

                {navLinks.map((link) => (
                  <li key={link.href + (link.sectionId ?? "")} className="relative">
                    {link.sectionId ? (
                      // Section link — use a button so scrollToSection fires
                      // every click, even when the URL hash hasn't changed.
                      <button
                        type="button"
                        className="relative px-5 py-2 text-[14px] font-medium block focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 rounded-xl"
                        style={{
                          color: activeLink === link.sectionId ? INK : INK_SOFT,
                          transition: "color 0.15s",
                          outlineColor: GOLD,
                          background: "none",
                          border: "none",
                          cursor: "pointer",
                        }}
                        onClick={() => scrollToSection(link.sectionId!)}
                        onMouseEnter={() => setActiveLink(link.sectionId!)}
                        onMouseLeave={() => setActiveLink(null)}
                      >
                        {link.label}
                        <AnimatePresence>
                          {activeLink === link.sectionId && (
                            <motion.span
                              className="absolute bottom-0 left-5 right-5 h-[1.5px] rounded-full"
                              style={{ background: GOLD }}
                              initial={{ scaleX: 0, originX: 0 }}
                              animate={{ scaleX: 1 }}
                              exit={{ scaleX: 0, originX: 1 }}
                              transition={{ duration: 0.2, ease: "easeOut" }}
                            />
                          )}
                        </AnimatePresence>
                      </button>
                    ) : (
                      <Link
                        href={link.href}
                        className="relative px-5 py-2 text-[14px] font-medium block focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 rounded-xl"
                        style={{
                          color: activeLink === link.href || isActiveRoute(pathname, link.href) ? INK : INK_SOFT,
                          transition: "color 0.15s",
                          outlineColor: GOLD,
                        }}
                        onMouseEnter={() => setActiveLink(link.href)}
                        onMouseLeave={() => setActiveLink(null)}
                      >
                        {link.label}
                        <AnimatePresence>
                          {(activeLink === link.href || isActiveRoute(pathname, link.href)) && (
                            <motion.span
                              className="absolute bottom-0 left-5 right-5 h-[1.5px] rounded-full"
                              style={{ background: GOLD }}
                              initial={{ scaleX: 0, originX: 0 }}
                              animate={{ scaleX: 1 }}
                              exit={{ scaleX: 0, originX: 1 }}
                              transition={{ duration: 0.2, ease: "easeOut" }}
                            />
                          )}
                        </AnimatePresence>
                      </Link>
                    )}
                  </li>
                ))}
              </ul>

              {/* ── Right Icon Group ── */}
              <div className="flex items-center gap-1.5 pr-0.5 shrink-0 justify-self-end">
                <CircleIconBtn aria-label="Search" onClick={openSearch}>
                  <Search size={16} />
                </CircleIconBtn>

                {/* Task 2 + 4: Live cart button — opens the drawer */}
                <ProjectCartButton onOpen={openCart} variant="icon" />

                {/* Mobile hamburger */}
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
                <div
                  className="flex items-center gap-2 rounded-2xl px-3 py-1.5"
                  style={{
                    background: "linear-gradient(135deg, #FFFDF8 0%, #F7F1E6 100%)",
                    boxShadow: "0 2px 12px rgba(156,122,63,0.16)",
                    border: `1px solid ${BORDER_SOFT}`,
                  }}
                >
                  <div className="relative w-7 h-7">
                    <BrandLogoMark />
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

                {/* Home */}
                <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0 }}>
                  <Link
                    href={homeNavItem.href}
                    onClick={() => setMobileOpen(false)}
                    className="flex items-center px-4 py-3 rounded-xl text-[15px] font-semibold transition-colors"
                    style={{ color: isActiveRoute(pathname, homeNavItem.href) ? GOLD_DARK : INK, fontFamily: SERIF }}
                    onMouseEnter={(e) => (e.currentTarget.style.background = "#F4ECDA")}
                    onMouseLeave={(e) => (e.currentTarget.style.background = "transparent")}
                  >
                    {homeNavItem.label}
                  </Link>
                </motion.div>

                {/* Collections — expandable accordion */}
                <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.06 }}>
                  <button
                    onClick={() => setMobileCollectionsOpen((v) => !v)}
                    className="w-full flex items-center justify-between px-4 py-3 rounded-xl text-[15px] font-semibold transition-colors"
                    style={{ color: isActiveRoute(pathname, megaMenuNavItem.href) ? GOLD_DARK : INK, fontFamily: SERIF }}
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
                    key={link.href + (link.sectionId ?? "")}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: (i + 2) * 0.06 }}
                  >
                    {link.sectionId ? (
                      <button
                        type="button"
                        className="w-full flex items-center px-4 py-3 rounded-xl text-[15px] font-semibold transition-colors"
                        style={{ color: INK, fontFamily: SERIF, background: "none", border: "none", cursor: "pointer" }}
                        onClick={() => { setMobileOpen(false); scrollToSection(link.sectionId!); }}
                        onMouseEnter={(e) => (e.currentTarget.style.background = "#F4ECDA")}
                        onMouseLeave={(e) => (e.currentTarget.style.background = "transparent")}
                      >
                        {link.label}
                      </button>
                    ) : (
                      <Link
                        href={link.href}
                        onClick={() => setMobileOpen(false)}
                        className="flex items-center px-4 py-3 rounded-xl text-[15px] font-semibold transition-colors"
                        style={{ color: isActiveRoute(pathname, link.href) ? GOLD_DARK : INK, fontFamily: SERIF }}
                        onMouseEnter={(e) => (e.currentTarget.style.background = "#F4ECDA")}
                        onMouseLeave={(e) => (e.currentTarget.style.background = "transparent")}
                      >
                        {link.label}
                      </Link>
                    )}
                  </motion.div>
                ))}
              </nav>

              {/* Bottom icon row — Task 3: mobile cart button */}
              <div
                className="flex items-center gap-3 px-6 py-4 border-t"
                style={{ borderColor: BORDER_SOFT }}
              >
                <button className="flex items-center gap-1.5 text-xs font-semibold" style={{ color: INK_SOFT }} onClick={() => { setMobileOpen(false); openSearch(); }}>
                  <Search size={15} /> Search
                </button>
                {/* Task 3: live cart button in mobile bar */}
                <ProjectCartButton
                  onOpen={() => { setMobileOpen(false); openCart(); }}
                  variant="row"
                />
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* ── Task 4: Project Cart Drawer ── */}
      <ProjectCartDrawer isOpen={cartOpen} onClose={closeCart} />

      {/* ── Search Modal ── */}
      <SearchModal isOpen={searchOpen} onClose={closeSearch} onOpen={openSearch} />
    </>
  );
}

/* ── Circular Icon Button ── */
function CircleIconBtn({
  children,
  className = "",
  onClick,
  "aria-label": ariaLabel,
}: {
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
  "aria-label": string;
}) {
  return (
    <motion.button
      aria-label={ariaLabel}
      onClick={onClick}
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
