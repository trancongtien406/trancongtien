export type BeanId = "B01" | "B02" | "B03";
export type Question = { id: string; title: string; hint: string; options: { value: string; label: string; sub: string }[] };

export const QUESTIONS: readonly Question[] = [
  { id: "taste", title: "Bạn thích cà phê có vị thế nào?", hint: "Chọn vị bạn thấy dễ chịu nhất.", options: [
    { value: "bold", label: "Đậm đà, hậu đắng", sub: "Sức nặng, cacao, hạt rang" },
    { value: "balanced", label: "Cân bằng, dễ uống", sub: "Ngọt hậu, caramel, hạt dẻ" },
    { value: "bright", label: "Thanh nhẹ, có vị trái cây", sub: "Cam, hoa, mật ong" },
  ] },
  { id: "brew", title: "Bạn hay pha hoặc uống theo cách nào?", hint: "Cách quen nhất, không cần đúng chuyên môn.", options: [
    { value: "phin", label: "Phin", sub: "Nhỏ giọt, chậm rãi" },
    { value: "machine", label: "Máy espresso", sub: "Nhanh, đậm, có thể thêm sữa" },
    { value: "filter", label: "Pour-over / V60", sub: "Rót tay, nhẹ và sạch vị" },
    { value: "cold", label: "Cold Brew", sub: "Ủ lạnh, êm, ít gắt" },
  ] },
  { id: "sweet", title: "Bạn muốn ly cà phê thêm gì?", hint: "Chọn thứ bạn hay gọi nhất.", options: [
    { value: "black", label: "Uống đen", sub: "Không đường, không sữa" },
    { value: "milk", label: "Thêm sữa tươi", sub: "Mềm, béo nhẹ" },
    { value: "sweet", label: "Ngọt dịu / sữa đặc", sub: "Đậm vị, ngọt kiểu Việt" },
  ] },
];

const SCORE: Record<string, Record<string, Partial<Record<BeanId, number>>>> = {
  taste: { bold: { B01: 3, B02: 1 }, balanced: { B02: 3, B01: 1, B03: 1 }, bright: { B03: 3, B02: 1 } },
  brew: { phin: { B01: 2, B02: 1 }, machine: { B01: 1, B02: 2 }, filter: { B03: 2, B02: 1 }, cold: { B03: 2, B02: 1 } },
  sweet: { black: { B03: 1, B01: 1 }, milk: { B02: 2, B01: 1 }, sweet: { B01: 2, B02: 1 } },
};

const BREW_BY: Record<BeanId, Record<string, string>> = {
  B01: { phin: "Phin, 20 g cà phê cho 160 ml nước", machine: "Espresso 1:2, thêm sữa nếu muốn dịu lại", filter: "Pour-over xay vừa, nước 92°C", cold: "Cold Brew ủ 14 giờ, thêm đá viên lớn" },
  B02: { phin: "Phin xay vừa, ủ 30 giây trước khi nhỏ giọt", machine: "Espresso hoặc Flat White, rất hợp với sữa", filter: "V60 xay vừa, nước 93°C", cold: "Cold Brew ủ 12 giờ, uống với đá" },
  B03: { phin: "Phin xay thô, nước 90°C để không gắt", machine: "Espresso nhẹ, uống thẳng hoặc làm Espresso Tonic", filter: "V60, rót ba lượt, 15 g cho 250 ml", cold: "Cold Brew ủ 16 giờ, thêm lát cam" },
};

const MENU_BY: Record<BeanId, Record<string, string[]>> = {
  B01: { black: ["M03", "M01"], milk: ["M07", "M08"], sweet: ["M04", "M13"] },
  B02: { black: ["M02", "M09"], milk: ["M06", "M08"], sweet: ["M04", "M15"] },
  B03: { black: ["M14", "M10"], milk: ["M06", "M05"], sweet: ["M05", "M10"] },
};

export type Answers = Record<string, string>;
export type Result = { bean: BeanId; scores: Record<BeanId, number>; brew: string; menuIds: string[] };

/** Tính điểm cố định; hoà điểm thì ưu tiên câu 1 (vị). */
export function recommend(a: Answers): Result {
  const scores: Record<BeanId, number> = { B01: 0, B02: 0, B03: 0 };
  for (const q of QUESTIONS) {
    const s = SCORE[q.id]?.[a[q.id]] ?? {};
    (Object.keys(s) as BeanId[]).forEach((k) => (scores[k] += s[k] ?? 0));
  }
  const first = SCORE.taste[a.taste] ?? {};
  const order = (Object.keys(scores) as BeanId[]).sort((x, y) => scores[y] - scores[x] || (first[y] ?? 0) - (first[x] ?? 0));
  const bean = order[0];
  return { bean, scores, brew: BREW_BY[bean][a.brew], menuIds: MENU_BY[bean][a.sweet] };
}
