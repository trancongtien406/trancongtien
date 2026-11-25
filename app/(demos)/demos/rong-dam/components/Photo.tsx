import Image from "next/image";

const BASE = "/images/demos/rong-dam";

/** Ảnh stock đã tối ưu webp (600/1200/2000). Cha phải có position:relative và kích thước/aspect-ratio. */
export function Photo({ name, alt, sizes, priority = false, position = "50% 50%", size = 1200 }: {
  name: string; alt: string; sizes: string; priority?: boolean; position?: string; size?: 600 | 1200 | 2000;
}) {
  return (
    <Image
      src={`${BASE}/${name}-${size}.webp`}
      alt={alt}
      fill
      sizes={sizes}
      priority={priority}
      style={{ objectFit: "cover", objectPosition: position }}
    />
  );
}
