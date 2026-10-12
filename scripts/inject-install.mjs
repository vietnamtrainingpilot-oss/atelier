#!/usr/bin/env node
/**
 * Injects an "## AI Installation" section into every router SKILL.md.
 *
 * The section tells a hosting agent how to verify and install this router's
 * dependencies automatically, with a graceful path for agents that support
 * nothing. Run from the plugin root:  node scripts/inject-install.mjs
 */

import { readFileSync, writeFileSync, readdirSync, existsSync } from "node:fs"
import { join, dirname } from "node:path"
import { fileURLToPath } from "node:url"

const HERE = dirname(fileURLToPath(import.meta.url))
const ROOT = join(HERE, "..")
const SKILLS = join(ROOT, "skills")

const deps = JSON.parse(readFileSync(join(ROOT, "deps.json"), "utf8"))

const MARKER = "## AI Installation"

function section(name) {
  const r = deps.routers[name]
  const auto = r.requires.filter((e) => e.source !== "manual")
  const manual = r.requires.filter((e) => e.source === "manual")

  const lines = [
    "",
    MARKER,
    "",
    "**Run this before the first real task in this domain.** It checks dependencies and",
    "installs whatever is missing. Safe to re-run — existing skills are never overwritten",
    "without `--force`.",
    "",
    "```bash",
    `# 1. see what this router needs, and what you already have`,
    `node install.mjs ${name} --check`,
    "",
    `# 2. install what's missing`,
    `node install.mjs ${name}`,
    "```",
    "",
    "Then **restart the agent** so the new skills register. Skills load at startup only.",
    "",
    `This router needs **${r.requires.length} skills**: ${auto.length} auto-installable, ${manual.length} manual.`,
    "",
  ]

  if (auto.length) {
    lines.push("<details><summary>Auto-installable (${n})</summary>".replace("${n}", String(auto.length)), "")
    for (const e of auto) lines.push(`- \`${e.skill}\` — \`${e.source}\``)
    lines.push("", "</details>", "")
  }

  if (manual.length) {
    lines.push(
      "<details><summary>Manual (${n}) — no known public source</summary>".replace("${n}", String(manual.length)),
      "",
      "These are bundled with the plugin when installed from source. On a bare host they may be",
      "absent. **The router still works** — it just has fewer specialists to draw on. Proceed",
      "with whatever is present rather than blocking.",
      "",
    )
    lines.push(manual.map((e) => `- \`${e.skill}\``).join("\n"))
    lines.push("", "</details>", "")
  }

  if (r.mcp?.length) {
    lines.push("**Optional MCP servers** — add to your config for full capability:", "",
      "```json", ...r.mcp.map((m) => JSON.stringify(m.name) + ": " + (m.url ? `"${m.url}"` : `"${m.command}"`)), "```", "")
  }

  if (r.agents?.length) {
    lines.push(`**Subagents** (${r.agents.length}) — installed to your agent directory: \`${r.agents.join("`, `")}\``, "")
  }

  if (r.env?.length) {
    lines.push("**Environment** (never commit these):**", "", "```", ...r.env.map((e) => `${e}=`), "```", "")
  }

  if (r.notes) lines.push(`> ${r.notes}`, "")

  lines.push(
    "---",
    "",
    "**If your agent has no shell or no plugin support:** you cannot self-install.",
    "Tell the user which of the skills above are missing and let them run",
    `\`node install.mjs ${name}\` in a terminal. Do not claim a skill is available`,
    "when it is not, and do not silently proceed with a partial stack — say what is missing,",
    "then continue with whatever is installed.",
    "",
  )

  return lines.join("\n")
}

let n = 0
for (const dir of readdirSync(SKILLS, { withFileTypes: true })) {
  if (!dir.isDirectory()) continue
  const f = join(SKILLS, dir.name, "SKILL.md")
  if (!existsSync(f)) continue

  let text = readFileSync(f, "utf8")
  const at = text.indexOf(MARKER)
  if (at !== -1) text = text.slice(0, at).replace(/\s+$/, "\n")

  // Insert before the final guardrails section if there is one, else append.
  const guard = text.lastIndexOf("\n## Guardrails")
  const body = guard !== -1 ? text.slice(0, guard) + "\n" + section(dir.name) + text.slice(guard)
                               : text.replace(/\s+$/, "\n") + section(dir.name)

  writeFileSync(f, body, "utf8")
  console.log(`  + ${dir.name}`)
  n++
}
console.log(`\n  ${n} router(s) updated\n`)