import Image from "next/image";
import { IMG } from "../data/content";
import styles from "../brand.module.css";

const BASE = "/images/demos/thang-mo";

/** Ảnh stock webp (600/1200/2000). Cha cần position:relative + aspect-ratio. */
export function Photo({ id, sizes, priority = false, position = "50% 50%", size = 1200, chip = true }: {
  id: string; sizes: string; priority?: boolean; position?: string; size?: 600 | 1200 | 2000; chip?: boolean;
}) {
  const im = IMG[id];
  return (
    <>
      <Image src={`${BASE}/${im.file}-${size}.webp`} alt={im.alt} fill sizes={sizes} priority={priority} style={{ objectFit: "cover", objectPosition: position }} />
    </>
  );
}
