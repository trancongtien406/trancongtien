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

async function show(id: string, token: string, label: string) {
  const step = await getNextStep(id, token);
  console.log(`\n== ${label} ==`);
  console.log(
    `progress ${step.progress.percent}% · next=${step.nextQuestion?.key} (${step.nextQuestion?.type})`,
  );
  console.log(`title: ${step.nextQuestion?.title || "(done)"}`);
  console.log(`selectedFeatures: ${step.session.selectedFeatures.join(", ") || "—"}`);
  return step;
}

async function main() {
  const idea =
    "Shop spa online bán serum, cần booking lịch + bán hàng + thanh toán MoMo và tích điểm. App thì chưa cần lúc này.";

  console.log("--- LLM/heuristic extract ---");
  const extraction = await extractRequirement({
    text: idea,
    productKey: "WEBSITE",
    knownFeatureKeys: (
      await prisma.estimatorFeature.findMany({
        where: { product: { key: "WEBSITE" }, active: true },
        select: { key: true },
      })
    ).map((f) => f.key),
  });
  console.log(JSON.stringify(extraction, null, 2));

  const { session, token } = await createEstimateSession({
    productKey: undefined,
    landingPath: "/estimate",
  });
  const id = session.publicId;
  await show(id, token, "cold start");

  await saveAnswer(id, "product_type", "WEBSITE", token);
  await show(id, token, "after product_type");

  await saveAnswer(id, "idea_summary", idea, token);
  if (extraction?.features?.length) {
    await saveFeatures(id, extraction.features, token, { confirm: false });
    // persist extracted keys like API
    const s = await prisma.estimateSession.findUnique({ where: { publicId: id } });
    const answers = JSON.parse(s!.answers);
    answers._extracted_features = extraction.features;
    answers._last_question = "idea_summary";
    await prisma.estimateSession.update({
      where: { id: s!.id },
      data: { answers: JSON.stringify(answers) },
    });
  }
  let step = await show(id, token, "after idea (must still ask feature confirm)");
  console.log("botMessage:", step.botMessage);

  await saveAnswer(id, "website_subtype", "ecommerce", token);
  await saveAnswer(id, "business_model", "SINGLE_SHOP", token);
  await saveAnswer(id, "decision_maker", "YES", token);
  await saveAnswer(id, "monthly_users", "1K_10K", token);
  step = await show(id, token, "should be feature_selector");
  console.log(
    "features shown:",
    step.features.length,
    step.features.map((f) => f.key).slice(0, 15).join(", "),
  );

  const resolved = await saveFeatures(
    id,
    step.session.selectedFeatures.length
      ? step.session.selectedFeatures
      : ["product_catalog", "cart", "online_payment", "loyalty", "booking"],
    token,
    { confirm: true },
  );
  console.log("\nautoAdded:", resolved.autoAdded.map((a) => a.key));
  console.log("selected:", resolved.selected.join(", "));

  await saveAnswer(id, "integrations", ["momo"], token);
  await saveAnswer(id, "design_level", "STANDARD", token);
  await saveAnswer(id, "timeline", "STANDARD", token);
  await saveAnswer(id, "budget_vnd", 40_000_000, token);
  await saveAnswer(id, "intent", "READY_TO_BUILD", token);
  await show(id, token, "ready to calc");

  const result = await calculateEstimate(id, {
    token,
    optimizeBudget: 40_000_000,
  });
  console.log("\n=== RESULT ===");
  console.log(`range ${result.range.min / 1e6}–${result.range.max / 1e6}M`);
  console.log("kept:", result.features.map((f) => f.key).join(", "));
  console.log("deferred:", result.deferredFeatures.map((f) => f.key).join(", "));
  console.log(
    "recs:",
    result.recommendations.map((r) => `${r.title}: ${r.body}`).join("\n  "),
  );
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
