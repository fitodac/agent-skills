---
name: website-client-report
description: Turn a website strategy audit and its evidence into a concise, client-ready preliminary assessment for a potential redesign contract. Explain current strengths, concrete improvement opportunities, the actual work involved, visual AS-IS/TO-BE navigation, priorities and next steps without giving away a full specification or inventing scope. Use after website-strategy-audit or when preparing a complimentary client-facing website diagnosis.
license: MIT
metadata:
  author: fitodac
  version: "1.0.0"
---

# Website Client Report

## Purpose

Transform an existing website audit into a **professional, clear, evidence-based preliminary client report** that can open or advance a redesign conversation.

The report is an initial, complimentary consulting deliverable, **not** a technical implementation plan, a finished redesign, or a sales brochure. Demonstrate that the site was understood, educate the client about the real work behind a redesign, and make the eventual scope and budget easier to evaluate fairly. Do not manufacture urgency, inflate effort, or frame every observation as a defect.

**Complementarity:** `website-strategy-audit` discovers and evaluates the site; `website-client-report` selects, validates and communicates findings to a nontechnical decision-maker. Do not repeat a full technical crawl when current, adequate audit evidence exists.

## Inputs and scope of work

Preferred inputs (use all available, without requiring all of them):

- Prior audit `report.md`, `evidence.json`, `page-inventory.csv`, relevant URLs and screenshots.
- **Latest verified** `navigation-as-is.mmd` and `navigation-to-be-proposal.mmd`, including subsequent corrected revisions.
- Client request and known constraints: CMS, redesign goals, existing content, stakeholders, intended audience, language.
- Optional brand material and business goals, when provided.

When the client scope is already known, **honor it exactly**. For example, if the client wants a visual/UX redesign and modernization while keeping WordPress, assume the existing CMS and published content remain in place:

- **Do not propose a CMS switch, content migration, database migration or rebuilding an editorial archive as default work.**
- Do not represent category counts or a large historical archive as proof of migration cost.
- Content *presentation*, templates, navigation, responsive behavior, CMS editing ergonomics, forms and SEO preservation may require work. Describe each only where supported by evidence or the client's requirements.
- Suggest content restructuring, manual rewriting, taxonomic changes, custom post types, major plugin changes or migrations **only when needed and explicitly framed as optional recommendations requiring approval**, not as commitments or included deliverables.
- Existing URLs should be preserved where feasible; redirects matter only when routes will actually change.
- Distinguish **current scope**, **recommended optional enhancements**, and **items requiring discovery**.

If the client brief differs, adapt these rules to it instead of assuming WordPress or a nonprofit site. Do not demand further details before producing an initial report: use known facts, explicitly label assumptions and unresolved decisions.

## Evidence workflow

1. Read the brief and latest audit artifacts; prefer corrected, most-recent navigation diagrams over older drafts. If source artifacts are unavailable, inspect the public pages using appropriate tools; otherwise mark gaps. Do not invent an audit or imply tools were executed.
2. Construct a private evidence ledger for each important claim: finding, affected URL/page, observation, user impact, confidence, suggested treatment, and scope status.
3. **Separate verified fact from recommendation or hypothesis.** An untested form or merely visible shortcode does not prove a submission flow fails; describe exactly what was observed and what still needs testing.
4. Check that inventory quantities, page counts and category counts have a reliable basis. Categories may overlap; never sum category counts as a unique article total. Qualify estimates and distinguish inventory from actual project scope.
5. Verify navigation by **actual visual and functional hierarchy**, not just DOM order or the first menu found. Distinguish utility/top navigation, visually dominant/main navigation, submenu items, footer, and content links. Reflect them consistently in AS-IS and TO-BE. Mark unverified links.
6. Cite concrete example URLs or source evidence for material claims. If evidence is old, sampled or partial, disclose this without overwhelming the client.
7. Reuse Lighthouse/mobile/accessibility/SEO metrics only if they were actually measured. Label lab vs field data; do not assign fabricated scores or compliance claims.
8. If relevant evidence is contradictory, avoid publishing a definitive assertion until reconciled; mark the issue as pending verification.

## Client-facing writing standards

- Write in the requested language; otherwise match the client and brief. For an Argentine consultant addressing a Paraguayan institution, use neutral professional Spanish rather than slang.
- Tone: consultative, precise, respectful, accessible, and constructive; acknowledge strengths as well as shortcomings.
- Replace implementation jargon with **what happens today → why it matters → proposed improvement → expected benefit**.
- No inflated words ('critical', 'broken', 'obsolete') without evidence and proportional impact.
- Explain workload through **specific, relevant workstreams**; do not pad scope to justify price.
- The free report is an invitation to align priorities, **not a fully specified UX design, wireframe pack, technical architecture, quote, or implementation backlog**.
- Avoid including internal comments on client psychology, sales tactics, margin, negotiation, or conversion strategy in the deliverable.
- Do not promise SEO growth, speed gains, traffic, conversion uplift or legal compliance.
- Do not include an estimate, price or timeline unless explicitly requested and adequately grounded.
- Keep the main report concise (target 5–8 readable pages when rendered); use an appendix for long inventories, URLs and technical notes.

## Required report structure

Use a client-ready title such as **"Diagnóstico preliminar y oportunidades de mejora — [organización]"**, not "Full technical audit" or "Website is outdated".

1. **Cover / context:** organization, website, assessment date, preliminary/public-site scope, and short introduction establishing what the report does and does not cover.
2. **Executive summary:** what the site is for, most valuable strengths, key opportunity, and 2–4 practical recommendations. Make it useful to a nontechnical director.
3. **Current site overview:** map its major sections and actual navigation levels; present inventory totals **only if verified** and explain why continuity/preservation matters. Avoid dumping every category on the main page.
4. **Strengths to preserve:** institutional identity, valuable content, familiar admin workflow, helpful features, etc., solely as evidenced.
5. **Opportunities for improvement:** 4–7 priority findings. For each include:
   - clear title and priority,
   - **observed state** with example URL/evidence,
   - **effect on visitors or editors** (reasoned, not fictional analytics),
   - **recommended improvement**,
   - expected practical benefit,
   - note if verification or client decision remains open.
6. **Information architecture — current and proposed:** concise AS-IS and TO-BE diagrams or equivalent visuals that include **all visible important navigation groups** and their hierarchy. When current and proposed diagrams are supplied, retain their evidence and consistency, simplify only their presentation. Explicitly label TO-BE as a proposal subject to validation.
7. **What the redesign involves:** client-understandable workstreams tied to findings (e.g. discovery/alignment, UX and visual design, responsive WordPress theme/templates, navigation, CMS editing experience, regression/functional tests and launch). Differentiate in-scope vs optional vs to-be-confirmed; **no unrequested content migration**.
8. **Suggested phases and priorities:** brief phased roadmap with outcomes and decision gates, not an exhaustive technical task list.
9. **Next step:** propose a scoping meeting to confirm goals, priorities, constraints and access needed before preparing a separate proposal with deliverables, schedule and price.
10. **Brief methodology and limitations:** sampled routes, date, reliance on public evidence, checks not performed; a focused appendix only if useful.

If there are too few findings, use fewer sections and avoid filler. If the client already has explicit scope, describe recommendations as adjustments **within that scope** and identify out-of-scope opportunities separately.

## AS-IS / TO-BE requirements

- AS-IS is an observed representation, not a design opinion. Distinguish a secondary top menu from a visually dominant primary menu if both exist.
- TO-BE should address a named discoverability or user-journey problem. Its menu levels must be comparable to the AS-IS, while changes are labeled as proposals.
- Do not silently omit navigation groups, pages, directories, calls to action, or footer sections required for the client to understand the change.
- Prefer high-level diagrams legible in a document; attach full Mermaid source files as supporting artifacts if available.
- If source diagrams disagree with current verified public navigation, correct or flag them before publishing.

## Deliverables

Produce:

1. **`client-report.md`** — polished main client-facing report with inline evidence examples and a concise scope/limitations statement.
2. Reuse or create **`navigation-as-is-client.mmd`** and **`navigation-to-be-client.mmd`** when diagrams are justified and available. These are simplified, legible counterparts, not invented maps.
3. Optional **`client-report-appendix.md`** only when a genuinely useful technical inventory does not belong in the main report.

Render to PDF/DOCX only if requested or if the working environment and delivery request make this appropriate; inspect the rendered document for readability. In a chat supporting an editable text artifact, provide a complete editable draft when requested.

Do **not** create a budget or proposal document automatically. Keep evidence-based diagnosis separate from the later commercial proposal.

## Final quality gate

Before delivery, verify all:

- [ ] Exact client brief preserved, particularly CMS and **no migration if none is requested**.
- [ ] No speculative work falsely presented as necessary or included.
- [ ] Every key finding has evidence or an explicit qualification.
- [ ] Article counts are not double-counted or used to imply manual re-entry.
- [ ] Both visual navigation levels reflected when the site has two menus.
- [ ] AS-IS is factual; TO-BE clearly identified as a proposal.
- [ ] Benefits are reasonable; no invented quantitative outcomes, scores or QA passes.
- [ ] Nontechnical language, readable report length, actionable priorities.
- [ ] A respectful request for a scope-alignment conversation closes the document.
- [ ] Clear boundary between complimentary diagnosis and future paid implementation.

**Success criterion:** the client understands what can be improved, why it matters, which workstreams are relevant to the *actual requested redesign*, and what remains to be agreed before receiving a justified, separate budget.
