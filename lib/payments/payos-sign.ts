import { createHmac, timingSafeEqual } from "crypto";

/** Chữ ký tạo link: amount, cancelUrl, description, orderCode, returnUrl (alphabet). */
export function signPayosPaymentRequest(
  checksumKey: string,
  data: {
    amount: number;
    cancelUrl: string;
    description: string;
    orderCode: number;
    returnUrl: string;
  },
) {
  const raw = `amount=${data.amount}&cancelUrl=${data.cancelUrl}&description=${data.description}&orderCode=${data.orderCode}&returnUrl=${data.returnUrl}`;
  return createHmac("sha256", checksumKey).update(raw).digest("hex");
}

function sortObject(obj: Record<string, unknown>): Record<string, unknown> {
  return Object.keys(obj)
    .sort()
    .reduce<Record<string, unknown>>((acc, key) => {
      const value = obj[key];
      if (value && typeof value === "object" && !Array.isArray(value)) {
        acc[key] = sortObject(value as Record<string, unknown>);
      } else {
        acc[key] = value;
      }
      return acc;
    }, {});
}

/** Verify webhook signature theo docs payOS. */
export function verifyPayosWebhookSignature(
  checksumKey: string,
  data: Record<string, unknown>,
  signature: string,
) {
  const sorted = sortObject(data);
  const query = Object.entries(sorted)
    .map(([key, value]) => {
      if (value === null || value === undefined) return `${key}=`;
      if (typeof value === "object") return `${key}=${JSON.stringify(value)}`;
      return `${key}=${value}`;
    })
    .join("&");
  const expected = createHmac("sha256", checksumKey).update(query).digest("hex");
  try {
    const a = Buffer.from(expected);
    const b = Buffer.from(signature);
    return a.length === b.length && timingSafeEqual(a, b);
  } catch {
    return false;
  }
}
