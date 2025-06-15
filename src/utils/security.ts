import { StartupIdea, Template } from '../types';

// Rate limiting for API calls
class RateLimiter {
  private requests: Map<string, number[]> = new Map();
  private readonly maxRequests: number;
  private readonly windowMs: number;

  constructor(maxRequests: number = 10, windowMs: number = 60000) {
    this.maxRequests = maxRequests;
    this.windowMs = windowMs;
  }

  isAllowed(key: string): boolean {
    const now = Date.now();
    const requests = this.requests.get(key) || [];
    
    // Remove old requests outside the window
    const validRequests = requests.filter(time => now - time < this.windowMs);
    
    if (validRequests.length >= this.maxRequests) {
      return false;
    }
    
    validRequests.push(now);
    this.requests.set(key, validRequests);
    return true;
  }
}

export const ideaGenerationLimiter = new RateLimiter(5, 300000); // 5 requests per 5 minutes

// Input sanitization
export const sanitizeHtml = (input: string): string => {
  const map: { [key: string]: string } = {
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    '"': '&quot;',
    "'": '&#x27;',
    '/': '&#x2F;',
  };
  
  return input.replace(/[&<>"'/]/g, (s) => map[s]);
};

// CSRF token generation and validation
export const generateCsrfToken = (): string => {
  return Array.from({ length: 32 }, () => 
    Math.floor(Math.random() * 16).toString(16)
  ).join('');
};

export const validateCsrfToken = (token: string, storedToken: string): boolean => {
  return token === storedToken && token.length === 32;
};

// Secure random ID generation
export const generateSecureId = (prefix: string = ''): string => {
  const timestamp = Date.now().toString(36);
  const random = Math.random().toString(36).substr(2, 9);
  return `${prefix}${timestamp}${random}`;
};

// Content filtering
export const containsInappropriateContent = (text: string): boolean => {
  const inappropriateWords = [
    // Add words to filter out
    'spam', 'scam', 'illegal', 'fraud'
  ];
  
  const lowerText = text.toLowerCase();
  return inappropriateWords.some(word => lowerText.includes(word));
};

// Data validation for API responses
export const validateStartupIdea = (idea: any): idea is StartupIdea => {
  return (
    typeof idea.id === 'string' &&
    typeof idea.title === 'string' &&
    typeof idea.description === 'string' &&
    typeof idea.category === 'string' &&
    ['Easy', 'Medium', 'Hard'].includes(idea.difficulty) &&
    Array.isArray(idea.tags) &&
    typeof idea.isFavorite === 'boolean'
  );
};

export const validateTemplate = (template: any): template is Template => {
  return (
    typeof template.id === 'string' &&
    typeof template.title === 'string' &&
    typeof template.description === 'string' &&
    typeof template.price === 'number' &&
    template.price >= 0 &&
    typeof template.rating === 'number' &&
    template.rating >= 0 && template.rating <= 5
  );
};

// Secure localStorage operations
export const secureLocalStorage = {
  setItem: (key: string, value: any): void => {
    try {
      const serialized = JSON.stringify(value);
      localStorage.setItem(key, serialized);
    } catch (error) {
      console.error('Failed to save to localStorage:', error);
    }
  },
  
  getItem: <T>(key: string): T | null => {
    try {
      const item = localStorage.getItem(key);
      return item ? JSON.parse(item) : null;
    } catch (error) {
      console.error('Failed to read from localStorage:', error);
      return null;
    }
  },
  
  removeItem: (key: string): void => {
    try {
      localStorage.removeItem(key);
    } catch (error) {
      console.error('Failed to remove from localStorage:', error);
    }
  },
};

// Error logging (in production, this would send to a logging service)
export const logError = (error: Error, context?: any): void => {
  console.error('Application Error:', {
    message: error.message,
    stack: error.stack,
    context,
    timestamp: new Date().toISOString(),
    userAgent: navigator.userAgent,
  });
};