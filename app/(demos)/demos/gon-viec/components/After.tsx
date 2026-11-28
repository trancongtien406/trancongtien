import styles from "../brand.module.css";
import { FEATURES, INTEGRATIONS, POSTS, STEPS, VOICES } from "./data";
import { Faq, Kanban, Newsletter, Pricing, TeamTabs, ContactForm } from "./Interactive";

const B = "/images/demos/gon-viec/";

function Head({ id, idx, eyebrow, title, lead }: { id: string; idx: string; eyebrow: string; title: string; lead?: string }) {
  return (
    <header className={styles.sh} data-rv="1">
      <p className={styles.idxl}>{idx}</p>
      <p className={styles.eyebrow}>{eyebrow}</p>
      <h2 className={styles.afterH} id={id}>{title}</h2>
      {lead && <p className={styles.lead}>{lead}</p>}
    </header>
  );
}

export function After() {
  return (
    <>
      <section className={styles.sec} id="tinh-nang" aria-labelledby="h-tn">
        <div className={styles.wrap}>
          <Head id="h-tn" idx="003 — 004" eyebrow="TẠI SAO LÀ GỌN VIỆC" title="MỌI VIỆC CỦA NHÓM, TRÊN MỘT BẢNG DUY NHẤT." lead="Không thêm một công cụ nữa để học. Gọn Việc làm đúng ba điều: cho mỗi việc một chủ, một hạn, và một chỗ để nhìn." />
          <ul className={styles.feats}>
            {FEATURES.map((f) => (
              <li key={f.n} data-span={f.span} data-rv="1">
                {f.img && <img src={B + f.img} alt="" width={720} height={540} loading="lazy" />}
                <span>{f.n}</span><h3>{f.t}</h3><p>{f.d}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className={styles.sec} id="bang-viec" data-alt="1" aria-labelledby="h-bv">
        <div className={styles.wrap}>
          <Head id="h-bv" idx="004 — 004" eyebrow="THỬ NGAY TRÊN TRANG NÀY" title="KÉO VIỆC QUA CÁC CỘT, ĐẾM NGAY TIẾN ĐỘ." lead="Đây là bảng mẫu chạy thật: thêm thẻ mới, bấm mũi tên để chuyển cột và xem bộ đếm “đã xong” thay đổi." />
          <Kanban />
        </div>
      </section>

      <section className={styles.sec} id="quy-trinh" aria-labelledby="h-qt">
        <div className={styles.wrap}>
          <Head id="h-qt" idx="005 — 012" eyebrow="CÁCH LÀM VIỆC" title="BỐN BƯỚC TỪ ĐỐNG VIỆC RỜI RẠC TỚI MỘT NHỊP CHUNG." />
          <ol className={styles.steps}>
            {STEPS.map((s) => (<li key={s.n} data-rv="1"><b>{s.n}</b><h3>{s.t}</h3><p>{s.d}</p></li>))}
          </ol>
        </div>
      </section>

      <section className={styles.sec} id="giai-phap" data-alt="1" aria-labelledby="h-gp">
        <div className={styles.wrap}>
          <Head id="h-gp" idx="006 — 012" eyebrow="GIẢI PHÁP THEO NHÓM" title="DÙNG CHUNG MỘT NỀN, ĐỔI CÁCH NHÌN THEO NGHỀ." lead="Chọn loại nhóm của bạn để xem Gọn Việc được dựng sẵn như thế nào." />
          <TeamTabs />
        </div>
      </section>

      <section className={styles.sec} id="so-lieu" aria-labelledby="h-sl">
        <div className={styles.wrap}>
          <Head id="h-sl" idx="007 — 012" eyebrow="CON SỐ" title="NHÓM DÙNG GỌN VIỆC LÀM XONG NHIỀU HƠN, HỌP ÍT HƠN." />
          <dl className={styles.nums}>
            <div data-rv="1"><dt>Thời gian giao một việc</dt><dd>12 giây</dd></div>
            <div data-rv="1"><dt>Việc trễ hạn giảm</dt><dd>38%</dd></div>
            <div data-rv="1"><dt>Nhóm đang dùng</dt><dd>2.400+</dd></div>
            <div data-rv="1"><dt>Thẻ việc tạo mỗi tuần</dt><dd>1,2 triệu</dd></div>
          </dl>
          <figure className={styles.team} data-rv="1"><img src={B + "team.webp"} alt="Nhóm làm việc họp quanh bảng việc trong phòng họp (ảnh minh hoạ)" width={1500} height={640} loading="lazy" /></figure>
          <p className={styles.note}>Số liệu và hình ảnh minh hoạ cho bản demo.</p>
        </div>
      </section>

      <section className={styles.sec} id="tich-hop" data-alt="1" aria-labelledby="h-th">
        <div className={styles.wrap}>
          <Head id="h-th" idx="008 — 012" eyebrow="TÍCH HỢP" title="NỐI VỚI NHỮNG THỨ NHÓM BẠN ĐÃ DÙNG." lead="Thẻ việc tự tạo từ email, buổi họp và biểu mẫu; ngược lại, hạn chót hiện lên lịch của từng người." />
          <ul className={styles.integ}>
            {INTEGRATIONS.map((x, i) => (<li key={x} data-rv="1"><span>{String(i + 1).padStart(2, "0")}</span>{x}</li>))}
          </ul>
        </div>
      </section>

      <section className={styles.sec} id="khach-hang" aria-labelledby="h-kh">
        <div className={styles.wrap}>
          <Head id="h-kh" idx="009 — 012" eyebrow="NGƯỜI DÙNG NÓI GÌ" title="HỌ ĐỔI CÁCH GIAO VIỆC SAU MỘT TUẦN." />
          <ul className={styles.voices}>
            {VOICES.map((v) => (<li key={v.n} data-rv="1"><blockquote>“{v.q}”</blockquote><p><b>{v.n}</b><span>{v.r}</span></p></li>))}
          </ul>
          <p className={styles.note}>Lời chứng thực minh hoạ, nhân vật và công ty là giả định.</p>
        </div>
      </section>

      <section className={styles.sec} id="bang-gia" data-alt="1" aria-labelledby="h-bg">
        <div className={styles.wrap}>
          <Head id="h-bg" idx="010 — 012" eyebrow="BẢNG GIÁ" title="TRẢ THEO NGƯỜI DÙNG, KHÔNG PHÍ ẨN." lead="Bắt đầu miễn phí. Chỉ nâng cấp khi nhóm cần tự động hoá, báo cáo và phân quyền." />
          <Pricing />
        </div>
      </section>

      <section className={styles.sec} id="hoi-dap" aria-labelledby="h-hd">
        <div className={styles.wrap}>
          <Head id="h-hd" idx="011 — 012" eyebrow="CÂU HỎI THƯỜNG GẶP" title="ĐIỀU CÁC NHÓM HAY HỎI TRƯỚC KHI BẮT ĐẦU." />
          <Faq />
        </div>
      </section>

      <section className={styles.sec} id="bai-viet" data-alt="1" aria-labelledby="h-bl">
        <div className={styles.wrap}>
          <Head id="h-bl" idx="012 — 012" eyebrow="GÓC LÀM VIỆC" title="BÀI VIẾT NGẮN CHO NHÓM MUỐN LÀM GỌN HƠN." />
          <ul className={styles.posts}>
            {POSTS.map((p, i) => (<li key={p.t} data-rv="1"><i data-tone={i} aria-hidden="true" /><span>{p.c} · {p.m}</span><h3><a href="#bai-viet">{p.t}</a></h3></li>))}
          </ul>
          <Newsletter />
        </div>
      </section>

      <section className={styles.sec} id="lien-he" aria-labelledby="h-lh">
        <div className={styles.wrap}>
          <div className={styles.contact}>
            <div>
              <p className={styles.eyebrow}>LIÊN HỆ</p>
              <h2 className={styles.afterH} id="h-lh">CÙNG NHÓM CỦA BẠN LÀM VIỆC GỌN HƠN TỪ HÔM NAY.</h2>
              <p className={styles.lead}>Để lại thông tin, chúng tôi hẹn một buổi 20 phút để dựng thử bảng việc đầu tiên cho nhóm bạn. Không cần thẻ thanh toán.</p>
              <ul className={styles.contactList}><li>xinchao@gonviec.example</li><li>Tầng 7, Quận 3, TP. Hồ Chí Minh</li><li>Thứ Hai – Thứ Sáu · 08:30–17:30</li></ul>
            </div>
            <ContactForm />
          </div>
        </div>
      </section>

      <footer className={styles.foot} style={{ backgroundImage: `linear-gradient(rgba(29,29,34,.88), rgba(29,29,34,.95)), url(${B}foot.webp)` }}>
        <div className={styles.wrap}>
          <p className={styles.footH}>LÀM VIỆC GỌN. SỐNG NHẸ.</p>
          <div className={styles.footCols}>
            <div><b>GỌN VIỆC</b><p>Trung tâm điều hành công việc của nhóm.</p></div>
            <ul><li><b>Sản phẩm</b></li><li><a href="#tinh-nang">Tính năng</a></li><li><a href="#bang-viec">Bảng mẫu</a></li><li><a href="#tich-hop">Tích hợp</a></li></ul>
            <ul><li><b>Công ty</b></li><li><a href="#khach-hang">Khách hàng</a></li><li><a href="#bang-gia">Bảng giá</a></li><li><a href="#bai-viet">Bài viết</a></li></ul>
            <ul><li><b>Hỗ trợ</b></li><li><a href="#hoi-dap">Hỏi đáp</a></li><li><a href="#lien-he">Liên hệ</a></li><li><a href="mailto:xinchao@gonviec.example">Email</a></li></ul>
          </div>
          <p className={styles.footNote}>© 2026 Gọn Việc. Trang minh hoạ: thương hiệu, số liệu, người và công ty đều là giả định. Ảnh: Pexels.</p>
        </div>
      </footer>
    </>
  );
}
