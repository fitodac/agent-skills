---
name: website-strategy-audit
description: Autonomously audit an entire public website from its homepage URL. Crawl representative routes with Playwright, run Lighthouse, analyze business positioning, copy, UX/UI, mobile, SEO, marketing and conversion, and deliver evidence-based reports plus AS-IS and TO-BE navigation graphs. Use for full website audits, competitor evaluations, ecommerce or editorial site reviews and conversion improvement reports.
license: MIT
metadata:
  author: fitodac
  version: "1.1.0"
---

# Website Strategy Audit

**Input:** a single public website URL. **Output:** a complete audit. Never require the human to identify internal pages, run an audit command, supply screenshots, or install more tools after the global skills installer has run. Execute all phases independently and present the resulting report.

## Dependencies (installed by agent-skills)

- `web-quality-audit` and the five companion skills in `addyosmani/web-quality-skills`: `performance`, `core-web-vitals`, `accessibility`, `seo`, `best-practices`.
- Global Playwright + Chromium, global Lighthouse CLI, Node.js.
- `scripts/audit.cjs`, stored alongside this skill, is the autonomous browser discovery/evidence runner. It **must** be used for live public sites rather than replacing navigation with guesses. It generates an initial factual report even if qualitative synthesis is interrupted.

## Invocation: ONE URL, ZERO FOLLOW-UP QUESTIONS

1. Identify the submitted URL (default to the homepage for a supplied inner page). Normalize `https://` when the scheme is omitted. Do not request business category, personas, competitor lists, sitemap, hosting platform, credentials, or measurements.
2. Launch the browser crawler automatically. Resolve the script path from the skill directory (not the user's current repo). In a shell with this skill available:

   ```bash
   SKILL_DIR="$HOME/.agents/skills/website-strategy-audit"
   NODE_PATH="$(npm root -g)" node "$SKILL_DIR/scripts/audit.cjs" "https://example.com"
   ```

   Replace the example URL with the user URL. The report directory is printed as JSON, with `report.md`, `evidence.json`, `page-inventory.csv`, Mermaid graphs, screenshots, and Lighthouse evidence. The script is read-only towards the audited website; it avoids query/filter explosions and samples at most two detail pages per product/article/service type, subject to its global cap.
3. Read the generated `evidence.json`, screenshots, both Mermaid files and any Lighthouse results. Inspect additional pages with Playwright if the existing evidence leaves an important business or navigational gap. Do not ask the human for help. Review both desktop and mobile, including the menu state when captured.
4. **Invoke / apply** `web-quality-audit`, using the actual Lighthouse JSONs and Playwright observations as technical evidence. Apply `seo`, `accessibility`, `performance`, `core-web-vitals`, and `best-practices` for category-specific interpretation when necessary. Reuse, do not reimplement, these audit frameworks. Do not imply that lab Lighthouse values are CrUX field data, or that an absent check passed.
5. Enrich `report.md` using the synthesis standard below. Replace the generic TO-BE diagram with a **site-specific** proposal tied to business intent, user journeys and observed structure. Save the final report and diagrams in the generated output directory. The agent should do this, not the user.
6. Respond with the executive summary, most valuable changes, analyzed page count, significant limitations, and location of the report/graphs. If file links are supported, expose them. Do not answer only with raw JSON.

## Automatic page discovery and sampling

Use the actual homepage, `robots.txt`, available XML sitemaps, internal links, header/nav/footer and representative user journeys. Sample up to 25 pages, retaining the principal templates: homepage, primary sections, service/category listings, relevant detail templates, about, trust/FAQ, contact, pricing and conversion touchpoints. Editorial and ecommerce collections are **templates** (`/articles/:slug`, `/products/:slug`), not thousands of nodes. Restrict discovery to the canonical same origin; respect robots exclusions, throttle, ignore tracking/faceted URL permutations, skip login-required paths and do not submit forms or purchase anything.

## Business / marketing / CRO assessment

For each category, explicitly record what was seen, the implications, and actionable fixes:

- **Business model:** implied offer, target customers, problem solved, positioning, differentiation, business objective, conversion path, competitor context (only when grounded externally). Mark inferences as inferences.
- **Message clarity:** promise and primary CTA above fold, value proposition, hierarchy, proof, objections, benefits vs features, copy clarity, tone, friction, offers.
- **Conversion journey:** paths from landing to action; dead ends; distracting choice overload; form-field burden; pricing visibility; contact and checkout steps; reassurance, trust signals, social proof.
- **UX/UI:** information hierarchy, consistency, interaction affordances, readable contrast, tap targets, mobile menu, sticky UI, overlays, accessibility, responsive layouts and unnecessary complexity.
- **Content / SEO strategy:** search intent and page hierarchy, thin/repeated content, titles, descriptions, canonicals, indexation indications, link structure, schema, alt text, locality, editorial opportunities and topic clusters. Do not invent traffic or keyword volumes.
- **Reliability / trust:** broken routes, console/network problems when checked, clarity of policies, payment trust, forms, support accessibility and privacy disclosures. Do not claim a security audit or legal compliance without verification.

For each recommendation include: **priority (P0-P3), impact, effort, evidence URL, observed versus hypothesized, precise fix, how to validate**. Prioritize changes with high user/business impact and modest effort. Avoid subjective design claims without examples.

## Navigation deliverables

- **AS-IS**: actual links between sampled important routes, simplified to useful templates. Use the generated `navigation-as-is.mmd`, augment if browser evidence justifies. Document crawl gaps; do not mistake sampling for the complete crawl graph.
- **TO-BE**: an intentional, business-specific revised user journey. Use major nodes and CTA edges with optional annotation explaining *why*. Never present the generated generic starter diagram as the finished proposal.
- Distinguish global header navigation, footer links and principal conversion routes; highlight important orphan/dead-end templates supported by findings.
- Provide both Mermaid source diagrams in the report (or link them) and summarize proposed changes with priorities.

## Final report format

Use the generated `report.md` as the working document. Finish with:

1. Executive summary: business, audience, one primary strategic problem, top 3 opportunities.
2. Audit scope and evidence: date, origin, representative URLs, exclusions, desktop/mobile states, Lighthouse scores (lab only), gaps.
3. Business model and messaging analysis; marketing funnel and conversion diagnosis.
4. UX/UI and mobile assessment with concrete route-specific examples.
5. SEO technical/on-page/content review; web-quality findings mapped to upstream categories.
6. Navigation AS-IS Mermaid and page/template inventory.
7. Navigation TO-BE Mermaid and reasoning.
8. Prioritized backlog table (P0-P3; impact × effort; validation).
9. Quick wins / strategic investments / known unknowns and evidence confidence.

**Truth rules:** never fabricate Lighthouse scores, user analytics, conversion rate, SEO rankings, mobile issues or navigation links. When verification fails or a site blocks automation, state the blocker and still report observable evidence. No speculative changes to the audited website. If the site has no public pages, provide the diagnostic instead of a fake full audit.
