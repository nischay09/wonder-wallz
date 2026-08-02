"use client";

/**
 * ValidationRequiredModal
 * ────────────────────────────────────────────────────────────────────────
 * A single, reusable modal shown when a user tries to submit a form
 * (Custom Project Builder, Home Visit Booking, Showroom Visit Booking,
 * Shopping Cart Checkout, …) while required fields are still missing.
 *
 * This component is intentionally "dumb": it has no knowledge of any
 * specific form's fields or validation rules. It only:
 *   - renders the "Almost there!" message,
 *   - lets the caller decide what "Review My Details" should do
 *     (via onReviewDetails), and
 *   - lets the caller decide what "Continue Editing" should do
 *     (via onContinueEditing, defaults to just closing).
 *
 * IMPORTANT: this modal is ONLY for client-side "required fields missing"
 * validation. It must NOT be used for API failures, server errors, or
 * network issues — those already have their own error UI in each form
 * (see the `status === 'error'` block in ProjectBuilder, for example).
 *
 * Usage pattern in a form:
 *
 *   const [showValidationModal, setShowValidationModal] = useState(false);
 *
 *   function handleSubmit() {
 *     const { valid, errors } = validate(...);
 *     setErrors(errors);
 *     if (!valid) {
 *       setShowValidationModal(true);
 *       return; // preserves all entered data — nothing is reset
 *     }
 *     // ...proceed with submission
 *   }
 *
 *   <ValidationRequiredModal
 *     open={showValidationModal}
 *     onOpenChange={setShowValidationModal}
 *     onReviewDetails={() => scrollToAndFocusFirstError(errors, FIELD_ORDER, getFieldElementId)}
 *   />
 */

import { AlertTriangle } from "lucide-react";

import { Button } from "@/components/ui/Button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { cn } from "@/lib/utils";

export interface ValidationRequiredModalProps {
  /** Controls dialog visibility. Fully controlled — no internal open state. */
  open: boolean;
  /** Called when the dialog requests to change open state (e.g. backdrop click, Esc). */
  onOpenChange: (open: boolean) => void;
  /**
   * Called when the user clicks "Review My Details".
   * The modal closes itself; this callback should handle scrolling to
   * and focusing the first invalid field. See `scrollToAndFocusFirstError`
   * in `@/lib/validationScroll` for a ready-made helper.
   */
  onReviewDetails: () => void;
  /**
   * Called when the user clicks "Continue Editing".
   * Defaults to simply closing the modal (no scrolling/focusing).
   */
  onContinueEditing?: () => void;
  /** Override the default title. Defaults to "Almost there!". */
  title?: string;
  /** Override the default description. */
  description?: string;
}

export function ValidationRequiredModal({
  open,
  onOpenChange,
  onReviewDetails,
  onContinueEditing,
  title = "Almost there!",
  description = "Please complete the required information before submitting your request.",
}: ValidationRequiredModalProps) {
  function handleReviewDetails() {
    onOpenChange(false);
    // Give the dialog's own close/unmount a beat before we scroll, so we're
    // not fighting the dialog's exit animation / focus trap teardown.
    window.setTimeout(() => {
      onReviewDetails();
    }, 50);
  }

  function handleContinueEditing() {
    onOpenChange(false);
    onContinueEditing?.();
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent
        className={cn(
          // z-[100]: this modal can be triggered from inside another
          // already-open overlay (e.g. CustomerInfoModal inside
          // ProjectCartDrawer, which stacks up to z-70). Elevated here so
          // it's never accidentally hidden behind a nested form it's
          // validating.
          "z-[100] max-w-[440px] overflow-hidden bg-[#FBF8F3] p-0",
          // The close (×) icon inherits its color from the underlying
          // Dialog primitive, which can default to something too light
          // to read against this modal's cream background — force it
          // explicitly (and at full opacity) rather than relying on
          // inheritance, so it's visible no matter what the primitive
          // ships with by default.
          "[&_[data-slot=dialog-close]]:!text-[#2C1F14]",
          "[&_[data-slot=dialog-close]]:!opacity-100",
          "[&_[data-slot=dialog-close]_svg]:!text-[#2C1F14]",
          "[&_[data-slot=dialog-close]]:hover:!bg-[#EFE4D0]",
          "[&_[data-slot=dialog-close]]:hover:!text-[#2C1F14]"
        )}
      >
        <div className="px-6 pt-8 pb-6 sm:px-8 sm:pt-9">
          <DialogHeader>
            <div className="flex h-11 w-11 items-center justify-center rounded-full bg-[#F3E9CF]">
              <AlertTriangle className="h-5 w-5 text-[#8A6D2E]" strokeWidth={2} />
            </div>
            <DialogTitle className="mt-4 text-[22px] leading-tight font-semibold text-[#2C1F14] sm:text-2xl">
              {title}
            </DialogTitle>
            <DialogDescription className="mt-2 text-sm leading-relaxed text-neutral-600">
              {description}
            </DialogDescription>
          </DialogHeader>
        </div>

        {/*
          Uses CSS grid auto-fit instead of a `sm:` breakpoint. `sm:` keys
          off the browser *viewport* width, which can be much wider than
          this modal actually renders (e.g. previewed in a narrow pane or
          embedded frame) — causing the two buttons to force into a single
          cramped row with buttons flush to the edges. auto-fit measures
          this footer's own box, so it reflows to two comfortable columns
          when there's room and stacks full-width when there isn't.
        */}
        <div className="grid grid-cols-[repeat(auto-fit,minmax(160px,1fr))] gap-3 border-t border-neutral-200 bg-white px-6 py-5 sm:px-8">
          <Button
            type="button"
            variant="ghost"
            className="h-11 w-full rounded-lg text-[#2C1F14] hover:bg-[#F3E9CF]"
            onClick={handleContinueEditing}
          >
            Continue Editing
          </Button>
          <Button
            type="button"
            className="h-11 w-full rounded-lg px-5 text-white"
            style={{ background: "#2C1F14" }}
            onClick={handleReviewDetails}
          >
            Review My Details
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}

export default ValidationRequiredModal;
