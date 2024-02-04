describe('Home page', () => {
	it('succesfully loads the home page with first board, columns, tasks and subtasks', () => {
		cy.visit('http://localhost:5173');
	});
});
