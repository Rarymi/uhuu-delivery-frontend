import axios from "axios"
import { Client } from "../types/Client"

export const api = axios.create({
	baseURL: "http://localhost:3000",
})

export const fetchClients = async (
	page: number,
	limit: number,
): Promise<Client[]> => {
	try {
		const response = await api.get("/clients", {
			params: { page, limit },
		})
		return response.data
	} catch (error) {
		console.error("Erro ao buscar clientes:", error)
		throw error
	}
}

export const createClient = async (clientData: Client): Promise<Client> => {
	try {
		const response = await api.post("/clients", clientData)
		return response.data
	} catch (error) {
		console.error("Erro ao criar cliente:", error)
		throw error
	}
}

export const deleteAllClients = async () => {
	await api.delete("/clients")
}
