-- CreateEnum
CREATE TYPE "EstimatorQuestionType" AS ENUM ('TEXT', 'TEXTAREA', 'SINGLE_SELECT', 'MULTI_SELECT', 'NUMBER', 'RANGE', 'SLIDER', 'BOOLEAN', 'FEATURE_SELECTOR', 'TIMELINE', 'BUDGET', 'AI_FREE_TEXT');

-- CreateEnum
CREATE TYPE "FeatureComplexity" AS ENUM ('VERY_LOW', 'LOW', 'MEDIUM', 'HIGH', 'VERY_HIGH');

-- CreateEnum
CREATE TYPE "FeaturePriority" AS ENUM ('MUST_HAVE', 'SHOULD_HAVE', 'NICE_TO_HAVE', 'GROWTH', 'SCALE');

-- CreateEnum
CREATE TYPE "FeatureDependencyType" AS ENUM ('REQUIRES', 'RECOMMENDS', 'CONFLICTS_WITH', 'UPGRADES', 'ENABLES');

-- CreateEnum
CREATE TYPE "EstimateSessionStatus" AS ENUM ('IN_PROGRESS', 'CALCULATED', 'OPTIMIZED', 'CONTACT_CAPTURED', 'ABANDONED');

-- CreateEnum
CREATE TYPE "LeadScoreBand" AS ENUM ('HOT', 'WARM', 'COLD');

-- AlterEnum
ALTER TYPE "LeadSource" ADD VALUE 'ESTIMATOR';

-- AlterTable
ALTER TABLE "Lead" ADD COLUMN     "estimateSessionId" TEXT,
ADD COLUMN     "leadScore" INTEGER,
ADD COLUMN     "scoreBand" "LeadScoreBand";

-- AlterTable
ALTER TABLE "Proposal" ADD COLUMN     "currentProblem" TEXT NOT NULL DEFAULT '',
ADD COLUMN     "deliverables" TEXT NOT NULL DEFAULT '[]',
ADD COLUMN     "executiveSummary" TEXT NOT NULL DEFAULT '',
ADD COLUMN     "maintenance" TEXT NOT NULL DEFAULT '',
ADD COLUMN     "outOfScope" TEXT NOT NULL DEFAULT '',
ADD COLUMN     "paymentSchedule" TEXT NOT NULL DEFAULT '',
ADD COLUMN     "proposedSolution" TEXT NOT NULL DEFAULT '',
ADD COLUMN     "responsibilities" TEXT NOT NULL DEFAULT '',
ADD COLUMN     "scope" TEXT NOT NULL DEFAULT '',
ADD COLUMN     "technology" TEXT NOT NULL DEFAULT '',
ADD COLUMN     "timeline" TEXT NOT NULL DEFAULT '';

-- AlterTable
ALTER TABLE "SiteSetting" ADD COLUMN     "llmApiKey" TEXT,
ADD COLUMN     "llmBaseUrl" TEXT,
ADD COLUMN     "llmModel" TEXT DEFAULT 'gpt-4o-mini',
ADD COLUMN     "llmProvider" TEXT DEFAULT 'openai';

-- CreateTable
CREATE TABLE "SalesResource" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "category" TEXT NOT NULL DEFAULT 'POLICY',
    "description" TEXT NOT NULL DEFAULT '',
    "body" TEXT NOT NULL DEFAULT '',
    "fileUrl" TEXT,
    "partnerVisible" BOOLEAN NOT NULL DEFAULT false,
    "status" "ContentStatus" NOT NULL DEFAULT 'DRAFT',
    "sortOrder" INTEGER NOT NULL DEFAULT 0,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "SalesResource_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "EstimatorProduct" (
    "id" TEXT NOT NULL,
    "key" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT NOT NULL DEFAULT '',
    "icon" TEXT,
    "baseUnits" INTEGER NOT NULL DEFAULT 20,
    "active" BOOLEAN NOT NULL DEFAULT true,
    "sortOrder" INTEGER NOT NULL DEFAULT 0,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "EstimatorProduct_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ProductTemplate" (
    "id" TEXT NOT NULL,
    "productId" TEXT NOT NULL,
    "key" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT NOT NULL DEFAULT '',
    "coreFeatureKeys" TEXT NOT NULL DEFAULT '[]',
    "questionKeys" TEXT NOT NULL DEFAULT '[]',
    "businessModels" TEXT NOT NULL DEFAULT '[]',
    "active" BOOLEAN NOT NULL DEFAULT true,
    "sortOrder" INTEGER NOT NULL DEFAULT 0,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "ProductTemplate_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "EstimatorFeature" (
    "id" TEXT NOT NULL,
    "productId" TEXT NOT NULL,
    "key" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT NOT NULL DEFAULT '',
    "category" TEXT NOT NULL DEFAULT 'General',
    "complexity" "FeatureComplexity" NOT NULL DEFAULT 'MEDIUM',
    "baseUnits" INTEGER NOT NULL DEFAULT 3,
    "priority" "FeaturePriority" NOT NULL DEFAULT 'SHOULD_HAVE',
    "technicalRisk" "FeatureComplexity" NOT NULL DEFAULT 'LOW',
    "optional" BOOLEAN NOT NULL DEFAULT true,
    "active" BOOLEAN NOT NULL DEFAULT true,
    "sortOrder" INTEGER NOT NULL DEFAULT 0,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "EstimatorFeature_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "FeatureDependency" (
    "id" TEXT NOT NULL,
    "fromFeatureId" TEXT NOT NULL,
    "toFeatureId" TEXT NOT NULL,
    "type" "FeatureDependencyType" NOT NULL DEFAULT 'REQUIRES',
    "message" TEXT,

    CONSTRAINT "FeatureDependency_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "EstimatorQuestion" (
    "id" TEXT NOT NULL,
    "productId" TEXT,
    "key" TEXT NOT NULL,
    "type" "EstimatorQuestionType" NOT NULL,
    "section" TEXT NOT NULL DEFAULT 'general',
    "title" TEXT NOT NULL,
    "description" TEXT NOT NULL DEFAULT '',
    "required" BOOLEAN NOT NULL DEFAULT true,
    "sortOrder" INTEGER NOT NULL DEFAULT 0,
    "active" BOOLEAN NOT NULL DEFAULT true,
    "config" TEXT NOT NULL DEFAULT '{}',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "EstimatorQuestion_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "QuestionOption" (
    "id" TEXT NOT NULL,
    "questionId" TEXT NOT NULL,
    "value" TEXT NOT NULL,
    "label" TEXT NOT NULL,
    "sortOrder" INTEGER NOT NULL DEFAULT 0,
    "meta" TEXT NOT NULL DEFAULT '{}',

    CONSTRAINT "QuestionOption_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "QuestionRule" (
    "id" TEXT NOT NULL,
    "questionId" TEXT NOT NULL,
    "definition" TEXT NOT NULL,
    "active" BOOLEAN NOT NULL DEFAULT true,
    "sortOrder" INTEGER NOT NULL DEFAULT 0,

    CONSTRAINT "QuestionRule_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "PricingVersion" (
    "id" TEXT NOT NULL,
    "key" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "active" BOOLEAN NOT NULL DEFAULT false,
    "unitValueVnd" INTEGER NOT NULL DEFAULT 1000000,
    "minimumProjectVnd" INTEGER NOT NULL DEFAULT 15000000,
    "riskBufferLow" DOUBLE PRECISION NOT NULL DEFAULT 0.05,
    "riskBufferMedium" DOUBLE PRECISION NOT NULL DEFAULT 0.10,
    "riskBufferHigh" DOUBLE PRECISION NOT NULL DEFAULT 0.20,
    "rushCoefficient" DOUBLE PRECISION NOT NULL DEFAULT 1.25,
    "rangePadding" DOUBLE PRECISION NOT NULL DEFAULT 0.12,
    "businessModelCoeffs" TEXT NOT NULL DEFAULT '{}',
    "scaleCoeffs" TEXT NOT NULL DEFAULT '{}',
    "notes" TEXT NOT NULL DEFAULT '',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "PricingVersion_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "IntegrationCatalogItem" (
    "id" TEXT NOT NULL,
    "key" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "category" TEXT NOT NULL,
    "description" TEXT NOT NULL DEFAULT '',
    "complexity" "FeatureComplexity" NOT NULL DEFAULT 'MEDIUM',
    "setupCostUnits" INTEGER NOT NULL DEFAULT 2,
    "recurringNote" TEXT,
    "requiresVerification" BOOLEAN NOT NULL DEFAULT false,
    "requiresMerchant" BOOLEAN NOT NULL DEFAULT false,
    "active" BOOLEAN NOT NULL DEFAULT true,
    "sortOrder" INTEGER NOT NULL DEFAULT 0,

    CONSTRAINT "IntegrationCatalogItem_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ArchitectureTemplate" (
    "id" TEXT NOT NULL,
    "key" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT NOT NULL DEFAULT '',
    "stack" TEXT NOT NULL DEFAULT '[]',
    "conditions" TEXT NOT NULL DEFAULT '{}',
    "active" BOOLEAN NOT NULL DEFAULT true,
    "sortOrder" INTEGER NOT NULL DEFAULT 0,

    CONSTRAINT "ArchitectureTemplate_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "RecommendationRule" (
    "id" TEXT NOT NULL,
    "key" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT NOT NULL DEFAULT '',
    "definition" TEXT NOT NULL DEFAULT '{}',
    "active" BOOLEAN NOT NULL DEFAULT true,
    "sortOrder" INTEGER NOT NULL DEFAULT 0,

    CONSTRAINT "RecommendationRule_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "EstimateSession" (
    "id" TEXT NOT NULL,
    "publicId" TEXT NOT NULL,
    "shareCode" TEXT NOT NULL,
    "tokenHash" TEXT NOT NULL,
    "status" "EstimateSessionStatus" NOT NULL DEFAULT 'IN_PROGRESS',
    "productId" TEXT,
    "templateKey" TEXT,
    "pricingVersionId" TEXT,
    "answers" TEXT NOT NULL DEFAULT '{}',
    "selectedFeatures" TEXT NOT NULL DEFAULT '[]',
    "customRequirements" TEXT NOT NULL DEFAULT '',
    "sectionProgress" TEXT NOT NULL DEFAULT '{}',
    "referralCode" TEXT,
    "landingPath" TEXT,
    "utmSource" TEXT,
    "utmMedium" TEXT,
    "utmCampaign" TEXT,
    "contactName" TEXT,
    "contactCompany" TEXT,
    "contactEmail" TEXT,
    "contactPhone" TEXT,
    "contactZalo" TEXT,
    "currentVersion" INTEGER NOT NULL DEFAULT 0,
    "leadScore" INTEGER,
    "scoreBand" "LeadScoreBand",
    "technicalReviewRequired" BOOLEAN NOT NULL DEFAULT false,
    "aiSummary" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "EstimateSession_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "EstimateVersion" (
    "id" TEXT NOT NULL,
    "sessionId" TEXT NOT NULL,
    "version" INTEGER NOT NULL,
    "label" TEXT NOT NULL DEFAULT '',
    "selectedFeatures" TEXT NOT NULL DEFAULT '[]',
    "answersSnapshot" TEXT NOT NULL DEFAULT '{}',
    "internalAmount" DECIMAL(15,2) NOT NULL,
    "minAmount" DECIMAL(15,2) NOT NULL,
    "maxAmount" DECIMAL(15,2) NOT NULL,
    "currency" TEXT NOT NULL DEFAULT 'VND',
    "timelineWeeksMin" INTEGER NOT NULL DEFAULT 4,
    "timelineWeeksMax" INTEGER NOT NULL DEFAULT 8,
    "roadmap" TEXT NOT NULL DEFAULT '[]',
    "architecture" TEXT NOT NULL DEFAULT '{}',
    "recommendations" TEXT NOT NULL DEFAULT '[]',
    "optimized" BOOLEAN NOT NULL DEFAULT false,
    "deferredFeatures" TEXT NOT NULL DEFAULT '[]',
    "riskLevel" TEXT NOT NULL DEFAULT 'LOW',
    "breakdown" TEXT NOT NULL DEFAULT '{}',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "EstimateVersion_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "AiExtraction" (
    "id" TEXT NOT NULL,
    "sessionId" TEXT NOT NULL,
    "task" TEXT NOT NULL,
    "promptVersion" TEXT NOT NULL DEFAULT 'v1',
    "inputText" TEXT NOT NULL,
    "outputJson" TEXT NOT NULL DEFAULT '{}',
    "confidence" DOUBLE PRECISION,
    "model" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "AiExtraction_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "SalesResource_slug_key" ON "SalesResource"("slug");

-- CreateIndex
CREATE INDEX "SalesResource_status_sortOrder_idx" ON "SalesResource"("status", "sortOrder");

-- CreateIndex
CREATE INDEX "SalesResource_partnerVisible_status_idx" ON "SalesResource"("partnerVisible", "status");

-- CreateIndex
CREATE UNIQUE INDEX "EstimatorProduct_key_key" ON "EstimatorProduct"("key");

-- CreateIndex
CREATE INDEX "ProductTemplate_active_sortOrder_idx" ON "ProductTemplate"("active", "sortOrder");

-- CreateIndex
CREATE UNIQUE INDEX "ProductTemplate_productId_key_key" ON "ProductTemplate"("productId", "key");

-- CreateIndex
CREATE INDEX "EstimatorFeature_productId_category_sortOrder_idx" ON "EstimatorFeature"("productId", "category", "sortOrder");

-- CreateIndex
CREATE UNIQUE INDEX "EstimatorFeature_productId_key_key" ON "EstimatorFeature"("productId", "key");

-- CreateIndex
CREATE UNIQUE INDEX "FeatureDependency_fromFeatureId_toFeatureId_type_key" ON "FeatureDependency"("fromFeatureId", "toFeatureId", "type");

-- CreateIndex
CREATE UNIQUE INDEX "EstimatorQuestion_key_key" ON "EstimatorQuestion"("key");

-- CreateIndex
CREATE INDEX "EstimatorQuestion_productId_section_sortOrder_idx" ON "EstimatorQuestion"("productId", "section", "sortOrder");

-- CreateIndex
CREATE UNIQUE INDEX "QuestionOption_questionId_value_key" ON "QuestionOption"("questionId", "value");

-- CreateIndex
CREATE UNIQUE INDEX "PricingVersion_key_key" ON "PricingVersion"("key");

-- CreateIndex
CREATE UNIQUE INDEX "IntegrationCatalogItem_key_key" ON "IntegrationCatalogItem"("key");

-- CreateIndex
CREATE UNIQUE INDEX "ArchitectureTemplate_key_key" ON "ArchitectureTemplate"("key");

-- CreateIndex
CREATE UNIQUE INDEX "RecommendationRule_key_key" ON "RecommendationRule"("key");

-- CreateIndex
CREATE UNIQUE INDEX "EstimateSession_publicId_key" ON "EstimateSession"("publicId");

-- CreateIndex
CREATE UNIQUE INDEX "EstimateSession_shareCode_key" ON "EstimateSession"("shareCode");

-- CreateIndex
CREATE INDEX "EstimateSession_status_updatedAt_idx" ON "EstimateSession"("status", "updatedAt");

-- CreateIndex
CREATE INDEX "EstimateSession_referralCode_idx" ON "EstimateSession"("referralCode");

-- CreateIndex
CREATE INDEX "EstimateVersion_sessionId_createdAt_idx" ON "EstimateVersion"("sessionId", "createdAt");

-- CreateIndex
CREATE UNIQUE INDEX "EstimateVersion_sessionId_version_key" ON "EstimateVersion"("sessionId", "version");

-- CreateIndex
CREATE INDEX "AiExtraction_sessionId_createdAt_idx" ON "AiExtraction"("sessionId", "createdAt");

-- CreateIndex
CREATE UNIQUE INDEX "Lead_estimateSessionId_key" ON "Lead"("estimateSessionId");

-- CreateIndex
CREATE INDEX "Lead_scoreBand_idx" ON "Lead"("scoreBand");

-- AddForeignKey
ALTER TABLE "Lead" ADD CONSTRAINT "Lead_estimateSessionId_fkey" FOREIGN KEY ("estimateSessionId") REFERENCES "EstimateSession"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ProductTemplate" ADD CONSTRAINT "ProductTemplate_productId_fkey" FOREIGN KEY ("productId") REFERENCES "EstimatorProduct"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "EstimatorFeature" ADD CONSTRAINT "EstimatorFeature_productId_fkey" FOREIGN KEY ("productId") REFERENCES "EstimatorProduct"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "FeatureDependency" ADD CONSTRAINT "FeatureDependency_fromFeatureId_fkey" FOREIGN KEY ("fromFeatureId") REFERENCES "EstimatorFeature"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "FeatureDependency" ADD CONSTRAINT "FeatureDependency_toFeatureId_fkey" FOREIGN KEY ("toFeatureId") REFERENCES "EstimatorFeature"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "EstimatorQuestion" ADD CONSTRAINT "EstimatorQuestion_productId_fkey" FOREIGN KEY ("productId") REFERENCES "EstimatorProduct"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "QuestionOption" ADD CONSTRAINT "QuestionOption_questionId_fkey" FOREIGN KEY ("questionId") REFERENCES "EstimatorQuestion"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "QuestionRule" ADD CONSTRAINT "QuestionRule_questionId_fkey" FOREIGN KEY ("questionId") REFERENCES "EstimatorQuestion"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "EstimateSession" ADD CONSTRAINT "EstimateSession_productId_fkey" FOREIGN KEY ("productId") REFERENCES "EstimatorProduct"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "EstimateSession" ADD CONSTRAINT "EstimateSession_pricingVersionId_fkey" FOREIGN KEY ("pricingVersionId") REFERENCES "PricingVersion"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "EstimateVersion" ADD CONSTRAINT "EstimateVersion_sessionId_fkey" FOREIGN KEY ("sessionId") REFERENCES "EstimateSession"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "AiExtraction" ADD CONSTRAINT "AiExtraction_sessionId_fkey" FOREIGN KEY ("sessionId") REFERENCES "EstimateSession"("id") ON DELETE CASCADE ON UPDATE CASCADE;
