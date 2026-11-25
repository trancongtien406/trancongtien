import Image from "next/image";
import { src, type ImageName } from "../data/images";

type Props = {
  name: ImageName;
  alt: string;
  sizes: string;
  w?: 600 | 1200 | 2000;
  priority?: boolean;
  position?: string;
  className?: string;
};

/** Ảnh phủ kín khung cha (cha phải có aspect-ratio + position:relative). */
export function Photo({ name, alt, sizes, w = 1200, priority, position, className }: Props) {
  return (
    <Image
      src={src(name, w)}
      alt={alt}
      fill
      sizes={sizes}
      priority={priority}
      className={className}
      style={{ objectFit: "cover", objectPosition: position }}
    />
  );
}
