import styled from "styled-components"
import shouldForwardProp from "@styled-system/should-forward-prop"

interface ResetButtonProps {
	isResetButton?: boolean
}

export const FormContainer = styled.div`
	display: flex;
	flex-direction: column;
	gap: 1rem;
	max-width: 400px;
	margin: 20px auto;
`

export const FormActionsContainer = styled.div`
	display: flex;
	flex-direction: row;
	gap: 1rem;
	position: relative;
`

export const SearchIconContainer = styled.div`
	border-radius: 50%;
	padding: 8px;
	display: flex;
	justify-content: center;
	align-items: center;
	cursor: pointer;

	&:hover {
		background-color: rgb(255, 241, 247);
	}
`

export const StyledInput = styled.input`
	padding: 12px;
	font-size: 1rem;
	border: 1px solid #ccc;
	border-radius: 8px;
	outline: none;
	transition: border-color 0.3s;
	box-shadow: 0px 3px 6px rgba(0, 0, 0, 0.1);

	&:focus {
		border-color: #3f51b5;
	}
`

interface ResetButtonProps {
	isResetButton?: boolean
}

export const StyledButton = styled.button.withConfig({
	shouldForwardProp: (prop) =>
		shouldForwardProp(prop) && prop !== "isResetButton",
})<ResetButtonProps>`
	padding: 12px;
	font-size: 1rem;
	color: white;
	background-color: ${({ isResetButton }) =>
		isResetButton ? "#d9534f" : "#3f51b5"};
	border: none;
	border-radius: 8px;
	cursor: pointer;
	transition: background-color 0.3s;
	display: flex;
	justify-content: center;
	align-items: center;

	&:hover {
		background-color: ${({ isResetButton }) =>
			isResetButton ? "#c9302c" : "#4a67c0"};
	}

	&:disabled {
		background-color: #ccc;
		cursor: not-allowed;
	}
`
export const SuggestionsList = styled.ul`
	position: absolute;
	top: 100%;
	left: 0;
	right: 0;
	background-color: white;
	border: 1px solid #ccc;
	border-radius: 8px;
	max-height: 150px;
	overflow-y: auto;
	box-shadow: 0px 3px 6px rgba(0, 0, 0, 0.2);
	z-index: 1;
	margin-top: 4px;
`

export const SuggestionItem = styled.li`
	padding: 8px;
	cursor: pointer;
	transition: background-color 0.3s;

	&:hover {
		background-color: #f0f0f0;
	}
`

export const ErrorText = styled.p`
	color: red;
	font-size: 0.9rem;
`
