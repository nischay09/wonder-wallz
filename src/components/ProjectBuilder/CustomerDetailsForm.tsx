'use client';

/**
 * CustomerDetailsForm
 * Collects the customer's contact details required to submit the enquiry.
 * Styled to match ProjectRequestCard so it fits the existing layout without
 * any redesign.
 */

import { motion } from 'framer-motion';
import { User } from 'lucide-react';
import type { CustomerDetails, CustomerDetailsErrors } from '../../lib/types';

function FieldLabel({ htmlFor, children }: { htmlFor?: string; children: React.ReactNode }) {
  return (
    <label
      htmlFor={htmlFor}
      className="block text-[11px] font-semibold uppercase tracking-widest text-[#8A6D2E] mb-1.5"
    >
      {children}
    </label>
  );
}

function Field({
  id,
  type = 'text',
  placeholder,
  value,
  onChange,
  error,
}: {
  id: string;
  type?: string;
  placeholder?: string;
  value: string;
  onChange: (v: string) => void;
  error?: string;
}) {
  return (
    <div>
      <input
        id={id}
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        aria-invalid={!!error}
        className={`w-full rounded-xl border bg-white px-3 py-2.5 text-sm text-[#2B2620] placeholder:text-[#B8AD9A] outline-none transition-colors focus:ring-4 focus:ring-[#F3E9CF]/60 ${
          error ? 'border-red-300 focus:border-red-400' : 'border-[#E7DEC8] focus:border-[#C9A227]'
        }`}
      />
      {error && <p className="mt-1 text-xs text-red-500">{error}</p>}
    </div>
  );
}

interface CustomerDetailsFormProps {
  customer: CustomerDetails;
  errors: CustomerDetailsErrors;
  onUpdate: (patch: Partial<CustomerDetails>) => void;
}

export default function CustomerDetailsForm({ customer, errors, onUpdate }: CustomerDetailsFormProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.4 }}
      className="mb-6 rounded-3xl border border-[#E7DEC8] bg-white shadow-[0_4px_24px_-4px_rgba(43,38,32,0.08)] overflow-hidden"
    >
      <div className="flex items-center gap-3 border-b border-[#F0E9D6] bg-[#FAF7EF] px-6 py-4">
        <span className="flex h-8 w-8 items-center justify-center rounded-xl bg-[#F3E9CF]">
          <User className="h-4 w-4 text-[#8A6D2E]" strokeWidth={1.75} />
        </span>
        <span className="text-sm font-semibold text-[#2B2620]">Your Details</span>
      </div>

      <div className="grid grid-cols-1 gap-4 p-6 sm:grid-cols-2">
        <div>
          <FieldLabel htmlFor="customer-name">Name</FieldLabel>
          <Field
            id="customer-name"
            placeholder="Your full name"
            value={customer.name}
            onChange={(v) => onUpdate({ name: v })}
            error={errors.name}
          />
        </div>
        <div>
          <FieldLabel htmlFor="customer-phone">Phone Number</FieldLabel>
          <Field
            id="customer-phone"
            type="tel"
            placeholder="e.g. 98765 43210"
            value={customer.phone}
            onChange={(v) => onUpdate({ phone: v })}
            error={errors.phone}
          />
        </div>
        <div>
          <FieldLabel htmlFor="customer-email">Email Address</FieldLabel>
          <Field
            id="customer-email"
            type="email"
            placeholder="you@example.com"
            value={customer.email}
            onChange={(v) => onUpdate({ email: v })}
            error={errors.email}
          />
        </div>
        <div>
          <FieldLabel htmlFor="customer-city">City (optional)</FieldLabel>
          <Field
            id="customer-city"
            placeholder="Your city"
            value={customer.city}
            onChange={(v) => onUpdate({ city: v })}
          />
        </div>
      </div>
    </motion.div>
  );
}
