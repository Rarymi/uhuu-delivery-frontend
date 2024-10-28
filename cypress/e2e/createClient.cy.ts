describe('Client Registration', () => {
	beforeEach(() => {
		cy.visit('http://localhost:5173');
	});

	it('should add a new client and display it in the table', () => {
		cy.get('input[placeholder="Nome Cliente"]').type('John Doe');
		cy.get('input[placeholder="Peso da Entrega"]').type('70');
		cy.get('input[placeholder="Endereço Cliente"]').type('Rua Exemplo');
		cy.get('[data-cy="search"]').click();
		cy.get('[data-cy="suggestion-item-0"]').click();

		cy.get('button').contains('Cadastrar Cliente').click();

		cy.get('table').contains('td', 'John Doe');
		cy.get('table').contains('td', '70 kg');
		cy.get('table').contains('td', 'Rua de Exemplo');
	});

	it('should reset all clients when reset button is clicked', () => {
		cy.get('button').contains('Resetar Cadastros').click();
		cy.get('table').should('not.contain', 'John Doe');
	});
});
