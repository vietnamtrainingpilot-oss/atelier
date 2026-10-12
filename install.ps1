# Atelier — one-line install (Windows PowerShell)
#
#   irm https://raw.githubusercontent.com/vietnamtrainingpilot-oss/atelier/main/install.ps1 | iex
#
# Clones the repo to a temp dir and runs the installer. The plugin ships 36 skills
# bundled and fetches the other 67 from public sources, so the bundled core works
# even if upstream is unreachable.

$ErrorActionPreference = 'Stop'

$Repo = if ($env:ATELIER_REPO) { $env:ATELIER_REPO } else { 'https://github.com/vietnamtrainingpilot-oss/atelier' }
$Dir  = if ($env:ATELIER_DIR)  { $env:ATELIER_DIR }  else { Join-Path $env:USERPROFILE '.atelier' }

if (-not (Get-Command node -ErrorAction SilentlyContinue)) {
    Write-Error 'Atelier needs Node 18+.'
    exit 1
}

if (Test-Path (Join-Path $Dir '.git')) {
    Write-Host "updating $Dir"
    git -C $Dir pull --ff-only
} else {
    Write-Host "cloning $Repo -> $Dir"
    git clone --depth 1 $Repo $Dir
}

Push-Location $Dir
try {
    node install.mjs @args
} finally {
    Pop-Location
}