"use client";

/**
 * src/components/Search/SearchModal.tsx
 *
 * Self-contained search modal for Wonder Wallz.
 *
 * Features
 * ─────────
 * • Ctrl/⌘+K global shortcut to open, Esc to close
 * • ↑ / ↓ keyboard navigation, Enter to confirm
 * • Autofocused input with instant-filter results
 * • Popular searches shown when the input is empty
 * • Framer Motion: fade backdrop, scale modal, staggered results
 * • Full Wonder Wallz design system (tokens from Navbar)
 * • Modular — zero coupling to Navbar internals
 *
 * Usage
 * ─────
 * 1. Mount <SearchModal isOpen={open} onClose={() => setOpen(false)} />
 *    anywhere in the tree (e.g. inside Navbar's return, after the drawer).
 * 2. Optionally wire the Ctrl+K handler in a parent, or let the modal
 *    register it internally (it does both — parent wins when isOpen is
 *    already controlled externally).
 */

import {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import { Search, X, ArrowRight, Hash, Layers, Package } from "lucide-react";
import { querySearchIndex, SearchEntry, SearchEntryKind } from "@/lib/searchIndex";

// ─── Design tokens (mirrored from Navbar) ─────────────────────────────────────
const INK        = "#221F1C";
const INK_SOFT   = "#6B6258";
const INK_MUTED  = "#A09485";
const GOLD       = "#9C7A3F";
const GOLD_DARK  = "#7A5E30";
const GOLD_LIGHT = "rgba(156,122,63,0.12)";
const CREAM      = "#F4F1EA";
const CREAM_CARD = "#FFFDF8";
const BORDER     = "rgba(156,122,63,0.28)";
const BORDER_SOFT= "rgba(156,122,63,0.18)";
const SERIF      = "'Playfair Display', 'Cormorant Garamond', Georgia, serif";
const SANS       = "'Inter', system-ui, -apple-system, sans-serif";

// ─── Popular suggestions ───────────────────────────────────────────────────────
const POPULAR_SEARCHES = [
  "Wallpapers",
  "Pichwai",
  "Floral",
  "Kids",
  "Marble",
  "Flooring",
  "Blinds",
  "Curtains",
  "Glass Films",
  "Canvas Prints",
];

// ─── Kind → icon / badge ───────────────────────────────────────────────────────
const KIND_META: Record<SearchEntryKind, { icon: React.ReactNode; badge: string; color: string }> = {
  product: {
    icon: <Package size={13} />,
    badge: "Product",
    color: GOLD,
  },
  collection: {
    icon: <Layers size={13} />,
    badge: "Collection",
    color: "#6B6258",
  },
  subcategory: {
    icon: <Hash size={13} />,
    badge: "Category",
    color: "#8A7B6A",
  },
};

// ─── Props ─────────────────────────────────────────────────────────────────────
export interface SearchModalProps {
  isOpen: boolean;
  onClose: () => void;
  /** Lift the open trigger up to a parent so Ctrl+K can also be handled there */
  onOpen?: () => void;
}

// ─── Component ─────────────────────────────────────────────────────────────────
export function SearchModal({ isOpen, onClose, onOpen }: SearchModalProps) {
  const [query,   setQuery]   = useState("");
  const [cursor,  setCursor]  = useState(-1);
  const inputRef  = useRef<HTMLInputElement>(null);
  const listRef   = useRef<HTMLUListElement>(null);

  // ── Derived results ──────────────────────────────────────────────────────────
  const results: SearchEntry[] = useMemo(
    () => (query.trim().length >= 1 ? querySearchIndex(query) : []),
    [query]
  );

  // ── Reset state when modal opens / closes ────────────────────────────────────
  useEffect(() => {
    if (isOpen) {
      setQuery("");
      setCursor(-1);
      // Autofocus after mount animation completes
      const t = setTimeout(() => inputRef.current?.focus(), 80);
      return () => clearTimeout(t);
    }
  }, [isOpen]);

  // ── Body scroll lock ─────────────────────────────────────────────────────────
  useEffect(() => {
    if (isOpen) {
      const prev = document.body.style.overflow;
      document.body.style.overflow = "hidden";
      return () => { document.body.style.overflow = prev; };
    }
  }, [isOpen]);

  // ── Global Ctrl/⌘+K shortcut ─────────────────────────────────────────────────
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault();
        if (isOpen) onClose();
        else onOpen?.();
      }
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [isOpen, onClose, onOpen]);

  // ── Keyboard navigation inside modal ─────────────────────────────────────────
  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent<HTMLInputElement>) => {
      if (e.key === "Escape") {
        onClose();
        return;
      }
      if (results.length === 0) return;

      if (e.key === "ArrowDown") {
        e.preventDefault();
        setCursor((c) => (c + 1) % results.length);
      } else if (e.key === "ArrowUp") {
        e.preventDefault();
        setCursor((c) => (c <= 0 ? results.length - 1 : c - 1));
      } else if (e.key === "Enter" && cursor >= 0) {
        e.preventDefault();
        const href = results[cursor]?.href;
        if (href) {
          onClose();
          // Next.js router is not imported here to keep this component
          // framework-portable. We use a standard anchor navigation.
          window.location.href = href;
        }
      }
    },
    [results, cursor, onClose]
  );

  // ── Scroll active result into view ──────────────────────────────────────────
  useEffect(() => {
    if (cursor < 0) return;
    const item = listRef.current?.children[cursor] as HTMLElement | undefined;
    item?.scrollIntoView({ block: "nearest" });
  }, [cursor]);

  // ── Reset cursor when results change ────────────────────────────────────────
  useEffect(() => { setCursor(-1); }, [results]);

  const handleSuggestion = (s: string) => {
    setQuery(s);
    inputRef.current?.focus();
  };

  const showEmpty = query.trim().length === 0;
  const showNoResults = query.trim().length >= 1 && results.length === 0;

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* ── Backdrop ── */}
          <motion.div
            key="search-backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.22, ease: "easeOut" }}
            onClick={onClose}
            style={{
              position: "fixed",
              inset: 0,
              zIndex: 200,
              background: "rgba(34,31,28,0.54)",
              backdropFilter: "blur(6px)",
              WebkitBackdropFilter: "blur(6px)",
            }}
            aria-hidden="true"
          />

          {/* ── Modal ── */}
          <motion.div
            key="search-modal"
            role="dialog"
            aria-modal="true"
            aria-label="Site search"
            initial={{ opacity: 0, scale: 0.96, y: -8 }}
            animate={{ opacity: 1, scale: 1,    y: 0  }}
            exit={{ opacity: 0, scale: 0.96, y: -8  }}
            transition={{ duration: 0.24, ease: [0.25, 0.46, 0.45, 0.94] }}
            style={{
              position: "fixed",
              top: "clamp(5vh, 10vh, 10vh)",
              left: "50%",
              transform: "translateX(-50%)",
              zIndex: 201,
              width: "min(640px, calc(100vw - 2rem))",
              maxHeight: "min(680px, calc(100vh - 12vh))",
              display: "flex",
              flexDirection: "column",
              borderRadius: "20px",
              background: CREAM_CARD,
              border: `1px solid ${BORDER}`,
              boxShadow: "0 24px 80px rgba(34,31,28,0.24), 0 4px 16px rgba(156,122,63,0.12)",
              overflow: "hidden",
            }}
          >
            {/* ── Input row ── */}
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: "10px",
                padding: "14px 16px",
                borderBottom: `1px solid ${BORDER_SOFT}`,
                background: CREAM_CARD,
                flexShrink: 0,
              }}
            >
              <Search size={18} style={{ color: GOLD, flexShrink: 0 }} />
              <input
                ref={inputRef}
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder="Search wallpapers, blinds, flooring..."
                aria-label="Search"
                aria-autocomplete="list"
                aria-controls="search-results"
                style={{
                  flex: 1,
                  border: "none",
                  outline: "none",
                  background: "transparent",
                  fontSize: "15px",
                  fontFamily: SANS,
                  color: INK,
                  letterSpacing: "0.01em",
                }}
                spellCheck={false}
                autoComplete="off"
              />
              {query.length > 0 && (
                <motion.button
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.8 }}
                  onClick={() => { setQuery(""); inputRef.current?.focus(); }}
                  aria-label="Clear search"
                  style={{
                    border: "none",
                    background: GOLD_LIGHT,
                    borderRadius: "50%",
                    width: 26,
                    height: 26,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    cursor: "pointer",
                    color: GOLD_DARK,
                    flexShrink: 0,
                  }}
                >
                  <X size={13} />
                </motion.button>
              )}
              <button
                onClick={onClose}
                aria-label="Close search"
                style={{
                  border: `1px solid ${BORDER_SOFT}`,
                  background: "transparent",
                  borderRadius: "6px",
                  padding: "2px 7px",
                  fontSize: "11px",
                  fontFamily: SANS,
                  color: INK_MUTED,
                  cursor: "pointer",
                  letterSpacing: "0.02em",
                  flexShrink: 0,
                }}
              >
                Esc
              </button>
            </div>

            {/* ── Body ── */}
            <div style={{ overflowY: "auto", flex: 1 }}>

              {/* Empty state — popular searches */}
              {showEmpty && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.18 }}
                  style={{ padding: "20px 16px" }}
                >
                  <p
                    style={{
                      fontSize: "11px",
                      fontFamily: SANS,
                      fontWeight: 600,
                      letterSpacing: "0.08em",
                      textTransform: "uppercase",
                      color: INK_MUTED,
                      marginBottom: "12px",
                    }}
                  >
                    Popular Searches
                  </p>
                  <div style={{ display: "flex", flexWrap: "wrap", gap: "8px" }}>
                    {POPULAR_SEARCHES.map((s) => (
                      <motion.button
                        key={s}
                        whileHover={{ scale: 1.03 }}
                        whileTap={{ scale: 0.97 }}
                        onClick={() => handleSuggestion(s)}
                        style={{
                          border: `1px solid ${BORDER}`,
                          background: CREAM,
                          borderRadius: "9999px",
                          padding: "6px 14px",
                          fontSize: "13px",
                          fontFamily: SANS,
                          color: INK_SOFT,
                          cursor: "pointer",
                          letterSpacing: "0.01em",
                          transition: "background 0.15s, color 0.15s",
                        }}
                        onMouseEnter={(e) => {
                          e.currentTarget.style.background = GOLD_LIGHT;
                          e.currentTarget.style.color = GOLD_DARK;
                          e.currentTarget.style.borderColor = "rgba(156,122,63,0.4)";
                        }}
                        onMouseLeave={(e) => {
                          e.currentTarget.style.background = CREAM;
                          e.currentTarget.style.color = INK_SOFT;
                          e.currentTarget.style.borderColor = BORDER;
                        }}
                      >
                        {s}
                      </motion.button>
                    ))}
                  </div>
                </motion.div>
              )}

              {/* No results */}
              {showNoResults && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  style={{
                    padding: "40px 16px",
                    textAlign: "center",
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    gap: "8px",
                  }}
                >
                  <Search size={28} style={{ color: BORDER }} />
                  <p style={{ fontFamily: SERIF, fontSize: "16px", color: INK, fontWeight: 600 }}>
                    No results for "{query}"
                  </p>
                  <p style={{ fontFamily: SANS, fontSize: "13px", color: INK_MUTED }}>
                    Try a different spelling or browse our collections below.
                  </p>
                  <Link
                    href="/collections"
                    onClick={onClose}
                    style={{
                      marginTop: "8px",
                      display: "inline-flex",
                      alignItems: "center",
                      gap: "6px",
                      fontSize: "13px",
                      fontFamily: SANS,
                      fontWeight: 600,
                      color: GOLD_DARK,
                      textDecoration: "none",
                    }}
                  >
                    Browse all collections <ArrowRight size={13} />
                  </Link>
                </motion.div>
              )}

              {/* Results list */}
              {results.length > 0 && (
                <ul
                  id="search-results"
                  ref={listRef}
                  role="listbox"
                  aria-label="Search results"
                  style={{ listStyle: "none", margin: 0, padding: "8px 0" }}
                >
                  {results.map((entry, i) => {
                    const meta = KIND_META[entry.kind];
                    const isActive = i === cursor;
                    return (
                      <motion.li
                        key={entry.id}
                        role="option"
                        aria-selected={isActive}
                        initial={{ opacity: 0, x: -4 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.14, delay: i * 0.025 }}
                      >
                        <Link
                          href={entry.href}
                          onClick={onClose}
                          style={{
                            display: "flex",
                            alignItems: "center",
                            gap: "12px",
                            padding: "10px 16px",
                            textDecoration: "none",
                            background: isActive ? GOLD_LIGHT : "transparent",
                            transition: "background 0.12s",
                            cursor: "pointer",
                          }}
                          onMouseEnter={(e) => {
                            setCursor(i);
                            (e.currentTarget as HTMLAnchorElement).style.background = GOLD_LIGHT;
                          }}
                          onMouseLeave={(e) => {
                            (e.currentTarget as HTMLAnchorElement).style.background = isActive ? GOLD_LIGHT : "transparent";
                          }}
                        >
                          {/* Icon badge */}
                          <span
                            style={{
                              width: 32,
                              height: 32,
                              borderRadius: "8px",
                              background: isActive ? "rgba(156,122,63,0.18)" : CREAM,
                              border: `1px solid ${BORDER_SOFT}`,
                              display: "flex",
                              alignItems: "center",
                              justifyContent: "center",
                              flexShrink: 0,
                              color: meta.color,
                            }}
                          >
                            {meta.icon}
                          </span>

                          {/* Title + description */}
                          <span style={{ flex: 1, minWidth: 0 }}>
                            <span
                              style={{
                                display: "block",
                                fontSize: "14px",
                                fontFamily: SANS,
                                fontWeight: 600,
                                color: INK,
                                letterSpacing: "0.005em",
                                whiteSpace: "nowrap",
                                overflow: "hidden",
                                textOverflow: "ellipsis",
                              }}
                            >
                              {entry.title}
                            </span>
                            <span
                              style={{
                                display: "block",
                                fontSize: "12px",
                                fontFamily: SANS,
                                color: INK_MUTED,
                                whiteSpace: "nowrap",
                                overflow: "hidden",
                                textOverflow: "ellipsis",
                              }}
                            >
                              {entry.description}
                            </span>
                          </span>

                          {/* Kind pill */}
                          <span
                            style={{
                              fontSize: "10.5px",
                              fontFamily: SANS,
                              fontWeight: 600,
                              letterSpacing: "0.06em",
                              textTransform: "uppercase",
                              color: meta.color,
                              background: isActive ? "rgba(156,122,63,0.16)" : CREAM,
                              border: `1px solid ${BORDER_SOFT}`,
                              borderRadius: "9999px",
                              padding: "2px 8px",
                              flexShrink: 0,
                            }}
                          >
                            {meta.badge}
                          </span>
                        </Link>
                      </motion.li>
                    );
                  })}
                </ul>
              )}
            </div>

            {/* ── Footer hint ── */}
            {!showEmpty && (
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "16px",
                  padding: "10px 16px",
                  borderTop: `1px solid ${BORDER_SOFT}`,
                  flexShrink: 0,
                  background: CREAM,
                }}
              >
                {[
                  { key: "↑↓", label: "navigate" },
                  { key: "↵", label: "open" },
                  { key: "Esc", label: "close" },
                ].map(({ key, label }) => (
                  <span
                    key={key}
                    style={{
                      display: "inline-flex",
                      alignItems: "center",
                      gap: "4px",
                      fontSize: "11px",
                      fontFamily: SANS,
                      color: INK_MUTED,
                    }}
                  >
                    <kbd
                      style={{
                        border: `1px solid ${BORDER}`,
                        borderRadius: "4px",
                        padding: "1px 5px",
                        fontSize: "10px",
                        fontFamily: SANS,
                        color: INK_SOFT,
                        background: CREAM_CARD,
                      }}
                    >
                      {key}
                    </kbd>
                    {label}
                  </span>
                ))}
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
