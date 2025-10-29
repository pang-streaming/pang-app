import { Link } from "expo-router";
import styled from "styled-components/native";
import Text from "../ui/Text";

export default function RegisterTextButton() {
    return (
        <SignUpTextContainer>
            <Text color="white" size={14} weight="400" align="center">가입 된 계정이 없으신가요?</Text>
            <Link href="/(auth)/(signup)">
                <Text color="white" size={14} weight="bold" align="center" style={{ textDecorationLine: 'underline' }}>회원가입</Text>
            </Link>
        </SignUpTextContainer>
    )
}


const SignUpTextContainer = styled.View`
    margin-top: 20px;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    gap: 4px;
    margin-bottom: 20px;
`
