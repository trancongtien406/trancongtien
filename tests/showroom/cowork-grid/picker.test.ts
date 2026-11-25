import { describe, expect, it } from "vitest";
import { BLOCKS, highlightSeats, monthlyDaysOf, pick, privateRooms, summaryText } from "@/app/(demos)/demos/cowork-grid/lib/picker";
import { HOURS_MAX, HOURS_MIN, SEATS, countsFor, stateOf, vnNow, cellOf } from "@/app/(demos)/demos/cowork-grid/lib/seatmap";

const base = { people: 3, days: 5, kind: "fixed" as const, block: "full" as const };

describe("sơ đồ", () => {
  it("40 hot desk, 16 bàn cố định, 2 phòng họp, 4 phòng riêng, id duy nhất", () => {
    const by = (k: string) => SEATS.filter((s) => s.kind === k).length;
    expect([by("hot"), by("fixed"), by("meeting"), by("private")]).toEqual([40, 16, 2, 4]);
    expect(new Set(SEATS.map((s) => s.id)).size).toBe(SEATS.length);
  });
  it("trạng thái xác định và đổi theo giờ", () => {
    const a = SEATS.map((s) => stateOf(s, 1, 10)).join("");
    expect(a).toBe(SEATS.map((s) => stateOf(s, 1, 10)).join(""));
    const b = SEATS.map((s) => stateOf(s, 1, 20)).join("");
    expect(a).not.toBe(b);
  });
  it("mật độ giờ cao điểm lớn hơn tối và cuối tuần", () => {
    const busy = (d: number, h: number) => countsFor("A", d, h).busy;
    expect(busy(2, 10)).toBeGreaterThan(busy(2, 20));
    expect(busy(2, 10)).toBeGreaterThan(busy(6, 10));
  });
  it("khu B luôn có tối thiểu 4 bàn trống để thuê", () => {
    for (let d = 0; d < 7; d++) for (let h = HOURS_MIN; h <= HOURS_MAX; h++) expect(SEATS.filter((s) => s.kind === "fixed" && stateOf(s, d, h) === "free").length).toBeGreaterThanOrEqual(4);
  });
  it("giờ Việt Nam UTC+7", () => {
    expect(vnNow(new Date("2026-11-25T17:30:00Z"))).toMatchObject({ day: 3, hour: 0, minute: 30 }); // 26/11 là thứ năm
    expect(cellOf(40, 40)).toBe("A1");
  });
});

describe("gói gợi ý", () => {
  it("luôn trả đúng 3 gói và có gói gợi ý nằm trong danh sách", () => {
    for (const kind of ["hot", "fixed", "meeting", "private"] as const)
      for (const people of [1, 3, 6, 9, 20]) {
        const r = pick({ people, days: 3, kind, block: "afternoon" });
        expect(r.plans).toHaveLength(3);
        expect(r.plans.map((p) => p.id)).toContain(r.recommended.id);
        expect(r.recommended.monthly).toBeGreaterThan(0);
      }
  });
  it("hot desk: ít ngày chọn gói lẻ, nhiều ngày chọn gói không giới hạn", () => {
    expect(pick({ people: 1, days: 1, kind: "hot", block: "full" }).recommended.id).toBe("hot-pass");
    expect(pick({ people: 1, days: 7, kind: "hot", block: "full" }).recommended.id).toBe("hot-unlimited");
  });
  it("bàn cố định theo số người", () => {
    const r = pick(base);
    expect(r.recommended.id).toBe("fixed");
    expect(r.recommended.monthly).toBe(3 * 2_790_000);
  });
  it("phòng riêng chọn phòng nhỏ nhất đủ chỗ và ghép khi trên 8", () => {
    expect(privateRooms(3).rooms).toEqual([4]);
    expect(privateRooms(8).rooms).toEqual([8]);
    expect(privateRooms(11).rooms).toEqual([8, 4]);
  });
  it("phòng họp trên 10 người báo lỗi", () => {
    const r = pick({ people: 12, days: 2, kind: "meeting", block: "morning" });
    expect(r.error).toMatch(/10 người/);
    expect(r.recommended.kind).toBe("private");
  });
  it("kẹp đầu vào ngoài khoảng", () => {
    const r = pick({ people: 999, days: 99, kind: "hot", block: "full" });
    expect(r.input.people).toBe(20);
    expect(r.input.days).toBe(7);
    expect(monthlyDaysOf(0)).toBe(monthlyDaysOf(1));
  });
});

describe("tô sáng chỗ", () => {
  it("không quá số người và các chỗ đều trống cả khung giờ", () => {
    const h = highlightSeats(base, "fixed", 1);
    expect(h.ids.length).toBeLessThanOrEqual(3);
    const b = BLOCKS.find((x) => x.id === "full")!;
    for (const id of h.ids) for (let hr = b.from; hr < b.to; hr++) expect(stateOf(SEATS.find((s) => s.id === id)!, 1, hr)).toBe("free");
  });
  it("phòng riêng cho 5 người chọn P-3 nếu trống, hoặc báo thiếu", () => {
    const h = highlightSeats({ ...base, people: 5, kind: "private" }, "private", 1);
    expect(h.ids.length === 1 ? ["P-4"].includes(h.ids[0]) : h.shortage > 0).toBe(true);
  });
  it("tóm tắt có đủ thông tin", () => {
    const r = pick(base);
    const t = summaryText(r, "Thứ ba", ["B-13"]);
    expect(t).toContain("Số người: 3");
    expect(t).toContain("B-13");
    expect(t).not.toMatch(/demo|minh hoạ|giả định|mô phỏng|dữ liệu mẫu/i);
  });
});
