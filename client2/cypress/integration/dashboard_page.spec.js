

describe('Dashboard Page', () => {

	beforeEach(() => {
		cy.clearLocalStorage();
		cy.visit('/');
		cy.get('#email').type('test@gmail.com');
		cy.get('#password').type(`${'password123'}{enter}`);
		cy.get('.page-title > b').should('have.text', 'You are logged in!');
	});

	it('shows user information when user is logged in', function () {
		cy.get('#userEmail').should('have.text', 'Email: test@gmail.com');
		cy.get('#userAge').should('have.text', 'Age: 32');
		cy.get('#userIsAdmin').should('have.text', 'isAdmin: false');
  	})

  	it('should redirect to login form when you click logout', function () {
		cy.get('.page-btn').click();
		cy.url().should('include', '/');
  	})

  	it('should clear user credentials stored in localStorage when you click logout', function () {
		cy.get('.page-btn').click();
		cy.url().should('include', '/');
		cy.getLocalStorage("user").should('not.exist');
  	})

  	it('should clear token stored in localStorage when you click logout', function () {
		cy.get('.page-btn').click();
		cy.url().should('include', '/');
		cy.getLocalStorage("token").should('not.exist');
  	})

  	it('should have relevent dashboard message when you are not logged in', function () {
		cy.get('.page-btn').click();
		cy.url().should('include', '/');
		cy.visit('/dashboard');
		cy.get('b').should('have.text', 'You are NOT logged in!')
  	})



})