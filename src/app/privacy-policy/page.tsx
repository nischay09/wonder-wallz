import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Privacy Policy | Wonder Wallz",
  description: "Wonder Wallz privacy policy.",
};

export default function PrivacyPolicyPage() {
  return (
    <main className="max-w-3xl mx-auto px-6 py-24">
      <h1 className="text-3xl font-bold tracking-tight mb-6">Privacy Policy</h1>
      <p className="text-sm text-stone-500 leading-relaxed">
        Our full privacy policy is being finalized and will be published here
        shortly. For any questions about how we handle your information in the
        meantime, please get in touch via our{" "}
        <a href="/contact" className="underline">
          Contact
        </a>{" "}
        page.
      </p>
    </main>
  );
}
