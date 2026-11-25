/**
 * Kem chảy bằng SVG: một dải kem với các giọt có độ dài khác nhau; mỗi giọt tự "chảy" (scaleY) khi tải
 * và dập dềnh chậm. viewBox cố định + slice nên không méo trên mobile. Chỉ transform; reduced-motion: đứng yên.
 */
const DRIPS: [number, number, number][] = [
  [60, 34, 58], [150, 26, 96], [230, 36, 44], [320, 24, 96], [420, 32, 70], [520, 28, 92], [610, 38, 52], [700, 26, 88],
  [790, 34, 100], [880, 28, 60], [970, 36, 100], [1070, 26, 48], [1160, 34, 98], [1250, 28, 72], [1340, 36, 94], [1440, 26, 56], [1530, 32, 84],
];

export function Drip({ color, className, flip = false }: { color: string; className?: string; flip?: boolean }) {
  return (
    <svg className={className} viewBox="0 0 1600 140" preserveAspectRatio="xMidYMin slice" aria-hidden="true" focusable="false" style={flip ? { transform: "scaleY(-1)" } : undefined} data-fx="Drip">
      <rect x="0" y="-2" width="1600" height="26" fill={color} />
      {DRIPS.map(([x, w, h], i) => (
        <rect key={i} className="mkDrip" x={x - w / 2} y="10" width={w} height={h} rx={w / 2} fill={color} style={{ animationDelay: `${0.15 + (i % 6) * 0.12}s, ${(i % 5) * 0.7}s` }} />
      ))}
    </svg>
  );
}
