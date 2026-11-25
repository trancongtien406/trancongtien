"use client";

import { useMemo, useState } from "react";
import {
  LLM_PROVIDERS,
  defaultModelForProvider,
  getLlmProvider,
} from "@/lib/ai/llm-presets";

const selectClass =
  "h-11 w-full rounded-xl border border-slate-200 bg-white px-3 text-sm text-slate-800 outline-none transition focus:border-brand focus:ring-2 focus:ring-brand/20";
const inputClass =
  "h-11 w-full rounded-xl border border-slate-200 bg-white px-3 text-sm text-slate-800 outline-none transition focus:border-brand focus:ring-2 focus:ring-brand/20";

export function LlmSettingsFields({
  provider: initialProvider,
  model: initialModel,
  baseUrl: initialBaseUrl,
  hasApiKey,
}: {
  provider?: string | null;
  model?: string | null;
  baseUrl?: string | null;
  hasApiKey: boolean;
}) {
  const [provider, setProvider] = useState(initialProvider || "openai");
  const preset = useMemo(() => getLlmProvider(provider), [provider]);
  const [model, setModel] = useState(() => {
    const p = getLlmProvider(initialProvider || "openai");
    const fromList = p.models.some((m) => m.value === initialModel);
    return fromList ? initialModel || p.models[0].value : initialModel || p.models[0].value;
  });
  const [baseUrl, setBaseUrl] = useState(
    initialBaseUrl || getLlmProvider(initialProvider || "openai").baseUrl,
  );
  const [customModel, setCustomModel] = useState(
    () =>
      (initialModel &&
      !getLlmProvider(initialProvider || "openai").models.some(
        (m) => m.value === initialModel,
      )
        ? initialModel
        : "") || "",
  );

  function onProviderChange(next: string) {
    setProvider(next);
    const p = getLlmProvider(next);
    setModel(defaultModelForProvider(next));
    setCustomModel("");
    if (p.baseUrl) setBaseUrl(p.baseUrl);
  }

  const modelOptions = preset.models;
  const isCustomProvider = provider === "custom";
  const showCustomModel =
    isCustomProvider || model === "custom-model" || Boolean(customModel);

  return (
    <div className="space-y-4">
      <p className="text-sm leading-6 text-slate-500">
        Chỉ dùng để extract requirement và tóm tắt Product Plan. LLM{" "}
        <span className="font-semibold text-slate-700">không được set giá</span>
        — Pricing Engine vẫn quyết định khoảng đầu tư.
      </p>

      <div className="grid gap-4 sm:grid-cols-2">
        <div className="space-y-1.5">
          <label
            htmlFor="llmProvider"
            className="block text-sm font-semibold text-slate-800"
          >
            Provider
          </label>
          <select
            id="llmProvider"
            name="llmProvider"
            value={provider}
            onChange={(e) => onProviderChange(e.target.value)}
            className={selectClass}
          >
            {LLM_PROVIDERS.map((item) => (
              <option key={item.value} value={item.value}>
                {item.label}
              </option>
            ))}
          </select>
        </div>

        <div className="space-y-1.5">
          <label
            htmlFor="llmModel"
            className="block text-sm font-semibold text-slate-800"
          >
            Model
          </label>
          <select
            id="llmModelSelect"
            value={showCustomModel && !isCustomProvider ? "custom-model" : model}
            onChange={(e) => {
              const v = e.target.value;
              setModel(v);
              if (v !== "custom-model") setCustomModel("");
            }}
            className={selectClass}
          >
            {modelOptions.map((item) => (
              <option key={item.value} value={item.value}>
                {item.label}
              </option>
            ))}
            {!isCustomProvider ? (
              <option value="custom-model">Model tuỳ chỉnh…</option>
            ) : null}
          </select>
          {/* Hidden field always submitted */}
          <input
            type="hidden"
            name="llmModel"
            value={
              showCustomModel && customModel
                ? customModel
                : model === "custom-model"
                  ? customModel || defaultModelForProvider(provider)
                  : model
            }
          />
        </div>

        {showCustomModel ? (
          <div className="space-y-1.5 sm:col-span-2">
            <label
              htmlFor="llmCustomModel"
              className="block text-sm font-semibold text-slate-800"
            >
              Tên model tuỳ chỉnh
            </label>
            <input
              id="llmCustomModel"
              value={customModel}
              onChange={(e) => setCustomModel(e.target.value)}
              placeholder="vd. gpt-4o-mini hoặc tên model trên proxy"
              className={inputClass}
            />
          </div>
        ) : null}

        <div className="space-y-1.5 sm:col-span-2">
          <label
            htmlFor="llmBaseUrl"
            className="block text-sm font-semibold text-slate-800"
          >
            Base URL (OpenAI-compatible)
          </label>
          <input
            id="llmBaseUrl"
            name="llmBaseUrl"
            value={baseUrl}
            onChange={(e) => setBaseUrl(e.target.value)}
            placeholder="https://api.openai.com/v1"
            className={inputClass}
          />
          <p className="text-xs text-slate-500">
            Đổi provider sẽ điền sẵn URL. Chỉ sửa khi dùng proxy / custom endpoint.
          </p>
        </div>

        <div className="space-y-1.5 sm:col-span-2">
          <label
            htmlFor="llmApiKey"
            className="block text-sm font-semibold text-slate-800"
          >
            API Key
          </label>
          {hasApiKey ? <input type="hidden" name="keepLlmApiKey" value="1" /> : null}
          <input
            id="llmApiKey"
            name="llmApiKey"
            type="password"
            autoComplete="new-password"
            placeholder={
              hasApiKey ? "•••••••• (để trống nếu giữ nguyên)" : "sk-…"
            }
            className={inputClass}
          />
          {hasApiKey ? (
            <p className="text-xs text-emerald-600">
              Đã lưu — nhập giá trị mới để ghi đè.
            </p>
          ) : (
            <p className="text-xs text-slate-500">
              Để trống nếu dùng biến môi trường <code>LLM_API_KEY</code>.
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
