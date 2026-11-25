/** Presets cho Settings + admin playground. */

export const LLM_PROVIDERS = [
  {
    value: "openai",
    label: "OpenAI",
    baseUrl: "https://api.openai.com/v1",
    models: [
      { value: "gpt-4o-mini", label: "GPT-4o mini (khuyến nghị)" },
      { value: "gpt-4o", label: "GPT-4o" },
      { value: "gpt-4.1-mini", label: "GPT-4.1 mini" },
      { value: "gpt-4.1", label: "GPT-4.1" },
      { value: "o4-mini", label: "o4-mini" },
    ],
  },
  {
    value: "gemini",
    label: "Google Gemini (OpenAI-compatible)",
    baseUrl: "https://generativelanguage.googleapis.com/v1beta/openai",
    models: [
      { value: "gemini-2.0-flash", label: "Gemini 2.0 Flash" },
      { value: "gemini-2.5-flash", label: "Gemini 2.5 Flash" },
      { value: "gemini-2.5-pro", label: "Gemini 2.5 Pro" },
    ],
  },
  {
    value: "anthropic",
    label: "Anthropic (OpenAI-compatible proxy)",
    baseUrl: "https://api.anthropic.com/v1",
    models: [
      { value: "claude-sonnet-4-20250514", label: "Claude Sonnet 4" },
      { value: "claude-3-5-haiku-latest", label: "Claude 3.5 Haiku" },
    ],
  },
  {
    value: "custom",
    label: "Custom / OpenAI-compatible",
    baseUrl: "",
    models: [
      { value: "custom-model", label: "Nhập model bên dưới (custom)" },
    ],
  },
] as const;

export type LlmProviderValue = (typeof LLM_PROVIDERS)[number]["value"];

export function getLlmProvider(value: string | null | undefined) {
  return (
    LLM_PROVIDERS.find((p) => p.value === value) || LLM_PROVIDERS[0]
  );
}

export function defaultModelForProvider(provider: string) {
  const p = getLlmProvider(provider);
  return p.models[0]?.value || "gpt-4o-mini";
}
