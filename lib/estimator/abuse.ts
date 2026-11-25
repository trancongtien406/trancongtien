import { createHash } from "crypto";

export const ABUSE_LIMITS = {
  sessionCreatePerIpDay: 8,
  llmPerIpHour: 6,
  llmPerIpDay: 15,
  answersPerSessionHour: 80,
} as const;

const DAY_MS = 24 * 60 * 60 * 1000;
const HOUR_MS = 60 * 60 * 1000;

const buckets = new Map<string, number[]>();

export function getClientIp(request: Request) {
  const forwarded = request.headers.get("x-forwarded-for");
  if (forwarded) {
    const first = forwarded.split(",")[0]?.trim();
    if (first) return first;
  }
  return request.headers.get("x-real-ip")?.trim() || "unknown";
}

export function hashClientIp(ip: string) {
  return createHash("sha256").update(ip).digest("hex").slice(0, 16);
}

export function consumeRateLimit(
  key: string,
  limit: number,
  windowMs: number,
  now = Date.now(),
) {
  const cutoff = now - windowMs;
  const prev = (buckets.get(key) || []).filter((ts) => ts > cutoff);
  if (prev.length >= limit) {
    buckets.set(key, prev);
    const oldest = prev[0] ?? now;
    return {
      ok: false as const,
      remaining: 0,
      retryAfterSec: Math.max(1, Math.ceil((oldest + windowMs - now) / 1000)),
    };
  }
  prev.push(now);
  buckets.set(key, prev);
  return {
    ok: true as const,
    remaining: limit - prev.length,
    retryAfterSec: 0,
  };
}

export function limitSessionCreate(ip: string) {
  return consumeRateLimit(
    `session:${hashClientIp(ip)}`,
    ABUSE_LIMITS.sessionCreatePerIpDay,
    DAY_MS,
  );
}

export function limitLlmCall(ip: string) {
  const hour = consumeRateLimit(
    `llm-h:${hashClientIp(ip)}`,
    ABUSE_LIMITS.llmPerIpHour,
    HOUR_MS,
  );
  if (!hour.ok) return hour;
  return consumeRateLimit(
    `llm-d:${hashClientIp(ip)}`,
    ABUSE_LIMITS.llmPerIpDay,
    DAY_MS,
  );
}

export function limitAnswers(publicId: string) {
  return consumeRateLimit(
    `ans:${publicId}`,
    ABUSE_LIMITS.answersPerSessionHour,
    HOUR_MS,
  );
}

/** Test helper — clears in-memory windows. */
export function resetAbuseWindows() {
  buckets.clear();
}
