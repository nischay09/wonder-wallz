import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Terms & Conditions | Wonder Wallz",
  description: "Wonder Wallz terms and conditions.",
};

export default function TermsAndConditionsPage() {
  return (
    <main className="max-w-3xl mx-auto px-6 py-24">
      <h1 className="text-3xl font-bold tracking-tight mb-6">Terms &amp; Conditions</h1>

      <p className="text-sm text-stone-500 leading-relaxed mb-10">
        These Terms &amp; Conditions ("Terms") govern all orders, quotations,
        products, services, and use of the Wonder Wallz website. By placing an
        order or using our services, you agree to be bound by these Terms.
        Please read them carefully before proceeding with any purchase.
      </p>

      <section className="mb-10">
        <h2 className="text-xl font-semibold tracking-tight mb-3">1. General</h2>
        <p className="text-sm text-stone-500 leading-relaxed mb-4">
          Wonder Wallz provides premium interior décor products and services,
          including but not limited to:
        </p>
        <ul className="list-disc pl-5 text-sm text-stone-500 leading-relaxed space-y-1 mb-4">
          <li>Custom Wallpapers</li>
          <li>Wallpaper Collections</li>
          <li>Glass Films</li>
          <li>Canvas Prints</li>
          <li>Flooring</li>
          <li>Blinds</li>
          <li>Curtains</li>
          <li>Upholstery</li>
          <li>Other interior décor products</li>
        </ul>
        <p className="text-sm text-stone-500 leading-relaxed">
          These Terms apply to all orders, quotations, products, services, and
          use of the Wonder Wallz website, regardless of how the order is
          placed.
        </p>
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-semibold tracking-tight mb-3">
          2. Quotations, Pricing &amp; Taxes
        </h2>
        <ul className="list-disc pl-5 text-sm text-stone-500 leading-relaxed space-y-1">
          <li>All quotations are prepared based on the information provided by the customer at the time of enquiry.</li>
          <li>Prices may vary depending on dimensions, material, customization, installation requirements, delivery location, and overall project scope.</li>
          <li>GST and all other applicable taxes are charged separately in accordance with Indian law.</li>
          <li>Quotations remain valid only for the validity period stated in the quotation, unless otherwise specified in writing by Wonder Wallz.</li>
        </ul>
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-semibold tracking-tight mb-3">3. Orders &amp; Payment</h2>
        <p className="text-sm text-stone-500 leading-relaxed mb-5">
          Production, procurement, dispatch, or installation will only
          commence once the required payment has been successfully received.
        </p>

        <h3 className="text-base font-semibold text-stone-700 mb-2">3.1 Custom Products</h3>
        <p className="text-sm text-stone-500 leading-relaxed mb-2">
          This category includes:
        </p>
        <ul className="list-disc pl-5 text-sm text-stone-500 leading-relaxed space-y-1 mb-3">
          <li>Custom Wallpapers</li>
          <li>Custom Glass Films</li>
          <li>Canvas Prints</li>
          <li>Any other made-to-order or personalized product</li>
        </ul>
        <p className="text-sm text-stone-500 leading-relaxed mb-5">
          These products require <strong className="font-semibold text-stone-700">100% advance payment</strong> before production begins.
        </p>

        <h3 className="text-base font-semibold text-stone-700 mb-2">3.2 Ready-Made Products</h3>
        <p className="text-sm text-stone-500 leading-relaxed mb-2">
          For catalogue products, customers must first finalize:
        </p>
        <ul className="list-disc pl-5 text-sm text-stone-500 leading-relaxed space-y-1 mb-3">
          <li>Product selection</li>
          <li>Design</li>
          <li>Dimensions</li>
          <li>Material</li>
          <li>Installation requirements (if applicable)</li>
        </ul>
        <p className="text-sm text-stone-500 leading-relaxed">
          Once these details have been finalized, <strong className="font-semibold text-stone-700">100% payment must be completed before dispatch or installation.</strong>
        </p>
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-semibold tracking-tight mb-3">
          4. Cancellation &amp; Refund Policy
        </h2>
        <p className="text-sm text-stone-500 leading-relaxed mb-4">
          Many of our products are custom manufactured, printed to order, or
          specially sourced based on individual customer requirements. As a
          result:
        </p>
        <ul className="list-disc pl-5 text-sm text-stone-500 leading-relaxed space-y-1 mb-5">
          <li>Once an order has been confirmed, it cannot be cancelled.</li>
          <li>Once production, printing, procurement, or sourcing has started, payments become non-refundable.</li>
          <li>No refunds, exchanges, or cancellations will be accepted after this stage.</li>
        </ul>

        <h3 className="text-base font-semibold text-stone-700 mb-2">4.1 Exception</h3>
        <p className="text-sm text-stone-500 leading-relaxed mb-2">
          If Wonder Wallz is unable to manufacture, procure, or deliver the
          ordered product due to reasons solely attributable to Wonder Wallz,
          the customer shall be entitled to a refund of the amount paid, after
          deducting any applicable site visit, consultation, measurement, or
          visitation charges for services that have already been completed.
        </p>
        <p className="text-sm text-stone-500 leading-relaxed">
          Any such deductions will be communicated to the customer with a
          clear breakdown before the refund is processed.
        </p>
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-semibold tracking-tight mb-3">
          5. Site Visits &amp; Measurements
        </h2>
        <ul className="list-disc pl-5 text-sm text-stone-500 leading-relaxed space-y-1">
          <li>Site visits and measurements are available only in eligible service areas.</li>
          <li>Any applicable site visit, consultation, or measurement charges become non-refundable once the service has been completed.</li>
          <li>Customers who choose to provide their own measurements are solely responsible for their accuracy.</li>
          <li>Wonder Wallz shall not be responsible for issues arising from incorrect measurements supplied by the customer.</li>
        </ul>
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-semibold tracking-tight mb-3">6. Product Appearance</h2>
        <p className="text-sm text-stone-500 leading-relaxed mb-4">
          Customers acknowledge that minor variations may occur between
          digital previews and the final product due to factors such as:
        </p>
        <ul className="list-disc pl-5 text-sm text-stone-500 leading-relaxed space-y-1 mb-4">
          <li>Screen calibration</li>
          <li>Device settings</li>
          <li>Printing processes</li>
          <li>Material texture</li>
          <li>Lighting conditions</li>
        </ul>
        <p className="text-sm text-stone-500 leading-relaxed">
          Such minor variations shall not be considered manufacturing defects.
        </p>
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-semibold tracking-tight mb-3">
          7. Delivery &amp; Installation
        </h2>
        <ul className="list-disc pl-5 text-sm text-stone-500 leading-relaxed space-y-1 mb-5">
          <li>Wonder Wallz delivers products across India (Pan India).</li>
          <li>Professional installation services are available only within Kolkata and select nearby serviceable areas, subject to availability.</li>
          <li>Customers outside our installation service area must arrange installation independently.</li>
        </ul>
        <p className="text-sm text-stone-500 leading-relaxed mb-4">
          Delivery and installation timelines depend on several factors,
          including:
        </p>
        <ul className="list-disc pl-5 text-sm text-stone-500 leading-relaxed space-y-1 mb-4">
          <li>Production schedule</li>
          <li>Project complexity</li>
          <li>Courier operations</li>
          <li>Weather conditions</li>
          <li>Service availability</li>
          <li>Other unforeseen circumstances</li>
        </ul>
        <p className="text-sm text-stone-500 leading-relaxed">
          Any timeline communicated by Wonder Wallz is an estimate. While
          every reasonable effort will be made to meet the communicated
          schedule, delays beyond our control may occur.
        </p>
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-semibold tracking-tight mb-3">8. Installation Charges</h2>
        <p className="text-sm text-stone-500 leading-relaxed mb-4">
          Installation labour charges are separate from the product price.
          The labour cost is determined prior to installation, after
          evaluating:
        </p>
        <ul className="list-disc pl-5 text-sm text-stone-500 leading-relaxed space-y-1 mb-4">
          <li>Installation area</li>
          <li>Surface condition</li>
          <li>Product type</li>
          <li>Project complexity</li>
          <li>Additional labour requirements</li>
        </ul>
        <p className="text-sm text-stone-500 leading-relaxed">
          The final installation charges will be communicated to the customer
          beforehand and, upon approval, included in the final invoice.
        </p>
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-semibold tracking-tight mb-3">9. Intellectual Property</h2>
        <p className="text-sm text-stone-500 leading-relaxed mb-4">
          All website content, branding, graphics, designs, text, logos, and
          other materials are the property of Wonder Wallz, unless otherwise
          stated, and may not be copied, reproduced, or distributed without
          prior written permission.
        </p>
        <p className="text-sm text-stone-500 leading-relaxed">
          Customers remain solely responsible for ensuring they hold the
          necessary rights to any artwork or images submitted for custom
          printing.
        </p>
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-semibold tracking-tight mb-3">
          10. Limitation of Liability
        </h2>
        <p className="text-sm text-stone-500 leading-relaxed mb-4">
          Wonder Wallz shall not be held liable for any loss, damage, or delay
          arising from:
        </p>
        <ul className="list-disc pl-5 text-sm text-stone-500 leading-relaxed space-y-1">
          <li>Incorrect measurements supplied by the customer</li>
          <li>Improper installation carried out by third parties</li>
          <li>Courier or logistics delays</li>
          <li>Force majeure events</li>
          <li>Normal wear and tear</li>
          <li>Delays outside Wonder Wallz's reasonable control</li>
        </ul>
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-semibold tracking-tight mb-3">11. Governing Law</h2>
        <p className="text-sm text-stone-500 leading-relaxed">
          These Terms &amp; Conditions shall be governed by the laws of India.
          All disputes shall be subject exclusively to the jurisdiction of the
          competent courts in Kolkata, West Bengal.
        </p>
      </section>

      <section>
        <h2 className="text-xl font-semibold tracking-tight mb-3">12. Contact Information</h2>
        <p className="text-sm text-stone-500 leading-relaxed">
          For any questions regarding these Terms &amp; Conditions, please
          reach out to us.
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
