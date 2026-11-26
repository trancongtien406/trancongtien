import { buildConsultHref } from "@/features/showroom/consultation";
import s from "../brand.module.css";

const PACKS = [
  { n: "Bàn nhóm", who: "8 đến 15 khách", where: "Góc neon ghép bàn hoặc cụm sofa Hiên kính", spend: "Mức chi tối thiểu tham khảo từ 3.000.000₫", rule: "Đặt trước ít nhất 1 ngày. Từ 12 khách cần cọc 30%." },
  { n: "Sinh nhật & tiệc nhỏ", who: "15 đến 30 khách", where: "Hiên kính và một phần Sân thượng, có thể trang trí bóng và bảng tên", spend: "Mức chi tối thiểu tham khảo từ 8.000.000₫", rule: "Đặt trước 3 ngày. Cọc 30%, được mang bánh kem từ ngoài vào." },
  { n: "Bao trọn rooftop", who: "50 đến 90 khách", where: "Toàn bộ tầng thượng, âm nhạc và ánh sáng theo chủ đề sự kiện", spend: "Mức chi tối thiểu tham khảo từ 25.000.000₫", rule: "Đặt trước 7 ngày. Cọc 30%, chốt thực đơn 48 giờ trước sự kiện." },
];

const RULES = [
  { t: "Từ 18 tuổi", d: "Khách dưới 18 tuổi không vào quán. Có thể được yêu cầu xuất trình giấy tờ có ngày sinh." },
  { t: "Dress code gọn gàng", d: "Smart casual: không áo ba lỗ, không cởi trần, không dép lê đi trong nhà. Quần short, sneakers sạch đều được." },
  { t: "Giữ bàn 15 phút", d: "Bàn giữ tối đa 15 phút so với giờ hẹn. Cuối tuần, bàn nhóm được giữ 30 phút nếu báo trước." },
  { t: "Đồ ăn và đồ uống mang vào", d: "Không mang đồ uống từ ngoài. Bánh sinh nhật được mang vào, tính phí phục vụ 100.000₫." },
  { t: "Hút thuốc", d: "Chỉ hút ở khu riêng phía cuối Sân thượng. Các khu còn lại không khói thuốc." },
  { t: "Uống có trách nhiệm", d: "Quầy có quyền từ chối phục vụ thêm khi khách đã say, và hỗ trợ gọi xe về." },
];

export function Events() {
  return (
    <section className={s.events} id="su-kien" aria-label="Bàn nhóm và sự kiện riêng">
      <div className={s.wrap}>
        <header className={s.secHead}>
          <p className={s.kicker}>Bàn nhóm &amp; sự kiện riêng</p>
          <h2 className={s.h2} data-tm="lit">Đi đông người, tổ chức sinh nhật hay bao cả tầng thượng</h2>
        </header>
        <ul className={s.packs}>
          {PACKS.map((p) => (
            <li key={p.n} className={s.pack} data-tm="lit">
              <h3 className={s.h3}>{p.n}</h3>
              <p className={s.packWho}>{p.who}</p>
              <p>{p.where}</p>
              <p className={s.packSpend}>{p.spend}</p>
              <p className={s.packRule}>{p.rule}</p>
            </li>
          ))}
        </ul>
        <p className={s.menuNote}>Mức chi tối thiểu là giá tham khảo, tính trên tổng hoá đơn đồ uống và món ăn, chưa gồm phí trang trí hoặc âm thanh riêng. Cọc được hoàn khi báo huỷ trước 48 giờ.</p>
        <a className={`${s.btn} ${s.btnCyan}`} href={buildConsultHref("bar-mai-thuong")}>Gửi yêu cầu sự kiện</a>
      </div>
    </section>
  );
}

export function Rules() {
  return (
    <section className={s.rules} id="quy-dinh" aria-label="Quy định và dress code">
      <div className={s.wrap}>
        <div className={s.rulesGrid}>
          <header>
            <p className={s.kicker}>Quy định &amp; dress code</p>
            <h2 className={s.h2} data-tm="lit">Vài lưu ý để buổi tối của cả quán đều dễ chịu</h2>
          </header>
          <ul className={s.ruleList}>
            {RULES.map((r) => (
              <li key={r.t} data-tm="lit"><b>{r.t}</b><span>{r.d}</span></li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}

export function Contact() {
  return (
    <section className={s.contact} id="lien-he" aria-label="Liên hệ và vị trí">
      <div className={s.wrap}>
        <div className={s.contactGrid}>
          <div>
            <p className={s.kicker}>Liên hệ</p>
            <h2 className={s.h2} data-tm="lit">Tầng Mây, Quận Sơn Trà, Đà Nẵng</h2>
            <p className={s.mutedP}>Quán nằm trên tầng thượng một toà nhà gần bờ biển Sơn Trà, đi thang máy lên tầng cao nhất. Gửi xe máy và ô tô ở bãi của toà nhà.</p>
          </div>
          <dl className={s.contactList}>
            <div><dt>Giờ mở cửa</dt><dd>17:00 – 00:00 (thứ Sáu, thứ Bảy đến 01:00)</dd></div>
            <div><dt>Đặt bàn &amp; sự kiện</dt><dd>0236 000 0000</dd></div>
            <div><dt>Email</dt><dd>hello@tangmay.example</dd></div>
            <div><dt>Độ tuổi</dt><dd>Dành cho khách từ 18 tuổi</dd></div>
          </dl>
        </div>
      </div>
    </section>
  );
}
