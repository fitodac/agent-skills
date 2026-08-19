#!/usr/bin/env bash
set -euo pipefail

install_external_skill() {
  local source="$1"
  local name="${2:-}"

  echo "[external] ${name:-$source}"

  if [[ -n "${name}" ]]; then
    npx -y skills add "${source}" --skill "${name}" -g -a codex -a opencode --copy -y
  else
    npx -y skills add "${source}" -g -a codex -a opencode --copy -y
  fi
}

# Fitodac-maintained skills.
install_external_skill "https://github.com/next-multipurpose/fitodac-shadcn/tree/main/.agents/skills/admin-interface-design"
install_external_skill "https://github.com/next-multipurpose/fitodac-shadcn/tree/main/.agents/skills/fitodac-shadcn-integration"

# Emil Kowalski design/motion skills.
install_external_skill "emilkowalski/skills" "animation-vocabulary"
install_external_skill "emilkowalski/skills" "emil-design-eng"
install_external_skill "emilkowalski/skills" "find-animation-opportunities"
install_external_skill "emilkowalski/skills" "improve-animations"
install_external_skill "emilkowalski/skills" "pick-ui-library"
install_external_skill "emilkowalski/skills" "review-animations"

# Frontend/design tooling.
install_external_skill "https://github.com/openai/skills/tree/main/skills/.curated/figma"
install_external_skill "https://github.com/pbakaus/impeccable/tree/main/.agents/skills/impeccable"
install_external_skill "https://github.com/microsoft/playwright-cli/tree/main/skills/playwright-cli"
install_external_skill "https://github.com/shadcn-ui/ui/tree/main/skills/shadcn"

# Skill and documentation discovery.
install_external_skill "https://github.com/upstash/context7/tree/master/skills/find-docs"
install_external_skill "https://github.com/vercel-labs/skills/tree/main/skills/find-skills"

# Supabase.
install_external_skill "supabase/agent-skills" "supabase"
install_external_skill "supabase/agent-skills" "supabase-postgres-best-practices"

echo
echo "Done. Curated external skills were installed globally for Codex and OpenCode."
