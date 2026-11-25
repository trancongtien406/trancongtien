import { NextResponse } from "next/server";
import { getSessionByShareCode } from "@/lib/estimator";
import { formatVndRange } from "@/lib/estimator/pricing";

export const dynamic = "force-dynamic";

export async function GET(
  _request: Request,
  context: { params: Promise<{ code: string }> },
) {
  const { code } = await context.params;
  const session = await getSessionByShareCode(code);
  if (!session || !session.versions[0]) {
    return NextResponse.json({ error: "Không tìm thấy" }, { status: 404 });
  }
  const latest = session.versions[0];
  return NextResponse.json({
    publicId: session.publicId,
    shareCode: session.shareCode,
    product: session.product?.name,
    rangeLabel: formatVndRange(Number(latest.minAmount), Number(latest.maxAmount)),
    timelineWeeks: {
      min: latest.timelineWeeksMin,
      max: latest.timelineWeeksMax,
    },
    roadmap: JSON.parse(latest.roadmap || "[]"),
    recommendations: JSON.parse(latest.recommendations || "[]"),
    aiSummary: session.aiSummary,
  });
}
