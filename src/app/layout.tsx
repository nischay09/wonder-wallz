import type { Metadata, Viewport } from "next";
import { Playfair_Display, DM_Sans, Geist } from "next/font/google";
import "./globals.css";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { cn } from "@/lib/utils";

const geist = Geist({subsets:['latin'],variable:'--font-sans'});

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
  display: "swap",
  weight: ["400", "500", "600", "700"],
});

const dmSans = DM_Sans({
  subsets: ["latin"],
  variable: "--font-dm-sans",
  display: "swap",
  weight: ["300", "400", "500", "600"],
});

// NOTE (SEO audit): metadataBase was previously only declared on the
// homepage's metadata export. Declaring it here on the root layout means
// EVERY route (including ones that don't set their own metadataBase, e.g.
// /contact) resolves relative OG/canonical URLs against the correct domain
// instead of silently falling back to Next's localhost default.
export const metadata: Metadata = {
  metadataBase: new URL("https://wonderwallz.in"),
  title: {
    default: "Wonder Wallz — Statement Wallpapers for Bold Interiors",
    template: "%s | Wonder Wallz",
  },
  description:
    "Curated collections of designer wallpapers, murals, and wall art. Transform any room into a work of art.",
  keywords: ["wallpaper", "wall murals", "interior design", "home decor", "designer wallpaper"],
  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon.ico",
    apple: "/apple-touch-icon.png",
  },
  openGraph: {
    title: "Wonder Wallz",
    description: "Statement Wallpapers for Bold Interiors",
    type: "website",
    locale: "en_US",
  },
};

// themeColor moved out of `metadata` into its own `viewport` export —
// Next.js 14+ deprecated metadata.themeColor in favor of this API.
export const viewport: Viewport = {
  themeColor: "#1F2238", // --color-primary, matches globals.css design tokens
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={cn(playfair.variable, dmSans.variable, "font-sans", geist.variable)}>
      <body className="bg-parchment text-walnut antialiased">
        <Navbar />
        <main className="min-h-screen">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
