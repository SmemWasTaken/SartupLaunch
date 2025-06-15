export const validateEmail = (email: string): boolean => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

export const validatePassword = (password: string): { isValid: boolean; errors: string[] } => {
  const errors: string[] = [];
  
  if (password.length < 8) {
    errors.push('Password must be at least 8 characters long');
  }
  
  if (!/[A-Z]/.test(password)) {
    errors.push('Password must contain at least one uppercase letter');
  }
  
  if (!/[a-z]/.test(password)) {
    errors.push('Password must contain at least one lowercase letter');
  }
  
  if (!/\d/.test(password)) {
    errors.push('Password must contain at least one number');
  }

  return {
    isValid: errors.length === 0,
    errors,
  };
};

export const validateName = (name: string): boolean => {
  return name.trim().length >= 2;
};

export const sanitizeInput = (input: string): string => {
  return input
    .trim()
    .replace(/[<>]/g, '') // Remove potential HTML tags
    .replace(/[&]/g, '&amp;')
    .replace(/['"]/g, '');
};

export const validateIdeaGeneratorParams = (params: any): { isValid: boolean; errors: string[] } => {
  const errors: string[] = [];
  
  if (!params.interests || params.interests.length === 0) {
    errors.push('Please select at least one interest');
  }
  
  if (!params.skills || params.skills.length === 0) {
    errors.push('Please select at least one skill');
  }
  
  if (!params.industry) {
    errors.push('Please select an industry');
  }
  
  if (!params.budget) {
    errors.push('Please select a budget range');
  }
  
  if (!params.timeframe) {
    errors.push('Please select a timeframe');
  }

  return {
    isValid: errors.length === 0,
    errors,
  };
};