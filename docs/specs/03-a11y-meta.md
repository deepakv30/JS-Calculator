# Spec 03 — Accessibility and meta (Issue #3)

## Outcome

The calculator page has unique (or removed) empty-button IDs, an ARIA live region for the display, aria-labels on symbol-only controls, and a clearer document title plus meta description.

## Context

- Two `<button class="empty" id="empty">` duplicates — invalid HTML.
- Output is a plain `#output-value` div with no live region.
- Operator symbols (`÷`, `×`, `-`, `+`, `%`, `=`) and `CE` may be unclear to assistive tech.
- No meta description; title is only “Basic Calculator”.

## Scope (In / Out)

**In**
- Fix duplicate empty IDs: unique IDs **or** remove IDs and mark decorative empties `disabled` + `aria-hidden="true"`.
- Add `role="status"` / `aria-live="polite"` (and optionally `aria-atomic="true"`) on the result/output region.
- Add concise `aria-label`s where visible text is symbolic (`CE`, divide, multiply, percent, equals, minus, plus, clear if helpful).
- Add `<meta name="description" …>` and improve `<title>`.

**Out**
- Full visual redesign / dark mode.
- Full WCAG audit beyond these basics.
- Keyboard roving tabindex overhaul (buttons are natively focusable).

## Constraints

- Keep visual layout unchanged (empty cells remain spacers).
- Do not break existing `getElementById` / class-based JS (operator/number handlers use `id` for digit/operator values — empty buttons must not steal operator/number behavior).

## Invariants

- **I1** No duplicate `id` attributes in `index.html`.
  - Check: extract all `id="..."` values; uniqueness.
- **I2** Result/output announces updates to AT.
  - Check: markup includes `aria-live="polite"` (and preferably `role="status"`) on result or output container.
- **I3** Symbol-only operator buttons have `aria-label`.
  - Check: `/`, `*`, `-`, `+`, `%`, `=`, `backspace` (CE), and `clear` as appropriate.
- **I4** Document head includes meta description and a descriptive title.
  - Check: `grep` title + meta description in `index.html`.

## Prior decisions

- **D1:** Prefer removing IDs from decorative empty buttons and setting `disabled` + `aria-hidden="true"` over inventing unused unique IDs.
- **D2:** Put `aria-live="polite"` and `role="status"` on `#output` (or `#result`) wrapping the values users care about.
- **D3:** Title like “JS Calculator — Basic four-function calculator”; meta description one sentence about the demo.

## Task breakdown

1. Update empty buttons: drop duplicate `id="empty"`, add `disabled aria-hidden="true"`.
2. Add live region attributes to output/result.
3. Add aria-labels on symbol/control buttons.
4. Update `<title>` and add meta description.
5. Smoke-check that number/operator click handlers still work (empty buttons not in those NodeLists meaningfully, or disabled).

## Acceptance criteria

- **Given** `index.html`, **When** validated for IDs, **Then** no two elements share the same `id`.
- **Given** a screen reader / accessibility tree, **When** the calculated value updates, **Then** the change is in a polite live region.
- **Given** focus on divide/multiply/CE/etc., **When** AT reads the control, **Then** a clear name is exposed via `aria-label` (not only a symbol glyph).
- **Given** page source `<head>`, **When** inspected, **Then** a meta description and improved title are present.

## Implementation notes

- Number buttons can keep numeric `id`s (used by JS).
- Operator buttons keep operator-char `id`s (`+`, `-`, `*`, `/`, `%`, `=`, `clear`, `backspace`).
- Empty spacers: `<button type="button" class="empty" disabled aria-hidden="true"></button>`.
- Optional: `aria-label` on `#result` as “Calculator display”.
