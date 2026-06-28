# Security Rules

> Frontend security + AI-generated-code review rules. Mirrors `plan.md §16`. Owner: Security Scanner. Enforced by `audits/security-audit.md` (Gate §10.10).

## Non-negotiable rules
1. **Never expose API keys** — no secrets in client code or the browser bundle. Server-only secrets via env, accessed only in server code/route handlers.
2. **Never commit `.env`** — covered by `.gitignore`; verify with `git ls-files | grep -i env`.
3. **Never trust user input** — validate + sanitize everything (Zod schemas shared client/server).
4. **Avoid unsafe HTML injection** — no `dangerouslySetInnerHTML`; if unavoidable, sanitize and get review.
5. **Validate all forms** — React Hook Form + Zod; reject malformed input; rate-limit server actions if added.
6. **Safe external links** — every `target="_blank"` has `rel="noopener noreferrer"`.
7. **Review all third-party packages** — reputable, necessary, pinned; check maintenance + advisories before adding.
8. **Run a security audit before every merge.**

## Topic checklist
- **Dependency scanning:** `npm audit --audit-level=high`; address high/critical; prefer patched versions.
- **Secret scanning:** `npx gitleaks detect --no-banner` in CI + pre-merge.
- **Input validation:** Zod at every trust boundary (search, contact, newsletter, sell-enquiry).
- **XSS prevention:** rely on React escaping; no raw HTML; encode any dynamic attribute/URL.
- **Env-var protection:** only `NEXT_PUBLIC_*` reaches the client — never put secrets behind that prefix.
- **Image-source safety:** allow-list domains in `next.config` `images.remotePatterns`; no arbitrary remote images.
- **Security headers / CSP:** set CSP, `X-Content-Type-Options`, `Referrer-Policy`, `X-Frame-Options`/frame-ancestors via Next config or middleware.
- **Link safety:** validate outbound URLs; avoid `javascript:`/`data:` hrefs.

## AI-generated code review (every PR)
AI output is reviewed like any code, with extra attention to:
- [ ] No accidental secret/hardcoded token.
- [ ] No unsafe HTML or unvalidated input rendering.
- [ ] No unexpected/unknown dependency added.
- [ ] No insecure external link or remote image domain.
- [ ] No overbroad permissions/headers; no disabled security lint.
- [ ] Forms validated; errors handled without leaking internals.

## Pre-merge security checklist (maps to `audits/security-audit.md`)
- [ ] `npm audit --audit-level=high` clean.
- [ ] `gitleaks detect` clean; `.env` untracked.
- [ ] No keys in client bundle (`NEXT_PUBLIC_*` reviewed).
- [ ] No `dangerouslySetInnerHTML` without sanitization + review.
- [ ] All forms validated (Zod).
- [ ] External links: `rel="noopener noreferrer"`.
- [ ] Image domains allow-listed.
- [ ] Security headers/CSP present.
- [ ] New dependencies reviewed + pinned.

## Incident response (dev)
If a secret is committed: rotate it immediately, purge from history (`git filter-repo`), force-push with approval, and document in the security audit notes.
