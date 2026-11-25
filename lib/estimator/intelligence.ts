import type { AnswersMap } from "@/lib/estimator/types";

/** Feature keys hợp lệ theo template website — tránh dump cả catalog. */
export const WEBSITE_TEMPLATE_FEATURES: Record<string, string[]> = {
  corporate: [
    "pages",
    "cms_basic",
    "contact_form",
    "blog",
    "seo",
    "admin",
    "roles",
    "chat",
    "ai_assistant",
  ],
  landing: ["pages", "cms_basic", "contact_form", "seo", "admin"],
  ecommerce: [
    "product_catalog",
    "category",
    "variant",
    "search",
    "filter",
    "recommendation",
    "cart",
    "checkout",
    "coupon",
    "flash_sale",
    "customer_account",
    "wishlist",
    "address_book",
    "order",
    "order_tracking",
    "return_refund",
    "online_payment",
    "cod",
    "inventory",
    "multi_branch",
    "loyalty",
    "email_marketing",
    "admin",
    "roles",
    "reporting",
    "chat",
    "ai_assistant",
  ],
  booking: [
    "service_catalog",
    "availability",
    "calendar",
    "booking",
    "customer_account",
    "staff",
    "reminder",
    "cancellation",
    "online_payment",
    "loyalty",
    "multi_branch",
    "admin",
    "roles",
    "reporting",
    "chat",
    "ai_assistant",
  ],
  custom: [], // all
};

/** Từ khóa nhận diện shop / ngành hàng — dùng chung subtype + heuristic extract. */
export const COMMERCE_INTENT_WORDS = [
  "bán hàng",
  "bán online",
  "shop",
  "store",
  "ecommerce",
  "e-commerce",
  "thương mại",
  "giỏ hàng",
  "sản phẩm",
  "catalog",
  "cửa hàng",
  "cửa tiệm",
  "serum",
  "mỹ phẩm",
  "skincare",
  "thời trang",
  "quần áo",
  "giày",
  "túi xách",
  "nội thất",
  "đồ gia dụng",
  "thực phẩm chức năng",
  "bán lẻ",
  "retail",
] as const;

export const BOOKING_INTENT_WORDS = [
  "đặt lịch",
  "booking",
  "appointment",
  "spa",
  "salon",
  "clinic",
  "phòng khám",
  "nail",
] as const;

export function hasCommerceIntent(text: string): boolean {
  const lower = text.toLowerCase();
  return COMMERCE_INTENT_WORDS.some((w) => lower.includes(w));
}

export function hasBookingIntent(text: string): boolean {
  const lower = text.toLowerCase();
  return BOOKING_INTENT_WORDS.some((w) => lower.includes(w));
}

/** Ý tưởng quá ngắn / lạc đề / không đủ để suy ra sản phẩm. */
export function isVagueIdea(text: string): boolean {
  const t = text.trim().toLowerCase();
  if (t.length < 8) return true;
  const noise = /^(asdf|qwer|zxcv|test|xxx|aaa+|123+)/i.test(t.replace(/\s+/g, ""));
  if (noise) return true;
  const offTopic = [
    "ăn phở",
    "thích ăn",
    "sao hỏi",
    "hỏi nhiều",
    "tính giá luôn",
    "không muốn trả lời",
    "bí mật",
    "không nói",
  ].some((w) => t.includes(w));
  if (offTopic && !hasCommerceIntent(t) && !hasBookingIntent(t)) return true;
  return false;
}

export function inferWebsiteSubtype(text: string): string | null {
  const lower = text.toLowerCase();
  if (isVagueIdea(lower) && !hasCommerceIntent(lower) && !hasBookingIntent(lower)) {
    return null;
  }
  const bookingHits = hasBookingIntent(lower);
  const shopHits = hasCommerceIntent(lower);
  if (bookingHits && shopHits) return "ecommerce"; // hybrid → ecommerce + booking features
  if (bookingHits) return "booking";
  if (shopHits) return "ecommerce";
  if (lower.includes("landing") || lower.includes("giới thiệu")) return "landing";
  if (lower.includes("doanh nghiệp") || lower.includes("corporate")) return "corporate";
  // "website X" ngắn: nếu có ngành hàng đã cover ở shopHits; còn lại để user chọn
  return null;
}

/** Core features seed khi đã rõ commerce intent. */
export function commerceCoreFeatures(knownKeys: string[] = []): string[] {
  const core = ["product_catalog", "cart", "checkout", "order", "admin"];
  if (!knownKeys.length) return core;
  return core.filter((k) => knownKeys.includes(k));
}

export function filterFeaturesForTemplate<T extends { key: string }>(
  templateKey: string | null | undefined,
  featureKeys: T[],
  alwaysInclude: string[] = [],
): T[] {
  if (!templateKey || templateKey === "custom") return featureKeys;
  const allow = new Set([
    ...(WEBSITE_TEMPLATE_FEATURES[templateKey] || []),
    ...alwaysInclude,
  ]);
  if (!allow.size) return featureKeys;
  return featureKeys.filter((f) => allow.has(f.key));
}

export function buildConsultantMessage(input: {
  lastQuestionKey?: string | null;
  answers: AnswersMap;
  extractedFeatures?: string[];
  autoAdded?: Array<{ key: string; reason: string }>;
  suggestedSubtype?: string | null;
}): string | null {
  const { lastQuestionKey, answers, extractedFeatures, autoAdded, suggestedSubtype } =
    input;

  if (lastQuestionKey === "idea_summary") {
    const idea = String(answers.idea_summary || "");
    const bits: string[] = [];

    if (isVagueIdea(idea) && !extractedFeatures?.length && !suggestedSubtype) {
      return "Mình chưa nắm rõ bạn muốn làm sản phẩm gì. Ví dụ: website bán mỹ phẩm, đặt lịch spa, hay trang giới thiệu công ty? Trả lời ngắn giúp mình ở bước tiếp theo nhé.";
    }

    if (extractedFeatures?.length) {
      bits.push(
        `Tôi hiểu nhu cầu gồm: ${extractedFeatures
          .slice(0, 6)
          .map((k) => k.replaceAll("_", " "))
          .join(", ")}.`,
      );
    }
    if (suggestedSubtype === "ecommerce") {
      bits.push(
        "Nghe giống website bán hàng / cửa hàng online. Mình sẽ gợi ý catalog → giỏ → checkout; bạn chỉnh lại ở bước xác nhận tính năng.",
      );
    } else if (suggestedSubtype) {
      bits.push(
        `Gợi ý loại website: ${suggestedSubtype}. Bạn xác nhận ở bước tiếp theo nhé.`,
      );
    } else if (!extractedFeatures?.length) {
      bits.push(
        "Mô tả hơi chung — mình cần bạn chọn loại website ở bước sau để ước tính sát hơn.",
      );
    }
    if (
      idea.toLowerCase().includes("app") &&
      idea.toLowerCase().includes("chưa cần")
    ) {
      bits.push("Tạm thời ưu tiên web; mobile app có thể để Phase 2.");
    }
    if (!bits.length) {
      bits.push("Bước tiếp theo mình sẽ chốt subtype và để bạn xác nhận lại tính năng.");
    }
    return bits.join(" ");
  }

  if (lastQuestionKey === "website_subtype") {
    const t = String(answers.website_subtype || "");
    if (t === "ecommerce") {
      return "Ecommerce cần tối thiểu catalog → giỏ → checkout → đơn hàng. Thanh toán online nên giữ nếu bạn muốn thu tiền trên web.";
    }
    if (t === "booking") {
      return "Booking cần lịch trống + đặt lịch + khách hàng. Thanh toán có thể thêm nếu thu tiền cọc.";
    }
  }

  if (lastQuestionKey === "feature_selector" && autoAdded?.length) {
    return `Đã tự thêm dependency bắt buộc: ${autoAdded
      .map((a) => a.key)
      .slice(0, 5)
      .join(", ")}.`;
  }

  if (lastQuestionKey === "budget_vnd") {
    const budget = Number(answers.budget_vnd || 0);
    if (budget > 0 && budget < 25_000_000) {
      return "Ngân sách khá thấp so với sản phẩm có booking + ecommerce + payment. Ở bước estimate, hệ thống sẽ giữ tính năng bạn yêu cầu rõ và chỉ hoãn phần growth.";
    }
  }

  return null;
}

export function extractedFeatureKeys(answers: AnswersMap): string[] {
  const raw = answers._extracted_features;
  if (Array.isArray(raw)) return raw.map(String);
  return [];
}
