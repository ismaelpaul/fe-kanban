describe('First load home page', () => {
	it('fetch boards, columns, tasks and subtasks and render', () => {
		cy.visit('https://fe-kanban.netlify.app/');
	});
});
