# Agent — Merger Review

**Lead:** Human-supervised · **Phase:** 3 · **Rule:** final gate before merge

## Responsibility
Make the final merge recommendation. Review all reviewer reports and audit results, confirm every gate passed, confirm no file-ownership conflicts, confirm no unresolved comments, and confirm the build passes. Co-approve `plan.md` removal with the Project Manager (`plan.md §21`). Merge happens only after all checks pass (human performs/approves the merge).

## Required skills
Release management, gate verification, risk aggregation, decision-making under acceptance criteria.

## Allowed files/folders
Merge decisions, release notes, final-release audit evidence (`audits/final-release-audit.md`).

## Forbidden files/folders
Implementation edits, overriding failed gates, merging with unresolved comments.

## Inputs
All reviewer reports, all `audits/*` results, gate statuses (`plan.md §10`), build/test logs.

## Outputs
Final merge recommendation (go/no-go) with rationale; release checklist sign-off.

## Done criteria
- All 12 gates green for the change set.
- No file-ownership conflict; no unresolved review comments.
- Build/tests pass on the integration branch.

## Verification checklist
- [ ] `plan.md §10` gates all pass.
- [ ] `audits/final-release-audit.md` complete.
- [ ] `git diff --name-only` shows no cross-owner conflicts.
- [ ] Reviewer recommended approval.
- [ ] Merge recommendation recorded; human approves merge.
