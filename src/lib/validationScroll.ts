/**
 * validationScroll
 * ────────────────────────────────────────────────────────────────────────
 * Shared helper for the "Review My Details" action of ValidationRequiredModal.
 * Every form has a different errors shape and different element ids, so
 * this stays generic: give it an ordered list of field keys, an errors
 * object, and a way to map a field key -> DOM element id, and it will
 * smooth-scroll to and focus the first invalid field it finds.
 *
 * Ordering matters: `fieldOrder` should reflect the visual top-to-bottom
 * order of the fields in the form, so "first invalid field" really does
 * mean the first one the user will encounter while scrolling down.
 */

export interface ScrollToFirstErrorOptions {
  /** Smooth-scroll block alignment. Defaults to "center". */
  block?: ScrollLogicalPosition;
  /** Delay (ms) before focusing, to let the scroll animation start. Defaults to 350. */
  focusDelay?: number;
}

/**
 * Finds the first field (in `fieldOrder`) that has a truthy entry in
 * `errors`, scrolls its element into view, and focuses it.
 *
 * @param errors      Map of field key -> error message (or undefined).
 * @param fieldOrder  Field keys in the order they appear on the page.
 * @param getElementId Maps a field key to the id of its input/section element.
 */
export function scrollToAndFocusFirstError<TErrors extends object>(
  errors: TErrors,
  fieldOrder: (keyof TErrors & string)[],
  getElementId: (field: keyof TErrors & string) => string,
  options: ScrollToFirstErrorOptions = {}
): void {
  const { block = "center", focusDelay = 350 } = options;

  const firstInvalidField = fieldOrder.find((field) => Boolean(errors[field as keyof TErrors]));
  if (!firstInvalidField) return;

  const elementId = getElementId(firstInvalidField);
  const element = document.getElementById(elementId);
  if (!element) return;

  element.scrollIntoView({ behavior: "smooth", block });

  window.setTimeout(() => {
    // Elements like radio/chip groups (role="group" / role="radiogroup")
    // aren't natively focusable — make them focusable for this purpose
    // without altering normal tab order for anyone else.
    if (!(element instanceof HTMLElement)) return;
    const isNativelyFocusable =
      element instanceof HTMLInputElement ||
      element instanceof HTMLTextAreaElement ||
      element instanceof HTMLSelectElement ||
      element instanceof HTMLButtonElement;

    if (!isNativelyFocusable && !element.hasAttribute("tabindex")) {
      element.setAttribute("tabindex", "-1");
    }
    element.focus({ preventScroll: true });
  }, focusDelay);
}

/**
 * Finds the DOM id of the section/card that contains the first invalid
 * field, for forms (like ProjectBuilder) where required fields live inside
 * repeatable/dynamic sections and a single flat field->id map isn't enough.
 * Falls back gracefully if nothing is invalid.
 */
export function scrollToAndFocusElementById(
  elementId: string | undefined,
  options: ScrollToFirstErrorOptions = {}
): void {
  if (!elementId) return;
  const { block = "center", focusDelay = 350 } = options;

  const element = document.getElementById(elementId);
  if (!element) return;

  element.scrollIntoView({ behavior: "smooth", block });

  window.setTimeout(() => {
    if (!(element instanceof HTMLElement)) return;
    const isNativelyFocusable =
      element instanceof HTMLInputElement ||
      element instanceof HTMLTextAreaElement ||
      element instanceof HTMLSelectElement ||
      element instanceof HTMLButtonElement;

    if (!isNativelyFocusable && !element.hasAttribute("tabindex")) {
      element.setAttribute("tabindex", "-1");
    }
    element.focus({ preventScroll: true });
  }, focusDelay);
}
