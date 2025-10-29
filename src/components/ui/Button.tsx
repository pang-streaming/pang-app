import styled from "styled-components/native";
import Text from "./Text";

interface ButtonProps {
    label: string;
    onPress?: () => void;
}

export default function Button({ label, onPress }: ButtonProps) {
    return (
        <ButtonContainer onPress={onPress}>
            <Text color="white" weight="bold" size={16}>{label}</Text>
        </ButtonContainer>
    )
}

const ButtonContainer = styled.TouchableOpacity`
    width: 100%;
    height: 53px;
    background-color: #FF0055;
    border-radius: 10px;

    display: flex;
    justify-content: center;
    align-items: center;
`