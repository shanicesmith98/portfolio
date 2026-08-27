import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { LinksBlock } from '../src/components/LinksBlock';
import { TimelineEntry } from '../src/components/TimelineEntry';
import { externalLinkProps } from '../src/lib/externalLinkProps';
import type { TimelineEntry as Entry } from '../src/content/schema';

/**
 * A link that leaves this site and opens with a bare `target="_blank"` hands
 * the new page `window.opener` - reverse tabnabbing, where the page it opened
 * navigates this tab somewhere else while the visitor is looking away. See
 * the 2026-08-27 amendment in docs/adr/ADR-007-security-posture.md.
 */
describe('externalLinkProps', () => {
  it('opens an https link in a new tab without an opener or a referrer', () => {
    expect(externalLinkProps('https://github.com/janedoe')).toEqual({
      target: '_blank',
      rel: 'noopener noreferrer',
    });
  });

  it('leaves a mailto link alone - it opens a mail client, not a tab', () => {
    expect(externalLinkProps('mailto:jane@example.com')).toEqual({});
  });
});

describe('LinksBlock external links', () => {
  it('opens GitHub and LinkedIn safely in a new tab', () => {
    render(
      <LinksBlock
        links={[
          { label: 'GitHub', href: 'https://github.com/janedoe' },
          { label: 'LinkedIn', href: 'https://www.linkedin.com/in/janedoe' },
        ]}
      />,
    );

    for (const label of ['GitHub', 'LinkedIn']) {
      const link = screen.getByRole('link', { name: label });
      expect(link).toHaveAttribute('target', '_blank');
      expect(link).toHaveAttribute('rel', 'noopener noreferrer');
    }
  });

  it('does not send an Email link to a new tab', () => {
    render(<LinksBlock links={[{ label: 'Email', href: 'mailto:jane@example.com' }]} />);

    const link = screen.getByRole('link', { name: 'Email' });
    expect(link).not.toHaveAttribute('target');
    expect(link).not.toHaveAttribute('rel');
  });
});

describe('TimelineEntry external links', () => {
  const entry: Entry = {
    id: 'trailhead',
    kind: 'project',
    title: 'Trailhead',
    startDate: '2024-06',
    endDate: null,
    summary: 'A thing I built.',
    highlights: [],
    tags: [],
    links: [{ label: 'Source', href: 'https://github.com/janedoe/trailhead' }],
  };

  it('opens a project Source link safely in a new tab', () => {
    render(
      <ul>
        <TimelineEntry entry={entry} />
      </ul>,
    );

    const link = screen.getByRole('link', { name: /Source/ });
    expect(link).toHaveAttribute('target', '_blank');
    expect(link).toHaveAttribute('rel', 'noopener noreferrer');
  });
});
