import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Shipping Policy | Wonder Wallz",
  description: "Wonder Wallz shipping policy.",
};

export default function ShippingPolicyPage() {
  return (
    <main className="max-w-3xl mx-auto px-6 py-24">
      <h1 className="text-3xl font-bold tracking-tight mb-6">Shipping Policy</h1>
      <p className="text-sm text-stone-500 leading-relaxed">
        Our full shipping policy is being finalized and will be published here
        shortly. For any questions in the meantime, please get in touch via
        our{" "}
        <a href="/contact" className="underline">
          Contact
        </a>{" "}
        page.
      </p>
    </main>
  );
}
