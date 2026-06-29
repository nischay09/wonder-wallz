export interface Testimonial {
  id: string;
  name: string;
  city: string;
  rating: number; // 1–5
  review: string;
  productUsed: string;
}

export const testimonials: Testimonial[] = [
  {
    id: "t1",
    name: "Ananya Roy",
    city: "Salt Lake, Kolkata",
    rating: 5,
    review:
      "The texture and finish completely changed how our living room feels. Installation was clean, on time, and the team explained every step before starting.",
    productUsed: "Royale Play Texture Finish",
  },
  {
    id: "t2",
    name: "Debashish Sen",
    city: "New Town, Kolkata",
    rating: 5,
    review:
      "We visited the showroom undecided and left confident. The 3D wall preview helped us pick a design we still love a year later.",
    productUsed: "3D Wall Panels – Stone Series",
  },
  {
    id: "t3",
    name: "Priya Banerjee",
    city: "Behala, Kolkata",
    rating: 4,
    review:
      "Premium quality without the premium hassle. The colour consultant was patient with our endless questions and the result speaks for itself.",
    productUsed: "Asian Paints Ace Emulsion",
  },
  {
    id: "t4",
    name: "Rohit Mehta",
    city: "Park Street, Kolkata",
    rating: 5,
    review:
      "Used Wonder Wallz for our café renovation. The wallpaper durability in a high-traffic space has genuinely surprised us.",
    productUsed: "Designer Wallpaper – Commercial Grade",
  },
];
