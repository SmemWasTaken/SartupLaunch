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
import { DashboardPage } from './pages/DashboardPage';
import { TemplatesPage } from './pages/TemplatesPage';
import { useAuth } from './contexts/AuthContext';
import { LoadingPage } from './components/LoadingSpinner';

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
        
        <Route path="/templates" element={
          <AppLayout>
            <TemplatesPage />
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
              <HomePage />
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

        {/* Placeholder Routes */}
        <Route path="/how-it-works" element={
          <AppLayout>
            <div className="max-w-4xl mx-auto px-4 py-16 text-center">
              <h1 className="text-4xl font-bold text-gray-900 mb-4">How It Works</h1>
              <p className="text-xl text-gray-600">Coming soon...</p>
            </div>
          </AppLayout>
        } />
        
        <Route path="/pricing" element={
          <AppLayout>
            <div className="max-w-4xl mx-auto px-4 py-16 text-center">
              <h1 className="text-4xl font-bold text-gray-900 mb-4">Pricing</h1>
              <p className="text-xl text-gray-600">Coming soon...</p>
            </div>
          </AppLayout>
        } />
        
        <Route path="/faq" element={
          <AppLayout>
            <div className="max-w-4xl mx-auto px-4 py-16 text-center">
              <h1 className="text-4xl font-bold text-gray-900 mb-4">FAQ</h1>
              <p className="text-xl text-gray-600">Coming soon...</p>
            </div>
          </AppLayout>
        } />
        
        <Route path="/contact" element={
          <AppLayout>
            <div className="max-w-4xl mx-auto px-4 py-16 text-center">
              <h1 className="text-4xl font-bold text-gray-900 mb-4">Contact Us</h1>
              <p className="text-xl text-gray-600">Coming soon...</p>
            </div>
          </AppLayout>
        } />
        
        <Route path="/privacy" element={
          <AppLayout>
            <div className="max-w-4xl mx-auto px-4 py-16 text-center">
              <h1 className="text-4xl font-bold text-gray-900 mb-4">Privacy Policy</h1>
              <p className="text-xl text-gray-600">Coming soon...</p>
            </div>
          </AppLayout>
        } />
        
        <Route path="/terms" element={
          <AppLayout>
            <div className="max-w-4xl mx-auto px-4 py-16 text-center">
              <h1 className="text-4xl font-bold text-gray-900 mb-4">Terms of Service</h1>
              <p className="text-xl text-gray-600">Coming soon...</p>
            </div>
          </AppLayout>
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