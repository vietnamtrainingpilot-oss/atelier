# Atelier — Brand

## Name

**Atelier** — *atelier* (n.): a workshop where specialists are engaged to make a thing.

Chosen because the product is exactly that: you bring the commission, Atelier dispatches the
right craftsperson for it. Avoids the generic `skills-pack` / `agent-toolkit` register that
every plugin on skills.sh occupies.

## Positioning line

> **Domain routers that dispatch agent skills to the right specialist.**

## Voice

| Do | Don't |
|---|---|
| State what's installed and what's missing | Hype about capability |
| Name the trade-off | Pretend everything is covered |
| Say "run this" | Say "just ask me" |
| Admit a limitation up front | Discover it mid-task |

Plain, specific, slightly opinionated. The tone of someone who has actually run the thing
at 2am and is telling you which part will bite.

## Wordmark

```
 ⌂ Atelier
```

`⌂` — U+2302 HOUSE. Reads as atelier (workshop, studio, studio-of-craft) and as the
"one home for your skills" claim. Works at 16px and in monochrome.

In plain-text contexts where the glyph is unsafe:

```
ATELIER
```

## Colour

The palette is deliberately quiet. This is infrastructure, and it should not compete with
the work it routes.

| Token | Hex | Use |
|---|---|---|
| `--atelier-ink` | `#14120F` | Primary text, headings |
| `--atelier-paper` | `#F5F2EC` | Background — warm, not white |
| `--atelier-rule` | `#D8D2C6` | Borders, dividers |
| `--atelier-muted` | `#7A7267` | Secondary text |
| `--atelier-mark` | `#B4552D` | Accent — the mark, links, active state |

**Why warm.** Every cold grey/blue palette in this category reads as developer-tool
chrome. A warm paper ground with a single burnt-orange accent reads as studio, which is
what the name promises. One accent only — it has to mean something.

## Typography

- Headings: a transitional serif (Georgia / Source Serif fallback stack) — the atelier voice
- Body/UI: system sans (`-apple-system, Segoe UI, Inter`)
- Code: `ui-monospace, SF Mono, Cascadia Code`

The serif/sans split is the whole brand in one decision: craft on top, machinery underneath.

## Badge

```
⌂ Atelier · 8 routers · 118 skills
```

---

## Router naming

Routers are named for the **job**, never for the tool.

`web-design` not `gsap-kit` · `payments` not `stripe-helper` · `security` not
`scanner-pro`. The user thinks in outcomes; the router hides the implementation. This also
means a router can swap its underlying skills without renaming.

## One-line rules

- One lead, two supports. Never a committee.
- Route on **input**, not output — determinism beats taste.
- Document the gap instead of implying coverage.
- Verify, then report. "Should work" is not a result.