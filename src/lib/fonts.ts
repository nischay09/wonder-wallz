/**
 * Shared brand type pairing — loaded once via next/font/google and reused
 * anywhere the catalog UI appears (homepage, navbar dropdown, collection
 * pages). Using next/font keeps this self-hosted, render-blocking-free, and
 * Lighthouse-friendly (no third-party @import/<link> calls).
 *
 * Usage:
 *   import { fraunces, inter } from "@/lib/fonts";
 *   <section className={`${fraunces.variable} ${inter.variable}`}>...
 *   <h2 className="font-[family-name:var(--font-display)]">...
 */

import { Fraunces, Inter } from "next/font/google";

export const fraunces = Fraunces({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  style: ["normal", "italic"],
  variable: "--font-display",
  display: "swap",
});

export const inter = Inter({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-body",
  display: "swap",
});
