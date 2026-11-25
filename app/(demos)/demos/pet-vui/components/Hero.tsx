import Image from "next/image";
import { SlotText } from "@/features/showroom/effects";
import { BounceWords } from "./BounceWords";
import { DragStickers, type StickerSpec } from "./DragStickers";
import { WagButton } from "./WagButton";
import s from "../brand.module.css";

const STICKERS: StickerSpec[] = [
  { kind: "thom", x: 2, y: 8, size: 150, rot: -8 },
  { kind: "xinh", x: 80, y: 2, size: 140, rot: 10 },
  { kind: "paw", x: 88, y: 66, size: 92, rot: 18 },
  { kind: "bone", x: 4, y: 72, size: 96, rot: -18, hideSm: true },
  { kind: "bubble", x: 56, y: 88, size: 72, rot: 0 },
  { kind: "heart", x: 30, y: 96, size: 64, rot: -12, hideSm: true },
];

export function Hero() {
  return (
    <section id="dau-trang" className={s.hero} aria-labelledby="hero-h">
      <div className={`${s.wrap} ${s.heroGrid}`}>
        <div className={s.heroText}>
          <p className={s.chip}>Pet spa &amp; grooming · Đà Nẵng</p>
          <BounceWords as="h1" mode="enter" delay={0.35} className={`${s.display} ${s.h1}`} text="Tắm xinh, tỉa chất, *cưng hết nấc!*" />
          <p className={s.heroSlot}>
            Cho boss thật{" "}
            <span className={s.slot}><SlotText words={["thơm tho", "bông xù", "mượt mà", "xinh xỉu"]} interval={2400} /></span>
          </p>
          <p className={s.lead}>Chó mèo đều được tắm bọt, sấy thơm, chải gỡ rối và tỉa gọn nhẹ nhàng. Chọn gói theo cân nặng, độ dài lông và tình trạng của bé, xem trước từng bước và giá tham khảo.</p>
          <div className={s.heroCtas}>
            <WagButton href="#chon-goi" tone="blue" magnetic>Chọn gói cho bé</WagButton>
            <WagButton href="#goi" tone="white">Xem các gói</WagButton>
          </div>
        </div>
        <div className={s.heroArt}>
          <div className={s.heroDisc} aria-hidden="true" />
          <div className={s.heroPhoto}>
            <Image src="/images/demos/pet-vui/shiba-tam-voi-1200.webp" alt="Chú chó Shiba đang tắm dưới vòi nước, thè lưỡi cười" fill priority sizes="(max-width: 900px) 80vw, 560px" style={{ objectFit: "cover", objectPosition: "40% 40%" }} />
          </div>
          <DragStickers items={STICKERS} />
        </div>
      </div>
    </section>
  );
}
