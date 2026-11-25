import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import { trackServerEvent } from "@/lib/analytics";
import { summarizeEstimate } from "@/lib/ai/llm-gateway";
import {
  EST_COOKIE,
  calculateEstimate,
  formatVndRange,
  optimizeSchema,
  parseEstCookie,
  toPublicResult,
} from "@/lib/estimator";
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
    const body = optimizeSchema.parse(await request.json().catch(() => ({})));
    const result = await calculateEstimate(id, {
      token,
      optimizeBudget: body.budgetVnd,
    });

    const existing = await prisma.estimateSession.findUnique({
      where: { publicId: id },
      select: { aiSummary: true },
    });
    const cachedSummary = existing?.aiSummary?.trim() || "";
    const reuseSummary = Boolean(cachedSummary) && !body.budgetVnd;
    const summary = reuseSummary
      ? cachedSummary
      : await summarizeEstimate({
          productName: result.product,
          features: result.features.map((f) => f.name),
          rangeLabel: formatVndRange(result.range.min, result.range.max),
          recommendations: result.recommendations.map((r) => r.title),
          allowLlm: limitLlmCall(getClientIp(request)).ok,
        });

    if (!reuseSummary) {
      await prisma.estimateSession.update({
        where: { publicId: id },
        data: { aiSummary: summary },
      });
    }

    void trackServerEvent("estimate_generated", {
      product: result.product,
      version: result.version,
      optimized: Boolean(body.budgetVnd),
    });

    return NextResponse.json({
      result: { ...toPublicResult(result), aiSummary: summary },
    });
  } catch (error) {
    const message = error instanceof Error ? error.message : "ERROR";
    console.error("[estimator/calculate]", error);
    return NextResponse.json(
      { error: message === "NO_PRODUCT" ? "Chọn sản phẩm trước" : "Không tính được estimate" },
      { status: 400 },
    );
  }
}
