# Backend Skill Map

Skills routed by `backend`. All global at `~/.agents/skills/`.

## Orient
| Skill | Use |
|---|---|
| `smart-explore` | Token-efficient AST/structural search. Cheapest. Default first stop. |
| `learn-codebase` | Read every source file. Expensive — only for genuinely unfamiliar repos. |
| `pathfinder` | Map features to flowcharts, find duplication across features, propose unified architecture, emit per-system `/make-plan` prompts |
| `think` | Structured 10-stage reasoning for architectural and tradeoff decisions |

## Build
| Skill | Use |
|---|---|
| `ponytail` | Lazy senior dev. YAGNI, stdlib first, no unrequested abstractions. Default for backend feature work. |
| `make-plan` | Phased implementation plan with doc discovery |
| `do` | Execute a phased plan with subagents |
| `executing-plans` | Execute a written plan with review checkpoints |
| `subagent-driven-development` | Many independent tasks in one session |

## Refactor & review
| Skill | Use |
|---|---|
| `ponytail-audit` | Whole-repo over-engineering audit, ranked list of what to delete |
| `ponytail-review` | Review a diff for bloat, one line per finding |
| `ponytail-debt` | Harvest `ponytail:` shortcut comments into a debt ledger |
| `ponytail-gain` | Scoreboard of measured impact from ponytail |
| `ponytail-help` | Quick reference for ponytail modes |
| `oh-my-issues` | Cluster an issue backlog by root cause into plan-master issues |
| `standup` | Read-only standup across worktrees/branches/PRs |

## Other
| Skill | Use |
|---|---|
| `full-output-enforcement` | Prevent truncated code generation. Only when truncation breaks the work. |
| `babysit` | Watch a PR / review cycle until merge-ready |

## Domain handoffs
`payments` · `security` · `ship-it` · `seo` · `web-design`

## Gaps — no skill installed
No dedicated **debugging** skill, no **API design/OpenAPI** skill, no **database/schema/migration**
skill, no **observability/logging** skill, and no **Docker/deployment** skill.

`ship-it` covers the deployment/release gate at a process level; there is no infrastructure-as-code
skill installed. If those come up, say so rather than implying coverage.