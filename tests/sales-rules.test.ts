import { describe, expect, it } from "vitest";
import {
  isValidReferralFormat,
  normalizeReferralCode,
} from "../lib/partners/codes";
import { partnerSafeLeadStatus } from "../lib/commercial/labels";
import { computeCommissionAmount } from "../lib/commercial/money";
import { nextLeadNumber, ownershipExpiry } from "../lib/leads/helpers";

describe("đối tác & referral", () => {
  it("chuẩn hoá mã giới thiệu", () => {
    expect(normalizeReferralCode(" ctv001 ")).toBe("CTV001");
    expect(isValidReferralFormat("CTV001")).toBe(true);
    expect(isValidReferralFormat("ab")).toBe(false);
  });
});

describe("nhãn trạng thái partner", () => {
  it("dịch sang tiếng Việt", () => {
    expect(partnerSafeLeadStatus("NEW")).toBe("Mới");
    expect(partnerSafeLeadStatus("WON")).toBe("Thành công");
  });
});

describe("thương mại", () => {
  it("tính hoa hồng trên tiền thực nhận", () => {
    expect(computeCommissionAmount(10_000_000, 10)).toBe(1_000_000);
    expect(computeCommissionAmount(1_000_000, 12.5)).toBe(125_000);
  });
});

describe("lead helpers", () => {
  it("tạo lead number và hạn ownership", () => {
    const now = new Date("2026-08-13T00:00:00.000Z");
    expect(nextLeadNumber(now)).toMatch(/^LEAD-2026-[A-F0-9]{8}$/);
    const expiry = ownershipExpiry({ ownershipDays: 30 }, now);
    expect(expiry.toISOString()).toBe("2026-09-12T00:00:00.000Z");
  });
});
