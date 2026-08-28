import { Wrench } from 'lucide-react';
import type { SkillGroup } from '../content/schema';
import { SectionHeading } from './SectionHeading';
import { TagPill } from './TagPill';

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
        <SectionHeading icon={Wrench}>Skills</SectionHeading>

        <div className="mt-8 space-y-6">
          {groups.map((group, index) => (
            <div key={`${group.label}-${index}`}>
              <h3 className="text-ink-600 dark:text-ink-100 text-sm font-semibold tracking-[0.08em] uppercase">
                {group.label}
              </h3>
              <ul className="mt-3 flex flex-wrap gap-1.5">
                {group.skills.map((skill) => (
                  <li key={skill}>
                    <TagPill label={skill} />
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
