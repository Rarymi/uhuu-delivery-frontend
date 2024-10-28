import styled from "styled-components"

export const TableContainer = styled.div`
	width: 100%;

	box-shadow: 0px 4px 12px rgba(0, 0, 0, 0.1);
	border-radius: 8px;
	overflow: hidden;
	background-color: #f9f9f9;
`

export const StyledTable = styled.table`
	width: 100%;
	border-collapse: collapse;
`

export const TableHeader = styled.th`
	background-color: #d53782;
	color: white;
	padding: 12px;
	text-align: left;
	font-weight: 600;
`

export const TableRow = styled.tr`
	&:nth-child(even) {
		background-color: #f2f2f2;
	}

	&:hover {
		background-color: #e0e7ff;
	}
`

export const TableData = styled.td`
	padding: 12px;
	text-align: left;
	border-bottom: 1px solid #ddd;
`

export const PaginationControls = styled.div`
	display: flex;
	justify-content: center;
	align-items: center;
	margin: 20px 0;
	gap: 15px;
`

export const PageButton = styled.button`
	padding: 8px 12px;
	font-size: 0.9rem;
	color: white;
	background-color: #d53782;
	border: none;
	border-radius: 4px;
	cursor: pointer;
	transition: background-color 0.3s;

	&:hover {
		background-color: #ee519c;
	}

	&:disabled {
		background-color: #b0b0b0;
		cursor: not-allowed;
	}
`
