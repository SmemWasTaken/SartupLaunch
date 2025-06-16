import React, { createContext, useContext, useState, useEffect } from 'react';
import { useUser as useClerkUser } from '@clerk/clerk-react';
import { PLAN_FEATURES, PlanName, PlanFeatures } from '../config/planFeatures';

interface User {
  id: string;
  email: string;
  firstName?: string;
  lastName?: string;
  plan: PlanName;
}

interface UserContextType {
  user: User | null;
  isLoading: boolean;
  error: Error | null;
  planFeatures: PlanFeatures | null;
}

const UserContext = createContext<UserContextType>({
  user: null,
  isLoading: true,
  error: null,
  planFeatures: null,
});

export const useUser = () => useContext(UserContext);

export const UserProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { user: clerkUser, isLoaded: isClerkLoaded } = useClerkUser();
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);
  const [planFeatures, setPlanFeatures] = useState<PlanFeatures | null>(null);

  useEffect(() => {
    const loadUser = async () => {
      try {
        if (!isClerkLoaded) {
          return;
        }

        if (!clerkUser) {
          setUser(null);
          setPlanFeatures(null);
          setIsLoading(false);
          return;
        }

        // In a real app, fetch the user's plan from your backend
        // For now, we'll use 'basic' as the default
        const plan: PlanName = 'basic';
        const mockUser: User = {
          id: clerkUser.id,
          email: clerkUser.emailAddresses[0]?.emailAddress || '',
          firstName: clerkUser.firstName || undefined,
          lastName: clerkUser.lastName || undefined,
          plan,
        };

        setUser(mockUser);
        setPlanFeatures(PLAN_FEATURES[plan]);
      } catch (err) {
        setError(err instanceof Error ? err : new Error('Failed to load user data'));
      } finally {
        setIsLoading(false);
      }
    };

    loadUser();
  }, [clerkUser, isClerkLoaded]);

  return (
    <UserContext.Provider value={{ user, isLoading, error, planFeatures }}>
      {children}
    </UserContext.Provider>
  );
}; 