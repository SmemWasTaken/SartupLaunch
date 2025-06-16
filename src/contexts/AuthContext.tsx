import React, { createContext, useContext, useEffect, useState } from 'react';
import { User, AuthState } from '../types';
import { supabase, isDemoMode } from '../lib/supabase';

interface AuthContextType extends AuthState {
  signUp: (email: string, password: string, name: string) => Promise<void>;
  signIn: (email: string, password: string) => Promise<void>;
  signOut: () => Promise<void>;
  enableDemoMode: () => void;
  updateUser: (updates: Partial<User>) => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within AuthProvider');
  }
  return context;
};

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [authState, setAuthState] = useState<AuthState>({
    user: null,
    isAuthenticated: false,
    isLoading: true,
    isDemoMode: false,
  });

  useEffect(() => {
    // Check for existing session
    checkSession();
    
    // Only set up Supabase auth listener if not in demo mode
    if (!isDemoMode) {
      const { data: { subscription } } = supabase.auth.onAuthStateChange(
        async (session) => {
          if (session?.user) {
            await loadUserProfile(session.user.id);
          } else {
            setAuthState(prev => ({
              ...prev,
              user: null,
              isAuthenticated: false,
              isLoading: false,
            }));
          }
        }
      );

      return () => subscription.unsubscribe();
    }
  }, []);

  const checkSession = async () => {
    try {
      // Check for admin user first
      const adminUser = localStorage.getItem('admin_user');
      if (adminUser) {
        const user = JSON.parse(adminUser);
        setAuthState({
          user,
          isAuthenticated: true,
          isLoading: false,
          isDemoMode: false,
        });
        return;
      }
      
      // Check for demo mode first
      const demoUser = localStorage.getItem('demo_user');
      if (demoUser) {
        const user = JSON.parse(demoUser);
        setAuthState({
          user,
          isAuthenticated: true,
          isLoading: false,
          isDemoMode: true,
        });
        return;
      }

      // If in demo mode or no Supabase credentials, enable demo mode
      if (isDemoMode) {
        setAuthState(prev => ({ ...prev, isLoading: false, isDemoMode: true }));
        return;
      }

      // Check Supabase session only if we have real credentials
      const { data: { session } } = await supabase.auth.getSession();
      if (session?.user) {
        await loadUserProfile(session.user.id);
      } else {
        setAuthState(prev => ({ ...prev, isLoading: false }));
      }
    } catch (error) {
      console.error('Session check failed:', error);
      setAuthState(prev => ({ ...prev, isLoading: false, isDemoMode: true }));
    }
  };

  const loadUserProfile = async (userId: string) => {
    try {
      const { data, error } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', userId)
        .single();

      if (error) throw error;

      const user: User = {
        id: data.id,
        email: data.email,
        name: data.name,
        avatar: data.avatar,
        createdAt: data.created_at,
        onboardingCompleted: data.onboarding_completed,
        onboardingStep: data.onboarding_step,
      };

      setAuthState({
        user,
        isAuthenticated: true,
        isLoading: false,
        isDemoMode: false,
      });
    } catch (error) {
      console.error('Failed to load user profile:', error);
      setAuthState(prev => ({ ...prev, isLoading: false }));
    }
  };

  const signUp = async (email: string, password: string, name: string) => {
    if (isDemoMode) {
      // Demo mode signup
      const demoUser: User = {
        id: 'demo-user-' + Date.now(),
        email,
        name,
        createdAt: new Date().toISOString(),
        onboardingCompleted: false,
        onboardingStep: 0,
      };

      localStorage.setItem('demo_user', JSON.stringify(demoUser));
      setAuthState({
        user: demoUser,
        isAuthenticated: true,
        isLoading: false,
        isDemoMode: true,
      });
      return;
    }

    try {
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: { name }
        }
      });

      if (error) throw error;

      if (data.user) {
        // Create profile
        const { error: profileError } = await supabase
          .from('profiles')
          .insert({
            id: data.user.id,
            email,
            name,
            onboarding_completed: false,
            onboarding_step: 0,
          });

        if (profileError) throw profileError;
      }
    } catch (error: any) {
      throw new Error(error.message || 'Sign up failed');
    }
  };

  const signIn = async (email: string, password: string) => {
    // Check for admin credentials
    if (email === 'admin@startupLaunch.com' && password === 'LuckyDucky123!') {
      const adminUser: User = {
        id: 'admin-user',
        email: 'admin@startupLaunch.com',
        name: 'OmidDieMaschine',
        createdAt: new Date().toISOString(),
        onboardingCompleted: true,
        onboardingStep: 3,
      };

      localStorage.setItem('admin_user', JSON.stringify(adminUser));
      setAuthState({
        user: adminUser,
        isAuthenticated: true,
        isLoading: false,
        isDemoMode: false,
      });
      return;
    }
    
    if (isDemoMode) {
      // Demo mode signin
      const demoUser: User = {
        id: 'demo-user-' + Date.now(),
        email,
        name: email.split('@')[0],
        createdAt: new Date().toISOString(),
        onboardingCompleted: false,
        onboardingStep: 0,
      };

      localStorage.setItem('demo_user', JSON.stringify(demoUser));
      setAuthState({
        user: demoUser,
        isAuthenticated: true,
        isLoading: false,
        isDemoMode: true,
      });
      return;
    }

    try {
      const { error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) throw error;
    } catch (error: any) {
      throw new Error(error.message || 'Sign in failed');
    }
  };

  const signOut = async () => {
    try {
      if (localStorage.getItem('admin_user')) {
        localStorage.removeItem('admin_user');
      }
      if (authState.isDemoMode) {
        localStorage.removeItem('demo_user');
        localStorage.removeItem('demo_ideas');
        localStorage.removeItem('demo_templates');
      } else {
        await supabase.auth.signOut();
      }
      
      setAuthState({
        user: null,
        isAuthenticated: false,
        isLoading: false,
        isDemoMode: false,
      });
    } catch (error: any) {
      throw new Error(error.message || 'Sign out failed');
    }
  };

  const enableDemoMode = () => {
    const demoUser: User = {
      id: 'demo-user',
      email: 'demo@startupLaunch.com',
      name: 'Demo User',
      createdAt: new Date().toISOString(),
      onboardingCompleted: false,
      onboardingStep: 0,
    };

    localStorage.setItem('demo_user', JSON.stringify(demoUser));
    
    setAuthState({
      user: demoUser,
      isAuthenticated: true,
      isLoading: false,
      isDemoMode: true,
    });
  };

  const updateUser = async (updates: Partial<User>) => {
    if (!authState.user) return;

    try {
      if (authState.isDemoMode) {
        const updatedUser = { ...authState.user, ...updates };
        localStorage.setItem('demo_user', JSON.stringify(updatedUser));
        setAuthState(prev => ({ ...prev, user: updatedUser }));
      } else {
        const { error } = await supabase
          .from('profiles')
          .update({
            name: updates.name,
            avatar: updates.avatar,
            onboarding_completed: updates.onboardingCompleted,
            onboarding_step: updates.onboardingStep,
          })
          .eq('id', authState.user.id);

        if (error) throw error;

        setAuthState(prev => ({
          ...prev,
          user: prev.user ? { ...prev.user, ...updates } : null
        }));
      }
    } catch (error: any) {
      throw new Error(error.message || 'Failed to update user');
    }
  };

  const value: AuthContextType = {
    ...authState,
    signUp,
    signIn,
    signOut,
    enableDemoMode,
    updateUser,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};