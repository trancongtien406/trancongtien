import { Prisma } from "@/lib/generated/prisma/client";
import { prisma } from "@/lib/db";
import { computeCommissionAmount } from "@/lib/commercial/money";

export { computeCommissionAmount } from "@/lib/commercial/money";

export function decimal(value: number | string) {
  return new Prisma.Decimal(value);
}

export async function createProposal(input: {
  leadId: string;
  title: string;
  amount: number;
  currency?: string;
  content?: Record<string, unknown>;
  actorId?: string;
}) {
  const lead = await prisma.lead.findUnique({ where: { id: input.leadId } });
  if (!lead) throw new Error("NOT_FOUND");

  const latest = await prisma.proposal.findFirst({
    where: { leadId: input.leadId },
    orderBy: { version: "desc" },
  });

  return prisma.$transaction(async (tx) => {
    const proposal = await tx.proposal.create({
      data: {
        leadId: input.leadId,
        title: input.title,
        version: (latest?.version || 0) + 1,
        amount: decimal(input.amount),
        currency: input.currency || "VND",
        content: JSON.stringify(input.content || {}),
        status: "DRAFT",
      },
    });
    await tx.leadActivity.create({
      data: {
        leadId: input.leadId,
        actorId: input.actorId,
        type: "PROPOSAL",
        title: `Tạo đề xuất v${proposal.version}`,
        body: input.title,
        meta: JSON.stringify({ proposalId: proposal.id, amount: input.amount }),
      },
    });
    await tx.lead.update({
      where: { id: input.leadId },
      data: { status: "PROPOSAL", estimatedValue: decimal(input.amount) },
    });
    return proposal;
  });
}

export async function markProposalSent(proposalId: string, actorId?: string) {
  const proposal = await prisma.proposal.findUnique({ where: { id: proposalId } });
  if (!proposal) throw new Error("NOT_FOUND");
  return prisma.$transaction(async (tx) => {
    const updated = await tx.proposal.update({
      where: { id: proposalId },
      data: { status: "SENT", sentAt: new Date() },
    });
    await tx.leadActivity.create({
      data: {
        leadId: proposal.leadId,
        actorId,
        type: "PROPOSAL",
        title: "Đã gửi đề xuất",
        meta: JSON.stringify({ proposalId }),
      },
    });
    return updated;
  });
}

/**
 * Ghi nhận thanh toán. Commission chỉ tạo khi status = RECEIVED và lead có partner.
 */
export async function recordPayment(input: {
  leadId: string;
  amount: number;
  currency?: string;
  reference?: string;
  note?: string;
  status?: "PENDING" | "RECEIVED" | "REFUNDED" | "CANCELLED";
  receivedAt?: string;
  actorId?: string;
}) {
  const lead = await prisma.lead.findUnique({
    where: { id: input.leadId },
    include: { partner: true },
  });
  if (!lead) throw new Error("NOT_FOUND");

  const status = input.status || "PENDING";
  const receivedAt =
    status === "RECEIVED"
      ? input.receivedAt
        ? new Date(input.receivedAt)
        : new Date()
      : null;

  return prisma.$transaction(async (tx) => {
    const payment = await tx.payment.create({
      data: {
        leadId: input.leadId,
        amount: decimal(input.amount),
        currency: input.currency || "VND",
        reference: input.reference || null,
        note: input.note || null,
        status,
        receivedAt,
      },
    });

    await tx.leadActivity.create({
      data: {
        leadId: input.leadId,
        actorId: input.actorId,
        type: "PAYMENT",
        title: `Thanh toán ${status === "RECEIVED" ? "đã nhận" : "ghi nhận"}`,
        body: input.note || input.reference || null,
        meta: JSON.stringify({
          paymentId: payment.id,
          amount: input.amount,
          status,
        }),
      },
    });

    if (status === "RECEIVED" && lead.partner) {
      const rate = Number(lead.partner.commissionRate);
      const commissionAmount = computeCommissionAmount(input.amount, rate);
      await tx.commission.create({
        data: {
          partnerId: lead.partner.id,
          paymentId: payment.id,
          rate: decimal(rate),
          amount: decimal(commissionAmount),
          status: "EARNED",
          earnedAt: receivedAt,
        },
      });
      await tx.leadActivity.create({
        data: {
          leadId: input.leadId,
          actorId: input.actorId,
          type: "COMMISSION",
          title: "Ghi nhận hoa hồng theo tiền đã nhận",
          body: `${commissionAmount} (${rate}%) cho ${lead.partner.code}`,
          meta: JSON.stringify({
            paymentId: payment.id,
            partnerId: lead.partner.id,
            amount: commissionAmount,
            rate,
          }),
        },
      });
    }

    return payment;
  });
}

async function createCommissionForReceivedPayment(
  tx: Prisma.TransactionClient,
  paymentId: string,
  leadId: string,
  amount: number,
  partner: { id: string; code: string; commissionRate: Prisma.Decimal },
  actorId?: string,
  earnedAt?: Date | null,
) {
  const existing = await tx.commission.findUnique({
    where: {
      partnerId_paymentId: { partnerId: partner.id, paymentId },
    },
  });
  if (existing) return existing;

  const rate = Number(partner.commissionRate);
  const commissionAmount = computeCommissionAmount(amount, rate);
  const commission = await tx.commission.create({
    data: {
      partnerId: partner.id,
      paymentId,
      rate: decimal(rate),
      amount: decimal(commissionAmount),
      status: "EARNED",
      earnedAt: earnedAt || new Date(),
    },
  });
  await tx.leadActivity.create({
    data: {
      leadId,
      actorId,
      type: "COMMISSION",
      title: "Ghi nhận hoa hồng theo tiền đã nhận",
      body: `${commissionAmount} (${rate}%) cho ${partner.code}`,
      meta: JSON.stringify({
        paymentId,
        partnerId: partner.id,
        amount: commissionAmount,
        rate,
      }),
    },
  });
  return commission;
}

/** Đánh dấu thanh toán đã nhận (PayOS webhook / thủ công) và tạo hoa hồng nếu có partner. */
export async function markPaymentReceived(input: {
  paymentId: string;
  reference?: string;
  actorId?: string;
}) {
  const payment = await prisma.payment.findUnique({
    where: { id: input.paymentId },
    include: { lead: { include: { partner: true } }, commissions: true },
  });
  if (!payment) throw new Error("NOT_FOUND");
  if (payment.status === "RECEIVED") return payment;

  const receivedAt = new Date();
  return prisma.$transaction(async (tx) => {
    const updated = await tx.payment.update({
      where: { id: payment.id },
      data: {
        status: "RECEIVED",
        receivedAt,
        reference: input.reference || payment.reference,
      },
    });
    await tx.leadActivity.create({
      data: {
        leadId: payment.leadId,
        actorId: input.actorId,
        type: "PAYMENT",
        title: "Thanh toán đã nhận",
        body: input.reference || payment.reference || null,
        meta: JSON.stringify({ paymentId: payment.id, provider: payment.provider }),
      },
    });
    if (payment.lead.partner) {
      await createCommissionForReceivedPayment(
        tx,
        payment.id,
        payment.leadId,
        Number(payment.amount),
        payment.lead.partner,
        input.actorId,
        receivedAt,
      );
    }
    return updated;
  });
}

export async function createPayosCheckout(input: {
  leadId: string;
  amount: number;
  note?: string;
  actorId?: string;
  origin: string;
}) {
  const { createPayosPaymentLink, isPayosConfigured } = await import(
    "@/lib/payments/payos"
  );
  if (!(await isPayosConfigured())) throw new Error("PAYOS_NOT_CONFIGURED");

  const lead = await prisma.lead.findUnique({ where: { id: input.leadId } });
  if (!lead) throw new Error("NOT_FOUND");

  const orderCode = Number(`${Date.now() % 1_000_000_000}${Math.floor(Math.random() * 90 + 10)}`);
  const origin = input.origin.replace(/\/$/, "");
  const returnUrl = `${origin}/thanh-toan/ket-qua`;
  const cancelUrl = `${origin}/thanh-toan/huy`;

  const payment = await prisma.payment.create({
    data: {
      leadId: input.leadId,
      amount: decimal(input.amount),
      status: "PENDING",
      provider: "PAYOS",
      providerOrderCode: BigInt(orderCode),
      note: input.note || null,
      reference: `PAYOS-${orderCode}`,
    },
  });

  try {
    const link = await createPayosPaymentLink({
      orderCode,
      amount: Math.round(input.amount),
      description: lead.leadNumber.slice(0, 25),
      returnUrl,
      cancelUrl,
      buyerName: lead.name,
      buyerEmail: lead.email,
      buyerPhone: lead.phone || undefined,
    });

    const updated = await prisma.payment.update({
      where: { id: payment.id },
      data: {
        providerLinkId: link.paymentLinkId,
        checkoutUrl: link.checkoutUrl,
      },
    });

    await prisma.leadActivity.create({
      data: {
        leadId: input.leadId,
        actorId: input.actorId,
        type: "PAYMENT",
        title: "Tạo link thanh toán PayOS",
        body: link.checkoutUrl,
        meta: JSON.stringify({
          paymentId: payment.id,
          orderCode,
          paymentLinkId: link.paymentLinkId,
        }),
      },
    });

    return updated;
  } catch (error) {
    await prisma.payment.update({
      where: { id: payment.id },
      data: { status: "CANCELLED", note: "Tạo link PayOS thất bại" },
    });
    throw error;
  }
}

export async function markCommissionPaid(commissionId: string, actorId?: string) {
  const commission = await prisma.commission.findUnique({
    where: { id: commissionId },
    include: { payment: true },
  });
  if (!commission) throw new Error("NOT_FOUND");
  return prisma.$transaction(async (tx) => {
    const updated = await tx.commission.update({
      where: { id: commissionId },
      data: { status: "PAID", paidAt: new Date() },
    });
    await tx.leadActivity.create({
      data: {
        leadId: commission.payment.leadId,
        actorId,
        type: "COMMISSION",
        title: "Đã thanh toán hoa hồng",
        meta: JSON.stringify({ commissionId }),
      },
    });
    return updated;
  });
}
