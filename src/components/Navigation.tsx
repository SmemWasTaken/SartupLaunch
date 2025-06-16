import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useUser } from '@/contexts/UserContext';
import { usePlanFeatures } from '@/hooks/usePlanFeatures';
import { cn } from '@/lib/utils';
import { MessageSquare, Users, BarChart } from 'lucide-react';

export function Navigation() {
  const { user } = useUser();
  const { hasFeature } = usePlanFeatures();
  const location = useLocation();

  const supportLinks = [
    {
      label: 'Support Tickets',
      href: '/support',
      icon: <MessageSquare className="h-4 w-4" />,
    },
    {
      label: 'Community',
      href: '/community',
      icon: <Users className="h-4 w-4" />,
    },
    {
      label: 'Analytics',
      href: '/support/analytics',
      icon: <BarChart className="h-4 w-4" />,
      show: hasFeature('analytics'),
    },
  ];

  return (
    <nav className="flex flex-col h-full">
      <div className="space-y-1">
        <h3 className="px-4 text-sm font-semibold text-muted-foreground">Support</h3>
        {supportLinks.map((link) => {
          if (link.show === false) return null;
          return (
            <Link
              key={link.href}
              to={link.href}
              className={cn(
                'flex items-center px-4 py-2 text-sm font-medium rounded-md',
                location.pathname === link.href
                  ? 'bg-accent text-accent-foreground'
                  : 'text-muted-foreground hover:bg-accent hover:text-accent-foreground'
              )}
            >
              {link.icon}
              <span className="ml-3">{link.label}</span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
} 