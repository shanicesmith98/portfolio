import { CalendarDays, GraduationCap, MapPin } from 'lucide-react';
import type { EducationEntry as Entry } from '../content/schema';
import { formatMonth } from '../lib/formatMonth';
import { sortByDate } from '../lib/sortByDate';

type EducationProps = {
  entries: Entry[];
};

/**
 * Hidden entirely when there is nothing to show, same as `LinksBlock` -
 * self-taught and bootcamp backgrounds have no degree to list, and a visible
 * "Education / Nothing here yet." block would read as an unfinished page
 * rather than a deliberate omission. See docs/adr/ADR-009-education-and-skills.md.
 */
export function Education({ entries }: EducationProps) {
  if (entries.length === 0) return null;

  const sorted = sortByDate(entries);

  return (
    <section id="education" className="scroll-mt-24 px-4 py-10 sm:px-6 sm:py-14">
      <div className="mx-auto max-w-3xl">
        <h2 className="text-ink-950 flex items-center gap-2.5 text-2xl font-bold tracking-tight sm:text-3xl">
          <span className="bg-brand-100 text-brand-700 grid h-9 w-9 shrink-0 place-items-center rounded-lg">
            <GraduationCap aria-hidden="true" className="h-5 w-5" />
          </span>
          Education
        </h2>

        <ul className="mt-8 pl-1">
          {sorted.map((entry) => {
            const dateRange = `${formatMonth(entry.startDate)} – ${formatMonth(entry.endDate)}`;
            return (
              <li
                key={entry.id}
                id={entry.id}
                className="border-ink-200 relative scroll-mt-24 border-l pb-10 pl-6 last:border-transparent last:pb-0 sm:pl-8"
              >
                <span
                  aria-hidden="true"
                  className="bg-ink-100 text-ink-400 ring-ink-50 border-ink-200 absolute top-0 -left-[13px] grid h-6 w-6 place-items-center rounded-full border ring-4"
                >
                  <GraduationCap className="h-3 w-3" strokeWidth={2.25} />
                </span>

                <h3 className="text-ink-950 mt-1.5 text-lg leading-snug font-semibold text-pretty sm:text-xl">
                  {entry.degree}
                  <span className="text-ink-600 font-normal"> &middot; {entry.institution}</span>
                </h3>

                {entry.field ? (
                  <p className="text-ink-600 mt-1 text-pretty">{entry.field}</p>
                ) : null}

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

                {entry.highlights.length > 0 ? (
                  <ul className="text-ink-600 marker:text-brand-300 mt-3 list-disc space-y-2 pl-5 leading-relaxed">
                    {entry.highlights.map((highlight) => (
                      <li key={highlight} className="text-pretty">
                        {highlight}
                      </li>
                    ))}
                  </ul>
                ) : null}
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
