import type { Vocab } from "../data/content";

const N = "#0b1f66";
/** Biểu tượng nhỏ cho thẻ từ vựng (hình học, vẽ tay). */
export function VocabIcon({ name, size = 72 }: { name: Vocab["icon"]; size?: number }) {
  const p = { width: size, height: size, viewBox: "0 0 72 72", "aria-hidden": true, focusable: false } as const;
  switch (name) {
    case "umbrella": return (<svg {...p}><path d="M8 38 C8 18 64 18 64 38 Z" fill="#ff5d8f" /><path d="M36 38 v18 a6 6 0 0 1 -12 0" stroke={N} strokeWidth="4" fill="none" strokeLinecap="round" /><path d="M8 38 q7 -6 14 0 q7 -6 14 0 q7 -6 14 0 q7 -6 14 0" stroke="#fff" strokeWidth="3" fill="none" /></svg>);
    case "hand": return (<svg {...p}><rect x="12" y="30" width="34" height="22" rx="6" fill="#ffc83d" /><rect x="40" y="22" width="20" height="30" rx="6" fill="#1d4ed8" /><path d="M16 22 l6 -10 6 10" stroke={N} strokeWidth="4" fill="none" strokeLinejoin="round" strokeLinecap="round" /></svg>);
    case "clock": return (<svg {...p}><circle cx="36" cy="36" r="26" fill="#fff" stroke={N} strokeWidth="4" /><path d="M36 20 v17 l11 7" stroke={N} strokeWidth="4" fill="none" strokeLinecap="round" /><circle cx="36" cy="36" r="3.4" fill="#ff5d8f" /></svg>);
    case "cup": return (<svg {...p}><path d="M14 26 h34 v14 a15 15 0 0 1 -15 15 h-4 a15 15 0 0 1 -15 -15 Z" fill="#ffc83d" /><path d="M48 30 h5 a7 7 0 0 1 0 14 h-6" stroke={N} strokeWidth="4" fill="none" /><path d="M24 12 q4 5 0 9 M34 10 q4 5 0 9" stroke="#ff5d8f" strokeWidth="3.4" fill="none" strokeLinecap="round" /></svg>);
    case "heart": return (<svg {...p}><path d="M36 60 C6 40 12 14 28 14 c6 0 8 3 8 6 0 -3 2 -6 8 -6 16 0 22 26 -8 46 Z" fill="#ff5d8f" /><path d="M22 24 q-6 4 -4 10" stroke="#fff" strokeWidth="3.4" fill="none" strokeLinecap="round" /></svg>);
    case "drop": return (<svg {...p}><path d="M36 8 C52 28 58 36 58 44 a22 22 0 0 1 -44 0 c0 -8 6 -16 22 -36 Z" fill="#5f86ff" /><path d="M26 44 q0 8 8 10" stroke="#fff" strokeWidth="3.6" fill="none" strokeLinecap="round" /></svg>);
    case "people": return (<svg {...p}><circle cx="24" cy="24" r="10" fill="#ffc83d" /><circle cx="48" cy="24" r="10" fill="#ff5d8f" /><path d="M6 58 a18 18 0 0 1 36 0 Z" fill="#ffc83d" /><path d="M30 58 a18 18 0 0 1 36 0 Z" fill="#ff5d8f" /></svg>);
    default: return (<svg {...p}><circle cx="36" cy="36" r="14" fill="#ffc83d" />{Array.from({ length: 8 }, (_, i) => <path key={i} d="M36 8 v8" stroke="#ffc83d" strokeWidth="4" strokeLinecap="round" transform={`rotate(${i * 45} 36 36)`} />)}</svg>);
  }
}
