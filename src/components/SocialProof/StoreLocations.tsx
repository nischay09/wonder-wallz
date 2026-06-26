"use client";

import StoreCard from "./StoreCard";
import { stores } from "@/lib/stores";

export default function StoreLocations() {
  return (
    <div
      className="grid gap-6 sm:grid-cols-2 lg:grid-cols-1"
      aria-label="Wonder Wallz showroom locations"
    >
      {stores.map((store) => (
        <StoreCard key={store.id} store={store} />
      ))}
    </div>
  );
}
