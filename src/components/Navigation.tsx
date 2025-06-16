import { Link, useLocation } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { usePlanFeatures } from '@/hooks/usePlanFeatures';
import { cn } from '@/lib/utils';
import { Users, BarChart } from 'lucide-react';

export function Navigation() {
  const { isAuthenticated } = useAuth();
  const { hasFeature } = usePlanFeatures();
  const location = useLocation();

  return (
    <nav className="flex items-center space-x-4">
      {isAuthenticated && (
        <>
          <Link
            to="/dashboard"
            className={cn(
              "text-sm font-medium transition-colors hover:text-primary",
              location.pathname === "/dashboard" ? "text-primary" : "text-muted-foreground"
            )}
          >
            Dashboard
          </Link>
          {hasFeature('team') && (
            <Link
              to="/team"
              className={cn(
                "text-sm font-medium transition-colors hover:text-primary",
                location.pathname === "/team" ? "text-primary" : "text-muted-foreground"
              )}
            >
              <Users className="w-4 h-4 mr-2" />
              Team
            </Link>
          )}
          {hasFeature('analytics') && (
            <Link
              to="/analytics"
              className={cn(
                "text-sm font-medium transition-colors hover:text-primary",
                location.pathname === "/analytics" ? "text-primary" : "text-muted-foreground"
              )}
            >
              <BarChart className="w-4 h-4 mr-2" />
              Analytics
            </Link>
          )}
        </>
      )}
    </nav>
  );
} 