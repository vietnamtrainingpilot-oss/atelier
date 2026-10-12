# Web Design Inventory — 46 skills

All installed globally at `~/.agents/skills/`. Nothing here is project-local.
Verified present 2026-10-12.

---

## MCP servers / plugins

| Server | Status | Use for |
|---|---|---|
| `playwright` | enabled | Render, click, screenshot, verify. Use before declaring done. |
| `chrome-devtools` | enabled | Lighthouse, Core Web Vitals, CSS debugging, heap snapshots |
| `magicui` | enabled | Copy real shadcn/Tailwind components instead of hand-rolling |
| `21st.dev` | **disabled** | 21k+ components. Needs `API_KEY_21ST` env var. |

Not web design: `robloxstudio`, `weppy-roblox` (Roblox Studio), `bitwize-music-mcp` (audio),
`computer-use` + `uia-mcp` (desktop control).

---

## Site & landing-page builders
| Skill | One line |
|---|---|
| `ai-ui-ux-motion-engine` | Cinematic production sites: scroll reveals, product films, exploded views |
| `scroll-craft` | Cinematic scroll sites that **self-verify by screenshotting** (contrast/motion/a11y) |
| `10k-websites` | Cinematic scroll-driven site, built and deployed end to end |
| `ptfs-va-website-builder` | PTFS / VA / Roblox community sites — fleet, routes, ranks, roster, apply |
| `ultimate-frontend-skills` | House style: editorial serif, layered parallax, section library |
| `design-taste-frontend` | Anti-slop landing pages and portfolios; audit-first on redesigns |
| `design-taste-frontend-v1` | Legacy v1 — exact v1 behaviour only |
| `redesign-existing-projects` | Upgrades a shipped site to premium quality |
| `high-end-visual-design` | Exact fonts, spacing, shadows, card structure |
| `gpt-taste` | Strict AIDA, gapless bento, hard GSAP ScrollTrigger rules |
| `industrial-brutalist-ui` | Swiss typographic + military terminal aesthetic |
| `minimalist-ui` | Editorial, warm monochrome, flat bento |
| `image-to-code` | Generates a design image, analyses it, implements to match |

## Design systems & specs
`design-md` (generates DESIGN.md) · `design-system` (primitive→semantic→component tokens) ·
`stitch-design-taste` (Stitch-tuned) · `ui-styling` (shadcn/Radix + Tailwind) ·
`design-is` (Rams' ten principles) · `design` (brand identity, tokens, UI, logo gen, slides)

## UI/UX intelligence
`ui-ux-pro-max` (79 styles, 192 palettes, 74 font pairings — heavy, ~2× cost) ·
`impeccable` · `impeccable-design-polish` · `emil-design-eng` · `visual-research` ·
`prototype` (3 variants, pick one) · `enhance-prompt` (Stitch) · `imagegen-frontend-web` ·
`pick-ui-library` · `ask-sonner`

## Motion & animation
`scroll-craft` · `awwwards-animations` · `cinematic-gsap-lenis-motion-system` ·
`gsap-core` · `gsap-scrolltrigger` · `gsap-react` · `fixing-motion-performance` ·
`animate` · `animation-vocabulary` · `review-animations` · `improve-animations` ·
`find-animation-opportunities` · `apple-design`

## Brand & assets
`brandkit` (logo systems, guidelines boards) · `banner-design` (social/ads/heroes) ·
`slides` (HTML decks) · `img2threejs` (image → procedural Three.js model)

---

## Size ranking — heaviest first
| Skill | Size | Note |
|---|---|---|
| `img2threejs` | 39.9 MB | 3D model generation. Niche — big but rarely loaded. |
| `ui-styling` | 5.5 MB | shadcn components |
| `ui-ux-pro-max` | 3.4 MB | Palette/font database |
| `ultimate-frontend-skills` | 1.3 MB | House style + section library |
| `impeccable` | 16 MB | ⚠️ also in `~/.claude/skills/` — duplicate copy |
| `scroll-craft` | 0.4 MB | Includes `engine/scrollcraft.js` (60KB runtime) |
| `imagegen-frontend-web` | 37 KB | |
| `awwwards-animations` | 240 KB | 15 reference docs |

---

## Router note

`web-design/SKILL.md` routes by job type A–L and references **all 46**. Load the lead + at
most 2 supports per job — the router covers everything, it doesn't load everything.

## Duplicate copies still on disk (not yet pruned — awaiting approval)
- `impeccable` exists in both `~/.agents/skills/` and `~/.claude/skills/` (16 MB each)
- Most skills also exist in `~/.config/opencode/skills/` — ~9,500 tokens/turn of duplicate
  metadata. Say the word and I'll dedupe.