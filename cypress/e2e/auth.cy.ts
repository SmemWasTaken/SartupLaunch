describe('Authentication', () => {
  beforeEach(() => {
    cy.visit('/');
  });

  it('should display login form correctly', () => {
    cy.contains('Login').click();
    
    // Check form elements
    cy.get('input[name="email"]').should('be.visible');
    cy.get('input[name="password"]').should('be.visible');
    cy.get('button[type="submit"]').should('contain', 'Sign In');
    
    // Check social login buttons
    cy.contains('Google').should('be.visible');
    cy.contains('GitHub').should('be.visible');
  });

  it('should display signup form correctly', () => {
    cy.contains('Sign Up Free').click();
    
    // Check form elements
    cy.get('input[name="firstName"]').should('be.visible');
    cy.get('input[name="lastName"]').should('be.visible');
    cy.get('input[name="email"]').should('be.visible');
    cy.get('input[name="password"]').should('be.visible');
    cy.get('input[name="confirmPassword"]').should('be.visible');
    cy.get('button[type="submit"]').should('contain', 'Create Account');
  });

  it('should validate login form', () => {
    cy.visit('/login');
    
    // Try to submit empty form
    cy.get('button[type="submit"]').click();
    
    // Check for validation messages (these would appear after form submission)
    cy.get('input[name="email"]:invalid').should('exist');
    cy.get('input[name="password"]:invalid').should('exist');
  });

  it('should validate signup form', () => {
    cy.visit('/signup');
    
    // Fill form with invalid data
    cy.get('input[name="firstName"]').type('J');
    cy.get('input[name="email"]').type('invalid-email');
    cy.get('input[name="password"]').type('weak');
    cy.get('input[name="confirmPassword"]').type('different');
    
    // Try to submit
    cy.get('button[type="submit"]').click();
    
    // Form should not submit due to validation
    cy.url().should('include', '/signup');
  });

  it('should toggle password visibility', () => {
    cy.visit('/login');
    
    // Password should be hidden by default
    cy.get('input[name="password"]').should('have.attr', 'type', 'password');
    
    // Click toggle button
    cy.get('button').contains('svg').parent().click();
    
    // Password should now be visible
    cy.get('input[name="password"]').should('have.attr', 'type', 'text');
  });
});