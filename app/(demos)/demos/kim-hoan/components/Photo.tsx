import Image from "next/image";
import { IMG, type Img } from "../data/content";

/** Ảnh stock cục bộ. Cha phải `position: relative` và có kích thước/aspect-ratio. */
export function Photo({ img, sizes, priority, w = 2000, className }: { img: Img; sizes: string; priority?: boolean; w?: 600 | 1200 | 2000; className?: string }) {
  return (
    <Image
      src={`${IMG}/${img.file}-${w}.webp`}
      alt={img.alt}
      fill
      sizes={sizes}
      priority={priority}
      loading={priority ? undefined : "lazy"}
      className={className}
      style={{ objectFit: "cover", objectPosition: img.pos ?? "50% 50%" }}
    />
  );
}
