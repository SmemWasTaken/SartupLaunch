import React from 'react';
import { createBrowserRouter } from 'react-router-dom';
import DashboardPage from './pages/DashboardPage';
import HowItWorksPage from './pages/HowItWorksPage';
import PricingPage from './pages/PricingPage';
import LoginPage from './pages/LoginPage';
import SignupPage from './pages/SignupPage';
import SettingsPage from './pages/SettingsPage';
import BillingPage from './pages/BillingPage';
import FavoritesPage from './pages/FavoritesPage';
import TeamPage from './pages/TeamPage';
import TeamSettingsPage from './pages/TeamSettingsPage';
import TeamActivityPage from './pages/TeamActivityPage';
import CommunityPage from './pages/CommunityPage';
import SupportPage from './pages/SupportPage';
import { SupportAnalyticsPage } from '@/pages/SupportAnalyticsPage';
import { CreateTicketPage } from './pages/support/CreateTicketPage';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <DashboardPage />,
  },
  {
    path: '/how-it-works',
    element: <HowItWorksPage />,
  },
  {
    path: '/pricing',
    element: <PricingPage />,
  },
  {
    path: '/login',
    element: <LoginPage />,
  },
  {
    path: '/signup',
    element: <SignupPage />,
  },
  {
    path: '/settings',
    element: <SettingsPage />,
  },
  {
    path: '/billing',
    element: <BillingPage />,
  },
  {
    path: '/favorites',
    element: <FavoritesPage />,
  },
  {
    path: '/teams',
    element: <TeamPage />,
  },
  {
    path: '/team/:teamId',
    element: <TeamPage />,
  },
  {
    path: '/team/:teamId/settings',
    element: <TeamSettingsPage />,
  },
  {
    path: '/team/:teamId/activity',
    element: <TeamActivityPage />,
  },
  {
    path: '/community',
    element: <CommunityPage />,
  },
  {
    path: '/support',
    element: <SupportPage />,
  },
  {
    path: '/support/create',
    element: <CreateTicketPage />,
  },
  {
    path: 'support/analytics',
    element: <SupportAnalyticsPage />,
  },
]); 