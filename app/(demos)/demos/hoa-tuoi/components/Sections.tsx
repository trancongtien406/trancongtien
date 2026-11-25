import Image from "next/image";
import { BlobMorph, DraggableGallery, MagneticButton, ScrollScrubText, SVGPathDraw, VelocityMarquee } from "@/features/showroom/effects";
import { buildConsultHref } from "@/features/showroom/consultation";
import { siteConfig } from "@/lib/site";
import s from "../brand.module.css";
import { BloomText } from "./BloomText";
import { Builder } from "./Builder";
import { BouquetSvg } from "./BouquetSvg";
import { PetalMask } from "./PetalMask";
import { BLOOM_PATHS, Bloom5, Leaf, type MaskShape } from "./Shapes";

const IMG = "/images/demos/hoa-tuoi";

/* ------------------------------------------------------------ dải chữ chạy */
export function Band() {
  const words = ["Sinh nhật", "Khai trương", "Cưới", "Xin lỗi", "Cảm ơn", "Một ngày bình thường"];
  return (
    <div className={s.band}>
      <VelocityMarquee mode="velocity" speed={60} boost={1.2} controls gap="2.5rem" className={s.bandMarquee} buttonClassName={s.bandBtn} label="Những dịp có hoa">
        {words.flatMap((w, i) => [<span key={w} className={s.bandWord}>{w}</span>, <Bloom5 key={`b${i}`} className={s.bandBloom} />])}
      </VelocityMarquee>
    </div>
  );
}

/* ------------------------------------------------------------ tuyên ngôn */
export function Manifesto() {
  return (
    <section className={s.manifesto} aria-labelledby="mf-h" data-leaf-scope="">
      <div className={`${s.wrap} ${s.mfGrid}`}>
        <div className={s.mfCopy}>
          <p className={s.eyebrow}>Chúng mình nghĩ về hoa</p>
          <h2 id="mf-h" className={s.h2}><BloomText accent={["ngắm."]} accentClassName={s.accent}>Hoa không chỉ để ngắm.</BloomText></h2>
          <ScrollScrubText className={s.mfScrub}>
            Hoa để nhớ một người. Để nói lời cảm ơn. Để căn phòng bỗng dịu dàng hơn. Và đôi khi, chỉ để nhắc mình rằng cuộc sống vẫn luôn có những điều đẹp đang nở.
          </ScrollScrubText>
        </div>
        <div className={s.mfArt}>
          <PetalMask shape="leaf" className={s.mfLeaf} outline outlineClassName={s.mfOutline}>
            <Image src={`${IMG}/la-monstera-1200.webp`} alt="Những chiếc lá monstera xanh thẫm trong bóng tối" fill sizes="(max-width: 900px) 70vw, 34vw" style={{ objectFit: "cover" }} loading="lazy" />
          </PetalMask>
          <div className={`${s.mfSprig} ${s.mfSprigA}`} aria-hidden="true"><div data-leaf="" data-y="-70" data-x="20" data-r="8" className={s.leafWrap}><Leaf kind="fern" className={s.leafFern2} /></div></div>
          <div className={`${s.mfSprig} ${s.mfSprigB}`} aria-hidden="true"><div data-leaf="" data-y="60" data-x="-20" data-r="-10" className={s.leafWrap}><Leaf kind="round" className={s.leafRound2} /></div></div>
        </div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------ dịp */
const OCC_ROWS = [
  {
    id: "sinh-nhat", n: "01", title: "Sinh nhật", palette: "nhieu-mau", size: "vua",
    copy: "Tươi, nhiều màu, đủ vui để người nhận bật cười trước khi kịp nói lời cảm ơn.",
    tags: ["Đồng tiền", "Hoa hồng", "Cúc tana"],
    items: [{ kind: "gerbera", stems: 5 }, { kind: "rose", stems: 4 }, { kind: "daisy", stems: 4 }],
  },
  {
    id: "khai-truong", n: "02", title: "Khai trương", palette: "cam-do", size: "lon",
    copy: "Rực và đầy đặn, đặt ở cửa vẫn thấy từ xa. Màu ấm để đón vị khách đầu tiên.",
    tags: ["Hướng dương", "Đồng tiền", "Cẩm chướng"],
    items: [{ kind: "sunflower", stems: 6 }, { kind: "gerbera", stems: 6 }, { kind: "carnation", stems: 5 }],
  },
  {
    id: "cuoi", n: "03", title: "Cưới", palette: "trang-kem", size: "vua",
    copy: "Nhẹ, mềm, nhiều lớp. Tông trắng kem điểm hồng, hợp để cầm tay và cả để đặt trên bàn tiệc.",
    tags: ["Mẫu đơn", "Hoa hồng", "Baby"],
    items: [{ kind: "peony", stems: 3 }, { kind: "rose", stems: 5 }, { kind: "baby", stems: 6 }],
  },
  {
    id: "xin-loi", n: "04", title: "Xin lỗi", palette: "hong-sen", size: "nho",
    copy: "Dịu và gọn, không phô. Một bó vừa một tay, để lời xin lỗi nói phần chính.",
    tags: ["Tulip", "Cúc tana", "Hoa hồng"],
    items: [{ kind: "tulip", stems: 4 }, { kind: "daisy", stems: 3 }, { kind: "rose", stems: 2 }],
  },
] as const;

export function Occasions() {
  return (
    <section id="dip" className={s.occ} aria-labelledby="occ-h">
      <div className={s.wrap}>
        <header className={s.secHead}>
          <p className={s.eyebrow}>Những cách để nói lời thương</p>
          <h2 id="occ-h" className={s.h2}><BloomText accent={["thương."]} accentClassName={s.accent}>Có hoa cho mọi khoảnh khắc.</BloomText></h2>
          <p className={s.secLead}>Bốn dịp chúng mình được nhờ nhiều nhất. Chọn một dòng để đưa thẳng vào Bouquet Builder bên dưới.</p>
        </header>
        <ol className={s.occList}>
          {OCC_ROWS.map((r) => (
            <li key={r.id} className={s.occRow} data-rise="" data-cursor="Dựng">
              <span className={s.occNum}>{r.n}</span>
              <div className={s.occMain}>
                <h3 className={s.occTitle}>{r.title}</h3>
                <p className={s.occCopy}>{r.copy}</p>
                <ul className={s.occTags}>{r.tags.map((t) => <li key={t}>{t}</li>)}</ul>
                <a className={`${s.btn} ${s.btnLine} ${s.btnSm}`} href="#bo-hoa" data-pick-occasion={r.id}>Dựng bó cho dịp {r.title.toLowerCase()}</a>
              </div>
              <div className={s.occArt} aria-hidden="true">
                <BouquetSvg items={r.items.map((i) => ({ kind: i.kind, stems: i.stems }))} palette={r.palette} size={r.size} seed={r.id} className={s.occSvg} />
              </div>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------ khu vườn (gallery kéo ngang) */
const GARDEN: { file: string; name: string; note: string; alt: string; shape: MaskShape }[] = [
  { file: "mao-luong-can", name: "Mao lương", note: "Nhiều lớp cánh như giấy lụa, cam đỏ rất nổi.", alt: "Bông mao lương cam đỏ nhiều lớp cánh trên nền tối", shape: "petal" },
  { file: "mao-luong-cho", name: "Chợ hoa sớm", note: "Những bó vừa gom xong, còn ướt tay người bán.", alt: "Những bó mao lương cam đỏ bày ở chợ hoa", shape: "leaf" },
  { file: "hong-giay-kraft", name: "Hồng gói kraft", note: "Giấy nâu giữ dáng bó, để hoa là chủ.", alt: "Những bó hoa hồng sen gói giấy kraft nhìn từ trên xuống", shape: "tulip" },
  { file: "bo-san-cho", name: "Bó cúc và hồng", note: "Nhiều màu, hợp sinh nhật và ngày khai trương.", alt: "Các bó hoa cúc và hoa hồng gói giấy ở quầy chợ hoa", shape: "petal" },
  { file: "binh-thuy-tinh", name: "Bình thuỷ tinh", note: "Vài cành cắm lẻ, đặt gần cửa sổ.", alt: "Mao lương cam trong những chiếc bình thuỷ tinh cạnh rèm trắng", shape: "leaf" },
  { file: "mau-don-phan", name: "Mẫu đơn hồng phấn", note: "Bông lớn, nở chậm, cần chăm kỹ hơn.", alt: "Hai bông mẫu đơn hồng phấn giữa lá xanh", shape: "tulip" },
];

export function Garden() {
  return (
    <section id="vuon" className={s.garden} aria-labelledby="gd-h">
      <div className={s.wrap}>
        <header className={`${s.secHead} ${s.gardenHead}`}>
          <p className={`${s.eyebrow} ${s.eyebrowInk}`}>Khu vườn của tiệm</p>
          <h2 id="gd-h" className={`${s.h2} ${s.inkText}`}><BloomText>Một khu vườn, nhiều cá tính.</BloomText></h2>
          <p className={`${s.secLead} ${s.inkText}`}>Mỗi loài hoa mang một hình dáng, một sắc độ và một câu chuyện riêng. Kéo ngang để xem, hoặc dùng phím mũi tên.</p>
        </header>
      </div>
      <div data-cursor="Kéo" className={s.gardenRail}>
        <DraggableGallery gap="clamp(14px, 2vw, 28px)" friction={0.94} className={s.gal} trackClassName={s.galTrack} buttonClassName={s.galBtn} label="Khu vườn của tiệm, kéo ngang hoặc dùng phím mũi tên" prevLabel="Xem hoa trước" nextLabel="Xem hoa sau">
          {GARDEN.map((g) => (
            <figure key={g.file} className={s.galCard}>
              <PetalMask shape={g.shape} className={s.galMask}>
                <Image src={`${IMG}/${g.file}-1200.webp`} alt={g.alt} fill sizes="(max-width: 700px) 72vw, 30vw" style={{ objectFit: "cover" }} loading="lazy" draggable={false} />
              </PetalMask>
              <figcaption><b>{g.name}</b><span>{g.note}</span></figcaption>
            </figure>
          ))}
        </DraggableGallery>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------ bouquet builder */
export function BuilderSection() {
  return (
    <section id="bo-hoa" className={s.builderSec} aria-labelledby="bd-h" data-leaf-scope="">
      <div className={s.bLeaf} aria-hidden="true"><div data-leaf="" data-y="-80" data-x="30" data-r="6" className={s.leafWrap}><Leaf kind="fern" className={s.leafFern3} /></div></div>
      <div className={s.wrap}>
        <header className={s.secHead}>
          <p className={s.eyebrow}>Bouquet Builder</p>
          <h2 id="bd-h" className={s.h2}><BloomText accent={["riêng"]} accentClassName={s.accent}>Bó hoa của riêng bạn.</BloomText></h2>
          <p className={s.secLead}>Chọn dịp, ngân sách, tông màu và những bông bạn thích. Chúng mình ghép thành một bó, vẽ lại cho bạn xem, kèm danh sách hoa, giá tham khảo và lời thiệp.</p>
        </header>
        <Builder />
      </div>
    </section>
  );
}

/* ------------------------------------------------------------ tay nghề */
const STEPS: { n: string; t: string; d: string; file: string; alt: string; shape: MaskShape }[] = [
  { n: "01", t: "Chọn cành", d: "Chọn cành lúc hoa mới về: cành thẳng, nụ chắc, lá còn căng. Cành hơi cong thì để dành cho bó cần dáng tự nhiên.", file: "tay-cam-hoa", alt: "Đôi tay đang cắm bó hoa hồng cam và hoa đồng nội trên bàn gỗ", shape: "petal" },
  { n: "02", t: "Tỉa và cắt", d: "Cắt chéo cuống, bỏ lá chạm nước, tỉa gai. Hoa uống nước tốt hơn và bó gọn hơn.", file: "keo-day-kraft", alt: "Kéo cắt cành, dây gai và vài bông cúc trắng trên giấy kraft", shape: "leaf" },
  { n: "03", t: "Cắm bằng tay", d: "Không khuôn, không máy. Bông lớn vào giữa, cành lá mở ra ngoài, rồi xoay bó một vòng để thấy hết các mặt.", file: "tay-be-canh", alt: "Tay cắm bó hoa hồng phấn với lá xanh lớn trên bàn gỗ", shape: "flower" },
  { n: "04", t: "Gói và buộc", d: "Giấy kraft hoặc giấy màu, buộc bằng dây gai. Thêm một tấm thiệp viết tay nếu bạn muốn.", file: "goi-giay-do", alt: "Hai đôi tay gói bó hoa trên tờ giấy gói màu đỏ cam", shape: "tulip" },
];

export function Craft() {
  return (
    <section id="tay-nghe" className={s.craft} aria-labelledby="cr-h">
      <div className={s.wrap}>
        <header className={s.secHead}>
          <p className={s.eyebrow}>Tay nghề</p>
          <h2 id="cr-h" className={s.h2}><BloomText accent={["hoàn"]} accentClassName={s.accent}>Đẹp từ những điều không hoàn hảo.</BloomText></h2>
          <p className={s.secLead}>Chúng mình yêu những cành hơi cong, những chiếc lá có hình dáng lạ và những cách phối màu không theo khuôn mẫu.</p>
        </header>
        <div className={s.steps}>
          <SVGPathDraw mode="scroll" start="top 70%" end="bottom 70%" viewBox="0 0 60 1000" preserveAspectRatio="none" className={s.stem} aria-hidden="true" strokeWidth={3} strokeLinecap="round">
            <path d="M30 0 C60 120 0 220 30 340 C60 460 0 560 30 680 C60 800 0 900 30 1000" />
          </SVGPathDraw>
          {STEPS.map((st, i) => (
            <article key={st.n} className={s.step} data-side={i % 2 ? "r" : "l"}>
              <PetalMask shape={st.shape} className={s.stepArt}>
                <Image src={`${IMG}/${st.file}-1200.webp`} alt={st.alt} fill sizes="(max-width: 900px) 80vw, 36vw" style={{ objectFit: "cover" }} loading="lazy" />
              </PetalMask>
              <div className={s.stepText} data-rise="">
                <span className={s.stepNum}>{st.n}</span>
                <h3>{st.t}</h3>
                <p>{st.d}</p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------ hỏi đáp */
const FAQ = [
  ["Mình muốn một bó hoa riêng, bắt đầu từ đâu?", "Dựng thử bằng Bouquet Builder ở trên: chọn dịp, ngân sách, tông màu và loại hoa. Sau đó bấm nhắn tiệm kèm bản tóm tắt, chúng mình sẽ trao đổi thêm về hoa đang có trong mùa."],
  ["Giá trong Bouquet Builder có phải giá cuối?", "Đó là giá tham khảo theo cành. Hoa thay đổi theo mùa và theo nguồn về trong ngày, nên giá và loại hoa cụ thể sẽ được tiệm xác nhận khi bạn nhắn."],
  ["Hoa nào hợp dịp nào?", "Hoa hồng và đồng tiền vui cho sinh nhật. Hướng dương và cẩm chướng hợp khai trương. Mẫu đơn, cẩm tú cầu và baby hợp đám cưới. Tulip và cúc tana dịu cho lời xin lỗi. Đây là gợi ý, bạn cứ chọn theo người nhận."],
  ["Làm sao giữ hoa tươi lâu hơn?", "Cắt chéo cuống, thay nước thường xuyên, tránh nắng gắt và quạt thổi trực tiếp. Mỗi loại hoa bền khác nhau và còn tuỳ thời tiết, nên chúng mình sẽ dặn riêng theo bó của bạn."],
  ["Tiệm có gửi hoa tới người nhận không?", "Có thể trao đổi khi bạn nhắn. Khu vực, thời gian và phí gửi sẽ được xác nhận riêng cho từng đơn, chưa có mức cố định nào áp dụng cho mọi trường hợp."],
] as const;

export function Faq() {
  return (
    <section id="hoi-dap" className={s.faq} aria-labelledby="fq-h">
      <div className={`${s.wrap} ${s.faqGrid}`}>
        <header>
          <p className={s.eyebrow}>Hỏi đáp</p>
          <h2 id="fq-h" className={s.h2}><BloomText>Những điều hay được hỏi.</BloomText></h2>
        </header>
        <div className={s.faqList}>
          {FAQ.map(([q, a]) => (
            <details key={q} className={s.faqItem}>
              <summary><span>{q}</span><i aria-hidden="true" /></summary>
              <p>{a}</p>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------ kết */
export function Closing() {
  return (
    <section id="dat-hoa" className={s.closing} aria-labelledby="cl-h" data-leaf-scope="">
      <div className={s.clBlob} aria-hidden="true"><BlobMorph paths={BLOOM_PATHS} duration={3} className={s.clBlobSvg} /></div>
      <div className={s.clLeaf} aria-hidden="true"><div data-leaf="" data-y="-60" data-x="-30" data-r="-6" className={s.leafWrap}><Leaf kind="lance" className={s.leafLance3} /></div></div>
      <div className={`${s.wrap} ${s.clInner}`}>
        <p className={s.eyebrow}>Một khu vườn nhỏ, ở Đà Nẵng</p>
        <h2 id="cl-h" className={s.clTitle}><BloomText accent={["đẹp."]} accentClassName={s.accentInk}>Hôm nay là một dịp đẹp.</BloomText></h2>
        <p className={s.clLead}>Nhắn cho Nở Rừng dịp, ngân sách và người nhận. Chúng mình ghép bó hoa và trao đổi cùng bạn.</p>
        <div className={s.clCtas}>
          <MagneticButton><a className={`${s.btn} ${s.btnCream} ${s.btnBig}`} href={buildConsultHref("hoa-tuoi")} data-testid="closing-cta">Liên hệ đặt hoa</a></MagneticButton>
          <a className={`${s.btn} ${s.btnInk} ${s.btnBig}`} href="#bo-hoa">Dựng bó hoa trước</a>
        </div>
      </div>
    </section>
  );
}

export function Footer() {
  return (
    <footer className={s.footer}>
      <div className={`${s.wrap} ${s.footGrid}`}>
        <div>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/images/demos/hoa-tuoi/identity/logo-reversed.svg" alt="Nở Rừng" width={228} height={58} />
          <p className={s.footTag}>Tiệm hoa tươi ở Đà Nẵng. Hoa cho những điều đang nở.</p>
        </div>
        <nav aria-label="Liên kết cuối trang">
          <h3>Trong trang</h3>
          <a href="#dip">Dịp</a>
          <a href="#vuon">Khu vườn</a>
          <a href="#bo-hoa">Bouquet Builder</a>
          <a href="#hoi-dap">Hỏi đáp</a>
        </nav>
        <div>
          <h3>Liên hệ</h3>
          <p>chao@norung.example</p>
          <p>0236&nbsp;000&nbsp;0000</p>
          <p>Đà Nẵng</p>
        </div>
      </div>
      <div className={s.wrap}>
        <div className={s.footBottom}>
          <span>Thiết kế website: {siteConfig.fullName}</span>
          <a href="/demos/hoa-tuoi/credits">Ảnh &amp; ghi công</a>
        </div>
      </div>
    </footer>
  );
}
