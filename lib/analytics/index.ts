import { resolvePosthogSettings } from "@/lib/config";
import { sanitizeAnalyticsProps } from "@/lib/analytics/client";

export { trackClientEvent } from "@/lib/analytics/client";

type AnalyticsProps = Record<string, string | number | boolean | null | undefined>;

/**
 * Server-side analytics. No-op unless PostHog key (Settings hoặc env).
 * Không gửi phone, email hay mô tả dự án.
 */
export async function trackServerEvent(
  event: string,
  props?: AnalyticsProps,
) {
  const posthog = await resolvePosthogSettings();
  if (!posthog) return;

  const host = posthog.host.replace(/\/$/, "");

  try {
    await fetch(`${host}/capture/`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        api_key: posthog.key,
        event,
        distinct_id: "server",
        properties: sanitizeAnalyticsProps(props),
      }),
      signal: AbortSignal.timeout(3000),
    });
  } catch (error) {
    console.error("[analytics] track failed", event, error);
  }
}
