import styled, { useTheme } from "styled-components/native";
import Button from "../ui/Button";

interface AuthNextButtonProps {
    onPress: () => void;
    disabled: boolean;
    step: number;
}

export default function AuthNextButton({ onPress, disabled, step }: AuthNextButtonProps) {
    const theme = useTheme();
    const stepLength = 6;

    const getStepColor = (index: number) => {
        const stepNumber = index + 1;
        if (stepNumber === step) {
            return theme.colors.primary.normal;
        }
        return theme.colors.button.disabled;
    };

    return (
        <ButtonContainer>
            <Button 
                label="다음" 
                onPress={onPress}
                disabled={disabled}
            />
            <StepContainer>
                {[...Array(stepLength)].map((_, index) => (
                    <StepCircle 
                        key={index} 
                        backgroundColor={getStepColor(index)}
                    />
                ))}
            </StepContainer>
        </ButtonContainer>
    )
}
const ButtonContainer = styled.View`
    position: absolute;
    width: 100%;
    bottom: -200px;
`

const StepContainer = styled.View`
    
    flex-direction: row;
    gap: 4px;
    justify-content: center;
    align-items: center;
    margin-top: 64px;
`

const StepCircle = styled.View<{ backgroundColor: string }>`
    width: 8px;
    height: 8px;
    background-color: ${(props: { backgroundColor: string }) => props.backgroundColor};
    border-radius: 50px;   
`