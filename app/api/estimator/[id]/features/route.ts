import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import { trackServerEvent } from "@/lib/analytics";
import {
  EST_COOKIE,
  featuresSchema,
  getNextStep,
  parseEstCookie,
  saveFeatures,
} from "@/lib/estimator";
import { limitAnswers } from "@/lib/estimator/abuse";

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
    const paced = limitAnswers(id);
    if (!paced.ok) {
      return NextResponse.json(
        { error: "Bạn gửi quá nhanh. Chờ một lát rồi tiếp tục phiên này." },
        {
          status: 429,
          headers: { "Retry-After": String(paced.retryAfterSec) },
        },
      );
    }
    const body = featuresSchema.parse(await request.json());
    const resolved = await saveFeatures(id, body.featureKeys, token, {
      confirm: true,
    });
    void trackServerEvent("feature_added", { count: resolved.selected.length });
    const step = await getNextStep(id, token);
    return NextResponse.json({ ...step, dependency: resolved });
  } catch (error) {
    console.error("[estimator/features]", error);
    return NextResponse.json({ error: "Không lưu được tính năng" }, { status: 400 });
  }
}
