"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { ArrowRight, Check, Loader2, RefreshCw, SendHorizontal, Sparkles, X } from "lucide-react";
import { AssistantBotIcon } from "@/components/floating/AssistantBotIcon";
import { Button } from "@/components/common/Button";
import { EstimateResultView } from "@/features/estimator/EstimateResultView";
import type { AnswerValue, EstimateResultPublic } from "@/lib/estimator/types";
import { isValidEmail, isValidVnPhone } from "@/lib/validation";
import { cn } from "@/lib/utils";

type QuestionOption = {
  value: string;
  label: string;
  meta?: Record<string, unknown>;
};

type NextQuestion = {
  key: string;
  type: string;
  section: string;
  title: string;
  description: string | null;
  required: boolean;
  config: Record<string, unknown>;
  options: QuestionOption[];
};

type FeatureItem = {
  key: string;
  name: string;
  description: string | null;
  category: string | null;
  complexity: string;
  priority: string;
  optional: boolean;
  baseUnits: number;
};

type ProgressState = {
  percent: number;
  answered: number;
  total: number;
  sections: Array<{
    key: string;
    label: string;
    order: number;
    done: boolean;
  }>;
};

type StepResponse = {
  session: {
    publicId: string;
    shareCode: string;
    status: string;
    selectedFeatures: string[];
    hasLead: boolean;
  };
  progress: ProgressState;
  nextQuestion: NextQuestion | null;
  features: FeatureItem[];
  done: boolean;
  dependency?: {
    selected: string[];
    autoAdded: Array<{ key: string; reason: string }>;
    conflicts: Array<{ a: string; b: string; message: string }>;
    recommendations: Array<{ key: string; reason: string }>;
  };
  botMessage?: string | null;
  error?: string;
  history?: Array<{
    key: string;
    type: string;
    section: string;
    title: string;
    description: string | null;
    label: string;
  }>;
};

type LeadStatus = "idle" | "loading" | "ok" | "error";

type ChatRole = "bot" | "user" | "system";

type ChatMessage = {
  id: string;
  role: ChatRole;
  text: string;
  meta?: string;
};

function formatVnd(amount: number) {
  return `${amount.toLocaleString("vi-VN")} ₫`;
}

function configNumber(config: Record<string, unknown>, key: string, fallback: number) {
  const value = config[key];
  return typeof value === "number" && Number.isFinite(value) ? value : fallback;
}

function formatAnswerLabel(
  question: NextQuestion,
  value: AnswerValue,
  features: FeatureItem[],
): string {
  if (question.type === "BOOLEAN") {
    return value === true || value === "true" ? "Có" : "Không";
  }
  if (question.type === "BUDGET" && typeof value === "number") {
    return formatVnd(value);
  }
  if (question.type === "FEATURE_SELECTOR" && Array.isArray(value)) {
    const names = value
      .map((key) => features.find((f) => f.key === key)?.name || String(key))
      .slice(0, 8);
    const more = value.length > 8 ? ` (+${value.length - 8})` : "";
    return `Đã chọn ${value.length} tính năng: ${names.join(", ")}${more}`;
  }
  if (Array.isArray(value)) {
    const labels = value.map(
      (v) => question.options.find((o) => o.value === v)?.label || String(v),
    );
    return labels.join(", ") || "Đã chọn";
  }
  if (typeof value === "string") {
    const opt = question.options.find((o) => o.value === value);
    return opt?.label || value;
  }
  return String(value);
}

let msgSeq = 0;
function mid(prefix: string) {
  msgSeq += 1;
  return `${prefix}-${msgSeq}-${Date.now()}`;
}

export function EstimatorApp({
  initialProductKey,
  variant = "public",
  sessionNonce = 0,
  active = true,
  onClose,
  onRestart,
}: {
  initialProductKey?: string;
  /** admin = CMS playground; widget = khung Messenger nổi; public = trang /estimate */
  variant?: "public" | "admin" | "widget";
  /** Đổi giá trị để bắt đầu lại phiên mới */
  sessionNonce?: number;
  /** widget: chỉ boot session khi mở */
  active?: boolean;
  onClose?: () => void;
  onRestart?: () => void;
}) {
  const [publicId, setPublicId] = useState<string | null>(null);
  const [shareCode, setShareCode] = useState<string | null>(null);
  const [step, setStep] = useState<StepResponse | null>(null);
  const [bootError, setBootError] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [calculating, setCalculating] = useState(false);
  const [result, setResult] = useState<(EstimateResultPublic & { shareCode?: string }) | null>(
    null,
  );
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [textValue, setTextValue] = useState("");
  const [multiValue, setMultiValue] = useState<string[]>([]);
  const [featureKeys, setFeatureKeys] = useState<string[]>([]);
  const [budgetValue, setBudgetValue] = useState(40_000_000);
  const [leadStatus, setLeadStatus] = useState<LeadStatus>("idle");
  const [leadError, setLeadError] = useState("");
  const [leadNumber, setLeadNumber] = useState<string | null>(null);

  const transcriptRef = useRef<HTMLDivElement>(null);
  const lastPromptedKey = useRef<string | null>(null);
  const bootedForNonce = useRef<number | null>(null);
  const question = step?.nextQuestion ?? null;
  const isAdmin = variant === "admin";
  const isWidget = variant === "widget";

  useEffect(() => {
    const el = transcriptRef.current;
    if (!el) return;
    el.scrollTo({ top: el.scrollHeight, behavior: "smooth" });
  }, [messages, question?.key, submitting, calculating, result]);

  useEffect(() => {
    let cancelled = false;

    async function boot() {
      if (isWidget && !active) return;
      if (isWidget && bootedForNonce.current === sessionNonce) return;

      setResult(null);
      setLeadStatus("idle");
      setLeadError("");
      setLeadNumber(null);
      setBootError("");
      setStep(null);
      setPublicId(null);
      setShareCode(null);
      lastPromptedKey.current = null;
      setMessages([
        {
          id: mid("bot"),
          role: "bot",
          text: "Chào bạn — mình là tư vấn viên ước tính dự án. Trả lời vài câu ngắn, mình sẽ gợi ý phạm vi, khoảng ngân sách và roadmap sơ bộ.",
          meta: "Product consultant",
        },
      ]);
      try {
        const params = new URLSearchParams(
          typeof window !== "undefined" ? window.location.search : "",
        );
        const forceFresh = isAdmin || sessionNonce > 0;
        const res = await fetch("/api/estimator/session", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            fresh: forceFresh,
            productKey: initialProductKey || undefined,
            landingPath:
              variant === "admin"
                ? "/admin/estimator?tab=playground"
                : variant === "widget"
                  ? `${window.location.pathname}${window.location.search}#estimate-chat`
                  : `${window.location.pathname}${window.location.search}`,
            utmSource:
              variant === "admin"
                ? "admin_playground"
                : variant === "widget"
                  ? params.get("utm_source") || "chat_widget"
                  : params.get("utm_source") || undefined,
            utmMedium:
              variant === "admin"
                ? "admin"
                : variant === "widget"
                  ? params.get("utm_medium") || "widget"
                  : params.get("utm_medium") || undefined,
            utmCampaign: params.get("utm_campaign") || undefined,
            referralCode: params.get("ref") || undefined,
          }),
        });
        const data = (await res.json()) as {
          publicId?: string;
          shareCode?: string;
          resumed?: boolean;
          step?: StepResponse;
          result?: (EstimateResultPublic & { shareCode?: string }) | null;
          leadNumber?: string | null;
          hasLead?: boolean;
          warning?: string;
          error?: string;
        };
        if (!res.ok || !data.publicId) {
          throw new Error(data.error || "Không tạo được phiên");
        }
        if (cancelled) return;
        setPublicId(data.publicId);
        setShareCode(data.shareCode || null);
        bootedForNonce.current = sessionNonce;

        const nextData =
          data.step ||
          ((await (await fetch(`/api/estimator/${data.publicId}/next`)).json()) as StepResponse);

        if (data.resumed) {
          hydrateResume(nextData, {
            result: data.result || null,
            shareCode: data.shareCode || null,
            hasLead: Boolean(data.hasLead),
            leadNumber: data.leadNumber || null,
            warning: data.warning,
          });
        } else {
          if (!cancelled) applyStep(nextData, { prompt: true });
        }
      } catch (err) {
        if (!cancelled) {
          setBootError(
            err instanceof Error ? err.message : "Không khởi tạo được công cụ ước tính",
          );
        }
      }
    }

    void boot();
    return () => {
      cancelled = true;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps -- boot intentionally gated by active/nonce
  }, [initialProductKey, variant, sessionNonce, active, isWidget]);

  useEffect(() => {
    if (!question) return;
    setTextValue("");
    setMultiValue([]);
    if (question.type === "FEATURE_SELECTOR") {
      setFeatureKeys(step?.session.selectedFeatures || []);
    }
    if (question.type === "BUDGET") {
      setBudgetValue(configNumber(question.config, "default", 40_000_000));
    }
  }, [question?.key, question?.type, step?.session.selectedFeatures]);

  function pushMessages(...items: Omit<ChatMessage, "id">[]) {
    setMessages((prev) => [
      ...prev,
      ...items.map((item) => ({ ...item, id: mid(item.role) })),
    ]);
  }

  function hydrateResume(
    next: StepResponse,
    extra: {
      result: (EstimateResultPublic & { shareCode?: string }) | null;
      shareCode: string | null;
      hasLead: boolean;
      leadNumber: string | null;
      warning?: string;
    },
  ) {
    const restored: ChatMessage[] = [
      {
        id: mid("bot"),
        role: "bot",
        text: "Mình còn phiên ước tính trước của bạn. Tiếp tục từ chỗ dừng nhé.",
        meta: "Product consultant",
      },
    ];
    for (const item of next.history || []) {
      restored.push({
        id: mid("bot"),
        role: "bot",
        text: item.description ? `${item.title}\n\n${item.description}` : item.title,
        meta: item.section,
      });
      restored.push({
        id: mid("user"),
        role: "user",
        text: item.label,
      });
    }
    if (extra.warning) {
      restored.push({
        id: mid("system"),
        role: "system",
        text: extra.warning,
      });
    }
    setMessages(restored);
    lastPromptedKey.current = null;
    applyStep(next, { prompt: !extra.result });
    if (extra.result) {
      setResult({ ...extra.result, shareCode: extra.shareCode || extra.result.shareCode });
      pushMessages({
        role: "bot",
        text: `Ước tính sơ bộ: ${formatVnd(extra.result.range.min)} – ${formatVnd(extra.result.range.max)} · Timeline ${extra.result.timelineWeeks.min}–${extra.result.timelineWeeks.max} tuần. Xem chi tiết bên dưới — bạn có thể để lại liên hệ để mình review kỹ hơn.`,
        meta: "Kết quả",
      });
    }
    if (extra.hasLead) {
      setLeadStatus("ok");
      setLeadNumber(extra.leadNumber);
    }
  }

  function applyStep(next: StepResponse, opts?: { prompt?: boolean }) {
    setStep(next);
    if (next.session?.shareCode) setShareCode(next.session.shareCode);

    const notes: string[] = [];
    if (next.dependency?.autoAdded?.length) {
      notes.push(...next.dependency.autoAdded.map((item) => item.reason));
      if (next.dependency.selected) setFeatureKeys(next.dependency.selected);
    }
    if (next.dependency?.conflicts?.length) {
      notes.push(...next.dependency.conflicts.map((c) => c.message));
    }
    if (notes.length) {
      pushMessages({
        role: "system",
        text: notes.join(" · "),
        meta: "Dependency",
      });
    }

    if (opts?.prompt === false) return;

    if (next.botMessage) {
      pushMessages({
        role: "bot",
        text: next.botMessage,
        meta: "Product consultant",
      });
    }

    if (next.nextQuestion) {
      const q = next.nextQuestion;
      const promptKey = `${q.key}:${next.progress.answered}`;
      if (lastPromptedKey.current !== promptKey) {
        lastPromptedKey.current = promptKey;
        const body = q.description ? `${q.title}\n\n${q.description}` : q.title;
        pushMessages({
          role: "bot",
          text: body,
          meta:
            next.progress.sections.find((s) => s.key === q.section)?.label || q.section,
        });
      }
    } else if (next.done) {
      pushMessages({
        role: "bot",
        text: "Đã đủ thông tin. Mình sẽ tính khoảng giá, timeline và roadmap dựa trên những gì bạn vừa chia sẻ.",
        meta: "Product consultant",
      });
    }
  }

  const featuresByCategory = useMemo(() => {
    const map = new Map<string, FeatureItem[]>();
    for (const feature of step?.features || []) {
      const cat = feature.category || "Khác";
      const list = map.get(cat) || [];
      list.push(feature);
      map.set(cat, list);
    }
    return [...map.entries()];
  }, [step?.features]);

  async function submitAnswer(value: AnswerValue) {
    if (!publicId || !question || submitting) return;
    setSubmitting(true);
    pushMessages({
      role: "user",
      text: formatAnswerLabel(question, value, step?.features || []),
    });
    try {
      const res = await fetch(`/api/estimator/${publicId}/answer`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ questionKey: question.key, value }),
      });
      const data = (await res.json()) as StepResponse;
      if (!res.ok) throw new Error(data.error || "Không lưu được câu trả lời");
      applyStep(data, { prompt: true });
    } catch (err) {
      setBootError(err instanceof Error ? err.message : "Lỗi gửi câu trả lời");
    } finally {
      setSubmitting(false);
    }
  }

  async function submitFeatures() {
    if (!publicId || !question || submitting) return;
    setSubmitting(true);
    pushMessages({
      role: "user",
      text: formatAnswerLabel(question, featureKeys, step?.features || []),
    });
    try {
      const res = await fetch(`/api/estimator/${publicId}/features`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ featureKeys }),
      });
      const data = (await res.json()) as StepResponse;
      if (!res.ok) throw new Error(data.error || "Không lưu được tính năng");
      applyStep(data, { prompt: true });
    } catch (err) {
      setBootError(err instanceof Error ? err.message : "Lỗi lưu tính năng");
    } finally {
      setSubmitting(false);
    }
  }

  async function runCalculate() {
    if (!publicId || calculating) return;
    setCalculating(true);
    setBootError("");
    pushMessages({
      role: "user",
      text: "Tính estimate giúp mình",
    });
    try {
      const res = await fetch(`/api/estimator/${publicId}/calculate`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({}),
      });
      const data = (await res.json()) as {
        result?: EstimateResultPublic;
        error?: string;
      };
      if (!res.ok || !data.result) {
        throw new Error(data.error || "Không tính được estimate");
      }
      setResult({ ...data.result, shareCode: shareCode || undefined });
      pushMessages({
        role: "bot",
        text: `Ước tính sơ bộ: ${formatVnd(data.result.range.min)} – ${formatVnd(data.result.range.max)} · Timeline ${data.result.timelineWeeks.min}–${data.result.timelineWeeks.max} tuần. Xem chi tiết bên dưới — bạn có thể để lại liên hệ để mình review kỹ hơn.`,
        meta: "Kết quả",
      });
    } catch (err) {
      setBootError(err instanceof Error ? err.message : "Lỗi tính estimate");
    } finally {
      setCalculating(false);
    }
  }

  async function submitLead(form: HTMLFormElement) {
    if (!publicId) return;
    setLeadStatus("loading");
    setLeadError("");
    const fd = new FormData(form);
    const payload = {
      name: String(fd.get("name") || "").trim(),
      company: String(fd.get("company") || "").trim() || undefined,
      email: String(fd.get("email") || "").trim(),
      phone: String(fd.get("phone") || "").trim(),
      zalo: String(fd.get("zalo") || "").trim() || undefined,
      preferredContact: String(fd.get("preferredContact") || "").trim() || undefined,
    };

    if (!isValidEmail(payload.email)) {
      setLeadStatus("error");
      setLeadError("Email không hợp lệ.");
      return;
    }
    if (!isValidVnPhone(payload.phone)) {
      setLeadStatus("error");
      setLeadError("Số điện thoại không hợp lệ. Ví dụ: 0382802406.");
      return;
    }

    try {
      const res = await fetch(`/api/estimator/${publicId}/lead`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const data = (await res.json()) as {
        ok?: boolean;
        leadNumber?: string;
        error?: string;
      };
      if (!res.ok) throw new Error(data.error || "Không lưu được liên hệ");
      setLeadStatus("ok");
      setLeadNumber(data.leadNumber || null);
      pushMessages({
        role: "bot",
        text: `Đã lưu liên hệ${data.leadNumber ? ` · ${data.leadNumber}` : ""}. Mình sẽ phản hồi sớm.`,
      });
      form.reset();
    } catch (err) {
      setLeadStatus("error");
      setLeadError(err instanceof Error ? err.message : "Gửi thất bại");
    }
  }

  function toggleMulti(value: string) {
    setMultiValue((prev) =>
      prev.includes(value) ? prev.filter((v) => v !== value) : [...prev, value],
    );
  }

  function toggleFeature(key: string) {
    setFeatureKeys((prev) =>
      prev.includes(key) ? prev.filter((k) => k !== key) : [...prev, key],
    );
  }

  const budgetMin = question ? configNumber(question.config, "min", 10_000_000) : 10_000_000;
  const budgetMax = question ? configNumber(question.config, "max", 300_000_000) : 300_000_000;
  const budgetStep = question ? configNumber(question.config, "step", 5_000_000) : 5_000_000;
  const progressPct = step?.progress.percent ?? 0;

  const composer = (() => {
    if (result || bootError) return null;
    if (!step) {
      return (
        <div className="flex items-center gap-2 text-sm text-ink-muted">
          <Loader2 className="size-4 animate-spin text-brand" />
          Đang mở phiên tư vấn...
        </div>
      );
    }
    if (step.done && !result) {
      return (
        <Button
          size="lg"
          onClick={() => void runCalculate()}
          disabled={calculating}
          iconRight={
            calculating ? (
              <Loader2 className="size-4 animate-spin" />
            ) : (
              <Sparkles className="size-4" />
            )
          }
        >
          {calculating ? "Đang tính..." : "Tính estimate ngay"}
        </Button>
      );
    }
    if (!question) return null;

    if (
      question.type === "SINGLE_SELECT" ||
      question.type === "RANGE" ||
      question.type === "TIMELINE" ||
      question.type === "BOOLEAN"
    ) {
      const options =
        question.type === "BOOLEAN"
          ? [
              { value: "true", label: "Có" },
              { value: "false", label: "Không" },
            ]
          : question.options;
      return (
        <div className={cn("flex gap-2", isWidget ? "flex-nowrap overflow-x-auto pb-0.5" : "flex-wrap")}>
          {options.map((option) => (
            <button
              key={String(option.value)}
              type="button"
              disabled={submitting}
              onClick={() => {
                if (question.type === "BOOLEAN") {
                  void submitAnswer(option.value === "true");
                } else {
                  void submitAnswer(option.value);
                }
              }}
              className={cn(
                "rounded-2xl border border-border bg-surface font-semibold text-ink shadow-sm transition hover:border-brand/40 hover:bg-brand-soft disabled:opacity-60",
                isWidget ? "shrink-0 px-3 py-2 text-xs" : "px-4 py-2.5 text-sm",
              )}
            >
              {option.label}
            </button>
          ))}
        </div>
      );
    }

    if (question.type === "MULTI_SELECT") {
      return (
        <div className="space-y-3">
          <div className="flex flex-wrap gap-2">
            {question.options.map((option) => {
              const active = multiValue.includes(option.value);
              return (
                <button
                  key={option.value}
                  type="button"
                  disabled={submitting}
                  onClick={() => toggleMulti(option.value)}
                  className={cn(
                    "rounded-2xl border px-4 py-2.5 text-sm font-semibold transition",
                    active
                      ? "border-brand bg-brand text-white"
                      : "border-border bg-surface text-ink hover:border-brand/40",
                  )}
                >
                  {option.label}
                </button>
              );
            })}
          </div>
          <Button
            onClick={() => void submitAnswer(multiValue)}
            disabled={submitting || (question.required && multiValue.length === 0)}
            iconRight={<ArrowRight className="size-4" />}
          >
            Gửi lựa chọn
          </Button>
        </div>
      );
    }

    if (question.type === "FEATURE_SELECTOR") {
      return (
        <Button
          onClick={() => void submitFeatures()}
          disabled={submitting || featureKeys.length === 0}
          iconRight={<Check className="size-4" />}
        >
          Xác nhận {featureKeys.length} tính năng
        </Button>
      );
    }

    if (question.type === "BUDGET") {
      return (
        <div className="space-y-3">
          <p className="font-display text-2xl font-bold text-ink">
            {formatVnd(budgetValue)}
          </p>
          <input
            type="range"
            min={budgetMin}
            max={budgetMax}
            step={budgetStep}
            value={budgetValue}
            onChange={(e) => setBudgetValue(Number(e.target.value))}
            className="w-full accent-brand"
          />
          <div className="flex justify-between text-xs text-ink-muted">
            <span>{formatVnd(budgetMin)}</span>
            <span>{formatVnd(budgetMax)}</span>
          </div>
          <Button
            onClick={() => void submitAnswer(budgetValue)}
            disabled={submitting}
            iconRight={<ArrowRight className="size-4" />}
          >
            Gửi ngân sách
          </Button>
        </div>
      );
    }

    if (question.type === "AI_FREE_TEXT" || question.type === "TEXTAREA") {
      return (
        <form
          className="flex items-end gap-2"
          onSubmit={(e) => {
            e.preventDefault();
            void submitAnswer(textValue.trim());
          }}
        >
          <textarea
            rows={isWidget ? 2 : 3}
            value={textValue}
            onChange={(e) => setTextValue(e.target.value)}
            placeholder="Mô tả ý tưởng, người dùng và kết quả mong muốn..."
            className={cn(
              "flex-1 resize-none rounded-2xl border border-border bg-surface px-3 py-2.5 text-sm outline-none focus:ring-2 focus:ring-brand/30",
              isWidget ? "min-h-14" : "min-h-18",
            )}
            onKeyDown={(e) => {
              if (e.key === "Enter" && !e.shiftKey) {
                e.preventDefault();
                if (!submitting && textValue.trim().length >= 3) {
                  void submitAnswer(textValue.trim());
                }
              }
            }}
          />
          <Button
            type="submit"
            disabled={submitting || (question.required && textValue.trim().length < 3)}
            iconRight={<SendHorizontal className="size-4" />}
            className="shrink-0"
          >
            Gửi
          </Button>
        </form>
      );
    }

    return null;
  })();

  const chatShell = (
    <div
      className={cn(
        "flex flex-col overflow-hidden border border-border bg-surface shadow-sm",
        isWidget
          ? "h-full min-h-0 rounded-2xl border-0 shadow-none"
          : isAdmin
            ? "min-h-[640px] rounded-2xl"
            : "min-h-[70vh] rounded-[1.75rem] sm:min-h-[720px]",
      )}
    >
      <header
        className={cn(
          "border-b border-border bg-surface-muted/70",
          isWidget ? "px-3 py-2.5" : "px-4 py-3 sm:px-5",
        )}
      >
        <div className="flex items-center justify-between gap-3">
          <div className="min-w-0">
            <div className="flex items-center gap-2">
              <span className="flex size-8 overflow-hidden rounded-full">
                <AssistantBotIcon className="size-8" />
              </span>
              <div>
                <p className="text-sm font-bold text-ink">
                  {isWidget ? "Ước tính dự án" : "Tư vấn ước tính dự án"}
                </p>
                <p className="text-xs text-ink-muted">
                  {step
                    ? `${step.progress.answered}/${step.progress.total} · ${progressPct}%${publicId ? " · đã lưu" : ""}`
                    : "Đang kết nối..."}
                </p>
              </div>
            </div>
          </div>
          <div className="flex items-center gap-0.5">
            {!isWidget
              ? (step?.progress.sections || []).slice(0, 4).map((section) => (
                  <span
                    key={section.key}
                    title={section.label}
                    className={cn(
                      "hidden size-2 rounded-full sm:inline-flex",
                      section.done ? "bg-brand" : "bg-border",
                    )}
                  />
                ))
              : null}
            {isWidget && onRestart ? (
              <button
                type="button"
                aria-label="Bắt đầu cuộc trò chuyện mới"
                title="Bắt đầu lại"
                onClick={onRestart}
                className="inline-flex size-8 items-center justify-center rounded-full text-ink-muted transition hover:bg-surface hover:text-ink"
              >
                <RefreshCw className="size-4" />
              </button>
            ) : null}
            {isWidget && onClose ? (
              <button
                type="button"
                aria-label="Đóng chat"
                onClick={onClose}
                className="inline-flex size-8 items-center justify-center rounded-full text-ink-muted transition hover:bg-surface hover:text-ink"
              >
                <X className="size-4" />
              </button>
            ) : null}
          </div>
        </div>
        <div className="mt-2.5 h-1 overflow-hidden rounded-full bg-surface">
          <div
            className="h-full rounded-full bg-brand transition-all duration-500"
            style={{ width: `${progressPct}%` }}
          />
        </div>
      </header>

      <div
        ref={transcriptRef}
        className={cn(
          "flex-1 space-y-2.5 overflow-y-auto from-brand-soft/30 via-surface to-surface",
          isWidget
            ? "bg-surface-muted/40 px-2.5 py-3"
            : "bg-[radial-gradient(ellipse_at_top,var(--tw-gradient-stops))] px-3 py-4 sm:px-5",
        )}
      >
        {messages.map((msg) => (
          <div
            key={msg.id}
            className={cn(
              "flex",
              msg.role === "user" ? "justify-end" : "justify-start",
            )}
          >
            <div
              className={cn(
                "max-w-[90%] px-3 py-2 text-[13px] leading-5",
                msg.role === "user" &&
                  "rounded-2xl rounded-br-md bg-brand text-white shadow-sm",
                msg.role === "bot" &&
                  "rounded-2xl rounded-bl-md border border-border bg-surface text-ink shadow-sm",
                msg.role === "system" &&
                  "w-full max-w-none rounded-xl border border-dashed border-border/80 bg-surface-muted/80 text-center text-[11px] text-ink-muted",
                !isWidget && "py-2.5 text-sm leading-6 sm:max-w-[80%]",
              )}
            >
              {msg.role === "bot" && msg.meta && !isWidget ? (
                <p className="mb-1 text-[10px] font-bold uppercase tracking-[0.14em] text-brand">
                  {msg.meta}
                </p>
              ) : null}
              <p className="whitespace-pre-wrap">{msg.text}</p>
            </div>
          </div>
        ))}

        {submitting || calculating ? (
          <div className="flex justify-start">
            <div className="inline-flex items-center gap-2 rounded-2xl border border-border bg-surface px-3 py-2 text-xs text-ink-muted shadow-sm">
              <Loader2 className="size-3.5 animate-spin text-brand" />
              {calculating ? "Đang tính estimate..." : "Đang xử lý..."}
            </div>
          </div>
        ) : null}

        {bootError ? (
          <div className="rounded-2xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-800">
            {bootError}
          </div>
        ) : null}

        {question?.type === "FEATURE_SELECTOR" && !result ? (
          <div className="space-y-2 rounded-xl border border-border bg-surface p-2">
            {featuresByCategory.map(([category, items]) => (
              <div key={category}>
                <p className="mb-1 px-1 text-[10px] font-bold uppercase tracking-[0.12em] text-ink-muted">
                  {category}
                </p>
                <ul className="space-y-1">
                  {items.map((feature) => {
                    const checked = featureKeys.includes(feature.key);
                    return (
                      <li key={feature.key}>
                        <label
                          className={cn(
                            "flex cursor-pointer items-start gap-2 rounded-xl border px-2.5 py-2 transition",
                            checked
                              ? "border-brand/40 bg-brand-soft/60"
                              : "border-border bg-surface hover:border-brand/25",
                          )}
                        >
                          <input
                            type="checkbox"
                            checked={checked}
                            onChange={() => toggleFeature(feature.key)}
                            className="mt-0.5 size-3.5 rounded border-border text-brand"
                          />
                          <span className="text-xs font-semibold text-ink">{feature.name}</span>
                        </label>
                      </li>
                    );
                  })}
                </ul>
              </div>
            ))}
          </div>
        ) : null}

        {result ? (
          <div className={cn("space-y-3 rounded-2xl border border-border bg-surface", isWidget ? "p-2.5" : "p-3 sm:p-4")}>
            <EstimateResultView
              result={result}
              showContactCta={!isWidget}
              compact={isWidget}
            />
            <div className="rounded-2xl border border-border bg-surface-muted/50 p-3">
              <h3 className={cn("font-display font-bold text-ink", isWidget ? "text-base" : "text-lg")}>
                Nhận bản estimate qua liên hệ
              </h3>
              <p className="mt-1 text-sm text-ink-muted">
                Để lại thông tin để mình review kỹ thuật và gửi đề xuất tiếp theo.
              </p>
              {leadStatus === "ok" ? (
                <p className="mt-4 rounded-xl bg-brand-soft/50 px-3 py-2 text-sm font-medium text-ink">
                  Đã lưu liên hệ{leadNumber ? ` · ${leadNumber}` : ""}.
                </p>
              ) : (
                <form
                  className="mt-4 grid grid-cols-1 gap-3"
                  onSubmit={(e) => {
                    e.preventDefault();
                    void submitLead(e.currentTarget);
                  }}
                >
                  <label className="block text-sm">
                    <span className="mb-1 block font-medium text-ink">Họ và tên</span>
                    <input
                      required
                      name="name"
                      minLength={2}
                      autoComplete="name"
                      className="h-10 w-full rounded-xl border border-border px-3 outline-none focus:ring-2 focus:ring-brand/30"
                    />
                  </label>
                  {!isWidget ? (
                    <label className="block text-sm">
                      <span className="mb-1 block font-medium text-ink">Công ty</span>
                      <input
                        name="company"
                        autoComplete="organization"
                        className="h-10 w-full rounded-xl border border-border px-3 outline-none focus:ring-2 focus:ring-brand/30"
                      />
                    </label>
                  ) : null}
                  <label className="block text-sm">
                    <span className="mb-1 block font-medium text-ink">Email</span>
                    <input
                      required
                      type="email"
                      name="email"
                      autoComplete="email"
                      className="h-10 w-full rounded-xl border border-border px-3 outline-none focus:ring-2 focus:ring-brand/30"
                    />
                  </label>
                  <label className="block text-sm">
                    <span className="mb-1 block font-medium text-ink">Số điện thoại</span>
                    <input
                      required
                      name="phone"
                      type="tel"
                      autoComplete="tel"
                      className="h-10 w-full rounded-xl border border-border px-3 outline-none focus:ring-2 focus:ring-brand/30"
                    />
                  </label>
                  {!isWidget ? (
                    <>
                      <label className="block text-sm">
                        <span className="mb-1 block font-medium text-ink">Zalo</span>
                        <input
                          name="zalo"
                          className="h-10 w-full rounded-xl border border-border px-3 outline-none focus:ring-2 focus:ring-brand/30"
                        />
                      </label>
                      <label className="block text-sm">
                        <span className="mb-1 block font-medium text-ink">Ưu tiên liên hệ</span>
                        <select
                          name="preferredContact"
                          className="h-10 w-full rounded-xl border border-border px-3 outline-none focus:ring-2 focus:ring-brand/30"
                        >
                          <option value="phone">Điện thoại</option>
                          <option value="zalo">Zalo</option>
                          <option value="email">Email</option>
                        </select>
                      </label>
                    </>
                  ) : (
                    <input type="hidden" name="preferredContact" value="phone" />
                  )}
                  {leadError ? <p className="text-sm text-red-700">{leadError}</p> : null}
                  <Button
                    type="submit"
                    disabled={leadStatus === "loading"}
                    iconRight={<ArrowRight className="size-4" />}
                    className="w-full"
                  >
                    {leadStatus === "loading" ? "Đang gửi..." : "Gửi liên hệ"}
                  </Button>
                </form>
              )}
            </div>
            {publicId ? (
              <p className="text-xs text-ink-muted">
                Lưu kết quả:{" "}
                <a
                  className="font-semibold text-brand hover:underline"
                  href={`/estimate/${publicId}`}
                >
                  /estimate/{publicId}
                </a>
              </p>
            ) : null}
            {isAdmin ? (
              <p className="rounded-xl border border-amber-200 bg-amber-50 px-3 py-2 text-xs text-amber-900">
                Form liên hệ sẽ tạo lead thật (source ESTIMATOR / utm admin_playground).
              </p>
            ) : null}
          </div>
        ) : null}
      </div>

      {composer ? (
        <div
          className={cn(
            "border-t border-border bg-surface",
            isWidget ? "px-2.5 py-2.5" : "px-3 py-3 sm:px-5 sm:py-4",
          )}
        >
          {composer}
        </div>
      ) : null}
    </div>
  );

  if (isAdmin) {
    return (
      <div className="space-y-4">
        <div className="rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-600">
          Playground — cùng API với widget chat góc phải trên site.
        </div>
        {chatShell}
      </div>
    );
  }

  return chatShell;
}
