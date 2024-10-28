import { useClientContext } from "../../../context/ClientContext.tsx"
import { TableInfoContainer } from "./clientTableInfo.style"

export const ClientTableInfo = () => {
	const { clients } = useClientContext()

	const totalWeight = clients.reduce((sum, client) => sum + client.weight, 0)

	const averageTicket =
		clients.length > 0 ? (totalWeight / clients.length).toFixed(2) : "0.00"

	return (
		<TableInfoContainer>
			<span>Total de Clientes: {clients.length} </span>
			<span>Peso Total: {totalWeight} kg</span>
			<span>Ticket Médio: {averageTicket} kg</span>
		</TableInfoContainer>
	)
}
