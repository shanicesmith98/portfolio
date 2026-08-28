// Sets the `dark` class before first paint, so a dark-preferring visitor
// never sees a flash of the light theme. Runs as an external, same-origin
// script - not inline - because this site's CSP is `script-src 'self'` with
// no `'unsafe-inline'`. See docs/adr/ADR-010-dark-mode.md.
//
// The storage key below must stay 'theme', matching THEME_STORAGE_KEY in
// src/lib/theme.ts - this file is served from public/ as-is and cannot
// import project code. tests/theme.test.ts asserts the two agree.
(function () {
  // Guarded independently: a thrown localStorage read (sandboxed iframe,
  // privacy extension, partitioned storage) must not skip the system-
  // preference check below, or a dark-preferring visitor silently gets
  // the light theme instead.
  var stored = null;
  try {
    stored = localStorage.getItem('theme');
  } catch (error) {
    // Storage unavailable - fall through to the system preference.
  }

  var dark = stored === 'dark';
  if (stored !== 'light' && stored !== 'dark') {
    try {
      dark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    } catch (error) {
      // matchMedia unavailable - fall back to the light theme.
    }
  }

  document.documentElement.classList.toggle('dark', dark);
})();
