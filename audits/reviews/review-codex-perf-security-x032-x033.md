# PR Review — X-032 (Performance) + X-033 (Security)

**Reviewer:** Claude · **Date:** 2026-06-30 · **Decision:** ✅ APPROVED → merged into `dev`
**Tasks covered:** X-032 (performance + bundle budgets), X-033 (security pass)
**Branch chain:** `feature/codex-performance` → `feature/codex-security` (linear; merged via tip)
**Reviewed against:** `audits/reviews/_rubric-x032-x033.md`

---

## File ownership
Verified via `git merge-base dev feature/codex-security` (base `b7e4fa6`): **Codex touched zero Claude-owned files.** All changes within `app/ components/ sections/ layouts/ data/ lib/ scripts/ tests/ public/ next.config.ts package.json`. CLEAN.

---

## Gate results

| Gate | Result | Evidence |
|---|---|---|
| 3 File Ownership | ✅ Pass | Codex-owned paths only |
| 4 Design Consistency | ✅ Pass | No token changes; refactors preserve classes |
| 5 Code Quality | ✅ Pass | Strict TS; cleaner client/server boundaries; no `console.log` |
| 6 Responsive | ✅ Pass | Map toggle + header refactor keep all breakpoint behaviour |
| 7 Accessibility | ✅ Pass | All aria/focus/labels preserved through refactor |
| 9 Test | ✅ Pass | e2e extended for security headers; existing suites intact |
| 10 Security | ✅ Pass | Full security-header set; CSP scoped; no secrets; one sanctioned `JsonLd` |
| 11 Performance | ✅ Pass | Image payload slashed; client JS reduced; RSC-ification; bundle/Lighthouse tooling |

---

## X-032 — Performance

**✅ Image payload (largest win):** All raster assets converted PNG → JPG and re-optimized:
- Hero `2,468 KB → 273 KB` (−89%) — directly improves LCP.
- Property images `~400 KB → ~45 KB` each (6 images).
- `lib/seo.ts` ogImage + `data/properties.ts` `src` updated to `.jpg`. `next.config.ts` adds `formats: ["image/avif","image/webp"]` so Next serves modern formats on top.

**✅ Client/server boundary reduction (excellent RSC discipline):**
- **`Header.tsx` is now pure RSC.** The client-only bits moved to `layouts/MobileMenu.tsx` (`"use client"`). Desktop nav, brand, CTA now render server-side → less client JS. All a11y preserved in MobileMenu (trigger `aria-label`, `SheetTitle`/`SheetDescription` wired, Radix focus trap, `SheetClose` per link).
- **`MapListing.tsx` is now RSC.** Client state lives in a thin `components/MapListingToggle.tsx` that receives server-rendered `list` / `map` / `title` as `ReactNode` props — the "push the client boundary down, pass server children in" pattern. `PropertyCard`s and `MapView` render on the server. Toggle keeps `aria-pressed`, `aria-label`s, CSS-only show/hide.

**✅ Forms slimmed:** `SearchForm` + `NewsletterForm` dropped `react-hook-form` + `@hookform/resolvers` (both removed from `package.json` and **fully absent from source**), replaced with native `useState` + `zod.safeParse`. **Validation still enforced via Zod**; `aria-invalid`, `role="alert"`/`role="status"`, `useId()` all intact. Net: smaller client bundle, simpler trust boundary, zero a11y regression.

**✅ Tooling:** `@next/bundle-analyzer` wired (gated on `ANALYZE=true`, `openAnalyzer:false` — no surprise browser pops). New `scripts/analyze.mjs` + `scripts/lighthouse.mjs` with `npm run analyze` / `npm run lighthouse`. `reactStrictMode: true`.

**✅ Dependency note:** `lucide-react ^1.21.0`, `react ^19.2.7`, `zod ^4.4.3` — no suspicious additions; the two form libs were *removed*, not added.

## X-033 — Security

**✅ Security headers (`next.config.ts` `headers()` on `/:path*`):**
- **CSP:** `default-src 'self'`, `base-uri 'self'`, `form-action 'self'`, `frame-ancestors 'none'`, `object-src 'none'`, `img-src 'self' data: blob:`, `font-src 'self'`. `script-src`/`connect-src` relax **only in dev** (`'unsafe-eval'`, `ws:`, `localhost` for HMR); production tightens and adds `upgrade-insecure-requests`. Scoped to `'self'` — **not** a wildcard. Allows the inline `application/ld+json` (not script-executed).
- **Referrer-Policy** `strict-origin-when-cross-origin` · **X-Content-Type-Options** `nosniff` · **X-Frame-Options** `DENY` · **Permissions-Policy** `camera=(), microphone=(), geolocation=(), payment=()`. Full, sensible set. ✅
- e2e extended to assert the headers are present.

**✅ Prefetch hardening (`prefetch={false}`):** Added to `<Link>`s pointing at not-yet-built placeholder routes (`/buy`, `/sell`, property/news/agent detail, etc.) across cards, header, footer, CTA, sections. Prevents Next from prefetching routes that 404 today — saves requests and avoids console noise. One-liner per link; no behaviour change for users.

**✅ `dangerouslySetInnerHTML`:** Still exactly one — `JsonLd.tsx`, escaped + typed data. No new instances.

---

## Notes (non-blocking)
1. **CSP `script-src 'unsafe-inline'`** is required for Next's inline bootstrap and is the standard pragmatic tradeoff for a statically-rendered site. A future hardening option is nonce-based CSP via middleware (requires dynamic rendering) — record as post-launch, not a blocker. Rubric reject-criterion was wildcard/`unsafe-inline *` or app-breaking CSP; this is neither.
2. Pre-launch: `lib/seo.ts` `siteUrl` still `nordhaven.example` placeholder — swap at deploy (already tracked for C-011).

---

## Verdict
**APPROVED.** Merge `feature/codex-performance` + `feature/codex-security` into `dev`. **Phase 3 complete — all 12 gates green. Ready for final-release audit and C-011 (`dev → main`).**
