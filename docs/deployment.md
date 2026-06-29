# Deployment Runbook — Nordhaven

> Status: **v1.0.0 released to `main` (2026-06-30).** The codebase is production-ready; this runbook covers the remaining deploy-time steps. Owner of code changes here = **Codex** (`X-034`); owner of the hosting actions = **human**.

Target platform: **Vercel** (Next.js 15 App Router, static-first). Repo: `iamramishka/real-state-web`, deploy from `main`.

---

## Pre-deploy checklist

| # | Item | Owner | Type | Blocking? |
|---|---|---|---|---|
| 1 | Production domain wired into `siteUrl` (via env) | Codex (X-034) + human (set env) | Code + config | ✅ for correct SEO/OG/sitemap URLs |
| 2 | Vercel project created, `main` connected | Human | Hosting | ✅ |
| 3 | `NEXT_PUBLIC_SITE_URL` set in Vercel env | Human | Config | ✅ |
| 4 | Production build passes on Vercel | Auto | Build | ✅ |
| 5 | Preview smoke test: loads, zero console errors | Human | QA | ✅ |
| 6 | Visual pass on generated imagery | Human | QA | ⚠️ recommended |
| 7 | `robots.txt` / `sitemap.xml` resolve on the live domain | Human | QA | ⚠️ recommended |
| 8 | Lighthouse on the deployed URL (Perf/SEO/A11y/BP ≥ 90) | Human | QA | ⚠️ recommended |

---

## Why `siteUrl` must be an env var (the X-034 change)

Today `lib/seo.ts` hardcodes `siteUrl = "https://www.nordhaven.example"`. That string feeds:
- `metadataBase` (resolves all relative OG/Twitter image URLs),
- canonical URL,
- `sitemap.xml` entries,
- `robots.txt` `host` + `sitemap` pointer,
- all JSON-LD `url` / `item` fields (Organization, Breadcrumb, RealEstateListing).

If it ships as the placeholder, search engines and social scrapers index `nordhaven.example`. The fix is to read it from the environment so **deploy sets the domain with no code edit** — see X-034 brief in `codex/tasks.md`.

---

## Deploy steps (human, after X-034 merges)

1. **Vercel → New Project → import `real-state-web`.** Framework auto-detects Next.js. Production branch = `main`.
2. **Environment Variables** → add `NEXT_PUBLIC_SITE_URL = https://<real-domain>` (Production scope; also set for Preview if you want correct URLs in previews).
3. **Deploy.** Vercel runs `next build` (static export of `/`, `/robots.txt`, `/sitemap.xml`).
4. **Smoke test the preview URL:** homepage renders, no console errors, mobile nav opens/traps focus/closes on Escape, search + newsletter validation fire.
5. **Promote to Production** / attach the custom domain in Vercel → Domains.
6. **Post-deploy QA:** hit `/<domain>/robots.txt` and `/sitemap.xml`; run Lighthouse; validate JSON-LD in Google Rich Results Test.

---

## Rollback

Vercel keeps every deployment immutable. To roll back: **Vercel → Deployments → pick the last good one → Promote to Production.** Git-side, `main` stays at the released tag; revert by deploying the prior commit/tag (`v1.0.0`).

---

## Notes
- No secrets are required for v1.0 (static marketing site, no backend). `NEXT_PUBLIC_SITE_URL` is public by design — safe to expose.
- Security headers (CSP etc.) are applied via `next.config.ts` `headers()` and ship automatically on Vercel.
- When a real listings backend is added later, revisit CSP `connect-src` and add server env secrets (never `NEXT_PUBLIC_*` for secrets).
