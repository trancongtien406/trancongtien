/**
 * Smoke: estimator pricing + session calculate against seeded DB.
 */
import "dotenv/config";
import { prisma } from "../lib/db";
import {
  calculateEstimate,
  createEstimateSession,
  saveAnswer,
  saveFeatures,
} from "../lib/estimator";

async function main() {
  const { session, token } = await createEstimateSession({
    productKey: "WEBSITE",
    landingPath: "/estimate",
    referralCode: "CTV001",
  });
  console.log("session", session.publicId);

  await saveAnswer(session.publicId, "product_type", "WEBSITE", token);
  await saveAnswer(session.publicId, "website_subtype", "ecommerce", token);
  await saveAnswer(session.publicId, "business_model", "SINGLE_SHOP", token);
  await saveAnswer(session.publicId, "decision_maker", "YES", token);
  await saveAnswer(session.publicId, "monthly_users", "1K_10K", token);
  await saveAnswer(session.publicId, "idea_summary", "Tôi muốn làm website bán mỹ phẩm online", token);

  const resolved = await saveFeatures(
    session.publicId,
    [
      "product_catalog",
      "cart",
      "checkout",
      "order",
      "admin",
      "online_payment",
      "wishlist",
      "loyalty",
    ],
    token,
  );
  console.log("features", resolved.selected.length, "auto", resolved.autoAdded.length);

  await saveAnswer(session.publicId, "integrations", ["vnpay", "email"], token);
  await saveAnswer(session.publicId, "design_level", "STANDARD", token);
  await saveAnswer(session.publicId, "timeline", "STANDARD", token);
  await saveAnswer(session.publicId, "budget_vnd", 35_000_000, token);
  await saveAnswer(session.publicId, "intent", "READY_TO_BUILD", token);

  const result = await calculateEstimate(session.publicId, {
    token,
    optimizeBudget: 35_000_000,
  });

  console.log("range", result.range.min, "-", result.range.max);
  console.log("internal", result.internalAmount);
  console.log("deferred", result.deferredFeatures.map((f) => f.key).join(", "));
  console.log("arch", result.architecture.name);
  console.log("recs", result.recommendations.length);
  console.log("SMOKE_OK");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
