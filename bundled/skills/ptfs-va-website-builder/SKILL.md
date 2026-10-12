---
name: ptfs-va-website-builder
description: Build premium, custom-feeling websites for PTFS (Pilot Training Flight Simulator, Roblox) virtual airlines and other Roblox flight-sim/aviation Discord communities. Walks through brand intake, real-airline design research, information architecture (home, fleet, routes, ranks, staff roster, apply/join, news, rules), a reusable design-token component system, and a motion/animation pass, so the result reads as agency-built rather than a templated "$200 website." Use this skill whenever the user asks for a PTFS server website, virtual airline (VA) website, Roblox flight-sim community site, wants to build or rebrand a site for an airline/Discord server, or is scaling the same build across multiple airline clients — even if they don't use the words "website" or "design" explicitly (e.g. "make me a page for my airline," "redo my VA's site," "build the next one for [airline]").
---

# PTFS Virtual Airline Website Builder

A repeatable pipeline for building PTFS virtual-airline (VA) websites that feel custom-designed rather than templated — and that scale cleanly when the same builder is doing this for many airline clients.

## Why this matters

A generic site reads as generic almost instantly: a stock clip-art airplane silhouette, a centered hero with a gradient behind it, a default Bootstrap-style navbar, uniform unstyled card grids, and copy that never gets more specific than "Welcome to [Airline] — Fly With Us." None of that is a *capability* gap — it's a *grounding* gap. The fix is tying every visual decision to a real reference and giving each page its own rhythm instead of reusing one section pattern six times.

## The workflow

### 1. Intake

Before designing anything, get (ask if not already given, or infer sensible defaults and say so):
- Airline name and PTFS group / Discord invite link
- Existing brand colors or logo — if none exist yet, colors should be derived from a livery concept, not picked arbitrarily
- Tone: flag-carrier prestige (e.g. Singapore Airlines, ANA), friendly/budget carrier, cargo/charter operator, military/private
- One or two real airlines whose *feel* they want (if they don't know, suggest 2-3 based on the tone above)
- Which pages are needed — default to the standard set in `references/page-blueprints.md` unless told otherwise
- Whether this is a fresh build or the Nth site on a shared design system (see step 5)

If the user is low-context ("whatever, just make it good"), default to the full page set at flag-carrier-tier polish and say what you assumed.

### 2. Research real references before designing

Pull 2-3 real airline websites in a comparable tier (web search / image search). Look at specifics, not vibes: how the nav behaves against the hero, how whitespace is used, the photography style, and one "signature moment" (a livery close-up, a scroll-triggered reveal, a route-map animation). Write these down as concrete decisions to borrow — "transparent nav until scroll, like [airline]" — rather than defaulting to generic patterns from memory.

### 3. Information architecture

Use `references/page-blueprints.md` for the standard PTFS VA page set and what belongs on each page. Trim or add based on intake — a small startup VA doesn't need 8 pages; a large one might want a press/media page too.

### 4. Lock the design system before building pixels

Define these as reusable tokens, not values hardcoded per page:
- Color palette: primary/secondary/accent + neutrals, pulled from livery/logo
- Type pairing: one display font for headings, one workhorse font for body text
- Spacing scale, corner radii, shadow style
- Core components: navbar, hero, stat/badge chip, aircraft card, crew/roster card, footer

This is what makes the second, third, and tenth airline site fast to build — swap the tokens and content, keep the components. See `references/design-checklist.md` for pairing and palette guidance.

### 5. Build

Use the `frontend-design` skill for visual direction and `web-design-engineer` for implementation, building as a single-file HTML/React artifact per this environment's conventions unless the user asks for a downloadable project. Build section by section rather than the whole page at once — each section should hit the "grounded in a real reference" bar from step 2 instead of drifting into defaults partway through.

### 6. Motion pass

Once the static layout holds up, apply `web-animation-design` for: hero entrance, scroll-reveal on sections, hover states on cards/buttons, and nav behavior on scroll. Favor fewer, better-timed animations over many small flourishes — restraint reads as premium, excess reads as a template with effects bolted on.

### 7. Premium QA pass — do not skip

Before presenting the result, run it against `references/design-checklist.md`. This single pass is the fastest lever for moving a site from "looks like a template" to "looks agency-built," and it's the step most likely to get skipped under time pressure — resist that.

### 8. Package for reuse across airlines

When this is one of several airline builds, keep the component set and design tokens from step 4 as a shared base, and tell the user explicitly which parts are airline-specific (colors, logo, copy, photography) versus shared (component structure, spacing system, motion timing). The next airline should only need new brand inputs and reference research — not a redesign from scratch.

## Output

Show the result — don't just describe it. Default to rendering the site as an artifact in this conversation; only produce a downloadable project structure if the user asks for one explicitly.
