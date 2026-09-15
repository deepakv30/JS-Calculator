# JS Calculator

A basic four-function JavaScript calculator (add, subtract, multiply, divide, modulo) built with plain HTML, CSS, and JS.

## Live demo

**Website:** [https://deepakv30.github.io/js-calculator/](https://deepakv30.github.io/js-calculator/)

The public demo is hosted on the portfolio site (`deepakv30.github.io/js-calculator/`). This repository is the source of truth for the calculator implementation.

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

## Specs

AI-native SDD specs live under [`docs/specs/`](docs/specs/).
