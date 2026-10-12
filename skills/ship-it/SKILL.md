---
name: ship-it
description: End-to-end delivery pipeline for taking a project from idea to shipped — process to result. Covers planning, execution, verification, security, performance, and release. Use when the user wants a project actually delivered end to end, asks "how do I ship this", wants a build plan, needs a release gate before launch, or asks for the full process from idea to done rather than just one step.
---

# Ship It — process to result

For work that has to **land**. The counterpart to `vibe-code` (which only has to run).

Use the other domain routers as stages; this one owns the sequence.

---

## Stages

| # | Stage | Skill | Gate |
|---|---|---|---|
| 1 | Decide | `brainstorming` | One-sentence definition of done |
| 2 | Plan | `make-plan` / `writing-plans` | Phased, each phase independently verifiable |
| 3 | Build | `subagent-driven-development` / `executing-plans` | Working, not theoretical |
| 4 | **Verify** | see below | **Hard gate — do not skip** |
| 5 | Secure | `security` | No unresolved high findings |
| 6 | Performance | `vercel-react-best-practices`, `fixing-motion-performance` | No regression vs. baseline |
| 7 | Ship | `release-director`, `version-bump` | Deployed and reachable |

---

## Stage 4 is the gate that matters

Most bad delivery is a missing verification step, not a missing feature.

**Web:** open it in `playwright`. Screenshot at desktop **and** mobile. Read the console.
Check network requests. Assert the thing you built actually renders.

**Performance:** `chrome-devtools` → Lighthouse / Core Web Vitals. Heavy animation is the
usual regression — that's what `vercel-react-best-practices` and
`fixing-motion-performance` are for.

**Content/SEO:** `seo-report` is the deliverable; check it reads for a non-SEO human.

**Security:** `security` router. Scan before shipping, not after.

**Never report success on work you did not observe.** "It should work" is not verification.

---

## Domain handoffs

Stage 3 and 4 fan out. Load only the router you need:

- `web-design` — anything visual on the web
- `video-production` — any video deliverable
- `seo` — anything that must be found
- `payments` — anything that takes money
- `security` — anything that runs untrusted input
- `vibe-code` — when the goal is speed, not completeness

---


## AI Installation

**Run this before the first real task in this domain.** It checks dependencies and
installs whatever is missing. Safe to re-run — existing skills are never overwritten
without `--force`.

```bash
# 1. see what this router needs, and what you already have
node install.mjs ship-it --check

# 2. install what's missing
node install.mjs ship-it
```

Then **restart the agent** so the new skills register. Skills load at startup only.

This router needs **6 skills**: 4 auto-installable, 2 manual.

<details><summary>Auto-installable (4)</summary>

- `brainstorming` — `obra/superpowers@brainstorming`
- `writing-plans` — `obra/superpowers@writing-plans`
- `executing-plans` — `obra/superpowers@executing-plans`
- `verification-before-completion` — `obra/superpowers@verification-before-completion`

</details>

<details><summary>Manual (2) — no known public source</summary>

These are bundled with the plugin when installed from source. On a bare host they may be
absent. **The router still works** — it just has fewer specialists to draw on. Proceed
with whatever is present rather than blocking.

- `release-director`
- `version-bump`

</details>

---

**If your agent has no shell or no plugin support:** you cannot self-install.
Tell the user which of the skills above are missing and let them run
`node install.mjs ship-it` in a terminal. Do not claim a skill is available
when it is not, and do not silently proceed with a partial stack — say what is missing,
then continue with whatever is installed.

## Guardrails

**Verify before you celebrate.** The most common failure is shipping something that was never
opened in a browser.

**Gate each phase.** If phase 3's output isn't independently checkable, the plan is wrong.

**Security and performance are stages, not afterthoughts.** Retro-fitting them costs more than
doing them in order.

**Honest status.** If something is broken or unfinished, say so plainly. A confident false
"done" is worse than a scoped "3 of 5 done, here's the blocker."

**Stop and ask** if the plan grows past what was agreed. Scope drift disguised as progress is
still scope drift.