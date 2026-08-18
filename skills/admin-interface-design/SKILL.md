---
name: admin-interface-design
description: Design and review sober, consistent administrative interfaces and reusable component demos for dashboards, CRUDs, tables, forms, filters, navigation, data display, and information-management workflows. Use when planning, implementing, unifying, or visually reviewing admin panels or UI components intended for them.
---

# Admin Interface Design

Design administrative interfaces as predictable working tools.

Prioritize, in order:

1. task completion;
2. information hierarchy;
3. readability and scanning;
4. consistency and learnability;
5. efficient daily use;
6. restrained visual presentation.

## Workflow

1. Identify the user's primary task and relevant states.
2. Inspect comparable screens, components, demos, and variants.
3. Inspect the active theme and shared primitives.
4. Distinguish intentional variants from accidental inconsistencies.
5. Choose the most conservative existing pattern that satisfies the task.
6. Implement or review rendered behavior, not only source code.

## Source of truth

Apply visual decisions in this order:

1. Active theme semantic tokens.
2. Existing shared primitives and variants.
3. Comparable project components.
4. shadcn/ui composition patterns.
5. This skill's interface-design guidance.

Do not hardcode Cobalt-specific or brand-specific values into components.

## Boundaries

- Preserve accessibility, responsive behavior, keyboard interaction, and scope.
- Do not redesign outside the requested surface.
- Ask before changing global theme tokens, brand identity, global typography,
  component anatomy, shared interaction patterns, or production dependencies.
- Do not invent a component when an existing primitive or composition is adequate.
- Do not use arbitrary values when semantic tokens express the decision.
- Do not make every data group a card.

## References

Read only the references relevant to the task:

- `references/information-architecture.md` for navigation, hierarchy, and layout.
- `references/data-display.md` for tables, lists, cards, stats, and data states.
- `references/forms-and-actions.md` for forms, actions, and CRUD flows.
- `references/component-consistency.md` for component and demo unification.
- `references/ui-review-checklist.md` for rendered visual review.
