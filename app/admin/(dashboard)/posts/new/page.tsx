import { PostForm } from "@/components/admin/PostForm";
import { prisma } from "@/lib/db";

export const dynamic = "force-dynamic";

export default async function NewPostPage() {
  const categories = await prisma.category.findMany({ orderBy: { name: "asc" } });
  return (
    <PostForm categories={categories.map((c) => ({ id: c.id, name: c.name }))} />
  );
}
