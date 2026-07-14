import { NextResponse } from "next/server";
import { revalidatePath } from "next/cache";
import { z } from "zod";
import { requireAdmin } from "@/lib/auth";
import { prisma } from "@/lib/db";
import { toSlug } from "@/lib/admin/slug";

export const dynamic = "force-dynamic";

const entityEnum = z.enum([
  "project",
  "service",
  "resource",
  "testimonial",
  "processStep",
  "faq",
  "coreValue",
  "journeyItem",
]);

type Entity = z.infer<typeof entityEnum>;

function revalidateAll() {
  [
    "/",
    "/dich-vu",
    "/du-an",
    "/quy-trinh",
    "/ve-toi",
    "/tai-nguyen",
    "/blog",
    "/lien-he",
    "/admin/projects",
    "/admin/services",
    "/admin/testimonials",
    "/admin/media",
  ].forEach((p) => revalidatePath(p));
}

function asJsonArray(v: unknown) {
  if (Array.isArray(v)) return JSON.stringify(v);
  if (typeof v === "string") {
    try {
      const parsed = JSON.parse(v);
      return Array.isArray(parsed) ? JSON.stringify(parsed) : JSON.stringify(
        v
          .split(",")
          .map((s) => s.trim())
          .filter(Boolean),
      );
    } catch {
      return JSON.stringify(
        v
          .split(",")
          .map((s) => s.trim())
          .filter(Boolean),
      );
    }
  }
  return "[]";
}

async function createEntity(entity: Entity, data: Record<string, unknown>) {
  switch (entity) {
    case "project": {
      const title = String(data.title || "");
      return prisma.project.create({
        data: {
          title,
          slug: String(data.slug || toSlug(title)),
          category: String(data.category || "Web App"),
          description: String(data.description || ""),
          content: String(data.content || ""),
          coverUrl: data.coverUrl ? String(data.coverUrl) : null,
          coverAlt: data.coverAlt ? String(data.coverAlt) : null,
          features: asJsonArray(data.features),
          stack: asJsonArray(data.stack),
          role: data.role ? String(data.role) : null,
          timeframe: data.timeframe ? String(data.timeframe) : null,
          platform: data.platform ? String(data.platform) : null,
          tone: String(data.tone || "bg-violet-50"),
          status: (data.status as "DRAFT" | "PUBLISHED" | "ARCHIVED") || "DRAFT",
          sortOrder: Number(data.sortOrder || 0),
        },
      });
    }
    case "service": {
      const title = String(data.title || "");
      return prisma.service.create({
        data: {
          number: String(data.number || "01"),
          title,
          slug: String(data.slug || toSlug(title)),
          description: String(data.description || ""),
          items: asJsonArray(data.items),
          color: String(data.color || "bg-blue-50 text-blue-600"),
          status: (data.status as "DRAFT" | "PUBLISHED" | "ARCHIVED") || "PUBLISHED",
          sortOrder: Number(data.sortOrder || 0),
        },
      });
    }
    case "resource": {
      const title = String(data.title || "");
      return prisma.resource.create({
        data: {
          title,
          slug: String(data.slug || toSlug(title)),
          category: String(data.category || "Tài nguyên"),
          description: String(data.description || ""),
          meta: data.meta ? String(data.meta) : null,
          coverUrl: data.coverUrl ? String(data.coverUrl) : null,
          downloadUrl: data.downloadUrl ? String(data.downloadUrl) : null,
          free: data.free !== false && data.free !== "false",
          status: (data.status as "DRAFT" | "PUBLISHED" | "ARCHIVED") || "PUBLISHED",
        },
      });
    }
    case "testimonial":
      return prisma.testimonial.create({
        data: {
          quote: String(data.quote || ""),
          name: String(data.name || ""),
          role: String(data.role || ""),
          avatarUrl: data.avatarUrl ? String(data.avatarUrl) : null,
          status: (data.status as "DRAFT" | "PUBLISHED" | "ARCHIVED") || "PUBLISHED",
          sortOrder: Number(data.sortOrder || 0),
        },
      });
    case "processStep":
      return prisma.processStep.create({
        data: {
          step: String(data.step || "01"),
          title: String(data.title || ""),
          tasks: String(data.tasks || ""),
          time: String(data.time || ""),
          status: (data.status as "DRAFT" | "PUBLISHED" | "ARCHIVED") || "PUBLISHED",
          sortOrder: Number(data.sortOrder || 0),
        },
      });
    case "faq":
      return prisma.faq.create({
        data: {
          question: String(data.question || ""),
          answer: String(data.answer || ""),
          status: (data.status as "DRAFT" | "PUBLISHED" | "ARCHIVED") || "PUBLISHED",
          sortOrder: Number(data.sortOrder || 0),
        },
      });
    case "coreValue":
      return prisma.coreValue.create({
        data: {
          title: String(data.title || ""),
          description: String(data.description || ""),
          status: (data.status as "DRAFT" | "PUBLISHED" | "ARCHIVED") || "PUBLISHED",
          sortOrder: Number(data.sortOrder || 0),
        },
      });
    case "journeyItem":
      return prisma.journeyItem.create({
        data: {
          year: String(data.year || ""),
          title: String(data.title || ""),
          description: String(data.description || ""),
          status: (data.status as "DRAFT" | "PUBLISHED" | "ARCHIVED") || "PUBLISHED",
          sortOrder: Number(data.sortOrder || 0),
        },
      });
  }
}

async function updateEntity(
  entity: Entity,
  id: string,
  data: Record<string, unknown>,
) {
  switch (entity) {
    case "project":
      return prisma.project.update({
        where: { id },
        data: {
          ...(data.title !== undefined ? { title: String(data.title) } : {}),
          ...(data.slug !== undefined ? { slug: String(data.slug) } : {}),
          ...(data.category !== undefined
            ? { category: String(data.category) }
            : {}),
          ...(data.description !== undefined
            ? { description: String(data.description) }
            : {}),
          ...(data.content !== undefined ? { content: String(data.content) } : {}),
          ...(data.coverUrl !== undefined
            ? { coverUrl: data.coverUrl ? String(data.coverUrl) : null }
            : {}),
          ...(data.coverAlt !== undefined
            ? { coverAlt: data.coverAlt ? String(data.coverAlt) : null }
            : {}),
          ...(data.features !== undefined
            ? { features: asJsonArray(data.features) }
            : {}),
          ...(data.stack !== undefined ? { stack: asJsonArray(data.stack) } : {}),
          ...(data.role !== undefined ? { role: String(data.role) } : {}),
          ...(data.timeframe !== undefined
            ? { timeframe: String(data.timeframe) }
            : {}),
          ...(data.platform !== undefined
            ? { platform: String(data.platform) }
            : {}),
          ...(data.tone !== undefined ? { tone: String(data.tone) } : {}),
          ...(data.status !== undefined
            ? { status: data.status as "DRAFT" | "PUBLISHED" | "ARCHIVED" }
            : {}),
          ...(data.sortOrder !== undefined
            ? { sortOrder: Number(data.sortOrder) }
            : {}),
        },
      });
    case "service":
      return prisma.service.update({
        where: { id },
        data: {
          ...(data.number !== undefined ? { number: String(data.number) } : {}),
          ...(data.title !== undefined ? { title: String(data.title) } : {}),
          ...(data.slug !== undefined ? { slug: String(data.slug) } : {}),
          ...(data.description !== undefined
            ? { description: String(data.description) }
            : {}),
          ...(data.items !== undefined ? { items: asJsonArray(data.items) } : {}),
          ...(data.color !== undefined ? { color: String(data.color) } : {}),
          ...(data.status !== undefined
            ? { status: data.status as "DRAFT" | "PUBLISHED" | "ARCHIVED" }
            : {}),
          ...(data.sortOrder !== undefined
            ? { sortOrder: Number(data.sortOrder) }
            : {}),
        },
      });
    case "resource":
      return prisma.resource.update({
        where: { id },
        data: {
          ...(data.title !== undefined ? { title: String(data.title) } : {}),
          ...(data.slug !== undefined ? { slug: String(data.slug) } : {}),
          ...(data.category !== undefined
            ? { category: String(data.category) }
            : {}),
          ...(data.description !== undefined
            ? { description: String(data.description) }
            : {}),
          ...(data.meta !== undefined ? { meta: String(data.meta) } : {}),
          ...(data.coverUrl !== undefined
            ? { coverUrl: data.coverUrl ? String(data.coverUrl) : null }
            : {}),
          ...(data.downloadUrl !== undefined
            ? { downloadUrl: data.downloadUrl ? String(data.downloadUrl) : null }
            : {}),
          ...(data.free !== undefined
            ? { free: data.free !== false && data.free !== "false" }
            : {}),
          ...(data.status !== undefined
            ? { status: data.status as "DRAFT" | "PUBLISHED" | "ARCHIVED" }
            : {}),
        },
      });
    case "testimonial":
      return prisma.testimonial.update({
        where: { id },
        data: {
          ...(data.quote !== undefined ? { quote: String(data.quote) } : {}),
          ...(data.name !== undefined ? { name: String(data.name) } : {}),
          ...(data.role !== undefined ? { role: String(data.role) } : {}),
          ...(data.avatarUrl !== undefined
            ? { avatarUrl: data.avatarUrl ? String(data.avatarUrl) : null }
            : {}),
          ...(data.status !== undefined
            ? { status: data.status as "DRAFT" | "PUBLISHED" | "ARCHIVED" }
            : {}),
          ...(data.sortOrder !== undefined
            ? { sortOrder: Number(data.sortOrder) }
            : {}),
        },
      });
    case "processStep":
      return prisma.processStep.update({
        where: { id },
        data: {
          ...(data.step !== undefined ? { step: String(data.step) } : {}),
          ...(data.title !== undefined ? { title: String(data.title) } : {}),
          ...(data.tasks !== undefined ? { tasks: String(data.tasks) } : {}),
          ...(data.time !== undefined ? { time: String(data.time) } : {}),
          ...(data.status !== undefined
            ? { status: data.status as "DRAFT" | "PUBLISHED" | "ARCHIVED" }
            : {}),
          ...(data.sortOrder !== undefined
            ? { sortOrder: Number(data.sortOrder) }
            : {}),
        },
      });
    case "faq":
      return prisma.faq.update({
        where: { id },
        data: {
          ...(data.question !== undefined
            ? { question: String(data.question) }
            : {}),
          ...(data.answer !== undefined ? { answer: String(data.answer) } : {}),
          ...(data.status !== undefined
            ? { status: data.status as "DRAFT" | "PUBLISHED" | "ARCHIVED" }
            : {}),
          ...(data.sortOrder !== undefined
            ? { sortOrder: Number(data.sortOrder) }
            : {}),
        },
      });
    case "coreValue":
      return prisma.coreValue.update({
        where: { id },
        data: {
          ...(data.title !== undefined ? { title: String(data.title) } : {}),
          ...(data.description !== undefined
            ? { description: String(data.description) }
            : {}),
          ...(data.status !== undefined
            ? { status: data.status as "DRAFT" | "PUBLISHED" | "ARCHIVED" }
            : {}),
          ...(data.sortOrder !== undefined
            ? { sortOrder: Number(data.sortOrder) }
            : {}),
        },
      });
    case "journeyItem":
      return prisma.journeyItem.update({
        where: { id },
        data: {
          ...(data.year !== undefined ? { year: String(data.year) } : {}),
          ...(data.title !== undefined ? { title: String(data.title) } : {}),
          ...(data.description !== undefined
            ? { description: String(data.description) }
            : {}),
          ...(data.status !== undefined
            ? { status: data.status as "DRAFT" | "PUBLISHED" | "ARCHIVED" }
            : {}),
          ...(data.sortOrder !== undefined
            ? { sortOrder: Number(data.sortOrder) }
            : {}),
        },
      });
  }
}

async function deleteEntity(entity: Entity, id: string) {
  switch (entity) {
    case "project":
      return prisma.project.delete({ where: { id } });
    case "service":
      return prisma.service.delete({ where: { id } });
    case "resource":
      return prisma.resource.delete({ where: { id } });
    case "testimonial":
      return prisma.testimonial.delete({ where: { id } });
    case "processStep":
      return prisma.processStep.delete({ where: { id } });
    case "faq":
      return prisma.faq.delete({ where: { id } });
    case "coreValue":
      return prisma.coreValue.delete({ where: { id } });
    case "journeyItem":
      return prisma.journeyItem.delete({ where: { id } });
  }
}

export async function POST(req: Request) {
  try {
    await requireAdmin();
    const body = await req.json();
    const entity = entityEnum.parse(body.entity);
    const item = await createEntity(entity, body.data || {});
    revalidateAll();
    return NextResponse.json({ item });
  } catch (e) {
    console.error(e);
    return NextResponse.json({ error: "Failed" }, { status: 400 });
  }
}

export async function PUT(req: Request) {
  try {
    await requireAdmin();
    const body = await req.json();
    const entity = entityEnum.parse(body.entity);
    const id = String(body.id || "");
    if (!id) return NextResponse.json({ error: "Missing id" }, { status: 400 });
    const item = await updateEntity(entity, id, body.data || {});
    revalidateAll();
    return NextResponse.json({ item });
  } catch (e) {
    console.error(e);
    return NextResponse.json({ error: "Failed" }, { status: 400 });
  }
}

export async function DELETE(req: Request) {
  try {
    await requireAdmin();
    const { searchParams } = new URL(req.url);
    const entity = entityEnum.parse(searchParams.get("entity"));
    const id = String(searchParams.get("id") || "");
    if (!id) return NextResponse.json({ error: "Missing id" }, { status: 400 });
    await deleteEntity(entity, id);
    revalidateAll();
    return NextResponse.json({ ok: true });
  } catch (e) {
    console.error(e);
    return NextResponse.json({ error: "Failed" }, { status: 400 });
  }
}
