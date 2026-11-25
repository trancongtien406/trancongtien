export type MaterialCategory = "wood" | "stone" | "fabric";

export interface Material {
  id: string;
  category: MaterialCategory;
  name: string;
  code: string;
  color: string;
  /** ảnh gốc (đuôi sau "mat-") */
  photo: "mat-wood" | "mat-stone" | "mat-concrete" | "mat-linen";
  /** nếu có: nhân (multiply) màu này lên ảnh để ra sắc độ khác */
  tint?: string;
  description: string;
  uses: string;
}

export const CATEGORY_LABEL: Record<MaterialCategory, string> = {
  wood: "Chất gỗ",
  stone: "Bề mặt đá",
  fabric: "Sợi vải",
};

export const MATERIALS: Material[] = [
  { id: "W01", category: "wood", name: "Gỗ sồi sáng", code: "WOOD / W01", color: "#C3A47C", photo: "mat-wood", description: "Ấm, sáng, vân nhẹ", uses: "Tủ, bàn, kệ" },
  { id: "W02", category: "wood", name: "Gỗ óc chó", code: "WOOD / W02", color: "#70513C", photo: "mat-wood", tint: "#8a6a50", description: "Trầm, sâu, có chiều sắc", uses: "Tủ, bàn, vách" },
  { id: "S01", category: "stone", name: "Travertine", code: "STONE / S01", color: "#D2C3A9", photo: "mat-stone", description: "Sắc be, bề mặt tự nhiên", uses: "Mặt bàn, điểm nhấn" },
  { id: "S02", category: "stone", name: "Microcement", code: "STONE / S02", color: "#AAA79E", photo: "mat-concrete", description: "Liền mạch, trung tính", uses: "Tường, bề mặt" },
  { id: "F01", category: "fabric", name: "Linen tự nhiên", code: "FABRIC / F01", color: "#D8CFBC", photo: "mat-linen", description: "Mềm, nhẹ, mộc", uses: "Rèm, đệm" },
  { id: "F02", category: "fabric", name: "Vải olive", code: "FABRIC / F02", color: "#797D65", photo: "mat-linen", tint: "#8d9378", description: "Trầm, cân bằng, tự nhiên", uses: "Sofa, ghế" },
];

export interface Selection {
  wood: string;
  stone: string;
  fabric: string;
}

export const PRESETS: { id: string; name: string; mood: string; selection: Selection }[] = [
  { id: "nep-am", name: "Nếp ấm", mood: "Sáng, ấm, nhẹ", selection: { wood: "W01", stone: "S01", fabric: "F01" } },
  { id: "tinh-tram", name: "Tĩnh trầm", mood: "Điềm tĩnh, chiều sâu", selection: { wood: "W02", stone: "S02", fabric: "F01" } },
  { id: "moc-xanh", name: "Mộc xanh", mood: "Gần thiên nhiên", selection: { wood: "W01", stone: "S02", fabric: "F02" } },
];

export const BOARDS_KEY = "portfolio:lp08:boards:v1";
export const DRAFT_KEY = "portfolio:lp08:board-draft:v1";
export const MAX_BOARDS = 20;
export const NAME_MAX = 60;
export const NOTES_MAX = 300;

export interface MaterialBoard {
  schemaVersion: 1;
  id: string;
  name: string;
  selection: Selection;
  notes: string;
  createdAt: string;
  updatedAt: string;
}

export const byId = (id: string) => MATERIALS.find((m) => m.id === id);
export const byCat = (c: MaterialCategory) => MATERIALS.filter((m) => m.category === c);

export function isSelection(v: unknown): v is Selection {
  if (!v || typeof v !== "object") return false;
  const o = v as Record<string, unknown>;
  return (["wood", "stone", "fabric"] as const).every(
    (k) => typeof o[k] === "string" && byId(o[k] as string)?.category === k,
  );
}

export function isBoard(v: unknown): v is MaterialBoard {
  if (!v || typeof v !== "object") return false;
  const o = v as Record<string, unknown>;
  return (
    o.schemaVersion === 1 &&
    typeof o.id === "string" &&
    typeof o.name === "string" &&
    o.name.length <= NAME_MAX &&
    typeof o.notes === "string" &&
    o.notes.length <= NOTES_MAX &&
    isSelection(o.selection) &&
    typeof o.createdAt === "string" &&
    typeof o.updatedAt === "string"
  );
}
