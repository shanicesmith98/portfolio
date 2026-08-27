import { ArrowUpRight, Briefcase, CalendarDays, FolderGit2, MapPin } from 'lucide-react';
import type { TimelineEntry as Entry } from '../content/schema';
import { externalLinkProps } from '../lib/externalLinkProps';
import { formatMonth } from '../lib/formatMonth';
import { EntryCover } from './EntryCover';
import { iconForTag } from './icon-map';

type TimelineEntryProps = {
  entry: Entry;
};

export function TimelineEntry({ entry }: TimelineEntryProps) {
  const isWork = entry.kind === 'work';
  const isCurrent = entry.endDate === null;
  const KindIcon = isWork ? Briefcase : FolderGit2;
  const dateRange = `${formatMonth(entry.startDate)} – ${formatMonth(entry.endDate)}`;

  return (
    <li
      id={entry.id}
      data-kind={entry.kind}
      className="border-ink-200 dark:border-ink-800 relative scroll-mt-24 border-l pb-10 pl-6 last:border-transparent last:pb-0 sm:pl-8"
    >
      {/* The marker on the rail: the kind, as a badge. Filled while it is still going. */}
      <span
        aria-hidden="true"
        className={
          isCurrent
            ? 'bg-brand-600 ring-ink-50 dark:ring-ink-950 absolute top-0 -left-[13px] grid h-6 w-6 place-items-center rounded-full text-white ring-4'
            : 'bg-ink-100 text-ink-400 ring-ink-50 border-ink-200 dark:bg-ink-800 dark:ring-ink-950 dark:border-ink-800 absolute top-0 -left-[13px] grid h-6 w-6 place-items-center rounded-full border ring-4'
        }
      >
        <KindIcon className="h-3 w-3" strokeWidth={2.25} />
      </span>

      <p className="text-ink-400 text-[0.6875rem] font-semibold tracking-[0.14em] uppercase">
        {isWork ? 'Work' : 'Project'}
      </p>

      <h3 className="text-ink-950 dark:text-ink-50 mt-1.5 text-lg leading-snug font-semibold text-pretty sm:text-xl">
        {entry.title}
        {entry.organization ? (
          <span className="text-ink-600 dark:text-ink-400 font-normal"> &middot; {entry.organization}</span>
        ) : null}
      </h3>

      <p className="text-ink-400 mt-1.5 flex flex-wrap items-center gap-x-3 gap-y-1 text-sm">
        <span className="inline-flex items-center gap-1.5">
          <CalendarDays aria-hidden="true" className="h-3.5 w-3.5" />
          <time dateTime={entry.startDate}>{dateRange}</time>
        </span>
        {entry.location ? (
          <span className="inline-flex items-center gap-1.5">
            <MapPin aria-hidden="true" className="h-3.5 w-3.5" />
            {entry.location}
          </span>
        ) : null}
      </p>

      {/*
        Image beside the prose from `sm:` up, stacked above it on a phone.
        Keeps a timeline of six entries scannable instead of turning it into a
        column of large banners you have to scroll past.
      */}
      <div className="mt-3 flex flex-col gap-4 sm:flex-row sm:items-start sm:gap-5">
        <EntryCover entry={entry} />

        <div className="min-w-0 flex-1">
          <p className="text-ink-800 dark:text-ink-100 leading-relaxed text-pretty">{entry.summary}</p>

          {entry.highlights.length > 0 ? (
            <ul className="text-ink-600 marker:text-brand-300 dark:text-ink-400 mt-3 list-disc space-y-2 pl-5 leading-relaxed">
              {entry.highlights.map((highlight) => (
                <li key={highlight} className="text-pretty">
                  {highlight}
                </li>
              ))}
            </ul>
          ) : null}
        </div>
      </div>

      {entry.tags.length > 0 ? (
        <ul aria-label="Tags" className="mt-4 flex flex-wrap gap-1.5">
          {entry.tags.map((tag) => {
            const TagIcon = iconForTag(tag);
            return (
              <li key={tag}>
                <span className="border-ink-200 text-ink-600 dark:border-ink-800 dark:bg-ink-800 dark:text-ink-100 inline-flex items-center gap-1.5 rounded-full border bg-white px-2.5 py-1 text-xs font-medium">
                  <TagIcon aria-hidden="true" className="text-brand-500 dark:text-brand-300 h-3 w-3" />
                  {tag}
                </span>
              </li>
            );
          })}
        </ul>
      ) : null}

      {entry.links.length > 0 ? (
        <ul className="mt-3 flex flex-wrap gap-x-4 gap-y-1">
          {entry.links.map((link) => (
            <li key={link.href}>
              <a
                href={link.href}
                {...externalLinkProps(link.href)}
                className="text-brand-700 decoration-brand-300 hover:decoration-brand-700 dark:text-brand-300 dark:hover:decoration-brand-300 inline-flex items-center gap-1 text-sm font-medium underline underline-offset-4 transition-colors"
              >
                {link.label}
                <ArrowUpRight aria-hidden="true" className="h-3.5 w-3.5" />
              </a>
            </li>
          ))}
        </ul>
      ) : null}
    </li>
  );
}
