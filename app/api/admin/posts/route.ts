import { revalidatePath } from "next/cache";
import { NextResponse } from "next/server";
import { z } from "zod";
import { requireAdmin } from "@/lib/auth";
import { prisma } from "@/lib/db";

export const dynamic = "force-dynamic";

const postSchema = z.object({
  title: z.string().min(3),
  slug: z.string().min(3),
  excerpt: z.string().min(3),
  content: z.string().min(3),
  coverUrl: z.string().optional(),
  tags: z.array(z.string()).optional(),
  status: z.enum(["DRAFT", "PUBLISHED", "ARCHIVED"]).optional(),
  readTime: z.string().optional(),
  categoryId: z.string().optional().nullable(),
});

export async function GET() {
  try {
    await requireAdmin();
    const posts = await prisma.post.findMany({
      orderBy: { updatedAt: "desc" },
      include: { author: true, category: true },
    });
    return NextResponse.json({ posts });
  } catch {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
}

export async function POST(req: Request) {
  try {
    const user = await requireAdmin();
    const body = await req.json();
    const parsed = postSchema.safeParse(body);
    if (!parsed.success) {
      return NextResponse.json({ error: "Invalid" }, { status: 400 });
    }
    const d = parsed.data;
    const post = await prisma.post.create({
      data: {
        title: d.title,
        slug: d.slug,
        excerpt: d.excerpt,
        content: d.content,
        coverUrl: d.coverUrl,
        tags: JSON.stringify(d.tags || []),
        status: d.status || "DRAFT",
        readTime: d.readTime || "5 phút đọc",
        categoryId: d.categoryId || null,
        authorId: user.id,
        publishedAt: d.status === "PUBLISHED" ? new Date() : null,
      },
    });
    revalidatePath("/blog");
    revalidatePath(`/blog/${post.slug}`);
    return NextResponse.json({ post });
  } catch {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
}

export async function PUT(req: Request) {
  try {
    await requireAdmin();
    const body = await req.json();
    const id = body.id as string;
    if (!id) return NextResponse.json({ error: "Missing id" }, { status: 400 });
    const parsed = postSchema.partial().safeParse(body);
    if (!parsed.success) {
      return NextResponse.json({ error: "Invalid" }, { status: 400 });
    }
    const d = parsed.data;
    const post = await prisma.post.update({
      where: { id },
      data: {
        ...("title" in d ? { title: d.title } : {}),
        ...("slug" in d ? { slug: d.slug } : {}),
        ...("excerpt" in d ? { excerpt: d.excerpt } : {}),
        ...("content" in d ? { content: d.content } : {}),
        ...("coverUrl" in d ? { coverUrl: d.coverUrl } : {}),
        ...("tags" in d ? { tags: JSON.stringify(d.tags || []) } : {}),
        ...("status" in d ? { status: d.status } : {}),
        ...("readTime" in d ? { readTime: d.readTime } : {}),
        ...("categoryId" in d ? { categoryId: d.categoryId } : {}),
        ...(d.status === "PUBLISHED" ? { publishedAt: new Date() } : {}),
      },
    });
    revalidatePath("/blog");
    revalidatePath(`/blog/${post.slug}`);
    return NextResponse.json({ post });
  } catch {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
}

export async function DELETE(req: Request) {
  try {
    await requireAdmin();
    const { searchParams } = new URL(req.url);
    const id = searchParams.get("id");
    if (!id) return NextResponse.json({ error: "Missing id" }, { status: 400 });
    const post = await prisma.post.delete({ where: { id } });
    revalidatePath("/blog");
    return NextResponse.json({ ok: true, slug: post.slug });
  } catch {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
}
