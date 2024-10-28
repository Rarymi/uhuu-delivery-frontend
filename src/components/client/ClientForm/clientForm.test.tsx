import '@testing-library/jest-dom';
import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import { ClientForm } from '.';
import { useClientContext } from '../../../context/ClientContext';
import axios from 'axios';
import { useClientFormData } from './hooks/useClientFormData';

jest.mock('../../../context/ClientContext');

jest.mock('../../../services/geolocation');
jest.mock('axios');

jest.mock('./hooks/useClientFormData.ts', () => {
	const mockUseClientFormData = jest.fn();
	return {
		useClientFormData: mockUseClientFormData,
	};
});

describe('ClientForm', () => {
	const mockAddClient = jest.fn();
	const mockClearClients = jest.fn();

	beforeEach(() => {
		jest.clearAllMocks();
		(useClientContext as jest.Mock).mockReturnValue({
			clearClients: mockClearClients,
			addClient: mockAddClient,
		});
		(useClientFormData as jest.Mock).mockReturnValue({
			formData: {
				name: 'name',
				weight: '75',
				address: 'address',
				latitude: 0,
				longitude: 0,
			},
			setFormData: () => {},
		});
	});

	it('renders form inputs and buttons', () => {
		render(<ClientForm />);

		expect(screen.getByPlaceholderText('Nome Cliente')).toBeInTheDocument();
		expect(screen.getByPlaceholderText('Peso da Entrega')).toBeInTheDocument();
		expect(screen.getByPlaceholderText('Endereço Cliente')).toBeInTheDocument();
		expect(screen.getByText('Cadastrar Cliente')).toBeInTheDocument();
		expect(screen.getByText('Resetar Cadastros')).toBeInTheDocument();
	});

	it('displays error if address is missing when searching location', async () => {
		(useClientFormData as jest.Mock).mockReturnValue({
			formData: {
				name: 'name',
				weight: '75',
				address: null,
				latitude: 0,
				longitude: 0,
			},
			setFormData: () => {},
		});
		render(<ClientForm />);

		const searchIcon = screen.getByLabelText('Search Icon');
		fireEvent.click(searchIcon);

		await waitFor(() =>
			expect(
				screen.getByText('Por favor, preencha o endereço antes de buscar.'),
			).toBeInTheDocument(),
		);
	});

	it('fetches suggestions based on address input', async () => {
		const mockSuggestions = [
			{ address: { road: 'Rua A', city: 'Cidade B', country: 'País C' } },
		];
		(axios.get as jest.Mock).mockResolvedValue({ data: mockSuggestions });

		render(<ClientForm />);

		fireEvent.change(screen.getByPlaceholderText('Endereço Cliente'), {
			target: { value: 'Endereço' },
		});
		const searchIcon = screen.getByLabelText('Search Icon');
		fireEvent.click(searchIcon);

		await waitFor(() => expect(axios.get).toHaveBeenCalled());
	});

	it('adds a client with complete data', async () => {
		(useClientFormData as jest.Mock).mockReturnValue({
			formData: {
				name: 'Client A',
				weight: '75',
				address: 'Rua B',
				latitude: 0,
				longitude: 0,
			},
			setFormData: () => {},
		});

		render(<ClientForm />);
		fireEvent.click(screen.getByText('Cadastrar Cliente'));

		await waitFor(() =>
			expect(mockAddClient).toHaveBeenCalledWith(
				expect.objectContaining({
					name: 'Client A',
					weight: 75,
					address: 'Rua B',
				}),
			),
		);
	});

	it('clears clients on reset button click', () => {
		render(<ClientForm />);

		fireEvent.click(screen.getByText('Resetar Cadastros'));

		expect(mockClearClients).toHaveBeenCalled();
	});
});
