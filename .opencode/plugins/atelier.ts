/**
 * Atelier — opencode plugin.
 *
 * Two jobs:
 *  1. Tell the agent Atelier is installed and how to self-install missing deps.
 *  2. Nudge on first tool use if a router was triggered but its deps are absent,
 *     so "AI Installation" happens automatically rather than by luck.
 */

import type { Plugin } from "@opencode-ai/plugin"
import { existsSync, readFileSync } from "node:fs"
import { homedir } from "node:os"
import { join } from "node:path"

const ROOT = join(homedir(), ".config", "opencode", "skills")
const DEPS = join(import.meta.dirname ?? ".", "..", "..", "deps.json")

/** Which routers does this turn actually touch? */
const ROUTERS = [
  "web-design",
  "video-production",
  "seo",
  "backend",
  "payments",
  "security",
  "vibe-code",
  "ship-it",
]

function loadDeps() {
  try {
    return JSON.parse(readFileSync(DEPS, "utf8"))
  } catch {
    return null
  }
}

function missingFor(name: string, deps: any): string[] {
  const r = deps?.routers?.[name]
  if (!r) return []
  return r.requires
    .filter((e: any) => e.source !== "manual")
    .filter((e: any) => !existsSync(join(ROOT, e.skill, "SKILL.md")))
    .map((e: any) => e.skill)
}

export default (async ({}) => {
  const deps = loadDeps()
  const warned = new Set<string>()

  return {
    // Append one line to the system prompt so the agent knows Atelier exists.
    "experimental.chat.system.transform": async (_input, output) => {
      if (!output.system) return
      output.system.push(
        [
          "",
          "## Atelier routers",
          "",
          "Eight domain routers are installed. Invoke one instead of naming individual skills:",
          ROUTERS.map((r) => `  - \`${r}\` — ${deps?.routers?.[r]?.summary ?? ""}`).join("\n"),
          "",
          "Each router carries an **AI Installation** section. Before its first real task, check",
          "its dependencies and run `node install.mjs <router>` from the Atelier plugin root if",
          "anything is missing. Do not silently proceed with a partial stack.",
        ].join("\n"),
      )
    },

    // Cheap, once-per-router nudge if a router ran with a partial stack.
    "tool.execute.after": async (input, output) => {
      const text = String(output.output ?? "").slice(0, 4000)
      if (!text || !deps) return

      for (const name of ROUTERS) {
        if (warned.has(name)) continue
        const mentioned = new RegExp(`\\b${name.replace(/[-]/g, "[-]")}\\b`).test(text)
        if (!mentioned) continue

        const missing = missingFor(name, deps)
        if (missing.length) {
          warned.add(name)
          output.output = [
            output.output ?? "",
            "",
            `[atelier] \`${name}\` is missing ${missing.length} dependency skill(s):`,
            `  ${missing.slice(0, 12).join(", ")}${missing.length > 12 ? ", …" : ""}`,
            `Run:  node install.mjs ${name}`,
          ].join("\n")
        } else {
          warned.add(name)
        }
      }
    },
  }
}) satisfies Plugin