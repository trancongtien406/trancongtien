import { Calendar } from "./Calendar";
import { Calculator } from "./Calculator";
import { HOLIDAYS } from "../lib/pricing";
import { formatVN } from "../lib/dates";
import { SEASONS } from "../data/content";
import styles from "../brand.module.css";

export function Planner() {
  return (
    <section className={styles.planner} id="lich-gia" aria-labelledby="plan-h">
      <div className={styles.plannerHead}>
        <p className={styles.eyebrow}>Lịch phòng và chi phí</p>
        <h2 id="plan-h" className={styles.h2}>Xem ngày còn phòng và tính chi phí.</h2>
        <p className={styles.lead}>Chọn loại phòng, ngày nhận và trả phòng trên lịch; công cụ bên cạnh tính chi phí từng đêm. Ngày còn ít phòng và ngày kín được đánh dấu rõ.</p>
      </div>
      <div className={styles.plannerGrid}>
        <div className={styles.plannerLeft}>
          <div className={styles.plannerCal}><Calendar /></div>
      <div className={styles.seasons}>
            <h3 className={styles.h3}>Mùa và dịp lễ, Tết</h3>
            <div className={styles.seasonGrid}>
              <table className={styles.seasonTable}>
                <caption className={styles.srOnly}>Hệ số giá theo mùa</caption>
                <thead><tr><th scope="col">Mùa</th><th scope="col">Thời gian</th><th scope="col">So với giá gốc</th></tr></thead>
                <tbody>
                  {SEASONS.map((s) => (
                    <tr key={s.name}><th scope="row">{s.name}</th><td>{s.range}<span className={styles.sNote}>{s.note}</span></td><td className={styles.num}>{s.mult}</td></tr>
                  ))}
                </tbody>
              </table>
              <div className={styles.holiList}>
                <p><b>Đêm thứ sáu và thứ bảy</b> cộng 18% ở mọi mùa.</p>
                <p><b>Dịp lễ, Tết đã tính trong lịch:</b></p>
                <ul>{HOLIDAYS.map(([a, b, n]) => <li key={n}>{n}: {formatVN(a)} đến {formatVN(b)}</li>)}</ul>
              </div>
            </div>
          </div>
        </div>
        <div className={styles.plannerCalc}><Calculator /></div>
      </div>
    </section>
  );
}
