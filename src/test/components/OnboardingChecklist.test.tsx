import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import OnboardingChecklist from '../../components/OnboardingChecklist';
import { OnboardingProvider } from '../../contexts/OnboardingContext';
import { AuthProvider } from '../../hooks/useAuth';

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

describe('OnboardingChecklist', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    localStorage.clear();
  });

  it('should render checklist with all steps', () => {
    render(
      <TestWrapper>
        <OnboardingChecklist />
      </TestWrapper>
    );

    expect(screen.getByText('Getting Started')).toBeInTheDocument();
    expect(screen.getByText('Generate Your First Idea')).toBeInTheDocument();
    expect(screen.getByText('Claim an Idea')).toBeInTheDocument();
    expect(screen.getByText('Visit Your Dashboard')).toBeInTheDocument();
  });

  it('should show correct progress when steps are completed', () => {
    // Mark first step as complete
    localStorage.setItem('onboarding_generate', 'true');

    render(
      <TestWrapper>
        <OnboardingChecklist />
      </TestWrapper>
    );

    expect(screen.getByText('1/3')).toBeInTheDocument();
    expect(screen.getByText('33%')).toBeInTheDocument();
  });

  it('should render compact version when compact prop is true', () => {
    render(
      <TestWrapper>
        <OnboardingChecklist compact={true} />
      </TestWrapper>
    );

    expect(screen.getByText('Quick Start')).toBeInTheDocument();
    expect(screen.queryByText('Getting Started')).not.toBeInTheDocument();
  });

  it('should handle step clicks correctly', () => {
    const mockScrollIntoView = vi.fn();
    Element.prototype.scrollIntoView = mockScrollIntoView;

    render(
      <TestWrapper>
        <OnboardingChecklist />
      </TestWrapper>
    );

    const generateStep = screen.getByText('Generate Your First Idea');
    fireEvent.click(generateStep);

    // Should attempt to scroll to the idea generator section
    expect(mockScrollIntoView).toHaveBeenCalled();
  });
});