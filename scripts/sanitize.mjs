#!/usr/bin/env node
/**
 * Sanitise machine-specific paths before publishing.
 *
 * Bundled skills were copied from a live machine and some carry absolute paths to
 * that machine's home directory, other plugins, or scratch dirs. Those are noise
 * for every other user and leak the author's username.
 *
 *   node scripts/sanitize.mjs           rewrite in place
 *   node scripts/sanitize.mjs --check   report only
 *
 * Re-run after refreshing bundled/skills.
 */

import { readdirSync, readFileSync, writeFileSync, statSync, existsSync } from "node:fs"
import { join, dirname } from "node:path"
import { fileURLToPath } from "node:url"
import { homedir } from "node:os"

const ROOT = join(dirname(fileURLToPath(import.meta.url)), "..")
const CHECK = process.argv.includes("--check")
const EXT = /\.(md|json|mjs|ts|txt|yaml|yml)$/i

// Never rewrite these — they are placeholders the installer resolves at install time.
const KEEP = ["${CLAUDE_PLUGIN_ROOT}", "${ATELIER_DIR}", "${env:", "{{", "{{{{"]
// Files that legitimately reference paths relative to an installed plugin.
const SKIP_FILES = [/^\.atelier-tmp/]

const home = homedir()
const USER = process.env.USERPROFILE ? process.env.USERPROFILE.split("\\").pop() : (process.env.USER || "")

const RULES = [
  // absolute home paths, both separators, optionally mixed
  { re: new RegExp(`${escapeRe(home.replace(/\\/g, "/"))}/`, "g"), to: "~/" },
  { re: new RegExp(`${escapeRe(home)}[\\\\/]`, "g"), to: "~/" },
  // username anywhere in a path-ish context
  ...(USER ? [{ re: new RegExp(`C:/Users/${escapeRe(USER)}/`, "g"), to: "~/" }] : []),
  // forward-slash variant of the above
  ...(USER ? [{ re: new RegExp(`C:\\\\Users\\\\${escapeRe(USER)}\\\\`, "g"), to: "~/"}] : []),
  // well-known third-party install dirs that are machine specific
  { re: /C:\/Users\/[^/\s]+\/\.bitwize-music\//g, to: "~/.bitwize-music/".replace("\u200b", "") },
]

function escapeRe(s) { return s.replace(/[.*+?^${}()|[\]\\]/g, "\\$&") }

let files = 0, hits = 0
const changed = []

function walk(dir) {
  if (!existsSync(dir)) return
  for (const e of readdirSync(dir, { withFileTypes: true })) {
    if (e.name === ".git" || e.name === "node_modules") continue
    if (SKIP_FILES.some((r) => r.test(e.name))) continue
    const f = join(dir, e.name)
    if (e.isDirectory()) { walk(f); continue }
    if (!EXT.test(e.name)) continue

    files++
    let text = readFileSync(f, "utf8")
    const original = text

    for (const k of KEEP) text = text.split(k).join(`\u0000KEEP${KEEP.indexOf(k)}\u0000`)
    for (const r of RULES) text = text.replace(r.re, r.to)
    for (let i = 0; i < KEEP.length; i++) {
      text = text.split(`\u0000KEEP${i}\u0000`).join(KEEP[i])
    }

    if (text !== original) {
      hits++
      changed.push(f.replace(ROOT + "\\", ""))
      if (!CHECK) writeFileSync(f, text, "utf8")
    }
  }
}

walk(join(ROOT, "skills"))
walk(join(ROOT, "agents"))
walk(join(ROOT, "bundled"))

console.log(`\n  scanned ${files} file(s)`)
if (!changed.length) {
  console.log("  \x1b[32mclean\x1b[0m — nothing to sanitise\n")
} else {
  const mode = CHECK ? "would rewrite" : "rewrote"
  console.log(`  \x1b[33m${mode} ${changed.length} file(s)\x1b[0m`)
  for (const c of changed.slice(0, 20)) console.log(`    \x1b[2m${c}\x1b[0m`)
  if (changed.length > 20) console.log(`    \x1b[2m… and ${changed.length - 20} more\x1b[0m`)
  console.log()
  process.exit(CHECK ? 1 : 0)
}