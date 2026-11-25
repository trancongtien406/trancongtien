import Link from "next/link";
import { ArrowRight, Check, Share2, ShieldAlert } from "lucide-react";
import { Button } from "@/components/common/Button";
import { OpenEstimateButton } from "@/components/floating/OpenEstimateButton";
import { formatVndRange } from "@/lib/estimator/pricing";
import type { EstimateResultPublic } from "@/lib/estimator/types";
import { cn } from "@/lib/utils";

export type EstimateResultViewProps = {
  result: EstimateResultPublic & { shareCode?: string };
  showContactCta?: boolean;
  compact?: boolean;
  className?: string;
};

function formatVnd(amount: number) {
  return `${amount.toLocaleString("vi-VN")} ₫`;
}

export function EstimateResultView({
  result,
  showContactCta = true,
  compact = false,
  className,
}: EstimateResultViewProps) {
  const rangeLabel = formatVndRange(result.range.min, result.range.max);
  const shareHref = result.shareCode ? `/e/${result.shareCode}` : null;

  if (compact) {
    return (
      <div className={cn("space-y-3", className)}>
        <header className="rounded-xl border border-border bg-surface-muted px-3 py-3">
          <p className="text-[11px] font-semibold text-brand">
            Ước tính · v{result.version}
          </p>
          <p className="mt-1 text-sm font-bold text-ink">{result.product}</p>
          <p className="mt-1 text-xl font-bold text-ink">{rangeLabel}</p>
          <p className="mt-1 text-xs text-ink-muted">
            {result.timelineWeeks.min}–{result.timelineWeeks.max} tuần
          </p>
          {result.technicalReviewRequired ? (
            <p className="mt-2 text-xs font-medium text-amber-800">
              Cần technical review trước khi chốt phạm vi
            </p>
          ) : null}
        </header>
        <section className="rounded-xl border border-border px-3 py-2.5">
          <p className="text-xs font-bold text-ink">Trong phạm vi</p>
          <ul className="mt-1.5 space-y-1">
            {result.features.slice(0, 8).map((f) => (
              <li key={f.key} className="flex gap-1.5 text-xs text-ink">
                <Check className="mt-0.5 size-3 shrink-0 text-brand" />
                {f.name}
              </li>
            ))}
            {result.features.length > 8 ? (
              <li className="text-xs text-ink-muted">+{result.features.length - 8} khác</li>
            ) : null}
          </ul>
        </section>
        {result.deferredFeatures.length > 0 ? (
          <p className="text-xs text-ink-muted">
            Hoãn: {result.deferredFeatures.map((f) => f.name).slice(0, 4).join(", ")}
            {result.deferredFeatures.length > 4 ? "…" : ""}
          </p>
        ) : null}
        {shareHref ? (
          <Link href={shareHref} className="text-xs font-semibold text-brand hover:underline">
            Link chia sẻ kết quả
          </Link>
        ) : null}
      </div>
    );
  }

  return (
    <div className={cn("space-y-8", className)}>
      <header className="rounded-3xl border border-border bg-surface-muted p-6 sm:p-8">
        <p className="text-xs font-bold uppercase tracking-[0.16em] text-brand">
          Kết quả ước tính · v{result.version}
        </p>
        <h2 className="mt-3 font-display text-3xl font-bold tracking-tight text-ink sm:text-4xl">
          {result.product}
        </h2>
        <p className="mt-4 text-3xl font-bold text-ink sm:text-4xl">{rangeLabel}</p>
        <p className="mt-2 text-sm text-ink-muted">
          {formatVnd(result.range.min)} – {formatVnd(result.range.max)}
        </p>
        <p className="mt-4 text-base text-ink-muted">
          Timeline dự kiến:{" "}
          <span className="font-semibold text-ink">
            {result.timelineWeeks.min}–{result.timelineWeeks.max} tuần
          </span>
        </p>
        {result.technicalReviewRequired ? (
          <p className="mt-4 inline-flex items-center gap-2 rounded-xl bg-amber-50 px-3 py-2 text-sm font-medium text-amber-900 ring-1 ring-amber-200">
            <ShieldAlert className="size-4 shrink-0" />
            Cần technical review trước khi chốt phạm vi
          </p>
        ) : null}
        {result.aiSummary ? (
          <p className="mt-5 max-w-3xl text-base leading-7 text-ink-muted">
            {result.aiSummary}
          </p>
        ) : null}
      </header>

      <div className="grid gap-6 lg:grid-cols-2">
        <section className="rounded-3xl border border-border bg-surface p-6">
          <h3 className="font-display text-xl font-bold text-ink">Tính năng trong phạm vi</h3>
          {result.features.length === 0 ? (
            <p className="mt-3 text-sm text-ink-muted">Chưa có tính năng được chọn.</p>
          ) : (
            <ul className="mt-4 space-y-2">
              {result.features.map((f) => (
                <li key={f.key} className="flex items-start gap-2 text-sm text-ink">
                  <Check className="mt-0.5 size-4 shrink-0 text-brand" />
                  <span>
                    {f.name}
                    <span className="ml-2 text-xs text-ink-muted">{f.priority}</span>
                  </span>
                </li>
              ))}
            </ul>
          )}
        </section>

        <section className="rounded-3xl border border-border bg-surface p-6">
          <h3 className="font-display text-xl font-bold text-ink">Phase 2 / hoãn lại</h3>
          {result.deferredFeatures.length === 0 ? (
            <p className="mt-3 text-sm text-ink-muted">Không có tính năng bị hoãn.</p>
          ) : (
            <ul className="mt-4 space-y-2">
              {result.deferredFeatures.map((f) => (
                <li key={f.key} className="text-sm text-ink-muted">
                  {f.name}
                </li>
              ))}
            </ul>
          )}
        </section>
      </div>

      {result.roadmap.length > 0 ? (
        <section className="rounded-3xl border border-border bg-surface p-6 sm:p-8">
          <h3 className="font-display text-xl font-bold text-ink">Roadmap đề xuất</h3>
          <ol className="mt-6 grid gap-4 sm:grid-cols-2">
            {result.roadmap.map((phase) => (
              <li key={phase.phase} className="rounded-2xl bg-surface-muted p-5">
                <p className="text-xs font-bold uppercase tracking-wider text-brand">
                  {phase.phase}
                </p>
                <ul className="mt-3 space-y-1.5 text-sm text-ink-muted">
                  {phase.items.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              </li>
            ))}
          </ol>
        </section>
      ) : null}

      <div className="grid gap-6 lg:grid-cols-2">
        <section className="rounded-3xl border border-border bg-surface p-6">
          <h3 className="font-display text-xl font-bold text-ink">Kiến trúc</h3>
          <p className="mt-2 font-semibold text-ink">{result.architecture.name}</p>
          {result.architecture.stack.length > 0 ? (
            <ul className="mt-4 flex flex-wrap gap-2">
              {result.architecture.stack.map((item) => (
                <li
                  key={item}
                  className="rounded-lg bg-surface-muted px-3 py-1.5 text-sm text-ink"
                >
                  {item}
                </li>
              ))}
            </ul>
          ) : null}
        </section>

        <section className="rounded-3xl border border-border bg-surface p-6">
          <h3 className="font-display text-xl font-bold text-ink">Đề xuất</h3>
          {result.recommendations.length === 0 ? (
            <p className="mt-3 text-sm text-ink-muted">Chưa có đề xuất bổ sung.</p>
          ) : (
            <ul className="mt-4 space-y-4">
              {result.recommendations.map((rec) => (
                <li key={rec.title}>
                  <p className="font-semibold text-ink">{rec.title}</p>
                  <p className="mt-1 text-sm leading-6 text-ink-muted">{rec.body}</p>
                </li>
              ))}
            </ul>
          )}
        </section>
      </div>

      {showContactCta ? (
        <div className="flex flex-wrap gap-3">
          <Button href="/lien-he" size="lg" iconRight={<ArrowRight className="size-4" />}>
            Trao đổi dự án
          </Button>
          {shareHref ? (
            <Button href={shareHref} variant="secondary" size="lg" iconLeft={<Share2 className="size-4" />}>
              Link chia sẻ
            </Button>
          ) : null}
          <OpenEstimateButton variant="ghost" size="md">
            Ước tính lại
          </OpenEstimateButton>
        </div>
      ) : null}
    </div>
  );
}
