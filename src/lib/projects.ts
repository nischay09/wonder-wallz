export type RoomType =
  | "Living Room"
  | "Bedroom"
  | "Kids Room"
  | "Office"
  | "Commercial";

export interface Project {
  id: string;
  image: string;
  alt: string;
  roomType: RoomType;
  collection: string;
  productCategory: string;
  /** Controls masonry rhythm — "tall" spans two rows on desktop. */
  size: "tall" | "regular";
}

export const projects: Project[] = [
  {
    id: "p1",
    image:
      "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=1000&q=80",
    alt: "Living room finished with Ombré Horizon gradient wallpaper",
    roomType: "Living Room",
    collection: "Ombré Horizon",
    productCategory: "Designer Wallpaper",
    size: "tall",
  },
  {
    id: "p2",
    image:
      "https://images.unsplash.com/photo-1616594039964-ae9021a400a0?w=1000&q=80",
    alt: "Bedroom featuring Midnight Botanica floral mural wallpaper",
    roomType: "Bedroom",
    collection: "Midnight Botanica",
    productCategory: "Mural Wallpaper",
    size: "regular",
  },
  {
    id: "p3",
    image:
      "https://images.unsplash.com/photo-1503174971373-b1f69850bded?w=1000&q=80",
    alt: "Kids room decorated with Starfall washable illustrated wallpaper",
    roomType: "Kids Room",
    collection: "Starfall",
    productCategory: "Washable Wallpaper",
    size: "regular",
  },
  {
    id: "p4",
    image:
      "https://images.unsplash.com/photo-1497366754035-f200968a6e72?w=1000&q=80",
    alt: "Office space finished with Mineral Earth textured stone wallpaper",
    roomType: "Office",
    collection: "Mineral Earth",
    productCategory: "Textured Finish",
    size: "tall",
  },
  {
    id: "p5",
    image:
      "https://images.unsplash.com/photo-1564501049412-61c2a3083791?w=1000&q=80",
    alt: "Hotel lobby finished with Grand Palms contract-grade wallcovering",
    roomType: "Commercial",
    collection: "Grand Palms",
    productCategory: "Contract Wallcovering",
    size: "regular",
  },
  {
    id: "p6",
    image:
      "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=1000&q=80",
    alt: "Living room with Royale Play textured wall finish",
    roomType: "Living Room",
    collection: "Royale Play",
    productCategory: "Texture Finish",
    size: "regular",
  },
];
