# .codex/ — Codex Workspace

This folder holds Codex's working notes and conventions. Codex's **global rules** are in the root `CODEX.md`; Codex's **task queue** is `/codex/tasks.md`.

## Purpose
- Scratch space for implementation notes, build logs, and refactor plans.
- A stable place to record cross-session engineering context.

## How Codex operates here
1. Start every session: read `/CODEX.md` → `/plan.md` → `/codex/tasks.md`.
2. Create/enter your **own worktree** (`docs/worktree-strategy.md`); never share a worktree with Claude.
3. Work **only** on files Codex owns (see `CODEX.md` → "What you own").
4. Implement against `plan.md §15` + `docs/design-system.md`; reuse components.
5. Before any commit run: `npm run lint && npm run typecheck && npm run test && npm run build`.
6. Open a PR; record a handoff note.

## Handoff note format
```
Task: <id> <name>
Branch / worktree: <branch> @ <path>
Files touched: <paths>
Commands run: <lint/typecheck/test/build + results>
Result: <pass/fail + key numbers>
Next step: <review / merge / follow-up>
```

## Verification expectations
- Only owned files changed: `git diff --name-only dev...HEAD`.
- All gate commands green (see `plan.md §10`/`§14`).
- Responsive verified on all 8 breakpoints; no horizontal scroll; touch targets ≥ 44px.
- No secrets, no `console.log`, no ignored TS/lint errors.

## Do not
- Edit `plan.md`, `/agents/**`, `/audits/**`, `/docs/**`, or `/claude/**`.
- Change planning strategy without approval.
