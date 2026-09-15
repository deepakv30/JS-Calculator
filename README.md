# JS Calculator

A basic four-function JavaScript calculator (add, subtract, multiply, divide, modulo) built with plain HTML, CSS, and JS.

## Live demo

**Website:** [https://deepakv30.github.io/JS-Calculator/](https://deepakv30.github.io/JS-Calculator/)

GitHub Pages deploys this repository from **GitHub Actions** on every push to `master` (see [`.github/workflows/pages.yml`](.github/workflows/pages.yml)). You can also trigger a deploy manually via **Actions → Deploy GitHub Pages → Run workflow**.

## Features

- Safe expression evaluation (no `eval` / `new Function`)
- Operator precedence for `+ - * / %`
- Basic accessibility: ARIA live region for the display, labeled symbol buttons, unique markup

## Run locally

Open `index.html` in a browser, or serve the folder with any static file server.

## Tests

```bash
node test/evaluate.test.js
```

## CI

Pull requests and pushes to `master` run [`.github/workflows/ci.yml`](.github/workflows/ci.yml):

1. Checkout + Node.js LTS
2. `node test/evaluate.test.js` (18 assertions)
3. Static sanity (`index.html` / site JS/CSS present; `script.js` references the evaluator)

## Specs

AI-native SDD specs live under [`docs/specs/`](docs/specs/).
