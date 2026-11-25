import Image from "next/image";
import { IMG } from "../data/content";

/** Ảnh stock cục bộ. Cha phải `position: relative` và có kích thước/aspect-ratio. */
export function Photo({ file, alt, sizes, pos, w = 1200, priority }: { file: string; alt: string; sizes: string; pos?: string; w?: 600 | 1200 | 2000; priority?: boolean }) {
  return (
    <Image
      src={`${IMG}/${file}-${w}.webp`} alt={alt} fill sizes={sizes} priority={priority}
      loading={priority ? undefined : "lazy"} style={{ objectFit: "cover", objectPosition: pos ?? "50% 50%" }}
    />
  );
}
