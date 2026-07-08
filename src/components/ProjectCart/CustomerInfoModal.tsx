"use client";

/**
 * src/components/ProjectCart/CustomerInfoModal.tsx
 *
 * Collects Name / Phone / Email / City before placing a cart order.
 * Reuses the exact same validation logic as Project Builder
 * (validateCustomerDetails from src/lib/types.ts) so the two flows stay
 * consistent without duplicating validation rules.
 *
 * No address field (not required for this flow), no payment.
 */

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  makeCustomerDetails,
  validateCustomerDetails,
  type CustomerDetails,
  type CustomerDetailsErrors,
} from "@/lib/types";

interface CustomerInfoModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (customer: CustomerDetails) => void;
  isSubmitting?: boolean;
  submitError?: string | null;
}

export function CustomerInfoModal({
  isOpen,
  onClose,
  onSubmit,
  isSubmitting = false,
  submitError = null,
}: CustomerInfoModalProps) {
  const [customer, setCustomer] = useState<CustomerDetails>(makeCustomerDetails());
  const [errors, setErrors] = useState<CustomerDetailsErrors>({});

  const handleChange = (field: keyof CustomerDetails, value: string) => {
    setCustomer((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const { valid, errors: validationErrors } = validateCustomerDetails(customer);
    setErrors(validationErrors);
    if (!valid) return;
    onSubmit(customer);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            key="order-modal-backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            onClick={onClose}
            aria-hidden="true"
            className="fixed inset-0 z-[60] bg-[#1A1208]/50 backdrop-blur-[3px]"
          />

          <motion.div
            key="order-modal"
            role="dialog"
            aria-modal="true"
            aria-label="Your details"
            initial={{ opacity: 0, y: 16, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 16, scale: 0.98 }}
            transition={{ type: "spring", stiffness: 340, damping: 30 }}
            className="fixed left-1/2 top-1/2 z-[70] w-[92%] max-w-[420px] -translate-x-1/2 -translate-y-1/2 rounded-[20px] bg-[#FAF7F3] p-6 shadow-[0_20px_60px_rgba(44,32,23,0.25)]"
          >
            <h2 className="mb-1 font-['Playfair_Display'] text-[20px] font-semibold text-[#2C2017]">
              Your Details
            </h2>
            <p className="mb-5 font-['DM_Sans'] text-[13px] text-[#8B6A48]">
              We&apos;ll use this to confirm your order.
            </p>

            <form onSubmit={handleSubmit} className="space-y-4">
              <Field
                label="Name"
                value={customer.name}
                onChange={(v) => handleChange("name", v)}
                error={errors.name}
                autoComplete="name"
              />
              <Field
                label="Phone"
                value={customer.phone}
                onChange={(v) => handleChange("phone", v)}
                error={errors.phone}
                type="tel"
                autoComplete="tel"
              />
              <Field
                label="Email"
                value={customer.email}
                onChange={(v) => handleChange("email", v)}
                error={errors.email}
                type="email"
                autoComplete="email"
              />
              <Field
                label="City (optional)"
                value={customer.city}
                onChange={(v) => handleChange("city", v)}
                autoComplete="address-level2"
              />

              {submitError && (
                <p className="font-['DM_Sans'] text-[13px] text-red-600">{submitError}</p>
              )}

              <div className="flex gap-3 pt-2">
                <button
                  type="button"
                  onClick={onClose}
                  disabled={isSubmitting}
                  className="flex-1 rounded-full border border-[#DDD0C0] bg-transparent py-3 font-['DM_Sans'] text-[14px] font-medium text-[#8B6A48] transition-colors hover:border-[#C9A96E] hover:bg-[#F3EDE4] disabled:opacity-50"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="flex-1 rounded-full bg-[#2C2017] py-3 font-['DM_Sans'] text-[14px] font-semibold text-[#FAF7F3] shadow-[0_4px_20px_rgba(44,32,23,0.28)] transition-colors hover:bg-[#3D2E1A] disabled:opacity-60"
                >
                  {isSubmitting ? "Placing Order…" : "Place Order"}
                </button>
              </div>
            </form>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}

// ---------------------------------------------------------------------------

interface FieldProps {
  label: string;
  value: string;
  onChange: (value: string) => void;
  error?: string;
  type?: string;
  autoComplete?: string;
}

function Field({ label, value, onChange, error, type = "text", autoComplete }: FieldProps) {
  return (
    <label className="block">
      <span className="mb-1.5 block font-['DM_Sans'] text-[12px] font-medium text-[#6B6258]">
        {label}
      </span>
      <input
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        autoComplete={autoComplete}
        className={`w-full rounded-[10px] border bg-white/80 px-3.5 py-2.5 font-['DM_Sans'] text-[14px] text-[#2C2017] outline-none transition-colors focus:border-[#9C7A3F] ${
          error ? "border-red-400" : "border-[#E8DDD0]"
        }`}
      />
      {error && (
        <span className="mt-1 block font-['DM_Sans'] text-[12px] text-red-600">{error}</span>
      )}
    </label>
  );
}

export default CustomerInfoModal;
