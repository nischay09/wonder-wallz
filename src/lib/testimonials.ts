export type TestimonialSource = "Google Review";

export interface Testimonial {
  id: string;
  name: string;
  rating: number; // 1–5
  review: string;
  source: TestimonialSource;
  date: string; // e.g. "8 months ago"
  avatar?: string; // optional avatar image path/URL
  category?: string; // optional product/category tag
}

/**
 * Real customer testimonials sourced from Google Reviews.
 *
 * To add a new review, just append a new object to this array —
 * the testimonial component reads from here automatically.
 */
export const testimonials: Testimonial[] = [
  {
    id: "g1",
    name: "Moumita Kundu",
    rating: 5,
    review:
      "The shop specializes in wallpapers and wall coverings for homes, and also offers customised wallpapers. They have their own HP Latex printing machine, which is a big advantage. Overall, it's a great company, and I would definitely recommend them for interior products.",
    source: "Google Review",
    date: "8 months ago",
    category: "Custom Wallpapers",
  },
  {
    id: "g2",
    name: "Yash Khajanchi",
    rating: 5,
    review:
      "Wonderful experience. They offer excellent customised wallpapers with great print quality at very reasonable prices. A great place for wallpapers and beautiful interior solutions.",
    source: "Google Review",
    date: "4 months ago",
    category: "Wallpapers",
  },
  {
    id: "g3",
    name: "Vivek Singh",
    rating: 5,
    review: "Best place to buy customised wallpapers for your home.",
    source: "Google Review",
    date: "4 months ago",
    category: "Custom Wallpapers",
  },
  {
    id: "g4",
    name: "Hrithik Biswakarma",
    rating: 5,
    review:
      "Excellent printing quality and a great working environment. The graphic design work and overall finishing are impressive.",
    source: "Google Review",
    date: "5 months ago",
    category: "Printing Quality",
  },
];
