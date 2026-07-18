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

import { useState, useEffect } from "react";
import { createPortal } from "react-dom";
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

  // Portals need a real DOM node, which only exists after mount — this
  // guards against SSR (document is undefined on the server) and avoids
  // a hydration mismatch.
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

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

  if (!mounted) return null;

  return createPortal(
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

          {/*
            Mobile (<768px): full-width bottom sheet, anchored to the bottom
            of the viewport, capped at 90dvh with its own internal scroll
            area so the form never extends past the visible screen — even
            when the on-screen keyboard is open.

            Tablet/desktop (sm and up): reverts to the original centered
            drawer treatment.
          */}
          <motion.div
            key="order-modal"
            role="dialog"
            aria-modal="true"
            aria-label="Your details"
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 24 }}
            transition={{ type: "spring", stiffness: 340, damping: 32 }}
            className="fixed inset-x-0 bottom-0 z-[70] flex max-h-[90dvh] w-full flex-col rounded-t-[20px] bg-[#FAF7F3] shadow-[0_-8px_40px_rgba(44,32,23,0.25)] sm:inset-x-auto sm:inset-y-0 sm:bottom-auto sm:left-1/2 sm:top-1/2 sm:max-h-[85vh] sm:w-[92%] sm:max-w-[420px] sm:-translate-x-1/2 sm:-translate-y-1/2 sm:rounded-[20px] sm:shadow-[0_20px_60px_rgba(44,32,23,0.25)]"
          >
            <div className="flex shrink-0 items-start justify-between gap-4 px-6 pb-1 pt-6">
              <div>
                <h2 className="font-['Playfair_Display'] text-[20px] font-semibold text-[#2C2017]">
                  Your Details
                </h2>
                <p className="mt-1 font-['DM_Sans'] text-[13px] text-[#8B6A48]">
                  We&apos;ll use this to confirm your order.
                </p>
              </div>

              <button
                type="button"
                onClick={onClose}
                aria-label="Close"
                className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-[#EDE4D8] bg-white/80 text-[#8B6A48] shadow-sm transition-all duration-150 hover:border-[#C9A96E]/40 hover:bg-[#F3EDE4] hover:text-[#2C2017] active:scale-90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#C9A96E]/60"
              >
                <span aria-hidden="true" className="text-[18px] leading-none">
                  ×
                </span>
              </button>
            </div>

            <form
              onSubmit={handleSubmit}
              className="min-h-0 flex-1 space-y-4 overflow-y-auto overscroll-contain px-6 pb-6 pt-4"
            >
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
                  className="flex-1 rounded-full border border-[#DDD0C0] bg-transparent py-3 font-['DM_Sans'] text-[14px] font-medium text-[#8B6A48] transition-all duration-200 hover:border-[#C9A96E] hover:bg-[#F3EDE4] active:scale-[0.98] disabled:opacity-50 disabled:active:scale-100"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="flex-1 rounded-full bg-[#2C2017] py-3 font-['DM_Sans'] text-[14px] font-semibold text-[#FAF7F3] shadow-[0_4px_20px_rgba(44,32,23,0.28)] transition-all duration-200 hover:bg-[#3D2E1A] hover:shadow-[0_6px_26px_rgba(44,32,23,0.34)] active:scale-[0.98] disabled:opacity-60 disabled:active:scale-100"
                >
                  {isSubmitting ? "Placing Order…" : "Place Order"}
                </button>
              </div>
            </form>
          </motion.div>
        </>
      )}
    </AnimatePresence>,
    document.body
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
        className={`w-full rounded-[10px] border bg-white/80 px-3.5 py-2.5 font-['DM_Sans'] text-[14px] text-[#2C2017] outline-none transition-all duration-150 focus:border-[#9C7A3F] focus:ring-2 focus:ring-[#C9A96E]/40 ${
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
