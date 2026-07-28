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
    name: "Wonder Wallz Showroom – Chandni Chowk",
    address: "157C, Lenin Sarani Rd, near Jyoti Cinema, Esplanade, Chandni Chawk, Bowbazar, Kolkata, West Bengal 700013",
    hours: "Mon – Sat, 11:00 AM – 7:30 PM",
    mapsQuery: "Wonder Wallz Showroom Chandni Chowk Kolkata",
  },
  {
    id: "s2",
    name: "Wonder Wallz Showroom – Merlin Homeland",
    address: "3rd Floor, Shop no: 327A, 18B Ashutosh Mukherjee Road, Bhowanipore, Kolkata, West Bengal 700025",
    hours: "Mon – Sun, 11:00 AM – 8:00 PM",
    mapsQuery: "Wonder Wallz Showroom Merlin Homeland Kolkata",
  },
];
