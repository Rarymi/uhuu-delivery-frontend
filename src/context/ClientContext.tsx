import {
	createContext,
	ReactNode,
	useContext,
	useEffect,
	useState,
} from "react"
import { Client } from "../types/Client"
import {
	createClient,
	deleteAllClients,
	fetchClients,
} from "../services/apiService"

interface ClientContextProps {
	clients: Client[]
	addClient: (client: Client) => Promise<void>
	clearClients: () => void
	loadClients: () => Promise<void>
}

const ClientContext = createContext<ClientContextProps | undefined>(undefined)

export const ClientProvider: React.FC<{ children: ReactNode }> = ({
	children,
}) => {
	const [clients, setClients] = useState<Client[]>([])

	const loadClients = async () => {
		try {
			const data = await fetchClients(1, 10)
			setClients(data)
		} catch (error) {
			console.error("Erro ao carregar clientes:", error)
		}
	}

	const addClient = async (client: Client) => {
		try {
			const createdClient = await createClient(client)
			setClients((prevClients) => [...prevClients, createdClient])
			await loadClients()
		} catch (error) {
			console.error("Erro ao criar cliente:", error)
		}
	}

	const clearClients = async () => {
		await deleteAllClients()
		await loadClients()
	}

	useEffect(() => {
		loadClients()
	}, [])

	return (
		<ClientContext.Provider
			value={{ clients, addClient, clearClients, loadClients }}
		>
			{children}
		</ClientContext.Provider>
	)
}

export const useClientContext = () => {
	const context = useContext(ClientContext)
	if (!context)
		throw new Error("useClientContext must be used within a ClientProvider")
	return context
}
