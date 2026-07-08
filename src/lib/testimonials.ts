export type CustomerRole =
  | "Verified Homeowner"
  | "Interior Designer"
  | "Residential Client"
  | "Commercial Client"
  | "Verified Customer";

export interface Testimonial {
  id: string;
  name: string;
  role: CustomerRole;
  rating: number; // 1–5
  review: string;
  productUsed: string;
}

export const testimonials: Testimonial[] = [
  {
    id: "t1",
    name: "Ananya Roy",
    role: "Verified Homeowner",
    rating: 5,
    review:
      "The texture and finish completely changed how our living room feels. Installation was clean, on time, and the team explained every step before starting.",
    productUsed: "Royale Play Texture Finish",
  },
  {
    id: "t2",
    name: "Debashish Sen",
    role: "Residential Client",
    rating: 5,
    review:
      "We visited the showroom undecided and left confident. The design preview helped us pick a look we still love a year later.",
    productUsed: "3D Wall Panels – Stone Series",
  },
  {
    id: "t3",
    name: "Priya Banerjee",
    role: "Interior Designer",
    rating: 4,
    review:
      "Premium quality without the premium hassle. The colour consultant was patient with our endless questions, and the result speaks for itself.",
    productUsed: "Asian Paints Ace Emulsion",
  },
  {
    id: "t4",
    name: "Rohit Mehta",
    role: "Commercial Client",
    rating: 5,
    review:
      "Used Wonder Wallz for our café renovation. The wallpaper durability in a high-traffic space has genuinely surprised us.",
    productUsed: "Designer Wallpaper – Commercial Grade",
  },
];
