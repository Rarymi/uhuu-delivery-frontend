import { useState } from 'react';

export const useClientFormData = () => {
	const [formData, setFormData] = useState({
		name: '',
		weight: '',
		address: '',
		latitude: null as number | null,
		longitude: null as number | null,
	});

	return { formData, setFormData };
};
