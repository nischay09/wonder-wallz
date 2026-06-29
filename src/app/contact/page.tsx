"use client";

import Link from "next/link";
import {
  Phone,
  MapPin,
  Clock,
  Instagram,
  Mail,
  ArrowRight,
  Palette,
  Layers,
} from "lucide-react";

// ─── Tokens (mirror existing Wonder Wallz design system) ─────────────────────
const T = {
  bg: "#F9ECC8",
  surface: "#FFFDF8",
  text: "#2F2A24",
  muted: "#6B6258",
  accent: "#9C7A3F",
  accentHover: "#7A5E30",
  border: "rgba(156,122,63,0.18)",
};

// ─── Reusable primitives ──────────────────────────────────────────────────────

function SectionLabel({ children }: { children: React.ReactNode }) {
  return (
    <p
      className="text-xs font-semibold tracking-[0.18em] uppercase mb-3"
      style={{ color: T.accent, fontFamily: "Inter, sans-serif" }}
    >
      {children}
    </p>
  );
}

function Divider() {
  return (
    <hr
      className="my-16 md:my-20"
      style={{ borderColor: T.border, borderTopWidth: 1 }}
    />
  );
}

// ─── Contact Category Card ────────────────────────────────────────────────────

interface ContactCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  phone: string;
  store: string;
}

function ContactCard({
  icon,
  title,
  description,
  phone,
  store,
}: ContactCardProps) {
  return (
    <div
      className="flex flex-col gap-5 rounded-2xl p-7 md:p-8 transition-shadow duration-300"
      style={{
        background: T.surface,
        border: `1px solid ${T.border}`,
        boxShadow: "0 2px 16px 0 rgba(156,122,63,0.06)",
      }}
    >
      {/* Icon */}
      <div
        className="w-11 h-11 rounded-xl flex items-center justify-center"
        style={{ background: "rgba(156,122,63,0.10)" }}
      >
        <span style={{ color: T.accent }}>{icon}</span>
      </div>

      {/* Title + description */}
      <div>
        <h3
          className="text-xl font-semibold mb-2"
          style={{ fontFamily: "Fraunces, serif", color: T.text }}
        >
          {title}
        </h3>
        <p
          className="text-sm leading-relaxed"
          style={{ color: T.muted, fontFamily: "Inter, sans-serif" }}
        >
          {description}
        </p>
      </div>

      {/* Divider */}
      <hr style={{ borderColor: T.border, borderTopWidth: 1 }} />

      {/* Phone */}
      <a
        href={`tel:${phone.replace(/\s/g, "")}`}
        className="flex items-center gap-3 group w-fit"
      >
        <Phone
          size={16}
          style={{ color: T.accent }}
          className="shrink-0 group-hover:scale-110 transition-transform"
        />
        <span
          className="text-base font-medium tracking-wide transition-colors"
          style={{
            fontFamily: "Inter, sans-serif",
            color: T.text,
          }}
        >
          {phone}
        </span>
      </a>

      {/* Store */}
      <div className="flex items-start gap-3">
        <MapPin size={16} style={{ color: T.muted }} className="shrink-0 mt-0.5" />
        <span
          className="text-sm"
          style={{ color: T.muted, fontFamily: "Inter, sans-serif" }}
        >
          {store}
        </span>
      </div>
    </div>
  );
}

// ─── Showroom Card ────────────────────────────────────────────────────────────

interface ShowroomCardProps {
  name: string;
  locality: string;
  addressLines: string[];
  specialities: string[];
}

function ShowroomCard({
  name,
  locality,
  addressLines,
  specialities,
}: ShowroomCardProps) {
  return (
    <div
      className="flex flex-col gap-5 rounded-2xl p-7 md:p-8"
      style={{
        background: T.surface,
        border: `1px solid ${T.border}`,
        boxShadow: "0 2px 16px 0 rgba(156,122,63,0.06)",
      }}
    >
      {/* Heading */}
      <div>
        <p
          className="text-xs font-semibold tracking-[0.15em] uppercase mb-1"
          style={{ color: T.accent, fontFamily: "Inter, sans-serif" }}
        >
          {name}
        </p>
        <h3
          className="text-2xl font-semibold"
          style={{ fontFamily: "Fraunces, serif", color: T.text }}
        >
          {locality}
        </h3>
      </div>

      {/* Address */}
      <div className="flex items-start gap-3">
        <MapPin size={16} style={{ color: T.accent }} className="shrink-0 mt-0.5" />
        <address
          className="not-italic text-sm leading-relaxed"
          style={{ color: T.muted, fontFamily: "Inter, sans-serif" }}
        >
          {addressLines.map((line, i) => (
            <span key={i}>
              {line}
              {i < addressLines.length - 1 && <br />}
            </span>
          ))}
        </address>
      </div>

      <hr style={{ borderColor: T.border, borderTopWidth: 1 }} />

      {/* Specialities */}
      <div>
        <p
          className="text-xs font-semibold tracking-[0.14em] uppercase mb-3"
          style={{ color: T.muted, fontFamily: "Inter, sans-serif" }}
        >
          Specialises in
        </p>
        <ul className="flex flex-wrap gap-2">
          {specialities.map((s) => (
            <li
              key={s}
              className="px-3 py-1 rounded-full text-xs font-medium"
              style={{
                background: "rgba(156,122,63,0.09)",
                color: T.accent,
                fontFamily: "Inter, sans-serif",
                border: `1px solid ${T.border}`,
              }}
            >
              {s}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

// ─── Simple info card (email, instagram, hours) ───────────────────────────────

function InfoCard({
  icon,
  title,
  children,
}: {
  icon: React.ReactNode;
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div
      className="flex flex-col gap-4 rounded-2xl p-7 md:p-8"
      style={{
        background: T.surface,
        border: `1px solid ${T.border}`,
        boxShadow: "0 2px 16px 0 rgba(156,122,63,0.06)",
      }}
    >
      <div className="flex items-center gap-3">
        <div
          className="w-9 h-9 rounded-lg flex items-center justify-center"
          style={{ background: "rgba(156,122,63,0.10)" }}
        >
          <span style={{ color: T.accent }}>{icon}</span>
        </div>
        <h3
          className="text-base font-semibold"
          style={{ fontFamily: "Fraunces, serif", color: T.text }}
        >
          {title}
        </h3>
      </div>
      <div style={{ color: T.muted, fontFamily: "Inter, sans-serif" }}>
        {children}
      </div>
    </div>
  );
}

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function ContactPage() {
  return (
    <main
      className="min-h-screen"
      style={{ background: T.bg, fontFamily: "Inter, sans-serif" }}
    >
      {/* ── Hero ────────────────────────────────────────────────────────────── */}
      <section className="pt-28 pb-20 md:pt-36 md:pb-24 px-5">
        <div className="max-w-3xl mx-auto text-center">
          <SectionLabel>Get in touch</SectionLabel>
          <h1
            className="text-4xl md:text-6xl font-semibold leading-tight mb-5"
            style={{ fontFamily: "Fraunces, serif", color: T.text }}
          >
            Contact Wonder Wallz
          </h1>
          <p
            className="text-base md:text-lg leading-relaxed mb-9 max-w-xl mx-auto"
            style={{ color: T.muted }}
          >
            Whether you're looking for custom wall graphics or premium interior
            products, we're here to help you bring your space to life.
          </p>
          <Link
            href="/custom-design"
            className="inline-flex items-center gap-2 px-7 py-3.5 rounded-full text-sm font-medium transition-colors duration-200"
            style={{
              background: T.accent,
              color: "#FFFDF8",
              fontFamily: "Inter, sans-serif",
            }}
            onMouseEnter={(e) =>
              (e.currentTarget.style.background = T.accentHover)
            }
            onMouseLeave={(e) =>
              (e.currentTarget.style.background = T.accent)
            }
          >
            Design Your Space
            <ArrowRight size={15} />
          </Link>
        </div>
      </section>

      <div className="max-w-5xl mx-auto px-5">
        {/* ── Contact Categories ────────────────────────────────────────────── */}
        <section>
          <SectionLabel>Who to call</SectionLabel>
          <h2
            className="text-2xl md:text-3xl font-semibold mb-8"
            style={{ fontFamily: "Fraunces, serif", color: T.text }}
          >
            Find the right team
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <ContactCard
              icon={<Palette size={20} />}
              title="Custom Design Enquiries"
              description="For custom wallpapers, wall murals, glass films and personalised projects."
              phone="+91 98831 00377"
              store="Wonder Wallz – Chandni Chowk Showroom"
            />
            <ContactCard
              icon={<Layers size={20} />}
              title="Interior Products"
              description="For blinds, curtains, upholstery, flooring and other interior products."
              phone="+91 98301 73898"
              store="Wonder Wallz – Merlin Homeland Showroom"
            />
          </div>
        </section>

        <Divider />

        {/* ── Showrooms ─────────────────────────────────────────────────────── */}
        <section>
          <SectionLabel>Visit us</SectionLabel>
          <h2
            className="text-2xl md:text-3xl font-semibold mb-8"
            style={{ fontFamily: "Fraunces, serif", color: T.text }}
          >
            Our showrooms
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <ShowroomCard
              name="Wonder Wallz"
              locality="Merlin Homeland"
              addressLines={[
                "18B, Ashutosh Mukherjee Road",
                "Bhowanipore",
                "Kolkata, West Bengal 700025",
              ]}
              specialities={["Blinds", "Curtains", "Upholstery", "Flooring"]}
            />
            <ShowroomCard
              name="Wonder Wallz"
              locality="Chandni Chowk"
              addressLines={[
                "157C, Lenin Sarani Road",
                "Near Jyoti Cinema, Esplanade",
                "Chandni Chowk, Bowbazar",
                "Kolkata, West Bengal 700013",
              ]}
              specialities={[
                "Custom Wallpapers",
                "Wall Murals",
                "Custom Glass Films",
                "Personalised Projects",
              ]}
            />
          </div>
        </section>

        <Divider />

        {/* ── Email · Instagram · Hours ─────────────────────────────────────── */}
        <section>
          <SectionLabel>More ways to reach us</SectionLabel>
          <h2
            className="text-2xl md:text-3xl font-semibold mb-8"
            style={{ fontFamily: "Fraunces, serif", color: T.text }}
          >
            Other channels
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {/* Email */}
            <InfoCard icon={<Mail size={18} />} title="Email">
              <p className="text-sm leading-relaxed mb-1">
                Email coming soon.
              </p>
              <p className="text-xs" style={{ color: "rgba(107,98,88,0.6)" }}>
                We'll add our email address here shortly.
              </p>
            </InfoCard>

            {/* Instagram */}
            <InfoCard icon={<Instagram size={18} />} title="Instagram">
              <p className="text-sm leading-relaxed mb-3">
                Follow us for inspiration, project showcases and new arrivals.
              </p>
              <a
                href="https://www.instagram.com/wonderwallz"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 text-sm font-medium transition-colors"
                style={{ color: T.accent }}
                onMouseEnter={(e) =>
                  (e.currentTarget.style.color = T.accentHover)
                }
                onMouseLeave={(e) =>
                  (e.currentTarget.style.color = T.accent)
                }
              >
                @wonderwallz
                <ArrowRight size={13} />
              </a>
            </InfoCard>

            {/* Business Hours */}
            <InfoCard icon={<Clock size={18} />} title="Business Hours">
              <ul className="text-sm space-y-1.5">
                {[
                  ["Monday – Saturday", "10:00 am – 7:00 pm"],
                  ["Sunday", "By appointment"],
                ].map(([day, hours]) => (
                  <li key={day} className="flex justify-between gap-4">
                    <span style={{ color: T.muted }}>{day}</span>
                    <span
                      className="font-medium tabular-nums"
                      style={{ color: T.text }}
                    >
                      {hours}
                    </span>
                  </li>
                ))}
              </ul>
              <p
                className="text-xs mt-3"
                style={{ color: "rgba(107,98,88,0.6)" }}
              >
                Hours are indicative and may vary on public holidays.
              </p>
            </InfoCard>
          </div>
        </section>

        <Divider />

        {/* ── Bottom CTA ────────────────────────────────────────────────────── */}
        <section className="pb-24 text-center">
          <h2
            className="text-3xl md:text-4xl font-semibold mb-6"
            style={{ fontFamily: "Fraunces, serif", color: T.text }}
          >
            Ready to transform your space?
          </h2>
          <Link
            href="/custom-design"
            className="inline-flex items-center gap-2 px-8 py-4 rounded-full text-sm font-medium transition-colors duration-200"
            style={{
              background: T.accent,
              color: "#FFFDF8",
              fontFamily: "Inter, sans-serif",
            }}
            onMouseEnter={(e) =>
              (e.currentTarget.style.background = T.accentHover)
            }
            onMouseLeave={(e) =>
              (e.currentTarget.style.background = T.accent)
            }
          >
            Design Your Space
            <ArrowRight size={15} />
          </Link>
        </section>
      </div>
    </main>
  );
}
