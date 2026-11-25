"use client";

import { useEffect, useId, useRef, type MutableRefObject } from "react";
import { gsap, prefersReducedMotion } from "@/features/showroom/effects";
import { GLAZES, K, LUMP_R, VB, bodyPath, lerpArr, lumpYs, meridian, shapeRadii, shapeYs, type Glaze, type Pattern, type Shape } from "../lib/pot";

export type PotProps = {
  shape: Shape;
  bulge: number; // 0..1
  neck?: number; // 0..1
  glaze?: Glaze;
  pattern?: Pattern;
  dip?: boolean; // men nhúng nửa thân
  spin?: boolean;
  intro?: boolean;
  /** độ phình cộng thêm (ví dụ theo cuộn), 0..1 */
  extra?: MutableRefObject<number>;
  /** kéo ngang trên bình để nặn: nhận delta đã chuẩn hoá */
  onNudge?: (d: number) => void;
  className?: string;
  label?: string;
  wheel?: boolean;
};

const clamp01 = (v: number) => Math.min(1, Math.max(0, v));
const RAW = "#b9825a";

/**
 * Bàn xoay + chiếc bình dựng bằng path nội suy (không ảnh). Bình quay: các đường kinh tuyến trượt ngang theo sin/cos,
 * hình dáng chuyển mượt (lump -> bình) khi đổi tham số. Dừng khi ra khỏi khung hoặc tab ẩn. reduced-motion: một khung tĩnh.
 */
export function Pot(props: PotProps) {
  const { className, label = "Chiếc bình gốm đang quay trên bàn xoay", wheel = true } = props;
  const uid = useId().replace(/[^a-zA-Z0-9]/g, "");
  const root = useRef<SVGSVGElement>(null);
  const live = useRef(props);
  const drawRef = useRef<((dt: number) => void) | null>(null);
  useEffect(() => { live.current = props; });

  useEffect(() => {
    const svg = root.current;
    if (!svg) return;
    const q = <T extends Element>(s: string) => svg.querySelector(s) as T;
    const body = q<SVGPathElement>("[data-body]"), clip = q<SVGPathElement>("[data-clip]"), glz = q<SVGPathElement>("[data-glaze]");
    const rim = q<SVGEllipseElement>("[data-rim]"), rimIn = q<SVGEllipseElement>("[data-rimin]"), shadow = q<SVGEllipseElement>("[data-shadow]");
    const stripes = q<SVGGElement>("[data-stripes]"), pat = q<SVGGElement>("[data-pat]"), notch = svg.querySelector<SVGGElement>("[data-notch]");
    const sh = q<SVGRectElement>("[data-shade]");
    const reduced = prefersReducedMotion();
    const st = { u: props.intro && !reduced ? 0 : 1 };
    let visible = true, phi = 0.6, inited = false;
    let curR = lerpArr(LUMP_R, shapeRadii(props.shape, props.bulge, props.neck ?? 0.5), st.u);
    let curY = lerpArr(lumpYs(), shapeYs(props.shape), st.u);
    const NS = 11;
    const paths: SVGPathElement[] = [];
    for (let i = 0; i < NS; i++) { const p = document.createElementNS("http://www.w3.org/2000/svg", "path"); p.setAttribute("fill", "none"); stripes.appendChild(p); paths.push(p); }

    const draw = (dt: number) => {
      const p = live.current;
      const glaze = p.glaze ?? GLAZES[0];
      const goalR = lerpArr(LUMP_R, shapeRadii(p.shape, clamp01(p.bulge + (p.extra?.current ?? 0)), p.neck ?? 0.5), st.u);
      const goalY = lerpArr(lumpYs(), shapeYs(p.shape), st.u);
      const k = inited ? 1 - Math.exp(-dt * 9) : 1;
      inited = true;
      curR = curR.map((v, i) => v + (goalR[i] - v) * k);
      curY = curY.map((v, i) => v + (goalY[i] - v) * k);
      const d = bodyPath(curR, curY);
      body.setAttribute("d", d); clip.setAttribute("d", d);
      const y0 = curY[0], r0 = curR[0], yb = curY[K - 1], rb = curR[K - 1];
      rim.setAttribute("cx", String(VB.cx)); rim.setAttribute("cy", y0.toFixed(1)); rim.setAttribute("rx", r0.toFixed(1)); rim.setAttribute("ry", (r0 * VB.tilt).toFixed(1));
      rimIn.setAttribute("cy", (y0 + 0.6).toFixed(1)); rimIn.setAttribute("rx", Math.max(2, r0 - 3.2).toFixed(1)); rimIn.setAttribute("ry", Math.max(1, (r0 - 3.2) * VB.tilt).toFixed(1));
      shadow.setAttribute("cy", (yb + 3).toFixed(1)); shadow.setAttribute("rx", (rb + 10).toFixed(1)); shadow.setAttribute("ry", ((rb + 10) * VB.tilt).toFixed(1));
      // men
      if (p.dip) {
        const yd = y0 + (yb - y0) * 0.58;
        let g = `M-10 ${(y0 - 40).toFixed(1)}H210V${yd.toFixed(1)}`;
        for (let x = 210; x >= -10; x -= 10) g += `L${x} ${(yd + 7 * Math.sin(x * 0.075 + 1.2) + 4 * Math.sin(x * 0.19)).toFixed(1)}`;
        glz.setAttribute("d", g + "Z");
      } else glz.setAttribute("d", `M-10 ${(y0 - 40).toFixed(1)}H210V${(yb + 20).toFixed(1)}H-10Z`);
      glz.style.fill = glaze.base; rim.style.fill = p.dip ? glaze.base : glaze.lite;
      sh.setAttribute("y", String(y0 - 10)); sh.setAttribute("height", String(yb - y0 + 30));
      // đường kinh tuyến quay
      const bold = p.pattern === "soc";
      const ink = glaze.id === "sua" ? "#7a5338" : glaze.id === "den" || glaze.id === "tro" || glaze.id === "ngoc" || glaze.id === "do" ? "#f1dcbd" : "#7a5338";
      paths.forEach((pa, i) => {
        const th = phi + (i * Math.PI * 2) / NS;
        const cs = Math.cos(th);
        if (cs <= 0.02 || (bold && i % 2)) { pa.setAttribute("opacity", "0"); return; }
        pa.setAttribute("d", meridian(curR, curY, th));
        pa.setAttribute("stroke", bold ? ink : "rgba(0,0,0,.22)");
        pa.setAttribute("stroke-width", bold ? (3.4 * cs + 0.4).toFixed(1) : "1");
        pa.setAttribute("opacity", (bold ? 0.55 : 0.7 * cs).toFixed(2));
      });
      // hoạ tiết
      let h = "";
      if (p.pattern === "cham") {
        for (const row of [3, 4, 5, 6]) {
          const N = 12;
          for (let j = 0; j < N; j++) {
            const th = phi + (j * Math.PI * 2) / N + (row % 2) * (Math.PI / N);
            const cs = Math.cos(th);
            if (cs < 0.08) continue;
            h += `<circle cx="${(VB.cx + curR[row] * Math.sin(th)).toFixed(1)}" cy="${(curY[row] + curR[row] * VB.tilt * cs).toFixed(1)}" r="${(2.6 * cs + 0.5).toFixed(2)}" fill="${ink}" opacity="${(0.35 + 0.65 * cs).toFixed(2)}"/>`;
          }
        }
      } else if (p.pattern === "song") {
        for (const row of [4, 6]) {
          let dd = "";
          for (let a = -Math.PI / 2 + 0.05; a <= Math.PI / 2 - 0.05; a += Math.PI / 20) {
            const x = VB.cx + curR[row] * Math.sin(a), y = curY[row] + curR[row] * VB.tilt * Math.cos(a) + 5 * Math.sin(4 * (a + phi));
            dd += `${dd ? "L" : "M"}${x.toFixed(1)} ${y.toFixed(1)}`;
          }
          h += `<path d="${dd}" fill="none" stroke="${ink}" stroke-width="2.4" stroke-linecap="round" opacity=".85"/>`;
        }
      } else if (p.pattern === "van") {
        for (const row of [2, 4, 6, 7]) {
          const r = curR[row], y = curY[row];
          h += `<path d="M${(VB.cx - r).toFixed(1)} ${y.toFixed(1)}Q${VB.cx} ${(y + 2 * VB.tilt * r).toFixed(1)} ${(VB.cx + r).toFixed(1)} ${y.toFixed(1)}" fill="none" stroke="${ink}" stroke-width="1.8" opacity=".75"/>`;
        }
      }
      pat.innerHTML = h;
      // vết đánh dấu trên bàn xoay
      let n = "";
      for (let j = 0; j < 7; j++) {
        const a = phi * 1.3 + (j * Math.PI * 2) / 7, cs = Math.cos(a);
        if (cs < 0) continue;
        n += `<circle cx="${(VB.cx + 88 * Math.sin(a)).toFixed(1)}" cy="${(VB.base + 14 + 12 * cs).toFixed(1)}" r="${(1 + cs).toFixed(1)}" fill="#f1dcbd" opacity=".65"/>`;
      }
      if (notch) notch.innerHTML = n;
    };

    draw(0);
    drawRef.current = draw;
    let io: IntersectionObserver | null = null;
    if (typeof IntersectionObserver !== "undefined") { io = new IntersectionObserver((es) => { visible = es[0].isIntersecting; }); io.observe(svg); }
    const tick = (_t: number, dtms: number) => {
      if (!visible || document.hidden) return;
      const dt = Math.min(0.05, dtms / 1000);
      if (live.current.spin !== false && !reduced) phi += dt * (st.u < 1 ? 2.4 : 0.8);
      draw(dt);
    };
    if (!reduced) gsap.ticker.add(tick);
    let tw: gsap.core.Tween | null = null;
    if (props.intro && !reduced) tw = gsap.to(st, { u: 1, duration: 1.7, delay: 0.35, ease: "back.out(1.25)" });
    // pointer: kéo ngang để nặn
    let drag = false, lx = 0;
    const down = (e: PointerEvent) => { if (!live.current.onNudge) return; drag = true; lx = e.clientX; svg.setPointerCapture(e.pointerId); };
    const move = (e: PointerEvent) => { if (!drag) return; live.current.onNudge?.((e.clientX - lx) / 150); lx = e.clientX; if (reduced) draw(1); };
    const up = () => { drag = false; };
    svg.addEventListener("pointerdown", down); svg.addEventListener("pointermove", move); svg.addEventListener("pointerup", up); svg.addEventListener("pointercancel", up);
    return () => {
      gsap.ticker.remove(tick); tw?.kill(); io?.disconnect();
      svg.removeEventListener("pointerdown", down); svg.removeEventListener("pointermove", move); svg.removeEventListener("pointerup", up); svg.removeEventListener("pointercancel", up);
      paths.forEach((p) => p.remove());
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // reduced-motion: vẽ lại khi props đổi (không có ticker)
  useEffect(() => {
    if (!prefersReducedMotion()) return;
    drawRef.current?.(1);
  });

  return (
    <svg ref={root} className={className} viewBox={`0 0 ${VB.w} ${VB.h}`} role="img" aria-label={label} data-fx="PotWheel" style={{ touchAction: "pan-y", cursor: props.onNudge ? "ew-resize" : undefined }}>
      <defs>
        <clipPath id={`pc${uid}`}><path data-clip="" d="" /></clipPath>
        <linearGradient id={`sh${uid}`} x1="0" x2="1" y1="0" y2="0">
          <stop offset="0" stopColor="#000" stopOpacity=".5" /><stop offset=".26" stopColor="#fff" stopOpacity=".22" />
          <stop offset=".42" stopColor="#fff" stopOpacity="0" /><stop offset=".78" stopColor="#000" stopOpacity=".22" /><stop offset="1" stopColor="#000" stopOpacity=".6" />
        </linearGradient>
        <linearGradient id={`wh${uid}`} x1="0" x2="0" y1="0" y2="1"><stop offset="0" stopColor="#6a4430" /><stop offset="1" stopColor="#2c1a11" /></linearGradient>
      </defs>
      {wheel && (
        <g aria-hidden="true">
          <ellipse cx={VB.cx} cy={VB.base + 22} rx="98" ry="17" fill="#1d110b" />
          <ellipse cx={VB.cx} cy={VB.base + 14} rx="98" ry="17" fill={`url(#wh${uid})`} />
          <ellipse cx={VB.cx} cy={VB.base + 13} rx="78" ry="12.5" fill="none" stroke="#f1dcbd" strokeOpacity=".16" />
          <g data-notch="" />
        </g>
      )}
      <ellipse data-shadow="" cx={VB.cx} cy={VB.base} rx="60" ry="10" fill="#000" opacity=".28" />
      <g clipPath={`url(#pc${uid})`}>
        <path data-body="" d="" fill={RAW} />
        <path data-glaze="" d="" style={{ transition: "fill .45s" }} />
        <g data-stripes="" />
        <g data-pat="" />
        <rect data-shade="" x="0" width="200" fill={`url(#sh${uid})`} />
      </g>
      <ellipse data-rim="" cx={VB.cx} cy="0" rx="10" ry="2" style={{ transition: "fill .45s" }} />
      <ellipse data-rimin="" cx={VB.cx} cy="0" rx="8" ry="1.5" fill="#1d110b" opacity=".7" />
    </svg>
  );
}
