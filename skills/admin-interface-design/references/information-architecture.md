# Information Architecture

Use this reference for navigation, hierarchy, page structure, and layout in
administrative interfaces.

## Start from the task

- Define the user's primary task before choosing a layout.
- Make the page title and primary action describe the current working context.
- Keep supporting information subordinate to the task.
- Preserve context when users move between a collection and one record.

## Page hierarchy

Use this order when applicable:

1. Global or product navigation.
2. Section context, including breadcrumbs when hierarchy is not otherwise clear.
3. Page title, concise description, and primary action.
4. Search, filters, tabs, or view controls.
5. Main working surface.
6. Secondary detail, help, or metadata.

Do not add every layer automatically. Remove layers that repeat the same context.

## Navigation

- Keep destinations, names, icons, and order stable across related screens.
- Use the sidebar for durable top-level areas, not row-level actions.
- Use tabs for peer views within one context, not unrelated destinations.
- Use breadcrumbs when the parent-child path aids orientation or return navigation.
- Keep the current location visually distinct without relying only on color.
- Do not duplicate global navigation inside individual pages.

## Layout selection

- Use a single-column flow for focused tasks and most forms.
- Use a list-detail layout when users repeatedly compare records and inspect one.
- Use two columns only when the secondary region remains useful during the task.
- Use drawers or dialogs for bounded work that does not require a durable URL.
- Use a full page for complex creation, editing, or multi-section workflows.

## Density and grouping

- Match density to frequency and volume: daily operational tools can be compact.
- Group by meaning, not merely to create visual boxes.
- Prefer headings, spacing, and separators before adding another card.
- Keep related labels, values, and actions close enough to scan as one unit.
- Avoid large empty areas that push operational information below the fold.

## Action placement

- Place the page's primary action near the title or the main working surface.
- Keep row actions consistently located, usually at the row end.
- Keep bulk actions close to selection state and reveal them only when relevant.
- Put persistent form actions in a predictable footer or final action row.
- Separate destructive actions from routine actions.

## Responsive behavior

- Preserve task order and meaning when columns collapse.
- Keep the primary action discoverable on narrow screens.
- Convert secondary navigation deliberately; do not merely hide it.
- Avoid horizontal scrolling for an entire page.
- Allow data regions to scroll only when simplification would remove essential data.

## Avoid

- Competing primary actions.
- Breadcrumbs that repeat the page title without adding context.
- Cards nested inside cards without a meaningful hierarchy.
- Sidebars that contain temporary controls or record-specific actions.
- Different layouts for equivalent CRUD pages without a functional reason.
