import { Checkbox } from "expo-checkbox";
import styled from "styled-components/native";

interface AuthCheckboxProps {
    isChecked: boolean;
    element: React.ReactNode;
    onValueChange: (value: boolean) => void;
    background?: boolean;
}

export default function AuthCheckbox({
    isChecked, element, onValueChange , background = false
}: AuthCheckboxProps) {
    return (
        <CheckboxContainer background={background}>
            <Checkbox
                style={
                    !isChecked ? 
                        {backgroundColor: '#404040', borderColor: '#404040', height: 20, width: 20,borderRadius:4} 
                        : 
                        {height: 20, width: 20, borderRadius:4}
                }
                color={isChecked ? '#404040' : undefined}
                value={isChecked}
                onValueChange={onValueChange}
            />
            {element}
        </CheckboxContainer>
    )
}

const CheckboxContainer = styled.View<{background: boolean}>`
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: flex-start;
    gap: 10px;
    background-color: ${(props: {background: boolean}) => props.background ? '#262626' : 'transparent'};
    width: 100%;
    height: 55px;
    padding: 0 20px;
    border-radius: 14px;
`