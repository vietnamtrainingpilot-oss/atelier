#!/usr/bin/env node
/**
 * Atelier installer — offline-first.
 *
 *   node install.mjs                      # everything, bundled-first
 *   node install.mjs web-design           # one router
 *   node install.mjs --offline            # bundled only, no network at all
 *   node install.mjs --check              # report only
 *   node install.mjs --force              # overwrite existing
 *   node install.mjs --agent opencode     # skip detection
 *   node install.mjs --root ./skills      # install elsewhere
 *   node install.mjs --list               # list routers
 *
 * Resolution order for every skill:
 *   1. already installed  -> leave alone
 *   2. bundled/skills/    -> copy, NO network
 *   3. declared source    -> npx skills add, else git sparse-checkout
 *   4. manual             -> report; router still works without it
 *
 * Exits non-zero only if a declared dependency actually failed. Manual skills never
 * fail the run, so an agent invoking this never hard-errors on a partial stack.
 */

import { readFileSync, existsSync, mkdirSync, cpSync, rmSync, writeFileSync, readdirSync } from "node:fs"
import { homedir, platform } from "node:os"
import { join, dirname, resolve, isAbsolute } from "node:path"
import { fileURLToPath } from "node:url"
import { execFileSync } from "node:child_process"

const HERE = dirname(fileURLToPath(import.meta.url))
const args = process.argv.slice(2)
const flag = (n) => args.includes(n)
const opt = (n, d) => { const i = args.indexOf(n); return i >= 0 && args[i + 1] ? args[i + 1] : d }

const OFFLINE = flag("--offline")
const PREFER_NETWORK = flag("--prefer-network")
const CHECK_ONLY = flag("--check")
const FORCE = flag("--force")
const LIST = flag("--list")
const JSON_OUT = flag("--json")
const IN_PLUGIN = flag("--in-place")

const deps = JSON.parse(readFileSync(join(HERE, "deps.json"), "utf8"))
const BUNDLED = deps.bundling?.dir ? join(HERE, deps.bundling.dir) : null

const c = {
  dim: (s) => `\x1b[2m${s}\x1b[0m`,
  b: (s) => `\x1b[1m${s}\x1b[0m`,
  g: (s) => `\x1b[32m${s}\x1b[0m`,
  y: (s) => `\x1b[33m${s}\x1b[0m`,
  r: (s) => `\x1b[31m${s}\x1b[0m`,
  c: (s) => `\x1b[36m${s}\x1b[0m`,
}

const expand = (p) => (!p ? p : p.startsWith("~/") ? join(homedir(), p.slice(2)) : p)

function detectAgent() {
  const f = opt("--agent"); if (f) return f
  if (existsSync(join(homedir(), ".config", "opencode", "opencode.json"))) return "opencode"
  if (existsSync(join(homedir(), ".claude", "settings.json")) || existsSync(join(homedir(), ".claude", "skills"))) return "claude"
  if (existsSync(join(homedir(), ".cursor"))) return "cursor"
  if (existsSync(join(homedir(), ".codex"))) return "codex"
  if (existsSync(join(homedir(), ".agents", "skills"))) return "agents"
  return "agents"
}
const agent = detectAgent()

function resolveRoot() {
  if (IN_PLUGIN) return join(HERE, "skills")
  const ex = opt("--root")
  if (ex) return isAbsolute(ex) ? ex : resolve(process.cwd(), ex)
  const m = deps.skillRoots[agent]
  if (m) return expand(m)
  for (const k of deps.preferenceOrder) {
    if (deps.skillRoots[k] && existsSync(expand(deps.skillRoots[k]))) return expand(deps.skillRoots[k])
  }
  return expand(deps.skillRoots.agents)
}
const ROOT = resolveRoot()

const has = (p) => existsSync(join(ROOT, p, "SKILL.md"))
const isBundled = (name) => !!(BUNDLED && existsSync(join(BUNDLED, name, "SKILL.md")))

function run(bin, argv) { execFileSync(bin, argv, { stdio: "pipe", timeout: 300000 }) }

const R = { bundled: [], installed: [], present: [], manual: [], fetched: [], failed: [], map: {} }
const note = (skill, via) => { R.map[skill] = via }

/* ---------------------------------------------------------------- sources */

function fromBundled(name) {
  if (CHECK_ONLY) return "would-bundle"
  const dest = join(ROOT, name)
  if (existsSync(dest)) rmSync(dest, { recursive: true, force: true })
  cpSync(join(BUNDLED, name), dest, { recursive: true })
  return "bundled"
}

/**
 * Resolve "owner/repo@skill" from git directly.
 *
 * We deliberately do NOT shell out to `npx skills add`. That CLI re-spawns a
 * bare `npx`, which fails with ENOENT on Windows whenever stdio is piped, and
 * adds an npm dependency for what is only a clone-and-copy.
 *
 * Instead: shallow sparse clone, then locate the skill directory by name
 * anywhere in the tree. Skill folder names are stable across the ecosystem.
 */
function fromSkillRepo(entry) {
  const [repo, skill] = entry.source.split("@")
  const tmpRoot = join(ROOT, ".atelier-tmp")
  const tmp = join(tmpRoot, skill || "repo")
  try {
    mkdirSync(tmpRoot, { recursive: true })
    if (existsSync(tmp)) rmSync(tmp, { recursive: true, force: true })
    run("git", ["clone", "--depth", "1", `https://github.com/${repo}.git`, tmp])

    if (!skill) {
      // Whole repo is the skill.
      if (!existsSync(join(tmp, "SKILL.md"))) throw new Error("no SKILL.md at repo root")
      const dest = join(ROOT, entry.skill)
      if (existsSync(dest)) rmSync(dest, { recursive: true, force: true })
      cpSync(tmp, dest, { recursive: true })
      return true
    }

    // Find the skill by folder name, else by the `name:` in its frontmatter.
    // Folder names are not reliable: devmartinese/awwwards-animations-skill
    // ships SKILL.md at the root, and several packs nest deeper than expected.
    let found = findSkillDir(tmp, skill, 0, 6) ?? findByFrontmatter(tmp, skill, 0, 6)
    if (!found) throw new Error(`could not locate skill "${skill}" in ${repo}`)
    const dest = join(ROOT, entry.skill)
    if (existsSync(dest)) rmSync(dest, { recursive: true, force: true })
    cpSync(found, dest, { recursive: true })
    return true
  } finally {
    try { rmSync(tmpRoot, { recursive: true, force: true }) } catch {}
  }
}

/** Bounded-depth search for <name>/SKILL.md. */
function findSkillDir(root, name, depth = 0, maxDepth = 5) {
  if (depth > maxDepth) return null
  let entries
  try { entries = readdirSync(root, { withFileTypes: true }) } catch { return null }
  for (const e of entries) {
    if (e.name === ".git" || e.name === "node_modules") continue
    const p = join(root, e.name)
    if (e.isDirectory()) {
      if (e.name === name && existsSync(join(p, "SKILL.md"))) return p
    }
  }
  for (const e of entries) {
    if (!e.isDirectory() || e.name === ".git" || e.name === "node_modules") continue
    const hit = findSkillDir(join(root, e.name), name, depth + 1, maxDepth)
    if (hit) return hit
  }
  return null
}

function fromGit(entry) {
  const spec = entry.source.replace(/^github:/, "")
  const tmpRoot = join(ROOT, ".atelier-tmp")
  const tmp = join(tmpRoot, entry.skill)
  try {
    mkdirSync(dirname(tmp), { recursive: true })
    if (existsSync(tmp)) rmSync(tmp, { recursive: true, force: true })
    run("git", ["clone", "--depth", "1", "--sparse", `https://github.com/${spec}.git`, tmp])
    run("git", ["-C", tmp, "sparse-checkout", "set", entry.subpath])
    const src = join(tmp, entry.subpath)
    if (!existsSync(join(src, "SKILL.md"))) throw new Error("SKILL.md not found at subpath")
    const dest = join(ROOT, entry.skill)
    if (existsSync(dest)) rmSync(dest, { recursive: true, force: true })
    cpSync(src, dest, { recursive: true })
    return true
  } finally {
    try { rmSync(tmpRoot, { recursive: true, force: true }) } catch {}
  }
}

/** Match a skill by the `name:` field in its SKILL.md frontmatter. */
function findByFrontmatter(root, name, depth = 0, maxDepth = 6) {
  if (depth > maxDepth) return null
  let entries
  try { entries = readdirSync(root, { withFileTypes: true }) } catch { return null }

  for (const e of entries) {
    if (e.isFile() && e.name === "SKILL.md") {
      try {
        const head = readFileSync(join(root, e.name), "utf8").slice(0, 600)
        const m = head.match(/^---\s*\r?\n([\s\S]{0,500}?)\r?\n---/)
        if (m && new RegExp(`^name:\\s*["']?${escapeRe(name)}["']?\\s*$`, "m").test(m[1])) return root
      } catch {}
    }
  }
  for (const e of entries) {
    if (!e.isDirectory() || e.name === ".git" || e.name === "node_modules") continue
    const hit = findByFrontmatter(join(root, e.name), name, depth + 1, maxDepth)
    if (hit) return hit
  }
  return null
}

function escapeRe(s) { return s.replace(/[.*+?^${}()|[\]\\]/g, "\\$&") }

/* ---------------------------------------------------------------- post-install */

function runPostInstall() {
  for (const p of deps.postInstall ?? []) {
    const dir = join(ROOT, p.skill)
    if (!existsSync(dir)) continue
    let n = 0
    const walk = (d) => {
      for (const e of readdirSync(d, { withFileTypes: true })) {
        const f = join(d, e.name)
        if (e.isDirectory()) { if (e.name !== "node_modules" && e.name !== ".git") walk(f) }
        else if (e.name.endsWith(".md")) {
          const t = readFileSync(f, "utf8")
          if (t.includes("${CLAUDE_PLUGIN_ROOT}")) {
            writeFileSync(f, t.replaceAll("${CLAUDE_PLUGIN_ROOT}", dir.replace(/\\/g, "/")), "utf8"); n++
          }
        }
      }
    }
    walk(dir)
    if (n) console.log(c.dim(`    post-install: patched ${n} file(s) in ${p.skill}`))
  }
}

/* ---------------------------------------------------------------- install */


function installEntry(entry) {
  if (has(entry.skill) && !FORCE) { R.present.push(entry.skill); note(entry.skill, "already-installed"); return }

  const privateOrigin = entry.source === "manual"
  const via = privateOrigin ? "bundled-private" : "bundled-public"
  const canFetch = !privateOrigin && !OFFLINE

  // Helper: take the copy that travels inside the repo.
  const takeBundled = () => {
    if (CHECK_ONLY) { R.bundled.push(entry.skill); note(entry.skill, via); return }
    try { fromBundled(entry.skill); R.bundled.push(entry.skill); note(entry.skill, via) }
    catch (e) { R.failed.push({ skill: entry.skill, error: `bundled copy: ${e.message}` }) }
  }

  // --prefer-network: try the upstream first even when a bundled copy exists.
  // Public skills then stay up to date with their source; private ones still
  // fall through to the bundled file, because there is nothing to fetch.
  if (PREFER_NETWORK && canFetch) {
    if (CHECK_ONLY) { note(entry.skill, "would-fetch"); R.fetched.push(entry.skill); return }
    try {
      if (entry.subpath) fromGit(entry)
      else fromSkillRepo(entry)
      R.fetched.push(entry.skill); note(entry.skill, "fetched"); return
    } catch {
      // fall through to the bundled copy
    }
  }

  // Default: the bundled copy ships with the plugin, so it needs no network.
  if (isBundled(entry.skill)) { takeBundled(); return }

  // Nothing bundled — go and get it from its public upstream.
  if (canFetch) {
    if (CHECK_ONLY) { R.fetched.push(entry.skill); note(entry.skill, "would-fetch"); return }
    try {
      if (entry.subpath) fromGit(entry)
      else fromSkillRepo(entry)
      R.fetched.push(entry.skill); note(entry.skill, "fetched")
    } catch (e) {
      R.failed.push({ skill: entry.skill, error: String(e.message || e) }); note(entry.skill, "failed")
    }
    return
  }

  // --offline, or --prefer-network with a private skill (nothing to fetch).
  // Private skills always ship bundled, so this path only fires if that copy is
  // missing from the plugin — report it rather than pretending it installed.
  if (privateOrigin) { R.manual.push(entry.skill); note(entry.skill, "absent"); return }
  R.failed.push({ skill: entry.skill, error: "not bundled and --offline" })
  note(entry.skill, "unavailable-offline")
}

function installRouter(name) {
  const src = join(HERE, "skills", name)
  if (!existsSync(src)) { R.failed.push({ skill: name, error: "router missing in plugin" }); return }
  if (has(name) && !FORCE) { R.present.push(name); return }
  if (CHECK_ONLY) { R.bundled.push(name); return }
  const dest = join(ROOT, name)
  if (existsSync(dest)) rmSync(dest, { recursive: true, force: true })
  cpSync(src, dest, { recursive: true })
  R.bundled.push(name)
}

function installAgents(names) {
  if (!names?.length || CHECK_ONLY) return
  const map = {
    opencode: join(homedir(), ".config", "opencode", "agent"),
    claude: join(homedir(), ".claude", "agents"),
  }
  const dir = map[agent] ?? map.opencode
  mkdirSync(dir, { recursive: true })
  for (const a of names) {
    const src = join(HERE, "agents", `${a}.md`)
    if (!existsSync(src)) continue
    cpSync(src, join(dir, `${a}.md`), { recursive: true })
    R.bundled.push(`${a} (agent)`)
  }
}

/* ---------------------------------------------------------------- plugin */

/**
 * Register the opencode plugin so Atelier announces itself to the agent even
 * when the runtime lives outside ~/.atelier.
 *
 * opencode loads local plugins from ~/.config/opencode/plugins/ (plural). Once
 * atelier.ts is copied there it can no longer locate deps.json by a path
 * relative to itself, so we also drop a pointer file (~/.config/opencode/
 * atelier-home) that the plugin's resolveHome() reads.
 */
function installPlugin() {
  if (agent !== "opencode" || IN_PLUGIN) return

  const src = join(HERE, ".opencode", "plugins", "atelier.ts")
  if (!existsSync(src)) return

  const cfg = join(homedir(), ".config", "opencode")
  const dest = join(cfg, "plugins", "atelier.ts")

  if (CHECK_ONLY) {
    console.log(c.dim(`    plugin: would register ${dest}`))
    console.log(c.dim(`    plugin: would point ${join(cfg, "atelier-home")} at ${HERE}`))
    return
  }

  mkdirSync(dirname(dest), { recursive: true })
  cpSync(src, dest, { recursive: true })
  writeFileSync(join(cfg, "atelier-home"), HERE, "utf8")
  R.bundled.push("atelier (plugin)")
  console.log(c.dim(`    plugin: registered ${dest}`))
  console.log(c.dim(`    plugin: runtime pointer -> ${HERE}`))
}

function reportMcp(mcps) {
  if (!mcps?.length) return
  console.log(c.c("\n  Optional MCP servers — paste into your agent config:"))
  for (const m of mcps) {
    console.log(c.dim(m.url
      ? `    "${m.name}": { "type": "remote", "url": "${m.url}", "enabled": true }`
      : `    "${m.name}": { "type": "local", "command": ["cmd","/c","${m.command}"], "enabled": true }`))
  }
}

/* ---------------------------------------------------------------- main */

if (LIST) {
  console.log(c.b(`\n  Atelier ${deps.version} — routers\n`))
  for (const [k, v] of Object.entries(deps.routers)) {
    const bun = v.requires.filter((e) => isBundled(e.skill)).length
    const fetched = v.requires.filter((e) => e.source !== "manual" && !isBundled(e.skill)).length
    const absent = v.requires.filter((e) => e.source === "manual" && !isBundled(e.skill)).length
    console.log(`  ${c.c(k.padEnd(18))} ${v.summary}`)
    console.log(c.dim(`  ${"".padEnd(18)} ${v.requires.length} skills · ${bun} bundled · ${fetched} fetched${absent ? ` · ${absent} excluded` : ""}${v.mcp ? ` · ${v.mcp.length} MCP` : ""}`))
  }
  console.log()
  process.exit(0)
}

const routers = args.filter((a) => !a.startsWith("--") && deps.routers[a])
const names = routers.length ? routers : Object.keys(deps.routers)

console.log(c.b(`\n  Atelier installer`))
console.log(c.dim(`  agent   ${agent}`))
console.log(c.dim(`  root    ${ROOT}`))
console.log(c.dim(`  mode    ${CHECK_ONLY ? "check only" : FORCE ? "force" : "install missing"}${OFFLINE ? " · offline" : ""}`))
console.log(c.dim(`  repo    ${deps.repo ?? "(local)"}`))
console.log(c.dim(`  bundled ${BUNDLED ? `${readdirSync(BUNDLED).length} skills` : "none"}\n`))

if (!CHECK_ONLY) mkdirSync(ROOT, { recursive: true })

for (const name of names) {
  const r = deps.routers[name]
  const bun = r.requires.filter((e) => isBundled(e.skill)).length
  const fetched = r.requires.filter((e) => e.source !== "manual" && !isBundled(e.skill)).length
  console.log(c.b(`  ${name}`) + c.dim(`  — ${r.title}  (${bun} bundled / ${fetched} fetch)`))
  for (const e of r.requires) installEntry(e)
  if (r.agents) installAgents(r.agents)
  installRouter(name)
  if (r.handoffs) console.log(c.dim(`    hands off to: ${r.handoffs.join(", ")}`))
  if (r.notes) console.log(c.y(`    note: ${r.notes}`))
}

installPlugin()
if (!CHECK_ONLY) runPostInstall()
reportMcp(names.flatMap((n) => deps.routers[n].mcp ?? []))

const all = Object.keys(R.map).length
const count = (v) => Object.values(R.map).filter((x) => x === v).length
const bundledPriv = count("bundled-private")
const bundledPub = count("bundled-public")

console.log(c.b("\n  Summary"))
console.log(`  ${c.g("+ bundled  ")} ${R.bundled.length} ${c.dim(`(${bundledPriv} private-origin, ${bundledPub} public)`)}`)
if (R.fetched.length) console.log(`  ${c.c("~ fetched  ")} ${R.fetched.length} ${c.dim("(from upstream GitHub)")}`)
console.log(`  ${c.dim("= already  ")} ${R.present.length}`)
if (R.manual.length) console.log(`  ${c.y("? absent    ")} ${R.manual.length} ${c.dim("(excluded from bundle, no public source)")}`)
if (R.failed.length) console.log(`  ${c.r("x failed    ")} ${R.failed.length}`)
console.log(c.dim(`\n  ${all} dependency/ies resolved.`))
console.log(c.dim(`  Private-origin skills ship inside the repo and need no network.`))

if (R.failed.length) {
  console.log(c.r("\n  Failures:"))
  for (const f of R.failed.slice(0, 12)) console.log(c.dim(`    ${f.skill}: ${f.error}`))
  if (OFFLINE) console.log(c.y("    re-run without --offline to fetch from GitHub"))
}
if (R.manual.length) {
  console.log(c.y(`\n  ${R.manual.length} excluded skill(s): ${R.manual.join(", ")}`))
  console.log(c.dim("  Deliberately not bundled for repo size. Routers work without them."))
}
console.log(c.dim("\n  Restart your agent so the new skills register.\n"))

if (!R.failed.length && !CHECK_ONLY) writeFileSync(join(ROOT, ".atelier-installed"), new Date().toISOString())
if (JSON_OUT) console.log(JSON.stringify(R, null, 2))
process.exit(R.failed.length ? 1 : 0)