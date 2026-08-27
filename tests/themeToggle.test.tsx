import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { afterEach, describe, expect, it, vi } from 'vitest';
import { ThemeToggle } from '../src/components/ThemeToggle';

function mockMatchMedia(matches: boolean) {
  const addEventListener = vi.fn();
  const removeEventListener = vi.fn();
  window.matchMedia = vi.fn().mockReturnValue({
    matches,
    addEventListener,
    removeEventListener,
  }) as unknown as typeof window.matchMedia;
  return { addEventListener, removeEventListener };
}

describe('ThemeToggle', () => {
  afterEach(() => {
    document.documentElement.classList.remove('dark');
    localStorage.clear();
  });

  it('is a real button with a label naming the action, not the current state', () => {
    mockMatchMedia(false);
    render(<ThemeToggle />);
    expect(screen.getByRole('button', { name: 'Switch to dark theme' })).toBeInTheDocument();
  });

  it('starts dark when the system prefers dark and nothing is stored', () => {
    mockMatchMedia(true);
    render(<ThemeToggle />);
    expect(screen.getByRole('button', { name: 'Switch to light theme' })).toBeInTheDocument();
  });

  it('prefers a stored choice over the system preference', () => {
    mockMatchMedia(true);
    localStorage.setItem('theme', 'light');
    render(<ThemeToggle />);
    expect(screen.getByRole('button', { name: 'Switch to dark theme' })).toBeInTheDocument();
  });

  it('flips the theme, updates the class on <html>, and persists the choice', async () => {
    mockMatchMedia(false);
    const user = userEvent.setup();
    render(<ThemeToggle />);

    expect(document.documentElement.classList.contains('dark')).toBe(false);

    await user.click(screen.getByRole('button', { name: 'Switch to dark theme' }));

    expect(document.documentElement.classList.contains('dark')).toBe(true);
    expect(localStorage.getItem('theme')).toBe('dark');
    expect(screen.getByRole('button', { name: 'Switch to light theme' })).toBeInTheDocument();
  });

  it('stops following the system once the visitor has overridden it', () => {
    const { addEventListener } = mockMatchMedia(false);
    render(<ThemeToggle />);

    const [, onChange] = addEventListener.mock.calls[0] as [string, () => void];

    // The visitor has already chosen light explicitly.
    localStorage.setItem('theme', 'light');
    onChange();

    expect(document.documentElement.classList.contains('dark')).toBe(false);
    expect(screen.getByRole('button', { name: 'Switch to dark theme' })).toBeInTheDocument();
  });
});
