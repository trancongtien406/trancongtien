import { cookies } from "next/headers";
import { createHmac, timingSafeEqual } from "crypto";
import { prisma } from "@/lib/db";

const COOKIE = "tct_partner_session";

function sign(payload: string) {
  const secret = process.env.SESSION_SECRET;
  if (!secret && process.env.NODE_ENV === "production") {
    throw new Error("SESSION_SECRET is required in production");
  }
  return createHmac("sha256", secret || "development-only-secret")
    .update(payload)
    .digest("hex");
}

export async function createPartnerSession(partnerId: string) {
  const exp = Date.now() + 1000 * 60 * 60 * 24 * 14;
  const payload = `${partnerId}.${exp}`;
  const token = `${payload}.${sign(payload)}`;
  const jar = await cookies();
  jar.set(COOKIE, token, {
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    path: "/",
    maxAge: 60 * 60 * 24 * 14,
  });
}

export async function destroyPartnerSession() {
  const jar = await cookies();
  jar.delete(COOKIE);
}

export async function getSessionPartner() {
  const jar = await cookies();
  const token = jar.get(COOKIE)?.value;
  if (!token) return null;
  const [partnerId, exp, sig] = token.split(".");
  if (!partnerId || !exp || !sig) return null;
  if (Number(exp) < Date.now()) return null;
  const expected = sign(`${partnerId}.${exp}`);
  try {
    const a = Buffer.from(sig);
    const b = Buffer.from(expected);
    if (a.length !== b.length || !timingSafeEqual(a, b)) return null;
  } catch {
    return null;
  }
  return prisma.partner.findFirst({
    where: { id: partnerId, status: "APPROVED" },
  });
}

export async function requirePartner() {
  const partner = await getSessionPartner();
  if (!partner) throw new Error("UNAUTHORIZED");
  return partner;
}

export async function loginPartner(code: string, email: string) {
  const partner = await prisma.partner.findFirst({
    where: {
      code: code.trim().toUpperCase(),
      email: email.trim().toLowerCase(),
      status: "APPROVED",
    },
  });
  if (!partner) return null;
  await createPartnerSession(partner.id);
  return partner;
}
