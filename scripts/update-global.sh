#!/usr/bin/env bash
set -euo pipefail

ROOT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"

# Re-running the installer is intentional: every external skill is resolved from
# its canonical upstream source and every local skill is re-synced from this repo.
exec bash "${ROOT_DIR}/scripts/install-global.sh"
