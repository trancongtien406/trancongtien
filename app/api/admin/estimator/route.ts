import { revalidatePath } from "next/cache";
import { NextResponse } from "next/server";
import { z } from "zod";
import { requireAdmin } from "@/lib/auth";
import {
  extractRequirement,
  getLlmStatus,
  summarizeEstimate,
} from "@/lib/ai/llm-gateway";
import { prisma } from "@/lib/db";
import { formatVndRange } from "@/lib/estimator/pricing";

export const dynamic = "force-dynamic";

const complexityEnum = z.enum([
  "VERY_LOW",
  "LOW",
  "MEDIUM",
  "HIGH",
  "VERY_HIGH",
]);
const priorityEnum = z.enum([
  "MUST_HAVE",
  "SHOULD_HAVE",
  "NICE_TO_HAVE",
  "GROWTH",
  "SCALE",
]);
const questionTypeEnum = z.enum([
  "TEXT",
  "TEXTAREA",
  "SINGLE_SELECT",
  "MULTI_SELECT",
  "NUMBER",
  "RANGE",
  "SLIDER",
  "BOOLEAN",
  "FEATURE_SELECTOR",
  "TIMELINE",
  "BUDGET",
  "AI_FREE_TEXT",
]);

const upsertProductSchema = z.object({
  action: z.literal("upsertProduct"),
  id: z.string().optional(),
  key: z.string().trim().min(2).max(64),
  name: z.string().trim().min(2).max(160),
  description: z.string().trim().max(2000).optional(),
  icon: z.string().trim().max(64).optional().nullable(),
  baseUnits: z.coerce.number().int().min(0).max(10_000).optional(),
  active: z.boolean().optional(),
  sortOrder: z.coerce.number().int().optional(),
});

const upsertFeatureSchema = z.object({
  action: z.literal("upsertFeature"),
  id: z.string().optional(),
  productId: z.string().min(1),
  key: z.string().trim().min(2).max(64),
  name: z.string().trim().min(2).max(160),
  description: z.string().trim().max(2000).optional(),
  category: z.string().trim().max(80).optional(),
  complexity: complexityEnum.optional(),
  baseUnits: z.coerce.number().int().min(0).max(10_000).optional(),
  priority: priorityEnum.optional(),
  technicalRisk: complexityEnum.optional(),
  optional: z.boolean().optional(),
  active: z.boolean().optional(),
  sortOrder: z.coerce.number().int().optional(),
});

const upsertQuestionSchema = z.object({
  action: z.literal("upsertQuestion"),
  id: z.string().optional(),
  productId: z.string().optional().nullable(),
  key: z.string().trim().min(2).max(64),
  type: questionTypeEnum,
  section: z.string().trim().max(80).optional(),
  title: z.string().trim().min(2).max(240),
  description: z.string().trim().max(2000).optional(),
  required: z.boolean().optional(),
  sortOrder: z.coerce.number().int().optional(),
  active: z.boolean().optional(),
  config: z.string().optional(),
});

const setPricingActiveSchema = z.object({
  action: z.literal("setPricingActive"),
  id: z.string().min(1),
});

const updatePricingSchema = z.object({
  action: z.literal("updatePricing"),
  id: z.string().min(1),
  unitValueVnd: z.coerce.number().int().min(1000).max(100_000_000),
  minimumProjectVnd: z.coerce.number().int().min(0).max(10_000_000_000),
});

const playgroundSchema = z.object({
  action: z.literal("playground"),
  text: z.string().trim().min(8).max(4000),
  productKey: z.string().trim().max(64).optional().nullable(),
});

function revalidateEstimator() {
  revalidatePath("/admin/estimator");
  revalidatePath("/admin");
}

async function listOverview() {
  const [products, pricingVersions, questionCount, sessionGroups, recentSessions] =
    await Promise.all([
      prisma.estimatorProduct.findMany({
        orderBy: { sortOrder: "asc" },
        include: {
          _count: { select: { features: true, questions: true, sessions: true } },
        },
      }),
      prisma.pricingVersion.findMany({ orderBy: { createdAt: "desc" } }),
      prisma.estimatorQuestion.count(),
      prisma.estimateSession.groupBy({
        by: ["status"],
        _count: { _all: true },
      }),
      prisma.estimateSession.findMany({
        orderBy: { updatedAt: "desc" },
        take: 20,
        include: {
          product: { select: { name: true } },
          lead: { select: { id: true, leadNumber: true } },
          versions: {
            orderBy: { version: "desc" },
            take: 1,
            select: { minAmount: true, maxAmount: true },
          },
        },
      }),
    ]);

  const sessionCounts = Object.fromEntries(
    sessionGroups.map((g) => [g.status, g._count._all]),
  ) as Record<string, number>;

  return {
    products: products.map((p) => ({
      id: p.id,
      key: p.key,
      name: p.name,
      description: p.description,
      icon: p.icon,
      baseUnits: p.baseUnits,
      active: p.active,
      sortOrder: p.sortOrder,
      featureCount: p._count.features,
      questionCount: p._count.questions,
      sessionCount: p._count.sessions,
    })),
    pricingVersions,
    questionCount,
    sessionCounts,
    recentSessions: recentSessions.map((s) => {
      const latest = s.versions[0];
      return {
        id: s.id,
        publicId: s.publicId,
        status: s.status,
        contactEmail: s.contactEmail,
        updatedAt: s.updatedAt.toISOString(),
        productName: s.product?.name || null,
        leadId: s.lead?.id || null,
        leadNumber: s.lead?.leadNumber || null,
        rangeLabel: latest
          ? formatVndRange(Number(latest.minAmount), Number(latest.maxAmount))
          : null,
      };
    }),
  };
}

export async function GET() {
  try {
    await requireAdmin();
    const data = await listOverview();
    return NextResponse.json(data);
  } catch (error) {
    const unauthorized =
      error instanceof Error && error.message === "UNAUTHORIZED";
    return NextResponse.json(
      { error: unauthorized ? "Unauthorized" : "Không thể tải estimator" },
      { status: unauthorized ? 401 : 500 },
    );
  }
}

export async function POST(request: Request) {
  try {
    await requireAdmin();
    const body = await request.json();
    const action = String(body?.action || "");

    if (action === "list") {
      return NextResponse.json(await listOverview());
    }

    if (action === "upsertProduct") {
      const parsed = upsertProductSchema.safeParse(body);
      if (!parsed.success) {
        return NextResponse.json(
          { error: parsed.error.issues[0]?.message },
          { status: 400 },
        );
      }
      const { id, ...data } = parsed.data;
      const payload = {
        key: data.key,
        name: data.name,
        description: data.description || "",
        icon: data.icon || null,
        baseUnits: data.baseUnits ?? 20,
        active: data.active ?? true,
        sortOrder: data.sortOrder ?? 0,
      };
      const product = id
        ? await prisma.estimatorProduct.update({ where: { id }, data: payload })
        : await prisma.estimatorProduct.create({ data: payload });
      revalidateEstimator();
      return NextResponse.json({ ok: true, product });
    }

    if (action === "upsertFeature") {
      const parsed = upsertFeatureSchema.safeParse(body);
      if (!parsed.success) {
        return NextResponse.json(
          { error: parsed.error.issues[0]?.message },
          { status: 400 },
        );
      }
      const { id, ...data } = parsed.data;
      const payload = {
        productId: data.productId,
        key: data.key,
        name: data.name,
        description: data.description || "",
        category: data.category || "General",
        complexity: data.complexity || "MEDIUM",
        baseUnits: data.baseUnits ?? 3,
        priority: data.priority || "SHOULD_HAVE",
        technicalRisk: data.technicalRisk || "LOW",
        optional: data.optional ?? true,
        active: data.active ?? true,
        sortOrder: data.sortOrder ?? 0,
      };
      const feature = id
        ? await prisma.estimatorFeature.update({ where: { id }, data: payload })
        : await prisma.estimatorFeature.create({ data: payload });
      revalidateEstimator();
      return NextResponse.json({ ok: true, feature });
    }

    if (action === "upsertQuestion") {
      const parsed = upsertQuestionSchema.safeParse(body);
      if (!parsed.success) {
        return NextResponse.json(
          { error: parsed.error.issues[0]?.message },
          { status: 400 },
        );
      }
      const { id, ...data } = parsed.data;
      const payload = {
        productId: data.productId || null,
        key: data.key,
        type: data.type,
        section: data.section || "general",
        title: data.title,
        description: data.description || "",
        required: data.required ?? true,
        sortOrder: data.sortOrder ?? 0,
        active: data.active ?? true,
        config: data.config || "{}",
      };
      const question = id
        ? await prisma.estimatorQuestion.update({ where: { id }, data: payload })
        : await prisma.estimatorQuestion.create({ data: payload });
      revalidateEstimator();
      return NextResponse.json({ ok: true, question });
    }

    if (action === "setPricingActive") {
      const parsed = setPricingActiveSchema.safeParse(body);
      if (!parsed.success) {
        return NextResponse.json(
          { error: parsed.error.issues[0]?.message },
          { status: 400 },
        );
      }
      await prisma.$transaction([
        prisma.pricingVersion.updateMany({ data: { active: false } }),
        prisma.pricingVersion.update({
          where: { id: parsed.data.id },
          data: { active: true },
        }),
      ]);
      revalidateEstimator();
      return NextResponse.json({ ok: true });
    }

    if (action === "updatePricing") {
      const parsed = updatePricingSchema.safeParse(body);
      if (!parsed.success) {
        return NextResponse.json(
          { error: parsed.error.issues[0]?.message },
          { status: 400 },
        );
      }
      const pricing = await prisma.pricingVersion.update({
        where: { id: parsed.data.id },
        data: {
          unitValueVnd: parsed.data.unitValueVnd,
          minimumProjectVnd: parsed.data.minimumProjectVnd,
        },
      });
      revalidateEstimator();
      return NextResponse.json({ ok: true, pricing });
    }

    if (action === "playground") {
      const parsed = playgroundSchema.safeParse(body);
      if (!parsed.success) {
        return NextResponse.json(
          { error: parsed.error.issues[0]?.message || "Nội dung quá ngắn" },
          { status: 400 },
        );
      }

      const status = await getLlmStatus();
      let knownFeatureKeys: string[] = [];
      let productName = "Sản phẩm";
      if (parsed.data.productKey) {
        const product = await prisma.estimatorProduct.findUnique({
          where: { key: parsed.data.productKey },
          include: {
            features: {
              where: { active: true },
              select: { key: true, name: true },
            },
          },
        });
        if (product) {
          productName = product.name;
          knownFeatureKeys = product.features.map((f) => f.key);
        }
      }

      const started = Date.now();
      const extraction = await extractRequirement({
        text: parsed.data.text,
        productKey: parsed.data.productKey,
        knownFeatureKeys,
      });
      if (!extraction) {
        return NextResponse.json(
          { error: "Không extract được requirement" },
          { status: 500 },
        );
      }

      const matchedNames = knownFeatureKeys.length
        ? (
            await prisma.estimatorFeature.findMany({
              where: {
                key: { in: extraction.features },
                active: true,
              },
              select: { key: true, name: true },
            })
          ).map((f) => f.name)
        : extraction.features;

      const summary = await summarizeEstimate({
        productName,
        features: matchedNames.length ? matchedNames : extraction.features,
        rangeLabel: "— (playground không tính giá)",
        recommendations: extraction.requires_followup
          ? [`Cần hỏi thêm: ${extraction.followup_topics.join(", ") || "làm rõ nhu cầu"}`]
          : ["Phạm vi đã khá rõ để tiếp tục questionnaire."],
      });

      return NextResponse.json({
        ok: true,
        status,
        latencyMs: Date.now() - started,
        extraction,
        summary,
        note: "Playground không chạy Pricing Engine — giá vẫn chỉ tính qua /estimate.",
      });
    }

    return NextResponse.json({ error: "Action không hợp lệ" }, { status: 400 });
  } catch (error) {
    const unauthorized =
      error instanceof Error && error.message === "UNAUTHORIZED";
    return NextResponse.json(
      {
        error: unauthorized
          ? "Unauthorized"
          : error instanceof Error
            ? error.message
            : "Không thể cập nhật estimator",
      },
      { status: unauthorized ? 401 : 500 },
    );
  }
}
