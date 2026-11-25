import { prisma } from "@/lib/db";
import { isR2Configured } from "@/lib/storage";

export const dynamic = "force-dynamic";

export async function GET() {
  try {
    await prisma.$queryRaw`SELECT 1`;
    const storage = (await isR2Configured()) ? "r2" : "local";
    return Response.json({ ok: true, database: "up", storage });
  } catch {
    return Response.json({ ok: false, database: "down" }, { status: 503 });
  }
}
