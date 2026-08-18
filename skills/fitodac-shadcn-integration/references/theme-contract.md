# Theme Contract

## Responsibilities

Keep three responsibilities separate:

1. **Fitodac theme source** — defines the preset semantic tokens and theme-level CSS.
2. **Consuming app configuration** — selects the active admin theme and stores client/app overrides with the app's other tracked configuration such as identity and assets.
3. **Components** — consume semantic tokens and remain independent of Cobalt or any future theme name.

A consuming app may copy a theme source locally. Replacing that copy with a newer compatible Fitodac theme must allow newly added tokens and theme CSS to flow into the app without editing individual components.

## Overrides

App/client overrides win over the copied preset. Override only tokens intentionally owned by the app/client; leave the rest to the Fitodac theme so upstream theme improvements can propagate when the source is recopied.

Theme-specific values belong in the theme/config layer, never in reusable component source.

## Admin scope

The Fitodac theme applies only to the administrative/application shell selected by the consuming app. Ensure portalled UI such as dialogs, popovers, selects, and tooltips resolves the same admin semantic variables.

Do not use a global Cobalt `:root` layer when the same application also serves a public website that should have independent styling.

## Public website

Public website UI may copy a Fitodac primitive or component for behavior/anatomy. Once copied for the website, adapt it to that website's tokens and design rules. Fitodac admin blocks, density rules, and the active admin theme are not design authority for public pages.

## Theme changes

When the user requests a theme update:

1. inspect the current Fitodac theme source;
2. update/copy the theme source, not individual consuming components;
3. preserve consuming-app overrides;
4. regenerate the app's compiled theme output when the app uses build-time generation;
5. verify admin scope and confirm public routes did not inherit the admin theme.
