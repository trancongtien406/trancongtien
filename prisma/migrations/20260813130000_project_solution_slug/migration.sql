-- AlterTable
ALTER TABLE "Project" ADD COLUMN IF NOT EXISTS "solutionSlug" TEXT;

-- CreateIndex
CREATE INDEX IF NOT EXISTS "Project_solutionSlug_status_sortOrder_idx" ON "Project"("solutionSlug", "status", "sortOrder");
