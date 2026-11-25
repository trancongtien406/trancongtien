import { NextResponse } from "next/server";
import { z } from "zod";
import { createConsultationLead, findDuplicateLeads } from "@/lib/leads";
import { requirePartner } from "@/lib/partners/auth";
import { prisma } from "@/lib/db";
import {
  formatPhoneForStorage,
  isValidEmail,
  isValidVnPhone,
} from "@/lib/validation";

export const dynamic = "force-dynamic";

const schema = z.object({
  name: z.string().trim().min(2),
  company: z.string().trim().max(160).optional(),
  email: z.string().trim().refine(isValidEmail),
  phone: z.string().trim().refine(isValidVnPhone),
  industry: z.string().trim().max(120).optional(),
  projectType: z.string().trim().max(120).optional(),
  message: z.string().trim().min(5),
  budget: z.string().optional(),
  timeline: z.string().optional(),
});

export async function GET() {
  try {
    const partner = await requirePartner();
    const [leads, commissions] = await Promise.all([
      prisma.lead.findMany({
        where: { partnerId: partner.id },
        orderBy: { createdAt: "desc" },
        take: 50,
        select: {
          id: true,
          leadNumber: true,
          name: true,
          company: true,
          status: true,
          industry: true,
          projectType: true,
          createdAt: true,
          nextFollowUpAt: true,
          scoreBand: true,
          leadScore: true,
          estimatedBudget: true,
          source: true,
          estimateSession: {
            select: {
              publicId: true,
              shareCode: true,
              currentVersion: true,
              versions: {
                orderBy: { version: "desc" },
                take: 1,
                select: { minAmount: true, maxAmount: true },
              },
            },
          },
        },
      }),
      prisma.commission.findMany({
        where: { partnerId: partner.id },
        orderBy: { createdAt: "desc" },
        take: 30,
        select: {
          id: true,
          amount: true,
          rate: true,
          status: true,
          earnedAt: true,
          paidAt: true,
        },
      }),
    ]);

    return NextResponse.json({
      partner: {
        code: partner.code,
        name: partner.name,
        type: partner.type,
        commissionRate: Number(partner.commissionRate),
        ownershipDays: partner.ownershipDays,
      },
      leads: leads.map((lead) => ({
        ...lead,
        createdAt: lead.createdAt.toISOString(),
        nextFollowUpAt: lead.nextFollowUpAt?.toISOString() || null,
        estimateRange: lead.estimateSession?.versions[0]
          ? {
              min: Number(lead.estimateSession.versions[0].minAmount),
              max: Number(lead.estimateSession.versions[0].maxAmount),
              shareCode: lead.estimateSession.shareCode,
              publicId: lead.estimateSession.publicId,
            }
          : null,
      })),
      commissions: commissions.map((item) => ({
        id: item.id,
        amount: Number(item.amount),
        rate: Number(item.rate),
        status: item.status,
        earnedAt: item.earnedAt?.toISOString() || null,
        paidAt: item.paidAt?.toISOString() || null,
      })),
    });
  } catch {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
}

export async function POST(request: Request) {
  try {
    const partner = await requirePartner();
    const parsed = schema.safeParse(await request.json());
    if (!parsed.success) {
      return NextResponse.json(
        { error: parsed.error.issues[0]?.message || "Dữ liệu không hợp lệ" },
        { status: 400 },
      );
    }

    const data = {
      ...parsed.data,
      email: parsed.data.email.toLowerCase(),
      phone: formatPhoneForStorage(parsed.data.phone),
      landingPath: "/doi-tac",
      utmSource: "partner_portal",
    };

    const duplicates = await findDuplicateLeads(data.email, data.phone);
    const lead = await createConsultationLead(data, partner);

    if (duplicates.length > 0) {
      await prisma.leadActivity.create({
        data: {
          leadId: lead.id,
          type: "SYSTEM",
          title: "Cảnh báo trùng từ cổng đối tác",
          body: duplicates.map((d) => d.leadNumber).join(", "),
        },
      });
    }

    return NextResponse.json({
      ok: true,
      leadNumber: lead.leadNumber,
      duplicateWarning: duplicates.length > 0,
    });
  } catch (error) {
    const unauthorized =
      error instanceof Error && error.message === "UNAUTHORIZED";
    return NextResponse.json(
      { error: unauthorized ? "Unauthorized" : "Không thể tạo lead" },
      { status: unauthorized ? 401 : 500 },
    );
  }
}
