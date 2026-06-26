export type Category =
  | "Living Room"
  | "Bedroom"
  | "Kids Room"
  | "Office"
  | "Commercial";

export interface Transformation {
  id: string;
  category: Category;
  title: string;
  beforeImage: string;
  afterImage: string;
  collection: string;
  product: string;
  material: string;
  dimensions: string;
  installationTime: string;
  href: string;
}

export const CATEGORIES: Category[] = [
  "Living Room",
  "Bedroom",
  "Kids Room",
  "Office",
  "Commercial",
];

export const transformations: Transformation[] = [
  {
    id: "lr-01",
    category: "Living Room",
    title: "Serene Dusk Lounge",
    beforeImage:
      "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=900&q=80",
    afterImage:
      "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=900&q=80",
    collection: "Ombré Horizon",
    product: "Gradient Silk Weave Wallpaper",
    material: "Silk-Blend Non-Woven",
    dimensions: "10.05 m × 0.53 m per roll",
    installationTime: "1 Day",
    href: "/collections/ombre-horizon",
  },
  {
    id: "bd-01",
    category: "Bedroom",
    title: "The Cocoon Retreat",
    beforeImage:
      "https://images.unsplash.com/photo-1631049307264-da0ec9d70304?w=900&q=80",
    afterImage:
      "https://images.unsplash.com/photo-1616594039964-ae9021a400a0?w=900&q=80",
    collection: "Midnight Botanica",
    product: "Floral Mural Wallpaper",
    material: "Premium Vinyl with Fabric Backing",
    dimensions: "Custom Panel — 3 m × 2.8 m",
    installationTime: "Half Day",
    href: "/collections/midnight-botanica",
  },
  {
    id: "kr-01",
    category: "Kids Room",
    title: "Dreamscape Nursery",
    beforeImage:
      "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=900&q=80",
    afterImage:
      "https://images.unsplash.com/photo-1503174971373-b1f69850bded?w=900&q=80",
    collection: "Starfall",
    product: "Washable Illustrated Wallpaper",
    material: "Low-VOC Scrubbable Vinyl",
    dimensions: "10.05 m × 0.53 m per roll",
    installationTime: "1 Day",
    href: "/collections/starfall",
  },
  {
    id: "of-01",
    category: "Office",
    title: "The Focus Studio",
    beforeImage:
      "https://images.unsplash.com/photo-1497366216548-37526070297c?w=900&q=80",
    afterImage:
      "https://images.unsplash.com/photo-1497366754035-f200968a6e72?w=900&q=80",
    collection: "Mineral Earth",
    product: "Textured Stone Finish Wallpaper",
    material: "Embossed Non-Woven",
    dimensions: "10.05 m × 0.53 m per roll",
    installationTime: "2 Days",
    href: "/collections/mineral-earth",
  },
  {
    id: "cm-01",
    category: "Commercial",
    title: "Lobby — The Verdant Hotel",
    beforeImage:
      "https://images.unsplash.com/photo-1571896349842-33c89424de2d?w=900&q=80",
    afterImage:
      "https://images.unsplash.com/photo-1564501049412-61c2a3083791?w=900&q=80",
    collection: "Grand Palms",
    product: "Contract-Grade Mural Wallcovering",
    material: "Type II Commercial Vinyl",
    dimensions: "Custom — Full Wall Coverage",
    installationTime: "3 Days",
    href: "/collections/grand-palms",
  },
];
