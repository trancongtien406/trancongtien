import s from "../brand.module.css";

const P = "/images/demos/cat-canh-studio/";

export function Stats() {
  const items = [["2.400+", "website đã dựng bằng bộ ứng dụng"], ["60 fps", "mục tiêu mượt trên máy tầm trung"], ["14 phút", "từ cài đặt tới cú cuộn đầu tiên"], ["98%", "người dùng thử tiếp tục sau 14 ngày"]];
  return (
    <section className={s.stats} id="so-lieu" aria-label="Số liệu">
      <ul>{items.map(([n, l]) => <li key={n}><b>{n}</b><span>{l}</span></li>)}</ul>
      <p className={s.fineLine}>Số liệu minh hoạ cho trang thiết kế.</p>
    </section>
  );
}

const FEATURES = [
  ["◈", "Cảnh 3D theo nhịp cuộn", "Nhập cảnh 3D của riêng bạn hoặc chọn mẫu, điều khiển camera và từng vật thể theo vị trí cuộn."],
  ["≋", "Chuyển động dựng sẵn", "Hơn 80 hiệu ứng: trượt, mờ dần, xoay, tách chữ, đẩy xuyên màn hình. Xem trước ngay khi chỉnh."],
  ["✦", "Ánh sáng và hạt", "Nền hạt, dòng chất lỏng, kính mờ và vệt sáng gradient để trang có chiều sâu mà vẫn nhẹ."],
  ["▤", "Ghim cảnh và cuộn ngang", "Giữ một khung hình trong lúc nội dung chạy qua, hoặc biến cuộn dọc thành cuộn ngang chỉ với một công tắc."],
  ["◐", "Tự thích ứng thiết bị", "Bản điện thoại có bố cục và độ nặng hiệu ứng riêng; tự giảm khi pin yếu hoặc bật giảm chuyển động."],
  ["⌘", "Chèn mã khi cần", "Gắn sự kiện, biến số và đoạn mã tuỳ chỉnh vào từng cảnh. Không bị khoá trong một hệ thống đóng."],
];
export function Features() {
  return (
    <section className={s.sec} id="tinh-nang" aria-labelledby="cc-feat">
      <div className={s.wrap}>
        <p className={s.pillTag}><i aria-hidden="true" />Tính năng</p>
        <h2 id="cc-feat" className={s.h2}>Mọi thứ để website <span>biết chuyển động.</span></h2>
        <ul className={s.featGrid}>
          {FEATURES.map(([i, t, d]) => (
            <li key={t}><span aria-hidden="true">{i}</span><h3>{t}</h3><p>{d}</p></li>
          ))}
        </ul>
      </div>
    </section>
  );
}

const CASES = [
  { img: "mau-agency", tag: "Agency", t: "Studio thiết kế Hải Âu", d: "Trang giới thiệu agency có hiệu ứng chất lỏng WebGL, chữ khổng lồ trượt theo cuộn và chuyển cảnh giữa các dự án. Dựng xong trong một buổi chiều, giữ điểm hiệu năng trên 90.", m: ["+64% thời gian ở lại trang", "4 giờ dựng", "92 điểm hiệu năng"] },
  { img: "mau-hoat-hinh", tag: "Sản phẩm 3D", t: "Linh vật Tò Mò", d: "Nhân vật hoạt hình 3D quay đầu theo con trỏ và đổi tư thế theo từng đoạn cuộn. Trang giới thiệu bộ đồ chơi dành cho trẻ nhỏ.", m: ["+41% bấm vào nút mua", "2 giờ dựng", "3 cảnh 3D"] },
  { img: "mau-game", tag: "Game", t: "Phi Hành Đoàn 12 tuần", d: "Trang chiến dịch cho tựa game giả tưởng: chuỗi cảnh cuộn điện ảnh, ghim màn hình và âm thanh bật theo chương.", m: ["120.000 lượt đăng ký sớm", "3 giờ dựng", "6 chương cuộn"] },
];
export function Cases() {
  return (
    <section className={s.sec} id="du-an" aria-labelledby="cc-cases">
      <div className={s.wrap}>
        <p className={s.pillTag}><i aria-hidden="true" />Dự án làm cùng khách</p>
        <h2 id="cc-cases" className={s.h2}>Những trang đã <span>cất cánh.</span></h2>
        <div className={s.caseList}>
          {CASES.map((c, i) => (
            <article key={c.t} className={s.caseRow} data-flip={i % 2 === 1}>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={`${P}${c.img}.webp`} alt="" width={900} height={640} loading="lazy" decoding="async" />
              <div>
                <p className={s.tagSm}>{c.tag}</p>
                <h3>{c.t}</h3>
                <p>{c.d}</p>
                <ul className={s.chips}>{c.m.map((x) => <li key={x}>{x}</li>)}</ul>
                <a className={s.btnSm} href="#lien-he">Làm trang như vậy</a>
              </div>
            </article>
          ))}
        </div>
        <p className={s.fineLine}>Dự án và chỉ số minh hoạ, không phải khách hàng thật.</p>
      </div>
    </section>
  );
}

const REVIEWS = [
  ["Tôi cứ nghĩ làm hiệu ứng cuộn kiểu này phải thuê lập trình viên. Hoá ra chiều thứ Sáu tôi đã xong trang chủ cho khách.", "Mai Phương", "Nhà thiết kế web tự do"],
  ["Dòng Chuyển Động giúp cả nhóm thiết kế và nhóm nội dung cùng chỉnh trên một trang mà không ai phải chờ ai.", "Quốc Bảo", "Trưởng nhóm sáng tạo, agency số"],
  ["Trang mobile vẫn mượt trên cả chiếc máy cũ của bố mẹ tôi. Đó là lý do tôi chọn bộ này.", "Thuỳ Linh", "Chủ thương hiệu mỹ phẩm"],
];
export function Reviews() {
  return (
    <section className={s.sec} id="danh-gia" aria-labelledby="cc-rev">
      <div className={s.wrap}>
        <p className={s.pillTag}><i aria-hidden="true" />Người dùng nói gì</p>
        <h2 id="cc-rev" className={s.h2}>Lời nhắn từ <span>người đã thử.</span></h2>
        <ul className={s.revGrid}>
          {REVIEWS.map(([q, n, r]) => (
            <li key={n}><blockquote>“{q}”</blockquote><p><b>{n}</b><span>{r}</span></p></li>
          ))}
        </ul>
        <p className={s.fineLine}>Đánh giá minh hoạ, tên là giả định.</p>
      </div>
    </section>
  );
}

const TEAM = [
  ["LH", "Lê Hoàng", "Giám đốc sáng tạo", "Mười năm làm chuyển động cho thương hiệu và phim quảng cáo."],
  ["TV", "Trần Vy", "Kỹ sư đồ hoạ 3D", "Viết lõi hiển thị cảnh 3D, đo từng mili giây trên máy yếu."],
  ["NK", "Nguyễn Khôi", "Thiết kế tương tác", "Biến ý tưởng giấy thành hiệu ứng cuộn có nhịp và có lý do."],
  ["PA", "Phạm An", "Hỗ trợ và cộng đồng", "Trả lời mọi câu hỏi trong một ngày làm việc, kể cả cuối tuần."],
];
export function Team() {
  return (
    <section className={s.sec} id="cong-ty" aria-labelledby="cc-team">
      <div className={s.wrap}>
        <p className={s.pillTag}><i aria-hidden="true" />Công ty</p>
        <h2 id="cc-team" className={s.h2}>Đội ngũ nhỏ, <span>nhịp nhanh.</span></h2>
        <p className={s.lead}>Cất Cánh Studio khởi đầu từ một văn phòng nhỏ ở Đà Nẵng. Chúng tôi tin website đẹp nhất là website biết phản hồi người xem: một cú cuộn, một cú chạm, một khoảnh khắc ngạc nhiên đúng lúc.</p>
        <ul className={s.teamGrid}>
          {TEAM.map(([a, n, r, d]) => (
            <li key={n}><span className={s.avatar} aria-hidden="true">{a}</span><h3>{n}</h3><p className={s.role}>{r}</p><p>{d}</p></li>
          ))}
        </ul>
      </div>
    </section>
  );
}

const POSTS = [
  ["12.05.2026", "Hướng dẫn", "Cảnh 3D đầu tiên của bạn trong 10 phút", "khoi-khoi"],
  ["28.04.2026", "Bí quyết", "Năm quy tắc để hiệu ứng cuộn không gây chóng mặt", "hao-quang"],
  ["02.04.2026", "Nhật ký thay đổi", "Phiên bản 2.4: ghim cảnh, cuộn ngang và chế độ tiết kiệm pin", "nhan-vat-3d"],
];
export function Posts() {
  return (
    <section className={s.sec} id="bai-viet" aria-labelledby="cc-posts">
      <div className={s.wrap}>
        <p className={s.pillTag}><i aria-hidden="true" />Tài nguyên</p>
        <h2 id="cc-posts" className={s.h2}>Học nhanh, <span>làm ngay.</span></h2>
        <ul className={s.postList}>
          {POSTS.map(([d, t, h, img]) => (
            <li key={h}>
              <a href="#lien-he">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={`${P}${img}.webp`} alt="" width={900} height={640} loading="lazy" decoding="async" />
                <span className={s.postBody}><span className={s.postMeta}>{d} · {t}</span><span className={s.postTitle}>{h}</span></span>
                <span className={s.arrow} aria-hidden="true">↗</span>
              </a>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
