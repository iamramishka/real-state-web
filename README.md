# Nordhaven — Premium Real Estate Website

A modern, premium, conversion-focused real estate website (buy / sell / rent / agents / news) with an AI-style natural-language search experience. Built by **Claude + Codex** working in parallel via GitHub worktrees.

> **Brand note:** `Nordhaven` is an original working name. The reference `design.webp` is inspiration only — never copied.

## Status
**Phase 0 — Planning.** No application code yet. Read the plan before building.

## Start here
1. **[`plan.md`](plan.md)** — master coordination document (overview, stack, structure, gates, design plan).
2. **[`CLAUDE.md`](CLAUDE.md)** / **[`CODEX.md`](CODEX.md)** — global rules for each AI agent.
3. **[`docs/`](docs/)** — design system, worktree strategy, development/security/responsive rules, QA checklist.
4. **[`agents/`](agents/)** — the 15 agent role definitions.
5. **[`audits/`](audits/)** — the 8 audit checklists run before merge/release.
6. Task queues: **[`claude/tasks.md`](claude/tasks.md)** and **[`codex/tasks.md`](codex/tasks.md)**.

## Tech stack (planned)
Next.js 15 (App Router) · TypeScript (strict) · Tailwind CSS v4 · shadcn/ui · Framer Motion · React Hook Form + Zod · Vitest + Playwright · deploy on Vercel. See [`plan.md` §2](plan.md).

## Working rules (essentials)
- One active owner per file; Claude and Codex never edit the same file in the same task.
- Every task declares allowed/forbidden paths + verification commands.
- Run `lint`, `typecheck`, `test`, `build` before every commit. Never commit `.env`.

## Commands (once the app is scaffolded by Codex)
See [`plan.md` §14](plan.md) for the full list (`npm run dev`, `build`, `lint`, `typecheck`, `test`, `test:e2e`, `test:a11y`, `analyze`, `lighthouse`).
