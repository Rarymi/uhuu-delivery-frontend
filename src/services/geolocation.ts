import { api } from './apiService';


export const getGeolocation = async (
	address: string
) => {
	try {
		const response = await api.get("/addresses/coordinates", {
			params: { address },
		})
		return response.data
	} catch (error) {
		console.error("Erro ao buscar clientes:", error)
		throw error
	}
}

export const getAddressSuggestions = async (
	address: string
) => {
	try {
		const response = await api.get("/addresses", {
			params: { address },
		})
		return response.data
	} catch (error) {
		console.error("Erro ao buscar clientes:", error)
		throw error
	}
}

