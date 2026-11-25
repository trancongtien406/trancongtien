import Image from "next/image";
import { IMG } from "../data/content";

/** Ảnh stock cục bộ. Cha phải `position: relative` và có kích thước/aspect-ratio. */
export function Photo({ file, alt, sizes, priority, pos, w = 2000, className }: { file: string; alt: string; sizes: string; priority?: boolean; pos?: string; w?: 600 | 1200 | 2000; className?: string }) {
  return (
    <Image
      src={`${IMG}/${file}-${w}.webp`}
      alt={alt}
      fill
      sizes={sizes}
      priority={priority}
      loading={priority ? undefined : "lazy"}
      className={className}
      style={{ objectFit: "cover", objectPosition: pos ?? "50% 50%" }}
    />
  );
}
