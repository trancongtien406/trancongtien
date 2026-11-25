import type { AnswersMap } from "@/lib/estimator/types";

export type ArchitecturePick = {
  key: string;
  name: string;
  stack: string[];
  notes: string[];
};

const TEMPLATES: ArchitecturePick[] = [
  {
    key: "standard_website",
    name: "Standard Website",
    stack: ["Next.js", "API Routes", "PostgreSQL", "Object Storage"],
    notes: [],
  },
  {
    key: "ecommerce",
    name: "E-commerce Platform",
    stack: [
      "Next.js",
      "Node API",
      "PostgreSQL",
      "Redis (optional)",
      "Object Storage",
      "Payment Gateway",
      "Email",
    ],
    notes: [],
  },
  {
    key: "booking",
    name: "Booking System",
    stack: ["Next.js", "Node API", "PostgreSQL", "Calendar engine", "Email/SMS"],
    notes: [],
  },
  {
    key: "realtime_app",
    name: "Realtime Application",
    stack: ["Flutter / Web", "API", "PostgreSQL", "Redis", "WebSocket", "Push"],
    notes: [],
  },
  {
    key: "ai_application",
    name: "AI Application",
    stack: ["Web / Mobile", "Backend", "LLM Gateway", "PostgreSQL", "Vector store (optional)", "Redis"],
    notes: ["Cần technical review cho AI scope"],
  },
  {
    key: "marketplace",
    name: "Marketplace",
    stack: [
      "Next.js / Mobile",
      "API",
      "PostgreSQL",
      "Payment & escrow",
      "Object Storage",
      "Moderation tools",
    ],
    notes: [],
  },
  {
    key: "saas",
    name: "SaaS Multi-tenant",
    stack: ["Next.js", "API", "PostgreSQL", "Tenant isolation", "Billing", "Observability"],
    notes: ["Multi-tenant tăng complexity đáng kể"],
  },
];

export function pickArchitecture(input: {
  productKey?: string | null;
  templateKey?: string | null;
  answers: AnswersMap;
  selectedFeatures: string[];
  dbTemplates?: Array<{ key: string; name: string; stack: string; conditions: string; active: boolean }>;
}): ArchitecturePick {
  const { answers, selectedFeatures, productKey, templateKey } = input;
  const users = String(answers.monthly_users || "LT_1K");
  const notes: string[] = [];

  let pick =
    TEMPLATES.find((t) => t.key === "standard_website") || TEMPLATES[0];

  if (templateKey === "ecommerce" || productKey === "WEBSITE" && answers.website_subtype === "ECOMMERCE") {
    pick = TEMPLATES.find((t) => t.key === "ecommerce")!;
  }
  if (templateKey === "booking" || answers.website_subtype === "BOOKING") {
    pick = TEMPLATES.find((t) => t.key === "booking")!;
  }
  if (productKey === "MARKETPLACE" || answers.business_model === "MARKETPLACE") {
    pick = TEMPLATES.find((t) => t.key === "marketplace")!;
  }
  if (productKey === "SAAS" || answers.business_model === "SAAS") {
    pick = TEMPLATES.find((t) => t.key === "saas")!;
  }
  if (productKey === "MOBILE_APP" || selectedFeatures.includes("realtime") || answers.needs_realtime === true) {
    pick = TEMPLATES.find((t) => t.key === "realtime_app")!;
  }
  if (productKey === "AI_SOLUTION" || answers.needs_ai === true || selectedFeatures.includes("ai_assistant")) {
    pick = TEMPLATES.find((t) => t.key === "ai_application")!;
  }

  const stack = [...pick.stack];
  if (users === "GT_100K" || users === "10K_100K") {
    if (!stack.includes("CDN")) stack.push("CDN");
    if (!stack.includes("Monitoring")) stack.push("Monitoring");
    notes.push("Scale cao — cần CDN, cache và load testing");
  }
  if (selectedFeatures.includes("online_payment") || selectedFeatures.includes("payment")) {
    if (!stack.includes("Payment Gateway")) stack.push("Payment Gateway");
  }

  for (const t of input.dbTemplates || []) {
    if (!t.active) continue;
    try {
      const conditions = JSON.parse(t.conditions) as Record<string, string>;
      const match = Object.entries(conditions).every(
        ([k, v]) => String(answers[k] ?? productKey ?? "") === v,
      );
      if (match) {
        return {
          key: t.key,
          name: t.name,
          stack: JSON.parse(t.stack) as string[],
          notes,
        };
      }
    } catch {
      // ignore bad template
    }
  }

  return { ...pick, stack, notes: [...pick.notes, ...notes] };
}
