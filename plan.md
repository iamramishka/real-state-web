# plan.md — Master Coordination Document

> **Project:** Nordhaven — Premium Real Estate Website
> **Status:** Phase 0 (Planning). **Do not write production code until this plan is approved and the support files are complete.**
> **Coordinators:** Claude (planning/docs/design/QA-checklists) + Codex (implementation/tests/configs).
> **Brand note:** `Nordhaven` is an original working brand. The reference `design.webp` ("SOVEX") is **inspiration only — never copied**. Final brand name is a pending decision (see §22 risks).

This is the single source of truth for *how* the project is built. Once all permanent files in §20 exist and are verified, this file may be retired per §21.

---

## Table of Contents
1. Project Overview
2. Recommended Tech Stack
3. Folder Structure
4. Claude & Codex Setup
5. Multi-Agent Role Allocation
6. Required Skills Matrix
7. Claude vs Codex Task Allocation
8. GitHub Worktree Method
9. GitHub Reviewer & Merger Review
10. AI Verification System (12 Gates)
11. Quality Standards
12. Coding Rules
13. Things to Avoid
14. Development Commands
15. Design Implementation Plan (15 sections)
16. Security & AI Security Scanning
17. Audits
18. Accountability System
19. How to Work With Me
20. Final Support Files
21. Safe To Remove plan.md Later
22. Final Response Format

---

## 1. Project Overview

**Website purpose.** A premium, conversion-focused real estate landing site that helps people discover, evaluate, and enquire about homes to **buy, sell, or rent**, and connect with agents — with an AI-style natural-language search experience at its core.

**Target users.**
- Home buyers browsing premium/luxury listings.
- Sellers evaluating "the smarter way to sell."
- Renters searching by lifestyle ("near a good school").
- Buyers/sellers looking for a trusted agent.
- Readers of real-estate news, trends, and tips.

**Business goal.** Generate qualified leads (search, save-search, contact-agent, sell-enquiry) and establish brand authority through editorial content. Primary KPI: contact/enquiry conversion; secondary: search engagement and return visits.

**Main pages (MVP).**
- `/` Home (all 15 sections below)
- `/buy`, `/rent`, `/sell` (filtered listing experiences)
- `/agents` (agent directory) and `/agents/[slug]`
- `/news` (articles index) and `/news/[slug]`
- `/property/[slug]` (listing detail)
- `/contact`
- System: `not-found`, `error`, `sitemap.xml`, `robots.txt`

**Main features.**
- AI-style search bar with Buy/Sell/Rent modes and conversational suggestion chips.
- Featured homes, "Homes for you," explore grid with filter chips.
- Property listing + interactive map split view.
- Smarter-way-to-sell feature band; neighborhood discovery; agent directory.
- Real estate news + trends/tips/inspiration editorial grids.
- Lead capture: contact form, save-search, sell-enquiry (validated, accessible).

**Goals by dimension.**
- **UX:** ≤2 clicks to a relevant listing; obvious primary action per section; no dead ends; clear loading/empty/error states.
- **UI:** premium, whitespace-heavy, consistent tokens; image-forward; calm monochrome palette + one restrained accent.
- **Performance:** Lighthouse ≥ 90 mobile; LCP < 2.5s, CLS < 0.1, INP < 200ms; route JS budget < 200KB gzip on Home.
- **SEO:** semantic structure, per-route metadata, OpenGraph, JSON-LD (`RealEstateListing`, `Organization`, `BreadcrumbList`), sitemap/robots.
- **Accessibility:** WCAG 2.2 AA; full keyboard operability; visible focus; labelled controls; contrast ≥ 4.5:1.
- **Security:** no secrets in client; safe external links; validated forms; CSP/security headers; audited deps.
- **Responsive:** mobile-first; verified on all 8 breakpoints (§6); no horizontal scroll; touch targets ≥ 44px.

**Expected final experience.** A fast, elegant, trustworthy site where a visitor lands, immediately understands they can search naturally, explores beautiful listings on any device, and is gently guided to enquire — feeling the brand is premium and credible.

**Main website sections** (detailed in §15): Header/Navbar · Hero (luxury image) · AI-style search bar · Suggested search chips · Buy/Sell/Rent + category filters · Explore homes · Featured homes · Homes for you · Property listing + map · Smarter way to sell · Neighborhood discovery · Agent section · Real estate news · Trends/tips/inspiration · CTA · Footer.

---

## 2. Recommended Tech Stack

| Concern | Choice | Why |
|---|---|---|
| Framework | **Next.js 15 (App Router)** | SSR/SSG + metadata API → strong SEO/perf; file routing; image optimization. |
| Language | **TypeScript (strict)** | Type safety; fewer runtime bugs; better DX. |
| Styling | **Tailwind CSS v4** | Token-driven, mobile-first, consistent spacing/typography. |
| Components | **shadcn/ui (Radix primitives)** | Accessible, unstyled-by-default components we own and theme. |
| Animation | **Framer Motion** | Tasteful, performant micro-interactions and reveals. |
| Icons | **lucide-react** | Clean, consistent, tree-shakeable icon set. |
| Images | **next/image** + AVIF/WebP | Responsive, lazy, optimized; prevents CLS. |
| Fonts | **next/font** (self-hosted) | No layout shift; no third-party font requests. |
| Forms | **React Hook Form** | Performant, accessible form state. |
| Validation | **Zod** | Schema validation shared client/server. |
| Data | **Static TS modules in `data/`** first | No backend until needed; typed mock content. |
| State | React Server Components + minimal client state | Avoid heavy global state libs. |
| Testing | **Vitest** (unit) + **Playwright** (e2e/responsive) | Fast units; real-browser cross-device checks. |
| Linting | **ESLint** (next/core-web-vitals, jsx-a11y) | Code + a11y lint gates. |
| Formatting | **Prettier** (+ prettier-plugin-tailwindcss) | Deterministic formatting + class sorting. |
| Type checking | **tsc --noEmit** | CI type gate. |
| Security scanning | **npm audit**, **Snyk** (optional), **gitleaks** | Dependency + secret scanning. |
| Accessibility testing | **axe-core / @axe-core/playwright**, Lighthouse a11y | Automated a11y gate. |
| Performance testing | **Lighthouse CI**, **@next/bundle-analyzer** | Perf + bundle budgets. |
| Deployment | **Vercel** | First-class Next.js hosting, previews per PR. |

Preferred direction confirmed: Next.js + TypeScript + Tailwind, reusable components, static-data-first, SEO-friendly, mobile-first.

---

## 3. Folder Structure

> **Phase 0 note:** Folders marked **(build phase)** are *documented here but not created yet*. This planning run creates only the docs/agents/audits/workspace folders.

```
real-state-web/
├── plan.md                      # master coordination (this file)
├── CLAUDE.md                    # global rules for Claude
├── CODEX.md                     # global rules for Codex
├── README.md                    # project intro → points to plan.md
├── .gitignore                   # node/next/env ignores
├── .claude/README.md            # Claude workspace guide
├── .codex/README.md             # Codex workspace guide
├── claude/tasks.md              # Claude task queue (planning/docs/content)
├── codex/tasks.md               # Codex task queue (implementation)
├── agents/                      # 15 agent role definitions
│   ├── project-manager.md
│   ├── architect.md
│   ├── ui-ux-designer.md
│   ├── software-engineer.md
│   ├── component-engineer.md
│   ├── data-content-engineer.md
│   ├── qa-engineer.md
│   ├── github-worktree-controller.md
│   ├── github-reviewer.md
│   ├── merger-review.md
│   ├── security-scanner.md
│   ├── performance-auditor.md
│   ├── accessibility-auditor.md
│   ├── seo-auditor.md
│   └── documentation-agent.md
├── audits/                      # 8 audit checklists
│   ├── ui-audit.md
│   ├── responsive-audit.md
│   ├── security-audit.md
│   ├── performance-audit.md
│   ├── accessibility-audit.md
│   ├── seo-audit.md
│   ├── code-quality-audit.md
│   └── final-release-audit.md
├── docs/                        # 6 reference docs
│   ├── design-system.md
│   ├── worktree-strategy.md
│   ├── development-rules.md
│   ├── security-rules.md
│   ├── responsive-rules.md
│   └── qa-checklist.md
│
│   # ----- BUILD PHASE (documented, not yet created) -----
├── app/                         # (build) routes, layouts, metadata, route handlers
├── components/                  # (build) shared components
│   ├── ui/                      # (build) shadcn/ui primitives (button, input, dialog…)
│   ├── cards/                   # (build) property/agent/news/article cards
│   └── forms/                   # (build) contact/search/sell forms
├── sections/                    # (build) page sections (Hero, SearchBar, MapListing…)
├── layouts/                     # (build) header/footer/page shells
├── data/                        # (build) typed static content (properties, agents, news)
├── hooks/                       # (build) reusable React hooks
├── utils/                       # (build) pure helpers (formatPrice, slugify…)
├── lib/                         # (build) integrations/config (seo, fonts, analytics)
├── styles/                      # (build) globals.css, tailwind tokens
├── public/                      # (build) static assets
│   ├── images/                  # (build) optimized imagery
│   └── icons/                   # (build) svg icons/favicons
├── tests/                       # (build) Vitest + Playwright specs
└── ../worktrees/                # git worktrees live OUTSIDE the repo (see §8)
```

**What each top-level item is for**
- `plan.md` — coordination master (this file).
- `CLAUDE.md` / `CODEX.md` — non-negotiable working rules for each AI.
- `.claude/` `.codex/` — per-agent workspace notes and conventions.
- `claude/tasks.md` `codex/tasks.md` — the task queues each agent pulls from.
- `agents/` — one file per role with ownership boundaries and done criteria.
- `audits/` — repeatable checklists run before merges/release.
- `docs/` — durable references (design system, worktrees, rules, QA).
- Build-phase folders — implementation, owned by Codex (see §3 note and §7).

---

## 4. Claude & Codex Setup

**Roles.**
- **Claude** — planning, architecture, documentation, design system, UX copy, review/QA checklist generation, audit definitions. *Does not write production code unless a task explicitly assigns it.*
- **Codex** — project setup, component/page/styling/responsive implementation, unit tests, refactors, bug fixes, performance/security fixes, build verification. *Does not change planning strategy without approval.*

**Instruction files.**
- Global: `CLAUDE.md`, `CODEX.md` (root). Read first, every session.
- Workspace: `.claude/README.md`, `.codex/README.md` (how each agent operates).
- Queues: `/claude/tasks.md`, `/codex/tasks.md` (what to do, with ownership + verification).
- Per-role: `/agents/*.md` (boundaries and done criteria).
- Reviews/audits: `/audits/*.md` (gates before merge/release).

**Hard rules.**
1. Claude and Codex must **never edit the same file in the same task**.
2. **Every task declares file ownership** (allowed + forbidden paths).
3. **Every task declares verification commands** (lint/test/build/etc.).
4. **Every task is independently executable** on its own branch/worktree.
5. Handoffs include: files touched · commands run · test result · next step.

---

## 5. Multi-Agent Role Allocation

Full definitions live in `/agents/*.md`. Summary (each file specifies Responsibility · Required skills · Allowed files/folders · Forbidden files/folders · Inputs · Outputs · Done criteria · Verification checklist):

| # | Agent | Primary responsibility | Owns | Lead |
|---|---|---|---|---|
| 1 | Project Manager | Scope, sequencing, accountability table | `plan.md`, queues (coordination) | Claude |
| 2 | Architecture | Folder/route/data architecture | `docs/`, architecture notes | Claude |
| 3 | UI/UX Design | Design system, layouts, copy | `docs/design-system.md` | Claude |
| 4 | Frontend Software Engineer | Pages/sections implementation | `app/`, `sections/` | Codex |
| 5 | Component Engineer | Reusable components | `components/**` | Codex |
| 6 | Data/Content Engineer | Typed mock data + content | `data/**` | Codex |
| 7 | QA Engineer | Test plans + specs | `tests/**`, `docs/qa-checklist.md` | Codex (specs) / Claude (plan) |
| 8 | GitHub Worktree Controller | Branches/worktrees lifecycle | git topology | Codex |
| 9 | GitHub Reviewer | Review PRs (no merge) | review comments/reports | Either AI |
| 10 | Merger Review | Confirm gates → perform merge | merge decision + execution | Claude |
| 11 | Security Scanner | Dep/secret/XSS review | `audits/security-audit.md` | Either AI |
| 12 | Performance Auditor | Lighthouse/bundle budgets | `audits/performance-audit.md` | Either AI |
| 13 | Accessibility Auditor | axe/keyboard/contrast | `audits/accessibility-audit.md` | Either AI |
| 14 | SEO Auditor | Metadata/JSON-LD/sitemap | `audits/seo-audit.md` | Either AI |
| 15 | Documentation | Keep docs accurate | `docs/**`, READMEs | Claude |

---

## 6. Required Skills Matrix

**Cyber Security:** secure frontend dev · dependency vuln scanning · secret scanning · XSS prevention · input validation · safe form handling · env-var protection · secure external links · safe image-source handling · security-headers awareness · package audit/risk review · AI-generated code security review · AI security scan before merge · no exposed API keys · no unsafe user-input rendering · no malicious dependencies.

**UI/UX Design:** modern real-estate UI · luxury/minimal style · layout composition · typography hierarchy · color system · spacing · button/card design · hero design · search-bar UI · property-card UI · map/listing UI · agent-section UI · news/blog UI · CTA design · visual consistency · conversion-focused design · user-journey improvement.

**Responsive Design:** mobile-first · desktop/laptop/tablet/mobile layouts · responsive navbar · responsive hero · responsive card grid · responsive map/listing · responsive spacing/typography · touch-friendly buttons · no horizontal scroll · cross-browser checks · responsive images.

**Required breakpoints (verify every UI section on all 8 before approval):**

| Token | Width | Target |
|---|---|---|
| `xs` | **320px** | small mobile |
| `sm` | **375px** | standard mobile |
| `ms` | **425px** | large mobile |
| `md` | **768px** | tablet |
| `lg` | **1024px** | small laptop |
| `xl` | **1280px** | desktop |
| `2xl` | **1440px** | large desktop |
| `3xl` | **1920px** | full HD |

**Per-agent skill highlights**
- *Security Scanner:* cyber audit, dep audit, secret scan, XSS prevention, secure frontend review, safe form validation, AI-code security review.
- *UI/UX Design:* luxury real-estate UI, responsive layout planning, design-system creation, typography/spacing control, component consistency, user-journey improvement.
- *QA Engineer:* responsive testing, cross-browser, a11y testing, UI regression, functional testing, build verification, bug reporting.
- *Frontend Engineer:* responsive implementation, component-based dev, clean code, accessible HTML, SEO-friendly structure, performance optimization.

---

## 7. Claude vs Codex Task Allocation

**Claude tasks:** project architecture planning · design-system planning · component planning · page/section breakdown · UX copywriting · documentation · agent instructions · review-checklist creation · audit-checklist creation · QA-plan creation · security planning · SEO planning · accessibility planning.

**Codex tasks:** project setup · component implementation · page implementation · styling implementation · responsive implementation · unit tests · refactoring · bug fixes · performance improvement · security fixes · build verification.

**Rules.**
- Claude must not implement production code unless explicitly assigned.
- Codex must not change planning strategy without approval.
- Never edit the same file in the same task.
- Every file has exactly **one active owner**.
- All handoffs include files touched, commands run, test result, next step.

---

## 8. GitHub Worktree Method

Full commands in `docs/worktree-strategy.md`. Summary:

**Branches.** `main` (protected, releasable) · `dev` (integration) · `feature/*` (work) · `review/*` · `merge/*`.
Examples: `feature/claude-design-system`, `feature/codex-header-hero`, `feature/codex-property-cards`, `review/ui-review`, `merge/release-prep`.

**Worktrees (live outside the repo root):**
`../worktrees/claude-design` · `../worktrees/codex-frontend` · `../worktrees/review` · `../worktrees/merge`.

**Core commands.**
```bash
# create a feature worktree on a new branch
git worktree add ../worktrees/codex-frontend -b feature/codex-header-hero dev

# list / status
git worktree list
git -C ../worktrees/codex-frontend status

# switch work = just cd into that worktree path
cd ../worktrees/codex-frontend

# integrate (no fast-forward to keep history)
git switch dev && git merge --no-ff feature/codex-header-hero

# remove a finished worktree + delete branch
git worktree remove ../worktrees/codex-frontend
git branch -d feature/codex-header-hero
git worktree prune
```

**Conflict-prevention rules.** One owner per branch; Claude and Codex use *separate* worktrees; never two branches editing the same file concurrently; rebase/merge `dev` before opening a PR.

---

## 9. GitHub Reviewer & Merger Review

**Reviewer — Claude.** Reviews every PR: code quality · security · accessibility · responsiveness · SEO · performance · design consistency · folder structure · coding rules · test results. Leaves comments, produces a review report, identifies risks, requests changes from Codex when needed. Does not edit implementation directly.

**Merger Review Agent — Claude.** Once all review comments are resolved and all 12 gates pass, Claude confirms: gates green · no file-ownership conflict · no unresolved comments · build passes · then **performs the merge** (`feature/* → dev`, and `dev → main` for releases). No human approval required in the merge loop.

**Merge flow:**
1. Codex opens PR (`feature/*` → `dev`).
2. Claude reviews → requests changes if needed → Codex fixes.
3. All gates green → Claude merges `feature/*` into `dev`.
4. After final release audit passes → Claude merges `dev` into `main` and pushes.

---

## 10. AI Verification System (12 Gates)

Each gate: **Purpose · Required evidence · Pass · Fail · Owner · Commands/checks.**

1. **Comprehension Gate** — Purpose: agent restates task + ownership. Evidence: written restatement + file list. Pass: matches task; no forbidden paths. Fail: ambiguity/scope creep. Owner: PM. Check: review handoff note.
2. **Planning Gate** — Purpose: approach agreed before code. Evidence: short plan + files to touch. Pass: approved. Fail: missing verification/ownership. Owner: Architect.
3. **File Ownership Gate** — Purpose: no collisions. Evidence: `git worktree list`, changed-files diff. Pass: only owned files changed. Fail: touches another owner's files. Owner: Worktree Controller. Check: `git diff --name-only dev...HEAD`.
4. **Design Consistency Gate** — Purpose: tokens/components reused. Evidence: screenshots + token references. Pass: matches `design-system.md`. Fail: ad-hoc styles. Owner: UI/UX.
5. **Code Quality Gate** — Evidence: lint+typecheck logs. Pass: 0 errors. Fail: any error/ignored rule. Owner: Reviewer. Check: `npm run lint && npm run typecheck`.
6. **Responsive Gate** — Evidence: captures at all 8 breakpoints. Pass: no overflow, usable. Fail: broken layout/horizontal scroll. Owner: QA. Check: Playwright viewport runs.
7. **Accessibility Gate** — Evidence: axe report + keyboard walkthrough. Pass: 0 serious/critical, AA contrast. Fail: violations. Owner: A11y Auditor. Check: `npm run test:a11y`.
8. **SEO Gate** — Evidence: metadata + JSON-LD + sitemap. Pass: per-route metadata valid. Fail: missing tags. Owner: SEO Auditor. Check: build + Lighthouse SEO.
9. **Test Gate** — Evidence: unit + e2e results. Pass: all green, meaningful coverage. Fail: failures/skips. Owner: QA. Check: `npm run test && npm run test:e2e`.
10. **Security Gate** — Evidence: `npm audit` + secret scan + XSS review. Pass: no high/critical, no secrets. Fail: any. Owner: Security Scanner. Check: `npm audit --audit-level=high && gitleaks detect`.
11. **Performance Gate** — Evidence: Lighthouse + bundle report. Pass: ≥90, budgets met. Fail: regressions. Owner: Perf Auditor. Check: `npm run lighthouse && npm run analyze`.
12. **Final Merge Gate** — Evidence: all gates green + reviewer approval. Pass: merger recommends. Fail: any open item. Owner: Merger Review.

---

## 11. Quality Standards

Clean code · reusable components · small focused files · consistent naming · organized folders · responsive design · accessibility · SEO · performance · security · maintainability · purposeful comments · robust error handling · explicit loading states · explicit empty states · validated forms · optimized images · design consistency · content consistency · cross-browser support. (Enforced via `docs/development-rules.md` + audits.)

---

## 12. Coding Rules

- No large/messy files; keep components small and focused (target < ~200 lines).
- Consistent naming; avoid duplicated UI logic; use reusable data arrays.
- Semantic HTML; accessible labels; `alt` on every image.
- No hardcoded repeated content; no unnecessary dependencies.
- Never expose secrets; never commit `.env`.
- Don't edit generated lock files unless required.
- Run checks before every commit; don't bypass lint; don't ignore TS errors.
- No `console.log` in production; no unsafe HTML (`dangerouslySetInnerHTML`) unless reviewed.
- Don't break mobile layout; no low-quality images.

---

## 13. Things to Avoid

Copying the reference layout exactly · editing another agent's files · mixing Claude/Codex tasks · starting code before reading `plan.md` · large unreviewed changes · skipping tests · skipping security checks · ignoring mobile/a11y/SEO · low-quality placeholder images · breaking design consistency · fake backend when not needed · overengineering · unnecessary packages · hiding failed checks · deleting files without approval.

---

## 14. Development Commands

```bash
# install
npm install

# dev server
npm run dev

# production build / preview
npm run build
npm run start

# lint / format / typecheck
npm run lint
npm run format
npm run typecheck            # tsc --noEmit

# tests
npm run test                 # Vitest unit
npm run test:e2e             # Playwright e2e + responsive viewports
npm run test:a11y            # axe via Playwright

# security
npm audit --audit-level=high
npx gitleaks detect --no-banner

# performance
npm run analyze              # @next/bundle-analyzer
npm run lighthouse           # Lighthouse CI
```
> `package.json` scripts are created by Codex in the build phase to match these names.

---

## 15. Design Implementation Plan (15 sections)

Each section: **Purpose · UI · Responsive · Data · Components · Owner · Files to edit · Files NOT to edit · Verification.** Owners: FE = Frontend Engineer, CE = Component Engineer, DE = Data Engineer (all Codex); design tokens/copy by UI/UX (Claude).

1. **Header/Navbar** — Purpose: brand + primary nav + contact CTA. UI: logo left, centered links (Buy/Sell/Rent/Agents/News), "Contact us" pill. Responsive: hamburger < md; sticky condensed on scroll. Data: nav items. Components: `Navbar`, `Logo`, `Button`, `MobileMenu`. Owner: FE/CE. Edit: `layouts/Header.tsx`, `data/nav.ts`. Don't edit: any section file. Verify: keyboard nav, focus trap in mobile menu, 8 breakpoints.
2. **Hero (luxury image)** — Purpose: emotive headline + supporting copy + hero image. UI: large display heading, paragraph top-right, full-bleed `next/image`. Responsive: stack text over image < md; clamp() type. Data: hero copy/image. Components: `Hero`. Edit: `sections/Hero.tsx`. Verify: LCP image priority, alt text, CLS≈0.
3. **AI-style search bar** — Purpose: natural-language search with Buy/Sell/Rent. UI: mode toggle, `+`, mic, waveform, submit arrow. Responsive: full-width, stacked controls on mobile. Data: modes, placeholder. Components: `SearchBar`, `ToggleGroup`, `IconButton`. Edit: `sections/SearchBar.tsx`, `components/forms/SearchForm.tsx`. Verify: labelled inputs, Enter submits, no layout shift.
4. **Suggested search chips** — Purpose: conversational query starters. UI: horizontal wrap/scroll pills. Responsive: horizontal scroll < md. Data: `data/suggestions.ts`. Components: `Chip`, `ChipRow`. Verify: focusable, scroll without overflow.
5. **Property category filter (Buy/Sell/Rent + chips)** — Purpose: filter listings. UI: chip row (New to Market, Most Viewed, Open Houses, Price Drop, Luxury, Sold). Responsive: scrollable. Data: `data/filters.ts`. Components: `FilterChips`. Verify: aria-pressed state, keyboard toggle.
6. **Featured homes** — Purpose: highlight premium listings. UI: card grid w/ image, price, title, address, beds/baths/sqft, CTA. Responsive: 1→2→3 cols. Data: `data/properties.ts`. Components: `PropertyCard`, `CardGrid`. Verify: image alt, price formatting, grid reflow.
7. **Homes for you** — Purpose: personalized-feel grid. UI: 3-card row. Responsive: 1→2→3. Data: properties subset. Components: reuse `PropertyCard`. Verify: no duplicated card logic.
8. **Property listing + map** — Purpose: browse list beside map. UI: left list (e.g., "139 Homes For Sale" + Save Search) / right map with pins. Responsive: map collapses below list < lg (toggle). Data: properties + geo. Components: `ListingPanel`, `MapView`, `MapPin`. Verify: keyboard-accessible list, map has text alternative, no CLS.
9. **Smarter way to sell** — Purpose: seller value prop. UI: left bullets + "Learn More", right image. Responsive: stack < md. Data: selling points. Components: `FeatureBand`. Verify: heading hierarchy, CTA focus.
10. **Neighborhood discovery** — Purpose: explore by area/agents. UI: trio cards (Search Neighborhoods / New Homes / Agent Directory). Responsive: 1→3. Data: `data/discovery.ts`. Components: `DiscoveryCard`. Verify: link semantics.
11. **Agent section** — Purpose: surface expert agents. UI: agent cards (photo, name, agency, rating). Responsive: 1→2→4. Data: `data/agents.ts`. Components: `AgentCard`. Verify: ratings have text, avatar alt.
12. **Real estate news** — Purpose: editorial authority. UI: 3 news cards (image, title, date). Responsive: 1→3. Data: `data/news.ts`. Components: `NewsCard`. Verify: time element, link semantics.
13. **Trends/tips/inspiration** — Purpose: learning content. UI: heading + "See All Learning" + article cards (date, title). Responsive: 1→3. Data: `data/articles.ts`. Components: reuse `NewsCard`/`ArticleCard`. Verify: consistent card pattern.
14. **CTA section** — Purpose: final conversion. UI: bold band + primary action. Responsive: padding scales. Data: CTA copy. Components: `CTABand`, `Button`. Verify: contrast, single clear action.
15. **Footer** — Purpose: nav, legal, social. UI: columns + secure external links. Responsive: stack columns. Data: `data/footer.ts`. Components: `Footer`. Verify: `rel="noopener noreferrer"` on external links, landmark role.

---

## 16. Security & AI Security Scanning

**Checks:** dependency audit · secret scanning · input validation · XSS prevention · safe external links · image-source safety · form validation · env-var rules · package-trust review · AI-generated-code security review · pre-merge security checklist.

**Rules:** never expose API keys · never commit `.env` · never trust user input · avoid unsafe HTML injection · validate forms (Zod) · safe external links (`rel="noopener noreferrer"`, restricted `target`) · review all third-party packages · run security audit before merge. Details in `docs/security-rules.md` + `audits/security-audit.md`.

---

## 17. Audits

Run from `/audits/`: UI · Responsive · Accessibility · SEO · Performance · Security · Code Quality · Final Release. Each lists What to check · How · Responsible agent · Required evidence · Pass/fail. Audits map to the gates in §10 and must pass before the Final Merge Gate.

---

## 18. Accountability System

Track every task in this table format (mirrored in the queues).
Statuses: `todo` → `in_progress` → `in_review` → `approved` → `merged` (or `blocked`).

### Phase 0 — Planning (complete)

| Task ID | Task Name | Owner | Agent | Branch | Files Touched | Status | Commands Run | Notes |
|---|---|---|---|---|---|---|---|---|
| C-001 | Author plan.md (22 sections) | Claude | PM / Architect | master | plan.md | done | n/a (docs) | Master coordination doc |
| C-002 | Author CLAUDE.md / CODEX.md | Claude | PM | master | CLAUDE.md, CODEX.md | done | n/a (docs) | Global agent rules |
| C-003 | Author 15 agent role files | Claude | Documentation | master | agents/*.md | done | n/a (docs) | All 8 fields per agent |
| C-004 | Author 8 audit checklists | Claude | Documentation | master | audits/*.md | done | n/a (docs) | Gate-mapped checklists |
| C-005 | Author 6 docs references | Claude | UI/UX + Arch | master | docs/*.md | done | n/a (docs) | Design system, rules, worktree strategy |
| C-006 | Finalize brand + accent | Claude | UI/UX | master | docs/design-system.md | done | n/a (docs) | Nordhaven / #1F6F5C locked |
| C-007 | UX copy for all 15 sections | Claude | UI/UX | master | docs/ux-copy.md | done | n/a (docs) | Full copy + aria-labels + tone guide |
| C-008 | Typed data shapes spec | Claude | Architect | master | docs/data-shapes.md | done | n/a (docs) | 10 modules, interfaces + Codex rules |

### Phase 1 — Setup & Foundations ✅ Complete

| Task ID | Task Name | Owner | Agent | Branch | Worktree Path | Files Touched | Status | Review | Verify |
|---|---|---|---|---|---|---|---|---|---|
| X-001 | Scaffold Next.js 15 + TS + Tailwind | Codex | FE Engineer | feature/codex-setup | — (merged) | package.json, configs, app/, styles/ | **merged** | `audits/reviews/review-codex-setup.md` | ✅ |
| X-002 | Add shadcn/ui + base UI primitives | Codex | Component Eng | feature/codex-setup | — (merged) | components/ui/** | **merged** | `audits/reviews/review-codex-setup.md` | ✅ |
| X-003 | Wire ESLint/Prettier/Vitest/Playwright | Codex | FE Engineer | feature/codex-setup | — (merged) | configs, tests/**, package.json | **merged** | `audits/reviews/review-codex-setup.md` | ✅ |
| X-004 | Implement Tailwind design tokens | Codex | Component Eng | feature/codex-tokens | — (merged) | styles/globals.css | **merged** | `audits/reviews/review-codex-tokens.md` | ✅ |

### Phase 2 — Sections

| Task ID | Task Name | Owner | Agent | Branch | Files Touched | Status | Review | Verify |
|---|---|---|---|---|---|---|---|---|
| X-010 | Header/Navbar + MobileMenu | Codex | FE Engineer | feature/codex-header-hero | layouts/Header.tsx, data/nav.ts | **merged** | `audits/reviews/review-codex-header-hero.md` | ✅ |
| X-011 | Hero section | Codex | FE Engineer | feature/codex-header-hero | sections/Hero.tsx, app/layout.tsx, app/page.tsx | **merged** | `audits/reviews/review-codex-header-hero.md` | ✅ |
| X-012 | AI search bar + form | Codex | FE Engineer | feature/codex-search | sections/SearchBar.tsx, components/forms/SearchForm.tsx | **merged** | `audits/reviews/review-codex-search.md` | ✅ |
| X-013 | Suggestion chips + filters | Codex | Component Eng | feature/codex-search | components/ui/Chip.tsx, data/suggestions.ts, data/filters.ts | **merged** | `audits/reviews/review-codex-chips-x013.md` | ✅ |
| X-014 | PropertyCard + CardGrid | Codex | Component Eng | feature/codex-property-cards | components/cards/PropertyCard.tsx, data/properties.ts | **merged** | `audits/reviews/review-codex-property-cards-x014-x015.md` | ✅ |
| X-015 | Featured homes + Homes for you | Codex | FE Engineer | feature/codex-property-cards | sections/FeaturedHomes.tsx, sections/HomesForYou.tsx | **merged** | `audits/reviews/review-codex-property-cards-x014-x015.md` | ✅ |
| X-016 | Listing + Map split | Codex | FE Engineer | feature/codex-map | sections/MapListing.tsx, components/MapView.tsx | **merged** | `audits/reviews/review-codex-map-x016.md` | ✅ |
| X-017 | Smarter-way-to-sell band | Codex | FE Engineer | feature/codex-sell | sections/FeatureBand.tsx | **todo** | — | heading hierarchy |
| X-018 | Neighbourhood discovery trio | Codex | Component Eng | feature/codex-discovery | sections/Discovery.tsx, data/discovery.ts | **todo** | — | link semantics |
| X-019 | Agent section | Codex | Component Eng | feature/codex-agents | sections/Agents.tsx, components/cards/AgentCard.tsx, data/agents.ts | **todo** | — | avatar alt, ratings |
| X-020 | News + Trends/Tips grids | Codex | FE Engineer | feature/codex-news | sections/News.tsx, sections/Trends.tsx, data/news.ts, data/articles.ts | **todo** | — | time element |
| X-021 | CTA band + Footer | Codex | FE Engineer | feature/codex-cta-footer | sections/CTABand.tsx, layouts/Footer.tsx, data/footer.ts | **todo** | — | external link rel |

### Phase 3 — Hardening

| Task ID | Task Name | Owner | Status | Verify |
|---|---|---|---|---|
| X-030 | SEO metadata + JSON-LD + sitemap/robots | Codex | todo | Lighthouse SEO, valid JSON-LD |
| X-031 | Accessibility pass | Codex | todo | `npm run test:a11y` 0 serious |
| X-032 | Performance + bundle budgets | Codex | todo | `npm run lighthouse` ≥ 90 |
| X-033 | Security pass | Codex | todo | `npm audit`, gitleaks clean |
| C-011 | Final release merge (dev→main) | Claude | pending Phase 3 | final-release-audit pass → Claude merges |

### Claude tasks — ongoing

| Task ID | Task Name | Status | Notes |
|---|---|---|---|
| C-009 | Maintain accountability table | ongoing | Updated 2026-06-29; X-013–X-016 merged |
| C-010 | Review + merge Codex PRs | ongoing | X-001–X-016 merged; awaiting X-017 |
| C-011 | Final release merge (dev→main) | pending Phase 3 | After final-release-audit passes → Claude merges dev→main |

---

## 19. How to Work With Me

- Ask before major design changes.
- Show the file plan before editing.
- Explain what will change and why.
- Give short progress updates.
- Provide exact commands to run.
- Report errors clearly; never hide failed checks.
- Ask confirmation before deleting files or large refactors.
- Always end with the next step.
- Do not start implementation before planning approval.

---

## 20. Final Support Files

Created alongside this plan (see §21 for removal policy):
`CLAUDE.md` · `CODEX.md` · `.claude/README.md` · `.codex/README.md` · `claude/tasks.md` · `codex/tasks.md` · `agents/{project-manager,architect,ui-ux-designer,software-engineer,component-engineer,data-content-engineer,qa-engineer,github-worktree-controller,github-reviewer,merger-review,security-scanner,performance-auditor,accessibility-auditor,seo-auditor,documentation-agent}.md` · `audits/{ui,responsive,security,performance,accessibility,seo,code-quality,final-release}-audit.md` · `docs/{design-system,worktree-strategy,development-rules,security-rules,responsive-rules,qa-checklist}.md`.

---

## 21. Safe To Remove plan.md Later

`plan.md` is the master coordination document during setup — **do not delete it early.**

It may be removed **only when all** of the following are true:
- All permanent instruction files (§20) are created and verified non-empty.
- All important information from `plan.md` has been copied into the correct permanent files (overview→README/docs; rules→development/security/responsive rules; agents→`/agents`; audits→`/audits`; design→`design-system.md`).
- The **Project Manager Agent** and **Merger Review Agent** both approve removal.
- It is **not** removed during early development.

Until then, treat `plan.md` as the single source of truth.

---

## 22. Final Response Format

When planning output is delivered, provide: (1) list of files created, (2) how Claude should start, (3) how Codex should start, (4) first 5 development tasks, (5) commands to run next, (6) risks/missing requirements. **Do not build the website until planning files are complete and approved.**
