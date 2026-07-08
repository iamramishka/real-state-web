-- CreateEnum
CREATE TYPE "AdminRole" AS ENUM ('OWNER', 'ADMIN', 'EDITOR', 'VIEWER');

-- CreateEnum
CREATE TYPE "UserStatus" AS ENUM ('ACTIVE', 'DISABLED');

-- CreateEnum
CREATE TYPE "ContentStatus" AS ENUM ('DRAFT', 'PUBLISHED', 'ARCHIVED');

-- CreateEnum
CREATE TYPE "PropertyMode" AS ENUM ('BUY', 'RENT', 'SOLD');

-- CreateEnum
CREATE TYPE "PropertyCategory" AS ENUM ('NEW_TO_MARKET', 'MOST_VIEWED', 'OPEN_HOUSE', 'PRICE_DROP', 'LUXURY', 'SOLD');

-- CreateEnum
CREATE TYPE "EditorialType" AS ENUM ('NEWS', 'ARTICLE');

-- CreateEnum
CREATE TYPE "LeadSource" AS ENUM ('CONTACT', 'SAVE_SEARCH', 'PROPERTY_INQUIRY', 'SELL_INQUIRY', 'NEWSLETTER');

-- CreateEnum
CREATE TYPE "LeadStatus" AS ENUM ('NEW', 'IN_PROGRESS', 'QUALIFIED', 'CLOSED', 'SPAM');

-- CreateEnum
CREATE TYPE "AiActorType" AS ENUM ('CLAUDE', 'CODEX', 'HUMAN', 'REVIEWER');

-- CreateEnum
CREATE TYPE "AiRecordStatus" AS ENUM ('ACTIVE', 'INACTIVE', 'ARCHIVED');

-- CreateEnum
CREATE TYPE "AiTaskStatus" AS ENUM ('PLANNED', 'READY', 'IN_PROGRESS', 'IN_REVIEW', 'BLOCKED', 'MERGED', 'DONE');

-- CreateEnum
CREATE TYPE "TaskPriority" AS ENUM ('LOW', 'MEDIUM', 'HIGH', 'CRITICAL');

-- CreateEnum
CREATE TYPE "AuditStatus" AS ENUM ('PENDING', 'PASSED', 'FAILED', 'WAIVED');

-- CreateTable
CREATE TABLE "admin_users" (
    "id" TEXT NOT NULL,
    "externalAuthId" TEXT,
    "email" TEXT NOT NULL,
    "displayName" TEXT NOT NULL,
    "role" "AdminRole" NOT NULL DEFAULT 'VIEWER',
    "status" "UserStatus" NOT NULL DEFAULT 'ACTIVE',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "admin_users_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "media_assets" (
    "id" TEXT NOT NULL,
    "storageKey" TEXT NOT NULL,
    "url" TEXT NOT NULL,
    "mimeType" TEXT NOT NULL,
    "width" INTEGER,
    "height" INTEGER,
    "fileSizeBytes" INTEGER,
    "altText" TEXT NOT NULL,
    "createdById" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "media_assets_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "properties" (
    "id" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "address" TEXT NOT NULL,
    "city" TEXT NOT NULL,
    "state" TEXT NOT NULL,
    "priceCents" BIGINT NOT NULL,
    "priceLabel" TEXT,
    "mode" "PropertyMode" NOT NULL,
    "categories" "PropertyCategory"[],
    "beds" INTEGER NOT NULL,
    "baths" INTEGER NOT NULL,
    "squareFeet" INTEGER NOT NULL,
    "latitude" DOUBLE PRECISION NOT NULL,
    "longitude" DOUBLE PRECISION NOT NULL,
    "description" TEXT,
    "featured" BOOLEAN NOT NULL DEFAULT false,
    "recommended" BOOLEAN NOT NULL DEFAULT false,
    "status" "ContentStatus" NOT NULL DEFAULT 'DRAFT',
    "listedAt" TIMESTAMP(3) NOT NULL,
    "publishedAt" TIMESTAMP(3),
    "assignedAgentId" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "properties_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "property_images" (
    "id" TEXT NOT NULL,
    "propertyId" TEXT NOT NULL,
    "mediaAssetId" TEXT NOT NULL,
    "sortOrder" INTEGER NOT NULL DEFAULT 0,
    "altTextOverride" TEXT,

    CONSTRAINT "property_images_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "real_estate_agents" (
    "id" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "agency" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "areasServed" TEXT[],
    "bio" TEXT,
    "email" TEXT,
    "phone" TEXT,
    "ratingValue" DOUBLE PRECISION NOT NULL,
    "reviewCount" INTEGER NOT NULL,
    "featured" BOOLEAN NOT NULL DEFAULT false,
    "status" "ContentStatus" NOT NULL DEFAULT 'DRAFT',
    "avatarMediaId" TEXT,
    "publishedAt" TIMESTAMP(3),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "real_estate_agents_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "editorial_posts" (
    "id" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "type" "EditorialType" NOT NULL,
    "title" TEXT NOT NULL,
    "excerpt" TEXT NOT NULL,
    "body" TEXT,
    "author" TEXT,
    "category" TEXT,
    "tag" TEXT,
    "featured" BOOLEAN NOT NULL DEFAULT false,
    "status" "ContentStatus" NOT NULL DEFAULT 'DRAFT',
    "coverMediaId" TEXT,
    "publishedAt" TIMESTAMP(3),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "editorial_posts_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "site_nav_items" (
    "id" TEXT NOT NULL,
    "location" TEXT NOT NULL DEFAULT 'primary',
    "label" TEXT NOT NULL,
    "href" TEXT NOT NULL,
    "ariaLabel" TEXT,
    "sortOrder" INTEGER NOT NULL,
    "status" "ContentStatus" NOT NULL DEFAULT 'DRAFT',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "site_nav_items_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "footer_columns" (
    "id" TEXT NOT NULL,
    "heading" TEXT NOT NULL,
    "sortOrder" INTEGER NOT NULL,
    "status" "ContentStatus" NOT NULL DEFAULT 'DRAFT',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "footer_columns_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "footer_links" (
    "id" TEXT NOT NULL,
    "columnId" TEXT NOT NULL,
    "label" TEXT NOT NULL,
    "href" TEXT NOT NULL,
    "external" BOOLEAN NOT NULL DEFAULT false,
    "sortOrder" INTEGER NOT NULL,

    CONSTRAINT "footer_links_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "social_links" (
    "id" TEXT NOT NULL,
    "platform" TEXT NOT NULL,
    "href" TEXT NOT NULL,
    "ariaLabel" TEXT NOT NULL,
    "sortOrder" INTEGER NOT NULL,
    "status" "ContentStatus" NOT NULL DEFAULT 'DRAFT',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "social_links_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "search_suggestions" (
    "id" TEXT NOT NULL,
    "label" TEXT NOT NULL,
    "query" TEXT NOT NULL,
    "mode" TEXT NOT NULL DEFAULT 'all',
    "sortOrder" INTEGER NOT NULL,
    "status" "ContentStatus" NOT NULL DEFAULT 'DRAFT',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "search_suggestions_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "filter_chips" (
    "id" TEXT NOT NULL,
    "label" TEXT NOT NULL,
    "value" TEXT NOT NULL,
    "defaultActive" BOOLEAN NOT NULL DEFAULT false,
    "sortOrder" INTEGER NOT NULL,
    "status" "ContentStatus" NOT NULL DEFAULT 'DRAFT',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "filter_chips_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "discovery_cards" (
    "id" TEXT NOT NULL,
    "label" TEXT NOT NULL,
    "heading" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "href" TEXT NOT NULL,
    "imageMediaId" TEXT,
    "sortOrder" INTEGER NOT NULL,
    "status" "ContentStatus" NOT NULL DEFAULT 'DRAFT',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "discovery_cards_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "site_copy" (
    "id" TEXT NOT NULL,
    "key" TEXT NOT NULL,
    "value" JSONB NOT NULL,
    "description" TEXT,
    "status" "ContentStatus" NOT NULL DEFAULT 'DRAFT',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "site_copy_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "leads" (
    "id" TEXT NOT NULL,
    "source" "LeadSource" NOT NULL,
    "name" TEXT,
    "email" TEXT NOT NULL,
    "phone" TEXT,
    "message" TEXT,
    "propertyId" TEXT,
    "assignedAgentId" TEXT,
    "assignedUserId" TEXT,
    "status" "LeadStatus" NOT NULL DEFAULT 'NEW',
    "internalNotes" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "leads_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ai_agents" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "type" "AiActorType" NOT NULL,
    "responsibility" TEXT NOT NULL,
    "allowedPaths" TEXT[],
    "forbiddenPaths" TEXT[],
    "status" "AiRecordStatus" NOT NULL DEFAULT 'ACTIVE',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "ai_agents_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ai_skills" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "ownerAgentId" TEXT,
    "requiredInputs" TEXT[],
    "expectedOutputs" TEXT[],
    "verificationChecklist" TEXT[],
    "status" "AiRecordStatus" NOT NULL DEFAULT 'ACTIVE',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "ai_skills_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ai_rules" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "category" TEXT NOT NULL,
    "severity" TEXT NOT NULL,
    "ruleText" TEXT NOT NULL,
    "appliesTo" TEXT[],
    "active" BOOLEAN NOT NULL DEFAULT true,
    "status" "AiRecordStatus" NOT NULL DEFAULT 'ACTIVE',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "ai_rules_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "quality_standards" (
    "id" TEXT NOT NULL,
    "category" TEXT NOT NULL,
    "requirement" TEXT NOT NULL,
    "evidenceRequired" TEXT NOT NULL,
    "gateMapping" TEXT NOT NULL,
    "status" "AiRecordStatus" NOT NULL DEFAULT 'ACTIVE',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "quality_standards_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ai_tasks" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "ownerName" TEXT NOT NULL,
    "ownerAgentId" TEXT,
    "agentRole" TEXT NOT NULL,
    "status" "AiTaskStatus" NOT NULL DEFAULT 'PLANNED',
    "priority" "TaskPriority" NOT NULL DEFAULT 'MEDIUM',
    "branch" TEXT,
    "allowedFiles" TEXT[],
    "forbiddenFiles" TEXT[],
    "verificationCommands" TEXT[],
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "ai_tasks_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ai_task_handoffs" (
    "id" TEXT NOT NULL,
    "taskId" TEXT NOT NULL,
    "filesTouched" TEXT[],
    "commandsRun" TEXT[],
    "result" TEXT NOT NULL,
    "nextStep" TEXT,
    "reviewLink" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "ai_task_handoffs_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "audit_runs" (
    "id" TEXT NOT NULL,
    "gate" TEXT NOT NULL,
    "taskId" TEXT,
    "status" "AuditStatus" NOT NULL DEFAULT 'PENDING',
    "evidencePath" TEXT,
    "reviewer" TEXT,
    "completedAt" TIMESTAMP(3),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "audit_runs_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "audit_logs" (
    "id" TEXT NOT NULL,
    "actorId" TEXT,
    "action" TEXT NOT NULL,
    "entityType" TEXT NOT NULL,
    "entityId" TEXT NOT NULL,
    "before" JSONB,
    "after" JSONB,
    "metadata" JSONB,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "audit_logs_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "admin_users_externalAuthId_key" ON "admin_users"("externalAuthId");

-- CreateIndex
CREATE UNIQUE INDEX "admin_users_email_key" ON "admin_users"("email");

-- CreateIndex
CREATE UNIQUE INDEX "media_assets_storageKey_key" ON "media_assets"("storageKey");

-- CreateIndex
CREATE INDEX "media_assets_createdById_idx" ON "media_assets"("createdById");

-- CreateIndex
CREATE UNIQUE INDEX "properties_slug_key" ON "properties"("slug");

-- CreateIndex
CREATE INDEX "properties_status_mode_idx" ON "properties"("status", "mode");

-- CreateIndex
CREATE INDEX "properties_featured_status_idx" ON "properties"("featured", "status");

-- CreateIndex
CREATE INDEX "properties_assignedAgentId_idx" ON "properties"("assignedAgentId");

-- CreateIndex
CREATE INDEX "property_images_mediaAssetId_idx" ON "property_images"("mediaAssetId");

-- CreateIndex
CREATE UNIQUE INDEX "property_images_propertyId_sortOrder_key" ON "property_images"("propertyId", "sortOrder");

-- CreateIndex
CREATE UNIQUE INDEX "real_estate_agents_slug_key" ON "real_estate_agents"("slug");

-- CreateIndex
CREATE INDEX "real_estate_agents_status_featured_idx" ON "real_estate_agents"("status", "featured");

-- CreateIndex
CREATE INDEX "real_estate_agents_avatarMediaId_idx" ON "real_estate_agents"("avatarMediaId");

-- CreateIndex
CREATE UNIQUE INDEX "editorial_posts_slug_key" ON "editorial_posts"("slug");

-- CreateIndex
CREATE INDEX "editorial_posts_type_status_publishedAt_idx" ON "editorial_posts"("type", "status", "publishedAt");

-- CreateIndex
CREATE INDEX "editorial_posts_coverMediaId_idx" ON "editorial_posts"("coverMediaId");

-- CreateIndex
CREATE INDEX "site_nav_items_location_status_idx" ON "site_nav_items"("location", "status");

-- CreateIndex
CREATE UNIQUE INDEX "site_nav_items_location_sortOrder_key" ON "site_nav_items"("location", "sortOrder");

-- CreateIndex
CREATE UNIQUE INDEX "footer_columns_sortOrder_key" ON "footer_columns"("sortOrder");

-- CreateIndex
CREATE UNIQUE INDEX "footer_links_columnId_sortOrder_key" ON "footer_links"("columnId", "sortOrder");

-- CreateIndex
CREATE UNIQUE INDEX "social_links_sortOrder_key" ON "social_links"("sortOrder");

-- CreateIndex
CREATE INDEX "search_suggestions_status_mode_idx" ON "search_suggestions"("status", "mode");

-- CreateIndex
CREATE UNIQUE INDEX "search_suggestions_mode_sortOrder_key" ON "search_suggestions"("mode", "sortOrder");

-- CreateIndex
CREATE UNIQUE INDEX "filter_chips_sortOrder_key" ON "filter_chips"("sortOrder");

-- CreateIndex
CREATE INDEX "discovery_cards_imageMediaId_idx" ON "discovery_cards"("imageMediaId");

-- CreateIndex
CREATE UNIQUE INDEX "discovery_cards_sortOrder_key" ON "discovery_cards"("sortOrder");

-- CreateIndex
CREATE UNIQUE INDEX "site_copy_key_key" ON "site_copy"("key");

-- CreateIndex
CREATE INDEX "site_copy_status_idx" ON "site_copy"("status");

-- CreateIndex
CREATE INDEX "leads_status_createdAt_idx" ON "leads"("status", "createdAt");

-- CreateIndex
CREATE INDEX "leads_propertyId_idx" ON "leads"("propertyId");

-- CreateIndex
CREATE INDEX "leads_assignedAgentId_idx" ON "leads"("assignedAgentId");

-- CreateIndex
CREATE INDEX "leads_assignedUserId_idx" ON "leads"("assignedUserId");

-- CreateIndex
CREATE UNIQUE INDEX "ai_agents_name_key" ON "ai_agents"("name");

-- CreateIndex
CREATE UNIQUE INDEX "ai_skills_name_key" ON "ai_skills"("name");

-- CreateIndex
CREATE INDEX "ai_skills_ownerAgentId_idx" ON "ai_skills"("ownerAgentId");

-- CreateIndex
CREATE INDEX "ai_rules_category_active_idx" ON "ai_rules"("category", "active");

-- CreateIndex
CREATE INDEX "quality_standards_category_idx" ON "quality_standards"("category");

-- CreateIndex
CREATE INDEX "ai_tasks_status_priority_idx" ON "ai_tasks"("status", "priority");

-- CreateIndex
CREATE INDEX "ai_tasks_ownerAgentId_idx" ON "ai_tasks"("ownerAgentId");

-- CreateIndex
CREATE INDEX "ai_task_handoffs_taskId_createdAt_idx" ON "ai_task_handoffs"("taskId", "createdAt");

-- CreateIndex
CREATE INDEX "audit_runs_taskId_gate_idx" ON "audit_runs"("taskId", "gate");

-- CreateIndex
CREATE INDEX "audit_logs_entityType_entityId_idx" ON "audit_logs"("entityType", "entityId");

-- CreateIndex
CREATE INDEX "audit_logs_actorId_createdAt_idx" ON "audit_logs"("actorId", "createdAt");

-- AddForeignKey
ALTER TABLE "media_assets" ADD CONSTRAINT "media_assets_createdById_fkey" FOREIGN KEY ("createdById") REFERENCES "admin_users"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "properties" ADD CONSTRAINT "properties_assignedAgentId_fkey" FOREIGN KEY ("assignedAgentId") REFERENCES "real_estate_agents"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "property_images" ADD CONSTRAINT "property_images_propertyId_fkey" FOREIGN KEY ("propertyId") REFERENCES "properties"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "property_images" ADD CONSTRAINT "property_images_mediaAssetId_fkey" FOREIGN KEY ("mediaAssetId") REFERENCES "media_assets"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "real_estate_agents" ADD CONSTRAINT "real_estate_agents_avatarMediaId_fkey" FOREIGN KEY ("avatarMediaId") REFERENCES "media_assets"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "editorial_posts" ADD CONSTRAINT "editorial_posts_coverMediaId_fkey" FOREIGN KEY ("coverMediaId") REFERENCES "media_assets"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "footer_links" ADD CONSTRAINT "footer_links_columnId_fkey" FOREIGN KEY ("columnId") REFERENCES "footer_columns"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "discovery_cards" ADD CONSTRAINT "discovery_cards_imageMediaId_fkey" FOREIGN KEY ("imageMediaId") REFERENCES "media_assets"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "leads" ADD CONSTRAINT "leads_propertyId_fkey" FOREIGN KEY ("propertyId") REFERENCES "properties"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "leads" ADD CONSTRAINT "leads_assignedAgentId_fkey" FOREIGN KEY ("assignedAgentId") REFERENCES "real_estate_agents"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "leads" ADD CONSTRAINT "leads_assignedUserId_fkey" FOREIGN KEY ("assignedUserId") REFERENCES "admin_users"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ai_skills" ADD CONSTRAINT "ai_skills_ownerAgentId_fkey" FOREIGN KEY ("ownerAgentId") REFERENCES "ai_agents"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ai_tasks" ADD CONSTRAINT "ai_tasks_ownerAgentId_fkey" FOREIGN KEY ("ownerAgentId") REFERENCES "ai_agents"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ai_task_handoffs" ADD CONSTRAINT "ai_task_handoffs_taskId_fkey" FOREIGN KEY ("taskId") REFERENCES "ai_tasks"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "audit_runs" ADD CONSTRAINT "audit_runs_taskId_fkey" FOREIGN KEY ("taskId") REFERENCES "ai_tasks"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "audit_logs" ADD CONSTRAINT "audit_logs_actorId_fkey" FOREIGN KEY ("actorId") REFERENCES "admin_users"("id") ON DELETE SET NULL ON UPDATE CASCADE;
