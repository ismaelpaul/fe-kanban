describe('login form', () => {
	beforeEach(() => {
		cy.visit('/login');
	});

	it('greets with Choose a Login Method', () => {
		cy.contains('h1', 'Choose a Login Method');
	});

	it('links to /register', () => {
		cy.get('[data-cy="register-link"]')
			.should('have.attr', 'href', '/register')
			.and('contain', 'Register');
	});

	it('requires an email', () => {
		cy.get('[data-cy="login-btn"]').contains('Login').click();
		cy.get('[data-cy="email-error-message"]').should(
			'contain',
			"Can't be empty"
		);
	});

	it('requires a password', () => {
		cy.get('[data-cy="login-btn"]').contains('Login').click();
		cy.get('[data-cy="password-error-message"]').should(
			'contain',
			'Password has at least 6 characters'
		);
	});

	it('should show/hide password', () => {
		cy.get('[data-cy="password-input"]').type('whatever-password');
		cy.get('[data-cy="password-input"]').should(
			'have.attr',
			'type',
			'password'
		);
		cy.get('[data-cy="hide-show-password"]').click();
		cy.get('[data-cy="password-input"]').should('have.attr', 'type', 'text');
		cy.get('[data-cy="hide-show-password"]').click();
		cy.get('[data-cy="password-input"]').should(
			'have.attr',
			'type',
			'password'
		);
	});
	it('requires valid email', () => {
		cy.get('[data-cy="email-input"]').type('whatever-email{enter}');
		cy.get('[data-cy="email-error-message"]').should(
			'contain',
			'This is not a valid email.'
		);
	});
	it('requires a registered email and password', () => {
		cy.intercept('POST', '/api/user/login', {
			statusCode: 400,
			body: { message: 'Invalid email or password' },
		}).as('loginRequest');

		cy.get('[data-cy="email-input"]').type('invalidemail@example.com');
		cy.get('[data-cy="password-input"]').type('invalidpassword{enter}');

		cy.wait('@loginRequest');

		cy.get('[data-cy="toast-title"]').should('contain', 'Error!');
		cy.get('[data-cy="toast-message"]').should(
			'contain',
			'Invalid email or password'
		);
	});
});
