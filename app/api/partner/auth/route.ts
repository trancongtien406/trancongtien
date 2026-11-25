import { NextResponse } from "next/server";
import { z } from "zod";
import {
  destroyPartnerSession,
  loginPartner,
} from "@/lib/partners/auth";
import { isValidEmail } from "@/lib/validation";

export const dynamic = "force-dynamic";

const schema = z.object({
  code: z.string().trim().min(3).max(32),
  email: z.string().trim().refine(isValidEmail, "Email không hợp lệ"),
});

export async function POST(request: Request) {
  const body = await request.json();
  if (body.action === "logout") {
    await destroyPartnerSession();
    return NextResponse.json({ ok: true });
  }

  const parsed = schema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json(
      { error: parsed.error.issues[0]?.message || "Dữ liệu không hợp lệ" },
      { status: 400 },
    );
  }

  const partner = await loginPartner(parsed.data.code, parsed.data.email);
  if (!partner) {
    return NextResponse.json(
      { error: "Mã partner hoặc email không đúng / chưa được duyệt" },
      { status: 401 },
    );
  }

  return NextResponse.json({
    ok: true,
    partner: { code: partner.code, name: partner.name },
  });
}
