import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, waitFor } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import OnboardingTour from '../../components/OnboardingTour';
import { OnboardingProvider } from '../../contexts/OnboardingContext';
import { AuthProvider } from '../../hooks/useAuth';

// Mock react-joyride
vi.mock('react-joyride', () => ({
  default: ({ run, callback }: any) => {
    if (run) {
      return <div data-testid="joyride-tour">Tour is running</div>;
    }
    return null;
  },
  STATUS: {
    FINISHED: 'finished',
    SKIPPED: 'skipped',
  },
  EVENTS: {
    STEP_AFTER: 'step:after',
    TARGET_NOT_FOUND: 'target:not_found',
  },
}));

// Mock Supabase
vi.mock('../../lib/supabase', () => ({
  supabase: {
    from: vi.fn(() => ({
      select: vi.fn(() => ({
        eq: vi.fn(() => ({
          single: vi.fn(() => Promise.resolve({ data: null, error: null })),
        })),
      })),
      update: vi.fn(() => ({
        eq: vi.fn(() => Promise.resolve({ error: null })),
      })),
    })),
  },
  isDemoMode: false,
}));

// Mock auth hook
vi.mock('../../hooks/useAuth', () => ({
  useAuth: () => ({
    user: { id: 'test-user', email: 'test@example.com' },
    loading: false,
  }),
  AuthProvider: ({ children }: any) => children,
}));

const TestWrapper = ({ children }: { children: React.ReactNode }) => (
  <BrowserRouter>
    <AuthProvider>
      <OnboardingProvider>
        {children}
      </OnboardingProvider>
    </AuthProvider>
  </BrowserRouter>
);

describe('OnboardingTour', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    // Clear localStorage
    localStorage.clear();
  });

  it('should render tour when user is logged in and hasnt seen it', async () => {
    render(
      <TestWrapper>
        <OnboardingTour />
      </TestWrapper>
    );

    await waitFor(() => {
      expect(screen.getByTestId('joyride-tour')).toBeInTheDocument();
    });
  });

  it('should not render tour when user has already seen it', async () => {
    // Set tour as seen in localStorage
    localStorage.setItem('onboarding_tour', 'true');

    render(
      <TestWrapper>
        <OnboardingTour />
      </TestWrapper>
    );

    await waitFor(() => {
      expect(screen.queryByTestId('joyride-tour')).not.toBeInTheDocument();
    });
  });
});