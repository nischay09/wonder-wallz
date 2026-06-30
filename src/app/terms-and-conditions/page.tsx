import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Terms & Conditions | Wonder Wallz",
  description: "Wonder Wallz terms and conditions.",
};

export default function TermsAndConditionsPage() {
  return (
    <main className="max-w-3xl mx-auto px-6 py-24">
      <h1 className="text-3xl font-bold tracking-tight mb-6">Terms &amp; Conditions</h1>
      <p className="text-sm text-stone-500 leading-relaxed">
        Our full terms and conditions are being finalized and will be
        published here shortly. For any questions in the meantime, please get
        in touch via our{" "}
        <a href="/contact" className="underline">
          Contact
        </a>{" "}
        page.
      </p>
    </main>
  );
}
