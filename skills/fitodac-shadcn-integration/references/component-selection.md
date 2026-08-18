# Component Selection

## Source locations

Use the current `fitodac-shadcn` repository as source of truth. Relevant sources normally include:

- `src/registry/blocks/` for composed application patterns;
- `src/registry/components/` for reusable higher-level components;
- `src/registry/primitives/` for low-level UI primitives;
- demo/catalog pages for intended composition, states, and usage.

## Decision rule

For an admin request such as “show these records in a table”:

1. inspect the consuming app for an adequate existing table/list pattern;
2. inspect Fitodac blocks or demos that solve the same information problem;
3. inspect the relevant Fitodac component;
4. inspect required primitives and dependencies;
5. copy only what the consuming app needs and adapt imports/data wiring locally.

Prefer adapting a complete established pattern over assembling unrelated primitives when both satisfy the requirement.

## Copy ownership

After copying, the consuming app owns the code. Preserve its local conventions, aliases, dependency versions, accessibility behavior, tests, and business logic.

Do not silently replace an existing local component just because Fitodac has a newer or different implementation. Treat replacement as an explicit migration.

## Verification

For copied/adapted UI verify:

- required states: loading, empty, error, disabled, validation, and permissions where relevant;
- keyboard and accessible interaction behavior;
- responsive behavior required by the consuming app;
- semantic theme tokens rather than theme-specific literal colors;
- no new dependency when an existing project dependency or primitive already satisfies the need.
