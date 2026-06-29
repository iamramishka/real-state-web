# PR Review — X-030 (SEO) + X-031 (Accessibility pass)

**Reviewer:** Claude · **Date:** 2026-06-29 · **Decision:** ✅ APPROVED → merged into `dev`
**Tasks covered:** X-030 (SEO metadata + JSON-LD + sitemap/robots), X-031 (accessibility coverage pass)
**Branch chain:** `feature/codex-seo` → `feature/codex-a11y` (linear; merged via tip)

---

## File ownership
Verified via `git merge-base dev feature/codex-a11y` (base `9d7471d`): **Codex touched zero Claude-owned files.** CLEAN.

---

## Gate results

| Gate | Result | Evidence |
|---|---|---|
| 3 File Ownership | ✅ Pass | Only Codex-owned paths |
| 4 Design Consistency | ✅ Pass | No new visual code; tokens unaffected |
| 5 Code Quality | ✅ Pass | Strict TS; typed `MetadataRoute`; no `console.log` |
| 7 Accessibility | ✅ Pass | Landmark/heading/focus/dialog/form/contrast coverage added |
| 8 SEO | ✅ Pass | Full metadata, OG/Twitter, canonical, robots, sitemap, 3 JSON-LD graphs |
| 10 Security | ⚠️→✅ Pass | One `dangerouslySetInnerHTML` (JsonLd) — reviewed & mitigated (see below) |

---

## X-030 — SEO

**✅ `lib/seo.ts`:** Central `siteConfig` (name, title, description, url, ogImage) + `absoluteUrl()` helper. Three JSON-LD builders:
- `getOrganizationJsonLd()` — Organization with logo + sameAs social profiles
- `getBreadcrumbJsonLd()` — BreadcrumbList (Home)
- `getListingJsonLd()` — ItemList of `RealEstateListing` (first 6 featured) with address, geo, offers (price `/100` back to dollars, USD, InStock). Schema.org types valid. ✅

**✅ `app/layout.tsx` metadata:** `metadataBase` set (resolves relative OG URLs), `title.template` "%s | Nordhaven", description, `alternates.canonical`, full `openGraph` (1200×750 image, locale, type), `robots` with googleBot directives (`max-image-preview: large`), `twitter` summary_large_image. Comprehensive and correct. ✅

**✅ `app/robots.ts`:** Typed `MetadataRoute.Robots` — allow all, sitemap URL, host. ✅
**✅ `app/sitemap.ts`:** Typed `MetadataRoute.Sitemap` — 7 static routes + per-property + per-news + per-article URLs, with `lastModified`, `changeFrequency`, `priority` (home=1, sections=0.8, detail=0.6–0.7). ✅

**✅ JSON-LD mount (`app/page.tsx`):** Three `<JsonLd>` graphs rendered server-side at top of `<main>`. ✅

### Security — `components/JsonLd.tsx` (the one `dangerouslySetInnerHTML`)
This is the **only** `dangerouslySetInnerHTML` in the codebase and is the **canonical, safe Next.js JSON-LD injection pattern**:
- Input is **typed, internal data** (siteConfig + properties) — never user input.
- Serialized via `JSON.stringify`, then `<` is escaped to `<` — this **prevents `</script>` breakout XSS**, which is the exact mitigation required.
- Rendered server-side in a `type="application/ld+json"` script (inert; not executed as HTML).

**Per `docs/security-rules.md` "no `dangerouslySetInnerHTML` without sanitization + review":** this instance IS sanitized (the `<` escape) and IS reviewed here. **Approved as the single sanctioned exception.** Any future `dangerouslySetInnerHTML` must be re-reviewed.

---

## X-031 — Accessibility pass

**✅ Newsletter fix (addresses my deferred X-021 note #1):** `NewsletterForm` role logic changed to `role={errors.email ? "alert" : message ? "status" : undefined}` — errors now assertive (`alert`), success polite (`status`). Exactly the recommended fix. ✅

**✅ New axe + behavioural coverage (`tests/a11y/home-a11y.spec.ts`):**
- Landmarks: `banner`, `navigation[Primary navigation]`, `main`, `contentinfo` all asserted
- Heading structure: exactly **one** `<h1>` containing "Find the home" — no h1 duplication across 11 sections ✅
- Keyboard focus order: header tab-stops in expected sequence, with WebKit `.focus()` fallback (correct — WebKit doesn't Tab to links by default) ✅
- Mobile nav: dialog focus-trap verified (`element.contains(document.activeElement)`), Escape closes + returns focus to trigger ✅
- Form announcements: search error `role="alert"`, newsletter error `role="alert"`, newsletter success `role="status"` ✅
- Map alternative text + sr-only description asserted; **every** `<img>` asserted to have non-empty `alt` ✅
- Token contrast: computed WCAG luminance/ratio for ink-on-white, white-on-ink, ink-700-on-bg — all ≥ 4.5:1 ✅

**✅ Timeout:** `test.setTimeout(60_000)` for the now image-heavy page — pragmatic, not masking failures.

---

## Notes (non-blocking)
1. `siteUrl = "https://www.nordhaven.example"` is a placeholder — must be swapped for the real production domain before launch (flag for final-release audit / deploy config). Not a code defect.
2. Deferred X-021 notes #2 (footer heading level) and #3 (dark-section contrast) — #3 is now covered by the contrast test (passes); #2 remains a cosmetic option, not a violation.

---

## Verdict
**APPROVED.** Merge `feature/codex-seo` + `feature/codex-a11y` into `dev`. Remaining Phase 3: X-032 (performance), X-033 (security).
