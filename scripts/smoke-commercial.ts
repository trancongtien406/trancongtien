/**
 * Smoke test vận hành thật trên Postgres local:
 * tạo lead → đề xuất → thanh toán RECEIVED → hoa hồng.
 */
import "dotenv/config";
import { PrismaPg } from "@prisma/adapter-pg";
import { PrismaClient } from "../lib/generated/prisma/client";
import { createConsultationLead } from "../lib/leads";
import { createProposal, recordPayment } from "../lib/commercial";
import { resolveApprovedPartner } from "../lib/partners";

if (!process.env.DATABASE_URL) throw new Error("DATABASE_URL required");

const adapter = new PrismaPg({ connectionString: process.env.DATABASE_URL });
const prisma = new PrismaClient({ adapter });

async function main() {
  const partner = await resolveApprovedPartner("CTV001");
  if (!partner) throw new Error("Thiếu partner CTV001 — chạy npm run seed trước");

  const stamp = Date.now();
  const lead = await createConsultationLead(
    {
      name: "Khách smoke test",
      email: `smoke.${stamp}@example.com`,
      phone: "0382802406",
      industry: "Spa & Beauty",
      projectType: "Website",
      message: "Smoke test tạo lead từ script",
      budget: "50 – 100 triệu",
      timeline: "1–2 tháng",
      landingPath: "/solutions/spa?ref=CTV001",
    },
    partner,
  );

  const proposal = await createProposal({
    leadId: lead.id,
    title: "Đề xuất smoke test",
    amount: 50_000_000,
  });

  const payment = await recordPayment({
    leadId: lead.id,
    amount: 15_000_000,
    status: "RECEIVED",
    reference: `SMOKE-${stamp}`,
  });

  const commission = await prisma.commission.findFirst({
    where: { paymentId: payment.id, partnerId: partner.id },
  });

  if (!commission) throw new Error("Không tạo được hoa hồng sau thanh toán");
  if (Number(commission.amount) !== 1_500_000) {
    throw new Error(`Hoa hồng sai: ${commission.amount}`);
  }

  console.log(
    JSON.stringify(
      {
        ok: true,
        leadNumber: lead.leadNumber,
        proposalId: proposal.id,
        paymentId: payment.id,
        commissionAmount: Number(commission.amount),
      },
      null,
      2,
    ),
  );
}

main()
  .catch((error) => {
    console.error(error);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
