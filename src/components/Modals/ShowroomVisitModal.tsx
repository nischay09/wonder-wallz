"use client";

import { useState, type ChangeEvent } from "react";
import { format } from "date-fns";
import { Calendar as CalendarIcon, Check, MapPin, MessageCircle, Sparkles, Star } from "lucide-react";

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
import { type CatalogueCategory } from "@/components/Modals/HomeCatalogueVisitModal";

/**
 * ShowroomVisitModal
 * ────────────────────────────────────────────────────────────────────────
 * Booking flow for "Book a Showroom Visit". Mirrors HomeCatalogueVisitModal's
 * architecture, styling and UX (controlled open/close, same section shell,
 * same "Interested In" chip pattern, same WhatsApp hand-off), but swaps the
 * home-visit-specific fields (address, PIN code, property details, ₹500 fee)
 * for a showroom selection step with smart default preselection.
 */

export type ShowroomLocation = "merlin-homeland" | "chandni";

const CATEGORY_OPTIONS: { value: CatalogueCategory; label: string }[] = [
  { value: "wallpapers", label: "Wallpapers" },
  { value: "flooring", label: "Flooring" },
  { value: "blinds", label: "Blinds" },
  { value: "curtains", label: "Curtains" },
  { value: "upholstery", label: "Upholstery" },
  { value: "glass-films", label: "Glass Films" },
  { value: "canvas-prints", label: "Canvas Prints" },
];

const CATEGORY_LABELS: Record<CatalogueCategory, string> = CATEGORY_OPTIONS.reduce(
  (acc, opt) => ({ ...acc, [opt.value]: opt.label }),
  {} as Record<CatalogueCategory, string>
);

// Categories that only exist as custom-order work — these steer the
// customer toward Chandni. Anything outside this set (wallpapers, flooring,
// blinds, curtains, upholstery) is a catalogue category and steers toward
// Merlin Homeland.
const CUSTOM_ONLY_CATEGORIES: CatalogueCategory[] = [
  "glass-films",
  "canvas-prints",
];
// Note: "Custom Wallpapers" isn't a distinct CatalogueCategory value in this
// codebase — "wallpapers" is shared between catalogue and custom requests —
// so it's intentionally left out of CUSTOM_ONLY_CATEGORIES and treated as a
// catalogue category for preselection purposes.

const TIME_SLOT_OPTIONS = [
  { value: "10-12", label: "10:00 AM – 12:00 PM" },
  { value: "12-2", label: "12:00 PM – 2:00 PM" },
  { value: "2-4", label: "2:00 PM – 4:00 PM" },
  { value: "4-6", label: "4:00 PM – 6:00 PM" },
];

const TIME_SLOT_LABELS: Record<string, string> = TIME_SLOT_OPTIONS.reduce(
  (acc, opt) => ({ ...acc, [opt.value]: opt.label }),
  {} as Record<string, string>
);

const SHOWROOM_LABELS: Record<ShowroomLocation, string> = {
  "merlin-homeland": "Merlin Homeland Showroom",
  chandni: "Chandni Showroom",
};

/**
 * Given a set of interested categories, decides which showroom (if any)
 * should be auto-selected:
 *  - Only custom-only categories selected  -> Chandni
 *  - Only catalogue categories selected    -> Merlin Homeland
 *  - A mix of both, or nothing selected    -> no auto-selection
 */
function getDefaultShowroom(
  categories: CatalogueCategory[]
): ShowroomLocation | undefined {
  if (categories.length === 0) return undefined;

  const hasCustom = categories.some((c) => CUSTOM_ONLY_CATEGORIES.includes(c));
  const hasCatalogue = categories.some((c) => !CUSTOM_ONLY_CATEGORIES.includes(c));

  if (hasCustom && !hasCatalogue) return "chandni";
  if (hasCatalogue && !hasCustom) return "merlin-homeland";
  return undefined;
}

interface FormErrors {
  fullName?: string;
  mobileNumber?: string;
  categories?: string;
  showroom?: string;
}

export interface ShowroomVisitModalProps {
  /** Controls dialog visibility. Fully controlled — no internal open state. */
  open: boolean;
  /** Called when the dialog requests to change open state (e.g. backdrop click, close icon). */
  onOpenChange: (open: boolean) => void;
  /** Pre-selects one category in the "Interested In" checkbox group. User can still deselect it. */
  defaultCategory?: CatalogueCategory;
}

export function ShowroomVisitModal({
  open,
  onOpenChange,
  defaultCategory,
}: ShowroomVisitModalProps) {
  const initialCategories = defaultCategory ? [defaultCategory] : [];

  const [fullName, setFullName] = useState("");
  const [mobileNumber, setMobileNumber] = useState("");
  const [selectedCategories, setSelectedCategories] =
    useState<CatalogueCategory[]>(initialCategories);
  const [selectedShowroom, setSelectedShowroom] = useState<ShowroomLocation | undefined>(
    getDefaultShowroom(initialCategories)
  );
  const [visitDate, setVisitDate] = useState<Date | undefined>(undefined);
  const [timeSlot, setTimeSlot] = useState("");
  const [additionalNotes, setAdditionalNotes] = useState("");
  const [errors, setErrors] = useState<FormErrors>({});

  // Tracks whether the customer has manually picked a showroom card, so
  // further category changes stop overriding their explicit choice.
  const [showroomTouched, setShowroomTouched] = useState(false);

  const toggleCategory = (category: CatalogueCategory) => {
    setSelectedCategories((prev) => {
      const next = prev.includes(category)
        ? prev.filter((c) => c !== category)
        : [...prev, category];

      // Keep re-running the smart default as categories change, but only
      // until the customer manually picks a showroom themselves.
      if (!showroomTouched) {
        setSelectedShowroom(getDefaultShowroom(next));
      }

      return next;
    });
  };

  const handleSelectShowroom = (location: ShowroomLocation) => {
    setShowroomTouched(true);
    setSelectedShowroom(location);
  };

  const resetForm = () => {
    setFullName("");
    setMobileNumber("");
    setSelectedCategories(defaultCategory ? [defaultCategory] : []);
    setSelectedShowroom(getDefaultShowroom(defaultCategory ? [defaultCategory] : []));
    setShowroomTouched(false);
    setVisitDate(undefined);
    setTimeSlot("");
    setAdditionalNotes("");
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

    if (selectedCategories.length === 0) {
      nextErrors.categories = "Please select at least one category.";
    }

    if (!selectedShowroom) {
      nextErrors.showroom = "Please choose a showroom.";
    }

    return nextErrors;
  };

  const buildWhatsAppMessage = () => {
    const lines: string[] = [];

    lines.push("Wonder Wallz");
    lines.push("Showroom Visit Request");
    lines.push("");
    lines.push("Customer Details");
    lines.push(`• Name: ${fullName.trim()}`);
    lines.push(`• Mobile Number: ${mobileNumber.trim()}`);
    lines.push("");
    lines.push("Preferred Showroom");
    lines.push(`• ${selectedShowroom ? SHOWROOM_LABELS[selectedShowroom] : ""}`);
    lines.push("");
    lines.push("Interested In");
    selectedCategories.forEach((category) => {
      lines.push(`• ${CATEGORY_LABELS[category]}`);
    });

    if (visitDate || timeSlot) {
      lines.push("");
      lines.push("Visit Preferences");
      if (visitDate) {
        lines.push(`• Preferred Date: ${format(visitDate, "PPP")}`);
      }
      if (timeSlot) {
        lines.push(`• Preferred Time: ${TIME_SLOT_LABELS[timeSlot] ?? timeSlot}`);
      }
    }

    if (additionalNotes.trim()) {
      lines.push("");
      lines.push("Additional Notes");
      lines.push(additionalNotes.trim());
    }

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
            Wonder Wallz · Showroom Consultation
          </p>
          <DialogTitle className="mt-3 text-[26px] leading-tight font-semibold text-[#2C1F14] sm:text-[32px]">
            Book a Showroom Visit
          </DialogTitle>
          <DialogDescription className="mt-2.5 text-[15px] leading-relaxed text-neutral-600">
            Meet with our team, explore materials, compare finishes and receive personalised
            guidance.
          </DialogDescription>
        </DialogHeader>

        {/* ── Premium info panel ─────────────────────────────────── */}
        <div className="px-6 mt-8 sm:px-12 sm:mt-9 md:px-14">
          <div className="rounded-2xl border border-[#E7DCC9] bg-gradient-to-br from-[#FFFCF7] to-[#F5EBDA] p-5 sm:p-7">
            <div className="grid grid-cols-[repeat(auto-fit,minmax(220px,1fr))] gap-5">
              <div className="flex items-start gap-3.5">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#2C1F14] text-white">
                  <Sparkles className="h-4 w-4" />
                </div>
                <div className="min-w-0">
                  <p className="text-sm font-semibold text-[#2C1F14]">Browse in person</p>
                  <p className="mt-1 text-xs leading-relaxed text-neutral-600">
                    Wallpaper, flooring, blinds and glass film collections.
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-3.5">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#2C1F14] text-white">
                  <Check className="h-4 w-4" />
                </div>
                <div className="min-w-0">
                  <p className="text-sm font-semibold text-[#2C1F14]">Compare finishes</p>
                  <p className="mt-1 text-xs leading-relaxed text-neutral-600">
                    Colours, textures and finishes, side by side.
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-3.5">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#2C1F14] text-white">
                  <Star className="h-4 w-4" />
                </div>
                <div className="min-w-0">
                  <p className="text-sm font-semibold text-[#2C1F14]">Personalised guidance</p>
                  <p className="mt-1 text-xs leading-relaxed text-neutral-600">
                    Product recommendations tailored to your project.
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-3.5">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#2C1F14] text-white">
                  <CalendarIcon className="h-4 w-4" />
                </div>
                <div className="min-w-0">
                  <p className="text-sm font-semibold text-[#2C1F14]">Appointments recommended</p>
                  <p className="mt-1 text-xs leading-relaxed text-neutral-600">
                    For the best, unhurried experience.
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
              So our team knows who to expect.
            </p>
            <div className="mt-7 grid grid-cols-[repeat(auto-fit,minmax(220px,1fr))] gap-6">
              <div className="space-y-2.5">
                <Input
                  id="showroom-full-name"
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
                  id="showroom-mobile-number"
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

          {/* Where would you like to meet us? */}
          <section className="rounded-2xl border border-neutral-200 bg-white p-7 shadow-sm sm:p-9">
            <h3 className="text-base font-semibold text-[#2C1F14] sm:text-lg">
              Where would you like to meet us?
            </h3>
            <p className="mt-2 text-sm leading-relaxed text-neutral-500">
              Choose the showroom that suits your project best.
            </p>

            <div className="mt-7 grid grid-cols-[repeat(auto-fit,minmax(260px,1fr))] gap-5">
              {/* Merlin Homeland Showroom */}
              <label
                htmlFor="showroom-merlin-homeland"
                className={cn(
                  "group relative flex cursor-pointer flex-col gap-3.5 rounded-2xl border p-6 transition-all",
                  selectedShowroom === "merlin-homeland"
                    ? "border-[#2C1F14] bg-[#2C1F14] text-white shadow-sm"
                    : "border-neutral-200 bg-white text-neutral-800 hover:border-[#C9A26D] hover:bg-[#FBF6EC]"
                )}
              >
                <input
                  type="radio"
                  name="showroom"
                  id="showroom-merlin-homeland"
                  checked={selectedShowroom === "merlin-homeland"}
                  onChange={() => handleSelectShowroom("merlin-homeland")}
                  className="sr-only"
                />
                <div className="flex items-start justify-between gap-3">
                  <div className="flex items-center gap-2">
                    <Star
                      className={cn(
                        "h-4 w-4 shrink-0",
                        selectedShowroom === "merlin-homeland" ? "text-[#D9B978]" : "text-[#B08B5A]"
                      )}
                      fill="currentColor"
                    />
                    <span className="text-[15px] font-semibold">Merlin Homeland Showroom</span>
                  </div>
                  <span
                    className={cn(
                      "shrink-0 rounded-full px-2.5 py-1 text-[10px] font-semibold uppercase tracking-wide",
                      selectedShowroom === "merlin-homeland"
                        ? "bg-white/15 text-white"
                        : "bg-[#FBF6EC] text-[#B08B5A]"
                    )}
                  >
                    Recommended
                  </span>
                </div>
                <p
                  className={cn(
                    "text-xs font-medium uppercase tracking-wide",
                    selectedShowroom === "merlin-homeland" ? "text-white/70" : "text-neutral-400"
                  )}
                >
                  Ideal for
                </p>
                <ul
                  className={cn(
                    "space-y-1.5 text-sm leading-relaxed",
                    selectedShowroom === "merlin-homeland" ? "text-white/90" : "text-neutral-600"
                  )}
                >
                  <li>• Browsing our complete catalogue collection</li>
                  <li>• Comparing materials and finishes</li>
                  <li>• Interior consultation</li>
                  <li>• Ready-made product collections</li>
                </ul>
              </label>

              {/* Chandni Showroom */}
              <label
                htmlFor="showroom-chandni"
                className={cn(
                  "group relative flex cursor-pointer flex-col gap-3.5 rounded-2xl border p-6 transition-all",
                  selectedShowroom === "chandni"
                    ? "border-[#2C1F14] bg-[#2C1F14] text-white shadow-sm"
                    : "border-neutral-200 bg-white text-neutral-800 hover:border-[#C9A26D] hover:bg-[#FBF6EC]"
                )}
              >
                <input
                  type="radio"
                  name="showroom"
                  id="showroom-chandni"
                  checked={selectedShowroom === "chandni"}
                  onChange={() => handleSelectShowroom("chandni")}
                  className="sr-only"
                />
                <div className="flex items-center gap-2">
                  <MapPin
                    className={cn(
                      "h-4 w-4 shrink-0",
                      selectedShowroom === "chandni" ? "text-[#D9B978]" : "text-[#B08B5A]"
                    )}
                  />
                  <span className="text-[15px] font-semibold">Chandni Showroom</span>
                </div>
                <p
                  className={cn(
                    "text-xs font-medium uppercase tracking-wide",
                    selectedShowroom === "chandni" ? "text-white/70" : "text-neutral-400"
                  )}
                >
                  Ideal for
                </p>
                <ul
                  className={cn(
                    "space-y-1.5 text-sm leading-relaxed",
                    selectedShowroom === "chandni" ? "text-white/90" : "text-neutral-600"
                  )}
                >
                  <li>• Custom wallpaper projects</li>
                  <li>• Custom glass film discussions</li>
                  <li>• Existing project consultations</li>
                  <li>• Viewing selected catalogue samples</li>
                </ul>
              </label>
            </div>

            <p className="mt-5 text-xs leading-relaxed text-neutral-500">
              Not sure which location is best? Choose either location and we'll guide you to
              the most suitable showroom when we confirm your visit.
            </p>

            {errors.showroom && (
              <p className="mt-3 text-xs font-medium text-red-600">{errors.showroom}</p>
            )}
          </section>

          {/* Interested In */}
          <section className="rounded-2xl border border-neutral-200 bg-white p-7 shadow-sm sm:p-9">
            <h3 className="text-base font-semibold text-[#2C1F14] sm:text-lg">Interested In</h3>
            <p className="mt-2 text-sm leading-relaxed text-neutral-500">
              Select every category you'd like to explore — pick as many as you like.
            </p>
            <div className="mt-7 grid grid-cols-[repeat(auto-fit,minmax(160px,1fr))] gap-3.5">
              {CATEGORY_OPTIONS.map((option) => {
                const isSelected = selectedCategories.includes(option.value);
                return (
                  <label
                    key={option.value}
                    htmlFor={`showroom-category-${option.value}`}
                    className={cn(
                      "group relative flex cursor-pointer items-center gap-2.5 rounded-xl border px-4 py-3.5 transition-all",
                      isSelected
                        ? "border-[#2C1F14] bg-[#2C1F14] text-white shadow-sm"
                        : "border-neutral-200 bg-white text-neutral-800 hover:border-[#C9A26D] hover:bg-[#FBF6EC]"
                    )}
                  >
                    <input
                      type="checkbox"
                      id={`showroom-category-${option.value}`}
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

          {/* Visit Preferences (Optional) */}
          <section className="rounded-2xl border border-neutral-200 bg-white p-7 shadow-sm sm:p-9">
            <div className="flex items-baseline justify-between gap-3">
              <h3 className="text-base font-semibold text-[#2C1F14] sm:text-lg">
                Visit Preferences
              </h3>
              <span className="shrink-0 text-xs font-medium uppercase tracking-wide text-neutral-400">
                Optional
              </span>
            </div>
            <p className="mt-2 text-sm leading-relaxed text-neutral-500">
              Choose a date and time slot that works best for you.
            </p>
            <div className="mt-7 grid grid-cols-[repeat(auto-fit,minmax(220px,1fr))] gap-6">
              <div className="space-y-2.5">
                <label
                  htmlFor="showroom-visit-date"
                  className="text-sm font-semibold text-text-primary select-none"
                >
                  Preferred Date
                </label>
                <Popover>
                 <PopoverTrigger
                    render={
                      <Button
                        id="showroom-visit-date"
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
              </div>
              <div className="space-y-2.5">
                <Select
                  id="showroom-time-slot"
                  label="Preferred Time Slot"
                  placeholder="Select a time slot"
                  options={TIME_SLOT_OPTIONS}
                  value={timeSlot}
                  onChange={(e: ChangeEvent<HTMLSelectElement>) => setTimeSlot(e.target.value)}
                />
              </div>
            </div>
          </section>

          {/* Additional Notes (Optional) */}
          <section className="rounded-2xl border border-neutral-200 bg-white p-7 shadow-sm sm:p-9">
            <div className="flex items-baseline justify-between gap-3">
              <h3 className="text-base font-semibold text-[#2C1F14] sm:text-lg">
                Additional Notes
              </h3>
              <span className="shrink-0 text-xs font-medium uppercase tracking-wide text-neutral-400">
                Optional
              </span>
            </div>
            <p className="mt-2 text-sm leading-relaxed text-neutral-500">
              Tell us about specific designs, colours, or anything else on your mind.
            </p>
            <Textarea
              id="showroom-additional-notes"
              placeholder="Any specific designs, colours, or requirements you'd like us to know about..."
              rows={4}
              resize="none"
              className="mt-7"
              value={additionalNotes}
              onChange={(e: ChangeEvent<HTMLTextAreaElement>) => setAdditionalNotes(e.target.value)}
            />
          </section>
        </div>

        {/* ── Footer ─────────────────────────────────────────────── */}
        <DialogFooter className="flex-col gap-4 border-t border-neutral-200 bg-white px-6 py-7 sm:flex-row sm:items-center sm:justify-between sm:px-12 md:px-14">
          <div className="flex items-start gap-2.5 text-left">
            <MessageCircle className="mt-0.5 h-4 w-4 shrink-0 text-[#2C1F14]" />
            <p className="text-xs leading-relaxed text-neutral-600 sm:max-w-[340px]">
              We'll open WhatsApp with your details pre-filled. Our team will confirm your
              showroom visit there.
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
