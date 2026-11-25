/** Luật tính của bộ chọn gói. Thuần hàm, không phụ thuộc React, có thể kiểm thử trực tiếp. */
export type VehicleId = "sedan" | "suv" | "bantai" | "dien";
export type PaintId = "tot" | "xoay" | "xuoc";
export type NeedId = "rua" | "danhbong" | "ceramic" | "noithat" | "khoangmay";

export const VEHICLES: { id: VehicleId; label: string; hint: string; mult: number }[] = [
  { id: "sedan", label: "Sedan / Hatchback", hint: "Từ xe đô thị tới sedan hạng D", mult: 1 },
  { id: "suv", label: "SUV / Crossover", hint: "5 đến 7 chỗ, thân cao", mult: 1.25 },
  { id: "bantai", label: "Bán tải", hint: "Thùng sau, thân dài", mult: 1.35 },
  { id: "dien", label: "Xe điện", hint: "Có quy trình riêng cho khoang kỹ thuật", mult: 1.15 },
];

export const PAINTS: { id: PaintId; label: string; hint: string; mult: number; hours: number }[] = [
  { id: "tot", label: "Sơn còn tốt", hint: "Ít xước, màu còn sâu", mult: 1, hours: 5 },
  { id: "xoay", label: "Xoáy mờ, xỉn nhẹ", hint: "Thấy vệt xoáy dưới nắng, mất độ sâu", mult: 1.3, hours: 7 },
  { id: "xuoc", label: "Xước và xỉn nhiều", hint: "Xước rải rác, sơn khô và mờ", mult: 1.7, hours: 10 },
];

export const NEEDS: { id: NeedId; label: string; hint: string }[] = [
  { id: "rua", label: "Rửa chi tiết", hint: "Làm sạch sâu, lau khô" },
  { id: "danhbong", label: "Đánh bóng sơn", hint: "Hiệu chỉnh xoáy mờ" },
  { id: "ceramic", label: "Phủ ceramic", hint: "Lớp bảo vệ bề mặt" },
  { id: "noithat", label: "Nội thất", hint: "Hút bụi, vệ sinh da, vải, nhựa" },
  { id: "khoangmay", label: "Khoang máy", hint: "Che chắn, làm sạch, hoàn thiện" },
];

export type StepLine = { id: string; label: string; detail: string; hours: number; steps: number; price: number; note?: string };
export type Result =
  | { kind: "empty" }
  | {
      kind: "ok";
      name: string;
      summary: string;
      lines: StepLine[];
      hours: number;
      steps: number;
      priceFrom: number;
      priceTo: number;
      days: string;
      notes: string[];
    };

const round = (n: number) => Math.round(n / 10000) * 10000;

export function formatHours(h: number) {
  if (h <= 8) return `${String(h).replace(".", ",")} giờ`;
  const d = Math.ceil(h / 8 * 2) / 2;
  return `khoảng ${String(d).replace(".", ",")} ngày làm việc`;
}

export function buildPackage(vehicle: VehicleId, paint: PaintId, needs: NeedId[]): Result {
  if (needs.length === 0) return { kind: "empty" };
  const v = VEHICLES.find((x) => x.id === vehicle)!;
  const p = PAINTS.find((x) => x.id === paint)!;
  const has = (n: NeedId) => needs.includes(n);
  const lines: StepLine[] = [];
  const notes: string[] = [];
  const exterior = has("rua") || has("danhbong") || has("ceramic");
  const needCorrection = has("danhbong") || (has("ceramic") && paint !== "tot");
  const bigger = needCorrection || has("ceramic");

  if (exterior) {
    lines.push({
      id: "prep", label: "Rửa chi tiết và tẩy nhiễm", hours: 2, steps: 4,
      detail: "Kiểm tra xe, vệ sinh bánh và hốc bánh, rửa tiếp xúc, tẩy nhiễm bề mặt, lau khô.",
      price: bigger ? 0 : round(350000 * v.mult),
      note: bigger ? "Đã gồm trong công đoạn sau" : undefined,
    });
  }
  if (needCorrection) {
    lines.push({
      id: "correct", label: has("danhbong") ? "Đánh bóng sơn" : "Hiệu chỉnh sơn trước khi phủ", hours: p.hours, steps: 5,
      detail: "Đo và đánh giá bề mặt, thử một vùng nhỏ để chọn pad và dung dịch, hiệu chỉnh có kiểm soát, kiểm tra dưới đèn.",
      price: round(2500000 * v.mult * p.mult),
    });
    if (paint === "xuoc") notes.push("Với sơn xước nhiều, mức cải thiện phụ thuộc độ sâu vết xước. Vết xuyên lớp sơn bóng không xử lý an toàn bằng đánh bóng.");
  }
  if (has("ceramic")) {
    lines.push({
      id: "coat", label: "Phủ ceramic", hours: 6, steps: 5,
      detail: "Lau chuẩn bị bề mặt, thi công lớp phủ từng khu vực, kiểm tra, để đóng rắn theo hướng dẫn của sản phẩm.",
      price: round(4500000 * v.mult),
      note: "Thời gian tránh nước sau phủ theo hướng dẫn sản phẩm",
    });
    notes.push("Lớp phủ giúp bề mặt chống bám nước và dễ vệ sinh hơn, không phải áo giáp chống xước hay đá văng.");
  }
  if (has("noithat")) {
    lines.push({
      id: "in", label: "Chăm sóc nội thất", hours: 4, steps: 5,
      detail: "Kiểm tra chất liệu, hút bụi, làm sạch khe và bề mặt, vệ sinh da hoặc vải phù hợp, hoàn thiện.",
      price: round(900000 * v.mult),
    });
  }
  if (has("khoangmay")) {
    const ev = vehicle === "dien";
    lines.push({
      id: "eng", label: ev ? "Khoang kỹ thuật" : "Khoang máy", hours: 2.5, steps: 4,
      detail: ev
        ? "Che chắn bộ phận nhạy cảm, lau làm sạch bằng khăn và cọ khô, không xịt nước áp lực, hoàn thiện."
        : "Che chắn bộ phận nhạy cảm, làm sạch bằng phương pháp phù hợp, lau khô, hoàn thiện chi tiết.",
      price: 700000,
    });
    if (ev) notes.push("Xe điện: khoang kỹ thuật chỉ làm sạch khô, kỹ thuật viên sẽ xác nhận theo từng mẫu xe trước khi làm.");
  }
  const hours = lines.reduce((a, l) => a + l.hours, 0) + 0.5;
  const steps = lines.reduce((a, l) => a + l.steps, 0) + 1;
  lines.push({ id: "qc", label: "Kiểm tra cuối và bàn giao", hours: 0.5, steps: 1, detail: "Soát từng khu vực dưới đèn, chụp lại tình trạng, hướng dẫn chăm sóc sau dịch vụ.", price: 0, note: "Đã gồm" });
  const sum = lines.reduce((a, l) => a + l.price, 0);

  let name = "Gói tuỳ chọn";
  if (needs.length >= 4) name = "Gói hoàn thiện toàn xe";
  else if (has("ceramic")) name = needCorrection ? "Gói phủ bảo vệ kèm hiệu chỉnh" : "Gói phủ bảo vệ";
  else if (has("danhbong")) name = "Gói hiệu chỉnh sơn";
  else if (needs.length === 1 && has("rua")) name = "Gói rửa chi tiết";
  else if (needs.length === 1 && has("noithat")) name = "Gói nội thất";
  else if (needs.length === 1 && has("khoangmay")) name = "Gói khoang máy";

  const vl = v.label.toLowerCase();
  return {
    kind: "ok", name, lines, hours, steps,
    summary: `${name} cho ${vl}, sơn ${p.label.toLowerCase()}.`,
    priceFrom: round(sum), priceTo: round(sum * 1.2),
    days: formatHours(hours),
    notes: [...notes, "Giá tham khảo. Mức cuối được xác nhận sau khi kỹ thuật viên kiểm tra xe trực tiếp."],
  };
}

export function formatVnd(n: number) {
  return new Intl.NumberFormat("vi-VN", { style: "currency", currency: "VND", maximumFractionDigits: 0 }).format(n).replace(/ /g, " ");
}

export function summaryText(vehicle: VehicleId, paint: PaintId, needs: NeedId[]) {
  const r = buildPackage(vehicle, paint, needs);
  if (r.kind === "empty") return "";
  const v = VEHICLES.find((x) => x.id === vehicle)!;
  const p = PAINTS.find((x) => x.id === paint)!;
  return [
    `Gương Phẩm · ${r.name}`,
    `Dòng xe: ${v.label}`,
    `Tình trạng sơn: ${p.label}`,
    `Hạng mục: ${r.lines.filter((l) => l.id !== "qc").map((l) => l.label).join(", ")}`,
    `Thời gian: ${formatHours(r.hours)} (${r.steps} bước)`,
    `Giá tham khảo: ${formatVnd(r.priceFrom)} đến ${formatVnd(r.priceTo)}`,
  ].join("\n");
}
