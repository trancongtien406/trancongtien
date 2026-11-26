"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { FLAGS, NEEDS, OUTCOMES, resolveCareOutcome, type CareFlag, type CareNeed } from "../data/care";
import styles from "../brand.module.css";

const EMERGENCY: CareFlag[] = ["breathing", "bleeding", "severe_trauma", "severe_swelling"];

/** Care Navigator: 3 bước. Không chẩn đoán, không lưu lựa chọn sức khỏe (không localStorage). */
export function CareNavigator() {
  const [step, setStep] = useState<1 | 2 | 3>(1);
  const [need, setNeed] = useState<CareNeed | null>(null);
  const [flags, setFlags] = useState<CareFlag[]>([]);
  const headRef = useRef<HTMLHeadingElement>(null);
  const moved = useRef(false);

  useEffect(() => {
    const onPreset = (e: Event) => {
      const n = (e as CustomEvent<{ need: CareNeed }>).detail?.need;
      if (n && NEEDS.some((x) => x.id === n)) { setNeed(n); setFlags([]); setStep(1); }
    };
    window.addEventListener("mc:navigator", onPreset);
    return () => window.removeEventListener("mc:navigator", onPreset);
  }, []);

  useEffect(() => { if (moved.current) headRef.current?.focus(); moved.current = true; }, [step]);

  const reset = useCallback(() => { setNeed(null); setFlags([]); setStep(1); }, []);
  const pickNeed = (n: CareNeed) => { if (n !== need) { setFlags([]); } setNeed(n); };
  const toggleFlag = (f: CareFlag) => {
    setFlags((cur) => {
      const g = FLAGS.find((x) => x.id === f)!.group;
      if (cur.includes(f)) return cur.filter((x) => x !== f);
      if (g === "exclusive") return [f];
      return [...cur.filter((x) => x !== "none" && x !== "unknown"), f];
    });
  };
  const needObj = NEEDS.find((n) => n.id === need) ?? null;
  const hasEmergency = flags.some((f) => EMERGENCY.includes(f));
  const outcome = need ? resolveCareOutcome(need, flags) : null;
  const o = outcome ? OUTCOMES[outcome] : null;

  const onRadioKey = (e: React.KeyboardEvent<HTMLDivElement>) => {
    const keys = ["ArrowDown", "ArrowRight", "ArrowUp", "ArrowLeft"];
    if (!keys.includes(e.key)) return;
    e.preventDefault();
    const root = e.currentTarget;
    const idx = NEEDS.findIndex((n) => n.id === need);
    const dir = e.key === "ArrowDown" || e.key === "ArrowRight" ? 1 : -1;
    const next = NEEDS[(idx + dir + NEEDS.length) % NEEDS.length];
    pickNeed(next.id);
    requestAnimationFrame(() => (root.querySelector(`[data-need="${next.id}"]`) as HTMLElement | null)?.focus());
  };

  return (
    <div className={styles.navPanel} data-mc="nav-panel">
      <div className={styles.panelTop}>
        <span className={styles.panelTitle}>Kiểm tra nhanh</span>
        <span className={styles.panelStep} aria-live="polite">Bước {step} / 3</span>
      </div>
      <div className={styles.safety} role="note">
        <b>Lưu ý an toàn.</b> Nếu bạn đang khó thở, khó nuốt, chảy máu nhiều không cầm được hoặc có chấn thương nghiêm trọng vùng mặt, hãy đến cơ sở cấp cứu ngay. Không chờ hoàn thành công cụ này.
      </div>

      {step === 1 && (
        <div data-mc="step">
          <h3 className={styles.stepTitle} ref={headRef} tabIndex={-1}>Điều gì đưa bạn đến đây?</h3>
          <div role="radiogroup" aria-label="Nhu cầu chăm sóc" className={styles.optGrid} onKeyDown={onRadioKey}>
            {NEEDS.map((n, i) => (
              <button
                key={n.id}
                type="button"
                role="radio"
                aria-checked={need === n.id}
                tabIndex={need ? (need === n.id ? 0 : -1) : i === 0 ? 0 : -1}
                data-need={n.id}
                className={styles.opt}
                data-on={need === n.id ? "1" : "0"}
                onClick={() => pickNeed(n.id)}
              >
                <span className={styles.optMark} aria-hidden="true" />
                <span>{n.label}</span>
              </button>
            ))}
          </div>
          <div className={styles.panelActions}>
            <button type="button" className={`${styles.btn} ${styles.btnPrimary}`} disabled={!need} onClick={() => setStep(2)}>Tiếp tục</button>
            <button type="button" className={styles.btnText} onClick={reset}>Đặt lại</button>
            {!need && <span className={styles.helper} id="nav-help">Hãy chọn một nhu cầu để tiếp tục.</span>}
          </div>
        </div>
      )}

      {step === 2 && (
        <div data-mc="step">
          <h3 className={styles.stepTitle} ref={headRef} tabIndex={-1}>Bạn có đang gặp dấu hiệu nào dưới đây không?</h3>
          <fieldset className={styles.flagSet}>
            <legend className={styles.srOnly}>Dấu hiệu cần chú ý (chọn được nhiều)</legend>
            {FLAGS.map((f) => (
              <label key={f.id} className={styles.flag} data-on={flags.includes(f.id) ? "1" : "0"} data-group={f.group}>
                <input type="checkbox" checked={flags.includes(f.id)} onChange={() => toggleFlag(f.id)} />
                <span className={styles.flagBox} aria-hidden="true" />
                <span>{f.label}</span>
              </label>
            ))}
          </fieldset>
          {hasEmergency && (
            <div className={styles.alertDanger} role="alert">
              <b>{OUTCOMES.emergency.title}.</b> {OUTCOMES.emergency.copy}
            </div>
          )}
          <div className={styles.panelActions}>
            <button type="button" className={`${styles.btn} ${styles.btnPrimary}`} disabled={flags.length === 0} onClick={() => setStep(3)}>Xem định hướng</button>
            <button type="button" className={styles.btnText} onClick={() => setStep(1)}>Quay lại</button>
            {flags.length === 0 && <span className={styles.helper}>Hãy chọn ít nhất một lựa chọn, kể cả &quot;Tôi không chắc&quot;.</span>}
          </div>
        </div>
      )}

      {step === 3 && o && outcome && needObj && (
        <div data-mc="step" aria-live="polite">
          <h3 className={styles.stepTitle} ref={headRef} tabIndex={-1}>Định hướng</h3>
          <div className={styles.result} data-tone={o.tone} data-outcome={outcome}>
            <span className={styles.resultTag}>{o.tone === "danger" ? "Khẩn cấp" : o.tone === "warn" ? "Cần sớm" : o.tone === "info" ? "Trao đổi với bác sĩ" : "Dự kiến"}</span>
            <h4>{o.title}</h4>
            <p>{o.copy}</p>
            {(outcome === "planned" || outcome === "assessment") && (
              <dl className={styles.resultDl}>
                <div><dt>Dịch vụ có thể tìm hiểu</dt><dd>{needObj.service}</dd></div>
                <div><dt>Có thể chuẩn bị</dt><dd>{needObj.prepare}</dd></div>
              </dl>
            )}
            {outcome === "planned" && (
              <a
                className={`${styles.btn} ${styles.btnPrimary}`}
                href="#appointment"
                onClick={() => window.dispatchEvent(new CustomEvent("mc:scheduler", { detail: { serviceId: needObj.serviceId, source: "care-navigator" } }))}
              >
                Xem lịch hẹn
              </a>
            )}
            {outcome !== "planned" && <p className={styles.helper}>Với kết quả này, công cụ không dẫn sang đặt lịch hẹn.</p>}
          </div>
          <div className={styles.panelActions}>
            <button type="button" className={styles.btnText} onClick={() => setStep(2)}>Quay lại</button>
            <button type="button" className={styles.btnText} onClick={reset}>Đặt lại</button>
          </div>
        </div>
      )}
      <p className={styles.panelFoot}>Công cụ này chỉ mang tính định hướng, không đánh giá bệnh lý, không đưa ra chẩn đoán và không thay thế tư vấn của bác sĩ.</p>
    </div>
  );
}
