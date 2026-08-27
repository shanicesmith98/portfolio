import type { ReactNode } from 'react';
import { AtSign, GraduationCap, History, Wrench, type LucideIcon } from 'lucide-react';
import type { Profile, SectionId } from '../content/schema';
import { Education } from './Education';
import { LinksBlock } from './LinksBlock';
import { Skills } from './Skills';
import { Timeline } from './Timeline';

type SectionDefinition = {
  /** The anchor nav label. The section's own heading lives in its component. */
  label: string;
  Icon: LucideIcon;
  /**
   * Takes the whole profile rather than pre-picked props, so adding a section
   * that needs a different slice of the content is a change to one entry here
   * and nothing else.
   */
  render: (profile: Profile) => ReactNode;
};

/**
 * The one definition of each section: what it is called in the navigation, and
 * how it renders.
 *
 * `Page` and `AnchorNav` both read from this map and both walk
 * `profile.sections` to order it, which is what stops the nav from listing the
 * sections in a different order from the page. See ADR-006.
 *
 * Typed as a total record over `SectionId`: adding an id to `SECTION_IDS`
 * without adding it here is a type error rather than a gap on the page.
 */
export const SECTIONS: Record<SectionId, SectionDefinition> = {
  timeline: {
    label: 'Timeline',
    Icon: History,
    render: (profile) => <Timeline entries={profile.timeline} />,
  },
  education: {
    label: 'Education',
    Icon: GraduationCap,
    render: (profile) => <Education entries={profile.education} />,
  },
  skills: {
    label: 'Skills',
    Icon: Wrench,
    render: (profile) => <Skills groups={profile.skills} />,
  },
  links: {
    label: 'Links',
    Icon: AtSign,
    render: (profile) => <LinksBlock links={profile.links} resumeUrl={profile.resumeUrl} />,
  },
};
