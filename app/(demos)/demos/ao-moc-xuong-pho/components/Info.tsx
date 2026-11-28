import styles from "../brand.module.css";
import { Logo } from "./Rack";
import { Newsletter } from "./Forms";

const IMG = "/images/demos/ao-moc-xuong-pho";

export function Manifesto() {
  return (
    <section id="gioi-thieu" className={styles.manifest} aria-labelledby="mf-h">
      <p className={styles.eyebrow}>Mùa Hè Phố 25</p>
      <h2 id="mf-h" className={styles.mfH}>Là ta, không phải họ.</h2>
      <div className={styles.mfCols}>
        <p className={styles.lead}>Áo Mộc Xuống Phố bắt đầu từ một cái xưởng nhỏ ở Quận 1, nơi mấy đứa bạn cùng đại học ngồi may áo cho đội bóng phố. Không người mẫu hào nhoáng, không quảng cáo rình rang: chỉ vải đủ dày, form đủ rộng và câu chữ nói đúng điều tụi mình tin.</p>
        <p>Mỗi mùa chúng tôi ra tối đa bảy mẫu, treo trọn trên một thanh giá. Bạn có thể rê chuột để xem áo xoay ra mặt trước, bấm vào để xem kỹ, đổi màu bằng thẻ treo và lật sang mặt sau. Áo nào hết hàng, chúng tôi gỡ khỏi giá và không bao giờ sản xuất lại; vậy nên mặc áo Mộc là mặc một mẩu của mùa đó.</p>
      </div>
      <ul className={styles.facts}>
        <li><b>2019</b><span>năm xưởng nhỏ mở cửa</span></li>
        <li><b>7</b><span>mẫu mỗi mùa, không hơn</span></li>
        <li><b>12.400</b><span>chiếc đã mặc xuống phố *</span></li>
        <li><b>7 ngày</b><span>đổi size miễn phí</span></li>
      </ul>
      <p className={styles.fine2}>* Số liệu minh hoạ cho trang demo.</p>
    </section>
  );
}

const LOOKS = [
  ["tee-navy.webp", "Áo thun lanh chàm treo trên móc gỗ (ảnh minh hoạ)", "Lanh chàm, xẻ tà nhẹ"],
  ["tee-den.webp", "Áo thun cotton đen than (ảnh minh hoạ)", "Cotton than, dáng suông"],
  ["tee-cam.webp", "Áo thun crop màu cam đất (ảnh minh hoạ)", "Crop cam đất, nhuộm đất"],
  ["tee-hong.webp", "Áo thun oversize màu hồng đất (ảnh minh hoạ)", "Oversize hồng, tay lỡ"],
  ["hoodie-nau.webp", "Áo hoodie nỉ nâu cát (ảnh minh hoạ)", "Hoodie nỉ cát, mũ hai lớp"],
];

export function Lookbook() {
  return (
    <section id="lookbook" className={styles.look} aria-labelledby="lb-h">
      <div className={styles.secHead}>
        <div>
          <p className={styles.eyebrow}>Lookbook</p>
          <h2 id="lb-h" className={styles.h2}>Áo lên người, xuống phố.</h2>
        </div>
        <p className={styles.lead}>Ảnh minh hoạ chọn từ kho ảnh miễn phí; bản thật sẽ là ảnh chụp tại xưởng và trên phố Sài Gòn.</p>
      </div>
      <div className={styles.lookWall}>
        <figure className={styles.lookBig}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={`${IMG}/gia-ao-linen.webp`} alt="Giá treo sơ mi lanh nhiều màu trên nền tường hồng (ảnh minh hoạ)" width={1000} height={1500} loading="lazy" decoding="async" />
          <figcaption>Giá sơ mi lanh trong xưởng, hàng thử màu cho mùa sau</figcaption>
        </figure>
        <ul className={styles.lookList}>
          {LOOKS.map(([f, alt, cap]) => (
            <li key={f}>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={`${IMG}/${f}`} alt={alt} width={720} height={900} loading="lazy" decoding="async" />
              <span>{cap}</span>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

const MATS = [
  ["Cotton 260gsm", "Áo thun, ba lỗ", [["Thành phần", "100% cotton chải kỹ"], ["Xử lý", "Wash đá, xả co 3 lần"], ["Cảm giác", "Dày, đứng form, mềm dần theo thời gian"]]],
  ["Lanh pha 55/45", "Thun lanh, sơ mi", [["Thành phần", "55% lanh, 45% cotton"], ["Xử lý", "Giặt enzyme"], ["Cảm giác", "Thoáng, mát, nhăn đẹp tự nhiên"]]],
  ["Denim 6oz", "Sơ mi denim", [["Thành phần", "98% cotton, 2% spandex"], ["Xử lý", "Rửa nhạt thủ công"], ["Cảm giác", "Mỏng nhẹ, hợp trời nóng"]]],
  ["Lưới thể thao", "Áo đấu", [["Thành phần", "Poly tái chế lưới tổ ong"], ["Xử lý", "Sọc dệt chìm, số in nhiệt"], ["Cảm giác", "Nhanh khô, thoát mồ hôi"]]],
] as const;

export function Materials() {
  return (
    <section id="chat-lieu" className={styles.mats} aria-labelledby="mat-h">
      <div className={styles.secHead}>
        <div>
          <p className={styles.eyebrow}>Chất liệu</p>
          <h2 id="mat-h" className={styles.h2}>Vải nào, áo nấy.</h2>
        </div>
        <p className={styles.lead}>Bốn loại vải chủ lực, đều được thử giặt 20 lần trước khi vào sản xuất.</p>
      </div>
      <ul className={styles.matGrid}>
        {MATS.map(([t, use, rows], i) => (
          <li key={t} className={styles.mat}>
            <span className={styles.matNo}>0{i + 1}</span>
            <h3>{t}</h3>
            <p className={styles.use}>{use}</p>
            <dl>{rows.map(([k, v]) => <div key={k}><dt>{k}</dt><dd>{v}</dd></div>)}</dl>
          </li>
        ))}
      </ul>
    </section>
  );
}

const STEPS = [
  ["Phác thảo", "Cả nhóm ngồi vẽ trên bàn xưởng, chốt đúng bảy mẫu cho mùa. Mẫu nào không ai muốn mặc đi cà phê thì bỏ."],
  ["Chọn vải, nhuộm", "Vải mộc về xưởng được xả, nhuộm đất hoặc wash theo màu của mùa, thử co rút và phai màu."],
  ["Cắt và may", "Mỗi mã cắt số lượng nhỏ, may ở xưởng đối tác tại Bình Dương, kiểm từng đường chỉ trước khi qua in."],
  ["In và thêu", "Chữ in nứt phủ cao su, logo cao su nổi, thêu nổi sau lưng áo khoác. Mỗi chiếc in tay, nên không chiếc nào y hệt."],
  ["Kiểm tem, đóng gói", "Gấp tay, gói giấy tái chế, đính thẻ treo giống ngoài giá, giao trong 2 ngày."],
];

export function Process() {
  return (
    <section id="quy-trinh" className={styles.process} aria-labelledby="pr-h">
      <p className={styles.eyebrow}>Quy trình</p>
      <h2 id="pr-h" className={styles.h2}>Từ bản vẽ tới giá treo, năm bước.</h2>
      <ol className={styles.steps}>
        {STEPS.map(([t, d], i) => (
          <li key={t}>
            <span>{String(i + 1).padStart(2, "0")}</span>
            <h3>{t}</h3>
            <p>{d}</p>
          </li>
        ))}
      </ol>
    </section>
  );
}

export function Band() {
  return (
    <section className={styles.band} aria-label="Số liệu nổi bật">
      <ul>
        <li><b>38</b><span>mẫu đã ra từ 2019</span></li>
        <li><b>20×</b><span>lần thử giặt mỗi loại vải</span></li>
        <li><b>96%</b><span>khách quay lại mùa sau *</span></li>
        <li><b>4.8/5</b><span>điểm hài lòng *</span></li>
      </ul>
      <p>* Số liệu minh hoạ.</p>
    </section>
  );
}

const TEAM = [
  ["Minh Khôi", "Thiết kế chính", "Vẽ áo từ năm 2019, mê đồ bóng chày và áo đấu cũ."],
  ["Thảo Vy", "Chất liệu & màu", "Đi hết chợ vải Tân Bình để tìm đúng tông chàm."],
  ["Gia Huy", "In & thêu", "Người giữ bí quyết chữ in nứt phủ cao su."],
  ["Ngọc Hân", "Cộng đồng & giao hàng", "Gói từng đơn, viết tay lời nhắn cho khách quen."],
];

export function Team() {
  return (
    <section id="doi-ngu" className={styles.team} aria-labelledby="tm-h">
      <div className={styles.secHead}>
        <div>
          <p className={styles.eyebrow}>Đội ngũ</p>
          <h2 id="tm-h" className={styles.h2}>Bốn đứa, một cái xưởng.</h2>
        </div>
      </div>
      <ul className={styles.teamGrid}>
        {TEAM.map(([n, r, d], i) => (
          <li key={n}>
            <div className={styles.avatar} style={{ background: ["#62ff1f", "#ff9fc3", "#ffd84a", "#9db8ff"][i] }} aria-hidden="true">{n.split(" ").map((w) => w[0]).join("")}</div>
            <h3>{n}</h3>
            <b>{r}</b>
            <p>{d}</p>
          </li>
        ))}
      </ul>
      <p className={styles.fine2}>Tên và chân dung là minh hoạ, không phải người thật.</p>
    </section>
  );
}

const REV = [
  ["Áo dày, đứng form, giặt 10 lần vẫn không xù. Chữ in nứt nhìn càng mặc càng đẹp.", "Quốc Bảo", "Áo thun Là Ta Không Phải Họ"],
  ["Áo khoác bóng chày nặng tay, bo kẻ đều chằn chặn. Giao 2 ngày, hộp giấy xinh.", "Lan Chi", "Áo khoác bóng chày Áo Mộc"],
  ["Mua size M theo gợi ý trên trang, mặc vừa khít. Đổi màu bằng thẻ treo nhìn vui thật.", "Anh Tuấn", "Áo đấu bóng đá Áo Mộc"],
];

export function Reviews() {
  return (
    <section id="danh-gia" className={styles.reviews} aria-labelledby="rv-h">
      <p className={styles.eyebrow}>Khách nói gì</p>
      <h2 id="rv-h" className={styles.h2}>Mặc rồi mới biết.</h2>
      <ul className={styles.revGrid}>
        {REV.map(([q, n, p]) => (
          <li key={n}>
            <blockquote>“{q}”</blockquote>
            <p><b>{n}</b><span>{p}</span></p>
          </li>
        ))}
      </ul>
      <p className={styles.fine2}>Lời đánh giá và tên khách là minh hoạ cho trang demo.</p>
    </section>
  );
}

const TIERS = [
  ["Phố Thường", "Miễn phí", ["Mua mọi mẫu đang có trên giá", "Đổi size 7 ngày", "Nhận bản tin hàng mới"]],
  ["Phố Quen", "199.000đ / năm", ["Giảm 10% mọi đơn", "Mua trước mẫu mới 48 giờ", "Đổi size 14 ngày, không giới hạn", "Quà sinh nhật"], true],
  ["Phố Chủ", "699.000đ / năm", ["Giảm 15% mọi đơn", "In tên lên áo miễn phí 2 lần", "Mời tới buổi thử áo tại studio", "Ưu tiên ký gửi mẫu riêng"]],
] as const;

export function Tiers() {
  return (
    <section id="hoi-vien" className={styles.tiers} aria-labelledby="ti-h">
      <div className={styles.secHead}>
        <div>
          <p className={styles.eyebrow}>Hội viên</p>
          <h2 id="ti-h" className={styles.h2}>Quen mặt, có quà.</h2>
        </div>
        <p className={styles.lead}>Ba bậc hội viên, huỷ bất kỳ lúc nào. Giá minh hoạ.</p>
      </div>
      <ul className={styles.tierGrid}>
        {TIERS.map(([n, p, perks, hot]) => (
          <li key={n} className={hot ? styles.tierHot : ""}>
            {hot ? <em>Được chọn nhiều</em> : null}
            <h3>{n}</h3>
            <p className={styles.price}>{p}</p>
            <ul>{perks.map((x) => <li key={x}>{x}</li>)}</ul>
            <a href="#lien-he" className={styles.add}>{n === "Phố Thường" ? "Tham gia ngay" : "Hỏi về gói này"}</a>
          </li>
        ))}
      </ul>
    </section>
  );
}

export function SiteFooter() {
  return (
    <footer className={styles.footer}>
      <Newsletter />
      <div className={styles.fCols}>
        <div>
          <Logo className={styles.fLogo} />
          <p>Local brand streetwear Việt. Mỗi mùa bảy mẫu, treo trọn trên một thanh giá.</p>
        </div>
        <nav aria-label="Sơ đồ trang">
          <h4>Khám phá</h4>
          <a href="#gia-treo">Giá treo</a><a href="#cua-hang">Cửa hàng</a><a href="#lookbook">Lookbook</a><a href="#chat-lieu">Chất liệu</a><a href="#hoi-vien">Hội viên</a>
        </nav>
        <nav aria-label="Hỗ trợ">
          <h4>Hỗ trợ</h4>
          <a href="#size">Chọn size</a><a href="#hoi-dap">Hỏi đáp</a><a href="#lien-he">Liên hệ</a><a href="#quy-trinh">Quy trình</a>
        </nav>
        <div>
          <h4>Studio</h4>
          <p>45 Lý Tự Trọng, Quận 1, TP.HCM<br />10:00–21:00 mỗi ngày<br />0900 000 053</p>
          <p className={styles.soc}><span>Instagram</span><span>TikTok</span><span>Facebook</span></p>
        </div>
      </div>
      <p className={styles.fine}>© 2026 Áo Mộc Xuống Phố. Trang minh hoạ thiết kế: thương hiệu, sản phẩm, giá, số liệu và địa chỉ chỉ là ví dụ, không phải doanh nghiệp thật.</p>
    </footer>
  );
}
