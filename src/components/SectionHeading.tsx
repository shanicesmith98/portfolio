import type { LucideIcon } from 'lucide-react';

type SectionHeadingProps = {
  icon: LucideIcon;
  children: string;
  /**
   * 'default': a tinted badge (brand-100/ink-800) with a brand-colored icon -
   * Timeline, Skills, Education. 'solid': a filled brand-600 badge with a
   * white icon - LinksBlock, which wants the same weight as its own buttons.
   */
  variant?: 'default' | 'solid';
};

/**
 * The `<h2>` + icon badge repeated at the top of every section. Extracted
 * because dark mode touched this exact fragment in four places at once -
 * see the code review on ADR-010.
 */
export function SectionHeading({ icon: Icon, children, variant = 'default' }: SectionHeadingProps) {
  return (
    <h2 className="text-ink-950 dark:text-ink-50 flex items-center gap-2.5 text-2xl font-bold tracking-tight sm:text-3xl">
      {variant === 'solid' ? (
        <span className="bg-brand-600 grid h-9 w-9 shrink-0 place-items-center rounded-lg text-white">
          <Icon aria-hidden="true" className="h-4.5 w-4.5" />
        </span>
      ) : (
        <span className="bg-brand-100 text-brand-700 dark:bg-ink-800 dark:text-brand-300 grid h-9 w-9 shrink-0 place-items-center rounded-lg">
          <Icon aria-hidden="true" className="h-5 w-5" />
        </span>
      )}
      {children}
    </h2>
  );
}
