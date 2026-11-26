import { buildConsultHref } from "@/features/showroom/consultation";
import { TiltCard } from "@/features/showroom/effects";
import { siteConfig } from "@/lib/site";
import { LANGS, MASCOTS, NAV, SLUG } from "../data/content";
import { CENTER, FACILITIES, FACILITY_LIST, FAQ, PROCESS } from "../data/center";
import { Mascot } from "./Mascot";
import { Photo } from "./Photo";
import styles from "../brand.module.css";

const TEACH_NOTE: Record<string, string> = {
  cu: "Lớp tiếng Anh giao tiếp, thiếu nhi, THCS – THPT và IELTS. Phần nói chiếm đầu buổi, lỗi được ghi lại và sửa cuối câu.",
  meo: "Lớp tiếng Nhật từ sơ cấp đến trung cấp. Bắt đầu bằng Hiragana và Katakana, thêm Kanji từng bước theo khung N5 – N3.",
  gau: "Lớp tiếng Hàn sơ cấp. Đọc được Hangul sau vài buổi, rồi luyện nghe nói qua hội thoại ngắn hướng TOPIK I.",
};

export function Teachers() {
  return (
    <section id="doi-ngu" className={`${styles.panel} ${styles.panelWhite}`} aria-labelledby="tch-title">
      <div className={styles.panelHead}>
        <p className={styles.kicker}>Đội ngũ giảng dạy</p>
        <h2 id="tch-title" className={styles.h2}>Mỗi ngôn ngữ có một nhóm giáo viên phụ trách.</h2>
        <p className={styles.lede}>Giáo viên được phân công theo ngôn ngữ và cấp độ. Các nhân vật dưới đây đại diện cho từng vai trò trong trung tâm.</p>
      </div>
      <ul className={styles.mascots}>
        {MASCOTS.map((m, i) => (
          <li key={m.id}>
            <TiltCard className={styles.mascotTilt} max={6} glare={false} scale={1.01}>
              <article className={styles.mascotCard} data-tone={i}>
                <Mascot id={m.id} size={132} className={styles.mascotArt} />
                <p className={styles.levelTag}>{LANGS.find((l) => l.id === m.lang)!.name}</p>
                <h3 className={styles.h3}>{m.role}</h3>
                <p className={styles.dim}>Đại diện bởi {m.name}</p>
                <p className={styles.mascotNote}>{TEACH_NOTE[m.id]}</p>
                <p className={styles.mascotLine}>“{m.line}”</p>
              </article>
            </TiltCard>
          </li>
        ))}
      </ul>
      <div className={styles.backstage}>
        <h3 className={styles.h4}>Phía sau mỗi lớp học</h3>
        <ul>
          <li><b>Trợ giảng</b> hỗ trợ luyện nói theo nhóm ở các lớp đông và chấm bài viết.</li>
          <li><b>Cố vấn học tập</b> theo dõi tiến độ, hẹn buổi nhận xét và gợi ý lên cấp.</li>
          <li><b>Học vụ</b> xếp lớp, xử lý học bù và bảo lưu.</li>
        </ul>
      </div>
    </section>
  );
}

export function Facilities() {
  return (
    <section id="co-so" className={`${styles.panel} ${styles.panelMist}`} aria-labelledby="fac-title">
      <div className={styles.panelHead}>
        <p className={styles.kicker}>Cơ sở vật chất</p>
        <h2 id="fac-title" className={styles.h2}>Phòng học nhỏ, sáng, đủ chỗ để nói và đủ góc để tự học.</h2>
        <p className={styles.lede}>Trung tâm ở {CENTER.area}. Giờ làm việc {CENTER.hours}.</p>
      </div>
      <ul className={styles.facGrid}>
        {FACILITIES.map((f) => (
          <li key={f.t} className={styles.facCard}>
            <div className={styles.facPhoto}><Photo file={f.img} alt={f.alt} sizes="(max-width: 900px) 90vw, 30vw" pos={f.pos} /></div>
            <h3 className={styles.h4}>{f.t}</h3>
            <p className={styles.dim}>{f.d}</p>
          </li>
        ))}
      </ul>
      <ul className={styles.chips}>
        {FACILITY_LIST.map((x) => <li key={x}>{x}</li>)}
      </ul>
    </section>
  );
}

export function Process() {
  return (
    <section id="quy-trinh" className={`${styles.panel} ${styles.panelPink}`} aria-labelledby="proc-title">
      <div className={styles.panelHead}>
        <p className={styles.kicker}>Quy trình đăng ký</p>
        <h2 id="proc-title" className={styles.h2}>Bốn bước, bạn chỉ đóng phí sau khi đã học thử.</h2>
      </div>
      <ol className={styles.procList}>
        {PROCESS.map((p, i) => (
          <li key={p.t} className={styles.procStep}>
            <span className={styles.procNo} aria-hidden="true">{i + 1}</span>
            <h3 className={styles.h4}>{p.t}</h3>
            <p>{p.d}</p>
            <a className={styles.procLink} href={p.href}>Đi tới mục này<span aria-hidden="true"> →</span></a>
          </li>
        ))}
      </ol>
    </section>
  );
}

export function Faq() {
  return (
    <section id="hoi-dap" className={`${styles.panel} ${styles.panelWhite}`} aria-labelledby="faq-title">
      <div className={styles.faqGrid}>
        <div>
          <p className={styles.kicker}>Câu hỏi thường gặp</p>
          <h2 id="faq-title" className={styles.h2}>Những điều phụ huynh và học viên hay hỏi trước khi đăng ký.</h2>
          <p className={styles.lede}>Chưa thấy câu trả lời? Gửi yêu cầu tư vấn, chúng mình phản hồi trong giờ làm việc.</p>
          <a className={`${styles.btn} ${styles.btnNavy} ${styles.faqCta}`} href={buildConsultHref(SLUG)}>Hỏi tư vấn viên</a>
        </div>
        <div className={styles.faqList}>
          {FAQ.map((f) => (
            <details key={f.q} className={styles.faq}>
              <summary>{f.q}<span aria-hidden="true" className={styles.plus} /></summary>
              <p>{f.a}</p>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}

export function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={styles.footGrid}>
        <div className={styles.footBrand}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/images/demos/ngoai-ngu-sao/identity/logo-reversed.svg" alt="Mở Lời" width={170} height={46} />
          <p>Trung tâm ngoại ngữ tại {CENTER.area}: tiếng Anh giao tiếp, IELTS, tiếng Nhật JLPT, tiếng Hàn sơ cấp.</p>
        </div>
        <nav aria-label="Liên kết chân trang">
          <h2>Trong trang</h2>
          <ul>{NAV.map((l) => <li key={l.href}><a href={l.href}>{l.label}</a></li>)}</ul>
        </nav>
        <div>
          <h2>Liên hệ</h2>
          <ul>
            <li><a href="mailto:xinchao@moloi.example">xinchao@moloi.example</a></li>
            <li><span translate="no">0236 000 0000</span></li>
            <li><span>{CENTER.area}</span></li>
            <li><span>{CENTER.hours}</span></li>
            <li><a href={buildConsultHref(SLUG)}>Đăng ký tư vấn</a></li>
          </ul>
        </div>
      </div>
      <div className={styles.footBase}>
        <span translate="no">© Mở Lời</span>
        <a href="/demos/ngoai-ngu-sao/credits">Ảnh &amp; ghi công</a>
        <span>Website do {siteConfig.fullName} thiết kế</span>
      </div>
    </footer>
  );
}
