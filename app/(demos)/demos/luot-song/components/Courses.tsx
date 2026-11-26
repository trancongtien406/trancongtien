import { DraggableGallery } from "@/features/showroom/effects";
import { COURSES } from "../data/content";
import { vnd } from "../lib/planner";
import { Divider } from "./Art";
import { Photo } from "./Photo";
import styles from "../brand.module.css";

export function Courses() {
  return (
    <section id="khoa-hoc" className={styles.courses} aria-labelledby="kh-title">
      <Divider fill="var(--rs-deep)" className={styles.dividerTop} />
      <div className={styles.wrap}>
        <div className={styles.courseHead}>
          <div>
            <p className={styles.kicker} data-rs="reveal">Khoá học tại Ráng Sóng</p>
            <h2 id="kh-title" className={styles.h2} data-rs="reveal">Sáu cách <span className={styles.script}>bắt đầu với biển</span></h2>
            <p className={styles.lede} data-rs="reveal">Buổi trải nghiệm một buổi, khoá 3, 5 và 10 buổi, lớp riêng cho trẻ em từ 6 tuổi và dịch vụ thuê ván cho người đã lướt. Kéo ngang để xem hết sáu thẻ.</p>
          </div>
          <div className={styles.courseBoards}>
            <div className={styles.courseBoardsFrame}>
              <Photo file="van-vang" alt="Những tấm ván lướt vàng dựng cạnh nhau trên cát" sizes="(max-width: 900px) 60vw, 22vw" w={1200} pos="50% 40%" />
            </div>
          </div>
        </div>
      </div>
      <div className={styles.galleryWrap}>
        <DraggableGallery gap="20px" label="Các khoá học, kéo ngang hoặc dùng phím mũi tên" prevLabel="Khoá trước" nextLabel="Khoá sau" buttonClassName={styles.galBtn} hideScrollbar>
          {COURSES.map((c, i) => (
            <article key={c.id} className={`${styles.card} ${styles[`tone_${c.tone}`]}`}>
              <div className={styles.cardTop}>
                <span className={styles.cardNo}>{String(i + 1).padStart(2, "0")}</span>
                <span className={styles.cardTag}>{c.tag}</span>
              </div>
              <h3 className={styles.cardTitle}>{c.name}</h3>
              <p className={styles.cardLen}>{c.length}</p>
              <p className={styles.cardWho}>{c.who}</p>
              <ul className={styles.cardPoints}>
                {c.points.map((p) => <li key={p}>{p}</li>)}
              </ul>
              <div className={styles.cardFoot}>
                <p className={styles.cardPrice}><small>{c.from ? "Giá từ" : "Giá tham khảo"}</small><b>{vnd(c.price)}</b><small>{c.per}</small></p>
                <a className={`${styles.btn} ${styles.btnCard} ${styles.btnSm}`} href="#chon-khoa" aria-label={`Chọn khoá phù hợp, đang xem ${c.name}`}>Chọn khoá</a>
              </div>
            </article>
          ))}
        </DraggableGallery>
      </div>
      <div className={styles.wrap}>
        <p className={styles.fine}>Giá là giá tham khảo theo từng người, đã gồm huấn luyện viên, ván, dây leash và áo lycra mượn trong buổi. Xem chi tiết ở phần giá và đồ cần mang.</p>
      </div>
    </section>
  );
}
