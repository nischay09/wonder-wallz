import type { Metadata } from "next";
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

export const metadata: Metadata = {
  title: {
    default: "Wonder Wallz — Statement Wallpapers for Bold Interiors",
    template: "%s | Wonder Wallz",
  },
  description:
    "Curated collections of designer wallpapers, murals, and wall art. Transform any room into a work of art.",
  keywords: ["wallpaper", "wall murals", "interior design", "home decor", "designer wallpaper"],
  openGraph: {
    title: "Wonder Wallz",
    description: "Statement Wallpapers for Bold Interiors",
    type: "website",
    locale: "en_US",
  },
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
