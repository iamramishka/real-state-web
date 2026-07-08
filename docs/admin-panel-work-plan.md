# Admin Panel + Dynamic Content Work Plan

> Goal: move Nordhaven from static frontend data files and hash-only navigation into an admin-managed system where site content, real-estate agents, properties, rules, standards, skills, and Claude/Codex task plans can be entered, reviewed, published, and audited.

## 1. Current State

- The public site is built in Next.js App Router and currently renders from static TypeScript modules in `data/**`.
- Navigation is mostly frontend-section based. Several intended routes exist in the plan but are not implemented yet: `/buy`, `/rent`, `/sell`, `/agents`, `/agents/[slug]`, `/news`, `/news/[slug]`, `/property/[slug]`, and `/contact`.
- There is no admin route, no database, no authentication, no media upload workflow, and no server-side content source.
- Claude/Codex planning already exists in repo files: `plan.md`, `agents/**`, `docs/**`, `claude/tasks.md`, and `codex/tasks.md`. Those files should remain the working source of truth until an admin-backed operations table is built and proven.

## 2. Target Outcome

Admins should be able to sign in and manage:

- Public website content: properties, agent profiles, editorial posts, discovery cards, nav/footer links, search suggestions, filter chips, page copy, and media.
- Lead workflows: contact requests, save-search requests, property inquiries, sell inquiries, and newsletter submissions.
- Internal delivery operations: AI agents, required skills, rules, quality standards, audit gates, Claude tasks, Codex tasks, task ownership, task status, branch/worktree metadata, review notes, and handoff logs.

The public frontend should read from the admin-managed content source, with static seed data used only for first install, tests, or fallback.

## 3. Recommended Architecture

Use the current Next.js app as the full-stack application.

| Layer | Recommendation | Notes |
|---|---|---|
| Admin UI | Next.js App Router under `app/admin/**` | Server-first pages with small client islands for forms and tables. |
| Authentication | Supabase Auth or NextAuth-compatible provider | Admin-only access, no public registration. |
| Database | Postgres | Supabase Postgres is the fastest path if deployment stays on Vercel. |
| ORM / queries | Prisma or Supabase typed client | Pick one before X-101. Do not mix both. |
| Media | Supabase Storage or Vercel Blob | Store image metadata in DB; never allow arbitrary remote image URLs. |
| Validation | Zod schemas in `lib/schemas/**` | Shared by server actions, route handlers, and forms. |
| Authorization | Role-based access control | Roles: `owner`, `admin`, `editor`, `viewer`. |
| Public reads | Server components fetch published records | Draft records stay admin-only. |
| Mutations | Server actions or route handlers | Validate, authorize, audit-log every write. |

Decision needed before implementation: choose Supabase-only or Prisma + managed Postgres. The plan below assumes Postgres either way.

## 4. Admin Areas

| Area | Route | Purpose |
|---|---|---|
| Dashboard | `/admin` | Summary of listings, leads, drafts, tasks, and review blockers. |
| Properties | `/admin/properties` | Create, edit, publish, archive property listings and galleries. |
| Agents | `/admin/agents` | Manage real-estate agent profiles, service areas, ratings, and avatars. |
| Editorial | `/admin/editorial` | Manage news and trends/tips posts. |
| Site Content | `/admin/content` | Manage nav, footer, discovery cards, search suggestions, filter chips, CTA copy, and section copy. |
| Leads | `/admin/leads` | View, assign, and update lead statuses. |
| Media | `/admin/media` | Upload, replace, alt-text review, and asset cleanup. |
| AI Operations | `/admin/ai-ops` | Manage Claude/Codex agents, skills, rules, standards, task plans, ownership, gates, and handoffs. |
| Settings | `/admin/settings` | Site URL, SEO defaults, admin users, roles, publishing rules. |

## 5. Data Model Scope

### Public Content

- `properties`: slug, title, address, price, mode, categories, meta, coordinates, description, featured flags, publish status.
- `property_images`: property relationship, media asset relationship, sort order, alt text override.
- `real_estate_agents`: slug, name, agency, title, service areas, bio, contact display fields, rating, featured flag, status.
- `editorial_posts`: type (`news` or `article`), title, slug, excerpt, body, image, author, category/tag, publish date, status.
- `site_nav_items`, `footer_columns`, `footer_links`, `search_suggestions`, `filter_chips`, `discovery_cards`, `site_copy`.
- `media_assets`: storage key, public URL or signed URL source, width, height, mime type, file size, alt text, owner, created date.
- `leads`: source, name, email, phone, message, property id, assigned agent, status, internal notes.

### AI Operations

- `ai_agents`: name, type (`claude`, `codex`, `human`, `reviewer`), responsibility, allowed paths, forbidden paths, status.
- `ai_skills`: name, description, owner agent, required inputs, expected outputs, verification checklist.
- `ai_rules`: title, category, severity, rule text, applies to, active flag.
- `quality_standards`: category, requirement, evidence required, gate mapping.
- `ai_tasks`: task id, title, owner, agent role, status, branch, allowed files, forbidden files, verification commands, priority.
- `ai_task_handoffs`: task id, files touched, commands run, result, next step, review link.
- `audit_runs`: gate, task id, status, evidence path, reviewer, completed date.

## 6. Migration Strategy

1. Preserve the current `data/**` modules as seed data and tests while the database is introduced.
2. Add database schema and seed scripts that import current static data.
3. Build read helpers such as `lib/content/properties.ts` that return DB records in the same shape currently consumed by components.
4. Swap public sections one content type at a time: agents, properties, editorial, site content.
5. Keep published/draft separation from the start. Public pages read only published content.
6. Remove direct imports from `data/**` only after the DB-backed helper is tested.

## 7. Claude Work

Claude owns planning, specs, review, content rules, and audit definitions.

| ID | Task | Output |
|---|---|---|
| C-020 | Admin information architecture | Finalize admin areas, roles, publishing workflow, and permissions. |
| C-021 | Database content model spec | Produce field-level schema rules, required fields, statuses, and validation behavior. |
| C-022 | AI operations model spec | Define agent, skill, rule, standard, task, handoff, and audit record behavior. |
| C-023 | Admin UX copy and empty states | Define labels, button text, success/error messages, and table empty states. |
| C-024 | Review Codex admin PRs | Review each implementation task for security, a11y, data integrity, and file ownership. |

## 8. Codex Work

Codex owns implementation, tests, refactors, and verification.

| ID | Task | Allowed files | Verify |
|---|---|---|---|
| X-100 | Admin foundation shell | `app/admin/**`, `components/admin/**`, `layouts/AdminShell.tsx`, tests | `npm run lint && npm run typecheck && npm run build` |
| X-101 | Auth, RBAC, env, and middleware | `lib/auth/**`, `middleware.ts`, `.env.example`, tests | build, auth e2e, `npm audit --audit-level=high` |
| X-102 | Database schema and seed pipeline | `prisma/**` or `lib/db/**`, `scripts/**`, `data/**` read-only seed use | seed test, typecheck, build |
| X-103 | Content read layer | `lib/content/**`, affected public sections, tests | unit/e2e proving public pages still render |
| X-104 | Property admin CRUD | `app/admin/properties/**`, `components/admin/properties/**`, schemas, tests | CRUD e2e, validation tests |
| X-105 | Agent admin CRUD | `app/admin/agents/**`, `components/admin/agents/**`, schemas, tests | CRUD e2e, image alt validation |
| X-106 | Editorial admin CRUD | `app/admin/editorial/**`, `components/admin/editorial/**`, schemas, tests | draft/publish tests |
| X-107 | Site content admin | `app/admin/content/**`, content schemas, public read helpers | nav/footer/search/discovery tests |
| X-108 | Lead capture and lead inbox | public forms, `app/admin/leads/**`, server actions, tests | spam-safe validation, e2e |
| X-109 | Media library | `app/admin/media/**`, upload handlers, storage adapter, tests | file type/size/alt validation |
| X-110 | AI operations admin | `app/admin/ai-ops/**`, `components/admin/ai-ops/**`, schemas, tests | task/rule/skill CRUD e2e |
| X-111 | Public route expansion | `/buy`, `/rent`, `/sell`, `/agents`, `/news`, `/property/[slug]`, `/contact` | route e2e, metadata, sitemap |
| X-112 | Admin hardening and release gates | tests, audits, security/perf fixes | full verification suite |

## 9. First Five Implementation Tasks

1. C-020: Claude finalizes admin IA, roles, and permissions in docs.
2. C-021: Claude finalizes the DB/content model spec with required validation rules.
3. X-100: Codex builds the protected admin layout skeleton with placeholder tables and no data writes yet.
4. X-101: Codex wires authentication, RBAC, middleware protection, and env examples.
5. X-102: Codex adds the DB schema, migrations, and seed pipeline from existing `data/**`.

## 10. Verification Gates

Every admin task must pass:

- Auth gate: no `/admin/**` page is visible to logged-out users.
- RBAC gate: editor/viewer/owner permissions match the matrix.
- Validation gate: all writes use Zod at the server boundary.
- Audit gate: content and AI-ops writes produce an audit record.
- Accessibility gate: forms, tables, dialogs, errors, and toasts are keyboard and screen-reader usable.
- Security gate: no secrets in client bundle; no arbitrary uploads; no untrusted HTML.
- Public regression gate: current homepage still passes existing e2e, a11y, SEO, and build checks.

## 11. Commands

Use the existing commands first:

```bash
npm run format:check
npm run lint
npm run typecheck
npm run test
npm run build
npm run test:e2e
npm run test:a11y
npm audit --audit-level=high
```

Add DB-specific commands in X-102 after the DB choice is locked, for example:

```bash
npm run db:migrate
npm run db:seed
npm run db:studio
```

## 12. Risks And Open Decisions

- DB/auth provider must be chosen before implementation begins.
- Admin image upload storage must be selected before media CRUD.
- AI-ops admin can become too broad; build only CRUD/status/audit first, not autonomous execution.
- Existing dirty frontend files should not be mixed into the admin phase unless the task explicitly owns them.
- Static `data/**` imports should be removed gradually to avoid breaking the released homepage.

## 13. Done Criteria

The phase is complete when:

- Admin users can sign in and manage public content without editing code.
- Properties, real-estate agents, editorial posts, nav/footer/site copy, and media are DB-backed.
- Public routes render from published admin content.
- Leads are captured and visible in the admin panel.
- AI agent allocation, skills, rules, standards, and task plans are manageable in `/admin/ai-ops`.
- Full verification passes: lint, typecheck, unit, build, e2e, a11y, audit, and security scan.
