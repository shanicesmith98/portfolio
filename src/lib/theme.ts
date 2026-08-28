/**
 * The React-side half of dark mode. See docs/adr/ADR-010-dark-mode.md.
 *
 * THEME_STORAGE_KEY must match the literal 'theme' key hardcoded in
 * `public/theme-init.js` - that file runs before the bundle and cannot
 * import from here. tests/theme.test.ts asserts the two agree.
 */

export const THEME_STORAGE_KEY = 'theme';

export type Theme = 'light' | 'dark';

/** The visitor's explicit choice, if they have ever made one. */
export function getStoredTheme(): Theme | null {
  try {
    const stored = localStorage.getItem(THEME_STORAGE_KEY);
    return stored === 'light' || stored === 'dark' ? stored : null;
  } catch {
    return null;
  }
}

export function storeTheme(theme: Theme): void {
  try {
    localStorage.setItem(THEME_STORAGE_KEY, theme);
  } catch {
    // Best effort - the toggle still works for this page view, it just will
    // not persist to the next one.
  }
}

/**
 * `resolveTheme` runs during React's render phase (it seeds `ThemeToggle`'s
 * `useState`), with no error boundary anywhere in the app - a thrown
 * matchMedia would crash the whole tree instead of degrading to light, the
 * one thing this function exists to avoid.
 */
export function prefersDark(): boolean {
  try {
    return window.matchMedia('(prefers-color-scheme: dark)').matches;
  } catch {
    return false;
  }
}

/** The stored choice if there is one, otherwise the OS preference. */
export function resolveTheme(): Theme {
  return getStoredTheme() ?? (prefersDark() ? 'dark' : 'light');
}

export function applyTheme(theme: Theme): void {
  document.documentElement.classList.toggle('dark', theme === 'dark');
}
