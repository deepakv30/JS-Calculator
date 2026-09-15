# Spec 01 — GitHub Pages + CI

## Outcome

`JS-Calculator` deploys its static site to GitHub Pages via Actions on every push to `master`, and pull requests / pushes run unit tests plus a cheap static sanity check so broken HTML/JS does not ship silently.

## Context

- Default branch: `master`.
- Static assets at repo root: `index.html`, `script.js`, `style.css`, `evaluate.js`.
- Unit tests: `node test/evaluate.test.js` (18 assertions).
- Pages was not enabled; prior homepage pointed at a 404 (`js-calc`) or the portfolio mirror.
- Target live URL after Pages enable: `https://deepakv30.github.io/JS-Calculator/` (repo-name casing).

## Scope (In / Out)

**In**
- `docs/specs/` index entry for this delivery.
- `.github/workflows/ci.yml` (PR + push to `master`).
- `.github/workflows/pages.yml` (Actions-based Pages deploy).
- README live URL, CI, and Pages deploy notes.
- Enable Pages (`build_type=workflow`) and set repo homepage when API permits.

**Out**
- Legacy branch-based Pages (`gh-pages` / `/docs` branch source).
- Merging this PR (leave for human when CI is green).
- Changing calculator math or a11y behavior (covered by earlier specs).

## Constraints

- HTTPS-only clone/push/`gh`.
- Never push directly to `master`; feature branch + PR only.
- Author commits as `DeepakV <deepakv.knit@gmail.com>`.
- Use current action majors: `actions/checkout@v4`, `actions/setup-node@v4`, `actions/upload-pages-artifact@v3`, `actions/deploy-pages@v4`.
- Prefer copying only site files into `_site/` for the Pages artifact.

## Invariants

- **I1** CI workflow exists and runs tests + static sanity on PR/push to `master`.
  - Check: `test -f .github/workflows/ci.yml && grep -q evaluate.test.js .github/workflows/ci.yml`
- **I2** Pages workflow deploys via Actions (not legacy branch source).
  - Check: `grep -q deploy-pages@v4 .github/workflows/pages.yml && grep -q upload-pages-artifact@v3 .github/workflows/pages.yml`
- **I3** README documents `https://deepakv30.github.io/JS-Calculator/`.
  - Check: `grep -F 'https://deepakv30.github.io/JS-Calculator/' README.md`
- **I4** Artifact payload contains the four static site files and excludes `.git`.
  - Check: workflow copies `index.html`, `*.js` (site), `*.css` into `_site/` before upload.

## Prior decisions

- **D1:** Host from this repo via Actions Pages (supersedes earlier “portfolio-only homepage” preference for the public Website link).
- **D2:** Upload a curated `_site/` directory rather than the whole checkout (keeps `docs/`, `test/`, workflows out of the published root).
- **D3:** Re-run unit tests in the Pages `build` job as an extra gate before artifact upload.
- **D4:** Concurrency group `pages` with `cancel-in-progress: false` so an in-flight production deploy is not cancelled.

## Task breakdown

1. Add this spec and update `docs/specs/README.md`.
2. Add `ci.yml` (checkout, Node LTS, unit tests, static sanity).
3. Add `pages.yml` (build → `_site/` → upload-pages-artifact → deploy-pages).
4. Update README with correct Pages URL and CI/Pages notes.
5. Push branch `chore/github-pages-ci`, open PR (do not merge).
6. Enable Pages (`build_type=workflow`) and set homepage via `gh`; if 403, document Settings clicks.

## Acceptance criteria

- **Given** a pull request against `master`, **When** CI runs, **Then** `node test/evaluate.test.js` passes and static sanity confirms `index.html` exists and `script.js` references `evaluate`.
- **Given** a push to `master` after merge, **When** `pages.yml` completes, **Then** the site is served at `https://deepakv30.github.io/JS-Calculator/`.
- **Given** the repo Website field is updated, **When** a visitor opens the repo page, **Then** homepage is `https://deepakv30.github.io/JS-Calculator/`.
- **Given** Pages is configured for Actions, **When** Settings → Pages is inspected, **Then** source is GitHub Actions (not a branch).

## Implementation notes

- `ci.yml` triggers: `pull_request` and `push` to `master`.
- `pages.yml` triggers: `push` to `master` and `workflow_dispatch`.
- Permissions on Pages workflow: `contents: read`, `pages: write`, `id-token: write`.
- Deploy job `environment: github-pages`; use `actions/deploy-pages@v4`.
- Site copy example: `mkdir -p _site && cp index.html style.css script.js evaluate.js _site/`.
- Enabling Pages via API may require `pages` admin scope; document manual path on 403.
