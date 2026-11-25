import Image from "next/image";

/** Ảnh stock cục bộ. Cha phải `position: relative` và có kích thước/aspect-ratio. */
export function Photo({ file, alt, sizes, priority, pos }: { file: string; alt: string; sizes: string; priority?: boolean; pos?: string }) {
  return (
    <Image
      src={`/images/demos/ben-vi/${file}-2000.webp`}
      alt={alt}
      fill
      sizes={sizes}
      priority={priority}
      loading={priority ? undefined : "lazy"}
      style={{ objectFit: "cover", objectPosition: pos ?? "50% 50%" }}
    />
  );
}
