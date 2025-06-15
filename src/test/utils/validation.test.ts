import { describe, it, expect } from 'vitest';
import { loginSchema, signupSchema, contactSchema } from '../../utils/validation';

describe('Validation Schemas', () => {
  describe('loginSchema', () => {
    it('should validate correct login data', () => {
      const validData = {
        email: 'test@example.com',
        password: 'password123',
      };
      
      const result = loginSchema.safeParse(validData);
      expect(result.success).toBe(true);
    });

    it('should reject invalid email', () => {
      const invalidData = {
        email: 'invalid-email',
        password: 'password123',
      };
      
      const result = loginSchema.safeParse(invalidData);
      expect(result.success).toBe(false);
    });

    it('should reject short password', () => {
      const invalidData = {
        email: 'test@example.com',
        password: '123',
      };
      
      const result = loginSchema.safeParse(invalidData);
      expect(result.success).toBe(false);
    });
  });

  describe('signupSchema', () => {
    it('should validate correct signup data', () => {
      const validData = {
        firstName: 'John',
        lastName: 'Doe',
        email: 'john@example.com',
        password: 'Password123',
        confirmPassword: 'Password123',
      };
      
      const result = signupSchema.safeParse(validData);
      expect(result.success).toBe(true);
    });

    it('should reject mismatched passwords', () => {
      const invalidData = {
        firstName: 'John',
        lastName: 'Doe',
        email: 'john@example.com',
        password: 'Password123',
        confirmPassword: 'DifferentPassword',
      };
      
      const result = signupSchema.safeParse(invalidData);
      expect(result.success).toBe(false);
    });

    it('should reject weak password', () => {
      const invalidData = {
        firstName: 'John',
        lastName: 'Doe',
        email: 'john@example.com',
        password: 'weakpass',
        confirmPassword: 'weakpass',
      };
      
      const result = signupSchema.safeParse(invalidData);
      expect(result.success).toBe(false);
    });
  });

  describe('contactSchema', () => {
    it('should validate correct contact data', () => {
      const validData = {
        name: 'John Doe',
        email: 'john@example.com',
        subject: 'general',
        message: 'This is a test message with enough characters.',
      };
      
      const result = contactSchema.safeParse(validData);
      expect(result.success).toBe(true);
    });

    it('should reject short message', () => {
      const invalidData = {
        name: 'John Doe',
        email: 'john@example.com',
        subject: 'general',
        message: 'Short',
      };
      
      const result = contactSchema.safeParse(invalidData);
      expect(result.success).toBe(false);
    });
  });
});