# Skill Sources

This file tracks the canonical source for every skill in the curated local set.

## External

| Skill | Canonical upstream |
| --- | --- |
| `admin-interface-design` | `next-multipurpose/fitodac-shadcn` → `.agents/skills/admin-interface-design` |
| `animation-vocabulary` | `emilkowalski/skills` → `skills/animation-vocabulary` |
| `design-first-ui-prompting` | `MengTo/Skills` → `agent-skills/ui/design-first-ui-prompting` |
| `emil-design-eng` | `emilkowalski/skills` → `skills/emil-design-eng` |
| `figma` | `openai/skills` → `skills/.curated/figma` |
| `find-animation-opportunities` | `emilkowalski/skills` → `skills/find-animation-opportunities` |
| `find-docs` | `upstash/context7` → `skills/find-docs` |
| `find-skills` | `vercel-labs/skills` → `skills/find-skills` |
| `fitodac-shadcn-integration` | `next-multipurpose/fitodac-shadcn` → `.agents/skills/fitodac-shadcn-integration` |
| `html-to-interaction-prompts` | `MengTo/Skills` → `agent-skills/codex/html-to-interaction-prompts` |
| `impeccable` | `pbakaus/impeccable` → `.agents/skills/impeccable` |
| `improve-animations` | `emilkowalski/skills` → `skills/improve-animations` |
| `pick-ui-library` | `emilkowalski/skills` → `skills/pick-ui-library` |
| `playwright-cli` | `microsoft/playwright-cli` → `skills/playwright-cli` |
| `review-animations` | `emilkowalski/skills` → `skills/review-animations` |
| `shadcn` | `shadcn-ui/ui` → `skills/shadcn` |
| `stitched-full-page-capture` | `MengTo/Skills` → `agent-skills/codex/stitched-full-page-capture` |
| `supabase` | `supabase/agent-skills` → `skills/supabase` |
| `supabase-postgres-best-practices` | `supabase/agent-skills` → `skills/supabase-postgres-best-practices` |
| `tailwindcss` | `MengTo/Skills` → `agent-skills/web-design/tailwindcss` |
| `video-to-superprompt` | `MengTo/Skills` → `agent-skills/codex/video-to-superprompt` |

## Reference-to-prompt workflow

The MengTo skills above are intentionally curated for a MotionSites-like workflow:

1. inspect a screenshot, video, HTML page, or live site reference;
2. recover layout, visual language, assets, motion, responsive behavior, and interaction intent;
3. produce a detailed, portable builder prompt that can be saved as Markdown;
4. use that prompt to recreate the design in HTML/Tailwind, React, Astro, or another compatible frontend stack;
5. prefer semantic layout rules and established framework utilities over literal pixel-for-pixel screenshot measurements.

`video-to-superprompt` is currently the closest upstream skill to the desired superprompt output. There is not yet a dedicated static-image-to-superprompt skill in this repository; if the workflow proves useful, that should become a local skill rather than modifying MengTo's upstream skill.

## Policy

- External skills stay owned by upstream and are refreshed by `scripts/update-global.sh`.
- `admin-interface-design` and `fitodac-shadcn-integration` are maintained in `next-multipurpose/fitodac-shadcn`, not in this repository.
- A skill is copied into `skills/` only when this repository becomes its canonical source or when an intentional fork is documented here.
- If an external skill needs local changes, fork it into `skills/<name>/` and document the divergence here before editing it.
- OMX is intentionally excluded because it is a Codex-specific runtime and manages its own skills/configuration.
