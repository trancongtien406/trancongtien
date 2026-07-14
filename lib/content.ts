import { prisma } from "@/lib/db";
import { ContentStatus } from "@/lib/generated/prisma/client";

export async function getPublishedPosts() {
  return prisma.post.findMany({
    where: { status: ContentStatus.PUBLISHED },
    orderBy: { publishedAt: "desc" },
    include: { category: true, author: true },
  });
}

export async function getPostBySlug(slug: string) {
  return prisma.post.findFirst({
    where: { slug, status: ContentStatus.PUBLISHED },
    include: { category: true, author: true },
  });
}

export async function getPublishedProjects() {
  return prisma.project.findMany({
    where: { status: ContentStatus.PUBLISHED },
    orderBy: { sortOrder: "asc" },
  });
}

export async function getProjectBySlug(slug: string) {
  return prisma.project.findFirst({
    where: { slug, status: ContentStatus.PUBLISHED },
  });
}

export async function getPublishedServices() {
  return prisma.service.findMany({
    where: { status: ContentStatus.PUBLISHED },
    orderBy: { sortOrder: "asc" },
  });
}

export async function getPublishedTestimonials() {
  return prisma.testimonial.findMany({
    where: { status: ContentStatus.PUBLISHED },
    orderBy: { sortOrder: "asc" },
  });
}

export async function getProcessSteps() {
  return prisma.processStep.findMany({
    where: { status: ContentStatus.PUBLISHED },
    orderBy: { sortOrder: "asc" },
  });
}

export async function getPublishedResources() {
  return prisma.resource.findMany({
    where: { status: ContentStatus.PUBLISHED },
    orderBy: { createdAt: "desc" },
  });
}

export async function getPublishedFaqs() {
  return prisma.faq.findMany({
    where: { status: ContentStatus.PUBLISHED },
    orderBy: { sortOrder: "asc" },
  });
}

export async function getCoreValues() {
  return prisma.coreValue.findMany({
    where: { status: ContentStatus.PUBLISHED },
    orderBy: { sortOrder: "asc" },
  });
}

export async function getJourneyItems() {
  return prisma.journeyItem.findMany({
    where: { status: ContentStatus.PUBLISHED },
    orderBy: { sortOrder: "asc" },
  });
}

export async function getSiteSetting() {
  return prisma.siteSetting.findUnique({ where: { id: "default" } });
}

export function parseJsonArray(value: string | null | undefined): string[] {
  try {
    const parsed = JSON.parse(value || "[]");
    return Array.isArray(parsed) ? parsed.map(String) : [];
  } catch {
    return [];
  }
}
