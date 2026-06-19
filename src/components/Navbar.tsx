"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion, useScroll, useMotionValueEvent, AnimatePresence } from "framer-motion";
import { ShoppingBag, Search, User, X, Menu } from "lucide-react";

const navLinks = [
  { label: "Collections", href: "/collections" },
  { label: "Murals",      href: "/murals" },
  { label: "Textures",    href: "/textures" },
  { label: "Lookbook",    href: "/lookbook" },
  { label: "About",       href: "/about" },
];

export function Navbar() {
  const [scrolled,   setScrolled]   = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [activeLink, setActiveLink] = useState<string | null>(null);
  const { scrollY } = useScroll();

  useMotionValueEvent(scrollY, "change", (latest) => {
    setScrolled(latest > 100);
  });

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [mobileOpen]);

  return (
    <>
      {/* ── Floating Navbar Wrapper ── */}
      <motion.div
        className="fixed top-0 left-0 right-0 z-50 flex justify-center"
        animate={{
          paddingLeft:  scrolled ? "1.25rem" : "0.5rem",
          paddingRight: scrolled ? "1.25rem" : "0.5rem",
          paddingTop:   scrolled ? "0.75rem" : "0.5rem",
        }}
        transition={{ duration: 0.4, ease: "easeOut" }}
      >
        <motion.header
          className="w-full"
          animate={{
            maxWidth: scrolled ? "860px" : "1600px",
            scale:    scrolled ? 1 : 1.02,
            y:        scrolled ? 0 : 4,
            filter: scrolled
              ? "drop-shadow(0 8px 32px rgba(0,0,0,0.18))"
              : "drop-shadow(0 4px 16px rgba(0,0,0,0.10))",
          }}
          transition={{ duration: 0.4, ease: "easeOut" }}
        >
          {/* ── Nav Shell — always pill, always frosted ── */}
          <motion.nav
            className="flex items-center justify-between px-3 py-2.5"
            animate={{
              borderRadius: "9999px",
              // Warm frosted glass — matches the beige/cream in the screenshot
              background: scrolled
                ? "rgba(240,236,228,0.82)"
                : "rgba(240,236,228,0.70)",
              backdropFilter: "blur(24px)",
              WebkitBackdropFilter: "blur(24px)",
              borderColor: scrolled
                ? "rgba(200,190,175,0.55)"
                : "rgba(200,190,175,0.40)",
            }}
            style={{
              border: "1px solid transparent",
            }}
            transition={{ duration: 0.4, ease: "easeOut" }}
            aria-label="Main navigation"
          >

            {/* ── Logo Badge — always visible with gradient border ── */}
            <Link
              href="/"
              aria-label="Wonder Wallz home"
              className="flex items-center gap-2.5 shrink-0 relative rounded-2xl px-3.5 py-2"
              style={{
                background: "linear-gradient(135deg, #fdfaff 0%, #fff9f5 100%)",
                boxShadow: "0 1px 8px rgba(139,63,200,0.12)",
              }}
            >
              {/* Gradient border ring */}
              <span
                aria-hidden
                style={{
                  position: "absolute",
                  inset: 0,
                  borderRadius: "inherit",
                  padding: "1.5px",
                  background: "linear-gradient(135deg, #00BDB0, #7C3AED 40%, #F97316)",
                  WebkitMask: "linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)",
                  WebkitMaskComposite: "xor",
                  maskComposite: "exclude",
                  pointerEvents: "none",
                }}
              />

              {/* Logo image */}
              <div
                className="relative w-9 h-9 shrink-0"
                style={{ filter: "drop-shadow(0 1px 2px rgba(139,63,200,0.20))" }}
              >
                <Image
                  src="/logo.png"
                  alt="Wonder Wallz Logo"
                  fill
                  className="object-contain"
                  priority
                />
              </div>

              {/* Wordmark */}
              <span
                className="font-extrabold text-sm uppercase whitespace-nowrap"
                style={{ letterSpacing: "0.10em" }}
              >
                <span style={{ color: "#7C3AED" }}>Wonder</span>
                <span style={{ color: "#d1c4e0", fontWeight: 300, margin: "0 2px" }}>·</span>
                <span style={{ color: "#F97316" }}>Wallz</span>
              </span>
            </Link>

            {/* ── Desktop Nav Links ── */}
            <ul className="hidden lg:flex items-center gap-0 mx-2" role="list">
              {navLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="relative px-4 py-2 text-sm font-medium tracking-wide block"
                    style={{
                      color: activeLink === link.href ? "#1a1a1a" : "#4a4a4a",
                      transition: "color 0.15s",
                    }}
                    onMouseEnter={() => setActiveLink(link.href)}
                    onMouseLeave={() => setActiveLink(null)}
                  >
                    {/* Subtle hover bg pill */}
                    <AnimatePresence>
                      {activeLink === link.href && (
                        <motion.span
                          className="absolute inset-0 rounded-xl"
                          style={{ background: "rgba(139,63,200,0.06)" }}
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          exit={{ opacity: 0 }}
                          transition={{ duration: 0.15 }}
                        />
                      )}
                    </AnimatePresence>

                    <span className="relative z-10">{link.label}</span>

                    {/* Animated underline */}
                    <AnimatePresence>
                      {activeLink === link.href && (
                        <motion.span
                          className="absolute left-4 right-4 rounded-full"
                          style={{
                            bottom: "4px",
                            height: "2px",
                            background: "linear-gradient(90deg, #00BDB0, #7C3AED, #F97316)",
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
            <div className="flex items-center gap-1 pr-1">
              <CircleIconBtn aria-label="Search">
                <Search size={16} />
              </CircleIconBtn>

              <CircleIconBtn aria-label="Account" className="hidden md:flex">
                <User size={16} />
              </CircleIconBtn>

              <CircleIconBtn aria-label="Cart (0 items)" className="relative">
                <ShoppingBag size={16} />
                <span
                  className="absolute -top-0.5 -right-0.5 flex items-center justify-center w-4 h-4 rounded-full text-[9px] font-bold text-white"
                  style={{ backgroundColor: "#F97316" }}
                >
                  0
                </span>
              </CircleIconBtn>

              {/* Mobile hamburger */}
              <motion.button
                className="lg:hidden flex items-center justify-center w-9 h-9 rounded-full ml-0.5"
                style={{
                  background: "rgba(255,255,255,0.7)",
                  border: "1px solid rgba(200,190,175,0.5)",
                  color: "#555",
                }}
                onClick={() => setMobileOpen(true)}
                aria-label="Open menu"
                aria-expanded={mobileOpen}
                whileHover={{ backgroundColor: "#fff", color: "#7C3AED" }}
                whileTap={{ scale: 0.92 }}
                transition={{ duration: 0.15 }}
              >
                <Menu size={18} />
              </motion.button>
            </div>
          </motion.nav>
        </motion.header>
      </motion.div>

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
                boxShadow: "-4px 0 40px rgba(139,63,200,0.12)",
                borderLeft: "1px solid rgba(200,190,175,0.40)",
              }}
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
            >
              {/* Top gradient accent bar */}
              <div
                className="h-1 shrink-0"
                style={{ background: "linear-gradient(90deg, #00BDB0, #7C3AED, #F97316)" }}
              />

              {/* Drawer header */}
              <div
                className="flex items-center justify-between px-5 py-4 border-b"
                style={{ borderColor: "rgba(200,190,175,0.35)" }}
              >
                {/* Logo badge */}
                <div
                  className="flex items-center gap-2 rounded-2xl px-3 py-1.5 relative"
                  style={{
                    background: "linear-gradient(135deg, #fdfaff 0%, #fff9f5 100%)",
                    boxShadow: "0 2px 12px rgba(139,63,200,0.12)",
                  }}
                >
                  <span
                    aria-hidden
                    style={{
                      position: "absolute",
                      inset: 0,
                      borderRadius: "inherit",
                      padding: "1.5px",
                      background: "linear-gradient(135deg, #00BDB0, #7C3AED 50%, #F97316)",
                      WebkitMask: "linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)",
                      WebkitMaskComposite: "xor",
                      maskComposite: "exclude",
                      pointerEvents: "none",
                    }}
                  />
                  <div className="relative w-7 h-7">
                    <Image src="/logo.png" alt="Wonder Wallz" fill className="object-contain" />
                  </div>
                  <span className="font-extrabold text-xs uppercase whitespace-nowrap" style={{ letterSpacing: "0.10em" }}>
                    <span style={{ color: "#7C3AED" }}>Wonder</span>
                    <span style={{ color: "#d1c4e0", fontWeight: 300, margin: "0 1px" }}>·</span>
                    <span style={{ color: "#F97316" }}>Wallz</span>
                  </span>
                </div>

                <button
                  onClick={() => setMobileOpen(false)}
                  className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-purple-50 transition-colors"
                  aria-label="Close menu"
                  style={{ color: "#666" }}
                >
                  <X size={18} />
                </button>
              </div>

              {/* Drawer links */}
              <nav className="flex flex-col px-4 py-5 gap-1 flex-1">
                {navLinks.map((link, i) => (
                  <motion.div
                    key={link.href}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.06 }}
                  >
                    <Link
                      href={link.href}
                      onClick={() => setMobileOpen(false)}
                      className="flex items-center px-4 py-3 rounded-xl text-sm font-semibold tracking-wide transition-colors hover:bg-purple-50"
                      style={{ color: "#333" }}
                    >
                      {link.label}
                    </Link>
                  </motion.div>
                ))}
              </nav>

              {/* Bottom icon row */}
              <div
                className="flex items-center gap-3 px-6 py-4 border-t"
                style={{ borderColor: "rgba(200,190,175,0.35)" }}
              >
                <button className="flex items-center gap-1.5 text-xs font-semibold" style={{ color: "#555" }}>
                  <Search size={15} /> Search
                </button>
                <button className="flex items-center gap-1.5 text-xs font-semibold" style={{ color: "#555" }}>
                  <User size={15} /> Account
                </button>
                <button className="flex items-center gap-1.5 text-xs font-semibold ml-auto relative" style={{ color: "#555" }}>
                  <ShoppingBag size={15} /> Cart
                  <span
                    className="flex items-center justify-center w-4 h-4 rounded-full text-[9px] font-bold text-white"
                    style={{ backgroundColor: "#F97316" }}
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

/* ── Circular Icon Button (matches screenshot's round ghost buttons) ── */
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
        color: "#555",
        background: "rgba(255,255,255,0.70)",
        border: "1px solid rgba(200,190,175,0.50)",
      }}
      whileHover={{
        backgroundColor: "#ffffff",
        color: "#7C3AED",
        borderColor: "rgba(124,58,237,0.25)",
      }}
      whileTap={{ scale: 0.92 }}
      transition={{ duration: 0.15 }}
    >
      {children}
    </motion.button>
  );
}
