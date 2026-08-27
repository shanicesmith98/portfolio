import { Wrench } from 'lucide-react';
import type { SkillGroup } from '../content/schema';
import { iconForTag } from './icon-map';

type SkillsProps = {
  groups: SkillGroup[];
};

/**
 * Hidden entirely when there is nothing to show, same as `LinksBlock` and
 * `Education`. See docs/adr/ADR-009-education-and-skills.md.
 */
export function Skills({ groups }: SkillsProps) {
  if (groups.length === 0) return null;

  return (
    <section id="skills" className="scroll-mt-24 px-4 py-10 sm:px-6 sm:py-14">
      <div className="mx-auto max-w-3xl">
        <h2 className="text-ink-950 flex items-center gap-2.5 text-2xl font-bold tracking-tight sm:text-3xl">
          <span className="bg-brand-100 text-brand-700 grid h-9 w-9 shrink-0 place-items-center rounded-lg">
            <Wrench aria-hidden="true" className="h-5 w-5" />
          </span>
          Skills
        </h2>

        <div className="mt-8 space-y-6">
          {groups.map((group, index) => (
            <div key={`${group.label}-${index}`}>
              <h3 className="text-ink-700 text-sm font-semibold tracking-[0.08em] uppercase">
                {group.label}
              </h3>
              <ul className="mt-3 flex flex-wrap gap-1.5">
                {group.skills.map((skill) => {
                  const Icon = iconForTag(skill);
                  return (
                    <li key={skill}>
                      <span className="border-ink-200 text-ink-600 inline-flex items-center gap-1.5 rounded-full border bg-white px-2.5 py-1 text-xs font-medium">
                        <Icon aria-hidden="true" className="text-brand-500 h-3 w-3" />
                        {skill}
                      </span>
                    </li>
                  );
                })}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
