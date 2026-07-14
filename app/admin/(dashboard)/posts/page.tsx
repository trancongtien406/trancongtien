import { PostsManager } from "@/components/admin/PostsManager";
import { prisma } from "@/lib/db";

export const dynamic = "force-dynamic";

export default async function AdminPostsPage() {
  const [posts, categories] = await Promise.all([
    prisma.post.findMany({
      orderBy: { updatedAt: "desc" },
      include: { category: true },
    }),
    prisma.category.findMany({ orderBy: { name: "asc" } }),
  ]);

  return (
    <PostsManager
      categories={categories.map((c) => ({ id: c.id, name: c.name }))}
      posts={posts.map((p) => ({
        id: p.id,
        title: p.title,
        slug: p.slug,
        excerpt: p.excerpt,
        status: p.status,
        categoryName: p.category?.name || "",
        updatedAt: p.updatedAt.toLocaleString("vi-VN"),
        coverUrl: p.coverUrl || "",
      }))}
    />
  );
}
