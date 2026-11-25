import { ClipReveal, ScrollScrubText } from "@/features/showroom/effects";
import { Divider } from "./Art";
import { Photo } from "./Photo";
import { TextWave } from "./TextWave";
import styles from "../brand.module.css";

export function Manifesto() {
  const t = "SÓNG ĐANG GỌI ✳ SÓNG ĐANG GỌI ✳ SÓNG ĐANG GỌI ✳ SÓNG ĐANG GỌI ✳ SÓNG ĐANG GỌI ✳ SÓNG ĐANG GỌI ✳ SÓNG ĐANG GỌI ✳ SÓNG ĐANG GỌI ✳ ";
  return (
    <section id="tuyen-ngon" className={styles.manifesto} aria-labelledby="tn-title">
      <Divider fill="var(--rs-brown)" className={styles.dividerTop} />
      <TextWave text={t} className={styles.textWave} />
      <div className={`${styles.wrap} ${styles.manifestoGrid}`}>
        <div>
          <p className={styles.kickerLight} data-rs="reveal">Tinh thần Ráng Sóng</p>
          <h2 id="tn-title" className={styles.srOnly}>Biển không cần hoàn hảo, chỉ cần bạn dám thử</h2>
          <ScrollScrubText as="p" className={styles.manifestoText} dim={0.22}>
            Biển không cần hoàn hảo. Chỉ cần bạn dám thử. Chúng tôi dạy bạn tôn trọng đại dương, học từ những điều cơ bản, tận hưởng từng con sóng và tiến bộ theo nhịp của riêng mình.
          </ScrollScrubText>
          <p className={styles.manifestoNote} data-rs="reveal">An toàn đi trước, niềm vui đi theo. Mỗi buổi đều bắt đầu từ việc đọc biển.</p>
        </div>
        <ClipReveal variant="inset" from="bottom" className={styles.manifestoPhoto} innerScale={1.12}>
          <div className={styles.manifestoFrame}>
            <Photo file="luot-chieu-do" alt="Bóng người lướt trên mặt sóng cam cuối chiều" sizes="(max-width: 900px) 90vw, 42vw" pos="60% 55%" />
          </div>
        </ClipReveal>
      </div>
    </section>
  );
}
