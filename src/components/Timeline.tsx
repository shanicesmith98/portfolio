import { useMemo, useState } from 'react';
import { History } from 'lucide-react';
import type { TimelineEntry as Entry, TimelineFilterValue } from '../content/schema';
import { sortByDate } from '../lib/sortByDate';
import { SectionHeading } from './SectionHeading';
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
            <SectionHeading icon={History}>Work and projects</SectionHeading>
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
