# Spec 01 — Homepage URL (Issue #1)

## Outcome

The repository “Website” link and README both point to the working live demo at `https://deepakv30.github.io/js-calculator/`, so visitors no longer hit a 404.

## Context

- Current repo homepage: `https://deepakv30.github.io/js-calc` (404).
- GitHub Pages is **not** enabled on `deepakv30/JS-Calculator`.
- Working demo already lives on the portfolio site: `https://deepakv30.github.io/js-calculator/`.
- Prefer **option 2** from the issue: keep the demo on the portfolio and update homepage + README (do not invent Pages setup unless trivial).

## Scope (In / Out)

**In**
- Patch repo `homepage` via GitHub API to `https://deepakv30.github.io/js-calculator/`.
- Add or update README with the chosen live URL and brief project description.

**Out**
- Enabling GitHub Pages on this repo.
- Migrating hosting off the portfolio.
- Full rewrite of calculator logic (see specs 02–03).

## Constraints

- HTTPS-only git/`gh` workflows.
- Do not push to `main`/`master`; feature branch + PR only.
- Do not invent non-trivial Pages configuration.

## Invariants

- **I1** Repo homepage URL equals `https://deepakv30.github.io/js-calculator/`.
  - Check: `gh api repos/deepakv30/JS-Calculator --jq .homepage`
- **I2** README documents the same live demo URL.
  - Check: `grep -F 'https://deepakv30.github.io/js-calculator/' README.md`
- **I3** Live demo URL returns HTTP 200 (portfolio already hosts it).
  - Check: `curl -sI https://deepakv30.github.io/js-calculator/ | head -1`

## Prior decisions

- **D1 (prefer option 2):** Point homepage at portfolio demo rather than enabling Pages on this repo for this PR.
- **D2:** Single public demo URL to reduce drift; portfolio sync of code changes is a separate optional PR.

## Task breakdown

1. `gh api -X PATCH repos/deepakv30/JS-Calculator -f homepage='https://deepakv30.github.io/js-calculator/'`
2. Create/update `README.md` with title, short description, live demo link, and local open instructions.
3. Verify invariants I1–I3.

## Acceptance criteria

- **Given** the repo homepage was a 404 URL, **When** this change is applied, **Then** `homepage` is `https://deepakv30.github.io/js-calculator/`.
- **Given** a visitor opens the README, **When** they follow the documented Website/Demo link, **Then** they reach a working calculator page (HTTP 200).
- **Given** Pages is not enabled on this repo, **When** the PR lands, **Then** no new Pages workflow/config was required.

## Implementation notes

- Use `gh api` to patch homepage (repo metadata is not in git).
- README may be newly created (repo currently has none).
- Mention in PR that portfolio `js-calculator/` remains the public host.
