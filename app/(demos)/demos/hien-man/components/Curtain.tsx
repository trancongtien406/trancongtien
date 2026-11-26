"use client";

import { CurtainReveal } from "@/features/showroom/effects";

/** Rèm mở đầu: năm cột kéo lên, tối đa ~1 giây, một lần mỗi phiên, bỏ qua bằng click/phím. */
export function Curtain() {
  return (
    <CurtainReveal panels={5} hold={0.28} total={1.0} oncePerSession="hm-curtain" color="#173e49">
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src="/images/demos/hien-man/identity/logo-reversed.svg" alt="" width={160} height={96} style={{ position: "relative", zIndex: 1 }} />
    </CurtainReveal>
  );
}
