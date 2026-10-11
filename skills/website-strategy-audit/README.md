# website-strategy-audit

Autonomous representative website audit with business, marketing/CRO, UX, mobile and navigation strategy layered on top of Addy Osmani's Web Quality Skills.

## Install

The parent repository's `scripts/install-global.sh` installs this local skill globally for Codex and OpenCode, as well as upstream quality skills, Lighthouse, Playwright and Chromium. `scripts/update-global.sh` repeats installation after a `git pull`.

## Use

Provide a single URL to your agent:

> Use website-strategy-audit to analyze https://example.com. Deliver the complete report, technical audit, and current/proposed navigation graphs.

Agent action: launch `scripts/audit.cjs` with `NODE_PATH="$(npm root -g)"`, interpret the generated evidence with Web Quality Skills, finalize `report.md`, and return the outputs.

Outputs: `report.md`, `evidence.json`, `page-inventory.csv`, `navigation-as-is.mmd`, `navigation-to-be-proposal.mmd`, screenshot directory and Lighthouse JSON evidence where available. No credentials, preconfigured MCP services, paid API keys or manual screenshots required.

The crawler visits a bounded, representative subset of the site's public pages, respects crawl exclusions and does not submit forms. Lighthouse scores are lab data, not field Core Web Vitals.
