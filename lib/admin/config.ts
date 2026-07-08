export type AdminModuleStatus = "planned" | "ready" | "blocked";

export interface AdminModule {
  description: string;
  href: string;
  id: string;
  owner: "Claude" | "Codex" | "Admin";
  status: AdminModuleStatus;
  title: string;
}

export interface AdminBackendPath {
  description: string;
  method: "GET" | "POST";
  path: string;
  status: AdminModuleStatus;
}

export const adminPhase = {
  id: "phase-5-admin-cms-ai-ops",
  name: "Admin Panel, CMS, Leads, and AI Operations",
  summary:
    "Admin-managed content and operations will replace static frontend data paths.",
};

export const adminContentModules: AdminModule[] = [
  {
    description: "Create, edit, publish, and archive property listings.",
    href: "/admin/properties",
    id: "properties",
    owner: "Codex",
    status: "planned",
    title: "Properties",
  },
  {
    description:
      "Manage real-estate agent profiles, service areas, and avatars.",
    href: "/admin/agents",
    id: "agents",
    owner: "Codex",
    status: "planned",
    title: "Agents",
  },
  {
    description: "Prepare news, market updates, and learning articles.",
    href: "/admin/editorial",
    id: "editorial",
    owner: "Codex",
    status: "planned",
    title: "Editorial",
  },
  {
    description:
      "Control nav, footer, search suggestions, filters, and page copy.",
    href: "/admin/content",
    id: "site-content",
    owner: "Codex",
    status: "planned",
    title: "Site content",
  },
  {
    description:
      "Upload images, enforce alt text, and prepare storage metadata.",
    href: "/admin/media",
    id: "media",
    owner: "Codex",
    status: "planned",
    title: "Media library",
  },
  {
    description:
      "View and assign contact, save-search, property, and sell leads.",
    href: "/admin/leads",
    id: "leads",
    owner: "Codex",
    status: "planned",
    title: "Leads",
  },
];

export const adminOperationsModules: AdminModule[] = [
  {
    description:
      "Manage Claude/Codex role allocation and implementation ownership.",
    href: "/admin/ai-ops/agents",
    id: "ai-agents",
    owner: "Claude",
    status: "planned",
    title: "AI agents",
  },
  {
    description:
      "Track skills required for planning, coding, review, and audits.",
    href: "/admin/ai-ops/skills",
    id: "skills",
    owner: "Claude",
    status: "planned",
    title: "Skills",
  },
  {
    description:
      "Store rules, standards, gate requirements, and review evidence.",
    href: "/admin/ai-ops/standards",
    id: "rules-standards",
    owner: "Claude",
    status: "planned",
    title: "Rules and standards",
  },
  {
    description:
      "Mirror Claude and Codex queues with status, ownership, and handoffs.",
    href: "/admin/ai-ops/tasks",
    id: "task-plans",
    owner: "Admin",
    status: "planned",
    title: "Task plans",
  },
];

export const adminBackendPaths: AdminBackendPath[] = [
  {
    description: "Operational readiness endpoint for admin shell checks.",
    method: "GET",
    path: "/api/admin/health",
    status: "ready",
  },
  {
    description:
      "Read-only manifest of admin modules and planned backend paths.",
    method: "GET",
    path: "/api/admin/manifest",
    status: "ready",
  },
  {
    description:
      "Read-only content module plan until auth and database are wired.",
    method: "GET",
    path: "/api/admin/content",
    status: "ready",
  },
  {
    description:
      "Read-only AI operations plan until auth and database are wired.",
    method: "GET",
    path: "/api/admin/ai-ops",
    status: "ready",
  },
  {
    description:
      "Future write endpoint. Disabled until auth, RBAC, and DB exist.",
    method: "POST",
    path: "/api/admin/content",
    status: "blocked",
  },
  {
    description:
      "Future write endpoint. Disabled until auth, RBAC, and DB exist.",
    method: "POST",
    path: "/api/admin/ai-ops",
    status: "blocked",
  },
];

export const adminNextTasks = [
  "C-020: Claude finalizes admin IA, roles, and permissions.",
  "C-021: Claude locks database and content model validation rules.",
  "C-022: Claude locks AI operations records for agents, skills, rules, standards, tasks, and handoffs.",
  "X-101: Codex wires authentication, RBAC, middleware, and environment requirements.",
  "X-102: Codex adds database schema, migrations, and static-data seed pipeline.",
];
