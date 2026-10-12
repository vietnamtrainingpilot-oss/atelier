# Atelier Website — Design

**Date:** 2026-10-12
**Status:** Approved (design phase) — pending user review of this document
**Author:** session with vietnamtrainingpilot-oss
**Repo (to create):** `vietnamtrainingpilot-oss/atelier-site` (public)
**Live URL:** `https://vietnamtrainingpilot-oss.github.io/atelier-site/`

---

## 1. Overview

A full multi-page static marketing site for **Atelier** — the opencode/Claude
plugin that ships **8 domain routers** dispatching **105 specialist skills**
(**110 declared dependencies**, **36 bundled offline**, **67 fetched**).

The site's single job is to **drive installs**. Routers and docs exist to prove
competence and answer the visitor's "what is this and will it work for me",
not to be read cover to cover. Every page funnels to the one-line install
command.

The site wears Atelier's own brand (`BRAND.md`) — warm paper, burnt-orange
mark, the `⌂` wordmark. It must not look like generic developer-tool chrome.

**Reference for feel (not to copy):** `https://www.omniroute.online/` —
cinematic, scroll-driven, confident. We take the *level of craft and motion*,
not the visual design.

---

## 2. Goals / Non-goals

### Goals
- Convert a first-time visitor into someone who runs the install command.
- Communicate, at a glance: what Atelier is, the 8 routers, and that it works
  across 7 agent hosts with offline bundling.
- Feel premium / cinematic — a showpiece, matching the reference's craft.
- Ship near-zero JS and fast loads (static Astro on GitHub Pages).
- Keep every number correct from one data source (`deps.json` semantics).
- Be honest (BRAND voice): state what's installed/missing, name trade-offs,
  admit limitations (e.g. "manual" skills, offline gaps).

### Non-goals (now)
- **SEO is deferred to a later part.** No sitemap work, no schema.org, no
  per-router indexable pages, no meta program this phase. Structure must not
  *preclude* these later.
- No custom domain / no CNAME.
- No docs-site generator (Starlight) — this is a marketing site, not API docs.
- No CMS, no backend, no analytics beyond optional lightweight page views.
- No per-router detail pages this phase (see §5).

---

## 3. Decisions (locked)

| # | Decision | Value |
|---|---|---|
| 1 | Build framework | **Astro** (static) |
| 2 | Hosting | Separate public repo, GitHub Pages (project page) |
| 3 | Repo name | **`atelier-site`** |
| 4 | Domain | GitHub Pages URL, **no custom domain, no CNAME** |
| 5 | Brand scope | **Atelier IS the brand** — own identity from `BRAND.md` |
| 6 | Site scope | **Full multi-page** site |
| 7 | Feel & motion | **Cinematic & showpiece** |
| 8 | Primary goal | **Drive installs** |
| 9 | Routers page | **One sectioned `/routers` page** now; data-driven so 8 per-router pages can be added later with no rework |
| 10 | Aesthetic skill | **`design-taste-frontend`** (infers from brief; will not override BRAND tokens) |
| 11 | Motion skill | **`awwwards-animations`** (GSAP/ScrollTrigger/Lenis patterns, ported to Astro) |

**Approaches considered:**
- **A. Astro** ← chosen. Shared layout for multi-page chrome; ships near-zero
  JS; one data file for router truth; GSAP+Lenis for motion; builds to plain
  `dist/`; trivial Pages deploy.
- **B. Hand-authored HTML.** Too much duplicated chrome across 4+ pages;
  numbers drift.
- **C. Next.js static export.** Heavier JS payload for a content site; no
  benefit over Astro here.

---

## 4. Design tokens & identity

From `BRAND.md`. Tokens are CSS custom properties in `src/styles/tokens.css`,
consumed by Tailwind v4 via `@theme`.

| Token | Value | Use |
|---|---|---|
| `--atelier-ink` | `#14120F` | Body text, near-black |
| `--atelier-paper` | `#F5F2EC` | Page background (warm, not white) |
| `--atelier-rule` | `#D8D2C6` | Hairlines, borders, dividers |
| `--atelier-muted` | `#7A7267` | Secondary text, labels |
| `--atelier-mark` | `#B4552D` | Burnt-orange accent — links, markers, `⌂` |

- **Wordmark:** `⌂ Atelier` (U+2302 HOUSE). Monospace. Links to `/`.
  Plain-text fallback `ATELIER` where the glyph can't render.
- **Typography:** one serif for display (editorial, "workshop catalogue"),
  one grotesk/mono for UI + code. Self-hosted via `@fontsource`
  (no Google CDN — faster on Pages, offline-friendly).
- **Density:** generous whitespace, thin rules, small-caps labels. Quiet.
  Rationale (BRAND): "infrastructure should not compete with the work it routes."
- **Texture:** paper grain at very low opacity on the hero + section breaks.
- **Forbidden:** glassmorphism, neon, cold grey/blue dev-tool chrome, gradients
  as decoration, heavy drop shadows.

---

## 5. Information architecture

```
/                 Home — the pitch + install CTA
/routers          The 8 routers in detail (one sectioned page)
/install          Install & host setup + flag reference
/about            Brand, philosophy, repo, license
```

- **Persistent nav:** `⌂ Atelier` (left) · `Routers` · `Install` · `About` ·
  `Install ▸` accent button (right). The accent button is the funnel affordance.
- **Every page ends in an install CTA** (both one-liners + copy buttons).
- **Deferred expansion:** the `/routers` data file is structured so
  `/routers/[slug]` pages can be generated later from the same source. No
  rework — additive only.

**404:** custom `404.astro` styled to match, with a link home + install command.

---

## 6. Per-page content

### `/` Home — the showpiece
1. **Hero** — full viewport. `⌂ Atelier` large. Positioning line:
   *"Domain routers that dispatch agent skills to the right specialist."*
   Install box (copyable command). Secondary link: "See the routers".
2. **What it is** — 2–3 sentences, plain. Not an agent. No model. A router:
   you name the verb, it dispatches the right specialist skill.
3. **The 8 routers** — grid of cards from the data file; title + one-line
   summary + skill count. Hover reveals `requires` count.
4. **How routing works** — 3–4 steps: verb → domain → router → specialist
   skill. Pinned, scroll-scrubbed diagram (see §8).
5. **Proof strip** — `8 routers · 110 deps · 105 skills · 36 bundled offline ·
   7 hosts`.
6. **Install CTA** — full-width, accent moment. Both one-liners (bash +
   PowerShell) with copy buttons.

### `/routers`
Per router: title, summary, skill count, `requires` breakdown, handoff targets.
Honest numbers.

| slug | Title | n | Summary | Handoffs |
|---|---|---|---|---|
| `web-design` | Web Design | 46 | Landing pages, portfolios, redesigns, design systems, UI, and scroll/cinematic motion. | video-production |
| `video-production` | Video Production | 25 | HTML-to-video rendering (HyperFrames), React video (Remotion), and social promo. | web-design |
| `seo` | SEO | 12 | Keyword research, clustering, audits, competitor analysis, backlinks, AI visibility, client reports. | — |
| `backend` | Backend | 15 | APIs, data, auth, architecture, refactors, legacy codebases, issue backlogs. | — |
| `payments` | Payments | 1 | Stripe integration, checkout, subscriptions, webhooks, tax/VAT, PCI-safe flows. | — |
| `security` | Security | 1 | Repository and diff scanning, auth/secrets/injection review, verified patch generation. | — |
| `vibe-code` | Vibe Code | 4 | Fast path from a vague idea to something running. Deliberately skips heavyweight process. | — |
| `ship-it` | Ship It | 6 | Process-to-result delivery: decide, plan, build, verify, secure, perform, ship. | web-design, video-production, seo, payments, security, backend |

### `/install`
- Requirements: **Node 18+**, git.
- One-line installers:
  - bash: `curl -fsSL <raw>/install.sh | bash`
  - PowerShell: `irm <raw>/install.ps1 | iex`
- Flag table: `--offline`, `--prefer-network`, `--check`, `--force`, `--list`,
  `--json`, `--in-place` (`--agent <name>`, `--root <path>`).
- 7-host auto-detect table (`opencode, claude, cursor, codex, agents, windsurf,
  gemini`) + manual `--agent`.
- opencode plugin note: registers a plugin + points at the runtime.
- Offline behavior + what a "manual" skill means (router still works).

### `/about`
The atelier idea (a workshop where specialists are engaged to make a thing);
why domain routers not tool-named skills; BRAND voice statement; repo link;
MIT license; `llms.txt` link.

---

## 7. Visual anatomy (home — the showpiece)

- **Hero:** full-viewport, paper bg + grain. `⌂ Atelier` large, positioning
  line beneath, install box. On scroll the wordmark holds while router names
  drift up past it (parallax), then the section unpins.
- **Router grid:** 8 cards; staggered fade + rise on entry; hover lifts card and
  reveals `requires` count. Restrained.
- **Routing diagram:** pinned section; a `verb` node flows through
  `domain → router → skill`; connector lines draw in with ScrollTrigger scrub.
- **Install CTA:** the one deliberately loud moment — `--atelier-mark`, command
  large and centered, copy button.
- Everything else stays quiet. **One loud moment, not five.**

---

## 8. Motion plan

Stack: **GSAP + ScrollTrigger + Lenis** (smooth scroll), loaded once from the
shared layout (`Base.astro`), guarded for Astro's `astro:page-load` event.

| Element | Motion | Trigger |
|---|---|---|
| Hero wordmark | opacity + slight y settle on load | on load |
| Hero router names | layered parallax drift on scroll | scroll (scrub) |
| Section headings | staggered type reveal (clip + rise) | ScrollTrigger enter |
| Router cards | staggered fade + rise | ScrollTrigger enter |
| Routing diagram | pinned; lines draw in; nodes snap in sequence | ScrollTrigger pin + scrub |
| Install CTA | accent pulse-in (once) | ScrollTrigger enter |
| Nav | background/rule appears after hero | ScrollTrigger |

**Accessibility + perf requirements:**
- All motion gated behind `prefers-reduced-motion: no-preference`; reduced-motion
  renders a fully legible static layout (no pinning, no parallax).
- Animate only `transform` / `opacity` (compositor-friendly).
- No layout thrash; no per-frame layout reads.
- Motion must degrade gracefully if JS fails — content visible without JS.

---

## 9. Tech stack, structure, data model

- **Astro** static. **Tailwind v4** via `@astrojs/tailwind` (or v4 Vite plugin)
  with tokens exposed through `@theme`. `base: '/atelier-site'`.
- **Fonts:** `@fontsource` self-hosted (serif display + mono/grotesk UI).
- **Motion:** GSAP + ScrollTrigger + Lenis, single shared script.
- **Data:** `src/data/routers.ts` is the single source of truth for the 8
  routers — `{ slug, title, summary, requires, handoffs }` — mirroring
  `deps.json`. Home grid + `/routers` render from it. Counts cannot drift.
  Derived: total deps (110) and unique skills (105) stated once as constants.

```
atelier-site/
  src/
    layouts/Base.astro            # head, nav, footer, tokens, motion script
    components/
      Nav.astro
      Footer.astro
      Hero.astro
      InstallBox.astro            # copyable command, both shells
      RouterCard.astro
      RouterGrid.astro
      RoutingDiagram.astro
      ProofStrip.astro
      SectionHeading.astro
    pages/
      index.astro                 # /
      routers.astro               # /routers
      install.astro               # /install
      about.astro                 # /about
      404.astro
    data/routers.ts
    styles/tokens.css
  public/                         # favicon, og image, grain texture
  astro.config.mjs
  .github/workflows/deploy.yml
```

---

## 10. Deploy

- **Repo:** new public `vietnamtrainingpilot-oss/atelier-site`.
- **Workflow:** push to `main` → `withastro/action@v3` → `actions/deploy-pages`.
  No secrets required.
- **URL:** `https://vietnamtrainingpilot-oss.github.io/atelier-site/`.
- **`base`:** `/atelier-site` set in `astro.config.mjs` so assets resolve.

---

## 11. Verification (before "done")

1. `astro build` completes with no errors; no broken internal links.
2. **Playwright** screenshots: desktop `1440×900` and mobile `390×844`, every
   page; read the **browser console** for errors.
3. **Reduced-motion** check: emulate `prefers-reduced-motion: reduce`; confirm
   the layout is static and fully legible.
4. **No-JS** check: content renders (progressive enhancement).
5. Install commands on the site are **byte-correct** against `install.sh` /
   `install.ps1` in the plugin repo.
6. All numbers on the site match `deps.json` (8 / 110 / 105 / 36 / 67 / 7).
7. Live Pages URL loads over HTTPS with assets resolving.

---

## 12. Open questions / risks

- **Font choice:** exact serif + mono pairing to be chosen during build
  (candidates evaluated against BRAND's "editorial workshop" tone).
- **OG image:** needs a designed `og:image` (wordmark + positioning line);
  produced during build.
- **Grain asset:** procedural SVG/CSS noise vs. a tiny PNG — decide at build
  (prefer CSS to avoid a binary).
- **Skill overlap:** `design-taste-frontend` (aesthetic) + `awwwards-animations`
  (motion) must not pull conflicting defaults; BRAND tokens win on conflict.
- **SEO deferral:** confirm no indexable per-router pages this phase; structure
  keeps the door open.

---

## 13. Approval gate

No implementation, scaffolding, or dependency installation begins until this
document is reviewed and approved by the user.
