export interface Store {
  id: string;
  name: string;
  address: string;
  hours: string;
  // Reserved for future Google Maps integration.
  // Populate with a place_id or lat/lng pair once routing is implemented.
  mapsQuery?: string;
}

export const stores: Store[] = [
  {
    id: "s1",
    name: "Wonder Wallz Showroom – Salt Lake",
    address: "DA Block, Sector V, Salt Lake, Kolkata, West Bengal 700091",
    hours: "Mon – Sat, 10:00 AM – 7:30 PM",
    mapsQuery: "Wonder Wallz Showroom Salt Lake Sector V Kolkata",
  },
  {
    id: "s2",
    name: "Wonder Wallz Showroom – Park Street",
    address: "Park Street, Kolkata, West Bengal 700016",
    hours: "Mon – Sun, 11:00 AM – 8:00 PM",
    mapsQuery: "Wonder Wallz Showroom Park Street Kolkata",
  },
];
