"use client";

import { useMemo } from "react";
import { PLACES, type Lang, type PlaceId, type Stop } from "../data/tours";
import { COPY } from "../data/copy";
import styles from "../brand.module.css";

type Props = { lang: Lang; stops: Stop[]; selectedId: string | null; onSelect: (id: string) => void };

/** Bản đồ SVG nét tay, không theo tỷ lệ. Điểm dừng đang chọn được phóng to và tô vàng. */
export function RouteMap({ lang, stops, selectedId, onSelect }: Props) {
  const t = COPY[lang].explorer;
  const order = useMemo(() => {
    const seq: PlaceId[] = [];
    for (const s of stops) if (seq[seq.length - 1] !== s.place) seq.push(s.place);
    return seq;
  }, [stops]);
  const unique = useMemo(() => Array.from(new Set(order)), [order]);
  const selectedStop = stops.find((s) => s.id === selectedId) ?? null;
  const activePlace = selectedStop?.place ?? null;

  // đường đi nét đứt: nối các điểm theo thứ tự, mỗi đoạn là đường cong lệch nhẹ để có cảm giác vẽ tay
  const d = useMemo(() => {
    const pts = order.map((p) => PLACES[p]);
    if (pts.length < 2) return "";
    let out = `M${pts[0].x} ${pts[0].y}`;
    for (let i = 1; i < pts.length; i++) {
      const a = pts[i - 1];
      const b = pts[i];
      const mx = (a.x + b.x) / 2;
      const my = (a.y + b.y) / 2;
      const nx = -(b.y - a.y);
      const ny = b.x - a.x;
      const len = Math.hypot(nx, ny) || 1;
      const k = (i % 2 ? 1 : -1) * 22;
      out += ` Q${(mx + (nx / len) * k).toFixed(1)} ${(my + (ny / len) * k).toFixed(1)} ${b.x} ${b.y}`;
    }
    return out;
  }, [order]);

  const firstStopOf = (p: PlaceId) => stops.find((s) => s.place === p)!;
  const visitNo = (p: PlaceId) => order.indexOf(p) + 1;
  const label = (p: PlaceId) => PLACES[p].name[lang];

  return (
    <svg className={styles.map} viewBox="300 20 700 650" role="img" data-testid="route-map" data-active-place={activePlace ?? ""}
      aria-label={lang === "vi" ? "Bản đồ miền Trung với các điểm dừng của hành trình đang chọn" : "Map of Central Vietnam with the stops of the selected trip"}>
      {/* biển */}
      <path d="M820 0 C800 60 850 110 815 170 C790 215 842 245 826 280 C812 312 780 322 790 352 C800 385 836 395 828 440 C820 480 790 500 800 545 C808 585 840 610 826 680 L1000 680 L1000 0 Z" fill="#b9d9df" />
      <g stroke="#24392d" strokeWidth="1.6" strokeLinecap="round" opacity=".28" fill="none">
        <path d="M860 90 q10 -8 20 0 t20 0 t20 0" />
        <path d="M900 200 q10 -8 20 0 t20 0" />
        <path d="M870 330 q10 -8 20 0 t20 0 t20 0" />
        <path d="M910 450 q10 -8 20 0 t20 0" />
        <path d="M870 580 q10 -8 20 0 t20 0 t20 0" />
      </g>
      {/* bờ biển nét tay */}
      <path d="M820 0 C800 60 850 110 815 170 C790 215 842 245 826 280 C812 312 780 322 790 352 C800 385 836 395 828 440 C820 480 790 500 800 545 C808 585 840 610 826 680" fill="none" stroke="#24392d" strokeWidth="3" strokeLinecap="round" strokeDasharray="1 0" />
      {/* bán đảo Sơn Trà */}
      <path d="M770 258 C790 236 830 240 840 262 C850 286 820 300 790 296 C772 293 762 275 770 258Z" fill="#f5f0e3" stroke="#24392d" strokeWidth="3" />
      {/* núi và sông */}
      <g fill="none" stroke="#24392d" strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round">
        <path d="M380 258 l28 -44 l26 36 l22 -28 l34 50" />
        <path d="M420 462 l22 -34 l20 26 l18 -20 l26 34" opacity=".7" />
        <path d="M500 168 l24 -36 l20 28 l22 -24 l26 32" opacity=".7" />
      </g>
      <path d="M520 330 C560 360 600 330 640 372 S690 420 740 470" fill="none" stroke="#7fb3be" strokeWidth="6" strokeLinecap="round" opacity=".8" />
      <path d="M560 78 C575 130 590 160 600 190 C612 230 640 270 660 345" fill="none" stroke="#24392d" strokeWidth="2" strokeDasharray="3 9" strokeLinecap="round" opacity=".45" />

      {/* hướng bắc */}
      <g transform="translate(372 96)" stroke="#24392d" strokeWidth="2.6" fill="none" strokeLinecap="round">
        <path d="M0 -34 L10 0 L0 34 L-10 0 Z" fill="#f2b84b" />
        <path d="M-34 0 L34 0" />
        <text x="0" y="-44" textAnchor="middle" fontSize="20" fontWeight="800" fill="#24392d" stroke="none">N</text>
      </g>

      {/* tất cả địa danh (mờ) */}
      {(Object.keys(PLACES) as PlaceId[]).map((p) => {
        const on = unique.includes(p);
        if (on) return null;
        const pt = PLACES[p];
        return (
          <g key={p} opacity=".45">
            <circle cx={pt.x} cy={pt.y} r="7" fill="none" stroke="#24392d" strokeWidth="2.4" />
            <text x={pt.x < 640 ? pt.x + 14 : pt.x - 14} y={pt.y + 6} textAnchor={pt.x < 640 ? "start" : "end"} fontSize="20" fontWeight="600" fill="#24392d">{label(p)}</text>
          </g>
        );
      })}

      {/* đường đi */}
      {d && <path d={d} fill="none" stroke="#b83e2b" strokeWidth="5" strokeLinecap="round" strokeDasharray="2 12" data-rd="route" />}

      {/* các điểm dừng */}
      {unique.map((p) => {
        const pt = PLACES[p];
        const active = activePlace === p;
        const first = firstStopOf(p);
        const right = pt.x < 640;
        return (
          <g key={p} transform={`translate(${pt.x} ${pt.y})`} data-place={p} data-active={active ? "true" : "false"}>
            <g
              role="button"
              tabIndex={0}
              aria-label={`${visitNo(p)}. ${label(p)}`}
              style={{ cursor: "pointer" }}
              onClick={() => onSelect(first.id)}
              onKeyDown={(e) => {
                if (e.key === "Enter" || e.key === " ") {
                  e.preventDefault();
                  onSelect(first.id);
                }
              }}
            >
              <circle r="30" fill="transparent" />
              {active && <circle r="26" fill="#f2b84b" stroke="#24392d" strokeWidth="3" data-rd="pulse" />}
              <circle r={active ? 15 : 12} fill={active ? "#b83e2b" : "#24392d"} stroke="#f5f0e3" strokeWidth="3" />
              <text y={active ? 5.5 : 4.5} textAnchor="middle" fontSize={active ? 16 : 13} fontWeight="800" fill="#f5f0e3">{visitNo(p)}</text>
              <text x={right ? 22 : -22} y={active ? 38 : 34} textAnchor={right ? "start" : "end"} fontSize={active ? 25 : 22} fontWeight="800" fill="#24392d" stroke="#f5f0e3" strokeWidth="6" paintOrder="stroke">
                {label(p)}
              </text>
            </g>
          </g>
        );
      })}

      {/* nhãn bản đồ */}
      <text x="322" y="654" fontSize="17" fontWeight="600" fill="#4d5c48">{t.mapNote}</text>
    </svg>
  );
}
