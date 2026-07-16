import { revalidatePath } from "next/cache";
import { NextResponse } from "next/server";
import { z } from "zod";
import { requireAdmin, requireAdminOrAutomation } from "@/lib/auth";
import { prisma } from "@/lib/db";
import { notifyAdmin } from "@/lib/notify";
import { siteConfig } from "@/lib/site";

export const dynamic = "force-dynamic";

const postSchema = z.object({
  title: z.string().min(3),
  slug: z.string().min(3),
  excerpt: z.string().min(3),
  content: z.string().min(3),
  coverUrl: z.string().optional().nullable(),
  coverMediaId: z.string().optional().nullable(),
  coverAlt: z.string().optional(),
  tags: z.array(z.string()).optional(),
  status: z.enum(["DRAFT", "PUBLISHED", "ARCHIVED"]).optional(),
  readTime: z.string().optional(),
  categoryId: z.string().optional().nullable(),
  categorySlug: z.string().optional().nullable(),
});

function adminPostHref(postId: string) {
  return `/admin/posts/${postId}`;
}

function absoluteAdminUrl(path: string) {
  return `${siteConfig.url.replace(/\/$/, "")}${path}`;
}

function escapeHtml(value: string) {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;");
}

function automationDraftEmailHtml(input: {
  title: string;
  category: string;
  href: string;
}) {
  const url = absoluteAdminUrl(input.href);
  return `<p>Bản nháp mới: <strong>${escapeHtml(input.title)}</strong></p>
<p>Danh mục: ${escapeHtml(input.category)}</p>
<p><a href="${escapeHtml(url)}">Mở chi tiết bài viết trong admin</a></p>`;
}

async function resolveCategoryId(input: {
  categoryId?: string | null;
  categorySlug?: string | null;
  requireCategory: boolean;
}) {
  if (input.categoryId) {
    const byId = await prisma.category.findUnique({
      where: { id: input.categoryId },
      select: { id: true },
    });
    if (!byId) {
      throw new Error("CATEGORY_NOT_FOUND");
    }
    return byId.id;
  }

  if (input.categorySlug) {
    const bySlug = await prisma.category.findUnique({
      where: { slug: input.categorySlug },
      select: { id: true },
    });
    if (!bySlug) {
      throw new Error("CATEGORY_NOT_FOUND");
    }
    return bySlug.id;
  }

  if (input.requireCategory) {
    throw new Error("CATEGORY_REQUIRED");
  }

  return null;
}

async function resolveCoverUrl(input: {
  coverUrl?: string | null;
  coverMediaId?: string | null;
}) {
  if (input.coverMediaId) {
    const media = await prisma.media.findUnique({
      where: { id: input.coverMediaId },
      select: { url: true, alt: true },
    });
    if (!media?.url) {
      throw new Error("MEDIA_NOT_FOUND");
    }
    return { coverUrl: media.url, coverAltFromMedia: media.alt };
  }

  if (input.coverUrl) {
    let url = input.coverUrl.trim();
    if (url.startsWith(`${siteConfig.url}/api/uploads/`)) {
      url = url.slice(siteConfig.url.length);
    }
    if (!url.startsWith("/api/uploads/") && !url.startsWith("/images/")) {
      throw new Error("INVALID_COVER_URL");
    }
    return { coverUrl: url, coverAltFromMedia: null as string | null };
  }

  return { coverUrl: null as string | null, coverAltFromMedia: null as string | null };
}

function errorResponse(error: unknown) {
  const message = error instanceof Error ? error.message : "Unknown";
  if (message === "UNAUTHORIZED" || message === "ADMIN_NOT_FOUND") {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  if (message === "CATEGORY_REQUIRED") {
    return NextResponse.json(
      {
        error:
          "categoryId hoặc categorySlug là bắt buộc. Gọi GET /api/admin/categories trước.",
      },
      { status: 400 },
    );
  }
  if (message === "CATEGORY_NOT_FOUND") {
    return NextResponse.json({ error: "Danh mục không tồn tại" }, { status: 400 });
  }
  if (message === "MEDIA_NOT_FOUND") {
    return NextResponse.json({ error: "coverMediaId không tồn tại" }, { status: 400 });
  }
  if (message === "INVALID_COVER_URL") {
    return NextResponse.json(
      {
        error:
          "coverUrl phải là /api/uploads/... từ upload API, không dùng URL OpenAI/DALL-E.",
      },
      { status: 400 },
    );
  }
  console.error("[admin/posts]", error);
  return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
}

export async function GET(req: Request) {
  try {
    await requireAdminOrAutomation(req);
    const posts = await prisma.post.findMany({
      orderBy: { updatedAt: "desc" },
      include: { author: true, category: true },
    });
    return NextResponse.json({ posts });
  } catch (error) {
    return errorResponse(error);
  }
}

export async function POST(req: Request) {
  try {
    const { user, mode } = await requireAdminOrAutomation(req);
    const body = await req.json();
    const parsed = postSchema.safeParse(body);
    if (!parsed.success) {
      return NextResponse.json({ error: "Invalid" }, { status: 400 });
    }
    const d = parsed.data;
    const status = mode === "automation" ? "DRAFT" : d.status || "DRAFT";
    const categoryId = await resolveCategoryId({
      categoryId: d.categoryId,
      categorySlug: d.categorySlug,
      requireCategory: mode === "automation",
    });
    const { coverUrl, coverAltFromMedia } = await resolveCoverUrl({
      coverUrl: d.coverUrl,
      coverMediaId: d.coverMediaId,
    });

    if (mode === "automation" && !coverUrl) {
      return NextResponse.json(
        { error: "Automation bắt buộc coverUrl hoặc coverMediaId từ upload" },
        { status: 400 },
      );
    }

    const post = await prisma.post.create({
      data: {
        title: d.title,
        slug: d.slug,
        excerpt: d.excerpt,
        content: d.content,
        coverUrl: coverUrl || undefined,
        coverAlt: d.coverAlt || coverAltFromMedia || undefined,
        tags: JSON.stringify(d.tags || []),
        status,
        readTime: d.readTime || "5 phút đọc",
        categoryId,
        authorId: user.id,
        publishedAt: status === "PUBLISHED" ? new Date() : null,
      },
      include: { category: true },
    });
    revalidatePath("/blog");
    revalidatePath(`/blog/${post.slug}`);
    if (mode === "automation") {
      const href = adminPostHref(post.id);
      try {
        await notifyAdmin({
          title: "Bản nháp blog mới từ automation",
          body: `${post.title}\nDanh mục: ${post.category?.name || "—"}\nDuyệt bài: ${href}`,
          meta: {
            postId: post.id,
            slug: post.slug,
            href,
            source: "blog-automation",
          },
          html: automationDraftEmailHtml({
            title: post.title,
            category: post.category?.name || "—",
            href,
          }),
        });
      } catch (error) {
        console.error("Failed to notify admin about automated draft", error);
      }
    }
    return NextResponse.json({
      post,
      source: mode,
      adminHref: adminPostHref(post.id),
    });
  } catch (error) {
    return errorResponse(error);
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
    const categoryId =
      "categoryId" in d || "categorySlug" in d
        ? await resolveCategoryId({
            categoryId: d.categoryId,
            categorySlug: d.categorySlug,
            requireCategory: false,
          })
        : undefined;

    let coverPatch: { coverUrl?: string | null; coverAlt?: string } = {};
    if ("coverUrl" in d || "coverMediaId" in d) {
      const resolved = await resolveCoverUrl({
        coverUrl: d.coverUrl,
        coverMediaId: d.coverMediaId,
      });
      coverPatch = {
        coverUrl: resolved.coverUrl,
        ...(d.coverAlt || resolved.coverAltFromMedia
          ? { coverAlt: d.coverAlt || resolved.coverAltFromMedia || undefined }
          : {}),
      };
    } else if ("coverAlt" in d) {
      coverPatch = { coverAlt: d.coverAlt };
    }

    const post = await prisma.post.update({
      where: { id },
      data: {
        ...("title" in d ? { title: d.title } : {}),
        ...("slug" in d ? { slug: d.slug } : {}),
        ...("excerpt" in d ? { excerpt: d.excerpt } : {}),
        ...("content" in d ? { content: d.content } : {}),
        ...coverPatch,
        ...("tags" in d ? { tags: JSON.stringify(d.tags || []) } : {}),
        ...("status" in d ? { status: d.status } : {}),
        ...("readTime" in d ? { readTime: d.readTime } : {}),
        ...(categoryId !== undefined ? { categoryId } : {}),
        ...(d.status === "PUBLISHED" ? { publishedAt: new Date() } : {}),
      },
    });
    revalidatePath("/blog");
    revalidatePath(`/blog/${post.slug}`);
    return NextResponse.json({ post });
  } catch (error) {
    return errorResponse(error);
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
  } catch (error) {
    return errorResponse(error);
  }
}
