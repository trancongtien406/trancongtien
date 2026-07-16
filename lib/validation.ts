const EMAIL_RE =
  /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)+$/;

/** Vietnamese mobile: 03/05/07/08/09… or +84 / 84. */
const VN_MOBILE_RE = /^(?:\+?84|0)(?:3[2-9]|5[25689]|7[06-9]|8[1-9]|9\d)\d{7}$/;

export function isValidEmail(email: string): boolean {
  const value = email.trim();
  if (!value || value.length > 254) return false;
  return EMAIL_RE.test(value);
}

export function normalizePhone(phone: string): string {
  return phone.replace(/[\s.\-()]/g, "").trim();
}

export function isValidVnPhone(phone: string): boolean {
  const normalized = normalizePhone(phone);
  if (!normalized) return false;
  return VN_MOBILE_RE.test(normalized);
}

export function formatPhoneForStorage(phone: string): string {
  const normalized = normalizePhone(phone);
  if (normalized.startsWith("+84")) return `0${normalized.slice(3)}`;
  if (normalized.startsWith("84")) return `0${normalized.slice(2)}`;
  return normalized;
}
