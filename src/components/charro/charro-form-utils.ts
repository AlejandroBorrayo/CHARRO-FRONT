export const WHATSAPP_DIGITS = 10;
export const MIN_PASSWORD_LENGTH = 8;

export function normalizeWhatsApp(value: string): string {
  return value.replace(/\D/g, "");
}

export function isValidWhatsApp(value: string): boolean {
  return new RegExp(`^\\d{${WHATSAPP_DIGITS}}$`).test(normalizeWhatsApp(value));
}

export function isValidEmail(value: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value.trim());
}

export function isValidGender(value: string): value is "f" | "m" {
  return value === "f" || value === "m";
}
