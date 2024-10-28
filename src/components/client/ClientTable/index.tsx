import { useState } from 'react';
import { useClientContext } from '../../../context/ClientContext';
import {
	PageButton,
	PaginationControls,
	StyledTable,
	TableContainer,
	TableData,
	TableHeader,
	TableRow,
} from './clientTable.style';

export const ClientTable = () => {
	const { clients } = useClientContext();
	const [currentPage, setCurrentPage] = useState(1);
	const clientsPerPage = 2;

	const totalPages = Math.ceil(clients.length / clientsPerPage);

	const startIndex = (currentPage - 1) * clientsPerPage;
	const displayedClients = clients.slice(
		startIndex,
		startIndex + clientsPerPage,
	);

	const goToNextPage = () => {
		if (currentPage < totalPages) {
			setCurrentPage(currentPage + 1);
		}
	};

	const goToPreviousPage = () => {
		if (currentPage > 1) {
			setCurrentPage(currentPage - 1);
		}
	};

	return (
		<TableContainer>
			<StyledTable>
				<thead>
					<tr>
						<TableHeader>Nome</TableHeader>
						<TableHeader>Rua</TableHeader>
						<TableHeader>Cidade</TableHeader>
						<TableHeader>País</TableHeader>
						<TableHeader>Peso</TableHeader>
						<TableHeader>Lat</TableHeader>
						<TableHeader>Lng</TableHeader>
					</tr>
				</thead>
				<tbody>
					{displayedClients.length === 0 ? (
						<TableRow>
							<TableData
								colSpan={7}
								style={{ textAlign: 'center', color: '#333' }}
							>
								Não há clientes cadastrados no momento.
							</TableData>
						</TableRow>
					) : (
						displayedClients.map((client) => {
							const addressSplit = client.address.split(',');
							return (
								<TableRow key={client.id}>
									<TableData>{client.name}</TableData>

									<TableData>{addressSplit[0]}</TableData>
									<TableData>{addressSplit[1]}</TableData>
									<TableData>{addressSplit[2]}</TableData>
									<TableData>{client.weight} kg</TableData>
									<TableData>{client.latitude} </TableData>
									<TableData>{client.longitude} </TableData>
								</TableRow>
							);
						})
					)}
				</tbody>
			</StyledTable>

			<PaginationControls>
				<PageButton onClick={goToPreviousPage} disabled={currentPage === 1}>
					Anterior
				</PageButton>
				<span>
					Página {currentPage} de {totalPages}
				</span>
				<PageButton
					onClick={goToNextPage}
					disabled={currentPage === totalPages}
				>
					Próxima
				</PageButton>
			</PaginationControls>
		</TableContainer>
	);
};
