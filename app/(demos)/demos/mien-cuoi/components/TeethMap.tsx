"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import gsap from "gsap";
import styles from "../brand.module.css";
import { REGIONS } from "../data/content";

type RegionId = (typeof REGIONS)[number]["id"];
type Tooth = { id: string; arch: "up" | "low"; side: "L" | "R"; kind: "incisor" | "canine" | "premolar" | "molar" | "wisdom"; x: number; y: number; rot: number; w: number; h: number };

const KINDS: Tooth["kind"][] = ["wisdom", "molar", "molar", "premolar", "premolar", "canine", "incisor", "incisor"];
const SIZE = { wisdom: [26, 24], molar: [30, 26], premolar: [22, 22], canine: [19, 25], incisor: [17, 24] } as const;
const REGION_OF: Record<Tooth["kind"], RegionId> = { wisdom: "wisdom", molar: "molar", premolar: "premolar", canine: "front", incisor: "front" };

const CX = 250, A = 160, B = 115, CY_UP = 172, CY_LOW = 228;

/** Dựng 32 răng dọc theo hai cung elip: đặt theo chiều dài cung, mỗi răng chiếm đúng bề rộng của nó. */
function build(): Tooth[] {
  // chiều dài cung từ đỉnh (θ = π/2) ra mỗi phía, lấy mẫu số
  const pts: { th: number; len: number }[] = [];
  let len = 0, prev = { x: 0, y: B };
  for (let i = 0; i <= 600; i++) {
    const th = Math.PI / 2 - (i / 600) * (Math.PI / 2);
    const cur = { x: A * Math.cos(th), y: B * Math.sin(th) };
    if (i) len += Math.hypot(cur.x - prev.x, cur.y - prev.y);
    pts.push({ th, len }); prev = cur;
  }
  const total = pts[pts.length - 1].len;
  const widths = KINDS.map((k) => SIZE[k][0]); // 0 = khôn ... 7 = cửa giữa
  const sumW = widths.reduce((s, w) => s + w, 0);
  const gap = (total - sumW) / 8;
  const out: Tooth[] = [];
  (["up", "low"] as const).forEach((arch) => {
    const cy = arch === "up" ? CY_UP : CY_LOW;
    (["L", "R"] as const).forEach((side) => {
      let d = gap * 0.5;
      for (let k = 7; k >= 0; k--) {
        // k = 7 răng cửa giữa (sát đỉnh), k = 0 răng khôn (xa đỉnh)
        const w = widths[k];
        const mid = d + w / 2;
        d += w + gap;
        const hit = pts.find((p) => p.len >= mid) ?? pts[pts.length - 1];
        const sgn = side === "L" ? -1 : 1;
        const x = CX + sgn * A * Math.cos(hit.th);
        const yy = B * Math.sin(hit.th);
        const y = arch === "up" ? cy - yy : cy + yy;
        const dx = -sgn * A * Math.sin(hit.th);
        const dy = (arch === "up" ? -1 : 1) * B * Math.cos(hit.th);
        const rot = (Math.atan2(dy, dx) * 180) / Math.PI;
        const kind = KINDS[k];
        out.push({ id: `${arch}-${side}-${k}`, arch, side, kind, x, y, rot, w: SIZE[kind][0], h: SIZE[kind][1] });
      }
    });
  });
  return out;
}

export function TeethMap() {
  const teeth = useMemo(build, []);
  const [region, setRegion] = useState<RegionId>("front");
  const svgRef = useRef<SVGSVGElement>(null);
  const seen = useRef(false);
  const reg = REGIONS.find((r) => r.id === region)!;

  // vào khung: răng hiện lần lượt theo cung
  useEffect(() => {
    const svg = svgRef.current;
    if (!svg) return;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce) return;
    const els = Array.from(svg.querySelectorAll<SVGElement>("[data-tooth]"));
    const io = new IntersectionObserver((e) => {
      if (!e[0].isIntersecting || seen.current) return;
      seen.current = true;
      gsap.from(els, { scale: 0.2, opacity: 0, transformOrigin: "50% 50%", duration: 0.55, ease: "back.out(1.7)", stagger: { each: 0.03, from: "center" }, clearProps: "opacity,transform" });
    }, { threshold: 0.3 });
    io.observe(svg);
    return () => { io.disconnect(); gsap.killTweensOf(els); };
  }, []);

  // đổi vùng: các răng của vùng nhấp lên một nhịp
  useEffect(() => {
    const svg = svgRef.current;
    if (!svg || !seen.current) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const els = Array.from(svg.querySelectorAll<SVGElement>(`[data-region="${region}"]`));
    gsap.fromTo(els, { y: 0 }, { y: (i: number, el: Element) => ((el as SVGElement).dataset.arch === "up" ? 7 : -7), duration: 0.22, yoyo: true, repeat: 1, ease: "power2.out", stagger: 0.02, clearProps: "transform" });
  }, [region]);

  return (
    <div className={styles.teethWrap}>
      <div className={styles.teethFig}>
        <svg ref={svgRef} viewBox="0 0 500 400" className={styles.teethSvg} role="img" aria-label={`Sơ đồ hàm răng, đang tô sáng vùng ${reg.label.toLowerCase()}`}>
          <path d={`M${CX - A - 24} ${CY_UP} A${A + 24} ${B + 24} 0 0 1 ${CX + A + 24} ${CY_UP}`} className={styles.gumLine} data-on={region === "gum" ? "1" : "0"} fill="none" />
          <path d={`M${CX - A - 24} ${CY_LOW} A${A + 24} ${B + 24} 0 0 0 ${CX + A + 24} ${CY_LOW}`} className={styles.gumLine} data-on={region === "gum" ? "1" : "0"} fill="none" />
          <line x1="60" y1="200" x2="440" y2="200" className={styles.bite} />
          {teeth.map((t) => (
            <g key={t.id} transform={`translate(${t.x.toFixed(1)} ${t.y.toFixed(1)})`}>
              <g className={styles.toothG} data-tooth="" data-region={REGION_OF[t.kind]} data-arch={t.arch} onClick={() => setRegion(REGION_OF[t.kind])}>
                <rect x={-t.w / 2} y={-t.h / 2} width={t.w} height={t.h} rx={t.kind === "incisor" ? 6 : 9} transform={`rotate(${t.rot.toFixed(1)})`} className={styles.tooth} data-on={REGION_OF[t.kind] === region ? "1" : "0"} />
              </g>
            </g>
          ))}
          <text x="250" y="195" textAnchor="middle" className={styles.teethCap}>Hàm trên</text>
          <text x="250" y="213" textAnchor="middle" className={styles.teethCap}>Hàm dưới</text>
        </svg>
      </div>
      <div className={styles.teethSide}>
        <div role="radiogroup" aria-label="Vùng răng bạn quan tâm" className={styles.regionBtns}>
          {REGIONS.map((r) => (
            <button key={r.id} type="button" role="radio" aria-checked={region === r.id} className={styles.regionBtn} data-testid={`region-${r.id}`} onClick={() => setRegion(r.id)}>{r.label}</button>
          ))}
        </div>
        <div className={styles.regionInfo} aria-live="polite" data-testid="region-info">
          <h3 className={styles.h3}>{reg.label}</h3>
          <p className={styles.bodySm}>{reg.desc}</p>
          <p className={styles.regionLab}>Thường được hỏi về</p>
          <ul className={styles.regionSvc}>
            {reg.services.map(([sid, name]) => (
              <li key={sid}>
                <a href="#appointment" className={styles.regionLink} onClick={() => window.dispatchEvent(new CustomEvent("mc:scheduler", { detail: { serviceId: sid, source: "teeth-map" } }))}>{name} <span aria-hidden="true">→</span></a>
              </li>
            ))}
          </ul>
          <p className={styles.regionLab}>Bạn có thể ghi lại trước khi khám</p>
          <p className={styles.bodySm}>{reg.ask}</p>
        </div>
        <p className={styles.helper}>Sơ đồ chỉ giúp bạn chọn dịch vụ để hỏi. Phòng khám không chẩn đoán qua trang web; tình trạng cụ thể do bác sĩ đánh giá khi khám.</p>
      </div>
    </div>
  );
}
