# JS-Calculator — Spec index (AI-Native SDD)

Specs driving the `fix/js-calc-safe-a11y-homepage` delivery. Implement to satisfy each file’s **Acceptance criteria** and **Invariants**.

| Spec | Issue | Outcome |
|------|-------|---------|
| [01-homepage-url.md](./01-homepage-url.md) | #1 | Repo homepage + README point at the live portfolio demo URL |
| [02-safe-evaluator.md](./02-safe-evaluator.md) | #2 | Replace `eval()` with a safe expression evaluator |
| [03-a11y-meta.md](./03-a11y-meta.md) | #3 | Fix duplicate IDs, live region, aria-labels, meta/title |

## Delivery order

1. Write/commit specs (this folder).
2. Implement homepage URL + README.
3. Implement safe evaluator (+ tiny Node test).
4. Implement a11y/meta HTML changes.
5. Open one PR closing #1–#3; portfolio mirror sync is optional follow-up if separate PR is too heavy.
