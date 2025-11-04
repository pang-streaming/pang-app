import styled, { ThemeProps } from "styled-components/native";
import Text from "./Text";
import { useTheme } from "styled-components/native";

interface ButtonProps {
    label: string;
    onPress?: () => void;
    disabled?: boolean;
}

export default function Button({ label, onPress, disabled}: ButtonProps) {
    const theme = useTheme();
    return (
        <ButtonContainer onPress={onPress} disabled={disabled}>
            <Text color={theme.colors.button.active} weight="bold" size={16}>{label}</Text>
        </ButtonContainer>
    )
}

interface ButtonContainerProps {
    disabled: boolean;
    theme: ThemeProps;
}

const ButtonContainer = styled.TouchableOpacity<ButtonContainerProps>`
  width: 100%;
  height: 53px;
  background-color: ${({ theme, disabled }: ButtonContainerProps) => disabled ? theme.colors.button.disabled : theme.colors.primary.normal};
  border-radius: 10px;
  display: flex;
  justify-content: center;
  align-items: center;
`;