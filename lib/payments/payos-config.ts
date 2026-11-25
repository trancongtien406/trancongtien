import { resolvePayosSettings, type PayosSettings } from "@/lib/config";

export type PayosConfig = PayosSettings;

export async function getPayosConfig(): Promise<PayosConfig | null> {
  return resolvePayosSettings();
}

export async function isPayosConfigured() {
  return Boolean(await resolvePayosSettings());
}
