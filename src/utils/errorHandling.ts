// Error types
export class AppError extends Error {
  constructor(
    message: string,
    public code: string,
    public statusCode: number = 500
  ) {
    super(message);
    this.name = 'AppError';
  }
}

export class ValidationError extends AppError {
  constructor(message: string, public field?: string) {
    super(message, 'VALIDATION_ERROR', 400);
    this.name = 'ValidationError';
  }
}

export class NetworkError extends AppError {
  constructor(message: string = 'Network request failed') {
    super(message, 'NETWORK_ERROR', 0);
    this.name = 'NetworkError';
  }
}

export class AuthenticationError extends AppError {
  constructor(message: string = 'Authentication failed') {
    super(message, 'AUTH_ERROR', 401);
    this.name = 'AuthenticationError';
  }
}

// Error logging utility
export const logError = (error: Error, context?: Record<string, any>): void => {
  const errorInfo = {
    message: error.message,
    name: error.name,
    stack: error.stack,
    timestamp: new Date().toISOString(),
    context,
    userAgent: typeof navigator !== 'undefined' ? navigator.userAgent : 'unknown',
    url: typeof window !== 'undefined' ? window.location.href : 'unknown',
  };

  // Always log to console for debugging
  console.error('Error logged:', errorInfo);

  // In production, you would send to error tracking service
  if (import.meta.env.PROD && typeof window !== 'undefined') {
    // Example: Send to error tracking service
    try {
      // You could send to Sentry, LogRocket, etc.
      console.warn('Production error logged:', errorInfo);
    } catch (e) {
      console.error('Failed to log error to tracking service:', e);
    }
  }
};

// Global error handler
export const handleGlobalError = (error: Error): void => {
  logError(error, { type: 'global' });
  
  // Show user-friendly message
  if (error instanceof ValidationError) {
    // Handle validation errors
    console.warn('Validation error:', error.message);
  } else if (error instanceof NetworkError) {
    // Handle network errors
    console.warn('Network error:', error.message);
  } else if (error instanceof AuthenticationError) {
    // Handle auth errors
    console.warn('Authentication error:', error.message);
  } else {
    // Handle unexpected errors
    console.error('Unexpected error:', error.message);
  }
};

// Async error wrapper
export const withErrorHandling = <T extends any[], R>(
  fn: (...args: T) => Promise<R>
) => {
  return async (...args: T): Promise<R | null> => {
    try {
      return await fn(...args);
    } catch (error) {
      if (error instanceof Error) {
        handleGlobalError(error);
      } else {
        handleGlobalError(new Error('Unknown error occurred'));
      }
      return null;
    }
  };
};

// API request wrapper with error handling
export const apiRequest = async <T>(
  url: string,
  options: RequestInit = {}
): Promise<T> => {
  try {
    const response = await fetch(url, {
      ...options,
      headers: {
        'Content-Type': 'application/json',
        ...options.headers,
      },
    });

    if (!response.ok) {
      if (response.status === 401) {
        throw new AuthenticationError('Please log in to continue');
      } else if (response.status === 400) {
        const errorData = await response.json().catch(() => ({}));
        throw new ValidationError(errorData.message || 'Invalid request');
      } else {
        throw new AppError(
          `Request failed: ${response.statusText}`,
          'API_ERROR',
          response.status
        );
      }
    }

    return await response.json();
  } catch (error) {
    if (error instanceof AppError) {
      throw error;
    } else {
      throw new NetworkError('Failed to connect to server');
    }
  }
};