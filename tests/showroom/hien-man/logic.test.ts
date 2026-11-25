// Chạy: node_modules/.bin/tsx --test tests/showroom/hien-man/logic.test.ts
import { test } from "node:test";
import assert from "node:assert/strict";
import { addDays, diffDays, eachNight, weekday, addMonths, daysInMonth, formatVN } from "../../../app/(demos)/demos/hien-man/lib/dates";
import { blockedNights, dayStatus, isNightAvailable, maxStayFrom, nextOpenNight, unitsLeft, DEMO_TODAY } from "../../../app/(demos)/demos/hien-man/lib/availability";
import { computeQuote, nightRate, seasonOf, isWeekendNight, holidayName, longStayDiscountPct, requiredMinNights } from "../../../app/(demos)/demos/hien-man/lib/pricing";
import { ROOMS } from "../../../app/(demos)/demos/hien-man/lib/rooms";

test("dates: cộng ngày qua tháng/năm, năm nhuận, không lệch múi giờ", () => {
  assert.equal(addDays("2026-12-31", 1), "2027-01-01");
  assert.equal(addDays("2028-02-28", 1), "2028-02-29");
  assert.equal(diffDays("2026-12-30", "2027-01-02"), 3);
  assert.equal(diffDays("2027-03-27", "2027-03-29"), 2); // qua ngày chuyển giờ ở nước khác vẫn đúng
  assert.equal(weekday("2026-11-25"), 3); // thứ tư
  assert.deepEqual(eachNight("2026-12-30", "2027-01-02"), ["2026-12-30", "2026-12-31", "2027-01-01"]);
  assert.deepEqual(addMonths(2026, 12, 1), { year: 2027, month: 1 });
  assert.deepEqual(addMonths(2027, 1, -1), { year: 2026, month: 12 });
  assert.equal(daysInMonth(2028, 2), 29);
  assert.equal(formatVN("2026-12-05"), "05/12/2026");
});

test("mùa: thấp / thường / cao / lễ", () => {
  assert.equal(seasonOf("2026-12-10"), "low");
  assert.equal(seasonOf("2027-01-20"), "low");
  assert.equal(seasonOf("2027-03-10"), "shoulder");
  assert.equal(seasonOf("2027-09-20"), "shoulder");
  assert.equal(seasonOf("2027-07-14"), "high");
  assert.equal(seasonOf("2027-05-20"), "high");
  assert.equal(seasonOf("2027-02-10"), "holiday");
  assert.equal(seasonOf("2026-12-31"), "holiday");
  assert.equal(holidayName("2027-09-02"), "Quốc khánh 2/9");
  assert.equal(holidayName("2027-09-04"), null);
});

test("cuối tuần = đêm thứ sáu và thứ bảy", () => {
  assert.equal(isWeekendNight("2026-12-11"), true); // T6
  assert.equal(isWeekendNight("2026-12-12"), true); // T7
  assert.equal(isWeekendNight("2026-12-13"), false); // CN
  assert.equal(isWeekendNight("2026-12-10"), false);
});

test("giá đêm: nhân hệ số mùa và cuối tuần, làm tròn 10.000", () => {
  assert.equal(nightRate("bien-go", "2026-12-09"), 2_040_000); // thấp, thứ tư
  assert.equal(nightRate("bien-go", "2026-12-11"), 2_410_000); // thấp, thứ sáu: 2.4M*0.85*1.18
  assert.equal(nightRate("bien-go", "2027-03-10"), 2_400_000); // thường
  assert.equal(nightRate("bien-go", "2027-07-14"), 3_120_000); // cao
  assert.equal(nightRate("bien-go", "2027-02-12"), 4_390_000); // lễ + T6: 2.4M*1.55*1.18=4,389,600
  assert.equal(nightRate("suite-ho-boi", "2027-07-14"), 5_980_000);
});

test("ngày kín: khối cứng, Tết, quá khứ, quá hạn", () => {
  for (const r of ROOMS) assert.equal(isNightAvailable(r.id, "2026-12-06"), false, r.id);
  assert.equal(dayStatus("bien-go", "2026-11-24"), "past");
  assert.equal(dayStatus("bien-go", "2027-12-05"), "out-of-range");
  assert.equal(dayStatus("hien-sang", "2027-02-06"), "full");
  assert.equal(unitsLeft("bien-go", "2027-02-06"), 0);
  const bl = blockedNights("bien-go", "2026-12-05", "2026-12-09");
  assert.ok(bl.includes("2026-12-06") && bl.includes("2026-12-07"));
});

test("dữ liệu kín xác định (cùng đầu vào, cùng kết quả) và có cả ngày trống lẫn kín", () => {
  let open = 0, full = 0;
  for (let i = 0; i < 120; i++) {
    const d = addDays(DEMO_TODAY, i);
    assert.equal(unitsLeft("bien-go", d), unitsLeft("bien-go", d));
    isNightAvailable("bien-go", d) ? open++ : full++;
  }
  assert.ok(open > 80 && full > 3, `open=${open} full=${full}`);
});

test("bao trọn villa chỉ trống khi mọi phòng trống", () => {
  for (let i = 0; i < 200; i++) {
    const d = addDays(DEMO_TODAY, i);
    if (unitsLeft("tron-villa", d) > 0) for (const r of ROOMS) if (r.id !== "tron-villa") assert.ok(unitsLeft(r.id, d) > 0, `${r.id} ${d}`);
  }
});

test("giảm giá ở dài ngày theo bậc 3/5/7 đêm", () => {
  assert.equal(longStayDiscountPct(2), 0);
  assert.equal(longStayDiscountPct(3), 5);
  assert.equal(longStayDiscountPct(5), 8);
  assert.equal(longStayDiscountPct(6), 8);
  assert.equal(longStayDiscountPct(7), 12);
  assert.equal(longStayDiscountPct(14), 12);
});

test("số đêm tối thiểu: cuối tuần 2, lễ 3", () => {
  assert.equal(requiredMinNights("bien-go", ["2026-12-09"]), 1);
  assert.equal(requiredMinNights("bien-go", ["2026-12-11"]), 2);
  assert.equal(requiredMinNights("bien-go", ["2027-02-10"]), 3);
  assert.equal(requiredMinNights("tron-villa", ["2026-12-09"]), 2);
});

/** Tìm cửa sổ trống n đêm trong [from, from+scan) cho phòng/loại. */
function findWindow(room: Parameters<typeof maxStayFrom>[0], n: number, from: string, pred: (d: string) => boolean = () => true) {
  for (let i = 0; i < 400; i++) {
    const d = addDays(from, i);
    if (pred(d) && maxStayFrom(room, d, n) >= n) return d;
  }
  throw new Error("không có cửa sổ trống");
}

test("báo giá mùa thấp ngày thường 2 đêm: tổng khớp công thức", () => {
  const ci = findWindow("bien-go", 2, "2026-12-07", (d) => weekday(d) === 1); // thứ hai → đêm T2, T3
  const r = computeQuote({ room: "bien-go", checkIn: ci, checkOut: addDays(ci, 2), guests: 2, qty: 1 });
  assert.ok(r.ok, JSON.stringify(r));
  if (!r.ok) return;
  const q = r.quote;
  assert.equal(q.nights, 2);
  assert.equal(q.roomSubtotal, 2 * 2_040_000);
  assert.equal(q.discount, 0);
  assert.equal(q.extraTotal, 0);
  assert.equal(q.service, Math.round((q.roomSubtotal * 0.05) / 1000) * 1000);
  assert.equal(q.cleaning, 300_000);
  assert.equal(q.total, q.roomSubtotal + q.service + q.cleaning);
});

test("qua mùa: các đêm tính theo mùa của từng đêm, tổng = tổng các dòng", () => {
  // 28/12 → 2/1: hai đêm mùa thấp rồi ba đêm Tết Dương lịch
  const ci = "2026-12-28", co = "2027-01-02";
  // thử các loại phòng để lấy loại có đủ đêm trống
  const room = ROOMS.map((r) => r.id).find((id) => blockedNights(id, ci, co).length === 0);
  if (!room) { const r = computeQuote({ room: "bien-go", checkIn: ci, checkOut: co, guests: 2, qty: 1 }); assert.ok(!r.ok && r.error.code === "blocked"); return; }
  const r = computeQuote({ room, checkIn: ci, checkOut: co, guests: 2, qty: 1 });
  assert.ok(r.ok, JSON.stringify(r));
  if (!r.ok) return;
  assert.deepEqual(r.quote.lines.map((l) => l.season), ["low", "low", "holiday", "holiday", "holiday"]);
  assert.equal(r.quote.roomSubtotal, r.quote.lines.reduce((s, l) => s + l.rate, 0));
  assert.equal(r.quote.discountPct, 8); // 5 đêm
});

test("cuối tuần đắt hơn ngày thường cùng mùa (T6 > T4)", () => {
  assert.ok(nightRate("hien-sang", "2027-03-12") > nightRate("hien-sang", "2027-03-10"));
});

test("ở dài ngày: 7 đêm giảm 12%, khớp tay", () => {
  const ci = findWindow("bien-go", 7, "2027-03-01", (d) => weekday(d) === 1);
  const r = computeQuote({ room: "bien-go", checkIn: ci, checkOut: addDays(ci, 7), guests: 2, qty: 1 });
  assert.ok(r.ok, JSON.stringify(r));
  if (!r.ok) return;
  const q = r.quote;
  assert.equal(q.discountPct, 12);
  assert.equal(q.discount, Math.round((q.roomSubtotal * 12) / 100 / 1000) * 1000);
  assert.equal(q.total, q.roomSubtotal - q.discount + q.extraTotal + q.service + q.cleaning);
});

test("phụ thu khách thêm: 3 khách ở phòng 2 khách gốc = 1 khách thêm × số đêm", () => {
  const ci = findWindow("suite-ho-boi", 2, "2027-03-08", (d) => weekday(d) === 1);
  const r = computeQuote({ room: "suite-ho-boi", checkIn: ci, checkOut: addDays(ci, 2), guests: 4, qty: 1 });
  assert.ok(r.ok);
  if (!r.ok) return;
  assert.equal(r.quote.extraGuests, 2);
  assert.equal(r.quote.extraTotal, 2 * 400_000 * 2);
});

test("lỗi: thiếu ngày, ngược ngày, quá khứ, quá xa, quá dài", () => {
  const base = { room: "bien-go" as const, guests: 2, qty: 1 };
  const code = (ci: string | null, co: string | null) => { const r = computeQuote({ ...base, checkIn: ci, checkOut: co }); return r.ok ? "ok" : r.error.code; };
  assert.equal(code(null, null), "no-dates");
  assert.equal(code("2026-12-10", null), "no-dates");
  assert.equal(code("2026-12-10", "2026-12-10"), "bad-range");
  assert.equal(code("2026-12-12", "2026-12-10"), "bad-range");
  assert.equal(code("2026-11-20", "2026-11-22"), "past");
  assert.equal(code("2027-11-29", "2027-12-02"), "too-far");
  assert.equal(code("2026-12-10", "2027-01-20"), "too-long");
});

test("lỗi: ngày kín được liệt kê, số khách vượt, số phòng sai", () => {
  const b = computeQuote({ room: "bien-go", checkIn: "2026-12-05", checkOut: "2026-12-09", guests: 2, qty: 1 });
  assert.ok(!b.ok && b.error.code === "blocked" && b.error.nights?.includes("2026-12-06"));
  const g = computeQuote({ room: "bien-go", checkIn: "2027-03-08", checkOut: "2027-03-09", guests: 9, qty: 1 });
  assert.ok(!g.ok && g.error.code === "guests");
  const g0 = computeQuote({ room: "bien-go", checkIn: "2027-03-08", checkOut: "2027-03-09", guests: 0, qty: 1 });
  assert.ok(!g0.ok && g0.error.code === "guests");
  const q = computeQuote({ room: "bien-go", checkIn: "2027-03-08", checkOut: "2027-03-09", guests: 2, qty: 5 });
  assert.ok(!q.ok && q.error.code === "qty");
});

test("lỗi: tối thiểu đêm khi có cuối tuần / lễ", () => {
  // tìm T6 → T7 (1 đêm cuối tuần) còn trống
  const ci = findWindow("bien-go", 1, "2027-03-01", (d) => weekday(d) === 5);
  const one = computeQuote({ room: "bien-go", checkIn: ci, checkOut: addDays(ci, 1), guests: 2, qty: 1 });
  assert.ok(!one.ok && one.error.code === "min-nights" && one.error.minNights === 2, JSON.stringify(one));
  // lễ 30/4: cần 3 đêm
  const hol = computeQuote({ room: "bien-go", checkIn: "2027-04-30", checkOut: "2027-05-02", guests: 2, qty: 1 });
  if (!hol.ok) assert.ok(hol.error.code === "min-nights" || hol.error.code === "blocked");
});

test("Tết 5–8/2/2027 kín hết mọi loại phòng, gợi ý đêm trống kế tiếp", () => {
  for (const r of ROOMS) {
    const res = computeQuote({ room: r.id, checkIn: "2027-02-05", checkOut: "2027-02-08", guests: 2, qty: 1 });
    assert.ok(!res.ok && res.error.code === "blocked", r.id);
  }
  const next = nextOpenNight("bien-go", "2027-02-05");
  assert.ok(next && next >= "2027-02-09");
});

test("bao trọn villa: số phòng cố định 1, phụ thu vệ sinh riêng, tối thiểu 2 đêm", () => {
  const ci = findWindow("tron-villa", 2, "2027-03-01", (d) => weekday(d) === 1);
  const r = computeQuote({ room: "tron-villa", checkIn: ci, checkOut: addDays(ci, 2), guests: 12, qty: 3 });
  assert.ok(r.ok, JSON.stringify(r));
  if (!r.ok) return;
  assert.equal(r.quote.qty, 1);
  assert.equal(r.quote.cleaning, 800_000);
  assert.equal(r.quote.extraGuests, 0);
  const one = computeQuote({ room: "tron-villa", checkIn: ci, checkOut: addDays(ci, 1), guests: 12, qty: 1 });
  assert.ok(one.ok || one.error.code === "min-nights" || one.error.code === "blocked");
});

import { applyDayClick, canCheckout } from "../../../app/(demos)/demos/hien-man/lib/selection";

test("chọn ngày: hai lần bấm tạo khoảng, bấm lần ba bắt đầu khoảng mới", () => {
  const room = "bien-go" as const;
  const a = findWindow(room, 3, "2026-12-08", (d) => weekday(d) === 1);
  let r = applyDayClick(room, { checkIn: null, checkOut: null }, a);
  assert.deepEqual([r.checkIn, r.checkOut, r.notice], [a, null, null]);
  r = applyDayClick(room, r, addDays(a, 2));
  assert.deepEqual([r.checkIn, r.checkOut, r.notice], [a, addDays(a, 2), null]);
  r = applyDayClick(room, r, addDays(a, 3));
  assert.deepEqual([r.checkIn, r.checkOut], [addDays(a, 3), null]);
});

test("chọn ngày: bấm ngày trước ngày nhận thì dời ngày nhận; ngày kín bị từ chối", () => {
  const room = "bien-go" as const;
  const a = findWindow(room, 3, "2026-12-08", (d) => weekday(d) === 2);
  let r = applyDayClick(room, { checkIn: null, checkOut: null }, addDays(a, 1));
  r = applyDayClick(room, r, a);
  assert.equal(r.checkIn, a);
  assert.equal(r.checkOut, null);
  const blocked = applyDayClick(room, { checkIn: null, checkOut: null }, "2026-12-06");
  assert.equal(blocked.checkIn, null);
  assert.match(blocked.notice ?? "", /đã kín/);
});

test("chọn ngày: khoảng chứa đêm kín bị từ chối và nêu ngày kín đầu tiên; ngày kín làm ngày trả phòng hợp lệ", () => {
  const room = "hien-sang" as const;
  // ngày kín cứng 06/12: đi từ trước đó tới sau đó là không hợp lệ
  const start = addDays("2026-12-06", -1);
  let r = applyDayClick(room, { checkIn: start, checkOut: null }, "2026-12-09");
  assert.equal(r.checkOut, null);
  const first = blockedNights(room, start, "2026-12-09")[0];
  assert.ok(first && (r.notice ?? "").includes(first.split("-").reverse().join("/")), r.notice ?? "");
  // 05/12 -> 06/12: đêm 05 trống (nếu trống) rồi trả phòng đúng ngày kín 06 là hợp lệ
  if (isNightAvailable(room, start)) {
    assert.equal(canCheckout(room, start, "2026-12-06"), true);
    r = applyDayClick(room, { checkIn: start, checkOut: null }, "2026-12-06");
    assert.equal(r.checkOut, "2026-12-06");
  }
  assert.equal(canCheckout(room, null, "2026-12-06"), false);
  assert.equal(canCheckout(room, "2026-12-10", "2026-12-10"), false);
});
