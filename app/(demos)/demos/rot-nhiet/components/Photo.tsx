import Image from "next/image";

const BASE = "/images/demos/rot-nhiet";

/** Ảnh stock đã tối ưu webp (600/1200/2000). Cha phải có position:relative + kích thước/aspect-ratio. */
export function Photo({ name, alt, sizes, priority = false, position = "50% 50%", size = 1200, zoom = 1 }: {
  name: string; alt: string; sizes: string; priority?: boolean; position?: string; size?: 600 | 1200 | 2000; zoom?: number;
}) {
  return (
    <Image
      src={`${BASE}/${name}-${size}.webp`}
      alt={alt}
      fill
      sizes={sizes}
      priority={priority}
      style={{ objectFit: "cover", objectPosition: position, ...(zoom !== 1 ? { transform: `scale(${zoom})`, transformOrigin: position } : {}) }}
    />
  );
}
