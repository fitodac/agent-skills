# Forms and Actions

Use this reference for creation, editing, validation, submission, destructive
actions, and CRUD feedback.

## Form structure

- Order fields according to the user's task, not the storage schema.
- Put common required fields before optional or advanced settings.
- Group fields only when the group has a clear meaning.
- Use section headings for long forms and avoid decorative containers around every group.
- Keep labels visible; placeholders are examples or hints, not label replacements.
- Place help text and errors next to the field they explain.

## Control selection

- Use the simplest control that represents the value correctly.
- Use checkboxes for independent choices and radios for one visible choice among few options.
- Use a select or combobox when options are numerous, searchable, or remotely loaded.
- Use switches for immediate boolean settings, not for submitting an entire form.
- Use date and time controls that match locale, precision, and scheduling needs.
- Preserve keyboard behavior and accessible names from the underlying primitive.

## Create and edit flows

- Reuse field order, labels, validation, and action placement between create and edit.
- Make immutable values clearly read-only rather than silently disabled without explanation.
- Show the record identity and unsaved-change context during editing.
- Use a full page when the workflow is complex, linkable, or spans sections.
- Use a dialog or drawer only for bounded tasks that can be completed without losing context.

## Validation

- Validate at the earliest useful moment without interrupting normal input.
- Explain how to correct the value, not only that it is invalid.
- Keep server errors when they contain information unavailable to client validation.
- Move focus to the first invalid field after a failed submit when appropriate.
- Preserve entered values after validation or network errors.
- Do not use color as the only error indicator.

## Action hierarchy

- Give each surface one clear primary action.
- Style secondary actions more quietly and keep them near the primary action when related.
- Use links for navigation and buttons for actions.
- Label actions with specific verbs such as `Save changes`, `Create store`, or `Archive`.
- Keep destructive actions separated from routine actions.
- Disable submission only when necessary and communicate in-progress state.

## Destructive actions

- Require confirmation when the result is difficult to reverse or affects shared data.
- Name the target and consequence in the confirmation.
- Prefer archive, deactivate, or trash when the domain supports recovery.
- Do not use a generic confirmation for materially different consequences.
- Restore focus appropriately after cancellation or completion.

## Submission feedback

- Show progress near the action that started it.
- Prevent duplicate submission while a request is pending.
- On success, keep the user in the most useful next context.
- Use inline confirmation when the result is local and a toast when confirmation must survive navigation.
- Explain partial success or recovery steps when an operation is not atomic.

## Permission and disabled states

- Hide actions the user should never discover only when product policy requires it.
- Otherwise show unavailable actions with a concise reason when that helps understanding.
- Distinguish read-only data from temporarily disabled controls.
- Never rely on frontend state as authorization.

## Avoid

- Resetting the form after a failed submit.
- Multiple primary-colored buttons in one action group.
- Destructive actions next to the primary save action without separation.
- Long forms inside small dialogs.
- Generic labels such as `Submit` when a precise action name is available.
