import { describe, expect, it } from "vitest";
import {
  buildPartnerShortLink,
  buildPartnerTrackLink,
} from "../lib/partners/track";
import { signPayosPaymentRequest } from "../lib/payments/payos-sign";

describe("track link đối tác", () => {
  it("gắn ref và UTM", () => {
    const url = buildPartnerTrackLink({
      path: "/solutions/spa",
      code: "ctv001",
      origin: "https://trancongtien.com",
    });
    expect(url).toContain("ref=CTV001");
    expect(url).toContain("utm_source=partner");
    expect(url).toContain("/solutions/spa");
    expect(buildPartnerShortLink("ctv001", "https://trancongtien.com")).toBe(
      "https://trancongtien.com/r/CTV001",
    );
  });
});

describe("PayOS signature", () => {
  it("ký request tạo link theo alphabet", () => {
    const sig = signPayosPaymentRequest("checksum", {
      amount: 10000,
      cancelUrl: "https://example.com/huy",
      description: "LEAD-TEST",
      orderCode: 123,
      returnUrl: "https://example.com/ok",
    });
    expect(sig).toMatch(/^[a-f0-9]{64}$/);
  });
});
