import { SLOTS, UNITS, balconyArea, innerArea, planOf, quote, slotsOf, type UnitId } from "../data/plans";
import styles from "../brand.module.css";

const WHO: Record<UnitId, string> = {
  "1pn": "Người ở một mình, cặp đôi hoặc mua để nghỉ dưỡng và cho thuê.",
  "2pn": "Gia đình trẻ có con nhỏ, hoặc cặp đôi cần thêm một phòng làm việc.",
  "3pn": "Gia đình nhiều thế hệ, cần phòng riêng cho từng người.",
};

const nf = new Intl.NumberFormat("vi-VN", { minimumFractionDigits: 2, maximumFractionDigits: 2 });
const n0 = new Intl.NumberFormat("vi-VN", { maximumFractionDigits: 0 });

function Thumb({ unit }: { unit: UnitId }) {
  const plan = planOf(unit);
  const k = 20;
  const u = UNITS.find((x) => x.id === unit)!;
  const w = u.inner.w * k + 8, h = (u.inner.h + 1.6) * k + 8;
  return (
    <svg className={styles.uvThumb} viewBox={`0 0 ${w} ${h}`} role="img" aria-label={`Sơ đồ mặt bằng căn ${u.label}`}>
      <g fill="none" stroke="currentColor" strokeWidth="1.2" transform="translate(4 4)">
        {SLOTS.filter((s) => plan[s]).map((s) => {
          const r = plan[s]!;
          return <rect key={s} x={r.x * k} y={r.y * k} width={r.w * k} height={r.h * k} strokeDasharray={s === "balcony" ? "4 3" : undefined} stroke={s === "balcony" ? "var(--cv-copper-l)" : "currentColor"} opacity={s === "balcony" ? 1 : 0.85} />;
        })}
      </g>
    </svg>
  );
}

export function Units() {
  return (
    <section id="loai-can" className={styles.uv} aria-labelledby="cv-uv-h">
      <div className={styles.wrap}>
        <header className={styles.secHead} data-cv="reveal">
          <p className={styles.sheet}><span>05b</span><i aria-hidden="true" />Bản vẽ A-05b · Loại căn</p>
          <h2 id="cv-uv-h" className={styles.h2}>Ba loại căn, diện tích và giá tham khảo.</h2>
          <p className={styles.lede}>Diện tích là diện tích sử dụng trong lòng căn, ban công tính riêng. Giá tham khảo chạy từ tầng thấp, nội thất cơ bản tới tầng cao, hướng Đông, nội thất đầy đủ.</p>
        </header>
        <ul className={styles.uvGrid}>
          {UNITS.map((u) => {
            const lo = quote({ unit: u.id, tier: "thap", facing: "dong-bac", furnish: "co-ban" }).total / 1e9;
            const hi = quote({ unit: u.id, tier: "cao", facing: "dong", furnish: "day-du" }).total / 1e9;
            const baths = slotsOf(u.id).filter((s) => s.startsWith("bath")).length;
            const beds = slotsOf(u.id).filter((s) => s.startsWith("bed")).length;
            return (
              <li key={u.id} className={styles.uvCard} data-cv="reveal">
                <div className={styles.uvTop}><span className={styles.uvLabel}>{u.label}</span><Thumb unit={u.id} /></div>
                <h3>{u.name}</h3>
                <p className={styles.uvBlurb}>{u.blurb}</p>
                <dl className={styles.uvDl}>
                  <div><dt>Sử dụng</dt><dd>{n0.format(innerArea(u.id))}&nbsp;m²</dd></div>
                  <div><dt>Ban công</dt><dd>{n0.format(balconyArea(u.id))}&nbsp;m²</dd></div>
                  <div><dt>Phòng</dt><dd>{beds} ngủ · {baths} tắm</dd></div>
                </dl>
                <p className={styles.uvWho}>{WHO[u.id]}</p>
                <p className={styles.uvPrice}><small>Giá tham khảo</small><b>{nf.format(lo)} đến {nf.format(hi)} tỷ</b></p>
                <a className={`${styles.btn} ${styles.btnGhost} ${styles.btnSm}`} href="#mat-bang" aria-label={`Xem mặt bằng căn ${u.label}`}>Xem mặt bằng</a>
              </li>
            );
          })}
        </ul>
        <p className={`${styles.fine} ${styles.uvFine}`}>Sơ đồ chỉ để nhận dạng bố cục. Bảng giá chính thức và chính sách hiện hành do đội tư vấn gửi trực tiếp.</p>
      </div>
    </section>
  );
}
