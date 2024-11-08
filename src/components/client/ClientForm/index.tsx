import { useState } from 'react';
import { useClientContext } from '../../../context/ClientContext';
import { getAddressSuggestions, getGeolocation } from '../../../services/geolocation';
import { Client } from '../../../types/Client';
import {
	FormActionsContainer,
	FormContainer,
	SearchIconContainer,
	StyledButton,
	StyledInput,
	SuggestionItem,
	SuggestionsList,
} from './clientForm.style';
import { SearchIcon } from '../../../assets/icon/SearchIcon';
import { Address } from '../../../types/Address';
import { useClientFormData } from './hooks/useClientFormData';

export const ClientForm = () => {
	const { addClient, clearClients } = useClientContext();

	const { formData, setFormData } = useClientFormData();

	const [error, setError] = useState<string | null>(null);
	const [suggestions, setSuggestions] = useState<string[]>([]);

	const handleChange = (field: string, value: string | number | null) => {
		setFormData((prevData) => ({
			...prevData,
			[field]: value,
		}));
	};

	const handleSearchLocation = async () => {
		if (!formData.address) {
			setError('Por favor, preencha o endereço antes de buscar.');
			return;
		}
		setError(null);

		try {
			const response = await getAddressSuggestions(formData.address);

			const filteredSuggestions = response.map(
				(item: { address: Address }) => {
					const { road, city, country, town } = item.address;
					return `${road || ''}, ${city || ''}, ${town || ''},${country || ''}`.replace(
						/, ,/g,
						',',
					);
				},
			);
			setSuggestions(filteredSuggestions);
		} catch (error) {
			console.error('Erro ao buscar sugestões de endereço:', error);
			setError('Erro ao buscar sugestões de endereço. Tente novamente.');
		}
	};

	const handleAddClient = async () => {
		const { name, weight, address, latitude, longitude } = formData;

		const newClient: Client = {
			id: Date.now().toString(),
			name,
			weight: parseFloat(weight as string),
			address,
			latitude,
			longitude,
		};

		await addClient(newClient);
		setFormData({
			name: '',
			weight: '',
			address: '',
			latitude: null,
			longitude: null,
		});
		setSuggestions([]);
		setError(null);
	};

	const handleSuggestionClick = async (selectedAddress: string) => {
		handleChange('address', selectedAddress);
		setSuggestions([]);

		try {
			const { latitude, longitude } = await getGeolocation(selectedAddress);
			handleChange('latitude', latitude);
			handleChange('longitude', longitude);
		} catch (error) {
			console.error('Erro ao obter geolocalização:', error);
			setError('Erro ao obter geolocalização. Tente novamente.');
		}
	};

	const disabled =
		!formData.name ||
		!formData.weight ||
		!formData.address ||
		formData.latitude === null ||
		formData.longitude === null;

	return (
		<FormContainer>
			<StyledInput
				value={formData.name}
				onChange={(e) => handleChange('name', e.target.value)}
				placeholder="Nome Cliente"
				required
			/>
			<StyledInput
				type="number"
				value={formData.weight}
				onChange={(e) => handleChange('weight', e.target.value)}
				placeholder="Peso da Entrega"
				required
			/>
			<FormActionsContainer>
				<StyledInput
					value={formData.address}
					onChange={(e) => handleChange('address', e.target.value)}
					placeholder="Endereço Cliente"
					required
				/>
				<SearchIconContainer onClick={handleSearchLocation}>
					<SearchIcon aria-label="Search Icon" role="img" data-cy="search" />
				</SearchIconContainer>

				{suggestions.length > 0 && (
					<SuggestionsList>
						{suggestions.map((suggestion, index) => (
							<SuggestionItem
								key={index}
								onClick={() => handleSuggestionClick(suggestion)}
								style={{ padding: '8px', cursor: 'pointer' }}
								data-cy={`suggestion-item-${index}`}
							>
								{suggestion}
							</SuggestionItem>
						))}
					</SuggestionsList>
				)}
			</FormActionsContainer>
			{error && <p style={{ color: 'red', fontSize: '12px' }}>{error}</p>}
			<StyledButton onClick={handleAddClient} disabled={disabled}>
				Cadastrar Cliente
			</StyledButton>
			<StyledButton onClick={clearClients} isResetButton>
				Resetar Cadastros
			</StyledButton>
		</FormContainer>
	);
};
