/** Minh hoạ món ăn bằng SVG hình học, dùng bảng màu thương hiệu. */
const G = "#C7A76C";
const C = "#F2E9D8";
const O = "#25291D";
const O2 = "#3b4130";
const O3 = "#6e7352";

function Plate({ children, tone = "light" }: { children: React.ReactNode; tone?: "light" | "dark" }) {
  const light = tone === "light";
  return (
    <>
      <circle cx="200" cy="200" r="184" fill="none" stroke={G} strokeOpacity=".45" strokeWidth="1" />
      <circle cx="200" cy="200" r="168" fill={light ? C : O2} />
      <circle cx="200" cy="200" r="168" fill="none" stroke={G} strokeOpacity=".7" strokeWidth="1.5" />
      <circle cx="200" cy="200" r="132" fill="none" stroke={light ? O : C} strokeOpacity=".12" strokeWidth="1" />
      {children}
    </>
  );
}

function Art({ i }: { i: number }) {
  switch (i) {
    case 0:
      return (
        <Plate>
          {[0, 1, 2].map((k) => (
            <g key={k} transform={`translate(${150 + k * 52} ${190 + (k % 2) * 34})`}>
              <circle r="44" fill="#6b2a35" />
              <circle r="31" fill="none" stroke="#a65462" strokeWidth="3" />
              <circle r="17" fill="none" stroke="#a65462" strokeWidth="3" />
              <circle r="5" fill="#c78a95" />
            </g>
          ))}
          {Array.from({ length: 14 }).map((_, k) => (
            <circle key={k} cx={110 + ((k * 53) % 180)} cy={120 + ((k * 37) % 170)} r={3 + (k % 3)} fill={O} fillOpacity=".55" />
          ))}
          <path d="M120 118 Q200 78 280 122" fill="none" stroke={G} strokeWidth="2" strokeLinecap="round" />
        </Plate>
      );
    case 1:
      return (
        <Plate tone="dark">
          <path d="M200 270 L120 190 A112 112 0 0 1 280 190 Z" fill={C} />
          {Array.from({ length: 7 }).map((_, k) => {
            const a = (-70 + k * 23.3) * (Math.PI / 180);
            return <line key={k} x1="200" y1="270" x2={200 + Math.sin(a) * 118} y2={270 - Math.cos(a) * 118} stroke={O3} strokeWidth="2" strokeOpacity=".6" />;
          })}
          <path d="M150 292 h100" stroke={G} strokeWidth="3" strokeLinecap="round" />
          {[0, 1, 2, 3, 4].map((k) => (
            <path key={k} d={`M${240 + k * 6} ${130 - k * 3} q-26 -${20 + k * 4} -52 ${6 + k * 2}`} stroke="#8fa56a" strokeWidth="2" fill="none" strokeLinecap="round" />
          ))}
        </Plate>
      );
    case 2:
      return (
        <Plate>
          {Array.from({ length: 90 }).map((_, k) => {
            const a = k * 0.62;
            const r = 8 + k * 1.35;
            const x = 200 + Math.cos(a) * r;
            const y = 200 + Math.sin(a) * r;
            return <ellipse key={k} cx={x} cy={y} rx="9" ry="3.6" transform={`rotate(${(a * 180) / Math.PI} ${x} ${y})`} fill="#7a3d52" fillOpacity={0.55 + (k % 3) * 0.15} />;
          })}
          <circle cx="200" cy="200" r="34" fill={G} />
          <circle cx="190" cy="190" r="10" fill="#e6cd96" fillOpacity=".8" />
        </Plate>
      );
    case 3:
      return (
        <Plate tone="dark">
          {Array.from({ length: 9 }).map((_, k) => (
            <ellipse key={k} cx="200" cy="150" rx="12" ry="46" fill={k % 2 ? "#6e7352" : "#8fa56a"} transform={`rotate(${k * 40} 200 200)`} />
          ))}
          <ellipse cx="200" cy="200" rx="58" ry="40" fill="#8a4a2b" />
          <ellipse cx="200" cy="196" rx="44" ry="28" fill="#a9653f" />
          <path d="M156 198 Q200 170 244 198" fill="none" stroke={C} strokeOpacity=".5" strokeWidth="2" />
        </Plate>
      );
    case 4:
      return (
        <Plate tone="dark">
          <path d="M200 90 C240 150 270 170 262 222 C256 270 228 296 200 296 C168 296 142 268 140 228 C138 188 170 168 176 140 C186 150 190 160 190 172 C204 150 206 120 200 90 Z" fill={G} />
          <path d="M200 160 C220 190 232 206 226 238 C222 262 212 272 200 272 C184 272 172 258 172 238 C172 214 192 200 200 160 Z" fill="#e8d3a2" />
          <path d="M200 214 C210 230 214 242 208 256 C206 262 202 264 200 264 C194 264 190 256 192 246 C194 234 198 228 200 214 Z" fill={C} />
          {Array.from({ length: 12 }).map((_, k) => (
            <circle key={k} cx={110 + ((k * 61) % 190)} cy={100 + ((k * 47) % 210)} r={2 + (k % 3)} fill={G} fillOpacity=".7" />
          ))}
        </Plate>
      );
    default:
      return (
        <Plate>
          {[[200, 160], [244, 186], [244, 238], [200, 264], [156, 238], [156, 186], [200, 212]].map(([x, y], k) => {
            const pts = Array.from({ length: 6 }).map((_, n) => {
              const a = (Math.PI / 3) * n + Math.PI / 6;
              return `${x + Math.cos(a) * 26},${y + Math.sin(a) * 26}`;
            });
            return <polygon key={k} points={pts.join(" ")} fill={k === 6 ? G : "#e1c486"} fillOpacity={k === 6 ? 1 : 0.72} stroke={O} strokeOpacity=".25" />;
          })}
          <path d="M200 100 C214 124 220 134 200 146 C180 134 186 124 200 100 Z" fill={G} />
        </Plate>
      );
  }
}

export function Dish({ i, label }: { i: number; label: string }) {
  return (
    <svg viewBox="0 0 400 400" role="img" aria-label={label} data-dish="">
      <Art i={i} />
    </svg>
  );
}
