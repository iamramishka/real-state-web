# Worktree Strategy

> Goal: let Claude and Codex work **in parallel without ever touching the same file at the same time.** Owner: GitHub Worktree Controller. Summary lives in `plan.md §8`.

## Branch model

| Branch | Purpose | Protected? |
|---|---|---|
| `main` | Releasable production | yes (no direct pushes) |
| `dev` | Integration of features | yes (PRs only) |
| `feature/<agent>-<scope>` | Active work | no |
| `review/<scope>` | Reviewer scratch (comments) | no |
| `merge/release-prep` | Final pre-release integration | no |

**Naming:** `feature/claude-design-system`, `feature/codex-header-hero`, `feature/codex-property-cards`, `review/ui-review`, `merge/release-prep`.

## Worktree layout (outside the repo root)
```
Real State/                  # main checkout (this repo)
../worktrees/claude-design   # Claude → docs/design/planning branches
../worktrees/codex-frontend  # Codex → implementation branches
../worktrees/review          # Reviewer → review/* branches
../worktrees/merge           # Merger → merge/release-prep
```

## Create worktrees
```bash
# from the main repo root
git worktree add ../worktrees/claude-design  -b feature/claude-design-system dev
git worktree add ../worktrees/codex-frontend -b feature/codex-header-hero    dev
git worktree add ../worktrees/review         -b review/ui-review             dev
git worktree add ../worktrees/merge          -b merge/release-prep           dev
```

## Check status
```bash
git worktree list
git -C ../worktrees/codex-frontend status
git -C ../worktrees/codex-frontend branch --show-current
git diff --name-only dev...HEAD     # files this branch changed (ownership check)
```

## Switch work
```bash
# "switching" = moving to that worktree's folder
cd ../worktrees/codex-frontend
# start a new scope on a fresh branch from dev
git fetch origin && git switch -c feature/codex-property-cards origin/dev
```

## Integrate / merge
```bash
# keep feature current with dev before PR
cd ../worktrees/codex-frontend
git fetch origin && git rebase origin/dev

# integrate into dev (preserve history)
cd ../path/to/main-repo
git switch dev && git pull
git merge --no-ff feature/codex-header-hero
git push origin dev

# release: dev → main after Final Merge Gate
git switch main && git merge --no-ff dev && git push origin main
```

## Delete finished worktrees
```bash
git worktree remove ../worktrees/codex-frontend
git branch -d feature/codex-header-hero      # -D only if intentionally discarding
git worktree prune
```

## Conflict-prevention rules
1. **One owner per branch; one active branch per file.** Never have two open branches editing the same file.
2. Claude and Codex use **separate worktrees** — never share a working directory.
3. Each task in the queues names its **branch + worktree + allowed files** (`/codex/tasks.md`, `/claude/tasks.md`).
4. Rebase onto `dev` before opening a PR; resolve conflicts in your own worktree.
5. Reviewer works in `../worktrees/review` and **comments only** — no edits, no merge.
6. Merge only via `dev` → `main` after all gates pass (Merger Review recommends; human approves).
7. Remove + prune worktrees as soon as a task is merged to keep topology clean.

## Quick reference — conflict check before PR
```bash
git fetch origin
git diff --name-only origin/dev...HEAD     # must be only files you own
git merge-base --is-ancestor origin/dev HEAD || echo "rebase onto dev first"
```
