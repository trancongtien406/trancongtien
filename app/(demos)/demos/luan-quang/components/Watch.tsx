import styles from "../brand.module.css";
import { CaseRing, Crystal, Dial, Hands } from "./Parts";

/** Đồng hồ phẳng (lắp hoàn chỉnh) dùng cho hero và thẻ sản phẩm. */
export function Watch({ face, ink, tone, hms, label }: { face?: string; ink?: string; tone?: string; hms?: [number, number, number]; label: string }) {
  return (
    <div className={styles.watch} role="img" aria-label={label}>
      {[<Dial key="d" face={face} ink={ink} />, <Hands key="h" ink={ink} hms={hms} />, <Crystal key="c" />, <CaseRing key="r" tone={tone} />].map((n, i) => (<div key={i} className={styles.wl}>{n}</div>))}
    </div>
  );
}
