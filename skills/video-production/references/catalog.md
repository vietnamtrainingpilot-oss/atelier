# Video Catalog

## HyperFrames — 21 skills, ~15.8 MB
Source: github.com/heygen-com/hyperframes (Apache-2.0, 61k stars)
Tagline: *Write HTML. Render video. Built for agents.*

### Input routers
| Skill | Size | Input → Output |
|---|---|---|
| `general-video` | 36KB | Freeform brief / script → video. **Default.** |
| `product-launch-video` | 340KB | Product or marketing URL, script, brief → promo. Site tours too. |
| `pr-to-video` | 358KB | GitHub PR URL / `owner/repo#N` / "this PR" → code-change explainer. |
| `faceless-explainer` | 284KB | Article, notes, topic, brief → faceless explainer. No site or footage. |
| `music-to-video` | 6.1MB | Audio file, or video to pull audio from → beat-synced lyric video / slideshow / kinetic promo. Zero assets needed. |
| `talking-head-recut` | 509KB | Existing talking-head / interview / podcast → designed graphic overlays, kinetic titles, lower-thirds, data callouts, quotes, side panels, PiP. Clip untouched underneath. |
| `figma` | 23KB | Figma link/logo/brand → imported assets, tokens, components, storyboard sections, reconstructed motion. |
| `remotion-to-hyperframes` | 176KB | Existing Remotion React source → HyperFrames HTML. **One-way. Only on explicit ask.** |

### Engine
| Skill | Size | Role |
|---|---|---|
| `hyperframes` | 150KB | Main entry point / hub |
| `hyperframes-core` | 98KB | Composition contract: structure, `data-*` timing attrs, `class="clip"`, tracks, sub-compositions, variables, deterministic render, validation. **Read before writing composition HTML.** |
| `hyperframes-animation` | 1.2MB | All animation knowledge: atomic motion rules, multi-phase scene blueprints, transitions, 7 runtime adapters (GSAP default, Lottie, Three.js, Anime.js, CSS keyframes, Web Animations API, TypeGPU), 24 text effects, choreography audits |
| `hyperframes-creative` | 1.2MB | Non-animation creative direction: design specs (frame.md/design.md), palettes, typography, narration, beat planning, audio-reactive visuals |
| `hyperframes-registry` | 79KB | Search/install/wire registry blocks. **Run before hand-building any named visual.** |
| `hyperframes-keyframes` | 23KB | Keyframe authoring |
| `hyperframes-audio` | 100KB | Audio engine |
| `hyperframes-cli` | 125KB | CLI: render, add, catalog |
| `hyperframes-studio` | 12KB | Preview / studio |

### Media & finishing
| Skill | Size | Role |
|---|---|---|
| `media-use` | 1.8MB | Agent Media OS. Resolve BGM, SFX, images, icons, brand logos, voice, colour grade, LUT into frozen local files. TTS, transcription, captions, background removal. One verb: `resolve`. |
| `embedded-captions` | 3.4MB | Burned-in subtitles |
| `slideshow` | 76KB | Stills → timed deck |
| `motion-graphics` | 113KB | Generic motion graphics |

---

## Remotion — 12 skills (pre-existing)
Source: remotion-dev/skills. React-based video rendering.

`remotion-best-practices` (1.1MB, router) · `remotion-markup` (549KB) · `remotion-maps`
(454KB) · `remotion-captions` · `remotion-saas` · `remotion-interactivity` ·
`remotion-multimedia` · `remotion-create` · `remotion-docs` · `remotion-render` ·
`remotion-studio` · `remotion-upgrade`

Use only when there is an existing Remotion project, or the user explicitly asks for React.

---

## Bitwize promo — 4 skills (music only)
`promo-director` (23KB) · `promo-writer` (23KB) · `promo-reviewer` (16KB) · `cloud-uploader` (18KB)

Album promo pipeline. Not general-purpose video.

---

## Dependencies

- `media-use` needs the **heygen CLI** for `resolve --type bgm|sfx`.
  Set `HEYGEN_API_BASE` to route HeyGen calls through a host app with no CLI sign-in.
- Generation features call third-party models — confirm cost before invoking.