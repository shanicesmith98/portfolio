import { useMemo, useState } from 'react';
import { History } from 'lucide-react';
import type { TimelineEntry as Entry, TimelineFilterValue } from '../content/schema';
import { sortByDate } from '../lib/sortByDate';
import { TimelineEntry } from './TimelineEntry';
import { TimelineFilter } from './TimelineFilter';

type TimelineProps = {
  entries: Entry[];
};

export function Timeline({ entries }: TimelineProps) {
  const [filter, setFilter] = useState<TimelineFilterValue>('all');

  const sorted = useMemo(() => sortByDate(entries), [entries]);
  const visible = useMemo(
    () => (filter === 'all' ? sorted : sorted.filter((entry) => entry.kind === filter)),
    [sorted, filter],
  );

  return (
    <section id="timeline" className="scroll-mt-24 px-4 py-10 sm:px-6 sm:py-14">
      <div className="mx-auto max-w-3xl">
        <div className="border-ink-200 dark:border-ink-800 flex flex-wrap items-end justify-between gap-x-4 gap-y-3 border-b pb-4">
          <div>
            <h2 className="text-ink-950 dark:text-ink-50 flex items-center gap-2.5 text-2xl font-bold tracking-tight sm:text-3xl">
              <span className="bg-brand-100 text-brand-700 dark:bg-ink-800 dark:text-brand-300 grid h-9 w-9 shrink-0 place-items-center rounded-lg">
                <History aria-hidden="true" className="h-5 w-5" />
              </span>
              Work and projects
            </h2>
            <p aria-live="polite" className="text-ink-400 mt-1 text-sm">
              Showing {visible.length} of {sorted.length}
            </p>
          </div>
          <TimelineFilter value={filter} onChange={setFilter} />
        </div>

        {visible.length > 0 ? (
          <ul className="mt-8 pl-1">
            {visible.map((entry) => (
              <TimelineEntry key={entry.id} entry={entry} />
            ))}
          </ul>
        ) : (
          <p className="text-ink-600 dark:text-ink-400 mt-8">Nothing here yet.</p>
        )}
      </div>
    </section>
  );
}
