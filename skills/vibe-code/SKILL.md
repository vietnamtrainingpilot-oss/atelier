---
name: vibe-code
description: Router for fast AI-driven application building — "vibe coding", scaffolding a new app, rapid prototyping, landing pages built quickly, or working from a vague idea to a running thing. Use when the user says vibe code, build me an app, scaffold, prototype, quick demo, MVP, prototype this idea, or wants to go from idea to running code fast without a heavyweight process.
---

# Vibe-Code

For **speed to something running**. Deliberately lighter than a full engineering process.
If the user wants planning, tests, or a reviewable PR — that is not vibe coding; say so and
offer the alternative.

---

## The fast path

```
1. brainstorm (2 min, not 20)  → nail the ONE thing this must do
2. scaffold + build             → get it running
3. look at it                   → playwright screenshot, does it work?
4. polish or stop
```

**Do not** invoke `make-plan`, `writing-plans`, or `subagent-driven-development` for a vibe
build. Those are for work that has to survive review.

---

## Stack routing

| Need | Lead skill |
|---|---|
| A beautiful landing/marketing page | `design-taste-frontend` — fastest good-looking output |
| A cinematic / high-production site | `ai-ui-ux-motion-engine` |
| A React/Next app | `vercel-react-best-practices` for the build, `ui-styling` for components |
| shadcn components | `ui-styling` |
| Scroll / GSAP motion | `awwwards-animations` or `scroll-craft` |
| A quick throwaway script | `ponytail` — lazy senior dev, YAGNI, stdlib first |
| Exploring an unfamiliar codebase first | `smart-explore` or `learn-codebase` |

---


## AI Installation

**Run this before the first real task in this domain.** It checks dependencies and
installs whatever is missing. Safe to re-run — existing skills are never overwritten
without `--force`.

```bash
# 1. see what this router needs, and what you already have
node install.mjs vibe-code --check

# 2. install what's missing
node install.mjs vibe-code
```

Then **restart the agent** so the new skills register. Skills load at startup only.

This router needs **4 skills**: 2 auto-installable, 2 manual.

<details><summary>Auto-installable (2)</summary>

- `brainstorming` — `obra/superpowers@brainstorming`
- `vercel-react-best-practices` — `vercel-labs/agent-skills@vercel-react-best-practices`

</details>

<details><summary>Manual (2) — no known public source</summary>

These are bundled with the plugin when installed from source. On a bare host they may be
absent. **The router still works** — it just has fewer specialists to draw on. Proceed
with whatever is present rather than blocking.

- `ponytail`
- `design-taste-frontend`

</details>

---

**If your agent has no shell or no plugin support:** you cannot self-install.
Tell the user which of the skills above are missing and let them run
`node install.mjs vibe-code` in a terminal. Do not claim a skill is available
when it is not, and do not silently proceed with a partial stack — say what is missing,
then continue with whatever is installed.

## Guardrails

**One decision at a time.** Ask at most one question before building. If the user says
"whatever you think", pick and proceed — do not interrogate.

**Define "done" before starting.** "Running in the browser with the hero section rendering" is
a definition of done. "Looks premium" is not.

**Look at it.** Screenshot via `playwright` at desktop and mobile before reporting success.
A vibe build that was never opened is not a vibe build, it's a guess.

**Scope freeze.** Once it runs, stop adding. Suggest improvements; don't silently expand.

**Escalate honestly.** If the task turns into something that genuinely needs auth, payments,
data modelling, or a security pass — say so, and point at `security`, `payments`, or
`ship-it`. Vibe coding has a ceiling; hitting it quietly produces bad work.

**Don't fake verification.** No claiming a build works without opening it.

---

## Cost discipline

`ui-ux-pro-max` costs roughly 2× `design-taste-frontend` in time and tokens. For a fast
build, use the lighter option. Spend the heavy skill when the output is client-facing.