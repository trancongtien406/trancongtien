import type { ReactNode } from "react";

/** Nhãn dán vẽ phẳng, viền đen dày. Mỗi hình là SVG viewBox 100x100 (riêng nhãn chữ là viền CSS). */
export type StickerKind = "paw" | "bone" | "bubble" | "heart" | "star" | "comb" | "thom" | "xinh" | "bong";

const INK = "#14121a";

const A = ({ children, label }: { children: ReactNode; label?: string }) => (
  <svg viewBox="0 0 100 100" width="100%" height="100%" role="img" aria-label={label} focusable="false" style={{ overflow: "visible" }}>{children}</svg>
);

export function StickerArt({ kind }: { kind: StickerKind }) {
  switch (kind) {
    case "paw":
      return (
        <A>
          <g stroke={INK} strokeWidth="5" strokeLinejoin="round" fill="#ff3b30">
            <path d="M50 52c-14 0-26 12-24 24 2 10 12 9 24 9s22 1 24-9c2-12-10-24-24-24z" />
            <ellipse cx="24" cy="44" rx="9" ry="12" transform="rotate(-20 24 44)" />
            <ellipse cx="40" cy="28" rx="9" ry="13" transform="rotate(-6 40 28)" />
            <ellipse cx="60" cy="28" rx="9" ry="13" transform="rotate(6 60 28)" />
            <ellipse cx="76" cy="44" rx="9" ry="12" transform="rotate(20 76 44)" />
          </g>
        </A>
      );
    case "bone":
      return (
        <A>
          <path d="M26 36a12 12 0 1 1 16-10l16 16a12 12 0 1 1 10 16 12 12 0 1 1-16 10L36 52A12 12 0 1 1 26 36z" transform="rotate(-20 50 50) scale(1.05) translate(-2 -3)" fill="#fff" stroke={INK} strokeWidth="5" strokeLinejoin="round" />
        </A>
      );
    case "bubble":
      return (
        <A>
          <circle cx="50" cy="50" r="40" fill="#fff" fillOpacity=".85" stroke={INK} strokeWidth="5" />
          <path d="M26 44a26 26 0 0 1 20-20" fill="none" stroke="#2f5bff" strokeWidth="7" strokeLinecap="round" />
          <circle cx="70" cy="68" r="5" fill="#2f5bff" />
        </A>
      );
    case "heart":
      return (
        <A>
          <path d="M50 86C20 62 10 46 14 32c4-14 24-16 36-2 12-14 32-12 36 2 4 14-6 30-36 54z" fill="#ff3b30" stroke={INK} strokeWidth="5" strokeLinejoin="round" />
          <path d="M26 38c2-6 8-8 13-5" fill="none" stroke="#fff" strokeWidth="5" strokeLinecap="round" />
        </A>
      );
    case "star":
      return (
        <A>
          <path d="M50 8l11 24 26 3-19 18 5 26-23-13-23 13 5-26-19-18 26-3z" fill="#ffc300" stroke={INK} strokeWidth="5" strokeLinejoin="round" />
        </A>
      );
    case "comb":
      return (
        <A>
          <rect x="12" y="22" width="76" height="26" rx="10" fill="#2f5bff" stroke={INK} strokeWidth="5" />
          <g stroke={INK} strokeWidth="5" strokeLinecap="round">
            <path d="M24 48v30M38 48v30M52 48v30M66 48v30M78 48v30" />
          </g>
          <path d="M22 34h30" stroke="#fff" strokeWidth="5" strokeLinecap="round" />
        </A>
      );
    case "thom":
      return (
        <A>
          <path d="M8 22h84a8 8 0 0 1 8 8v28a8 8 0 0 1-8 8H58l-12 18-2-18H8a8 8 0 0 1-8-8V30a8 8 0 0 1 8-8z" transform="translate(0 -4) scale(.98)" fill="#fff" stroke={INK} strokeWidth="5" strokeLinejoin="round" />
          <text x="50" y="44" textAnchor="middle" fontSize="15" fill={INK} style={{ fontFamily: "var(--pv-display)" }}>Thơm tho!</text>
        </A>
      );
    case "xinh":
      return (
        <A>
          <path d="M50 4l9 14 16-5 3 16 16 3-6 15 12 12-14 9 2 16-17-1-8 15-13-10-13 10-8-15-17 1 2-16-14-9 12-12-6-15 16-3 3-16 16 5z" fill="#2f5bff" stroke={INK} strokeWidth="5" strokeLinejoin="round" />
          <text x="50" y="47" textAnchor="middle" fontSize="19" fill="#fff" style={{ fontFamily: "var(--pv-display)" }}>Xinh</text>
          <text x="50" y="68" textAnchor="middle" fontSize="19" fill="#ffc300" style={{ fontFamily: "var(--pv-display)" }}>xỉu!</text>
        </A>
      );
    case "bong":
      return (
        <A>
          <circle cx="50" cy="50" r="44" fill="#ffc300" stroke={INK} strokeWidth="5" />
          <text x="50" y="47" textAnchor="middle" fontSize="20" fill={INK} style={{ fontFamily: "var(--pv-display)" }}>Bông</text>
          <text x="50" y="69" textAnchor="middle" fontSize="20" fill="#ff3b30" stroke={INK} strokeWidth=".6" style={{ fontFamily: "var(--pv-display)" }}>xù!</text>
        </A>
      );
  }
}

export const STICKER_LABEL: Record<StickerKind, string> = {
  paw: "Nhãn dán dấu chân", bone: "Nhãn dán khúc xương", bubble: "Nhãn dán bong bóng xà phòng", heart: "Nhãn dán trái tim",
  star: "Nhãn dán ngôi sao", comb: "Nhãn dán chiếc lược", thom: "Nhãn dán Thơm tho", xinh: "Nhãn dán Xinh xỉu", bong: "Nhãn dán Bông xù",
};
