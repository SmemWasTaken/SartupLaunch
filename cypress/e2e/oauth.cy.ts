describe('OAuth Authentication', () => {
  beforeEach(() => {
    cy.visit('/login');
  });

  it('should display OAuth buttons', () => {
    // Check Google OAuth button
    cy.contains('Continue with Google').should('be.visible');
    
    // Check GitHub OAuth button
    cy.contains('Continue with GitHub').should('be.visible');
  });

  it('should handle OAuth button clicks', () => {
    // Test Google OAuth button (will fail in test environment, but should not crash)
    cy.contains('Continue with Google').click();
    
    // Should still be on login page (since OAuth will fail in test environment)
    cy.url().should('include', '/login');
  });

  it('should display OAuth buttons on signup page', () => {
    cy.visit('/signup');
    
    // Check Google OAuth button
    cy.contains('Continue with Google').should('be.visible');
    
    // Check GitHub OAuth button
    cy.contains('Continue with GitHub').should('be.visible');
  });

  it('should show loading states during OAuth', () => {
    // This test would need to be expanded with proper OAuth mocking
    // For now, we just verify the buttons are clickable
    cy.contains('Continue with Google').should('not.be.disabled');
    cy.contains('Continue with GitHub').should('not.be.disabled');
  });
});