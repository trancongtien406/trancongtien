import { StickyChapters } from "@/features/showroom/effects";
import { CHAPTERS, FINISHES, type ChapterData } from "../data/content";
import { UNITS, planOf, SLOTS, SCALE } from "../data/plans";
import { Photo } from "./Photo";
import styles from "../brand.module.css";

/** Mọi nét có pathLength=1; CSS vẽ dần khi chương tương ứng đang hiện (data-active trên gốc StickyChapters). */
const P = { pathLength: 1 } as const;

function OverlayLocation() {
  return (
    <svg className={styles.ov} viewBox="0 0 800 800" preserveAspectRatio="xMidYMid slice" aria-hidden="true" focusable="false">
      <g fill="none" stroke="currentColor" strokeWidth="1.3">
        <circle {...P} cx="470" cy="430" r="80" />
        <circle {...P} cx="470" cy="430" r="165" />
        <circle {...P} cx="470" cy="430" r="255" opacity=".7" />
        <path {...P} d="M470 130V730M170 430H770M258 218L682 642M682 218L258 642" opacity=".3" />
        <path {...P} d="M650 190l14 -24l14 24M664 166v52" stroke="var(--cv-copper-l)" />
        <path {...P} d="M120 676H680M120 668v16M320 668v16M520 668v16M680 668v16" opacity=".6" />
      </g>
      <g className={styles.ovText}>
        <text x="486" y="422">Bãi biển</text>
        <text x="486" y="338">Phố ven biển</text>
        <text x="486" y="254">Trung tâm</text>
        <text x="690" y="212">B</text>
        <text x="120" y="652">Tỉ lệ 1:5000</text>
      </g>
    </svg>
  );
}

function OverlayAmenity() {
  return (
    <svg className={styles.ov} viewBox="0 0 800 800" preserveAspectRatio="xMidYMid slice" aria-hidden="true" focusable="false">
      <g fill="none" stroke="currentColor" strokeWidth="1.3">
        <rect {...P} x="400" y="470" width="290" height="150" rx="4" />
        <rect {...P} x="418" y="488" width="254" height="114" rx="2" stroke="var(--cv-copper-l)" />
        <path {...P} d="M418 526H672M418 564H672" opacity=".5" />
        <path {...P} d="M400 428h60v22h-60zM470 428h60v22h-60zM540 428h60v22h-60zM610 428h60v22h-60z" opacity=".7" />
        <path {...P} d="M130 130V690M120 130h20M120 300h20M120 545h20M120 690h20" />
        <path {...P} d="M360 545H400" stroke="var(--cv-copper-l)" />
      </g>
      <g className={styles.ovText}>
        <text x="156" y="136">36 · Sân thượng</text>
        <text x="156" y="306">6 · Phòng tập</text>
        <text x="156" y="551">5 · Hồ bơi tràn bờ</text>
        <text x="156" y="696">1 · Sảnh đón</text>
        <text x="400" y="654">Mặt bằng hồ bơi tầng 5</text>
      </g>
    </svg>
  );
}

function OverlayUnits() {
  const gap = 40;
  const k = 0.4;
  const widths = UNITS.map((u) => u.inner.w * SCALE * k);
  const total = widths.reduce((a, b) => a + b, 0) + gap * 2;
  let x = (800 - total) / 2;
  return (
    <svg className={styles.ov} viewBox="0 0 800 800" preserveAspectRatio="xMidYMid slice" aria-hidden="true" focusable="false">
      <g fill="none" stroke="currentColor" strokeWidth="1.2">
        {UNITS.map((u, i) => {
          const plan = planOf(u.id);
          const ox = x, oy = 540 - u.inner.h * SCALE * k;
          x += widths[i] + gap;
          return (
            <g key={u.id}>
              {SLOTS.filter((s) => plan[s]).map((s) => {
                const r = plan[s]!;
                return <rect key={s} {...P} x={ox + r.x * SCALE * k} y={oy + (r.y - 1.6) * SCALE * k} width={r.w * SCALE * k} height={r.h * SCALE * k} stroke={s === "balcony" ? "var(--cv-copper-l)" : "currentColor"} />;
              })}
              <text className={styles.ovLabel} x={ox} y="580" stroke="none" fill="currentColor">{u.label}</text>
            </g>
          );
        })}
        <path {...P} d="M110 600H690" opacity=".5" />
      </g>
    </svg>
  );
}

function OverlayFinish() {
  return (
    <svg className={styles.ov} viewBox="0 0 800 800" preserveAspectRatio="xMidYMid slice" aria-hidden="true" focusable="false">
      <g fill="none" stroke="currentColor" strokeWidth="1.2">
        {FINISHES.map((f, i) => {
          const x = 110 + i * 150, y = 470;
          return (
            <g key={f.name}>
              <rect {...P} x={x} y={y} width="130" height="130" stroke={i === 2 ? "var(--cv-copper-l)" : "currentColor"} />
              {f.hatch === "stone" && <path {...P} d={`M${x} ${y + 130}L${x + 130} ${y}M${x} ${y + 85}L${x + 85} ${y}M${x + 45} ${y + 130}L${x + 130} ${y + 45}`} opacity=".7" />}
              {f.hatch === "wood" && <path {...P} d={`M${x} ${y + 26}H${x + 130}M${x} ${y + 52}H${x + 130}M${x} ${y + 78}H${x + 130}M${x} ${y + 104}H${x + 130}`} opacity=".7" />}
              {f.hatch === "brass" && <path {...P} d={`M${x} ${y}L${x + 130} ${y + 130}M${x + 130} ${y}L${x} ${y + 130}`} opacity=".7" />}
              {f.hatch === "glass" && <path {...P} d={`M${x + 18} ${y + 112}L${x + 112} ${y + 18}M${x + 44} ${y + 122}L${x + 122} ${y + 44}`} opacity=".7" />}
              <text className={styles.ovLabel} x={x} y={y + 160} stroke="none" fill="currentColor">{f.name}</text>
            </g>
          );
        })}
      </g>
    </svg>
  );
}

const OVERLAYS = [OverlayLocation, OverlayAmenity, OverlayUnits, OverlayFinish];

function Visual({ c, i }: { c: ChapterData; i: number }) {
  const Ov = OVERLAYS[i];
  return (
    <div className={`${styles.chVisual} ${styles[`chV${i}`]}`}>
      <div className={styles.chPhoto}><Photo file={c.photo} alt={c.alt} sizes="(max-width: 900px) 100vw, 52vw" pos={c.pos} /></div>
      <span className={styles.chShade} aria-hidden="true" />
      <Ov />
      <span className={styles.chNo} aria-hidden="true">{c.no}</span>
    </div>
  );
}

export function Chapters() {
  return (
    <section className={styles.chapters} id="chuong" aria-label="Bốn chương: vị trí, tiện ích, căn hộ, hoàn thiện">
      <StickyChapters
        className={styles.chRoot}
        columns="minmax(0, 1fr) minmax(0, 1.08fr)"
        breakpoint={900}
        visualRight
        visualClassName={styles.chVis}
        chapterClassName={styles.chText}
        chapters={CHAPTERS.map((c, i) => ({
          id: c.id,
          visual: <Visual c={c} i={i} />,
          content: (
            <div className={styles.chBody} data-cv="reveal">
              <p className={styles.sheet}><span>{c.no}</span><i aria-hidden="true" />{c.sheet}</p>
              <h2 className={styles.h2}>{c.title}</h2>
              <p className={styles.lede}>{c.lead}</p>
              <dl className={styles.points}>
                {c.points.map((p) => (<div key={p.k}><dt>{p.k}</dt><dd>{p.v}</dd></div>))}
              </dl>
              {c.id === "can-ho" && <a className={`${styles.btn} ${styles.btnGhost} ${styles.btnSm}`} href="#mat-bang">Mở mặt bằng căn hộ</a>}
            </div>
          ),
        }))}
      />
    </section>
  );
}
