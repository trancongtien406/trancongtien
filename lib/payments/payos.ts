import {
  getPayosConfig,
  isPayosConfigured,
} from "@/lib/payments/payos-config";
import {
  signPayosPaymentRequest,
  verifyPayosWebhookSignature,
} from "@/lib/payments/payos-sign";

export {
  getPayosConfig,
  isPayosConfigured,
  signPayosPaymentRequest,
  verifyPayosWebhookSignature,
};

export type PayosLinkResult = {
  orderCode: number;
  paymentLinkId: string;
  checkoutUrl: string;
  qrCode?: string;
};

export async function createPayosPaymentLink(input: {
  orderCode: number;
  amount: number;
  description: string;
  returnUrl: string;
  cancelUrl: string;
  buyerName?: string;
  buyerEmail?: string;
  buyerPhone?: string;
}): Promise<PayosLinkResult> {
  const config = await getPayosConfig();
  if (!config) throw new Error("PAYOS_NOT_CONFIGURED");

  const description = input.description.slice(0, 25);
  const signature = signPayosPaymentRequest(config.checksumKey, {
    amount: input.amount,
    cancelUrl: input.cancelUrl,
    description,
    orderCode: input.orderCode,
    returnUrl: input.returnUrl,
  });

  const response = await fetch("https://api-merchant.payos.vn/v2/payment-requests", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "x-client-id": config.clientId,
      "x-api-key": config.apiKey,
    },
    body: JSON.stringify({
      orderCode: input.orderCode,
      amount: input.amount,
      description,
      returnUrl: input.returnUrl,
      cancelUrl: input.cancelUrl,
      buyerName: input.buyerName,
      buyerEmail: input.buyerEmail,
      buyerPhone: input.buyerPhone,
      signature,
    }),
    signal: AbortSignal.timeout(15_000),
  });

  const json = (await response.json()) as {
    code?: string;
    desc?: string;
    data?: {
      orderCode: number;
      paymentLinkId: string;
      checkoutUrl: string;
      qrCode?: string;
    };
  };

  if (!response.ok || json.code !== "00" || !json.data?.checkoutUrl) {
    throw new Error(json.desc || "Không tạo được link PayOS");
  }

  return {
    orderCode: json.data.orderCode,
    paymentLinkId: json.data.paymentLinkId,
    checkoutUrl: json.data.checkoutUrl,
    qrCode: json.data.qrCode,
  };
}
