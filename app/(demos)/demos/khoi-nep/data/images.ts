export const IMG_BASE = "/images/demos/khoi-nep";
export const IMAGES = {
  "hero-room": [2000, 3000],
  kitchen: [2000, 1333],
  "bedroom-detail": [2000, 2902],
  dining: [2000, 3000],
  stairs: [2000, 3000],
  bath: [2000, 1334],
  loft: [2000, 1335],
  "mat-wood": [2000, 1500],
  "mat-stone": [2000, 1333],
  "mat-linen": [2000, 1334],
  "mat-concrete": [2000, 2667],
  bedroom: [2000, 1334],
} as const;
export type ImageName = keyof typeof IMAGES;
export const src = (name: string, w: 600 | 1200 | 2000 = 1200) => `${IMG_BASE}/${name}-${w}.webp`;
