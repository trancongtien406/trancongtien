import Image from "next/image";
import { BlobMorph, DraggableGallery, SVGPathDraw } from "@/features/showroom/effects";
import { buildConsultHref } from "@/features/showroom/consultation";
import { siteConfig } from "@/lib/site";
import s from "../brand.module.css";
import { BloomText } from "./BloomText";
import { Builder } from "./Builder";
import { BouquetSvg } from "./BouquetSvg";
import { PetalMask } from "./PetalMask";
import { BLOOM_PATHS, Leaf, type MaskShape } from "./Shapes";
import { CardWriter, LeadRuler, PriceBoard, RhythmCalendar, SeasonBloom, VaseDays } from "./Shop";
import { EVENTS, ORDER_STEPS, WEDDING, WEDDING_POLICY } from "../data/shop";
import c from "./shop.module.css";

const IMG = "/images/demos/hoa-tuoi";

/* ------------------------------------------------------------ giới thiệu tiệm */
export function About() {
  return (
    <section id="tiem" className={c.about} aria-labelledby="ab-h" data-leaf-scope="">
      <div className={`${s.wrap} ${c.aboutGrid}`}>
        <div className={s.mfCopy}>
          <p className={s.eyebrow}>Về tiệm</p>
          <h2 id="ab-h" className={s.h2}><BloomText accent={["nhỏ"]} accentClassName={s.accent}>Một tiệm hoa nhỏ ở Quận Thanh Khê.</BloomText></h2>
          <p className={s.secLead}>Nở Rừng nhận hoa tươi cắm tay cho khách lẻ, người tặng hoa theo dịp, đám cưới, sự kiện và các quán, văn phòng cần hoa mỗi tuần. Hoa chọn theo mùa, gói giấy kraft hoặc giấy màu, buộc dây gai, kèm một tấm thiệp viết tay nếu bạn muốn.</p>
          <ul className={c.aboutList}>
            <li><b>Bó, lẵng, hoa hộp</b>Ba dạng hoa tặng, mỗi dạng ba cỡ, giá ghi rõ ở bảng giá.</li>
            <li><b>Cưới, sự kiện, khai trương</b>Hoa cầm tay, bàn tiệc, kệ chúc mừng, làm theo số lượng.</li>
            <li><b>Hoa định kỳ</b>Hoa cho quầy, bàn khách, sảnh mỗi tuần hoặc mỗi tháng.</li>
            <li><b>Mở cửa 7:00 đến 21:00</b>Hằng ngày. Đặt hoa trước qua tin nhắn để tiệm giữ hoa cho bạn.</li>
          </ul>
        </div>
        <div className={s.mfArt}>
          <PetalMask shape="leaf" className={s.mfLeaf} outline outlineClassName={s.mfOutline}>
            <Image src={`${IMG}/la-monstera-1200.webp`} alt="Những chiếc lá monstera xanh thẫm, cây xanh trong tiệm" fill sizes="(max-width: 900px) 70vw, 34vw" style={{ objectFit: "cover" }} loading="lazy" />
          </PetalMask>
          <div className={`${s.mfSprig} ${s.mfSprigA}`} aria-hidden="true"><div data-leaf="" data-y="-70" data-x="20" data-r="8" className={s.leafWrap}><Leaf kind="fern" className={s.leafFern2} /></div></div>
          <div className={`${s.mfSprig} ${s.mfSprigB}`} aria-hidden="true"><div data-leaf="" data-y="60" data-x="-20" data-r="-10" className={s.leafWrap}><Leaf kind="round" className={s.leafRound2} /></div></div>
        </div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------ bảng giá */
export function PriceSection() {
  return (
    <section id="bang-gia" className={s.occ} aria-labelledby="pr-h">
      <div className={s.wrap}>
        <header className={s.secHead}>
          <p className={s.eyebrow}>Bảng giá</p>
          <h2 id="pr-h" className={s.h2}><BloomText accent={["cỡ"]} accentClassName={s.accent}>Bó, lẵng hay hộp, chọn cỡ vừa tay.</BloomText></h2>
          <p className={s.secLead}>Ba dạng hoa tặng, mỗi dạng ba cỡ. Giá là giá tham khảo; hoa cụ thể theo mùa và theo ngân sách bạn cho biết.</p>
        </header>
        <PriceBoard />
      </div>
    </section>
  );
}

/* ------------------------------------------------------------ dịp */
const OCC_ROWS = [
  {
    id: "sinh-nhat", n: "01", title: "Sinh nhật", palette: "nhieu-mau", size: "vua",
    copy: "Tươi, nhiều màu, đủ vui để người nhận bật cười trước khi kịp nói lời cảm ơn.",
    tags: ["Bó từ 200.000 ₫", "Đồng tiền", "Hoa hồng"],
    items: [{ kind: "gerbera", stems: 5 }, { kind: "rose", stems: 4 }, { kind: "daisy", stems: 4 }],
  },
  {
    id: "khai-truong", n: "02", title: "Khai trương", palette: "cam-do", size: "lon",
    copy: "Rực và đầy đặn, đặt ở cửa vẫn thấy từ xa. Màu ấm để đón vị khách đầu tiên.",
    tags: ["Lẵng từ 800.000 ₫", "Hướng dương", "Đồng tiền"],
    items: [{ kind: "sunflower", stems: 6 }, { kind: "gerbera", stems: 6 }, { kind: "carnation", stems: 5 }],
  },
  {
    id: "cuoi", n: "03", title: "Cưới", palette: "trang-kem", size: "vua",
    copy: "Nhẹ, mềm, nhiều lớp. Tông trắng kem điểm hồng, hợp để cầm tay và cả để đặt trên bàn tiệc.",
    tags: ["Cầm tay từ 650.000 ₫", "Mẫu đơn", "Baby"],
    items: [{ kind: "peony", stems: 3 }, { kind: "rose", stems: 5 }, { kind: "baby", stems: 6 }],
  },
  {
    id: "xin-loi", n: "04", title: "Xin lỗi", palette: "hong-sen", size: "nho",
    copy: "Dịu và gọn, không phô. Một bó vừa một tay, để lời xin lỗi nói phần chính.",
    tags: ["Bó nhỏ từ 200.000 ₫", "Tulip", "Cúc tana"],
    items: [{ kind: "tulip", stems: 4 }, { kind: "daisy", stems: 3 }, { kind: "rose", stems: 2 }],
  },
] as const;

export function Occasions() {
  return (
    <section id="dip" className={s.occ} aria-labelledby="occ-h">
      <div className={s.wrap}>
        <header className={s.secHead}>
          <p className={s.eyebrow}>Hoa theo dịp</p>
          <h2 id="occ-h" className={s.h2}><BloomText accent={["nhiều"]} accentClassName={s.accent}>Bốn dịp tiệm được nhờ nhiều nhất.</BloomText></h2>
          <p className={s.secLead}>Mỗi dịp có một tông hoa riêng và mức giá bắt đầu khác nhau. Chọn một dòng để đưa thẳng dịp đó vào phần dựng thử bó hoa bên dưới.</p>
        </header>
        <ol className={s.occList}>
          {OCC_ROWS.map((r) => (
            <li key={r.id} className={s.occRow} data-rise="" data-cursor="Dựng">
              <span className={s.occNum}>{r.n}</span>
              <div className={s.occMain}>
                <h3 className={s.occTitle}>{r.title}</h3>
                <p className={s.occCopy}>{r.copy}</p>
                <ul className={s.occTags}>{r.tags.map((t) => <li key={t}>{t}</li>)}</ul>
                <a className={`${s.btn} ${s.btnLine} ${s.btnSm}`} href="#bo-hoa" data-pick-occasion={r.id}>Dựng thử bó {r.title.toLowerCase()}</a>
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
          <p className={`${s.eyebrow} ${s.eyebrowInk}`}>Hoa trong tiệm</p>
          <h2 id="gd-h" className={`${s.h2} ${s.inkText}`}><BloomText>Những loài hoa tiệm hay cắm.</BloomText></h2>
          <p className={`${s.secLead} ${s.inkText}`}>Mỗi loài có dáng, màu và độ bền riêng. Kéo ngang để xem, hoặc dùng phím mũi tên; bên dưới là lịch loài nào đang vào mùa.</p>
        </header>
      </div>
      <div data-cursor="Kéo" className={s.gardenRail}>
        <DraggableGallery gap="clamp(14px, 2vw, 28px)" friction={0.94} className={s.gal} trackClassName={s.galTrack} buttonClassName={s.galBtn} label="Hoa trong tiệm, kéo ngang hoặc dùng phím mũi tên" prevLabel="Xem hoa trước" nextLabel="Xem hoa sau">
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

/* ------------------------------------------------------------ hoa theo mùa */
export function Season() {
  return (
    <section id="mua-hoa" className={s.garden} aria-labelledby="se-h" style={{ paddingTop: 0 }}>
      <div className={s.wrap}>
        <header className={`${s.secHead} ${s.gardenHead}`}>
          <p className={`${s.eyebrow} ${s.eyebrowInk}`}>Hoa theo mùa</p>
          <h2 id="se-h" className={`${s.h2} ${s.inkText}`}><BloomText>Tháng nào, hoa nấy.</BloomText></h2>
        </header>
        <SeasonBloom />
      </div>
    </section>
  );
}

/* ------------------------------------------------------------ cưới, sự kiện, khai trương */
export function Wedding() {
  return (
    <section id="cuoi-su-kien" className={s.craft} aria-labelledby="wd-h">
      <div className={s.wrap}>
        <header className={s.secHead}>
          <p className={s.eyebrow}>Hoa cưới, sự kiện, khai trương</p>
          <h2 id="wd-h" className={s.h2}><BloomText accent={["lớn"]} accentClassName={s.accent}>Việc lớn, hoa làm theo số lượng.</BloomText></h2>
          <p className={s.secLead}>Từ một bó hoa cầm tay đến cả hàng bình để bàn. Giá dưới đây là mức bắt đầu; tiệm báo giá cuối cùng sau khi chốt mẫu, số lượng và nơi tổ chức.</p>
        </header>
        <div className={c.twoCol}>
          <div>
            <h3 className={c.colHead}>Hoa cưới</h3>
            <p className={c.colLead}>Tông trắng kem điểm hồng là lựa chọn quen thuộc; màu khác tiệm vẫn phối được.</p>
            <ul className={c.svcList}>
              {WEDDING.map((w) => (
                <li key={w.n} className={c.svc} data-rise=""><span>{w.n}</span><h3>{w.name}</h3><b>{w.price}</b><p>{w.note}</p></li>
              ))}
            </ul>
          </div>
          <div>
            <h3 className={c.colHead}>Sự kiện và khai trương</h3>
            <p className={c.colLead}>Màu ấm, đầy đặn, nhìn rõ từ xa. Có thể kèm băng rôn chữ chúc mừng.</p>
            <ul className={c.svcList}>
              {EVENTS.map((w) => (
                <li key={w.n} className={c.svc} data-rise=""><span>{w.n}</span><h3>{w.name}</h3><b>{w.price}</b><p>{w.note}</p></li>
              ))}
            </ul>
          </div>
        </div>
        <div className={c.policy}>
          <h3>Đặt cọc, đổi và huỷ</h3>
          <ul>{WEDDING_POLICY.map((p) => <li key={p}>{p}</li>)}</ul>
        </div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------ hoa định kỳ */
export function Rhythm() {
  return (
    <section id="dinh-ky" className={s.occ} aria-labelledby="rh-h" style={{ background: "var(--nr-forest-2)" }}>
      <div className={s.wrap}>
        <header className={s.secHead}>
          <p className={s.eyebrow}>Hoa định kỳ cho quán và văn phòng</p>
          <h2 id="rh-h" className={s.h2}><BloomText accent={["tuần"]} accentClassName={s.accent}>Mỗi tuần một bình hoa mới.</BloomText></h2>
          <p className={s.secLead}>Quầy thu ngân, bàn khách, sảnh lễ tân có hoa tươi mà không phải nhớ đặt. Chọn tần suất, cỡ bình và ngày nhận, lịch 4 tuần bên dưới sẽ cho thấy những ngày hoa về.</p>
        </header>
        <RhythmCalendar />
      </div>
    </section>
  );
}

/* ------------------------------------------------------------ thiệp & chữ */
export function Cards() {
  return (
    <section id="thiep" className={s.craft} aria-labelledby="cd-h">
      <div className={s.wrap}>
        <header className={s.secHead}>
          <p className={s.eyebrow}>Thiệp và chữ</p>
          <h2 id="cd-h" className={s.h2}><BloomText accent={["viết"]} accentClassName={s.accent}>Một dòng viết tay đi cùng bó hoa.</BloomText></h2>
          <p className={s.secLead}>Chọn dịp để xem vài lời gợi ý, hoặc tự viết câu của bạn. Tiệm chép lại bằng tay lên thiệp.</p>
        </header>
        <CardWriter />
      </div>
    </section>
  );
}

/* ------------------------------------------------------------ báo trước & giao nhận */
export function Lead() {
  return (
    <section id="bao-truoc" className={s.faq} aria-labelledby="ld-h">
      <div className={s.wrap}>
        <header className={s.secHead}>
          <p className={s.eyebrow}>Thời gian báo trước và giao nhận</p>
          <h2 id="ld-h" className={s.h2}><BloomText accent={["sớm"]} accentClassName={s.accent}>Nhắn sớm một chút, hoa đẹp hơn.</BloomText></h2>
          <p className={s.secLead}>Chọn loại đơn để xem tiệm cần báo trước bao lâu. Nhận hoa tại tiệm hoặc nhờ tiệm gửi tới người nhận trong Đà Nẵng; khu vực, thời gian và phí gửi được xác nhận riêng cho từng đơn.</p>
        </header>
        <LeadRuler />
      </div>
    </section>
  );
}

/* ------------------------------------------------------------ bảo quản hoa */
export function Care() {
  return (
    <section id="bao-quan" className={s.builderSec} aria-labelledby="ca-h">
      <div className={s.wrap}>
        <header className={s.secHead}>
          <p className={s.eyebrow}>Bảo quản hoa tại nhà</p>
          <h2 id="ca-h" className={s.h2}><BloomText accent={["nước"]} accentClassName={s.accent}>Bảy ngày đầu, chăm hoa thế nào.</BloomText></h2>
          <p className={s.secLead}>Chấm xanh trên nút ngày là những hôm nên thay nước. Đây là cách chăm chung; mỗi loại hoa và mỗi thời tiết sẽ khác một chút.</p>
        </header>
        <VaseDays />
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
          <p className={s.eyebrow}>Dựng thử bó hoa</p>
          <h2 id="bd-h" className={s.h2}><BloomText accent={["riêng"]} accentClassName={s.accent}>Chưa biết chọn gì? Dựng thử bó của riêng bạn.</BloomText></h2>
          <p className={s.secLead}>Chọn dịp, ngân sách, tông màu và những bông bạn thích. Tiệm ghép thành một bó, vẽ lại cho bạn xem, kèm danh sách hoa, giá tham khảo và lời thiệp. Xong thì chép bản tóm tắt gửi cho tiệm.</p>
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
          <p className={s.eyebrow}>Cách tiệm làm một bó</p>
          <h2 id="cr-h" className={s.h2}><BloomText accent={["tay"]} accentClassName={s.accent}>Bốn bước, cắm bằng tay.</BloomText></h2>
          <p className={s.secLead}>Mỗi bó đi qua đủ bốn bước này, từ lúc chọn cành đến lúc buộc nơ. Bó cầm tay hay cắm bình đều như nhau.</p>
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
  ["Đặt hoa cần báo trước bao lâu?", "Bó theo mẫu có sẵn ít nhất 3 giờ, bó theo yêu cầu và lẵng, hoa hộp trước 1 ngày, kệ khai trương trước 2 ngày, hoa định kỳ lần đầu trước 3 ngày, hoa cưới từ 7 ngày. Dịp cao điểm như 8/3, 20/10, 20/11 nên nhắn sớm hơn."],
  ["Giá trên trang có phải giá cuối không?", "Đó là giá tham khảo theo cỡ. Hoa thay đổi theo mùa và nguồn về trong tuần, nên loại hoa và giá cuối cùng sẽ được tiệm xác nhận khi bạn nhắn."],
  ["Tiệm giao hoa như thế nào?", "Bạn có thể đến nhận tại tiệm hoặc nhờ tiệm gửi tới người nhận trong Đà Nẵng. Khu vực, thời gian và phí gửi được xác nhận riêng cho từng đơn, tiệm không áp một mức chung cho mọi trường hợp."],
  ["Có viết thiệp kèm hoa không?", "Có. Mỗi bó đều có thể kèm một tấm thiệp nhỏ viết tay, tối đa khoảng 80 ký tự. Với lẵng và hoa hộp, tiệm có thể in chữ trên ruy băng hoặc thiệp lớn hơn."],
  ["Làm sao giữ hoa tươi lâu hơn?", "Cắt chéo cuống, bỏ lá chạm nước, thay nước mỗi hai đến ba ngày, tránh nắng gắt và quạt thổi thẳng. Mỗi loại hoa bền khác nhau và còn tuỳ thời tiết, nên tiệm sẽ dặn riêng theo bó của bạn."],
  ["Đặt hoa cưới thì đặt cọc và huỷ thế nào?", "Sau khi chốt mẫu, bạn đặt cọc 30% để giữ hoa. Đổi mẫu hoặc số lượng báo trước 3 ngày. Nếu huỷ khi tiệm đã mua hoa, tiệm giữ lại phần chi phí hoa đã nhập."],
  ["Quán hoặc văn phòng đặt hoa định kỳ ra sao?", "Chọn tần suất (mỗi tuần, hai tuần hoặc mỗi 4 tuần), cỡ bình và ngày nhận trong tuần. Tiệm đổi loại hoa theo mùa mỗi lần nhận và giữ tông màu bạn chọn. Tạm ngưng hoặc đổi cỡ bình: báo trước một tuần."],
  ["Loài hoa mình thích đang không vào mùa thì sao?", "Tiệm sẽ nói trước và gợi ý loại tương đương về màu và dáng. Bạn đồng ý rồi tiệm mới làm. Lịch hoa theo mùa ở trên chỉ để tham khảo."],
  ["Hoa hộp khác bó hoa chỗ nào?", "Hoa hộp xếp khít trong hộp có mút giữ nước, đặt lên bàn là xong, không cần bình, hợp làm quà và để bàn làm việc. Bó hoa cầm tay đẹp hơn khi trao tận tay và cần cắm bình sau đó."],
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

/* ------------------------------------------------------------ đặt hoa (kết) */
export function Closing() {
  return (
    <section id="dat-hoa" className={s.closing} aria-labelledby="cl-h" data-leaf-scope="">
      <div className={s.clBlob} aria-hidden="true"><BlobMorph paths={BLOOM_PATHS} duration={3} className={s.clBlobSvg} /></div>
      <div className={s.clLeaf} aria-hidden="true"><div data-leaf="" data-y="-60" data-x="-30" data-r="-6" className={s.leafWrap}><Leaf kind="lance" className={s.leafLance3} /></div></div>
      <div className={`${s.wrap} ${s.clInner}`}>
        <p className={s.eyebrow}>Đặt hoa tại Nở Rừng</p>
        <h2 id="cl-h" className={s.clTitle}><BloomText accent={["hoa."]} accentClassName={s.accentInk}>Nhắn tiệm, đặt hoa.</BloomText></h2>
        <p className={s.clLead}>Cho tiệm biết dịp, ngày nhận, ngân sách và người nhận. Tiệm gợi ý mẫu, báo giá và hoa đang có rồi mới chốt đơn.</p>
        <ol className={c.orderSteps}>
          {ORDER_STEPS.map((o) => (
            <li key={o.n}><span aria-hidden="true">{o.n}</span><b>{o.t}</b><p>{o.d}</p></li>
          ))}
        </ol>
        <div className={s.clCtas}>
          <a className={`${s.btn} ${s.btnCream} ${s.btnBig}`} href={buildConsultHref("hoa-tuoi")} data-testid="closing-cta">Nhắn tiệm đặt hoa</a>
          <a className={`${s.btn} ${s.btnInk} ${s.btnBig}`} href="#bang-gia">Xem bảng giá</a>
        </div>
        <p className={c.contactRow}>
          <span><b>Mở cửa</b> 7:00 đến 21:00 hằng ngày</span>
          <span><b>Khu vực</b> Quận Thanh Khê, Đà Nẵng</span>
          <span><b>Điện thoại</b> 0236&nbsp;000&nbsp;0000</span>
        </p>
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
          <p className={s.footTag}>Tiệm hoa tươi ở Quận Thanh Khê, Đà Nẵng. Bó hoa, lẵng hoa, hoa hộp, hoa cưới và hoa định kỳ.</p>
        </div>
        <nav aria-label="Liên kết cuối trang">
          <h3>Trong trang</h3>
          <a href="#bang-gia">Bảng giá</a>
          <a href="#dip">Hoa theo dịp</a>
          <a href="#cuoi-su-kien">Cưới và sự kiện</a>
          <a href="#dinh-ky">Hoa định kỳ</a>
          <a href="#hoi-dap">Hỏi đáp</a>
        </nav>
        <div>
          <h3>Liên hệ</h3>
          <p>chao@norung.example</p>
          <p>0236&nbsp;000&nbsp;0000</p>
          <p>Quận Thanh Khê, Đà Nẵng</p>
          <p>Mở cửa 7:00 đến 21:00</p>
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
