import { useEffect, useState } from 'react';
import { Moon, Sun } from 'lucide-react';
import { applyTheme, getStoredTheme, resolveTheme, storeTheme, type Theme } from '../lib/theme';

/**
 * A real <button>, not a three-way control - see ADR-010. Starts from
 * whatever `public/theme-init.js` already applied before paint, then keeps
 * following the system preference live until the visitor clicks it once.
 */
export function ThemeToggle() {
  const [theme, setTheme] = useState<Theme>(resolveTheme);

  useEffect(() => {
    const media = window.matchMedia('(prefers-color-scheme: dark)');
    const onChange = () => {
      // An explicit choice already exists - stop following the system.
      if (getStoredTheme()) return;
      const next = resolveTheme();
      setTheme(next);
      applyTheme(next);
    };
    media.addEventListener('change', onChange);
    return () => media.removeEventListener('change', onChange);
  }, []);

  function toggle() {
    const next: Theme = theme === 'dark' ? 'light' : 'dark';
    setTheme(next);
    applyTheme(next);
    storeTheme(next);
  }

  const Icon = theme === 'dark' ? Sun : Moon;
  const label = theme === 'dark' ? 'Switch to light theme' : 'Switch to dark theme';

  return (
    <button
      type="button"
      onClick={toggle}
      aria-label={label}
      title={label}
      className="text-ink-600 hover:bg-brand-100 hover:text-brand-700 dark:text-ink-100 dark:hover:bg-ink-800 dark:hover:text-brand-300 grid h-9 w-9 shrink-0 place-items-center rounded-md transition-colors"
    >
      <Icon aria-hidden="true" className="h-4.5 w-4.5" />
    </button>
  );
}
