# PR Review — feature/codex-property-cards (X-014, X-015)

**Reviewer:** Claude · **Date:** 2026-06-29 · **Decision:** ✅ APPROVED → merged into `dev`
**Tasks covered:** X-014 (PropertyCard component + data), X-015 (FeaturedHomes + HomesForYou sections)

---

## Files changed (all within Codex ownership)
`components/cards/PropertyCard.tsx` · `data/properties.ts` · `sections/FeaturedHomes.tsx` · `sections/HomesForYou.tsx` · `public/images/properties/` (6 images)
Updated: `app/page.tsx` · `tests/e2e/home.spec.ts`

No Claude-owned files touched. **File ownership: CLEAN.**

---

## Gate results

| Gate | Result | Evidence |
|---|---|---|
| 3 File Ownership | ✅ Pass | Only Codex-owned paths; no plan/docs/agents/audits touched |
| 4 Design Consistency | ✅ Pass | All token classes; no hardcoded hex; correct section patterns |
| 5 Code Quality | ✅ Pass | No console.log; no unsafe HTML; RSC sections; strict TypeScript |
| 6 Responsive | ✅ Pass | `md:grid-cols-2 xl:grid-cols-3`; `sizes` on images; stacks on mobile |
| 7 Accessibility | ✅ Pass | `<article>`; `aria-labelledby` on sections; `aria-label` on links; meta `aria-label` |
| 9 Test | ✅ Pass | E2E asserts sections headings, first card image by alt, card link href |
| 10 Security | ✅ Pass | No secrets; no dangerouslySetInnerHTML; Intl formatters only |

---

## Detailed findings

**✅ PropertyCard — semantic structure:** `<article>` with `border-line bg-surface shadow-soft hover:shadow-raised rounded-xl` — correct card treatment per design system. Hover shadow transition via `transition-shadow`. ✅

**✅ Price formatting:** `Intl.NumberFormat` with `style: "currency", currency: "USD", maximumFractionDigits: 0` — prices stored in cents (`price / 100` before formatting). Consistent with `data/properties.ts` where `price: 284000000` = $2.84M. `priceLabel` override available for custom strings (e.g. "From $1.2M"). ✅

**✅ Image:** `aspect-[16/10]` prevents CLS; `sizes="(max-width: 768px) calc(100vw - 2rem), (max-width: 1280px) 33vw, 392px"` — correctly maps to 3-col grid at 1280px+ max. `group-hover:scale-[1.02]` adds subtle hover zoom with `duration-base ease-standard` motion tokens. ✅

**✅ Accessible link pattern:** Two links per card — image link (first) + title link (inside content). Both `aria-label="View details for ${property.address}"` — NVDA/VoiceOver announce destination. `focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-surface` on both. ✅

**✅ Meta description:** `aria-label={metaText}` on meta row announces e.g. "4 bedrooms, 4 bathrooms, 3920 square feet" in full — screen readers don't have to parse icon+number pairs. Icons all `aria-hidden="true"`. ✅

**✅ `CardGrid`:** `grid gap-6 md:grid-cols-2 xl:grid-cols-3` — correct responsive progression (1 col → 2 → 3). Accepts `className` for overrides. ✅

**✅ FeaturedHomes.tsx:** RSC. `<section aria-labelledby="featured-homes-title">`. `bg-bg pb-section-y` — section uses bottom padding only (top handled by adjacent SearchBar). Empty state renders a descriptive `<p>` — no silent blank sections. ✅

**✅ HomesForYou.tsx:** RSC. `<section aria-labelledby="homes-for-you-title">`. `bg-bg-soft section-y` — alternating background for visual rhythm. Always renders (no empty state needed since `forYou` properties are curated). ✅

**✅ page.tsx:** `<main>` containing Hero → SearchBar → FeaturedHomes → HomesForYou. All RSC; no client boundary added at page level. ✅

**✅ Properties data:** 6+ properties with full shape: slug, coordinates, categories, listedAt — matches `docs/data-shapes.md` `Property` interface. `featured: true` / `forYou: true` flags drive section filtering. Images have descriptive alt text. ✅

**✅ Tests:** New assertions verify section headings by accessible name, first card image by partial alt match (`/contemporary glass hillside home/i`), card link `href` attribute = `/property/laurel-canyon-glass-residence`. All selectors accessible. ✅

**⚠️ Minor — type duplication (not blocking):** `PropertyCategory` union and `Image` interface both redefined in `data/properties.ts` (also exists in `data/filters.ts` for category). No runtime impact; note for future types consolidation.

**⚠️ Visual QA needed:** 6 property images in `public/images/properties/` cannot be verified for quality programmatically — flag for visual QA pass before production.

---

## Verdict
**APPROVED.** Merge `feature/codex-property-cards` → `dev`.
