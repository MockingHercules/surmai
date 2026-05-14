# Surmai Project Checkpoint System

This project has a save-point system for presentation safety.

## Current Stable Checkpoint

Stable checkpoint name:

`surmai-stable-checkpoint`

Stable checkpoint branch:

`checkpoint/stable`

Local backup bundle:

`.checkpoint/surmai-stable.bundle`

This checkpoint is the known-good Surmai website state. Do not move it unless you intentionally approve a new stable version.

## Keyword 1: back to square

When you tell Codex:

`back to square`

Codex must restore this project back to the stable checkpoint.

That means:

- Discard recent experimental code changes
- Reset tracked files to `surmai-stable-checkpoint`
- Remove untracked experimental files
- Keep ignored dependency folders like `node_modules` unless reinstall is needed
- Run `npm install` if dependencies changed or are missing
- Run `npm run build`
- Start the local site again with `npm run dev`

Manual command, if you ever want to do it yourself:

```powershell
.\tools\checkpoint.ps1 back-to-square
```

## Keyword 2: allmightypush

When you tell Codex:

`allmightypush`

Codex must treat the current project as the new working/stable version.

That means:

- Verify the site builds
- Commit the current changes if needed
- Move `checkpoint/stable` to the latest working commit
- Move `surmai-stable-checkpoint` to the latest working commit
- Replace the local backup bundle
- Push the updated main branch and checkpoint tag/branch when appropriate

Manual command, if you ever want to do it yourself:

```powershell
.\tools\checkpoint.ps1 allmightypush
```

## Safety Rules

- Never overwrite the checkpoint unless the exact keyword `allmightypush` is used.
- Before risky edits, confirm this file exists and `git status --short` is understood.
- The checkpoint is intentionally stored in Git, not only in a normal folder, because Git can restore exact file content reliably.
- The `.checkpoint` folder contains an extra local bundle backup in case the normal Git refs are damaged.

## Quick Status

```powershell
.\tools\checkpoint.ps1 status
```
