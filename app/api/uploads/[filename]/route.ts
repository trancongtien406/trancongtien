import { NextResponse } from "next/server";
import { readUploadFile } from "@/lib/uploads";

export const dynamic = "force-dynamic";
export const runtime = "nodejs";

type Props = {
  params: Promise<{ filename: string }>;
};

export async function GET(_req: Request, { params }: Props) {
  const { filename } = await params;
  const file = await readUploadFile(filename);

  if (file.status !== 200) {
    return NextResponse.json({ error: file.error }, { status: file.status });
  }

  return new NextResponse(file.body, {
    headers: {
      "Cache-Control": "no-store, max-age=0",
      "Content-Disposition": `inline; filename="${file.filename}"`,
      "Content-Type": file.contentType,
    },
  });
}
