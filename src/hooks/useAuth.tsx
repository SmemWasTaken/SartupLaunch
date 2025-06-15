import { useState, useEffect, useContext, createContext, ReactNode } from 'react';
import { analytics } from '../utils/analytics';

export interface AuthUser {
  id: string;
  email: string;
  profile?: {
    id: string;
    email: string;
    display_name?: string;
    avatar_url?: string;
    created_at?: string;
    updated_at?: string;
    onboarding_metadata?: any;
  };
  user_metadata?: {
    display_name?: string;
    full_name?: string;
    avatar_url?: string;
    picture?: string;
  };
}

interface AuthContextType {
  user: AuthUser | null;
  session: any | null;
  loading: boolean;
  signInWithGoogle: () => Promise<void>;
  signInWithGithub: () => Promise<void>;
  signInWithEmail: (email: string, password: string) => Promise<void>;
  signUpWithEmail: (email: string, password: string, displayName: string) => Promise<void>;
  logout: () => Promise<void>;
  updateProfile: (updates: any) => Promise<void>;
  error: string | null;
  clearError: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [user, setUser] = useState<AuthUser | null>(null);
  const [session, setSession] = useState<any | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const clearError = () => setError(null);

  // Demo mode - create a mock user for development
  useEffect(() => {
    const initAuth = async () => {
      try {
        // Check if we have a stored user session
        const storedUser = localStorage.getItem('demo_user');
        if (storedUser) {
          const userData = JSON.parse(storedUser);
          setUser(userData);
          setSession({ user: userData });
        }
      } catch (error) {
        console.error('Error initializing auth:', error);
      } finally {
        setLoading(false);
      }
    };

    initAuth();
  }, []);

  const createDemoUser = (email: string, displayName?: string) => {
    const demoUser: AuthUser = {
      id: `demo-${Date.now()}`,
      email,
      profile: {
        id: `demo-${Date.now()}`,
        email,
        display_name: displayName,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
        onboarding_metadata: {},
      },
      user_metadata: {
        display_name: displayName,
        full_name: displayName,
      },
    };

    localStorage.setItem('demo_user', JSON.stringify(demoUser));
    return demoUser;
  };

  const signInWithGoogle = async () => {
    try {
      setError(null);
      setLoading(true);
      
      // Demo implementation
      const demoUser = createDemoUser('demo@google.com', 'Demo Google User');
      setUser(demoUser);
      setSession({ user: demoUser });
      
      analytics.track('sign_in', { method: 'google' });
    } catch (error: any) {
      setError('Google sign-in is not available in demo mode');
    } finally {
      setLoading(false);
    }
  };

  const signInWithGithub = async () => {
    try {
      setError(null);
      setLoading(true);
      
      // Demo implementation
      const demoUser = createDemoUser('demo@github.com', 'Demo GitHub User');
      setUser(demoUser);
      setSession({ user: demoUser });
      
      analytics.track('sign_in', { method: 'github' });
    } catch (error: any) {
      setError('GitHub sign-in is not available in demo mode');
    } finally {
      setLoading(false);
    }
  };

  const signInWithEmail = async (email: string, password: string) => {
    try {
      setError(null);
      setLoading(true);
      
      // Demo implementation - accept any email/password
      const demoUser = createDemoUser(email, email.split('@')[0]);
      setUser(demoUser);
      setSession({ user: demoUser });
      
      analytics.track('sign_in', { method: 'email' });
    } catch (error: any) {
      setError('Invalid email or password');
    } finally {
      setLoading(false);
    }
  };

  const signUpWithEmail = async (email: string, password: string, displayName: string) => {
    try {
      setError(null);
      setLoading(true);
      
      // Demo implementation
      const demoUser = createDemoUser(email, displayName);
      setUser(demoUser);
      setSession({ user: demoUser });
      
      analytics.track('sign_up', { method: 'email' });
    } catch (error: any) {
      setError('Failed to create account');
    } finally {
      setLoading(false);
    }
  };

  const logout = async () => {
    try {
      setError(null);
      localStorage.removeItem('demo_user');
      setUser(null);
      setSession(null);
      
      analytics.track('sign_out');
    } catch (error: any) {
      setError('Failed to sign out');
    }
  };

  const updateProfile = async (updates: any) => {
    try {
      setError(null);
      
      if (!user) {
        throw new Error('No user logged in');
      }

      // Update local user data
      const updatedUser = {
        ...user,
        profile: {
          ...user.profile,
          ...updates,
          updated_at: new Date().toISOString(),
        },
      };

      setUser(updatedUser);
      localStorage.setItem('demo_user', JSON.stringify(updatedUser));

      // In production, this would call the updateProfile function
      // await fetch('/.netlify/functions/updateProfile', { ... });
    } catch (error: any) {
      setError('Failed to update profile');
    }
  };

  const value: AuthContextType = {
    user,
    session,
    loading,
    signInWithGoogle,
    signInWithGithub,
    signInWithEmail,
    signUpWithEmail,
    logout,
    updateProfile,
    error,
    clearError,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};