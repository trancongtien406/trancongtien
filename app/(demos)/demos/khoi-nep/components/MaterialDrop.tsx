"use client";

import { useRef, useState } from "react";
import { EV, emit, scrollToId } from "./events";
import { MATERIALS, type Material } from "../data/materials";
import { src } from "../data/images";
import s from "../brand.module.css";

type Zone = "wall" | "floor" | "cabinet";
const ZONES: { id: Zone; label: string; hint: string }[] = [
  { id: "wall", label: "Tường", hint: "Tường chính phía sau" },
  { id: "cabinet", label: "Tủ & đồ gỗ", hint: "Mặt tủ, kệ, bàn" },
  { id: "floor", label: "Sàn", hint: "Sàn phòng" },
];
const byId = (id: string) => MATERIALS.find((m) => m.id === id)!;
const fill = (m: Material) => ({ backgroundColor: m.color, backgroundImage: `linear-gradient(${m.color}cc, ${m.color}cc), url(${src(m.photo, 600)})`, backgroundBlendMode: "normal, multiply", backgroundSize: "cover" }) as const;

/** Bảng vật liệu kéo-thả: kéo mẫu vào tường / tủ / sàn của căn phòng, hoặc chọn mẫu rồi bấm vào vùng (bàn phím). */
export function MaterialDrop() {
  const [map, setMap] = useState<Record<Zone, string>>({ wall: "S02", cabinet: "W01", floor: "W01" });
  const [picked, setPicked] = useState<string | null>(null);
  const [over, setOver] = useState<Zone | null>(null);
  const [msg, setMsg] = useState("");
  const ghost = useRef<HTMLSpanElement>(null);
  const drag = useRef<{ id: string; x: number; y: number; moved: boolean } | null>(null);

  const assign = (z: Zone, id: string) => {
    setMap((p) => ({ ...p, [z]: id }));
    setMsg(`${ZONES.find((x) => x.id === z)!.label}: ${byId(id).name}.`);
  };
  const zoneAt = (x: number, y: number): Zone | null => (document.elementFromPoint(x, y)?.closest("[data-zone]")?.getAttribute("data-zone") as Zone | null) ?? null;

  return (
    <div className={s.dropWrap} data-testid="material-drop">
      <div className={s.dropRoom} role="group" aria-label="Căn phòng: chọn vùng để đặt vật liệu">
        {ZONES.map((z) => (
          <button
            key={z.id}
            type="button"
            className={`${s.dropZone} ${s[`zone_${z.id}` as "zone_wall"]}`}
            data-zone={z.id}
            data-over={over === z.id ? "1" : "0"}
            style={fill(byId(map[z.id]))}
            onClick={() => { if (picked) { assign(z.id, picked); setPicked(null); } else setMsg(`${z.label} đang dùng ${byId(map[z.id]).name}. Chọn một mẫu rồi bấm vào vùng này để đổi.`); }}
            aria-label={`${z.label}: ${byId(map[z.id]).name}. ${picked ? `Bấm để đặt ${byId(picked).name}` : "Chọn một mẫu trước để đổi"}`}
          >
            <span className={s.dropTag}>{z.label}<b>{byId(map[z.id]).name}</b></span>
          </button>
        ))}
      </div>
      <div className={s.dropSide}>
        <p className={s.label}>Kéo mẫu vào căn phòng</p>
        <ul className={s.dropChips} aria-label="Mẫu vật liệu">
          {MATERIALS.map((m) => (
            <li key={m.id}>
              <button
                type="button"
                className={s.dropChip}
                aria-pressed={picked === m.id}
                data-mat={m.id}
                onPointerDown={(e) => {
                  if (e.pointerType === "mouse" && e.button !== 0) return;
                  drag.current = { id: m.id, x: e.clientX, y: e.clientY, moved: false };
                  (e.currentTarget as HTMLElement).setPointerCapture(e.pointerId);
                }}
                onPointerMove={(e) => {
                  const d = drag.current; if (!d) return;
                  if (!d.moved && Math.hypot(e.clientX - d.x, e.clientY - d.y) < 6) return;
                  d.moved = true;
                  const g = ghost.current;
                  if (g) { g.style.display = "block"; g.style.transform = `translate(${e.clientX + 10}px, ${e.clientY + 10}px)`; g.textContent = m.name; g.style.background = m.color; }
                  setOver(zoneAt(e.clientX, e.clientY));
                }}
                onPointerUp={(e) => {
                  const d = drag.current; drag.current = null;
                  if (ghost.current) ghost.current.style.display = "none";
                  setOver(null);
                  if (d?.moved) { const z = zoneAt(e.clientX, e.clientY); if (z) assign(z, m.id); }
                  else setPicked((p) => (p === m.id ? null : m.id));
                }}
                onPointerCancel={() => { drag.current = null; if (ghost.current) ghost.current.style.display = "none"; setOver(null); }}
                onKeyDown={(e) => { if (e.key === "Enter" || e.key === " ") { e.preventDefault(); setPicked((p) => (p === m.id ? null : m.id)); } }}
              >
                <i style={{ background: m.color }} aria-hidden="true" />
                <span>{m.name}<small>{m.code}</small></span>
              </button>
            </li>
          ))}
        </ul>
        <ul className={s.dropSummary} data-testid="drop-summary">
          {ZONES.map((z) => <li key={z.id}><span>{z.label}</span><b>{byId(map[z.id]).name}</b></li>)}
        </ul>
        <div className={s.dropActions}>
          <button type="button" className={s.btnDark} onClick={() => { new Set(Object.values(map)).forEach((id) => emit(EV.material, { id })); setMsg("Đã đưa bộ vật liệu vào bảng của bạn."); scrollToId("board"); }}>Đưa bộ này vào bảng vật liệu ↓</button>
        </div>
        <p role="status" className={s.status}>{msg}</p>
      </div>
      <span ref={ghost} className={s.dropGhost} aria-hidden="true" />
    </div>
  );
}
