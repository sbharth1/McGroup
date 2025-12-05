import { parsePhoneNumberFromString, AsYouType } from "libphonenumber-js";

export function normalizePhoneToE164(raw?: string, defaultCountry?: string): string | null {
  if (!raw) return null;
  const candidate = String(raw).trim();

  const phone = parsePhoneNumberFromString(candidate, defaultCountry as any);
  if (!phone) return null;
  if (!phone.isValid()) return null;
  return phone.number; 
}

export function isValidPhone(raw?: string, defaultCountry?: string): boolean {
  return normalizePhoneToE164(raw, defaultCountry) !== null;
}

export function formatPhoneLocal(raw?: string, defaultCountry?: string): string | null {
  if (!raw) return null;
  const phone = parsePhoneNumberFromString(String(raw), defaultCountry as any);
  if (!phone || !phone.isValid()) return null;
  return phone.formatNational();
}
