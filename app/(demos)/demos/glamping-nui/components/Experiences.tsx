import { CursorSpotlight, ParallaxLayer } from "@/features/showroom/effects";
import styles from "../brand.module.css";
import { ACTIVITIES } from "../data/content";
import { vnd } from "../lib/format";
import { Ignite } from "./Ignite";
import { Photo } from "./Photo";
import { PickButton } from "./Pick";

const ICONS: Record<string, React.ReactNode> = {
  bbq: (<><path d="M6 22h36M10 22a14 14 0 0 0 28 0" /><path d="M16 10c0 4 4 4 4 8M24 8c0 4 4 4 4 10M32 10c0 4 4 4 4 8" /><path d="M14 38l-4 6M34 38l4 6" /></>),
  trek: (<><path d="M4 40l12-20 8 12 6-8 14 16z" /><path d="M24 40c0-4 6-5 6-9s-6-4-6-9" strokeDasharray="2 4" /></>),
  stars: (<><path d="M24 6l3.4 9.6L37 19l-9.6 3.4L24 32l-3.4-9.6L11 19l9.6-3.4z" /><path d="M38 30l1.4 3.6L43 35l-3.6 1.4L38 40l-1.4-3.6L33 35l3.6-1.4zM10 32l1 2.6 2.6 1-2.6 1-1 2.6-1-2.6-2.6-1 2.6-1z" /></>),
  atv: (<><circle cx="13" cy="34" r="7" /><circle cx="36" cy="34" r="7" /><path d="M13 34h8l5-12h8l2 12M20 22h6M30 14h6" /></>),
};

export function Experiences() {
  return (
    <section id="hoat-dong" className={`${styles.section} ${styles.exp}`} aria-labelledby="exp-title">
      <div className={styles.wrap}>
        <header className={styles.secHead}>
          <p className={styles.eyebrow}>Hoạt động</p>
          <h2 id="exp-title" className={styles.h2}>
            <Ignite as="span">Bốn hoạt động, chọn tuỳ thích.</Ignite>
          </h2>
          <p className={styles.lead}>Mỗi hoạt động có giờ cố định, thời lượng và giá theo người. Chọn một, vài hoặc không chọn gì cả và chỉ ngồi nhìn lửa.</p>
        </header>
      </div>
      <div className={styles.wrap}>
        <ul className={styles.acts}>
          {ACTIVITIES.map((a, i) => (
            <li key={a.id}>
              <CursorSpotlight className={styles.act} radius={300} color="rgba(255,122,26,0.2)">
                <svg className={styles.actIcon} viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" focusable="false">{ICONS[a.id]}</svg>
                <p className={styles.actNo} aria-hidden="true">{String(i + 1).padStart(2, "0")}</p>
                <h3 className={styles.h3}>{a.name}</h3>
                <p>{a.text}</p>
                <dl className={styles.actMeta}><div><dt>Giờ</dt><dd>{a.when}</dd></div><div><dt>Thời lượng</dt><dd>{a.length}</dd></div><div><dt>Lưu ý</dt><dd>{a.note}</dd></div></dl>
                <p className={styles.actPrice}>{vnd(a.price)}/người · giá tham khảo</p>
                <PickButton detail={{ activity: a.id }} className={styles.actLink}>Thêm vào chuyến đi</PickButton>
              </CursorSpotlight>
            </li>
          ))}
        </ul>
        <figure className={styles.banner}>
          <ParallaxLayer className={styles.bannerLayer} distance={50} style={{ inset: "-50px 0" }}>
            <Photo name="hill-tents" alt="Dãy lều sáng đèn trên đồi thông lúc chạng vạng" sizes="(max-width: 1240px) 96vw, 1200px" position="50% 62%" size={2000} />
          </ParallaxLayer>
          <figcaption>Khu cắm trại lúc chạng vạng, khi đèn trong lều bắt đầu sáng.</figcaption>
        </figure>
      </div>
    </section>
  );
}
