import Image from "next/image";

const BASE = "/images/demos/hien-man";

export function photoSrc(name: string, w: 2000 | 1200 | 600 = 2000) {
  return `${BASE}/${name}-${w}.webp`;
}

interface Props {
  name: string;
  alt: string;
  sizes: string;
  pos?: string;
  priority?: boolean;
  className?: string;
  /** thuộc tính data-* cho motion */
  motion?: string;
}

/** Ảnh phủ đầy khung cha (cha phải có position + kích thước). */
export function Photo({ name, alt, sizes, pos = "50% 50%", priority, className, motion }: Props) {
  return (
    <Image
      src={photoSrc(name)}
      alt={alt}
      fill
      sizes={sizes}
      priority={priority}
      quality={70}
      className={className}
      style={{ objectFit: "cover", objectPosition: pos }}
      data-hm-photo={motion}
    />
  );
}
