import "dotenv/config";
import { prisma } from "../lib/db";
import {
  calculateEstimate,
  createEstimateSession,
  getNextStep,
  saveAnswer,
  saveFeatures,
} from "../lib/estimator";
import { extractRequirement } from "../lib/ai/llm-gateway";
import { inferWebsiteSubtype } from "../lib/estimator/intelligence";

type Check = { ok: boolean; detail: string };

async function knownWebsiteKeys() {
  return (
    await prisma.estimatorFeature.findMany({
      where: { product: { key: "WEBSITE" }, active: true },
      select: { key: true },
    })
  ).map((f) => f.key);
}

async function walkIdea(idea: string, label: string, asserts: (ctx: {
  extraction: Awaited<ReturnType<typeof extractRequirement>>;
  subtype: string | null;
  botMessage: string | null | undefined;
  selected: string[];
  rangeM: [number, number];
  deferred: string[];
}) => Check[]) {
  const known = await knownWebsiteKeys();
  const extraction = await extractRequirement({
    text: idea,
    productKey: "WEBSITE",
    knownFeatureKeys: known,
  });
  const subtype = inferWebsiteSubtype(idea);

  const { session, token } = await createEstimateSession({
    productKey: "WEBSITE",
    landingPath: "/estimate",
  });
  const id = session.publicId;

  await saveAnswer(id, "product_type", "WEBSITE", token);
  await saveAnswer(id, "idea_summary", idea, token);

  // Mirror API route persistence of extraction
  if (extraction?.features?.length) {
    await saveFeatures(id, extraction.features, token, { confirm: false });
    const s = await prisma.estimateSession.findUnique({ where: { publicId: id } });
    const answers = JSON.parse(s!.answers);
    answers._extracted_features = extraction.features;
    answers._suggested_subtype = subtype;
    answers._last_question = "idea_summary";
    await prisma.estimateSession.update({
      where: { id: s!.id },
      data: {
        answers: JSON.stringify(answers),
        customRequirements: idea,
        templateKey: subtype || undefined,
      },
    });
  } else if (subtype) {
    const s = await prisma.estimateSession.findUnique({ where: { publicId: id } });
    const answers = JSON.parse(s!.answers);
    answers._suggested_subtype = subtype;
    answers._last_question = "idea_summary";
    await prisma.estimateSession.update({
      where: { id: s!.id },
      data: {
        answers: JSON.stringify(answers),
        customRequirements: idea,
        templateKey: subtype || undefined,
      },
    });
  }

  const afterIdea = await getNextStep(id, token);

  await saveAnswer(id, "website_subtype", subtype || "corporate", token);
  await saveAnswer(id, "business_model", "SINGLE_SHOP", token);
  await saveAnswer(id, "decision_maker", "YES", token);
  await saveAnswer(id, "monthly_users", "LT_1K", token);

  let step = await getNextStep(id, token);
  let guard = 0;
  while (step.nextQuestion && step.nextQuestion.type !== "FEATURE_SELECTOR" && guard++ < 6) {
    const q = step.nextQuestion;
    if (q.type === "SINGLE_SELECT" && q.options[0]) {
      await saveAnswer(id, q.key, q.options[0].value, token);
    } else {
      await saveAnswer(id, q.key, "ok", token);
    }
    step = await getNextStep(id, token);
  }

  const seed =
    step.session.selectedFeatures.length > 0
      ? step.session.selectedFeatures
      : extraction?.features?.length
        ? extraction.features
        : ["pages", "contact_form", "admin"];

  await saveFeatures(id, seed, token, { confirm: true });
  await saveAnswer(id, "integrations", ["none"], token);
  await saveAnswer(id, "design_level", "STANDARD", token);
  await saveAnswer(id, "timeline", "STANDARD", token);
  await saveAnswer(id, "budget_vnd", 40_000_000, token);
  await saveAnswer(id, "intent", "READY_TO_BUILD", token);

  const result = await calculateEstimate(id, {
    token,
    optimizeBudget: 40_000_000,
  });

  const ctx = {
    extraction,
    subtype,
    botMessage: afterIdea.botMessage,
    selected: result.features.map((f) => f.key),
    rangeM: [result.range.min / 1e6, result.range.max / 1e6] as [number, number],
    deferred: result.deferredFeatures.map((f) => f.key),
  };

  const checks = asserts(ctx);
  const failed = checks.filter((c) => !c.ok);

  console.log(`\n=== ${label} ===`);
  console.log(`idea: "${idea}"`);
  console.log(`subtype: ${subtype || "—"}`);
  console.log(`extract: intent=${extraction?.intent} features=[${(extraction?.features || []).join(",")}]`);
  console.log(`bot: ${afterIdea.botMessage || "—"}`);
  console.log(`range: ${ctx.rangeM[0]}–${ctx.rangeM[1]}M`);
  console.log(`kept: ${ctx.selected.join(",") || "—"}`);
  for (const c of checks) {
    console.log(`  ${c.ok ? "✓" : "✗"} ${c.detail}`);
  }
  return failed.length === 0;
}

async function main() {
  const results: Array<{ name: string; ok: boolean }> = [];

  results.push({
    name: "website mỹ phẩm",
    ok: await walkIdea(
      "tôi muốn làm website mỹ phẩm",
      "FOCUS: website mỹ phẩm",
      ({ extraction, subtype, selected, rangeM }) => [
        {
          ok: subtype === "ecommerce",
          detail: `subtype=ecommerce (got ${subtype})`,
        },
        {
          ok: (extraction?.features || []).some((f) =>
            ["product_catalog", "cart", "checkout"].includes(f),
          ),
          detail: `extract core shop features (got ${(extraction?.features || []).join(",") || "empty"})`,
        },
        {
          ok: selected.some((k) =>
            ["product_catalog", "cart", "checkout", "order"].includes(k),
          ),
          detail: `final scope có commerce core`,
        },
        {
          ok: rangeM[0] >= 20 && rangeM[1] <= 120,
          detail: `range hợp lý shop nhỏ (${rangeM[0]}–${rangeM[1]}M)`,
        },
      ],
    ),
  });

  results.push({
    name: "câu lạc đề phở",
    ok: await walkIdea(
      "tôi thích ăn phở bò tái",
      "OFFTOPIC: ăn phở",
      ({ extraction, subtype, botMessage, selected }) => [
        {
          ok: subtype == null,
          detail: `không gán ecommerce oan (subtype=${subtype})`,
        },
        {
          ok:
            !extraction?.features?.length ||
            extraction.intent === "CLARIFY" ||
            extraction.requires_followup === true,
          detail: `cần clarify / không bịa feature (intent=${extraction?.intent}, feats=${extraction?.features?.join(",") || "—"})`,
        },
        {
          ok: Boolean(botMessage && /chưa nắm|chung|ví dụ/i.test(botMessage)),
          detail: `bot hỏi lại khi lạc đề`,
        },
        {
          ok: !selected.includes("cart"),
          detail: `không nhét giỏ hàng khi ý lạc đề`,
        },
      ],
    ),
  });

  results.push({
    name: "gõ bậy",
    ok: await walkIdea(
      "asdf qwer zxcv 123!!!",
      "NOISE: gõ bậy",
      ({ extraction, subtype }) => [
        {
          ok: subtype == null,
          detail: `subtype null (got ${subtype})`,
        },
        {
          ok: !(extraction?.features || []).length,
          detail: `không extract feature ảo`,
        },
      ],
    ),
  });

  results.push({
    name: "bức xúc / lệch câu hỏi",
    ok: await walkIdea(
      "sao hỏi nhiều thế không tính giá luôn đi",
      "FRUSTRATED: muốn giá ngay",
      ({ extraction, subtype, botMessage }) => [
        {
          ok: subtype == null,
          detail: `không đoán subtype oan`,
        },
        {
          ok: !(extraction?.features || []).some((f) =>
            ["online_payment", "booking", "loyalty"].includes(f),
          ),
          detail: `không nhét payment/booking từ câu bức xúc`,
        },
        {
          ok: Boolean(botMessage && /chưa nắm|ví dụ/i.test(botMessage)),
          detail: `bot dịu dàng hỏi lại thay vì đi tiếp mù`,
        },
      ],
    ),
  });

  results.push({
    name: "ý đúng nhưng ngắn",
    ok: await walkIdea(
      "bán serum online",
      "SHORT: bán serum",
      ({ extraction, subtype }) => [
        {
          ok: subtype === "ecommerce",
          detail: `subtype ecommerce`,
        },
        {
          ok: (extraction?.features || []).includes("product_catalog"),
          detail: `có product_catalog`,
        },
      ],
    ),
  });

  results.push({
    name: "ý lẫn app",
    ok: await walkIdea(
      "website giới thiệu công ty xây dựng, có form liên hệ thôi",
      "CORPORATE: rõ ràng",
      ({ subtype, selected }) => [
        {
          ok: subtype === "landing" || subtype === "corporate",
          detail: `subtype landing/corporate (got ${subtype})`,
        },
        {
          ok: !selected.includes("cart") && !selected.includes("checkout"),
          detail: `không nhét giỏ hàng vào corporate`,
        },
      ],
    ),
  });

  console.log("\n======== SUMMARY ========");
  for (const r of results) {
    console.log(`${r.ok ? "PASS" : "FAIL"} · ${r.name}`);
  }
  const failed = results.filter((r) => !r.ok).length;
  console.log(`${results.length - failed}/${results.length} passed`);
  if (failed) process.exit(1);
}

main().finally(() => prisma.$disconnect());
