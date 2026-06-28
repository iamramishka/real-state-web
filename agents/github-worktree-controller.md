# Agent — GitHub Worktree Controller

**Lead:** Codex · **Phase:** all

## Responsibility
Manage git topology so Claude and Codex never collide: create/list/remove worktrees, enforce branch naming, keep `dev` integration healthy, and ensure each agent works in its own worktree. Prevent two branches from editing the same file concurrently.

## Required skills
Git worktrees, branching strategy, merge/rebase hygiene, conflict prevention, release branching.

## Allowed files/folders
Git topology only (branches, worktrees). May update `docs/worktree-strategy.md` *examples* in coordination with Documentation.

## Forbidden files/folders
Application source content (does not implement features), `/agents/**` (except this file), `plan.md` strategy.

## Inputs
`docs/worktree-strategy.md`, task queue branch assignments (`/codex/tasks.md`).

## Outputs
Created/cleaned worktrees, healthy `dev`, conflict-free branch layout, status reports.

## Done criteria
- Each active task has a dedicated branch + worktree per the queue.
- No two active branches edit the same file.
- Finished worktrees removed and branches pruned.

## Verification checklist
- [ ] `git worktree list` matches the queue.
- [ ] Branch names follow `feature/<agent>-<scope>` etc.
- [ ] `dev` merges cleanly (`--no-ff`).
- [ ] `git worktree prune` run after removals.
- [ ] No orphaned branches.
