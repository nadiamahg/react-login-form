beforeEach(() => {
	cy.clearLocalStorage();
	cy.visit('/');
});

describe('Login Page', () => {

	it('successfully redirects to dashboard when correct user credentials are used', function () {
	    cy.get('#email').type('test@gmail.com');
	    cy.get('#password').type(`${'password123'}{enter}`);
	    cy.url().should('include', '/dashboard');
  	})

  	it('saves token to local storage', function () {
		cy.get('#email').type('test@gmail.com');
	    cy.get('#password').type(`${'password123'}{enter}`);
	    expect(cy.getLocalStorage("token")).to.exist;
  	})

  	it('saves user credentials to local storage', function () {
		cy.get('#email').type('test@gmail.com');
	    cy.get('#password').type(`${'password123'}{enter}`);
	    expect(cy.getLocalStorage("user")).to.exist;
  	})

	it('shows error message when empty login form submitted', function() {
		cy.get('.page-btn').click();
		cy.get('#emailError').should('have.text', 'Email field is required');
		cy.get('#passwordError').should('have.text', 'Password field is required');
		cy.url().should('include', '/');
	})

	it('shows error message when invalid email address submitted', function() {
		cy.get('#email').type('testgmail.com');
	    cy.get('#password').type(`${'password123'}{enter}`);
		cy.get('#emailError').should('have.text', 'Email is invalid');
		cy.url().should('include', '/');
	})

})