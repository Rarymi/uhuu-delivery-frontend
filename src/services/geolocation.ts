import { api } from './apiService';


export const getGeolocation = async (
	address: string
) => {
	try {
		const response = await api.get("/geolocation/coordinates", {
			params: { address },
		})
		return response.data
	} catch (error) {
		console.error("Erro ao buscar clientes:", error)
		throw error
	}
}


