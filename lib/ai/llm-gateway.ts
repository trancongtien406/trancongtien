import { z } from "zod";
import { prisma } from "@/lib/db";
import {
  commerceCoreFeatures,
  hasBookingIntent,
  hasCommerceIntent,
  isVagueIdea,
} from "@/lib/estimator/intelligence";

const extractionSchema = z.object({
  intent: z.enum([
    "ADD_FEATURE",
    "CLARIFY",
    "CLASSIFY_PRODUCT",
    "UNKNOWN",
  ]),
  features: z.array(z.string()).default([]),
  productKey: z.string().nullable().optional(),
  requires_followup: z.boolean().default(false),
  followup_topics: z.array(z.string()).default([]),
  confidence: z.number().min(0).max(1).default(0.5),
  technical_review: z.boolean().default(false),
  summary: z.string().optional(),
});

export type ExtractionResult = z.infer<typeof extractionSchema>;

async function resolveLlmConfig() {
  const settings = await prisma.siteSetting.findUnique({
    where: { id: "default" },
  });
  const apiKey =
    settings?.llmApiKey || process.env.LLM_API_KEY || process.env.OPENAI_API_KEY;
  if (!apiKey) return null;
  return {
    provider: settings?.llmProvider || process.env.LLM_PROVIDER || "openai",
    apiKey,
    model: settings?.llmModel || process.env.LLM_MODEL || "gpt-4o-mini",
    baseUrl:
      settings?.llmBaseUrl ||
      process.env.LLM_BASE_URL ||
      "https://api.openai.com/v1",
  };
}

export async function getLlmStatus() {
  const config = await resolveLlmConfig();
  if (!config) {
    return { configured: false as const, mode: "heuristic" as const };
  }
  return {
    configured: true as const,
    mode: "llm" as const,
    provider: config.provider,
    model: config.model,
    baseUrl: config.baseUrl,
  };
}

/**
 * LLM gateway — structured output only. Never sets price.
 */
export async function extractRequirement(input: {
  text: string;
  productKey?: string | null;
  knownFeatureKeys?: string[];
  /** false = heuristic only, không gọi model (rate limit / reuse). */
  allowLlm?: boolean;
}): Promise<ExtractionResult | null> {
  const config = input.allowLlm === false ? null : await resolveLlmConfig();
  if (!config) {
    // Heuristic fallback without LLM
    return heuristicExtract(input.text, input.knownFeatureKeys || []);
  }

  const system = `You are a product analyst. Extract structured software requirements.
Never invent prices, discounts, timelines, or feasibility promises.
Return ONLY JSON matching the schema.
Known feature keys: ${(input.knownFeatureKeys || []).join(", ") || "none"}
Current product: ${input.productKey || "unknown"}`;

  try {
    const response = await fetch(`${config.baseUrl.replace(/\/$/, "")}/chat/completions`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${config.apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: config.model,
        temperature: 0.2,
        response_format: { type: "json_object" },
        messages: [
          { role: "system", content: system },
          { role: "user", content: input.text },
        ],
      }),
      signal: AbortSignal.timeout(20_000),
    });

    if (!response.ok) {
      console.error("[llm] request failed", response.status);
      return heuristicExtract(input.text, input.knownFeatureKeys || []);
    }

    const data = (await response.json()) as {
      choices?: Array<{ message?: { content?: string } }>;
    };
    const content = data.choices?.[0]?.message?.content || "{}";
    const parsed = extractionSchema.safeParse(JSON.parse(content));
    if (!parsed.success) {
      return heuristicExtract(input.text, input.knownFeatureKeys || []);
    }
    // Guardrail: never trust price-like fields if model hallucinates extras
    return parsed.data;
  } catch (error) {
    console.error("[llm] extract failed", error);
    return heuristicExtract(input.text, input.knownFeatureKeys || []);
  }
}

export async function summarizeEstimate(input: {
  productName: string;
  features: string[];
  rangeLabel: string;
  recommendations: string[];
  allowLlm?: boolean;
}): Promise<string> {
  const config = input.allowLlm === false ? null : await resolveLlmConfig();
  const fallback = `Dựa trên nhu cầu của bạn, chúng tôi đề xuất ${input.productName} với các tính năng cốt lõi: ${input.features.slice(0, 8).join(", ")}. Khoảng đầu tư ước tính ${input.rangeLabel}. ${input.recommendations[0] || ""}`.trim();

  if (!config) return fallback;

  try {
    const response = await fetch(`${config.baseUrl.replace(/\/$/, "")}/chat/completions`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${config.apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: config.model,
        temperature: 0.4,
        messages: [
          {
            role: "system",
            content:
              "Viết tóm tắt tư vấn sản phẩm ngắn (3-5 câu tiếng Việt). Không nêu số tiền khác ngoài range đã cho. Không hứa timeline chắc chắn.",
          },
          {
            role: "user",
            content: JSON.stringify(input),
          },
        ],
      }),
      signal: AbortSignal.timeout(20_000),
    });
    if (!response.ok) return fallback;
    const data = (await response.json()) as {
      choices?: Array<{ message?: { content?: string } }>;
    };
    return data.choices?.[0]?.message?.content?.trim() || fallback;
  } catch {
    return fallback;
  }
}

function heuristicExtract(
  text: string,
  knownKeys: string[],
): ExtractionResult {
  const lower = text.toLowerCase();
  const features: string[] = [];
  const dictionary: Record<string, string[]> = {
    online_payment: ["thanh toán", "payment", "vnpay", "momo"],
    chat: ["chat", "nhắn tin", "inbox"],
    booking: ["đặt lịch", "booking", "appointment"],
    inventory: ["kho", "inventory", "tồn kho"],
    loyalty: ["loyalty", "tích điểm", "membership"],
    ai_assistant: ["ai assistant", "chatgpt", "trợ lý ai"],
    push_notification: ["push", "thông báo"],
    multi_branch: ["chi nhánh", "multi branch", "nhiều cửa hàng"],
  };

  // Câu lạc đề / gõ bậy → không bịa feature
  if (isVagueIdea(text) && !hasCommerceIntent(text) && !hasBookingIntent(text)) {
    return {
      intent: "CLARIFY",
      features: [],
      productKey: null,
      requires_followup: true,
      followup_topics: ["product_type", "core_goal"],
      confidence: 0.2,
      technical_review: false,
      summary: text.slice(0, 280),
    };
  }

  for (const [key, words] of Object.entries(dictionary)) {
    if (!knownKeys.length || knownKeys.includes(key)) {
      if (words.some((w) => lower.includes(w))) features.push(key);
    }
  }

  // Ecommerce intent (gồm ngành hàng: mỹ phẩm, serum, thời trang…)
  if (hasCommerceIntent(text)) {
    for (const key of commerceCoreFeatures(knownKeys)) {
      if (!features.includes(key)) features.push(key);
    }
  }

  if (hasBookingIntent(text)) {
    for (const key of ["booking", "availability", "calendar"]) {
      if ((!knownKeys.length || knownKeys.includes(key)) && !features.includes(key)) {
        features.push(key);
      }
    }
  }

  let productKey: string | null = null;
  if (lower.includes("marketplace") || lower.includes("sàn")) productKey = "MARKETPLACE";
  else if (lower.includes("saas")) productKey = "SAAS";
  else if (
    (lower.includes("app") || lower.includes("ứng dụng")) &&
    !lower.includes("website")
  ) {
    productKey = "MOBILE_APP";
  } else if (
    lower.includes("website") ||
    lower.includes("web ") ||
    hasCommerceIntent(text) ||
    hasBookingIntent(text)
  ) {
    productKey = "WEBSITE";
  }

  return {
    intent: features.length ? "ADD_FEATURE" : "CLARIFY",
    features,
    productKey,
    requires_followup: features.length === 0,
    followup_topics: features.length ? [] : ["product_type", "core_goal"],
    confidence: features.length ? 0.78 : 0.4,
    technical_review: features.includes("ai_assistant"),
    summary: text.slice(0, 280),
  };
}
