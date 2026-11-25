"use client";

import { useCallback, useMemo, useRef, type KeyboardEvent, type PointerEvent } from "react";
import s from "../brand.module.css";
import {
  CELL, MAP_H, MAP_W, ORIGIN, SEATS, SEAT_BY_ID, STATE_LABEL, ZONES, cellOf, stateOf, type Seat,
} from "../lib/seatmap";

const KIND_LABEL = { hot: "Hot desk", fixed: "Bàn cố định", meeting: "Phòng họp", private: "Phòng riêng" } as const;

export const seatAria = (seat: Seat, st: keyof typeof STATE_LABEL) =>
  `${seat.id}, ${KIND_LABEL[seat.kind]}${seat.cap > 1 ? `, ${seat.cap} chỗ` : ""}, ${STATE_LABEL[st]}`;

type Props = {
  day: number;
  hour: number;
  highlight: ReadonlySet<string>;
  active: string | null;
  onActive: (id: string | null, pinned?: boolean) => void;
  onCursor?: (cell: string | null) => void;
};

function RoomDecor({ seat }: { seat: Seat }) {
  const tw = Math.max(14, seat.w - 50);
  const tx = seat.x + (seat.w - tw) / 2;
  const ty = seat.y + 34;
  const th = seat.h - 52;
  const per = Math.ceil(seat.cap / 2);
  const chairs: [number, number][] = [];
  for (let i = 0; i < seat.cap; i++) {
    const side = i % 2;
    const k = Math.floor(i / 2);
    chairs.push([side ? tx + tw + 9 : tx - 9, ty + ((k + 0.5) * th) / per]);
  }
  return (
    <g className={s.smDecor} aria-hidden="true">
      <rect x={tx} y={ty} width={tw} height={th} />
      {chairs.map(([cx, cy], i) => <circle key={i} cx={cx} cy={cy} r={4.5} />)}
    </g>
  );
}

export function SeatMap({ day, hour, highlight, active, onActive, onCursor }: Props) {
  const svgRef = useRef<SVGSVGElement>(null);
  const hRef = useRef<SVGLineElement>(null);
  const vRef = useRef<SVGLineElement>(null);
  const tagRef = useRef<SVGGElement>(null);
  const tagText = useRef<SVGTextElement>(null);

  const states = useMemo(() => {
    const m: Record<string, ReturnType<typeof stateOf>> = {};
    for (const seat of SEATS) m[seat.id] = stateOf(seat, day, hour);
    return m;
  }, [day, hour]);

  const move = useCallback((e: PointerEvent<SVGSVGElement>) => {
    const svg = svgRef.current;
    if (!svg || e.pointerType === "touch") return;
    const r = svg.getBoundingClientRect();
    const x = ((e.clientX - r.left) / r.width) * MAP_W;
    const y = ((e.clientY - r.top) / r.height) * MAP_H;
    const inside = x >= ORIGIN && x <= MAP_W - ORIGIN && y >= ORIGIN && y <= MAP_H - ORIGIN;
    const cx = Math.min(MAP_W - ORIGIN, Math.max(ORIGIN, x));
    const cy = Math.min(MAP_H - ORIGIN, Math.max(ORIGIN, y));
    const op = inside ? "1" : "0";
    if (hRef.current) { hRef.current.setAttribute("y1", String(cy)); hRef.current.setAttribute("y2", String(cy)); hRef.current.style.opacity = op; }
    if (vRef.current) { vRef.current.setAttribute("x1", String(cx)); vRef.current.setAttribute("x2", String(cx)); vRef.current.style.opacity = op; }
    const cell = cellOf(cx, cy);
    if (tagRef.current && tagText.current) {
      const flip = cx > MAP_W - 150;
      tagRef.current.setAttribute("transform", `translate(${flip ? cx - 58 : cx + 8} ${cy > MAP_H - 80 ? cy - 22 : cy + 8})`);
      tagRef.current.style.opacity = op;
      tagText.current.textContent = cell;
    }
    onCursor?.(inside ? cell : null);
  }, [onCursor]);

  const leave = useCallback(() => {
    for (const r of [hRef, vRef]) if (r.current) r.current.style.opacity = "0";
    if (tagRef.current) tagRef.current.style.opacity = "0";
    onActive(null);
    onCursor?.(null);
  }, [onActive, onCursor]);

  const onKey = useCallback((e: KeyboardEvent<SVGSVGElement>) => {
    const dirs: Record<string, [number, number]> = { ArrowRight: [1, 0], ArrowLeft: [-1, 0], ArrowDown: [0, 1], ArrowUp: [0, -1] };
    if (e.key === "Home" || e.key === "End") {
      e.preventDefault();
      onActive(e.key === "Home" ? SEATS[0].id : SEATS[SEATS.length - 1].id, true);
      return;
    }
    const d = dirs[e.key];
    if (!d) return;
    e.preventDefault();
    const cur = active ? SEAT_BY_ID[active] : null;
    if (!cur) { onActive(SEATS[0].id, true); return; }
    const cx = cur.x + cur.w / 2, cy = cur.y + cur.h / 2;
    let best: Seat | null = null, bestScore = Infinity;
    for (const t of SEATS) {
      if (t.id === cur.id) continue;
      const dx = t.x + t.w / 2 - cx, dy = t.y + t.h / 2 - cy;
      const along = dx * d[0] + dy * d[1];
      if (along <= 4) continue;
      const across = Math.abs(dx * d[1]) + Math.abs(dy * d[0]);
      const score = along + across * 2.2;
      if (score < bestScore) { best = t; bestScore = score; }
    }
    if (best) onActive(best.id, true);
  }, [active, onActive]);

  const gridLines = useMemo(() => {
    let d = "";
    for (let x = ORIGIN; x <= MAP_W - ORIGIN; x += CELL) d += `M${x} ${ORIGIN}V${MAP_H - ORIGIN}`;
    for (let y = ORIGIN; y <= MAP_H - ORIGIN; y += CELL) d += `M${ORIGIN} ${y}H${MAP_W - ORIGIN}`;
    return d;
  }, []);

  return (
    <svg
      ref={svgRef}
      className={s.smSvg}
      viewBox={`0 0 ${MAP_W} ${MAP_H}`}
      role="listbox"
      aria-label="Sơ đồ chỗ ngồi. Dùng phím mũi tên để chuyển giữa các chỗ"
      aria-activedescendant={active ? `cg-seat-${active}` : undefined}
      tabIndex={0}
      onPointerMove={move}
      onPointerLeave={leave}
      onKeyDown={onKey}
      onBlur={() => onActive(null)}
    >
      <defs>
        <pattern id="cg-hatch" width="6" height="6" patternUnits="userSpaceOnUse" patternTransform="rotate(45)">
          <line x1="0" y1="0" x2="0" y2="6" stroke="#f4f4f2" strokeOpacity="0.7" strokeWidth="2" />
        </pattern>
      </defs>
      <g aria-hidden="true">
        <path d={gridLines} className={s.smGrid} />
        {Array.from({ length: 22 }, (_, i) => (
          <text key={`c${i}`} x={ORIGIN + i * CELL + CELL / 2} y={28} className={s.smAxis} textAnchor="middle">{String.fromCharCode(65 + i)}</text>
        ))}
        {Array.from({ length: 12 }, (_, i) => (
          <text key={`r${i}`} x={22} y={ORIGIN + i * CELL + CELL / 2 + 4} className={s.smAxis} textAnchor="middle">{i + 1}</text>
        ))}
        <path d={`M380 ${MAP_H - ORIGIN}H${MAP_W - ORIGIN}V${ORIGIN}H${ORIGIN}V${MAP_H - ORIGIN}H340`} className={s.smWall} />
        <text x={360} y={MAP_H - 12} className={s.smDoor} textAnchor="middle">CỬA VÀO</text>
        <path d="M360 548V528M354 534l6-6 6 6" className={s.smDoorArrow} />
        {ZONES.map((z) => (
          <g key={z.id}>
            <rect x={z.x} y={z.y} width={z.w} height={z.h} className={s.smZone} />
            <text x={z.x + 6} y={z.y + 12} className={s.smZoneLabel}>{z.label}</text>
          </g>
        ))}
        {[80, 330].flatMap((bx) => [92, 214].map((by) => (
          <rect key={`t${bx}${by}`} x={bx - 6} y={by + 32} width={224} height={20} className={s.smTable} />
        )))}
        <g className={s.smDecor}>
          <rect x={820} y={352} width={72} height={22} />
          <text x={856} y={367} className={s.smTiny} textAnchor="middle">QUẦY</text>
          {[0, 1, 2, 3].map((i) => <circle key={i} cx={832 + i * 18} cy={390} r={5} />)}
          <rect x={820} y={412} width={72} height={30} />
          <text x={856} y={431} className={s.smTiny} textAnchor="middle">IN ẤN</text>
          <rect x={820} y={456} width={32} height={34} />
          <rect x={860} y={456} width={32} height={34} />
          <text x={836} y={476} className={s.smTiny} textAnchor="middle">G1</text>
          <text x={876} y={476} className={s.smTiny} textAnchor="middle">G2</text>
        </g>
      </g>

      <g>
        {SEATS.map((seat) => {
          const st = states[seat.id];
          const hl = highlight.has(seat.id);
          const isActive = active === seat.id;
          const room = seat.kind === "meeting" || seat.kind === "private";
          return (
            <g
              key={seat.id}
              id={`cg-seat-${seat.id}`}
              role="option"
              aria-selected={isActive}
              aria-label={seatAria(seat, st)}
              className={s.smSeat}
              data-state={st}
              data-hl={hl ? "1" : undefined}
              data-active={isActive ? "1" : undefined}
              data-room={room ? "1" : undefined}
              onPointerEnter={(e) => { if (e.pointerType !== "touch") onActive(seat.id); }}
              onClick={() => onActive(seat.id, true)}
            >
              {room && <RoomDecor seat={seat} />}
              <rect className={s.smBase} x={seat.x} y={seat.y} width={seat.w} height={seat.h} />
              <rect className={s.smBusy} x={seat.x} y={seat.y} width={seat.w} height={seat.h} />
              <rect className={s.smHeld} x={seat.x} y={seat.y} width={seat.w} height={seat.h} fill="url(#cg-hatch)" />
              <rect className={s.smHl} x={seat.x} y={seat.y} width={seat.w} height={seat.h} />
              {hl && (
                <path
                  className={s.smBracket}
                  d={`M${seat.x - 5} ${seat.y + 7}V${seat.y - 5}H${seat.x + 7}M${seat.x + seat.w - 7} ${seat.y - 5}H${seat.x + seat.w + 5}V${seat.y + 7}M${seat.x + seat.w + 5} ${seat.y + seat.h - 7}V${seat.y + seat.h + 5}H${seat.x + seat.w - 7}M${seat.x + 7} ${seat.y + seat.h + 5}H${seat.x - 5}V${seat.y + seat.h - 7}`}
                />
              )}
              {room ? (
                <text x={seat.x + 6} y={seat.y + 15} className={s.smRoomId}>{seat.id} · {seat.cap}</text>
              ) : seat.kind === "fixed" ? (
                <text x={seat.x + seat.w / 2} y={seat.y + seat.h / 2 + 3} className={s.smSeatId} textAnchor="middle">{seat.id.slice(2)}</text>
              ) : null}
            </g>
          );
        })}
      </g>

      <g aria-hidden="true" pointerEvents="none">
        <line ref={hRef} x1={ORIGIN} x2={MAP_W - ORIGIN} y1={0} y2={0} className={s.smCross} style={{ opacity: 0 }} />
        <line ref={vRef} y1={ORIGIN} y2={MAP_H - ORIGIN} x1={0} x2={0} className={s.smCross} style={{ opacity: 0 }} />
        <g ref={tagRef} style={{ opacity: 0 }}>
          <rect width={50} height={18} className={s.smTagBg} />
          <text ref={tagText} x={25} y={13} textAnchor="middle" className={s.smTagText}>A1</text>
        </g>
      </g>
    </svg>
  );
}
