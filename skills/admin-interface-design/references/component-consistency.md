# Component Consistency

Use this reference when creating, migrating, unifying, or reviewing reusable
components and their demos.

## Comparison workflow

1. Render every affected demo, variant, and relevant state.
2. Identify the closest existing primitive or component with the same role.
3. Compare equivalent roles before comparing decorative details.
4. Determine whether each difference is intentional, required, or accidental.
5. Correct only accidental divergence within the approved scope.
6. Record the detected divergence and why it was considered inconsistent.

If an equivalent element looks uncomfortably different, do not normalize it
automatically. First determine whether it demonstrates a documented variant or
whether it is an accidental local override.

## Compare these properties

- overall height, width behavior, and size variants;
- internal padding and gaps;
- alignment and baseline behavior;
- typography, label weight, and text hierarchy;
- radius, border width, border color, and background;
- elevation and shadow usage;
- icon family, optical size, stroke, and placement;
- hover, focus-visible, active, selected, open, disabled, and invalid states;
- loading indicators and content shifts;
- responsive behavior and truncation;
- light and dark color modes.

## Component contracts

- Equivalent default controls should share compatible height and radius.
- Variants should change only the properties their names imply.
- Focus-visible treatment must remain perceivable and consistent.
- Disabled state must reduce affordance without making content illegible.
- Invalid state must be distinguishable without color alone.
- Icon-only controls need an accessible name and consistent hit target.
- Shared primitives should consume semantic tokens instead of theme-specific values.

## Demo consistency

- Use the established preview container, spacing, alignment, and background.
- Keep demo labels and descriptions at the same hierarchy.
- Do not add one-off presentation styling unless it is the behavior being demonstrated.
- Show a representative state without disguising the component's default contract.
- Keep source examples synchronized with the rendered demo.
- Preserve enough space for overlays, menus, tooltips, and expanded states.

## Deciding where to fix

- Fix the shared primitive when the mismatch is part of its public contract and affects consumers.
- Fix a composition when the primitive is correct but assembled inconsistently.
- Fix only the demo when its container or example introduces the divergence.
- Do not change a shared primitive to compensate for one malformed demo.
- Consider dependent components before changing a shared size, radius, or state style.

## Tokens and utilities

- Prefer semantic theme tokens and existing variants.
- Prefer existing spacing and size utilities over arbitrary values.
- Do not branch component code on the active theme.
- Do not copy Cobalt values into a component or demo.
- Ask before changing a global token to solve a local mismatch.

## Evidence

Record:

- routes or component demos reviewed;
- viewports and color modes;
- compared components or variants;
- the accidental divergence found;
- the contract or established pattern used to correct it;
- any intentional difference preserved.
