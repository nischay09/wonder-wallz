'use client';

/**
 * ProjectBuilder — Iteration 4
 * Wonder Wallz premium project builder.
 * Full state management, image upload/preview, live project summary,
 * and email submission via the reusable emailService.
 *
 * Component tree:
 *   ProjectBuilder          ← state owner, section shell, layout, submission
 *     CustomerDetailsForm   ← name / phone / email / city
 *     ProjectRequestCard    ← one design request (product, material, images, dims, notes)
 *       ImageUploader       ← multi-image upload + preview + removal
 *     ProjectSummary        ← live breakdown by product type
 *
 * NOTE (this iteration): ProjectBuilder no longer reads the URL itself.
 * useSearchParams() forces any page importing this component into a
 * client-side-only render path (or requires wrapping in <Suspense>) which
 * broke static rendering for /custom-design. The deep-link params are now
 * read once on the server in app/custom-design/page.tsx and passed down as
 * plain props (`initialProduct` / `initialCanvasFinish`), which are used to
 * seed the very first request on mount. Everything else is unchanged from
 * the previous iteration.
 */

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from 'framer-motion';
import { Plus, CheckCircle2, AlertCircle, Loader2, MessageCircle } from 'lucide-react';
import ProjectRequestCard from './ProjectRequestCard';
import ProjectSummary from './ProjectSummary';
import CustomerDetailsForm from './CustomerDetailsForm';
import {
  makeRequest,
  cloneRequest,
  makeCustomerDetails,
  validateCustomerDetails,
  CANVAS_FINISH_OPTIONS,
  type ProjectRequest,
  type CustomerDetails,
  type CustomerDetailsErrors,
  type CanvasFinish,
} from '../../lib/types';
import { sendProjectEnquiry, getWhatsAppFallbackUrl } from '../../lib/emailService';
import { buildProjectEnquiryPayload } from '../../lib/projectEnquiryMapper';
import { ValidationRequiredModal } from '@/components/ui/ValidationRequiredModal';
import { scrollToAndFocusFirstError } from '@/lib/validationScroll';

/**
 * Order (top-to-bottom) of the required CustomerDetails fields, and how
 * each maps to its input's DOM id in CustomerDetailsForm. Used only to
 * drive "Review My Details" in the ValidationRequiredModal — the actual
 * validation logic still lives in validateCustomerDetails().
 */
const CUSTOMER_FIELD_ORDER: (keyof CustomerDetailsErrors)[] = ['name', 'phone', 'email'];
const CUSTOMER_FIELD_ELEMENT_IDS: Record<string, string> = {
  name: 'customer-name',
  phone: 'customer-phone',
  email: 'customer-email',
};

type SubmissionStatus = 'idle' | 'sending' | 'success' | 'error';

export interface ProjectBuilderProps {
  /**
   * Deep-link product hint from the Canvas Collection page's Finish Samples
   * (see CanvasLandingPage.tsx / buildProjectBuilderHref):
   * /custom-design?product=canvas-prints&canvasFinish=<CanvasFinish>#start-project
   *
   * Only 'canvas-prints' is recognised here — Wallpaper, Glass Film, and
   * Ready-made flows don't pass this param and are unaffected, and fall
   * through to the plain makeRequest() default exactly as before.
   */
  initialProduct?: string | null;
  /** Deep-link canvas finish hint, only used when initialProduct === 'canvas-prints'. */
  initialCanvasFinish?: string | null;
}

export default function ProjectBuilder({
  initialProduct = null,
  initialCanvasFinish = null,
}: ProjectBuilderProps) {
  // ── State ──────────────────────────────────────────────────────────────────

  const [requests, setRequests] = useState<ProjectRequest[]>([]);
  const [customer, setCustomer] = useState<CustomerDetails>(makeCustomerDetails());
  const [customerErrors, setCustomerErrors] = useState<CustomerDetailsErrors>({});
  const [status, setStatus] = useState<SubmissionStatus>('idle');
  const [errorMessage, setErrorMessage] = useState<string>('');
  // ValidationRequiredModal is shown ONLY for missing required fields —
  // never for the API/network failure path (that's `status === 'error'` above).
  const [showValidationModal, setShowValidationModal] = useState(false);

  useEffect(() => {
    if (initialProduct === 'canvas-prints') {
      const isValidFinish = (
        value: string | null
      ): value is CanvasFinish =>
        !!value && (CANVAS_FINISH_OPTIONS as string[]).includes(value);

      setRequests([
        makeRequest({
          product: 'Canvas Print',
          ...(isValidFinish(initialCanvasFinish)
            ? { canvasFinish: initialCanvasFinish }
            : {}),
        }),
      ]);
      return;
    }

    setRequests([makeRequest()]);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // ── Handlers ───────────────────────────────────────────────────────────────

  /** Merge a partial patch into the matching request. */
  function updateRequest(id: string, patch: Partial<ProjectRequest>) {
    setRequests((prev) =>
      prev.map((r) => (r.id === id ? { ...r, ...patch } : r))
    );
  }

  /** Insert a deep copy of the request immediately after the original. */
  function duplicateRequest(id: string) {
    setRequests((prev) => {
      const idx = prev.findIndex((r) => r.id === id);
      if (idx === -1) return prev;
      const clone = cloneRequest(prev[idx]);
      const next = [...prev];
      next.splice(idx + 1, 0, clone);
      return next;
    });
  }

  /** Remove a request — enforces minimum of one. */
  function removeRequest(id: string) {
    setRequests((prev) => (prev.length > 1 ? prev.filter((r) => r.id !== id) : prev));
  }

  /** Append a blank request at the end. */
  function addRequest() {
    setRequests((prev) => [...prev, makeRequest()]);
  }

  function updateCustomer(patch: Partial<CustomerDetails>) {
    setCustomer((prev) => ({ ...prev, ...patch }));
  }

  /** Validate, send via the email service, and only reset the form on success. */
  async function handleSubmit() {
    console.log('Reached');
    // Guard against duplicate submissions (e.g. rapid double-clicks) —
    // the button is also disabled while sending, but this makes the
    // protection explicit regardless of click timing.
    if (status === 'sending') return;

    const { valid, errors } = validateCustomerDetails(customer);
    setCustomerErrors(errors);
    if (!valid) {
      // Prevent submission, preserve all entered data, and surface the
      // ValidationRequiredModal instead of silently doing nothing.
      setShowValidationModal(true);
      return;
    }

    setStatus('sending');
    setErrorMessage('');

    const payload = buildProjectEnquiryPayload(customer, requests);
    const result = await sendProjectEnquiry(payload, requests);

    if (result.success) {
      setStatus('success');
      setRequests([makeRequest()]);
      setCustomer(makeCustomerDetails());
      setCustomerErrors({});
    } else {
      setStatus('error');
      setErrorMessage(result.error ?? 'Something went wrong while sending your enquiry.');
    }
  }

  /** "Review My Details" — scroll to and focus the first invalid customer field. */
  function handleReviewDetails() {
    scrollToAndFocusFirstError(
      customerErrors,
      CUSTOMER_FIELD_ORDER,
      (field) => CUSTOMER_FIELD_ELEMENT_IDS[field]
    );
  }

  // ── Render ─────────────────────────────────────────────────────────────────
  return (
    <section
      aria-labelledby="project-builder-heading"
      className="relative overflow-hidden bg-[#FAF6EE] py-16 lg:py-24"
    >
      {/* Subtle ambient gradient */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_80%_60%_at_50%_-10%,rgba(201,162,39,0.07),transparent)]"
      />

      <div className="relative z-10 mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
        {/* ── Section header ─────────────────────────────────────────────────── */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.55 }}
          className="mb-10 text-center"
        >
          <span className="inline-flex items-center gap-2 rounded-full border border-[#D9C28A]/60 bg-[#FBF3DF] px-4 py-1.5 text-xs font-semibold uppercase tracking-wider text-[#8A6D2E] mb-5">
            Upload your own designs
          </span>
          <h2
            id="project-builder-heading"
            className="font-serif text-4xl font-semibold leading-[1.1] text-[#2B2620] sm:text-5xl"
          >
            Bring Your{' '}
            <span className="bg-gradient-to-r from-[#C9A227] to-[#8A6D2E] bg-clip-text text-transparent">
              Vision to Life
            </span>
          </h2>
          <p className="mt-4 mx-auto max-w-lg text-base leading-relaxed text-[#6E6457]">
            Upload artwork, inspiration images or room photos and we'll prepare a customised
            quotation for your project.
          </p>
        </motion.div>

        {/* ── Customer details ───────────────────────────────────────────────── */}
        <CustomerDetailsForm
          customer={customer}
          errors={customerErrors}
          onUpdate={updateCustomer}
        />

        {/* ── Request cards ──────────────────────────────────────────────────── */}
        <div className="space-y-5">
          <AnimatePresence mode="popLayout" initial={false}>
            {requests.map((request, i) => (
              <ProjectRequestCard
                key={request.id}
                request={request}
                index={i}
                total={requests.length}
                onUpdate={(patch) => updateRequest(request.id, patch)}
                onDuplicate={() => duplicateRequest(request.id)}
                onRemove={() => removeRequest(request.id)}
              />
            ))}
          </AnimatePresence>
        </div>

        {/* ── Add request button ─────────────────────────────────────────────── */}
        <motion.div layout className="mt-4">
          <button
            type="button"
            onClick={addRequest}
            className="group flex w-full items-center justify-center gap-2.5 rounded-2xl border-2 border-dashed border-[#D9C28A]/70 bg-transparent py-4 text-sm font-semibold text-[#8A6D2E] transition-all duration-200 hover:border-[#C9A227] hover:bg-[#FBF3DF]/60"
          >
            <span className="flex h-6 w-6 items-center justify-center rounded-full bg-[#F3E9CF] transition-transform duration-200 group-hover:scale-110">
              <Plus className="h-3.5 w-3.5" strokeWidth={2.5} />
            </span>
            Add Another Design
          </button>
        </motion.div>

        {/* ── Project summary ────────────────────────────────────────────────── */}
        <div className="mt-8">
          <ProjectSummary requests={requests} />
        </div>

        {/* ── Submission ──────────────────────────────────────────────────────── */}
        <div className="mt-6">
          <button
            type="button"
            onClick={handleSubmit}
            disabled={status === 'sending'}
            className="flex w-full items-center justify-center gap-2 rounded-2xl bg-gradient-to-r from-[#C9A227] to-[#8A6D2E] py-4 text-sm font-semibold text-white shadow-[0_4px_20px_-4px_rgba(138,109,46,0.5)] transition-all duration-200 hover:shadow-[0_6px_24px_-4px_rgba(138,109,46,0.6)] disabled:cursor-not-allowed disabled:opacity-70"
          >
            {status === 'sending' && <Loader2 className="h-4 w-4 animate-spin" />}
            {status === 'sending' ? 'Sending Request...' : 'Submit Custom Design Request'}
          </button>

          {status === 'success' && (
            <motion.div
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              className="mt-4 rounded-2xl border border-green-200 bg-green-50 px-4 py-4 text-sm text-green-800"
            >
              <div className="flex items-start gap-2.5">
                <CheckCircle2 className="mt-0.5 h-4 w-4 flex-shrink-0" />
                <div className="space-y-1">
                  <p className="font-semibold">Project Request Submitted</p>
                  <p>Thank you for choosing Wonder Wallz.</p>
                  <p>
                    We will review your project and contact you shortly with a detailed
                    quotation.
                  </p>
                  <p>
                    If your project is urgent, you can also reach us directly on WhatsApp.
                  </p>
                </div>
              </div>
              <a
                href={getWhatsAppFallbackUrl()}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-3 inline-flex items-center gap-2 rounded-xl bg-green-600 px-3.5 py-2 text-xs font-semibold text-white transition-colors hover:bg-green-700"
              >
                <MessageCircle className="h-3.5 w-3.5" />
                Chat on WhatsApp
              </a>
            </motion.div>
          )}

          {status === 'error' && (
            <motion.div
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              className="mt-4 rounded-2xl border border-red-200 bg-red-50 px-4 py-3.5 text-sm text-red-800"
            >
              <div className="flex items-start gap-2.5">
                <AlertCircle className="mt-0.5 h-4 w-4 flex-shrink-0" />
                <span>
                  We couldn't send your enquiry right now. Please try again in a moment, or reach
                  us directly on WhatsApp and we'll take it from there.
                </span>
              </div>
              <a
                href={getWhatsAppFallbackUrl()}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-3 inline-flex items-center gap-2 rounded-xl bg-green-600 px-3.5 py-2 text-xs font-semibold text-white transition-colors hover:bg-green-700"
              >
                <MessageCircle className="h-3.5 w-3.5" />
                Continue on WhatsApp
              </a>
            </motion.div>
          )}
        </div>
      </div>

      {/* Shown only when required fields are missing — never for API/network errors */}
      <ValidationRequiredModal
        open={showValidationModal}
        onOpenChange={setShowValidationModal}
        onReviewDetails={handleReviewDetails}
      />
    </section>
  );
}
