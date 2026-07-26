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
  /** Short label shown on the card overlay, e.g. "Residential Project". */
  projectLabel: string;
  /** Route to the product category this installation represents. */
  href: string;
  /** Controls masonry rhythm — "tall" spans two rows on desktop. */
  size: "tall" | "regular";
}

export const projects: Project[] = [
  {
    id: "p1",
    image: "/our-work/canvas.jpeg",
    alt: "Framed portrait canvas print installed in a residential living room",
    roomType: "Living Room",
    collection: "Canvas Prints",
    productCategory: "Canvas Prints",
    projectLabel: "Residential Project",
    href: "/collections/canvas-prints",
    size: "tall",
  },
  {
    id: "p2",
    image: "/our-work/glassfilm.jpeg",
    alt: "Decorative glass film installed on an office partition",
    roomType: "Office",
    collection: "Glass Films",
    productCategory: "Glass Films",
    projectLabel: "Office Installation",
    href: "/collections/glass-films",
    size: "regular",
  },
  {
    id: "p3",
    image: "/our-work/wallpaper.jpeg",
    alt: "3D floral textured wall mural installed as a feature wall",
    roomType: "Living Room",
    collection: "Wall Murals",
    productCategory: "Wall Murals",
    projectLabel: "Feature Wall",
    href: "/collections",
    size: "regular",
  },
  {
    id: "p4",
    image: "/our-work/wallpaper-2.jpeg",
    alt: "Blue floral pattern wallpaper installed in a residential bedroom",
    roomType: "Bedroom",
    collection: "Custom Wallpapers",
    productCategory: "Custom Wallpapers",
    projectLabel: "Residential Project",
    href: "/custom-design",
    size: "tall",
  },
  {
    id: "p5",
    image: "/our-work/wallpaper-3.jpeg",
    alt: "Beige textured custom wallpaper installed in a commercial space",
    roomType: "Commercial",
    collection: "Custom Wallpapers",
    productCategory: "Custom Wallpapers",
    projectLabel: "Commercial Installation",
    href: "/custom-design",
    size: "regular",
  },
];
