# Development Rules

> Quality standards + coding rules for all implementation. Mirrors `plan.md §11/§12/§13`. Owner: Documentation/Architecture. Enforced by `audits/code-quality-audit.md`.

## Quality standards
Clean code · reusable components · small focused files · consistent naming · organized folders · responsive design · accessibility · SEO · performance · security · maintainability · purposeful comments · robust error handling · explicit loading states · explicit empty states · validated forms · optimized images · design consistency · content consistency · cross-browser support.

## Coding rules
- **Small files:** components focused, target < ~200 lines; extract when larger.
- **Naming:** `PascalCase` components, `camelCase` vars/functions, `kebab-case` files where conventional, `SCREAMING_SNAKE` constants. Descriptive, no abbreviations.
- **No duplicated UI logic:** extract shared components/hooks; content lives in `data/**`.
- **Semantic HTML:** correct elements, landmarks, headings; `alt` on every image; labels on every control.
- **TypeScript:** `strict`; no `any`, no `@ts-ignore`/`@ts-expect-error` without justification.
- **Styling:** Tailwind tokens only (from `docs/design-system.md`); no hardcoded colors/spacing; sort classes (prettier-plugin-tailwindcss).
- **State:** server-first (RSC); add `"use client"` only when needed; keep client bundles small.
- **Imports:** absolute aliases (`@/components/...`); no deep relative chains.
- **Dependencies:** none added without rationale + review; reputable + pinned.
- **Secrets:** never expose API keys; never commit `.env`; never edit lockfiles unless required.
- **Pre-commit:** `npm run lint && npm run typecheck && npm run test && npm run build` must pass.
- **No bypassing:** don't disable lint rules or ignore TS errors; fix root cause.
- **No noise:** no `console.log` in production; no dead/commented-out code.
- **No unsafe HTML:** avoid `dangerouslySetInnerHTML`; if unavoidable, sanitize + get review.
- **Mobile:** never ship a broken mobile layout; verify all 8 breakpoints.
- **Images:** `next/image`, high quality, AVIF/WebP, correct `sizes`, `priority` on LCP.

## File organization
Follow `plan.md §3`. `components/ui` (primitives), `components/cards`, `components/forms`, `sections/` (page sections), `layouts/` (shells), `data/` (typed content), `hooks/`, `utils/` (pure), `lib/` (integrations/config), `styles/`, `tests/`.

## Error / loading / empty states
- Every async surface has: loading (skeleton), error (inline, announced, retry where sensible), empty (friendly message + next action).
- Forms: inline validation (Zod + React Hook Form), accessible error messages, disabled submit while pending.

## Things to avoid (`plan.md §13`)
Copying the reference exactly · editing another agent's files · mixing Claude/Codex tasks · coding before reading `plan.md` · large unreviewed changes · skipping tests/security · ignoring mobile/a11y/SEO · low-quality images · breaking design consistency · fake backend · overengineering · unnecessary packages · hiding failed checks · deleting files without approval.

## Definition of done (implementation task)
- [ ] Matches spec (`plan.md §15` + design system) on all 8 breakpoints.
- [ ] `lint`/`typecheck`/`test`/`build` green; e2e/a11y where applicable.
- [ ] Only owned files changed; reused components; no duplication.
- [ ] No secrets, no console logs, no ignored errors.
- [ ] Handoff note: files · commands · result · next step.
