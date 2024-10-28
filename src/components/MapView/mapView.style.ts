import styled from "styled-components"

export const PopUpContent = styled.div`
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
`
export const LocationPin = styled.div`
	width: 20px;
	height: 20px;
	display: flex;
	justify-content: center;
	align-items: center;
	background-color: #d53782;
	position: relative;
	border-radius: 50% 50% 50% 0;
	transform: rotate(-45deg);
	margin: auto;

	& > .pin-text {
		transform: rotate(45deg);
		color: #000;
		font-size: 10px;
		font-weight: bold;
	}
`
