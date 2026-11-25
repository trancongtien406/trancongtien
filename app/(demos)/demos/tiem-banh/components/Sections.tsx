import Image from "next/image";
import { InfiniteHorizontalMarqueeImages, ClipReveal, ScrollScrubText, StackingCards } from "@/features/showroom/effects";
import { buildConsultHref } from "@/features/showroom/consultation";
import { siteConfig } from "@/lib/site";
import s from "../brand.module.css";
import { Board } from "./Board";
import { Builder } from "./Builder";
import { Drip } from "./Drip";
import { Menu } from "./Menu";
import { Treat } from "./Treat";

const I = (f: string, alt: string, w = 600, h = 800) => ({ src: `/images/demos/tiem-banh/${f}-600.webp`, alt, width: w, height: h });

export function MenuSection() {
  return (
    <section className={`${s.sec} ${s.secMint}`} id="tu-banh" aria-labelledby="h-menu">
      <div className={s.wrap}>
        <div className={s.secHead}>
          <span className={s.eyebrow}>Tủ bánh hôm nay</span>
          <h2 className={`${s.display} ${s.h2}`} id="h-menu">Mười sáu món, món nào cũng có một cái duyên</h2>
          <p className={s.lead}>Bánh nướng sáng nay, kem đánh trong ngày. Giá tham khảo, có thể thay đổi theo mùa nguyên liệu.</p>
        </div>
        <Menu />
      </div>
    </section>
  );
}

export function Interlude() {
  return (
    <div className={s.interlude} aria-label="Hình ảnh các món bánh">
      <InfiniteHorizontalMarqueeImages
        mode="velocity" speed={46} boost={0.9} gap="1.2rem" imageHeight={260} imageClassName={s.interImg} controls pauseLabel="Dừng chạy ảnh" playLabel="Chạy ảnh" buttonClassName={s.marqueeBtn}
        images={[
          I("donut-hong", "Bánh donut phủ đường hồng và cốm trắng", 600, 400),
          I("croissant-bo", "Croissant bơ vàng ruộm trên đĩa sứ", 600, 900),
          I("macaron-mint-hong", "Macaron màu mint và hồng trên mặt gỗ", 600, 900),
          I("macaron-hop", "Hộp giấy bốn chiếc macaron hồng và xanh", 600, 400),
          I("donut-com-mau", "Donut phủ cốm nhiều màu trên nền hồng", 600, 900),
        ]}
      />
    </div>
  );
}

export function BuilderSection() {
  return (
    <section className={`${s.sec} ${s.secPink}`} id="dung-banh" aria-labelledby="h-builder">
      <div className={s.wrap}>
        <div className={s.secHead}>
          <span className={s.eyebrow}>Cake Builder</span>
          <h2 className={`${s.display} ${s.h2}`} id="h-builder">Tự dựng chiếc bánh của bạn</h2>
          <p className={s.lead}>Chọn vị, size, lớp kem, chữ viết và trang trí. Bản vẽ bên cạnh đổi ngay theo từng lựa chọn, kèm giá tham khảo.</p>
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
            <p className={s.lead}>Bột được nhào khi trời còn mát, bánh lên lò lúc đường phố chưa kịp đông. Tới khi bạn ghé, tủ bánh đã thơm mùi bơ và đường cháy nhẹ.</p>
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
  { n: "1", t: "Chọn hoặc dựng bánh", d: "Chọn món có sẵn trong tủ, hoặc dùng Cake Builder để ra tóm tắt vị, size, kem, chữ và trang trí.", kind: "cake" as const, colors: ["#F6D49B", "#FFE3EC", "#FF5E86"] as [string, string, string], bg: "var(--mk-butter)" },
  { n: "2", t: "Nhắn tiệm xác nhận", d: "Gửi tóm tắt qua form tư vấn. Tiệm xác nhận mẫu bánh, giá và thời gian nhận bánh phù hợp.", kind: "macaron" as const, colors: ["#FF8FAE", "#8FE0BE", "#FFE27D"] as [string, string, string], bg: "var(--mk-pink-soft)" },
  { n: "3", t: "Nhận bánh tươi", d: "Bánh làm gần ngày nhận, đóng hộp chắc chắn, có thêm nến và dao cắt khi bạn cần.", kind: "cupcake" as const, colors: ["#F6D49B", "#8FE0BE", "#FF5E86"] as [string, string, string], bg: "var(--mk-lilac)" },
];

export function ProcessSection() {
  return (
    <section className={`${s.sec} ${s.secPeach}`} id="dat-banh" aria-labelledby="h-process">
      <div className={s.wrap}>
        <div className={s.secHead}>
          <span className={s.eyebrow}>Cách đặt bánh</span>
          <h2 className={`${s.display} ${s.h2}`} id="h-process">Ba bước, không cần nghĩ nhiều</h2>
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

export function Manifesto() {
  return (
    <section className={`${s.sec} ${s.secChoco}`} aria-label="Cách Mây Kẹo làm bánh">
      <div className={s.wrapNarrow}>
        <ScrollScrubText className={s.manifesto} dim={0.22}>
          Chúng tôi không làm bánh để chụp ảnh cho đẹp. Chúng tôi làm bánh để người ta cười khi mở hộp, để dao cắt xuống thì thấy từng lớp mềm, và để cái bánh nhỏ trên bàn cũng đủ làm cả nhà rộn lên.
        </ScrollScrubText>
        <div className={s.manifestoPhoto}>
          <ClipReveal variant="circle" from="center" duration={1.1} innerScale={1.25}>
            <Image src="/images/demos/tiem-banh/kem-bong-pastel-1200.webp" alt="Chi tiết kem bông màu mint và tím trên bánh kem hồng" width={700} height={500} sizes="(max-width: 860px) 90vw, 640px" style={{ width: "100%", height: "100%", objectFit: "cover", objectPosition: "50% 30%" }} loading="lazy" />
          </ClipReveal>
        </div>
      </div>
    </section>
  );
}

const FAQ = [
  ["Đặt bánh trước bao lâu?", "Với bánh kem dựng theo yêu cầu, bạn nên nhắn trước ít nhất 2 ngày. Bánh nhỏ, macaron, croissant có thể hỏi tiệm trong ngày, tuỳ mẻ nướng còn hay hết."],
  ["Giá trong trang có phải giá cuối cùng?", "Đây là giá tham khảo. Giá chính thức được tiệm xác nhận sau khi chốt mẫu bánh, thời gian nhận và các yêu cầu thêm."],
  ["Có viết chữ lên bánh không?", "Có. Bạn gõ lời chúc trong Cake Builder, tối đa 24 ký tự. Chữ viết tay bằng kem hoặc socola, kiểu chữ tròn vui tương tự bản xem trước."],
  ["Bánh có hợp người ăn kiêng hoặc dị ứng không?", "Bánh làm trong bếp có bột mì, trứng, sữa, hạt. Nếu bạn hoặc người nhận có dị ứng, hãy ghi rõ khi gửi yêu cầu để tiệm tư vấn thật kỹ."],
  ["Giao bánh thế nào?", "Bạn có thể nhận tại tiệm hoặc nhờ tiệm gợi ý cách giao trong Đà Nẵng. Phí và thời gian sẽ được xác nhận cùng đơn."],
  ["Bản xem trước có giống bánh thật không?", "Bản vẽ giúp bạn hình dung màu sắc, kiểu kem và trang trí. Bánh thật là đồ làm tay nên chi tiết sẽ có khác biệt nhỏ, tiệm sẽ trao đổi lại khi xác nhận."],
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
        <h2 className={`${s.display} ${s.hClose}`} id="h-close">Sinh nhật ai sắp tới?</h2>
        <p className={s.lead} style={{ margin: "0 auto" }}>Dựng bánh trong vài phút, gửi tóm tắt, phần còn lại để tiệm lo.</p>
        <div className={s.closeBtns}>
          <a className={`${s.btn} ${s.btnBig} ${s.btnChoco}`} href={buildConsultHref("tiem-banh")} data-confetti="1">Gửi yêu cầu tư vấn</a>
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
          <p className={s.footTag}>Tiệm bánh ngọt làm tay ở Đà Nẵng. Ngọt vừa đủ, vui vừa đủ.</p>
        </div>
        <nav aria-label="Liên kết cuối trang">
          <h3>Trong trang</h3>
          <a href="#tu-banh">Tủ bánh</a>
          <a href="#dung-banh">Cake Builder</a>
          <a href="#dat-banh">Cách đặt bánh</a>
          <a href="#hoi-dap">Hỏi đáp</a>
        </nav>
        <div>
          <h3>Liên hệ</h3>
          <p>chao@maykeo.example</p>
          <p>0236&nbsp;000&nbsp;0000</p>
          <p>Đà Nẵng</p>
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
