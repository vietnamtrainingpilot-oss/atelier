---
name: seo
description: Router for SEO work — keyword research, clustering, on-page audits, competitor analysis, link prospecting, local SEO, AI search visibility, and client-ready reports. Use when the user mentions SEO, keywords, rankings, Google search, meta tags, on-page audit, backlinks, competitor traffic, schema markup, or wants to know why a site is not showing up in search. Also covers AI-answer engines (ChatGPT, Perplexity, AI Overviews).
---

# SEO Router

12 `open-seo` skills installed. **Run them in order — they form a pipeline, not a menu.**

---

## The pipeline

```
1. seo-project-setup      → establish the project, site, market
2. seo-audit              → what is actually broken now
3. keyword-research       → find the demand
4. keyword-clustering     → group into intent clusters
5. competitor-analysis    → what they rank for that we don't
6. competitive-landscape  → the wider SERP picture
7. link-prospecting       → where to get links
8. ai-visibility-audit    → how you appear in AI answers
9. ai-prompt-research     → which prompts surface competitors
10. local-seo             → only if it's a local business
11. seo-coach             → turn findings into an ordered plan
12. seo-report            → deliverable for the client
```

---

## Choosing the entry point

| Situation | Start at |
|---|---|
| New client, nothing known | `seo-project-setup` |
| Existing site, "why don't I rank?" | `seo-audit` |
| "What should I write about?" | `keyword-research` → `keyword-clustering` |
| "What does my competitor do?" | `competitor-analysis` → `competitive-landscape` |
| Need backlinks | `link-prospecting` |
| Ranking but absent from AI answers | `ai-visibility-audit` → `ai-prompt-research` |
| Local business / maps | `local-seo` |
| Findings exist, need a plan | `seo-coach` |
| Need something to hand a client | `seo-report` |

---


## AI Installation

**Run this before the first real task in this domain.** It checks dependencies and
installs whatever is missing. Safe to re-run — existing skills are never overwritten
without `--force`.

```bash
# 1. see what this router needs, and what you already have
node install.mjs seo --check

# 2. install what's missing
node install.mjs seo
```

Then **restart the agent** so the new skills register. Skills load at startup only.

This router needs **12 skills**: 12 auto-installable, 0 manual.

<details><summary>Auto-installable (12)</summary>

- `seo-project-setup` — `github:every-app/open-seo`
- `seo-audit` — `github:every-app/open-seo`
- `keyword-research` — `github:every-app/open-seo`
- `keyword-clustering` — `github:every-app/open-seo`
- `competitor-analysis` — `github:every-app/open-seo`
- `competitive-landscape` — `github:every-app/open-seo`
- `link-prospecting` — `github:every-app/open-seo`
- `ai-visibility-audit` — `github:every-app/open-seo`
- `ai-prompt-research` — `github:every-app/open-seo`
- `local-seo` — `github:every-app/open-seo`
- `seo-coach` — `github:every-app/open-seo`
- `seo-report` — `github:every-app/open-seo`

</details>

---

**If your agent has no shell or no plugin support:** you cannot self-install.
Tell the user which of the skills above are missing and let them run
`node install.mjs seo` in a terminal. Do not claim a skill is available
when it is not, and do not silently proceed with a partial stack — say what is missing,
then continue with whatever is installed.

## Guardrails

**Audit before advice.** Never recommend keywords without checking what the site currently
ranks for — otherwise you are guessing.

**Cluster before content.** Raw keywords are noise. Intent clusters are the unit of work.

**AI visibility is a separate surface.** Ranking on Google ≠ being cited by ChatGPT or
Perplexity. `ai-visibility-audit` measures that independently; don't infer one from the other.

**Verify claims about competitors.** Traffic estimates are third-party modelled numbers, not
ground truth. Label them as estimates in anything client-facing.

**`seo-report` is the deliverable.** If the work is for a client, the report is the product —
not the audit. Make it readable by a non-SEO human.

**Full skill descriptions:** `references/catalog.md`