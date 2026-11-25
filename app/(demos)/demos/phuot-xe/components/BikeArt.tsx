import type { SVGProps } from "react";

/**
 * Hình xe tự vẽ (không phải ảnh hay logo hãng): ba dáng xe số / tay ga / côn tay và một dáng phượt đường dài.
 * Dùng currentColor; lốp dày, thân đặc để dáng xe đọc được ở cỡ nhỏ.
 */
export type BikeKind = "so" | "ga" | "con" | "adv";

function Wheels() {
  return (
    <g fill="none" stroke="currentColor">
      <circle cx="46" cy="80" r="21" strokeWidth="9" />
      <circle cx="158" cy="80" r="21" strokeWidth="9" />
      <circle cx="46" cy="80" r="11" strokeWidth="2" opacity=".55" />
      <circle cx="158" cy="80" r="11" strokeWidth="2" opacity=".55" />
      <circle cx="46" cy="80" r="3.5" fill="currentColor" stroke="none" />
      <circle cx="158" cy="80" r="3.5" fill="currentColor" stroke="none" />
    </g>
  );
}

const ST = { stroke: "currentColor", strokeLinecap: "round", strokeLinejoin: "round" } as const;

export function BikeArt({ kind, ...rest }: { kind: BikeKind } & SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 200 110" fill="none" aria-hidden="true" focusable="false" {...rest}>
      <Wheels />
      {/* phuộc trước, ghi đông, đèn pha */}
      <g {...ST} fill="none">
        <path d="M158 80 146 40" strokeWidth="7" />
        <path d="M134 32 156 27" strokeWidth="7" />
        <path d="M132 32 127 24" strokeWidth="3" />
      </g>
      <path d="M150 36a8 8 0 0 1 8 6l-9 3z" fill="currentColor" />
      {kind === "so" && (
        <g {...ST}>
          <path d="M60 54 104 54 128 50 114 68 108 86 84 86 64 72Z" fill="currentColor" strokeWidth="3" />
          <path d="M38 46Q64 40 104 44L110 51 102 57 44 57Q34 54 38 46Z" fill="currentColor" strokeWidth="2" />
          <path d="M28 50 40 46 42 56 32 58Z" fill="currentColor" strokeWidth="2" />
          <path d="M106 43 120 38Q132 38 136 48L128 56 108 53Z" fill="currentColor" strokeWidth="2" />
          <path d="M146 40 130 54" strokeWidth="9" />
          <path d="M46 80 88 76" strokeWidth="6" />
          <path d="M114 88 56 84" strokeWidth="8" />
          <path d="M22 68Q46 46 72 64" strokeWidth="4" fill="none" />
          <path d="M138 64Q158 50 178 68" strokeWidth="4" fill="none" />
        </g>
      )}
      {kind === "ga" && (
        <g {...ST}>
          <path d="M26 64Q22 44 44 43L98 43Q108 43 110 54L114 68Q116 73 124 73H138L145 46 151 37 157 43 150 78 100 80 64 78Q52 78 50 70L38 68Q28 68 26 64Z" fill="currentColor" strokeWidth="3" />
          <path d="M138 66Q158 52 180 68" strokeWidth="4" fill="none" />
        </g>
      )}
      {(kind === "con" || kind === "adv") && (
        <g {...ST}>
          <path d="M146 30 178 58 150 62 132 42Z" fill="currentColor" strokeWidth="3" />
          <path d="M94 40Q124 24 144 44L126 60 92 54Z" fill="currentColor" strokeWidth="3" />
          <path d="M32 44 96 50V60L44 60Q28 56 32 44Z" fill="currentColor" strokeWidth="3" />
          <path d="M80 56 126 58 118 90 88 88Z" fill="currentColor" strokeWidth="3" />
          <path d="M46 80 88 74" strokeWidth="7" />
          <path d="M118 90 52 82" strokeWidth="8" />
          <path d="M22 66Q46 46 72 62" strokeWidth="4" fill="none" />
          <path d="M138 66Q158 52 180 68" strokeWidth="4" fill="none" />
          {kind === "adv" && <path d="M132 24 144 10 170 10 168 26" strokeWidth="5" fill="none" />}
        </g>
      )}
    </svg>
  );
}
