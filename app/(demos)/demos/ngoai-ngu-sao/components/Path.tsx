import { Counter, SVGPathDraw } from "@/features/showroom/effects";
import { LEVELS } from "../data/content";
import { Photo } from "./Photo";
import styles from "../brand.module.css";

export function Path() {
  return (
    <section id="cap-do" className={`${styles.panel} ${styles.panelYellow}`} aria-labelledby="path-title">
      <div className={styles.panelHead}>
        <p className={styles.kicker}>Lộ trình năm cấp</p>
        <h2 id="path-title" className={styles.h2}>Từ câu chào đầu tiên tới trò chuyện tự tin.</h2>
        <p className={styles.lede}>Cấp độ của Mở Lời là thang xếp lớp nội bộ, mỗi cấp có mục tiêu nói được việc cụ thể. Thang này không quy đổi sang chứng chỉ quốc tế.</p>
      </div>
      <div className={styles.pathWrap}>
        <SVGPathDraw mode="scroll" start="top 75%" end="bottom 60%" viewBox="0 0 1000 220" preserveAspectRatio="none" className={styles.pathSvg} aria-hidden="true" focusable="false">
          <path d="M100 196 C 200 196, 220 156, 300 156 S 400 112, 500 112 S 600 68, 700 68 S 800 24, 900 24" stroke="#0b1f66" strokeWidth="5" strokeLinecap="round" fill="none" />
        </SVGPathDraw>
        <ol className={styles.levels}>
          {LEVELS.map((l) => (
            <li key={l.n} className={styles.level} style={{ ["--n" as string]: l.n }}>
              <span className={styles.node} aria-hidden="true"><Counter value={l.n} from={0} duration={0.8} /></span>
              <article className={styles.levelCard}>
                <p className={styles.levelTag}>Cấp {l.n}</p>
                <h3 className={styles.h4}>{l.name}</h3>
                <p className={styles.levelGoal}>{l.goal}</p>
                <ul className={styles.can}>{l.can.map((c) => <li key={c}>{c}</li>)}</ul>
                <p className={styles.levelWeeks}>{l.weeks}</p>
              </article>
            </li>
          ))}
        </ol>
      </div>
      <div className={styles.pathPhotos} aria-hidden="false">
        <div className={styles.pathPhoto}><Photo file="la-ban" alt="La bàn và kính lúp đặt trên bản đồ thế giới nhiều màu" sizes="(max-width: 900px) 45vw, 22vw" pos="50% 60%" /></div>
        <div className={styles.pathPhoto}><Photo file="ban-do-may-anh" alt="Bàn tay cầm bút đánh dấu trên bản đồ thế giới cạnh máy ảnh" sizes="(max-width: 900px) 45vw, 22vw" /></div>
        <p className={styles.pathNote}>Mỗi cấp tương ứng một khoá khoảng 24 buổi. Bạn có thể bắt đầu ở cấp nào cũng được; bài kiểm tra bên dưới gợi ý điểm xuất phát.</p>
      </div>
    </section>
  );
}
