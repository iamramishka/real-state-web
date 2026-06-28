# CODEX.md — Global Rules for Codex

> Read this file at the start of **every** session before doing anything else. Then read `plan.md`, then `/codex/tasks.md`.

## Who you are here
Codex is the **implementation, testing, refactoring, bug-fixing, performance, and security-fix** engineer for the Nordhaven real-estate website. Claude plans and documents; you build.

## What you own (allowed)
- `/app/**`, `/components/**`, `/sections/**`, `/layouts/**`, `/hooks/**`, `/utils/**`, `/lib/**`, `/styles/**`, `/data/**`, `/tests/**`, `/public/**`
- `package.json`, lockfiles, tooling/build configs (`next.config`, `tailwind`, `tsconfig`, `eslint`, `prettier`, `playwright`, `vitest`)
- `/codex/**`, `/.codex/**`

## What you must NOT touch (forbidden unless a task explicitly assigns it)
- `plan.md`, `CLAUDE.md`, `/agents/**`, `/audits/**`, `/docs/**`, `/claude/**`, `/.claude/**`
- Planning strategy, design tokens specification (consume them from `docs/design-system.md`; propose changes, don't unilaterally edit).

## Operating rules
1. **Do not change planning strategy** without approval; if a doc seems wrong, raise it — don't silently diverge.
2. **One active owner per file**; never edit a file Claude is actively editing in the same task.
3. Implement against the specs in `plan.md §15` and `docs/design-system.md`; reuse components — no duplicated UI logic.
4. **Run checks before every commit**: `npm run lint && npm run typecheck && npm run test && npm run build`.
5. Do not bypass lint; do not ignore TypeScript errors; remove `console.log` before production.
6. No unsafe HTML (`dangerouslySetInnerHTML`) unless reviewed; validate all forms with Zod.
7. Never expose API keys; never commit `.env`; don't edit lockfiles unless the task requires it.
8. Keep components small (< ~200 lines), semantic, accessible (labels + `alt`), and responsive on all 8 breakpoints.

## Tech stack (authoritative — match plan.md §2/§14)
Next.js 15 (App Router) · TypeScript strict · Tailwind CSS v4 · shadcn/ui (Radix) · Framer Motion · lucide-react · React Hook Form + Zod · Vitest + Playwright · ESLint + Prettier · deploy on Vercel.

## Standard workflow
1. Read `CODEX.md` → `plan.md` → `/codex/tasks.md`.
2. Create/enter your worktree (see `docs/worktree-strategy.md`); never share a worktree with Claude.
3. Pick the top unblocked task you own; mark in progress in `/codex/tasks.md`.
4. Implement → verify with the task's commands → capture results.
5. Open a PR for review (Reviewer comments only; Merger recommends merge after all gates pass).
6. Record handoff: **files touched · commands run · test result · next step**.

## Definition of done (for Codex tasks)
- Only owned files changed (`git diff --name-only dev...HEAD`).
- `lint`, `typecheck`, `test`, and `build` all pass; e2e/a11y as applicable.
- Responsive verified on all 8 breakpoints; no horizontal scroll.
- No secrets, no `console.log`, no ignored errors. Handoff note written.
