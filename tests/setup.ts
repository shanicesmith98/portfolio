import '@testing-library/jest-dom/vitest';
import { cleanup } from '@testing-library/react';
import { toHaveNoViolations } from 'jest-axe';
import { afterEach, expect } from 'vitest';

expect.extend(toHaveNoViolations);

/*
 * jsdom does not implement matchMedia at all. ThemeToggle calls it on every
 * render to read the system's colour-scheme preference (see ADR-010), which
 * means every test that mounts <App /> needs this to exist. Defaults to "no
 * preference" - tests/themeToggle.test.tsx overrides it to exercise the
 * dark-preferring path specifically.
 */
if (!window.matchMedia) {
  window.matchMedia = (query: string) =>
    ({
      matches: false,
      media: query,
      onchange: null,
      addListener: () => {},
      removeListener: () => {},
      addEventListener: () => {},
      removeEventListener: () => {},
      dispatchEvent: () => false,
    }) as MediaQueryList;
}

afterEach(() => {
  cleanup();
  document.documentElement.classList.remove('dark');
  localStorage.clear();
});
