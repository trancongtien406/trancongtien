import s from "../brand.module.css";

const DEMOS = [
  { k: "a", title: "Website agency", demo: "Bản mẫu 1", text: "Trải nghiệm web thanh lịch dựng bằng Bộ Hào Quang, thêm hiệu ứng cuộn bằng Dòng Chuyển Động.", time: "4 giờ" },
  { k: "b", title: "Trang Web Mê Ly", demo: "Bản mẫu 2", text: "Cảnh 3D hoạt hình chạy theo cuộn, dựng bằng Cảnh 3D và tinh chỉnh bằng Bộ Hào Quang.", time: "2 giờ" },
  { k: "c", title: "Game Sắc Màu", demo: "Bản mẫu 3", text: "Trang giới thiệu game có chuỗi cảnh cuộn động, dựng bằng Dòng Chuyển Động.", time: "3 giờ" },
];

const PIC: Record<string, string> = { a: "mau-agency", b: "mau-hoat-hinh", c: "mau-game" };
const ALT: Record<string, string> = { a: "Laptop đang mở trang web trên bàn đá", b: "Robot trắng xanh trước nền lưới ánh sáng", c: "Robot đồ chơi cận cảnh dưới ánh sáng xanh" };

export function Gallery() {
  return (
    <section className={s.gallery} id="mau" aria-labelledby="cc-gal">
      <p className={s.pillTag} style={{ display: "flex", width: "fit-content", margin: "0 auto 20px" }}><i aria-hidden="true" />Làm bằng Cất Cánh Studio</p>
      <h2 id="cc-gal" className={s.h2c} style={{ marginBottom: 56 }}>Xem thử điều <span>khả thi.</span></h2>
      <ul className={s.demoList}>
        {DEMOS.map((d) => (
          <li key={d.k} className={s.demo}>
            <div className={`${s.thumb} ${s["thumb_" + d.k]}`} style={{ backgroundImage: `linear-gradient(rgba(0,0,0,.35), rgba(0,0,0,.55)), url(/images/demos/cat-canh-studio/${PIC[d.k]}.webp)` }} role="img" aria-label={ALT[d.k]}>
              {d.k === "a" && <p>Tâm trí là <em>giới hạn</em> của bạn</p>}
              {d.k === "b" && <p>XIN CHÀO<br />THẾ GIỚI</p>}
              {d.k === "c" && <p>Sẵn sàng chơi trong <em>12 tuần</em></p>}
            </div>
            <div className={s.demoRow}>
              <h3>{d.title} <span>| {d.demo}</span></h3>
              <a className={s.arrow} href="#cach-bat-dau" aria-label={`Xem ${d.title}`}>↗</a>
            </div>
            <p>{d.text}</p>
            <p className={s.time}>Thời gian dựng: {d.time}</p>
          </li>
        ))}
      </ul>
    </section>
  );
}
