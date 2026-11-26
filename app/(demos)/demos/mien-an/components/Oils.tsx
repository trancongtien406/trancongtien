"use client";

import Image from "next/image";
import { ParallaxLayer } from "@/features/showroom/effects";
import { OILS } from "../data/oils";
import { useMienAn } from "./Provider";
import { Check } from "./Icons";
import styles from "../brand.module.css";

export function Oils() {
  const { oil, setOil } = useMienAn();
  const cur = OILS.find((o) => o.id === oil) ?? null;
  return (
    <section id="oils" className={styles.section} aria-labelledby="oils-title" data-story>
      <div className={`${styles.container} ${styles.storyGrid}`}>
        <div className={styles.storyArt}>
          <div className={styles.storyArch} data-story-img>
            <ParallaxLayer distance={34} className={styles.storyLayer}>
              <Image src="/images/demos/mien-an/ma-story-1200.webp" alt="Nến trắng trong hũ thuỷ tinh, bó lúa khô và khăn be cuộn trong ánh sáng ấm" width={1200} height={800} sizes="(min-width: 1024px) 480px, 90vw" style={{ objectPosition: "68% 50%" }} />
            </ParallaxLayer>
          </div>
        </div>
        <div className={styles.storyText}>
          <p className={styles.eyebrow}>Tinh dầu massage</p>
          <h2 id="oils-title" className={styles.h2}>
            Chọn mùi dầu, <em>cả trang đổi tông theo.</em>
          </h2>
          <p>
            Miên An dùng bốn mùi dầu massage và một loại dầu nền không hương liệu. Bạn chọn mùi trước khi đặt lịch, kỹ thuật viên chuẩn bị đúng loại dầu đó. Thử bấm vào từng mùi: màu của cả trang đổi theo để bạn hình dung cảm giác của mùi.
          </p>
          <fieldset className={styles.fieldset}>
            <legend className={styles.srOnly}>Chọn tinh dầu</legend>
            <div className={styles.oilGrid} data-testid="oils">
              {OILS.map((o) => (
                <label key={o.id} className={styles.opt}>
                  <input type="radio" name="oil" value={o.id} checked={oil === o.id} onChange={() => setOil(o.id)} />
                  <span className={styles.optBox}>
                    <span className={styles.oilDot} style={{ background: o.tone.swatch }} aria-hidden="true" />
                    <span className={styles.txt}>{o.name}<small>{o.note}</small></span>
                    <span className={styles.oilTick} aria-hidden="true"><Check /></span>
                  </span>
                </label>
              ))}
            </div>
          </fieldset>
          <p className={styles.oilNow} role="status">
            {cur ? `Đã chọn: ${cur.name}. Mùi này sẽ được ghi vào bản tóm tắt lịch hẹn.` : "Chưa chọn mùi: mặc định là hương tự nhiên của từng liệu trình."}
            {cur && <button type="button" className={styles.textBtn} onClick={() => setOil(null)}>Bỏ chọn</button>}
          </p>
          <div className={styles.storyFoot} data-story-detail>
            <div className={styles.storyDetail}>
              <Image src="/images/demos/mien-an/ma-detail-600.webp" alt="Nến be, nến hộp đen và cánh hoa khô trên khay gỗ" width={600} height={900} sizes="220px" style={{ objectFit: "cover" }} />
            </div>
            <div className={styles.storyFootText}>
              <a href="#appointment" className={styles.link}>
                Đặt lịch với mùi đã chọn <span className={styles.arrow} aria-hidden="true">→</span>
              </a>
              <p className={styles.storyNote}>Tinh dầu chỉ ảnh hưởng đến mùi, không nhằm chữa bệnh. Báo kỹ thuật viên nếu bạn dị ứng.</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
