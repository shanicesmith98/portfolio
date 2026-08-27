# ADR-010: A user-controlled dark mode switch, defaulting to system preference

- **Status:** Accepted
- **Date:** 2026-08-27
- **Deciders:** Shanice Smith

## Context

[ADR-002](ADR-002-scope.md) named dark mode as the one out-of-scope feature that was
"cheap and self-contained" - the pre-vetted request, not a fresh scope decision. We are
cashing that in.

The ask has two parts, and both matter: the page should match the visitor's OS
preference on first load, *and* a person who prefers the opposite of their own system
setting can flip it from a switch in the top nav. Either half alone is easy. Both
together means the page needs to know, before it paints, whether anyone has ever
overridden their system preference on this browser - and if not, follow that system
preference live, including if it changes while the tab is open.

That "before it paints" requirement runs straight into [ADR-007](ADR-007-security-posture.md).
This site's CSP is `script-src 'self'` with no `'unsafe-inline'`, asserted by
`tests/security.test.ts` so it cannot regress quietly. The standard fix for a flash of
the wrong theme - a small inline `<script>` in `<head>` that runs before the
stylesheet paints anything - is exactly the kind of script that directive exists to
block. Any theme-detection script has to be a same-origin file, not an inline block.

Tailwind v4 also matters here: its dark mode support defaults to a *media-query*
variant that mirrors `prefers-color-scheme` and cannot be overridden by anything on the
page. Getting a user override at all means opting into the class-based variant instead.

## Decision

We add a **binary switch in `AnchorNav`** (a real `<button>`, not a three-way control)
that toggles between light and dark. Its state is resolved in this order:

1. An explicit choice the visitor has made before, read from `localStorage`.
2. Failing that, the OS-level `prefers-color-scheme` media query, evaluated live -
   if nobody has overridden anything, the page keeps following the system setting
   even if it changes while the tab is open.

Clicking the switch stores an explicit `'light'` or `'dark'` in `localStorage` and
stops following the system from then on. There is no third "back to system" state;
see rejected options below.

Three pieces make this work:

- **`src/styles/globals.css`** opts into Tailwind v4's class-based dark variant:
  `@custom-variant dark (&:where(.dark, .dark *));`. Every component that currently
  hardcodes an `ink-*` or `brand-*` color gets a `dark:` counterpart using the same
  token scale that already exists (`ink-950`/`ink-100` for the dark background and
  text, mirroring `ink-50`/`ink-800` in light) - no new color tokens.
- **`public/theme-init.js`** is a small, hand-written, dependency-free script - not
  processed by Vite, just copied to `dist/` verbatim like `favicon.svg` - referenced
  from `index.html` as `<script src="/theme-init.js"></script>`, placed early in
  `<head>` and unblocked by `type="module"` or `defer` so it runs before first paint.
  It reads `localStorage`, falls back to `matchMedia`, and sets the `dark` class on
  `<html>` synchronously. Because it is an external same-origin file, `script-src
  'self'` allows it without weakening the CSP at all.
- **`src/components/ThemeToggle.tsx`** is the React side: it reads the same
  `localStorage` key on mount, subscribes to the `prefers-color-scheme` media query
  for as long as no explicit choice exists, and updates both the `dark` class and
  `localStorage` on click. It renders a real `<button>` with an accessible label that
  states the action ("Switch to dark theme" / "Switch to light theme"), and a
  sun/moon icon from `lucide-react`, which is already a dependency - this costs no new
  package.

## Options we rejected

### Option: A three-way Light / Dark / System control

More reversible - a visitor can go back to following their system setting after
overriding it once. This is a real gap in the binary design below.

Rejected for this pass because the ask was specifically a "switch," and a three-way
control is a different, larger piece of UI: three focusable targets or a listbox,
instead of one button. It is worth doing later if anyone asks for their override back
- see Consequences.

### Option: Tailwind's default media-only dark mode, no class strategy

Zero JavaScript. `dark:` classes already respond to `prefers-color-scheme` with no
extra CSS configuration.

Rejected outright: it cannot be overridden by anything on the page, by definition. The
ask was explicitly for a user-controlled switch, and this option has no switch.

### Option: An inline `<script>` in `<head>` for flash prevention

The standard pattern everywhere this problem is solved - simplest possible code, one
`<script>` tag, no extra file.

Rejected because it needs `script-src 'self' 'unsafe-inline'`, and this repo's CSP
explicitly does not allow that, enforced by a test written for exactly this reason
(see [ADR-007](ADR-007-security-posture.md)). Loosening the CSP for one feature's
convenience is the kind of quiet regression that test exists to prevent, and a
dedicated external script file achieves the same result for zero security cost.

### Option: No flash-of-wrong-theme guard - let React set the class on mount

Simplest possible implementation: no `public/theme-init.js`, no early `<script>` tag.
The `ThemeToggle` component sets the `dark` class the moment it mounts.

Rejected because it produces a visible flash of the light theme, on every load, for
every visitor whose system (or stored preference) is dark - which is most of the value
of respecting system preference in the first place. The gap is small in milliseconds
and large in perceived quality.

### Option: Persist the preference somewhere other than `localStorage` (a cookie, a query param)

Would allow a server to render the correct theme up front.

Rejected because this is a static site with no server per
[ADR-002](ADR-002-scope.md) - there is nothing to read a cookie on the way out. A
query param would need to be copied into every internal link, and this page has none.
`localStorage`, read by a same-origin script before paint, is the whole answer for a
static file on a CDN.

## Consequences

- **Good:** Zero new dependencies - `lucide-react` already ships a `Moon`/`Sun` icon
  pair.
- **Good:** No flash of the wrong theme on load, and the page keeps following the
  system setting live for anyone who has never touched the switch.
- **Good:** No change to the CSP, and no new exception carved into
  [ADR-007](ADR-007-security-posture.md).
- **Bad:** This touches nearly every component - roughly 55 existing `ink-*`/`brand-*`
  utility uses across the codebase each need a `dark:` counterpart. The diff is broad
  even though each individual change is mechanical.
- **Bad:** The `localStorage` key name is a literal that has to agree between
  `public/theme-init.js` (which cannot import project code - `public/` is never run
  through the bundler) and `ThemeToggle.tsx`. That is a narrow, deliberate exception
  to this project's one-source-of-truth rule for *content* - it is a code-level
  constant, not a content fact, and a test asserts both files use the same string so
  drift fails loudly instead of shipping a switch that silently stops persisting.
- **We will need to revisit this when:** someone asks for their system-following
  behavior back after overriding it once - that is the three-way control option
  above, and at that point the extra UI is worth its cost because someone actually
  asked for it.
