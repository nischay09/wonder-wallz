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

// Previously this file defined its own hardcoded hex/rgba token object (`T`)
// completely separate from the rest of the app's design system in
// globals.css / tailwind.config.ts. That meant:
//   1. Dark mode (the `.dark` overrides in globals.css) had no effect here.
//   2. It referenced "Fraunces, serif" and "Inter, sans-serif" directly —
//      neither is loaded via next/font anywhere in the app (the real
//      loaded fonts are Playfair Display / DM Sans / Geist), so headings
//      here silently fell back to system fonts.
//   3. Any future palette/token change would need a second, manual edit.
// Below, all of that is replaced with the shared Tailwind utility classes
// (bg-surface, text-text-primary, text-text-secondary, border-border,
// bg-accent, font-display, font-body, etc.) that already resolve to the
// CSS variables in globals.css and automatically respond to `.dark`.

// ─── Reusable primitives ──────────────────────────────────────────────────────

function SectionLabel({ children }: { children: React.ReactNode }) {
  return (
    <p className="text-xs font-semibold tracking-[0.18em] uppercase mb-3 text-accent font-body">
      {children}
    </p>
  );
}

function Divider() {
  return <hr className="my-16 md:my-20 border-t border-border" />;
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
    <div className="flex flex-col gap-5 rounded-2xl p-7 md:p-8 bg-surface border border-border shadow-card transition-shadow duration-300">
      {/* Icon */}
      <div className="w-11 h-11 rounded-xl flex items-center justify-center bg-accent/10">
        <span className="text-accent">{icon}</span>
      </div>

      {/* Title + description */}
      <div>
        <h3 className="text-xl font-semibold mb-2 font-display text-text-primary">
          {title}
        </h3>
        <p className="text-sm leading-relaxed font-body text-text-secondary">
          {description}
        </p>
      </div>

      {/* Divider */}
      <hr className="border-t border-border" />

      {/* Phone */}
      <a
        href={`tel:${phone.replace(/\s/g, "")}`}
        className="flex items-center gap-3 group w-fit"
      >
        <Phone
          size={16}
          className="shrink-0 group-hover:scale-110 transition-transform text-accent"
        />
        <span className="text-base font-medium tracking-wide transition-colors font-body text-text-primary">
          {phone}
        </span>
      </a>

      {/* Store */}
      <div className="flex items-start gap-3">
        <MapPin size={16} className="shrink-0 mt-0.5 text-text-secondary" />
        <span className="text-sm font-body text-text-secondary">{store}</span>
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
    <div className="flex flex-col gap-5 rounded-2xl p-7 md:p-8 bg-surface border border-border shadow-card">
      {/* Heading */}
      <div>
        <p className="text-xs font-semibold tracking-[0.15em] uppercase mb-1 font-body text-accent">
          {name}
        </p>
        <h3 className="text-2xl font-semibold font-display text-text-primary">
          {locality}
        </h3>
      </div>

      {/* Address */}
      <div className="flex items-start gap-3">
        <MapPin size={16} className="shrink-0 mt-0.5 text-accent" />
        <address className="not-italic text-sm leading-relaxed font-body text-text-secondary">
          {addressLines.map((line, i) => (
            <span key={i}>
              {line}
              {i < addressLines.length - 1 && <br />}
            </span>
          ))}
        </address>
      </div>

      <hr className="border-t border-border" />

      {/* Specialities */}
      <div>
        <p className="text-xs font-semibold tracking-[0.14em] uppercase mb-3 font-body text-text-secondary">
          Specialises in
        </p>
        <ul className="flex flex-wrap gap-2">
          {specialities.map((s) => (
            <li
              key={s}
              className="px-3 py-1 rounded-full text-xs font-medium font-body text-accent bg-accent/[0.09] border border-border"
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
    <div className="flex flex-col gap-4 rounded-2xl p-7 md:p-8 bg-surface border border-border shadow-card">
      <div className="flex items-center gap-3">
        <div className="w-9 h-9 rounded-lg flex items-center justify-center bg-accent/10">
          <span className="text-accent">{icon}</span>
        </div>
        <h3 className="text-base font-semibold font-display text-text-primary">
          {title}
        </h3>
      </div>
      <div className="font-body text-text-secondary">{children}</div>
    </div>
  );
}

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function ContactPageClient() {
  return (
    <main className="min-h-screen bg-background font-body">
      {/* ── Hero ────────────────────────────────────────────────────────────── */}
      <section className="pt-28 pb-20 md:pt-36 md:pb-24 px-5">
        <div className="max-w-3xl mx-auto text-center">
          <SectionLabel>Get in touch</SectionLabel>
          <h1 className="text-4xl md:text-6xl font-semibold leading-tight mb-5 font-display text-text-primary">
            Contact Wonder Wallz
          </h1>
          <p className="text-base md:text-lg leading-relaxed mb-9 max-w-xl mx-auto text-text-secondary">
            Whether you're looking for custom wall graphics or premium interior
            products, we're here to help you bring your space to life.
          </p>
          <Link
            href="/custom-design"
            className="inline-flex items-center gap-2 px-7 py-3.5 rounded-full text-sm font-medium font-body transition-colors duration-200 bg-accent hover:bg-accent-hover text-text-inverse"
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
          <h2 className="text-2xl md:text-3xl font-semibold mb-8 font-display text-text-primary">
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
          <h2 className="text-2xl md:text-3xl font-semibold mb-8 font-display text-text-primary">
            Our showrooms
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <ShowroomCard
              name="Wonder Wallz"
              locality="Merlin Homeland"
              addressLines={[
                "3rd Floor, Shop no: 327A",
                "18B, Ashutosh Mukherjee Road",
                "Bhowanipore",
                "Kolkata, West Bengal 700025",
              ]}
              specialities={["Wallpapers","Blinds", "Curtains", "Upholstery", "Flooring","Canvas with frames", "More interior products"]}
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
                "Custom Canvas Prints",
                "Custom Glass Films",
                "Personalised Projects",
                "Readymade product catalogues",
              ]}
            />
          </div>
        </section>

        <Divider />

        {/* ── Email · Instagram · Hours ─────────────────────────────────────── */}
        <section>
          <SectionLabel>More ways to reach us</SectionLabel>
          <h2 className="text-2xl md:text-3xl font-semibold mb-8 font-display text-text-primary">
            Other channels
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {/* Email */}
            <InfoCard icon={<Mail size={18} />} title="Email">
              <p className="text-sm leading-relaxed mb-3">
                Send us an email and we'll get back to you as soon as
                possible.
              </p>
              <a
                href="mailto:thewonderwallz@gmail.com"
                className="inline-flex items-center gap-1.5 text-sm font-medium transition-colors text-accent hover:text-accent-hover"
              >
                thewonderwallz@gmail.com
                <ArrowRight size={13} />
              </a>
            </InfoCard>

            {/* Instagram */}
            <InfoCard icon={<Instagram size={18} />} title="Instagram">
              <p className="text-sm leading-relaxed mb-3">
                Follow us for inspiration, project showcases and new arrivals.
              </p>
              <a
                href="https://www.instagram.com/wonderwallz_kolkata"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 text-sm font-medium transition-colors text-accent hover:text-accent-hover"
              >
                @wonderwallz
                <ArrowRight size={13} />
              </a>
            </InfoCard>

            {/* Business Hours */}
            <InfoCard icon={<Clock size={18} />} title="Business Hours">
              <ul className="text-sm space-y-1.5">
                {[
                  ["Monday – Saturday", "11 a.m. – 7:30 p.m."],
                  ["Sunday", "By appointment"],
                ].map(([day, hours]) => (
                  <li key={day} className="flex justify-between gap-4">
                    <span className="text-text-secondary">{day}</span>
                    <span className="font-medium tabular-nums text-text-primary">
                      {hours}
                    </span>
                  </li>
                ))}
              </ul>
              <p className="text-xs mt-3 text-text-tertiary">
                Hours are indicative and may vary on public holidays.
              </p>
            </InfoCard>
          </div>
        </section>

        <Divider />

        {/* ── Bottom CTA ────────────────────────────────────────────────────── */}
        <section className="pb-24 text-center">
          <h2 className="text-3xl md:text-4xl font-semibold mb-6 font-display text-text-primary">
            Ready to transform your space?
          </h2>
          <Link
            href="/custom-design"
            className="inline-flex items-center gap-2 px-8 py-4 rounded-full text-sm font-medium font-body transition-colors duration-200 bg-accent hover:bg-accent-hover text-text-inverse"
          >
            Design Your Space
            <ArrowRight size={15} />
          </Link>
        </section>
      </div>
    </main>
  );
}
