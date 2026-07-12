/**
 * Shared WhatsApp utility.
 *
 * Single source of truth for generating WhatsApp chat URLs and opening
 * WhatsApp conversations. This module is intentionally generic — it has
 * no knowledge of catalogue visits, store visits, products, custom
 * projects, or any other domain concept. Callers are responsible for
 * composing their own message text and passing it in.
 */

/**
 * The WhatsApp phone number used for all outgoing chat links.
 * Must be in international format, digits only (no "+", spaces, or dashes).
 *
 * This is the ONLY place the number should be defined. Update it here
 * and every consumer of this utility will pick up the change.
 */
export const WHATSAPP_NUMBER = "919830173898";

/**
 * Safely encodes a message for use in a WhatsApp URL.
 *
 * @param message - The raw, human-readable message text.
 * @returns The URL-encoded message, safe to embed in a WhatsApp link.
 */
export function encodeWhatsAppMessage(message: string): string {
  return encodeURIComponent(message ?? "");
}

/**
 * Builds a complete WhatsApp chat URL for the configured WHATSAPP_NUMBER.
 *
 * @param message - The raw message text to pre-fill in the chat.
 * @returns A fully-formed https://wa.me URL with the message encoded.
 */
export function buildWhatsAppUrl(message: string): string {
  const encodedMessage = encodeWhatsAppMessage(message);
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodedMessage}`;
}

/**
 * Opens a WhatsApp conversation in a new browser tab with the given
 * message pre-filled.
 *
 * @param message - The raw message text to pre-fill in the chat.
 */
export function openWhatsApp(message: string): void {
  const url = buildWhatsAppUrl(message);
  window.open(url, "_blank", "noopener,noreferrer");
}
