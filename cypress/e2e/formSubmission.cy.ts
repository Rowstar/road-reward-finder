describe('Road Reward Finder form submission', () => {
  it('submits the form and displays results', () => {
    cy.visit('/');
    // select vehicle type (first select element)
    cy.get('select').first().select('car');
    // set kilometres input (number input)
    cy.get('input[type="number"]').clear().type('50');
    // set days per week slider (range input)
    cy.get('input[type="range"]').invoke('val', 5).trigger('input');
    // submit the form
    cy.get('form').submit();
    // verify URL and results table
    cy.url().should('include', '/results');
    cy.get('table').should('exist');
    cy.get('tbody tr').its('length').should('be.gt', 0);
  });
});
