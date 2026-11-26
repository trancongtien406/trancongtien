import Image from "next/image";
import { StackingCards } from "@/features/showroom/effects";
import { buildConsultHref } from "@/features/showroom/consultation";
import { siteConfig } from "@/lib/site";
import s from "../brand.module.css";
import { Board } from "./Board";
import { Builder } from "./Builder";
import { Drip } from "./Drip";
import { Menu } from "./Menu";
import { Treat } from "./Treat";

export function MenuSection() {
  return (
    <section className={`${s.sec} ${s.secMint}`} id="tu-banh" aria-labelledby="h-menu">
      <div className={s.wrap}>
        <div className={s.secHead}>
          <span className={s.eyebrow}>Tủ bánh theo nhóm</span>
          <h2 className={`${s.display} ${s.h2}`} id="h-menu">Hai mươi mốt món trong tủ, chia bốn nhóm</h2>
          <p className={s.lead}>Bánh kem, bánh lạnh, bánh mì và croissant, cookie và macaron. Giá tham khảo, có thể đổi theo mùa nguyên liệu.</p>
        </div>
        <Menu />
        <Mosaic />
      </div>
    </section>
  );
}

const SHOTS = [
  { f: "kem-bong-pastel-1200", alt: "Chi tiết kem bông màu mint và tím trên bánh kem hồng", cls: "mosaicA" },
  { f: "croissant-bo-600", alt: "Croissant bơ vàng ruộm trên đĩa sứ", cls: "mosaicB" },
  { f: "macaron-mint-hong-600", alt: "Macaron màu mint và hồng trên mặt gỗ", cls: "mosaicC" },
  { f: "donut-hong-600", alt: "Bánh donut phủ đường hồng và cốm trắng", cls: "mosaicD" },
  { f: "macaron-hop-600", alt: "Hộp giấy bốn chiếc macaron hồng và xanh", cls: "mosaicE" },
  { f: "donut-com-mau-600", alt: "Donut phủ cốm nhiều màu trên nền hồng", cls: "mosaicF" },
] as const;

/** Ảnh tĩnh từ tủ bánh, bố cục ghép, không hiệu ứng. */
function Mosaic() {
  return (
    <ul className={s.mosaic} aria-label="Hình ảnh các món trong tủ bánh">
      {SHOTS.map((x) => (
        <li key={x.f} className={`${s.mosaicItem} ${s[x.cls]}`}>
          <Image src={`/images/demos/tiem-banh/${x.f}.webp`} alt={x.alt} fill sizes="(max-width: 860px) 46vw, 24vw" style={{ objectFit: "cover" }} loading="lazy" />
        </li>
      ))}
    </ul>
  );
}

export function BuilderSection() {
  return (
    <section className={`${s.sec} ${s.secPink}`} id="dung-banh" aria-labelledby="h-builder">
      <div className={s.wrap}>
        <div className={s.secHead}>
          <span className={s.eyebrow}>Tính giá &amp; xem trước</span>
          <h2 className={`${s.display} ${s.h2}`} id="h-builder">Dựng bánh sinh nhật theo ý bạn</h2>
          <p className={s.lead}>Chọn vị, size, lớp kem, chữ viết và trang trí, bản vẽ bên cạnh đổi theo từng lựa chọn kèm giá tham khảo. Xong thì gửi tóm tắt cho tiệm.</p>
        </div>
        <Builder />
      </div>
    </section>
  );
}

export function StorySection() {
  return (
    <section className={`${s.sec} ${s.secButter}`} id="mot-ngay" aria-labelledby="h-story">
      <div className={s.wrap}>
        <div className={s.storyGrid}>
          <div className={s.storyCopy}>
            <span className={s.eyebrow}>Một ngày ở Mây Kẹo</span>
            <h2 className={`${s.display} ${s.h2}`} id="h-story">Bếp thức dậy trước thành phố</h2>
            <p className={s.lead}>Bột được nhào khi trời còn mát, bánh lên lò lúc đường phố chưa kịp đông. Tiệm nhỏ ở Quận Hải Châu, làm bằng tay nên số lượng mỗi ngày có hạn.</p>
            <ol className={s.beats}>
              <li><b>Sớm tinh mơ</b><span>Cân bột, nhào tay, ủ men.</span></li>
              <li><b>Ra lò</b><span>Croissant, donut, bánh nhỏ nướng theo từng mẻ.</span></li>
              <li><b>Trang trí</b><span>Kem, cốm, macaron, chữ viết tay lên bánh.</span></li>
            </ol>
          </div>
          <Board />
        </div>
      </div>
    </section>
  );
}

const STEPS = [
  { n: "1", t: "Chọn hoặc dựng bánh", d: "Chọn mẫu có sẵn trong tủ, hoặc dùng phần dựng bánh để có tóm tắt vị, size, kem, chữ và trang trí.", kind: "cake" as const, colors: ["#F6D49B", "#FFE3EC", "#FF5E86"] as [string, string, string], bg: "var(--mk-butter)" },
  { n: "2", t: "Nhắn tiệm xác nhận", d: "Gửi tóm tắt qua form. Tiệm xác nhận mẫu bánh, giá, ngày giờ nhận và đặt cọc 50% với đơn 2 tầng hoặc dịp lễ.", kind: "macaron" as const, colors: ["#FF8FAE", "#8FE0BE", "#FFE27D"] as [string, string, string], bg: "var(--mk-pink-soft)" },
  { n: "3", t: "Nhận bánh tươi", d: "Nhận tại tiệm hoặc giao nội thành Đà Nẵng. Bánh làm sát ngày nhận, đóng hộp chắc, có nến và dao cắt khi bạn báo trước.", kind: "cupcake" as const, colors: ["#F6D49B", "#8FE0BE", "#FF5E86"] as [string, string, string], bg: "var(--mk-lilac)" },
];

export function ProcessSection() {
  return (
    <section className={`${s.sec} ${s.secPeach}`} id="dat-banh" aria-labelledby="h-process">
      <div className={s.wrap}>
        <div className={s.secHead}>
          <span className={s.eyebrow}>Cách đặt bánh</span>
          <h2 className={`${s.display} ${s.h2}`} id="h-process">Đặt bánh sinh nhật trong ba bước</h2>
        </div>
        <StackingCards top="5.5rem" offset={16} scaleStep={0.035} className={s.stack} cardClassName={s.stackCardWrap}>
          {STEPS.map((p) => (
            <article key={p.n} className={s.stackCard} style={{ background: p.bg }}>
              <span className={s.stepBig} aria-hidden="true">{p.n}</span>
              <div>
                <h3 className={`${s.display} ${s.h3}`}>{p.t}</h3>
                <p>{p.d}</p>
              </div>
              <Treat kind={p.kind} colors={p.colors} className={s.stackArt} />
            </article>
          ))}
        </StackingCards>
      </div>
    </section>
  );
}

const FAQ = [
  ["Đặt bánh sinh nhật trước bao lâu?", "Bánh kem 14cm đến 22cm cần báo trước ít nhất 2 ngày. Bánh 2 tầng, bánh vẽ hình riêng cần 4 ngày, dịp lễ lớn 5 ngày. Bánh nhỏ, bánh mì, cookie không cần đặt, tuỳ mẻ nướng còn hay hết."],
  ["Giá trong trang có phải giá cuối cùng?", "Đây là giá tham khảo. Giá chính thức được tiệm xác nhận sau khi chốt mẫu bánh, ngày nhận và các yêu cầu thêm."],
  ["Có viết chữ lên bánh không?", "Có. Bạn gõ lời chúc trong phần dựng bánh, tối đa 24 ký tự, phụ thu 20.000₫. Chữ viết tay bằng kem hoặc socola theo kiểu chữ tròn của tiệm."],
  ["Bánh có hợp người dị ứng không?", "Bếp dùng bột mì, trứng, sữa, bơ và có hạnh nhân, hạt dẻ. Bánh có thể dính vết hạt trong quá trình làm. Nếu bạn hoặc người nhận bị dị ứng, hãy ghi rõ khi gửi yêu cầu để tiệm tư vấn."],
  ["Bảo quản bánh kem thế nào?", "Để ngăn mát 2 đến 6 độ C, dùng ngon nhất trong ngày nhận và tối đa 48 giờ. Lấy ra khỏi tủ lạnh 15 phút trước khi cắt cho kem mềm. Không để bánh trong xe nóng."],
  ["Giao bánh thế nào, phí bao nhiêu?", "Nhận tại tiệm hoặc giao nội thành Đà Nẵng bằng xe máy có thùng giữ lạnh. Phí tính theo khoảng cách và được báo khi xác nhận đơn. Giao ngoài giờ bán cần hẹn trước."],
  ["Có đặt cọc không, đổi hoặc huỷ được không?", "Đơn bánh 2 tầng, bánh vẽ riêng và dịp lễ cần cọc 50%. Báo đổi giờ hoặc huỷ trước 48 giờ thì hoàn cọc, sau thời điểm đó tiệm giữ lại phần nguyên liệu đã chuẩn bị."],
  ["Bánh thật có giống bản xem trước không?", "Bản vẽ giúp bạn hình dung màu sắc, kiểu kem và trang trí. Bánh làm tay nên chi tiết sẽ khác nhau chút ít, tiệm sẽ trao đổi lại khi xác nhận."],
];

export function Faq() {
  return (
    <section className={`${s.sec} ${s.secMint}`} id="hoi-dap" aria-labelledby="h-faq">
      <div className={s.wrapNarrow}>
        <div className={s.secHead}>
          <span className={s.eyebrow}>Hỏi đáp</span>
          <h2 className={`${s.display} ${s.h2}`} id="h-faq">Điều mọi người hay hỏi</h2>
        </div>
        <div className={s.faq}>
          {FAQ.map(([q, a]) => (
            <details key={q} className={s.faqItem}>
              <summary>{q}<i aria-hidden="true" /></summary>
              <p>{a}</p>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}

export function Closing() {
  return (
    <section className={`${s.sec} ${s.secPink} ${s.closing}`} aria-labelledby="h-close">
      <div className={s.wrapNarrow} style={{ textAlign: "center" }}>
        <h2 className={`${s.display} ${s.hClose}`} id="h-close">Sinh nhật ai sắp tới, đặt bánh trước 2 ngày</h2>
        <p className={s.lead} style={{ margin: "0 auto" }}>Chọn size, vị và lời chúc, gửi tóm tắt cho tiệm. Tiệm xác nhận mẫu, giá và giờ nhận trong ngày.</p>
        <div className={s.closeBtns}>
          <a className={`${s.btn} ${s.btnBig} ${s.btnChoco}`} href={buildConsultHref("tiem-banh")} data-confetti="1">Gửi yêu cầu đặt bánh</a>
          <a className={`${s.btn} ${s.btnBig} ${s.btnWhite}`} href="#dung-banh">Dựng bánh lại</a>
        </div>
      </div>
    </section>
  );
}

export function Footer() {
  return (
    <footer className={s.footer}>
      <div className={s.footDrip}><Drip color="var(--mk-pink)" className={s.dripSvg} /></div>
      <div className={`${s.wrap} ${s.footGrid}`}>
        <div>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/images/demos/tiem-banh/identity/logo-reversed.svg" alt="Mây Kẹo" width={238} height={84} />
          <p className={s.footTag}>Tiệm bánh ngọt làm tay ở Quận Hải Châu, Đà Nẵng. Bán 7:00 – 21:00 hằng ngày.</p>
        </div>
        <nav aria-label="Liên kết cuối trang">
          <h3>Trong trang</h3>
          <a href="#tu-banh">Tủ bánh</a>
          <a href="#bang-gia">Bảng giá bánh kem</a>
          <a href="#dung-banh">Dựng bánh</a>
          <a href="#mua-dip">Bánh theo mùa</a>
          <a href="#giao-nhan">Giao nhận</a>
          <a href="#hoi-dap">Hỏi đáp</a>
        </nav>
        <div>
          <h3>Liên hệ</h3>
          <p>chao@maykeo.example</p>
          <p>0236&nbsp;000&nbsp;0000</p>
          <p>Quận Hải Châu, Đà Nẵng</p>
          <p>Bán 7:00 – 21:00 hằng ngày</p>
        </div>
      </div>
      <div className={s.wrap}>
        <div className={s.footBottom}>
          <span>Thiết kế website: {siteConfig.fullName}</span>
          <a href="/demos/tiem-banh/credits">Ảnh &amp; ghi công</a>
        </div>
      </div>
    </footer>
  );
}
