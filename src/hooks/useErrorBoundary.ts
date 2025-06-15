import { useState, useCallback } from 'react';
import { logError } from '../utils/errorHandling';

export const useErrorBoundary = () => {
  const [error, setError] = useState<Error | null>(null);

  const resetError = useCallback(() => {
    setError(null);
  }, []);

  const captureError = useCallback((error: Error, errorInfo?: any) => {
    logError(error, errorInfo);
    setError(error);
  }, []);

  return {
    error,
    resetError,
    captureError,
    hasError: error !== null,
  };
};