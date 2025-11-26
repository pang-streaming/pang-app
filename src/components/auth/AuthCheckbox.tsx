import { Checkbox } from "expo-checkbox";
import styled, { useTheme } from "styled-components/native";
import type { ThemeProps } from "@/theme/types";

interface AuthCheckboxProps {
    isChecked: boolean;
    element: React.ReactNode;
    onValueChange: (value: boolean) => void;
    background?: boolean;
}

export default function AuthCheckbox({
    isChecked, element, onValueChange , background = false
}: AuthCheckboxProps) {
    const theme = useTheme();
    return (
        <CheckboxContainer background={background}>
            <Checkbox
                style={
                    !isChecked ? 
                        {backgroundColor: theme.colors.button.disabled, borderColor: theme.colors.button.disabled, height: 20, width: 20,borderRadius:4} 
                        : 
                        {height: 20, width: 20, borderRadius:4}
                }
                color={isChecked ? theme.colors.button.disabled : undefined}
                value={isChecked}
                onValueChange={onValueChange}
            />
            {element}
        </CheckboxContainer>
    )
}

interface CheckboxContainerProps {
    background: boolean;
}

const CheckboxContainer = styled.View<CheckboxContainerProps>`
    
    flex-direction: row;
    align-items: center;
    justify-content: flex-start;
    gap: 10px;
    background-color: ${({ theme, background }: ThemeProps & CheckboxContainerProps) => background ? theme.colors.content.normal : 'transparent'};
    width: 100%;
    height: 55px;
    padding: 0 20px;
    border-radius: 14px;
`