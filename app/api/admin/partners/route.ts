import { revalidatePath } from "next/cache";
import { NextResponse } from "next/server";
import { z } from "zod";
import { requireAdmin } from "@/lib/auth";
import { prisma } from "@/lib/db";

const schema = z.object({
  id: z.string().optional(),
  code: z.string().trim().toUpperCase().regex(/^[A-Z0-9_-]{3,32}$/),
  name: z.string().trim().min(2).max(160),
  company: z.string().trim().max(160).optional(),
  email: z.email().trim().toLowerCase(),
  phone: z.string().trim().max(30).optional(),
  type: z.enum(["REFERRAL", "SALES", "AGENCY"]),
  status: z.enum(["APPLIED", "APPROVED", "SUSPENDED", "REJECTED"]),
  commissionRate: z.coerce.number().min(0).max(100),
  ownershipDays: z.coerce.number().int().min(1).max(365),
});

export async function POST(request: Request) {
  try {
    await requireAdmin();
    const parsed = schema.safeParse(await request.json());
    if (!parsed.success) return NextResponse.json({ error: parsed.error.issues[0]?.message }, { status: 400 });
    const { id, ...data } = parsed.data;
    const payload = { ...data, company: data.company || null, phone: data.phone || null, approvedAt: data.status === "APPROVED" ? new Date() : null };
    const partner = id
      ? await prisma.partner.update({ where: { id }, data: payload })
      : await prisma.partner.create({ data: payload });
    revalidatePath("/admin/partners");
    return NextResponse.json({ ok: true, partner });
  } catch (error) {
    const message = error instanceof Error && error.message === "UNAUTHORIZED" ? "Unauthorized" : "Mã hoặc email partner đã tồn tại";
    return NextResponse.json({ error: message }, { status: message === "Unauthorized" ? 401 : 409 });
  }
}
