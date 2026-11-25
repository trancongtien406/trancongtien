import { afterEach, describe, expect, it } from "vitest";
import {
  ABUSE_LIMITS,
  consumeRateLimit,
  getClientIp,
  limitLlmCall,
  limitSessionCreate,
  resetAbuseWindows,
} from "../lib/estimator/abuse";
import { parseEstCookie } from "../lib/estimator/cookie";
import { resolveFeatureDependencies } from "../lib/estimator/dependencies";
import {
  buildConsultantMessage,
  hasCommerceIntent,
  inferWebsiteSubtype,
  isVagueIdea,
} from "../lib/estimator/intelligence";
import { optimizeForBudget } from "../lib/estimator/optimizer";
import { calculatePricing, isLeanScope, type PricingConfig } from "../lib/estimator/pricing";
import { evaluateRule } from "../lib/estimator/rules";
import { scoreLead } from "../lib/estimator/scoring";
import { buildRoadmap, estimateTimelineWeeks } from "../lib/estimator/timeline";

const config: PricingConfig = {
  unitValueVnd: 1_000_000,
  minimumProjectVnd: 8_000_000,
  riskBufferLow: 0.05,
  riskBufferMedium: 0.1,
  riskBufferHigh: 0.2,
  rushCoefficient: 1.25,
  rangePadding: 0.12,
  businessModelCoeffs: {
    SINGLE_SHOP: 1,
    MULTI_BRANCH: 1.2,
    MARKETPLACE: 1.5,
    SAAS: 1.7,
  },
  scaleCoeffs: {
    LT_1K: 1,
    "1K_10K": 1.15,
    "10K_100K": 1.35,
    GT_100K: 1.6,
  },
};

const ecommerceFeatures = [
  { id: "1", key: "product_catalog", name: "Catalog", priority: "MUST_HAVE", complexity: "MEDIUM", baseUnits: 5, technicalRisk: "LOW", optional: false },
  { id: "2", key: "cart", name: "Cart", priority: "MUST_HAVE", complexity: "MEDIUM", baseUnits: 4, technicalRisk: "LOW", optional: false },
  { id: "3", key: "checkout", name: "Checkout", priority: "MUST_HAVE", complexity: "MEDIUM", baseUnits: 5, technicalRisk: "LOW", optional: false },
  { id: "4", key: "order", name: "Order", priority: "MUST_HAVE", complexity: "MEDIUM", baseUnits: 5, technicalRisk: "LOW", optional: false },
  { id: "5", key: "admin", name: "Admin", priority: "MUST_HAVE", complexity: "MEDIUM", baseUnits: 5, technicalRisk: "LOW", optional: false },
  { id: "6", key: "online_payment", name: "Payment", priority: "SHOULD_HAVE", complexity: "MEDIUM", baseUnits: 5, technicalRisk: "MEDIUM", optional: true },
  { id: "7", key: "wishlist", name: "Wishlist", priority: "NICE_TO_HAVE", complexity: "LOW", baseUnits: 2, technicalRisk: "LOW", optional: true },
  { id: "8", key: "customer_account", name: "Account", priority: "SHOULD_HAVE", complexity: "MEDIUM", baseUnits: 4, technicalRisk: "LOW", optional: true },
  { id: "9", key: "loyalty", name: "Loyalty", priority: "GROWTH", complexity: "MEDIUM", baseUnits: 5, technicalRisk: "LOW", optional: true },
  { id: "10", key: "coupon", name: "Coupon", priority: "NICE_TO_HAVE", complexity: "LOW", baseUnits: 3, technicalRisk: "LOW", optional: true },
];

describe("feature dependencies", () => {
  it("auto-adds REQUIRES transitively", () => {
    const result = resolveFeatureDependencies(
      ["wishlist", "online_payment"],
      ecommerceFeatures,
      [
        { fromKey: "wishlist", toKey: "customer_account", type: "REQUIRES", message: null },
        { fromKey: "online_payment", toKey: "checkout", type: "REQUIRES", message: null },
        { fromKey: "checkout", toKey: "cart", type: "REQUIRES", message: null },
        { fromKey: "cart", toKey: "product_catalog", type: "REQUIRES", message: null },
      ],
    );
    expect(result.selected).toContain("customer_account");
    expect(result.selected).toContain("checkout");
    expect(result.selected).toContain("cart");
    expect(result.selected).toContain("product_catalog");
    expect(result.autoAdded.length).toBeGreaterThan(0);
  });
});

describe("pricing engine golden cases", () => {
  it("website giới thiệu (core only) khoảng 10–15M", () => {
    const siteFeatures = [
      { id: "1", key: "pages", name: "Pages", priority: "MUST_HAVE", complexity: "MEDIUM", baseUnits: 3, technicalRisk: "LOW", optional: false },
      { id: "2", key: "cms_basic", name: "CMS", priority: "MUST_HAVE", complexity: "MEDIUM", baseUnits: 4, technicalRisk: "LOW", optional: false },
      { id: "3", key: "contact_form", name: "Contact", priority: "MUST_HAVE", complexity: "LOW", baseUnits: 2, technicalRisk: "LOW", optional: false },
      { id: "4", key: "admin", name: "Admin", priority: "MUST_HAVE", complexity: "MEDIUM", baseUnits: 5, technicalRisk: "LOW", optional: false },
      { id: "5", key: "blog", name: "Blog", priority: "NICE_TO_HAVE", complexity: "MEDIUM", baseUnits: 4, technicalRisk: "LOW", optional: true },
    ];
    const pricing = calculatePricing({
      baseUnits: 8,
      features: siteFeatures,
      selectedKeys: ["pages", "cms_basic", "contact_form", "admin"],
      coreFeatureKeys: ["pages", "cms_basic", "contact_form", "admin"],
      productKey: "WEBSITE",
      answers: {
        business_model: "SINGLE_SHOP",
        monthly_users: "1K_10K",
        design_level: "PREMIUM",
        timeline: "STANDARD",
      },
      config,
    });
    expect(pricing.internalAmount).toBeGreaterThanOrEqual(8_000_000);
    expect(pricing.internalAmount).toBeLessThanOrEqual(15_000_000);
  });

  it("ecommerce core (như EST-647883DE) khoảng 15M", () => {
    const pricing = calculatePricing({
      baseUnits: 8,
      features: ecommerceFeatures.concat([
        {
          id: "11",
          key: "category",
          name: "Category",
          priority: "MUST_HAVE",
          complexity: "LOW",
          baseUnits: 2,
          technicalRisk: "LOW",
          optional: false,
        },
      ]),
      selectedKeys: [
        "product_catalog",
        "category",
        "cart",
        "checkout",
        "order",
        "admin",
      ],
      coreFeatureKeys: [
        "product_catalog",
        "category",
        "cart",
        "checkout",
        "order",
        "admin",
      ],
      productKey: "WEBSITE",
      answers: {
        business_model: "SINGLE_SHOP",
        monthly_users: "LT_1K",
        design_level: "STANDARD",
        timeline: "STANDARD",
      },
      config,
    });
    expect(pricing.internalAmount).toBeGreaterThanOrEqual(13_000_000);
    expect(pricing.internalAmount).toBeLessThanOrEqual(17_000_000);
  });

  it("mobile core khoảng 20M; thêm realtime thì tăng rõ", () => {
    const mobileFeatures = [
      { id: "a", key: "auth", name: "Auth", priority: "MUST_HAVE", complexity: "MEDIUM", baseUnits: 4, technicalRisk: "LOW", optional: false },
      { id: "h", key: "home", name: "Home", priority: "MUST_HAVE", complexity: "MEDIUM", baseUnits: 3, technicalRisk: "LOW", optional: false },
      { id: "p", key: "profile", name: "Profile", priority: "MUST_HAVE", complexity: "MEDIUM", baseUnits: 3, technicalRisk: "LOW", optional: false },
      { id: "n", key: "push_notification", name: "Push", priority: "SHOULD_HAVE", complexity: "MEDIUM", baseUnits: 4, technicalRisk: "MEDIUM", optional: true },
      { id: "b", key: "admin_api", name: "API", priority: "MUST_HAVE", complexity: "MEDIUM", baseUnits: 6, technicalRisk: "LOW", optional: false },
      { id: "r", key: "realtime", name: "Realtime", priority: "GROWTH", complexity: "HIGH", baseUnits: 7, technicalRisk: "HIGH", optional: true },
    ];
    const core = ["auth", "home", "profile", "push_notification", "admin_api"];
    const lean = calculatePricing({
      baseUnits: 8,
      features: mobileFeatures,
      selectedKeys: core,
      coreFeatureKeys: core,
      productKey: "MOBILE_APP",
      answers: {
        business_model: "SINGLE_SHOP",
        monthly_users: "1K_10K",
        design_level: "PREMIUM",
        timeline: "STANDARD",
      },
      config,
    });
    expect(isLeanScope(core, core)).toBe(true);
    expect(lean.internalAmount).toBeGreaterThanOrEqual(18_000_000);
    expect(lean.internalAmount).toBeLessThanOrEqual(22_000_000);

    const full = calculatePricing({
      baseUnits: 8,
      features: mobileFeatures,
      selectedKeys: [...core, "realtime"],
      coreFeatureKeys: core,
      productKey: "MOBILE_APP",
      answers: {
        business_model: "SINGLE_SHOP",
        monthly_users: "1K_10K",
        design_level: "PREMIUM",
        timeline: "STANDARD",
      },
      config,
    });
    expect(full.internalAmount).toBeGreaterThan(lean.internalAmount + 15_000_000);
  });

  it("ecommerce có thanh toán không còn là MVP — đắt hơn core", () => {
    const pricing = calculatePricing({
      baseUnits: 8,
      features: ecommerceFeatures,
      selectedKeys: [
        "product_catalog",
        "cart",
        "checkout",
        "order",
        "admin",
        "online_payment",
      ],
      coreFeatureKeys: ["product_catalog", "category", "cart", "checkout", "order", "admin"],
      productKey: "WEBSITE",
      answers: {
        business_model: "SINGLE_SHOP",
        monthly_users: "LT_1K",
        design_level: "STANDARD",
        timeline: "STANDARD",
      },
      config,
    });
    expect(pricing.internalAmount).toBeGreaterThanOrEqual(32_000_000);
    expect(pricing.maxAmount).toBeLessThanOrEqual(55_000_000);
  });

  it("marketplace scale increases price", () => {
    const small = calculatePricing({
      baseUnits: 45,
      features: ecommerceFeatures,
      selectedKeys: ["product_catalog", "cart", "checkout", "order", "admin"],
      answers: { business_model: "SINGLE_SHOP", monthly_users: "LT_1K" },
      config,
    });
    const market = calculatePricing({
      baseUnits: 45,
      features: ecommerceFeatures,
      selectedKeys: ["product_catalog", "cart", "checkout", "order", "admin"],
      answers: { business_model: "MARKETPLACE", monthly_users: "10K_100K" },
      config,
    });
    expect(market.internalAmount).toBeGreaterThan(small.internalAmount);
  });
});

describe("budget optimizer", () => {
  it("defers nice/growth but keeps core", () => {
    const result = optimizeForBudget({
      budgetVnd: 28_000_000,
      baseUnits: 8,
      features: ecommerceFeatures,
      selectedKeys: ecommerceFeatures.map((f) => f.key),
      coreFeatureKeys: ["product_catalog", "cart", "checkout", "order", "admin"],
      answers: { business_model: "SINGLE_SHOP", monthly_users: "LT_1K" },
      config,
    });
    expect(result.selected).toEqual(
      expect.arrayContaining([
        "product_catalog",
        "cart",
        "checkout",
        "order",
        "admin",
      ]),
    );
    expect(result.deferred.length).toBeGreaterThan(0);
    expect(result.deferred).not.toContain("product_catalog");
  });

  it("không bỏ tính năng khách đã yêu cầu rõ", () => {
    const result = optimizeForBudget({
      budgetVnd: 25_000_000,
      baseUnits: 18,
      features: ecommerceFeatures,
      selectedKeys: ecommerceFeatures.map((f) => f.key),
      coreFeatureKeys: ["product_catalog", "cart", "checkout", "order", "admin"],
      protectedFeatureKeys: ["online_payment", "loyalty"],
      answers: { business_model: "SINGLE_SHOP", monthly_users: "LT_1K" },
      config,
    });
    expect(result.selected).toEqual(
      expect.arrayContaining(["online_payment", "loyalty"]),
    );
    expect(result.deferred).not.toContain("online_payment");
    expect(result.deferred).not.toContain("loyalty");
  });
});

describe("rules", () => {
  it("evaluates SHOW conditions", () => {
    expect(
      evaluateRule(
        {
          conditions: [
            { field: "product_type", operator: "equals", value: "WEBSITE" },
          ],
          actions: [{ type: "SHOW_QUESTION", target: "website_subtype" }],
        },
        { product_type: "WEBSITE" },
      ),
    ).toBe(true);
  });
});

describe("scoring & timeline", () => {
  it("scores HOT when budget + contact + completion", () => {
    const scored = scoreLead({
      answers: {
        timeline: "STANDARD",
        decision_maker: "YES",
        intent: "READY_TO_BUILD",
      },
      hasContact: true,
      completionRatio: 0.95,
      budgetVnd: 50_000_000,
      estimateMin: 40_000_000,
    });
    expect(scored.band).toBe("HOT");
    expect(scored.score).toBeGreaterThanOrEqual(80);
  });

  it("builds roadmap phases", () => {
    const roadmap = buildRoadmap({
      productKey: "WEBSITE",
      selectedFeatures: ecommerceFeatures.filter((f) =>
        ["product_catalog", "cart", "admin", "loyalty"].includes(f.key),
      ),
      deferredFeatures: ecommerceFeatures.filter((f) => f.key === "coupon"),
    });
    expect(roadmap.length).toBeGreaterThanOrEqual(3);
    const weeks = estimateTimelineWeeks({
      selectedFeatures: ecommerceFeatures.slice(0, 5),
      answers: { timeline: "STANDARD" },
    });
    expect(weeks.max).toBeGreaterThan(weeks.min);
  });
});

describe("idea understanding", () => {
  it("hiểu website mỹ phẩm là ecommerce", () => {
    expect(hasCommerceIntent("tôi muốn làm website mỹ phẩm")).toBe(true);
    expect(inferWebsiteSubtype("tôi muốn làm website mỹ phẩm")).toBe("ecommerce");
    expect(isVagueIdea("tôi muốn làm website mỹ phẩm")).toBe(false);
  });

  it("không bịa ý từ câu lạc đề / bức xúc", () => {
    expect(inferWebsiteSubtype("tôi thích ăn phở bò tái")).toBeNull();
    expect(isVagueIdea("sao hỏi nhiều thế không tính giá luôn đi")).toBe(true);
    expect(inferWebsiteSubtype("asdf qwer zxcv 123!!!")).toBeNull();
  });

  it("bot hỏi lại khi ý tưởng mơ hồ", () => {
    const msg = buildConsultantMessage({
      lastQuestionKey: "idea_summary",
      answers: { idea_summary: "tôi thích ăn phở" },
      extractedFeatures: [],
      suggestedSubtype: null,
    });
    expect(msg || "").toMatch(/chưa nắm|ví dụ/i);
  });
});

describe("estimator abuse + session cookie", () => {
  afterEach(() => {
    resetAbuseWindows();
  });

  it("parseEstCookie chỉ nhận publicId.token", () => {
    expect(parseEstCookie("EST-ABC.tokensecret")).toEqual({
      publicId: "EST-ABC",
      token: "tokensecret",
    });
    expect(parseEstCookie("")).toBeNull();
    expect(parseEstCookie("EST-ONLY")).toBeNull();
  });

  it("chặn tạo quá nhiều phiên / gọi LLM theo IP", () => {
    const ip = "203.0.113.10";
    for (let i = 0; i < ABUSE_LIMITS.sessionCreatePerIpDay; i += 1) {
      expect(limitSessionCreate(ip).ok).toBe(true);
    }
    expect(limitSessionCreate(ip).ok).toBe(false);

    for (let i = 0; i < ABUSE_LIMITS.llmPerIpHour; i += 1) {
      expect(limitLlmCall(ip).ok).toBe(true);
    }
    expect(limitLlmCall(ip).ok).toBe(false);
  });

  it("cửa sổ rate limit hết hạn thì cho qua lại", () => {
    const now = 1_700_000_000_000;
    expect(consumeRateLimit("t", 1, 1000, now).ok).toBe(true);
    expect(consumeRateLimit("t", 1, 1000, now + 200).ok).toBe(false);
    expect(consumeRateLimit("t", 1, 1000, now + 1200).ok).toBe(true);
  });

  it("đọc IP từ x-forwarded-for", () => {
    const request = new Request("https://trancongtien.com/api/estimator/session", {
      headers: { "x-forwarded-for": "198.51.100.2, 10.0.0.1" },
    });
    expect(getClientIp(request)).toBe("198.51.100.2");
  });
});
