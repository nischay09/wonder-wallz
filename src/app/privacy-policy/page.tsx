import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Privacy Policy | Wonder Wallz",
  description: "Wonder Wallz privacy policy.",
};

export default function PrivacyPolicyPage() {
  return (
    <main className="max-w-3xl mx-auto px-6 py-24">
      <h1 className="text-3xl font-bold tracking-tight mb-6">Privacy Policy</h1>

      <p className="text-sm text-stone-500 leading-relaxed mb-10">
        Last Updated: July 2026
      </p>

      <section className="mb-10">
        <h2 className="text-xl font-semibold tracking-tight mb-3">1. Introduction</h2>
        <p className="text-sm text-stone-500 leading-relaxed">
          Wonder Wallz values the privacy of every customer and is committed
          to protecting any information that is voluntarily shared with us
          through our website. This Privacy Policy explains what information
          we may collect, how it is used, and the steps we take to protect
          it.
        </p>
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-semibold tracking-tight mb-3">
          2. Information We Collect
        </h2>
        <p className="text-sm text-stone-500 leading-relaxed mb-4">
          At present, Wonder Wallz does not require customers to create an
          account and does not maintain a backend database for storing
          customer information. The only information customers may
          voluntarily provide includes:
        </p>
        <ul className="list-disc pl-5 text-sm text-stone-500 leading-relaxed space-y-1">
          <li>Name</li>
          <li>Email address</li>
          <li>Phone number</li>
          <li>Delivery or installation address</li>
          <li>Product dimensions</li>
          <li>Project notes</li>
          <li>Images or artwork uploaded for custom products</li>
          <li>Any information shared through enquiry forms, WhatsApp, email, or phone calls</li>
        </ul>
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-semibold tracking-tight mb-3">
          3. How We Use Your Information
        </h2>
        <p className="text-sm text-stone-500 leading-relaxed mb-4">
          Any information provided to us is used solely for purposes such as:
        </p>
        <ul className="list-disc pl-5 text-sm text-stone-500 leading-relaxed space-y-1 mb-4">
          <li>Responding to enquiries</li>
          <li>Preparing quotations</li>
          <li>Processing orders</li>
          <li>Manufacturing custom products</li>
          <li>Scheduling deliveries</li>
          <li>Scheduling installations</li>
          <li>Customer communication</li>
          <li>Providing after-sales support</li>
        </ul>
        <p className="text-sm text-stone-500 leading-relaxed">
          We do not sell customer information. We do not rent customer
          information. We do not use customer information for unsolicited
          marketing.
        </p>
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-semibold tracking-tight mb-3">4. Data Storage</h2>
        <p className="text-sm text-stone-500 leading-relaxed mb-4">
          At present, Wonder Wallz does not maintain a customer database
          through this website. Information submitted through the website is
          used only for handling enquiries and orders.
        </p>
        <p className="text-sm text-stone-500 leading-relaxed">
          Customer information may be retained in business communications
          such as email or WhatsApp, but only for the purpose of fulfilling
          customer requests and providing support.
        </p>
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-semibold tracking-tight mb-3">
          5. Third-Party Services
        </h2>
        <p className="text-sm text-stone-500 leading-relaxed mb-4">
          Wonder Wallz may share only the minimum necessary customer
          information with trusted third parties when required to complete
          an order, including:
        </p>
        <ul className="list-disc pl-5 text-sm text-stone-500 leading-relaxed space-y-1 mb-4">
          <li>Courier and logistics partners</li>
          <li>Installation teams</li>
          <li>Service providers directly involved in fulfilling the customer's order</li>
        </ul>
        <p className="text-sm text-stone-500 leading-relaxed">
          Information is shared only when necessary to fulfil the customer's
          order.
        </p>
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-semibold tracking-tight mb-3">6. Cookies</h2>
        <p className="text-sm text-stone-500 leading-relaxed mb-4">
          Our website may use essential cookies and basic analytics to
          improve website performance and user experience. These cookies do
          not personally identify visitors.
        </p>
        <p className="text-sm text-stone-500 leading-relaxed">
          If additional analytics or advertising tools are introduced in the
          future, this Privacy Policy will be updated accordingly.
        </p>
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-semibold tracking-tight mb-3">7. Data Security</h2>
        <p className="text-sm text-stone-500 leading-relaxed">
          Wonder Wallz takes reasonable administrative and technical measures
          to protect customer information. However, no method of electronic
          communication or internet transmission can be guaranteed to be
          completely secure.
        </p>
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-semibold tracking-tight mb-3">8. Customer Rights</h2>
        <p className="text-sm text-stone-500 leading-relaxed mb-4">
          Customers may contact Wonder Wallz at any time to:
        </p>
        <ul className="list-disc pl-5 text-sm text-stone-500 leading-relaxed space-y-1">
          <li>Ask questions about their information</li>
          <li>Request correction of inaccurate information</li>
          <li>Request deletion of information, where legally permissible</li>
        </ul>
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-semibold tracking-tight mb-3">
          9. Changes to this Privacy Policy
        </h2>
        <p className="text-sm text-stone-500 leading-relaxed">
          Wonder Wallz reserves the right to update this Privacy Policy
          whenever necessary. The latest version will always be published on
          this page with an updated revision date.
        </p>
      </section>

      <section>
        <h2 className="text-xl font-semibold tracking-tight mb-3">10. Contact Us</h2>
        <p className="text-sm text-stone-500 leading-relaxed">
          For any questions regarding this Privacy Policy, please reach out
          to us.
        </p>
        <p className="text-sm text-stone-500 leading-relaxed mt-2">
          Business Name: Wonder Wallz
          <br />
          Email:{" "}
          <a href="mailto:thewonderwallz@gmail.com" className="underline">
            thewonderwallz@gmail.com
          </a>
        </p>
      </section>
    </main>
  );
}
