import { render, screen } from '@testing-library/react';
import { ClientProvider } from '../../../context/ClientContext';
import { ClientTable } from '.';
import '@testing-library/jest-dom';

describe('ClientTable', () => {
	test('renders Client Table', () => {
		render(
			<ClientProvider>
				<ClientTable />
			</ClientProvider>,
		);

		expect(
			screen.getByText('Não há clientes cadastrados no momento.'),
		).toBeVisible();
	});
});
