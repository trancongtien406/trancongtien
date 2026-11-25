"use client";

import { useEffect, useId, useMemo, useRef, useState } from "react";
import { NumberTicker, ShineSweep } from "@/features/showroom/effects";
import {
  DEFAULT_GOLD_24K_PER_GRAM,
  DEFAULT_STONE_MM,
  FINISHES,
  MATERIALS,
  RHODIUM_FEE,
  SETTING_FEE_PER_STONE,
  SILVER_PER_GRAM,
  STONES,
  STONE_SIZES,
  TYPES,
  formatGram,
  formatVnd,
  quote,
  summaryText,
  type Config,
  type FinishId,
  type MaterialId,
  type StoneId,
  type TypeId,
} from "../data/pricing";
import { Glare } from "./Glare";
import { Preview } from "./Preview";
import styles from "../brand.module.css";

type Opt = { id: string; label: string; sub?: string };

function Chips({ name, legend, options, value, onChange, hint, cols }: { name: string; legend: string; options: Opt[]; value: string; onChange: (v: string) => void; hint?: string; cols?: number }) {
  return (
    <fieldset className={styles.fs}>
      <legend>{legend}</legend>
      <div className={styles.chips} style={cols ? ({ ["--cols" as string]: cols } as React.CSSProperties) : undefined} data-name={name}>
        {options.map((o) => (
          <label key={o.id} className={styles.chip}>
            <input type="radio" name={name} value={o.id} checked={value === o.id} onChange={() => onChange(o.id)} />
            <span>
              <b>{o.label}</b>
              {o.sub ? <small>{o.sub}</small> : null}
            </span>
          </label>
        ))}
      </div>
      {hint ? <p className={styles.fsHint}>{hint}</p> : null}
    </fieldset>
  );
}

const pctText = (p: number) => String(Math.round(p * 1000) / 10).replace(".", ",");

const DEFAULT: Omit<Config, "goldPerGram"> = { type: "ring", material: "g18", stone: "syn", stoneMm: DEFAULT_STONE_MM, size: 12, finish: "gloss" };

export function Configurator({ consultHref }: { consultHref: string }) {
  const uid = useId().replace(/[^a-zA-Z0-9_-]/g, "");
  const [base, setBase] = useState(DEFAULT);
  const [goldText, setGoldText] = useState(String(DEFAULT_GOLD_24K_PER_GRAM));
  const [copied, setCopied] = useState<"" | "ok" | "fail">("");
  const resultRef = useRef<HTMLDivElement>(null);

  const digits = goldText.replace(/\D/g, "");
  const goldPerGram = digits ? parseInt(digits, 10) : NaN;
  const cfg: Config = { ...base, goldPerGram };
  const q = useMemo(() => quote(cfg), [base, goldPerGram]); // eslint-disable-line react-hooks/exhaustive-deps
  const t = TYPES.find((x) => x.id === base.type)!;
  const mat = MATERIALS.find((x) => x.id === base.material)!;
  const isGold = mat.kind === "gold";
  const priceBad = isGold && !(Number.isFinite(goldPerGram) && goldPerGram > 0);

  useEffect(() => {
    const on = (e: Event) => {
      const d = (e as CustomEvent).detail as { type: TypeId; material: MaterialId; stone: StoneId; size: number; stoneMm?: number };
      if (!d) return;
      setBase({ type: d.type, material: d.material, stone: d.stone, size: d.size, stoneMm: d.stoneMm ?? DEFAULT_STONE_MM, finish: "gloss" });
      setCopied("");
    };
    window.addEventListener("kn:preset", on);
    return () => window.removeEventListener("kn:preset", on);
  }, []);

  const set = <K extends keyof typeof base>(k: K, v: (typeof base)[K]) => {
    setBase((b) => ({ ...b, [k]: v }));
    setCopied("");
  };
  const setType = (id: TypeId) => {
    const nt = TYPES.find((x) => x.id === id)!;
    setBase((b) => ({ ...b, type: id, size: nt.defaultSize }));
    setCopied("");
  };

  const summary = summaryText(cfg, q);
  const copy = async () => {
    try {
      await navigator.clipboard.writeText(summary);
      setCopied("ok");
    } catch {
      setCopied("fail");
    }
  };

  const stoneLabel = base.stone === "none" ? "Không đá" : `${STONES.find((s) => s.id === base.stone)!.label} ${String(base.stoneMm).replace(".", ",")} mm`;

  return (
    <section className={styles.tool} id="cau-hinh" aria-labelledby="tool-title" data-kn="tool">
      <div className={styles.wrap}>
        <Glare className={styles.toolPanel} strength="strong">
          <header className={styles.toolHead}>
            <p className={styles.label}>Thiết kế riêng</p>
            <h2 id="tool-title" className={styles.h2}>Thiết kế trang sức của bạn.</h2>
            <p className={styles.headText}>Chọn loại, chất liệu, đá và kích cỡ. Khoảng giá tham khảo được tính ra từng khoản để bạn thấy tiền nằm ở đâu.</p>
          </header>

          <div className={styles.toolGrid}>
            <div className={styles.toolLeft}>
              <div className={styles.previewBox}>
                <div className={styles.previewTag}>
                  <span>{t.label}</span>
                  <span>{mat.short}</span>
                </div>
                <div key={`${base.type}-${base.material}-${base.stone}`} className={styles.previewSvg} data-testid="preview">
                  <Preview uid={uid} type={base.type} material={base.material} stone={base.stone} stoneMm={base.stoneMm} size={base.size} finish={base.finish} />
                </div>
                <p className={styles.miniPrice} aria-hidden="true">{q.ok ? `${formatVnd(q.min)} – ${formatVnd(q.max)}` : "Chưa tính được giá"}</p>
                <p className={styles.previewCap}>{stoneLabel} · {t.sizeLabel} {base.size}{t.unit ? ` ${t.unit}` : ""} · {FINISHES.find((f) => f.id === base.finish)!.label}</p>
              </div>

              <div ref={resultRef} className={styles.result} data-testid="result" data-state={q.ok ? "ok" : "empty"}>
                {q.ok ? (
                  <>
                    <p className={styles.resultLabel}>Khoảng giá tham khảo</p>
                    <p className={styles.resultPrice} data-testid="price">
                      <NumberTicker value={q.min} suffix=" ₫" />
                      <span aria-hidden="true" className={styles.dash}>–</span>
                      <NumberTicker value={q.max} suffix=" ₫" />
                    </p>
                    <p className={styles.resultWeight}>Trọng lượng ước tính <b data-testid="weight">{formatGram(q.weightMin)} – {formatGram(q.weightMax)} g</b></p>
                    <p className={styles.srOnly} role="status">{`Khoảng giá tham khảo từ ${formatVnd(q.min)} đến ${formatVnd(q.max)}.`}</p>
                    <dl className={styles.break} data-testid="breakdown">
                      <div><dt>Kim loại <small>{formatGram(q.weight)} g × {pctText(mat.purity)}% × {isGold ? formatVnd(goldPerGram) : formatVnd(SILVER_PER_GRAM)}/g</small></dt><dd>{formatVnd(q.metal)}</dd></div>
                      <div><dt>Công chế tác <small>{FINISHES.find((f) => f.id === base.finish)!.label}</small></dt><dd>{formatVnd(q.labor)}</dd></div>
                      {base.stone !== "none" ? (
                        <>
                          <div><dt>Đá <small>{stoneLabel}{t.stones > 1 ? ` × ${t.stones}` : ""}</small></dt><dd>{formatVnd(q.stone)}</dd></div>
                          <div><dt>Công gắn đá <small>{formatVnd(SETTING_FEE_PER_STONE)} mỗi viên</small></dt><dd>{formatVnd(q.setting)}</dd></div>
                        </>
                      ) : null}
                      {q.extra > 0 ? <div><dt>Phủ rhodium <small>vàng trắng</small></dt><dd>{formatVnd(RHODIUM_FEE)}</dd></div> : null}
                    </dl>
                    <p className={styles.formula}>
                      Khoảng giá = từng khoản ± biên độ (kim loại 5%, công 10%, đá tổng hợp 15%, đá tự nhiên 40%). Số ở bảng là giá trị giữa; làm tròn tới 10.000 ₫. Giá tham khảo, được xác nhận sau khi thống nhất thiết kế và vật liệu.
                    </p>
                  </>
                ) : (
                  <div data-testid="empty">
                    <p className={styles.resultLabel}>Chưa tính được giá</p>
                    <p className={styles.emptyMsg}>
                      {q.reason === "gold-price" ? "Nhập đơn giá vàng 24K lớn hơn 0 để xem khoảng giá." : "Chọn lại kích cỡ hoặc cỡ đá để xem khoảng giá."}
                    </p>
                  </div>
                )}
                <div className={styles.resultActions}>
                  <ShineSweep trigger="hover" color="rgba(255,244,200,0.7)" className={styles.btnWrap}>
                    <a className={styles.btnGold} href={consultHref} data-cursor="" data-testid="consult">Nhận tư vấn với cấu hình này</a>
                  </ShineSweep>
                  <button type="button" className={styles.btnLine} onClick={copy} disabled={!q.ok}>Sao chép tóm tắt</button>
                </div>
                <p className={styles.copyState} role="status" aria-live="polite">
                  {copied === "ok" ? "Đã sao chép tóm tắt, bạn có thể dán vào khung tư vấn." : copied === "fail" ? "Không sao chép được. Hãy chọn đoạn tóm tắt bên dưới và sao chép thủ công." : ""}
                </p>
                <pre className={styles.summary} data-testid="summary" tabIndex={0} aria-label="Tóm tắt cấu hình">{q.ok ? summary : "Chưa có tóm tắt."}</pre>
              </div>
            </div>

            <form className={styles.toolRight} aria-label="Cấu hình trang sức" onSubmit={(e) => e.preventDefault()} noValidate>
              <Chips name="type" legend="Loại trang sức" options={TYPES.map((x) => ({ id: x.id, label: x.label }))} value={base.type} onChange={(v) => setType(v as TypeId)} hint={t.hint} cols={4} />
              <Chips name="material" legend="Chất liệu" options={MATERIALS.map((x) => ({ id: x.id, label: x.label, sub: x.note }))} value={base.material} onChange={(v) => set("material", v as MaterialId)} cols={2} />
              <Chips name="stone" legend="Đá" options={STONES.map((x) => ({ id: x.id, label: x.label, sub: x.note }))} value={base.stone} onChange={(v) => set("stone", v as StoneId)} cols={3} />
              {base.stone !== "none" ? (
                <Chips name="stoneMm" legend="Cỡ đá" options={STONE_SIZES.map((x) => ({ id: String(x.mm), label: `${String(x.mm).replace(".", ",")} mm` }))} value={String(base.stoneMm)} onChange={(v) => set("stoneMm", Number(v))} hint={base.stone === "nat" ? "Giá đá tự nhiên dao động rộng theo loại đá và chất lượng, nên khoảng giá rộng hơn." : undefined} cols={5} />
              ) : null}
              <Chips name="size" legend={`${t.sizeLabel}${t.unit ? ` (${t.unit})` : ""}`} options={t.sizes.map((s) => ({ id: String(s), label: String(s) }))} value={String(base.size)} onChange={(v) => set("size", Number(v))} cols={t.sizes.length > 5 ? 7 : t.sizes.length} />
              <Chips name="finish" legend="Hoàn thiện bề mặt" options={FINISHES.map((x) => ({ id: x.id, label: x.label }))} value={base.finish} onChange={(v) => set("finish", v as FinishId)} cols={3} />

              <fieldset className={styles.fs}>
                <legend>Đơn giá tham khảo</legend>
                <div className={styles.priceRow}>
                  <label htmlFor={`${uid}-gold`}>Vàng 24K (đồng mỗi gam)</label>
                  <input
                    id={`${uid}-gold`}
                    type="text"
                    inputMode="numeric"
                    autoComplete="off"
                    value={goldText}
                    disabled={!isGold}
                    aria-invalid={priceBad}
                    aria-describedby={`${uid}-gold-note`}
                    onChange={(e) => {
                      setGoldText(e.target.value);
                      setCopied("");
                    }}
                    onBlur={() => digits && setGoldText(new Intl.NumberFormat("vi-VN").format(parseInt(digits, 10)))}
                  />
                  <button type="button" className={styles.reset} onClick={() => setGoldText(String(DEFAULT_GOLD_24K_PER_GRAM))} disabled={!isGold}>Dùng mức mặc định</button>
                </div>
                <p id={`${uid}-gold-note`} className={priceBad ? styles.err : styles.fsHint}>
                  {priceBad
                    ? "Nhập số lớn hơn 0, ví dụ 4000000."
                    : isGold
                      ? "Đây là đơn giá do bạn nhập hoặc mức tham khảo mặc định, không phải giá niêm yết. Giá vàng thay đổi hằng ngày."
                      : `Bạc 925 dùng đơn giá bạc tham khảo ${formatVnd(SILVER_PER_GRAM)} mỗi gam.`}
                </p>
              </fieldset>
              <p className={styles.fsHint}>Tuổi vàng K = K ÷ 24 phần vàng nguyên chất (10K ≈ 41,7%, 14K ≈ 58,5%, 18K = 75%). Giá chưa gồm các khoản phát sinh khi thiết kế riêng.</p>
            </form>
          </div>
        </Glare>
      </div>
    </section>
  );
}
