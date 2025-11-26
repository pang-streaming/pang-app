import styled from "styled-components/native";
import { ComponentType, ReactNode, isValidElement } from "react";
import { TouchableOpacity, Text } from "react-native";
import type { ThemeProps } from "@/theme/types";

interface SubmitButtonProps {
	disabled?: boolean;
	type?: 'normal' | 'alternative';
	onClick?: () => void;
	children: ReactNode;
	Icon?: ComponentType;
}

export const SubmitButton = ({disabled = false, type = 'normal', onClick, children, Icon}: SubmitButtonProps) => {
	const renderChildren = () => {
		if (typeof children === 'string' || typeof children === 'number') {
			return <ButtonText type={type}>{children}</ButtonText>;
		}
		if (isValidElement(children)) {
			return children;
		}
		return <ButtonText type={type}>{String(children)}</ButtonText>;
	};

	return (
		<SubmitButtonContent disabled={disabled} onPress={onClick} type={type}>
			{Icon && <Icon/>}
			{renderChildren()}
		</SubmitButtonContent>
	);
};

const SubmitButtonContent = styled(TouchableOpacity)<{disabled: boolean; type: 'normal' | 'alternative'} & ThemeProps>`
	flex-direction: row;
	justify-content: center;
	align-items: center;
	gap: 12px;
	padding: 16px 24px;
	width: 100%;
	background-color: ${({ theme, disabled }: ThemeProps & { disabled: boolean }) => 
		disabled ? theme.colors.button.disabled : theme.colors.primary.normal};
	border-radius: ${({ theme }: ThemeProps) => theme.borders.large};
	opacity: ${({ disabled }: { disabled: boolean }) => disabled ? 0.6 : 1};

	${({ type, theme }: { type: 'normal' | 'alternative' } & ThemeProps) => 
		type === 'alternative' && `
		background-color: transparent;
		border-width: 2px;
		border-color: ${theme.colors.primary.normal};
	`}
`;

const ButtonText = styled(Text)<{ type: 'normal' | 'alternative' } & ThemeProps>`
	font-size: ${({ theme }: ThemeProps) => theme.font.large};
	font-weight: 600;
	color: ${({ theme, type }: ThemeProps & { type: 'normal' | 'alternative' }) => 
		type === 'alternative' ? theme.colors.primary.normal : theme.colors.common.white};
`;