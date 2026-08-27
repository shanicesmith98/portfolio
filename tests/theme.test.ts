import { readFileSync } from 'node:fs';
import { join } from 'node:path';
import { afterEach, describe, expect, it, vi } from 'vitest';
import { applyTheme, getStoredTheme, resolveTheme, storeTheme, THEME_STORAGE_KEY } from '../src/lib/theme';

/**
 * `public/theme-init.js` runs before the bundle and cannot import
 * THEME_STORAGE_KEY - it hardcodes the same string instead. See ADR-010.
 * This is the guard against the two quietly drifting apart.
 */
describe('theme storage key', () => {
  it('is the same literal in public/theme-init.js as in src/lib/theme.ts', () => {
    const themeInit = readFileSync(join(process.cwd(), 'public/theme-init.js'), 'utf8');
    expect(themeInit).toContain(`'${THEME_STORAGE_KEY}'`);
  });
});

function mockSystemPrefersDark(matches: boolean) {
  window.matchMedia = vi.fn().mockReturnValue({
    matches,
    addEventListener: vi.fn(),
    removeEventListener: vi.fn(),
  }) as unknown as typeof window.matchMedia;
}

describe('resolveTheme', () => {
  afterEach(() => {
    localStorage.clear();
  });

  it('follows the system preference when nothing is stored', () => {
    mockSystemPrefersDark(true);
    expect(resolveTheme()).toBe('dark');

    mockSystemPrefersDark(false);
    expect(resolveTheme()).toBe('light');
  });

  it('prefers a stored choice over the system preference', () => {
    mockSystemPrefersDark(true);
    storeTheme('light');
    expect(resolveTheme()).toBe('light');
  });
});

describe('applyTheme', () => {
  afterEach(() => {
    document.documentElement.classList.remove('dark');
  });

  it('adds the dark class for dark and removes it for light', () => {
    applyTheme('dark');
    expect(document.documentElement.classList.contains('dark')).toBe(true);

    applyTheme('light');
    expect(document.documentElement.classList.contains('dark')).toBe(false);
  });
});

describe('storeTheme / getStoredTheme', () => {
  afterEach(() => {
    localStorage.clear();
  });

  it('round-trips a choice through localStorage', () => {
    expect(getStoredTheme()).toBeNull();
    storeTheme('dark');
    expect(getStoredTheme()).toBe('dark');
  });
});
