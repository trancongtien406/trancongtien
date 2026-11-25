import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import {
  EST_COOKIE,
  getNextStep,
  parseEstCookie,
} from "@/lib/estimator";

export const dynamic = "force-dynamic";

function tokenFromCookie(publicId: string) {
  return cookies().then((jar) => {
    const parsed = parseEstCookie(jar.get(EST_COOKIE)?.value);
    return parsed?.publicId === publicId ? parsed.token : undefined;
  });
}

export async function GET(
  _request: Request,
  context: { params: Promise<{ id: string }> },
) {
  try {
    const { id } = await context.params;
    const token = await tokenFromCookie(id);
    const step = await getNextStep(id, token);
    return NextResponse.json(step);
  } catch (error) {
    const message = error instanceof Error ? error.message : "ERROR";
    if (message === "NOT_FOUND") {
      return NextResponse.json({ error: "Không tìm thấy phiên" }, { status: 404 });
    }
    console.error("[estimator/next]", error);
    return NextResponse.json({ error: "Lỗi tải bước tiếp theo" }, { status: 500 });
  }
}
