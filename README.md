<div align="center">

# ⌂ Atelier

**Domain routers that dispatch agent skills to the right specialist.**

Invoke one router. It pulls in the forty specialists it needs — you never name a skill again.

[![version](https://img.shields.io/badge/version-1.0.0-informational)](https://github.com/atelier-skills/atelier)
[![license](https://img.shields.io/badge/license-MIT-blue)](./.claude-plugin/plugin.json)

</div>

---

## The problem

You install forty skills. Now you're the router. Every request becomes
"which eleven of these forty do I need this time," and a fifth of them are duplicates of
each other competing for the same job.

Atelier replaces you with eight entry points. Each one knows its whole domain, picks the
lead, adds at most two supports, and hands off to another router when the work crosses a
boundary.

```
you ──▶ web-design ──▶ ai-ui-ux-motion-engine + ui-ux-pro-max + awwwards-animations
```

---

## Install

```bash
git clone https://github.com/atelier-skills/atelier
cd atelier
node install.mjs              # everything
node install.mjs web-design   # one router
node install.mjs --check      # report only, change nothing
node install.mjs --list       # what's available
```

| Flag | Effect |
|---|---|
| `--check` | Report what would happen. Installs nothing. |
| `--force` | Overwrite existing skills. |
| `--agent <name>` | `opencode` · `claude` · `cursor` · `codex` · `agents` |
| `--root <path>` | Install somewhere else entirely. |
| `--list` | List routers. |

Auto-detects the host and writes to the right skill root
(`~/.config/opencode/skills`, `~/.claude/skills`, `~/.agents/skills`, …).
Falls back through a preference chain if your agent's root doesn't exist.
**Restart your agent afterwards** — skills only register at startup.

> **Self-installing.** Each `SKILL.md` carries an **AI Installation** section. When a router
> is invoked on an incomplete stack, the agent is instructed to check and install what's
> missing rather than silently proceeding. Agents with no shell get an honest report
> instead of a broken run.

---

## The eight routers

### `web-design` — 46 skills
Landing pages, portfolios, redesigns, design systems, UI, and scroll motion.

Routes by **job type**, not by vibe: new landing page → `ai-ui-ux-motion-engine`;
portfolio → `design-taste-frontend`; PTFS/VA site → `ptfs-va-website-builder`;
scroll motion → `scroll-craft` (self-verifying) or `awwwards-animations`.

Brings GSAP official, Lenis, SplitType-style text animation, Three.js/Spline 3D,
shadcn components, palette and font-pairing data, and the verification loop —
screenshot desktop + mobile before anything is called done.

*Optional MCP: magicui · chrome-devtools · playwright*

---

### `video-production` — 25 skills
Three stacks, chosen by **input**, not output.

| You give it | It runs |
|---|---|
| Product URL or marketing site | `product-launch-video` |
| GitHub PR | `pr-to-video` |
| Article / topic / brief | `faceless-explainer` |
| Audio file | `music-to-video` |
| Existing talking-head clip | `talking-head-recut` |
| Figma link | `figma` |
| Anything unclear | `general-video` |

HyperFrames (HTML → video, 400+ block registry) is the default engine. Remotion is
available for existing React projects. The registry is searched before hand-building
any named visual — CRT scanlines, glitch, film grain, charts, terminal windows already exist.

*Requires the heygen CLI for music/SFX resolution. Set `HEYGEN_API_BASE` to route through a host.*

---

### `seo` — 12 skills
An ordered pipeline, not a menu.

```
seo-project-setup → seo-audit → keyword-research → keyword-clustering
  → competitor-analysis → competitive-landscape → link-prospecting
  → ai-visibility-audit → ai-prompt-research → local-seo
  → seo-coach → seo-report
```

AI visibility is measured separately from Google rankings — one does not imply the other.
`seo-report` is the deliverable, not the audit.

---

### `backend` — 15 skills
Understand → build → refactor → hand off.

**Orient:** `smart-explore` (cheap, default) · `learn-codebase` · `pathfinder` ·
`think`
**Build:** `ponytail` (default — YAGNI, stdlib first) · `make-plan` → `do`
**Refactor:** `ponytail-audit` · `ponytail-review` · `ponytail-debt` · `oh-my-issues`
**Hand off:** `payments` for money · `security` for untrusted input · `ship-it` to deploy

Includes an honest debugging procedure, because no dedicated debugging skill exists.

---

### `payments` — 1 skill, 6 references
Stripe, from the official `stripe/ai` repo.

Payments · Connect · Billing · Tax · Security · Treasury — loaded on demand, never from memory.

Non-negotiables enforced in the router: verified webhook signatures, idempotency keys on
every write, integer minor units, never store card numbers.

*Env: `STRIPE_SECRET_KEY` · `STRIPE_WEBHOOK_SECRET`*

---

### `security` — 1 skill, 8 subagents
Anthropic's `claude-security`, with its orchestrator rebuilt.

```
cs-scan-inventory → cs-scan-researcher → cs-scan-verifier
  → cs-patch-generator → cs-patch-verifier
```
plus `cs-scan-loader`, `cs-scan-redactor`, `cs-explore`.

Six of eight agents are read-only (`edit: deny`). Verified before patched — unverified
findings are usually wrong. Redact before anything leaves the machine.

> **Known limitation:** the upstream Claude Code `Workflow(...)` engine does not run in
> opencode. This router replaces it by documenting the dispatch order. There is no
> one-click `/security` scan.

---

### `vibe-code` — 4 skills
Fast path from a vague idea to something running.

Deliberately **skips** `make-plan`, `writing-plans`, and `subagent-driven-development`.
One question maximum. Look at the result before claiming it works. Stop when it runs.

Escalates honestly when the work turns into auth, payments, or a security surface.

---

### `ship-it` — 6 skills
The process spine. Owns the sequence; the other routers are its stages.

```
1 decide → 2 plan → 3 build → 4 VERIFY → 5 secure → 6 perform → 7 ship
```

Stage 4 is a hard gate. Most bad delivery is a skipped verification, not a missing feature.

---

## Design rules

**One lead, at most two supports.** Loading five design skills produces mush, not a better site.

**Aesthetic skills conflict.** `gpt-taste`, `industrial-brutalist-ui`, `minimalist-ui`,
`high-end-visual-design` each impose a different visual language. Exactly one per job.

**Route on input, not output.** The input decides the specialist — that's what makes
selection deterministic instead of vibes.

**Verify before reporting done.** Routers hold agents to opening the result, not describing it.

**Honest gaps are documented.** No installed debugging, API-design, schema/migration,
observability, or IaC skill. The router says so rather than implying coverage.

---

## Layout

```
atelier/
├── install.mjs                  installer + agent detection
├── deps.json                    dependency manifest (118 skills)
├── .claude-plugin/plugin.json   Claude Code manifest
├── .opencode/plugins/atelier.ts opencode plugin (nudges on incomplete stacks)
├── skills/                      the 8 routers + references/
├── agents/                      8 cs-* security subagents
└── scripts/inject-install.mjs   writes the AI Installation sections
```

## How skills arrive

Two paths, neither a failure case:

| How | Network | Behaviour |
|---|---|---|
| **Bundled in the repo** — `bundled/skills/` | none | **36 skills ship inside Atelier** — the ones whose upstream was never public. Self-contained. |
| **Fetched from upstream** | yes | **67 skills** cloned from their public GitHub source at install time. |

**Private-origin skills ship with the plugin.** Where the author's source was never public,
the skill is bundled as a file instead of being fetched. That is the supported path — not a
workaround. Bundled and fetched skills behave identically.

```
already installed  ->  bundled/  ->  public GitHub
```

`--offline` makes zero network requests — private skills still install, public ones are reported unavailable.

Two skills are deliberately **not** bundled — `img2threejs` (39.9MB) and `impeccable` (16MB).
Together they're 56MB of a 87MB dependency set, and both are optional quality gates rather
than core specialists.

## Known limitations

- **`claude-security`'s upstream `Workflow(...)` orchestrator does not run in opencode.** The
  `security` router replaces it by documenting the agent dispatch order — there is no
  one-click scan.
- **`media-use` needs the heygen CLI** for BGM/SFX resolution. Set `HEYGEN_API_BASE` to route
  through a host app.
- No installed skill covers infrastructure-as-code, database migrations, observability, or
  API design. The routers say so rather than implying coverage.

## Licence

MIT.