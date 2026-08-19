# agent-skills

A curated collection of reusable AI agent skills for development, frontend workflows, and shared tooling across Codex, OpenCode, and compatible agents.

## Purpose

This repository is the catalog and installation entry point for the skills I actively use.

- `SOURCES.md` tracks every curated skill and its canonical upstream repository.
- `scripts/install-global.sh` installs the curated set globally for compatible agents.
- `scripts/update-global.sh` refreshes the curated set from upstream.
- `skills/` is reserved for skills whose canonical source is this repository or for explicitly documented forks.

External skills are not copied here merely because I use them. They remain maintained in their natural upstream repositories. For example, `admin-interface-design` and `fitodac-shadcn-integration` are maintained in `next-multipurpose/fitodac-shadcn` and installed from there.

## Global skill location

Portable personal skills should live under `~/.agents/skills/` when supported by the agent. Codex-specific runtimes such as OMX remain managed by their own installer under Codex's configuration directories.

## Install

Clone this repository, then run:

```bash
bash scripts/install-global.sh
```

## Update external skills

```bash
bash scripts/update-global.sh
```

The update script deliberately re-installs each tracked external skill from its canonical source rather than maintaining copied snapshots in this repository.
