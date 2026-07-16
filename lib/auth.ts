import { cookies } from "next/headers";
import { createHmac, timingSafeEqual } from "crypto";
import bcrypt from "bcryptjs";
import { prisma } from "@/lib/db";

const COOKIE = "tct_admin_session";

function sign(payload: string) {
  const secret = process.env.SESSION_SECRET || "dev-secret";
  return createHmac("sha256", secret).update(payload).digest("hex");
}

export async function hashPassword(password: string) {
  return bcrypt.hash(password, 10);
}

export async function verifyPassword(password: string, hash: string) {
  return bcrypt.compare(password, hash);
}

export async function createSession(userId: string) {
  const exp = Date.now() + 1000 * 60 * 60 * 24 * 7;
  const payload = `${userId}.${exp}`;
  const token = `${payload}.${sign(payload)}`;
  const jar = await cookies();
  jar.set(COOKIE, token, {
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    path: "/",
    maxAge: 60 * 60 * 24 * 7,
  });
}

export async function destroySession() {
  const jar = await cookies();
  jar.delete(COOKIE);
}

export async function getSessionUser() {
  const jar = await cookies();
  const token = jar.get(COOKIE)?.value;
  if (!token) return null;
  const [userId, exp, sig] = token.split(".");
  if (!userId || !exp || !sig) return null;
  if (Number(exp) < Date.now()) return null;
  const expected = sign(`${userId}.${exp}`);
  try {
    const a = Buffer.from(sig);
    const b = Buffer.from(expected);
    if (a.length !== b.length || !timingSafeEqual(a, b)) return null;
  } catch {
    return null;
  }
  return prisma.user.findUnique({ where: { id: userId } });
}

export async function requireAdmin() {
  const user = await getSessionUser();
  if (!user || user.role !== "ADMIN") {
    throw new Error("UNAUTHORIZED");
  }
  return user;
}

export type AdminAuthMode = "session" | "automation";

function matchesSecret(value: string, expected: string) {
  const a = Buffer.from(value, "utf8");
  const b = Buffer.from(expected, "utf8");
  return a.length === b.length && timingSafeEqual(a, b);
}

/** Allow either an interactive admin session or the server-only automation token. */
export async function requireAdminOrAutomation(req: Request) {
  const authorization = req.headers.get("authorization");
  const expected = process.env.CONTENT_AUTOMATION_TOKEN;

  if (expected && authorization?.startsWith("Bearer ")) {
    const token = authorization.slice("Bearer ".length).trim();
    if (token && matchesSecret(token, expected)) {
      const user = await prisma.user.findFirst({ where: { role: "ADMIN" } });
      if (!user) throw new Error("ADMIN_NOT_FOUND");
      return { user, mode: "automation" as const };
    }
  }

  return { user: await requireAdmin(), mode: "session" as const };
}
