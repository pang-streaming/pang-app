import { Link } from "expo-router";
import styled, { useTheme } from "styled-components/native";
import Text from "../ui/Text";

export default function RegisterTextButton() {
    const theme = useTheme();
    return (
        <SignUpTextContainer>
            <Text size={14} weight="400" align="center" color={theme.colors.text.subtitle}>가입 된 계정이 없으신가요?</Text>
            <Link href="/(auth)/(signup)">
                <Text size={14} weight="bold" align="center" style={{ textDecorationLine: 'underline', color: theme.colors.primary.normal }}>회원가입</Text>
            </Link>
        </SignUpTextContainer>
    )
}


const SignUpTextContainer = styled.View`
    margin-top: 20px;
    
    flex-direction: row;
    align-items: center;
    justify-content: center;
    gap: 4px;
    margin-bottom: 20px;
`
