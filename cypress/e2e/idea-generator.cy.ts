describe('Idea Generator', () => {
  beforeEach(() => {
    cy.visit('/');
  });

  it('should generate startup idea', () => {
    // Scroll to idea generator section
    cy.contains('Generate My Startup Idea').click();
    
    // Fill in the form
    cy.get('textarea[placeholder*="passionate about sustainability"]')
      .type('I am passionate about sustainable technology and have experience in mobile app development');
    
    // Select category
    cy.get('select').select('Mobile App');
    
    // Submit form
    cy.contains('Generate Startup Idea').click();
    
    // Wait for idea to be generated
    cy.contains('Generating Your Startup...', { timeout: 3000 }).should('be.visible');
    
    // Check that idea is displayed
    cy.contains('Est. Revenue', { timeout: 5000 }).should('be.visible');
    cy.contains('Time to Launch').should('be.visible');
    cy.contains('Difficulty').should('be.visible');
  });

  it('should require input before generating', () => {
    cy.visit('/');
    cy.contains('Generate My Startup Idea').click();
    
    // Try to generate without input
    cy.contains('Generate Startup Idea').should('be.disabled');
  });

  it('should scroll to templates after idea generation', () => {
    cy.visit('/');
    cy.contains('Generate My Startup Idea').click();
    
    // Fill form and generate idea
    cy.get('textarea[placeholder*="passionate about sustainability"]')
      .type('Test idea for automation');
    
    cy.contains('Generate Startup Idea').click();
    
    // Wait for generation and check if templates section is visible
    cy.contains('Launch-Ready Templates', { timeout: 6000 }).should('be.visible');
  });
});