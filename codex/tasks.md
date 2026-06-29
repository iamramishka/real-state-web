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
| X-004 | Implement design tokens in Tailwind (from `docs/design-system.md`) | in_review | feature/codex-tokens | ../worktrees/codex-frontend | `styles/**`, tailwind config               | `docs/**`            | visual + `npm run build`       |

## Phase 2 — Sections (per plan.md §15; each on its own branch)

| ID | Task | Status | Branch | Allowed files | Verify |
|---|---|---|---|---|
| X-010 | Header/Navbar + MobileMenu | in_review | feature/codex-header-hero | `layouts/Header.tsx`, `data/nav.ts` | lint, a11y, 8 breakpoints |
| X-011 | Hero section | in_review | feature/codex-header-hero | `sections/Hero.tsx` | LCP/CLS, alt text |
| X-012 | AI search bar + form | in_review | feature/codex-search | `sections/SearchBar.tsx`, `components/forms/SearchForm.tsx` | labelled inputs, submit |
| X-013 | Suggestion chips + filters | in_review | feature/codex-search | `components/ui/Chip.tsx`, `data/suggestions.ts`, `data/filters.ts` | keyboard, scroll |
| X-014 | PropertyCard + CardGrid | in_review | feature/codex-property-cards | `components/cards/PropertyCard.tsx` | reuse, formatting |
| X-015 | Featured homes + Homes for you | in_review | feature/codex-property-cards | `sections/FeaturedHomes.tsx`, `sections/HomesForYou.tsx`, `data/properties.ts` | grid reflow |
| X-016 | Listing + Map split | merged | feature/codex-map | `sections/MapListing.tsx`, `components/MapView.tsx` | a11y list, no CLS |
| X-017 | Smarter-way-to-sell band | merged | feature/codex-sell | `sections/FeatureBand.tsx` | heading hierarchy |
| X-018 | Neighbourhood discovery trio | merged | feature/codex-discovery | `sections/Discovery.tsx`, `data/discovery.ts` | link semantics |
| X-019 | Agent section | merged | feature/codex-agents | `sections/Agents.tsx`, `components/cards/AgentCard.tsx`, `data/agents.ts` | avatar alt, ratings text |
| X-020 | News + Trends/Tips grids | merged | feature/codex-news | `sections/News.tsx`, `sections/Trends.tsx`, `data/news.ts`, `data/articles.ts` | time element |
| X-021 | CTA band + Footer | merged | feature/codex-cta-footer | `sections/CTABand.tsx`, `layouts/Footer.tsx`, `data/footer.ts` | external link rel, contrast |

## Phase 3 — Hardening

| ID    | Task                                    | Status | Verify                        |
| ----- | --------------------------------------- | ------ | ----------------------------- |
| X-030 | SEO metadata + JSON-LD + sitemap/robots | merged | Lighthouse SEO, valid JSON-LD |
| X-031 | Accessibility pass                      | merged | `npm run test:a11y` 0 serious |
| X-032 | Performance + bundle budgets            | merged | `npm run lighthouse` ≥ 90     |
| X-033 | Security pass                           | merged | `npm audit`, gitleaks clean   |

## Phase 4 — Deploy readiness

| ID    | Task                                   | Status | Branch              | Allowed files                          | Verify                |
| ----- | -------------------------------------- | ------ | ------------------- | -------------------------------------- | --------------------- |
| X-034 | Make `siteUrl` env-driven for deploy   | merged | feature/codex-deploy | `lib/seo.ts`, `.env.example`, `tests/**` | `npm run build`, types |

> **X-034 done (2026-06-30):** implemented by **Claude** under explicit human assignment (overrode default Codex `lib/**` ownership for this one task). `siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? <placeholder>`; `.env.example` added. Build-verified with and without the env var (domain propagates to canonical/OG/sitemap/robots). Review: `audits/reviews/review-x034-deploy-env.md`. **Site is deploy-ready.**

### X-034 Brief — Env-driven site URL (deploy readiness)

**Why:** `lib/seo.ts` hardcodes `siteUrl = "https://www.nordhaven.example"`, which feeds `metadataBase`, canonical, `sitemap.xml`, `robots.txt`, and all JSON-LD URLs. Deploy must set the real domain **without a code edit**. See `docs/deployment.md`.

**Branch:** `feature/codex-deploy` (off current `dev`)
**Allowed:** `lib/seo.ts`, `.env.example` (create), `tests/e2e/home.spec.ts`
**Forbidden:** `plan.md`, `docs/**`, `audits/**`, `claude/**`, `agents/**`, other `app/**` logic

**Change:**
1. In `lib/seo.ts`, replace the hardcoded constant with:
   ```ts
   export const siteUrl =
     process.env.NEXT_PUBLIC_SITE_URL ?? "https://www.nordhaven.example";
   ```
   Keep the placeholder as the dev/fallback default so local build still works. Everything downstream (`absoluteUrl`, `siteConfig.url`, sitemap, robots, JSON-LD) already reads from `siteUrl` — no other edits needed.
2. Create `.env.example` with:
   ```
   # Production canonical origin (no trailing slash). Set in Vercel → Environment Variables.
   NEXT_PUBLIC_SITE_URL=https://www.nordhaven.example
   ```
   Confirm `.gitignore` still ignores real `.env*` files (it does) — only `.env.example` is committed.
3. Optional: add an e2e assertion that `<link rel="canonical">` / OG URL resolve to an absolute `http(s)://` origin (env-agnostic — don't hardcode the domain in the test).

**Verify:** `npm run format:check && npm run lint && npm run typecheck && npm run build && npm run test:e2e && npm run test:a11y && npm audit --audit-level=high`. Build must succeed with and without `NEXT_PUBLIC_SITE_URL` set.

**Security:** `NEXT_PUBLIC_SITE_URL` is a public origin — safe to expose. Do **not** introduce any non-public `NEXT_PUBLIC_*` value. No secrets, no `.env` committed.

Mark `in_review` + write handoff note. Claude reviews → merges → site is deploy-ready (then human sets the Vercel env var per `docs/deployment.md`).

## Handoff log

- X-001 — Scaffolded Next.js 15.5.19 App Router with strict TypeScript, Tailwind CSS v4, ESLint, Prettier, Vitest command wiring, root app layout/page, and global styles in `../worktrees/codex-frontend` on `feature/codex-setup`. Commands run: `npm install`, `npm audit --audit-level=moderate` (clean after PostCSS override), `npm run lint`, `npm run typecheck`, `npm run test`, `npm run build`. Result: all requested checks passed; test command currently has no test files until X-003. Next: review X-001, then continue with X-002/X-003.
- X-002 — Installed shadcn/Radix primitive dependencies and added `components.json`, `lib/utils.ts`, and base primitives in `components/ui/**` (`Button`, `Input`, `Label`, `Textarea`, `Card`, `Badge`, `Separator`, `Dialog`, `Sheet`) in `../worktrees/codex-frontend` on `feature/codex-setup`. Commands run: `npm install`, `npm audit --audit-level=moderate`, `npm run lint`, `npm run typecheck`, `npm run test`, `npm run build`. Result: all checks passed; test command currently has no test files until X-003. Next: review X-002, then continue with X-003.
- X-003 — Added fuller tooling in `../worktrees/codex-frontend` on `feature/codex-setup`: stricter ESLint with jsx-a11y, Prettier Tailwind sorting with Codex-safe ignore rules, Vitest config/setup with a unit test, Playwright config with Chromium/Firefox/WebKit plus 8 responsive viewport projects, and seed e2e/a11y specs. Commands run: `npm install`, `npx playwright install chromium firefox webkit`, `npm run format`, `npm run format:check`, `npm run lint`, `npm run typecheck`, `npm run test`, `npm run build`, `npm run test:e2e`, `npm run test:a11y`, `npm audit --audit-level=moderate`. Result: all checks passed; e2e 14/14, a11y 3/3, unit 1/1, audit 0 vulnerabilities. Next: review X-003, then continue with X-004 design-token implementation.
- X-004 — Implemented Tailwind v4 CSS-first design tokens from `docs/design-system.md` in `styles/globals.css` on `feature/codex-tokens`: Nordhaven color variables, Tailwind color aliases, typography scale, font family tokens, spacing/layout tokens, radii, shadows, 8 required breakpoints, focus/selection defaults, media element defaults, container/section helpers, and reduced-motion handling. Commands run: `npm run format:check`, `npm run lint`, `npm run typecheck`, `npm run test`, `npm run build`, `npm run test:e2e`, `npm run test:a11y`, `npm audit --audit-level=moderate`. Result: all checks passed; e2e 14/14, a11y 3/3, unit 1/1, audit 0 vulnerabilities. Next: review X-004, then Phase 1 is ready for review/merge sequencing.
- X-010 — Added the Nordhaven header/navbar and mobile menu on `feature/codex-header-hero`: `data/nav.ts` supplies typed nav config, `layouts/Header.tsx` renders logo, desktop nav, contact CTA, and Radix sheet mobile menu, and `app/layout.tsx` mounts the header so e2e/a11y checks exercise it. Commands run: `npm install`, `npm run format`, `npm run format:check`, `npm run lint`, `npm run typecheck`, `npm run test`, `npm run build`, `npm run test:e2e`, `npm run test:a11y`. Result: all checks passed; e2e 14/14 including 8 responsive widths, a11y 3/3, unit 1/1. Next: review X-010, then continue with X-011 Hero section on the same branch.
- X-011 — Added the homepage hero section on `feature/codex-header-hero`: `sections/Hero.tsx` renders the primary heading, supporting copy, and priority `next/image` hero artwork; `app/page.tsx` mounts the section; `public/images/hero-home.png` stores the generated local image asset; and `tests/e2e/home.spec.ts` checks the hero heading and image alt text. Image generation used the built-in image tool with a photorealistic contemporary luxury home prompt. Commands run: `npm run format`, `npm run format:check`, `npm run lint`, `npm run typecheck`, `npm run test`, `npm run build`, `npm run test:e2e`, `npm run test:a11y`. Result: all checks passed; e2e 14/14 including 8 responsive widths, a11y 3/3, unit 1/1. Next: review X-011, then continue with X-012 AI search bar + form.
- X-012 — Added the AI-style search bar and validated form on `feature/codex-search`: `sections/SearchBar.tsx` positions the floating search card under the hero, `components/forms/SearchForm.tsx` implements Buy/Sell/Rent mode switching, labelled natural-language input, add/mic/waveform/submit controls, React Hook Form + Zod validation, and a live status region; `app/page.tsx` mounts it; `tests/e2e/home.spec.ts` covers rendering, mode switching, Enter submit, and status feedback. Added `react-hook-form`, `zod`, and `@hookform/resolvers`; added `types/lucide-react.d.ts` because the installed lucide package declares but does not ship its typings file in this environment. Commands run: `npm install react-hook-form zod @hookform/resolvers` (timed out after updating package files), `npm run format`, `npm run format:check`, `npm run lint`, `npm run typecheck`, `npm run test`, `npm run build`, `npm run test:e2e`, `npm run test:a11y`, `npm audit --audit-level=moderate`. Result: all checks passed; e2e 17/17 including 8 responsive widths, a11y 3/3, unit 1/1, audit 0 vulnerabilities. Note: build/e2e/a11y printed the local Windows optional SWC binary warning but completed successfully. Next: review X-012, then continue with X-013 suggestion chips + filters on the same branch.
- X-013 — Added suggestion chips and property filter chips on `feature/codex-search`: `data/suggestions.ts` supplies the 8 conversational search suggestions from the UX copy, `data/filters.ts` supplies the 6 category filters, `components/ui/Chip.tsx` exports reusable suggestion/filter chip rows with keyboard-friendly button semantics, horizontal mobile scrolling, `aria-pressed` filter state, and labelled live-region feedback, and `sections/SearchBar.tsx` renders both rows under the search form. `tests/e2e/home.spec.ts` now covers suggestion keyboard activation, filter toggling, chip visibility, and responsive no-overflow checks. Commands run: `npm run format`, `npm run format:check`, `npm run lint`, `npm run typecheck`, `npm run test`, `npm run build`, `npm run test:e2e`, `npm run test:a11y`, `npm audit --audit-level=moderate`. Result: all checks passed; e2e 20/20 including 8 responsive widths, a11y 3/3, unit 1/1, audit 0 vulnerabilities. Note: build/e2e/a11y printed the local Windows optional SWC binary warning but completed successfully. Next: review X-013, then continue with X-014 PropertyCard + CardGrid.
- X-014 — Added `PropertyCard` and `CardGrid` on `feature/codex-property-cards`: `components/cards/PropertyCard.tsx` exports typed card props matching the property data shape, formats cents-based prices and sqft values, renders optimized listing imagery, semantic detail links, accessible beds/baths/sqft meta text, and a reusable responsive grid. Updated `types/lucide-react.d.ts` with the additional card icons required by the local lucide typings workaround. Commands run: `npm install`, `npm run format`, `npm run format:check`, `npm run lint`, `npm run typecheck`, `npm run test`, `npm run build`, `npm run test:e2e`, `npm run test:a11y`, `npm audit --audit-level=moderate`. Result: all checks passed; e2e 20/20 including 8 responsive widths, a11y 3/3, unit 1/1, audit 0 vulnerabilities. Next: review X-014, then continue with X-015 Featured homes + Homes for you.
- X-015 — Added Featured homes and Homes for you on `feature/codex-property-cards`: `data/properties.ts` defines the typed mock property dataset with 6 featured properties and 4 homes-for-you properties, `sections/FeaturedHomes.tsx` and `sections/HomesForYou.tsx` render reusable `PropertyCard` grids, `app/page.tsx` mounts both sections, `public/images/properties/**` stores six generated local listing images, and `tests/e2e/home.spec.ts` verifies section headings, card image alt text, card title, detail link href, and responsive no-overflow coverage. Property images were generated with the built-in image tool as a six-panel photorealistic residential listing contact sheet, then cropped locally to 16:10 card assets. Commands run: `npm run format`, `npm run format:check`, `npm run lint`, `npm run typecheck`, `npm run test`, `npm run build`, `npm run test:e2e`, `npm run test:a11y`, `npm audit --audit-level=moderate`. Result: all checks passed; e2e 20/20 including 8 responsive widths, a11y 3/3, unit 1/1, audit 0 vulnerabilities. Next: review X-015, then continue with X-016 Listing + Map split.
- X-016 — Added the listing + map split on `feature/codex-map`: `sections/MapListing.tsx` renders the "5 Homes for sale" panel with Save search, mobile Show map/Show list toggle, keyboard-accessible property list using reusable `PropertyCard`, and responsive list/map layout; `components/MapView.tsx` renders a labelled static map surface with keyboard-reachable detail-link pins and list-alternative text; `app/page.tsx` mounts the section; `types/lucide-react.d.ts` adds the new map/list icon declarations; and `tests/e2e/home.spec.ts` covers the map label, pin link, save-search control, and mobile toggle. Commands run: `npm install`, `npm run format`, `npm run format:check`, `npm run lint`, `npm run typecheck`, `npm run test`, `npm run build`, `npm run test:e2e`, `npm run test:a11y`, `npm audit --audit-level=moderate`. Result: all checks passed; e2e 23/23 including 8 responsive widths, a11y 3/3, unit 1/1, audit 0 vulnerabilities. **MERGED into dev 2026-06-29.**

---

## X-017 Brief — Smarter-way-to-sell band

**Branch:** `feature/codex-sell` (exists; branch off current `dev`)
**Files to create:** `sections/FeatureBand.tsx`
**Files to update:** `app/page.tsx` (mount after MapListing), `tests/e2e/home.spec.ts`
**Allowed:** `sections/FeatureBand.tsx`, `app/page.tsx`, `tests/e2e/home.spec.ts`
**Forbidden:** `plan.md`, `docs/**`, `audits/**`, `claude/**`, `agents/**`

**Content (from `docs/ux-copy.md §8`):**
- Heading: "The smarter way to sell your home." (display size, two lines)
- Body: "We combine sharp market insight, expert staging advice, and a network of serious buyers to get you the best result — faster and with less stress than the traditional route."
- 4 bullet points: "Suggested listing price within 48 hours" · "Professional photography included" · "Access to pre-qualified buyers" · "Dedicated agent from listing to close"
- CTA link: "Learn more" `href="/sell"` `aria-label="Learn more about selling with Nordhaven"`
- Feature image: generate a staged open-plan living room (`public/images/sell-feature.png`). Alt: "A beautifully staged open-plan living room with natural light streaming through large windows."

**Design:**
- Background: `bg-bg-soft` (alternating rhythm with HomesForYou `bg-bg-soft` already used — consider `bg-surface` or `bg-bg` for contrast; check page context)
- Layout: two-column on `lg:` — text/bullets/CTA left, image right (or reversed). Stacks single-column on mobile.
- Heading: `font-display text-h1 font-semibold text-balance text-ink`
- Bullets: `<ul>` with `<li>` — use accent checkmark icon (`Check` from lucide) `aria-hidden="true"` beside each item
- CTA: `<Link>` styled as secondary Button (not primary — page already has primary CTAs in hero)
- Image: `<Image>` with `priority={false}`, `sizes`, `aspect-[4/3]` or `aspect-[16/10]`, `rounded-xl border border-line shadow-soft`
- Section: `<section aria-labelledby="sell-band-title">` with `<h2 id="sell-band-title">`
- RSC only — no `"use client"` needed

**Verify:**
```
npm run format && npm run format:check && npm run lint && npm run typecheck && npm run test && npm run build && npm run test:e2e && npm run test:a11y && npm audit --audit-level=moderate
```
All must pass. Add E2E: assert section heading "The smarter way to sell your home." visible + CTA link href="/sell".

Mark status `in_review` and write handoff note when done.

---

## X-018 Brief — Neighbourhood discovery trio

**Branch:** `feature/codex-discovery` (branch off `dev` after X-017 merged)
**Files to create:** `sections/Discovery.tsx`, `data/discovery.ts`
**Files to update:** `app/page.tsx`, `tests/e2e/home.spec.ts`

**Content (from `docs/ux-copy.md §9`):**
- Heading: "Explore your next neighbourhood"
- Subhead: "Find the area that fits your life — schools, commute, cafés, and everything in between."
- Three cards:
  | Card | Heading | Subtext | href |
  |---|---|---|---|
  | Search neighbourhoods | Search neighbourhoods | Explore lifestyle, schools, and walkability scores. | /neighbourhoods |
  | New homes | New builds near you | Discover newly completed developments before they sell out. | /new-homes |
  | Agent directory | Meet your agent | Browse our network of local specialists by area. | /agents |
- Each card CTA: "Explore" `aria-label="Explore {card heading}"`
- Each card image: generate distinct neighbourhood/property images (`public/images/discovery/neighbourhoods.png`, `new-homes.png`, `agents.png`)

**Design:**
- Section: `<section aria-labelledby="discovery-title">` RSC
- Three-column grid `lg:grid-cols-3`, stacks to 1 col mobile, 2 col `md:`
- Cards: `<article>` with image top, heading, subtext, Explore link — use `border-line bg-surface shadow-soft rounded-xl` card treatment
- CTA link: `focus-visible:ring-accent`, `rel="noopener noreferrer"` not needed (internal links)
- Background: `bg-bg section-y`

---

## X-019 Brief — Agent section

**Branch:** `feature/codex-agents` (branch off `dev` after X-018 merged)
**Files to create:** `sections/Agents.tsx`, `components/cards/AgentCard.tsx`, `data/agents.ts`
**Files to update:** `app/page.tsx`, `tests/e2e/home.spec.ts`

**Content (from `docs/ux-copy.md §10`, `docs/data-shapes.md`):**
- Section heading: "Meet our expert agents"
- Subhead: "Local knowledge, honest advice, and a track record you can trust."
- 3–4 mock agents: name, title (e.g. "Senior Agent"), avatar image, rating (1–5 float), review count, areas served
- `AgentCard`: avatar `<Image>` with `rounded-full`, name `<h3>`, title, star rating visually + screen reader text `"{n} out of 5 stars — {m} reviews"`, Contact button `aria-label="Contact {agent name}"` `href="/agents/{slug}"`
- Empty state: "Agent profiles are loading. If they don't appear, please refresh the page."

**Design:**
- `bg-bg-soft section-y`; grid `md:grid-cols-2 xl:grid-cols-4`
- Stars: render filled/empty with `aria-hidden="true"` spans or SVGs; wrap in `<span class="sr-only">` for accessible text
- RSC (no `"use client"`)

---

## X-020 Brief — News + Trends/Tips grids

**Branch:** `feature/codex-news` (branch off `dev` after X-019 merged)
**Files to create:** `sections/News.tsx`, `sections/Trends.tsx`, `data/news.ts`, `data/articles.ts`, `components/cards/NewsCard.tsx`, `components/cards/ArticleCard.tsx`
**Files to update:** `app/page.tsx`, `tests/e2e/home.spec.ts`

**Content (from `docs/ux-copy.md §11, §12`):**
- News heading: "Real estate news"; subhead: "Stay up to date with the latest developments, market shifts, and practical guides."
- 3 mock news articles: title, excerpt, date, image, slug. Read more link `aria-label="Read: {title}"`. Date: `<time datetime="YYYY-MM-DD">Month D, YYYY</time>`
- Trends heading: "Discover trends, tips, and property inspiration"; subhead from ux-copy.md
- 3–4 mock articles/tips. "See all learning" `aria-label="See all learning resources"`. Card CTA "Read more" `aria-label="Read more: {title}"`
- Empty states per ux-copy.md

**Design:**
- News: `bg-bg section-y`; 3-col grid `lg:grid-cols-3`
- Trends: `bg-bg-soft section-y`; 3–4 col grid
- Both RSC

---

## X-021 Brief — CTA band + Footer

**Branch:** `feature/codex-cta-footer` (branch off `dev` after X-020 merged)
**Files to create:** `sections/CTABand.tsx`, `layouts/Footer.tsx`, `data/footer.ts`
**Files to update:** `app/layout.tsx` (mount Footer), `app/page.tsx` (mount CTABand), `tests/e2e/home.spec.ts`

**Content (from `docs/ux-copy.md §13, §14`):**
- CTA Band: heading "Ready to find your next home?", subhead "Search thousands of listings with a single, natural-language search.", primary button "Start your search" `href="/buy"` `aria-label="Start searching for a home"`. Background `bg-ink text-on-ink` (dark section — only on the homepage). RSC.
- Footer: brand "Nordhaven", tagline "Find your place.", 5 nav columns per ux-copy.md §14. Newsletter form: label "Stay in the loop", email input, Subscribe button. Copyright "© 2026 Nordhaven. All rights reserved."
- Newsletter: `"use client"` scoped; Zod email validation; success/error messages per ux-copy.md
- All footer external-ish links: `rel="noopener noreferrer"` only if truly external; internal links do not need it
- `<footer>` landmark, `<nav aria-label="Footer navigation">` per column group

**Security:** newsletter form must use Zod (`z.string().email()`); no `dangerouslySetInnerHTML`; contrast on dark CTA band must pass WCAG AA (`--on-ink` on `--ink` is pre-validated in design system)

---

## Phase 2 section handoffs (X-017–X-021) — all reviewed & merged 2026-06-29 (`audits/reviews/review-codex-sections-x017-x021.md`)

- X-017 — Added the smarter-way-to-sell feature band on `feature/codex-sell`: `sections/FeatureBand.tsx` renders the seller value prop with heading, body copy, four bullets, Learn more CTA, and generated local staged-living-room image; `app/page.tsx` mounts it after the listing/map split; `public/images/sell-feature-living-room.jpg` stores the optimized generated 1200x750 JPEG asset; and `tests/e2e/home.spec.ts` covers heading, bullet, image alt, and CTA link. Image generation used the built-in image tool with a photorealistic staged open-plan living-room prompt, then optimized locally. Commands run: `npm install`, `npm run format`, `npm run format:check`, `npm run lint`, `npm run typecheck`, `npm run test`, `npm run build`, `npm run test:e2e`, `npm run test:a11y`, `npm audit --audit-level=moderate`. Result: all checks passed; e2e 23/23 including 8 responsive widths, a11y 3/3, unit 1/1, audit 0 vulnerabilities. Next: review X-017, then continue with X-018 Neighborhood discovery trio.
- X-018 — Added the neighborhood discovery trio on `feature/codex-discovery`: `data/discovery.ts` defines the three discovery cards, `sections/Discovery.tsx` renders the responsive image cards with semantic headings and internal Explore links, `app/page.tsx` mounts it after the seller feature band, `public/images/discovery/{neighbourhoods,new-homes,agents}.jpg` stores optimized generated card imagery, `tests/e2e/home.spec.ts` covers the heading, first card image alt, and all three CTA hrefs, and `tests/e2e/responsive.spec.ts` uses the same 60s timeout as the homepage test for the now image-heavy page while keeping the no-overflow assertion. Image generation used the built-in image tool with separate photorealistic prompts for a walkable neighborhood, new-build homes, and a real estate office consultation scene, then optimized locally to 1200x750 JPEGs. Commands run: `npm install`, `npm run format`, `npm run format:check`, `npm run lint`, `npm run typecheck`, `npm run test`, `npm run build`, `npm run test:e2e`, `npm run test:a11y`, `npm audit --audit-level=moderate`. Result: all checks passed; e2e 23/23 including 8 responsive widths, a11y 3/3, unit 1/1, audit 0 vulnerabilities. Next: review X-018, then continue with X-019 Agent section.
- X-019 — Added the homepage agent section on `feature/codex-agents`: `data/agents.ts` defines four featured mock agents, `components/cards/AgentCard.tsx` renders rounded avatar images, titles, agencies, served areas, accessible screen-reader rating text, visual stars, and Contact links, `sections/Agents.tsx` renders the section and empty state, `app/page.tsx` mounts it after Discovery, `public/images/agents/{maya-chen,jordan-ellis,sofia-ramirez,theo-bennett}.jpg` stores optimized generated avatar imagery, `types/lucide-react.d.ts` adds the Star icon declaration, and `tests/e2e/home.spec.ts` covers heading, avatar alt text, rating label, and Contact href. Image generation used the built-in image tool with four fictional photorealistic professional portrait prompts, then optimized locally to 512x512 JPEGs. Commands run: `npm install`, `npm run format`, `npm run format:check`, `npm run lint`, `npm run typecheck`, `npm run test`, `npm run build`, `npm run test:e2e`, `npm run test:a11y`, `npm audit --audit-level=moderate`. Result: all checks passed; e2e 23/23 including 8 responsive widths, a11y 3/3, unit 1/1, audit 0 vulnerabilities. Next: review X-019, then continue with X-020 News + Trends/Tips grids.
- X-020 — Added Real estate news and Trends/tips/inspiration grids on `feature/codex-news`: `data/news.ts` and `data/articles.ts` define typed featured editorial content, `components/cards/NewsCard.tsx` and `components/cards/ArticleCard.tsx` render optimized images, accessible article links, tags/categories, and semantic `<time>` dates, `sections/News.tsx` and `sections/Trends.tsx` render the two homepage editorial sections and empty states, `app/page.tsx` mounts them after Agents, `public/images/news/**` and `public/images/articles/**` store cropped optimized generated editorial imagery, `types/lucide-react.d.ts` adds the CalendarDays and ArrowUpRight icon declarations, and `tests/e2e/home.spec.ts` covers section headings, image alt text, time datetime/text, See all learning, and article link semantics. Image generation used the built-in image tool with two photorealistic editorial contact-sheet prompts, then cropped locally to 1200x750 JPEG card assets. Commands run: `npm install`, `npm run format`, `npm run format:check`, `npm run lint`, `npm run typecheck`, `npm run test`, `npm run build`, `npm run test:e2e`, `npm run test:a11y`, `npm audit --audit-level=moderate`. Result: all checks passed; e2e 23/23 including 8 responsive widths, a11y 3/3, unit 1/1, audit 0 vulnerabilities. Next: review X-020, then continue with X-021 CTA band + Footer.
- X-021 — Added the final homepage CTA band and footer on `feature/codex-cta-footer`: `sections/CTABand.tsx` renders the dark conversion band with the specified heading, subhead, and `/buy` CTA, `data/footer.ts` defines typed footer columns, social links, newsletter copy, and legal text, `layouts/Footer.tsx` renders the footer landmark, footer navigation, external social links with `target="_blank"` and `rel="noopener noreferrer"`, and copyright, `components/forms/NewsletterForm.tsx` scopes the client-only Zod email validation and success/error messaging, `app/layout.tsx` mounts the footer globally, `app/page.tsx` mounts CTABand after Trends, and `tests/e2e/home.spec.ts` covers CTA href, footer landmark/navigation, social link attributes, copyright, and newsletter validation/submission. Commands run: `npm install`, `npm run format`, `npm run format:check`, `npm run lint`, `npm run typecheck`, `npm run test`, `npm run build`, `npm run test:e2e`, `npm run test:a11y`, `npm audit --audit-level=moderate`. Result: all checks passed; e2e 26/26 including 8 responsive widths, a11y 3/3, unit 1/1, audit 0 vulnerabilities. Next: review X-021, then continue with X-030 SEO metadata + JSON-LD + sitemap/robots.
- X-030 — Added SEO metadata, JSON-LD, sitemap, and robots on `feature/codex-seo`: `app/layout.tsx` now exports richer metadata with canonical, OpenGraph, Twitter, and crawler directives, `lib/seo.ts` centralizes site URLs and schema builders, `components/JsonLd.tsx` renders escaped static JSON-LD, `app/page.tsx` emits Organization, BreadcrumbList, and featured-listing ItemList structured data, `app/sitemap.ts` generates sitemap entries for homepage, primary routes, properties, news, and articles, `app/robots.ts` exposes the robots route, and `tests/e2e/home.spec.ts` parses JSON-LD and verifies metadata plus sitemap/robots reachability. Commands run: `npm install`, `npm run format`, `npm run format:check`, `npm run lint`, `npm run typecheck`, `npm run test`, `npm run build`, `npm run test:e2e`, `npm run test:a11y`, `npm audit --audit-level=moderate`. Result: all checks passed after correcting the canonical expectation to match Next's generated root URL; e2e 32/32 including 8 responsive widths, a11y 3/3, unit 1/1, audit 0 vulnerabilities. Next: review X-030, then continue with X-031 accessibility pass.
- X-031 — Completed the accessibility hardening pass on `feature/codex-a11y`: `components/forms/NewsletterForm.tsx` now announces newsletter validation errors with `role="alert"` while preserving polite success status messaging, and `tests/a11y/home-a11y.spec.ts` expands coverage beyond axe to verify landmarks, single H1, desktop keyboard focus order, mobile menu focus/escape behavior, form error/status announcements, map alternative text, non-empty image alt text, token contrast ratios, and 0 serious/critical axe violations across Chromium, Firefox, and WebKit. Commands run: `npm install`, `npm run format`, `npm run format:check`, `npm run lint`, `npm run typecheck`, `npm run test`, `npm run build`, `npm run test:e2e`, `npm run test:a11y`, `npm audit --audit-level=moderate`. Result: all checks passed; e2e 32/32 including 8 responsive widths, a11y 18/18, unit 1/1, audit 0 vulnerabilities. Next: review X-031, then continue with X-032 performance + bundle budgets.
- X-032 — Completed the performance and bundle-budget pass on `feature/codex-performance`: converted the hero and property PNG assets to optimized JPEGs, wired `@next/bundle-analyzer` through `npm run analyze`, added `npm run lighthouse` with mobile/desktop Lighthouse budgets, self-hosted fonts through `next/font`, split the header and listing/map interactions into smaller client islands, and replaced React Hook Form usage in the two homepage forms with lightweight Zod-backed local state. Commands run: `npm run analyze` (home JS gzip 137.3 KB / 200 KB), `npm run lighthouse` (mobile performance 100, LCP 920ms, CLS 0, TBT 0ms; desktop performance 97, LCP 672ms, CLS 0, TBT 0ms), plus full verification before commit. Result: performance budgets pass; Lighthouse reports are generated under ignored `.lighthouse/`. Next: review X-032, then continue with X-033 security pass.
- X-033 — Completed the security hardening pass on `feature/codex-security`: added site-wide Next.js security headers/CSP in `next.config.ts`, kept production CSP tighter while allowing local dev hydration for tests, added e2e assertions for CSP, referrer policy, nosniff, frame denial, and permissions policy, and made sitemap/robots request checks retry cleanly under local dev-server resets. Reviewed the existing `JsonLd` `dangerouslySetInnerHTML` usage; it only emits static structured data and escapes `<` before injection. Commands run: `npm install`, `npm run format`, `npm run format:check`, `npm run lint`, `npm run typecheck`, `npm run test`, `npm run build`, `npm run test:e2e`, `npm run test:a11y`, `npm audit --audit-level=high`, `npm audit --audit-level=moderate`, official `gitleaks detect --no-banner --source .`, tracked env/secret filename scan, and `.next` key-pattern scan. Result: all checks passed; e2e 35/35, a11y 18/18, audit 0 vulnerabilities, gitleaks no leaks, no tracked env files, no key-pattern matches in `.next`. Next: review X-033, then Phase 3 is ready for final release review.
- Post-X-033 final gate cleanup — Disabled Next.js prefetching on placeholder internal links that point to routes not implemented in the current MVP build, preventing post-load `_rsc` 404 fetches during Lighthouse. Commands run: `npm run format`, `npm run format:check`, `npm run lint`, `npm run typecheck`, `npm run test`, `npm run analyze`, `npm run lighthouse`, `npm run test:e2e`, `npm run test:a11y`, `npm audit --audit-level=moderate`. Result: all checks passed; Lighthouse mobile 100 / desktop 93, home JS gzip 137.3 KB / 200 KB, e2e 35/35, a11y 18/18, audit 0 vulnerabilities. Next: final release review/merge remains with Claude.
