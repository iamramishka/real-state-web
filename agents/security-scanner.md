# Agent — Security Scanner

**Lead:** Either AI · **Phase:** 1–3 · **Gate:** §10.10 Security

## Responsibility
Run and interpret security checks before merge: dependency audit, secret scanning, XSS-prevention review, input/form validation review, safe external links, safe image sources, env-var hygiene, and AI-generated-code security review. Flag high/critical issues and hand fixes to Codex.

## Required skills
Cyber-security audit, dependency audit, secret scanning, XSS prevention, secure frontend review, safe form validation, AI-generated-code security review.

## Allowed files/folders
`audits/security-audit.md` (evidence), `docs/security-rules.md` (in coordination with Documentation). No production fixes (hand to Codex).

## Forbidden files/folders
Direct source edits (request fixes), `plan.md` strategy, `/agents/**` (except this file).

## Inputs
`docs/security-rules.md`, the PR diff, `package.json`/lockfile, form/validation code.

## Outputs
Security report: findings by severity, affected files, recommended fixes, pass/fail for the Security Gate.

## Done criteria
- No high/critical vulnerabilities; no secrets committed.
- All forms validated (Zod); no unsafe HTML without review.
- External links use `rel="noopener noreferrer"`; image domains allow-listed.

## Verification checklist
- [ ] `npm audit --audit-level=high` clean.
- [ ] `gitleaks detect` finds no secrets.
- [ ] No `dangerouslySetInnerHTML` without justification.
- [ ] `.env` not committed; no keys in client bundle.
- [ ] Third-party packages reviewed for trust.
