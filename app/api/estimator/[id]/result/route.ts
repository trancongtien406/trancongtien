import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import { EST_COOKIE, getLatestPublicResult, parseEstCookie } from "@/lib/estimator";

export const dynamic = "force-dynamic";

export async function GET(
  _request: Request,
  context: { params: Promise<{ id: string }> },
) {
  try {
    const { id } = await context.params;
    const jar = await cookies();
    const parsed = parseEstCookie(jar.get(EST_COOKIE)?.value);
    const token = parsed?.publicId === id ? parsed.token : undefined;
    const result = await getLatestPublicResult(id, token);
    if (!result) {
      return NextResponse.json({ result: null, session: { publicId: id } });
    }
    return NextResponse.json({
      result: { ...result, shareCode: undefined },
    });
  } catch (error) {
    console.error("[estimator/result]", error);
    return NextResponse.json({ error: "Lỗi tải kết quả" }, { status: 500 });
  }
}
