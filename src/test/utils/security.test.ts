import { describe, it, expect } from 'vitest';
import { sanitizeHtml, sanitizeInput, generateCSRFToken, isValidCSRFToken } from '../../utils/security';

describe('Security Utils', () => {
  describe('sanitizeHtml', () => {
    it('should remove dangerous script tags', () => {
      const input = '<script>alert("xss")</script><p>Safe content</p>';
      const result = sanitizeHtml(input);
      expect(result).not.toContain('<script>');
      expect(result).toContain('<p>Safe content</p>');
    });

    it('should allow safe HTML tags', () => {
      const input = '<p>This is <strong>bold</strong> and <em>italic</em></p>';
      const result = sanitizeHtml(input);
      expect(result).toBe(input);
    });
  });

  describe('sanitizeInput', () => {
    it('should remove HTML tags from input', () => {
      const input = '<script>alert("xss")</script>Hello World';
      const result = sanitizeInput(input);
      expect(result).toBe('alert("xss")Hello World');
    });

    it('should trim whitespace', () => {
      const input = '  Hello World  ';
      const result = sanitizeInput(input);
      expect(result).toBe('Hello World');
    });

    it('should limit input length', () => {
      const input = 'a'.repeat(2000);
      const result = sanitizeInput(input);
      expect(result.length).toBe(1000);
    });
  });

  describe('CSRF Token', () => {
    it('should generate valid CSRF token', () => {
      const token = generateCSRFToken();
      expect(token).toHaveLength(64);
      expect(isValidCSRFToken(token)).toBe(true);
    });

    it('should reject invalid CSRF token', () => {
      expect(isValidCSRFToken('invalid')).toBe(false);
      expect(isValidCSRFToken('123')).toBe(false);
      expect(isValidCSRFToken('')).toBe(false);
    });
  });
});