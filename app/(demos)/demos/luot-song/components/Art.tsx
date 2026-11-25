import styles from "../brand.module.css";

/** Đường sóng lặp: `periods` chu kỳ, mỗi chu kỳ rộng `period`, đỉnh cao `amp`. Hai bản sao liền nhau để chạy vô tận. */
export function wavePath(periods: number, period: number, amp: number, base: number, h: number) {
  const hw = period / 2;
  let d = `M0 ${base} q ${hw / 2} ${-2 * amp} ${hw} 0`;
  for (let i = 1; i < periods * 2; i++) d += ` t ${hw} 0`;
  return `${d} V${h} H0 Z`;
}

const LAYERS = [
  { c: "var(--rs-orange)", dur: 34, amp: 26, k: 1.0, dir: 1, base: 70, hide: false },
  { c: "var(--rs-sun)", dur: 27, amp: 22, k: 0.9, dir: -1, base: 92, hide: true },
  { c: "var(--rs-teal)", dur: 22, amp: 24, k: 1.15, dir: 1, base: 118, hide: false },
  { c: "var(--rs-deep)", dur: 17, amp: 20, k: 1.3, dir: -1, base: 146, hide: true },
  { c: "var(--rs-brown)", dur: 13, amp: 16, k: 1.5, dir: 1, base: 176, hide: false },
] as const;

/** Năm lớp sóng chuyển động ngang; biên độ (scaleY) đọc biến --rs-amp do Motion cập nhật theo cuộn. */
export function WaveStack({ className }: { className?: string }) {
  return (
    <div className={`${styles.waves} ${className ?? ""}`} aria-hidden="true" data-rs="waves">
      {LAYERS.map((l, i) => (
        <div key={i} className={`${styles.waveLayer} ${l.hide ? styles.waveHideSm : ""}`} style={{ ["--k" as string]: l.k }}>
          <svg className={styles.waveSvg} viewBox="0 0 2400 200" preserveAspectRatio="none" style={{ animationDuration: `${l.dur}s`, animationDirection: l.dir === 1 ? "normal" : "reverse" }}>
            <path d={wavePath(4, 600, l.amp, l.base, 200)} fill={l.c} />
          </svg>
        </div>
      ))}
    </div>
  );
}

/** Đường sóng tĩnh làm viền giữa hai section; `fill` là màu section phía trên. */
export function Divider({ fill, flip, className }: { fill: string; flip?: boolean; className?: string }) {
  return (
    <svg className={`${styles.divider} ${className ?? ""}`} viewBox="0 0 1200 60" preserveAspectRatio="none" aria-hidden="true" style={flip ? { transform: "scaleY(-1)" } : undefined}>
      <path d={wavePath(6, 200, 14, 22, 60)} fill={fill} />
    </svg>
  );
}

/** Mặt trời: đĩa cam, các vòng đồng tâm, tia quay chậm. Các biến --rs-rise/--rs-spin do Motion đặt. */
export function Sun({ className }: { className?: string }) {
  const rays = Array.from({ length: 28 }, (_, i) => i);
  return (
    <div className={`${styles.sun} ${className ?? ""}`} aria-hidden="true" data-rs="sun">
      <svg viewBox="-300 -300 600 600" className={styles.sunSvg}>
        <g className={styles.sunRays}>
          {rays.map((i) => (
            <path key={i} d="M-9 -168 L0 -296 L9 -168Z" fill={i % 2 ? "var(--rs-orange)" : "var(--rs-sun)"} transform={`rotate(${(360 / rays.length) * i})`} />
          ))}
        </g>
        <circle r="168" fill="var(--rs-orange)" />
        <circle r="138" fill="var(--rs-sun)" />
        <circle r="108" fill="var(--rs-orange)" />
        <circle r="78" fill="var(--rs-sun)" />
        <circle r="48" fill="var(--rs-orange)" />
      </svg>
    </div>
  );
}

/** Tem tròn: chữ chạy theo vòng tròn (textPath), quay theo cuộn và chậm quay thêm. */
export function Sticker({ className, size = 168, uid = "a", text = "RÁNG SÓNG SURF CLUB · ĐÀ NẴNG · CHẠM SÓNG BẮT NẮNG · " }: { className?: string; size?: number; uid?: string; text?: string }) {
  const id = `rs-st-${uid}`;
  return (
    <div className={`${styles.sticker} ${className ?? ""}`} style={{ width: size, height: size }} aria-hidden="true" data-rs="sticker">
      <div className={styles.stickerScroll}>
        <svg viewBox="0 0 200 200" className={styles.stickerSpin}>
          <defs><path id={id} d="M100 100 m-74 0 a74 74 0 1 1 148 0 a74 74 0 1 1 -148 0" /></defs>
          <text className={styles.stickerText}>
            <textPath href={`#${id}`} textLength="460" lengthAdjust="spacing">{text}</textPath>
          </text>
        </svg>
      </div>
      <svg viewBox="0 0 200 200" className={styles.stickerCore}>
        <circle cx="100" cy="100" r="46" fill="var(--rs-orange)" />
        <circle cx="100" cy="92" r="19" fill="var(--rs-sun)" />
        <path d="M58 112 q10.5 -10 21 0 t 21 0 t 21 0 t 21 0" fill="none" stroke="var(--rs-brown)" strokeWidth="6" strokeLinecap="round" />
        <path d="M58 128 q10.5 -10 21 0 t 21 0 t 21 0 t 21 0" fill="none" stroke="var(--rs-brown)" strokeWidth="6" strokeLinecap="round" />
      </svg>
    </div>
  );
}

export function Star({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="-10 -10 20 20" aria-hidden="true" width="1em" height="1em">
      <path d="M0 -10 L2.2 -2.2 L10 0 L2.2 2.2 L0 10 L-2.2 2.2 L-10 0 L-2.2 -2.2Z" fill="currentColor" />
    </svg>
  );
}
