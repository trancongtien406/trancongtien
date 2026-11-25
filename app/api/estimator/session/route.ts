import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import { trackServerEvent } from "@/lib/analytics";
import {
  EST_COOKIE,
  createEstimateSession,
  createSessionSchema,
  getLatestPublicResult,
  getNextStep,
  getSessionByPublicId,
  parseEstCookie,
} from "@/lib/estimator";
import { getClientIp, limitSessionCreate } from "@/lib/estimator/abuse";
import { REF_COOKIE, normalizeReferralCode } from "@/lib/partners";

export const dynamic = "force-dynamic";

async function resumeFromCookie() {
  const jar = await cookies();
  const parsed = parseEstCookie(jar.get(EST_COOKIE)?.value);
  if (!parsed) return null;
  const session = await getSessionByPublicId(parsed.publicId, parsed.token);
  if (!session) return null;
  const [step, result] = await Promise.all([
    getNextStep(parsed.publicId, parsed.token),
    getLatestPublicResult(parsed.publicId, parsed.token),
  ]);
  return {
    publicId: session.publicId,
    shareCode: session.shareCode,
    status: session.status,
    resumed: true as const,
    step,
    result,
    leadNumber: session.lead?.leadNumber || null,
    hasLead: Boolean(session.lead),
  };
}

function attachSessionCookie(
  response: NextResponse,
  publicId: string,
  token: string,
) {
  response.cookies.set(EST_COOKIE, `${publicId}.${token}`, {
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    path: "/",
    maxAge: 60 * 60 * 24 * 30,
  });
  return response;
}

export async function GET() {
  const payload = await resumeFromCookie();
  if (!payload) return NextResponse.json({ session: null });
  return NextResponse.json(payload);
}

export async function POST(request: Request) {
  try {
    const body = createSessionSchema.parse(await request.json().catch(() => ({})));

    if (!body.fresh) {
      const existing = await resumeFromCookie();
      if (existing) return NextResponse.json(existing);
    }

    const created = limitSessionCreate(getClientIp(request));
    if (!created.ok) {
      const fallback = await resumeFromCookie();
      if (fallback) {
        return NextResponse.json({
          ...fallback,
          warning: "Đã đạt giới hạn phiên mới. Tiếp tục phiên hiện tại.",
        });
      }
      return NextResponse.json(
        {
          error:
            "Bạn đã tạo quá nhiều phiên ước tính. Thử lại sau hoặc tiếp tục phiên cũ.",
        },
        {
          status: 429,
          headers: { "Retry-After": String(created.retryAfterSec) },
        },
      );
    }

    const jar = await cookies();
    const referralCode =
      normalizeReferralCode(body.referralCode) ||
      normalizeReferralCode(jar.get(REF_COOKIE)?.value) ||
      undefined;

    const { session, token } = await createEstimateSession({
      ...body,
      referralCode,
    });

    const step = await getNextStep(session.publicId, token);

    const response = NextResponse.json({
      publicId: session.publicId,
      shareCode: session.shareCode,
      status: session.status,
      resumed: false,
      step,
      result: null,
      leadNumber: null,
      hasLead: false,
    });
    attachSessionCookie(response, session.publicId, token);

    void trackServerEvent("estimator_started", {
      product: body.productKey || null,
      has_ref: Boolean(referralCode),
      fresh: Boolean(body.fresh),
    });

    return response;
  } catch (error) {
    console.error("[estimator/session]", error);
    return NextResponse.json({ error: "Không tạo được phiên estimate" }, { status: 400 });
  }
}
