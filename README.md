# agent-skills

A curated collection of reusable AI agent skills for development, frontend workflows, and shared tooling across Codex, OpenCode, and compatible agents.

## Purpose

This repository is the source of truth for the skills I actively use.

- `skills/` contains skills owned or customized here.
- `SOURCES.md` tracks external skills and their canonical upstream repositories.
- `scripts/install-global.sh` installs the curated set globally for compatible agents.
- `scripts/update-global.sh` refreshes external skills from upstream.

External skills are not forked here unless they need local modifications. This keeps upstream updates simple and prevents this repository from becoming a collection of stale copies.

## Global skill location

Portable personal skills should live under `~/.agents/skills/` when supported by the agent. Codex-specific runtimes such as OMX remain managed by their own installer under Codex's configuration directories.

## Install

Clone this repository, then run:

```bash
./scripts/install-global.sh
```

## Update external skills

```bash
./scripts/update-global.sh
```

The update script deliberately re-installs each tracked external skill from its canonical source rather than relying on a generic bulk updater. This keeps each skill tied to the intended upstream repository and skill name.
