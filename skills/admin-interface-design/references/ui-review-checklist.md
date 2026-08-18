# UI Review Checklist

Use this reference when reviewing rendered administrative UI. Compilation,
tests, or source inspection alone are insufficient evidence.

## Review setup

- Read the active spec, its `UI Profile`, and the implementation report.
- Load the profile's required skills.
- Identify all affected routes, screens, components, states, and shared consumers.
- Start the application using the project workflow.
- Use the configured browser tooling and capture runtime errors.

## Required viewports and modes

- Review at least one representative desktop viewport.
- Review at least one mobile viewport when the surface is responsive.
- Review light and dark color modes when both are supported.
- Add intermediate widths when navigation, tables, grids, or forms change structure.

## Hierarchy and layout

- The primary task and action are immediately understandable.
- Titles, descriptions, navigation, filters, and content follow a clear order.
- Alignment, spacing, and density match comparable project surfaces.
- Responsive changes preserve meaning and task order.
- Content does not overflow, clip, or create page-level horizontal scroll unexpectedly.

## Components and states

- Equivalent controls follow compatible size, radius, typography, and state contracts.
- Hover, focus-visible, active, selected, open, disabled, and invalid states work when relevant.
- Loading, empty, error, success, and permission states are present when required.
- Overlays have correct stacking, focus behavior, escape behavior, and available space.
- Icons have consistent style, optical size, placement, and accessible names.

## Data and forms

- Tables and lists remain scannable and prioritize identifying information.
- Sorting, filtering, pagination, selection, and row actions are unambiguous.
- Labels, help, validation, and errors remain associated with their fields.
- Primary, secondary, and destructive actions are differentiated and consistently placed.
- Pending submissions prevent accidental duplication and provide feedback.

## Theme and accessibility

- Components use semantic tokens and remain legible in each supported mode.
- Focus is visible and keyboard order follows the visual workflow.
- Meaning does not depend on color alone.
- Text and controls are not made unreadably small to fit more content.
- Reduced-motion behavior is respected when motion is present.

## Regression comparison

- Compare the changed surface with its closest equivalents.
- Inspect shared consumers when a primitive or global composition changed.
- Distinguish intentional variants from accidental divergence.
- Reject undocumented inconsistencies; do not request an unrelated redesign.

## Evidence to record

- Reviewed routes, screens, and component demos.
- Viewport dimensions and color modes.
- States and interactions exercised.
- Browser console or page errors.
- Before-and-after screenshots when useful.
- Concrete divergences, their locations, and the expected established pattern.

## Approval rule

Approve only when rendered evidence covers the spec's acceptance criteria and
no unexplained regression remains. If browser review is unavailable, document
the exact blocker and do not approve solely from compilation or source code.
