# Data Display

Use this reference for tables, lists, cards, stats, filters, search, pagination,
and visible data states.

## Choose the display

- Use a table when users compare records across consistent fields.
- Use a list when hierarchy, description, or supporting content matters more than columns.
- Use cards when records are independent objects with meaningful visual grouping.
- Use stats for a small set of decision-relevant summaries, not as decoration.
- Use list-detail when comparison and inspection happen repeatedly in one workflow.

Do not switch to cards merely because a viewport is narrow. Preserve the fields
needed for the task and choose a compact list or controlled horizontal table
when appropriate.

## Tables

- Put the identifying field first and actions last.
- Order columns by decision importance, not database order.
- Align text to the start and comparable numbers to the end.
- Use tabular numerals when digit alignment improves comparison.
- Keep headers concise and use tooltips or help text for uncommon terms.
- Keep row height consistent unless expanded content is an explicit interaction.
- Make selection, sorting, and clickable rows visually unambiguous.
- Avoid placing multiple competing buttons in every row; use a menu when suitable.

## Lists and cards

- Give every item one clear identifying element.
- Keep metadata order and action placement consistent.
- Use cards only when the boundary helps users understand or manipulate the item.
- Avoid repeating labels when position and formatting already communicate meaning.
- Do not mix unrelated card anatomies in the same collection.

## Search and filters

- Search should target the fields users reasonably expect.
- Keep frequent filters visible and move advanced filters behind a clear control.
- Show active filters and provide a direct way to clear them.
- Preserve query state in the URL when sharing, returning, or browser navigation matters.
- Debounce remote search and communicate loading without clearing useful results.
- Distinguish no data from no results after filtering.

## Sorting and pagination

- Indicate the active sort field and direction.
- Provide stable defaults tied to the task.
- Keep page size and pagination controls proportional to the data volume.
- Preserve selection only when its behavior across pages is explicit.
- Avoid infinite scrolling for operational data that requires position, totals, or return navigation.

## Visible states

### Loading

- Preserve the expected layout and avoid disruptive shifts.
- Use skeletons for stable shapes and progress indicators for indeterminate actions.
- Do not display empty-state messaging while data is still loading.

### Empty

- Explain what is absent and why it matters.
- Offer one relevant next action when the user can resolve the state.
- Keep first-use empty states distinct from filtered zero-results states.

### Error

- State what failed in user terms.
- Preserve data that remains valid.
- Offer retry or recovery when possible.
- Do not replace the whole page for a local row or panel failure.

### Stale and updating

- Keep existing data visible during background refresh when safe.
- Indicate saving or updating close to the affected surface.
- Prevent duplicate destructive or transactional submissions.

## Status and color

- Pair color with text, iconography, or shape.
- Use semantic tokens or existing badge variants.
- Reserve strong color for states that require attention.
- Keep neutral metadata visually quieter than primary information.

## Avoid

- Decorative charts without a decision they support.
- Excessive badges that make every value look equally important.
- Truncating the identifying field before secondary columns.
- Icon-only actions without accessible names.
- Hardcoded raw colors for status values.
