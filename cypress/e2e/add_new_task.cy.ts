describe('Task Insertion', () => {
	beforeEach(() => {
		cy.fixture('loginData').as('loginData');

		cy.get('@loginData').then((loginData) => {
			cy.login(loginData.email, loginData.password);
		});

		cy.getCookie('token').should('exist');
	});

	it('writes a task ', () => {
		// Open the Add New Task Modal
		cy.get('[data-cy=open-add-task-modal]').click();

		// Fill out the task form
		cy.get('[data-cy=input-title]').type('New Task Title');
		cy.get('[data-cy=text-area-description]').type('Task description');

		// Add subtasks
		cy.get('input[name="subtasks.0.title"]').type('Subtask 1');
		cy.get('input[name="subtasks.1.title"]').type('Subtask 2');

		// Add new subtask input
		cy.get('[data-cy=add-new-subtask]').click();

		// Add one more subtask
		cy.get('input[name="subtasks.2.title"]').type('Subtask 3');

		// Select the status
		cy.get('[data-cy=dropdown-status]').click();
		cy.get('[data-cy=dropdown-status]')
			.parent()
			.find('ul > li')
			.then(($options) => {
				// Calculate the number of options
				const optionsCount = $options.length;

				// Generate a random index from 0 to optionsCount - 1
				const randomIndex = Math.floor(Math.random() * optionsCount);

				// Get the selected option text
				const selectedColumn = $options[randomIndex].innerText;

				// Store the selected column (status) in an alias
				cy.wrap(selectedColumn).as('selectedColumn');

				// Select the random option
				cy.wrap($options[randomIndex]).click();
			});

		// Submits the task
		cy.get('[data-cy=submit-task]').click();
	});
});
