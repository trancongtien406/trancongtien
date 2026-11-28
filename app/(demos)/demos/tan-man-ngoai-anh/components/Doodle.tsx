/** Nét vẽ tay minh hoạ (SVG tự vẽ) cho sân chơi. */
export function Doodle({ kind }: { kind: string }) {
  const red = ["ac", "chicken", "sword", "scribble"].includes(kind);
  const c = red ? "#c8102e" : "#0a0a0a";
  const p = { fill: "none", stroke: c, strokeWidth: 3, strokeLinecap: "round", strokeLinejoin: "round" } as const;
  return (
    <svg viewBox="0 0 120 90" width="100%" height="100%" aria-hidden="true" style={{ display: "block" }}>
      {kind === "basket" && <g {...p}><path d="M14 18 H34 L44 62 H88 L98 30 H40" /><circle cx="50" cy="74" r="5" /><circle cx="84" cy="74" r="5" /><path d="M42 36 H96 M44 48 H92 M52 30 V60 M64 30 V60 M76 30 V60 M88 30 V60" strokeWidth="1.6" /></g>}
      {kind === "palm" && <g {...p}><path d="M24 70 C24 50 28 36 36 20 M36 20 C26 20 18 24 12 32 M36 20 C44 14 52 14 60 20 M36 20 C34 10 40 6 48 6" /><path d="M68 70 C70 54 76 44 88 38 M88 38 C80 34 76 28 78 20 M88 38 C96 32 104 34 110 40" /><path d="M6 76 H114" strokeWidth="2" /></g>}
      {kind === "ac" && <g {...p} strokeWidth={4}><path d="M18 22 L74 12 L90 52 L34 68 Z" /><circle cx="46" cy="40" r="12" /><path d="M46 28 V52 M34 40 H58" strokeWidth="2" /><path d="M90 52 C100 58 96 72 108 76" /></g>}
      {kind === "chicken" && <g {...p} strokeWidth={4}><path d="M30 40 C20 34 22 22 34 24 C46 26 58 34 70 34 C84 34 92 44 88 56 C84 68 70 70 56 66 C44 62 38 52 30 40Z" /><path d="M44 66 L40 82 M62 68 L64 82 M34 24 L30 14 L40 20" /></g>}
      {kind === "sword" && <g {...p} strokeWidth={4}><path d="M60 4 V64 M44 28 H76 M60 64 V84" /><path d="M54 8 L60 2 L66 8" strokeWidth="2" /></g>}
      {kind === "city" && <g {...p}><path d="M8 80 V44 H30 V28 H52 V80 M52 50 H74 V36 H96 V80 M12 80 H108 M18 52 H24 M18 62 H24 M36 40 H44 M36 52 H44 M36 64 H44 M80 46 H90 M80 58 H90" strokeWidth="2" /><path d="M100 26 C104 14 112 14 114 24" /></g>}
      {kind === "scribble" && <g {...p} strokeWidth={4}><path d="M12 60 C20 20 36 20 38 50 C40 74 56 74 60 40 C64 12 82 14 84 44 C86 66 100 66 108 30" /></g>}
    </svg>
  );
}
