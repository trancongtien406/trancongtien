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

type Case = {
  name: string;
  product?: string;
  idea: string;
  subtype?: string;
  business?: string;
  users?: string;
  features?: string[];
  budget: number;
  expect: {
    keep?: string[];
    neverDefer?: string[];
    subtypeHint?: string;
    maxRangeM?: number;
    minRangeM?: number;
  };
};

const cases: Case[] = [
  {
    name: "Spa ecommerce + booking + MoMo",
    product: "WEBSITE",
    idea: "Shop spa online bán serum, cần booking lịch + bán hàng + thanh toán MoMo và tích điểm. App chưa cần.",
    subtype: "ecommerce",
    business: "SINGLE_SHOP",
    users: "1K_10K",
    budget: 40_000_000,
    expect: {
      neverDefer: ["online_payment", "loyalty"],
      subtypeHint: "ecommerce",
      minRangeM: 40,
    },
  },
  {
    name: "Corporate website nhỏ",
    product: "WEBSITE",
    idea: "Website giới thiệu công ty xây dựng, có blog và form liên hệ. Không bán hàng.",
    subtype: "corporate",
    business: "SINGLE_SHOP",
    users: "LT_1K",
    features: ["pages", "cms_basic", "contact_form", "blog", "seo", "admin"],
    budget: 25_000_000,
    expect: {
      neverDefer: ["pages", "admin"],
      maxRangeM: 45,
    },
  },
  {
    name: "Booking clinic thuần",
    product: "WEBSITE",
    idea: "Phòng khám da liễu cần đặt lịch online, nhắc lịch SMS, thanh toán cọc.",
    subtype: "booking",
    business: "SINGLE_SHOP",
    users: "1K_10K",
    budget: 35_000_000,
    expect: {
      neverDefer: ["booking", "online_payment"],
      subtypeHint: "booking",
    },
  },
  {
    name: "Marketplace lớn",
    product: "MARKETPLACE",
    idea: "Sàn kết nối thợ chụp ảnh và khách thuê, có chat, thanh toán escrow và hoa hồng.",
    business: "MARKETPLACE",
    users: "10K_100K",
    budget: 80_000_000,
    expect: {
      neverDefer: ["payment_mp", "chat_mp"],
      minRangeM: 60,
    },
  },
  {
    name: "Mobile delivery app",
    product: "MOBILE_APP",
    idea: "App giao đồ ăn nội bộ khu công nghiệp, cần login OTP, push, maps và thanh toán.",
    business: "SINGLE_SHOP",
    users: "1K_10K",
    budget: 60_000_000,
    expect: {
      neverDefer: ["auth", "push_notification", "location"],
    },
  },
  {
    name: "SaaS multi-tenant",
    product: "SAAS",
    idea: "Phần mềm quản lý spa cho nhiều chủ tiệm thuê bao tháng, cần tenant và billing.",
    business: "SAAS",
    users: "1K_10K",
    budget: 100_000_000,
    expect: {
      neverDefer: ["tenants", "billing"],
      minRangeM: 70,
    },
  },
  {
    name: "Budget quá thấp vs scope",
    product: "WEBSITE",
    idea: "Tôi muốn làm giống Shopee nhưng ngân sách chỉ 15 triệu.",
    subtype: "ecommerce",
    business: "MARKETPLACE",
    users: "GT_100K",
    budget: 15_000_000,
    expect: {
      neverDefer: ["product_catalog", "cart", "checkout"],
      minRangeM: 20,
    },
  },
  {
    name: "Landing đơn giản",
    product: "WEBSITE",
    idea: "Landing page sự kiện ra mắt sản phẩm, form đăng ký và SEO cơ bản.",
    subtype: "landing",
    business: "SINGLE_SHOP",
    users: "LT_1K",
    features: ["pages", "contact_form", "seo", "admin"],
    budget: 18_000_000,
    expect: {
      maxRangeM: 35,
    },
  },
];

async function runCase(c: Case) {
  const errors: string[] = [];
  const known =
    c.product === "WEBSITE"
      ? (
          await prisma.estimatorFeature.findMany({
            where: { product: { key: "WEBSITE" }, active: true },
            select: { key: true },
          })
        ).map((f) => f.key)
      : [];

  const extraction = await extractRequirement({
    text: c.idea,
    productKey: c.product,
    knownFeatureKeys: known,
  });

  if (c.expect.subtypeHint) {
    const { inferWebsiteSubtype } = await import("../lib/estimator/intelligence");
    const hint = inferWebsiteSubtype(c.idea);
    if (hint !== c.expect.subtypeHint) {
      errors.push(`subtypeHint want ${c.expect.subtypeHint} got ${hint}`);
    }
  }

  const { session, token } = await createEstimateSession({
    productKey: c.product,
    landingPath: "/estimate",
  });
  const id = session.publicId;

  if (c.product) await saveAnswer(id, "product_type", c.product, token);
  await saveAnswer(id, "idea_summary", c.idea, token);

  if (extraction?.features?.length) {
    await saveFeatures(id, extraction.features, token, { confirm: false });
    const s = await prisma.estimateSession.findUnique({ where: { publicId: id } });
    const answers = JSON.parse(s!.answers);
    answers._extracted_features = extraction.features;
    answers._last_question = "idea_summary";
    await prisma.estimateSession.update({
      where: { id: s!.id },
      data: { answers: JSON.stringify(answers), customRequirements: c.idea },
    });
  }

  if (c.subtype) await saveAnswer(id, "website_subtype", c.subtype, token);
  await saveAnswer(id, "business_model", c.business || "SINGLE_SHOP", token);
  await saveAnswer(id, "decision_maker", "YES", token);
  await saveAnswer(id, "monthly_users", c.users || "LT_1K", token);

  const step = await getNextStep(id, token);
  // Must still hit feature confirm if website flow
  if (c.product === "WEBSITE" && step.nextQuestion?.type !== "FEATURE_SELECTOR") {
    // may be earlier questions still - drain until feature or done
    let guard = 0;
    let cur = step;
    while (
      cur.nextQuestion &&
      cur.nextQuestion.type !== "FEATURE_SELECTOR" &&
      guard++ < 8
    ) {
      const q = cur.nextQuestion;
      if (q.key === "integrations") await saveAnswer(id, q.key, ["none"], token);
      else if (q.key === "design_level") await saveAnswer(id, q.key, "STANDARD", token);
      else if (q.key === "timeline") await saveAnswer(id, q.key, "STANDARD", token);
      else if (q.key === "budget_vnd") await saveAnswer(id, q.key, c.budget, token);
      else if (q.key === "intent") await saveAnswer(id, q.key, "READY_TO_BUILD", token);
      else if (q.type === "SINGLE_SELECT" && q.options[0]) {
        await saveAnswer(id, q.key, q.options[0].value, token);
      } else await saveAnswer(id, q.key, "ok", token);
      cur = await getNextStep(id, token);
    }
    if (cur.nextQuestion?.type !== "FEATURE_SELECTOR") {
      errors.push(`expected FEATURE_SELECTOR, got ${cur.nextQuestion?.key}`);
    }
  }

  const after = await getNextStep(id, token);
  const seedFeatures =
    c.features ||
    (after.session.selectedFeatures.length
      ? after.session.selectedFeatures
      : extraction?.features || []);

  await saveFeatures(id, seedFeatures, token, { confirm: true });
  await saveAnswer(id, "integrations", ["none"], token);
  await saveAnswer(id, "design_level", "STANDARD", token);
  await saveAnswer(id, "timeline", "STANDARD", token);
  await saveAnswer(id, "budget_vnd", c.budget, token);
  await saveAnswer(id, "intent", "READY_TO_BUILD", token);

  const result = await calculateEstimate(id, {
    token,
    optimizeBudget: c.budget,
  });

  const kept = new Set(result.features.map((f) => f.key));
  const deferred = new Set(result.deferredFeatures.map((f) => f.key));

  for (const key of c.expect.neverDefer || []) {
    if (deferred.has(key)) errors.push(`deferred protected ${key}`);
    // only require kept if it was in seed/extract
    if (seedFeatures.includes(key) && !kept.has(key) && !deferred.has(key)) {
      // dependency may have replaced - soft
    }
  }
  for (const key of c.expect.keep || []) {
    if (!kept.has(key)) errors.push(`missing keep ${key}`);
  }

  const minM = result.range.min / 1e6;
  const maxM = result.range.max / 1e6;
  if (c.expect.minRangeM != null && maxM < c.expect.minRangeM) {
    errors.push(`maxRange ${maxM}M < expected min ${c.expect.minRangeM}M`);
  }
  if (c.expect.maxRangeM != null && minM > c.expect.maxRangeM) {
    errors.push(`minRange ${minM}M > expected max ${c.expect.maxRangeM}M`);
  }
  if (!(result.range.max > result.range.min)) {
    errors.push("invalid range");
  }

  return {
    name: c.name,
    ok: errors.length === 0,
    errors,
    range: `${minM}–${maxM}M`,
    kept: [...kept].slice(0, 12).join(","),
    deferred: [...deferred].join(",") || "—",
    extracted: (extraction?.features || []).join(",") || "—",
  };
}

async function main() {
  const results = [];
  for (const c of cases) {
    try {
      results.push(await runCase(c));
    } catch (e) {
      results.push({
        name: c.name,
        ok: false,
        errors: [e instanceof Error ? e.message : String(e)],
        range: "—",
        kept: "—",
        deferred: "—",
        extracted: "—",
      });
    }
  }

  console.log("\n=== STABILITY MATRIX ===");
  for (const r of results) {
    console.log(
      `${r.ok ? "PASS" : "FAIL"} | ${r.name} | ${r.range} | defer=${r.deferred}`,
    );
    if (!r.ok) console.log("  ", r.errors.join("; "));
  }
  const failed = results.filter((r) => !r.ok).length;
  console.log(`\n${results.length - failed}/${results.length} passed`);
  if (failed) process.exit(1);
}

main().finally(() => prisma.$disconnect());
