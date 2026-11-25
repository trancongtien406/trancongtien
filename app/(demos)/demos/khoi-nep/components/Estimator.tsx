"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { EV } from "./events";
import {
  AREA_MAX,
  AREA_MIN,
  BUDGET_STORAGE_KEY,
  BUILDING_TYPES,
  DEFAULT_INPUT,
  DESIGN_RATE,
  FINISH_LEVELS,
  SCOPES,
  calculateBudget,
  formatRange,
  formatVnd,
  isBudgetInput,
  validateArea,
  type BudgetInput,
  type BuildingType,
  type FinishLevel,
  type ServiceScope,
} from "../data/budget";
import s from "../brand.module.css";

export function Estimator({ consultHref }: { consultHref: string }) {
  const [type, setType] = useState<BuildingType>(DEFAULT_INPUT.buildingType);
  const [areaText, setAreaText] = useState(String(DEFAULT_INPUT.area));
  const [finish, setFinish] = useState<FinishLevel>(DEFAULT_INPUT.finishLevel);
  const [scope, setScope] = useState<ServiceScope>(DEFAULT_INPUT.scope);
  const [note, setNote] = useState<{ kind: "ok" | "err"; text: string } | null>(null);
  const [announce, setAnnounce] = useState("");
  const restored = useRef(false);

  // khôi phục cấu hình đã lưu (sau hydration)
  /* eslint-disable react-hooks/set-state-in-effect */
  useEffect(() => {
    try {
      const raw = localStorage.getItem(BUDGET_STORAGE_KEY);
      if (raw) {
        const saved = JSON.parse(raw) as { input?: unknown };
        if (isBudgetInput(saved?.input)) {
          setType(saved.input.buildingType);
          setAreaText(String(saved.input.area));
          setFinish(saved.input.finishLevel);
          setScope(saved.input.scope);
        }
      }
    } catch {
      /* dữ liệu hỏng hoặc bị chặn: dùng mặc định */
    }
    restored.current = true;
  }, []);
  /* eslint-enable react-hooks/set-state-in-effect */

  // nút “Dự toán …” ở phần Dịch vụ chọn sẵn phạm vi
  useEffect(() => {
    const h = (e: Event) => {
      const sc = (e as CustomEvent<{ scope: ServiceScope }>).detail?.scope;
      if (SCOPES.some((x) => x.id === sc)) setScope(sc);
    };
    window.addEventListener(EV.scope, h);
    return () => window.removeEventListener(EV.scope, h);
  }, []);

  const area = useMemo(() => validateArea(areaText), [areaText]);
  const input: BudgetInput | null = area.ok ? { buildingType: type, area: area.value, finishLevel: finish, scope } : null;
  const result = useMemo(() => (input ? calculateBudget(input) : null), [input?.buildingType, input?.area, input?.finishLevel, input?.scope]); // eslint-disable-line react-hooks/exhaustive-deps
  const showError = !area.ok;

  // thông báo cho trình đọc màn hình sau khi ngừng nhập ~300ms
  useEffect(() => {
    const t = setTimeout(() => {
      setAnnounce(result ? `Khoảng ngân sách tham khảo ${formatRange(result.minimum, result.maximum)}.` : "");
    }, 300);
    return () => clearTimeout(t);
  }, [result]);

  const finishLevel = FINISH_LEVELS.find((f) => f.id === finish)!;
  const typeInfo = BUILDING_TYPES.find((b) => b.id === type)!;
  const summary = result && input
    ? [
        "KHỐI NẾP — DỰ TOÁN THAM KHẢO (không phải báo giá)",
        `Loại công trình: ${typeInfo.label} (hệ số ${typeInfo.factor})`,
        `Diện tích: ${input.area} m²`,
        `Phạm vi: ${SCOPES.find((x) => x.id === scope)!.label}${scope === "design" ? "" : ` · mức ${finishLevel.label}`}`,
        `Chi phí cơ sở: ${formatVnd(result.subtotal)}`,
        `Khoảng ngân sách: ${formatRange(result.minimum, result.maximum)} (−10% đến +20%)`,
      ].join("\n")
    : "";

  const onSave = () => {
    if (!input || !result) return;
    try {
      localStorage.setItem(
        BUDGET_STORAGE_KEY,
        JSON.stringify({ schemaVersion: 1, id: crypto.randomUUID(), createdAt: new Date().toISOString(), input, result }),
      );
      setNote({ kind: "ok", text: "Đã lưu dự toán trên thiết bị này." });
    } catch {
      setNote({ kind: "err", text: "Không thể lưu trên thiết bị này, nhưng bạn vẫn có thể tiếp tục tính." });
    }
  };
  const onCopy = async () => {
    try {
      await navigator.clipboard.writeText(summary);
      setNote({ kind: "ok", text: "Đã sao chép dự toán." });
    } catch {
      setNote({ kind: "err", text: "Không thể sao chép. Hãy thử lại hoặc xuất ghi chú." });
    }
  };
  const onReset = () => {
    setType(DEFAULT_INPUT.buildingType);
    setAreaText(String(DEFAULT_INPUT.area));
    setFinish(DEFAULT_INPUT.finishLevel);
    setScope(DEFAULT_INPUT.scope);
    setNote(null);
  };

  const onAreaKey = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key !== "ArrowUp" && e.key !== "ArrowDown") return;
    e.preventDefault();
    const cur = area.ok ? area.value : DEFAULT_INPUT.area;
    const next = Math.min(AREA_MAX, Math.max(AREA_MIN, cur + (e.key === "ArrowUp" ? 5 : -5)));
    setAreaText(String(next));
  };

  return (
    <section id="budget" className={`${s.section} ${s.budget}`} aria-labelledby="budget-title">
      <div className={s.wrap}>
        <i className={s.rule} data-rule />
        <div className={s.secHead}>
          <p className={s.label}>04 / Công cụ dự toán</p>
          <h2 id="budget-title" className={s.h2}>
            Một ngân sách vừa vặn.
          </h2>
          <p className={s.secLead}>
            Chọn loại công trình, diện tích và mức hoàn thiện để hình dung khoảng chi phí có thể phân bổ cho không gian
            của bạn. Mọi con số chỉ mang tính tham khảo.
          </p>
        </div>

        <div className={s.estGrid}>
          <form className={s.estForm} onSubmit={(e) => e.preventDefault()} noValidate aria-label="Công cụ dự toán ngân sách">
            <div className={s.estHead}>
              <span>Khối Nếp / Estimator 01</span>
            </div>

            <fieldset className={s.fs}>
              <legend>01 — Loại công trình</legend>
              <div className={s.seg}>
                {BUILDING_TYPES.map((b) => (
                  <label key={b.id} className={s.opt}>
                    <input type="radio" name="kn-type" value={b.id} checked={type === b.id} onChange={() => setType(b.id)} />
                    <span>{b.label}</span>
                  </label>
                ))}
              </div>
            </fieldset>

            <div className={s.fs}>
              <label htmlFor="kn-area" className={s.legend}>
                02 — Diện tích cần hoàn thiện (m²)
              </label>
              <input
                id="kn-area"
                className={s.input}
                type="text"
                inputMode="decimal"
                autoComplete="off"
                value={areaText}
                aria-invalid={showError}
                aria-describedby={showError ? "kn-area-err kn-area-hint" : "kn-area-hint"}
                onChange={(e) => setAreaText(e.target.value)}
               
                onKeyDown={onAreaKey}
              />
              <p id="kn-area-hint" className={s.hint}>
                Từ {AREA_MIN}{" "}đến 1.000&nbsp;m². Phím ↑ ↓ đổi 5&nbsp;m².
              </p>
              {showError && !area.ok && (
                <p id="kn-area-err" className={s.err} role="alert">
                  {area.message}
                </p>
              )}
            </div>

            <fieldset className={s.fs} disabled={scope === "design"}>
              <legend>03 — Mức hoàn thiện {scope === "design" && <em>(không áp dụng cho “Chỉ thiết kế”)</em>}</legend>
              <div className={s.seg}>
                {FINISH_LEVELS.map((f) => (
                  <label key={f.id} className={s.opt}>
                    <input type="radio" name="kn-finish" value={f.id} checked={finish === f.id} onChange={() => setFinish(f.id)} />
                    <span>
                      {f.label}
                      <small>{(f.rate / 1e6).toLocaleString("vi-VN")}&nbsp;triệu/m²</small>
                    </span>
                  </label>
                ))}
              </div>
              <p className={s.hint}>{finishLevel.note}.</p>
            </fieldset>

            <fieldset className={s.fs}>
              <legend>04 — Phạm vi dịch vụ</legend>
              <div className={s.seg}>
                {SCOPES.map((x) => (
                  <label key={x.id} className={s.opt}>
                    <input type="radio" name="kn-scope" value={x.id} checked={scope === x.id} onChange={() => setScope(x.id)} />
                    <span>{x.label}</span>
                  </label>
                ))}
              </div>
            </fieldset>
          </form>

          <div className={s.estResult} aria-labelledby="est-res-title">
            <p id="est-res-title" className={s.resLabel}>
              Phiếu dự toán KN-EST-01 · Khoảng ngân sách tham khảo
            </p>
            {result && input ? (
              <>
                <p className={s.resNum} data-testid="est-range">
                  {formatRange(result.minimum, result.maximum)}
                </p>
                <p className={s.resBase}>
                  Chi phí cơ sở: <strong data-testid="est-base">{formatVnd(result.subtotal)}</strong>
                </p>
                <p className={s.resMeta}>
                  {input.area.toLocaleString("vi-VN")}&nbsp;m² · hệ số {String(result.buildingFactor).replace(".", ",")}
                </p>
                <dl className={s.break}>
                  <div>
                    <dt>Phí thiết kế</dt>
                    <dd>{formatVnd(result.designCost)}</dd>
                  </div>
                  <div>
                    <dt>Chi phí hoàn thiện</dt>
                    <dd>{formatVnd(result.constructionCost)}</dd>
                  </div>
                </dl>
                <details className={s.how}>
                  <summary>Xem chi tiết cách tính</summary>
                  <p>
                    Phí thiết kế = A × F × D = {input.area} × {result.buildingFactor} × {DESIGN_RATE.toLocaleString("vi-VN")}
                    {scope === "build" ? " (không tính do chỉ hoàn thiện)" : ""}.
                  </p>
                  <p>
                    Chi phí hoàn thiện = A × F × R = {input.area} × {result.buildingFactor} × {finishLevel.rate.toLocaleString("vi-VN")}
                    {scope === "design" ? " (không tính do chỉ thiết kế)" : ""}.
                  </p>
                  <p>
                    Khoảng ngân sách: thấp = cơ sở × 0,9 làm tròn xuống triệu; cao = cơ sở × 1,2 làm tròn lên triệu.
                    A: diện tích, F: hệ số công trình, D: đơn giá thiết kế, R: đơn giá hoàn thiện. Biên −10% / +20% là
                    quy ước tính toán, không phải số liệu thống kê.
                  </p>
                </details>
              </>
            ) : (
              <p className={s.resEmpty} data-testid="est-empty">
                Nhập diện tích hợp lệ (từ {AREA_MIN}{" "}đến 1.000&nbsp;m²) để xem khoảng ngân sách tham khảo.
              </p>
            )}
            <div className={s.resBtns}>
              <button type="button" className={s.btnLight} onClick={onSave} disabled={!result}>
                Lưu dự toán
              </button>
              <button type="button" className={s.btnGhostLight} onClick={onCopy} disabled={!result}>
                Sao chép dự toán
              </button>
              <button type="button" className={s.btnGhostLight} onClick={onReset}>
                Đặt lại
              </button>
            </div>
            <p role="status" className={note?.kind === "err" ? s.noteErr : s.noteOk}>
              {note?.text ?? ""}
            </p>
            <p className={s.resDisc}>
              Chi phí chỉ mang tính tham khảo, không phải báo giá chính thức, chưa bao gồm VAT và các hạng mục ngoài
              phạm vi. Muốn trao đổi kỹ hơn về dự án của bạn?{" "}
              <a href={consultHref}>Bắt đầu trao đổi ↗</a>
            </p>
            <p className={s.srOnly} aria-live="polite">
              {announce}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
