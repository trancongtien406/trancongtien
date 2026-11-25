/**
 * Rich seed for AI Project Estimator — products, features, questions, pricing, rules.
 */
import type { PrismaClient } from "../lib/generated/prisma/client";

type FeatureDef = {
  key: string;
  name: string;
  description?: string;
  category: string;
  complexity?: "VERY_LOW" | "LOW" | "MEDIUM" | "HIGH" | "VERY_HIGH";
  baseUnits: number;
  priority?: "MUST_HAVE" | "SHOULD_HAVE" | "NICE_TO_HAVE" | "GROWTH" | "SCALE";
  technicalRisk?: "VERY_LOW" | "LOW" | "MEDIUM" | "HIGH" | "VERY_HIGH";
  optional?: boolean;
};

type DepDef = { from: string; to: string; type?: "REQUIRES" | "RECOMMENDS"; message?: string };

async function upsertProduct(
  prisma: PrismaClient,
  data: {
    key: string;
    name: string;
    description: string;
    baseUnits: number;
    sortOrder: number;
    templates: Array<{
      key: string;
      name: string;
      description: string;
      coreFeatureKeys: string[];
      businessModels: string[];
      sortOrder: number;
    }>;
    features: FeatureDef[];
    deps: DepDef[];
  },
) {
  const product = await prisma.estimatorProduct.upsert({
    where: { key: data.key },
    create: {
      key: data.key,
      name: data.name,
      description: data.description,
      baseUnits: data.baseUnits,
      sortOrder: data.sortOrder,
      active: true,
    },
    update: {
      name: data.name,
      description: data.description,
      baseUnits: data.baseUnits,
      sortOrder: data.sortOrder,
      active: true,
    },
  });

  for (const t of data.templates) {
    await prisma.productTemplate.upsert({
      where: { productId_key: { productId: product.id, key: t.key } },
      create: {
        productId: product.id,
        key: t.key,
        name: t.name,
        description: t.description,
        coreFeatureKeys: JSON.stringify(t.coreFeatureKeys),
        businessModels: JSON.stringify(t.businessModels),
        sortOrder: t.sortOrder,
        active: true,
      },
      update: {
        name: t.name,
        description: t.description,
        coreFeatureKeys: JSON.stringify(t.coreFeatureKeys),
        businessModels: JSON.stringify(t.businessModels),
        sortOrder: t.sortOrder,
        active: true,
      },
    });
  }

  const featureIds = new Map<string, string>();
  let order = 0;
  for (const f of data.features) {
    const row = await prisma.estimatorFeature.upsert({
      where: { productId_key: { productId: product.id, key: f.key } },
      create: {
        productId: product.id,
        key: f.key,
        name: f.name,
        description: f.description || "",
        category: f.category,
        complexity: f.complexity || "MEDIUM",
        baseUnits: f.baseUnits,
        priority: f.priority || "SHOULD_HAVE",
        technicalRisk: f.technicalRisk || "LOW",
        optional: f.optional ?? true,
        sortOrder: order++,
        active: true,
      },
      update: {
        name: f.name,
        description: f.description || "",
        category: f.category,
        complexity: f.complexity || "MEDIUM",
        baseUnits: f.baseUnits,
        priority: f.priority || "SHOULD_HAVE",
        technicalRisk: f.technicalRisk || "LOW",
        optional: f.optional ?? true,
        sortOrder: order,
        active: true,
      },
    });
    featureIds.set(f.key, row.id);
  }

  for (const d of data.deps) {
    const fromId = featureIds.get(d.from);
    const toId = featureIds.get(d.to);
    if (!fromId || !toId) continue;
    const type = d.type || "REQUIRES";
    const existing = await prisma.featureDependency.findFirst({
      where: { fromFeatureId: fromId, toFeatureId: toId, type },
    });
    if (!existing) {
      await prisma.featureDependency.create({
        data: {
          fromFeatureId: fromId,
          toFeatureId: toId,
          type,
          message: d.message,
        },
      });
    }
  }

  return product;
}

async function upsertQuestion(
  prisma: PrismaClient,
  q: {
    key: string;
    type:
      | "TEXT"
      | "TEXTAREA"
      | "SINGLE_SELECT"
      | "MULTI_SELECT"
      | "NUMBER"
      | "RANGE"
      | "SLIDER"
      | "BOOLEAN"
      | "FEATURE_SELECTOR"
      | "TIMELINE"
      | "BUDGET"
      | "AI_FREE_TEXT";
    section: string;
    title: string;
    description?: string;
    sortOrder: number;
    productKey?: string;
    required?: boolean;
    config?: Record<string, unknown>;
    options?: Array<{ value: string; label: string }>;
    rules?: Array<{ definition: object }>;
  },
) {
  let productId: string | undefined;
  if (q.productKey) {
    const p = await prisma.estimatorProduct.findUnique({ where: { key: q.productKey } });
    productId = p?.id;
  }

  const row = await prisma.estimatorQuestion.upsert({
    where: { key: q.key },
    create: {
      key: q.key,
      type: q.type,
      section: q.section,
      title: q.title,
      description: q.description || "",
      sortOrder: q.sortOrder,
      productId: productId || null,
      required: q.required ?? true,
      config: JSON.stringify(q.config || {}),
      active: true,
    },
    update: {
      type: q.type,
      section: q.section,
      title: q.title,
      description: q.description || "",
      sortOrder: q.sortOrder,
      productId: productId || null,
      required: q.required ?? true,
      config: JSON.stringify(q.config || {}),
      active: true,
    },
  });

  if (q.options) {
    await prisma.questionOption.deleteMany({ where: { questionId: row.id } });
    for (let i = 0; i < q.options.length; i++) {
      const opt = q.options[i];
      await prisma.questionOption.create({
        data: {
          questionId: row.id,
          value: opt.value,
          label: opt.label,
          sortOrder: i,
        },
      });
    }
  }

  if (q.rules) {
    await prisma.questionRule.deleteMany({ where: { questionId: row.id } });
    for (let i = 0; i < q.rules.length; i++) {
      await prisma.questionRule.create({
        data: {
          questionId: row.id,
          definition: JSON.stringify(q.rules[i].definition),
          sortOrder: i,
          active: true,
        },
      });
    }
  }

  return row;
}

export async function seedEstimator(prisma: PrismaClient) {
  // Pricing
  await prisma.pricingVersion.updateMany({ data: { active: false } });
  await prisma.pricingVersion.upsert({
    where: { key: "v1" },
    create: {
      key: "v1",
      name: "Pricing 2026 Q3",
      active: true,
      unitValueVnd: 1_000_000,
      minimumProjectVnd: 8_000_000,
      riskBufferLow: 0.05,
      riskBufferMedium: 0.1,
      riskBufferHigh: 0.2,
      rushCoefficient: 1.25,
      rangePadding: 0.12,
      businessModelCoeffs: JSON.stringify({
        SINGLE_SHOP: 1,
        MULTI_BRANCH: 1.2,
        MARKETPLACE: 1.5,
        SAAS: 1.7,
        MULTI_TENANT: 1.8,
      }),
      scaleCoeffs: JSON.stringify({
        LT_1K: 1,
        "1K_10K": 1.15,
        "10K_100K": 1.35,
        GT_100K: 1.6,
      }),
      notes: "1 DU = 1M. MVP lean: web core ~15M, mobile core ~20M; thêm module ngoài core thì full giá.",
    },
    update: {
      name: "Pricing 2026 Q3",
      active: true,
      unitValueVnd: 1_000_000,
      minimumProjectVnd: 8_000_000,
      notes: "1 DU = 1M. MVP lean: web core ~15M, mobile core ~20M; thêm module ngoài core thì full giá.",
      businessModelCoeffs: JSON.stringify({
        SINGLE_SHOP: 1,
        MULTI_BRANCH: 1.2,
        MARKETPLACE: 1.5,
        SAAS: 1.7,
        MULTI_TENANT: 1.8,
      }),
      scaleCoeffs: JSON.stringify({
        LT_1K: 1,
        "1K_10K": 1.15,
        "10K_100K": 1.35,
        GT_100K: 1.6,
      }),
    },
  });

  // ── WEBSITE ──────────────────────────────────────────────
  await upsertProduct(prisma, {
    key: "WEBSITE",
    name: "Website",
    description: "Corporate, landing, e-commerce, booking và web platform.",
    baseUnits: 8,
    sortOrder: 1,
    templates: [
      {
        key: "corporate",
        name: "Corporate / Business Website",
        description: "Website giới thiệu doanh nghiệp, dịch vụ, liên hệ.",
        coreFeatureKeys: ["pages", "cms_basic", "contact_form", "admin"],
        businessModels: ["SINGLE_SHOP"],
        sortOrder: 1,
      },
      {
        key: "ecommerce",
        name: "E-commerce Website",
        description: "Bán hàng online: catalog, giỏ, checkout, đơn hàng.",
        coreFeatureKeys: [
          "product_catalog",
          "category",
          "cart",
          "checkout",
          "order",
          "admin",
        ],
        businessModels: ["SINGLE_SHOP", "MULTI_BRANCH", "MARKETPLACE", "SAAS"],
        sortOrder: 2,
      },
      {
        key: "booking",
        name: "Booking System",
        description: "Đặt lịch dịch vụ, spa, clinic, consulting.",
        coreFeatureKeys: [
          "service_catalog",
          "availability",
          "calendar",
          "booking",
          "customer_account",
          "admin",
        ],
        businessModels: ["SINGLE_SHOP", "MULTI_BRANCH"],
        sortOrder: 3,
      },
    ],
    features: [
      { key: "pages", name: "Trang nội dung", category: "Content", baseUnits: 3, priority: "MUST_HAVE", optional: false },
      { key: "cms_basic", name: "CMS cơ bản", category: "Content", baseUnits: 4, priority: "MUST_HAVE", optional: false },
      { key: "contact_form", name: "Form liên hệ", category: "Content", baseUnits: 2, priority: "MUST_HAVE", complexity: "LOW", optional: false },
      { key: "blog", name: "Blog / News", category: "Content", baseUnits: 4, priority: "NICE_TO_HAVE" },
      { key: "seo", name: "SEO nâng cao", category: "Content", baseUnits: 3, priority: "SHOULD_HAVE", complexity: "LOW" },
      { key: "product_catalog", name: "Catalog sản phẩm", category: "Catalog", baseUnits: 5, priority: "MUST_HAVE", optional: false },
      { key: "category", name: "Danh mục", category: "Catalog", baseUnits: 2, priority: "MUST_HAVE", complexity: "LOW", optional: false },
      { key: "variant", name: "Biến thể sản phẩm", category: "Catalog", baseUnits: 4, priority: "SHOULD_HAVE" },
      { key: "search", name: "Tìm kiếm", category: "Catalog", baseUnits: 3, priority: "SHOULD_HAVE" },
      { key: "filter", name: "Bộ lọc", category: "Catalog", baseUnits: 3, priority: "SHOULD_HAVE" },
      { key: "recommendation", name: "Gợi ý sản phẩm", category: "Catalog", baseUnits: 5, priority: "GROWTH", complexity: "HIGH" },
      { key: "cart", name: "Giỏ hàng", category: "Commerce", baseUnits: 4, priority: "MUST_HAVE", optional: false },
      { key: "checkout", name: "Checkout", category: "Commerce", baseUnits: 5, priority: "MUST_HAVE", optional: false },
      { key: "coupon", name: "Mã giảm giá", category: "Commerce", baseUnits: 3, priority: "NICE_TO_HAVE" },
      { key: "flash_sale", name: "Flash sale", category: "Commerce", baseUnits: 4, priority: "GROWTH" },
      { key: "customer_account", name: "Tài khoản khách", category: "Customer", baseUnits: 4, priority: "SHOULD_HAVE" },
      { key: "wishlist", name: "Wishlist", category: "Customer", baseUnits: 2, priority: "NICE_TO_HAVE", complexity: "LOW" },
      { key: "address_book", name: "Sổ địa chỉ", category: "Customer", baseUnits: 2, priority: "SHOULD_HAVE", complexity: "LOW" },
      { key: "order", name: "Quản lý đơn hàng", category: "Order", baseUnits: 5, priority: "MUST_HAVE", optional: false },
      { key: "order_tracking", name: "Theo dõi đơn", category: "Order", baseUnits: 3, priority: "SHOULD_HAVE" },
      { key: "return_refund", name: "Đổi trả / hoàn tiền", category: "Order", baseUnits: 5, priority: "GROWTH", complexity: "HIGH" },
      { key: "online_payment", name: "Thanh toán online", category: "Payment", baseUnits: 5, priority: "SHOULD_HAVE", technicalRisk: "MEDIUM" },
      { key: "cod", name: "COD", category: "Payment", baseUnits: 1, priority: "SHOULD_HAVE", complexity: "VERY_LOW" },
      { key: "inventory", name: "Tồn kho", category: "Operations", baseUnits: 5, priority: "SHOULD_HAVE" },
      { key: "multi_branch", name: "Đa chi nhánh", category: "Operations", baseUnits: 6, priority: "GROWTH", complexity: "HIGH" },
      { key: "loyalty", name: "Loyalty / điểm thưởng", category: "Marketing", baseUnits: 5, priority: "GROWTH" },
      { key: "email_marketing", name: "Email marketing", category: "Marketing", baseUnits: 3, priority: "NICE_TO_HAVE" },
      { key: "service_catalog", name: "Danh mục dịch vụ", category: "Booking", baseUnits: 3, priority: "MUST_HAVE", optional: false },
      { key: "availability", name: "Lịch trống", category: "Booking", baseUnits: 4, priority: "MUST_HAVE", optional: false },
      { key: "calendar", name: "Calendar", category: "Booking", baseUnits: 4, priority: "MUST_HAVE", optional: false },
      { key: "booking", name: "Đặt lịch", category: "Booking", baseUnits: 5, priority: "MUST_HAVE", optional: false },
      { key: "staff", name: "Nhân sự / kỹ thuật viên", category: "Booking", baseUnits: 4, priority: "SHOULD_HAVE" },
      { key: "reminder", name: "Nhắc lịch", category: "Booking", baseUnits: 3, priority: "SHOULD_HAVE" },
      { key: "cancellation", name: "Huỷ / đổi lịch", category: "Booking", baseUnits: 3, priority: "SHOULD_HAVE" },
      { key: "admin", name: "Admin dashboard", category: "Admin", baseUnits: 5, priority: "MUST_HAVE", optional: false },
      { key: "roles", name: "Phân quyền", category: "Admin", baseUnits: 4, priority: "SHOULD_HAVE" },
      { key: "reporting", name: "Báo cáo", category: "Admin", baseUnits: 4, priority: "SHOULD_HAVE" },
      { key: "chat", name: "Chat hỗ trợ", category: "Communication", baseUnits: 5, priority: "NICE_TO_HAVE", technicalRisk: "MEDIUM" },
      { key: "ai_assistant", name: "AI tư vấn", category: "AI", baseUnits: 8, priority: "GROWTH", complexity: "VERY_HIGH", technicalRisk: "HIGH" },
    ],
    deps: [
      { from: "wishlist", to: "customer_account", message: "Wishlist cần tài khoản khách" },
      { from: "online_payment", to: "checkout", message: "Payment cần checkout" },
      { from: "checkout", to: "cart", message: "Checkout cần giỏ hàng" },
      { from: "cart", to: "product_catalog" },
      { from: "order", to: "checkout" },
      { from: "loyalty", to: "customer_account", type: "RECOMMENDS" },
      { from: "booking", to: "availability" },
      { from: "booking", to: "calendar" },
      { from: "reminder", to: "booking" },
      { from: "return_refund", to: "order" },
      { from: "order_tracking", to: "order" },
    ],
  });

  // ── MOBILE APP ───────────────────────────────────────────
  await upsertProduct(prisma, {
    key: "MOBILE_APP",
    name: "Mobile Application",
    description: "Ứng dụng iOS/Android (Flutter) cho khách hoặc nội bộ.",
    baseUnits: 8,
    sortOrder: 2,
    templates: [
      {
        key: "customer_app",
        name: "Customer App",
        description: "App dành cho khách hàng cuối.",
        coreFeatureKeys: ["auth", "home", "profile", "push_notification", "admin_api"],
        businessModels: ["SINGLE_SHOP", "MARKETPLACE"],
        sortOrder: 1,
      },
      {
        key: "employee_app",
        name: "Employee / Internal App",
        description: "App vận hành nội bộ.",
        coreFeatureKeys: ["auth", "roles_mobile", "task_list", "admin_api"],
        businessModels: ["SINGLE_SHOP", "MULTI_BRANCH"],
        sortOrder: 2,
      },
    ],
    features: [
      { key: "auth", name: "Đăng nhập / OTP", category: "Core", baseUnits: 4, priority: "MUST_HAVE", optional: false },
      { key: "home", name: "Home & navigation", category: "Core", baseUnits: 3, priority: "MUST_HAVE", optional: false },
      { key: "profile", name: "Hồ sơ người dùng", category: "Core", baseUnits: 3, priority: "MUST_HAVE", optional: false },
      { key: "push_notification", name: "Push notification", category: "Engagement", baseUnits: 4, priority: "SHOULD_HAVE", technicalRisk: "MEDIUM" },
      { key: "offline", name: "Offline mode", category: "Engagement", baseUnits: 6, priority: "GROWTH", complexity: "HIGH", technicalRisk: "HIGH" },
      { key: "location", name: "Định vị / maps", category: "Location", baseUnits: 5, priority: "SHOULD_HAVE", technicalRisk: "MEDIUM" },
      { key: "camera", name: "Camera / upload", category: "Media", baseUnits: 3, priority: "SHOULD_HAVE" },
      { key: "chat_mobile", name: "In-app chat", category: "Communication", baseUnits: 6, priority: "NICE_TO_HAVE", technicalRisk: "MEDIUM" },
      { key: "payments_mobile", name: "In-app payment", category: "Payment", baseUnits: 6, priority: "SHOULD_HAVE", technicalRisk: "HIGH" },
      { key: "booking_mobile", name: "Đặt lịch trên app", category: "Booking", baseUnits: 5, priority: "SHOULD_HAVE" },
      { key: "task_list", name: "Công việc / checklist", category: "Internal", baseUnits: 4, priority: "MUST_HAVE" },
      { key: "roles_mobile", name: "Phân quyền mobile", category: "Internal", baseUnits: 4, priority: "MUST_HAVE" },
      { key: "admin_api", name: "Backend API + Admin", category: "Backend", baseUnits: 6, priority: "MUST_HAVE", optional: false },
      { key: "realtime", name: "Realtime sync", category: "Scale", baseUnits: 7, priority: "GROWTH", complexity: "HIGH", technicalRisk: "HIGH" },
    ],
    deps: [
      { from: "chat_mobile", to: "auth" },
      { from: "payments_mobile", to: "auth" },
      { from: "booking_mobile", to: "auth" },
      { from: "offline", to: "auth", type: "RECOMMENDS" },
      { from: "realtime", to: "admin_api" },
    ],
  });

  // ── BUSINESS SOFTWARE ────────────────────────────────────
  await upsertProduct(prisma, {
    key: "BUSINESS_SOFTWARE",
    name: "Business Software",
    description: "CRM, inventory, booking ops, workflow, reporting.",
    baseUnits: 30,
    sortOrder: 3,
    templates: [
      {
        key: "crm",
        name: "CRM / Lead Ops",
        description: "Quản lý khách, pipeline, follow-up.",
        coreFeatureKeys: ["contacts", "pipeline", "activities", "admin_biz"],
        businessModels: ["SINGLE_SHOP", "MULTI_BRANCH"],
        sortOrder: 1,
      },
      {
        key: "ops",
        name: "Operations System",
        description: "Vận hành nội bộ: đơn, kho, nhân sự.",
        coreFeatureKeys: ["orders_ops", "inventory_ops", "staff_ops", "admin_biz"],
        businessModels: ["SINGLE_SHOP", "MULTI_BRANCH"],
        sortOrder: 2,
      },
    ],
    features: [
      { key: "contacts", name: "Danh bạ khách", category: "CRM", baseUnits: 4, priority: "MUST_HAVE", optional: false },
      { key: "pipeline", name: "Pipeline / deal", category: "CRM", baseUnits: 5, priority: "MUST_HAVE", optional: false },
      { key: "activities", name: "Timeline hoạt động", category: "CRM", baseUnits: 4, priority: "MUST_HAVE", optional: false },
      { key: "orders_ops", name: "Đơn vận hành", category: "Ops", baseUnits: 5, priority: "MUST_HAVE", optional: false },
      { key: "inventory_ops", name: "Kho vận hành", category: "Ops", baseUnits: 5, priority: "MUST_HAVE", optional: false },
      { key: "staff_ops", name: "Nhân sự", category: "Ops", baseUnits: 4, priority: "SHOULD_HAVE" },
      { key: "workflow", name: "Workflow tự động", category: "Automation", baseUnits: 6, priority: "GROWTH", complexity: "HIGH" },
      { key: "reporting_biz", name: "Báo cáo nâng cao", category: "Analytics", baseUnits: 5, priority: "SHOULD_HAVE" },
      { key: "admin_biz", name: "Admin & phân quyền", category: "Admin", baseUnits: 5, priority: "MUST_HAVE", optional: false },
      { key: "integrations_biz", name: "Tích hợp bên thứ ba", category: "Integration", baseUnits: 5, priority: "SHOULD_HAVE", technicalRisk: "MEDIUM" },
    ],
    deps: [
      { from: "pipeline", to: "contacts" },
      { from: "activities", to: "contacts" },
      { from: "workflow", to: "admin_biz", type: "RECOMMENDS" },
    ],
  });

  // ── SAAS ─────────────────────────────────────────────────
  await upsertProduct(prisma, {
    key: "SAAS",
    name: "SaaS Product",
    description: "Sản phẩm SaaS multi-tenant với billing.",
    baseUnits: 40,
    sortOrder: 4,
    templates: [
      {
        key: "saas_core",
        name: "SaaS Core",
        description: "Tenant, billing, roles, core modules.",
        coreFeatureKeys: ["tenants", "billing", "saas_roles", "saas_admin"],
        businessModels: ["SAAS", "MULTI_TENANT"],
        sortOrder: 1,
      },
    ],
    features: [
      { key: "tenants", name: "Multi-tenant isolation", category: "Platform", baseUnits: 10, priority: "MUST_HAVE", complexity: "VERY_HIGH", technicalRisk: "HIGH", optional: false },
      { key: "billing", name: "Subscription billing", category: "Platform", baseUnits: 8, priority: "MUST_HAVE", complexity: "HIGH", technicalRisk: "HIGH", optional: false },
      { key: "usage_limits", name: "Usage limits / quotas", category: "Platform", baseUnits: 5, priority: "SHOULD_HAVE" },
      { key: "saas_roles", name: "Roles theo tenant", category: "Platform", baseUnits: 5, priority: "MUST_HAVE", optional: false },
      { key: "saas_admin", name: "Platform admin", category: "Platform", baseUnits: 6, priority: "MUST_HAVE", optional: false },
      { key: "onboarding", name: "Onboarding wizard", category: "UX", baseUnits: 4, priority: "SHOULD_HAVE" },
      { key: "api_public", name: "Public API", category: "Platform", baseUnits: 6, priority: "GROWTH", technicalRisk: "MEDIUM" },
    ],
    deps: [
      { from: "billing", to: "tenants" },
      { from: "usage_limits", to: "billing" },
      { from: "saas_roles", to: "tenants" },
    ],
  });

  // ── MARKETPLACE ──────────────────────────────────────────
  await upsertProduct(prisma, {
    key: "MARKETPLACE",
    name: "Marketplace",
    description: "Sàn kết nối buyer–seller với listing và giao dịch.",
    baseUnits: 45,
    sortOrder: 5,
    templates: [
      {
        key: "marketplace_core",
        name: "Marketplace Core",
        description: "Buyer, seller, listing, order/booking, admin.",
        coreFeatureKeys: ["buyer", "seller", "listing", "search_mp", "order_mp", "admin_mp"],
        businessModels: ["MARKETPLACE"],
        sortOrder: 1,
      },
    ],
    features: [
      { key: "buyer", name: "Buyer accounts", category: "Actors", baseUnits: 4, priority: "MUST_HAVE", optional: false },
      { key: "seller", name: "Seller onboarding", category: "Actors", baseUnits: 6, priority: "MUST_HAVE", optional: false },
      { key: "listing", name: "Listing / catalog", category: "Core", baseUnits: 6, priority: "MUST_HAVE", optional: false },
      { key: "search_mp", name: "Search & discovery", category: "Core", baseUnits: 5, priority: "MUST_HAVE", optional: false },
      { key: "order_mp", name: "Order / booking flow", category: "Core", baseUnits: 7, priority: "MUST_HAVE", optional: false },
      { key: "chat_mp", name: "Buyer–seller chat", category: "Communication", baseUnits: 6, priority: "SHOULD_HAVE", technicalRisk: "MEDIUM" },
      { key: "payment_mp", name: "Payment & escrow", category: "Payment", baseUnits: 8, priority: "SHOULD_HAVE", complexity: "HIGH", technicalRisk: "HIGH" },
      { key: "commission_mp", name: "Commission engine", category: "Ops", baseUnits: 5, priority: "SHOULD_HAVE" },
      { key: "review_mp", name: "Reviews", category: "Trust", baseUnits: 3, priority: "SHOULD_HAVE" },
      { key: "dispute", name: "Dispute / moderation", category: "Trust", baseUnits: 6, priority: "GROWTH", complexity: "HIGH" },
      { key: "admin_mp", name: "Marketplace admin", category: "Admin", baseUnits: 6, priority: "MUST_HAVE", optional: false },
    ],
    deps: [
      { from: "listing", to: "seller" },
      { from: "order_mp", to: "listing" },
      { from: "payment_mp", to: "order_mp" },
      { from: "commission_mp", to: "payment_mp" },
      { from: "chat_mp", to: "buyer" },
      { from: "dispute", to: "order_mp" },
    ],
  });

  // ── AI SOLUTION ──────────────────────────────────────────
  await upsertProduct(prisma, {
    key: "AI_SOLUTION",
    name: "AI & Automation",
    description: "Trợ lý AI, automation, knowledge base, agents.",
    baseUnits: 35,
    sortOrder: 6,
    templates: [
      {
        key: "ai_assistant",
        name: "AI Assistant",
        description: "Chatbot / copilot trên dữ liệu doanh nghiệp.",
        coreFeatureKeys: ["llm_gateway", "knowledge_base", "chat_ui", "admin_ai"],
        businessModels: ["SINGLE_SHOP", "SAAS"],
        sortOrder: 1,
      },
    ],
    features: [
      { key: "llm_gateway", name: "LLM Gateway", category: "AI", baseUnits: 6, priority: "MUST_HAVE", complexity: "HIGH", technicalRisk: "HIGH", optional: false },
      { key: "knowledge_base", name: "Knowledge base", category: "AI", baseUnits: 6, priority: "MUST_HAVE", technicalRisk: "MEDIUM", optional: false },
      { key: "chat_ui", name: "Chat UI", category: "AI", baseUnits: 4, priority: "MUST_HAVE", optional: false },
      { key: "rag", name: "RAG / embeddings", category: "AI", baseUnits: 8, priority: "SHOULD_HAVE", complexity: "VERY_HIGH", technicalRisk: "HIGH" },
      { key: "tools_agents", name: "Tool-calling agents", category: "AI", baseUnits: 8, priority: "GROWTH", complexity: "VERY_HIGH", technicalRisk: "VERY_HIGH" },
      { key: "automation", name: "Workflow automation", category: "Automation", baseUnits: 5, priority: "SHOULD_HAVE" },
      { key: "admin_ai", name: "Admin & eval logs", category: "Admin", baseUnits: 5, priority: "MUST_HAVE", optional: false },
    ],
    deps: [
      { from: "rag", to: "knowledge_base" },
      { from: "rag", to: "llm_gateway" },
      { from: "tools_agents", to: "llm_gateway" },
      { from: "chat_ui", to: "llm_gateway" },
    ],
  });

  // Questions (global + product)
  await upsertQuestion(prisma, {
    key: "product_type",
    type: "SINGLE_SELECT",
    section: "idea",
    title: "Bạn muốn xây dựng loại sản phẩm nào?",
    sortOrder: 10,
    options: [
      { value: "WEBSITE", label: "Website" },
      { value: "MOBILE_APP", label: "Mobile App" },
      { value: "BUSINESS_SOFTWARE", label: "Business Software" },
      { value: "SAAS", label: "SaaS" },
      { value: "MARKETPLACE", label: "Marketplace" },
      { value: "AI_SOLUTION", label: "AI & Automation" },
      { value: "CUSTOM", label: "Chưa chắc / Custom" },
    ],
  });

  await upsertQuestion(prisma, {
    key: "idea_summary",
    type: "AI_FREE_TEXT",
    section: "idea",
    title: "Mô tả ngắn ý tưởng hoặc vấn đề kinh doanh của bạn",
    description: "Bạn có thể viết tự do. Hệ thống sẽ hỏi thêm nếu cần làm rõ.",
    sortOrder: 20,
  });

  await upsertQuestion(prisma, {
    key: "website_subtype",
    type: "SINGLE_SELECT",
    section: "idea",
    title: "Loại website phù hợp nhất?",
    sortOrder: 30,
    productKey: "WEBSITE",
    options: [
      { value: "corporate", label: "Corporate / Business" },
      { value: "ecommerce", label: "E-commerce" },
      { value: "booking", label: "Booking / Đặt lịch" },
      { value: "landing", label: "Landing page" },
      { value: "custom", label: "Custom web platform" },
    ],
    rules: [
      {
        definition: {
          conditions: [{ field: "product_type", operator: "equals", value: "WEBSITE" }],
          actions: [{ type: "SHOW_QUESTION", target: "website_subtype" }],
        },
      },
    ],
  });

  await upsertQuestion(prisma, {
    key: "business_model",
    type: "SINGLE_SELECT",
    section: "business",
    title: "Mô hình kinh doanh của sản phẩm?",
    sortOrder: 40,
    options: [
      { value: "SINGLE_SHOP", label: "Một cửa hàng / một doanh nghiệp" },
      { value: "MULTI_BRANCH", label: "Nhiều chi nhánh" },
      { value: "MARKETPLACE", label: "Marketplace (nhiều seller)" },
      { value: "SAAS", label: "SaaS / thuê bao" },
      { value: "MULTI_TENANT", label: "Multi-tenant platform" },
    ],
  });

  await upsertQuestion(prisma, {
    key: "decision_maker",
    type: "SINGLE_SELECT",
    section: "business",
    title: "Bạn có phải người quyết định ngân sách?",
    sortOrder: 45,
    options: [
      { value: "YES", label: "Có" },
      { value: "PARTIAL", label: "Một phần" },
      { value: "NO", label: "Không" },
    ],
  });

  await upsertQuestion(prisma, {
    key: "monthly_users",
    type: "RANGE",
    section: "users",
    title: "Quy mô người dùng / tháng dự kiến?",
    sortOrder: 50,
    options: [
      { value: "LT_1K", label: "< 1.000" },
      { value: "1K_10K", label: "1K – 10K" },
      { value: "10K_100K", label: "10K – 100K" },
      { value: "GT_100K", label: "100K+" },
    ],
  });

  await upsertQuestion(prisma, {
    key: "feature_selector",
    type: "FEATURE_SELECTOR",
    section: "features",
    title: "Chọn các tính năng bạn cần",
    description: "Hệ thống sẽ tự bổ sung dependency bắt buộc.",
    sortOrder: 60,
  });

  await upsertQuestion(prisma, {
    key: "integrations",
    type: "MULTI_SELECT",
    section: "integration",
    title: "Cần tích hợp hệ thống nào?",
    sortOrder: 70,
    required: false,
    options: [
      { value: "vnpay", label: "VNPay" },
      { value: "momo", label: "MoMo" },
      { value: "stripe", label: "Stripe" },
      { value: "sms", label: "SMS OTP" },
      { value: "email", label: "Email transactional" },
      { value: "maps", label: "Google Maps" },
      { value: "ghn", label: "GHN / GHTK" },
      { value: "none", label: "Chưa cần" },
    ],
  });

  await upsertQuestion(prisma, {
    key: "design_level",
    type: "SINGLE_SELECT",
    section: "design",
    title: "Mức độ thiết kế UI/UX?",
    sortOrder: 80,
    options: [
      { value: "BASIC", label: "Cơ bản / template" },
      { value: "STANDARD", label: "Chuẩn sản phẩm" },
      { value: "PREMIUM", label: "Premium / brand-led" },
      { value: "CUSTOM", label: "Custom hoàn toàn" },
    ],
  });

  await upsertQuestion(prisma, {
    key: "timeline",
    type: "TIMELINE",
    section: "timeline",
    title: "Thời gian mong muốn ra mắt?",
    sortOrder: 90,
    options: [
      { value: "ASAP", label: "Càng sớm càng tốt (< 4 tuần)" },
      { value: "RUSH", label: "Gấp (4–6 tuần)" },
      { value: "STANDARD", label: "Tiêu chuẩn (6–12 tuần)" },
      { value: "FLEXIBLE", label: "Linh hoạt" },
    ],
  });

  await upsertQuestion(prisma, {
    key: "budget_vnd",
    type: "BUDGET",
    section: "budget",
    title: "Ngân sách dự kiến (VND)?",
    description: "Kéo thanh trượt hoặc chọn mức gần đúng.",
    sortOrder: 100,
    config: { min: 10_000_000, max: 300_000_000, step: 5_000_000, default: 40_000_000 },
  });

  await upsertQuestion(prisma, {
    key: "intent",
    type: "SINGLE_SELECT",
    section: "budget",
    title: "Mục tiêu hiện tại của bạn?",
    sortOrder: 105,
    options: [
      { value: "READY_TO_BUILD", label: "Sẵn sàng triển khai" },
      { value: "COMPARE_VENDORS", label: "Đang so sánh đơn vị" },
      { value: "RESEARCHING", label: "Chỉ đang tìm hiểu" },
    ],
  });

  // Integrations catalog
  const integrations = [
    { key: "vnpay", name: "VNPay", category: "Payment", setupCostUnits: 3, requiresMerchant: true },
    { key: "momo", name: "MoMo", category: "Payment", setupCostUnits: 3, requiresMerchant: true },
    { key: "stripe", name: "Stripe", category: "Payment", setupCostUnits: 3, requiresMerchant: true },
    { key: "firebase", name: "Firebase / FCM", category: "Communication", setupCostUnits: 2 },
    { key: "sms", name: "SMS Gateway", category: "Communication", setupCostUnits: 2 },
    { key: "maps", name: "Google Maps", category: "Maps", setupCostUnits: 2 },
    { key: "ghn", name: "GHN", category: "Shipping", setupCostUnits: 3 },
  ];
  for (let i = 0; i < integrations.length; i++) {
    const item = integrations[i];
    await prisma.integrationCatalogItem.upsert({
      where: { key: item.key },
      create: {
        key: item.key,
        name: item.name,
        category: item.category,
        setupCostUnits: item.setupCostUnits,
        requiresMerchant: item.requiresMerchant || false,
        sortOrder: i,
        active: true,
      },
      update: {
        name: item.name,
        category: item.category,
        setupCostUnits: item.setupCostUnits,
        active: true,
      },
    });
  }

  const arch = [
    {
      key: "ecommerce",
      name: "E-commerce",
      stack: ["Next.js", "Node API", "PostgreSQL", "R2", "Payment", "Email"],
      conditions: { website_subtype: "ecommerce" },
    },
    {
      key: "saas",
      name: "SaaS",
      stack: ["Next.js", "API", "PostgreSQL", "Billing", "Observability"],
      conditions: { product_type: "SAAS" },
    },
  ];
  for (let i = 0; i < arch.length; i++) {
    const a = arch[i];
    await prisma.architectureTemplate.upsert({
      where: { key: a.key },
      create: {
        key: a.key,
        name: a.name,
        stack: JSON.stringify(a.stack),
        conditions: JSON.stringify(a.conditions),
        sortOrder: i,
        active: true,
      },
      update: {
        name: a.name,
        stack: JSON.stringify(a.stack),
        conditions: JSON.stringify(a.conditions),
        active: true,
      },
    });
  }

  await prisma.recommendationRule.upsert({
    where: { key: "prefer_web_mvp" },
    create: {
      key: "prefer_web_mvp",
      name: "Ưu tiên web MVP",
      definition: JSON.stringify({
        conditions: [
          { field: "product_type", operator: "equals", value: "MOBILE_APP" },
          { field: "budget_vnd", operator: "lt", value: 40_000_000 },
        ],
        match: "all",
        actions: [
          {
            type: "RECOMMEND",
            target: "responsive_web",
            payload: {
              title: "Cân nhắc Web MVP trước App",
              body: "Với ngân sách hiện tại, responsive web giúp validate nhu cầu nhanh hơn native app.",
            },
          },
        ],
      }),
      active: true,
      sortOrder: 1,
    },
    update: { active: true },
  });

  // Sales resources
  const resources = [
    {
      slug: "partner-policy",
      title: "Chính sách đối tác & hoa hồng",
      category: "POLICY",
      description: "Ownership 30 ngày, commission trên tiền thực nhận.",
      body: "Partner sở hữu lead 30 ngày. Hoa hồng chỉ tính trên payment RECEIVED. Admin có quyền release/reassign có ghi activity.",
      partnerVisible: true,
    },
    {
      slug: "sales-pitch-solutions",
      title: "Sales kit — Solution pages",
      category: "KIT",
      description: "Cách gửi link solution + estimate cho khách.",
      body: "Gửi /solutions/{slug}?ref=YOURCODE. Không tự estimate technical scope — để widget Estimator + technical consultation.",
      partnerVisible: true,
    },
    {
      slug: "qualification-checklist",
      title: "Checklist qualification",
      category: "PLAYBOOK",
      description: "6 câu hỏi tối thiểu trước meeting.",
      body: "Business problem, current process, expected product, timeline, budget range, decision maker.",
      partnerVisible: true,
    },
  ];
  for (let i = 0; i < resources.length; i++) {
    const r = resources[i];
    await prisma.salesResource.upsert({
      where: { slug: r.slug },
      create: {
        ...r,
        status: "PUBLISHED",
        sortOrder: i,
      },
      update: {
        title: r.title,
        description: r.description,
        body: r.body,
        partnerVisible: r.partnerVisible,
        status: "PUBLISHED",
      },
    });
  }

  return { ok: true };
}
