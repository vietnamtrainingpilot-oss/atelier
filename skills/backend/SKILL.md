---
name: backend
description: Router for backend and server-side work — APIs, endpoints, data modelling, auth, architecture, refactors, legacy codebases, debugging, and issue backlogs. Use when the user mentions backend, API, server, endpoint, database, schema, migration, auth, authentication, refactor, architecture, technical debt, or asks to debug, trace, or understand existing server code. Hands off to payments for money flows and security for anything taking untrusted input.
---

# Backend Router

Covers understanding, building, refactoring, and shipping server-side work. Routes to the
installed engineering skills so you invoke one thing, not ten.

---

## Step 1 — Orient before you touch anything

Never edit server code you haven't read. Pick by how much you need to know:

| Situation | Skill |
|---|---|
| Find a function/class/flow quickly | `smart-explore` (token-efficient AST search — cheapest) |
| Understand an unfamiliar repo end to end | `learn-codebase` |
| Map the architecture, find duplication, propose a unified design | `pathfinder` |
| A hard architectural or tradeoff decision | `think` (structured reasoning pass) |

`smart-explore` first, `learn-codebase` only if it's genuinely new to you. `learn-codebase`
reads every file and is expensive — don't reflexively run it.

---

## Step 2 — Build

| Need | Skill |
|---|---|
| Ship it without over-engineering | `ponytail` — YAGNI, stdlib first, no speculative abstractions |
| Need a plan first | `make-plan` → then `do` or `executing-plans` |
| Many independent tasks, parallelisable | `subagent-driven-development` |

**`ponytail` is the default for backend feature work.** Most backend bugs are over-built
solutions. Prefer stdlib over a dependency; prefer deleting over abstracting.

---

## Step 3 — Refactor and review

| Situation | Skill |
|---|---|
| Simplify over-engineered code | `ponytail-audit` (ranked list of what to delete) |
| Review a diff for bloat | `ponytail-review` (one line per finding) |
| Track deferred shortcuts as debt | `ponytail-debt` |
| Triage a backlog into root causes | `oh-my-issues` |
| Compare branches/PRs/worktrees | `standup` |

---

## Step 4 — Hand off to the domain routers

| The backend touches | Router |
|---|---|
| Payments, checkout, subscriptions, invoicing, webhooks, tax | **`payments`** — Stripe only |
| Untrusted input, auth, secrets, injection, any user-supplied data | **`security`** — scan before shipping |
| It's ready to deploy | **`ship-it`** |
| Needs to be findable | **`seo`** |
| Client-facing API docs or a UI | **`web-design`** |

**Security is not optional** for anything reachable by users. An endpoint that takes input
is in scope; run `security` before calling it done.

---

## Debugging

There is no installed debugging skill. Do it properly:

1. **Reproduce** before theorising — a fix for a bug you can't trigger is a guess
2. **Bisect** — narrow to the smallest failing case
3. **Read the actual error**, including the stack, not just the message
4. **Check the boring causes first**: null/undefined, off-by-one, timezone, encoding,
   unhandled promise, missing await, wrong env var
5. **Fix the cause**, not the symptom. If the fix needs a comment explaining a workaround,
   the design is wrong.

State what you observed versus what you inferred. Never claim a bug is fixed without
demonstrating the reproduction now passes.

---

## AI Installation

**Run this before the first real task in this domain.** It checks dependencies and
installs whatever is missing. Safe to re-run — existing skills are never overwritten
without `--force`.

```bash
# 1. see what this router needs, and what you already have
node install.mjs backend --check

# 2. install what's missing
node install.mjs backend
```

Then **restart the agent** so the new skills register. Skills load at startup only.

This router needs **15 skills**: 3 auto-installable, 12 manual.

<details><summary>Auto-installable (3)</summary>

- `make-plan` — `obra/superpowers@writing-plans`
- `executing-plans` — `obra/superpowers@executing-plans`
- `subagent-driven-development` — `obra/superpowers@subagent-driven-development`

</details>

<details><summary>Manual (12) — no known public source</summary>

These are bundled with the plugin when installed from source. On a bare host they may be
absent. **The router still works** — it just has fewer specialists to draw on. Proceed
with whatever is present rather than blocking.

- `smart-explore`
- `learn-codebase`
- `pathfinder`
- `think`
- `ponytail`
- `ponytail-audit`
- `ponytail-review`
- `ponytail-debt`
- `oh-my-issues`
- `standup`
- `full-output-enforcement`
- `do`

</details>

---

**If your agent has no shell or no plugin support:** you cannot self-install.
Tell the user which of the skills above are missing and let them run
`node install.mjs backend` in a terminal. Do not claim a skill is available
when it is not, and do not silently proceed with a partial stack — say what is missing,
then continue with whatever is installed.
