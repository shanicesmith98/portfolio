import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { Skills } from '../src/components/Skills';
import type { SkillGroup } from '../src/content/schema';

const groups: SkillGroup[] = [
  { label: 'Professional experience', skills: ['C#', 'Vue.js', 'Python'] },
  { label: 'Familiar with', skills: ['Unity Game Engine', 'Figma'] },
];

describe('Skills', () => {
  it('renders nothing when there are no groups, instead of an empty section', () => {
    const { container } = render(<Skills groups={[]} />);
    expect(container).toBeEmptyDOMElement();
  });

  it('keeps each group under its own label, rather than flattening proficiency levels together', () => {
    render(<Skills groups={groups} />);

    expect(screen.getByText('Professional experience')).toBeInTheDocument();
    expect(screen.getByText('Familiar with')).toBeInTheDocument();
    expect(screen.getByText('C#')).toBeInTheDocument();
    expect(screen.getByText('Unity Game Engine')).toBeInTheDocument();
  });
});
