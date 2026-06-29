# Pre-Review Rubrics — X-032 (Performance) + X-033 (Security)

**Author:** Claude · **Date:** 2026-06-29 · **Purpose:** Acceptance criteria prepared before the final two Phase 3 branches land, so review→merge is a fast checklist pass. Derived from `plan.md §10/§11/§16`, `docs/security-rules.md`, `audits/performance-audit.md`, `audits/security-audit.md`.

> **Universal gates still apply:** file ownership clean (Codex touches no `plan.md`/`docs/**`/`agents/**`/`audits/**`/`claude/**`) · all verify commands green · no new `dangerouslySetInnerHTML` beyond the sanctioned `JsonLd.tsx` · no secrets committed.

---

## X-032 — Performance + bundle budgets

**Expected files (Codex-owned):** `next.config.ts` (image/compiler tweaks), possibly `app/**` (font loading, dynamic imports), test/config for budgets. No `docs/**`.

**Performance checklist:**
- [ ] **LCP image:** Hero `<Image priority>` confirmed; no other image marked `priority` (only the LCP one).
- [ ] **next/font:** Fonts loaded via `next/font` (self-hosted, no render-blocking external CSS / no layout shift). Display swap configured.
- [ ] **Image formats/sizes:** All `<Image>` have correct `sizes`; large images served responsively; AVIF/WebP via Next image pipeline.
- [ ] **CLS:** Every image/media has width/height or aspect-ratio container (already verified per-section; confirm no regressions).
- [ ] **Client JS minimal:** `"use client"` only where required (Header, SearchForm, MapListing toggle, NewsletterForm, Chip rows). No section needlessly client-side.
- [ ] **No blocking third-party scripts.** No analytics/tag managers added without `next/script` strategy.
- [ ] **Bundle budget:** If a budget mechanism is added, thresholds are reasonable and enforced (CI-style assert, not just a comment).
- [ ] **Lighthouse:** Performance ≥ 90 evidence in handoff (or documented local run). Accept that local Windows SWC warning is noise.

**Verify:** `npm run build` (check route sizes in output), `npm run lighthouse` (or documented), all existing e2e/a11y still green.

**Red flags to reject on:** new render-blocking resource; `priority` on multiple images; removing alt/aspect to "optimize"; converting RSC→client without cause; disabling image optimization globally.

---

## X-033 — Security pass

**Expected files (Codex-owned):** dependency bumps in `package.json`/lockfile, possibly `next.config.ts` security headers, maybe a `middleware.ts`. No `docs/**`.

**Security checklist (per `docs/security-rules.md`):**
- [ ] **`npm audit --audit-level=high`** — zero high/critical. Evidence in handoff.
- [ ] **gitleaks** — zero findings; no `.env`, keys, tokens committed. Confirm `.gitignore` still covers `.env*`.
- [ ] **No secrets in client code** — grep for API keys / tokens / `process.env.*` leaking into client components. `process.env` only in server/config/test.
- [ ] **`dangerouslySetInnerHTML`** — still only `JsonLd.tsx`, still escaped (`<`→`<`), typed data only. No new instances.
- [ ] **External links** — all `target="_blank"` carry `rel="noopener noreferrer"` (footer social already verified; confirm no new offenders).
- [ ] **Form trust boundaries** — SearchForm + NewsletterForm still Zod-validated; no eval/Function/dynamic require introduced.
- [ ] **Security headers (if added):** CSP / X-Content-Type-Options / Referrer-Policy / X-Frame-Options sane and not breaking the app. CSP must allow the inline JSON-LD (`type="application/ld+json"` is not script-src-executed, but verify no nonce mismatch).
- [ ] **Dependencies** — any new deps are reputable, listed in `plan.md §2` scope or justified, pinned.

**Verify:** `npm audit --audit-level=high`, gitleaks detect, `npm run build`, `npm run lint`, full test suite green.

**Red flags to reject on:** any high/critical advisory unresolved; a secret in the diff; CSP so strict it blocks the app or so loose it's `unsafe-inline *`; new dep with known CVE; disabling a security lint rule.

---

## After both merge
1. Fill `audits/final-release-audit.md` gate table (all 12 ☑).
2. `npm run build` on `dev` — confirm success.
3. Swap `lib/seo.ts` `siteUrl` placeholder → real domain (or confirm deferred to deploy config).
4. GO decision → **C-011: merge `dev → main`** (Claude performs the merge per `plan.md §9`).
