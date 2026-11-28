/* eslint-disable @next/next/no-img-element */
import s from "../brand.module.css";
import { Collection, ContactForm, Counter, Newsletter } from "./Interactive";

const IMG = "/images/demos/giot-suong";

export function Problem() {
  const items = [
    ["Từ 8 giờ sáng", "Lớp ẩm bắt đầu bay hơi", "Máy lạnh, nắng và khói bụi hút nước khỏi bề mặt da. Đến trưa, da căng và xỉn màu hơn rõ rệt."],
    ["Giữa buổi chiều", "Da bong nhẹ, trang điểm lì cặn", "Khi hàng rào ẩm yếu đi, lớp sừng khô nên kem nền bám vệt và dễ lộ chân phấn."],
    ["Nửa đêm", "Da tự sửa nhưng thiếu nước", "Da phục hồi vào ban đêm, cần đủ nước để làm việc. Thiếu nước, sáng dậy mặt vẫn mệt."],
  ];
  return (
    <section className={s.problem} id="van-de" data-tone="light" aria-labelledby="gs-pb">
      <div className={s.secHead} data-gsrv="">
        <p className={s.eyebrow}>Vì sao da khô trước trưa</p>
        <h2 id="gs-pb" className={s.h2l}>Da không thiếu kem. <em>Da thiếu nước.</em></h2>
        <p className={s.lede}>Dầu và nước là hai chuyện khác nhau. Kem dưỡng khoá ẩm, nhưng chỉ có nước thật sự mới làm da căng. Hyaluronic acid giữ gấp nhiều lần trọng lượng của nó bằng nước, đưa độ ẩm về đúng chỗ nó cần.</p>
      </div>
      <ol className={s.timeline}>
        {items.map(([when, t, d]) => (
          <li key={when} data-gsrv=""><span>{when}</span><h3>{t}</h3><p>{d}</p></li>
        ))}
      </ol>
    </section>
  );
}

export function Ingredients() {
  const ing = [
    ["Hyaluronic acid 2%", "Giữ nước trong da, ba phân tử lượng từ lớn đến nhỏ để cấp ẩm cả bề mặt lẫn lớp sâu hơn."],
    ["Panthenol (B5)", "Làm dịu và hỗ trợ hàng rào bảo vệ da, giảm cảm giác châm chích sau nắng."],
    ["Allantoin", "Mềm da, làm dịu vùng má đỏ và quanh mũi dễ kích ứng."],
    ["Chiết xuất rau má", "Quen thuộc với da Việt, giúp làm dịu và giữ da bình tĩnh khi thời tiết đổi."],
    ["Betaine", "Giữ nước tự nhiên, tạo cảm giác mượt mà nhưng không bết dính."],
    ["Natri PCA", "Thành phần tự có trong da, giúp bề mặt giữ nước lâu hơn suốt ngày dài."],
  ];
  return (
    <section className={s.ingr} id="thanh-phan" data-tone="dark" aria-labelledby="gs-ing">
      <div className={s.ingrHead} data-gsrv="">
        <p className={s.eyebrowD}>Thành phần</p>
        <h2 id="gs-ing" className={s.h2}>Công thức ngắn. <em>Mỗi thứ có lý do.</em></h2>
        <p className={s.ledeD}>Không hương liệu, không cồn khô, không tinh dầu. Chúng tôi bỏ bớt những gì không cần để da được yên.</p>
        <img src={`${IMG}/serum-nho-giot.webp`} alt="Ống nhỏ giọt cầm trên tay phía trên chai thuỷ tinh" width={900} height={1000} loading="lazy" decoding="async" />
      </div>
      <ul className={s.ingrList}>
        {ing.map(([n, d], i) => (
          <li key={n} data-gsrv=""><span>{String(i + 1).padStart(2, "0")}</span><div><h3>{n}</h3><p>{d}</p></div></li>
        ))}
      </ul>
    </section>
  );
}

export function Steps() {
  const steps = [
    ["01", "Rửa mặt, để da còn ẩm", "Vỗ nhẹ khăn, đừng lau khô. Serum bám tốt nhất khi da còn hơi nước.", "mat-nuoc", "Gợn nước lan trên mặt nước tĩnh"],
    ["02", "Ba giọt, vỗ đều", "Nhỏ ba giọt lên lòng bàn tay, ấn nhẹ lên má, trán, cằm. Không kéo, không chà.", "serum-nho-giot", "Ống nhỏ giọt cầm trên tay phía trên chai thuỷ tinh"],
    ["03", "Khoá ẩm bằng kem dưỡng", "Sáng thêm chống nắng, tối thêm kem dưỡng. Da căng mịn đến nửa đêm.", "thoa-serum", "Thoa dưỡng chất lên má"],
  ];
  return (
    <section className={s.steps} id="cach-dung" data-tone="light" aria-labelledby="gs-steps">
      <h2 id="gs-steps" className={s.h2l} data-gsrv="">Ba bước, <em>chưa tới một phút.</em></h2>
      <ol className={s.stepList}>
        {steps.map(([n, t, d, img, alt]) => (
          <li key={n} data-gsrv=""><img className={s.stepImg} src={`${IMG}/${img}.webp`} alt={alt} width={700} height={520} loading="lazy" decoding="async" /><span>{n}</span><h3>{t}</h3><p>{d}</p></li>
        ))}
      </ol>
      <p className={s.stepNote} data-gsrv="">Lịch dùng gợi ý: sáng sau bước rửa mặt, tối trước kem dưỡng. Dùng mỗi ngày ít nhất bốn tuần để thấy rõ khác biệt.</p>
    </section>
  );
}

export function Results() {
  return (
    <section className={s.results} id="ket-qua" data-tone="dark" aria-labelledby="gs-res">
      <h2 id="gs-res" className={s.h2} data-gsrv="">Con số từ khảo sát nhỏ <em>(minh hoạ)</em></h2>
      <div className={s.statGrid}>
        <div data-gsrv=""><b><Counter to={92} suffix="%" /></b><p>thấy da mềm hơn sau 7 ngày</p></div>
        <div data-gsrv=""><b><Counter to={87} suffix="%" /></b><p>thấy da căng hơn vào buổi trưa</p></div>
        <div data-gsrv=""><b><Counter to={4.8} decimals={1} suffix="/5" /></b><p>điểm hài lòng trung bình</p></div>
        <div data-gsrv=""><b><Counter to={0} />%</b><p>hương liệu, không cồn khô</p></div>
      </div>
      <p className={s.fineD}>Số liệu là giả định cho trang minh hoạ, không phải kết quả nghiên cứu thật.</p>
    </section>
  );
}

export function Shelf() {
  return (
    <section className={s.shelf} id="bo-suu-tap" data-tone="light" aria-labelledby="gs-shelf">
      <div className={s.secHead} data-gsrv="">
        <p className={s.eyebrow}>Bộ sưu tập</p>
        <h2 id="gs-shelf" className={s.h2l}>Cả quy trình, <em>gọn trong một kệ.</em></h2>
      </div>
      <Collection />
    </section>
  );
}

export function Story() {
  return (
    <section className={s.story} id="cau-chuyen" data-tone="dark" aria-labelledby="gs-story">
      <div className={s.storyText} data-gsrv="">
        <p className={s.eyebrowD}>Câu chuyện</p>
        <h2 id="gs-story" className={s.h2}>Bắt đầu từ một chiếc gương <em>mờ hơi nước.</em></h2>
        <p>Giọt Sương ra đời từ một buổi sáng ở Đà Lạt, khi người sáng lập viết tên mình lên tấm gương mờ sương và thấy làn da mình cũng cần một lớp nước như thế. Không phải một lớp dầu dày, mà một giọt nước giữ lại được.</p>
        <p>Chúng tôi chọn công thức tối giản, chai thuỷ tinh tái sử dụng được và nắp bóp có thể thay riêng để giảm rác. Mỗi lô được kiểm nghiệm độc lập trước khi đóng gói. (Câu chuyện thương hiệu là minh hoạ.)</p>
        <ul className={s.values}>
          <li><b>Tối giản</b><span>11 thành phần, đủ dùng.</span></li>
          <li><b>Dịu nhẹ</b><span>Không hương liệu, thử trên da nhạy cảm.</span></li>
          <li><b>Có trách nhiệm</b><span>Chai thuỷ tinh, đổi lại bằng điểm thưởng.</span></li>
        </ul>
      </div>
      <figure className={s.storyFig} data-gsrv="">
        <img src={`${IMG}/thoa-serum.webp`} alt="Thoa dưỡng chất lên má" width={700} height={520} loading="lazy" decoding="async" />
        <figcaption>Ảnh minh hoạ (Pexels, xem CREDITS).</figcaption>
      </figure>
    </section>
  );
}

export function Reviews() {
  const r = [
    ["Mềm từ tuần đầu", "Mình có làn da khô và hay bong quanh mũi. Dùng ba giọt mỗi sáng, hết chai đầu da không còn căng rát nữa.", "Thu Hà, 29 tuổi, Hà Nội"],
    ["Không hương liệu là điểm cộng", "Da mình nhạy cảm nên rất sợ mùi. Serum này gần như không mùi, thấm nhanh, không dính.", "Minh Anh, 33 tuổi, TP.HCM"],
    ["Giao nhanh, đổi trả dễ", "Dùng thử 30 ngày làm mình yên tâm. Cuối cùng mình đặt thêm chai 50 ml.", "Ngọc Lan, 26 tuổi, Đà Nẵng"],
  ];
  return (
    <section className={s.reviews} id="danh-gia" data-tone="light" aria-labelledby="gs-rv">
      <h2 id="gs-rv" className={s.h2l} data-gsrv="">Họ nói gì <em>sau 30 ngày</em></h2>
      <ul className={s.rvGrid}>
        {r.map(([t, q, who]) => (
          <li key={t} data-gsrv=""><div className={s.stars} aria-label="5 trên 5 sao">★★★★★</div><h3>{t}</h3><p>{q}</p><cite>{who}</cite></li>
        ))}
      </ul>
      <p className={s.fine2}>Đánh giá là nội dung minh hoạ do thiết kế viết, không phải khách hàng thật.</p>
    </section>
  );
}

export function Plans() {
  const plans = [
    ["Mua lẻ", "590.000đ", "một chai 30 ml", ["Giao miễn phí, nhận sau 2 ngày", "Dùng thử 30 ngày, không hợp gửi lại", "Hướng dẫn dùng qua email"], false],
    ["Combo ba bước", "1.190.000đ", "serum + kem Mây + sữa rửa mặt", ["Tiết kiệm 20% so với mua lẻ", "Tặng túi vải đựng mỹ phẩm", "Tư vấn loại da miễn phí"], true],
    ["Giao định kỳ", "531.000đ", "mỗi 8 tuần, giảm 10%", ["Không ràng buộc, huỷ bất cứ lúc nào", "Nhắc lịch trước khi giao một tuần", "Đổi chai cũ lấy điểm thưởng"], false],
  ] as const;
  return (
    <section className={s.plans} id="goi" data-tone="dark" aria-labelledby="gs-plans">
      <h2 id="gs-plans" className={s.h2} data-gsrv="">Chọn cách <em>dùng hợp với bạn</em></h2>
      <ul className={s.planGrid}>
        {plans.map(([n, p, sub, feats, hot]) => (
          <li key={n} className={s.plan} data-hot={hot} data-gsrv="">
            {hot && <span className={s.badge}>Được chọn nhiều</span>}
            <h3>{n}</h3><strong>{p}</strong><p className={s.planSub}>{sub}</p>
            <ul>{feats.map((f) => <li key={f}>{f}</li>)}</ul>
            <a className={s.addBtn} href="#mua"><span>Chọn gói</span><b>→</b></a>
          </li>
        ))}
      </ul>
    </section>
  );
}

const FAQ = [
  ["Da dầu mụn có dùng được không?", "Có. Serum dạng nước, không dầu, không hương liệu. Nếu da đang kích ứng, hãy thử ở một vùng nhỏ trước."],
  ["Bao lâu thì thấy khác biệt?", "Nhiều người thấy da mềm hơn ngay từ tuần đầu. Dùng đều sáng và tối để có kết quả rõ hơn sau 4 tuần."],
  ["Dùng thử 30 ngày hoạt động thế nào?", "Nếu chưa hợp, nhắn cho chúng tôi trong 30 ngày kể từ lúc nhận hàng để được gửi lại và hoàn tiền. (Nội dung minh hoạ.)"],
  ["Chai 30 ml dùng được bao lâu?", "Khoảng 6 đến 8 tuần với mỗi lần ba giọt, sáng và tối."],
  ["Có dùng chung với vitamin C hoặc retinol được không?", "Được. Dùng serum này sau các hoạt chất mạnh để cấp nước và làm dịu. Nếu da đỏ rát, giảm tần suất hoạt chất mạnh."],
  ["Bà bầu và cho con bú có dùng được không?", "Công thức dịu nhẹ và không có retinoid, nhưng bạn nên hỏi bác sĩ của mình trước khi thêm sản phẩm mới."],
  ["Giao hàng mất bao lâu?", "Nội thành Hà Nội và TP.HCM nhận sau 2 ngày, các tỉnh khác 3 đến 5 ngày. Miễn phí giao hàng cho mọi đơn."],
  ["Chai thuỷ tinh có đổi lại được không?", "Có. Mang chai rỗng về cửa hàng đối tác hoặc gửi lại để nhận điểm thưởng cho đơn kế tiếp. (Minh hoạ.)"],
];
export function Faq() {
  return (
    <section className={s.faq} id="hoi-dap" data-tone="light" aria-labelledby="gs-faq">
      <h2 id="gs-faq" className={s.h2l} data-gsrv="">Hỏi đáp</h2>
      <div className={s.faqList} data-gsrv="">
        {FAQ.map(([q, a]) => (<details key={q}><summary>{q}</summary><p>{a}</p></details>))}
      </div>
    </section>
  );
}

export function Contact() {
  return (
    <section className={s.contact} id="lien-he" data-tone="dark" aria-labelledby="gs-ct">
      <div data-gsrv="">
        <p className={s.eyebrowD}>Hỏi chuyên viên</p>
        <h2 id="gs-ct" className={s.h2}>Chưa chắc da mình hợp? <em>Hỏi chúng tôi.</em></h2>
        <p className={s.ledeD}>Mô tả tình trạng da, chuyên viên sẽ gợi ý lịch dùng phù hợp trong 24 giờ. Giờ làm việc 09:00 đến 18:00, thứ Hai đến thứ Bảy.</p>
        <Newsletter />
      </div>
      <div data-gsrv=""><ContactForm /></div>
    </section>
  );
}

export function Footer() {
  return (
    <footer className={s.footer} data-tone="dark">
      <div className={s.footGrid}>
        <div><p className={s.mark}>GIỌT SƯƠNG</p><p>Serum cấp ẩm dịu nhẹ cho da Việt. Trang minh hoạ thiết kế, không phải cửa hàng thật.</p></div>
        <nav aria-label="Sơ đồ trang"><h3>Trang</h3><a href="#mua">Cửa hàng</a><a href="#thanh-phan">Thành phần</a><a href="#cach-dung">Cách dùng</a><a href="#cau-chuyen">Câu chuyện</a><a href="#hoi-dap">Hỏi đáp</a></nav>
        <div><h3>Hỗ trợ</h3><p>xinchao@giotsuong.example</p><p>Hotline: 1900 0000</p><p>09:00 đến 18:00, thứ Hai đến thứ Bảy</p><p>12 Phố Mẫu, Hà Nội (minh hoạ)</p></div>
        <div><h3>Theo dõi</h3><a href="#top">Instagram</a><a href="#top">TikTok</a><a href="#top">Facebook</a></div>
      </div>
      <p className={s.footFine}>© 2026 Giọt Sương Skin. Thương hiệu, số liệu, đánh giá và câu chuyện là giả định, không đại diện doanh nghiệp thật. Ảnh minh hoạ lấy từ Pexels (xem CREDITS).</p>
    </footer>
  );
}
