# agent-skills

A curated collection of reusable AI agent skills for development, frontend workflows, and shared tooling across Codex, OpenCode, and compatible agents.

## Purpose

This repository is the catalog and installation entry point for the skills I actively use.

- `SOURCES.md` tracks every curated skill and its canonical upstream repository.
- `scripts/install-global.sh` installs the curated set globally for compatible agents.
- `scripts/update-global.sh` refreshes the curated set from upstream.
- `skills/` is reserved for skills whose canonical source is this repository or for explicitly documented forks.

External skills are not copied here merely because I use them. They remain maintained in their natural upstream repositories. For example, `admin-interface-design` and `fitodac-shadcn-integration` are maintained in `next-multipurpose/fitodac-shadcn` and installed from there.

## Quick start

### First setup on a Mac

```bash
git clone https://github.com/fitodac/agent-skills.git
cd agent-skills
bash scripts/install-global.sh
```

### Update all curated skills

```bash
cd agent-skills
git pull
bash scripts/update-global.sh
```

### See which skills are managed

Read `SOURCES.md`.

### Add a new external skill

1. Add its canonical upstream and path to `SOURCES.md`.
2. Add its install command to `scripts/install-global.sh`.
3. Do not copy the skill into this repository unless this repository intentionally becomes its source of truth.

### Add a skill maintained here

Create:

```text
skills/<skill-name>/SKILL.md
```

Then add it to the installer and document it in `SOURCES.md`.

## Reference-to-prompt frontend workflow

A specific goal of this collection is to support a MotionSites-like workflow where a visual reference becomes a detailed, portable Markdown prompt that another AI agent can use to recreate the design in HTML/Tailwind, React, Astro, or another frontend stack.

The curated MengTo skills for this workflow are:

- `video-to-superprompt` — produces detailed builder-ready prompts from motion/video references.
- `design-first-ui-prompting` — structures UI prompts as explicit design specifications instead of vague aesthetic instructions.
- `tailwindcss` — guides practical Tailwind implementation and helps translate inferred layout intent into conventional utilities.
- `html-to-interaction-prompts` — extracts reusable interaction and motion specifications when HTML or a live implementation is available.
- `stitched-full-page-capture` — creates reliable full-page visual evidence from lazy-loaded or scroll-animated sites.

These complement Impeccable, Emil Kowalski's design/motion skills, Figma, Playwright, and shadcn.

The target workflow is:

```text
visual reference
      ↓
visual / layout interpretation
      ↓
assets + motion + interaction analysis
      ↓
detailed portable PROMPT.md
      ↓
HTML / React / Astro implementation
      ↓
visual QA and refinement
```

When interpreting screenshots, prefer the likely underlying design system and semantic layout model over literal screenshot measurements. For example, four visually equal columns should normally become an equal four-column grid instead of arbitrary fractional widths copied from pixels.

`video-to-superprompt` is currently the closest upstream skill to the desired output. A dedicated static `image-to-superprompt` skill may be added here later after this workflow is tested in real projects.

## Global skill location

Portable personal skills should live under `~/.agents/skills/` when supported by the agent. Codex-specific runtimes such as OMX remain managed by their own installer under Codex's configuration directories.

## OMX

OMX is intentionally not installed or updated by this repository. Manage OMX using its own installer/update process because it includes Codex-specific runtime behavior in addition to ordinary portable skills.
