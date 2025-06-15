import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { ErrorBoundary } from './components/ErrorBoundary';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { AuthProvider } from './contexts/AuthContext';
import { OnboardingProvider } from './contexts/OnboardingContext';
import { HomePage } from './pages/HomePage';
import { LoginPage } from './pages/LoginPage';
import { SignupPage } from './pages/SignupPage';
import { CartPage } from './pages/CartPage';
import { DashboardPage } from './pages/DashboardPage';
import { IdeaGenerationPage } from './pages/IdeaGenerationPage';
import { TemplatesPage } from './pages/TemplatesPage';
import HowItWorksPage from './pages/HowItWorksPage';
import PricingPage from './pages/PricingPage';
import FAQPage from './pages/FAQPage';
import AboutPage from './pages/AboutPage';
import ContactPage from './pages/ContactPage';
import CareersPage from './pages/CareersPage';
import BlogPage from './pages/BlogPage';
import PrivacyPage from './pages/PrivacyPage';
import TermsPage from './pages/TermsPage';
import CookiePage from './pages/CookiePage';
import RefundPage from './pages/RefundPage';
import StartupGuidePage from './pages/StartupGuidePage';
import SuccessStoriesPage from './pages/SuccessStoriesPage';
import HelpCenterPage from './pages/HelpCenterPage';
import APIDocsPage from './pages/APIDocsPage';
import ProfilePage from './pages/ProfilePage';
import { useAuth } from './contexts/AuthContext';
import { LoadingPage } from './components/LoadingSpinner';
import AdminDashboard from './components/AdminDashboard';
import AllIdeasPage from './pages/AllIdeasPage';

// Protected Route Component
const ProtectedRoute: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { isAuthenticated, isLoading } = useAuth();

  if (isLoading) {
    return <LoadingPage message="Checking authentication..." />;
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  return <>{children}</>;
};

// App Layout Component
const AppLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <Header />
      <main className="flex-1">
        {children}
      </main>
      <Footer />
    </div>
  );
};

// Main App Component
const AppContent: React.FC = () => {
  return (
    <Router>
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={
          <AppLayout>
            <HomePage />
          </AppLayout>
        } />
        
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignupPage />} />
        
        <Route path="/how-it-works" element={
          <AppLayout>
            <HowItWorksPage />
          </AppLayout>
        } />
        
        <Route path="/pricing" element={
          <AppLayout>
            <PricingPage />
          </AppLayout>
        } />
        
        <Route path="/faq" element={
          <AppLayout>
            <FAQPage />
          </AppLayout>
        } />
        
        <Route path="/about" element={
          <AppLayout>
            <AboutPage />
          </AppLayout>
        } />
        
        <Route path="/contact" element={
          <AppLayout>
            <ContactPage />
          </AppLayout>
        } />
        
        <Route path="/careers" element={
          <AppLayout>
            <CareersPage />
          </AppLayout>
        } />
        
        <Route path="/blog" element={
          <AppLayout>
            <BlogPage />
          </AppLayout>
        } />
        
        <Route path="/privacy" element={
          <AppLayout>
            <PrivacyPage />
          </AppLayout>
        } />
        
        <Route path="/terms" element={
          <AppLayout>
            <TermsPage />
          </AppLayout>
        } />
        
        <Route path="/cookies" element={
          <AppLayout>
            <CookiePage />
          </AppLayout>
        } />
        
        <Route path="/refunds" element={
          <AppLayout>
            <RefundPage />
          </AppLayout>
        } />
        
        <Route path="/startup-guide" element={
          <AppLayout>
            <StartupGuidePage />
          </AppLayout>
        } />
        
        <Route path="/success-stories" element={
          <AppLayout>
            <SuccessStoriesPage />
          </AppLayout>
        } />
        
        <Route path="/help" element={
          <AppLayout>
            <HelpCenterPage />
          </AppLayout>
        } />
        
        <Route path="/api-docs" element={
          <AppLayout>
            <APIDocsPage />
          </AppLayout>
        } />
        
        <Route path="/templates" element={
          <AppLayout>
            <TemplatesPage />
          </AppLayout>
        } />

        <Route path="/cart" element={
          <AppLayout>
            <CartPage />
          </AppLayout>
        } />

        {/* Protected Routes */}
        <Route path="/dashboard" element={
          <ProtectedRoute>
            <AppLayout>
              <DashboardPage />
            </AppLayout>
          </ProtectedRoute>
        } />

        <Route path="/dashboard/generate" element={
          <ProtectedRoute>
            <AppLayout>
              <IdeaGenerationPage />
            </AppLayout>
          </ProtectedRoute>
        } />

        <Route path="/dashboard/analytics" element={
          <ProtectedRoute>
            <AppLayout>
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                <h1 className="text-3xl font-bold text-gray-900 mb-6">Analytics Dashboard</h1>
                <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
                  <p className="text-gray-600">Analytics features coming soon...</p>
                </div>
              </div>
            </AppLayout>
          </ProtectedRoute>
        } />

        <Route path="/dashboard/ideas" element={
          <ProtectedRoute>
            <AppLayout>
              <AllIdeasPage />
            </AppLayout>
          </ProtectedRoute>
        } />

        <Route path="/admin" element={
          <ProtectedRoute>
            <AppLayout>
              <AdminDashboard />
            </AppLayout>
          </ProtectedRoute>
        } />

        <Route path="/profile" element={
          <ProtectedRoute>
            <AppLayout>
              <ProfilePage />
            </AppLayout>
          </ProtectedRoute>
        } />

        {/* Catch all route */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Router>
  );
};

function App() {
  return (
    <ErrorBoundary>
      <AuthProvider>
        <OnboardingProvider>
          <AppContent />
        </OnboardingProvider>
      </AuthProvider>
    </ErrorBoundary>
  );
}

export default App;