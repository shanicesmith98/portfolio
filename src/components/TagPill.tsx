import { createElement } from 'react';
import { iconForTag } from './icon-map';

type TagPillProps = {
  label: string;
};

/**
 * A single tag or skill, as a small rounded pill with an icon guessed from
 * its text. Extracted because Skills and TimelineEntry both had this exact
 * markup, and dark mode touched both copies at once - see the code review
 * on ADR-010.
 *
 * `createElement`, not JSX, for the same reason as `EntryCover`: a looked-up
 * icon rendered as a JSX tag reads to eslint as a component defined during
 * render.
 */
export function TagPill({ label }: TagPillProps) {
  const icon = createElement(iconForTag(label), {
    'aria-hidden': true,
    className: 'text-brand-500 dark:text-brand-300 h-3 w-3',
  });

  return (
    <span className="border-ink-200 text-ink-600 dark:border-ink-800 dark:bg-ink-800 dark:text-ink-100 inline-flex items-center gap-1.5 rounded-full border bg-white px-2.5 py-1 text-xs font-medium">
      {icon}
      {label}
    </span>
  );
}
