import { revalidatePath } from "next/cache";
import { NextResponse } from "next/server";
import { z } from "zod";
import { requireAdmin } from "@/lib/auth";
import { prisma } from "@/lib/db";
import { toSlug } from "@/lib/admin/slug";

export const dynamic = "force-dynamic";

const schema = z.object({
  id: z.string().optional(),
  title: z.string().trim().min(2).max(200),
  slug: z.string().trim().max(200).optional(),
  category: z.string().trim().max(80).optional(),
  description: z.string().trim().max(2000).optional(),
  body: z.string().trim().max(50_000).optional(),
  fileUrl: z.string().trim().max(1000).optional().nullable(),
  partnerVisible: z.boolean().optional(),
  status: z.enum(["DRAFT", "PUBLISHED", "ARCHIVED"]),
  sortOrder: z.coerce.number().int().optional(),
});

const deleteSchema = z.object({
  action: z.literal("delete"),
  id: z.string().min(1),
});

export async function POST(request: Request) {
  try {
    await requireAdmin();
    const body = await request.json();

    if (body?.action === "delete") {
      const parsed = deleteSchema.safeParse(body);
      if (!parsed.success) {
        return NextResponse.json(
          { error: parsed.error.issues[0]?.message },
          { status: 400 },
        );
      }
      await prisma.salesResource.delete({ where: { id: parsed.data.id } });
      revalidatePath("/admin/sales-resources");
      return NextResponse.json({ ok: true });
    }

    const parsed = schema.safeParse(body);
    if (!parsed.success) {
      return NextResponse.json(
        { error: parsed.error.issues[0]?.message },
        { status: 400 },
      );
    }

    const data = parsed.data;
    const title = data.title;
    const payload = {
      title,
      slug: data.slug?.trim() || toSlug(title),
      category: data.category || "POLICY",
      description: data.description || "",
      body: data.body || "",
      fileUrl: data.fileUrl || null,
      partnerVisible: data.partnerVisible ?? false,
      status: data.status,
      sortOrder: data.sortOrder ?? 0,
    };

    const item = data.id
      ? await prisma.salesResource.update({
          where: { id: data.id },
          data: payload,
        })
      : await prisma.salesResource.create({ data: payload });

    revalidatePath("/admin/sales-resources");
    return NextResponse.json({ ok: true, item });
  } catch (error) {
    const unauthorized =
      error instanceof Error && error.message === "UNAUTHORIZED";
    return NextResponse.json(
      {
        error: unauthorized
          ? "Unauthorized"
          : "Không thể lưu tài nguyên bán hàng (slug có thể trùng)",
      },
      { status: unauthorized ? 401 : 500 },
    );
  }
}
