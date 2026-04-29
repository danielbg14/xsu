# Code Website Structure

## Current Structure

- `index.html` plus the other page `.html` files in root.
- Shared CSS:
  - `assets/css/variables.css`
  - `assets/css/reset.css`
  - `assets/css/base.css`
  - `assets/css/layout.css`
  - `assets/css/components.css`
- Page CSS: `assets/css/pages/<page>.css`
- Shared JS module: `assets/js/main.js`
- Shared JS modules: `assets/js/modules/*.js`
- Page JS (only where needed): `assets/js/pages/<page>.js`

## Loading Rules

- Shared JS is loaded as module:
  - `<script type="module" src="assets/js/main.js"></script>`
- Page JS is loaded only on pages that need custom behavior.

## Important Notes

- Keep `style.css` for now (legacy/base compatibility during migration).
- Remove `style.css` only after all its used selectors are fully moved to `assets/css/*` and visually verified.
- Keep pages in root for now to avoid breaking relative links and asset paths.

## Production Step (recommended)

- Create minified bundles for production:
  - CSS: `assets/css/*.min.css`
  - JS: `assets/js/*.min.js`
- Keep original source files for editing and generate minified files in a build step.
