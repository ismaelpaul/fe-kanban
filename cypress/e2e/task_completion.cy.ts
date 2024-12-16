describe('Task Completion', () => {
	beforeEach(() => {
		cy.fixture('loginData').as('loginData');

		cy.get('@loginData').then((loginData) => {
			cy.login(loginData.email, loginData.password);
		});

		cy.getCookie('token').should('exist');

		cy.visit('/boards');
	});

	it('changes the task status to complete or incomplete based on initial task status ', () => {
		// Find and click on a random task
		cy.get('[data-cy^="task-card-"]').then((tasks) => {
			// Ensure there are tasks on the page
			expect(tasks.length).to.be.greaterThan(0);

			// Generate a random index
			const randomIndex = Math.floor(Math.random() * tasks.length);

			// Click on the randomly selected task
			cy.wrap(tasks[randomIndex]).click({ force: true });
		});

		// Check for Mark complete/incomplete button
		cy.get('[data-cy="task-completion-btn"]')
			.should('be.visible')
			.should(($btn) => {
				expect($btn.text().trim()).to.be.oneOf([
					'Mark complete',
					'Mark Incomplete',
				]);
			});
		// Click on the button
		cy.get('[data-cy="task-completion-btn"]').click();
	});
});
