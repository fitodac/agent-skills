#!/usr/bin/env bash
set -euo pipefail

ROOT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"

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

install_local_skill() {
  local name="$1"
  local skill_dir="${ROOT_DIR}/skills/${name}"
  test -f "${skill_dir}/SKILL.md" || { echo "Missing local skill: ${skill_dir}" >&2; return 1; }
  echo "[local] ${name}"
  npx -y skills add "${skill_dir}" -g -a codex -a opencode --copy -y
}

install_global_frontend_tools() {
  echo "Installing Playwright..."
  npm install -g playwright lighthouse
  playwright install chromium
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

# MengTo reference-to-prompt/frontend recreation workflow.
install_external_skill "https://github.com/MengTo/Skills/tree/main/agent-skills/codex/video-to-superprompt"
install_external_skill "https://github.com/MengTo/Skills/tree/main/agent-skills/ui/design-first-ui-prompting"
install_external_skill "https://github.com/MengTo/Skills/tree/main/agent-skills/web-design/tailwindcss"
install_external_skill "https://github.com/MengTo/Skills/tree/main/agent-skills/codex/html-to-interaction-prompts"
install_external_skill "https://github.com/MengTo/Skills/tree/main/agent-skills/codex/stitched-full-page-capture"

# Frontend/design tooling.
install_external_skill "https://github.com/openai/skills/tree/main/skills/.curated/figma"
install_external_skill "https://github.com/pbakaus/impeccable/tree/main/.agents/skills/impeccable"
install_external_skill "https://github.com/microsoft/playwright-cli/tree/main/skills/playwright-cli"
install_external_skill "https://github.com/shadcn-ui/ui/tree/main/skills/shadcn"
install_external_skill "vercel-labs/agent-skills" "vercel-react-best-practices"
install_external_skill "jellydn/my-ai-tools" "docs-update"
install_global_frontend_tools

# Upstream technical web quality auditing: always install all six skills.
for skill in web-quality-audit performance core-web-vitals accessibility seo best-practices; do
  install_external_skill "addyosmani/web-quality-skills" "$skill"
done

# Locally maintained business/marketing/UX extension.
install_local_skill "website-strategy-audit"

# Skill and documentation discovery.
install_external_skill "https://github.com/upstash/context7/tree/master/skills/find-docs"
install_external_skill "https://github.com/vercel-labs/skills/tree/main/skills/find-skills"

# Supabase.
install_external_skill "supabase/agent-skills" "supabase"
install_external_skill "supabase/agent-skills" "supabase-postgres-best-practices"

echo
echo "Done. Curated external and local skills plus browser and Lighthouse tooling were installed globally for Codex and OpenCode."
