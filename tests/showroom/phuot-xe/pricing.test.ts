import { describe, expect, it } from "vitest";
import { BIKES, ACCESSORIES, DELIVERIES, INSURANCES, MAX_DAYS } from "@/app/(demos)/demos/phuot-xe/data/fleet";
import { buildQuote, isValidDays, quoteSummary, rentalCost, vnd } from "@/app/(demos)/demos/phuot-xe/lib/pricing";

const base = { bikeId: "so-110", days: 1, deliveryId: "tai-cua-hang", accessoryIds: [] as string[], insuranceId: "co-ban" };

describe("dữ liệu xe", () => {
  it("có 6 đến 8 mẫu, đủ 3 loại", () => {
    expect(BIKES.length).toBeGreaterThanOrEqual(6);
    expect(BIKES.length).toBeLessThanOrEqual(8);
    expect(new Set(BIKES.map((b) => b.cls))).toEqual(new Set(["so", "ga", "con"]));
  });
  it("giá tuần luôn rẻ hơn 7 ngày lẻ nhưng đắt hơn 4 ngày", () => {
    for (const b of BIKES) {
      expect(b.perWeek).toBeLessThan(b.perDay * 7);
      expect(b.perWeek).toBeGreaterThan(b.perDay * 4);
    }
  });
  it("id duy nhất", () => {
    const ids = [...BIKES, ...ACCESSORIES, ...DELIVERIES, ...INSURANCES].map((x) => x.id);
    expect(new Set(ids).size).toBe(ids.length);
  });
});

describe("rentalCost", () => {
  it("1 ngày = giá ngày", () => expect(rentalCost(130000, 750000, 1).amount).toBe(130000));
  it("7 ngày = giá tuần", () => expect(rentalCost(130000, 750000, 7)).toMatchObject({ weeks: 1, extraDays: 0, amount: 750000 }));
  it("6 ngày lẻ bị giới hạn bằng giá tuần", () => {
    const c = rentalCost(130000, 750000, 6);
    expect(c.capped).toBe(true);
    expect(c.amount).toBe(750000);
  });
  it("5 ngày chưa chạm trần", () => expect(rentalCost(130000, 750000, 5)).toMatchObject({ capped: false, amount: 650000 }));
  it("10 ngày = 1 tuần + 3 ngày lẻ", () => expect(rentalCost(130000, 750000, 10).amount).toBe(750000 + 390000));
  it("14 ngày = 2 tuần", () => expect(rentalCost(130000, 750000, 14).amount).toBe(1500000));
  it("không bao giờ đắt hơn tính hoàn toàn theo ngày, và đơn điệu tăng theo số ngày", () => {
    for (const b of BIKES) {
      let prev = 0;
      for (let d = 1; d <= MAX_DAYS; d++) {
        const c = rentalCost(b.perDay, b.perWeek, d);
        expect(c.amount).toBeLessThanOrEqual(c.byDay);
        expect(c.amount).toBeGreaterThanOrEqual(prev);
        prev = c.amount;
      }
    }
  });
});

describe("buildQuote", () => {
  it("lỗi khi chưa chọn xe", () => {
    const q = buildQuote({ ...base, bikeId: null });
    expect(q).toMatchObject({ ok: false, error: "no-bike" });
  });
  it("lỗi số ngày không hợp lệ", () => {
    for (const d of [0, -1, 1.5, Number.NaN, MAX_DAYS + 1]) expect(buildQuote({ ...base, days: d })).toMatchObject({ ok: false, error: "bad-days" });
    expect(isValidDays(MAX_DAYS)).toBe(true);
  });
  it("lỗi lựa chọn lạ", () => {
    expect(buildQuote({ ...base, deliveryId: "x" })).toMatchObject({ ok: false, error: "unknown" });
    expect(buildQuote({ ...base, insuranceId: "x" })).toMatchObject({ ok: false, error: "unknown" });
  });
  it("tổng bằng tổng các dòng, mỗi dòng có chi tiết", () => {
    const q = buildQuote({ ...base, bikeId: "ga-155", days: 9, deliveryId: "giao-2-chieu", accessoryIds: ["mu-2", "ao-mua", "mu-2", "khong-co"], insuranceId: "yen-tam" });
    if (!q.ok) throw new Error("phải ok");
    expect(q.lines.reduce((s, l) => s + l.amount, 0)).toBe(q.total);
    // 1 tuần (1.650.000) + 2 ngày lẻ (560.000) + giao 90.000 + mũ 9×15.000 + áo mưa 20.000 + bảo hiểm 9×30.000
    expect(q.total).toBe(1650000 + 560000 + 90000 + 135000 + 20000 + 270000);
    expect(q.lines.filter((l) => l.key.startsWith("acc-"))).toHaveLength(2);
    expect(q.deposit).toBe(4000000);
    expect(q.lines.every((l) => l.detail.length > 0 && Number.isInteger(l.amount))).toBe(true);
  });
  it("tiết kiệm so với tính theo ngày", () => {
    const q = buildQuote({ ...base, days: 7 });
    if (!q.ok) throw new Error("phải ok");
    expect(q.saving).toBe(130000 * 7 - 750000);
    expect(q.perDayAverage).toBe(Math.round(750000 / 7));
  });
  it("bản tóm tắt có tên xe, tổng, tiền cọc và ghi chú giá tham khảo", () => {
    const q = buildQuote({ ...base, days: 3 });
    if (!q.ok) throw new Error("phải ok");
    const t = quoteSummary(q);
    expect(t).toContain("Số 110 Gọn");
    expect(t).toContain(vnd(q.total));
    expect(t).toContain(vnd(q.deposit));
    expect(t).toContain("Giá tham khảo");
  });
});
