import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Eye, EyeOff, Mail, Lock, User, Rocket, AlertCircle, CheckCircle } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import { validateEmail, validatePassword, validateName } from '../utils/validation';
import { LoadingSpinner } from '../components/LoadingSpinner';
import { trackUserSignUp } from '../utils/analytics';

export const SignupPage: React.FC = () => {
  const navigate = useNavigate();
  const { signUp, enableDemoMode } = useAuth();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    agreeToTerms: false,
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [errors, setErrors] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
    // Clear errors when user starts typing
    if (errors.length > 0) {
      setErrors([]);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    const newErrors: string[] = [];
    
    if (!validateName(formData.name)) {
      newErrors.push('Name must be at least 2 characters long');
    }
    
    if (!formData.email) {
      newErrors.push('Email is required');
    } else if (!validateEmail(formData.email)) {
      newErrors.push('Please enter a valid email address');
    }
    
    const passwordValidation = validatePassword(formData.password);
    if (!passwordValidation.isValid) {
      newErrors.push(...passwordValidation.errors);
    }
    
    if (formData.password !== formData.confirmPassword) {
      newErrors.push('Passwords do not match');
    }
    
    if (!formData.agreeToTerms) {
      newErrors.push('You must agree to the Terms of Service and Privacy Policy');
    }
    
    if (newErrors.length > 0) {
      setErrors(newErrors);
      return;
    }

    setIsLoading(true);
    setErrors([]);

    try {
      await signUp(formData.email, formData.password, formData.name);
      trackUserSignUp('email');
      navigate('/dashboard');
    } catch (error: any) {
      setErrors([error.message || 'Sign up failed. Please try again.']);
    } finally {
      setIsLoading(false);
    }
  };

  const handleDemoMode = () => {
    enableDemoMode();
    trackUserSignUp('demo');
    navigate('/dashboard');
  };

  const passwordValidation = validatePassword(formData.password);

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-50 via-white to-accent-50 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        {/* Header */}
        <div className="text-center">
          <Link to="/" className="inline-flex items-center space-x-2 group mb-8">
            <div className="w-12 h-12 bg-gradient-to-br from-primary-600 to-accent-600 rounded-xl flex items-center justify-center group-hover:scale-105 transition-transform duration-200">
              <Rocket className="w-6 h-6 text-white" />
            </div>
            <span className="text-2xl font-bold bg-gradient-to-r from-primary-600 to-accent-600 bg-clip-text text-transparent">
              StartupLaunch
            </span>
          </Link>
          
          <h2 className="text-3xl font-bold text-gray-900 mb-2">
            Create your account
          </h2>
          <p className="text-gray-600">
            Join thousands of entrepreneurs building successful startups
          </p>
        </div>

        {/* Demo Mode Banner */}
        <div className="bg-yellow-50 border border-yellow-200 rounded-xl p-4">
          <div className="flex items-start space-x-3">
            <div className="w-5 h-5 bg-yellow-400 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
              <span className="text-xs font-bold text-yellow-900">!</span>
            </div>
            <div className="space-y-2">
              <p className="text-sm text-yellow-800 font-medium">
                Try without signing up
              </p>
              <p className="text-xs text-yellow-700">
                Experience all features with demo mode - no account required
              </p>
              <button
                onClick={handleDemoMode}
                className="text-xs bg-yellow-400 hover:bg-yellow-500 text-yellow-900 px-3 py-1 rounded-lg font-medium transition-colors duration-200"
              >
                Enter Demo Mode
              </button>
            </div>
          </div>
        </div>

        {/* Form */}
        <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-8">
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Name */}
            <div className="space-y-2">
              <label htmlFor="name" className="text-sm font-semibold text-gray-900">
                Full name
              </label>
              <div className="relative">
                <User className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  id="name"
                  name="name"
                  type="text"
                  autoComplete="name"
                  value={formData.name}
                  onChange={handleChange}
                  className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all duration-200"
                  placeholder="Enter your full name"
                />
              </div>
            </div>

            {/* Email */}
            <div className="space-y-2">
              <label htmlFor="email" className="text-sm font-semibold text-gray-900">
                Email address
              </label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all duration-200"
                  placeholder="Enter your email"
                />
              </div>
            </div>

            {/* Password */}
            <div className="space-y-2">
              <label htmlFor="password" className="text-sm font-semibold text-gray-900">
                Password
              </label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  id="password"
                  name="password"
                  type={showPassword ? 'text' : 'password'}
                  autoComplete="new-password"
                  value={formData.password}
                  onChange={handleChange}
                  className="w-full pl-10 pr-12 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all duration-200"
                  placeholder="Create a password"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors duration-200"
                >
                  {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>
              
              {/* Password Requirements */}
              {formData.password && (
                <div className="space-y-1 mt-2">
                  <div className={`flex items-center space-x-2 text-xs ${
                    formData.password.length >= 8 ? 'text-green-600' : 'text-gray-500'
                  }`}>
                    <CheckCircle className={`w-3 h-3 ${
                      formData.password.length >= 8 ? 'text-green-600' : 'text-gray-300'
                    }`} />
                    <span>At least 8 characters</span>
                  </div>
                  <div className={`flex items-center space-x-2 text-xs ${
                    /[A-Z]/.test(formData.password) ? 'text-green-600' : 'text-gray-500'
                  }`}>
                    <CheckCircle className={`w-3 h-3 ${
                      /[A-Z]/.test(formData.password) ? 'text-green-600' : 'text-gray-300'
                    }`} />
                    <span>One uppercase letter</span>
                  </div>
                  <div className={`flex items-center space-x-2 text-xs ${
                    /\d/.test(formData.password) ? 'text-green-600' : 'text-gray-500'
                  }`}>
                    <CheckCircle className={`w-3 h-3 ${
                      /\d/.test(formData.password) ? 'text-green-600' : 'text-gray-300'
                    }`} />
                    <span>One number</span>
                  </div>
                </div>
              )}
            </div>

            {/* Confirm Password */}
            <div className="space-y-2">
              <label htmlFor="confirmPassword" className="text-sm font-semibold text-gray-900">
                Confirm password
              </label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  id="confirmPassword"
                  name="confirmPassword"
                  type={showConfirmPassword ? 'text' : 'password'}
                  autoComplete="new-password"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  className="w-full pl-10 pr-12 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all duration-200"
                  placeholder="Confirm your password"
                />
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors duration-200"
                >
                  {showConfirmPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>
            </div>

            {/* Terms Agreement */}
            <div className="flex items-start space-x-3">
              <input
                id="agreeToTerms"
                name="agreeToTerms"
                type="checkbox"
                checked={formData.agreeToTerms}
                onChange={handleChange}
                className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded mt-1"
              />
              <label htmlFor="agreeToTerms" className="text-sm text-gray-700 leading-relaxed">
                I agree to the{' '}
                <Link to="/terms" className="text-primary-600 hover:text-primary-700 font-medium">
                  Terms of Service
                </Link>{' '}
                and{' '}
                <Link to="/privacy" className="text-primary-600 hover:text-primary-700 font-medium">
                  Privacy Policy
                </Link>
              </label>
            </div>

            {/* Errors */}
            {errors.length > 0 && (
              <div className="bg-red-50 border border-red-200 rounded-xl p-4">
                <div className="flex items-start space-x-2">
                  <AlertCircle className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" />
                  <div className="space-y-1">
                    {errors.map((error, index) => (
                      <p key={index} className="text-sm text-red-600">
                        {error}
                      </p>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-gradient-to-r from-primary-600 to-accent-600 hover:from-primary-700 hover:to-accent-700 text-white font-semibold py-3 px-4 rounded-xl transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed shadow-lg hover:shadow-xl"
            >
              {isLoading ? (
                <LoadingSpinner size="sm" text="Creating account..." />
              ) : (
                'Create Account'
              )}
            </button>
          </form>

          {/* Sign In Link */}
          <div className="mt-6 text-center">
            <p className="text-sm text-gray-600">
              Already have an account?{' '}
              <Link
                to="/login"
                className="text-primary-600 hover:text-primary-700 font-medium transition-colors duration-200"
              >
                Sign in
              </Link>
            </p>
          </div>
        </div>

        {/* Social Proof */}
        <div className="text-center">
          <p className="text-xs text-gray-500 mb-4">
            Join 2,400+ entrepreneurs who have launched successful startups
          </p>
          <div className="flex items-center justify-center space-x-4 opacity-60">
            <div className="w-8 h-8 bg-gray-200 rounded"></div>
            <div className="w-8 h-8 bg-gray-200 rounded"></div>
            <div className="w-8 h-8 bg-gray-200 rounded"></div>
            <div className="w-8 h-8 bg-gray-200 rounded"></div>
          </div>
        </div>
      </div>
    </div>
  );
};