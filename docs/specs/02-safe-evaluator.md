# Spec 02 — Safe expression evaluator (Issue #2)

## Outcome

Calculator results are computed without `eval` or `new Function`, using a small safe parser that supports `+ - * / %` with correct precedence, rejects unexpected characters, and handles divide-by-zero gracefully.

## Context

- `script.js` currently uses `eval(history + output)` (~line 53).
- `eval` on DOM-derived strings is an XSS footgun and a poor portfolio signal.
- UI should keep the same button-driven flow (history + output concatenation then evaluate on `=`).

## Scope (In / Out)

**In**
- Pure JS evaluator (no `eval`, no `Function` constructor).
- Operators: `+`, `-`, `*`, `/`, `%` with standard precedence (`*` `/` `%` over `+` `-`); left-associative.
- Reject any character outside digits, optional decimal point, and the five operators (and whitespace if trimmed).
- Divide-by-zero: return a clear error state (e.g. display `Error` / empty result path) without throwing uncaught.
- Tiny automated test (Node script) for the evaluator if feasible.

**Out**
- Parentheses, unary minus as first-class feature beyond simple leading `-` if not already needed by UI.
- Scientific functions, exponents, constants.
- Framework migration.

## Constraints

- No `eval`, no `new Function`, no dynamic code execution APIs.
- Keep UI behavior identical for valid expressions the current buttons can produce.
- Browser ES5-friendly enough for this simple static page (or plain modern JS without build step).

## Invariants

- **I1** Source contains no `eval(` and no `new Function`.
  - Check: `rg -n 'eval\(|new Function' script.js` returns no matches in production paths.
- **I2** Evaluator accepts only safe tokens (numbers + `+-*/%`).
  - Check: unit tests reject strings with letters/`(`/`;` etc.
- **I3** Precedence: `2+3*4` → `14`; `10-4/2` → `8`; `10%3` → `1`.
  - Check: Node test script asserts these.
- **I4** Divide-by-zero does not crash the page.
  - Check: `1/0` and `5%0` yield error sentinel / display Error, not exception.
- **I5** Valid button-built expressions still compute (e.g. `12+3` → `15`).
  - Check: unit + manual click path.

## Prior decisions

- **D1:** Prefer a small shunting-yard or recursive-descent / two-pass (tokenize → reduce) evaluator over pulling a library.
- **D2:** Export evaluator as a named function usable from both browser script and Node test (`evaluateExpression(expr)`).
- **D3:** On invalid input or divide-by-zero, surface `Error` in the output display and clear history (same spirit as failing safely).

## Task breakdown

1. Implement `evaluateExpression(expr)` in `script.js` (or shared module pattern with Node-loadable export).
2. Replace `eval(history + output)` call site with the safe evaluator + error handling.
3. Add `test/evaluate.test.js` (or `scripts/test-evaluator.js`) runnable via `node`.
4. Document manual UI cases in PR if needed.

## Acceptance criteria

- **Given** a user enters `2+3*4` via the UI (or evaluator API), **When** they press `=`, **Then** the result is `14` without using `eval`.
- **Given** an expression containing disallowed characters (e.g. `alert(1)`), **When** evaluated, **Then** the evaluator rejects it and the UI shows an error state.
- **Given** `8/0`, **When** evaluated, **Then** the UI shows an error (no uncaught exception).
- **Given** the codebase after the change, **When** searched for `eval(` / `new Function`, **Then** none remain in calculator logic.
- **Given** the Node test script, **When** run with `node`, **Then** all assertions pass.

## Implementation notes

- Tokenize: scan digits/`.` into numbers; single-char operators.
- Precedence map: `+`/`-` = 1; `*`/`/`/`%` = 2.
- Shunting-yard → RPN evaluate is fine; avoid floats surprises where possible but Number is OK for this demo.
- For Node tests without DOM: factor pure function; browser file can attach to `window` or use identical function in one file loaded by test via `vm`/`require` pattern — simplest: put pure function in `evaluate.js` and load from both, **or** keep in `script.js` and extract with a tiny dual-env export. Prefer `evaluate.js` + script include for clarity.
- UI still concatenates history+output then calls evaluator on `=`.
