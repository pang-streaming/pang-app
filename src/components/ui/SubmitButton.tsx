import styled from "styled-components";
import {ComponentType, ReactNode} from "react";

interface SubmitButtonProps {
	disabled?: boolean;
	type?: 'normal' | 'alternative'
	onClick?: () => void;
	children: ReactNode;
	Icon?: ComponentType;
}

export const SubmitButton = ({disabled = false, type = 'normal', onClick, children, Icon}: SubmitButtonProps) => {
	return (
		<SubmitButtonContent disabled={disabled} onClick={onClick} type={type}>
			{Icon && <Icon/>}
			{children}
		</SubmitButtonContent>
	)
}

const SubmitButtonContent = styled.button<{disabled: boolean, type: 'normal' | 'alternative'}>`
	
	flex-direction: row;
	justify-content: center;
	box-sizing: border-box;
	gap: 12px;
	user-select: none;
	border: none;
	padding: 16px 24px;
	width: 100%;
	cursor: ${({disabled}) => disabled ? 'not-allowed' : 'pointer'};
	background-color: ${({theme, disabled}) => disabled ? theme.colors.button.disabled : theme.colors.primary.normal} ;
	color: ${({theme}) => theme.colors.common.white};
	border-radius: 8px;
	font-size: 8px

	${({ type, theme }) => type === 'alternative' && `
		background-color: transparent;
		border: 2px solid ${theme.colors.primary.normal};
		color: ${theme.colors.primary.normal};
	`}

	/* &:hover {
		background-color: ${({theme, disabled}) => !disabled && theme.colors.hover.normal};

		${({ type, theme, disabled }) => type === 'alternative' && !disabled && `
			background-color: ${theme.colors.hover.light};
		`}
	} */
`