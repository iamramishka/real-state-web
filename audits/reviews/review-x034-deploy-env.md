# PR Review — X-034 (env-driven siteUrl)

**Reviewer:** Claude · **Date:** 2026-06-30 · **Decision:** ✅ APPROVED → merged into `dev`
**Task:** X-034 (deploy readiness — `NEXT_PUBLIC_SITE_URL`)
**Implemented by:** Claude, under **explicit human assignment** ("do this yourself"), which overrides the default Codex ownership of `lib/**` per `CLAUDE.md` rule 1 ("never write production code unless a task explicitly assigns it to Claude" — it was assigned). Same-author implement+review is noted for transparency; change is minimal and build-verified.

---

## Files changed
`lib/seo.ts` (1 line) · `.env.example` (new). No other source touched.

---

## Gate results

| Gate | Result | Evidence |
|---|---|---|
| 3 File Ownership | ✅ Pass | Only `lib/seo.ts` + `.env.example`; explicitly human-assigned to Claude |
| 5 Code Quality | ✅ Pass | `?? ` fallback; build runs lint+types clean |
| 8 SEO | ✅ Pass | Domain propagates to canonical/OG/sitemap/robots/JSON-LD via existing `siteUrl` consumers |
| 9 Build | ✅ Pass | Built twice — fallback + env override — both compile |
| 10 Security | ✅ Pass | `NEXT_PUBLIC_*` is a public origin (safe); `.env.example` only (real `.env*` still gitignored); no secrets |

## Verification
- **Build 1 (no env):** `siteUrl` → placeholder fallback; `✓ Compiled successfully`; robots.txt + sitemap.xml generated.
- **Build 2 (`NEXT_PUBLIC_SITE_URL=https://nordhaven-test.com`):** `✓ Compiled successfully`; the env domain appears in built `index.html` (canonical/OG) and `robots.txt` route output — **confirms env flows end-to-end**.
- `.gitignore` check: `.env.example` tracked; `.env`, `.env*.local` ignored. ✅

## Notes
- Downstream consumers (`absoluteUrl`, `siteConfig.url`, `app/sitemap.ts`, `app/robots.ts`, all JSON-LD builders) already read `siteUrl` — no further edits required.
- Deploy step unchanged from `docs/deployment.md`: set `NEXT_PUBLIC_SITE_URL` in Vercel; no code edit at deploy time.

## Verdict
**APPROVED.** Merge `feature/codex-deploy` → `dev`. Site is now deploy-ready.
