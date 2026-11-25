import { describe, expect, it } from "vitest";
import { enumLabel, PARTNER_TYPE_OPTIONS } from "../lib/enums";

describe("enum labels", () => {
  it("map key sang nhãn tiếng Việt", () => {
    expect(enumLabel("REFERRAL")).toBe("Giới thiệu (Referral)");
    expect(enumLabel("APPROVED")).toBe("Đã duyệt");
    expect(enumLabel("RECEIVED")).toBe("Đã nhận");
    expect(enumLabel("UNKNOWN_X", "Khác")).toBe("Khác");
  });

  it("partner type options có value/label", () => {
    expect(PARTNER_TYPE_OPTIONS[0]).toEqual({
      value: "REFERRAL",
      label: "Giới thiệu (Referral)",
    });
  });
});
