import { NextResponse, type NextRequest } from "next/server";
import {
  isValidReferralFormat,
  normalizeReferralCode,
  REF_COOKIE,
  resolveApprovedPartner,
} from "@/lib/partners";

export async function proxy(request: NextRequest) {
  const response = NextResponse.next();
  const raw = request.nextUrl.searchParams.get("ref");
  const referralCode = normalizeReferralCode(raw);
  if (!referralCode || !isValidReferralFormat(referralCode)) {
    return response;
  }

  // Validate APPROVED partner before setting first-party cookie.
  try {
    const partner = await resolveApprovedPartner(referralCode);
    if (!partner) return response;
  } catch {
    // DB unavailable — skip cookie rather than trusting unverified code.
    return response;
  }

  response.cookies.set(REF_COOKIE, referralCode, {
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    path: "/",
    maxAge: 60 * 60 * 24 * 30,
  });
  return response;
}

export const config = {
  matcher: ["/((?!api|admin|_next/static|_next/image|favicon.ico|.*\\..*).*)"],
};
