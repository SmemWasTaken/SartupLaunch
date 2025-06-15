describe('Navigation', () => {
  beforeEach(() => {
    cy.visit('/');
  });

  it('should navigate to all main pages', () => {
    // Test homepage
    cy.contains('Launch Your Micro-Startup').should('be.visible');
    
    // Test navigation to How it Works
    cy.contains('How it Works').click();
    cy.url().should('include', '/how-it-works');
    cy.contains('How StartupLaunch Works').should('be.visible');
    
    // Test navigation to Templates
    cy.visit('/');
    cy.contains('Templates').click();
    cy.url().should('include', '/templates');
    cy.contains('Launch-Ready Templates').should('be.visible');
    
    // Test navigation to Pricing
    cy.visit('/');
    cy.contains('Pricing').click();
    cy.url().should('include', '/pricing');
    cy.contains('Simple, Transparent Pricing').should('be.visible');
    
    // Test navigation to Login
    cy.visit('/');
    cy.contains('Login').click();
    cy.url().should('include', '/login');
    cy.contains('Welcome Back').should('be.visible');
    
    // Test navigation to Signup
    cy.visit('/');
    cy.contains('Sign Up Free').click();
    cy.url().should('include', '/signup');
    cy.contains('Create Your Account').should('be.visible');
  });

  it('should have working mobile navigation', () => {
    cy.viewport('iphone-6');
    
    // Open mobile menu
    cy.get('[data-testid="mobile-menu-button"]').should('be.visible').click();
    
    // Test mobile navigation links
    cy.contains('How it Works').should('be.visible');
    cy.contains('Templates').should('be.visible');
    cy.contains('Pricing').should('be.visible');
  });
});