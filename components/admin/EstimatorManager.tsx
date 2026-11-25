"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import {
  AdminCard,
  AdminPageHeader,
  StatusBadge,
} from "@/components/admin/AdminChrome";
import { EstimatorApp } from "@/features/estimator/EstimatorApp";

export type EstimatorProductRow = {
  id: string;
  key: string;
  name: string;
  description: string;
  baseUnits: number;
  active: boolean;
  sortOrder: number;
  featureCount: number;
  questionCount: number;
  sessionCount: number;
};

export type PricingVersionRow = {
  id: string;
  key: string;
  name: string;
  active: boolean;
  unitValueVnd: number;
  minimumProjectVnd: number;
  notes: string;
  updatedAt: string;
};

export type EstimatorSessionRow = {
  id: string;
  publicId: string;
  status: string;
  contactEmail: string;
  updatedAt: string;
  productName: string;
  leadId: string;
  leadNumber: string;
  rangeLabel: string;
};

type Tab = "products" | "pricing" | "sessions" | "playground";

export function EstimatorManager({
  products,
  pricingVersions,
  questionCount,
  sessionCounts,
  recentSessions,
  llmStatus,
}: {
  products: EstimatorProductRow[];
  pricingVersions: PricingVersionRow[];
  questionCount: number;
  sessionCounts: Record<string, number>;
  recentSessions: EstimatorSessionRow[];
  llmStatus: {
    configured: boolean;
    mode: "llm" | "heuristic";
    provider?: string;
    model?: string;
  };
}) {
  const router = useRouter();
  const [tab, setTab] = useState<Tab>("products");
  const [saving, setSaving] = useState(false);
  const [playProduct, setPlayProduct] = useState(products[0]?.key || "WEBSITE");
  const [playNonce, setPlayNonce] = useState(0);
  const activePricing = useMemo(
    () => pricingVersions.find((p) => p.active) || pricingVersions[0] || null,
    [pricingVersions],
  );
  const [unitValueVnd, setUnitValueVnd] = useState(
    String(activePricing?.unitValueVnd ?? 1_000_000),
  );
  const [minimumProjectVnd, setMinimumProjectVnd] = useState(
    String(activePricing?.minimumProjectVnd ?? 8_000_000),
  );

  useEffect(() => {
    if (!activePricing) return;
    setUnitValueVnd(String(activePricing.unitValueVnd));
    setMinimumProjectVnd(String(activePricing.minimumProjectVnd));
  }, [activePricing]);

  const totalSessions = Object.values(sessionCounts).reduce((a, b) => a + b, 0);

  async function post(body: Record<string, unknown>, success = "Đã lưu") {
    setSaving(true);
    try {
      const res = await fetch("/api/admin/estimator", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });
      const result = (await res.json().catch(() => null)) as {
        error?: string;
      } | null;
      if (!res.ok) throw new Error(result?.error || "Thất bại");
      toast.success(success);
      router.refresh();
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "Thất bại");
    } finally {
      setSaving(false);
    }
  }

  async function activatePricing(id: string) {
    if (!window.confirm("Kích hoạt phiên bản pricing này? Các bản khác sẽ tắt.")) {
      return;
    }
    await post({ action: "setPricingActive", id }, "Đã kích hoạt pricing");
  }

  async function saveActivePricing(event: React.FormEvent) {
    event.preventDefault();
    if (!activePricing) {
      toast.error("Chưa có pricing version");
      return;
    }
    await post(
      {
        action: "updatePricing",
        id: activePricing.id,
        unitValueVnd: Number(unitValueVnd),
        minimumProjectVnd: Number(minimumProjectVnd),
      },
      "Đã cập nhật pricing",
    );
  }

  const tabs: { id: Tab; label: string }[] = [
    { id: "products", label: "Sản phẩm" },
    { id: "pricing", label: "Pricing" },
    { id: "sessions", label: "Phiên ước tính" },
    { id: "playground", label: "Chạy thử như khách" },
  ];

  return (
    <>
      <AdminPageHeader
        title="Estimator CMS"
        subtitle="Sản phẩm, pricing, phiên ước tính và chạy thử đúng luồng khách"
        actions={
          <Link
            href="/admin/settings"
            className="inline-flex h-10 items-center rounded-xl border border-slate-200 bg-white px-4 text-sm font-semibold text-slate-700"
          >
            Cấu hình LLM
          </Link>
        }
      />

      <div className="mb-4 grid gap-3 sm:grid-cols-2 xl:grid-cols-5">
        <AdminCard>
          <p className="text-sm text-slate-500">Sản phẩm</p>
          <p className="mt-1 font-display text-2xl font-bold">{products.length}</p>
        </AdminCard>
        <AdminCard>
          <p className="text-sm text-slate-500">Câu hỏi</p>
          <p className="mt-1 font-display text-2xl font-bold">{questionCount}</p>
        </AdminCard>
        <AdminCard>
          <p className="text-sm text-slate-500">Phiên ước tính</p>
          <p className="mt-1 font-display text-2xl font-bold">{totalSessions}</p>
        </AdminCard>
        <AdminCard>
          <p className="text-sm text-slate-500">Pricing đang dùng</p>
          <p className="mt-1 truncate font-display text-lg font-bold">
            {activePricing?.name || "—"}
          </p>
        </AdminCard>
        <AdminCard>
          <p className="text-sm text-slate-500">LLM</p>
          <p className="mt-1 font-display text-lg font-bold">
            {llmStatus.configured ? "Đã cấu hình" : "Heuristic"}
          </p>
          <p className="mt-0.5 truncate text-xs text-slate-500">
            {llmStatus.configured
              ? `${llmStatus.provider || "—"} · ${llmStatus.model || "—"}`
              : "Chưa có API key — dùng rule fallback"}
          </p>
        </AdminCard>
      </div>

      <div className="mb-4 flex flex-wrap gap-2">
        {tabs.map((item) => (
          <button
            key={item.id}
            type="button"
            onClick={() => setTab(item.id)}
            className={
              tab === item.id
                ? "rounded-xl bg-brand px-4 py-2 text-sm font-semibold text-white"
                : "rounded-xl border border-slate-200 bg-white px-4 py-2 text-sm font-semibold text-slate-700"
            }
          >
            {item.label}
          </button>
        ))}
      </div>

      {tab === "products" ? (
        <AdminCard className="overflow-hidden p-0 sm:p-0">
          <div className="overflow-x-auto">
            <table className="w-full min-w-200 text-left text-sm">
              <thead className="bg-slate-50 text-xs uppercase text-slate-500">
                <tr>
                  <th className="px-4 py-3">Sản phẩm</th>
                  <th className="px-4 py-3">Base units</th>
                  <th className="px-4 py-3">Features</th>
                  <th className="px-4 py-3">Câu hỏi</th>
                  <th className="px-4 py-3">Phiên</th>
                  <th className="px-4 py-3">Trạng thái</th>
                </tr>
              </thead>
              <tbody>
                {products.map((product) => (
                  <tr key={product.id} className="border-t border-slate-100">
                    <td className="px-4 py-3">
                      <p className="font-semibold">{product.name}</p>
                      <p className="text-xs text-slate-500">{product.key}</p>
                    </td>
                    <td className="px-4 py-3">{product.baseUnits}</td>
                    <td className="px-4 py-3">{product.featureCount}</td>
                    <td className="px-4 py-3">{product.questionCount}</td>
                    <td className="px-4 py-3">{product.sessionCount}</td>
                    <td className="px-4 py-3">
                      <StatusBadge status={product.active ? "PUBLISHED" : "DRAFT"} />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            {products.length === 0 ? (
              <p className="py-12 text-center text-sm text-slate-500">
                Chưa có sản phẩm estimator. Chạy seed để khởi tạo.
              </p>
            ) : null}
          </div>
        </AdminCard>
      ) : null}

      {tab === "pricing" ? (
        <div className="space-y-4">
          {activePricing ? (
            <AdminCard>
              <h2 className="font-semibold text-slate-900">
                Cập nhật pricing đang dùng · {activePricing.name}
              </h2>
              <form
                onSubmit={(e) => void saveActivePricing(e)}
                className="mt-4 grid gap-3 sm:grid-cols-2"
              >
                <label className="text-sm">
                  Đơn giá unit (VND)
                  <input
                    type="number"
                    min={1000}
                    value={unitValueVnd}
                    onChange={(e) => setUnitValueVnd(e.target.value)}
                    className="mt-1 h-10 w-full rounded-xl border border-slate-200 px-3"
                  />
                </label>
                <label className="text-sm">
                  Tối thiểu dự án (VND)
                  <input
                    type="number"
                    min={0}
                    value={minimumProjectVnd}
                    onChange={(e) => setMinimumProjectVnd(e.target.value)}
                    className="mt-1 h-10 w-full rounded-xl border border-slate-200 px-3"
                  />
                </label>
                <div className="sm:col-span-2">
                  <button
                    type="submit"
                    disabled={saving}
                    className="rounded-xl bg-brand px-4 py-2 text-sm font-semibold text-white disabled:opacity-60"
                  >
                    {saving ? "Đang lưu..." : "Lưu pricing"}
                  </button>
                </div>
              </form>
            </AdminCard>
          ) : null}

          <AdminCard className="overflow-hidden p-0 sm:p-0">
            <div className="overflow-x-auto">
              <table className="w-full min-w-200 text-left text-sm">
                <thead className="bg-slate-50 text-xs uppercase text-slate-500">
                  <tr>
                    <th className="px-4 py-3">Version</th>
                    <th className="px-4 py-3">Unit value</th>
                    <th className="px-4 py-3">Minimum</th>
                    <th className="px-4 py-3">Trạng thái</th>
                    <th className="px-4 py-3 text-right">Thao tác</th>
                  </tr>
                </thead>
                <tbody>
                  {pricingVersions.map((version) => (
                    <tr key={version.id} className="border-t border-slate-100">
                      <td className="px-4 py-3">
                        <p className="font-semibold">{version.name}</p>
                        <p className="text-xs text-slate-500">{version.key}</p>
                      </td>
                      <td className="px-4 py-3">
                        {version.unitValueVnd.toLocaleString("vi-VN")}
                      </td>
                      <td className="px-4 py-3">
                        {version.minimumProjectVnd.toLocaleString("vi-VN")}
                      </td>
                      <td className="px-4 py-3">
                        <StatusBadge
                          status={version.active ? "PUBLISHED" : "DRAFT"}
                        />
                      </td>
                      <td className="px-4 py-3 text-right">
                        {version.active ? (
                          <span className="text-xs font-semibold text-emerald-700">
                            Đang dùng
                          </span>
                        ) : (
                          <button
                            type="button"
                            disabled={saving}
                            onClick={() => void activatePricing(version.id)}
                            className="rounded-lg border border-slate-200 px-3 py-1.5 text-xs font-semibold disabled:opacity-60"
                          >
                            Kích hoạt
                          </button>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
              {pricingVersions.length === 0 ? (
                <p className="py-12 text-center text-sm text-slate-500">
                  Chưa có pricing version.
                </p>
              ) : null}
            </div>
          </AdminCard>
        </div>
      ) : null}

      {tab === "sessions" ? (
        <AdminCard className="overflow-hidden p-0 sm:p-0">
          <div className="overflow-x-auto">
            <table className="w-full min-w-220 text-left text-sm">
              <thead className="bg-slate-50 text-xs uppercase text-slate-500">
                <tr>
                  <th className="px-4 py-3">Public ID</th>
                  <th className="px-4 py-3">Sản phẩm</th>
                  <th className="px-4 py-3">Email</th>
                  <th className="px-4 py-3">Khoảng giá</th>
                  <th className="px-4 py-3">Trạng thái</th>
                  <th className="px-4 py-3">Lead</th>
                  <th className="px-4 py-3">Cập nhật</th>
                </tr>
              </thead>
              <tbody>
                {recentSessions.map((session) => (
                  <tr key={session.id} className="border-t border-slate-100">
                    <td className="px-4 py-3 font-mono text-xs">
                      {session.publicId}
                    </td>
                    <td className="px-4 py-3">{session.productName || "—"}</td>
                    <td className="px-4 py-3">{session.contactEmail || "—"}</td>
                    <td className="px-4 py-3">{session.rangeLabel || "—"}</td>
                    <td className="px-4 py-3">
                      <StatusBadge status={session.status} />
                    </td>
                    <td className="px-4 py-3">
                      {session.leadId ? (
                        <Link
                          href={`/admin/leads?id=${session.leadId}`}
                          className="font-semibold text-brand hover:underline"
                        >
                          {session.leadNumber || "Xem lead"}
                        </Link>
                      ) : (
                        "—"
                      )}
                    </td>
                    <td className="px-4 py-3 text-slate-500">
                      {session.updatedAt}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            {recentSessions.length === 0 ? (
              <p className="py-12 text-center text-sm text-slate-500">
                Chưa có phiên ước tính.
              </p>
            ) : null}
          </div>
        </AdminCard>
      ) : null}

      {tab === "playground" ? (
        <div className="space-y-4">
          <AdminCard>
            <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
              <div>
                <h2 className="font-semibold text-slate-900">
                  Chạy thử như khách hàng
                </h2>
                <p className="mt-1 max-w-2xl text-sm leading-6 text-slate-500">
                  Đúng luồng widget chat trên site: trả lời từng câu → chọn tính năng →
                  Pricing Engine tính khoảng giá → roadmap. LLM chỉ hỗ trợ ở câu hỏi mô tả tự do.
                </p>
              </div>
              <div className="flex flex-wrap items-end gap-3">
                <label className="text-sm">
                  <span className="mb-1 block font-semibold text-slate-800">
                    Bắt đầu với sản phẩm
                  </span>
                  <select
                    value={playProduct}
                    onChange={(e) => {
                      setPlayProduct(e.target.value);
                      setPlayNonce((n) => n + 1);
                    }}
                    className="h-11 min-w-52 rounded-xl border border-slate-200 px-3 outline-none focus:ring-2 focus:ring-brand/20"
                  >
                    <option value="">Để khách tự chọn</option>
                    {products.map((p) => (
                      <option key={p.id} value={p.key}>
                        {p.name}
                      </option>
                    ))}
                  </select>
                </label>
                <button
                  type="button"
                  onClick={() => setPlayNonce((n) => n + 1)}
                  className="h-11 rounded-xl border border-slate-200 bg-white px-4 text-sm font-semibold text-slate-700"
                >
                  Bắt đầu lại
                </button>
                <Link
                  href="/"
                  target="_blank"
                  className="inline-flex h-11 items-center rounded-xl bg-brand px-4 text-sm font-semibold text-white"
                >
                  Mở site (icon chat)
                </Link>
              </div>
            </div>
          </AdminCard>

          <AdminCard className="overflow-hidden bg-slate-50/60 p-3 sm:p-5">
            <EstimatorApp
              key={`${playProduct}-${playNonce}`}
              initialProductKey={playProduct || undefined}
              variant="admin"
              sessionNonce={playNonce}
            />
          </AdminCard>
        </div>
      ) : null}
    </>
  );
}
