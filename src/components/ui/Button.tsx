import styled from "styled-components/native";
import Text from "./Text";

interface ButtonProps {
    label: string;
    onPress?: () => void;
    disabled?: boolean;
}

export default function Button({ label, onPress, disabled}: ButtonProps) {
    return (
        <ButtonContainer onPress={onPress} disabled={disabled}>
            <Text color="white" weight="bold" size={16}>{label}</Text>
        </ButtonContainer>
    )
}

interface ButtonContainerProps {
    disabled: boolean
}

const ButtonContainer = styled.TouchableOpacity<ButtonContainerProps>`
    width: 100%;
    height: 53px;
    background-color: ${(props:ButtonContainerProps)=> props.disabled ? "#404040" : "#FF0055"};
    border-radius: 10px;

    display: flex;
    justify-content: center;
    align-items: center;
`