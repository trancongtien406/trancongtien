import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import { trackServerEvent } from "@/lib/analytics";
import {
  EST_COOKIE,
  calculateEstimate,
  formatVndRange,
  optimizeSchema,
  parseEstCookie,
  toPublicResult,
} from "@/lib/estimator";
import { summarizeEstimate } from "@/lib/ai/llm-gateway";
import { getClientIp, limitLlmCall } from "@/lib/estimator/abuse";
import { prisma } from "@/lib/db";

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
    const body = optimizeSchema.parse(await request.json());
    if (!body.budgetVnd) {
      return NextResponse.json({ error: "Thiếu budgetVnd" }, { status: 400 });
    }
    const result = await calculateEstimate(id, {
      token,
      optimizeBudget: body.budgetVnd,
      label: "Budget optimized",
    });
    const summary = await summarizeEstimate({
      productName: result.product,
      features: result.features.map((f) => f.name),
      rangeLabel: formatVndRange(result.range.min, result.range.max),
      recommendations: result.recommendations.map((r) => r.title),
      allowLlm: limitLlmCall(getClientIp(request)).ok,
    });
    await prisma.estimateSession.update({
      where: { publicId: id },
      data: { aiSummary: summary },
    });
    void trackServerEvent("scope_optimized", { version: result.version });
    return NextResponse.json({
      result: { ...toPublicResult(result), aiSummary: summary },
    });
  } catch (error) {
    console.error("[estimator/optimize]", error);
    return NextResponse.json({ error: "Không tối ưu được scope" }, { status: 400 });
  }
}
