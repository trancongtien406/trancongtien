export const IMG_BASE = "/images/demos/phong-thu";
export type Img = { name: string; w: number; h: number; alt: string };
export const IMGS = {
  hero: { name: "hero-mic-crop", w: 1400, h: 820, alt: "Micro condenser dưới ánh đèn tím và đỏ trong phòng thu" },
  headphones: { name: "headphones-purple", w: 2000, h: 1333, alt: "Tai nghe kiểm âm treo trên tường tím" },
  mixer: { name: "mixer-purple", w: 2000, h: 3000, alt: "Bàn mixer nhiều kênh dưới ánh sáng tím" },
  hand: { name: "hand-console", w: 2000, h: 1333, alt: "Bàn tay chỉnh fader trên bàn điều khiển âm thanh" },
  vinyl: { name: "vinyl-spin", w: 2000, h: 1330, alt: "Đĩa than đang quay trên bàn xoay" },
  booth: { name: "vocal-booth", w: 2000, h: 1331, alt: "Buồng thu giọng cách âm với micro và lưới chắn" },
  drums: { name: "drums-blue", w: 2000, h: 3000, alt: "Bộ trống trong phòng thu tối ánh xanh" },
  guitar: { name: "guitar-hands", w: 2000, h: 1330, alt: "Tay chơi guitar điện trong ánh sáng tối" },
  launchpad: { name: "mic-launchpad", w: 2000, h: 1333, alt: "Micro, tai nghe và bộ điều khiển trong phòng thu ánh tím" },
  control: { name: "control-room", w: 2000, h: 1333, alt: "Phòng điều khiển với loa kiểm âm và bàn mixer" },
  faders: { name: "faders-close", w: 2000, h: 1428, alt: "Cận cảnh các fader trên bàn mixer" },
  micPop: { name: "mic-pop", w: 2000, h: 3000, alt: "Micro có màng lọc trong phòng thu ánh hồng tím" },
} satisfies Record<string, Img>;
