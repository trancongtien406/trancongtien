import { NextResponse } from "next/server";
import { markPaymentReceived } from "@/lib/commercial";
import { prisma } from "@/lib/db";
import {
  getPayosConfig,
  verifyPayosWebhookSignature,
} from "@/lib/payments/payos";

export const dynamic = "force-dynamic";

type PayosWebhookBody = {
  code?: string;
  desc?: string;
  success?: boolean;
  data?: Record<string, unknown>;
  signature?: string;
};

export async function POST(request: Request) {
  let body: PayosWebhookBody;
  try {
    body = (await request.json()) as PayosWebhookBody;
  } catch {
    return NextResponse.json({ error: "Payload không hợp lệ" }, { status: 400 });
  }

  const config = await getPayosConfig();
  if (!config) {
    // PayOS confirm webhook URL yêu cầu HTTP 2xx. Chưa có key thì vẫn ack
    // để đăng ký URL được — không xử lý thanh toán thật.
    return NextResponse.json({ ok: true, configured: false });
  }

  if (!body.data || !body.signature) {
    return NextResponse.json({ error: "Payload không hợp lệ" }, { status: 400 });
  }

  const valid = verifyPayosWebhookSignature(
    config.checksumKey,
    body.data,
    body.signature,
  );
  if (!valid) {
    return NextResponse.json({ error: "Chữ ký không hợp lệ" }, { status: 400 });
  }

  // payOS gửi payload mẫu khi confirm webhook — bỏ qua nếu không có order thật
  const orderCode = Number(body.data.orderCode);
  if (!Number.isFinite(orderCode) || orderCode <= 0) {
    return NextResponse.json({ ok: true });
  }

  const payment = await prisma.payment.findFirst({
    where: { provider: "PAYOS", providerOrderCode: BigInt(orderCode) },
  });
  if (!payment) {
    return NextResponse.json({ ok: true, ignored: true });
  }

  const code = String(body.code || "");
  if (code === "00" || body.success === true) {
    await markPaymentReceived({
      paymentId: payment.id,
      reference: String(body.data.reference || payment.reference || ""),
    });
  }

  return NextResponse.json({ ok: true });
}
