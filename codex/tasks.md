# Codex Task Queue (Implementation · Tests · Refactor · Perf · Security Fixes)

> Codex pulls from this queue. Every task declares **owner**, **allowed/forbidden files**, **branch/worktree**, and **verification commands**. One active owner per file. See `plan.md §7`, `§15`, `§18`.

## Legend

Status: `todo` → `in_progress` → `in_review` → `approved` → `merged` (or `blocked`).
All build tasks are **blocked until Phase 0 planning is approved**.

## Phase 1 — Setup & Foundations

| ID    | Task                                                               | Status    | Branch               | Worktree                    | Allowed files                              | Forbidden            | Verify                         |
| ----- | ------------------------------------------------------------------ | --------- | -------------------- | --------------------------- | ------------------------------------------ | -------------------- | ------------------------------ |
| X-001 | Scaffold Next.js 15 + TS + Tailwind v4                             | in_review | feature/codex-setup  | ../worktrees/codex-frontend | `package.json`, configs, `app/`, `styles/` | `plan.md`, `docs/**` | `npm run build`                |
| X-002 | Install shadcn/ui + base UI primitives                             | in_review | feature/codex-setup  | ../worktrees/codex-frontend | `components/ui/**`, configs                | docs                 | `npm run lint`                 |
| X-003 | Add ESLint/Prettier/Vitest/Playwright + scripts                    | in_review | feature/codex-setup  | ../worktrees/codex-frontend | configs, `tests/**`, `package.json`        | docs                 | `npm run lint && npm run test` |
| X-004 | Implement design tokens in Tailwind (from `docs/design-system.md`) | blocked   | feature/codex-tokens | ../worktrees/codex-frontend | `styles/**`, tailwind config               | `docs/**`            | visual + `npm run build`       |

## Phase 2 — Sections (per plan.md §15; each on its own branch)

| ID | Task | Status | Branch | Allowed files | Verify |
|---|---|---|---|---|
| X-010 | Header/Navbar + MobileMenu | blocked | feature/codex-header-hero | `layouts/Header.tsx`, `data/nav.ts` | lint, a11y, 8 breakpoints |
| X-011 | Hero section | blocked | feature/codex-header-hero | `sections/Hero.tsx` | LCP/CLS, alt text |
| X-012 | AI search bar + form | blocked | feature/codex-search | `sections/SearchBar.tsx`, `components/forms/SearchForm.tsx` | labelled inputs, submit |
| X-013 | Suggestion chips + filters | blocked | feature/codex-search | `components/ui/Chip.tsx`, `data/suggestions.ts`, `data/filters.ts` | keyboard, scroll |
| X-014 | PropertyCard + CardGrid | blocked | feature/codex-property-cards | `components/cards/PropertyCard.tsx` | reuse, formatting |
| X-015 | Featured homes + Homes for you | blocked | feature/codex-property-cards | `sections/FeaturedHomes.tsx`, `sections/HomesForYou.tsx`, `data/properties.ts` | grid reflow |
| X-016 | Listing + Map split | blocked | feature/codex-map | `sections/MapListing.tsx`, `components/MapView.tsx` | a11y list, no CLS |
| X-017 | Smarter-way-to-sell band | blocked | feature/codex-sell | `sections/FeatureBand.tsx` | heading hierarchy |
| X-018 | Neighborhood discovery trio | blocked | feature/codex-discovery | `sections/Discovery.tsx`, `data/discovery.ts` | link semantics |
| X-019 | Agent section | blocked | feature/codex-agents | `sections/Agents.tsx`, `components/cards/AgentCard.tsx`, `data/agents.ts` | avatar alt, ratings text |
| X-020 | News + Trends/Tips grids | blocked | feature/codex-news | `sections/News.tsx`, `sections/Trends.tsx`, `data/news.ts`, `data/articles.ts` | time element |
| X-021 | CTA band + Footer | blocked | feature/codex-cta-footer | `sections/CTABand.tsx`, `layouts/Footer.tsx`, `data/footer.ts` | external link rel, contrast |

## Phase 3 — Hardening

| ID    | Task                                    | Status  | Verify                        |
| ----- | --------------------------------------- | ------- | ----------------------------- |
| X-030 | SEO metadata + JSON-LD + sitemap/robots | blocked | Lighthouse SEO, valid JSON-LD |
| X-031 | Accessibility pass                      | blocked | `npm run test:a11y` 0 serious |
| X-032 | Performance + bundle budgets            | blocked | `npm run lighthouse` ≥ 90     |
| X-033 | Security pass                           | blocked | `npm audit`, gitleaks clean   |

## Handoff log

- X-001 — Scaffolded Next.js 15.5.19 App Router with strict TypeScript, Tailwind CSS v4, ESLint, Prettier, Vitest command wiring, root app layout/page, and global styles in `../worktrees/codex-frontend` on `feature/codex-setup`. Commands run: `npm install`, `npm audit --audit-level=moderate` (clean after PostCSS override), `npm run lint`, `npm run typecheck`, `npm run test`, `npm run build`. Result: all requested checks passed; test command currently has no test files until X-003. Next: review X-001, then continue with X-002/X-003.
- X-002 — Installed shadcn/Radix primitive dependencies and added `components.json`, `lib/utils.ts`, and base primitives in `components/ui/**` (`Button`, `Input`, `Label`, `Textarea`, `Card`, `Badge`, `Separator`, `Dialog`, `Sheet`) in `../worktrees/codex-frontend` on `feature/codex-setup`. Commands run: `npm install`, `npm audit --audit-level=moderate`, `npm run lint`, `npm run typecheck`, `npm run test`, `npm run build`. Result: all checks passed; test command currently has no test files until X-003. Next: review X-002, then continue with X-003.
- X-003 — Added fuller tooling in `../worktrees/codex-frontend` on `feature/codex-setup`: stricter ESLint with jsx-a11y, Prettier Tailwind sorting with Codex-safe ignore rules, Vitest config/setup with a unit test, Playwright config with Chromium/Firefox/WebKit plus 8 responsive viewport projects, and seed e2e/a11y specs. Commands run: `npm install`, `npx playwright install chromium firefox webkit`, `npm run format`, `npm run format:check`, `npm run lint`, `npm run typecheck`, `npm run test`, `npm run build`, `npm run test:e2e`, `npm run test:a11y`, `npm audit --audit-level=moderate`. Result: all checks passed; e2e 14/14, a11y 3/3, unit 1/1, audit 0 vulnerabilities. Next: review X-003, then continue with X-004 design-token implementation.
