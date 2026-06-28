# .claude/ — Claude Workspace

This folder holds Claude's working notes and conventions. Claude's **global rules** are in the root `CLAUDE.md`; Claude's **task queue** is `/claude/tasks.md`.

## Purpose
- Scratch space for planning notes, decisions, and design specs in progress.
- A stable place to record cross-session context for the planning/documentation role.

## How Claude operates here
1. Start every session: read `/CLAUDE.md` → `/plan.md` → `/claude/tasks.md`.
2. Work **only** on files Claude owns (see `CLAUDE.md` → "What you own").
3. Never edit Codex-owned source (`app/`, `components/`, `data/`, configs, etc.).
4. For each task: state the file plan → produce the deliverable → write a handoff note.
5. Hand implementation work to Codex by writing tasks into `/codex/tasks.md` (write the task, not the code).

## Handoff note format
```
Task: <id> <name>
Files touched: <paths>
Commands run: <commands or "n/a (docs)">
Result: <pass/fail + summary>
Next step: <what Codex/Claude does next>
```

## Conventions
- Keep docs small, focused, internally consistent (stack names, breakpoints, agent list must match `plan.md`).
- Link to the canonical doc instead of duplicating content.
- Absolute dates, not relative.
- Do not store secrets here.

## Note on Claude Code settings
If Claude Code project settings are added later (e.g. `.claude/settings.json`), they coexist with this README. This README documents the *role workspace*, not tool configuration.
