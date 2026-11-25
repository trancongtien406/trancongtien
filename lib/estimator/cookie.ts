export function parseEstCookie(raw?: string | null) {
  if (!raw) return null;
  const [publicId, token] = raw.split(".");
  if (!publicId || !token) return null;
  return { publicId, token };
}
