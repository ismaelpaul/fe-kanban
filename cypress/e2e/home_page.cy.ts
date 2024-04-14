describe('First load home page', () => {
	beforeEach(() => {
		cy.loginByGoogleApi(); // Custom command to login
	});

	it('fetch boards, columns, tasks and subtasks and render', () => {
		cy.visit('http://localhost:5173/boards');
	});
});
