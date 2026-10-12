#!/usr/bin/env bash
# Atelier — one-line install (macOS / Linux / Git Bash on Windows)
#
#   curl -fsSL https://raw.githubusercontent.com/vietnamtrainingpilot-oss/atelier/main/install.sh | bash
#
# Clones the repo to a temp dir and runs the installer. The plugin ships 103 skills
# bundled, so this works even if the upstream skills are unreachable.
set -euo pipefail

REPO="${ATELIER_REPO:-https://github.com/vietnamtrainingpilot-oss/atelier}"
DIR="${ATELIER_DIR:-$HOME/.atelier}"

if ! command -v node >/dev/null 2>&1; then
  echo "Atelier needs Node 18+." >&2
  exit 1
fi

if [ ! -d "$DIR/.git" ]; then
  echo "cloning $REPO -> $DIR"
  git clone --depth 1 "$REPO" "$DIR"
else
  echo "updating $DIR"
  git -C "$DIR" pull --ff-only
fi

cd "$DIR"
exec node install.mjs "$@"