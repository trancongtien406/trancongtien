export const vnd = new Intl.NumberFormat("vi-VN", { style: "currency", currency: "VND", maximumFractionDigits: 0 });
export const num = new Intl.NumberFormat("vi-VN", { maximumFractionDigits: 1 });
export const money = (n: number) => vnd.format(Math.round(n / 1000) * 1000);
/** Hiển thị gọn cho ô số liệu: tỷ hoặc triệu đồng. */
export function compact(n: number) {
  const f = (v: number, d: number) => new Intl.NumberFormat("vi-VN", { minimumFractionDigits: d, maximumFractionDigits: d }).format(v);
  return n >= 1e9 ? `${f(n / 1e9, 2)}\u00a0tỷ` : `${f(n / 1e6, 1)}\u00a0triệu`;
}
export const billions = (n: number) => `${new Intl.NumberFormat("vi-VN", { maximumFractionDigits: 2, minimumFractionDigits: 2 }).format(n / 1e9)} tỷ`;

/** Trả đều hàng tháng (annuity): PMT = P·r / (1 − (1 + r)^−n). r = lãi năm / 12. Lãi 0 thì chia đều gốc. */
export function annuity(principal: number, yearlyPct: number, years: number) {
  const n = Math.round(years * 12);
  const r = yearlyPct / 100 / 12;
  if (n <= 0 || principal <= 0) return { n: Math.max(n, 0), pmt: 0, total: 0, interest: 0, r };
  const pmt = r === 0 ? principal / n : (principal * r) / (1 - Math.pow(1 + r, -n));
  return { n, pmt, total: pmt * n, interest: pmt * n - principal, r };
}

/** Dư nợ sau k tháng, lấy mẫu cho biểu đồ. */
export function balanceCurve(principal: number, yearlyPct: number, years: number, points = 40) {
  const { n, pmt, r } = annuity(principal, yearlyPct, years);
  const out: number[] = [];
  for (let i = 0; i <= points; i++) {
    const k = Math.round((n * i) / points);
    const b = r === 0 ? principal - pmt * k : principal * Math.pow(1 + r, k) - (pmt * (Math.pow(1 + r, k) - 1)) / r;
    out.push(Math.max(0, b));
  }
  return out;
}

export type Stage = { id: string; label: string; pct: number };
export const SCHEDULES: { id: string; label: string; stages: Stage[] }[] = [
  { id: "5", label: "5 đợt", stages: [
    { id: "d1", label: "Đợt 1 · Giữ căn và ký thoả thuận", pct: 10 },
    { id: "d2", label: "Đợt 2", pct: 20 },
    { id: "d3", label: "Đợt 3", pct: 20 },
    { id: "d4", label: "Đợt 4", pct: 20 },
    { id: "d5", label: "Đợt 5 · Khi nhận căn", pct: 30 },
  ] },
  { id: "6", label: "6 đợt giãn", stages: [
    { id: "d1", label: "Đợt 1 · Giữ căn và ký thoả thuận", pct: 10 },
    { id: "d2", label: "Đợt 2", pct: 10 },
    { id: "d3", label: "Đợt 3", pct: 15 },
    { id: "d4", label: "Đợt 4", pct: 15 },
    { id: "d5", label: "Đợt 5", pct: 20 },
    { id: "d6", label: "Đợt 6 · Khi nhận căn", pct: 30 },
  ] },
];

/** Phần vay được gán từ đợt cuối trở về trước: người dùng thấy rõ tiền tự có và tiền vay ở từng đợt. */
export function splitStages(stages: Stage[], price: number, loan: number) {
  let left = loan;
  const rows = stages.map((s) => ({ ...s, amount: (price * s.pct) / 100, loan: 0, own: 0 }));
  for (let i = rows.length - 1; i >= 0; i--) {
    const take = Math.min(left, rows[i].amount);
    rows[i].loan = take; rows[i].own = rows[i].amount - take; left -= take;
  }
  return rows;
}
