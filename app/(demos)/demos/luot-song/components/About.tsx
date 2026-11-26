import { Divider } from "./Art";
import { Photo } from "./Photo";
import { TextWave } from "./TextWave";
import styles from "../brand.module.css";

const WAVE = "HỌC LƯỚT SÓNG ✳ SƠN TRÀ ✳ ĐÀ NẴNG ✳ HỌC LƯỚT SÓNG ✳ SƠN TRÀ ✳ ĐÀ NẴNG ✳ HỌC LƯỚT SÓNG ✳ SƠN TRÀ ✳ ĐÀ NẴNG ✳ ";

const FACTS = [
  { k: "Địa điểm", v: "Bãi biển quận Sơn Trà. Điểm gặp cụ thể được nhắn khi trường xác nhận buổi học." },
  { k: "Nhóm học", v: "Tối đa 6 học viên cho một huấn luyện viên; lớp trẻ em tối đa 4 bạn." },
  { k: "Mỗi buổi", v: "Khoảng 2 giờ: đọc biển, khởi động, tập trên cát, xuống nước, nhận xét." },
  { k: "Dụng cụ", v: "Ván mềm cho người mới, dây leash và áo lycra mượn trong buổi." },
] as const;

export function About() {
  return (
    <section id="ve-truong" className={styles.manifesto} aria-labelledby="vt-title">
      <Divider fill="var(--rs-brown)" className={styles.dividerTop} />
      <TextWave text={WAVE} className={styles.textWave} />
      <div className={`${styles.wrap} ${styles.manifestoGrid}`}>
        <div>
          <p className={styles.kickerLight} data-rs="reveal">Về Ráng Sóng</p>
          <h2 id="vt-title" className={`${styles.h2} ${styles.h2Light}`} data-rs="reveal">Trường lướt sóng <span className={styles.scriptSun}>nhỏ, trên một bãi biển quen</span></h2>
          <p className={styles.aboutText} data-rs="reveal">
            Ráng Sóng là trường dạy lướt sóng ở bãi biển quận Sơn Trà. Chúng tôi dạy theo thứ tự cố định: an toàn, chèo ván, pop-up rồi đọc sóng. Mỗi buổi bắt đầu từ việc huấn luyện viên nhìn biển và nói thật với bạn hôm nay có xuống nước được không.
          </p>
          <dl className={styles.aboutFacts} data-rs="reveal">
            {FACTS.map((f) => (
              <div key={f.k}><dt>{f.k}</dt><dd>{f.v}</dd></div>
            ))}
          </dl>
        </div>
        <div className={styles.manifestoPhoto}>
          <div className={styles.manifestoFrame}>
            <Photo file="luot-chieu-do" alt="Bóng người lướt trên mặt sóng cam cuối chiều" sizes="(max-width: 900px) 90vw, 42vw" pos="60% 55%" />
          </div>
        </div>
      </div>
    </section>
  );
}
