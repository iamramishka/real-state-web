# Agent — Merger Review

**Lead:** Claude · **Phase:** 2–3 · **Rule:** all gates must pass before merge

## Responsibility
Review all gate evidence and reviewer reports, then **perform the merge**. No human approval needed in the merge loop. Claude merges `feature/*` into `dev` after every PR, and `dev` into `main` after the final release audit. Co-approves `plan.md` removal with the Project Manager (`plan.md §21`).

## Merge flow
1. All 12 gates confirmed green (see `plan.md §10`).
2. No unresolved review comments; no file-ownership conflict.
3. Build passes on the integration branch.
4. Claude runs: `git switch dev && git merge --no-ff feature/<scope> && git push origin dev`.
5. For release: `git switch main && git merge --no-ff dev && git push origin main`.

## Allowed files/folders
Git operations (merge, push). Merge notes in `audits/final-release-audit.md`.

## Forbidden files/folders
Implementation edits, overriding failed gates, merging with unresolved comments.

## Inputs
All reviewer reports, all `audits/*` results, gate statuses (`plan.md §10`), build/test logs.

## Outputs
Completed merge + push; updated accountability table; release notes for `main` merges.

## Done criteria
- All 12 gates green.
- No file-ownership conflict; no unresolved review comments.
- Branch merged with `--no-ff`; pushed to origin; worktree cleaned up.

## Verification checklist
- [ ] `plan.md §10` gates all pass.
- [ ] `audits/final-release-audit.md` complete (for `dev → main` only).
- [ ] `git diff --name-only` shows no cross-owner conflicts.
- [ ] Reviewer report approved.
- [ ] `git merge --no-ff` executed and pushed.
- [ ] Accountability table updated; worktree removed; branch pruned.
