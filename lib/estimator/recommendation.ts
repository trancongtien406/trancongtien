import { evaluateRule, parseRuleDefinition, type RuleDefinition } from "@/lib/estimator/rules";
import type { AnswersMap } from "@/lib/estimator/types";

export type Recommendation = {
  key: string;
  title: string;
  body: string;
};

type BuiltInRule = {
  key: string;
  title: string;
  body: string;
  when: (answers: AnswersMap, features: string[]) => boolean;
};

const BUILTIN: BuiltInRule[] = [
  {
    key: "web_over_app",
    title: "Nên bắt đầu bằng Responsive Website",
    body: "Với mức sử dụng và tính năng hiện tại, mobile app chưa mang lại đủ lợi ích so với chi phí. Responsive web giúp ra mắt nhanh hơn.",
    when: (a, f) =>
      (a.product_type === "MOBILE_APP" || a.want_mobile === true) &&
      !f.includes("push_notification") &&
      !f.includes("offline") &&
      !f.includes("location") &&
      a.frequent_use !== true,
  },
  {
    key: "single_tenant_first",
    title: "Single-tenant trước, multi-tenant sau",
    body: "SaaS multi-tenant tăng chi phí và độ phức tạp đáng kể. Nếu đang vận hành một doanh nghiệp, nên bắt đầu single-tenant.",
    when: (a) =>
      a.business_model === "SAAS" || a.business_model === "MULTI_TENANT",
  },
  {
    key: "monolith_first",
    title: "Monolith trước khi microservices",
    body: "Ở quy mô hiện tại, modular monolith đủ để ship nhanh, giảm chi phí vận hành. Microservices nên cân nhắc khi team và traffic đủ lớn.",
    when: (a) =>
      String(a.monthly_users || "LT_1K") === "LT_1K" ||
      String(a.monthly_users) === "1K_10K",
  },
  {
    key: "polling_over_realtime",
    title: "Polling thay vì realtime đầy đủ",
    body: "Nếu không cần cập nhật tức thì dưới vài giây, polling hoặc SSE đơn giản sẽ rẻ và ổn định hơn WebSocket/realtime stack.",
    when: (a, f) => f.includes("chat") && a.needs_realtime !== true,
  },
  {
    key: "rule_over_ai",
    title: "Rule-based trước AI",
    body: "Nhiều bài toán 'AI tư vấn' có thể bắt đầu bằng rule + catalog. Chỉ thêm LLM khi dữ liệu và use-case đã rõ.",
    when: (a) => a.needs_ai === true || a.wants_ai === "YES",
  },
];

export function buildRecommendations(input: {
  answers: AnswersMap;
  selectedFeatures: string[];
  dbRules?: Array<{ key: string; name: string; definition: string; active: boolean }>;
}): Recommendation[] {
  const out: Recommendation[] = [];

  for (const rule of BUILTIN) {
    if (rule.when(input.answers, input.selectedFeatures)) {
      out.push({ key: rule.key, title: rule.title, body: rule.body });
    }
  }

  for (const rule of input.dbRules || []) {
    if (!rule.active) continue;
    const def = parseRuleDefinition(rule.definition) as
      | (RuleDefinition & { title?: string; body?: string })
      | null;
    if (!def) continue;
    if (!evaluateRule(def, input.answers)) continue;
    const recAction = def.actions.find((a) => a.type === "RECOMMEND");
    out.push({
      key: rule.key,
      title: (recAction?.payload?.title as string) || rule.name,
      body:
        (recAction?.payload?.body as string) ||
        (def as { body?: string }).body ||
        rule.name,
    });
  }

  return out;
}
