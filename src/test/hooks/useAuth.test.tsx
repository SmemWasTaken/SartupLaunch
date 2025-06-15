import { describe, it, expect, vi, beforeEach } from 'vitest';
import { renderHook, act } from '@testing-library/react';
import { AuthProvider, useAuth } from '../../hooks/useAuth';
import { ReactNode } from 'react';

// Mock Supabase
vi.mock('../../lib/supabase', () => ({
  supabase: {
    auth: {
      getSession: vi.fn(),
      onAuthStateChange: vi.fn(),
      signInWithOAuth: vi.fn(),
      signInWithPassword: vi.fn(),
      signUp: vi.fn(),
      signOut: vi.fn(),
    },
    from: vi.fn(() => ({
      select: vi.fn(() => ({
        eq: vi.fn(() => ({
          single: vi.fn(),
        })),
      })),
      insert: vi.fn(),
      update: vi.fn(() => ({
        eq: vi.fn(),
      })),
    })),
  },
  isDemoMode: false,
}));

const wrapper = ({ children }: { children: ReactNode }) => (
  <AuthProvider>{children}</AuthProvider>
);

describe('useAuth', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('should throw error when used outside AuthProvider', () => {
    expect(() => {
      renderHook(() => useAuth());
    }).toThrow('useAuth must be used within an AuthProvider');
  });

  it('should provide auth context when used within AuthProvider', () => {
    const { result } = renderHook(() => useAuth(), { wrapper });
    
    expect(result.current).toHaveProperty('user');
    expect(result.current).toHaveProperty('session');
    expect(result.current).toHaveProperty('loading');
    expect(result.current).toHaveProperty('signInWithGoogle');
    expect(result.current).toHaveProperty('signInWithGithub');
    expect(result.current).toHaveProperty('signInWithEmail');
    expect(result.current).toHaveProperty('signUpWithEmail');
    expect(result.current).toHaveProperty('logout');
    expect(result.current).toHaveProperty('updateProfile');
    expect(result.current).toHaveProperty('error');
    expect(result.current).toHaveProperty('clearError');
  });

  it('should clear error when clearError is called', () => {
    const { result } = renderHook(() => useAuth(), { wrapper });
    
    act(() => {
      result.current.clearError();
    });
    
    expect(result.current.error).toBeNull();
  });
});