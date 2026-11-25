import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import { trackServerEvent } from "@/lib/analytics";
import {
  EST_COOKIE,
  answerSchema,
  getNextStep,
  parseEstCookie,
  saveAnswer,
} from "@/lib/estimator";
import { extractRequirement } from "@/lib/ai/llm-gateway";
import { prisma } from "@/lib/db";
import { getClientIp, limitAnswers, limitLlmCall } from "@/lib/estimator/abuse";
import { saveFeatures } from "@/lib/estimator/session";

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
    const body = answerSchema.parse(await request.json());

    const answerLimit = limitAnswers(id);
    if (!answerLimit.ok) {
      return NextResponse.json(
        { error: "Bạn gửi quá nhanh. Chờ một lát rồi tiếp tục phiên này." },
        {
          status: 429,
          headers: { "Retry-After": String(answerLimit.retryAfterSec) },
        },
      );
    }

    await saveAnswer(id, body.questionKey, body.value, token);

    if (body.questionKey === "product_type" && typeof body.value === "string") {
      void trackServerEvent("product_selected", { product: body.value });
    }

    if (body.questionKey === "idea_summary" && typeof body.value === "string") {
      const session = await prisma.estimateSession.findUnique({
        where: { publicId: id },
        include: { product: true },
      });
      if (!session) {
        return NextResponse.json({ error: "Không tìm thấy phiên" }, { status: 404 });
      }

      const known = session.productId
        ? (
            await prisma.estimatorFeature.findMany({
              where: { productId: session.productId, active: true },
              select: { key: true },
            })
          ).map((f) => f.key)
        : [];
      const prior = await prisma.aiExtraction.findFirst({
        where: {
          sessionId: session.id,
          task: "requirement_extraction",
          inputText: body.value,
        },
        orderBy: { createdAt: "desc" },
      });

      let extraction: {
        features: string[];
        confidence: number;
        technical_review?: boolean;
      } | null = null;
      if (prior) {
        try {
          const parsed = JSON.parse(prior.outputJson) as {
            features?: string[];
            confidence?: number;
            technical_review?: boolean;
          };
          if (Array.isArray(parsed.features)) {
            extraction = {
              features: parsed.features,
              confidence: parsed.confidence ?? 0.5,
              technical_review: parsed.technical_review,
            };
          }
        } catch {
          extraction = null;
        }
      }

      if (!extraction) {
        const llm = limitLlmCall(getClientIp(request));
        extraction = await extractRequirement({
          text: body.value,
          productKey: session.product?.key,
          knownFeatureKeys: known,
          allowLlm: llm.ok,
        });
      }

      if (extraction) {
        if (!prior) {
          await prisma.aiExtraction.create({
            data: {
              sessionId: session.id,
              task: "requirement_extraction",
              inputText: body.value,
              outputJson: JSON.stringify(extraction),
              confidence: extraction.confidence,
            },
          });
        }

        const answers = JSON.parse(session.answers || "{}") as Record<
          string,
          unknown
        >;
        // Re-read after saveAnswer
        const fresh = await prisma.estimateSession.findUnique({
          where: { id: session.id },
        });
        const merged = {
          ...(JSON.parse(fresh?.answers || "{}") as Record<string, unknown>),
          _extracted_features: extraction.features,
          _extraction_confidence: extraction.confidence,
        };

        await prisma.estimateSession.update({
          where: { id: session.id },
          data: {
            customRequirements: body.value,
            technicalReviewRequired:
              session.technicalReviewRequired || extraction.technical_review,
            answers: JSON.stringify(merged),
          },
        });

        // Prefill only — khách vẫn phải xác nhận ở FEATURE_SELECTOR
        if (extraction.features.length && extraction.confidence >= 0.55) {
          const current = JSON.parse(fresh?.selectedFeatures || "[]") as string[];
          await saveFeatures(
            id,
            [...new Set([...current, ...extraction.features])],
            token,
            { confirm: false },
          );
        }

        void answers;
      }
    }

    const step = await getNextStep(id, token);
    return NextResponse.json(step);
  } catch (error) {
    const message = error instanceof Error ? error.message : "ERROR";
    if (message === "NOT_FOUND") {
      return NextResponse.json({ error: "Không tìm thấy phiên" }, { status: 404 });
    }
    console.error("[estimator/answer]", error);
    return NextResponse.json({ error: "Không lưu được câu trả lời" }, { status: 400 });
  }
}
