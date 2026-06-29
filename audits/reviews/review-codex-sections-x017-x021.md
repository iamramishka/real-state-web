# PR Review — X-017 → X-021 (Phase 2 remaining sections)

**Reviewer:** Claude · **Date:** 2026-06-29 · **Decision:** ✅ APPROVED → merged into `dev`
**Tasks covered:** X-017 (FeatureBand), X-018 (Discovery), X-019 (Agents), X-020 (News + Trends), X-021 (CTA band + Footer)
**Branch chain:** `feature/codex-sell` → `codex-discovery` → `codex-agents` → `codex-news` → `codex-cta-footer` (linear, merged in order)
**Reviewed against:** `audits/reviews/_rubric-x017-x021.md`

---

## File ownership
Verified via `git merge-base dev feature/codex-cta-footer` (base `898a178`): **Codex touched zero Claude-owned files.** `plan.md` / `claude/**` / `audits/**` appear in the raw `dev..branch` diff only as a base-divergence artifact (added to `dev` after the branch point). **CLEAN.**

---

## Universal gates (all five sections)

| Gate | Result | Evidence |
|---|---|---|
| 3 File Ownership | ✅ Pass | Only Codex-owned paths changed |
| 4 Design Consistency | ✅ Pass | Token classes only; no hardcoded hex; white-on-ink handled via `text-on-ink` / `text-white/*` opacity on dark sections |
| 5 Code Quality | ✅ Pass | No `console.log`; no unsafe HTML; RSC by default, `"use client"` only on NewsletterForm |
| 6 Responsive | ✅ Pass | Each grid reflows 1→2→3(/4) col; `sizes` on every image; new responsive viewport assertions |
| 7 Accessibility | ✅ Pass | Section landmarks + labelled headings; SR rating text; `<time dateTime>`; footer `<nav>` + landmark |
| 8 SEO | ✅ Pass | Semantic headings, `<time>` machine-readable dates |
| 10 Security | ✅ Pass | Newsletter Zod-validated; no secrets; external links `rel="noopener noreferrer" target="_blank"` |

---

## X-017 — FeatureBand (`sections/FeatureBand.tsx`)
- ✅ Copy exact: heading "The smarter way to / sell your home." (two `<span class="block">`), body verbatim, 4 bullets verbatim.
- ✅ CTA "Learn more" → `/sell`, `aria-label="Learn more about selling with Nordhaven"`.
- ✅ Image alt verbatim; `width/height` + `object-cover` in fixed-min-height container (no CLS); `sizes` set.
- ✅ `<section aria-labelledby="seller-band-title">` + `<h2 id>`; bullets real `<ul><li>`, accent dot `aria-hidden`. RSC. Two-col `lg:`, stacks mobile. `bg-bg-soft`.

## X-018 — Discovery (`sections/Discovery.tsx`, `data/discovery.ts`)
- ✅ Heading + subhead verbatim; 3 cards with exact headings/subtext; each CTA "Explore" `aria-label="Explore {heading}"`.
- ✅ `<article>` cards, descriptive image alts, internal links, `DiscoveryItem` typed. `<section aria-labelledby="discovery-title">`. Grid 1→`md:2`→`lg:3`. `bg-bg`.

## X-019 — Agents (`sections/Agents.tsx`, `components/cards/AgentCard.tsx`, `data/agents.ts`)
- ✅ **Star rating SR pattern exact:** `<span class="sr-only">{n} out of 5 stars — {m} reviews</span>` with visual `<Star>` row `aria-hidden="true"`. This was the highest-scrutiny item — implemented correctly.
- ✅ Avatar `<Image rounded-full>` with name+role alt; name in `<h3>`; `Agent` typed; Contact `aria-label="Contact {name}"` → `/agents/{slug}`.
- ✅ Empty state string verbatim. Grid `md:2 xl:4`. `bg-bg-soft`. RSC.

## X-020 — News + Trends (`News.tsx`, `Trends.tsx`, `NewsCard.tsx`, `ArticleCard.tsx`, `data/news.ts`, `data/articles.ts`)
- ✅ **`<time dateTime={publishedAt}>` on both card types** (highest-scrutiny item) — machine-readable ISO + human `Intl.DateTimeFormat` with `timeZone: "UTC"` (avoids off-by-one date drift). Correct.
- ✅ News heading/subhead + Trends heading/subhead verbatim; read-more aria-labels exact (`Read:` / `Read more:`); both empty states verbatim.
- ✅ News `bg-bg` 3-col; Trends `bg-bg-soft` up to 4-col. RSC.

## X-021 — CTA band + Footer (`CTABand.tsx`, `Footer.tsx`, `NewsletterForm.tsx`, `data/footer.ts`)
- ✅ CTA heading/subhead verbatim; button "Start your search" → `/buy`, `aria-label` exact; `bg-ink text-on-ink`, white button `text-ink bg-white` (strong contrast). RSC.
- ✅ `<footer>` landmark; brand link (not a heading — avoids hierarchy clash); 5 columns in `<nav aria-label="Footer navigation">`; tagline + legal present.
- ✅ **Newsletter security:** `"use client"` scoped; Zod `z.string().email()`; `useId()` IDs; `aria-invalid` + `aria-describedby`; live message region. `onSubmit` only sets a local success message and resets — **no network call, no data leaves the client, no secrets.** Safest possible mock. ✅
- ✅ External social/legal links: `rel="noopener noreferrer" target="_blank"`; internal links plain `<Link>`. Conditional `FooterNavLink` handles both correctly.

---

## Minor notes (non-blocking, for a future polish pass)
1. **Newsletter error live-region politeness:** message `<p>` uses `role="status"` (polite) for both error and success. The rubric suggested `role="alert"` (assertive) for errors. `status` still announces; acceptable. Consider `alert` for validation errors in the a11y pass (X-031).
2. **Footer column headings as `<h2>`:** five `<h2>` column headings sit under the page without a footer-level heading. Acceptable inside a `<footer>`+`<nav>` landmark; a future option is `<h3>` or visually-hidden footer `<h2>`. Note for X-031.
3. **Dark-section muted text:** `text-white/75` / `placeholder:text-white/60` on `--ink` — large/secondary text passes AA; placeholder is decorative (real `<Label>` present). Verify in automated contrast pass (X-031).

None block merge — all are candidates for the Phase 3 accessibility pass.

---

## Verdict
**APPROVED.** Merge the chain `feature/codex-sell` → `codex-discovery` → `codex-agents` → `codex-news` → `codex-cta-footer` into `dev` in order. **Phase 2 complete after merge.**
