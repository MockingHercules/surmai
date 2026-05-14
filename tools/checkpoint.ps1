param(
  [Parameter(Position = 0)]
  [ValidateSet("status", "back-to-square", "allmightypush")]
  [string]$Action = "status"
)

$ErrorActionPreference = "Stop"
$CheckpointTag = "surmai-stable-checkpoint"
$CheckpointBranch = "checkpoint/stable"
$CheckpointDir = ".checkpoint"
$BundlePath = Join-Path $CheckpointDir "surmai-stable.bundle"

function Clear-CodexGitEnv {
  Remove-Item Env:GIT_CONFIG_COUNT -ErrorAction SilentlyContinue
  Remove-Item Env:GIT_CONFIG_KEY_0 -ErrorAction SilentlyContinue
  Remove-Item Env:GIT_CONFIG_VALUE_0 -ErrorAction SilentlyContinue
}

function Run-Git {
  Clear-CodexGitEnv
  $gitArgs = $args
  git @gitArgs
  if ($LASTEXITCODE -ne 0) { throw "git $($gitArgs -join ' ') failed" }
}

function Current-Head {
  Clear-CodexGitEnv
  return (git rev-parse --short HEAD).Trim()
}

New-Item -ItemType Directory -Force $CheckpointDir | Out-Null

switch ($Action) {
  "status" {
    Write-Host "Surmai checkpoint status" -ForegroundColor Cyan
    Write-Host "Current HEAD: $(Current-Head)"
    Run-Git status --short
    Write-Host "Checkpoint tag: $CheckpointTag"
    Run-Git rev-parse --short $CheckpointTag
    Write-Host "Checkpoint branch: $CheckpointBranch"
    Run-Git rev-parse --short $CheckpointBranch
    if (Test-Path $BundlePath) { Write-Host "Bundle backup: $BundlePath" -ForegroundColor Green } else { Write-Host "Bundle backup missing" -ForegroundColor Yellow }
  }

  "back-to-square" {
    Write-Host "Restoring Surmai to stable checkpoint..." -ForegroundColor Yellow
    Run-Git reset --hard $CheckpointTag
    Run-Git clean -fd
    npm install
    npm run build
    Write-Host "Restored to checkpoint $(Current-Head). Start with: npm run dev" -ForegroundColor Green
  }

  "allmightypush" {
    Write-Host "Promoting current Surmai state to new stable checkpoint..." -ForegroundColor Yellow
    npm run build
    Run-Git add -A
    Clear-CodexGitEnv
    $dirty = git status --short
    if ($dirty) {
      Run-Git commit -m "Promote stable checkpoint"
    }
    Run-Git branch -f $CheckpointBranch HEAD
    Run-Git tag -f $CheckpointTag HEAD
    Run-Git bundle create $BundlePath HEAD
    Write-Host "New stable checkpoint is $(Current-Head)." -ForegroundColor Green
  }
}

