type AnalyticsProps = Record<string, string | number | boolean | null | undefined>;

const SENSITIVE_KEYS = new Set([
  "email",
  "phone",
  "message",
  "description",
  "name",
  "company",
]);

export function sanitizeAnalyticsProps(props?: AnalyticsProps) {
  if (!props) return {};
  const clean: Record<string, string | number | boolean> = {};
  for (const [key, value] of Object.entries(props)) {
    if (SENSITIVE_KEYS.has(key) || value == null) continue;
    clean[key] = value;
  }
  return clean;
}

/** Client-safe analytics (không import Prisma/config). */
export function trackClientEvent(event: string, props?: AnalyticsProps) {
  if (typeof window === "undefined") return;
  const detail = { event, props: sanitizeAnalyticsProps(props) };
  window.dispatchEvent(new CustomEvent("tct:analytics", { detail }));
  if (process.env.NODE_ENV === "development") {
    console.debug("[analytics]", detail);
  }
}
