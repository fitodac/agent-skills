# Skill Sources

This file tracks the canonical source for every skill in the curated local set.

## Local / customized

| Skill | Source |
| --- | --- |
| `admin-interface-design` | Maintained in this repository. Initial snapshot recovered from `next-multipurpose/next-multipurpose-core/.agents/skills/admin-interface-design`. |
| `fitodac-shadcn-integration` | Maintained in this repository. Initial snapshot recovered from `next-multipurpose/next-multipurpose-core/.agents/skills/fitodac-shadcn-integration`. |

## External

| Skill | Canonical upstream |
| --- | --- |
| `animation-vocabulary` | `emilkowalski/skills` → `skills/animation-vocabulary` |
| `emil-design-eng` | `emilkowalski/skills` → `skills/emil-design-eng` |
| `figma` | `openai/skills` → `skills/.curated/figma` |
| `find-animation-opportunities` | `emilkowalski/skills` → `skills/find-animation-opportunities` |
| `find-docs` | `upstash/context7` → `skills/find-docs` |
| `find-skills` | `vercel-labs/skills` → `skills/find-skills` |
| `impeccable` | `pbakaus/impeccable` → `.agents/skills/impeccable` |
| `improve-animations` | `emilkowalski/skills` → `skills/improve-animations` |
| `pick-ui-library` | `emilkowalski/skills` → `skills/pick-ui-library` |
| `playwright-cli` | `microsoft/playwright-cli` → `skills/playwright-cli` |
| `review-animations` | `emilkowalski/skills` → `skills/review-animations` |
| `shadcn` | `shadcn-ui/ui` → `skills/shadcn` |
| `supabase` | `supabase/agent-skills` → `skills/supabase` |
| `supabase-postgres-best-practices` | `supabase/agent-skills` → `skills/supabase-postgres-best-practices` |

## Policy

- External skills stay owned by upstream and are refreshed by `scripts/update-global.sh`.
- A skill is copied into `skills/` only when it is authored here or intentionally customized.
- If an external skill needs local changes, fork it into `skills/<name>/` and document the divergence here before editing it.
- OMX is intentionally excluded because it is a Codex-specific runtime and manages its own skills/configuration.
