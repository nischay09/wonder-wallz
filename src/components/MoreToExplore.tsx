/**
 * MoreToExplore.tsx
 *
 * Compact, low-key announcement strip letting visitors know that the
 * website only shows a curated slice of the full Wonder Wallz catalogue,
 * and pointing them to the Merlin Homeland showroom or WhatsApp for the rest.
 *
 * Intentionally small — roughly half the footprint of the "Discover More"
 * block on the Collections page. No hero treatment, no full-bleed
 * background: just a single quiet card sitting in the page's normal
 * container width, right before the footer.
 */

const SHOWROOM_MAPS_URL =
  "https://www.google.com/maps/search/?api=1&query=Merlin+Homeland+Kolkata+Wonder+Wallz";
const WHATSAPP_URL =
  "https://wa.me/919830173898?text=Hi%20Wonder%20Wallz%2C%20I%27d%20like%20to%20know%20more%20about%20products%20not%20listed%20on%20the%20website.";

export default function MoreToExplore() {
  return (
    <section
      aria-labelledby="more-to-explore-heading"
      className="px-4 sm:px-6 lg:px-8 py-8 sm:py-10"
    >
      <div
        className="
          mx-auto max-w-5xl
          rounded-2xl border border-[#E7DFD3]
          bg-[#FBF9F5]
          px-5 py-6 sm:px-8 sm:py-7
          flex flex-col md:flex-row md:items-center md:justify-between
          gap-5 md:gap-8
        "
      >
        {/* ── Text block ─────────────────────────────────────────── */}
        <div className="max-w-xl">
          <span
            className="
              inline-block text-[11px] tracking-[0.18em] font-semibold
              text-[#A6772C] mb-1.5
            "
          >
            MORE TO EXPLORE
          </span>
          <h2
            id="more-to-explore-heading"
            className="text-lg sm:text-xl font-semibold text-[#2B2620] mb-1.5 leading-snug"
          >
            Can&apos;t Find What You&apos;re Looking For?
          </h2>
          <p className="text-sm text-[#5C5548] leading-relaxed">
            Our website showcases only a curated selection of our products.
            Visit our{" "}
            <span className="font-medium text-[#3A342B]">
              Merlin Homeland Showroom
            </span>{" "}
            to discover additional categories, exclusive collections,
            materials and finishes that aren&apos;t yet online. Can&apos;t
            make it in person? Enquire with us on WhatsApp and our team will
            share catalogues and help you find the right fit.
          </p>
        </div>

        {/* ── CTAs ───────────────────────────────────────────────── */}
        <div className="flex flex-col sm:flex-row md:flex-col gap-2.5 shrink-0 w-full md:w-auto">
          <a
            href={SHOWROOM_MAPS_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="
              inline-flex items-center justify-center gap-2
              rounded-full border border-[#2B2620]
              px-4 py-2 text-sm font-medium text-[#2B2620]
              hover:bg-[#2B2620] hover:text-[#FBF9F5]
              transition-colors whitespace-nowrap
            "
          >
            <span aria-hidden="true">📍</span>
            Visit Merlin Homeland Showroom
          </a>
          <a
            href={WHATSAPP_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="
              inline-flex items-center justify-center gap-2
              rounded-full bg-[#25D366]
              px-4 py-2 text-sm font-medium text-white
              hover:bg-[#1FBE5A]
              transition-colors whitespace-nowrap
            "
          >
            <span aria-hidden="true">💬</span>
            Enquire on WhatsApp
          </a>
        </div>
      </div>
    </section>
  );
}
