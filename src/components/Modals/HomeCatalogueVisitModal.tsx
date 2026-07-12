"use client";

import { useState, type ChangeEvent } from "react";
import { format } from "date-fns";
import { Calendar as CalendarIcon, Check, Clock3, MessageCircle, ShieldCheck } from "lucide-react";

import { Button } from "@/components/ui/Button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/Input";
import { Textarea } from "@/components/ui/Textarea";
import { Select } from "@/components/ui/Select";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import { cn } from "@/lib/utils";
import { openWhatsApp } from "@/lib/whatsapp";

/**
 * HomeCatalogueVisitModal
 * ────────────────────────────────────────────────────────────────────────
 * Pure UI for the "Browse Catalogues at Home" booking flow. No validation,
 * no WhatsApp integration, no backend calls, no routing, and no open/close
 * logic — this component is fully controlled by the parent via `open` /
 * `onOpenChange`, and the "Continue on WhatsApp" button is a visual
 * placeholder only (onClick is left for the parent/future work to wire up).
 */

export type CatalogueCategory =
  | "wallpapers"
  | "flooring"
  | "blinds"
  | "curtains"
  | "upholstery"
  | "glass-films"
  | "canvas-prints";

const CATEGORY_OPTIONS: { value: CatalogueCategory; label: string }[] = [
  { value: "wallpapers", label: "Wallpapers" },
  { value: "flooring", label: "Flooring" },
  { value: "blinds", label: "Blinds" },
  { value: "curtains", label: "Curtains" },
  { value: "upholstery", label: "Upholstery" },
  { value: "glass-films", label: "Glass Films" },
  { value: "canvas-prints", label: "Canvas Prints" },
];

const PROPERTY_TYPE_OPTIONS = [
  { value: "apartment", label: "Apartment / Flat" },
  { value: "independent-house", label: "Independent House" },
  { value: "villa", label: "Villa" },
  { value: "office", label: "Office / Commercial" },
  { value: "other", label: "Other" },
];

const AREA_OPTIONS = [
  { value: "under-500", label: "Under 500 sq. ft." },
  { value: "500-1000", label: "500 – 1,000 sq. ft." },
  { value: "1000-1500", label: "1,000 – 1,500 sq. ft." },
  { value: "1500-2500", label: "1,500 – 2,500 sq. ft." },
  { value: "2500-plus", label: "2,500+ sq. ft." },
];

const TIME_SLOT_OPTIONS = [
  { value: "10-12", label: "10:00 AM – 12:00 PM" },
  { value: "12-2", label: "12:00 PM – 2:00 PM" },
  { value: "2-4", label: "2:00 PM – 4:00 PM" },
  { value: "4-6", label: "4:00 PM – 6:00 PM" },
];

const CATEGORY_LABELS: Record<CatalogueCategory, string> = CATEGORY_OPTIONS.reduce(
  (acc, opt) => ({ ...acc, [opt.value]: opt.label }),
  {} as Record<CatalogueCategory, string>
);

const PROPERTY_TYPE_LABELS: Record<string, string> = PROPERTY_TYPE_OPTIONS.reduce(
  (acc, opt) => ({ ...acc, [opt.value]: opt.label }),
  {} as Record<string, string>
);

const AREA_LABELS: Record<string, string> = AREA_OPTIONS.reduce(
  (acc, opt) => ({ ...acc, [opt.value]: opt.label }),
  {} as Record<string, string>
);

const TIME_SLOT_LABELS: Record<string, string> = TIME_SLOT_OPTIONS.reduce(
  (acc, opt) => ({ ...acc, [opt.value]: opt.label }),
  {} as Record<string, string>
);

interface FormErrors {
  fullName?: string;
  mobileNumber?: string;
  completeAddress?: string;
  pinCode?: string;
  categories?: string;
  visitDate?: string;
  timeSlot?: string;
}

export interface HomeCatalogueVisitModalProps {
  /** Controls dialog visibility. Fully controlled — no internal open state. */
  open: boolean;
  /** Called when the dialog requests to change open state (e.g. backdrop click, close icon). */
  onOpenChange: (open: boolean) => void;
  /** Pre-selects one category in the "Interested In" checkbox group. User can still deselect it. */
  defaultCategory?: CatalogueCategory;
}

export function HomeCatalogueVisitModal({
  open,
  onOpenChange,
  defaultCategory,
}: HomeCatalogueVisitModalProps) {
  const initialCategories = defaultCategory ? [defaultCategory] : [];

  const [fullName, setFullName] = useState("");
  const [mobileNumber, setMobileNumber] = useState("");
  const [completeAddress, setCompleteAddress] = useState("");
  const [pinCode, setPinCode] = useState("");
  const [selectedCategories, setSelectedCategories] =
    useState<CatalogueCategory[]>(initialCategories);
  const [propertyType, setPropertyType] = useState("");
  const [approxArea, setApproxArea] = useState("");
  const [visitDate, setVisitDate] = useState<Date | undefined>(undefined);
  const [timeSlot, setTimeSlot] = useState("");
  const [additionalRequirements, setAdditionalRequirements] = useState("");
  const [errors, setErrors] = useState<FormErrors>({});

  const toggleCategory = (category: CatalogueCategory) => {
    setSelectedCategories((prev) =>
      prev.includes(category) ? prev.filter((c) => c !== category) : [...prev, category]
    );
  };

  const resetForm = () => {
    setFullName("");
    setMobileNumber("");
    setCompleteAddress("");
    setPinCode("");
    setSelectedCategories(defaultCategory ? [defaultCategory] : []);
    setPropertyType("");
    setApproxArea("");
    setVisitDate(undefined);
    setTimeSlot("");
    setAdditionalRequirements("");
    setErrors({});
  };

  const validate = (): FormErrors => {
    const nextErrors: FormErrors = {};

    if (!fullName.trim()) {
      nextErrors.fullName = "Please enter your full name.";
    }

    if (!mobileNumber.trim()) {
      nextErrors.mobileNumber = "Please enter your mobile number.";
    } else if (!/^[0-9+\s-]{7,15}$/.test(mobileNumber.trim())) {
      nextErrors.mobileNumber = "Please enter a valid mobile number.";
    }

    if (!completeAddress.trim()) {
      nextErrors.completeAddress = "Please enter your complete address.";
    }

    if (!pinCode.trim()) {
      nextErrors.pinCode = "Please enter your PIN code.";
    } else if (!/^\d{6}$/.test(pinCode.trim())) {
      nextErrors.pinCode = "Please enter a valid 6-digit PIN code.";
    }

    if (selectedCategories.length === 0) {
      nextErrors.categories = "Please select at least one category.";
    }

    if (!visitDate) {
      nextErrors.visitDate = "Please pick a preferred date.";
    }

    if (!timeSlot) {
      nextErrors.timeSlot = "Please select a preferred time slot.";
    }

    return nextErrors;
  };

  const buildWhatsAppMessage = () => {
    const lines: string[] = [];

    lines.push("Wonder Wallz");
    lines.push("Home Catalogue Visit Request");
    lines.push("");
    lines.push("Customer Details");
    lines.push(`• Name: ${fullName.trim()}`);
    lines.push(`• Mobile Number: ${mobileNumber.trim()}`);
    lines.push("");
    lines.push("Visit Address");
    lines.push(`• Complete Address: ${completeAddress.trim()}`);
    lines.push(`• PIN Code: ${pinCode.trim()}`);
    lines.push("");
    lines.push("Interested In");
    selectedCategories.forEach((category) => {
      lines.push(`• ${CATEGORY_LABELS[category]}`);
    });

    if (propertyType || approxArea) {
      lines.push("");
      lines.push("Property Details");
      if (propertyType) {
        lines.push(`• Property Type: ${PROPERTY_TYPE_LABELS[propertyType] ?? propertyType}`);
      }
      if (approxArea) {
        lines.push(`• Approximate Area: ${AREA_LABELS[approxArea] ?? approxArea}`);
      }
    }

    lines.push("");
    lines.push("Preferred Visit");
    lines.push(`• Preferred Date: ${visitDate ? format(visitDate, "PPP") : ""}`);
    lines.push(`• Preferred Time Slot: ${TIME_SLOT_LABELS[timeSlot] ?? timeSlot}`);

    if (additionalRequirements.trim()) {
      lines.push("");
      lines.push("Additional Notes");
      lines.push(additionalRequirements.trim());
    }

    lines.push("");
    lines.push("Footer");
    lines.push("I understand that:");
    lines.push("• Home catalogue visits cost ₹500.");
    lines.push("• Visits are subject to availability.");
    lines.push("• Same-day visits require at least 4 hours' notice.");
    lines.push("• Otherwise visits should preferably be booked at least one day in advance.");

    return lines.join("\n");
  };

  const handleContinueOnWhatsApp = () => {
    const validationErrors = validate();
    setErrors(validationErrors);

    if (Object.keys(validationErrors).length > 0) {
      return;
    }

    const message = buildWhatsAppMessage();
    openWhatsApp(message);

    onOpenChange(false);
    resetForm();
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent
        className={cn(
          "max-w-[1160px] overflow-hidden bg-[#FBF8F3] p-0 sm:max-w-[1160px]",
          "[&_[data-slot=dialog-close]]:text-[#2C1F14]",
          "[&_[data-slot=dialog-close]]:hover:bg-[#EFE4D0]",
          "[&_[data-slot=dialog-close]]:hover:text-[#2C1F14]",
          "[&_[data-slot=dialog-close]]:h-11 [&_[data-slot=dialog-close]]:w-11",
          "[&_[data-slot=dialog-close]]:top-2 [&_[data-slot=dialog-close]]:right-2",
          "sm:[&_[data-slot=dialog-close]]:h-9 sm:[&_[data-slot=dialog-close]]:w-9"
        )}
      >
      <div className="max-h-[94vh] overflow-y-auto">
        {/* ── Header ─────────────────────────────────────────────── */}
        <DialogHeader className="px-6 pt-8 pb-0 sm:px-12 sm:pt-12 md:px-14">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#B08B5A]">
            Wonder Wallz · At-Home Consultation
          </p>
          <DialogTitle className="mt-3 text-[26px] leading-tight font-semibold text-[#2C1F14] sm:text-[32px]">
            Browse Catalogues at Home
          </DialogTitle>
          <DialogDescription className="mt-2.5 text-[15px] leading-relaxed text-neutral-600">
            Share a few details and our design consultant will bring curated catalogues
            straight to your doorstep.
          </DialogDescription>
        </DialogHeader>

        {/* ── Premium info panel ─────────────────────────────────── */}
        <div className="px-6 mt-8 sm:px-12 sm:mt-9 md:px-14">
          <div className="rounded-2xl border border-[#E7DCC9] bg-gradient-to-br from-[#FFFCF7] to-[#F5EBDA] p-5 sm:p-7">
            {/*
              NOTE: uses CSS grid auto-fit/minmax instead of sm:/md: breakpoints.
              Breakpoints key off the browser *window* width, which can mismatch
              the actual rendered width of this panel inside a narrow preview
              pane or embedded frame. auto-fit measures this element's own box,
              so it reflows correctly no matter how it's hosted.
            */}
            <div className="grid grid-cols-[repeat(auto-fit,minmax(220px,1fr))] gap-5">
              <div className="flex items-start gap-3.5">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#2C1F14] text-white">
                  <ShieldCheck className="h-4 w-4" />
                </div>
                <div className="min-w-0">
                  <p className="text-sm font-semibold whitespace-nowrap text-[#2C1F14]">
                    ₹500 visit fee
                  </p>
                  <p className="mt-1 text-xs leading-relaxed text-neutral-600">
                    Fully adjustable against your final purchase.
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-3.5">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#2C1F14] text-white">
                  <CalendarIcon className="h-4 w-4" />
                </div>
                <div className="min-w-0">
                  <p className="text-sm font-semibold whitespace-nowrap text-[#2C1F14]">
                    Book a day ahead
                  </p>
                  <p className="mt-1 text-xs leading-relaxed text-neutral-600">
                    Please schedule at least one day in advance.
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-3.5">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#2C1F14] text-white">
                  <Clock3 className="h-4 w-4" />
                </div>
                <div className="min-w-0">
                  <p className="text-sm font-semibold whitespace-nowrap text-[#2C1F14]">
                    Same-day, if available
                  </p>
                  <p className="mt-1 text-xs leading-relaxed text-neutral-600">
                    Subject to availability, with a minimum 4-hour notice.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* ── Form ────────────────────────────────────────────────── */}
        <div className="space-y-10 px-6 py-10 sm:space-y-12 sm:px-12 sm:py-12 md:px-14">
          {/* Your Details */}
          <section className="rounded-2xl border border-neutral-200 bg-white p-7 shadow-sm sm:p-9">
            <h3 className="text-base font-semibold text-[#2C1F14] sm:text-lg">Your Details</h3>
            <p className="mt-2 text-sm leading-relaxed text-neutral-500">
              So our consultant knows who to ask for.
            </p>
            <div className="mt-7 grid grid-cols-[repeat(auto-fit,minmax(220px,1fr))] gap-6">
              <div className="space-y-2.5">
                <Input
                  id="full-name"
                  label="Full Name"
                  placeholder="Enter your full name"
                  className="h-12"
                  value={fullName}
                  onChange={(e: ChangeEvent<HTMLInputElement>) => setFullName(e.target.value)}
                  error={errors.fullName}
                />
              </div>
              <div className="space-y-2.5">
                <Input
                  id="mobile-number"
                  label="Mobile Number"
                  type="tel"
                  placeholder="+91 98765 43210"
                  className="h-12"
                  value={mobileNumber}
                  onChange={(e: ChangeEvent<HTMLInputElement>) => setMobileNumber(e.target.value)}
                  error={errors.mobileNumber}
                />
              </div>
            </div>
          </section>

          {/* Visit Address */}
          <section className="rounded-2xl border border-neutral-200 bg-white p-7 shadow-sm sm:p-9">
            <h3 className="text-base font-semibold text-[#2C1F14] sm:text-lg">Visit Address</h3>
            <p className="mt-2 text-sm leading-relaxed text-neutral-500">
              Where should we bring the catalogues?
            </p>
            <div className="mt-7 space-y-7">
              <div className="space-y-2.5">
                <Textarea
                  id="complete-address"
                  label="Complete Address"
                  placeholder="House/Flat No., Street, Locality, City"
                  rows={3}
                  resize="none"
                  value={completeAddress}
                  onChange={(e: ChangeEvent<HTMLTextAreaElement>) => setCompleteAddress(e.target.value)}
                  error={errors.completeAddress}
                />
              </div>
              <div className="w-full max-w-[280px] space-y-2.5">
                <Input
                  id="pin-code"
                  label="PIN Code"
                  inputMode="numeric"
                  placeholder="700001"
                  className="h-12"
                  value={pinCode}
                  onChange={(e: ChangeEvent<HTMLInputElement>) => setPinCode(e.target.value)}
                  error={errors.pinCode}
                />
              </div>
            </div>
          </section>

          {/* Interested In */}
          <section className="rounded-2xl border border-neutral-200 bg-white p-7 shadow-sm sm:p-9">
            <h3 className="text-base font-semibold text-[#2C1F14] sm:text-lg">Interested In</h3>
            <p className="mt-2 text-sm leading-relaxed text-neutral-500">
              Select every category you'd like us to bring — pick as many as you like.
            </p>
            <div className="mt-7 grid grid-cols-[repeat(auto-fit,minmax(160px,1fr))] gap-3.5">
              {CATEGORY_OPTIONS.map((option) => {
                const isSelected = selectedCategories.includes(option.value);
                return (
                  <label
                    key={option.value}
                    htmlFor={`category-${option.value}`}
                    className={cn(
                      "group relative flex cursor-pointer items-center gap-2.5 rounded-xl border px-4 py-3.5 transition-all",
                      isSelected
                        ? "border-[#2C1F14] bg-[#2C1F14] text-white shadow-sm"
                        : "border-neutral-200 bg-white text-neutral-800 hover:border-[#C9A26D] hover:bg-[#FBF6EC]"
                    )}
                  >
                    <input
                      type="checkbox"
                      id={`category-${option.value}`}
                      checked={isSelected}
                      onChange={() => toggleCategory(option.value)}
                      className="sr-only"
                    />
                    <span
                      className={cn(
                        "flex h-5 w-5 shrink-0 items-center justify-center rounded-full border transition-colors",
                        isSelected
                          ? "border-white bg-white text-[#2C1F14]"
                          : "border-neutral-300 bg-transparent text-transparent"
                      )}
                    >
                      <Check className="h-3.5 w-3.5" strokeWidth={3} />
                    </span>
                    <span className="text-sm font-medium">{option.label}</span>
                  </label>
                );
              })}
            </div>
            {errors.categories && (
              <p className="mt-3 text-xs font-medium text-red-600">{errors.categories}</p>
            )}
          </section>

          {/* Property Details (Optional) */}
          <section className="rounded-2xl border border-neutral-200 bg-white p-7 shadow-sm sm:p-9">
            <div className="flex items-baseline justify-between gap-3">
              <h3 className="text-base font-semibold text-[#2C1F14] sm:text-lg">
                Property Details
              </h3>
              <span className="shrink-0 text-xs font-medium uppercase tracking-wide text-neutral-400">
                Optional
              </span>
            </div>
            <p className="mt-2 text-sm leading-relaxed text-neutral-500">
              Helps us bring the right samples and quantities.
            </p>
            <div className="mt-7 grid grid-cols-[repeat(auto-fit,minmax(220px,1fr))] gap-6">
              <Select
                id="property-type"
                label="Property Type"
                placeholder="Select property type"
                options={PROPERTY_TYPE_OPTIONS}
                value={propertyType}
                onChange={(e: ChangeEvent<HTMLSelectElement>) => setPropertyType(e.target.value)}
              />
              <Select
                id="approx-area"
                label="Approximate Area"
                placeholder="Select approximate area"
                options={AREA_OPTIONS}
                value={approxArea}
                onChange={(e: ChangeEvent<HTMLSelectElement>) => setApproxArea(e.target.value)}
              />
            </div>
          </section>

          {/* Preferred Visit */}
          <section className="rounded-2xl border border-neutral-200 bg-white p-7 shadow-sm sm:p-9">
            <h3 className="text-base font-semibold text-[#2C1F14] sm:text-lg">Preferred Visit</h3>
            <p className="mt-2 text-sm leading-relaxed text-neutral-500">
              Choose a date and time slot that works best for you.
            </p>
            <div className="mt-7 grid grid-cols-[repeat(auto-fit,minmax(220px,1fr))] gap-6">
              <div className="space-y-2.5">
                <label
                  htmlFor="visit-date"
                  className="text-sm font-semibold text-text-primary select-none"
                >
                  Date
                </label>
                <Popover>
                 <PopoverTrigger
                    render={
                      <Button
                        id="visit-date"
                        type="button"
                        variant="ghost"
                        className={cn(
                          "h-12 w-full justify-start rounded-lg border border-neutral-200 text-left font-normal hover:bg-neutral-50",
                          !visitDate && "text-neutral-500"
                        )}
                      />
                    }
                  >
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {visitDate ? format(visitDate, "PPP") : "Pick a date"}
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0" align="start">
                    <Calendar
                      mode="single"
                      selected={visitDate}
                      onSelect={setVisitDate}
                    />
                  </PopoverContent>
                </Popover>
                {errors.visitDate && (
                  <p className="text-xs font-medium text-red-600">{errors.visitDate}</p>
                )}
              </div>
              <div className="space-y-2.5">
                <Select
                  id="time-slot"
                  label="Time Slot"
                  placeholder="Select a time slot"
                  options={TIME_SLOT_OPTIONS}
                  value={timeSlot}
                  onChange={(e: ChangeEvent<HTMLSelectElement>) => setTimeSlot(e.target.value)}
                  error={errors.timeSlot}
                />
              </div>
            </div>
          </section>

          {/* Additional Requirements */}
          <section className="rounded-2xl border border-neutral-200 bg-white p-7 shadow-sm sm:p-9">
            <h3 className="text-base font-semibold text-[#2C1F14] sm:text-lg">
              Additional Requirements
            </h3>
            <p className="mt-2 text-sm leading-relaxed text-neutral-500">
              Tell us about specific designs, colours, or anything else on your mind.
            </p>
            <Textarea
              id="additional-requirements"
              placeholder="Any specific designs, colours, or requirements you'd like us to know about..."
              rows={4}
              resize="none"
              className="mt-7"
              value={additionalRequirements}
              onChange={(e: ChangeEvent<HTMLTextAreaElement>) => setAdditionalRequirements(e.target.value)}
            />
          </section>
        </div>

        {/* ── Footer ─────────────────────────────────────────────── */}
        <DialogFooter className="flex-col gap-4 border-t border-neutral-200 bg-white px-6 py-7 sm:flex-row sm:items-center sm:justify-between sm:px-12 md:px-14">
          <div className="flex items-start gap-2.5 text-left">
            <MessageCircle className="mt-0.5 h-4 w-4 shrink-0 text-[#2C1F14]" />
            <p className="text-xs leading-relaxed text-neutral-600 sm:max-w-[340px]">
              We'll open WhatsApp with your details pre-filled. Our team will confirm your
              slot and payment link there.
            </p>
          </div>
          <Button
            type="button"
            className="h-12 w-full shrink-0 whitespace-nowrap rounded-lg px-6 text-white sm:w-auto"
            style={{ background: "#2C1F14" }}
            onClick={handleContinueOnWhatsApp}
          >
            Continue on WhatsApp
          </Button>
        </DialogFooter>
      </div>
      </DialogContent>
    </Dialog>
  );
}
