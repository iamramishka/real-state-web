# Pre-Review Rubrics — X-017 → X-021 (Phase 2 remaining)

**Author:** Claude · **Date:** 2026-06-29 · **Purpose:** Per-section acceptance criteria prepared *before* code lands, so each review→merge is a fast, consistent checklist pass. Derived from `docs/ux-copy.md`, `docs/design-system.md`, `docs/data-shapes.md`.

> **Every section also passes the universal gates** (applied to all): file ownership clean · no hardcoded hex (tokens only) · no `console.log` · no `dangerouslySetInnerHTML` · external links `rel="noopener noreferrer"` · `npm audit` clean · gitleaks clean · all verify commands green (`lint`, `typecheck`, `build`, `test:e2e`, `test:a11y`).

---

## X-017 — Smarter-way-to-sell band (`FeatureBand.tsx`)

**Copy accuracy (ux-copy.md §8):**
- [ ] Heading exact: "The smarter way to sell your home."
- [ ] Body matches §8 word-for-word (~40 words)
- [ ] 4 bullets exact: 48-hour price · pro photography · pre-qualified buyers · dedicated agent
- [ ] CTA "Learn more" → `/sell`, `aria-label="Learn more about selling with Nordhaven"`
- [ ] Image alt exact: "A beautifully staged open-plan living room with natural light streaming through large windows."

**Structure / a11y:**
- [ ] `<section aria-labelledby="sell-band-title">` + `<h2 id="sell-band-title">`
- [ ] Bullets are real `<ul><li>`; check icons `aria-hidden="true"`
- [ ] CTA is secondary Button style (not primary — hero owns primary)
- [ ] RSC (no `"use client"`)

**Design / responsive:**
- [ ] Two-column `lg:`, single-column mobile
- [ ] Background contrasts neighbours (HomesForYou is `bg-bg-soft`) — expect `bg-surface` or `bg-bg`
- [ ] Image: `width/height` + `aspect-[*]` (no CLS), `priority={false}`, `sizes` set, `rounded-xl border-line shadow-soft`

**Test:** heading visible + CTA href="/sell".

---

## X-018 — Neighbourhood discovery trio (`Discovery.tsx`, `data/discovery.ts`)

**Copy accuracy (ux-copy.md §9):**
- [ ] Heading: "Explore your next neighbourhood"
- [ ] Subhead: "Find the area that fits your life — schools, commute, cafés, and everything in between."
- [ ] 3 cards exact headings/subtext: Search neighbourhoods · New builds near you · Meet your agent
- [ ] Each CTA "Explore", `aria-label="Explore {card heading}"`

**Structure / a11y:**
- [ ] `<section aria-labelledby="discovery-title">`
- [ ] Cards are `<article>`; each image has descriptive alt
- [ ] Links internal (no `rel` needed); `focus-visible:ring-accent`
- [ ] Data typed to `DiscoveryCard` shape (data-shapes.md)

**Design / responsive:** 1 col mobile → `md:grid-cols-2` → `lg:grid-cols-3`; `border-line bg-surface shadow-soft rounded-xl`.

**Test:** heading visible + one Explore link href.

---

## X-019 — Agent section (`Agents.tsx`, `AgentCard.tsx`, `data/agents.ts`)

**Copy accuracy (ux-copy.md §10):**
- [ ] Heading: "Meet our expert agents"
- [ ] Subhead: "Local knowledge, honest advice, and a track record you can trust."
- [ ] Rating SR text exact pattern: `"{n} out of 5 stars — {m} reviews"`
- [ ] Contact CTA `aria-label="Contact {agent name}"`
- [ ] Empty state: "Agent profiles are loading. If they don't appear, please refresh the page."

**Structure / a11y (highest scrutiny here):**
- [ ] Star rating: visual stars `aria-hidden="true"` + `<span class="sr-only">` with the exact rating text — NOT just visual stars
- [ ] Avatar `<Image>` has real alt (agent name + role), `rounded-full`
- [ ] Agent name in `<h3>`; correct heading hierarchy under section `<h2>`
- [ ] Data typed to `Agent` shape (data-shapes.md)
- [ ] RSC

**Design / responsive:** `bg-bg-soft section-y`; `md:grid-cols-2 xl:grid-cols-4`.

**Test:** heading visible + rating SR text present + Contact link.

---

## X-020 — News + Trends/Tips grids (`News.tsx`, `Trends.tsx`, `NewsCard.tsx`, `ArticleCard.tsx`, `data/news.ts`, `data/articles.ts`)

**Copy accuracy (ux-copy.md §11, §12):**
- [ ] News heading "Real estate news" + subhead exact
- [ ] Trends heading "Discover trends, tips, and property inspiration" + subhead exact
- [ ] News read-more `aria-label="Read: {title}"`; Trends `aria-label="Read more: {title}"`
- [ ] "See all learning" `aria-label="See all learning resources"`
- [ ] Empty states exact for both grids

**Structure / a11y (highest scrutiny: dates):**
- [ ] Dates use `<time datetime="YYYY-MM-DD">Month D, YYYY</time>` — machine-readable + human-readable
- [ ] Article images have descriptive alt
- [ ] Data typed to `NewsArticle` / `Article` shapes (data-shapes.md)
- [ ] RSC for both sections

**Design / responsive:** News `bg-bg section-y` 3-col; Trends `bg-bg-soft section-y` 3–4 col.

**Test:** both headings visible + one `<time>` element with valid `datetime`.

---

## X-021 — CTA band + Footer (`CTABand.tsx`, `Footer.tsx`, `data/footer.ts`)

**Copy accuracy (ux-copy.md §13, §14):**
- [ ] CTA heading "Ready to find your next home?" + subhead exact
- [ ] CTA button "Start your search" → `/buy`, `aria-label="Start searching for a home"`
- [ ] Footer brand "Nordhaven" + tagline "Find your place."
- [ ] 5 footer columns match §14 table exactly
- [ ] Newsletter: label "Stay in the loop", placeholder "Your email address", button "Subscribe" (`aria-label="Subscribe to the Nordhaven newsletter"`)
- [ ] Newsletter success/error messages exact

**Structure / a11y (highest scrutiny: contrast + form):**
- [ ] CTA band `bg-ink text-on-ink` — verify `--on-ink` on `--ink` passes WCAG AA (pre-validated in design system; confirm no overrides)
- [ ] `<footer>` landmark; each column group `<nav aria-label="...">`
- [ ] Newsletter form: `"use client"` scoped, Zod `z.string().email()`, labelled input, `role="alert"` error + `role="status"` success
- [ ] CTA band RSC; only newsletter is client

**Security (highest scrutiny):**
- [ ] No secrets; no `dangerouslySetInnerHTML`
- [ ] External links (social, legal) `rel="noopener noreferrer" target="_blank"` where external; internal links plain
- [ ] Email never logged or sent to a third party in client code

**Test:** CTA heading + Start search href="/buy" + footer landmark + newsletter validates bad email.

---

## How this is used
When a Codex branch lands, Claude:
1. Reads the changed files.
2. Walks the matching rubric above + universal gates.
3. Copies passing/failing items into `review-codex-{section}-{id}.md`.
4. Merges on all-green; requests changes otherwise.
