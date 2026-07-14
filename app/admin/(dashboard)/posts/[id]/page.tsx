import { notFound } from "next/navigation";
import { PostForm } from "@/components/admin/PostForm";
import { parseJsonArray } from "@/lib/content";
import { prisma } from "@/lib/db";

export const dynamic = "force-dynamic";

type Props = { params: Promise<{ id: string }> };

export default async function EditPostPage({ params }: Props) {
  const { id } = await params;
  const [post, categories] = await Promise.all([
    prisma.post.findUnique({ where: { id } }),
    prisma.category.findMany({ orderBy: { name: "asc" } }),
  ]);
  if (!post) notFound();

  return (
    <PostForm
      categories={categories.map((c) => ({ id: c.id, name: c.name }))}
      initial={{
        id: post.id,
        title: post.title,
        slug: post.slug,
        excerpt: post.excerpt,
        content: post.content,
        coverUrl: post.coverUrl || "",
        status: post.status,
        readTime: post.readTime,
        categoryId: post.categoryId || "",
        tags: parseJsonArray(post.tags).join(", "),
      }}
    />
  );
}
