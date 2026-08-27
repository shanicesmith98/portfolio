import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { Education } from '../src/components/Education';
import type { EducationEntry } from '../src/content/schema';

const entries: EducationEntry[] = [
  {
    id: 'cuny-bachelor',
    institution: 'CUNY New York City College of Technology',
    degree: 'Bachelor of Technology',
    field: 'Emerging Media Technology: Game Design and Interactive Media',
    startDate: '2019-08',
    endDate: '2022-01',
    highlights: [],
  },
  {
    id: 'cuny-masters',
    institution: 'CUNY School of Professional Studies',
    degree: 'Master of Science in Data Science',
    startDate: '2026-08',
    endDate: null,
    highlights: ['Gameheads', 'ColorStack'],
  },
];

describe('Education', () => {
  it('renders nothing when there are no entries, instead of an empty section', () => {
    const { container } = render(<Education entries={[]} />);
    expect(container).toBeEmptyDOMElement();
  });

  it('sorts most recent first, with the in-progress degree at the top', () => {
    render(<Education entries={entries} />);
    const headings = screen.getAllByRole('heading', { level: 3 }).map((node) => node.textContent);
    expect(headings[0]).toContain('Master of Science in Data Science');
    expect(headings[1]).toContain('Bachelor of Technology');
  });

  it('renders the field of study and highlights when given', () => {
    render(<Education entries={entries} />);
    expect(
      screen.getByText('Emerging Media Technology: Game Design and Interactive Media'),
    ).toBeInTheDocument();
    expect(screen.getByText('Gameheads')).toBeInTheDocument();
  });

  it('omits the field of study line when none is given', () => {
    render(<Education entries={[entries[1]]} />);
    expect(screen.queryByText(/Emerging Media/)).not.toBeInTheDocument();
  });
});
