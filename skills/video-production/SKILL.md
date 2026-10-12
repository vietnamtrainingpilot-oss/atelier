---
name: video-production
description: Router for all video work — building, editing, packaging, or rendering videos, motion graphics, explainers, promos, captions, or talking-head recuts. Covers HyperFrames (HTML-to-video rendering), Remotion (React video), and short-form social clips. Use when the user mentions video, animation, motion graphics, a promo, an explainer, a demo, a changelog video, captions, subtitles, lower-thirds, a music video, or asks to turn a URL, PR, article, or audio track into a video.
---

# Video Production Router

Three video stacks are installed. **They are not interchangeable — pick by input type.**

| Stack | What it is | Use when |
|---|---|---|
| **HyperFrames** (21 skills) | Write HTML, render video. 400+ block registry. | Default for anything new. |
| **Remotion** (12 skills) | React components that render video. | You already live in React, or have an existing Remotion project. |
| **Bitwize promo** (4 skills) | Album/social promo pipeline. | Only for the music-release workflow. |

---

## Step 0 — Brand continuity (do this before any visual work)

**If a web design system already exists, the video must inherit it. Do not invent a second
visual language for the same brand.**

A client whose site is warm, editorial, and restrained should not get a cold, neon, high-contrast
video. The video is the same brand in motion.

| Situation | Do |
|---|---|
| A site, Figma file, or `DESIGN.md` exists | Extract the tokens from it (§ below) and build `design.md` from those tokens. |
| The work is a one-off with no site | Still pick a palette + type pairing explicitly, via `ui-ux-pro-max`, and write it into `design.md` first. |
| Web design work is also happening | Load the **`web-design`** router and derive both from one token set. |

### Extracting the token set
1. Load **`design-md`** or **`design-system`** to get the canonical token structure.
2. From the existing brand, pin down: **palette** (primary / secondary / accent / ground),
   **typography** (display + body pairing, scale), **spacing rhythm**, **contrast rules**.
3. Check the real type pairings with **`ui-ux-pro-max`** if the pairing is uncertain.
4. Write the result to the project's `design.md` (HyperFrames reads this) **before** writing
   composition HTML. `hyperframes-creative` owns the format.
5. Every scene then derives from those tokens — nothing gets picked ad hoc mid-build.

**If `web-design` and video ship together, they are one project.** Decide the visual system
once, then let both routers consume it. Handing off in the middle is how brands drift.

---

## Step 1 — Route by INPUT, not by output

This is the whole trick. The input decides the skill.

| Input the user gives you | Skill |
|---|---|
| Product URL, marketing site, SaaS page | `product-launch-video` |
| GitHub PR URL or `owner/repo#123` | `pr-to-video` |
| An article, notes, a topic, a brief — no URL | `faceless-explainer` |
| An audio file or music track | `music-to-video` |
| An existing talking-head / podcast / interview clip | `talking-head-recut` |
| A Figma link, logo, or brand asset | `figma` |
| A script or a freeform brief ("make something about X") | `general-video` |
| An existing Remotion source to port | `remotion-to-hyperframes` |
| **Anything else / unclear** | **`general-video`** ← default |

---

## Step 2 — Supporting skills

**Always available, load on demand:**

| Need | Skill |
|---|---|
| Composition contract, timing attrs, validation | `hyperframes-core` |
| Motion rules, scene blueprints, 7 runtime adapters | `hyperframes-animation` |
| Palette, typography, narration, beat planning | `hyperframes-creative` |
| Audio, voiceover, TTS, music, SFX, LUTs, color grade | `media-use` |
| Look up / install a named visual block | `hyperframes-registry` |
| Render, preview, CLI usage | `hyperframes-cli`, `hyperframes-studio` |
| On-screen graphic overlays, lower-thirds, quotes | `talking-head-recut` |
| Burned-in captions | `embedded-captions` |
| Stills into a timed deck | `slideshow` |
| Generic motion graphics | `motion-graphics` |

**Rule:** run `hyperframes-registry` **before** hand-building any named look — CRT scanlines,
glitch, film grain, shimmer sweep, charts, terminal windows, maps. ~400 hosted blocks already
exist. Hand-rolling one wastes the registry.

---

## Step 3 — Verify before delivery

Render and actually watch it. Do not describe a video you have not seen.

1. `hyperframes-cli` or `hyperframes-studio` → render
2. Open the output; confirm timing, captions, and safe margins
3. For social delivery, confirm aspect (9:16 / 1:1 / 16:9) and that text sits inside it

---


## AI Installation

**Run this before the first real task in this domain.** It checks dependencies and
installs whatever is missing. Safe to re-run — existing skills are never overwritten
without `--force`.

```bash
# 1. see what this router needs, and what you already have
node install.mjs video-production --check

# 2. install what's missing
node install.mjs video-production
```

Then **restart the agent** so the new skills register. Skills load at startup only.

This router needs **25 skills**: 25 auto-installable, 0 manual.

<details><summary>Auto-installable (25)</summary>

- `hyperframes` — `github:heygen-com/hyperframes`
- `general-video` — `github:heygen-com/hyperframes`
- `hyperframes-core` — `github:heygen-com/hyperframes`
- `hyperframes-animation` — `github:heygen-com/hyperframes`
- `hyperframes-creative` — `github:heygen-com/hyperframes`
- `hyperframes-registry` — `github:heygen-com/hyperframes`
- `hyperframes-keyframes` — `github:heygen-com/hyperframes`
- `hyperframes-audio` — `github:heygen-com/hyperframes`
- `hyperframes-cli` — `github:heygen-com/hyperframes`
- `hyperframes-studio` — `github:heygen-com/hyperframes`
- `media-use` — `github:heygen-com/hyperframes`
- `product-launch-video` — `github:heygen-com/hyperframes`
- `pr-to-video` — `github:heygen-com/hyperframes`
- `faceless-explainer` — `github:heygen-com/hyperframes`
- `music-to-video` — `github:heygen-com/hyperframes`
- `talking-head-recut` — `github:heygen-com/hyperframes`
- `slideshow` — `github:heygen-com/hyperframes`
- `motion-graphics` — `github:heygen-com/hyperframes`
- `embedded-captions` — `github:heygen-com/hyperframes`
- `figma` — `github:heygen-com/hyperframes`
- `remotion-to-hyperframes` — `github:heygen-com/hyperframes`
- `remotion-best-practices` — `remotion-dev/skills@remotion-best-practices`
- `remotion-markup` — `remotion-dev/skills@remotion-markup`
- `remotion-maps` — `remotion-dev/skills@remotion-maps`
- `remotion-captions` — `remotion-dev/skills@remotion-captions`

</details>

> media-use needs the heygen CLI for bgm/sfx resolution. Set HEYGEN_API_BASE to route through a host app.

---

**If your agent has no shell or no plugin support:** you cannot self-install.
Tell the user which of the skills above are missing and let them run
`node install.mjs video-production` in a terminal. Do not claim a skill is available
when it is not, and do not silently proceed with a partial stack — say what is missing,
then continue with whatever is installed.

## Guardrails

**Remotion vs HyperFrames:** if the user says "video", they almost never mean Remotion.
Remotion only wins when there is an *existing Remotion project*. Porting is a one-way door —
`remotion-to-hyperframes` should only fire on an explicit ask.

**Brand beats novelty.** A technically better video in the wrong brand voice is a worse
deliverable. When a design system exists, it outranks any aesthetic instinct in this file.

**Cross-domain handoff:** visual identity work → `web-design`. Photography, iconography,
or a logo → `design-system` / `brandkit` / `design`. Motion on the *site* rather than in a
video → `web-design`.

**Cost:** `media-use` generates media via third-party models. Check with the user before
spending on generation when assets could be supplied instead.

**Caption rule:** `embedded-captions` = burned-in subtitles. `talking-head-recut` = designed
graphic overlays. Different jobs; do not substitute one for the other.

**Render determinism:** HyperFrames uses a single paused, seek-safe timeline. Keep it that
way — anything that drifts between renders breaks frame-accurate output.

**Full catalog with sizes:** `references/catalog.md`