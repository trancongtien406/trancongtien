import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import { trackServerEvent } from "@/lib/analytics";
import {
  EST_COOKIE,
  captureEstimateLead,
  captureLeadSchema,
  parseEstCookie,
} from "@/lib/estimator";
import { notifyAdmin } from "@/lib/notify";

export const dynamic = "force-dynamic";

async function sessionToken(publicId: string) {
  const jar = await cookies();
  const parsed = parseEstCookie(jar.get(EST_COOKIE)?.value);
  return parsed?.publicId === publicId ? parsed.token : undefined;
}

export async function POST(
  request: Request,
  context: { params: Promise<{ id: string }> },
) {
  try {
    const { id } = await context.params;
    const token = await sessionToken(id);
    const body = captureLeadSchema.parse(await request.json());
    const { lead, alreadyCaptured, score } = await captureEstimateLead(
      id,
      body,
      token,
    );

    if (!alreadyCaptured && "leadNumber" in lead) {
      void notifyAdmin({
        title: `Lead Estimator mới: ${lead.leadNumber}`,
        body: `${body.name} · ${body.email} · ${body.phone}\nScore: ${score?.band || "—"} (${score?.score ?? "—"})\n/admin/leads?id=${lead.id}`,
      }).catch((err) => console.error("[estimator/lead] notify", err));

      void trackServerEvent("lead_captured", {
        score_band: score?.band || null,
        source: "ESTIMATOR",
      });
    }

    return NextResponse.json({
      ok: true,
      alreadyCaptured,
      leadNumber: "leadNumber" in lead ? lead.leadNumber : undefined,
      score,
    });
  } catch (error) {
    console.error("[estimator/lead]", error);
    return NextResponse.json({ error: "Không lưu được liên hệ" }, { status: 400 });
  }
}
