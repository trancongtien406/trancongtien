export const REF_COOKIE = "tct_ref";
export const REF_CODE_RE = /^[A-Z0-9_-]{3,32}$/;

export function normalizeReferralCode(value: string | null | undefined) {
  return (value || "").trim().toUpperCase();
}

export function isValidReferralFormat(code: string) {
  return REF_CODE_RE.test(code);
}
