# UI Audit

**Responsible agent:** UI/UX Design (with Reviewer) · **Gate:** §10.4 Design Consistency
**Required evidence:** annotated screenshots per section, token references, before/after for fixes.

| # | What to check | How to check | Pass criteria | Status |
|---|---|---|---|---|
| 1 | Tokens used (color/type/spacing/radius/shadow) | Inspect classes vs `docs/design-system.md` | No hardcoded values; tokens only | ☐ |
| 2 | Typographic hierarchy | Compare headings/body to type scale | Consistent scale; tight display tracking | ☐ |
| 3 | Spacing & whitespace | Visual + spacing scale | Generous, consistent rhythm | ☐ |
| 4 | Buttons & cards | Compare to component specs | Consistent radius/shadow/states | ☐ |
| 5 | Hero composition | Visual review | Clear headline + supporting copy + image | ☐ |
| 6 | AI search bar | Visual + interaction | Toggle/mic/waveform/submit present, aligned | ☐ |
| 7 | Suggestion chips | Visual review | Consistent pill style; readable | ☐ |
| 8 | Property/agent/news cards | Visual review | Uniform anatomy; no drift | ☐ |
| 9 | Map + listing layout | Visual review | Balanced split; clear hierarchy | ☐ |
| 10 | CTA section | Visual review | One clear action; strong contrast | ☐ |
| 11 | Footer | Visual review | Organized columns; legible | ☐ |
| 12 | Interaction states | Hover/focus/active/disabled | All states styled & visible | ☐ |
| 13 | Loading & empty states | Trigger states | Skeletons/empty messages present | ☐ |
| 14 | Brand originality | Compare to `design.webp` | Inspired, **not copied** | ☐ |
| 15 | Visual consistency across sections | Full-page scan | Cohesive premium look | ☐ |

**Fail =** any hardcoded styling, inconsistent components, missing states, or copied reference elements.
