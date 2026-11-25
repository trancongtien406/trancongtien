import { describe, expect, it } from "vitest";
import {
  formatPhoneForStorage,
  isValidEmail,
  isValidVnPhone,
} from "../lib/validation";

describe("validation", () => {
  it("chấp nhận email hợp lệ", () => {
    expect(isValidEmail("a@b.co")).toBe(true);
    expect(isValidEmail("bad")).toBe(false);
  });

  it("chuẩn hoá và kiểm tra SĐT Việt Nam", () => {
    expect(isValidVnPhone("0382802406")).toBe(true);
    expect(isValidVnPhone("+84382802406")).toBe(true);
    expect(isValidVnPhone("123")).toBe(false);
    expect(formatPhoneForStorage("+84382802406")).toBe("0382802406");
  });
});
