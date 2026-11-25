import { MOODS, PACKAGES, vnd, type Mood, type PackageId, type PaletteId, type Pkg, type StyleId } from "../data/content";

export type MoodState = { styleId: StyleId; paletteId: PaletteId; locationId: string | null; packageId: PackageId };
export const STORAGE_KEY = "portfolio:thang-mo:moodboard:v1";
export const DEFAULT_STATE: MoodState = { styleId: "coastal", paletteId: "signature", locationId: "beach", packageId: "TM-P02" };

export const getMood = (id: StyleId): Mood => MOODS.find((m) => m.id === id) ?? MOODS[0];
export const getPkg = (id: PackageId): Pkg => PACKAGES.find((p) => p.id === id) ?? PACKAGES[1];

/** Palette soft = [màu0, giấy, màu1, mực nâu nhạt] theo đặc tả. */
export function paletteColors(mood: Mood, id: PaletteId): string[] {
  return id === "soft" ? [mood.signature[0], "#F5F0E8", mood.signature[1], "#6F6258"] : mood.signature;
}

/** Kiểm tra và chuẩn hoá dữ liệu bất kỳ về trạng thái hợp lệ; sai thì về mặc định từng phần. */
export function sanitize(raw: unknown): MoodState {
  const o = (raw && typeof raw === "object" ? raw : {}) as Record<string, unknown>;
  const mood = MOODS.find((m) => m.id === o.styleId);
  if (!mood) return { ...DEFAULT_STATE };
  const paletteId: PaletteId = o.paletteId === "soft" ? "soft" : "signature";
  const loc = o.locationId === null ? null : mood.locations.find((l) => l.id === o.locationId)?.id ?? mood.locations[0].id;
  const pkg = PACKAGES.find((p) => p.id === o.packageId)?.id ?? DEFAULT_STATE.packageId;
  return { styleId: mood.id, paletteId, locationId: loc, packageId: pkg };
}

export function readStored(): MoodState {
  try {
    const s = window.localStorage.getItem(STORAGE_KEY);
    if (!s) return { ...DEFAULT_STATE };
    const j = JSON.parse(s);
    if (!j || j.v !== 1) return { ...DEFAULT_STATE };
    return sanitize(j.state);
  } catch { return { ...DEFAULT_STATE }; }
}
export function writeStored(state: MoodState) {
  try { window.localStorage.setItem(STORAGE_KEY, JSON.stringify({ v: 1, state })); } catch { /* storage bị chặn: bỏ qua */ }
}

/** Đổi phong cách: location về lựa chọn đầu của phong cách mới. */
export function withStyle(state: MoodState, styleId: StyleId): MoodState {
  const mood = getMood(styleId);
  return { ...state, styleId, locationId: mood.locations[0].id };
}

export function summaryLines(state: MoodState): { label: string; value: string }[] {
  const mood = getMood(state.styleId);
  const pkg = getPkg(state.packageId);
  const loc = mood.locations.find((l) => l.id === state.locationId);
  return [
    { label: "Phong cách", value: mood.name },
    { label: "Bảng màu", value: state.paletteId === "soft" ? "Dịu nhẹ" : "Nguyên bản" },
    { label: "Bối cảnh", value: loc ? loc.label : "Chưa quyết định" },
    { label: "Gói chụp", value: pkg.name },
    { label: "Thời lượng", value: pkg.hours },
    { label: "Ảnh chỉnh sửa", value: `${pkg.photos} ảnh` },
    { label: "Album in", value: pkg.album.replace("Không bao gồm album in", "Không bao gồm") },
    { label: "Giá gói tham khảo", value: vnd(pkg.price) },
  ];
}

export function summaryText(state: MoodState): string {
  const mood = getMood(state.styleId);
  const colors = paletteColors(mood, state.paletteId).join(", ");
  return ["THÁNG MƠ / BẢN PHÁC THẢO (không phải báo giá)", ...summaryLines(state).map((l) => `${l.label}: ${l.value}`), `Màu: ${colors}`, "Chưa bao gồm các khoản ngoài gói. Giá chỉ mang tính tham khảo."].join("\n");
}
