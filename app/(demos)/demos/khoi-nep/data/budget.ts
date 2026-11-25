export type BuildingType = "apartment" | "townhouse" | "villa" | "commercial";
export type FinishLevel = "essential" | "standard" | "premium";
export type ServiceScope = "design" | "build" | "full";

export interface BudgetInput {
  buildingType: BuildingType;
  area: number;
  finishLevel: FinishLevel;
  scope: ServiceScope;
}

export interface BudgetResult {
  designCost: number;
  constructionCost: number;
  subtotal: number;
  minimum: number;
  maximum: number;
  buildingFactor: number;
}

export const BUILDING_TYPES: { id: BuildingType; label: string; factor: number }[] = [
  { id: "apartment", label: "Căn hộ", factor: 1 },
  { id: "townhouse", label: "Nhà phố", factor: 1.1 },
  { id: "villa", label: "Biệt thự", factor: 1.25 },
  { id: "commercial", label: "Văn phòng / cửa hàng", factor: 1.15 },
];

export const FINISH_LEVELS: { id: FinishLevel; label: string; rate: number; note: string }[] = [
  { id: "essential", label: "Thiết yếu", rate: 2_000_000, note: "Vật liệu phổ thông, đồ gỗ công nghiệp, hoàn thiện đơn giản" },
  { id: "standard", label: "Cân bằng", rate: 3_500_000, note: "Vật liệu đa dạng hơn, nội thất đồng bộ, chi tiết tùy chỉnh" },
  { id: "premium", label: "Tinh tuyển", rate: 5_500_000, note: "Ưu tiên vật liệu, bề mặt và chi tiết hoàn thiện cao hơn" },
];

export const SCOPES: { id: ServiceScope; label: string }[] = [
  { id: "design", label: "Chỉ thiết kế" },
  { id: "build", label: "Chỉ hoàn thiện" },
  { id: "full", label: "Thiết kế & thi công" },
];

export const DESIGN_RATE = 250_000;
export const ROUNDING_UNIT = 1_000_000;
export const AREA_MIN = 20;
export const AREA_MAX = 1000;
export const BUDGET_STORAGE_KEY = "portfolio:lp08:budget:v1";

export const DEFAULT_INPUT: BudgetInput = {
  buildingType: "apartment",
  area: 80,
  finishLevel: "essential",
  scope: "full",
};

export function validateArea(raw: string): { ok: true; value: number } | { ok: false; message: string } {
  const text = raw.trim().replace(",", ".");
  if (text === "") return { ok: false, message: "Nhập diện tích cần hoàn thiện." };
  if (!/^\d+(\.\d)?$/.test(text)) {
    return { ok: false, message: /^\d+\.\d{2,}$/.test(text) ? "Chỉ cho phép tối đa một chữ số thập phân." : "Vui lòng nhập một số hợp lệ." };
  }
  const value = Number(text);
  if (!Number.isFinite(value)) return { ok: false, message: "Vui lòng nhập một số hợp lệ." };
  if (value < AREA_MIN) return { ok: false, message: `Diện tích tối thiểu là ${AREA_MIN} m².` };
  if (value > AREA_MAX) return { ok: false, message: "Công cụ hỗ trợ tối đa 1.000 m²." };
  return { ok: true, value };
}

export function calculateBudget(input: BudgetInput): BudgetResult {
  if (!Number.isFinite(input.area) || input.area < AREA_MIN || input.area > AREA_MAX) {
    throw new RangeError("INVALID_AREA");
  }
  const factor = BUILDING_TYPES.find((b) => b.id === input.buildingType)!.factor;
  const rate = FINISH_LEVELS.find((f) => f.id === input.finishLevel)!.rate;
  const designCost = input.scope === "build" ? 0 : Math.round(input.area * DESIGN_RATE * factor);
  const constructionCost = input.scope === "design" ? 0 : Math.round(input.area * rate * factor);
  const subtotal = designCost + constructionCost;
  const minimum = Math.floor((subtotal * 9) / (10 * ROUNDING_UNIT)) * ROUNDING_UNIT;
  const maximum = Math.ceil((subtotal * 12) / (10 * ROUNDING_UNIT)) * ROUNDING_UNIT;
  return { designCost, constructionCost, subtotal, minimum, maximum, buildingFactor: factor };
}

const vnd = new Intl.NumberFormat("vi-VN", { style: "currency", currency: "VND", maximumFractionDigits: 0 });
export const formatVnd = (n: number) => vnd.format(n).replace(/ /g, " ");

const num = new Intl.NumberFormat("vi-VN", { maximumFractionDigits: 2 });
/** 162–216 triệu | 1,29–1,73 tỷ */
export function formatRange(min: number, max: number) {
  if (max >= 1_000_000_000) {
    return `${num.format(min / 1e9)}–${num.format(max / 1e9)} tỷ`;
  }
  return `${num.format(min / 1e6)}–${num.format(max / 1e6)} triệu`;
}

export function isBudgetInput(v: unknown): v is BudgetInput {
  if (!v || typeof v !== "object") return false;
  const o = v as Record<string, unknown>;
  return (
    BUILDING_TYPES.some((b) => b.id === o.buildingType) &&
    FINISH_LEVELS.some((f) => f.id === o.finishLevel) &&
    SCOPES.some((s) => s.id === o.scope) &&
    typeof o.area === "number" &&
    Number.isFinite(o.area) &&
    o.area >= AREA_MIN &&
    o.area <= AREA_MAX
  );
}
