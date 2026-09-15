# JS-Calculator — Spec index (AI-Native SDD)

Specs for this repository. Implement to satisfy each file’s **Acceptance criteria** and **Invariants**.

| Spec | Outcome |
|------|---------|
| [01-github-pages-ci.md](./01-github-pages-ci.md) | GitHub Pages via Actions + CI (unit tests + static sanity) |
| [01-homepage-url.md](./01-homepage-url.md) | (Historical) Repo homepage + README pointed at portfolio demo |
| [02-safe-evaluator.md](./02-safe-evaluator.md) | Replace `eval()` with a safe expression evaluator |
| [03-a11y-meta.md](./03-a11y-meta.md) | Fix duplicate IDs, live region, aria-labels, meta/title |

## Delivery order (Pages + CI)

1. Write/commit this Pages/CI spec and refresh the index.
2. Add `ci.yml` and `pages.yml`.
3. Point README at `https://deepakv30.github.io/JS-Calculator/`.
4. Open PR on `chore/github-pages-ci` (do not merge until CI is green).
5. Enable Pages (`build_type=workflow`) and set repo homepage.
