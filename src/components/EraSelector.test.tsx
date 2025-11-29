import { render, screen } from '@testing-library/react';
import EraSelector from './EraSelector';
import type { Era } from '../world/types';

describe('EraSelector', () => {
  const eras: Era[] = [
    { id: 'test-1', label: 'Era One', yearRange: '100 BC', description: 'First era', comingSoon: false },
    { id: 'test-2', label: 'Era Two', yearRange: '50 BC', description: 'Second era', comingSoon: true }
  ];

  it('renders available eras and disables coming soon entries', () => {
    render(<EraSelector eras={eras} activeEraId="test-1" onSelectEra={() => {}} />);

    expect(screen.getByRole('button', { name: /Era One 100 BC/i })).toBeEnabled();
    expect(screen.getByRole('button', { name: /Era Two 50 BC/i })).toBeDisabled();
  });
});
