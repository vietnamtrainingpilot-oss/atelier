---
name: web-design
description: Router for web design and frontend work — landing pages, marketing sites, portfolios, redesigns, UI/UX, design systems, GSAP/ScrollTrigger/Lenis motion, scroll-driven animation, React/Next.js performance, shadcn components, Three.js, typography and palette selection. Use when the user asks to design, build, rebuild, polish, or audit a website, landing page, portfolio, SaaS marketing page, hero section, or any web interface, or mentions web design, frontend, UI/UX, scroll animation, or page aesthetics.
---

# Web Design Router

46 web-design skills are installed globally. This router maps **all of them** to a trigger, so
nothing is orphaned. Full catalog with sizes: `references/inventory.md`.

**Load the lead + at most 2 supports per job.** Every skill below is reachable — reach for the
right one, not all of them at once.

---

## A — New landing / marketing page
- **Lead:** `ai-ui-ux-motion-engine` (cinematic, production-grade)
- **Alt lead:** `design-taste-frontend` (anti-slop, faster, cheaper) · `design-taste-frontend-v1` (legacy, exact v1 behaviour)
- **Build + deploy in one:** `10k-websites` (cinematic, ships it)
- **House style:** `ultimate-frontend-skills` (editorial serif, layered parallax, section library)
- **Alt aesthetic:** `gpt-taste` (AIDA, bento, hard ScrollTrigger) · `high-end-visual-design` · `industrial-brutalist-ui` · `minimalist-ui`
- **Supports:** `ui-ux-pro-max` (palette/font) → `awwwards-animations` or `scroll-craft` (motion)

## B — Portfolio / personal site
- **Lead:** `design-taste-frontend` · `ptfs-va-website-builder` (aviation/VA/Roblox)
- **Supports:** `high-end-visual-design` (typography + spacing discipline)

## C — Redesign / "it looks cheap"
- **Lead:** `redesign-existing-projects`
- **Supports:** `impeccable` (critique) → `impeccable-design-polish` (post-artifact polish pass)

## D — Recreate from a reference
- **Lead:** `image-to-code` (generates its own image first, then matches it)
- **Supports:** `visual-research` (render real references), `enhance-prompt` (Stitch prompts)

## E — Scroll / cinematic motion
- **Lead:** `scroll-craft` — **verifies its own output by screenshotting** (contrast, motion, a11y). Best when you want proof it looks right.
- **Lead alt:** `awwwards-animations` (React-first; also covers Lenis, Motion, Anime.js, Three.js)
- **Lighter:** `cinematic-gsap-lenis-motion-system`
- **API precision:** `gsap-scrolltrigger` (pinning, scrub) · `gsap-core` (tweens, easing, stagger) · `gsap-react` (`useGSAP`, cleanup)
- **Motion philosophy:** `apple-design` (interruptible physical motion)
- **Motion review:** `fixing-motion-performance` (60fps, kills layout thrashing) · `review-animations` · `improve-animations` (plans only) · `find-animation-opportunities` (proposes what should animate)
- **Name the effect:** `animation-vocabulary` (look up the term, then prompt for it)
- **From scratch:** `animate`

## F — Design system / multi-page consistency
- **Lead:** `design-md` (generates DESIGN.md) · `design-system` (three-layer tokens + component specs)
- **Supports:** `ui-styling` (shadcn/Radix implementation), `stitch-design-taste` (Stitch-tuned DESIGN.md)

## G — App UI / dashboard / components
- **Lead:** `ui-styling` (shadcn on Radix + Tailwind: themes, layout, a11y, dark mode)
- **Supports:** `emil-design-eng` (polish philosophy) · `prototype` (render 3 variants, pick one)
- **Copy components instead of hand-rolling:** **magicui** MCP (enabled), **21st.dev** MCP (disabled, needs `API_KEY_21ST`)
- **Toasts:** `ask-sonner`

## H — React / Next.js performance
- **Lead:** `vercel-react-best-practices` (45 Vercel Engineering rules)
- **Supports:** `fixing-motion-performance` when animation is the slow part · `pick-ui-library` when choosing a dependency

## I — 3D / WebGL
- **Lead:** `awwwards-animations` (GSAP + Three.js) · `img2threejs` (reference image → procedural model)

## J — PTFS / virtual airline / Roblox community
- **Lead:** `ptfs-va-website-builder` — **always.** Encodes real-airline research and the fleet/route/rank/roster IA.
- **Supports:** `ai-ui-ux-motion-engine` (motion layer) or `scroll-craft` (if scroll-led)

## K — Brand, logo, imagery, marketing assets
- **Lead:** `design` (brand identity, tokens, UI styling, logo gen, mockups, slides)
- **Brand kits:** `brandkit` (logo systems, guidelines boards)
- **Banners:** `banner-design` (social, ads, web heroes)
- **Web design references:** `imagegen-frontend-web` (one image per section as the design ref)
- **Decks:** `slides` (HTML presentations, Chart.js, design tokens)

## L — Critique / quality gates
- `impeccable` — design/redesign/audit/polish (overlaps `design-is`; pick one)
- `design-is` — Dieter Rams' ten principles
- `review-animations` — motion quality gate, flags by default

---

## Step: verify visually before reporting done
| Need | Tool |
|---|---|
| Render, click, screenshot | **playwright** |
| Lighthouse, Core Web Vitals, CSS/perf, heap | **chrome-devtools** |
| Component library | **magicui** MCP |

Minimum bar: open it in playwright, screenshot **desktop and mobile**, read the console.

---


## AI Installation

**Run this before the first real task in this domain.** It checks dependencies and
installs whatever is missing. Safe to re-run — existing skills are never overwritten
without `--force`.

```bash
# 1. see what this router needs, and what you already have
node install.mjs web-design --check

# 2. install what's missing
node install.mjs web-design
```

Then **restart the agent** so the new skills register. Skills load at startup only.

This router needs **46 skills**: 22 auto-installable, 24 manual.

<details><summary>Auto-installable (22)</summary>

- `ai-ui-ux-motion-engine` — `OpaceDigitalAgency/skills@ai-ui-ux-motion-engine`
- `awwwards-animations` — `devmartinese/awwwards-animations-skill@awwwards-animations`
- `cinematic-gsap-lenis-motion-system` — `mengto/skills@cinematic-gsap-lenis-motion-system`
- `gsap-core` — `greensock/gsap-skills@gsap-core`
- `gsap-scrolltrigger` — `greensock/gsap-skills@gsap-scrolltrigger`
- `gsap-react` — `greensock/gsap-skills@gsap-react`
- `vercel-react-best-practices` — `vercel-labs/agent-skills@vercel-react-best-practices`
- `design-md` — `google-labs-code/stitch-skills@design-md`
- `fixing-motion-performance` — `ibelick/ui-skills@fixing-motion-performance`
- `scroll-craft` — `github:nateherkai/scroll-craft`
- `ui-ux-pro-max` — `nextlevelbuilder/ui-ux-pro-max-skill@ui-ux-pro-max`
- `apple-design` — `emilkowalski/skills@apple-design`
- `emil-design-eng` — `emilkowalski/skills@emil-design-eng`
- `review-animations` — `emilkowalski/skills@review-animations`
- `improve-animations` — `emilkowalski/skills@improve-animations`
- `find-animation-opportunities` — `emilkowalski/skills@find-animation-opportunities`
- `animation-vocabulary` — `emilkowalski/skills@animation-vocabulary`
- `animate` — `emilkowalski/skills@animate`
- `gpt-taste` — `leonxlnx/taste-skill@gpt-taste`
- `high-end-visual-design` — `leonxlnx/taste-skill@high-end-visual-design`
- `brandkit` — `leonxlnx/taste-skill@brandkit`
- `stitch-design-taste` — `leonxlnx/taste-skill@stitch-design-taste`

</details>

<details><summary>Manual (24) — no known public source</summary>

These are bundled with the plugin when installed from source. On a bare host they may be
absent. **The router still works** — it just has fewer specialists to draw on. Proceed
with whatever is present rather than blocking.

- `design-taste-frontend`
- `design-taste-frontend-v1`
- `ptfs-va-website-builder`
- `redesign-existing-projects`
- `ultimate-frontend-skills`
- `industrial-brutalist-ui`
- `minimalist-ui`
- `image-to-code`
- `imagegen-frontend-web`
- `imagegen-frontend-mobile`
- `img2threejs`
- `visual-research`
- `prototype`
- `pick-ui-library`
- `ask-sonner`
- `slides`
- `enhance-prompt`
- `banner-design`
- `design-system`
- `design`
- `design-is`
- `ui-styling`
- `impeccable`
- `impeccable-design-polish`

</details>

**Optional MCP servers** — add to your config for full capability:

```json
"magicui": "https://api.magicui.design/mcp"
"chrome-devtools": "npx -y @devtools-ds/chrome-devtools-mcp"
"playwright": "npx -y @playwright/mcp"
```

---

**If your agent has no shell or no plugin support:** you cannot self-install.
Tell the user which of the skills above are missing and let them run
`node install.mjs web-design` in a terminal. Do not claim a skill is available
when it is not, and do not silently proceed with a partial stack — say what is missing,
then continue with whatever is installed.

## Guardrails

**Aesthetic skills conflict — pick exactly one.** `gpt-taste`, `industrial-brutalist-ui`,
`minimalist-ui`, and `high-end-visual-design` each impose a different visual language. Running
two produces a blend worse than either.

**GSAP has four skills that overlap.** `awwwards-animations` already teaches GSAP, Lenis,
Motion, and Three.js. Drop to `gsap-core` / `gsap-scrolltrigger` / `gsap-react` only for exact
API detail.

**`ui-ux-pro-max` costs ~2× the tokens/time** of `design-taste-frontend`. Use it when the
output is client-facing; use the lighter skill for fast work.

**Depth beats breadth.** One design skill + one motion skill beats five of each.

**`vercel-react-best-practices` is the performance brake** — pair it with any heavy-animation
build, since animation is what tanks Lighthouse.

**Hand off to `video-production`** when the deliverable is a video: promo, explainer, ad,
social clip, or anything motion-first. That router inherits this brand's tokens — so if the
video is part of the same engagement, **decide the visual system once and give both routers the
same tokens** rather than letting each invent one.