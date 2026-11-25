import { prisma } from "@/lib/db";

export type PayosSettings = {
  clientId: string;
  apiKey: string;
  checksumKey: string;
};

export type SmtpSettings = {
  host: string;
  port: number;
  secure: boolean;
  user?: string;
  pass?: string;
  from?: string;
};

export type R2Settings = {
  accountId: string;
  accessKeyId: string;
  secretAccessKey: string;
  bucket: string;
  publicUrl: string;
};

function pick(dbValue: string | null | undefined, envValue: string | undefined) {
  const fromDb = dbValue?.trim();
  if (fromDb) return fromDb;
  return envValue?.trim() || "";
}

async function loadSetting() {
  try {
    return await prisma.siteSetting.findUnique({ where: { id: "default" } });
  } catch {
    return null;
  }
}

/** PayOS: Settings trước, env sau. */
export async function resolvePayosSettings(): Promise<PayosSettings | null> {
  const s = await loadSetting();
  const clientId = pick(s?.payosClientId, process.env.PAYOS_CLIENT_ID);
  const apiKey = pick(s?.payosApiKey, process.env.PAYOS_API_KEY);
  const checksumKey = pick(s?.payosChecksumKey, process.env.PAYOS_CHECKSUM_KEY);
  if (!clientId || !apiKey || !checksumKey) return null;
  return { clientId, apiKey, checksumKey };
}

export async function resolveSmtpSettings(): Promise<SmtpSettings | null> {
  const s = await loadSetting();
  const host = pick(s?.smtpHost, process.env.SMTP_HOST);
  if (!host) return null;
  const port = Number(
    pick(s?.smtpPort, process.env.SMTP_PORT) || "587",
  );
  const secure =
    s?.smtpSecure === true ||
    process.env.SMTP_SECURE === "true" ||
    port === 465;
  return {
    host,
    port,
    secure,
    user: pick(s?.smtpUser, process.env.SMTP_USER) || undefined,
    pass: pick(s?.smtpPass, process.env.SMTP_PASS) || undefined,
    from:
      pick(s?.smtpFrom, process.env.SMTP_FROM) ||
      pick(s?.smtpUser, process.env.SMTP_USER) ||
      undefined,
  };
}

export async function resolveR2Settings(): Promise<R2Settings | null> {
  const s = await loadSetting();
  const accountId = pick(s?.r2AccountId, process.env.R2_ACCOUNT_ID);
  const accessKeyId = pick(s?.r2AccessKeyId, process.env.R2_ACCESS_KEY_ID);
  const secretAccessKey = pick(
    s?.r2SecretAccessKey,
    process.env.R2_SECRET_ACCESS_KEY,
  );
  const bucket = pick(s?.r2Bucket, process.env.R2_BUCKET);
  const publicUrl = pick(s?.r2PublicUrl, process.env.R2_PUBLIC_URL).replace(
    /\/$/,
    "",
  );
  if (!accountId || !accessKeyId || !secretAccessKey || !bucket || !publicUrl) {
    return null;
  }
  return { accountId, accessKeyId, secretAccessKey, bucket, publicUrl };
}

export async function resolvePosthogSettings() {
  const s = await loadSetting();
  const key = pick(s?.posthogKey, process.env.POSTHOG_KEY);
  if (!key) return null;
  return {
    key,
    host:
      pick(s?.posthogHost, process.env.POSTHOG_HOST) ||
      "https://us.i.posthog.com",
  };
}

export async function isPayosConfiguredAsync() {
  return Boolean(await resolvePayosSettings());
}

export async function isR2ConfiguredAsync() {
  return Boolean(await resolveR2Settings());
}
