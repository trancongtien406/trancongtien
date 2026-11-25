import Image from "next/image";
import { IMG_BASE, type Img } from "../data/images";

type Props = { img: Img; sizes: string; priority?: boolean; className?: string; quality?: 2000 | 1200 | 600; width?: number; height?: number };

/** Ảnh stock đã chuyển webp; width/height thật dùng cho aspect-ratio nên không gây CLS. */
export function Photo({ img, sizes, priority, className, quality = 1200 }: Props) {
  return (
    <Image
      src={`${IMG_BASE}/${img.name}-${quality}.webp`}
      width={img.w}
      height={img.h}
      alt={img.alt}
      sizes={sizes}
      priority={priority}
      loading={priority ? undefined : "lazy"}
      className={className}
    />
  );
}
