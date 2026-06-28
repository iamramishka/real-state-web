# Security Audit

**Responsible agent:** Security Scanner · **Gate:** §10.10 Security
**Required evidence:** `npm audit` output, gitleaks report, grep results for unsafe patterns, dependency review notes.

| # | What to check | How to check | Pass criteria | Status |
|---|---|---|---|---|
| 1 | Dependency vulnerabilities | `npm audit --audit-level=high` | No high/critical | ☐ |
| 2 | Secret leakage | `npx gitleaks detect --no-banner` | No secrets found | ☐ |
| 3 | `.env` not committed | `git ls-files \| grep -i env` | No env files tracked | ☐ |
| 4 | No keys in client bundle | Search built output | No API keys client-side | ☐ |
| 5 | Unsafe HTML | grep `dangerouslySetInnerHTML` | None, or reviewed+sanitized | ☐ |
| 6 | Form validation | Review forms | All inputs validated (Zod) | ☐ |
| 7 | Input rendering | Review render paths | No untrusted input rendered raw | ☐ |
| 8 | External links | grep `target="_blank"` | All have `rel="noopener noreferrer"` | ☐ |
| 9 | Image sources | Review `next.config` domains | Allow-listed, safe sources | ☐ |
| 10 | Security headers | Review headers/CSP config | CSP + standard headers set | ☐ |
| 11 | Package trust | Review new deps | Reputable, necessary, pinned | ☐ |
| 12 | AI-generated code review | Manual review of generated code | No injected unsafe patterns | ☐ |

**Fail =** any high/critical vuln, committed secret, exposed key, unsafe HTML/links without review, or unvalidated form.
