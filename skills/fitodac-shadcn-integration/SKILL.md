---
name: fitodac-shadcn-integration
description: Use when implementing, changing, or reviewing application/admin UI in a project that consumes fitodac-shadcn, when an active Fitodac theme is declared, or when a Fitodac primitive, component, block, layout, or theme is named as the design source.
---

# Fitodac-shadcn Integration

Treat `fitodac-shadcn` as a design/component source that consuming applications copy and adapt. Do not introduce a runtime package, registry client, sync command, or repository dependency unless the consuming project explicitly requires one.

## Required context

Before changing admin/application UI:

1. Read the consuming app's UI/theme configuration and identify the active Fitodac theme.
2. Inspect the app's existing implementation for the same workflow or interaction.
3. Inspect the relevant Fitodac source on `next-multipurpose/fitodac-shadcn`.
4. Read only the references below that apply to the task.

**REQUIRED SUB-SKILL:** Use `admin-interface-design` for admin information hierarchy and visual judgment when available.

## Selection order

Preserve an adequate existing app pattern first. When a new or replacement UI pattern is needed, search Fitodac in this order:

1. blocks/layout patterns;
2. components;
3. primitives;
4. shadcn/ui composition;
5. new implementation only when the prior levels do not satisfy the requirement.

Do not recreate a Fitodac pattern from memory when its current source can be inspected.

## Admin theme contract

- The consuming app selects the theme; Fitodac components do not select it.
- Admin components use semantic tokens such as `bg-primary`, `text-muted-foreground`, and `border-border`.
- Never hardcode Cobalt-specific or other theme-specific colors into reusable components.
- App/client overrides remain separate from the copied Fitodac theme source.
- Do not modify theme tokens to solve a local component problem unless the task explicitly changes the theme.

## Public website boundary

Fitodac primitives/components may be reused as source for public website UI, but the admin theme and admin design language do not follow them. Adapt the copied component to the website's active design system and website-specific skills. Do not apply the app's Fitodac admin theme to public routes unless explicitly required.

## References

- `references/component-selection.md` — finding, copying, and adapting Fitodac UI.
- `references/theme-contract.md` — theme source, app overrides, admin scope, and public boundary.
