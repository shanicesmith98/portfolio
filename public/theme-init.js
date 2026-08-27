// Sets the `dark` class before first paint, so a dark-preferring visitor
// never sees a flash of the light theme. Runs as an external, same-origin
// script - not inline - because this site's CSP is `script-src 'self'` with
// no `'unsafe-inline'`. See docs/adr/ADR-010-dark-mode.md.
//
// The storage key below must stay 'theme', matching THEME_STORAGE_KEY in
// src/lib/theme.ts - this file is served from public/ as-is and cannot
// import project code. tests/theme.test.ts asserts the two agree.
(function () {
  try {
    var stored = localStorage.getItem('theme');
    var dark = stored === 'dark' || (stored !== 'light' && window.matchMedia('(prefers-color-scheme: dark)').matches);
    document.documentElement.classList.toggle('dark', dark);
  } catch (error) {
    // localStorage or matchMedia unavailable - fall back to the light theme.
  }
})();
